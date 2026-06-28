// ============================================================
//  Vijay Kanthan — single source of truth for all content.
//  Edit here; every scene + the SEO fallback reads from this.
// ============================================================

export const identity = {
  name: "VijayaKanthan G",
  firstName: "VIJAYAKANTHAN ",
  lastName: "G",
  title: "Frontend / Full-Stack Engineer",
  subtitle: "Next.js · React · TypeScript — technical-SEO focus",
  flavorTitles: ["Electrical Engineer", "Full Stack Developer", "Tech Enthusiast"],
  location: "Coimbatore, India",
};

// About / career objective copy
export const about = {
  greeting: "Hi, I'm",
  intro:
    "A Full Stack Developer who loves building digital solutions that create real world impact.",
  objective:
    "Frontend / full-stack engineer (Next.js, React, TypeScript) with a technical-SEO focus. I currently build the marketing platform at Klamp.ai — performance-tuned, search-optimized, shipped to production. I like turning hardware-grounded problem-solving into fast, accessible web products.",
  pillars: ["INNOVATE", "BUILD", "LEARN", "REPEAT"],
};

// Career objective shown on the About HUD's objective card.
export const careerObjective =
  "To leverage my skills in full stack development, cloud technologies and problem solving to build innovative, scalable and user centric solutions while continuously learning and growing in a challenging environment.";

// Floating role badges around the avatar.
export const roles = [
  { id: "fullstack", label: "Full Stack Developer", sub: "DEVELOPER", icon: "code" },
  { id: "cloud", label: "Cloud Enthusiast", sub: "ENTHUSIAST", icon: "cloud" },
  { id: "problem", label: "Problem Solver", sub: "SOLVER", icon: "puzzle" },
  { id: "tech", label: "Tech Explorer", sub: "EXPLORER", icon: "rocket" },
  { id: "learner", label: "Lifelong Learner", sub: "LEARNER", icon: "book" },
];

// "My Journey" vertical timeline.
export const journey = [
  { year: "2024", text: "Building scalable full stack applications and cloud solutions" },
  { year: "2023", text: "Explored cloud technologies and devops" },
  { year: "2022", text: "Started full stack development journey" },
  { year: "2021", text: "Began programming with curiosity and passion" },
];

// Stats grid.
export const stats = [
  { id: "projects", value: "5+", label: "Projects Completed", icon: "code" },
  { id: "years", value: "1+", label: "Years of Experience", icon: "trophy" },
  { id: "hours", value: "1000+", label: "Hours of Coding", icon: "coffee" },
  { id: "passion", value: "∞", label: "Passion for Learning", icon: "infinity" },
];

// Education (pulled from the About reference — edit to taste).
export const education = {
  degree: "Bachelor of Engineering",
  field: "Electrical and Electronics Engineering",
  school: "Karpagam Institute of Technology",
  period: "2021 - 2025",
  cgpa: "CGPA: 7.62 / 10",
};

// Interests chips.
export const interests = [
  { id: "aiml", label: "AI & ML", icon: "brain" },
  { id: "cyber", label: "Cyber Security", icon: "lock" },
  { id: "iot", label: "IoT", icon: "wifi" },
  { id: "sysdesign", label: "System Design", icon: "grid" },
  { id: "gaming", label: "Gaming", icon: "gamepad" },
];

// Personal quote banner.
export const quote =
  "Code is not just what I write, it's how I solve problems, build ideas and impact the world.";

export const links = {
  github: "https://github.com/Vijayakanthang",
  linkedin: "https://www.linkedin.com/in/vijayakanthang",
  portfolio: "https://vijayakanthang.netlify.app",
  email: "vijayakanthang@gmail.com",
  phone: "9952103324", // add when available
};

// Skills as "monuments" — game levels are stylised flavour, not literal claims.
export const skills = [
  {
    id: "javascript",
    name: "JavaScript",
    level: 95,
    exp: 9500,
    color: "#f7df1e",
    blurb:
      "The language the whole world runs on. From DOM to async to the deep weird parts — fluent.",
    abilities: ["Async/Await", "Closures", "ES2024", "Perf Profiling", "Patterns"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    level: 88,
    exp: 8800,
    color: "#3178c6",
    blurb:
      "Types as a design tool. Generics, inference and strict mode keep large apps honest.",
    abilities: ["Generics", "Inference", "Strict Mode", "Type Guards", "DX"],
  },
  {
    id: "react",
    name: "React",
    level: 95,
    exp: 9500,
    color: "#61dafb",
    blurb:
      "A powerful library for building user interfaces. Component-based architecture with blazing performance.",
    abilities: ["Hooks", "Suspense", "Server Comp.", "Memoization", "R3F"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    level: 92,
    exp: 9200,
    color: "#ffffff",
    blurb:
      "App Router, SSR/ISR and technical SEO at scale — the daily driver for production work.",
    abilities: ["App Router", "SSR/ISR", "Edge", "Metadata", "Core Web Vitals"],
  },
  {
    id: "node",
    name: "Node / Express",
    level: 90,
    exp: 9000,
    color: "#3c873a",
    blurb:
      "Servers, APIs and tooling. Express routes, middleware and hardened form endpoints.",
    abilities: ["REST", "Middleware", "Auth", "Streams", "Hardening"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    level: 85,
    exp: 8500,
    color: "#13aa52",
    blurb:
      "Document modelling with Mongoose. Schemas, aggregation and indexes that scale.",
    abilities: ["Mongoose", "Aggregation", "Indexing", "Schema Design", "Atlas"],
  },
  {
    id: "python",
    name: "Python",
    level: 90,
    exp: 9000,
    color: "#ffd343",
    blurb:
      "Scripting, automation and data glue. The Swiss-army knife behind the scenes.",
    abilities: ["Automation", "Scripting", "Data", "APIs", "Tooling"],
  },
];

// "Current Passives" — RPG-style trait chips.
export const passives = [
  { id: "problem-solver", name: "Problem Solver", stat: "+15 INT" },
  { id: "quick-learner", name: "Quick Learner", stat: "+20 EXP" },
  { id: "perf-hawk", name: "Performance Hawk", stat: "+15 STR" },
  { id: "systems-thinker", name: "Systems Thinker", stat: "+15 WIS" },
];

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
