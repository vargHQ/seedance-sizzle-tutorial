#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# generate-clips.sh — Generate all Seedance 2.0 source clips via varg API
#
# Prerequisites:
#   - VARG_API_KEY set in environment (get one at https://app.varg.ai)
#   - curl, jq installed
#
# Usage:
#   export VARG_API_KEY=varg_live_xxx
#   bash scripts/generate-clips.sh
#
# Cost: ~1800 credits (~$18) for all 8 clips
#   - 6x seedance-2-preview (250 credits each) = 1500 credits
#   - 1x soul image generation (15 credits)
#   - 1x nano-banana-pro/edit image (5 credits)
#   - Watermark removal included
#
# Time: ~8-12 minutes per clip (Seedance 2 + watermark removal)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

API="https://api.varg.ai/v1"
CLIPS_DIR="public/clips"
mkdir -p "$CLIPS_DIR"

if [ -z "${VARG_API_KEY:-}" ]; then
  echo "Error: VARG_API_KEY not set. Get one at https://app.varg.ai"
  exit 1
fi

AUTH="Authorization: Bearer $VARG_API_KEY"

# ─── Helper: submit video job and poll until complete ───────────────────
generate_video() {
  local name="$1"
  local body="$2"
  local output="$CLIPS_DIR/$name.mp4"

  if [ -f "$output" ]; then
    echo "  ✓ $name already exists, skipping"
    return
  fi

  echo "  → Submitting $name..."
  local job_id
  job_id=$(curl -s -X POST "$API/video" \
    -H "$AUTH" \
    -H "Content-Type: application/json" \
    -d "$body" | jq -r '.job_id')

  echo "    Job: $job_id"

  # Poll until complete
  local status="queued"
  while [ "$status" != "completed" ] && [ "$status" != "failed" ]; do
    sleep 15
    local result
    result=$(curl -s "$API/jobs/$job_id" -H "$AUTH")
    status=$(echo "$result" | jq -r '.status')
    echo "    Status: $status"

    if [ "$status" = "failed" ]; then
      echo "    ERROR: $(echo "$result" | jq -r '.error')"
      return 1
    fi
  done

  # Download the output
  local url
  url=$(curl -s "$API/jobs/$job_id" -H "$AUTH" | jq -r '.output.url')
  echo "    Downloading to $output..."
  curl -sL "$url" -o "$output"
  echo "  ✓ $name done ($(du -h "$output" | cut -f1))"
}

# ─── Helper: submit image job and poll ──────────────────────────────────
generate_image() {
  local body="$1"

  local job_id
  job_id=$(curl -s -X POST "$API/image" \
    -H "$AUTH" \
    -H "Content-Type: application/json" \
    -d "$body" | jq -r '.job_id')

  local status="queued"
  while [ "$status" != "completed" ] && [ "$status" != "failed" ]; do
    sleep 5
    status=$(curl -s "$API/jobs/$job_id" -H "$AUTH" | jq -r '.status')
  done

  curl -s "$API/jobs/$job_id" -H "$AUTH" | jq -r '.output.url'
}

# ─── Helper: upload file to varg S3 ────────────────────────────────────
upload_file() {
  local file="$1"
  local mime="$2"
  curl -s -X POST "$API/files" \
    -H "$AUTH" \
    -H "Content-Type: $mime" \
    --data-binary "@$file" | jq -r '.url'
}

echo "============================================"
echo "  Seedance 2.0 Sizzle Reel — Clip Generator"
echo "============================================"
echo ""
echo "Balance: $(curl -s -H "$AUTH" "$API/balance" | jq -r '.balance_cents') credits"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# 1. SILICON VALLEY HOOK (text-to-video, no reference image)
# ═══════════════════════════════════════════════════════════════════════════
echo "[1/8] Silicon Valley Hook"
generate_video "silicon-valley" '{
  "model": "seedance-2-preview",
  "prompt": "Continuous single take, camera tilting, rolling, spinning, flying through a bustling Silicon Valley tech office. Starts soaring above rows of standing desks with multiple monitors showing code, developers typing furiously. Camera dives through a glass conference room where a pitch meeting is happening, weaving between gesticulating hands and flying whiteboard markers. Swoops down into a server room with blinking lights and cable management, passes through cooling vents into a rooftop garden where engineers drink kombucha at sunset overlooking the Bay. No cuts, impossible camera moves, seamless transitions, energetic, dynamic, cinematic. 8K high definition.",
  "duration": 15,
  "aspect_ratio": "16:9"
}'

