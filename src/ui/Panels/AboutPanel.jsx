import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/**
 * Player Profile Panel — Matches Reference /reference/about player.png:
 * - Dark stone game panel titled "Player Profile"
 * - Pixel avatar with headphones
 * - Bio description
 * - Table: Class, Level, Spawn, Status
 * - "View Journey" button
 */
export default function AboutPanel() {
  const { activePanel, setPanel, setArea } = useGame();
  const panelRef = useRef(null);

  useEffect(() => {
    if (activePanel === 'about' && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
      );
    }
  }, [activePanel]);

  if (activePanel !== 'about') return null;

  const handleViewJourney = () => {
    setArea('advancements');
    setPanel('experience');
  };

  const bioText =
    portfolio.bio && !portfolio.bio.includes('[')
      ? portfolio.bio
      : "Full-stack developer, designer and AI creator. I build digital experiences that aren't just functional - they're memorable.";

  const userRole =
    portfolio.role && !portfolio.role.includes('[')
      ? portfolio.role
      : 'Full-Stack Builder';

  const userLevel =
    portfolio.education?.[0]?.degree && !portfolio.education[0].degree.includes('[')
      ? portfolio.education[0].degree
      : '20 - Final Year B.Tech IT';

  const userLocation =
    portfolio.location && !portfolio.location.includes('[')
      ? portfolio.location
      : 'Tamil Nadu, India';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-start p-6 md:p-14 pointer-events-none select-none">
      <div
        ref={panelRef}
        className="game-panel p-6 max-w-xl w-full pointer-events-auto shadow-2xl relative"
        style={{
          background: 'linear-gradient(180deg, #2b2b2b 0%, #1c1c1c 100%)',
          border: '3px solid #000000',
          boxShadow: 'inset 2px 2px 0 #555555, inset -2px -2px 0 #111111, 0 12px 36px rgba(0,0,0,0.8)',
        }}
        role="dialog"
        aria-label="Player Profile"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#111111] mb-5">
          <h2
            className="hud-text text-white"
            style={{ fontSize: '0.85rem', letterSpacing: '1px', textShadow: '2px 2px 0 #000' }}
          >
            Player Profile
          </h2>
          <button
            onClick={() => setPanel(null)}
            className="btn-game px-2.5 py-1 text-xs leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Top: Avatar + Bio */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-5">
          {/* Avatar Box with pixel art character head + headphones */}
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center relative"
            style={{
              background: '#121212',
              border: '2px solid #333333',
              boxShadow: 'inset 2px 2px 0 #000',
            }}
          >
            <svg viewBox="0 0 32 32" className="w-20 h-20">
              {/* Headphones band */}
              <rect x="7" y="6" width="18" height="3" fill="#3a3a3a" />
              <rect x="6" y="8" width="2" height="6" fill="#3a3a3a" />
              <rect x="24" y="8" width="2" height="6" fill="#3a3a3a" />
              {/* Ear pads */}
              <rect x="4" y="12" width="4" height="7" fill="#00e5ff" />
              <rect x="24" y="12" width="4" height="7" fill="#00e5ff" />
              {/* Head / Skin */}
              <rect x="8" y="9" width="16" height="16" fill="#c6966d" />
              {/* Hair */}
              <rect x="8" y="9" width="16" height="5" fill="#181412" />
              <rect x="8" y="14" width="2" height="4" fill="#181412" />
              <rect x="22" y="14" width="2" height="4" fill="#181412" />
              {/* Beard */}
              <rect x="11" y="21" width="10" height="4" fill="#181412" />
              {/* Eyes */}
              <rect x="11" y="15" width="3" height="3" fill="#ffffff" />
              <rect x="12" y="16" width="2" height="2" fill="#22150f" />
              <rect x="18" y="15" width="3" height="3" fill="#ffffff" />
              <rect x="18" y="16" width="2" height="2" fill="#22150f" />
            </svg>
          </div>

          {/* Description */}
          <div className="flex-1">
            <p
              className="text-stone-300 text-xs sm:text-sm leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {bioText}
            </p>
          </div>
        </div>

        {/* Stats Table (from Reference #2) */}
        <div
          className="w-full mb-6 border-2 border-[#111111]"
          style={{ background: '#1c1c1c' }}
        >
          {[
            { label: 'Class', val: userRole },
            { label: 'Level', val: userLevel },
            { label: 'Spawn', val: userLocation },
            { label: 'Status', val: 'Online - accepting quests' },
          ].map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between px-3 py-2 ${
                i > 0 ? 'border-t border-[#2a2a2a]' : ''
              }`}
            >
              <span
                className="hud-text text-stone-400"
                style={{ fontSize: '0.48rem', letterSpacing: '0.5px' }}
              >
                {row.label}
              </span>
              <span
                className="text-stone-200 text-xs sm:text-sm font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {row.val}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Button: View Journey */}
        <div className="flex justify-start">
          <button
            onClick={handleViewJourney}
            className="btn-game px-6 py-2.5"
            style={{ fontSize: '0.62rem' }}
          >
            View Journey
          </button>
        </div>
      </div>
    </div>
  );
}
