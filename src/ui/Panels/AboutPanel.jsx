import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/** About Me panel — Builder's Workshop UI */
export default function AboutPanel() {
  const { activePanel, setPanel } = useGame();
  const panelRef = useRef(null);

  useEffect(() => {
    if (activePanel === 'about' && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
      );
    }
  }, [activePanel]);

  if (activePanel !== 'about') return null;

  return (
    <div className="fixed inset-0 z-25 flex items-center justify-start p-6 md:p-12 pointer-events-none">
      <div
        ref={panelRef}
        className="panel-glass p-6 md:p-8 max-w-lg w-full pointer-events-auto overflow-y-auto max-h-[80vh]"
        role="dialog"
        aria-label="About Me"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-muted-cyan text-glow-cyan"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.75rem' }}
          >
            ⚒ ABOUT THE PLAYER
          </h2>
          <button
            onClick={() => setPanel(null)}
            className="text-text-muted hover:text-text-primary transition-colors cursor-pointer text-xl leading-none"
            aria-label="Close panel"
          >
            ✕
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-muted-cyan/30 via-muted-cyan/10 to-transparent mb-6" />

        {/* Info grid */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-text-muted min-w-20" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}>NAME</span>
            <span className="text-text-primary text-sm font-medium">{portfolio.name}</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-text-muted min-w-20" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}>ROLE</span>
            <span className="text-muted-cyan text-sm">{portfolio.role}</span>
          </div>

          {portfolio.location && (
            <div className="flex items-start gap-3">
              <span className="text-text-muted min-w-20" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}>LOCATION</span>
              <span className="text-text-secondary text-sm">{portfolio.location}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-stone/30 to-transparent my-6" />

        {/* Bio */}
        <div>
          <h3
            className="text-text-muted mb-3"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}
          >
            ABOUT
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {portfolio.bio}
          </p>
        </div>

        {/* Mission */}
        {portfolio.mission && (
          <>
            <div className="h-px bg-gradient-to-r from-stone/30 to-transparent my-6" />
            <div>
              <h3
                className="text-text-muted mb-3"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}
              >
                MISSION
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed italic">
                "{portfolio.mission}"
              </p>
            </div>
          </>
        )}

        {/* Tagline */}
        <div className="mt-6 p-3 border border-muted-cyan/20 rounded-sm bg-muted-cyan/5">
          <p className="text-muted-cyan text-xs text-center" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.4rem' }}>
            {portfolio.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
