import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/** Resume panel — simple modal */
export default function ResumePanel() {
  const { activePanel, setPanel } = useGame();
  const panelRef = useRef(null);

  useEffect(() => {
    if (activePanel === 'resume' && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.4)' }
      );
    }
  }, [activePanel]);

  if (activePanel !== 'resume') return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-6 pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 pointer-events-auto"
        onClick={() => setPanel(null)}
      />
      <div
        ref={panelRef}
        className="panel-glass p-8 max-w-sm w-full pointer-events-auto relative text-center"
        role="dialog"
        aria-label="Resume"
      >
        <button
          onClick={() => setPanel(null)}
          className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors cursor-pointer text-lg leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <span className="text-4xl mb-4 block">📋</span>

        <h2
          className="text-text-primary mb-6"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem' }}
        >
          RESUME
        </h2>

        {portfolio.resumeUrl ? (
          <div className="space-y-3">
            <a
              href={portfolio.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rpg w-full flex items-center justify-center gap-2 text-xs no-underline"
            >
              👁 VIEW RESUME
            </a>
            <a
              href={portfolio.resumeUrl}
              download
              className="btn-rpg w-full flex items-center justify-center gap-2 text-xs no-underline"
            >
              ⬇ DOWNLOAD RESUME
            </a>
          </div>
        ) : (
          <p className="text-text-muted text-xs italic">
            [Add your resume URL in portfolio.js]
          </p>
        )}
      </div>
    </div>
  );
}
