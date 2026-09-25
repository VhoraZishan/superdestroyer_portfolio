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
  tagline: 'Curious mind. Clean backend. Cloudy ambitions.',
  avatarUrl: '/assets/images/profile_photo.jpeg',
  resumeUrl: '/assets/pdfs/ZishanIrfanVhoraResume.pdf',
  socials: {
    github: 'https://github.com/VhoraZishan',
    linkedin: 'https://linkedin.com/in/zishan-vhora-a0b1a42bb',
    email: 'mailto:vhorazishan@gmail.com',
  },
  bioParagraphs: [
    'Computer Engineering student with a core focus on backend development, distributed cloud platforms, and how complex software systems operate behind the scenes.',
    'More inclined toward engineering resilient REST APIs, designing high-throughput databases, and architecting microservices rather than purely superficial UI work.',
    'Hands-on experience building full-stack platforms, dynamic Role-Based Access Control (RBAC) security engines, hospital bed orchestration platforms, and self-hosted Linux server infrastructure.',
    'Actively seeking engineering internships, backend contracts, and collaborative technical missions to solve real-world system challenges.',
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
