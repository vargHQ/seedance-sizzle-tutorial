/** @jsxImportSource vargai */
/**
 * Seedance 2.0 Showcase #5: Southeast Asian Night Market Single-Take
 *
 * Inspired by the atmospheric night market prompt from awesome-seedance-2-prompts —
 * a ground-to-aerial impossible camera move through a dense market. Uses the
 * multi-shot timestamp format with audio cues for maximum sensory immersion.
 *
 * Model: seedance-2-preview (ByteDance via PiAPI)
 * Duration: 15s | Aspect: 16:9 | Cost: ~$2.50
 *
 * Run: bunx vargai render templates/seedance-night-market.tsx --verbose
 */
import { Render, Clip, Video } from "vargai/react";
import { createVarg } from "vargai/ai";

const varg = createVarg({ apiKey: process.env.VARG_API_KEY! });

const nightMarket = Video({
  prompt: `FORMAT: 15 seconds, single continuous impossible camera move, no dialogue.
STYLE: Dense Southeast Asian night market, wet stone, steam and open fire, orange lantern light, photorealistic ground-to-aerial cinematic 8K.

0:00-0:02: Camera starts at ankle level on glistening wet stone. Forest of feet in sandals and flip-flops splashing through puddles. Market sounds overwhelming. Camera weaves between legs like flowing water, lantern light reflecting in every wet surface.

0:02-0:04: Camera rises slowly past steaming woks and sizzling charcoal grills. A gas flame bursts at exact eye level — camera is briefly engulfed in orange fire then emerges through it, uncut. Oil pops, smoke swirls.

0:04-0:06: Camera weaves through dozens of hanging paper lanterns at mid-height, skimming past them like a moth navigating a forest of warm light. Red and orange glow strobes across the lens creating flares.

0:06-0:08: Camera dips suddenly under a low wooden table. A child has fallen asleep on a rice sack, curled up, face peaceful. A quiet pocket of stillness inside the surrounding chaos. Camera lingers one beat, then rises.

0:08-0:10: Camera rises back up through thick white smoke billowing from a charcoal satay grill — lens briefly obscured by dense smoke, then punches through above the stall canopy level. Rooftops emerge.

0:10-0:12: Camera continues rising — now above corrugated rooftop level. The night market reveals itself as an endless orange lantern sea stretching to the dark horizon, thousands of lights pulsing. Camera tilts slowly, taking in the immense scale.

0:12-0:14: Camera descends back down, targeting a single stall at the market edge. A lone elderly vendor methodically counting worn coins by the light of a single swaying lantern. The chaos has faded to distant murmur.

0:14-0:15: Camera settles on the vendor's weathered hands stacking coins. They pause. Look up slowly — directly into the camera lens. Hold. Eyes full of quiet stories. Fade to black.

STYLE NOTES: Ground level feels claustrophobic and overwhelming. The aerial reveal is the emotional exhale. Warm orange and deep red throughout, deepening to amber at the edges. Wet stone reflections in every surface. Real fire, real smoke, photorealistic textures.`,
  model: varg.videoModel("seedance-2-preview"),
  duration: 15,
  aspectRatio: "16:9",
  keepAudio: true,
});

export default (
  <Render width={1920} height={1080} fps={30}>
    <Clip duration={15}>{nightMarket}</Clip>
  </Render>
);
