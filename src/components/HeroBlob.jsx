import { useEffect, useMemo, useRef } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const BlobMaterial = shaderMaterial(
  { uTime: 0, uMouse: new THREE.Vector2(0, 0), uOpacity: 1 },
  `
    varying vec3 vNormal;
    varying vec3 vWorld;
    uniform float uTime;
    uniform vec2 uMouse;

    float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
    float noise(vec3 p){
      vec3 i=floor(p); vec3 f=fract(p);
      f=f*f*(3.0-2.0*f);
      float n000 = hash(i+vec3(0,0,0));
      float n100 = hash(i+vec3(1,0,0));
      float n010 = hash(i+vec3(0,1,0));
      float n110 = hash(i+vec3(1,1,0));
      float n001 = hash(i+vec3(0,0,1));
      float n101 = hash(i+vec3(1,0,1));
      float n011 = hash(i+vec3(0,1,1));
      float n111 = hash(i+vec3(1,1,1));
      float nx00 = mix(n000,n100,f.x);
      float nx10 = mix(n010,n110,f.x);
      float nx01 = mix(n001,n101,f.x);
      float nx11 = mix(n011,n111,f.x);
      float nxy0 = mix(nx00,nx10,f.y);
      float nxy1 = mix(nx01,nx11,f.y);
      return mix(nxy0,nxy1,f.z);
    }

    void main() {
      vNormal = normal;
      vec3 pos = position;
      float n = noise(normalize(position) * 2.5 + vec3(0.0, 0.0, uTime * 0.4));
      float mouseLean = dot(normal.xy, uMouse) * 0.3;
      pos += normal * (n * 0.55 + mouseLean);
      vec4 world = modelMatrix * vec4(pos, 1.0);
      vWorld = world.xyz;
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `,
  `
    varying vec3 vNormal;
    varying vec3 vWorld;
    uniform float uOpacity;

    void main() {
      vec3 base = vec3(0.10, 0.04, 0.18);
      vec3 rimColor = vec3(1.0, 0.176, 0.47);
      vec3 topSpec = vec3(0.0, 0.94, 1.0);
      vec3 viewDir = normalize(cameraPosition - vWorld);
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.6);
      float topGlow = clamp((vNormal.y + 1.0) * 0.5, 0.0, 1.0);
      vec3 color = base + rimColor * fresnel * 0.85 + topSpec * pow(topGlow, 6.0) * 0.8;
      gl_FragColor = vec4(color, uOpacity);
    }
  `,
);

function BlobMesh({ scrollProgress, isMobile }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (isMobile) return undefined;
    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current.set(x, y);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    materialRef.current.uTime += delta;
    if (!isMobile) {
      materialRef.current.uMouse.lerp(mouseRef.current, 0.08);
    }
    const grow = THREE.MathUtils.lerp(1, 1.4, Math.min(scrollProgress / 0.5, 1));
    meshRef.current.scale.setScalar(grow);
    const fade = scrollProgress > 0.5 ? THREE.MathUtils.mapLinear(scrollProgress, 0.5, 1, 1, 0) : 1;
    materialRef.current.uOpacity = fade;
  });

  return (
    <mesh ref={meshRef} position={isMobile ? [0, 0.2, 0] : [0.9, 0.35, 0]}>
      <icosahedronGeometry args={[2.2, isMobile ? 3 : 6]} />
      <blobMaterial ref={materialRef} transparent />
    </mesh>
  );
}

export default function HeroBlob({ scrollProgress = 0, isMobile = false }) {
  const dpr = useMemo(() => (isMobile ? [1, 1.2] : [1, 2]), [isMobile]);
  return (
    <Canvas className="hero-blob-canvas" dpr={dpr} camera={{ position: [0, 0, 6], fov: 44 }}>
      <pointLight position={[3, 4, 5]} color="#ff2d78" intensity={8} />
      <pointLight position={[-3, -2, 3]} color="#b44dff" intensity={6} />
      <BlobMesh scrollProgress={scrollProgress} isMobile={isMobile} />
    </Canvas>
  );
}

extend({ BlobMaterial });
