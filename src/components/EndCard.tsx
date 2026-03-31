import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from "remotion";

/**
 * End card / packshot with "varg.ai" and CTA.
 */
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const logoOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [fps * 0.6, fps * 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaY = interpolate(frame, [fps * 0.6, fps * 1], [15, 0], {
    extrapolateRight: "clamp",
  });

  // Blinking CTA pulse
  const blink = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.7, 1]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Logo / URL */}
      <div
        style={{
          fontFamily: "Aeonik, sans-serif",
          fontWeight: 900,
          fontSize: 100,
          color: "#ff6b00",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          textShadow: "0 0 60px rgba(255, 107, 0, 0.4)",
        }}
      >
        varg.ai
      </div>

      {/* CTA button */}
      <div
        style={{
          marginTop: 40,
          padding: "16px 48px",
          borderRadius: 12,
          backgroundColor: "#ff6b00",
          opacity: ctaOpacity * blink,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "Aeonik, sans-serif",
            fontWeight: 900,
            fontSize: 28,
            color: "#000000",
            textTransform: "uppercase",
            letterSpacing: 4,
          }}
        >
          Try Seedance 2.0
        </span>
      </div>
    </AbsoluteFill>
  );
};
