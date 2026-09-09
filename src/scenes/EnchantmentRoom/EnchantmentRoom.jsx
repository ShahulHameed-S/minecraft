import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Particles from '../../components/Environment/Particles';

/** Floating book that bobs gently */
function FloatingBook({ position, color = '#1a1a6e', rotationSpeed = 0.3 }) {
  const ref = useRef();
  const offset = Math.random() * Math.PI * 2;
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + offset) * 0.3;
      ref.current.rotation.y += rotationSpeed * 0.01;
    }
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.6, 0.08, 0.4]} />
      <meshStandardMaterial color={color} roughness={0.7} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  );
}

/** Area 03 — Enchantment Room: mystical skills area */
export default function EnchantmentRoom() {
  const tableRef = useRef();
  
  useFrame((state) => {
    if (tableRef.current) {
      tableRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group position={[80, 0, 0]}>
      {/* Floor — dark obsidian */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.95} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 4, -10]} castShadow>
        <boxGeometry args={[20, 8, 0.5]} />
        <meshStandardMaterial color="#1a1a3e" roughness={0.95} />
      </mesh>
      <mesh position={[-10, 4, 0]} castShadow>
        <boxGeometry args={[0.5, 8, 20]} />
        <meshStandardMaterial color="#1a1a3e" roughness={0.95} />
      </mesh>
      <mesh position={[10, 4, 0]} castShadow>
        <boxGeometry args={[0.5, 8, 20]} />
        <meshStandardMaterial color="#1a1a3e" roughness={0.95} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[20, 0.3, 20]} />
        <meshStandardMaterial color="#0f0f2e" roughness={0.95} />
      </mesh>

      {/* ── Enchanting Table ──────────────────────── */}
      <group position={[0, 0, -3]}>
        {/* Base */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2, 1, 2]} />
          <meshStandardMaterial color="#2d2d4e" roughness={0.8} />
        </mesh>
        {/* Top surface */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[2.2, 0.1, 2.2]} />
          <meshStandardMaterial color="#7b2fff" emissive="#7b2fff" emissiveIntensity={0.4} roughness={0.5} />
        </mesh>
        {/* Floating diamond above table */}
        <mesh ref={tableRef} position={[0, 2.5, 0]} castShadow>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} transparent opacity={0.8} />
        </mesh>
        {/* Light source */}
        <pointLight position={[0, 2.5, 0]} color="#7b2fff" intensity={3} distance={12} decay={2} />
      </group>

      {/* ── Bookshelves along walls ───────────────── */}
      {[-7, -5, -3, 3, 5, 7].map((x) => (
        <group key={`eshelf-${x}`} position={[x, 0, -9.5]}>
          <mesh position={[0, 2, 0]} castShadow>
            <boxGeometry args={[1.8, 4, 0.8]} />
            <meshStandardMaterial color="#2d1b3e" roughness={0.9} />
          </mesh>
          {[0.7, 1.5, 2.3, 3.1].map((y, j) => (
            <mesh key={j} position={[0, y, 0.1]}>
              <boxGeometry args={[1.5, 0.5, 0.6]} />
              <meshStandardMaterial 
                color={['#3a1a5e', '#1a3a5e', '#2a1a4e', '#1a2a4e'][j % 4]} 
                roughness={0.85} 
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── Rune pillars ──────────────────────────── */}
      {[[-4, -6], [4, -6], [-4, 2], [4, 2]].map(([x, z], i) => (
        <group key={`pillar-${i}`} position={[x, 0, z]}>
          <mesh position={[0, 2, 0]} castShadow>
            <boxGeometry args={[0.8, 4, 0.8]} />
            <meshStandardMaterial color="#2d2d4e" roughness={0.9} />
          </mesh>
          {/* Glowing rune */}
          <mesh position={[0, 2.5, 0.42]}>
            <boxGeometry args={[0.3, 0.3, 0.02]} />
            <meshStandardMaterial color="#7b2fff" emissive="#7b2fff" emissiveIntensity={1.5} />
          </mesh>
          <pointLight position={[0, 2.5, 0.5]} color="#7b2fff" intensity={0.5} distance={4} decay={2} />
        </group>
      ))}

      {/* ── Floating Books ────────────────────────── */}
      <FloatingBook position={[-2, 3, -4]} color="#3a1a5e" />
      <FloatingBook position={[2.5, 3.5, -2]} color="#1a3a5e" rotationSpeed={0.5} />
      <FloatingBook position={[-1, 4, -1]} color="#4a1a6e" rotationSpeed={0.2} />
      <FloatingBook position={[1.5, 3.2, -5]} color="#2a2a6e" rotationSpeed={0.4} />

      {/* ── Ambient lighting ──────────────────────── */}
      <pointLight position={[0, 6, 0]} color="#4a00b0" intensity={1} distance={15} decay={2} />
      <pointLight position={[-6, 2, -6]} color="#00d4ff" intensity={0.5} distance={8} decay={2} />
      <pointLight position={[6, 2, -6]} color="#00d4ff" intensity={0.5} distance={8} decay={2} />

      {/* ── Purple Particles ──────────────────────── */}
      <Particles count={30} area={12} color="#7b2fff" speed={0.15} />
      <Particles count={15} area={8} color="#00d4ff" speed={0.1} />
    </group>
  );
}
