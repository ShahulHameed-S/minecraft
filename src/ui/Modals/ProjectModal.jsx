import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import gsap from 'gsap';

/** Project detail modal — full project view */
export default function ProjectModal() {
  const { activeModal, closeModal } = useGame();
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (activeModal?.type === 'project' && modalRef.current) {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
      );
    }
  }, [activeModal]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && activeModal) closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeModal, closeModal]);

  if (!activeModal || activeModal.type !== 'project') return null;

  const project = activeModal.data;

  const handleClose = () => {
    if (modalRef.current && backdropRef.current) {
      gsap.to(modalRef.current, { opacity: 0, y: 20, duration: 0.2 });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.2, onComplete: closeModal });
    } else {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="panel-glass p-6 md:p-8 max-w-2xl w-full relative overflow-y-auto max-h-[85vh]"
        role="dialog"
        aria-label={`Project: ${project.title}`}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors cursor-pointer text-xl leading-none z-10"
          aria-label="Close project detail"
        >
          ✕
        </button>

        {/* Project type badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 text-xs border border-lantern-gold/30 text-lantern-gold bg-lantern-gold/10" style={{ borderRadius: '2px' }}>
            {project.type}
          </span>
          {project.featured && (
            <span className="px-2 py-0.5 text-xs border border-muted-cyan/30 text-muted-cyan bg-muted-cyan/10" style={{ borderRadius: '2px' }}>
              ★ Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          className="text-text-primary mb-4"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.85rem', lineHeight: '1.5' }}
        >
          {project.title}
        </h2>

        <div className="h-px bg-gradient-to-r from-lantern-gold/30 to-transparent mb-6" />

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-text-muted mb-2" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}>
            DESCRIPTION
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-text-muted mb-2" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}>
            TECH STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs border border-muted-cyan/25 text-muted-cyan bg-muted-cyan/5"
                style={{ borderRadius: '2px' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        {project.features?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-text-muted mb-2" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}>
              FEATURES
            </h3>
            <ul className="space-y-1.5">
              {project.features.map((f, i) => (
                <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                  <span className="text-muted-cyan">◆</span> {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && (
          <div className="mb-6">
            <h3 className="text-text-muted mb-2" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}>
              CHALLENGES
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">{project.challenges}</p>
          </div>
        )}

        {/* Result */}
        {project.result && (
          <div className="mb-6">
            <h3 className="text-text-muted mb-2" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}>
              RESULT
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">{project.result}</p>
          </div>
        )}

        <div className="h-px bg-gradient-to-r from-stone/30 to-transparent mb-6" />

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rpg flex items-center gap-2 text-xs no-underline"
            >
              🌐 LIVE DEMO
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rpg flex items-center gap-2 text-xs no-underline"
            >
              🐙 GITHUB
            </a>
          )}
          <button onClick={handleClose} className="btn-rpg flex items-center gap-2 text-xs">
            ✕ CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
