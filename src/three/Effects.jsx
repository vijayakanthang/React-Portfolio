import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/**
 * Standard neon glow post-processing. Skip `vignette` on transparent
 * (alpha) canvases so the page content behind doesn't get dark corners.
 */
export default function Effects({ intensity = 0.85, vignette = false }) {
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <Bloom
        intensity={intensity}
        luminanceThreshold={0.18}
        luminanceSmoothing={0.85}
        mipmapBlur
      />
      {vignette && <Vignette eskil={false} offset={0.25} darkness={0.72} />}
    </EffectComposer>
  );
}
