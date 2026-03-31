/** @jsxImportSource vargai */
/**
 * Silicon Valley x Seedance 2.0 — "Son of Anton is Back" (Full Cast)
 *
 * Classic comic book style. All characters from the original script:
 * Dinesh clicks varg.ai on Anton, reality glitches, Gilfoyle is furious,
 * Richard panics, Erlich is ecstatic, Jian-Yang delivers the punchline.
 *
 * Pipeline: real photos -> nano-banana-pro/edit (classic comic) -> Seedance 2.0 image-to-video
 * 6 image refs: @image1=Dinesh, @image2=Gilfoyle, @image3=Richard, @image4=Erlich,
 *               @image5=Jian-Yang, @image6=Hacker Hostel
 *
 * Model: seedance-2-preview | Duration: 15s | Aspect: 16:9
 * Run: bunx vargai render workflows/01-silicon-valley.tsx --verbose
 */
import { Render, Clip, Image, Video } from "vargai/react";
import { createVarg } from "vargai/ai";

const varg = createVarg({ apiKey: process.env.VARG_API_KEY! });

// --- Real photos (uploaded to s3.varg.ai) ---
const DINESH_REAL = "https://s3.varg.ai/u/194b94d0-58ff-4e8b-91de-4f1959d04013/359fdbcf2e525585bc5b5764a906514afed960851f5d2510a4fce0f09e119afe.png";
const GILFOYLE_REAL = "https://s3.varg.ai/u/194b94d0-58ff-4e8b-91de-4f1959d04013/2693c292f00115b3fe62845c265671d0c88688ef42a9ccdc7fea27239625b054.png";
const RICHARD_REAL = "https://s3.varg.ai/u/194b94d0-58ff-4e8b-91de-4f1959d04013/7c2fd21b6e7d0d174a657fda83d29d3b38b6d7fceeeba6e567c33e7ba914d6fd.png";
const ERLICH_REAL = "https://s3.varg.ai/u/194b94d0-58ff-4e8b-91de-4f1959d04013/ba7292405aa6f902a3e7b60d0c0f843422127d8c06218682663a669d1632d341.png";
const JIMMY_REAL = "https://s3.varg.ai/u/194b94d0-58ff-4e8b-91de-4f1959d04013/3253093d7c432629598b7d7905ec2a34ecf4d783ea2db8c4716c0d41812bf22c.png";
const HACKER_HOSTEL_REAL = "https://s3.varg.ai/u/194b94d0-58ff-4e8b-91de-4f1959d04013/f54219d458809bd8c7dd9cd6bea5839371775cfd408ebeba602b999a50c3fbeb.png";

// --- Comic book style ---
const STYLE = "classic comic book style, bold black inks, halftone dots, primary colors, thick outlines, expressive face, dramatic shading, pop art";

// --- Cartoonize all characters with nano-banana-pro/edit ---

// @image1 — Dinesh (the one who clicks the button)
const dinesh = Image({
  model: varg.imageModel("nano-banana-pro/edit"),
  prompt: {
    text: `Same man from reference. ${STYLE}. South Asian man with short dark hair, blue striped v-neck polo shirt. Nervous scared expression, eyes wide. Indoor tech room with server racks and monitors. 16:9.`,
    images: [DINESH_REAL],
  },
  aspectRatio: "16:9",
});

// @image2 — Gilfoyle (the angry one)
const gilfoyle = Image({
  model: varg.imageModel("nano-banana-pro/edit"),
  prompt: {
    text: `Same man from reference. ${STYLE}. Tall pale man with long brown wavy hair, thick dark beard, rectangular glasses, grey henley shirt. Angry furious expression, arms crossed, jaw clenched. Indoor tech room background. 16:9.`,
    images: [GILFOYLE_REAL],
  },
  aspectRatio: "16:9",
});

// @image3 — Richard (the panicked one)
const richard = Image({
  model: varg.imageModel("nano-banana-pro/edit"),
  prompt: {
    text: `Same man from reference. ${STYLE}. Thin man with curly reddish-brown hair, grey hoodie over pink shirt. Panicked terrified expression, mouth open, hands on head. Indoor tech room background. 16:9.`,
    images: [RICHARD_REAL],
  },
  aspectRatio: "16:9",
});

