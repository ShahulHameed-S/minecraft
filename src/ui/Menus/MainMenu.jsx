import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/**
 * Main Menu — Matches User Specification & Reference Image #1:
 * Title: SANJAI BUILDS
 * Subtitle: A Developer Adventure
 * Buttons:
 *   ENTER WORLD
 *   ABOUT
 *   SKILLS
 *   PROJECTS
 *   EXPERIENCE
 *   RESUME
 *   CONTACT
 */
export default function MainMenu() {
  const { phase, setPhase, setArea, setPanel } = useGame();
  const menuContainerRef = useRef(null);
  const buttonsRef = useRef([]);

  const displayName = 'SHAHUL BUILDS';

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
          { opacity: 1, y: 0, duration: 0.3, delay: 0.12 + i * 0.04, ease: 'power2.out' }
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

  const buttons = [
    { label: 'ENTER WORLD', action: { area: 'spawn' } },
    { label: 'ABOUT',       action: { area: 'workshop', panel: 'about' } },
    { label: 'SKILLS',      action: { area: 'enchantment', panel: 'skills' } },
    { label: 'PROJECTS',    action: { area: 'trading', panel: 'projects' } },
    { label: 'EXPERIENCE',  action: { area: 'advancements', panel: 'experience' } },
    { label: 'RESUME',      action: { area: 'spawn', panel: 'resume' } },
    { label: 'CONTACT',     action: { area: 'theEnd', panel: 'contact' } },
  ];

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
          left: 'clamp(210px, 26vw, 360px)',
          top: '48%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(280px, 24vw, 360px)',
        }}
      >
        {/* Title — Big single-line white pixel text with dark extrusion shadow */}
        <h1
          className="hud-text text-center text-white mb-1.5 whitespace-nowrap"
          style={{
            fontSize: 'clamp(1.3rem, 2.7vw, 2.1rem)',
            letterSpacing: '1.5px',
            textShadow:
              '3px 3px 0 #181818, -1px -1px 0 #181818, 1px -1px 0 #181818, -1px 1px 0 #181818, 3px 0 0 #181818, 0 3px 0 #181818',
            lineHeight: 1.2,
          }}
        >
          {displayName}
        </h1>

        {/* Subtitle */}
        <p
          className="hud-text text-center mb-5 tracking-widest text-stone-300 whitespace-nowrap"
          style={{
            fontSize: 'clamp(0.42rem, 0.85vw, 0.55rem)',
            color: '#c4c4c4',
            textShadow: '1.5px 1.5px 0 #181818',
            letterSpacing: '2.5px',
          }}
        >
          A DEVELOPER ADVENTURE
        </p>

        {/* Stone Buttons Column */}
        <div className="flex flex-col gap-2 w-full">
          {buttons.map((btn, i) => (
            <button
              key={btn.label}
              ref={(el) => (buttonsRef.current[i] = el)}
              onClick={() => handleNavigate(btn.action)}
              className="btn-game w-full py-2.5 text-center"
              style={{ fontSize: 'clamp(0.55rem, 1.0vw, 0.68rem)' }}
              aria-label={btn.label}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Subtext beneath buttons */}
        <p
          className="hud-text mt-3.5 text-center text-stone-300 whitespace-nowrap"
          style={{
            fontSize: 'clamp(0.36rem, 0.75vw, 0.46rem)',
            color: '#d0d0d0',
            textShadow: '1.5px 1.5px 0 #181818',
            letterSpacing: '0.5px',
          }}
        >
          Press 'E' to interact &bull; WASD to move
        </p>
      </div>
    </div>
  );
}
