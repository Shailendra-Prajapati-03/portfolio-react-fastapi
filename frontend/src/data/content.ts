import type { IconType } from "react-icons";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiGithub,
  SiN8N,
} from "react-icons/si";
import {
  FiServer,
  FiGlobe,
  FiBarChart2,
  FiTrendingUp,
  FiCheckSquare,
} from "react-icons/fi";

/**
 * Single source of truth for all portfolio content.
 * Keeping content data-driven makes it trivial to later fetch from the
 * FastAPI backend (see lib/api.ts) without touching the components.
 */

export const profile = {
  name: "Shailendra Prajapati",
  firstName: "Shailendra",
  role: "Python Developer (Automation) & Data Analyst",
  roles: [
    "Python Developer (Automation)",
    "Data Analyst",
    "Automation Developer",
    "Full-Stack Developer",
  ],
  tagline:
    "I build automation workflows, data dashboards, and full-stack web apps — turning complex, manual processes into clean, efficient, data-driven solutions.",
  bio: "I'm a Python Developer specializing in automation and data analysis. I build n8n workflow automations, Apify data-scraping pipelines, and AI-assisted dashboards, alongside scalable full-stack apps with Django and React — always focused on improving operational efficiency.",
  location: "Ghatkopar, Mumbai, Maharashtra 400084, India",
  age: 23,
  email: "shailendraprajapati640@gmail.com",
  // TODO: replace with your real number — placeholder keeps the tel: link inert.
  phone: "+91 7039582098",
  resumeUrl: "/resume.pdf",
  avatar: "/avatar.jpg",
  stats: [
    { label: "Years Experience", value: "1+" },
    { label: "Projects Built", value: "3" },
    { label: "Technologies", value: "15" },
  ],
};

export interface SocialLink {
  label: string;
  href: string;
}

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/shailendra-prajapati-03" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shailendra-prajapati",
  },
  { label: "Instagram", href: "https://www.instagram.com/" },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "qualification", label: "Journey" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export interface Skill {
  name: string;
  level: number;
  icon: IconType;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", level: 90, icon: SiHtml5 },
      { name: "CSS3", level: 85, icon: SiCss },
      { name: "Bootstrap", level: 85, icon: SiBootstrap },
      { name: "JavaScript", level: 80, icon: SiJavascript },
      { name: "React.js", level: 80, icon: SiReact },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Python", level: 88, icon: SiPython },
      { name: "Django", level: 85, icon: SiDjango },
      { name: "Django REST (DRF)", level: 80, icon: FiServer },
      { name: "SQL / PostgreSQL", level: 78, icon: SiPostgresql },
      { name: "Git & GitHub", level: 82, icon: SiGithub },
    ],
  },
  {
    title: "Automation & Data",
    skills: [
      { name: "n8n", level: 85, icon: SiN8N },
      { name: "Apify", level: 80, icon: FiGlobe },
      { name: "Power BI", level: 75, icon: FiBarChart2 },
      { name: "Data Analysis", level: 80, icon: FiTrendingUp },
      { name: "Manual Testing", level: 82, icon: FiCheckSquare },
    ],
  },
];

export interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  detail?: string;
  type: "education" | "experience";
}

export const timeline: TimelineItem[] = [
  {
    type: "experience",
    title: "Python Developer (Automation)",
    subtitle: "My Country Mobile · MCM BPO Pvt Ltd.",
    period: "May 2025 — Present",
    detail:
      "Design and maintain n8n workflow automations, Apify-based web-scraping and data pipelines, and AI-assisted Django dashboards. Also perform manual and browser-automation testing across live production platforms to ensure reliability.",
  },
  {
    type: "education",
    title: "Full Stack Developer",
    subtitle: "Aptech Academy",
    period: "2025",
    detail: "Intensive full-stack development program covering modern web engineering.",
  },
  {
    type: "education",
    title: "B.Com",
    subtitle: "University of Mumbai",
    period: "2018 — 2021",
    detail: "Bachelor of Commerce · 6.49 CGPA",
  },
  {
    type: "education",
    title: "Higher Secondary (12th)",
    subtitle: "University of Mumbai",
    period: "2016 — 2018",
    detail: "Scored 60%",
  },
];

export interface Service {
  title: string;
  description: string;
  points: string[];
}

export const services: Service[] = [
  {
    title: "Workflow Automation",
    description:
      "Automating repetitive business workflows to cut manual effort and boost efficiency.",
    points: [
      "n8n workflow automation",
      "Apify scraping & data pipelines",
      "Google Sheets / API integrations",
    ],
  },
  {
    title: "Data Analysis & Dashboards",
    description:
      "Turning raw data into clear, actionable dashboards and reports that drive decisions.",
    points: [
      "Power BI & Excel reporting",
      "Django analytics dashboards",
      "KPIs & trend analysis",
    ],
  },
  {
    title: "Full-Stack Web Development",
    description:
      "Responsive, scalable web apps built on a clean Django + React architecture.",
    points: [
      "Component-driven React UIs",
      "Django REST Framework APIs",
      "SQL / PostgreSQL data modeling",
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

/**
 * Fallback project data. When the backend is available these are replaced by
 * the /api/projects response (see Projects.tsx). The shape is identical.
 */
export const projects: Project[] = [
  {
    id: "issue-tracker",
    title: "Issue Tracker Dashboard",
    description:
      "Centralized Django issue-tracking dashboard with Excel/CSV upload, live sheet sync, status tracking & filtering, and an analytics view for workflow KPIs. Deployed on Render.",
    tags: ["Django", "Python", "Dashboard"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://issuetracker-dashboard.onrender.com/issues/",
    repoUrl: "https://github.com/shailendra-prajapati-03",
    featured: true,
  },
  {
    id: "juicejunction",
    title: "JuiceJunction — AI-Assisted Full-Stack App",
    description:
      "Full-stack app to create and customize mixed-fruit juice combinations with real-time visualization. REST APIs via Django REST Framework; interactive UI with React, Tailwind, Zustand & Framer Motion.",
    tags: ["React", "Django", "REST API"],
    image:
      "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://juice-junction-mixed-fruit-l4lu.vercel.app/",
    repoUrl: "https://github.com/shailendra-prajapati-03",
    featured: true,
  },
  {
    id: "supportdesk-crm",
    title: "Support Desk CRM",
    description:
      "A customer-support CRM to create, assign, and track support tickets through their full lifecycle, manage customer records, and monitor team performance on an analytics dashboard. React frontend with a Django REST Framework API.",
    tags: ["React", "Django", "REST API"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://supportdesk-crm.vercel.app",
    repoUrl: "https://github.com/shailendra-prajapati-03",
    featured: true,
  },
  {
    id: "ai-lead-validation",
    title: "AI Lead Validation Automation",
    description:
      "Automated lead-validation workflow built in n8n that validates incoming leads, enriches data, filters invalid or duplicate entries, and sends automatic notifications. It reduces manual effort, improves lead quality, and streamlines the sales process through intelligent automation — with AI-powered verification, Gmail alerts, Google Sheets sync, webhook triggers, and error-handling/retry logic.",
    tags: ["n8n", "AI Automation", "Webhooks"],
    image: "/projects/ai-lead-validation.png",
    repoUrl: "https://github.com/shailendra-prajapati-03",
    featured: true,
  },
];
