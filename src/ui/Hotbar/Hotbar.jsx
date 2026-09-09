import { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { HOTBAR_ITEMS } from '../../utils/constants';

/**
 * Pixel Item Icon Component — renders authentic voxel inventory items
 */
function PixelIcon({ id }) {
  switch (id) {
    case 'home': // Grass block
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          {/* Dirt base */}
          <rect x="2" y="2" width="20" height="20" fill="#6d4627" rx="1" />
          <rect x="5" y="14" width="3" height="3" fill="#4d3018" />
          <rect x="14" y="16" width="4" height="3" fill="#4d3018" />
          {/* Grass top with dripping fringes */}
          <rect x="2" y="2" width="20" height="8" fill="#589c31" rx="1" />
          <rect x="4" y="10" width="3" height="3" fill="#589c31" />
          <rect x="11" y="10" width="3" height="4" fill="#589c31" />
          <rect x="17" y="10" width="3" height="2" fill="#589c31" />
          {/* Top highlight */}
          <rect x="3" y="3" width="18" height="2" fill="#78c946" />
        </svg>
      );
    case 'about': // Player head
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          {/* Head base / skin */}
          <rect x="3" y="3" width="18" height="18" fill="#d9a066" rx="1" />
          {/* Hair */}
          <rect x="3" y="3" width="18" height="6" fill="#2b1a10" rx="1" />
          <rect x="3" y="9" width="3" height="4" fill="#2b1a10" />
          <rect x="18" y="9" width="3" height="4" fill="#2b1a10" />
          {/* Beard */}
          <rect x="7" y="16" width="10" height="3" fill="#2b1a10" />
          {/* Eyes */}
          <rect x="6" y="11" width="3" height="3" fill="#ffffff" />
          <rect x="7" y="12" width="2" height="2" fill="#222222" />
          <rect x="15" y="11" width="3" height="3" fill="#ffffff" />
          <rect x="15" y="12" width="2" height="2" fill="#222222" />
        </svg>
      );
    case 'skills': // Enchanted Book
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          {/* Book cover */}
          <rect x="4" y="3" width="16" height="18" fill="#7a288a" rx="1" />
          {/* Pages edge */}
          <rect x="17" y="4" width="2" height="16" fill="#f0e6d2" />
          {/* Clasp / Corners */}
          <rect x="4" y="10" width="8" height="4" fill="#d4af37" />
          <rect x="7" y="11" width="2" height="2" fill="#c0392b" />
          {/* Magic glow specks */}
          <rect x="7" y="5" width="2" height="2" fill="#00ffff" />
          <rect x="12" y="16" width="2" height="2" fill="#00ffff" />
        </svg>
      );
    case 'projects': // Chest
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          {/* Wood chest body */}
          <rect x="3" y="3" width="18" height="18" fill="#9c5f28" rx="1" />
          {/* Lid rim */}
          <rect x="3" y="8" width="18" height="2" fill="#3a220d" />
          {/* Inner shade */}
          <rect x="4" y="4" width="16" height="1" fill="#c47d37" />
          {/* Silver/Gold latch */}
          <rect x="10" y="7" width="4" height="5" fill="#e0e0e0" />
          <rect x="11" y="8" width="2" height="3" fill="#333333" />
        </svg>
      );
    case 'experience': // Compass
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          {/* Gold rim */}
          <rect x="3" y="3" width="18" height="18" fill="#d4ac0d" rx="9" />
          {/* Dark dial */}
          <rect x="5" y="5" width="14" height="14" fill="#263238" rx="7" />
          {/* Red needle */}
          <polygon points="12,6 15,12 12,11 9,12" fill="#e74c3c" />
          {/* White needle */}
          <polygon points="12,18 15,12 12,13 9,12" fill="#ecf0f1" />
          {/* Center pin */}
          <circle cx="12" cy="12" r="1.5" fill="#f1c40f" />
        </svg>
      );
    case 'resume': // Nether star
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          {/* 4-point star */}
          <polygon
            points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5"
            fill="#ffffff"
          />
          {/* Inner glow */}
          <polygon
            points="12,6 13.5,10.5 18,12 13.5,13.5 12,18 10.5,13.5 6,12 10.5,10.5"
            fill="#a8f5ff"
          />
          <rect x="11" y="11" width="2" height="2" fill="#ffffff" />
        </svg>
      );
    case 'trades': // Emerald
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          {/* Faceted emerald */}
          <polygon points="8,3 16,3 21,8 21,16 16,21 8,21 3,16 3,8" fill="#1b9e4b" />
          <polygon points="9,5 15,5 19,9 19,15 15,19 9,19 5,15 5,9" fill="#2ecc71" />
          {/* Facet highlight */}
          <polygon points="9,5 15,5 12,9" fill="#a3f7bf" />
          <polygon points="15,5 19,9 15,12" fill="#58d68d" />
        </svg>
      );
    case 'notes': // Book and Quill
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          {/* Book */}
          <rect x="3" y="6" width="14" height="15" fill="#7d4e28" rx="1" />
          <rect x="5" y="8" width="10" height="11" fill="#e8dac1" />
          {/* Quill feather */}
          <polygon points="19,2 21,4 12,16 10,16 10,14" fill="#f5f5f5" />
          <line x1="19" y1="2" x2="10" y2="16" stroke="#c0c0c0" strokeWidth="1" />
          {/* Ink tip */}
          <polygon points="11,15 10,16 12,16" fill="#1a1a1a" />
        </svg>
      );
    case 'contact': // Ender Pearl
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          {/* Dark teal orb */}
          <circle cx="12" cy="12" r="8.5" fill="#083a38" />
          <circle cx="12" cy="12" r="7" fill="#0b5854" />
          <circle cx="12" cy="12" r="5" fill="#118077" />
          {/* Core glow */}
          <circle cx="10.5" cy="10" r="2.5" fill="#1dd1a1" />
          <circle cx="9.5" cy="9" r="1" fill="#c8f7dc" />
        </svg>
      );
    default:
      return <div className="text-sm">📦</div>;
  }
}

