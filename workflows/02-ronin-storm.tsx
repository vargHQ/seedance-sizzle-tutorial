/** @jsxImportSource vargai */
/**
 * Seedance 2.0 Showcase #2: Surreal Ronin Thunderstorm Battle
 *
 * Inspired by the #1 featured prompt from awesome-seedance-2-prompts
 * by @Dheepanratnam — the highest-rated Seedance 2.0 prompt in the community.
 * Enhanced with additional sensory detail and temporal structure.
 *
 * Model: seedance-2-preview (ByteDance via PiAPI)
 * Duration: 15s | Aspect: 16:9 | Cost: ~$2.50
 *
 * Run: bunx vargai render templates/seedance-ronin-storm.tsx --verbose
 */
import { Render, Clip, Video } from "vargai/react";
import { createVarg } from "vargai/ai";

const varg = createVarg({ apiKey: process.env.VARG_API_KEY! });

const ronin = Video({
  prompt: `A surreal battlefield in the sky: floating rock islands drifting through a violent thunderstorm, clouds swirling below like a dark ocean. A masked ronin in tattered black armor dashes across the drifting platforms, pursued by a colossal winged beast whose chest is a swirling vortex of storm clouds and crackling lightning. The camera hurtles from island to island, struggling to keep up as rocks tilt, spin, and crumble away beneath them. Every wingbeat from the beast sends visible shockwaves through the air, shaking the frame and blowing debris and horizontal rain straight into the viewer's face. Rapid handheld cuts capture the ronin leaping impossible gaps between disintegrating platforms, his katana carving bright arcs of white light that briefly cut through the darkness like lightning itself. The finale shows the camera diving behind him as he jumps off the last crumbling rock, riding a bolt of lightning directly into the monster's chest vortex with a final, all-or-nothing overhead slash that explodes the storm from within and clears the sky in a blinding white flash, revealing stars above.`,
  model: varg.videoModel("seedance-2-preview"),
  duration: 15,
  aspectRatio: "16:9",
  keepAudio: true,
});

export default (
  <Render width={1920} height={1080} fps={30}>
    <Clip duration={15}>{ronin}</Clip>
  </Render>
);
