import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaExternalLinkAlt, FaFileAlt, FaGithub } from "react-icons/fa";
import { useMotionPreferences } from "../hooks/useMotionPreferences";
import { useScrollScene } from "../hooks/useScrollScene";

function DrawFreeVisual({ progress }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(bounds.width * ratio);
      canvas.height = Math.floor(bounds.height * ratio);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const width = bounds.width;
      const height = bounds.height;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#090f18";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const cx = width * 0.52;
      const cy = height * 0.54;
      const turns = 4;
      const maxAngle = progress * Math.PI * 2 * turns;
      const radiusStep = Math.min(width, height) * 0.032;

      ctx.beginPath();
      for (let angle = 0; angle <= maxAngle; angle += 0.02) {
        const radius = (angle / (Math.PI * 2)) * radiusStep;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineWidth = 3.8;
      ctx.strokeStyle = "#00d4ff";
      ctx.shadowColor = "rgba(0,212,255,0.7)";
      ctx.shadowBlur = 24;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [progress]);

  return (
    <div className="project-visual project-visual--draw">
      <canvas ref={canvasRef} className="project-canvas project-canvas--spiral" />
    </div>
  );
}

function StringsVisual({ progress }) {
  const messages = useMemo(
    () => ["Hey, pushing a new build now.", "Love the clean feed layout.", "Auth works great on mobile.", "Ship it now."],
    [],
  );
  const visibleCount = Math.max(1, Math.ceil(progress * messages.length));

  return (
    <div className="project-visual project-visual--strings">
      <div className="strings-bg-bubbles" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="strings-phone" style={{ opacity: 0.25 + progress * 0.75 }}>
        <header className="strings-phone__header mono">@strings</header>
        <div className="strings-phone__messages">
          {messages.map((message, index) => (
            <p key={message} className={index < visibleCount ? "is-visible" : ""}>
              {message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function InventoryVisual({ progress }) {
  const canvasRef = useRef(null);
  const bars = useMemo(() => [0.35, 0.56, 0.42, 0.8, 0.65], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(bounds.width * ratio);
      canvas.height = Math.floor(bounds.height * ratio);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const width = bounds.width;
      const height = bounds.height;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#090f18";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      for (let i = 1; i < 6; i += 1) {
        const y = (height / 6) * i;
        ctx.beginPath();
        ctx.moveTo(18, y);
        ctx.lineTo(width - 18, y);
        ctx.stroke();
      }

      const segment = 1 / bars.length;
      const barWidth = (width - 60) / bars.length - 10;

      bars.forEach((barHeight, index) => {
        const start = segment * index;
        const localProgress = Math.min(1, Math.max(0, (progress - start) / segment));
        const visibleHeight = barHeight * (height - 56) * localProgress;
        const x = 24 + index * (barWidth + 10);
        const y = height - visibleHeight - 16;
        const gradient = ctx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, "#00d4ff");
        gradient.addColorStop(1, "#7c3aed");
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, visibleHeight);
      });
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [bars, progress]);

  return (
    <div className="project-visual project-visual--inventory">
      <canvas ref={canvasRef} className="project-canvas project-canvas--inventory-build" />
    </div>
  );
}

function IeeeVisual({ progress }) {
  const rippleScale = 1 + progress * 1.5;
  const rippleOpacity = Math.max(0.12, 0.75 - progress * 0.6);

  return (
    <div className="project-visual project-visual--ieee">
      <svg viewBox="0 0 460 320" className="ieee-schematic" aria-hidden="true">
        <rect x="50" y="112" width="120" height="90" rx="12" className="ieee-node" />
        <rect x="290" y="92" width="130" height="130" rx="14" className="ieee-node" />
        <line x1="170" y1="157" x2="290" y2="157" className="ieee-line" />
        <circle cx="110" cy="157" r="18" className="ieee-sensor" />
        <circle
          cx="110"
          cy="157"
          r={32}
          style={{
            transformOrigin: "110px 157px",
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
          className="ieee-ripple"
        />
        <path d="M320 142 C 340 130, 360 130, 382 142" className="ieee-servo" />
      </svg>
    </div>
  );
}

function ProjectVisualBlock({ project, progress }) {
  switch (project.slug) {
    case "draw-free":
      return <DrawFreeVisual progress={progress} />;
    case "strings":
      return <StringsVisual progress={progress} />;
    case "inventory":
      return <InventoryVisual progress={progress} />;
    default:
      return <IeeeVisual progress={progress} />;
  }
}

function ProjectPrimaryLink({ project }) {
  if (project.slug === "smart-sanitizing-toilet" && project.publicationUrl) {
    return (
      <a href={project.publicationUrl} target="_blank" rel="noreferrer" className="project-scene__cta">
        <FaFileAlt />
        Read Paper →
      </a>
    );
  }

  if (project.live) {
    return (
      <a href={project.live} target="_blank" rel="noreferrer" className="project-scene__cta">
        <FaExternalLinkAlt />
        Try it live →
      </a>
    );
  }

  if (project.github) {
    return (
      <a href={project.github} target="_blank" rel="noreferrer" className="project-scene__cta">
        <FaGithub />
        View code →
      </a>
    );
  }

  return null;
}

export default function ProjectScrollScene({ project, index }) {
  const { isDesktop, prefersReducedMotion } = useMotionPreferences();
  const [progress, setProgress] = useState(0);
  const usePinnedScene = isDesktop && !prefersReducedMotion;
  const { ref, tl, isReady } = useScrollScene({
    scrubSpeed: 1.2,
    end: "+=150%",
    disabled: !usePinnedScene,
    onUpdate: setProgress,
  });

  useEffect(() => {
    if (!usePinnedScene || !isReady || !tl.current || !ref.current) return undefined;

    const ctx = gsap.context(() => {
      const timeline = tl.current;
      timeline.clear();
      timeline
        .fromTo(
          ".project-scene__copy > *",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.18 },
          0.05,
        )
        .fromTo(".project-scene__visual", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.24 }, 0.18);
    }, ref);

    return () => ctx.revert();
  }, [isReady, ref, tl, usePinnedScene]);

  const order = String(index + 1).padStart(2, "0");

  return (
    <article ref={ref} className="project-scene" data-project={project.slug}>
      <div className="project-scene__content">
        <div className="project-scene__copy">
          <p className="project-scene__order mono">
            {order} / <span>{project.title.toUpperCase()}</span>
          </p>
          <p className="project-scene__category mono">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="project-scene__description">{project.description}</p>

          <div className="project-scene__tags">
            {project.tech.map((tech) => (
              <span key={tech} className="project-tech-pill">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-scene__actions">
            <ProjectPrimaryLink project={project} />
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="project-scene__ghost">
                <FaGithub />
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        <div className="project-scene__visual">
          <ProjectVisualBlock project={project} progress={progress} />
        </div>
      </div>
    </article>
  );
}
