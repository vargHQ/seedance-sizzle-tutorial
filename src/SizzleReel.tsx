import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { IntroCard } from "./components/IntroCard";
import { ImpactTitle } from "./components/ImpactTitle";
import { EndCard } from "./components/EndCard";

// ── Font face ──────────────────────────────────────────────────────────
const fontFace = `
@font-face {
  font-family: 'Outfit';
  src: url('${staticFile("fonts/outfit-black.ttf")}') format('truetype');
  font-weight: 900;
  font-style: normal;
}
`;

// ── Clips ──────────────────────────────────────────────────────────────
const CLIPS = {
  siliconValley: staticFile("clips/silicon-valley.mp4"),
  ronin: staticFile("clips/ronin-storm.mp4"),
  ag1: staticFile("clips/ag1-weightloss.mp4"),
  planner: staticFile("clips/planner-broll.mp4"),
  ramble: staticFile("clips/ramble-todoapp.mp4"),
  tavern: staticFile("clips/medieval-tavern.mp4"),
  night: staticFile("clips/night-market.mp4"),
  cheetah: staticFile("clips/cheetah-chase.mp4"),
  hyperspeed: staticFile("clips/hyperspeed-earth.mp4"),
};

// ── ASS subtitle timing (from the provided .ass file) ──────────────────
// Each line has start/end in seconds relative to the Silicon Valley clip
const HOOK_SUBS: Array<{
  start: number;
  end: number;
  text: string;
  accent?: boolean;
}> = [
  { start: 3.0, end: 3.22, text: "You idiot!", accent: true },
  { start: 3.22, end: 3.78, text: "You activated" },
  { start: 3.78, end: 4.9, text: "Anton's varg AI skill.", accent: true },
  { start: 4.9, end: 5.74, text: "We are stuck" },
  { start: 5.74, end: 6.82, text: "in Seedance 2.0.", accent: true },
  { start: 6.82, end: 7.34, text: "This is" },
  { start: 7.34, end: 7.8, text: "our new internet!", accent: true },
  { start: 7.66, end: 8.28, text: "This is better" },
  { start: 8.28, end: 8.96, text: "than shrooms.", accent: true },
  { start: 8.96, end: 9.66, text: "This is not hot dog." },
  { start: 9.66, end: 10.74, text: "This is Seedance 2.0", accent: true },
  { start: 10.74, end: 11.16, text: "reality.", accent: true },
  { start: 11.16, end: 12.02, text: "Anton sacrificed" },
  { start: 11.86, end: 12.78, text: "himself once.", accent: true },
  { start: 12.78, end: 13.68, text: "Now he is back." },
  { start: 13.68, end: 14.56, text: "And he is generating" },
  { start: 14.56, end: 15.0, text: "video.", accent: true },
];

// ── Animated subtitle overlay for the Silicon Valley hook ──────────────
const HookSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Find the active subtitle(s) at current time
  const activeSubs = HOOK_SUBS.filter(
    (s) => currentTime >= s.start && currentTime < s.end
  );

  if (activeSubs.length === 0) return null;

  // Show the latest active subtitle
  const sub = activeSubs[activeSubs.length - 1];
  const subFrame = Math.round((currentTime - sub.start) * fps);

  // Spring scale entrance
  const scale = spring({
    frame: subFrame,
    fps,
    config: { damping: 8, stiffness: 350, mass: 0.4 },
  });

  // Quick fade in
  const opacity = interpolate(subFrame, [0, 2], [0, 1], {
    extrapolateRight: "clamp",
  });

  const color = sub.accent ? "#ff6b00" : "#ffffff";
  const fontSize =
    sub.text.length > 20 ? 72 : sub.text.length > 12 ? 88 : 110;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      <div
        style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 900,
          fontSize,
          color,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 3,
          opacity,
          transform: `scale(${scale})`,
          textShadow: sub.accent
            ? "0 0 40px rgba(255, 107, 0, 0.6), 0 0 80px rgba(255, 107, 0, 0.2), 0 4px 20px rgba(0,0,0,0.9)"
            : "0 0 20px rgba(255, 255, 255, 0.2), 0 4px 20px rgba(0,0,0,0.9)",
          zIndex: 10,
          lineHeight: 1.1,
          padding: "0 60px",
        }}
      >
        {sub.text}
      </div>
    </AbsoluteFill>
  );
};

// ── Blurred background wrapper for 9:16 vertical clips ─────────────────
const BlurBgClip: React.FC<{
  src: string;
  startFrom: number;
  title?: string;
  volume?: number;
}> = ({ src, startFrom, title, volume = 1 }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Blurred background layer — stretched to fill, muted */}
      <OffthreadVideo
        src={src}
        startFrom={startFrom}
        volume={0}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(30px) brightness(0.4)",
          transform: "scale(1.2)",
        }}
      />
      {/* Sharp foreground — contained at center, with volume control */}
      <OffthreadVideo
        src={src}
        startFrom={startFrom}
        volume={volume}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      {title && <ImpactTitle text={title} />}
    </AbsoluteFill>
  );
};

