import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: "React", orbit: 2, speed: 0.5, color: "#00f0ff" },
  { name: "Node", orbit: 3, speed: 0.3, color: "#aaff00" },
  { name: "MongoDB", orbit: 3, speed: 0.4, color: "#ff2d78" },
  { name: "Express", orbit: 4, speed: 0.2, color: "#b44dff" },
  { name: "Tailwind", orbit: 2, speed: 0.6, color: "#00f0ff" },
  { name: "GSAP", orbit: 1.5, speed: 0.8, color: "#ff2d78" },
  { name: "Three.js", orbit: 2.5, speed: 0.4, color: "#00f0ff" },
];

const Orbit = ({ radius, color = "white" }) => {
  const points = useMemo(() => {
    return new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0).getPoints(64);
  }, [radius]);

  return <Line points={points} color={color} opacity={0.1} transparent lineWidth={1} rotation={[-Math.PI / 2, 0, 0]} />;
};

const SkillNode = ({ name, orbit, speed, color }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const angle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (hovered) return;
    const time = state.clock.getElapsedTime() * speed;
    const curAngle = angle + time;
    meshRef.current.position.set(
      Math.cos(curAngle) * orbit,
      Math.sin(curAngle * 0.5) * 0.5,
      Math.sin(curAngle) * orbit
    );
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere 
          args={[0.2, 16, 16]} 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 2 : 0.5} 
          />
        </Sphere>
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          visible={hovered}
        >
          {name}
        </Text>
      </Float>
    </group>
  );
};

const SkillsCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 5, 8], fov: 45 }} className="w-full h-[600px]">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#b44dff" />
      
      {/* Central Node */}
      <Float speed={1} rotationIntensity={0.1}>
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial color="#b44dff" emissive="#b44dff" emissiveIntensity={1} />
        </Sphere>
      </Float>

      {/* Orbits and Skills */}
      {[1.5, 2, 2.5, 3, 4].map((r, i) => <Orbit key={i} radius={r} color="white" />)}
      
      {skills.map((skill, i) => (
        <SkillNode key={i} {...skill} />
      ))}
    </Canvas>
  );
};

const SkillsSection = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="section-full bg-bg-deep pt-20">
      <div className="container-wide">
        <h2 className="text-center text-white/50 uppercase tracking-[1em] mb-20 select-none">Skill Orbit</h2>
        
        <div className="relative glass-card rounded-3xl overflow-hidden min-h-[600px] border border-white/5">
          {isVisible && <SkillsCanvas />}
          
          <div className="absolute top-10 left-10 text-left pointer-events-none z-10">
            <h3 className="text-neon-cyan uppercase text-xs tracking-widest">Orbital System</h3>
            <p className="text-text-secondary text-[10px] mt-1 uppercase">Active Interactive visualization</p>
          </div>
          
          <div className="absolute bottom-10 right-10 flex flex-col items-end pointer-events-none z-10 text-right">
            <p className="text-white/20 text-[10px] uppercase max-w-[200px]">
              Core technologies mapped across orbital resonance frequencies.
              Hover nodes to interact.
            </p>
          </div>
        </div>

        {/* Existing Radar Chart placeholder as requested */}
        <div className="mt-20 flex justify-center">
          <div className="glass-card p-12 rounded-3xl w-full max-w-2xl border border-white/5">
            <h3 className="text-center text-neon-pink uppercase tracking-widest text-xs mb-8">Skill Proficiency Matrix</h3>
            <div className="h-48 flex items-center justify-center border border-white/10 rounded-xl bg-white/5 italic text-white/20">
              [ Existing RadarChart.jsx Integration Placeholder ]
            </div>
            <p className="text-center text-text-secondary text-[10px] mt-4 uppercase">Data synthesized from active project commits</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
