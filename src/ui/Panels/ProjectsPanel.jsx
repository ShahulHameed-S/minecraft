import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/** Projects panel — Trading Hall style */
export default function ProjectsPanel() {
  const { activePanel, setPanel, setModal } = useGame();
  const panelRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (activePanel === 'projects' && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
      );
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, delay: 0.15 + i * 0.1, ease: 'power2.out' }
          );
        }
      });
    }
  }, [activePanel]);

  if (activePanel !== 'projects') return null;

  const handleOpenProject = (project) => {
    setModal({ type: 'project', data: project });
  };

  return (
    <div className="fixed inset-0 z-25 flex items-center justify-start p-6 md:p-12 pointer-events-none">
      <div
        ref={panelRef}
        className="panel-glass p-6 md:p-8 max-w-xl w-full pointer-events-auto overflow-y-auto max-h-[80vh]"
        role="dialog"
        aria-label="Projects"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lantern-gold text-glow-gold"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.75rem' }}
          >
            📦 VILLAGER TRADES
          </h2>
          <button
            onClick={() => setPanel(null)}
            className="text-text-muted hover:text-text-primary transition-colors cursor-pointer text-xl leading-none"
            aria-label="Close panel"
          >
            ✕
          </button>
        </div>

        <div className="h-px bg-gradient-to-r from-lantern-gold/30 via-lantern-gold/10 to-transparent mb-6" />

        {/* Project cards */}
        <div className="space-y-4">
          {portfolio.projects.map((project, i) => (
            <div
              key={project.id}
              ref={el => cardsRef.current[i] = el}
              className="border border-stone/30 bg-dark-charcoal/40 p-4 hover:border-lantern-gold/40 hover:bg-lantern-gold/5 transition-all duration-200 cursor-pointer group"
              style={{ borderRadius: '3px' }}
              onClick={() => handleOpenProject(project)}
              role="button"
              tabIndex={0}
              aria-label={`View project: ${project.title}`}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenProject(project)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Project icon */}
                  <div className="w-8 h-8 flex items-center justify-center border border-lantern-gold/30 bg-lantern-gold/10"
                    style={{ borderRadius: '2px' }}>
                    <span className="text-sm">
                      {project.category === 'fullstack' ? '🌐' : project.category === '3d' ? '🎮' : '🔧'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-text-primary text-sm font-semibold group-hover:text-lantern-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-muted text-xs">{project.type}</p>
                  </div>
                </div>
                {project.featured && (
                  <span className="text-lantern-gold" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.3rem' }}>
                    ★ FEATURED
                  </span>
                )}
              </div>

              <p className="text-text-secondary text-xs leading-relaxed mb-3">
                {project.description}
              </p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.stack.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs border border-stone/30 text-text-muted bg-stone/10"
                    style={{ borderRadius: '2px', fontSize: '0.65rem' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-text-muted text-xs">
                  {project.status} {project.year ? `• ${project.year}` : ''}
                </span>
                <span
                  className="text-lantern-gold group-hover:translate-x-1 transition-transform"
                  style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}
                >
                  VIEW →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
