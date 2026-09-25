// ─── Armory Loadout Matrix (Skills & Weapons) ─────────────────────────────────
// Easily append or modify technical skills, proficiency tiers, and loadout specs.

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  tier: string; // e.g. "TIER 4 - COMBAT READY"
  status: 'MASTERED' | 'OPERATIONAL' | 'CLASSIFIED';
  description: string;
  operationalEffect: string;
  relatedStratagems: string[]; // Related projects or tech
}

export interface SkillCategory {
  id: string;
  title: string;
  callsign: string;
  items: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'OFFENSIVE LANGUAGES',
    callsign: 'PRIMARY FIREPOWER',
    items: [
      {
        id: 'python',
        name: 'Python',
        category: 'OFFENSIVE LANGUAGES',
        tier: 'TIER 4 - EXPERT ARSENAL',
        status: 'MASTERED',
        description: 'Core weapon of choice for backend systems, machine learning pipelines, and high-concurrency API microservices.',
        operationalEffect: 'Powers production FastAPI microservices, scikit-learn ML engines, automation scripts, and server-side data workflows.',
        relatedStratagems: ['FastAPI', 'Flask', 'Django REST', 'CareFlow Nexus', 'IntelliPrep'],
      },
      {
        id: 'javascript',
        name: 'JavaScript / TypeScript',
        category: 'OFFENSIVE LANGUAGES',
        tier: 'TIER 4 - COMBAT READY',
        status: 'MASTERED',
        description: 'Standard tactical language for reactive web user interfaces, client-side state engines, and Three.js 3D graphic pipelines.',
        operationalEffect: 'Drives dynamic frontend rendering, REST API integrations, asynchronous state management, and real-time WebSockets.',
        relatedStratagems: ['React', 'Three.js / R3F', 'Vite', 'BunkStop', 'EduHaven'],
      },
      {
        id: 'sql',
        name: 'SQL (Structured Query Language)',
        category: 'OFFENSIVE LANGUAGES',
        tier: 'TIER 4 - ADVANCED ORDNANCE',
        status: 'MASTERED',
        description: 'Relational data query and schema management engine for complex multi-table joins, transactions, and indexing.',
        operationalEffect: 'Enables high-integrity relational schemas, optimized query execution, and relational mapping via SQLAlchemy.',
        relatedStratagems: ['PostgreSQL', 'MySQL', 'SQLAlchemy', 'Supabase'],
      },
      {
        id: 'java',
        name: 'Java',
        category: 'OFFENSIVE LANGUAGES',
        tier: 'TIER 3 - OPERATIONAL',
        status: 'OPERATIONAL',
        description: 'Robust object-oriented backend programming language for enterprise architectures and algorithm implementations.',
        operationalEffect: 'Used for object-oriented software engineering, data structures, and algorithmic computational logic.',
        relatedStratagems: ['Spring Boot', 'OOP Systems', 'Data Structures'],
      },
      {
        id: 'c',
        name: 'C Programming',
        category: 'OFFENSIVE LANGUAGES',
        tier: 'TIER 3 - OPERATIONAL',
        status: 'OPERATIONAL',
        description: 'Low-level procedural foundation for memory management, pointers, and core computer science fundamentals.',
        operationalEffect: 'Forms the computational basis for understanding OS syscalls, heap/stack memory allocation, and hardware interactions.',
        relatedStratagems: ['Operating Systems', 'Memory Architectures'],
      },
      {
        id: 'php',
        name: 'PHP',
        category: 'OFFENSIVE LANGUAGES',
        tier: 'TIER 3 - OPERATIONAL',
        status: 'OPERATIONAL',
        description: 'Server-side scripting language for relational CRUD portals, session handling, and full-stack web applications.',
        operationalEffect: 'Utilized in building community web platforms, user session authentication, and direct MySQL query drivers.',
        relatedStratagems: ['TalentTrade', 'HackPrints Forums', 'MySQL'],
      },
    ],
  },
  {
    id: 'frameworks',
    title: 'TACTICAL FRAMEWORKS',
    callsign: 'RAPID DEPLOYMENT',
    items: [
      {
        id: 'fastapi',
        name: 'FastAPI',
        category: 'TACTICAL FRAMEWORKS',
        tier: 'TIER 4 - PRIMARY DOCTRINE',
        status: 'MASTERED',
        description: 'Modern, high-performance web framework for building asynchronous Python REST APIs with automatic Swagger documentation.',
        operationalEffect: 'Built dynamic RBAC authorization engines, hospital management APIs, and adaptive assessment backends.',
        relatedStratagems: ['Pydantic', 'Uvicorn', 'CareFlow Nexus', 'IntelliPrep', 'Dayflow HRMS'],
      },
      {
        id: 'react',
        name: 'React.js',
        category: 'TACTICAL FRAMEWORKS',
        tier: 'TIER 4 - FRONT-LINE SUITE',
        status: 'MASTERED',
        description: 'Component-driven reactive UI library for building responsive web dashboards, state machines, and interactive 3D viewports.',
        operationalEffect: 'Powers the entire Super Destroyer 3D portfolio, student attendance apps, and hospital coordination portals.',
        relatedStratagems: ['Vite', 'Zustand', 'Three.js / Drei', 'Tailwind CSS'],
      },
      {
        id: 'flask',
        name: 'Flask',
        category: 'TACTICAL FRAMEWORKS',
        tier: 'TIER 3 - OPERATIONAL',
        status: 'OPERATIONAL',
        description: 'Lightweight WSGI Python microframework for rapid modular backend services and Jinja2 templated portals.',
        operationalEffect: 'Engineered e-commerce bookstore platforms, session managers, and custom routing handlers.',
        relatedStratagems: ['Books4U', 'Jinja2', 'SQLAlchemy'],
      },
      {
        id: 'django-rest',
        name: 'Django REST Framework',
        category: 'TACTICAL FRAMEWORKS',
        tier: 'TIER 3 - OPERATIONAL',
        status: 'OPERATIONAL',
        description: 'Battle-tested toolkit for building robust, secure Web APIs with token authentication and model serialization.',
        operationalEffect: 'Constructed knowledge-sharing forum platforms with token auth, media upload pipelines, and permission layers.',
        relatedStratagems: ['EduHaven', 'Django ORM', 'Token Auth'],
      },
      {
        id: 'scikit-learn',
        name: 'Scikit-learn',
        category: 'TACTICAL FRAMEWORKS',
        tier: 'TIER 3 - OPERATIONAL',
        status: 'OPERATIONAL',
        description: 'Machine learning library for classification, regression, clustering, and predictive text modeling.',
        operationalEffect: 'Implemented Random Forest classification and TF-IDF NLP text vectorization for job-matching platforms.',
        relatedStratagems: ['SkillMatch', 'Pandas', 'NumPy'],
      },
    ],
  },
  {
    id: 'databases',
    title: 'SUPPLY & LOGISTICS (DATABASES)',
    callsign: 'STORAGE REPOSITORIES',
    items: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'SUPPLY & LOGISTICS (DATABASES)',
        tier: 'TIER 4 - ENTERPRISE ARMOR',
        status: 'MASTERED',
        description: 'Advanced open-source relational database system with enterprise reliability, ACID transactions, and JSONB capabilities.',
        operationalEffect: 'Engineered persistent stores for test assessment metadata, time-tracking analytics, and user account records.',
        relatedStratagems: ['SQLAlchemy', 'IntelliPrep', 'Supabase'],
      },
      {
        id: 'supabase',
        name: 'Supabase',
        category: 'SUPPLY & LOGISTICS (DATABASES)',
        tier: 'TIER 4 - RAPID LOGISTICS',
        status: 'MASTERED',
        description: 'Open-source Firebase alternative featuring Postgres database, instant realtime subscriptions, and managed auth.',
        operationalEffect: 'Delivered realtime database subscriptions, row-level security policies, and user authentication in BunkStop.',
        relatedStratagems: ['BunkStop', 'PostgreSQL', 'Realtime Sync'],
      },
      {
        id: 'mysql',
        name: 'MySQL',
        category: 'SUPPLY & LOGISTICS (DATABASES)',
        tier: 'TIER 3 - OPERATIONAL',
        status: 'OPERATIONAL',
        description: 'Industry standard relational database management system for web applications and multi-table entity relationships.',
        operationalEffect: 'Utilized across PHP community platforms, user credential tables, and relational data normalization.',
        relatedStratagems: ['TalentTrade', 'HackPrints Forums'],
      },
      {
        id: 'firebase',
        name: 'Firebase',
        category: 'SUPPLY & LOGISTICS (DATABASES)',
        tier: 'TIER 3 - OPERATIONAL',
        status: 'OPERATIONAL',
        description: 'Google cloud platform for real-time document NoSQL databases, storage buckets, and serverless authentication.',
        operationalEffect: 'Enabled real-time hospital bed availability synchronization and staff event notifications in CareFlow Nexus.',
        relatedStratagems: ['CareFlow Nexus', 'NoSQL Firestore'],
      },
    ],
  },
  {
    id: 'tools',
    title: 'INFRASTRUCTURE & ORBITAL TOOLS',
    callsign: 'FLEET SUPPORT',
    items: [
      {
        id: 'docker',
        name: 'Docker & Containers',
        category: 'INFRASTRUCTURE & ORBITAL TOOLS',
        tier: 'TIER 4 - SYSTEM HARDENED',
        status: 'MASTERED',
        description: 'OS-level container virtualization platform for reproducible build environments and microservice isolation.',
        operationalEffect: 'Containerized self-hosted web applications, portfolio instances, and background homelab services.',
        relatedStratagems: ['Ubuntu Server', 'Cloudflare Tunnel', 'Homelab'],
      },
      {
        id: 'linux-server',
        name: 'Linux / Ubuntu Server',
        category: 'INFRASTRUCTURE & ORBITAL TOOLS',
        tier: 'TIER 4 - SYSTEM HARDENED',
        status: 'MASTERED',
        description: 'Debian-based server environment powering a 24/7 personal homelab with command-line administration.',
        operationalEffect: 'Configured headless server daemon processes, SSH hardening, systemd service units, and Samba file shares.',
        relatedStratagems: ['Self-Hosted Homelab', 'Samba', 'Netdata'],
      },
      {
        id: 'cloudflare',
        name: 'Cloudflare Tunnel',
        category: 'INFRASTRUCTURE & ORBITAL TOOLS',
        tier: 'TIER 4 - SECURE RELAY',
        status: 'MASTERED',
        description: 'Zero-trust tunneling solution exposing local homelab ports directly to custom domains without open inbound router ports.',
        operationalEffect: 'Secures self-hosted domains with automatic SSL certificates, DDoS mitigation, and encrypted outbound relays.',
        relatedStratagems: ['Homelab', 'Custom Domains', 'SSL/TLS'],
      },
      {
        id: 'git-github',
        name: 'Git & GitHub Actions',
        category: 'INFRASTRUCTURE & ORBITAL TOOLS',
        tier: 'TIER 4 - FLEET COMMAND',
        status: 'MASTERED',
        description: 'Distributed version control and automated continuous integration & continuous deployment (CI/CD) pipelines.',
        operationalEffect: 'Engineered automated GitHub Actions deployment runners that push updates directly to production servers on git push.',
        relatedStratagems: ['CI/CD Pipelines', 'Automated Deployments'],
      },
      {
        id: 'tailscale',
        name: 'Tailscale (Mesh VPN)',
        category: 'INFRASTRUCTURE & ORBITAL TOOLS',
        tier: 'TIER 4 - ENCRYPTED MESH',
        status: 'MASTERED',
        description: 'WireGuard-based zero-config mesh VPN providing secure encrypted peer-to-peer tunnels across all devices.',
        operationalEffect: 'Connects all workstations, mobile devices, and home servers into a private encrypted subnet worldwide.',
        relatedStratagems: ['WireGuard', 'Remote Administration'],
      },
    ],
  },
];