// ── 16:9 clip with optional title ──────────────────────────────────────
const WideClip: React.FC<{
  src: string;
  startFrom: number;
  title?: string;
}> = ({ src, startFrom, title }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo
        src={src}
        startFrom={startFrom}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {title && <ImpactTitle text={title} />}
    </AbsoluteFill>
  );
};

// ── Main composition ───────────────────────────────────────────────────
export const SizzleReel: React.FC = () => {
  const { fps } = useVideoConfig();

  const shortFade = linearTiming({ durationInFrames: 6 });
  const medFade = linearTiming({ durationInFrames: 8 });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontFace }} />

      <TransitionSeries>
        {/* ═══ PART 1: SILICON VALLEY HOOK (15s) ═══ */}
        {/* Full Silicon Valley clip with animated subtitle overlay */}
        <TransitionSeries.Sequence durationInFrames={fps * 15}>
          <AbsoluteFill>
            <OffthreadVideo
              src={CLIPS.siliconValley}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <HookSubtitles />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* ═══ PART 2: INTRO — "Meet Seedance 2.0 API" over Ronin Storm ═══ */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={medFade}
        />
        <TransitionSeries.Sequence durationInFrames={Math.round(fps * 2.5)}>
          <AbsoluteFill>
            <OffthreadVideo
              src={CLIPS.ronin}
              startFrom={0}
              volume={0.3}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IntroCard />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Ronin Storm continues — "HOLLYWOOD LEVEL VIDEOS" */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={shortFade}
        />
        <TransitionSeries.Sequence durationInFrames={fps * 4}>
          <WideClip
            src={CLIPS.ronin}
            startFrom={Math.round(fps * 2.5)}
            title="HOLLYWOOD LEVEL VIDEOS"
          />
        </TransitionSeries.Sequence>

        {/* ═══ PART 3: FEATURE SHOWCASE ═══ */}

        {/* AG1 — "GREAT FOR E-COMMERCE" (4.5s) — 9:16 with blur bg, 50% audio */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={shortFade}
        />
        <TransitionSeries.Sequence durationInFrames={Math.round(fps * 4.5)}>
          <BlurBgClip
            src={CLIPS.ag1}
            startFrom={0}
            title="GREAT FOR E-COMMERCE"
            volume={0.5}
          />
        </TransitionSeries.Sequence>

        {/* Planner — "UGC" (2s) — 9:16 with blur bg, 50% audio */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={shortFade}
        />
        <TransitionSeries.Sequence durationInFrames={fps * 2}>
          <BlurBgClip
            src={CLIPS.planner}
            startFrom={fps * 2}
            title="UGC"
            volume={0.5}
          />
        </TransitionSeries.Sequence>

        {/* Ramble — flash cut (0.5s) with B-ROLLS title — 9:16 with blur bg, 50% audio */}
        <TransitionSeries.Sequence durationInFrames={15}>
          <BlurBgClip src={CLIPS.ramble} startFrom={0} title="B-ROLLS" volume={0.5} />
        </TransitionSeries.Sequence>

        {/* Ramble — continues B-ROLLS (2s) — 9:16 with blur bg, 50% audio */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={shortFade}
        />
        <TransitionSeries.Sequence durationInFrames={fps * 2}>
          <BlurBgClip
            src={CLIPS.ramble}
            startFrom={fps * 11}
            title="B-ROLLS"
            volume={0.5}
          />
        </TransitionSeries.Sequence>

        {/* Medieval Tavern — "TELL STORIES" (4s) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={medFade}
        />
        <TransitionSeries.Sequence durationInFrames={fps * 4}>
          <WideClip
            src={CLIPS.tavern}
            startFrom={fps * 2}
            title="TELL STORIES"
          />
        </TransitionSeries.Sequence>

        {/* Night Market — beauty shot (2.5s) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={medFade}
        />
        <TransitionSeries.Sequence durationInFrames={Math.round(fps * 2.5)}>
          <WideClip src={CLIPS.night} startFrom={fps * 4} />
        </TransitionSeries.Sequence>

        {/* Cheetah — "CREATE IMPOSSIBLE SCENES" (3s) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={shortFade}
        />
        <TransitionSeries.Sequence durationInFrames={fps * 3}>
          <WideClip
            src={CLIPS.cheetah}
            startFrom={fps * 3}
            title={"CREATE\nIMPOSSIBLE SCENES"}
          />
        </TransitionSeries.Sequence>

        {/* Hyperspeed — "API THAT SPEEDS YOUR CREATIVITY" (4s) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={medFade}
        />
        <TransitionSeries.Sequence durationInFrames={fps * 4}>
          <WideClip
            src={CLIPS.hyperspeed}
            startFrom={fps * 5}
            title={"API THAT SPEEDS\nYOUR CREATIVITY"}
          />
        </TransitionSeries.Sequence>

        {/* ═══ PART 4: END CARD over Hyperspeed (3s) ═══ */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />
        <TransitionSeries.Sequence durationInFrames={fps * 3}>
          <AbsoluteFill>
            <OffthreadVideo
              src={CLIPS.hyperspeed}
              startFrom={fps * 10}
              volume={0.3}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <EndCard />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
