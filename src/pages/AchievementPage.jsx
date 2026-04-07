import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { achievement } from "../data/siteContent";

function WaveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let frame = 0;

    const draw = (time) => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(bounds.width * ratio);
      canvas.height = Math.floor(bounds.height * ratio);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const width = bounds.width;
      const height = bounds.height;
      const elapsed = time * 0.002;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(0, 212, 255, 0.75)";
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 4) {
        const y = height / 2 + Math.sin(x * 0.025 + elapsed) * 18;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} className="ieee-wave-canvas" aria-hidden="true" />;
}

export default function AchievementPage() {
  return (
    <section id="achievements" className="page-section section section--achievements">
      <div className="section-shell">
        <a className="ieee-banner" href={achievement.url} target="_blank" rel="noreferrer">
          <div className="ieee-banner__left">
            <p className="mono">IEEE XPLORE</p>
            <h3>{achievement.title}</h3>
          </div>
          <div className="ieee-banner__right">
            <p>{achievement.summary}</p>
            <span className="ieee-banner__cta mono">
              Read Publication <FaArrowRight />
            </span>
          </div>
          <WaveCanvas />
        </a>
      </div>
    </section>
  );
}
