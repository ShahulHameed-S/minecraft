import { useGame } from '../../context/GameContext';
import { AREAS } from '../../utils/constants';
import portfolio from '../../data/portfolio';

/**
 * Game HUD — visible during BOTH menu and playing phases
 * Matches Reference Image #1 & #2:
 * - Top-left: Plain pixel text (Title, Biome, Day/Time) with black outline
 * - Bottom: 10 Hearts, 10 Hunger drumsticks, green XP bar with level 30
 * - Bottom-left: subtle build watermark
 */
export default function HUD() {
  const { currentArea, phase, activePanel, activeModal, setPanel } = useGame();

  if (phase !== 'playing' && phase !== 'menu') return null;

  const area = Object.values(AREAS).find((a) => a.id === currentArea);
  const biomeName = area?.biome || 'Plains';

  const displayName =
    portfolio.name && !portfolio.name.includes('[')
      ? `${portfolio.name} Builds`
      : 'Shahul Builds';

  return (
    <div className="fixed inset-0 z-20 pointer-events-none select-none" aria-hidden="true">
      {/* ── Top-Left Info (Direct on screen, no background panel) ──── */}
      <div className="absolute top-3 left-3.5 flex flex-col gap-0.5">
        <p
          className="hud-text"
          style={{
            fontSize: 'clamp(0.55rem, 1.1vw, 0.72rem)',
            color: '#55ff55',
            textShadow: '1.5px 1.5px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
            letterSpacing: '0.5px',
          }}
        >
          {displayName} v1.0.0
        </p>
        <p
          className="hud-text"
          style={{
            fontSize: 'clamp(0.48rem, 0.95vw, 0.62rem)',
            color: '#e4e4e4',
            textShadow: '1.5px 1.5px 0 #000',
            letterSpacing: '0.5px',
          }}
        >
          Biome: {biomeName}
        </p>
        <p
          className="hud-text"
          style={{
            fontSize: 'clamp(0.48rem, 0.95vw, 0.62rem)',
            color: '#cfcfcf',
            textShadow: '1.5px 1.5px 0 #000',
            letterSpacing: '0.5px',
          }}
        >
          Day 1 &bull; 07:24
        </p>
      </div>

      {/* ── Bottom Game Status: Hearts + Hunger + XP Bar ──────────── */}
      <div
        className="absolute bottom-[72px] left-1/2 -translate-x-1/2 flex flex-col gap-1 pointer-events-none"
        style={{ width: '450px', maxWidth: '94vw' }}
      >
        {/* Row of Hearts (left) and Food Drumsticks (right) */}
        <div className="flex items-center justify-between w-full px-1">
          {/* 10 Hearts */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={`heart-${i}`}
                style={{
                  fontSize: '12px',
                  lineHeight: 1,
                  color: i < 9 ? '#e74c3c' : '#555555',
                  textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                  display: 'inline-block',
                }}
              >
                ❤
              </span>
            ))}
          </div>

          {/* 10 Hunger drumsticks */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={`food-${i}`}
                style={{
                  fontSize: '11px',
                  lineHeight: 1,
                  color: '#c97836',
                  textShadow: '1px 1px 0 #000',
                  display: 'inline-block',
                }}
              >
                🍗
              </span>
            ))}
          </div>
        </div>

        {/* Green XP Bar with centered Level 30 */}
        <div className="w-full relative mt-0.5">
          {/* XP Bar Background container */}
          <div
            className="w-full h-2 relative"
            style={{
              background: '#0d0d0d',
              border: '1.5px solid #000',
              boxShadow: 'inset 1px 1px 0 #050505, inset -1px -1px 0 #222',
            }}
          >
            {/* Green XP Fill */}
            <div
              className="h-full"
              style={{
                width: '72%',
                background: 'linear-gradient(180deg, #80ff20 0%, #44aa00 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            />
          </div>

          {/* XP Level Number 30 centered right on the XP bar */}
          <span
            className="hud-text absolute left-1/2 -translate-x-1/2 -top-3 select-none"
            style={{
              fontSize: '0.68rem',
              color: '#80ff20',
              textShadow:
                '1.5px 1.5px 0 #000, -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 0 1.5px 0 #000, 0 -1.5px 0 #000, 1.5px 0 0 #000, -1.5px 0 0 #000',
              fontWeight: 'bold',
            }}
          >
            30
          </span>
        </div>
      </div>

      {/* ── Bottom-Left Copyright / Build watermark ───────────────── */}
      <div className="absolute bottom-2 left-3">
        <p
          className="hud-text"
          style={{
            fontSize: '0.36rem',
            color: 'rgba(255, 255, 255, 0.45)',
            textShadow: '1px 1px 0 #000',
          }}
        >
          2026 Developer Portfolio &bull; Built with Three.js &amp; React
        </p>
      </div>

      {/* ── Controls hint (visible during playing) ────────────────── */}
      {phase === 'playing' && (
        <div className="absolute top-3.5 right-4 flex flex-col items-end gap-1">
          <p className="hud-text" style={{ fontSize: '0.42rem', color: '#aaaaaa', textShadow: '1px 1px 0 #000' }}>
            WASD &mdash; Move
          </p>
          <p className="hud-text" style={{ fontSize: '0.42rem', color: '#aaaaaa', textShadow: '1px 1px 0 #000' }}>
            1-9 &mdash; Hotbar
          </p>
          <p className="hud-text" style={{ fontSize: '0.42rem', color: '#aaaaaa', textShadow: '1px 1px 0 #000' }}>
            [E] &mdash; Interact
          </p>
          <p className="hud-text" style={{ fontSize: '0.42rem', color: '#aaaaaa', textShadow: '1px 1px 0 #000' }}>
            ESC &mdash; Menu
          </p>
        </div>
      )}

      {/* ── [E] Interactive Action Prompt ────────────────────────── */}
      {phase === 'playing' && !activePanel && !activeModal && (
        <div className="absolute bottom-[114px] left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={() => {
              const panelMap = {
                spawn: 'about',
                workshop: 'about',
                enchantment: 'skills',
                trading: 'projects',
                advancements: 'experience',
                theEnd: 'contact',
              };
              setPanel(panelMap[currentArea] || 'about');
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 cursor-pointer select-none transition-transform hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(20, 16, 28, 0.92)',
              border: '2px solid #5a5a7a',
              boxShadow: '0 4px 14px rgba(0,0,0,0.65), inset 1px 1px 0 rgba(255,255,255,0.15)',
            }}
            aria-label="Interact"
          >
            <span
              className="hud-text px-1.5 py-0.5 rounded text-[10px]"
              style={{
                background: '#ffd700',
                color: '#1a1000',
                fontWeight: 'bold',
                boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.4)',
              }}
            >
              E
            </span>
            <span
              className="hud-text text-[10px] text-[#f0e6d2]"
              style={{ textShadow: '1px 1px 0 #000' }}
            >
              {currentArea === 'workshop'
                ? 'Open Player Profile'
                : currentArea === 'enchantment'
                ? 'Open Enchanting Table'
                : currentArea === 'trading'
                ? 'Trade / Open Chest'
                : currentArea === 'advancements'
                ? 'View Advancements Tree'
                : currentArea === 'theEnd'
                ? 'Enter Portal / Contact'
                : 'Interact / View Profile'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
