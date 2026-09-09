import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../context/GameContext';
import gsap from 'gsap';

export default function LoadingScreen() {
  const { phase, setPhase, loadingProgress } = useGame();
  const containerRef = useRef(null);
  const [statusText, setStatusText] = useState('Loading terrain...');

  useEffect(() => {
    if (loadingProgress > 40 && loadingProgress < 80) {
      setStatusText('Generating village...');
    } else if (loadingProgress >= 80) {
      setStatusText('Entering world...');
    }
  }, [loadingProgress]);

  // Smooth auto-transition into menu phase once loaded
  useEffect(() => {
    if (phase !== 'loading') return;

    if (loadingProgress >= 100) {
      const timer = setTimeout(() => {
        if (!containerRef.current) {
          setPhase('menu');
          return;
        }
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => setPhase('menu'),
        });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress, phase, setPhase]);

  if (phase !== 'loading') return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center dirt-bg"
      role="status"
      aria-label="Loading world"
    >
      {/* Subtle vignette shadow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Main loading dialog */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-sm w-full">
        {/* Loading text */}
        <h2
          className="hud-text text-center mb-6 text-white"
          style={{
            fontSize: 'clamp(0.75rem, 2vw, 1.0rem)',
            letterSpacing: '1px',
            textShadow: '2px 2px 0 #000',
          }}
        >
          {statusText}
        </h2>

        {/* Minecraft-style progress bar */}
        <div
          className="w-full h-5 mb-4 relative"
          style={{
            background: '#1c1c1c',
            border: '2px solid #000',
            boxShadow: 'inset 1px 1px 0 #111, inset -1px -1px 0 #333',
          }}
        >
          <div
            className="h-full transition-all duration-200"
            style={{
              width: `${Math.min(loadingProgress, 100)}%`,
              background: 'linear-gradient(180deg, #80ff20 0%, #44aa00 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          />
        </div>

        {/* Progress percentage */}
        <p
          className="hud-text text-center text-stone-300"
          style={{
            fontSize: '0.45rem',
            color: '#aaaaaa',
            textShadow: '1px 1px 0 #000',
          }}
        >
          {Math.min(Math.round(loadingProgress), 100)}%
        </p>

        {/* Bottom hint */}
        <p
          className="hud-text text-center mt-12 text-stone-400"
          style={{
            fontSize: '0.35rem',
            color: '#888888',
            textShadow: '1px 1px 0 #000',
          }}
        >
          Tip: Explore builds and villager trades from the menu
        </p>
      </div>
    </div>
  );
}
