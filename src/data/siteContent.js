export const navigationItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certs" },
  { id: "achievements", label: "Proof" },
  { id: "contact", label: "Contact" },
];

export const profile = {
  name: "Vijayakanthan G",
  role: "Frontend-focused Software Engineer",
  roleStack: "React | Next.js | TypeScript",
  email: "vijayakanthang@gmail.com",
  phone: "9952103324",
  location: "Chennai, India",
  linkedin: "https://linkedin.com/in/vijayakanthang",
  github: "https://github.com/vijayakanthang",
  leetcode: "https://leetcode.com/u/vijayakanthan/",
  portfolio: "https://vijayakanthang.netlify.app",
  resume: "https://flowcv.com/resume/3l36i0wbrb",
  githubUsername: "vijayakanthang",
  about: [
    "Frontend-focused engineer building polished web experiences with React, Next.js, and TypeScript.",
    "I enjoy pairing UI craft with performance work like Core Web Vitals, SEO, and scalable content workflows.",
  ],
  quickStats: [
    { value: "2", label: "Teams shipped with", detail: "Klamp.ai and Accenture" },
    { value: "4", label: "Featured projects", detail: "Web, full stack, and IoT work" },
    { value: "1", label: "IEEE publication", detail: "Published smart hygiene solution" },
    { value: "2025", label: "Engineering graduate", detail: "B.E. Electrical and Electronics" },
  ],
  education: {
    degree: "B.E Electrical and Electronics Engineering",
    school: "Karpagam Institute of Technology, Coimbatore",
    meta: "CGPA: 7.62 | 2021 - 2025",
  },
};

export const heroTerminalLines = {
  desktop: [
    "> whoami",
    "Vijayakanthan G",
    "",
    "> cat role.txt",
    "Frontend-focused Software Engineer | React | Next.js | TypeScript",
    "",
    "> ls skills/",
    "React.js  Next.js  TypeScript  Node.js  MongoDB  Azure",
    "",
    "> ./open_portfolio.sh",
    "Loading projects... [ok]",
    "[PORTFOLIO READY]",
  ],
  mobile: [
    "> whoami",
    "Vijayakanthan G",
    "> role",
    "React | Next.js | TypeScript",
    "> ./open_portfolio.sh",
    "[READY]",
  ],
};

export const availabilityChips = [
  "Currently at Klamp.ai",
  "Focused on frontend performance",
  "Open to product-focused engineering roles",
];

export const experiences = [
  {
    company: "Klamp.ai",
    role: "Developer Intern",
    duration: "December 2025 - Present",
    location: "Chennai, India",
    badge: "Current Role",
    tone: "green",
    details: [
      "Maintaining and optimizing a production Next.js platform.",
      "Improving SEO, Core Web Vitals, and frontend performance quality.",
      "Integrating Strapi CMS for dynamic content workflows.",
      "Working with TypeScript, API routes, testing, and deployment support.",
    ],
    tech: ["Next.js", "TypeScript", "Strapi", "SEO", "Core Web Vitals"],
  },
  {
    company: "Accenture",
    role: "Intern",
    duration: "February 2025 - June 2025",
    location: "Bengaluru, India",
    badge: "Cloud Security",
    tone: "cyan",
    details: [
      "Applied Azure security controls aligned with AZ-500 concepts.",
      "Implemented Privileged Identity Management workflows.",
      "Secured cloud identities and enforced least-privilege access patterns.",
    ],
    tech: ["Azure", "AZ-500", "PIM", "Cloud Security"],
  },
];

export const projects = [
  {
    slug: "draw-free",
    title: "Draw Free",
    category: "Creative Tool / Web App",
    duration: "Newest Project",
    description:
      "A free browser-based collaborative whiteboard focused on simplicity, accessibility, and frictionless sharing.",
    tech: ["React.js", "Next.js", "Canvas API", "Konva", "Vercel"],
    tags: ["Canvas", "Creative Tool", "Real-time", "Open Source"],
    live: "https://draw-free.vercel.app",
    github: "https://github.com/vijayakanthang/draw-free",
    layout: "featured",
    preview: "canvas",
    highlights: ["No login flow", "Collaborative whiteboard", "Fast Vercel deployment"],
  },
  {
    slug: "strings",
    title: "Strings",
    category: "Full Stack Social Platform",
    duration: "June 2025 - Present",
    description:
      "A minimalist social platform with JWT authentication, profiles, and a clean text-first feed across desktop and mobile.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    tags: ["Full Stack", "Authentication", "Responsive"],
    live: "https://strings-social.vercel.app/",
    github: "https://github.com/vijayakanthang/Strings",
    layout: "wide",
    preview: "phone",
    image: "/st-home.png",
  },
  {
    slug: "inventory",
    title: "Inventory Management System",
    category: "Dashboard / Data Visualization",
    duration: "June 2024",
    description:
      "An API-driven inventory app with JSON seeding, pagination, and interactive charts for exploring sales data.",
    tech: ["React.js", "Node.js", "Express.js", "Charts", "Pagination"],
    tags: ["Dashboard", "Data Visualization", "API Integration"],
    live: "https://product-sales-inventory.vercel.app/",
    github: "https://github.com/vijayakanthang/ProductSales-Inventory",
    layout: "tall",
    preview: "chart",
  },
  {
    slug: "smart-sanitizing-toilet",
    title: "Smart Sanitizing Toilet",
    category: "IoT / Automation",
    duration: "May 2023 - September 2023",
    description:
      "A touchless cleaning concept using microcontrollers, PIR sensors, and a servo-driven sanitizing mechanism.",
    tech: ["Microcontrollers", "PIR Sensors", "Servo Motors"],
    tags: ["IoT", "Hardware", "Published Research"],
    publication:
      "IEEE Xplore - Smart Sanitizing Toilet: A Touchless, UV-Disinfected and Self Cleaning Hygiene Solution",
    publicationUrl: "https://ieeexplore.ieee.org/document/11089908",
    layout: "compact",
    preview: "publication",
  },
];

