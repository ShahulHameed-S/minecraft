import { createContext, useContext, useReducer, useCallback } from 'react';

const GameContext = createContext(null);

const initialState = {
  // App phase
  phase: 'loading',        // 'loading' | 'menu' | 'playing' | 'fallback2d'
  
  // Current area
  currentArea: 'spawn',
  
  // Active UI panel
  activePanel: null,        // null | 'about' | 'skills' | 'projects' | 'experience' | 'contact' | 'resume'
  
  // Active modal
  activeModal: null,        // null | { type: 'project', data: {...} }
  
  // Quality setting
  quality: 'MEDIUM',
  
  // Loading
  loadingProgress: 0,
  
  // Menu state
  menuOpen: false,
  
  // Hotbar
  selectedHotbar: 0,
  
  // Player position (for biome detection)
  playerPosition: [0, 0, 0],
  
  // Mobile mode
  isMobile: false,
  
  // Audio
  audioEnabled: false,
  
  // WebGL available
  webglAvailable: true,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.payload };
    case 'SET_AREA':
      return { ...state, currentArea: action.payload, activePanel: action.payload === state.currentArea ? state.activePanel : null };
    case 'SET_PANEL':
      return { ...state, activePanel: action.payload };
    case 'TOGGLE_PANEL':
      return { ...state, activePanel: state.activePanel === action.payload ? null : action.payload };
    case 'SET_MODAL':
      return { ...state, activeModal: action.payload };
    case 'CLOSE_MODAL':
      return { ...state, activeModal: null };
    case 'SET_QUALITY':
      return { ...state, quality: action.payload };
    case 'SET_LOADING_PROGRESS':
      return { ...state, loadingProgress: action.payload };
    case 'SET_MENU_OPEN':
      return { ...state, menuOpen: action.payload };
    case 'TOGGLE_MENU':
      return { ...state, menuOpen: !state.menuOpen };
    case 'SET_HOTBAR':
      return { ...state, selectedHotbar: action.payload };
    case 'SET_PLAYER_POSITION':
      return { ...state, playerPosition: action.payload };
    case 'SET_MOBILE':
      return { ...state, isMobile: action.payload };
    case 'TOGGLE_AUDIO':
      return { ...state, audioEnabled: !state.audioEnabled };
    case 'SET_WEBGL':
      return { ...state, webglAvailable: action.payload };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const setPhase = useCallback((phase) => dispatch({ type: 'SET_PHASE', payload: phase }), []);
  const setArea = useCallback((area) => dispatch({ type: 'SET_AREA', payload: area }), []);
  const setPanel = useCallback((panel) => dispatch({ type: 'SET_PANEL', payload: panel }), []);
  const togglePanel = useCallback((panel) => dispatch({ type: 'TOGGLE_PANEL', payload: panel }), []);
  const setModal = useCallback((modal) => dispatch({ type: 'SET_MODAL', payload: modal }), []);
  const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), []);
  const setQuality = useCallback((q) => dispatch({ type: 'SET_QUALITY', payload: q }), []);
  const setLoadingProgress = useCallback((p) => dispatch({ type: 'SET_LOADING_PROGRESS', payload: p }), []);
  const setMenuOpen = useCallback((open) => dispatch({ type: 'SET_MENU_OPEN', payload: open }), []);
  const toggleMenu = useCallback(() => dispatch({ type: 'TOGGLE_MENU' }), []);
  const setHotbar = useCallback((i) => dispatch({ type: 'SET_HOTBAR', payload: i }), []);
  const setPlayerPosition = useCallback((pos) => dispatch({ type: 'SET_PLAYER_POSITION', payload: pos }), []);
  const setMobile = useCallback((m) => dispatch({ type: 'SET_MOBILE', payload: m }), []);
  const toggleAudio = useCallback(() => dispatch({ type: 'TOGGLE_AUDIO' }), []);
  const setWebgl = useCallback((v) => dispatch({ type: 'SET_WEBGL', payload: v }), []);

  const value = {
    ...state,
    setPhase, setArea, setPanel, togglePanel,
    setModal, closeModal, setQuality, setLoadingProgress,
    setMenuOpen, toggleMenu, setHotbar, setPlayerPosition,
    setMobile, toggleAudio, setWebgl,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}

export default GameContext;
