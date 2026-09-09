import { useState, useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import { toRoman } from '../../utils/constants';
import gsap from 'gsap';

/**
 * Enchantments Panel — Matches Reference /reference/enchantment.png:
 * - Dark stone game panel titled "Enchantments"
 * - Roman numerals column (V, IV, etc.)
 * - Skill names
 * - Cyan-to-purple progress bars
 * - Percentages (95, 90, 85, etc.)
 * - Purple hover tooltip box with gold title
 * - "Hover an enchantment to inspect it" footer
 */
export default function SkillsPanel() {
  const { activePanel, setPanel } = useGame();
  const panelRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (activePanel === 'skills' && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
      );
    }
  }, [activePanel]);

  if (activePanel !== 'skills') return null;

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-40 flex items-center justify-start p-6 md:p-14 pointer-events-none select-none"
    >
      <div
        ref={panelRef}
        className="game-panel p-6 max-w-lg w-full pointer-events-auto shadow-2xl relative"
        style={{
          background: 'linear-gradient(180deg, #2b2b2b 0%, #1c1c1c 100%)',
          border: '3px solid #000000',
          boxShadow: 'inset 2px 2px 0 #555555, inset -2px -2px 0 #111111, 0 12px 36px rgba(0,0,0,0.8)',
        }}
        role="dialog"
        aria-label="Enchantments"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#111111] mb-4">
          <h2
            className="hud-text text-white"
            style={{ fontSize: '0.85rem', letterSpacing: '1px', textShadow: '2px 2px 0 #000' }}
          >
            Enchantments
          </h2>
          <button
            onClick={() => setPanel(null)}
            className="btn-game px-2.5 py-1 text-xs leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Skills Rows matching Reference #4 */}
        <div className="space-y-2 mb-4">
          {portfolio.skills.slice(0, 8).map((skill) => {
            const percent = Math.round((skill.level / skill.maxLevel) * 100);
            const roman = toRoman(skill.level);

            return (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="flex items-center gap-3 px-3 py-2 border border-[#333333] hover:border-[#80ff20] hover:bg-white/5 transition-all cursor-pointer"
                style={{ background: '#191919' }}
              >
                {/* Roman Numeral */}
                <span
                  className="hud-text text-[#b0a080] w-6 shrink-0 text-center"
                  style={{ fontSize: '0.55rem', textShadow: '1px 1px 0 #000' }}
                >
                  {roman}
                </span>

                {/* Skill Name */}
                <span
                  className="hud-text text-stone-200 w-32 shrink-0 truncate"
                  style={{ fontSize: '0.45rem', textShadow: '1px 1px 0 #000' }}
                >
                  {skill.name}
                </span>

                {/* Cyan-to-Purple Enchantment Progress Bar */}
                <div
                  className="flex-1 h-3 relative"
                  style={{
                    background: '#0d0d0d',
                    border: '1px solid #000',
                    boxShadow: 'inset 1px 1px 0 #000',
                  }}
                >
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${percent}%`,
                      background: 'linear-gradient(90deg, #00d4ff 0%, #7b2fff 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                    }}
                  />
                </div>

                {/* Percentage / Rating */}
                <span
                  className="hud-text text-[#80ff20] w-7 shrink-0 text-right"
                  style={{ fontSize: '0.48rem', textShadow: '1px 1px 0 #000' }}
                >
                  {percent}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer info text */}
        <p
          className="hud-text text-center text-stone-400 mt-2"
          style={{ fontSize: '0.38rem', textShadow: '1px 1px 0 #000' }}
        >
          Hover an enchantment to inspect it
        </p>

        {/* Hover Tooltip (Authentic Minecraft enchantment tooltip) */}
        {hoveredSkill && (
          <div
            className="fixed z-50 pointer-events-none p-3 max-w-xs"
            style={{
              left: `${mousePos.x + 15}px`,
              top: `${mousePos.y + 15}px`,
              background: '#100010',
              border: '2px solid #280050',
              boxShadow: 'inset 0 0 6px #5000a0, 0 8px 24px rgba(0,0,0,0.8)',
            }}
          >
            <p
              className="hud-text text-[#ffdf55] mb-1"
              style={{ fontSize: '0.55rem', textShadow: '1px 1px 0 #000' }}
            >
              {hoveredSkill.name}
            </p>
            <p
              className="hud-text text-[#a8f5ff] mb-1.5 leading-relaxed"
              style={{ fontSize: '0.42rem', textShadow: '1px 1px 0 #000' }}
            >
              {hoveredSkill.description}
            </p>
            <p
              className="hud-text text-[#8888aa]"
              style={{ fontSize: '0.38rem', textShadow: '1px 1px 0 #000' }}
            >
              Level {toRoman(hoveredSkill.level)} &bull; {hoveredSkill.category.toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
