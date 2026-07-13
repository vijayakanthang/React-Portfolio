// ============================================================
//  Vijay Kanthan — single source of truth for all content.
//  Edit here; every scene + the SEO fallback reads from this.
// ============================================================

export const identity = {
  name: "VijayaKanthan G",
  firstName: "VIJAYAKANTHAN ",
  lastName: "G",
  initials: "VG",
  title: "Frontend / Full-Stack Engineer",
  subtitle: "Next.js · React · TypeScript — technical-SEO focus",
  flavorTitles: ["Electrical Engineer", "Full Stack Developer", "Tech Enthusiast"],
  location: "Chennai, India",
};

// Career / education log — newest first. `period` and `detail` are optional.
// Canonical career data; currently surfaced via the About career trace and
// kept here for the parked "// LOG" timeline + SEO.
export const experienceLog = [
  {
    id: "arbaan",
    org: "Arbaan GT",
    role: "Frontend / Full-Stack Engineer · Klamp.ai",
    period: "Dec 2025 — present",
    detail: "Next.js 14 · React 18 · TypeScript · Strapi · GCP · Vercel",
  },
  {
    id: "accenture",
    org: "Accenture",
    role: "Azure Security Intern",
    period: "Feb 2025 — Jun 2025",
    detail: "AZ-500 · Privileged Identity Management · least-privilege access",
  },
  {
    id: "kit",
    org: "Karpagam Institute of Technology",
    role: "B.E. Electrical & Electronics Engineering",
    period: "2021 — 2025",
    detail: "CGPA 7.62 / 10 · Coimbatore",
  },
  {
    id: "ieee",
    org: "IEEE Xplore",
    role: "Publication — Smart Sanitizing Toilet",
    detail: "Touchless, UV-disinfected, self-cleaning hygiene system",
  },
];

export const certifications = [
  "React Basics — Meta",
  "Django Web Framework — Coursera",
  "MongoDB for Students — MongoDB",
  "Developing Soft Skills — NPTEL",
];

export const links = {
  github: "https://github.com/Vijayakanthang",
  linkedin: "https://www.linkedin.com/in/vijayakanthang",
  portfolio: "https://vijayakanthang.netlify.app",
  email: "vijayakanthang@gmail.com",
  phone: "9952103324", // add when available
};

// Skills — grouped tech stack. No levels/percentages; just what's used.
// `icon` maps to an icon in SkillsHUD's ICON registry.
export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "code",
    skills: ["React.js", "Next.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    skills: ["Node.js", "Express.js", "REST APIs", "Django", "Socket.io"],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "database",
    skills: ["MongoDB", "MySQL"],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: "cloud",
    skills: ["Git", "GitHub", "Docker", "Vercel", "Netlify", "Strapi CMS"],
  },
  {
    id: "languages",
    title: "Languages",
    icon: "terminal",
    skills: ["JavaScript", "TypeScript", "Python", "Java"],
  },
  {
    id: "engineering",
    title: "Engineering",
    icon: "cpu",
    skills: ["Data Structures", "Algorithms", "OOP", "API Design", "Performance", "Problem Solving"],
  },
];

// Measurable engineering signal shown under the skills grid (no fake scores).
export const engineeringSignal = {
  metric: "300+ LeetCode problems solved",
  note: "Strong in DSA & Problem Solving",
};

// ---- About section ----------------------------------------------------

// One-line intro under the ABOUT heading.
export const aboutIntro =
  "Full-Stack Developer building fast, scalable and user-focused digital products.";

// Minimal identity rows (left column). `icon` maps to SkillsHUD's ICON registry.
export const identityRows = [
  { id: "exp", icon: "calendar", label: "Experience", value: "1+ Years", sub: "Professional + Internship" },
  { id: "loc", icon: "pin", label: "Location", value: "Chennai, India" },
  { id: "focus", icon: "target", label: "Focus", value: "Frontend / Full-Stack Engineering" },
  { id: "status", icon: "signal", label: "Status", value: "Open to Opportunities" },
];

// "MY JOURNEY" panel copy.
export const journey = [
  "I'm a Full-Stack Developer focused on building fast, scalable and user-friendly web applications.",
  "My professional work spans React, Next.js, TypeScript, SEO, Core Web Vitals, Strapi CMS and API development. I enjoy turning complex requirements into simple, reliable digital experiences.",
  "Beyond production work, I continuously strengthen my problem-solving skills through Data Structures and Algorithms and have solved 300+ LeetCode problems.",
];

