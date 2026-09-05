export const profile = {
  name: "Kwaku Osei Kwakye",
  initials: "KOK",
  role: "Software / AI Engineer",
  location: "Takamatsu, Japan",
  available: "Open to new work",
  lede: "I build the tools that take repetitive work off people's hands. Usually that means an automation service, a dashboard, or the API sitting behind both. Most of it starts with someone doing a job by hand that a machine should be doing.",
  email: "kwakuoseikwakye@gmail.com",
  resume: "/resume.pdf",
  github: "https://github.com/kwakuoseikwakye",
  githubUser: "kwakuoseikwakye",
  linkedin: "https://linkedin.com/in/kwakuoseikwakye",
  site: "https://kwakuoseikwakye.github.io",
  photo: "/kwaku.webp",
  photoAlt: "/osei.jpeg",
};

export const taglines = [
  "Software Engineer",
  "AI & Agent Workflows",
  "Backend & Automation",
];

export const connect = [
  { label: "Résumé", href: profile.resume, icon: "file" },
  { label: "Contact", href: `mailto:${profile.email}`, icon: "send" },
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];

export const skills = [
  "Python", "TypeScript", "JavaScript", "Go", "PHP", "Rust",
  "FastAPI", "Node.js", "Express", "Gin", "Next.js", "React", "Tailwind CSS",
  "PostgreSQL", "MySQL", "MSSQL", "Oracle", "SQLite", "Redis",
  "OpenAI", "Anthropic", "n8n", "LangChain",
  "AWS", "GCP", "Docker", "Kubernetes", "Terraform",
  "GitHub Actions", "Jenkins", "Nginx", "Prometheus", "Git",
];

// `**…**` marks the run that renders bold + underlined, as in the reference.
export const about = [
  "I'm Kwaku — a software and AI engineer with 7+ years building the systems companies actually run on internally, not the thing on the marketing site.",
  "I build end to end with **Python, TypeScript, Go, FastAPI and Next.js** — from schema and API design through to the dashboard someone opens at 9am.",
  "Most of my recent work is **LLM agents, tool use and workflow automation**, built so a person still approves the parts that matter.",
  "On infrastructure I work with **AWS, Docker, Kubernetes and GitHub Actions**, with a bias toward releases that are boring and observable.",
];

export const focus = [
  "AI & Agent Workflows",
  "Backend & Automation",
  "Data & Dashboards",
  "Cloud & Deployment",
];

export const outcomes = [
  {
    title: "Shipped a national COVID-19 vaccination tracking system",
    note: "Mar 2021",
    detail: "Redis absorbed the traffic spikes; it held.",
  },
  {
    title: "Real-time voice translation under 300ms across 42 languages",
    note: "Jun 2024",
    detail: "Designed the full STT → MT → synthesis pipeline solo.",
  },
  {
    title: "Cut release cycles by 40% rebuilding CI/CD on GitHub Actions",
    note: "Nov 2024",
    detail: "Containerized AI workloads moved onto AWS in the same pass.",
  },
  {
    title: "Led multi-tenant SaaS for 150+ schools and churches",
    note: "Feb 2023",
    detail: "Shared backend services so the team stopped rewriting the basics.",
  },
];

/* `start`/`end` are YYYY-MM; `end: null` means present. Duration is derived
   at render time so the "1 yr 4 mos" line never goes stale.
   `highlights` is kept as data but not rendered — the reference layout uses
   one compact row per role. Drop it into the row to bring the detail back. */
