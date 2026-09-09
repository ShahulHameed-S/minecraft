import { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolio from '../../data/portfolio';
import gsap from 'gsap';

/** Contact panel — The End style */
export default function ContactPanel() {
  const { activePanel, setPanel } = useGame();
  const panelRef = useRef(null);

  useEffect(() => {
    if (activePanel === 'contact' && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
      );
    }
  }, [activePanel]);

  if (activePanel !== 'contact') return null;

  const socialLinks = [
    { key: 'email', label: 'EMAIL ME', icon: '📧', href: portfolio.socials.email ? `mailto:${portfolio.socials.email}` : null },
    { key: 'github', label: 'GITHUB', icon: '🐙', href: portfolio.socials.github || null },
    { key: 'linkedin', label: 'LINKEDIN', icon: '💼', href: portfolio.socials.linkedin || null },
    { key: 'twitter', label: 'TWITTER', icon: '🐦', href: portfolio.socials.twitter || null },
  ].filter(l => l.href);

  return (
    <div className="fixed inset-0 z-25 flex items-center justify-center p-6 pointer-events-none">
      <div
        ref={panelRef}
        className="panel-glass p-8 md:p-12 max-w-md w-full pointer-events-auto text-center"
        role="dialog"
        aria-label="Contact"
      >
        {/* Close */}
        <button
          onClick={() => setPanel(null)}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors cursor-pointer text-xl leading-none"
          aria-label="Close panel"
        >
          ✕
        </button>

        {/* Header */}
        <p
          className="text-enchant-purple text-glow-purple mb-2"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.5rem' }}
        >
          THE END
        </p>

        <h2
          className="text-text-primary mb-4 text-lg md:text-xl"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.7rem', lineHeight: '1.6' }}
        >
          THE ADVENTURE<br />DOESN'T END HERE.
        </h2>

        <p className="text-text-secondary text-sm mb-8">
          Let's build something amazing together.
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-enchant-purple/30 to-transparent mb-8" />

        {/* Social links */}
        <div className="space-y-3">
          {socialLinks.length > 0 ? (
            socialLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                target={link.key !== 'email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="btn-rpg w-full flex items-center justify-center gap-3 text-xs no-underline"
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </a>
            ))
          ) : (
            <div className="space-y-3">
              <p className="text-text-muted text-xs italic">
                [Add your social links in portfolio.js]
              </p>
              <div className="btn-rpg w-full flex items-center justify-center gap-3 text-xs opacity-50 cursor-not-allowed">
                <span>📧</span> EMAIL ME
              </div>
              <div className="btn-rpg w-full flex items-center justify-center gap-3 text-xs opacity-50 cursor-not-allowed">
                <span>🐙</span> GITHUB
              </div>
              <div className="btn-rpg w-full flex items-center justify-center gap-3 text-xs opacity-50 cursor-not-allowed">
                <span>💼</span> LINKEDIN
              </div>
            </div>
          )}
        </div>

        {/* Resume */}
        {portfolio.resumeUrl && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-stone/20 to-transparent my-6" />
            <a
              href={portfolio.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rpg w-full flex items-center justify-center gap-3 text-xs no-underline"
            >
              <span>📋</span> VIEW RESUME
            </a>
          </>
        )}
      </div>
    </div>
  );
}
