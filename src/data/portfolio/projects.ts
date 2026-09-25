// ─── Strategic Deployments Archive (Projects) ─────────────────────────────────
// Easily append, remove, or modify deployed operations, tech specs, and live links.

export interface DeploymentProject {
  id: string;
  title: string;
  codename: string;
  category: 'FULL-STACK' | 'AI & SYSTEMS' | 'COMMUNITY & LABS';
  summary: string;
  operationalEffect: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  status: 'DEPLOYED & OPERATIONAL' | 'ARCHIVED DISPATCH';
}

export const PROJECTS: DeploymentProject[] = [
  {
    id: 'careflow-nexus',
    title: 'CareFlow Nexus',
    codename: 'DEPLOYMENT NEXUS // HOSPITAL ORCHESTRATION',
    category: 'FULL-STACK',
    summary:
      'A hospital resource orchestration platform engineered to streamline bed availability tracking, personnel task dispatch, and departmental transparency in emergency wards.',
    operationalEffect:
      'Implements real-time bed inventory state transitions across clinical departments, automated task assignment queues, and role-segregated operational dashboards to minimize patient wait times.',
    techStack: ['FastAPI', 'Python', 'Firebase', 'React', 'Render', 'REST API'],
    imageUrl: '/assets/images/careflownexus.png',
    demoUrl: 'https://careflow-nexus-nine.vercel.app/',
    repoUrl: 'https://github.com/VhoraZishan',
    status: 'DEPLOYED & OPERATIONAL',
  },
  {
    id: 'intelliprep',
    title: 'IntelliPrep',
    codename: 'DEPLOYMENT INTELLIPREP // ADAPTIVE ASSESSMENT',
    category: 'FULL-STACK',
    summary:
      'An adaptive technical assessment and cognitive evaluation platform measuring algorithmic problem-solving and domain aptitude under strict anti-cheat session constraints.',
    operationalEffect:
      'Dynamically generates balanced tests from tagged question repositories, analyzes millisecond response latencies and answer accuracy, and generates real-time proficiency radar charts.',
    techStack: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Jinja2', 'HTML5', 'CSS3', 'JavaScript'],
    imageUrl: '/assets/images/intelliprepm.png',
    demoUrl: 'https://intelliprep.zishanvhora.me',
    repoUrl: 'https://github.com/VhoraZishan',
    status: 'DEPLOYED & OPERATIONAL',
  },
  {
    id: 'bunkstop',
    title: 'BunkStop',
    codename: 'DEPLOYMENT BUNKSTOP // ATTENDANCE ENGINE',
    category: 'FULL-STACK',
    summary:
      'A collaborative attendance tracker engineered for university students to track, project, and optimize subject-wise lecture attendance with safety threshold alerts.',
    operationalEffect:
      'Provides customizable minimum percentage thresholds, realtime database updates on attendance logged, predictive class-skip calculators, and multi-device cloud synchronization.',
    techStack: ['React', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    imageUrl: '/assets/images/bunkstop.png',
    demoUrl: 'https://bunkstop.vercel.app',
    repoUrl: 'https://github.com/VhoraZishan',
    status: 'DEPLOYED & OPERATIONAL',
  },
  {
    id: 'homelab',
    title: 'Self-Hosted Home Server',
    codename: 'DEPLOYMENT HOMELAB // FLEET INFRASTRUCTURE',
    category: 'AI & SYSTEMS',
    summary:
      'A production-grade 24/7 personal Linux homelab environment delivering containerized services, encrypted remote access, and real-time hardware telemetry.',
    operationalEffect:
      'Features automated GitHub Actions deployments, Cloudflare Tunnel zero-trust ingress with custom domain SSL, Tailscale encrypted WireGuard mesh networking, Samba NAS storage, and Netdata metrics.',
    techStack: ['Ubuntu Server', 'Docker', 'Cloudflare Tunnel', 'GitHub Actions', 'Tailscale', 'Samba', 'Netdata'],
    imageUrl: '/assets/images/homelab.png',
    demoUrl: 'https://monitor.zishanvhora.me',
    repoUrl: 'https://github.com/VhoraZishan',
    status: 'DEPLOYED & OPERATIONAL',
  },
  {
    id: 'eduhaven',
    title: 'EduHaven',
    codename: 'DEPLOYMENT EDUHAVEN // KNOWLEDGE EXCHANGE',
    category: 'FULL-STACK',
    summary:
      'A full-stack community discussion and academic knowledge exchange platform equipped with token authentication, post voting, and media upload channels.',
    operationalEffect:
      'Built with Django REST Framework backend and React/Vite frontend featuring client-side route protection, ownership-verified authorization rules, and modular discussion boards.',
    techStack: ['Django REST Framework', 'Python', 'React', 'Vite', 'Token Auth', 'REST API'],
    imageUrl: '/assets/images/eduhaven.png',
    repoUrl: 'https://github.com/VhoraZishan/EduHaven',
    status: 'DEPLOYED & OPERATIONAL',
  },
  {
    id: 'skillmatch',
    title: 'SkillMatch',
    codename: 'DEPLOYMENT SKILLMATCH // ML JOB PREDICTION',
    category: 'AI & SYSTEMS',
    summary:
      'A machine learning career alignment platform that parses candidate skill sets and matches them to suitable engineering job titles using natural language processing.',
    operationalEffect:
      'Leverages TF-IDF n-gram vectorization on unstructured resume keywords and Random Forest multi-class classification to predict role compatibility with confidence scoring.',
    techStack: ['Python', 'Streamlit', 'Scikit-learn', 'TF-IDF', 'Pandas', 'NumPy'],
    imageUrl: '/assets/images/skillmatch.png',
    demoUrl: 'https://skillmatch-cu.streamlit.app/',
    repoUrl: 'https://github.com/VhoraZishan',
    status: 'DEPLOYED & OPERATIONAL',
  },
  {
    id: 'dayflow',
    title: 'Dayflow HRMS',
    codename: 'DEPLOYMENT DAYFLOW // HUMAN RESOURCES SUITE',
    category: 'FULL-STACK',
    summary:
      'Full-stack enterprise HR management suite streamlining personnel onboarding, shift attendance monitoring, and administrative leave approval workflows.',
    operationalEffect:
      'Features JWT authorization with role-based access for administrators and personnel, auto-generated login credentials, and session-enforced clock-in systems.',
    techStack: ['FastAPI', 'Python', 'SQLAlchemy', 'PostgreSQL', 'React'],
    imageUrl: '/assets/images/dayflow.png',
    repoUrl: 'https://github.com/yashdave182/ODOO-X-GCET-',
    status: 'DEPLOYED & OPERATIONAL',
  },
  {
    id: 'ai-loan-chatbot',
    title: 'AI Loan Sales Chatbot',
    codename: 'DEPLOYMENT SANCTION-AI // AUTOMATED UNDERWRITING',
    category: 'AI & SYSTEMS',
    summary:
      'Conversational loan intake and eligibility assessment engine that replaces static loan forms with an intelligent, interactive dialogue flow.',
    operationalEffect:
      'Processes natural language loan parameters, conducts identity screening, evaluates deterministic underwriting credit rules, and dynamically renders downloadable sanction letters.',
    techStack: ['Python', 'Streamlit', 'Groq LLaMA API', 'Rule Engine'],
    imageUrl: '/assets/images/loanchatbot.png',
    demoUrl: 'https://loanchatbotprototype.streamlit.app/',
    repoUrl: 'https://github.com/VhoraZishan',
    status: 'DEPLOYED & OPERATIONAL',
  },
  {
    id: 'talenttrade',
    title: 'TalentTrade',
    codename: 'DEPLOYMENT TALENTTRADE // SKILL EXCHANGE',
    category: 'COMMUNITY & LABS',
    summary:
      'A community barter and peer-to-peer skill exchange platform connecting students to teach and learn technical capabilities directly from peers.',
    operationalEffect:
      'Includes user credential authentication, category post indexing, direct user-to-user chat messaging, and responsive bootstrap interfaces.',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'HTML5', 'CSS3'],
    imageUrl: '/assets/images/talenttrade.png',
    repoUrl: 'https://github.com/VhoraZishan/TalentTrade',
    status: 'ARCHIVED DISPATCH',
  },
  {
    id: 'hackprints',
    title: 'HackPrints Forums',
    codename: 'DEPLOYMENT HACKPRINTS // TECHNICAL FORUM',
    category: 'COMMUNITY & LABS',
    summary:
      'Interactive discussion forum platform designed to foster technical troubleshooting and community knowledge sharing across coding domains.',
    operationalEffect:
      'Engineered with relational MySQL database structures, session tracking, threaded comment hierarchies, and administrative moderation endpoints.',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    imageUrl: '/assets/images/hackprints.png',
    repoUrl: 'https://github.com/VhoraZishan/hackprintsForums',
    status: 'ARCHIVED DISPATCH',
  },
  {
    id: 'books4u',
    title: 'Books4U',
    codename: 'DEPLOYMENT BOOKS4U // E-COMMERCE PORTAL',
    category: 'COMMUNITY & LABS',
    summary:
      'Online bookstore and marketplace portal enabling users to browse book catalogs, publish listings, and simulate purchase transactions.',
    operationalEffect:
      'Engineered with Flask backend and Jinja2 templating, incorporating secure session cookies, database-driven catalog searches, and order workflows.',
    techStack: ['Flask', 'Python', 'SQLAlchemy', 'Jinja2', 'Bootstrap'],
    imageUrl: '/assets/images/books4u.png',
    repoUrl: 'https://github.com/Turbobooster07/Books4U',
    status: 'ARCHIVED DISPATCH',
  },
  {
    id: 'portfolio-v1',
    title: 'Modular Homelab Portfolio',
    codename: 'DEPLOYMENT DISPATCH // CONTAINERIZED SITE',
    category: 'COMMUNITY & LABS',
    summary:
      'Containerized responsive web portfolio with dynamic asynchronous module loading, automatically deployed from GitHub to a private Ubuntu server.',
    operationalEffect:
      'Demonstrated lightweight modular design, CI/CD pipeline automation with GitHub Actions, and HTTPS zero-trust delivery via Cloudflare Tunnel.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Docker', 'Cloudflare Tunnel', 'GitHub Actions'],
    imageUrl: '/assets/images/portfolio.png',
    repoUrl: 'https://github.com/VhoraZishan/portfolio',
    status: 'ARCHIVED DISPATCH',
  },
];
