import { useState, useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/**
 * Projects Panel — Matches /reference/trading-hall.png and /reference/Screenshot_2026_0909_111507.png:
 * - Tab 1: "Villager Trades" (Emeralds -> Projects, In stock, Stats: 20+ Builds, 18+ Clients, 3 Countries, Make an Offer)
 * - Tab 2: "Chest - Completed Builds" (Inventory slot grid with rare item badges)
 */
export default function ProjectsPanel() {
  const { activePanel, setPanel, setModal, setArea } = useGame();
  const [viewMode, setViewMode] = useState('trades'); // 'trades' | 'chest'
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const panelRef = useRef(null);

  useEffect(() => {
    if (activePanel === 'projects' && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: -30, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
      );
    }
  }, [activePanel]);

  if (activePanel !== 'projects') return null;

  const handleOpenProject = (project) => {
    setModal({ type: 'project', data: project });
  };

  const handleMakeOffer = () => {
    setArea('theEnd');
    setPanel('contact');
  };

  return (
    <div
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      className="fixed inset-0 z-40 flex items-center justify-start p-6 md:p-14 pointer-events-none select-none"
    >
      <div
        ref={panelRef}
        className="game-panel p-6 max-w-xl w-full pointer-events-auto shadow-2xl relative"
        style={{
          background: 'linear-gradient(180deg, #2b2b2b 0%, #1c1c1c 100%)',
          border: '3px solid #000000',
          boxShadow: 'inset 2px 2px 0 #555555, inset -2px -2px 0 #111111, 0 12px 36px rgba(0,0,0,0.8)',
        }}
        role="dialog"
        aria-label="Projects and Builds"
      >
        {/* Header & Tabs */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#111111] mb-4">
          <div className="flex items-center gap-3">
            <h2
              className="hud-text text-white"
              style={{ fontSize: '0.85rem', letterSpacing: '1px', textShadow: '2px 2px 0 #000' }}
            >
              {viewMode === 'trades' ? 'Villager Trades' : 'Chest - Completed Builds'}
            </h2>
            <span
              className="hud-text text-stone-400 hidden sm:inline"
              style={{ fontSize: '0.42rem' }}
            >
              Master Builder &bull; Level 5
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'trades' ? 'chest' : 'trades')}
              className="btn-game px-2.5 py-1 text-[9px]"
              aria-label="Toggle View"
            >
              {viewMode === 'trades' ? '📦 Chest View' : '💎 Trades View'}
            </button>
            <button
              onClick={() => setPanel(null)}
              className="btn-game px-2.5 py-1 text-xs leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── VIEW 1: VILLAGER TRADES (matches /reference/trading-hall.png) ── */}
        {viewMode === 'trades' && (
          <div>
            <div className="space-y-2 mb-5">
              {portfolio.projects.map((project, i) => {
                const costs = [12, 28, 20, 36];
                const cost = costs[i % costs.length];
                const inStock = i < 3;

                return (
                  <div
                    key={project.id}
                    onClick={() => handleOpenProject(project)}
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="flex items-center justify-between px-3 py-2.5 border border-[#333333] hover:border-[#80ff20] hover:bg-white/5 transition-all cursor-pointer"
                    style={{ background: '#191919' }}
                  >
                    {/* Emerald cost */}
                    <div className="flex items-center gap-2 w-16 shrink-0">
                      <span className="text-sm">💎</span>
                      <span
                        className="hud-text text-white font-bold"
                        style={{ fontSize: '0.62rem', textShadow: '1px 1px 0 #000' }}
                      >
                        {cost}
                      </span>
                    </div>

                    {/* Arrow */}
                    <span className="text-stone-500 text-xs px-1">➔</span>

                    {/* Project Title & Subtitle */}
                    <div className="flex-1 px-2 min-w-0">
                      <h4
                        className="hud-text text-white truncate"
                        style={{ fontSize: '0.52rem', textShadow: '1px 1px 0 #000' }}
                      >
                        {project.title}
                      </h4>
                      <p
                        className="text-stone-400 text-xs truncate mt-0.5"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {project.type} &bull; {project.stack.slice(0, 3).join(', ')}
                      </p>
                    </div>

                    {/* Stock Status Badge */}
                    <div className="shrink-0 pl-2">
                      <span
                        className="hud-text px-2 py-0.5 text-[9px] border"
                        style={{
                          color: inStock ? '#55ff55' : '#f1c40f',
                          borderColor: inStock ? '#2ecc71' : '#f39c12',
                          background: inStock ? 'rgba(46,204,113,0.1)' : 'rgba(241,196,15,0.1)',
                          textShadow: '1px 1px 0 #000',
                        }}
                      >
                        {inStock ? 'In stock' : 'Limited'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Stats Row (from reference image) */}
            <div
              className="flex items-center justify-around py-2.5 mb-4 border border-[#333333]"
              style={{ background: '#141414' }}
            >
              <div className="text-center">
                <p className="hud-text text-white text-xs font-bold" style={{ textShadow: '1px 1px 0 #000' }}>
                  20+
                </p>
                <p className="hud-text text-stone-400 text-[8px] mt-0.5">BUILDS</p>
              </div>
              <div className="h-6 w-px bg-[#333333]" />
              <div className="text-center">
                <p className="hud-text text-white text-xs font-bold" style={{ textShadow: '1px 1px 0 #000' }}>
                  18+
                </p>
                <p className="hud-text text-stone-400 text-[8px] mt-0.5">CLIENTS</p>
              </div>
              <div className="h-6 w-px bg-[#333333]" />
              <div className="text-center">
                <p className="hud-text text-white text-xs font-bold" style={{ textShadow: '1px 1px 0 #000' }}>
                  3
                </p>
                <p className="hud-text text-stone-400 text-[8px] mt-0.5">COUNTRIES</p>
              </div>
            </div>

            {/* Bottom button: Make an Offer */}
            <button
              onClick={handleMakeOffer}
              className="btn-game w-full py-2.5 text-center"
              style={{ fontSize: '0.62rem' }}
            >
              Make an Offer
            </button>
          </div>
        )}

        {/* ── VIEW 2: CHEST - COMPLETED BUILDS (matches /reference/Screenshot_...png) ── */}
        {viewMode === 'chest' && (
          <div>
            <p className="hud-text text-stone-400 text-[9px] mb-3">
              Hover an item to inspect completed build details:
            </p>
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 mb-5">
              {portfolio.projects.map((project, i) => {
                const icons = ['⭐', '🔭', '⚡', '🏹', '💎', '📦'];
                const icon = icons[i % icons.length];

                return (
                  <button
                    key={project.id}
                    onClick={() => handleOpenProject(project)}
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="inv-slot"
                    style={{ width: '56px', height: '56px' }}
                    aria-label={project.title}
                  >
                    <span className="text-2xl">{icon}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setViewMode('trades')}
              className="btn-game w-full py-2.5 text-center"
              style={{ fontSize: '0.62rem' }}
            >
              See Trades
            </button>
          </div>
        )}

        {/* Floating Tooltip */}
        {hoveredProject && (
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
            <p className="hud-text text-[#ffdf55] mb-1" style={{ fontSize: '0.55rem', textShadow: '1px 1px 0 #000' }}>
              {hoveredProject.title}
            </p>
            <p className="hud-text text-[#a8f5ff] mb-1 leading-relaxed" style={{ fontSize: '0.42rem', textShadow: '1px 1px 0 #000' }}>
              {hoveredProject.description}
            </p>
            <p className="hud-text text-[#b0a080]" style={{ fontSize: '0.38rem' }}>
              Stack: {hoveredProject.stack.join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
