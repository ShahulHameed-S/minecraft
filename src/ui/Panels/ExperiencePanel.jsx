import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/**
 * Advancements Panel — Matches /reference/achievements.png:
 * - Dark stone game panel titled "Advancements"
 * - List of achievements with square icon frame, title, description, and green checkmark
 * - "Send a Message" button
 */
export default function ExperiencePanel() {
  const { activePanel, setPanel, setArea } = useGame();
  const panelRef = useRef(null);

  useEffect(() => {
    if (activePanel === 'experience' && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: 30, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
      );
    }
  }, [activePanel]);

  if (activePanel !== 'experience') return null;

  const handleSendMessage = () => {
    setArea('theEnd');
    setPanel('contact');
  };

  // Combine portfolio achievements and experience
  const defaultAdvancements = [
    {
      icon: '📦',
      title: 'Taking Inventory',
      desc: 'Shipped my first live web build',
      unlocked: true,
    },
    {
      icon: '🌍',
      title: 'Into the Wider World',
      desc: 'Delivered projects across multiple continents',
      unlocked: true,
    },
    {
      icon: '🔥',
      title: 'Hot Topic',
      desc: 'Built viral creative 3D web experiences',
      unlocked: true,
    },
    {
      icon: '⏳',
      title: 'The Long Haul',
      desc: '1000+ hours of consistent coding and craft',
      unlocked: true,
    },
    {
      icon: '🔮',
      title: 'Free the End',
      desc: 'Ready for full-time & creative collaborations',
      unlocked: false,
    },
  ];

  const advancements =
    portfolio.achievements && portfolio.achievements.length > 0
      ? portfolio.achievements.map((a, i) => ({
          icon: a.icon || ['📦', '🌍', '🔥', '⏳', '🔮'][i % 5],
          title: a.title,
          desc: a.description,
          unlocked: a.unlocked !== false,
        }))
      : defaultAdvancements;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-end p-6 md:p-14 pointer-events-none select-none">
      <div
        ref={panelRef}
        className="game-panel p-6 max-w-md w-full pointer-events-auto shadow-2xl relative mr-2 md:mr-6"
        style={{
          background: 'linear-gradient(180deg, #2b2b2b 0%, #1c1c1c 100%)',
          border: '3px solid #000000',
          boxShadow: 'inset 2px 2px 0 #555555, inset -2px -2px 0 #111111, 0 12px 36px rgba(0,0,0,0.8)',
        }}
        role="dialog"
        aria-label="Advancements"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#111111] mb-4">
          <h2
            className="hud-text text-white"
            style={{ fontSize: '0.85rem', letterSpacing: '1px', textShadow: '2px 2px 0 #000' }}
          >
            Advancements
          </h2>
          <button
            onClick={() => setPanel(null)}
            className="btn-game px-2.5 py-1 text-xs leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Advancements List (Matches Reference #3) */}
        <div className="space-y-2.5 mb-5">
          {advancements.map((item, i) => (
            <div
              key={item.title}
              className={`flex items-center gap-3 p-2.5 border transition-all ${
                item.unlocked
                  ? 'border-[#383838] hover:border-[#80ff20] bg-[#191919]'
                  : 'border-[#222222] bg-[#131313] opacity-60'
              }`}
            >
              {/* Icon Frame */}
              <div
                className="w-10 h-10 shrink-0 flex items-center justify-center border border-[#444444]"
                style={{
                  background: item.unlocked ? '#242424' : '#141414',
                  boxShadow: 'inset 1px 1px 0 #000',
                }}
              >
                <span className="text-xl">{item.icon}</span>
              </div>

              {/* Title & Desc */}
              <div className="flex-1 min-w-0">
                <h4
                  className="hud-text text-white truncate"
                  style={{
                    fontSize: '0.48rem',
                    textShadow: '1px 1px 0 #000',
                    color: item.unlocked ? '#ffffff' : '#888888',
                  }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-stone-400 text-xs truncate mt-0.5"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.desc}
                </p>
              </div>

              {/* Green Checkmark */}
              <div className="shrink-0 px-2">
                {item.unlocked ? (
                  <span
                    className="hud-text text-[#55ff55] font-bold text-sm"
                    style={{ textShadow: '1px 1px 0 #000' }}
                  >
                    ✓
                  </span>
                ) : (
                  <span className="hud-text text-stone-600 text-xs">🔒</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button: Send a Message */}
        <button
          onClick={handleSendMessage}
          className="btn-game w-full py-2.5 text-center"
          style={{ fontSize: '0.62rem' }}
        >
          Send a Message
        </button>
      </div>
    </div>
  );
}
