import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { GameProvider, useGame } from './context/GameContext';
import { QUALITY } from './utils/constants';
import portfolio from './data/portfolio';

// 3D Scenes
import SpawnVillage from './scenes/SpawnVillage/SpawnVillage';
import VoxelSky from './components/Environment/VoxelSky';

// Player
import Player from './components/Player/Player';

// UI
import LoadingScreen from './ui/Menus/LoadingScreen';
import MainMenu from './ui/Menus/MainMenu';
import HUD from './ui/HUD/HUD';
import Hotbar from './ui/Hotbar/Hotbar';
import AboutPanel from './ui/Panels/AboutPanel';
import SkillsPanel from './ui/Panels/SkillsPanel';
import ProjectsPanel from './ui/Panels/ProjectsPanel';
import ExperiencePanel from './ui/Panels/ExperiencePanel';
import ContactPanel from './ui/Panels/ContactPanel';
import ResumePanel from './ui/Panels/ResumePanel';
import ProjectModal from './ui/Modals/ProjectModal';

/** 3D World — rendered inside Canvas */
function World() {
  const { quality } = useGame();
  const settings = QUALITY[quality] || QUALITY.MEDIUM;

  return (
    <>
      {/* Warm golden-hour sunset lighting matching Reference #1 */}
      <ambientLight intensity={0.7} color="#ffdfb8" />
      <directionalLight
        position={[-26, 14, -38]}
        intensity={2.4}
        color="#ff9d3a"
        castShadow={settings.shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={120}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      {/* Soft sky bounce fill */}
      <directionalLight
        position={[25, 18, 20]}
        intensity={0.45}
        color="#f8a760"
      />
      <hemisphereLight args={['#fa9d3a', '#4a7d32', 0.5]} />

      {/* Warm golden atmospheric fog */}
      <fog attach="fog" args={['#d98246', 25, 90]} />

      {/* Sky */}
      <VoxelSky />

      {/* Only spawn village for first milestone */}
      <SpawnVillage />

      {/* Player + Camera */}
      <Player />
    </>
  );
}

/**
 * 3D Game Scene — renders during BOTH menu and playing phases
 * This is the key architectural change: the 3D world IS the background
 */
function GameScene() {
  const { phase, quality } = useGame();
  const settings = QUALITY[quality] || QUALITY.MEDIUM;

  // Only hide during loading and fallback
  if (phase === 'loading' || phase === 'fallback2d') return null;

  return (
    <div className="fixed inset-0 z-10">
      <Canvas
        shadows={settings.shadows}
        dpr={settings.pixelRatio}
        camera={{ position: [8, 6, 14], fov: 65, near: 0.1, far: 200 }}
        gl={{ antialias: settings.antialias, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#e88d44');
          gl.toneMapping = 1; // LinearToneMapping
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>
    </div>
  );
}

/** Global keyboard handlers */
function GlobalKeyboard() {
  const { phase, activePanel, activeModal, setPanel, closeModal, toggleMenu } = useGame();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeModal) {
          closeModal();
        } else if (activePanel) {
          setPanel(null);
        } else if (phase === 'playing') {
          toggleMenu();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, activePanel, activeModal, setPanel, closeModal, toggleMenu]);

  return null;
}

/** 2D Fallback for non-WebGL browsers */
function Fallback2D() {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: '#0f0f1a' }}>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1
          className="text-center mb-2 text-muted-cyan"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '1rem' }}
        >
          {portfolio.name}
        </h1>
        <p className="text-center text-text-secondary mb-8">{portfolio.tagline}</p>

        <div className="panel-glass p-6 mb-6">
          <h2 className="text-muted-cyan text-sm font-bold mb-3" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem' }}>ABOUT</h2>
          <p className="text-text-secondary text-sm">{portfolio.bio}</p>
        </div>

        <div className="panel-glass p-6 mb-6">
          <h2 className="text-muted-cyan text-sm font-bold mb-3" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem' }}>SKILLS</h2>
          <div className="space-y-2">
            {portfolio.skills.map(s => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="text-text-primary text-sm min-w-32">{s.name}</span>
                <div className="flex-1 progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${(s.level/s.maxLevel)*100}%`, background: '#4ecdc4' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-glass p-6 mb-6">
          <h2 className="text-muted-cyan text-sm font-bold mb-3" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem' }}>PROJECTS</h2>
          {portfolio.projects.map(p => (
            <div key={p.id} className="border border-stone/20 p-4 mb-3" style={{ borderRadius: '3px' }}>
              <h3 className="text-text-primary text-sm font-semibold">{p.title}</h3>
              <p className="text-text-secondary text-xs mt-1">{p.description}</p>
              <div className="flex gap-1 mt-2">{p.stack.map(t => <span key={t} className="text-xs text-text-muted border border-stone/20 px-1.5 py-0.5">{t}</span>)}</div>
            </div>
          ))}
        </div>

        <div className="panel-glass p-6 mb-6 text-center">
          <h2 className="text-muted-cyan text-sm font-bold mb-3" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem' }}>CONTACT</h2>
          <p className="text-text-secondary text-sm">Reach out via the links in portfolio.js</p>
        </div>
      </div>
    </div>
  );
}

/** Main App — detects WebGL and renders appropriate experience */
function AppContent() {
  const { phase, setPhase, webglAvailable, setWebgl, setMobile, setLoadingProgress } = useGame();

  // Detect WebGL
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebgl(false);
        setPhase('fallback2d');
      }
    } catch {
      setWebgl(false);
      setPhase('fallback2d');
    }
  }, []);

  // Detect mobile
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Simulate loading progress for initial load
  useEffect(() => {
    if (phase !== 'loading') return;
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setLoadingProgress(progress);
    }, 200);
    return () => clearInterval(interval);
  }, [phase]);

  // Set document title
  useEffect(() => {
    document.title = portfolio.meta.title;
  }, []);

  if (!webglAvailable || phase === 'fallback2d') {
    return <Fallback2D />;
  }

  return (
    <>
      <GlobalKeyboard />
      <LoadingScreen />
      {/* 3D world renders during menu AND playing */}
      <GameScene />
      {/* Game menu overlay on top of 3D world */}
      <MainMenu />
      {/* HUD and Hotbar visible during menu AND playing */}
      <HUD />
      <Hotbar />
      {/* Panels only during playing */}
      <AboutPanel />
      <SkillsPanel />
      <ProjectsPanel />
      <ExperiencePanel />
      <ContactPanel />
      <ResumePanel />
      <ProjectModal />
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
