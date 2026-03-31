/** @jsxImportSource vargai */
/**
 * Seedance 2.0 Showcase #1: Impossible Single-Take Medieval Tavern
 *
 * Inspired by the "impossible camera move" format from the awesome-seedance-2-prompts
 * community (@ChangningL29508's continuous single-take formula).
 *
 * Model: seedance-2-preview (ByteDance via PiAPI)
 * Duration: 15s | Aspect: 16:9 | Cost: ~$2.50
 *
 * Run: bunx vargai render templates/seedance-medieval-tavern.tsx --verbose
 */
import { Render, Clip, Video } from "vargai/react";
import { createVarg } from "vargai/ai";

const varg = createVarg({ apiKey: process.env.VARG_API_KEY! });

const tavern = Video({
  prompt: `Continuous single take, camera tilting, rolling, spinning, flying through a bustling medieval fantasy tavern. Starts soaring above the roaring hearth where a dwarf rotates a roasting boar on a spit, sparks drifting upward. Camera dives downward into a tiny mouse hole beneath the floorboards, gliding past a rat hoarding a gold coin in the dark. Sweeps up through a creaking dumbwaiter shaft into a secretive thieves' den where hooded figures deal cards by candlelight, weaving between thrown daggers and scattered treasure. Camera plunges into a mage's chaotic study above them, passing glowing floating books, bubbling emerald vials, and a raven perched on a skull. Transitions by shooting up the stone chimney into an aerial view over a vast, torch-lit walled city under a massive full moon, fog rolling through the streets below. No cuts, impossible camera moves, seamless transitions, energetic, dynamic, cinematic. 8K high definition, high quality footage.`,
  model: varg.videoModel("seedance-2-preview"),
  duration: 15,
  aspectRatio: "16:9",
  keepAudio: true,
});

export default (
  <Render width={1920} height={1080} fps={30}>
    <Clip duration={15}>{tavern}</Clip>
  </Render>
);