export const experience = [
  {
    company: "Kirirom Digital",
    url: "https://kirirom-digital.com",
    logo: "/logos/kirirom.png",
    role: "Software / AI Engineer",
    location: "Tokyo, Japan",
    start: "2024-07",
    end: null,
    highlights: [
      "Built the agent orchestration and LLM workflows behind our multilingual forecasting, which replaced a stack of manual steps.",
      "Shipped the REST APIs (FastAPI, Node.js) and internal SDKs the product teams use to add AI features without rebuilding the plumbing every time.",
      "Rebuilt our CI/CD on GitHub Actions and cut release cycles by 40%.",
      "Moved our containerized AI workloads onto AWS (EC2, Fargate, Cognito, CloudWatch) and wired up Prometheus and CloudWatch so we hear about problems before users do.",
      "Mentor the other engineers on AI integration and API design.",
    ],
  },
  {
    company: "African Innovation Studios",
    url: null,
    logo: null,
    role: "Senior Backend Developer, contract",
    location: "New York, USA (remote)",
    start: "2024-02",
    end: "2024-12",
    highlights: [
      "Owned a digital gift-card platform from the first requirements meeting through to production rollout.",
      "Wrote the APIs in Go (Gin) with Redis sitting in front of PostgreSQL, handling auth and a lot of concurrent transactions.",
      "Ran the Docker and NGINX deployments, and designed the schema so the reporting queries didn't fall over.",
      "Coordinated third-party integrations with the other teams through JIRA and Confluence.",
    ],
  },
  {
    company: "PaySwitch",
    url: "https://payswitch.com.gh",
    logo: "/logos/payswitch.png",
    role: "Full-Stack Software Developer",
    location: "Accra, Ghana",
    start: "2023-03",
    end: "2024-07",
    highlights: [
      "Built the settlement dashboard (Next.js, PostgreSQL) that turned messy transaction data into something the ops team could read at a glance.",
      "Built a USSD device-lending platform in Go for MTN Ghana that talked to several payment and banking APIs.",
      "Designed microservices for financial transaction processing under strict reliability and security requirements.",
      "Wrote documented, developer-friendly REST APIs and set up CI/CD in a cross-functional Agile team.",
    ],
  },
  {
    company: "GITPlus",
    url: null,
    logo: "/logos/gitplus.png",
    role: "Full-Stack Developer",
    location: "Accra, Ghana",
    start: "2019-06",
    end: "2023-02",
    highlights: [
      "Delivered the national COVID-19 vaccination tracking system, with Redis doing the heavy lifting when traffic spiked.",
      "Led two multi-tenant SaaS platforms: school management for 50+ institutions, and church management for 100+ organizations.",
      "Built internal tools and shared backend services in Laravel and PostgreSQL so the rest of the team stopped rewriting the same things.",
      "Architected full-stack apps in React, Next.js and PHP, set up their deploy pipelines, and mentored the junior developers.",
    ],
  },
];

export const education = {
  degree: "BSc, Information Technology Management",
  school: "University of Professional Studies, Accra (UPSA)",
  period: "2015 to 2019",
};

export type Project = {
  title: string;
  url?: string;
  repo?: string;
  image?: string;
  featured?: boolean;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "Jinsoku.ai",
    url: "https://jinsoku.ai",
    repo: "https://github.com/kwakuoseikwakye/jinsoku-AI",
    image: "/shots/jinsoku.png",
    featured: true,
    description:
      "Real-time voice translation and voice cloning across 42 languages, under 300ms of latency. Founder and solo developer: speech to text, machine translation, voice synthesis, plus the cloud infrastructure it runs on.",
    tags: ["Python", "AI Voice", "Cloud Infrastructure", "Full-Stack"],
  },
  {
    title: "Micholin",
    url: "https://michol.in",
    image: "/shots/micholin.png",
    featured: true,
    description:
      "An AI platform that generates personal videos in different languages, using text-to-speech and lip-sync models.",
    tags: ["TypeScript", "Next.js", "AI", "PostgreSQL"],
  },
  {
    title: "Gasppy",
    url: "https://gasppy.com",
    image: "/shots/gasppy.png",
    featured: true,
    description:
      "A gift-card platform for businesses to issue, distribute and track cards, with the transaction processing to back it.",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL"],
  },
  {
    title: "FundPeck",
    url: "https://fundpeck.com",
    image: "/shots/fundpeck.png",
    featured: true,
    description:
      "A crowdfunding platform for creators and startups. Handles the money coming in and the payouts going back out.",
    tags: ["PHP", "Laravel", "Go", "PostgreSQL"],
  },
  {
    title: "Alacrán",
    repo: "https://github.com/kwakuoseikwakye/alacran",
    description:
      "A local-first control panel for running AI coding agents on your own machine. Each workspace gets its own sandbox, files and memory of the project. Nothing lands until you've read the diff and approved it. No hosted backend, no telemetry, MIT licensed.",
    tags: ["TypeScript", "Next.js", "Python", "Local-first"],
  },
  {
    title: "agent-bridge",
    description:
      "A three-part system for approving and dispatching commands to long-running AI coding agents remotely: a WebSocket relay on Fly.io, a desktop agent managing headless coding sessions, and a React PWA client. Human oversight is built into the loop rather than bolted on.",
    tags: ["WebSocket", "Fly.io", "React", "PWA"],
  },
  {
    title: "Autonomous content pipeline",
    description:
      "An end-to-end pipeline that scrapes source material, generates short-form content and publishes it with n8n and LLM APIs, gated behind human approval so nothing goes out unreviewed.",
    tags: ["n8n", "LLM APIs", "Automation"],
  },
  {
    title: "Bank file conversion system",
    description:
      "A pipeline that decrypts MasterCard and Visa settlement files (IPM, T112, T11) and turns them into CSV a person can actually read.",
    tags: ["Rust", "Python", "PHP", "Data pipeline"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

export function formatMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "1 yr 4 mos" between two YYYY-MM points; `end: null` counts to `now`. */
export function duration(start: string, end: string | null, now: Date) {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end
    ? end.split("-").map(Number)
    : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  const months = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ");
}
