import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from "remotion";

/**
 * Animated impact title overlay for feature showcase clips.
 * Orange text with glow, spring scale entrance, subtle pulse.
 */
export const ImpactTitle: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
}> = ({ text, delay = 5, fontSize }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  // Spring scale entrance
  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // Fade in
  const opacity = interpolate(adjustedFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle glow pulse
  const glowIntensity = interpolate(
    Math.sin(adjustedFrame * 0.12),
    [-1, 1],
    [25, 50]
  );

  // Auto-size based on text length
  const autoSize =
    fontSize ??
    (text.length > 25 ? 56 : text.length > 18 ? 68 : text.length > 10 ? 80 : 96);

  const lines = text.split("\n");

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Dark vignette for readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 900,
          fontSize: autoSize,
          color: "#ff6b00",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 4,
          opacity,
          transform: `scale(${scale})`,
          textShadow: `
            0 0 ${glowIntensity}px rgba(255, 107, 0, 0.6),
            0 0 ${glowIntensity * 2}px rgba(255, 107, 0, 0.2),
            0 4px 20px rgba(0, 0, 0, 0.9)
          `,
          lineHeight: 1.15,
          zIndex: 10,
        }}
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
