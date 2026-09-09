import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import { SKILL_CATEGORIES, toRoman } from '../../utils/constants';
import gsap from 'gsap';

/** Skills panel — Enchantment style */
export default function SkillsPanel() {
  const { activePanel, setPanel } = useGame();
  const panelRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    if (activePanel === 'skills' && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
      );
      // Animate bars
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          gsap.fromTo(bar,
            { width: '0%' },
            { width: bar.dataset.width, duration: 0.8, delay: 0.2 + i * 0.08, ease: 'power2.out' }
          );
        }
      });
    }
  }, [activePanel]);

  if (activePanel !== 'skills') return null;

  // Group by category
  const grouped = {};
  portfolio.skills.forEach(skill => {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push(skill);
  });

  return (
    <div className="fixed inset-0 z-25 flex items-center justify-start p-6 md:p-12 pointer-events-none">
      <div
        ref={panelRef}
        className="panel-glass p-6 md:p-8 max-w-lg w-full pointer-events-auto overflow-y-auto max-h-[80vh]"
        role="dialog"
        aria-label="Skills"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-enchant-purple text-glow-purple"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.75rem' }}
          >
            ✨ ENCHANTMENTS
          </h2>
          <button
            onClick={() => setPanel(null)}
            className="text-text-muted hover:text-text-primary transition-colors cursor-pointer text-xl leading-none"
            aria-label="Close panel"
          >
            ✕
          </button>
        </div>

        <div className="h-px bg-gradient-to-r from-enchant-purple/30 via-enchant-purple/10 to-transparent mb-6" />

        {/* Skills list */}
        <div className="space-y-3">
          {portfolio.skills.map((skill, i) => {
            const percent = (skill.level / skill.maxLevel) * 100;
            const cat = SKILL_CATEGORIES[skill.category];
            const catColor = cat?.color || '#4ecdc4';
            
            return (
              <div key={skill.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-enchant-purple"
                      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem' }}
                    >
                      {toRoman(skill.level)}
                    </span>
                    <span className="text-text-primary text-sm font-medium">{skill.name}</span>
                  </div>
                  <span
                    className="text-text-muted"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.35rem' }}
                  >
                    {cat?.label || skill.category}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="progress-bar-container">
                  <div
                    ref={el => barsRef.current[i] = el}
                    className="progress-bar-fill"
                    data-width={`${percent}%`}
                    style={{
                      width: '0%',
                      background: `linear-gradient(90deg, ${catColor}, ${catColor}aa)`,
                    }}
                  />
                </div>

                {/* Hover tooltip info */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
                  <p className="text-text-muted text-xs mt-1.5 pl-1">
                    {skill.description}
                    {skill.years && ` • ${skill.years} years`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
