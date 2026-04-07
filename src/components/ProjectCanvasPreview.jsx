import { useEffect, useRef } from "react";

function fitCanvas(canvas) {
  const bounds = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(bounds.width * ratio);
  canvas.height = Math.floor(bounds.height * ratio);

  const context = canvas.getContext("2d");
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  return {
    context,
    width: bounds.width,
    height: bounds.height,
  };
}

export function DrawFreeCanvasPreview() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    let animationFrame = 0;

    const render = (time) => {
      const { context, width, height } = fitCanvas(canvas);
      const seconds = time * 0.001;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#07111a";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(255,255,255,0.06)";
      context.lineWidth = 1;

      for (let x = 0; x <= width; x += 28) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y <= height; y += 28) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.lineCap = "round";
      context.lineJoin = "round";

      const strokes = [
        {
          color: "#73f0ff",
          width: 6,
          points: [
            [width * 0.13, height * 0.28],
            [width * 0.28, height * 0.19],
            [width * 0.43, height * 0.33],
            [width * 0.56, height * 0.21],
          ],
        },
        {
          color: "#ff8f45",
          width: 8,
          points: [
            [width * 0.18, height * 0.67],
            [width * 0.34, height * 0.56],
            [width * 0.46, height * 0.7],
            [width * 0.66, height * 0.51],
          ],
        },
        {
          color: "#9c7cff",
          width: 4,
          points: [
            [width * 0.7, height * 0.24],
            [width * 0.82, height * 0.31],
            [width * 0.76, height * 0.44],
            [width * 0.86, height * 0.57],
          ],
        },
      ];

      strokes.forEach((stroke, strokeIndex) => {
        const reveal = Math.min(1, (seconds * 0.3 + strokeIndex * 0.28) % 1.35);
        const visibleCount = Math.max(2, Math.floor(stroke.points.length * reveal));

        context.strokeStyle = stroke.color;
        context.lineWidth = stroke.width;
        context.beginPath();

        stroke.points.slice(0, visibleCount).forEach(([x, y], pointIndex) => {
          if (pointIndex === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });

        context.stroke();
      });

      const pulse = 0.5 + Math.sin(seconds * 2.6) * 0.5;
      context.fillStyle = `rgba(255, 143, 69, ${0.18 + pulse * 0.18})`;
      context.beginPath();
      context.arc(width * 0.78, height * 0.75, 42 + pulse * 10, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = "rgba(255,255,255,0.08)";
      context.fillRect(width * 0.62, height * 0.66, 122, 54);
      context.fillStyle = "#f8fbff";
      context.font = "600 15px Outfit";
      context.fillText("Draw Free", width * 0.66, height * 0.74);
      context.fillStyle = "#9fb1c5";
      context.font = "12px JetBrains Mono";
      context.fillText("live canvas board", width * 0.66, height * 0.81);

      animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} className="project-canvas project-canvas--draw" />;
}

export function InventoryCanvasPreview() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    let animationFrame = 0;

    const render = (time) => {
      const { context, width, height } = fitCanvas(canvas);
      const seconds = time * 0.001;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0a1019";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(255,255,255,0.07)";
      context.lineWidth = 1;
      for (let index = 1; index < 5; index += 1) {
        const y = (height / 5) * index;
        context.beginPath();
        context.moveTo(18, y);
        context.lineTo(width - 18, y);
        context.stroke();
      }

      const bars = [0.45, 0.76, 0.58, 0.9, 0.68, 0.54];
      const barWidth = (width - 54) / bars.length - 10;

      bars.forEach((value, index) => {
        const wobble = 0.06 * Math.sin(seconds * 1.8 + index * 0.55);
        const heightFactor = Math.max(0.28, value + wobble);
        const barHeight = heightFactor * (height - 46);
        const x = 26 + index * (barWidth + 10);
        const y = height - barHeight - 14;

        const gradient = context.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, "#73f0ff");
        gradient.addColorStop(1, "#ff8f45");
        context.fillStyle = gradient;
        context.fillRect(x, y, barWidth, barHeight);
      });

      context.beginPath();
      context.strokeStyle = "#9c7cff";
      context.lineWidth = 3;

      [0.34, 0.52, 0.41, 0.78, 0.63, 0.86].forEach((value, index) => {
        const x = 26 + index * (barWidth + 10) + barWidth / 2;
        const y = height - value * (height - 54) - 22 - Math.sin(seconds * 1.5 + index) * 6;

        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });

      context.stroke();

      animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} className="project-canvas project-canvas--inventory" />;
}
