"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import type { Group } from "three";
import { PlaceholderBalloon } from "./placeholder-balloon";
import { Airship } from "./airship";
import { experienceObjects, type JourneyFrame } from "./scene-config";

export type SkyCanvasProps = {
  frame: RefObject<JourneyFrame>;
  motion: boolean;
  hovered: string | null;
};

function Objects({ frame, motion, hovered }: SkyCanvasProps) {
  const { viewport, size, invalidate } = useThree();
  const blimp = useRef<Group>(null);
  const balloons = useRef<Group[]>([]);
  const elapsed = useRef(0);
  const unit = Math.min(viewport.width / 11, viewport.height / 6.8);

  useEffect(() => {
    const redraw = () => invalidate();
    window.addEventListener("scroll", redraw, { passive: true });
    return () => window.removeEventListener("scroll", redraw);
  }, [invalidate]);

  useFrame((_, delta) => {
    if (motion) elapsed.current += Math.min(delta, 0.05);
    const drift = motion ? Math.sin(elapsed.current * 0.45) * 0.065 : 0;
    const { scroll, pointerX, pointerY } = frame.current;
    const parallaxX = motion ? pointerX * 0.08 : 0;
    const parallaxY = motion ? pointerY * 0.05 : 0;
    if (blimp.current) {
      blimp.current.position.set(parallaxX, (scroll - 1) * viewport.height + drift + parallaxY, 0);
      blimp.current.scale.setScalar(unit * (hovered === "about" ? 1.05 : 1));
      blimp.current.visible = scroll > 0.35 && scroll < 1.65;
    }
    experienceObjects.forEach((object, index) => {
      const group = balloons.current[index];
      if (!group) return;
      group.position.set((object.x - 0.5) * viewport.width + parallaxX,
        (scroll - 2 + 0.5 - object.y - (size.height <= 650 ? 0.14 : 0)) * viewport.height + drift * (index % 2 ? -1 : 1), 0);
      group.scale.setScalar(unit * object.scale * (hovered === object.experienceId ? 1.08 : 1));
      group.visible = scroll > 1.3 && scroll < 2.8;
    });
  });

  return (
    <>
      <group ref={blimp}><Airship /></group>
      {experienceObjects.map((object, index) => (
        <group key={object.experienceId} ref={(node) => { if (node) balloons.current[index] = node; }}>
          <PlaceholderBalloon color={object.color} />
        </group>
      ))}
    </>
  );
}

export default function SkyCanvas(props: SkyCanvasProps) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 42 }} dpr={[1, 1.5]}
      frameloop={props.motion ? "always" : "demand"} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[-4, 6, 5]} intensity={2.5} color="#fff0d4" />
      <directionalLight position={[4, -3, 2]} intensity={0.6} color="#83b1dd" />
      <Objects {...props} />
    </Canvas>
  );
}