# ═══════════════════════════════════════════════════════════════════════════
# 2. RONIN STORM (text-to-video)
# ═══════════════════════════════════════════════════════════════════════════
echo "[2/8] Ronin Storm"
generate_video "ronin-storm" '{
  "model": "seedance-2-preview",
  "prompt": "A surreal battlefield in the sky: floating rock islands drifting through a violent thunderstorm, clouds swirling below like a dark ocean. A masked ronin in tattered black armor dashes across the drifting platforms, pursued by a colossal winged beast whose chest is a swirling vortex of storm clouds and crackling lightning. The camera hurtles from island to island, struggling to keep up as rocks tilt, spin, and crumble away beneath them. Every wingbeat from the beast sends visible shockwaves through the air, shaking the frame and blowing debris and horizontal rain straight into the viewers face. Rapid handheld cuts capture the ronin leaping impossible gaps between disintegrating platforms, his katana carving bright arcs of white light that briefly cut through the darkness like lightning itself. The finale shows the camera diving behind him as he jumps off the last crumbling rock, riding a bolt of lightning directly into the monsters chest vortex with a final, all-or-nothing overhead slash that explodes the storm from within and clears the sky in a blinding white flash, revealing stars above.",
  "duration": 15,
  "aspect_ratio": "16:9"
}'

# ═══════════════════════════════════════════════════════════════════════════
# 3. MEDIEVAL TAVERN (text-to-video)
# ═══════════════════════════════════════════════════════════════════════════
echo "[3/8] Medieval Tavern"
generate_video "medieval-tavern" '{
  "model": "seedance-2-preview",
  "prompt": "Continuous single take, camera tilting, rolling, spinning, flying through a bustling medieval fantasy tavern. Starts soaring above the roaring hearth where a dwarf rotates a roasting boar on a spit, sparks drifting upward. Camera dives downward into a tiny mouse hole beneath the floorboards, gliding past a rat hoarding a gold coin in the dark. Sweeps up through a creaking dumbwaiter shaft into a secretive thieves den where hooded figures deal cards by candlelight, weaving between thrown daggers and scattered treasure. Camera plunges into a mages chaotic study above them, passing glowing floating books, bubbling emerald vials, and a raven perched on a skull. Transitions by shooting up the stone chimney into an aerial view over a vast, torch-lit walled city under a massive full moon, fog rolling through the streets below. No cuts, impossible camera moves, seamless transitions, energetic, dynamic, cinematic. 8K high definition, high quality footage.",
  "duration": 15,
  "aspect_ratio": "16:9"
}'

# ═══════════════════════════════════════════════════════════════════════════
# 4. NIGHT MARKET (text-to-video)
# ═══════════════════════════════════════════════════════════════════════════
echo "[4/8] Night Market"
generate_video "night-market" '{
  "model": "seedance-2-preview",
  "prompt": "FORMAT: 15 seconds, single continuous impossible camera move, no dialogue.\nSTYLE: Dense Southeast Asian night market, wet stone, steam and open fire, orange lantern light, photorealistic ground-to-aerial cinematic 8K.\n\n0:00-0:02: Camera starts at ankle level on glistening wet stone. Forest of feet in sandals and flip-flops splashing through puddles. Market sounds overwhelming. Camera weaves between legs like flowing water, lantern light reflecting in every wet surface.\n\n0:02-0:04: Camera rises slowly past steaming woks and sizzling charcoal grills. A gas flame bursts at exact eye level — camera is briefly engulfed in orange fire then emerges through it, uncut. Oil pops, smoke swirls.\n\n0:04-0:06: Camera weaves through dozens of hanging paper lanterns at mid-height, skimming past them like a moth navigating a forest of warm light. Red and orange glow strobes across the lens creating flares.\n\n0:06-0:08: Camera dips suddenly under a low wooden table. A child has fallen asleep on a rice sack, curled up, face peaceful. A quiet pocket of stillness inside the surrounding chaos. Camera lingers one beat, then rises.\n\n0:08-0:10: Camera rises back up through thick white smoke billowing from a charcoal satay grill — lens briefly obscured by dense smoke, then punches through above the stall canopy level. Rooftops emerge.\n\n0:10-0:12: Camera continues rising — now above corrugated rooftop level. The night market reveals itself as an endless orange lantern sea stretching to the dark horizon, thousands of lights pulsing.\n\n0:12-0:15: Camera descends back down, targeting a single stall at the market edge. A lone elderly vendor methodically counting worn coins by the light of a single swaying lantern. Hold.",
  "duration": 15,
  "aspect_ratio": "16:9"
}'

