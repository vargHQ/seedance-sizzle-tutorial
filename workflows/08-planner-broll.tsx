/** @jsxImportSource vargai */
/**
 * E-Commerce Ad 3: B-Roll + Speaking Character — Planner Product
 *
 * "Stop scrolling and just get it. Link in bio."
 * 15-second vertical ad intercutting between a woman speaking to camera
 * and aesthetic lifestyle b-roll of morning routines and productivity.
 *
 * Model: seedance-2-preview | Duration: 15s | Aspect: 9:16 | Cost: ~$2.50
 * Reference: Character image as @image1 for face/appearance consistency
 *
 * Run: bunx vargai render workflows/08-planner-broll.tsx --verbose
 */
import { Render, Clip, Video } from "vargai/react";
import { createVarg } from "vargai/ai";

const varg = createVarg({ apiKey: process.env.VARG_API_KEY! });

const CHARACTER_REF = "https://s3.varg.ai/u/cb40f707-37a1-4b52-848f-1334d66b3ad8/41a7be9c8f6f1b1adb1e085f652419d1bcc5f71a9ab83dc93d05fb891a498e64.jpg";

const video = Video({
  prompt: {
    text: `FORMAT: 15 seconds, continuous single take, vertical 9:16, UGC e-commerce ad with b-roll intercuts. 8K, photorealistic.

@image1 is the character — a professional young woman, early 30s, dark hair in a neat bun, wearing a smart casual blazer over white top. Strictly maintain this exact person's face, hair, and appearance throughout every shot she appears in. Maximum face consistency.

0:00-0:02: @image1 woman sits at a warm modern desk, speaking directly to camera with casual confident energy. She leans slightly forward, gestures with one hand. Warm indoor golden lighting, blurred bookshelf and plants behind her. iPhone selfie angle, UGC talking head style. She mouths words enthusiastically, natural facial expressions. Authentic influencer energy.

0:02-0:04: B-roll cut — extreme close-up of hands writing in a beautiful leather-bound planner journal. A fine black pen glides smoothly across cream pages, writing neat task lists. Steam rises from a ceramic matcha latte beside the planner. Warm golden morning sunlight through sheer curtains. ASMR-satisfying detail. Shallow DOF, warm amber tones.

0:04-0:06: Back to @image1 woman — slightly different angle, she counts points on her fingers animatedly, leaning back in her chair with a knowing smile. Natural head movements, expressive eyebrows. She radiates "trust me on this" energy. Same warm room, same lighting. Relatable UGC talking head.

0:06-0:08: B-roll cut — aesthetic overhead flat lay shot of an organized desk slowly rotating. Beautiful planner open to a weekly spread with colorful tabs, MacBook Pro, AirPods case, small succulent in terracotta pot, iced coffee in clear glass. Everything perfectly arranged. Camera slowly drifts across the scene. Warm natural light, soft shadows. Satisfying organization.

0:08-0:10: B-roll cut — silhouette of a woman on a balcony at golden hour sunset. She stretches her arms wide, takes a deep breath, city skyline in warm orange background. Hair loose and flowing in the breeze. Freedom, peace, time reclaimed. Cinematic wide shot, lens flare from setting sun.

0:10-0:12: Back to @image1 woman — now close-up, she points directly at camera emphatically. Intense but friendly eye contact. She mouths "stop scrolling" with conviction, then breaks into a warm smile. Slight camera push-in toward her face. Dramatic moment of direct connection with viewer. Warm backlight creating rim light on her hair.

0:12-0:14: @image1 woman holds up a beautiful leather planner toward the camera with both hands, proud smile. The planner is open showing organized, colorful pages. She tilts it slightly to catch the warm light. Close-up of planner then rack-focus to her beaming face behind it. Product hero moment.

0:14-0:15: Wide shot — @image1 woman walks confidently through a sun-drenched room, planner tucked under her arm, golden light streaming behind her. She glances back at camera with a final knowing smile. Cinematic. Hold. Fade.

STYLE: Mix of UGC talking head authenticity and cinematic b-roll beauty. Warm golden color palette throughout — amber, honey, soft whites. Dynamic camera angles shifting every 2 seconds. Natural expressions on the character. B-roll should feel aspirational and satisfying. No text overlays, no watermarks, no voiceover audio.`,
    images: [CHARACTER_REF],
  },
  model: varg.videoModel("seedance-2-preview"),
  duration: 15,
  aspectRatio: "9:16",
  keepAudio: true,
});

export default (
  <Render width={1080} height={1920} fps={30}>
    <Clip duration={15}>{video}</Clip>
  </Render>
);
