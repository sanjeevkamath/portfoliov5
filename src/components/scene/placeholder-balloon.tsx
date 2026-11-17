import { useMemo } from "react";
import { Color, LatheGeometry, SplineCurve, Vector2 } from "three";

type BalloonProps = { color: string };

export function PlaceholderBalloon({ color }: BalloonProps) {
  const geometry = useMemo(() => {
    const profile = [
      [0.14, -0.91], [0.23, -0.72], [0.43, -0.43], [0.64, -0.08],
      [0.76, 0.32], [0.75, 0.63], [0.61, 0.92], [0.35, 1.1], [0, 1.17],
    ].map(([x, y]) => new Vector2(x, y));
    return new LatheGeometry(new SplineCurve(profile).getPoints(64), 64);
  }, []);
  const pale = new Color("#f3e8cc");
  // Alternating longitudinal panels, with a subtle fabric seam in each gore.
  return (
    <group rotation={[0.06, 0.24, -0.05]}>
      <mesh geometry={geometry}>
        <shaderMaterial
          uniforms={{ colorA: { value: new Color(color) }, colorB: { value: pale } }}
          vertexShader={`varying vec2 vUv; varying vec3 vNormal;
            void main(){vUv=uv;vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
          fragmentShader={`uniform vec3 colorA; uniform vec3 colorB; varying vec2 vUv; varying vec3 vNormal;
            void main(){float panel=floor(vUv.x*16.);float stripe=mod(panel,2.);float seam=smoothstep(.0,.07,fract(vUv.x*16.))*(1.-smoothstep(.93,1.,fract(vUv.x*16.)));float light=.46+.54*max(0.,dot(normalize(vNormal),normalize(vec3(-.5,.8,1.))));vec3 color=mix(colorA,colorB,stripe)*light*(.88+.12*seam);gl_FragColor=vec4(color,1.);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
            }`}
        />
      </mesh>
      {[-0.16, 0.16].flatMap((x) => [-0.12, 0.12].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, -1.08, z]}>
          <cylinderGeometry args={[0.009, 0.009, 0.45, 4]} />
          <meshStandardMaterial color="#594b37" />
        </mesh>
      )))}
      <mesh position={[0, -1.35, 0]}>
        <boxGeometry args={[0.37, 0.28, 0.3]} />
        <meshStandardMaterial color="#856444" roughness={1} />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[0.4, 0.04, 0.33]} />
        <meshStandardMaterial color="#b89b6d" />
      </mesh>
    </group>
  );
}
