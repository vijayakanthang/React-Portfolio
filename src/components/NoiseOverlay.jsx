import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return undefined;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return undefined;

    canvas.width = 80;
    canvas.height = 80;

    const drawNoise = () => {
      const image = context.createImageData(canvas.width, canvas.height);
      const data = image.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 255);
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 56;
      }
      context.putImageData(image, 0, 0);
      overlay.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
    };

    drawNoise();
    const timer = window.setInterval(drawNoise, 100);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="noise-source-canvas" aria-hidden="true" />
      <div ref={overlayRef} className="noise-overlay" aria-hidden="true" />
    </>
  );
}
