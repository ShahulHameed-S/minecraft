import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import VoxelLantern from '../../components/Common/VoxelLantern';
import Particles from '../../components/Environment/Particles';

/** Area 02 — Builder's Workshop: cozy interior for About Me */
export default function Workshop() {
  return (
    <group position={[40, 0, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.95} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 3, -8]} castShadow receiveShadow>
        <boxGeometry args={[16, 6, 0.5]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.9} />
      </mesh>
      <mesh position={[-8, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 6, 16]} />
        <meshStandardMaterial color="#7A5030" roughness={0.9} />
      </mesh>
      <mesh position={[8, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 6, 16]} />
        <meshStandardMaterial color="#7A5030" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 6, 0]} receiveShadow>
        <boxGeometry args={[16, 0.3, 16]} />
        <meshStandardMaterial color="#6B4423" roughness={0.95} />
      </mesh>

      {/* ── Crafting Table ────────────────────────── */}
      <group position={[0, 0, -5]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[2, 1.5, 1.5]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.85} />
        </mesh>
        {/* Grid top */}
        <mesh position={[0, 1.52, 0]} castShadow>
          <boxGeometry args={[2.1, 0.05, 1.6]} />
          <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
        </mesh>
        {/* Tools on table */}
        <mesh position={[-0.5, 1.6, 0]} castShadow>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#7a7a8a" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0.3, 1.6, -0.2]} castShadow>
          <boxGeometry args={[0.4, 0.08, 0.08]} />
          <meshStandardMaterial color="#c0a030" metalness={0.4} roughness={0.5} />
        </mesh>
      </group>

      {/* ── Bookshelves ───────────────────────────── */}
      {[-6, -4, -2].map((x, i) => (
        <group key={`shelf-${i}`} position={[x, 0, -7.5]}>
          <mesh position={[0, 2, 0]} castShadow>
            <boxGeometry args={[1.8, 4, 0.8]} />
            <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
          </mesh>
          {/* Books */}
          {[0.7, 1.5, 2.3, 3.1].map((y, j) => (
            <mesh key={j} position={[0, y, 0.1]} castShadow>
              <boxGeometry args={[1.5, 0.5, 0.6]} />
              <meshStandardMaterial 
                color={['#8B2500', '#2d5a27', '#1a1a6e', '#6b4423'][j % 4]} 
                roughness={0.85} 
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── Chests ────────────────────────────────── */}
      <group position={[5, 0, -6]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.4, 1, 1]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[1.5, 0.15, 1.1]} />
          <meshStandardMaterial color="#6B4423" roughness={0.85} />
        </mesh>
        {/* Lock */}
        <mesh position={[0, 0.6, 0.52]}>
          <boxGeometry args={[0.15, 0.15, 0.05]} />
          <meshStandardMaterial color="#c0a030" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* ── Map on wall ───────────────────────────── */}
      <mesh position={[0, 3.5, -7.7]}>
        <boxGeometry args={[2.5, 2, 0.05]} />
        <meshStandardMaterial color="#d4a843" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.5, -7.65]}>
        <boxGeometry args={[2.2, 1.7, 0.05]} />
        <meshStandardMaterial color="#c4984a" roughness={0.85} />
      </mesh>

      {/* ── Lanterns ──────────────────────────────── */}
      <VoxelLantern position={[-5, 0, -3]} color="#f39c12" />
      <VoxelLantern position={[5, 0, -3]} color="#e67e22" />

      {/* ── Particles (dust motes) ────────────────── */}
      <Particles count={15} area={10} color="#f9e784" speed={0.1} />
    </group>
  );
}
