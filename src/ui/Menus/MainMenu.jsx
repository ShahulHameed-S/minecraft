import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/**
 * Main Menu — Matches Reference Image #1:
 * - Positioned center-left between sunset and player
 * - Big single-line pixel title with heavy black 3D shadow: "Shahul Builds"
 * - Subtitle: "SURVIVAL • HARD MODE"
 * - Stone buttons:
 *   [ Enter World ]
 *   [ View Builds ]
 *   [ Villager Trades ]
 *   [ Contact ] [ The End ]
 *   [ Mine for the Builds ]
 * - Subtext: "Press 'E' or click the hotbar to nav"
 */
export default function MainMenu() {
  const { phase, setPhase, setArea, setPanel } = useGame();
  const menuContainerRef = useRef(null);
  const buttonsRef = useRef([]);

  const displayName =
    portfolio.name && !portfolio.name.includes('[')
      ? `${portfolio.name} Builds`
      : 'Shahul Builds';

  useEffect(() => {
    if (phase !== 'menu' || !menuContainerRef.current) return;

    gsap.fromTo(
      menuContainerRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    buttonsRef.current.forEach((btn, i) => {
      if (btn) {
        gsap.fromTo(
          btn,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3, delay: 0.15 + i * 0.05, ease: 'power2.out' }
        );
      }
    });
  }, [phase]);

  const handleNavigate = (action) => {
    if (!menuContainerRef.current) return;
    gsap.to(menuContainerRef.current, {
      opacity: 0,
      y: -12,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        setPhase('playing');
        if (action?.area) setArea(action.area);
        if (action?.panel) setTimeout(() => setPanel(action.panel), 300);
      },
    });
  };

  if (phase !== 'menu') return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center select-none pointer-events-none"
    >
      {/* Positioned cleanly between sunset vista (left) and player (right) */}
      <div
        ref={menuContainerRef}
        className="flex flex-col items-center pointer-events-auto"
        style={{
          position: 'absolute',
          left: 'clamp(200px, 26vw, 360px)',
          top: '46%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(280px, 24vw, 360px)',
        }}
      >
        {/* Title — Big single-line white pixel text with dark extrusion shadow */}
        <h1
          className="hud-text text-center text-white mb-1.5 whitespace-nowrap"
          style={{
            fontSize: 'clamp(1.3rem, 2.8vw, 2.2rem)',
            letterSpacing: '1.5px',
            textShadow:
              '3px 3px 0 #181818, -1px -1px 0 #181818, 1px -1px 0 #181818, -1px 1px 0 #181818, 3px 0 0 #181818, 0 3px 0 #181818',
            lineHeight: 1.2,
          }}
        >
          {displayName}
        </h1>

        {/* Subtitle — spaced gray pixel text */}
        <p
          className="hud-text text-center mb-6 tracking-widest text-stone-300 whitespace-nowrap"
          style={{
            fontSize: 'clamp(0.42rem, 0.9vw, 0.55rem)',
            color: '#c4c4c4',
            textShadow: '1.5px 1.5px 0 #181818',
            letterSpacing: '3px',
          }}
        >
          SURVIVAL &bull; HARD MODE
        </p>

        {/* Stone Buttons Column */}
        <div className="flex flex-col gap-2 w-full">
          {/* Button 1: Enter World */}
          <button
            ref={(el) => (buttonsRef.current[0] = el)}
            onClick={() => handleNavigate({ area: 'spawn' })}
            className="btn-game w-full py-3 text-center"
            style={{ fontSize: 'clamp(0.58rem, 1.1vw, 0.72rem)' }}
            aria-label="Enter World"
          >
            Enter World
          </button>

          {/* Button 2: View Builds */}
          <button
            ref={(el) => (buttonsRef.current[1] = el)}
            onClick={() => handleNavigate({ area: 'trading', panel: 'projects' })}
            className="btn-game w-full py-3 text-center"
            style={{ fontSize: 'clamp(0.58rem, 1.1vw, 0.72rem)' }}
            aria-label="View Builds"
          >
            View Builds
          </button>

          {/* Button 3: Villager Trades */}
          <button
            ref={(el) => (buttonsRef.current[2] = el)}
            onClick={() => handleNavigate({ area: 'trading', panel: 'projects' })}
            className="btn-game w-full py-3 text-center"
            style={{ fontSize: 'clamp(0.58rem, 1.1vw, 0.72rem)' }}
            aria-label="Villager Trades"
          >
            Villager Trades
          </button>

          {/* Row: Contact and The End */}
          <div className="flex gap-2 w-full">
            <button
              ref={(el) => (buttonsRef.current[3] = el)}
              onClick={() => handleNavigate({ area: 'theEnd', panel: 'contact' })}
              className="btn-game flex-1 py-3 text-center"
              style={{ fontSize: 'clamp(0.52rem, 1.0vw, 0.65rem)' }}
              aria-label="Contact"
            >
              Contact
            </button>
            <button
              ref={(el) => (buttonsRef.current[4] = el)}
              onClick={() => handleNavigate({ area: 'theEnd', panel: 'contact' })}
              className="btn-game flex-1 py-3 text-center"
              style={{ fontSize: 'clamp(0.52rem, 1.0vw, 0.65rem)' }}
              aria-label="The End"
            >
              The End
            </button>
          </div>

          {/* Button 5: Mine for the Builds */}
          <button
            ref={(el) => (buttonsRef.current[5] = el)}
            onClick={() => handleNavigate({ area: 'workshop', panel: 'about' })}
            className="btn-game w-full py-3 text-center"
            style={{ fontSize: 'clamp(0.58rem, 1.1vw, 0.72rem)' }}
            aria-label="Mine for the Builds"
          >
            Mine for the Builds
          </button>
        </div>

        {/* Subtext beneath buttons */}
        <p
          className="hud-text mt-4 text-center text-stone-300 whitespace-nowrap"
          style={{
            fontSize: 'clamp(0.38rem, 0.75vw, 0.48rem)',
            color: '#d0d0d0',
            textShadow: '1.5px 1.5px 0 #181818',
            letterSpacing: '0.5px',
          }}
        >
          Press 'E' or click the hotbar to nav
        </p>
      </div>
    </div>
  );
}