export const skillOverview = [
  { label: "Frontend", value: 90, detail: "React, Next.js, TypeScript" },
  { label: "Backend", value: 75, detail: "Node.js, Express, Strapi" },
  { label: "Databases", value: 70, detail: "MySQL, MongoDB" },
  { label: "Cloud & Security", value: 60, detail: "Azure, AZ-500, PIM" },
  { label: "Problem Solving", value: 80, detail: "DSA, Java, Python" },
];

export const skillGroups = [
  {
    title: "Frontend",
    tone: "frontend",
    items: ["HTML5", "CSS3", "React.js", "Next.js", "TypeScript"],
  },
  {
    title: "Backend",
    tone: "backend",
    items: ["Node.js", "Express.js", "Strapi CMS", "MongoDB", "MySQL"],
  },
  {
    title: "Cloud & Security",
    tone: "cloud",
    items: ["Azure", "Azure Security (AZ-500)", "PIM"],
  },
  {
    title: "Tools & Workflow",
    tone: "tools",
    items: ["Git", "GitHub", "Vercel", "Netlify", "REST APIs", "JWT Authentication"],
  },
  {
    title: "Performance & SEO",
    tone: "performance",
    items: ["Core Web Vitals", "Lighthouse", "SEO Best Practices"],
  },
  {
    title: "Programming & CS",
    tone: "languages",
    items: ["Java", "Python", "Data Structures & Algorithms"],
  },
];

export const certifications = [
  {
    title: "React Basics",
    issuer: "Meta",
    platform: "Coursera",
    summary: "Focused on React fundamentals, components, props, state, and modern UI thinking.",
    credentialId: "AKF9NXAHRKSP",
    url: "https://www.coursera.org/account/accomplishments/verify/AKF9NXAHRKSP",
  },
  {
    title: "Django Web Framework",
    issuer: "Meta",
    platform: "Coursera",
    summary: "Covered Django application structure, routing, templates, and backend fundamentals.",
    credentialId: "Y4U2QDAF6R4K",
    url: "https://www.coursera.org/account/accomplishments/verify/Y4U2QDAF6R4K",
  },
  {
    title: "Introduction to Android Mobile Application Development",
    issuer: "Meta",
    platform: "Coursera",
    summary: "Built Android fundamentals around mobile UI, app structure, and platform-oriented development basics.",
    credentialId: "K22VUS4HDZMA",
    url: "https://www.coursera.org/account/accomplishments/verify/K22VUS4HDZMA",
  },
  {
    title: "React Native",
    issuer: "Meta",
    platform: "Coursera",
    summary: "Focused on building native-feeling mobile interfaces with React Native and reusable component patterns.",
    credentialId: "UAKT2NSA2MUY",
    url: "https://www.coursera.org/account/accomplishments/verify/UAKT2NSA2MUY",
  },
];

export const achievement = {
  title:
    "IEEE Xplore Publication - Smart Sanitizing Toilet: A Touchless, UV-Disinfected and Self Cleaning Hygiene Solution",
  summary:
    "Published research work demonstrating applied hardware design, automation logic, and hygiene-focused product thinking.",
  url: "https://ieeexplore.ieee.org/document/11089908",
};

export const codingProfile = {
  platform: "LeetCode",
  username: "vijayakanthan",
  url: "https://leetcode.com/u/vijayakanthan/",
  summary:
    "Problem-solving profile centered on data structures, algorithms, and interview-style coding practice.",
  focus: ["DSA practice", "Java and Python", "Coding consistency"],
  stats: {
    totalSolved: 153,
    easy: 85,
    medium: 58,
    hard: 10
  }
};

export const contactCommands = [
  {
    label: "$ open linkedin",
    value: "https://linkedin.com/in/vijayakanthang",
    href: "https://linkedin.com/in/vijayakanthang",
  },
  {
    label: "$ open github",
    value: "https://github.com/vijayakanthang",
    href: "https://github.com/vijayakanthang",
  },
  {
    label: "$ open leetcode",
    value: "https://leetcode.com/u/vijayakanthan/",
    href: "https://leetcode.com/u/vijayakanthan/",
  },
  {
    label: "$ view resume",
    value: "https://flowcv.com/resume/3l36i0wbrb",
    href: "https://flowcv.com/resume/3l36i0wbrb",
  },
  {
    label: "$ visit draw-free",
    value: "https://draw-free.vercel.app",
    href: "https://draw-free.vercel.app",
  },
];
