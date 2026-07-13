import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import {
  FiGithub, FiExternalLink, FiX, FiMinus, FiSquare,
  FiFolder, FiGlobe, FiDollarSign, FiBox, FiPenTool, FiUsers, FiCheckSquare,
  FiLinkedin, FiMail,
} from "react-icons/fi";
import { useStore } from "../../lib/store";
import { projects, links } from "../../data/profile";
import { useIsMobile } from "../../hooks/useMediaQuery";

const ICONS = {
  klamp: FiGlobe,
  draw: FiPenTool,
  strings: FiUsers,
  inventory: FiBox,
  expense: FiDollarSign,
  taskmanager: FiCheckSquare,
};

// initial spread of windows on the stage (clamped to bounds by react-rnd)
const LAYOUT = {
  klamp: { x: 24, y: 14, w: 470, h: 320 },
  draw: { x: 520, y: 24, w: 430, h: 290 },
  strings: { x: 150, y: 205, w: 410, h: 270 },
  inventory: { x: 580, y: 250, w: 420, h: 280 },
  expense: { x: 60, y: 360, w: 400, h: 250 },
  taskmanager: { x: 470, y: 360, w: 400, h: 250 },
};

// permissive enough that the user's own React/Next apps run inside the frame
const SANDBOX =
  "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals";

/* ---------- window chrome ---------- */
function WindowChrome({ p }) {
  const minimize = useStore((s) => s.minimizeWindow);
  const max = useStore((s) => s.toggleMaximize);
  const close = useStore((s) => s.closeWindow);
  const Icon = ICONS[p.id] || FiFolder;
  return (
    <div className="win-bar">
      <span className="win-ic"><Icon /></span>
      <span className="win-title">{p.title}{p.flagship && <em> · flagship</em>}</span>
      <div className="win-links">
        {p.repoUrl && (
          <a href={p.repoUrl} target="_blank" rel="noreferrer" aria-label="GitHub repository"><FiGithub /></a>
        )}
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label="Open live site"><FiExternalLink /></a>
        )}
      </div>
      <div className="win-ctrl">
        <button onClick={() => minimize(p.id)} aria-label={`Minimize ${p.title}`}><FiMinus /></button>
        <button onClick={() => max(p.id)} aria-label={`Maximize ${p.title}`}><FiSquare /></button>
        <button className="cls" onClick={() => close(p.id)} aria-label={`Close ${p.title}`}><FiX /></button>
      </div>
    </div>
  );
}

