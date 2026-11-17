type PlaceholderBalloonProps = {
  position: [number, number, number];
  scale: number;
  color: string;
};

// Built-in geometry only: a volume, suspension lines, and a basket block.
// No animation or portfolio content belongs in this component.
export function PlaceholderBalloon({ position, scale, color }: PlaceholderBalloonProps) {
  return (
    <group position={position} scale={scale}>
      <mesh scale={[0.72, 0.95, 0.72]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color={color} flatShading roughness={1} />
      </mesh>
      {[-0.16, 0.16].map((x) => (
        <mesh key={x} position={[x, -1.03, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.42, 4]} />
          <meshStandardMaterial color="#756958" />
        </mesh>
      ))}
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[0.36, 0.26, 0.3]} />
        <meshStandardMaterial color="#a48c70" roughness={1} />
      </mesh>
    </group>
  );
}
