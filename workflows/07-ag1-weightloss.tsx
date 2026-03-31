/** @jsxImportSource vargai */
/**
 * E-Commerce Ad 1: AG1 Weight Loss UGC Testimonial
 *
 * "I really lost 30 pounds in 2 months with that!"
 * 15-second vertical UGC-style testimonial ad. Woman discovers AG1,
 * transforms her life, shops for new clothes that finally fit.
 *
 * Model: seedance-2-preview | Duration: 15s | Aspect: 9:16 | Cost: ~$2.50
 * Reference: AG1 product image as @image1
 *
 * Run: bunx vargai render workflows/07-ag1-weightloss.tsx --verbose
 */
import { Render, Clip, Video } from "vargai/react";
import { createVarg } from "vargai/ai";

const varg = createVarg({ apiKey: process.env.VARG_API_KEY! });

const AG1_REF = "https://s3.varg.ai/u/cb40f707-37a1-4b52-848f-1334d66b3ad8/ee360f269614cf97baee13c058faae773ceed105950ceba5408e6107cc8b4fe3.jpg";

const video = Video({
  prompt: {
    text: `FORMAT: 15 seconds, continuous single take, vertical 9:16, UGC e-commerce testimonial ad. 8K, photorealistic.

@image1 is a dark green supplement bag labeled "AG1" with white bold text. Strictly maintain this exact product appearance throughout every shot — same green color, same AG1 branding, same bag shape.

0:00-0:02: Bright modern kitchen, morning golden light through window. Beautiful fit woman, late 20s, glowing tan skin, long brown wavy hair in a messy bun, wearing oversized grey t-shirt. She reaches for the @image1 AG1 bag on the white marble counter. Picks it up with both hands, holds it toward camera with a big excited smile. iPhone selfie angle, UGC authentic feel. Shallow depth of field.

0:02-0:04: Same woman scoops green powder from the @image1 AG1 bag into a clear glass of water. Close-up of the vivid green powder dissolving and swirling in water. She stirs with a spoon, morning sun catches the green liquid, beautiful color. Clean minimal kitchen background.

0:04-0:06: She takes a big sip of the green drink, closes her eyes with satisfaction, wipes her lips, opens eyes and smiles at camera. Warm morning glow on her face. The @image1 AG1 bag sits on the counter beside her. Natural, authentic, happy expression.

0:06-0:08: Dynamic cut — she is now at the gym, wearing black sports bra and leggings, running on a treadmill with confidence. Ponytail bouncing, determined expression, sweat glistening. Bright gym lighting, mirror reflections. Camera tracks alongside her at eye level. Athletic, powerful energy.

0:08-0:10: Bright clothing store interior. She pulls a stunning fitted summer dress off a rack, eyes wide with excitement. Holds it against herself in front of a full-length mirror. Her expression shifts from surprise to pure joy — it fits perfectly now. Warm retail lighting, colorful clothes in background.

0:10-0:12: Fitting room. She twirls in the new fitted dress, checking herself from multiple angles in the mirror. Huge confident smile, runs hands along her waist. She looks amazing and she knows it. Warm flattering lighting, shallow DOF on her reflection.

0:12-0:14: Close-up of her face beaming at the camera. She holds up the @image1 AG1 bag next to her face triumphantly with one hand, points at it with the other. Excited, genuine enthusiasm. Warm golden backlight creating a halo around her hair. UGC selfie energy.

0:14-0:15: Wide shot — she walks out of the clothing store into golden sunset light, multiple shopping bags in both hands, confident stride, hair flowing. She glances back at camera one last time with a wink. Cinematic golden hour. Hold.

STYLE: UGC authentic, iPhone quality feel but cinematic lighting. Warm golden tones throughout. Natural expressions, genuine enthusiasm. Dynamic camera — mix of selfie angles, tracking shots, close-ups. No text overlays, no watermarks, no voiceover.`,
    images: [AG1_REF],
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
