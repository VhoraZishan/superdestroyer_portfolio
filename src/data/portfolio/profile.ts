// ─── Super Destroyer Personnel Profile ───────────────────────────────────────
// Easily update your personal bio, callsign, comms links, and resume download.

export interface ProfileData {
  name: string;
  callsign: string;
  rank: string;
  tagline: string;
  bioParagraphs: string[];
  avatarUrl: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  telemetry: {
    requisitionSlips: string;
    superCredits: number;
    medals: string;
    samples: {
      common: number;
      rare: number;
      super: number;
    };
    clearanceLevel: string;
  };
}

export const PROFILE: ProfileData = {
  name: 'Zishan Vhora',
  callsign: 'SES SUPER DESTROYER // COMMANDER',
  rank: 'BACKEND ARCHITECT // CADET LEVEL 8',
  tagline: 'Curious mind. Clean backend. Cloudy ambitions. // HIGH COMMAND DIRECTIVE 44-A',
  avatarUrl: '/assets/images/profile_photo.jpeg',
  resumeUrl: '/assets/pdfs/ZishanIrfanVhoraResume.pdf',
  socials: {
    github: 'https://github.com/VhoraZishan',
    linkedin: 'https://linkedin.com/in/zishan-vhora-a0b1a42bb',
    email: 'mailto:vhorazishan@gmail.com',
  },
  bioParagraphs: [
    'OFFICER DISPATCH: Computer Engineering specialist commissioned to engineer, deploy, and maintain mission-critical backend systems, distributed cloud platforms, and resilient database architectures.',
    'TACTICAL DOCTRINE: More inclined toward engineering fault-tolerant REST APIs, high-throughput microservices, and airtight server pipelines than superficial cosmetic facades.',
    'SYSTEM SPECIFICATIONS: Proven combat tour experience developing enterprise full-stack platforms, dynamic Role-Based Access Control (RBAC) security engines, hospital bed orchestration platforms, and self-hosted Linux server infrastructure.',
    'WAR EFFORT REQUISITION: Cleared by Democracy Officers for immediate deployment in software engineering internships, backend architecture tours of duty, and full-scale technical collaboration.',
  ],
  telemetry: {
    requisitionSlips: '3,406 R',
    superCredits: 600,
    medals: '31 / 250',
    samples: {
      common: 15,
      rare: 17,
      super: 0,
    },
    clearanceLevel: 'LEVEL 8',
  },
};
