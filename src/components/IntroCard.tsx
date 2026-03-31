import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from "remotion";

/**
 * "Meet Seedance 2.0 API" intro card.
 * Elegant fade-in on black with staggered subtitle reveal.
 */
export const IntroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title spring scale
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const titleOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle delayed fade
  const subtitleOpacity = interpolate(
    frame,
    [fps * 0.5, fps * 0.8],
    [0, 1],
    {
      extrapolateRight: "clamp",
    }
  );

  const subtitleY = interpolate(frame, [fps * 0.5, fps * 0.8], [20, 0], {
    extrapolateRight: "clamp",
  });

  // Subtle line reveal
  const lineWidth = interpolate(frame, [fps * 0.3, fps * 0.7], [0, 200], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 900,
          fontSize: 90,
          color: "#ff6b00",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textShadow:
            "0 0 60px rgba(255, 107, 0, 0.4), 0 4px 30px rgba(0,0,0,0.8)",
        }}
      >
        Meet Seedance 2.0 API
      </div>

      {/* Orange divider line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          backgroundColor: "#ff6b00",
          marginTop: 24,
          marginBottom: 24,
          opacity: 0.7,
        }}
      />

      <div
        style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 400,
          fontSize: 36,
          color: "#ffffff",
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          letterSpacing: 8,
          textTransform: "uppercase",
        }}
      >
        Designed for Agents.
      </div>
    </AbsoluteFill>
  );
};
