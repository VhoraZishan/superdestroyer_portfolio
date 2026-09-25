// ─── Super Earth Logistics & Credentials Manifest (Education & Certs) ─────────
// Easily append or modify academic records, degree commissions, and certified badges.

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  scoreLabel: string;
  specialization: string;
  keyCoursework: string[];
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  year: string;
  classification: string;
  description: string;
  competencies: string[];
}

export const EDUCATION_RECORDS: EducationEntry[] = [
  {
    id: 'bachelor-ce',
    degree: 'Bachelor of Engineering in Computer Engineering',
    institution: 'Sardar Vallabhbhai Patel Institute of Technology, Vasad',
    period: '2024 – 2027',
    score: '7.87',
    scoreLabel: 'CURRENT CGPA',
    specialization: 'Advanced Backend Systems & Distributed Computing',
    keyCoursework: [
      'Database Management Systems (DBMS)',
      'Operating Systems & System Architecture',
      'Object-Oriented Programming (Java / Python)',
      'Design & Analysis of Algorithms',
      'Computer Networks & Distributed Systems',
    ],
  },
  {
    id: 'diploma-ce',
    degree: 'Diploma in Computer Engineering',
    institution: 'Polytechnic, The Maharaja Sayajirao University of Baroda, Vadodara',
    period: '2021 – 2024',
    score: '7.07',
    scoreLabel: 'GRADUATING CPI',
    specialization: 'Core Computer Engineering & Software Foundations',
    keyCoursework: [
      'C & C++ Programming',
      'Relational Database Modeling',
      'Web Development Fundamentals',
      'Data Structures & File Management',
    ],
  },
];

export const CERTIFICATIONS: CertificationEntry[] = [
  {
    id: 'code-unnati',
    title: 'Code Unnati Program (Foundation & Advanced)',
    issuer: 'SAP & Edunet Foundation',
    year: '2025',
    classification: 'MERIT COMMISSION // AI & ENTERPRISE CLOUD',
    description:
      'Rigorous industry-aligned technical curriculum covering machine learning algorithms, deep learning neural networks, edge computing, SAP Analytics Cloud, and SAP ABAP on Business Technology Platform (BTP).',
    competencies: [
      'Python Data Analysis & Modeling',
      'Machine Learning & Artificial Intelligence',
      'Deep Learning & Edge Computing',
      'SAP Analytics Cloud & Enterprise Reporting',
      'SAP ABAP on Business Technology Platform (BTP)',
    ],
  },
];
