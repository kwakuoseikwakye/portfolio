export const profile = {
  name: "Kwaku Osei Kwakye",
  initials: "KOK.",
  role: "Software / AI Engineer",
  location: "Takamatsu, Japan",
  available: "Open to new work",
  lede: "I build the tools that take repetitive work off people's hands. Usually that means an automation service, a dashboard, or the API sitting behind both. Most of it starts with someone doing a job by hand that a machine should be doing.",
  email: "kwakuoseikwakye@gmail.com",
  resume: "/resume.pdf",
  github: "https://github.com/kwakuoseikwakye",
  linkedin: "https://linkedin.com/in/kwakuoseikwakye",
  site: "https://kwakuoseikwakye.github.io",
};

export const stats = [
  { value: "7+", unit: "", label: "years building internal software" },
  { value: "40", unit: "%", label: "faster releases after I rebuilt CI/CD" },
  { value: "150+", unit: "", label: "organizations running on platforms I led" },
];

export const about = [
  "I've spent about seven years building the software companies run on internally. Not the customer-facing product, the thing the ops team opens at 9am. Automation services, dashboards, and the APIs behind them.",
  "Lately a lot of that has involved LLMs. I care more about whether an AI workflow saves someone an hour a day than whether it demos well, so most of what I build keeps a person in the loop to approve the important parts.",
  "I usually take a project the whole way: working out what's actually needed, building it, sitting with the team through UAT, then putting it live. Sometimes on my own, sometimes with the people who'll be using it every day.",
];

export const capabilities = [
  {
    label: "AI and agent workflows",
    items:
      "LLM APIs (OpenAI, Anthropic) · agents with tool use, function calling and multi-turn state · workflow automation in n8n · approval-gated and human-in-the-loop pipelines · NLP · speech-to-text",
  },
  {
    label: "Backend and automation",
    items:
      "Python · FastAPI · Node.js / Express · Go (Gin) · REST API design · SDKs · JWT auth · microservices",
  },
  {
    label: "Data and dashboards",
    items:
      "PostgreSQL · MySQL · MSSQL · Oracle · SQLite · custom dashboards in Next.js and React · data-transformation pipelines",
  },
  {
    label: "Cloud and deployment",
    items:
      "AWS (EC2, Fargate, Cognito, CloudWatch) · GCP · Docker · Kubernetes · Terraform · GitHub Actions · Jenkins · Nginx · Prometheus",
  },
  {
    label: "Languages",
    items: "Python · TypeScript · JavaScript · Go · PHP · Rust",
  },
  {
    label: "How I work",
    items:
      "Requirements first, then design, then UAT with the people who asked for it · Agile / Scrum · JIRA · Confluence · Git · a lot of time spent on performance",
  },
];

export const experience = [
  {
    role: "Software / AI Engineer",
    company: "Kirirom Digital",
    location: "Tokyo, Japan",
    period: "Jul 2024 to now",
    highlights: [
      "Built the agent orchestration and LLM workflows behind our multilingual forecasting, which replaced a stack of manual steps.",
      "Shipped the REST APIs (FastAPI, Node.js) and internal SDKs the product teams use to add AI features without rebuilding the plumbing every time.",
      "Rebuilt our CI/CD on GitHub Actions and cut release cycles by 40%.",
      "Moved our containerized AI workloads onto AWS (EC2, Fargate, Cognito, CloudWatch) and wired up Prometheus and CloudWatch so we hear about problems before users do.",
      "Mentor the other engineers on AI integration and API design.",
    ],
  },
  {
    role: "Senior Backend Developer, contract",
    company: "African Innovation Studios",
    location: "New York, USA (remote)",
    period: "Feb 2024 to Dec 2024",
    highlights: [
      "Owned a digital gift-card platform from the first requirements meeting through to production rollout.",
      "Wrote the APIs in Go (Gin) with Redis sitting in front of PostgreSQL, handling auth and a lot of concurrent transactions.",
      "Ran the Docker and NGINX deployments, and designed the schema so the reporting queries didn't fall over.",
      "Coordinated third-party integrations with the other teams through JIRA and Confluence.",
    ],
  },
  {
    role: "Full-Stack Software Developer",
    company: "PaySwitch",
    location: "Accra, Ghana",
    period: "Mar 2023 to Jul 2024",
    highlights: [
      "Built the settlement dashboard (Next.js, PostgreSQL) that turned messy transaction data into something the ops team could read at a glance, working directly with PMs to get requirements into shipped features.",
      "Built a USSD device-lending platform in Go for MTN Ghana that talked to several payment and banking APIs.",
      "Designed microservices for financial transaction processing that had to hold up under strict reliability and security requirements.",
      "Wrote documented, developer-friendly REST APIs and set up CI/CD in a cross-functional Agile team.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "GITPlus",
    location: "Accra, Ghana",
    period: "Jun 2019 to Feb 2023",
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

// `url` omitted = rendered as a non-linked row. Add a URL and it becomes a link.
export const projects = [
  {
    title: "Jinsoku.ai",
    url: "https://jinsoku.ai",
    description:
      "Real-time voice translation and voice cloning across 42 languages, under 300ms of latency. Founder and solo developer: I designed the whole pipeline myself, speech to text, then machine translation, then voice synthesis, plus the cloud infrastructure it runs on.",
    tags: ["Python", "AI Voice", "Cloud Infrastructure", "Full-Stack"],
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
    title: "Alacrán",
    url: "https://alacran.vercel.app",
    description:
      "A local-first control panel for running AI coding agents on your own machine. Each workspace gets its own sandbox, its own files and its own memory of the project, so Claude Code, Codex or Aider already know what they're working on. Nothing lands until you've read the diff and approved it. No hosted backend, no telemetry, MIT licensed, with builds for macOS and Linux.",
    tags: ["TypeScript", "Next.js", "Python", "Local-first"],
  },
  {
    title: "Micholin",
    url: "https://michol.in",
    description:
      "An AI platform that generates personal videos in different languages, using text-to-speech and lip-sync models.",
    tags: ["TypeScript", "Next.js", "AI", "PostgreSQL"],
  },
  {
    title: "Gasppy",
    url: "https://gasppy.com",
    description:
      "A gift-card platform for businesses to issue, distribute and track cards, with the transaction processing to back it.",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL"],
  },
  {
    title: "FundPeck",
    url: "https://fundpeck.com",
    description:
      "A crowdfunding platform for creators and startups. Handles the money coming in and the payouts going back out.",
    tags: ["PHP", "Laravel", "Go", "PostgreSQL"],
  },
  {
    title: "Bank file conversion system",
    description:
      "A pipeline that decrypts MasterCard and Visa settlement files (IPM, T112, T11) and turns them into CSV a person can actually read.",
    tags: ["Rust", "Python", "PHP", "Data pipeline"],
  },
];
