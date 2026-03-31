/** @jsxImportSource vargai */
/**
 * Seedance 2.0 Showcase #3: Cinematic Hyperspeed Global Tracking Shot
 *
 * Inspired by timestamped multi-segment prompts from the community —
 * combining the hyperspeed tracking format with precise temporal beats.
 * Each timestamp segment gives Seedance clear motion direction.
 *
 * Model: seedance-2-preview (ByteDance via PiAPI)
 * Duration: 15s | Aspect: 16:9 | Cost: ~$2.50
 *
 * Run: bunx vargai render templates/seedance-hyperspeed-earth.tsx --verbose
 */
import { Render, Clip, Video } from "vargai/react";
import { createVarg } from "vargai/ai";

const varg = createVarg({ apiKey: process.env.VARG_API_KEY! });

const hyperspeed = Video({
  prompt: `Cinematic 15-second hyperspeed tracking shot. Camera locked 8 meters behind a sleek matte-black futuristic aircraft with glowing blue engine trails, aircraft positioned center-right of frame throughout. Heavy motion blur on all edges, atmosphere streaking past.

0:00-0:03: Low altitude pass over Paris at golden hour. Eiffel Tower rises on the left, Seine river glitters below, rooftops blur into warm terracotta streaks. Aircraft banks gently right.

0:03-0:05: Sharp pull-up through cloud layer, moisture explodes across the lens, sky shifts from amber to deep cobalt blue. Condensation trails spiral off wingtips.

0:05-0:08: High altitude over Japan, Earth's curvature visible at the edges, Mount Fuji snow-capped below surrounded by clouds. Aircraft noses down.

0:08-0:10: Hard dive through cloud break, desert tones emerging rapidly, heat shimmer visible.

0:10-0:12: Low screaming pass over Dubai at night, Burj Khalifa piercing upward on the right, city lights streak into long golden lines beneath. Aircraft rolls 30 degrees banking left.

0:12-0:14: Threading through Manhattan's skyscraper canyon at dawn, glass facades reflecting pink sunrise on both sides, the aircraft's shadow racing across building faces.

0:14-0:15: Final dramatic pull-up, Earth's full curvature fills the lower frame, atmosphere glowing blue-white, stars appearing above. Hold one beat. Hard cut to black.

Photorealistic cinematic VFX, IMAX quality, 16:9, 24fps, no text overlays.`,
  model: varg.videoModel("seedance-2-preview"),
  duration: 15,
  aspectRatio: "16:9",
  keepAudio: true,
});

export default (
  <Render width={1920} height={1080} fps={30}>
    <Clip duration={15}>{hyperspeed}</Clip>
  </Render>
);