/**
 * 9-slot Hotbar at bottom center of screen
 * Visible during BOTH menu and playing phases
 * Matches Reference Image #1 & #2
 */
export default function Hotbar() {
  const { selectedHotbar, setHotbar, setArea, setPanel, togglePanel, setPhase, phase } =
    useGame();
  const [tooltip, setTooltip] = useState(null);

  // Keyboard hotkeys 1-9
  useEffect(() => {
    const onKeyDown = (e) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 9) {
        e.preventDefault();
        handleSelect(num - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase]);

  const handleSelect = (index) => {
    setHotbar(index);
    const item = HOTBAR_ITEMS[index];
    if (!item) return;

    // If in menu phase, clicking a hotbar item activates playing mode & navigates
    if (phase === 'menu') {
      setPhase('playing');
    }

    if (item.id === 'resume') {
      togglePanel('resume');
      return;
    }

    if (item.area) {
      setArea(item.area);
      const panelMap = {
        workshop: 'about',
        enchantment: 'skills',
        trading: 'projects',
        advancements: 'experience',
        theEnd: 'contact',
        spawn: null,
      };
      const panel = panelMap[item.area];
      if (panel) {
        setTimeout(() => setPanel(panel), 350);
      } else {
        setPanel(null);
      }
    }
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-30 select-none">
      <nav
        className="hotbar-container"
        aria-label="Inventory hotbar"
      >
        {HOTBAR_ITEMS.map((item, i) => {
          const isActive = selectedHotbar === i;

          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => handleSelect(i)}
                onMouseEnter={() => setTooltip(i)}
                onMouseLeave={() => setTooltip(null)}
                className={`inv-slot ${isActive ? 'active' : ''}`}
                aria-label={`${item.label} (Slot ${item.key})`}
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Tiny slot number in top-left like Minecraft */}
                <span
                  className="hud-text absolute top-0.5 left-1 text-[8px] leading-none pointer-events-none"
                  style={{
                    color: isActive ? '#ffffff' : '#888888',
                    textShadow: '1px 1px 0 #000',
                  }}
                >
                  {item.key}
                </span>

                {/* Pixel Art Item Icon */}
                <div className="flex items-center justify-center pointer-events-none mt-1">
                  <PixelIcon id={item.id} />
                </div>
              </button>

              {/* Tooltip on hover */}
              {tooltip === i && (
                <div
                  className="tooltip-rpg absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-40"
                  style={{
                    animation: 'fadeInUp 0.15s ease',
                    background: '#100010',
                    border: '2px solid #280050',
                    padding: '6px 10px',
                    boxShadow: 'inset 0 0 6px #5000a0',
                  }}
                >
                  <p
                    className="hud-text text-[9px] text-[#e8e8f0]"
                    style={{ textShadow: '1px 1px 0 #000' }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="hud-text text-[7px] text-[#8888aa] mt-0.5"
                    style={{ textShadow: '1px 1px 0 #000' }}
                  >
                    Press [{item.key}]
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
