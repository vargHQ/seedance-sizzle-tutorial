import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  AbsoluteFill,
} from "remotion";

/**
 * Rapid-fire text card for the hook sequence.
 * Big bold text slams in with spring scale, holds, then cuts.
 * Black background, orange text, Outfit Black.
 */
export const HookCard: React.FC<{
  text: string;
  accent?: boolean;
}> = ({ text, accent = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring slam entrance
  const scale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.5 },
  });

  // Quick fade in
  const opacity = interpolate(frame, [0, 3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle shake on entrance (first 5 frames)
  const shakeX =
    frame < 5
      ? interpolate(frame, [0, 2, 4], [0, -4, 0], {
          extrapolateRight: "clamp",
        })
      : 0;

  const color = accent ? "#ff6b00" : "#ffffff";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 900,
          fontSize: text.length > 20 ? 72 : text.length > 12 ? 88 : 110,
          color,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 3,
          opacity,
          transform: `scale(${scale}) translateX(${shakeX}px)`,
          textShadow: accent
            ? "0 0 40px rgba(255, 107, 0, 0.5), 0 0 80px rgba(255, 107, 0, 0.2)"
            : "0 0 30px rgba(255, 255, 255, 0.15)",
          padding: "0 80px",
          lineHeight: 1.1,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