# ═══════════════════════════════════════════════════════════════════════════
# 5. CHEETAH CHASE (text-to-video)
# ═══════════════════════════════════════════════════════════════════════════
echo "[5/8] Cheetah Chase"
generate_video "cheetah-chase" '{
  "model": "seedance-2-preview",
  "prompt": "Rear chase steadicam locked 2.5 meters behind an adult cheetah sprinting at 112 km/h through dense jungle undergrowth, camera height 40cm matching exact pace with zero vertical drift. Golden hour light strobes through the canopy above, dappling across the spotted coat in rapid flashes. Subject banks hard left 28 degrees around a massive fig trunk, spine compressing then exploding into full extension, all four limbs airborne in suspension phase. Immediate right bank 32 degrees threading the gap between twin mahogany trunks, body tilting opposite to camera tilt, background foliage streaking into pure horizontal motion blur while the cheetah remains razor sharp in center frame. Straight blast through a fern corridor, fronds whipping aside, then aggressive left lean 25 degrees avoiding a moss-covered fallen log. Right bank 30 degrees following a natural trail bend, warm side light catching every strand of muscular definition. Final left weave 27 degrees between a dense bamboo cluster, sustained maximum velocity throughout. Hyperreal wildlife cinematography, 8K, shallow depth of field on background only.",
  "duration": 15,
  "aspect_ratio": "16:9"
}'

# ═══════════════════════════════════════════════════════════════════════════
# 6. HYPERSPEED EARTH (text-to-video)
# ═══════════════════════════════════════════════════════════════════════════
echo "[6/8] Hyperspeed Earth"
generate_video "hyperspeed-earth" '{
  "model": "seedance-2-preview",
  "prompt": "Cinematic 15-second hyperspeed tracking shot. Camera locked 8 meters behind a sleek matte-black futuristic aircraft with glowing blue engine trails, aircraft positioned center-right of frame throughout. Heavy motion blur on all edges, atmosphere streaking past.\n\n0:00-0:03: Low altitude pass over Paris at golden hour. Eiffel Tower rises on the left, Seine river glitters below, rooftops blur into warm terracotta streaks. Aircraft banks gently right.\n\n0:03-0:05: Sharp pull-up through cloud layer, moisture explodes across the lens, sky shifts from amber to deep cobalt blue. Condensation trails spiral off wingtips.\n\n0:05-0:08: High altitude over Japan, Earths curvature visible at the edges, Mount Fuji snow-capped below surrounded by clouds. Aircraft noses down.\n\n0:08-0:10: Hard dive through cloud break, desert tones emerging rapidly, heat shimmer visible.\n\n0:10-0:12: Low screaming pass over Dubai at night, Burj Khalifa piercing upward on the right, city lights streak into long golden lines beneath.\n\n0:12-0:14: Threading through Manhattans skyscraper canyon at dawn, glass facades reflecting pink sunrise on both sides.\n\n0:14-0:15: Final dramatic pull-up, Earths full curvature fills the lower frame, stars appearing above. Hold.\n\nPhotorealistic cinematic VFX, IMAX quality, 16:9, no text overlays.",
  "duration": 15,
  "aspect_ratio": "16:9"
}'

# ═══════════════════════════════════════════════════════════════════════════
# 7. AG1 E-COMMERCE AD (image-to-video with product reference)
# ═══════════════════════════════════════════════════════════════════════════
echo "[7/8] AG1 E-Commerce Ad"

# Download AG1 product image, blur-extend to 9:16, upload
echo "  Preparing AG1 reference image..."
curl -sL "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS4DDHSCDrFzdXzlZouvAgMbrHPy5Qa53AFGn9qIVDAo060IBW3TgVgKoDHOC5YDcU_KmS0fyoZSUxPlb1WVRcJd7ZvPUFoT7Uz4VBolYc7ug7ksT6d8R2NqjH75S4rL909ixOJ6Q&usqp=CAc" -o /tmp/ag1-original.jpg

ffmpeg -y -i /tmp/ag1-original.jpg \
  -vf "split[original][blurred];[blurred]scale=810:1440:force_original_aspect_ratio=increase,crop=810:1440,boxblur=30:30[bg];[original]scale=810:-1[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2" \
  -q:v 2 /tmp/ag1-9x16.jpg 2>/dev/null

AG1_URL=$(upload_file /tmp/ag1-9x16.jpg "image/jpeg")
echo "  AG1 ref: $AG1_URL"

