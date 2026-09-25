import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useTerminalStore } from '../store/terminalStore';
import {
  PROFILE,
  SKILL_CATEGORIES,
  CAMPAIGNS,
  PROJECTS,
  EDUCATION_RECORDS,
  CERTIFICATIONS,
} from '../data/portfolio';

// ─── 3D Holographic Super Destroyer Preview ─────────────────────────────────
function HoloShipModel() {
  const { scene } = useGLTF('/assets/Imperial.gltf');
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={0.155} rotation={[0.22, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

function HoloShipViewer() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        background: 'radial-gradient(ellipse at center, #071524 0%, #03080e 100%)',
        border: '1px solid rgba(0, 229, 255, 0.4)',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 30px rgba(0, 229, 255, 0.1)',
      }}
    >
      <Canvas camera={{ position: [0, 2.2, 5.5], fov: 42 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={1.2} color="#38bdf8" />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#e0f2fe" />
        <directionalLight position={[-5, -4, -5]} intensity={1.8} color="#00e5ff" />
        <gridHelper args={[8, 16, '#00e5ff', '#0f2942']} position={[0, -0.85, 0]} />
        <HoloShipModel />
      </Canvas>

      {/* Hologram scanline & tactical HUD badges */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          left: '10px',
          fontSize: '9px',
          fontFamily: "'Share Tech Mono', monospace",
          color: '#00e5ff',
          letterSpacing: '0.12em',
          fontWeight: 'bold',
          background: 'rgba(0,0,0,0.7)',
          padding: '2px 6px',
          borderRadius: '2px',
          border: '1px solid rgba(0,229,255,0.4)',
          pointerEvents: 'none',
        }}
      >
        // HOLOGRAPHIC RECON // SES OCTAGON OF THE STARS
      </div>

      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '10px',
          fontSize: '9px',
          fontFamily: "'Share Tech Mono', monospace",
          color: '#22c55e',
          letterSpacing: '0.1em',
          fontWeight: 'bold',
          background: 'rgba(0,0,0,0.7)',
          padding: '2px 6px',
          borderRadius: '2px',
          border: '1px solid rgba(34,197,94,0.4)',
          pointerEvents: 'none',
        }}
      >
        HULL INTEGRITY: 100% [ONLINE]
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '10px',
          fontSize: '9px',
          fontFamily: "'Share Tech Mono', monospace",
          color: '#ffd700',
          letterSpacing: '0.1em',
          background: 'rgba(0,0,0,0.7)',
          padding: '2px 6px',
          borderRadius: '2px',
          border: '1px solid rgba(255,215,0,0.4)',
          pointerEvents: 'none',
        }}
      >
        WARP DRIVE: CHARGED // HELLPODS ARMED
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '10px',
          fontSize: '9px',
          fontFamily: "'Share Tech Mono', monospace",
          color: '#94a3b8',
          letterSpacing: '0.08em',
          background: 'rgba(0,0,0,0.7)',
          padding: '2px 6px',
          borderRadius: '2px',
          border: '1px solid #334155',
          pointerEvents: 'none',
        }}
      >
        SUPER DESTROYER CLASS-IV
      </div>
    </div>
  );
}

export interface TerminalItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  bullets?: string[];
  status: string;
  badge: string;
  imageUrl?: string;
  actionLabel?: string;
  actionUrl?: string;
  secondaryActionLabel?: string;
  secondaryActionUrl?: string;
  isDownload?: boolean;
  stratagems?: string[];
}

