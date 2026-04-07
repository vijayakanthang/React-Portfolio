import { Html, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";

function OrbitRing({ ring, paused, hoveredKey, onHover, onLeave }) {
  const angleRef = useRef(0);
  const nodeRefs = useRef([]);
  const angles = useMemo(
    () => ring.items.map((_, index) => (index / ring.items.length) * Math.PI * 2),
    [ring.items],
  );

  useFrame(() => {
    if (!paused) {
      angleRef.current += ring.speed;
    }

    nodeRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const angle = angles[index] + angleRef.current;
      mesh.position.set(
        Math.cos(angle) * ring.radius,
        Math.sin(angle) * ring.radius,
        Math.sin(angle * 1.4) * 0.25,
      );
    });
  });

  return (
    <group>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[ring.radius, 0.01, 8, 96]} />
        <meshStandardMaterial color={ring.color} transparent opacity={0.35} />
      </mesh>

      {ring.items.map((item, index) => (
        <mesh
          key={`${ring.title}-${item.name}`}
          ref={(node) => {
            nodeRefs.current[index] = node;
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            onHover({
              key: `${ring.title}-${item.name}`,
              label: item.name,
              detail: item.detail,
              position: [event.object.position.x, event.object.position.y, event.object.position.z],
            });
          }}
          onPointerOut={onLeave}
        >
          <sphereGeometry args={[hoveredKey === `${ring.title}-${item.name}` ? 0.22 : 0.12, 20, 20]} />
          <meshStandardMaterial color={ring.color} emissive={ring.color} emissiveIntensity={1.4} />
          <Html center distanceFactor={12}>
            <span className="orbit-node-label mono">{item.name}</span>
          </Html>
        </mesh>
      ))}
    </group>
  );
}

function OrbitScene({ rings, hovered, setHovered }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[0, 0, 8]} intensity={9} color="#ffffff" />
      <pointLight position={[3, 2, 7]} intensity={6} color="#00d4ff" />

      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#f0f4ff" emissive="#ffffff" emissiveIntensity={1.2} />
        <Html center distanceFactor={10}>
          <span className="orbit-center-label mono">VG</span>
        </Html>
      </mesh>

      {rings.map((ring) => (
        <OrbitRing
          key={ring.title}
          ring={ring}
          paused={Boolean(hovered)}
          hoveredKey={hovered?.key}
          onHover={setHovered}
          onLeave={() => setHovered(null)}
        />
      ))}

      {hovered ? (
        <Line
          points={[
            [0, 0, 0],
            hovered.position,
          ]}
          color="#00d4ff"
          transparent
          opacity={0.9}
          lineWidth={2}
        />
      ) : null}
    </>
  );
}

export default function SkillsOrbitCanvas({ rings, onHoverDetail }) {
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (typeof onHoverDetail === "function") onHoverDetail(hovered);
  }, [hovered, onHoverDetail]);

  return (
    <div className="skills-orbit-canvas-wrap" aria-label="Skills orbital scene">
      <Canvas
        gl={{ powerPreference: "high-performance", antialias: false }}
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
      >
        <OrbitScene rings={rings} hovered={hovered} setHovered={setHovered} />
      </Canvas>
    </div>
  );
}
