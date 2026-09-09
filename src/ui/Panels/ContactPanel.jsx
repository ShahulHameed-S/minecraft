import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/**
 * Contact Panel — The End Portal UI
 * Matches voxel game aesthetic:
 * - Dark obsidian stone panel with purple Ender energy borders
 * - Real communication portals (Email, GitHub, LinkedIn, Twitter)
 */
export default function ContactPanel() {
  const { activePanel, setPanel } = useGame();
  const panelRef = useRef(null);

  useEffect(() => {
    if (activePanel === 'contact' && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
      );
    }
  }, [activePanel]);

  if (activePanel !== 'contact') return null;

  const email = portfolio.contact?.email || portfolio.socials?.email;
  const github = portfolio.contact?.github || portfolio.socials?.github;
  const linkedin = portfolio.contact?.linkedin || portfolio.socials?.linkedin;
  const twitter = portfolio.contact?.twitter || portfolio.socials?.twitter;

  const links = [
    { label: 'SEND DISPATCH (EMAIL)', icon: '📧', href: email ? `mailto:${email}` : null },
    { label: 'INSPECT REPOSITORIES (GITHUB)', icon: '🐙', href: github },
    { label: 'ESTABLISH LINK (LINKEDIN)', icon: '💼', href: linkedin },
    { label: 'FOLLOW TRANSMISSIONS (X / TWITTER)', icon: '🐦', href: twitter },
  ].filter((l) => l.href);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/60 pointer-events-auto select-none">
      <div
        ref={panelRef}
        className="game-panel p-8 max-w-md w-full shadow-2xl relative text-center"
        style={{
          background: 'linear-gradient(180deg, #1f1128 0%, #0d0714 100%)',
          border: '3px solid #7b2fff',
          boxShadow: 'inset 0 0 16px rgba(123, 47, 255, 0.4), 0 16px 40px rgba(0,0,0,0.9)',
        }}
        role="dialog"
        aria-label="Contact Gateway"
      >
        {/* Close */}
        <button
          onClick={() => setPanel(null)}
          className="btn-game absolute top-4 right-4 px-2.5 py-1 text-xs leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <p
          className="hud-text text-[#c39bd3] mb-2"
          style={{ fontSize: '0.55rem', letterSpacing: '2px', textShadow: '1px 1px 0 #000' }}
        >
          THE END GATEWAY
        </p>

        <h2
          className="hud-text text-white mb-3"
          style={{
            fontSize: '0.82rem',
            lineHeight: 1.5,
            textShadow: '2px 2px 0 #000',
          }}
        >
          THE ADVENTURE DOESN'T END HERE
        </h2>

        <p className="text-stone-300 text-xs mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
          Step through the portal to initiate collaboration or send a quest proposal.
        </p>

        {/* Links */}
        <div className="space-y-2.5 mb-6">
          {links.length > 0 ? (
            links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="btn-game w-full py-3 flex items-center justify-center gap-2.5 text-center no-underline"
                style={{ fontSize: '0.52rem' }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))
          ) : (
            <div className="space-y-2">
              <a
                href="mailto:contact@developer.com"
                className="btn-game w-full py-3 flex items-center justify-center gap-2.5 text-center no-underline"
                style={{ fontSize: '0.52rem' }}
              >
                <span>📧</span> SEND EMAIL
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="btn-game w-full py-3 flex items-center justify-center gap-2.5 text-center no-underline"
                style={{ fontSize: '0.52rem' }}
              >
                <span>🐙</span> GITHUB PROFILE
              </a>
            </div>
          )}
        </div>

        <p
          className="hud-text text-stone-500 text-[8px]"
          style={{ textShadow: '1px 1px 0 #000' }}
        >
          Press ESC to return to the world
        </p>
      </div>
    </div>
  );
}
