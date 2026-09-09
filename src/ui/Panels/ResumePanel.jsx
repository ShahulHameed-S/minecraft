import { useState, useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/**
 * In-Game Book Interface for Resume:
 * Matches the specification:
 * - In-game book aesthetic with brown leather spine and parchment pages
 * - Tabs/Pages: Profile, Education, Skills, Projects, Experience, Contact
 * - "Download Resume" button
 */
export default function ResumePanel() {
  const { activePanel, setPanel } = useGame();
  const [currentPage, setCurrentPage] = useState('profile');
  const bookRef = useRef(null);

  useEffect(() => {
    if (activePanel === 'resume' && bookRef.current) {
      gsap.fromTo(
        bookRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
      );
    }
  }, [activePanel]);

  if (activePanel !== 'resume') return null;

  const pages = [
    { id: 'profile',    label: 'Profile' },
    { id: 'education',  label: 'Education' },
    { id: 'skills',     label: 'Skills' },
    { id: 'projects',   label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact',    label: 'Contact' },
  ];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-8 bg-black/60 pointer-events-auto select-none">
      <div
        ref={bookRef}
        className="relative max-w-2xl w-full shadow-2xl overflow-hidden"
        style={{
          background: '#8a5229',
          border: '4px solid #3d2410',
          boxShadow: 'inset 2px 2px 0 #b37340, inset -2px -2px 0 #2b180a, 0 16px 40px rgba(0,0,0,0.9)',
          padding: '16px',
        }}
        role="dialog"
        aria-label="Resume Book"
      >
        {/* Book Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#5c371b] mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2
              className="hud-text text-amber-100"
              style={{ fontSize: '0.75rem', textShadow: '1.5px 1.5px 0 #000' }}
            >
              Book of Qualifications
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {portfolio.resumeUrl ? (
              <a
                href={portfolio.resumeUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="btn-game px-3 py-1 text-[9px]"
              >
                📥 Download PDF
              </a>
            ) : (
              <button
                onClick={() => window.print()}
                className="btn-game px-3 py-1 text-[9px]"
              >
                🖨 Print / PDF
              </button>
            )}
            <button
              onClick={() => setPanel(null)}
              className="btn-game px-2.5 py-1 text-xs leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Book Navigation Tabs */}
        <div className="flex flex-wrap gap-1 mb-4 pb-2 border-b border-[#5c371b]">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setCurrentPage(p.id)}
              className={`px-3 py-1.5 text-xs font-bold transition-all ${
                currentPage === p.id
                  ? 'bg-[#e8d5b5] text-[#3d2410] border-2 border-[#3d2410]'
                  : 'bg-[#5c371b] text-stone-300 hover:bg-[#734522] border border-[#3d2410]'
              }`}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.45rem',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Parchment Page Content */}
        <div
          className="p-5 md:p-6 min-h-[340px] max-h-[55vh] overflow-y-auto"
          style={{
            background: '#e8d5b5',
            color: '#2b1a0a',
            border: '2px solid #5c371b',
            boxShadow: 'inset 0 0 16px rgba(100, 60, 20, 0.25)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* PROFILE PAGE */}
          {currentPage === 'profile' && (
            <div>
              <h3 className="text-lg font-bold text-[#4a2e15] mb-2 font-serif">
                {portfolio.name} &bull; {portfolio.role}
              </h3>
              <p className="text-sm leading-relaxed mb-4 text-[#3d2410]">
                {portfolio.bio}
              </p>
              <div className="p-3 bg-[#dfc9a6] border border-[#b89f7a] rounded text-sm mb-4">
                <strong>Mission:</strong> {portfolio.mission || portfolio.tagline}
              </div>
              <p className="text-xs text-stone-600">
                Location: {portfolio.location}
              </p>
            </div>
          )}

          {/* EDUCATION PAGE */}
          {currentPage === 'education' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#4a2e15] font-serif">
                Academic Background
              </h3>
              {portfolio.education.map((edu, i) => (
                <div key={i} className="border-b border-[#b89f7a] pb-3">
                  <h4 className="font-bold text-sm text-[#3d2410]">{edu.degree}</h4>
                  <p className="text-xs text-[#5c371b]">{edu.institution} &bull; {edu.period}</p>
                  {edu.achievements?.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-[#4a2e15] mt-1 space-y-0.5">
                      {edu.achievements.map((a, j) => (
                        <li key={j}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* SKILLS PAGE */}
          {currentPage === 'skills' && (
            <div>
              <h3 className="text-base font-bold text-[#4a2e15] mb-3 font-serif">
                Technologies &amp; Masteries
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {portfolio.skills.map((s) => (
                  <div key={s.name} className="p-2 bg-[#dfc9a6] border border-[#b89f7a]">
                    <p className="font-bold text-[#3d2410]">{s.name}</p>
                    <p className="text-[11px] text-stone-700">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS PAGE */}
          {currentPage === 'projects' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#4a2e15] font-serif">
                Featured Works &amp; Deployments
              </h3>
              {portfolio.projects.map((p) => (
                <div key={p.id} className="border-b border-[#b89f7a] pb-3">
                  <h4 className="font-bold text-sm text-[#3d2410]">{p.title}</h4>
                  <p className="text-xs text-[#4a2e15]">{p.description}</p>
                  <p className="text-[11px] text-stone-600 mt-1">
                    <strong>Stack:</strong> {p.stack.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* EXPERIENCE PAGE */}
          {currentPage === 'experience' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#4a2e15] font-serif">
                Career History
              </h3>
              {portfolio.experience.map((exp, i) => (
                <div key={i} className="border-b border-[#b89f7a] pb-3">
                  <h4 className="font-bold text-sm text-[#3d2410]">{exp.title}</h4>
                  <p className="text-xs text-[#5c371b]">{exp.company} &bull; {exp.period}</p>
                  <p className="text-xs text-[#4a2e15] mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* CONTACT PAGE */}
          {currentPage === 'contact' && (
            <div>
              <h3 className="text-base font-bold text-[#4a2e15] mb-2 font-serif">
                Direct Communication
              </h3>
              <p className="text-xs text-[#3d2410] mb-4">
                Let us construct memorable digital worlds together.
              </p>
              <div className="space-y-2 text-xs">
                <p><strong>Email:</strong> {portfolio.contact.email}</p>
                <p><strong>GitHub:</strong> {portfolio.contact.github}</p>
                <p><strong>LinkedIn:</strong> {portfolio.contact.linkedin}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-2 text-[#dfc9a6]">
          <span
            className="hud-text text-[9px]"
            style={{ textShadow: '1px 1px 0 #000' }}
          >
            Page {pages.findIndex((p) => p.id === currentPage) + 1} of {pages.length}
          </span>
          <span
            className="hud-text text-[9px]"
            style={{ textShadow: '1px 1px 0 #000' }}
          >
            Press ESC or ✕ to close book
          </span>
        </div>
      </div>
    </div>
  );
}
