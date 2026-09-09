import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Particles from '../../components/Environment/Particles';

/** Glowing Sea Lantern cube */
function SeaLantern({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Chain */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 6]} />
        <meshStandardMaterial color="#333333" metalness={0.7} />
      </mesh>
      {/* Lantern Cube */}
      <mesh castShadow>
        <boxGeometry args={[1.0, 1.0, 1.0]} />
        <meshStandardMaterial
          color="#d5f5f5"
          emissive="#7bedea"
          emissiveIntensity={1.2}
          roughness={0.3}
        />
      </mesh>
      <pointLight color="#7bedea" intensity={1.8} distance={10} decay={2} />
    </group>
  );
}

/** Open Floating Enchanting Book */
function EnchantingTableBook() {
  const bookRef = useRef();

  useFrame((state) => {
    if (bookRef.current) {
      bookRef.current.position.y = 1.35 + Math.sin(state.clock.elapsedTime * 2.0) * 0.08;
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <group ref={bookRef} position={[0, 1.35, 0]}>
      {/* Left open page */}
      <mesh position={[-0.24, 0, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.42, 0.04, 0.55]} />
        <meshStandardMaterial color="#f0e6d2" roughness={0.8} />
      </mesh>
      {/* Right open page */}
      <mesh position={[0.24, 0, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.42, 0.04, 0.55]} />
        <meshStandardMaterial color="#f0e6d2" roughness={0.8} />
      </mesh>
      {/* Spine & Cover */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.12, 0.06, 0.56]} />
        <meshStandardMaterial color="#8e44ad" roughness={0.7} />
      </mesh>
    </group>
  );
}

/** Area 03 — Enchantment Room: matches /reference/enchantment.png */
export default function EnchantmentRoom() {
  return (
    <group position={[80, 0, 0]}>
      {/* Floor — Stone Brick Pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#3a3a46" roughness={0.9} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 5, -9]} castShadow>
        <boxGeometry args={[22, 10, 0.8]} />
        <meshStandardMaterial color="#40404a" roughness={0.9} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-9, 5, 0]} castShadow>
        <boxGeometry args={[0.8, 10, 22]} />
        <meshStandardMaterial color="#40404a" roughness={0.9} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[9, 5, 0]} castShadow>
        <boxGeometry args={[0.8, 10, 22]} />
        <meshStandardMaterial color="#40404a" roughness={0.9} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 9, 0]}>
        <boxGeometry args={[22, 0.4, 22]} />
        <meshStandardMaterial color="#2d2d38" roughness={0.95} />
      </mesh>

      {/* ── Central Obsidian Enchanting Table (Reference #4) ── */}
      <group position={[0, 0, -1]}>
        {/* Obsidian Base Block */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 1.0, 2.0]} />
          <meshStandardMaterial color="#1a1528" roughness={0.8} />
        </mesh>

        {/* 4 Diamond Corners on base */}
        {[[-0.85, -0.85], [0.85, -0.85], [-0.85, 0.85], [0.85, 0.85]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.7, z]} castShadow>
            <boxGeometry args={[0.42, 0.42, 0.42]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#0088aa"
              emissiveIntensity={0.6}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Red Cloth Top */}
        <mesh position={[0, 1.02, 0]} castShadow>
          <boxGeometry args={[1.7, 0.06, 1.7]} />
          <meshStandardMaterial color="#c0392b" roughness={0.85} />
        </mesh>

        {/* Floating Animated Open Book */}
        <EnchantingTableBook />

        {/* Purple Magic Light Beam shooting upward */}
        <mesh position={[0, 4.5, 0]}>
          <cylinderGeometry args={[0.5, 0.8, 7, 16]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <pointLight position={[0, 2.0, 0]} color="#a855f7" intensity={3.5} distance={12} decay={2} />
      </group>

      {/* ── Wall Bookshelves (Bookshelf Library) ─────── */}
      {[-6, -4, -2, 2, 4, 6].map((x) => (
        <group key={`shelf-${x}`} position={[x, 0, -8.3]}>
          <mesh position={[0, 1.8, 0]} castShadow>
            <boxGeometry args={[1.9, 3.6, 0.7]} />
            <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
          </mesh>
          {/* Books in shelves */}
          {[0.6, 1.4, 2.2, 3.0].map((y, j) => (
            <mesh key={j} position={[0, y, 0.1]}>
              <boxGeometry args={[1.7, 0.5, 0.5]} />
              <meshStandardMaterial
                color={['#8e44ad', '#2980b9', '#27ae60', '#c0392b'][j % 4]}
                roughness={0.8}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── Hanging Sea Lanterns ────────────────────── */}
      <SeaLantern position={[-4, 7, -4]} />
      <SeaLantern position={[4, 7, -4]} />
      <SeaLantern position={[-4, 7, 3]} />
      <SeaLantern position={[4, 7, 3]} />

      {/* ── Floating Rune Particles ─────────────────── */}
      <Particles count={40} area={12} color="#c084fc" speed={0.15} />
      <Particles count={25} area={8} color="#00e5ff" speed={0.1} />
    </group>
  );
}
