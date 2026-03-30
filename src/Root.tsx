import React from "react";
import { Composition } from "remotion";
import { SizzleReel } from "./SizzleReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SizzleReel"
        component={SizzleReel}
        durationInFrames={1440}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