export function TerminalModal() {
  const isOpen = useTerminalStore((s) => s.isOpen);
  const activeRoom = useTerminalStore((s) => s.activeRoom);
  const activeTab = useTerminalStore((s) => s.activeTab);
  const selectedItemId = useTerminalStore((s) => s.selectedItemId);
  const closeTerminal = useTerminalStore((s) => s.closeTerminal);
  const setActiveTab = useTerminalStore((s) => s.setActiveTab);

  // Active items for current room & tab
  const tabData = useMemo<{
    title: string;
    subtitle: string;
    tabs: { id: string; label: string }[];
    items: TerminalItem[];
  }>(() => {
    if (!isOpen || !activeRoom) return { title: '', subtitle: '', tabs: [], items: [] };

    switch (activeRoom) {
      case 'bridge':
        return {
          title: 'SES SUPER DESTROYER // COMMAND TERMINAL',
          subtitle: 'PERSONNEL SERVICE DOSSIER',
          tabs: [
            { id: 'bio', label: 'SERVICE DOSSIER' },
            { id: 'comms', label: 'COMMS RELAY' },
            { id: 'resume', label: 'REQUISITION ORDER' },
          ],
          items:
            activeTab === 0
              ? [
                  {
                    id: 'overview',
                    name: 'COMMANDER OVERVIEW',
                    subtitle: 'PERSONNEL SUMMARY',
                    description: PROFILE.tagline,
                    bullets: PROFILE.bioParagraphs,
                    status: 'ACTIVE DUTY',
                    badge: 'LEVEL 8',
                    imageUrl: PROFILE.avatarUrl,
                    stratagems: ['Python', 'FastAPI', 'Linux', 'Docker', 'PostgreSQL'],
                  },
                ]
              : activeTab === 1
              ? [
                  {
                    id: 'github',
                    name: 'GITHUB CODEBASE REPOSITORY',
                    subtitle: 'PUBLIC SOURCE DISPATCH',
                    description: 'Explore production repositories, microservices, open-source repositories, and homelab setup scripts.',
                    bullets: [
                      'Direct link to 15+ public engineering repositories.',
                      'Commit history across backend pipelines, API architectures, and 3D web applications.',
                    ],
                    status: 'SIGNAL ONLINE',
                    badge: 'ENCRYPTED',
                    actionLabel: 'OPEN GITHUB PROFILE',
                    actionUrl: PROFILE.socials.github,
                    stratagems: ['Git', 'CI/CD Actions', 'Open Source'],
                  },
                  {
                    id: 'linkedin',
                    name: 'LINKEDIN PROFESSIONAL NETWORK',
                    subtitle: 'OFFICER RECORD & NETWORK',
                    description: 'Connect for software engineering opportunities, internships, and technical collaboration.',
                    bullets: [
                      'Professional trajectory, recommendations, and real-time career updates.',
                      'Direct communication channel for engineering recruiters.',
                    ],
                    status: 'SIGNAL ONLINE',
                    badge: 'VERIFIED',
                    actionLabel: 'OPEN LINKEDIN PROFILE',
                    actionUrl: PROFILE.socials.linkedin,
                    stratagems: ['Networking', 'Career Tour'],
                  },
                  {
                    id: 'email',
                    name: 'DIRECT COMMS RELAY (EMAIL)',
                    subtitle: 'TRANSMISSION PROTOCOL',
                    description: 'Send encrypted dispatches directly to personal communications array.',
                    bullets: [
                      'Direct email response within 24 operational hours.',
                      'Accepting software engineering internship and freelance proposals.',
                    ],
                    status: 'READY FOR TRANSMIT',
                    badge: 'SECURE',
                    actionLabel: 'TRANSMIT EMAIL',
                    actionUrl: PROFILE.socials.email,
                    stratagems: ['vhorazishan@gmail.com'],
                  },
                ]
              : [
                  {
                    id: 'resume-doc',
                    name: 'OFFICIAL SERVICE DOSSIER (PDF)',
                    subtitle: 'OFFICER RESUME MANIFEST',
                    description: 'Official verified curriculum vitae documenting academic records, internships, software engineering projects, and full-stack technical competencies.',
                    bullets: [
                      'Complete chronological timeline of software development internships and academic leadership.',
                      'Detailed summary of production systems, FastAPI microservices, and database engineering.',
                    ],
                    status: 'AUTHORIZED FOR REQUISITION',
                    badge: 'CLEARED',
                    actionLabel: 'DOWNLOAD RESUME (PDF)',
                    actionUrl: PROFILE.resumeUrl,
                    isDownload: true,
                    stratagems: ['PDF Format', 'Verified 2026', 'Full Documentation'],
                  },
                ],
        };

      case 'armory': {
        const cat = SKILL_CATEGORIES[Math.min(activeTab, SKILL_CATEGORIES.length - 1)];
        return {
          title: 'LOGISTICS DIVISION // ARMORY MATRIX',
          subtitle: 'TECHNICAL LOADOUT & WEAPON ARSENAL',
          tabs: SKILL_CATEGORIES.map((c) => ({ id: c.id, label: c.title })),
          items: (cat?.items || []).map((sk) => ({
            id: sk.id,
            name: sk.name,
            subtitle: sk.tier,
            description: sk.description,
            bullets: [sk.operationalEffect],
            status: sk.status,
            badge: sk.tier.split(' - ')[0],
            stratagems: sk.relatedStratagems,
          })),
        };
      }

      case 'war-room':
        return {
          title: 'GALACTIC WAR ROOM // CAMPAIGN LOG',
          subtitle: 'EXPERIENCE & TOURS OF DUTY',
          tabs: [
            { id: 'all-campaigns', label: 'OPERATIONAL CAMPAIGNS' },
          ],
          items: CAMPAIGNS.map((c) => ({
            id: c.id,
            name: c.role,
            subtitle: `${c.organization} // ${c.duration}`,
            description: c.overview,
            bullets: c.deliverables,
            status: c.status,
            badge: c.location,
            stratagems: c.techArmament,
          })),
        };

      case 'archive': {
        const filterCategory =
          activeTab === 1 ? 'FULL-STACK' : activeTab === 2 ? 'AI & SYSTEMS' : activeTab === 3 ? 'COMMUNITY & LABS' : 'ALL';
        const filteredProjects =
          filterCategory === 'ALL' ? PROJECTS : PROJECTS.filter((p) => p.category === filterCategory);
        return {
          title: 'STRATEGIC ARCHIVE // MISSION DISPATCHES',
          subtitle: 'DEPLOYED OPERATIONS & PROJECTS',
          tabs: [
            { id: 'all', label: 'ALL DEPLOYMENTS' },
            { id: 'fullstack', label: 'FULL-STACK PLATFORMS' },
            { id: 'ai-sys', label: 'AI & SYSTEMS' },
            { id: 'community', label: 'COMMUNITY & LABS' },
          ],
          items: filteredProjects.map((p) => ({
            id: p.id,
            name: p.title,
            subtitle: p.codename,
            description: p.summary,
            bullets: [p.operationalEffect],
            status: p.status,
            badge: p.category,
            imageUrl: p.imageUrl,
            actionLabel: p.demoUrl ? 'LAUNCH LIVE DEPLOYMENT' : undefined,
            actionUrl: p.demoUrl,
            secondaryActionLabel: p.repoUrl ? 'VIEW REPOSITORY' : undefined,
            secondaryActionUrl: p.repoUrl,
            stratagems: p.techStack,
          })),
        };
      }

      case 'cargo-bay':
        return {
          title: 'CARGO HOLD // LOGISTICS & CREDENTIALS',
          subtitle: 'ACADEMIC COMMISSIONS & MERIT BADGES',
          tabs: [
            { id: 'education', label: 'ACADEMIC COMMISSIONS' },
            { id: 'certs', label: 'SUPER EARTH MERIT BADGES' },
          ],
          items:
            activeTab === 0
              ? EDUCATION_RECORDS.map((e) => ({
                  id: e.id,
                  name: e.degree,
                  subtitle: `${e.institution} // ${e.period}`,
                  description: `${e.specialization}. Graduated with ${e.scoreLabel}: ${e.score}.`,
                  bullets: e.keyCoursework,
                  status: 'COMMISSIONED',
                  badge: `${e.scoreLabel}: ${e.score}`,
                  stratagems: e.keyCoursework.slice(0, 4),
                }))
              : CERTIFICATIONS.map((c) => ({
                  id: c.id,
                  name: c.title,
                  subtitle: `${c.issuer} // ${c.year}`,
                  description: c.description,
                  bullets: c.competencies,
                  status: 'CERTIFIED & VERIFIED',
                  badge: c.year,
                  stratagems: c.competencies,
                })),
        };

      default:
        return { title: '', subtitle: '', tabs: [], items: [] };
    }
  }, [isOpen, activeRoom, activeTab]);

  // Selected item index
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sync selected index when items change
  useEffect(() => {
    if (tabData.items.length === 0) return;
    if (selectedItemId) {
      const idx = tabData.items.findIndex((it) => it.id === selectedItemId);
      if (idx !== -1) {
        setSelectedIndex(idx);
        return;
      }
    }
    setSelectedIndex(0);
  }, [tabData.items, selectedItemId]);

  const activeItem = tabData.items[selectedIndex] || tabData.items[0];

  // Tab switching with bounds
  const handlePrevTab = useCallback(() => {
    if (tabData.tabs.length <= 1) return;
    const nextTab = activeTab > 0 ? activeTab - 1 : tabData.tabs.length - 1;
    setActiveTab(nextTab);
  }, [activeTab, tabData.tabs.length, setActiveTab]);

  const handleNextTab = useCallback(() => {
    if (tabData.tabs.length <= 1) return;
    const nextTab = activeTab < tabData.tabs.length - 1 ? activeTab + 1 : 0;
    setActiveTab(nextTab);
  }, [activeTab, tabData.tabs.length, setActiveTab]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeTerminal();
      } else if (e.key === 'q' || e.key === 'Q') {
        handlePrevTab();
      } else if (e.key === 'e' || e.key === 'E') {
        handleNextTab();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : tabData.items.length - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < tabData.items.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter') {
        if (activeItem?.actionUrl) {
          window.open(activeItem.actionUrl, '_blank');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeTerminal, handlePrevTab, handleNextTab, tabData.items.length, activeItem]);

  if (!isOpen || !activeRoom) return null;

  return (
    <div
      className="hd-terminal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeTerminal();
      }}
    >
      {/* CRT Vignette */}
      <div className="hd-terminal-vignette" />

      {/* Main Terminal Frame */}
      <div className="hd-terminal-window">
        {/* Tactical Corner Bracket Accents */}
        <div className="hd-corner tl" />
        <div className="hd-corner tr" />
        <div className="hd-corner bl" />
        <div className="hd-corner br" />

        {/* ── Top Header Bar ── */}
        <div className="hd-terminal-header">
          {/* Insignia & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.5)', borderRadius: '4px' }}>
              <span style={{ color: '#ffd700', fontSize: '10px', fontWeight: 900, letterSpacing: '0.05em' }}>SES</span>
            </div>
            <div>
              <div style={{ fontSize: '13px', letterSpacing: '0.18em', fontFamily: "'Orbitron', monospace", color: '#00e5ff', fontWeight: 'bold' }}>
                {tabData.title}
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#94a3b8', fontFamily: "'Share Tech Mono', monospace" }}>
                {tabData.subtitle}
              </div>
            </div>
          </div>

          {/* Top-Right Telemetry Counters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div className="hd-telemetry-badge">
              <span style={{ color: '#ffd700', fontWeight: 'bold' }}>{PROFILE.telemetry.requisitionSlips}</span>
            </div>
            <div className="hd-telemetry-badge">
              <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{PROFILE.telemetry.superCredits} [SC]</span>
            </div>
            <div className="hd-telemetry-badge">
              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>MEDALS: {PROFILE.telemetry.medals}</span>
            </div>
            <div className="hd-telemetry-badge">
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} title="Common" />
              <span style={{ color: '#fff', fontSize: '11px' }}>{PROFILE.telemetry.samples.common}</span>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }} title="Rare" />
              <span style={{ color: '#fff', fontSize: '11px' }}>{PROFILE.telemetry.samples.rare}</span>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899' }} title="Super" />
              <span style={{ color: '#fff', fontSize: '11px' }}>{PROFILE.telemetry.samples.super}</span>
            </div>
            <div style={{ padding: '4px 10px', background: '#ffd700', color: '#000', fontWeight: 900, fontSize: '11px', borderRadius: '3px', letterSpacing: '0.08em', fontFamily: "'Share Tech Mono', monospace" }}>
              {PROFILE.telemetry.clearanceLevel}
            </div>
          </div>
        </div>

        {/* ── Tactical Tabs Strip with [Q] and [E] ── */}
        <div className="hd-terminal-tabstrip">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
            <button
              onClick={handlePrevTab}
              className="hd-tab-btn"
              title="Previous Tab (Q)"
            >
              [Q]
            </button>

            {tabData.tabs.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`hd-tab-btn ${isActive ? 'active' : ''}`}
                >
                  {tab.label} — {idx + 1}
                </button>
              );
            })}

            <button
              onClick={handleNextTab}
              className="hd-tab-btn"
              title="Next Tab (E)"
            >
              [E]
            </button>
          </div>

          <button
            onClick={closeTerminal}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.45)',
              color: '#fca5a5',
              cursor: 'pointer',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '5px 12px',
              borderRadius: '4px',
              letterSpacing: '0.05em',
              transition: 'all 0.15s ease',
            }}
          >
            [ESC] DISCONNECT
          </button>
        </div>

        {/* ── Main Body Split (100% Scrollable) ── */}
        <div className="hd-terminal-body">
          {/* Left Module List (Scrollable) */}
          <div className="hd-terminal-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', fontFamily: "'Share Tech Mono', monospace", borderBottom: '1px solid #1e293b', paddingBottom: '6px' }}>
              <span>MODULE REGISTER</span>
              <span style={{ color: '#00e5ff', fontWeight: 'bold' }}>
                {selectedIndex + 1}/{tabData.items.length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {tabData.items.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`hd-module-item ${isSelected ? 'selected' : ''}`}
                  >
                    <div style={{ overflow: 'hidden', paddingRight: '8px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: isSelected ? '#ffd700' : '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.subtitle}
                      </div>
                    </div>

                    <div style={{ flexShrink: 0 }}>
                      <span style={{
                        fontSize: '9px',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em',
                        background: item.status.includes('ACTIVE') || item.status.includes('MASTERED') || item.status.includes('COMMISSIONED') ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
                        color: item.status.includes('ACTIVE') || item.status.includes('MASTERED') || item.status.includes('COMMISSIONED') ? '#4ade80' : '#fbbf24',
                        border: `1px solid ${item.status.includes('ACTIVE') || item.status.includes('MASTERED') || item.status.includes('COMMISSIONED') ? 'rgba(34,197,94,0.4)' : 'rgba(245,158,11,0.4)'}`
                      }}>
                        {item.status.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Inspection Panel (Scrollable) */}
          <div className="hd-terminal-detail">
            {activeItem ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 3D Super Destroyer Holographic Viewer for Commander Overview, or image preview for others */}
                {activeItem.id === 'overview' ? (
                  <HoloShipViewer />
                ) : activeItem.imageUrl ? (
                  <div className="hd-preview-box">
                    <img
                      src={activeItem.imageUrl}
                      alt={activeItem.name}
                      className="hd-preview-img"
                    />
                    <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'none' }}>
                      <span style={{ fontSize: '10px', fontFamily: "'Share Tech Mono', monospace", color: '#00e5ff', fontWeight: 'bold', padding: '2px 6px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(0,229,255,0.4)', borderRadius: '3px' }}>
                        // SECURE IMAGERY
                      </span>
                      <span style={{ fontSize: '10px', fontFamily: "'Share Tech Mono', monospace", color: '#ffd700', padding: '2px 6px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: '3px' }}>
                        {activeItem.badge}
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Ministry of Truth Tactical Lore Banner */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: 'rgba(0, 229, 255, 0.05)', borderLeft: '3px solid #00e5ff', borderTop: '1px solid rgba(0, 229, 255, 0.2)', borderRight: '1px solid rgba(0, 229, 255, 0.1)', borderBottom: '1px solid rgba(0, 229, 255, 0.1)', borderRadius: '2px', fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: '#94a3b8' }}>
                  <span style={{ color: '#00e5ff', fontWeight: 'bold', letterSpacing: '0.08em' }}>
                    // SUPER EARTH HIGH COMMAND DIRECTIVE 44-A //
                  </span>
                  <span style={{ color: '#ffd700', fontWeight: 'bold', letterSpacing: '0.06em' }}>
                    OFFICIAL SERVICE RECORD VERIFIED
                  </span>
                </div>

                {/* Header Information */}
                <div>
                  <div style={{ fontSize: '10px', fontFamily: "'Share Tech Mono', monospace", color: '#00e5ff', letterSpacing: '0.15em', fontWeight: 'bold' }}>
                    {activeItem.subtitle}
                  </div>
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: "'Orbitron', monospace", color: '#fff', letterSpacing: '0.05em', margin: '4px 0 8px 0' }}>
                    {activeItem.name}
                  </h2>
                  <p style={{ fontSize: '12px', fontFamily: "'Share Tech Mono', monospace", color: '#cbd5e1', lineHeight: '1.6' }}>
                    {activeItem.description}
                  </p>
                </div>

                {/* Two-Column Specification Matrix */}
                <div className="hd-matrix-grid">
                  {/* Left Column: Operational Effect */}
                  <div className="hd-spec-box">
                    <div className="hd-spec-title" style={{ color: '#ffd700' }}>
                      <span>OPERATIONAL HIGHLIGHTS</span>
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', fontFamily: "'Share Tech Mono', monospace", color: '#cbd5e1' }}>
                      {activeItem.bullets?.map((b, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                          <span style={{ color: '#ffd700' }}>▸</span>
                          <span style={{ lineHeight: '1.4' }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Affected Stratagems */}
                  <div className="hd-spec-box">
                    <div className="hd-spec-title" style={{ color: '#00e5ff' }}>
                      <span>TECH ARMAMENT</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {activeItem.stratagems?.map((strata, i) => (
                        <span key={i} className="hd-badge-pill">
                          {strata}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ paddingTop: '12px', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ fontSize: '11px', fontFamily: "'Share Tech Mono', monospace", color: '#ffd700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>AUTHORIZATION STATUS: {activeItem.status}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {activeItem.actionUrl && (
                      <a
                        href={activeItem.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={activeItem.isDownload ? true : undefined}
                        className="hd-btn-primary"
                      >
                        <span>{activeItem.actionLabel || 'EXECUTE DIRECTIVE'}</span>
                        <span>↗</span>
                      </a>
                    )}

                    {activeItem.secondaryActionUrl && (
                      <a
                        href={activeItem.secondaryActionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hd-btn-secondary"
                      >
                        {activeItem.secondaryActionLabel || 'VIEW REPOSITORY'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Share Tech Mono', monospace", fontSize: '12px', color: '#64748b' }}>
                NO ACTIVE DOSSIER SELECTED
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom Footer Bar ── */}
        <div className="hd-terminal-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={closeTerminal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 215, 0, 0.12)',
                border: '1px solid rgba(255, 215, 0, 0.45)',
                color: '#ffd700',
                padding: '4px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '11px',
                fontWeight: 'bold',
              }}
            >
              <kbd style={{ padding: '1px 5px', background: '#ffd700', color: '#000', borderRadius: '2px', fontSize: '9px', fontWeight: 900 }}>ESC</kbd>
              <span>CLOSE TERMINAL</span>
            </button>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{ padding: '2px 6px', background: '#1e293b', color: '#cbd5e1', borderRadius: '3px', fontSize: '10px', fontWeight: 'bold' }}>↑ / ↓</kbd>
              <span>NAVIGATE LIST</span>
            </span>
          </div>

          <div style={{ color: '#475569', fontSize: '10px' }}>
            // SES SUPER DESTROYER SECURE UPLINK ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
}
