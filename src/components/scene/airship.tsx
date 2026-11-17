import { DoubleSide, Shape } from "three";

const fin = new Shape();
fin.moveTo(-0.45, 0);
fin.lineTo(-0.25, 0.8);
fin.quadraticCurveTo(0.1, 0.7, 0.5, 0);
fin.closePath();

export function Airship() {
  return (
    <group rotation={[0.08, -0.2, -0.09]}>
      <mesh scale={[2.6, 0.79, 0.8]}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshStandardMaterial color="#e3ddca" roughness={0.63} metalness={0.12} />
      </mesh>
      {[-1.6, -0.8, 0, 0.8, 1.6].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]}>
          <torusGeometry args={[0.8 * Math.sqrt(1 - (x / 2.6) ** 2), 0.009, 4, 64]} />
          <meshStandardMaterial color="#b5ab95" roughness={1} />
        </mesh>
      ))}
      <mesh position={[-0.2, -0.77, 0]}>
        <boxGeometry args={[0.86, 0.23, 0.35]} />
        <meshStandardMaterial color="#6e786f" metalness={0.4} roughness={0.55} />
      </mesh>
      {[-0.46, -0.22, 0.02].map((x) => (
        <mesh key={x} position={[x, -0.74, 0.181]}>
          <planeGeometry args={[0.14, 0.09]} />
          <meshStandardMaterial color="#172b35" />
        </mesh>
      ))}
      <mesh position={[-2.05, 0.3, 0]}>
        <shapeGeometry args={[fin]} />
        <meshStandardMaterial color="#a37656" roughness={0.8} side={DoubleSide} />
      </mesh>
      {[-1, 1].map((side) => <mesh key={side} position={[-2.05, 0, side * 0.3]} rotation={[side * Math.PI / 2, 0, 0]}>
        <shapeGeometry args={[fin]} />
        <meshStandardMaterial color="#b99473" roughness={0.8} side={DoubleSide} />
      </mesh>)}
    </group>
  );
}
