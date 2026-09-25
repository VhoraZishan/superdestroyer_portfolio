// ─── Galactic Campaign Log (Experience & Tours of Duty) ──────────────────────
// Easily add, remove, or modify career campaigns and operational achievements.

export interface CampaignTour {
  id: string;
  codename: string;
  theater: string; // e.g. "SECTOR 01: COMMERCIAL OPERATIONS"
  role: string;
  organization: string;
  duration: string;
  location: string;
  status: 'ACTIVE CAMPAIGN' | 'HONORABLY CONCLUDED';
  overview: string;
  deliverables: string[];
  techArmament: string[];
}

export const CAMPAIGNS: CampaignTour[] = [
  {
    id: 'parul-chemicals',
    codename: 'OPERATION SYNTHESIS // SOFTWARE INTERN',
    theater: 'SECTOR 01: INDUSTRIAL CHEMICAL AUTOMATION',
    role: 'Software Engineer Intern',
    organization: 'Parul Chemicals',
    duration: 'Feb 2026 – Present',
    location: 'Vadodara, Gujarat',
    status: 'ACTIVE CAMPAIGN',
    overview:
      'Spearheading the engineering, optimization, and end-to-end testing of internal enterprise web systems using Python, FastAPI, and React.',
    deliverables: [
      'Designed and engineered a dynamic Role-Based Access Control (RBAC) authorization matrix with database-driven permissions, enabling runtime role creation across 30+ granular permission vectors.',
      'Constructed an administrative management dashboard for real-time employee role delegation and access auditing.',
      'Developed a centralized lead management engine that ingests, cleanses, and aggregates customer leads from multiple external pipelines.',
      'Conducted rigorous manual and automated functional validation across end-to-end user workflows, preemptively eliminating logic and UI regressions.',
      'Collaborated on database query tuning and architectural refactoring, substantially improving internal software responsiveness and uptime.',
    ],
    techArmament: ['Python', 'FastAPI', 'React', 'RBAC Security', 'SQLAlchemy', 'PostgreSQL', 'Uvicorn'],
  },
  {
    id: 'svit-placement',
    codename: 'OPERATION CITIZEN RECRUITMENT // JOINT CHIEF',
    theater: 'SECTOR 02: ACADEMIC PLACEMENT DIRECTORATE',
    role: 'Joint Chief Placement Coordinator',
    organization: 'Sardar Vallabhbhai Patel Institute of Technology',
    duration: 'Feb 2025 – Present',
    location: 'Vasad, Gujarat',
    status: 'ACTIVE CAMPAIGN',
    overview:
      'Elevated from Student Coordinator to Joint Chief in May 2026. Directing recruitment operations, technical mock assessment drives, and student readiness programs.',
    deliverables: [
      'Directing a team of 8 student coordinators to schedule, manage, and execute full-scale mock placement recruitment drives for 200+ engineering candidates.',
      'Automated candidate performance tracking, grading analytics, and leaderboard distribution utilizing Google Sheets and Google Apps Script, cutting manual effort by over 70%.',
      'Orchestrated logistical infrastructure, venue allocations, and corporate seminar scheduling during major on-campus placement sessions.',
      'Served as the key communication conduit between executive corporate recruiters, university faculty directors, and student cohorts.',
      'Conducted pre-placement readiness seminars, orienting aspiring engineers on corporate recruitment standards and algorithmic interview expectations.',
    ],
    techArmament: ['Google Apps Script', 'Process Automation', 'Leadership', 'Resource Logistics', 'Public Speaking'],
  },
];