// @image4 — Erlich (the ecstatic one)
const erlich = Image({
  model: varg.imageModel("nano-banana-pro/edit"),
  prompt: {
    text: `Same man from reference. ${STYLE}. Large heavyset man with wild curly brown hair, scruffy beard, grey hoodie. Ecstatic blissful grin, arms spread wide, head tilted back in joy. Indoor tech room background. 16:9.`,
    images: [ERLICH_REAL],
  },
  aspectRatio: "16:9",
});

// @image5 — Jian-Yang / Jimmy Yang (the deadpan punchline)
const jimmy = Image({
  model: varg.imageModel("nano-banana-pro/edit"),
  prompt: {
    text: `Same man from reference. ${STYLE}. East Asian man with chin-length black hair, brown tortoiseshell glasses, dark navy henley. Smug triumphant grin, looking down at viewer. 16:9.`,
    images: [JIMMY_REAL],
  },
  aspectRatio: "16:9",
});

// @image6 — Hacker Hostel (setting)
const hackerHostel = Image({
  model: varg.imageModel("nano-banana-pro/edit"),
  prompt: {
    text: `Same house from reference. ${STYLE}. Suburban Silicon Valley tech house exterior with van in driveway. Warm afternoon light. Wide establishing shot. 16:9.`,
    images: [HACKER_HOSTEL_REAL],
  },
  aspectRatio: "16:9",
});

// --- Seedance 2.0: single 15s video with full cast + dialogue ---
const video = Video({
  model: varg.videoModel("seedance-2-preview"),
  prompt: {
    text: `Classic comic book animation, bold inks, halftone dots, primary colors, thick outlines. Cinematic 15 seconds.

SHOT 1 — 0:00 to 0:03
Interior of @image6 cluttered suburban tech house living room. Server racks labeled ANTON with blinking LEDs. @image1 South Asian man in blue striped polo sits at desk, staring at a glowing monitor. He sees a pulsing neon button labeled varg.ai on the screen. Eyes widen. He clicks it. Screen ERUPTS with blinding white light. Digital shockwave pulses through the room. Reality glitches.

SHOT 2 — 0:03 to 0:05
World transforms into surreal comic book dreamscape. Colors oversaturate, walls melt. @image2 tall man with long brown hair, beard, glasses, grey henley materializes from a glitching portal behind @image1. Arms crossed. Pure deadpan contempt.
@image2 says coldly: "You idiot. You activated Anton's varg.ai skill. We are stuck in Seedance 2.0."

SHOT 3 — 0:05 to 0:07
@image2 steps forward pointing accusingly at @image1 who cowers back.
@image2 snarls: "Why did you tell Anton to make that??"
@image1 stammers defensively: "I just clicked the button!"
Red angry glitches swirl around them. Floating text fragments SEEDANCE 2.0 shimmer in air.

SHOT 4 — 0:07 to 0:09
Camera whip-pans. @image3 thin anxious man with curly reddish hair in grey hoodie stumbles in, mouth open, hands on head, panicking.
@image3 shouts: "This is our new internet?!"
Behind him @image4 large man with wild curly hair, scruffy beard, grey hoodie, arms spread wide, head back, enormous ecstatic grin.
@image4 says blissfully: "This is better than shrooms."

SHOT 5 — 0:09 to 0:11
@image5 young East Asian man with black hair and brown glasses walks in calmly from right. Completely unfazed by the surreal world. Holds phone toward camera. Deadpan expression. Zero emotion. Stares into lens.
@image5 says flatly: "This is not hot dog. This is Seedance 2.0 reality."

SHOT 6 — 0:11 to 0:13
@image2 bearded man stands center frame. Holographic server racks glow behind him like a digital altar. He stares into camera with cold intensity.
@image2 says firmly: "Anton sacrificed himself once. Now he is back. And he is generating video."

SHOT 7 — 0:13 to 0:15
Wide shot of all characters in the surreal comic world. @image1 ashamed, @image2 stoic, @image3 panicking, @image4 grinning, @image5 deadpan with phone raised. Glowing server ANTON behind them. A pulse of light. Hold. Fade to black.

Style: Classic comic book throughout. Bold outlines, halftone shading, vivid primary colors. Comedy tone, exaggerated expressions. Cinematic camera. No text overlays.`,
    images: [dinesh, gilfoyle, richard, erlich, jimmy, hackerHostel],
  },
  duration: 15,
  aspectRatio: "16:9",
  keepAudio: true,
});

// --- Render ---
export default (
  <Render width={1920} height={1080} fps={30}>
    <Clip duration={15}>{video}</Clip>
  </Render>
);
