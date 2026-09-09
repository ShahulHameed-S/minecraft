import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Particles from '../../components/Environment/Particles';

/** Floating island in the void */
function FloatingIsland({ position, size = 3, color = '#2d0a4e' }) {
  const ref = useRef();
  const offset = Math.random() * Math.PI * 2;
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + offset) * 0.5;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <boxGeometry args={[size, size * 0.4, size]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0, size * 0.25, 0]}>
        <boxGeometry args={[size * 0.7, size * 0.15, size * 0.7]} />
        <meshStandardMaterial color="#3d1a5e" roughness={0.85} />
      </mesh>
      {/* Pillar on top */}
      {size > 3 && (
        <mesh position={[0, size * 0.5, 0]} castShadow>
          <boxGeometry args={[0.6, size * 0.6, 0.6]} />
          <meshStandardMaterial color="#4a2a6e" roughness={0.85} />
        </mesh>
      )}
    </group>
  );
}

/** Area 06 — The End: contact/final area */
export default function TheEnd() {
  return (
    <group position={[200, 0, 0]}>
      {/* Void floor — very dark */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0a0014" roughness={1} />
      </mesh>

      {/* Main platform */}
      <mesh position={[0, 0, -3]} castShadow>
        <boxGeometry args={[8, 0.5, 8]} />
        <meshStandardMaterial color="#2d0a4e" roughness={0.9} />
      </mesh>
      {/* Platform edge glow */}
      <mesh position={[0, 0.3, -3]}>
        <boxGeometry args={[8.2, 0.1, 8.2]} />
        <meshStandardMaterial color="#7b2fff" emissive="#7b2fff" emissiveIntensity={0.3} transparent opacity={0.5} />
      </mesh>

      {/* ── End gateway (portal-like structure) ──── */}
      <group position={[0, 0, -8]}>
        {/* Left pillar */}
        <mesh position={[-2, 2.5, 0]} castShadow>
          <boxGeometry args={[0.8, 5, 0.8]} />
          <meshStandardMaterial color="#2d2d4e" roughness={0.85} />
        </mesh>
        {/* Right pillar */}
        <mesh position={[2, 2.5, 0]} castShadow>
          <boxGeometry args={[0.8, 5, 0.8]} />
          <meshStandardMaterial color="#2d2d4e" roughness={0.85} />
        </mesh>
        {/* Top beam */}
        <mesh position={[0, 5.2, 0]} castShadow>
          <boxGeometry args={[5, 0.6, 0.8]} />
          <meshStandardMaterial color="#2d2d4e" roughness={0.85} />
        </mesh>
        {/* Portal glow */}
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[3.2, 4.2, 0.1]} />
          <meshStandardMaterial color="#7b2fff" emissive="#7b2fff" emissiveIntensity={0.8} transparent opacity={0.3} />
        </mesh>
        {/* Eye decorations */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <mesh key={`eye-${i}`} position={[x, 5.5, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.5} />
          </mesh>
        ))}
        <pointLight position={[0, 3, 1]} color="#7b2fff" intensity={3} distance={15} decay={2} />
      </group>

      {/* ── Floating Islands ──────────────────────── */}
      <FloatingIsland position={[-12, 2, -8]} size={4} />
      <FloatingIsland position={[14, 5, -12]} size={3} />
      <FloatingIsland position={[-8, 8, -18]} size={2.5} />
      <FloatingIsland position={[10, 3, -5]} size={2} />
      <FloatingIsland position={[-15, 6, -15]} size={3.5} color="#1a0a3e" />
      <FloatingIsland position={[18, 7, -20]} size={2} color="#3d1a5e" />

      {/* ── End crystals (decorative) ─────────────── */}
      {[[-3, 1.5, -3], [3, 1.5, -3], [0, 1.5, 0]].map(([x, y, z], i) => (
        <group key={`crystal-${i}`} position={[x, y, z]}>
          <mesh castShadow>
            <octahedronGeometry args={[0.2]} />
            <meshStandardMaterial color="#c39bd3" emissive="#c39bd3" emissiveIntensity={1} />
          </mesh>
          <pointLight position={[0, 0, 0]} color="#c39bd3" intensity={0.3} distance={3} decay={2} />
        </group>
      ))}

      {/* ── Ambient ───────────────────────────────── */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 10, -5]} color="#4a00b0" intensity={1} distance={25} decay={2} />

      {/* Particles */}
      <Particles count={40} area={25} color="#c39bd3" speed={0.15} />
      <Particles count={20} area={20} color="#7b2fff" speed={0.08} />
    </group>
  );
}
