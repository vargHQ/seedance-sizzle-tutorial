# Seedance 2.0 Sizzle Reel — AI Video Generation Tutorial with Remotion

<p align="center">
  <a href="https://github.com/vargHQ/seedance-sizzle-tutorial/stargazers"><img src="https://img.shields.io/github/stars/vargHQ/seedance-sizzle-tutorial" alt="GitHub stars"></a>
  <a href="https://github.com/vargHQ/seedance-sizzle-tutorial/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License"></a>
</p>

Build a cinematic sizzle reel using **Seedance 2.0** AI video generation and **Remotion** — from text/image prompts to a polished video composition with animated text overlays, transitions, and branded typography. All clips generated via the [varg API](https://varg.ai).

**Final result**: A 48-second showcase video with:
- Rapid-fire hook sequence over a Seedance clip
- "Meet Seedance 2.0 API" intro card
- Feature showcase with labeled clips (e-commerce, UGC, storytelling, impossible scenes)
- Animated orange Aeonik Black titles with glow effects
- Blur backgrounds for vertical clips in a 16:9 composition
- Professional end card

## Prerequisites

- [Bun](https://bun.sh) (for package management)
- [FFmpeg](https://ffmpeg.org) (for image preprocessing)
- [curl](https://curl.se) + [jq](https://jqlang.github.io/jq/) (for API calls)
- A [varg API key](https://app.varg.ai) with ~1800 credits ($18) for clip generation

## Quick Start

```bash
# Clone and install
git clone https://github.com/vargHQ/seedance-sizzle-tutorial.git
cd seedance-sizzle-tutorial
bun install

# Generate source clips via varg API (~$18, ~60 minutes)
export VARG_API_KEY=varg_live_xxx
bash scripts/generate-clips.sh

# Preview in browser
bun run start

# Render final video
npx remotion render src/index.ts SizzleReel out/seedance-sizzle-reel.mp4
```

## Architecture

```
seedance-sizzle-tutorial/
├── scripts/
│   └── generate-clips.sh        # Generates all 8 source clips via varg API
├── src/
│   ├── index.ts                  # Remotion entry point
│   ├── Root.tsx                  # Composition registration (1440 frames, 30fps)
│   ├── SizzleReel.tsx            # Main composition — timeline & clip layout
│   └── components/
│       ├── HookCard.tsx          # Rapid-fire text card (unused in v2, kept for reference)
│       ├── IntroCard.tsx         # "Meet Seedance 2.0 API" intro
│       ├── ImpactTitle.tsx       # Animated title overlay for feature clips
│       └── EndCard.tsx           # "varg.ai" end card with CTA
├── public/
│   ├── fonts/
│   │   └── aeonik-black.otf     # Aeonik Black font
│   └── clips/                   # Generated video clips (gitignored)
│       ├── silicon-valley.mp4   # Hook background
│       ├── ronin-storm.mp4      # "Hollywood Level Videos"
│       ├── medieval-tavern.mp4  # "Tell Stories"
│       ├── night-market.mp4     # Beauty shot
│       ├── cheetah-chase.mp4    # "Create Impossible Scenes"
│       ├── hyperspeed-earth.mp4 # "API That Speeds Your Creativity"
│       ├── ag1-weightloss.mp4   # "Great For E-Commerce" (9:16)
│       └── planner-broll.mp4    # "UGC" (9:16)
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

## Step-by-Step Tutorial

### Step 1: Generate Source Clips

The sizzle reel is composed of 8 AI-generated video clips. Each is a single 15-second Seedance 2.0 generation — no stitching, no multi-clip editing. One prompt, one API call, one clip.

```bash
export VARG_API_KEY=varg_live_xxx
bash scripts/generate-clips.sh
```

This script:
1. Calls `POST https://api.varg.ai/v1/video` with `model: "seedance-2-preview"` for each clip
2. Polls `GET https://api.varg.ai/v1/jobs/:id` until complete
3. Downloads the result to `public/clips/`

**Cost**: ~250 credits ($2.50) per clip, ~1800 total ($18)
**Time**: ~8-12 minutes per clip (generation + watermark removal)

#### Clip Types

| Clip | Type | Reference | Prompt Style |
|------|------|-----------|-------------|
| Silicon Valley | text-to-video | None | Single paragraph, impossible camera move |
| Ronin Storm | text-to-video | None | Single paragraph, action scene |
| Medieval Tavern | text-to-video | None | Single paragraph, impossible camera move |
| Night Market | text-to-video | None | Timestamped `0:00-0:02` format |
| Cheetah Chase | text-to-video | None | Technical camera specs (angles, speeds) |
| Hyperspeed Earth | text-to-video | None | Timestamped with location changes |
| AG1 E-Commerce | image-to-video | Product image | `@image1` reference + timestamped scenes |
| Planner B-Roll | image-to-video | Character image | `@image1` reference + UGC style |

**Key insight**: For image-to-video clips, the reference image is pre-processed to 9:16 using blur-extend (ffmpeg) to work around a known PiAPI aspect ratio bug where the output matches the input image dimensions.

### Step 2: Understand the Composition

The video is structured in 4 parts:

#### Part 1: Hook (0:00-0:15)
The full Silicon Valley Seedance clip plays as background. Animated text overlays appear synced to specific timestamps (from an ASS subtitle file). Each line slams in with a spring animation — alternating white and orange (accent) text.

```tsx
// SizzleReel.tsx — Hook subtitles with exact timing
const HOOK_SUBS = [
  { start: 3.0, end: 3.22, text: "You idiot!", accent: true },
  { start: 3.22, end: 3.78, text: "You activated" },
  // ... 17 lines total
];
```

The `HookSubtitles` component uses `useCurrentFrame()` to find which subtitle is active at the current time, then renders it with spring scale + fade animation.

#### Part 2: Intro (15:00-16.5s)
"Meet Seedance 2.0 API" with spring-animated scale, orange divider line, and staggered "Designed for Agents." subtitle.

#### Part 3: Feature Showcase (16.5s-45s)
Each clip gets an `ImpactTitle` overlay — orange Aeonik Black text with glow pulse. Vertical (9:16) clips use `BlurBgClip` which renders two `<OffthreadVideo>` layers:
1. Blurred + darkened background (stretched to fill 16:9)
2. Sharp foreground (contained at center)

```tsx
// Blur background for 9:16 clips in a 16:9 composition
<OffthreadVideo src={src} style={{ objectFit: "cover", filter: "blur(30px) brightness(0.4)", transform: "scale(1.2)" }} />
<OffthreadVideo src={src} style={{ objectFit: "contain" }} />
```

#### Part 4: End Card (45s-48s)
"varg.ai" logo with spring entrance + pulsing "Try Seedance 2.0" CTA button.

### Step 3: Preview & Iterate

```bash
bun run start
```

Opens Remotion Studio in your browser. You get:
- Frame-by-frame scrubbing
- Real-time preview of all animations
- Hot reload when you edit any `.tsx` file

This is the key advantage of Remotion over FFmpeg-only pipelines — you can see exactly how text animations look before spending time on a full render.

### Step 4: Render

```bash
npx remotion render src/index.ts SizzleReel out/seedance-sizzle-reel.mp4 --concurrency=4
```

Renders 1440 frames at 1920x1080, 30fps. Takes ~2-3 minutes on a modern machine.

## Customization

### Change titles
Edit the `title` prop in `SizzleReel.tsx`:
```tsx
<WideClip src={CLIPS.ronin} startFrom={fps * 3} title="YOUR TITLE HERE" />
```

### Change hook text
Edit the `HOOK_SUBS` array in `SizzleReel.tsx`. Each entry has `start`/`end` (seconds), `text`, and optional `accent` (orange vs white).

### Change colors
The orange accent color `#ff6b00` is used throughout all components. Search and replace to rebrand.

### Add your own clips
1. Place `.mp4` files in `public/clips/`
2. Reference with `staticFile("clips/your-clip.mp4")`
3. Use `<WideClip>` for 16:9 or `<BlurBgClip>` for 9:16

### Change font
Replace `public/fonts/aeonik-black.otf` with your font. Update the `fontFace` declaration in `SizzleReel.tsx`.

## Tech Stack

- **[Remotion](https://remotion.dev)** — React-based video composition
- **[Seedance 2.0](https://varg.ai)** via varg API — AI video generation (ByteDance model via PiAPI)
- **[Aeonik](https://fonts.adobe.com/fonts/aeonik)** — Typography
- **FFmpeg** — Image preprocessing (blur-extend for aspect ratio workaround)

## Prompting Tips for Seedance 2.0

Based on extensive testing, these patterns produce the best results:

1. **Timestamped scene breakdowns**: `0:00-0:02: Description...` gives Seedance clear temporal structure
2. **"Impossible camera move" format**: "Continuous single take, camera tilting, rolling, spinning, flying through..." triggers Seedance's best single-take capabilities
3. **Technical camera specs**: Exact angles ("banks 28 degrees"), distances ("locked 2.5 meters behind"), heights ("camera height 40cm") improve motion quality
4. **`@image1` character anchoring**: For image-to-video, reference the character in every scene: "Strictly maintain this exact person's face throughout every shot"
5. **Physical detail keywords**: "glass shards", "motion blur", "volumetric god-rays", "shallow DOF" improve visual quality
6. **Quality suffix**: Always end with "8K, photorealistic, cinematic, no text overlays, no watermarks"

## License

MIT

## Credits

Built with [varg](https://varg.ai) — AI video generation platform.
Prompts inspired by [awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts).