generate_video "ag1-weightloss" "{
  \"model\": \"seedance-2-preview\",
  \"prompt\": \"FORMAT: 15 seconds, continuous single take, vertical 9:16, UGC e-commerce testimonial ad. 8K, photorealistic.\n\n@image1 is a dark green supplement bag labeled AG1 with white bold text. Strictly maintain this exact product appearance throughout every shot.\n\n0:00-0:02: Bright modern kitchen, morning golden light. Beautiful fit woman, late 20s, glowing skin, long brown wavy hair. She reaches for the @image1 AG1 bag on white marble counter, holds it toward camera with excited smile. iPhone selfie angle, UGC feel.\n\n0:02-0:04: She scoops green powder from @image1 into clear glass of water. Close-up of vivid green powder dissolving. Morning sun catches the green liquid.\n\n0:04-0:06: She sips the green drink, closes eyes with satisfaction, smiles at camera. @image1 sits on counter beside her.\n\n0:06-0:08: Dynamic cut — she is at the gym, black sports bra, running on treadmill with confidence. Ponytail bouncing, determined.\n\n0:08-0:10: Clothing store. She pulls a fitted summer dress off rack, eyes wide with excitement. Holds it against herself in mirror.\n\n0:10-0:12: Fitting room. She twirls in the new dress, checking angles in mirror. Huge smile.\n\n0:12-0:14: Close-up beaming at camera. Holds up @image1 triumphantly. Golden backlight halo.\n\n0:14-0:15: Wide shot — walks out of store into golden sunset, shopping bags in hands. Glances back with a wink.\n\nSTYLE: UGC authentic, warm golden tones, dynamic camera. No text, no watermarks.\",
  \"duration\": 15,
  \"aspect_ratio\": \"9:16\",
  \"files\": [{\"url\": \"$AG1_URL\"}]
}"

# ═══════════════════════════════════════════════════════════════════════════
# 8. PLANNER B-ROLL AD (image-to-video with character reference)
# ═══════════════════════════════════════════════════════════════════════════
echo "[8/8] Planner B-Roll Ad"

# Generate character image
echo "  Generating character image..."
CHAR_URL=$(generate_image '{
  "model": "soul",
  "prompt": "beautiful professional young woman, early 30s, dark hair in a neat bun, smart casual blazer over white top, warm confident smile, looking directly at camera, shoulders up selfie angle, warm indoor lighting, modern apartment background, photorealistic, slight head tilt, friendly approachable expression",
  "aspect_ratio": "9:16"
}')
echo "  Character: $CHAR_URL"

# Download, blur-extend, upload
curl -sL "$CHAR_URL" -o /tmp/char-original.png
ffmpeg -y -i /tmp/char-original.png \
  -vf "split[original][blurred];[blurred]scale=810:1440:force_original_aspect_ratio=increase,crop=810:1440,boxblur=30:30[bg];[original]scale=810:-1[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2" \
  -q:v 2 /tmp/char-9x16.jpg 2>/dev/null
CHAR_S3=$(upload_file /tmp/char-9x16.jpg "image/jpeg")
echo "  Uploaded: $CHAR_S3"

generate_video "planner-broll" "{
  \"model\": \"seedance-2-preview\",
  \"prompt\": \"FORMAT: 15 seconds, continuous single take, vertical 9:16, UGC e-commerce ad with b-roll intercuts. 8K, photorealistic.\n\n@image1 is the character — a professional young woman, early 30s, dark hair in a neat bun, wearing a smart casual blazer over white top. Strictly maintain this exact person's face, hair, and appearance throughout every shot.\n\n0:00-0:02: @image1 woman sits at warm modern desk, speaking directly to camera with casual confident energy. Warm indoor golden lighting, blurred bookshelf behind. UGC talking head style.\n\n0:02-0:04: B-roll — extreme close-up of hands writing in beautiful leather planner. Fine black pen glides across cream pages. Steam rises from matcha latte. Golden morning sunlight. ASMR detail.\n\n0:04-0:06: Back to @image1 — different angle, counting points on fingers animatedly, knowing smile.\n\n0:06-0:08: B-roll — aesthetic overhead flat lay of organized desk rotating. Planner, MacBook, AirPods, succulent, iced coffee.\n\n0:08-0:10: B-roll — silhouette of woman on balcony at golden hour sunset. Arms wide, deep breath, city skyline.\n\n0:10-0:12: Back to @image1 close-up — points at camera emphatically, mouths stop scrolling, warm smile.\n\n0:12-0:14: @image1 holds up leather planner toward camera, proud smile, warm lighting.\n\n0:14-0:15: Wide shot — @image1 walks confidently through sun-drenched room. Golden light. Hold.\n\nSTYLE: Mix UGC authenticity and cinematic b-roll. Warm golden palette. No text, no watermarks.\",
  \"duration\": 15,
  \"aspect_ratio\": \"9:16\",
  \"files\": [{\"url\": \"$CHAR_S3\"}]
}"

echo ""
echo "============================================"
echo "  All clips generated!"
echo "  Remaining balance: $(curl -s -H "$AUTH" "$API/balance" | jq -r '.balance_cents') credits"
echo "============================================"
echo ""
echo "Clips saved to $CLIPS_DIR/:"
ls -lh "$CLIPS_DIR/"