// Proof-of-work blocks — demonstrated areas, not vanity metrics.
export const proofOfWork = [
  { id: "prod", icon: "code", word: "PRODUCTION", label: "Next.js / React" },
  { id: "dsa", icon: "cpu", word: "DSA", label: "300+ Problems" },
  { id: "backend", icon: "server", word: "BACKEND", label: "APIs & Automation" },
  { id: "cloud", icon: "cloud", word: "CLOUD", label: "Azure Security" },
];

// Minimal horizontal career trace (oldest → newest).
export const careerTrace = [
  { id: "accenture", year: "2025", org: "Accenture", role: "Azure Security" },
  { id: "klamp", year: "2025 — Present", org: "Klamp.ai", role: "Frontend / Full-Stack" },
];

// Closing quote strip that leads About into Skills.
export const aboutQuote =
  "Code is not just what I write — it's how I solve problems and turn ideas into useful products.";

// Projects — Klamp.ai is the flagship; others supply range.
// embeddable: whether a live <iframe> is allowed (controlled headers) — else use thumbnail.
export const projects = [
  // {
  //   id: "klamp",
  //   title: "Klamp.ai Marketing Platform",
  //   tagline: "Marketing Platform · Next.js",
  //   flagship: true,
  //   blurb:
  //     "Flagship. Technical SEO across 350+ pages, server-side anti-bot form hardening, performance optimisation and CI/CD.",
  //   tech: ["Next.js 14", "React 18", "TypeScript", "Strapi", "GCP Cloud Run", "Vercel"],
  //   repoUrl: "",
  //   liveUrl: "https://www.klamp.ai",
  //   embeddable: false,
  //   thumbnail: "/taskmanger.png",
  // },
  {
    id: "draw",
    title: "DoodleRoom",
    tagline: "Collaborative Drawing App",
    blurb:
      "Real-time collaborative whiteboard — draw, sketch, and create together with a smooth canvas experience.",
    tech: ["Next.js", "TypeScript", "Canvas API", "WebSocket", "Vercel"],
    repoUrl: "https://github.com/vijayakanthang/Draw",
    liveUrl: "https://doodleroom.vercel.app",
    embeddable: false,
    thumbnail: "/inv-graph.png",
  },
  {
    id: "strings",
    title: "Strings",
    tagline: "Social Networking Platform",
    blurb:
      "A social platform built for real connections — posts, threads, and community interaction.",
    tech: ["React", "Node", "Express", "MongoDB"],
    repoUrl: "https://github.com/vijayakanthang/Strings",
    liveUrl: "https://strings-social.vercel.app",
    embeddable: false,
    thumbnail: "/st-home.png",
  },
  {
    id: "inventory",
    title: "Inventory System",
    tagline: "Inventory Management",
    blurb: "Smart inventory management — real-time stock, items and reporting.",
    tech: ["React", "Node", "Express", "MongoDB"],
    repoUrl: "https://github.com/vijayakanthang/ProductSales-Inventory",
    liveUrl: "https://product-sales-inventory.vercel.app",
    embeddable: false,
    thumbnail: "/inv-home.png",
  },
  {
    id: "expense",
    title: "Expense Tracker",
    tagline: "Track & Manage Expenses",
    blurb: "MERN expense tracker — track, analyse, save more. Solid full-stack proof.",
    tech: ["React", "Express", "Mongoose", "MongoDB"],
    repoUrl: "https://github.com/vijayakanthang/expense-tracker",
    liveUrl: "https://expense-tracker-olive-seven.vercel.app",
    embeddable: false,
    thumbnail: "/exp.png",
  },
  {
    id: "taskmanager",
    title: "Task Manager",
    tagline: "Task & Productivity Tracker",
    blurb: "Clean task management app — create, organise, and track your to-dos with ease.",
    tech: ["React", "JavaScript", "CSS"],
    repoUrl: "https://github.com/vijayakanthang/Task-Manager--1",
    liveUrl: "https://vijayakanthang.github.io/Task-Manager--1",
    embeddable: false,
    thumbnail: "/taskmanger.png",
  },
];

// Five scenes of the one continuous world.
export const sections = [
  { id: "landing", index: 0, label: "INFINITY", nav: "HOME" },
  { id: "about", index: 1, label: "ABOUT ME", nav: "ABOUT" },
  { id: "skills", index: 2, label: "SKILLS", nav: "SKILLS" },
  { id: "projects", index: 3, label: "PROJECTS", nav: "PROJECTS" },
  { id: "contact", index: 4, label: "CONTACT", nav: "CONTACT" },
];
