"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { PlaceholderBalloon } from "./placeholder-balloon";
import { SceneFallback } from "./scene-fallback";
import { placeholderObjects } from "./scene-config";

function Objects() {
  const width = useThree((state) => state.viewport.width);

  return (
    <group scale={Math.min(1, width / 6.2)}>
      {placeholderObjects.map((object) => (
        <PlaceholderBalloon key={object.experienceId} {...object} />
      ))}
    </group>
  );
}

export default function SkyCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true }}
      fallback={<SceneFallback />}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[-3, 5, 4]} intensity={2} />
      <Objects />
    </Canvas>
  );
}
