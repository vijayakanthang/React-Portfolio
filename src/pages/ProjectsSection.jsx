import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaFileAlt, FaGithub, FaMicrochip } from "react-icons/fa";
import {
  DrawFreeCanvasPreview,
  InventoryCanvasPreview,
} from "../components/ProjectCanvasPreview";
import SectionHeader from "../components/SectionHeader";
import { projects } from "../data/siteContent";

const ProjectsAurora3D = lazy(() => import("../components/ProjectsAurora3D"));

function ProjectPreview({ project }) {
  if (project.preview === "canvas") {
    return (
      <div className="project-preview project-preview--canvas">
        <div className="canvas-mockup">
          <div className="canvas-mockup__toolbar">
            <span />
            <span />
            <span />
            <div className="canvas-mockup__tools">
              <span />
              <span />
              <span />
            </div>
          </div>
          <DrawFreeCanvasPreview />
        </div>
        <div className="project-preview-copy">
          {project.highlights?.map((item) => (
            <span key={item} className="project-preview-copy__item">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (project.preview === "phone") {
    return (
      <div className="project-preview project-preview--phone">
        <div className="phone-mockup">
          <span className="phone-notch" />
          <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
        </div>
      </div>
    );
  }

  if (project.preview === "chart") {
    return (
      <div className="project-preview project-preview--chart">
        <InventoryCanvasPreview />
      </div>
    );
  }

  return (
    <div className="project-preview project-preview--publication">
      <div className="publication-icon">
        <FaMicrochip />
      </div>
      <div className="publication-copy">
        <span className="publication-pill">Published</span>
        <h4>IEEE Xplore</h4>
        <p>{project.publication}</p>
      </div>
      <FaFileAlt className="publication-file" />
    </div>
  );
}

function ProjectLinks({ project }) {
  if (!project.live && !project.github && !project.publicationUrl) {
    return null;
  }

  return (
    <div className="project-links">
      {project.github ? (
        <a href={project.github} target="_blank" rel="noreferrer">
          <FaGithub />
          GitHub
        </a>
      ) : null}
      {project.live ? (
        <a href={project.live} target="_blank" rel="noreferrer">
          <FaExternalLinkAlt />
          Live Demo
        </a>
      ) : null}
      {project.publicationUrl ? (
        <a href={project.publicationUrl} target="_blank" rel="noreferrer">
          <FaFileAlt />
          Publication
        </a>
      ) : null}
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [shouldRenderScene, setShouldRenderScene] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldRenderScene) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderScene(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldRenderScene]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="page-section section section--projects"
    >
      {shouldRenderScene ? (
        <Suspense fallback={null}>
          <ProjectsAurora3D />
        </Suspense>
      ) : null}
      <div className="section-shell">
        <SectionHeader
          eyebrow="Projects"
          title={
            <>
              Immersive builds that feel cinematic, tactile, and <span>high-signal</span>
            </>
          }
          subtitle="A rebuilt project showcase with motion, depth, and stronger previews across creative tools, product UI, analytics, and published hardware work."
        />

        <div className="projects-bento">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              className={`bento-card bento-card--${project.layout}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <CardLinkOverlay project={project} />

              <div className="bento-card__header">
                <div>
                  <p className="bento-card__category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="bento-card__meta-line">{project.duration}</p>
                  <ProjectLinksInline project={project} />
                </div>
                <div className="bento-card__meta-chip">
                  <span className="bento-card__order">0{index + 1}</span>
                  <span className="bento-card__status">
                    {project.preview === "canvas"
                      ? "Live"
                      : project.preview === "chart"
                        ? "Data Viz"
                        : project.preview === "publication"
                          ? "Published"
                          : "Responsive"}
                  </span>
                </div>
              </div>

              <p className="bento-card__description">{project.description}</p>

              <ProjectPreview project={project} />

              <div className="bento-card__footer">
                <div className="project-tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-tech-list">
                  {project.tech.map((item) => (
                    <span key={item} className="project-tech-pill">
                      {item}
                    </span>
                  ))}
                </div>

                <ProjectLinks project={project} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardLinkOverlay({ project }) {
  const primaryLink = project.live || project.github || project.publicationUrl;
  if (!primaryLink) return null;

  return (
    <a
      className="bento-card__link-mask"
      href={primaryLink}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title}`}
    />
  );
}

function ProjectLinksInline({ project }) {
  const label = project.live ? "Open original" : project.github ? "View code" : "View paper";
  const href = project.live || project.github || project.publicationUrl;

  if (!href) return null;

  return (
    <a className="project-inline-link" href={href} target="_blank" rel="noreferrer">
      {label} <FaExternalLinkAlt />
    </a>
  );
}
