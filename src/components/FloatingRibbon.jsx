import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ribbon({ progress = 0 }) {
  const meshRef = useRef(null);
  const pathRef = useRef(
    [
      new THREE.Vector3(-6, 1.2, 0),
      new THREE.Vector3(-2, 2.4, 0.3),
      new THREE.Vector3(2, 0.3, -0.2),
      new THREE.Vector3(6, 1.4, 0),
    ],
  );

  const curve = useMemo(() => new THREE.CatmullRomCurve3(pathRef.current), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const pts = pathRef.current;
    pts[1].y = 1.8 + Math.sin(t * 0.7) * 0.7;
    pts[2].y = 0.5 + Math.cos(t * 0.9) * 0.8;
    curve.points = pts;
    const geo = new THREE.TubeGeometry(curve, 200, 0.04, 12, false);
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = geo;
    const draw = Math.max(10, Math.floor(geo.index.count * progress));
    meshRef.current.geometry.setDrawRange(0, draw);
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 200, 0.04, 12, false]} />
      <meshStandardMaterial color="#ff2d78" emissive="#ff2d78" emissiveIntensity={2} />
    </mesh>
  );
}

export default function FloatingRibbon({ progress = 1, simplified = false }) {
  if (simplified) return null;
  return (
    <div className="about-ribbon">
      <Canvas camera={{ position: [0, 0, 7], fov: 35 }}>
        <pointLight position={[2, 3, 4]} intensity={2} color="#ff2d78" />
        <Ribbon progress={progress} />
      </Canvas>
    </div>
  );
}