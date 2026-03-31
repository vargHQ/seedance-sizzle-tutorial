/** @jsxImportSource vargai */
/**
 * Seedance 2.0 Showcase #4: High-Speed Cheetah Chase Cam
 *
 * Inspired by @ChangningL29508's technical chase cam prompt — one of the
 * most precisely specified prompts in the community. Uses exact camera specs
 * (height, distance, banking angles) that Seedance 2.0 handles exceptionally.
 *
 * Model: seedance-2-preview (ByteDance via PiAPI)
 * Duration: 15s | Aspect: 16:9 | Cost: ~$2.50
 *
 * Run: bunx vargai render templates/seedance-cheetah-chase.tsx --verbose
 */
import { Render, Clip, Video } from "vargai/react";
import { createVarg } from "vargai/ai";

const varg = createVarg({ apiKey: process.env.VARG_API_KEY! });

const cheetah = Video({
  prompt: `Rear chase steadicam locked 2.5 meters behind an adult cheetah sprinting at 112 km/h through dense jungle undergrowth, camera height 40cm matching exact pace with zero vertical drift. Golden hour light strobes through the canopy above, dappling across the spotted coat in rapid flashes.

Subject banks hard left 28 degrees around a massive fig trunk, spine compressing then exploding into full extension, all four limbs airborne in suspension phase. Immediate right bank 32 degrees threading the gap between twin mahogany trunks, body tilting opposite to camera tilt, background foliage streaking into pure horizontal motion blur while the cheetah remains razor sharp in center frame.

Straight blast through a fern corridor, fronds whipping aside, then aggressive left lean 25 degrees avoiding a moss-covered fallen log, spine flexing from maximum compression to full extension with each stride cycle. Muscle ripples visible beneath the coat, claws extending on each footfall tearing into soft earth.

Right bank 30 degrees following a natural trail bend, warm side light catching every strand of muscular definition, long shadows raking across the jungle floor at speed. Dirt and leaf debris kick up in rooster tails behind each paw strike.

Final left weave 27 degrees between a dense bamboo cluster, sustained maximum velocity throughout, every direction change environmentally motivated by terrain. Camera locked parallel, never deviating from rear chase position. Background a continuous blur of green and gold, subject frozen in crystalline sharpness. Hyperreal wildlife cinematography, 8K, shallow depth of field on background only.`,
  model: varg.videoModel("seedance-2-preview"),
  duration: 15,
  aspectRatio: "16:9",
  keepAudio: true,
});

export default (
  <Render width={1920} height={1080} fps={30}>
    <Clip duration={15}>{cheetah}</Clip>
  </Render>
);