/* ---------- window body: always a live iframe ---------- */
function WindowBody({ p }) {
  return (
    <div className="win-body">
      {p.liveUrl ? (
        <>
          {/* sits behind the frame — visible while it loads, or if the site
              refuses to be embedded (X-Frame-Options / CSP) */}
          <div className="win-loading" aria-hidden="true">
            <span className="mono">LOADING //</span>
            <span className="win-loading-title">{p.title}</span>
            <a className="open-live" href={p.liveUrl} target="_blank" rel="noreferrer">
              open live <FiExternalLink />
            </a>
          </div>
          <iframe
            className="win-frame"
            title={p.title}
            src={p.liveUrl}
            loading="lazy"
            sandbox={SANDBOX}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </>
      ) : (
        <div className="win-empty">
          <p>No live preview available yet.</p>
          {p.repoUrl && (
            <a className="open-live" href={p.repoUrl} target="_blank" rel="noreferrer">view code <FiExternalLink /></a>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectWindows() {
  const windows = useStore((s) => s.windows);
  const openWindow = useStore((s) => s.openWindow);
  const focusWindow = useStore((s) => s.focusWindow);
  const isMobile = useIsMobile();
  const [dragging, setDragging] = useState(false); // disables iframe pointer events mid-drag

  // measure the stage so initial window rects never spawn clipped —
  // bounds="parent" only constrains dragging, not first placement
  const stageRef = useRef(null);
  const [stage, setStage] = useState(null);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const measure = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  const clampRect = (l) => {
    if (!stage) return l;
    const w = Math.min(l.w, Math.max(280, stage.w - 16));
    const h = Math.min(l.h, Math.max(190, stage.h - 16));
    return {
      w,
      h,
      x: Math.max(8, Math.min(l.x, stage.w - w - 8)),
      y: Math.max(8, Math.min(l.y, stage.h - h - 8)),
    };
  };

  // open every window once on mount
  useEffect(() => {
    projects.forEach((p) => openWindow(p.id, LAYOUT[p.id]));
  }, [openWindow]);

  // front-most, non-minimised window — highlights the sidebar/taskbar
  let activeId = null;
  let maxZ = -1;
  projects.forEach((p) => {
    const w = windows[p.id];
    if (w?.open && !w.minimized && (w.z ?? 0) > maxZ) { maxZ = w.z; activeId = p.id; }
  });

  /* ---------- mobile: simple stacked cards ---------- */
  if (isMobile) {
    return (
      <div className="win-stack">
        {projects.map((p) => (
          <div key={p.id} className={`win win-static${p.flagship ? " flagship" : ""}`}>
            <WindowChrome p={p} />
            <WindowBody p={p} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="projects-os">
      <header className="os-head">
        <h2><FiFolder /> PROJECT CONTROL CENTER</h2>
        <p>// ALL SYSTEMS OPERATIONAL</p>
      </header>

      <div className="os-body">
        {/* left sidebar */}
        <aside className="os-sidebar">
          <p className="os-side-h">// PROJECTS<span>{String(projects.length).padStart(2, "0")}</span></p>
          <ul>
            {projects.map((p) => {
              const w = windows[p.id] || {};
              const Icon = ICONS[p.id] || FiFolder;
              const isOpen = w.open && !w.minimized;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    className={`side-item${activeId === p.id ? " active" : ""}${isOpen ? " open" : ""}`}
                    onClick={() => openWindow(p.id, LAYOUT[p.id])}
                  >
                    <span className="side-ic"><Icon /></span>
                    <span className="side-meta">
                      <b>{p.title}</b>
                      <small>{p.tagline || p.tech.slice(0, 2).join(" · ")}</small>
                    </span>
                    <FiExternalLink className="side-open" />
                  </button>
                </li>
              );
            })}
          </ul>
          <a className="side-all" href={links.github} target="_blank" rel="noreferrer">+ VIEW ALL ON GITHUB</a>
        </aside>

        {/* window stage */}
        <div ref={stageRef} className={`os-stage${dragging ? " dragging" : ""}`}>
          {/* windows mount only after the stage is measured so first placement
              is already clamped inside it */}
          {stage && projects.map((p, i) => {
            const w = windows[p.id] || {};
            if (!w.open) return null;
            // fall back to a cascade if a project has no LAYOUT entry
            const l = clampRect(
              LAYOUT[p.id] || { x: 30 + i * 28, y: 24 + i * 28, w: 420, h: 280 }
            );
            const hidden = w.minimized || w.maximized;
            return (
              <Rnd
                key={p.id}
                default={{ x: l.x, y: l.y, width: l.w, height: l.h }}
                minWidth={280}
                minHeight={190}
                bounds="parent"
                dragHandleClassName="win-bar"
                cancel=".win-ctrl,.win-links"
                style={{ zIndex: w.z, display: hidden ? "none" : undefined }}
                onDragStart={() => { focusWindow(p.id); setDragging(true); }}
                onDragStop={() => setDragging(false)}
                onResizeStart={() => { focusWindow(p.id); setDragging(true); }}
                onResizeStop={() => setDragging(false)}
                onMouseDown={() => focusWindow(p.id)}
              >
                <div className={`win${p.flagship ? " flagship" : ""}`}>
                  <WindowChrome p={p} />
                  {/* when maximised the iframe lives in the overlay below — don't
                      mount a second copy here (avoids duplicate live embeds) */}
                  {!w.maximized && <WindowBody p={p} />}
                </div>
              </Rnd>
            );
          })}

          {/* maximised overlay (fills the stage) */}
          {projects.map((p) => {
            const w = windows[p.id] || {};
            if (!w.open || !w.maximized) return null;
            return (
              <div
                key={`max-${p.id}`}
                className={`win win-max${p.flagship ? " flagship" : ""}`}
                style={{ zIndex: w.z }}
                onMouseDown={() => focusWindow(p.id)}
              >
                <WindowChrome p={p} />
                <WindowBody p={p} />
              </div>
            );
          })}
        </div>
      </div>

      {/* taskbar — minimised windows live here; click to restore */}
      <footer className="os-taskbar">
        <span className="tb-start"><FiFolder /> PROJECTS</span>
        <div className="tb-windows">
          {projects.filter((p) => windows[p.id]?.open).map((p) => {
            const w = windows[p.id];
            const Icon = ICONS[p.id] || FiFolder;
            const cls = w.minimized ? " min" : activeId === p.id ? " active" : "";
            return (
              <button key={p.id} type="button" className={`tb-win${cls}`} onClick={() => openWindow(p.id, LAYOUT[p.id])} title={p.title}>
                <Icon /> <span>{p.title}</span>
              </button>
            );
          })}
        </div>
        <div className="tb-links">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href={`mailto:${links.email}`} aria-label="Email"><FiMail /></a>
        </div>
      </footer>
    </div>
  );
}
