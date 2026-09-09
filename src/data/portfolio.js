/**
 * CENTRALIZED PORTFOLIO DATA
 * 
 * ALL personal information lives here.
 * Edit this file to customize the entire portfolio.
 * No personal data should exist in any component file.
 */

const portfolio = {
  // ─── Identity ───────────────────────────────────────
  name: "[YOUR NAME]",
  role: "[YOUR ROLE]",
  tagline: "Developer • Creative Technologist • Problem Solver",
  location: "[YOUR LOCATION]",
  
  bio: "[Write a short bio about yourself. What drives you? What do you love building? What makes you unique as a developer?]",
  
  mission: "[Your personal mission statement — what you want to achieve and the impact you want to make.]",

  // ─── Skills ─────────────────────────────────────────
  skills: [
    { name: "HTML / CSS",       level: 5, maxLevel: 5, category: "frontend",   years: null, description: "Semantic markup, responsive design, animations" },
    { name: "JavaScript",       level: 5, maxLevel: 5, category: "frontend",   years: null, description: "ES6+, async patterns, DOM manipulation" },
    { name: "React",            level: 4, maxLevel: 5, category: "frontend",   years: null, description: "Hooks, Context, component architecture" },
    { name: "TypeScript",       level: 3, maxLevel: 5, category: "frontend",   years: null, description: "Type-safe development" },
    { name: "Three.js / WebGL", level: 4, maxLevel: 5, category: "3d",         years: null, description: "3D web experiences, shaders, R3F" },
    { name: "Node.js",          level: 3, maxLevel: 5, category: "backend",    years: null, description: "REST APIs, Express, server-side JS" },
    { name: "Python",           level: 4, maxLevel: 5, category: "backend",    years: null, description: "Scripting, automation, data" },
    { name: "Git / GitHub",     level: 4, maxLevel: 5, category: "tools",      years: null, description: "Version control, collaboration" },
    { name: "Blender",          level: 3, maxLevel: 5, category: "creative",   years: null, description: "3D modeling, texturing, rendering" },
    { name: "AI / Automation",  level: 4, maxLevel: 5, category: "emerging",   years: null, description: "Prompt engineering, AI integration" },
  ],

  // ─── Projects ───────────────────────────────────────
  projects: [
    {
      id: "project-1",
      title: "[Project Name]",
      description: "[Brief description of the project and what it does]",
      longDescription: "[Detailed description including motivation, challenges, and results]",
      type: "Web Application",
      stack: ["React", "Node.js", "MongoDB"],
      features: ["[Feature 1]", "[Feature 2]", "[Feature 3]"],
      challenges: "[Key technical challenges you solved]",
      result: "[Outcome or impact of the project]",
      category: "fullstack",
      status: "Completed",
      featured: true,
      year: 2024,
      githubUrl: "",
      liveUrl: "",
      image: null,
    },
    {
      id: "project-2",
      title: "[Project Name]",
      description: "[Brief description of the project]",
      longDescription: "[Detailed description]",
      type: "3D Experience",
      stack: ["Three.js", "React", "GSAP"],
      features: ["[Feature 1]", "[Feature 2]"],
      challenges: "[Challenges]",
      result: "[Result]",
      category: "3d",
      status: "Completed",
      featured: true,
      year: 2024,
      githubUrl: "",
      liveUrl: "",
      image: null,
    },
    {
      id: "project-3",
      title: "[Project Name]",
      description: "[Brief description]",
      longDescription: "[Detailed description]",
      type: "Tool / Utility",
      stack: ["Python", "AI"],
      features: ["[Feature 1]", "[Feature 2]"],
      challenges: "[Challenges]",
      result: "[Result]",
      category: "tool",
      status: "In Progress",
      featured: false,
      year: 2024,
      githubUrl: "",
      liveUrl: "",
      image: null,
    },
  ],

  // ─── Experience ─────────────────────────────────────
  experience: [
    {
      title: "[Job Title]",
      company: "[Company Name]",
      period: "[Start] — [End]",
      description: "[What you did, what you built, what impact you made]",
      skills: ["React", "Node.js"],
    },
  ],

  // ─── Education ──────────────────────────────────────
  education: [
    {
      institution: "[University / School Name]",
      degree: "[Degree / Course Name]",
      period: "[Start] — [End]",
      achievements: ["[Achievement 1]", "[Achievement 2]"],
      skills: ["[Relevant Skill]"],
    },
  ],

  // ─── Achievements ───────────────────────────────────
  achievements: [
    { title: "Started Development",       description: "Wrote the first line of code",        date: null, category: "milestone", icon: "⚡", unlocked: true },
    { title: "Built First Website",        description: "Deployed a website to the internet",  date: null, category: "milestone", icon: "🌐", unlocked: true },
    { title: "First Major Project",        description: "Completed a significant project",     date: null, category: "project",   icon: "🏗️", unlocked: true },
    { title: "Learned React",              description: "Mastered component-based architecture", date: null, category: "skill",  icon: "⚛️", unlocked: true },
    { title: "Built 3D Experience",        description: "Created an interactive 3D web app",   date: null, category: "project",   icon: "🎮", unlocked: true },
    { title: "Open Source Contribution",   description: "Contributed to an open source project", date: null, category: "community", icon: "🤝", unlocked: false },
    { title: "Professional Experience",    description: "Gained industry experience",          date: null, category: "career",    icon: "💼", unlocked: false },
    { title: "Certification Earned",       description: "Completed a professional certification", date: null, category: "education", icon: "📜", unlocked: false },
  ],

  // ─── Certifications ────────────────────────────────
  certifications: [],

  // ─── Social Links ───────────────────────────────────
  socials: {
    github: "",
    linkedin: "",
    twitter: "",
    email: "",
    portfolio: "",
  },

  // ─── Resume ─────────────────────────────────────────
  resumeUrl: "",

  // ─── Site Meta ──────────────────────────────────────
  meta: {
    title: "[YOUR NAME] — Developer Portfolio",
    description: "An immersive, Minecraft-inspired developer portfolio showcasing projects, skills, and experience.",
    ogImage: "",
    favicon: "/favicon.ico",
  },
};

export default portfolio;
