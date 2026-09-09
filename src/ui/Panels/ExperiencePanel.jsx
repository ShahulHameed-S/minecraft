import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/** Experience panel — Advancements style */
export default function ExperiencePanel() {
  const { activePanel, setPanel } = useGame();
  const panelRef = useRef(null);

  useEffect(() => {
    if (activePanel === 'experience' && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
      );
    }
  }, [activePanel]);

  if (activePanel !== 'experience') return null;

  return (
    <div className="fixed inset-0 z-25 flex items-center justify-start p-6 md:p-12 pointer-events-none">
      <div
        ref={panelRef}
        className="panel-glass p-6 md:p-8 max-w-lg w-full pointer-events-auto overflow-y-auto max-h-[80vh]"
        role="dialog"
        aria-label="Experience and Achievements"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-muted-cyan text-glow-cyan"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.75rem' }}
          >
            🏆 ADVANCEMENTS
          </h2>
          <button
            onClick={() => setPanel(null)}
            className="text-text-muted hover:text-text-primary transition-colors cursor-pointer text-xl leading-none"
            aria-label="Close panel"
          >
            ✕
          </button>
        </div>

        <div className="h-px bg-gradient-to-r from-muted-cyan/30 via-muted-cyan/10 to-transparent mb-6" />

        {/* Achievements */}
        <div className="mb-8">
          <h3 className="text-text-muted mb-4" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem' }}>
            ACHIEVEMENTS
          </h3>
          <div className="space-y-2.5">
            {portfolio.achievements.map((ach, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 border transition-all ${
                  ach.unlocked
                    ? 'border-muted-cyan/20 bg-muted-cyan/5'
                    : 'border-stone/20 bg-stone/5 opacity-50'
                }`}
                style={{ borderRadius: '3px' }}
              >
                <span className="text-lg">{ach.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${ach.unlocked ? 'text-text-primary' : 'text-text-muted'}`}>
                      {ach.unlocked ? ach.title : '???'}
                    </p>
                    {ach.unlocked && (
                      <span className="text-muted-cyan" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.3rem' }}>
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-xs">
                    {ach.unlocked ? ach.description : 'Achievement locked'}
                  </p>
                </div>
                {ach.date && (
                  <span className="text-text-muted text-xs whitespace-nowrap">{ach.date}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        {portfolio.experience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-text-muted mb-4" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem' }}>
              EXPERIENCE
            </h3>
            <div className="space-y-4">
              {portfolio.experience.map((exp, i) => (
                <div key={i} className="border border-stone/20 p-4 bg-stone/5" style={{ borderRadius: '3px' }}>
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-text-primary text-sm font-semibold">{exp.title}</h4>
                    <span className="text-text-muted text-xs whitespace-nowrap ml-2">{exp.period}</span>
                  </div>
                  <p className="text-muted-cyan text-xs mb-2">{exp.company}</p>
                  <p className="text-text-secondary text-xs leading-relaxed">{exp.description}</p>
                  {exp.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.skills.map(s => (
                        <span key={s} className="px-1.5 py-0.5 text-xs border border-stone/20 text-text-muted" style={{ fontSize: '0.6rem' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {portfolio.education.length > 0 && (
          <div>
            <h3 className="text-text-muted mb-4" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem' }}>
              EDUCATION
            </h3>
            <div className="space-y-4">
              {portfolio.education.map((edu, i) => (
                <div key={i} className="border border-stone/20 p-4 bg-stone/5" style={{ borderRadius: '3px' }}>
                  <h4 className="text-text-primary text-sm font-semibold">{edu.degree}</h4>
                  <p className="text-muted-cyan text-xs mb-1">{edu.institution}</p>
                  <p className="text-text-muted text-xs">{edu.period}</p>
                  {edu.achievements?.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {edu.achievements.map((a, j) => (
                        <li key={j} className="text-text-secondary text-xs flex items-start gap-1.5">
                          <span className="text-muted-cyan">•</span> {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
