import { Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function SolarScene({ groups, hovered, setHovered, enableTilt }) {
  const rootRef = useRef(null);
  const sunRef = useRef(null);
  const planetsRef = useRef([]);
  const { camera } = useThree();

  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!enableTilt) return undefined;
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enableTilt]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.004;
      sunRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.03);
    }

    groups.forEach((group, index) => {
      const planet = planetsRef.current[index];
      if (!planet) return;
      const angle = t * group.speed * 60 + index;
      planet.position.set(Math.cos(angle) * group.radius, 0, Math.sin(angle) * group.radius);
      planet.scale.setScalar(hovered?.title === group.title ? 1.4 : 1);
      planet.children.forEach((child, moonIndex) => {
        const moonAngle = t * 1.2 + moonIndex;
        child.position.set(Math.cos(moonAngle) * 0.5, Math.sin(moonAngle) * 0.15, Math.sin(moonAngle) * 0.5);
      });
    });

    if (enableTilt) {
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, mouse.current.y * 0.3, 0.03);
      camera.rotation.y += 0.0003;
    }

    const targetZ = hovered ? 11 : 14;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);
  });

  return (
    <group ref={rootRef}>
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#fff5aa" emissive="#ffb347" emissiveIntensity={2.4} />
        <Html center position={[0, 0.9, 0]}>
          <span className="solar-vg">VG</span>
        </Html>
      </mesh>
      <pointLight intensity={12} color="#fff5aa" />

      {groups.map((group, index) => (
        <group key={group.title} ref={(node) => (planetsRef.current[index] = node)}>
          <mesh onPointerOver={() => setHovered(group)} onPointerOut={() => setHovered(null)}>
            <sphereGeometry args={[group.size, 24, 24]} />
            <meshStandardMaterial
              color={group.color}
              transparent
              opacity={hovered && hovered.title !== group.title ? 0.25 : 1}
              emissive={group.color}
              emissiveIntensity={hovered?.title === group.title ? 1.4 : 0.6}
            />
          </mesh>
          {group.items.map((item) => (
            <mesh key={item}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color="#f3f3f3" />
              <Html center position={[0, 0.16, 0]}>
                <span className="moon-label">{item}</span>
              </Html>
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

export default function SolarSystem({ groups, hovered, setHovered, isMobile }) {
  return (
    <Canvas className="solar-canvas" camera={{ position: [0, 8, 14], fov: 40 }}>
      <ambientLight intensity={0.15} />
      <SolarScene groups={groups} hovered={hovered} setHovered={setHovered} enableTilt={!isMobile} />
    </Canvas>
  );
}
