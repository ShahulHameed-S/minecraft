import { useMemo } from 'react';
import * as THREE from 'three';
import VoxelTree from '../../components/Common/VoxelTree';
import VoxelHouse from '../../components/Common/VoxelHouse';
import VoxelLantern from '../../components/Common/VoxelLantern';
import VoxelFence from '../../components/Common/VoxelFence';
import VoxelFlower from '../../components/Common/VoxelFlower';
import VoxelCloud from '../../components/Environment/VoxelCloud';
import Particles from '../../components/Environment/Particles';

/** Cute voxel sheep grazing in the village */
function VoxelSheep({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation} scale={0.9}>
      {/* Wool Body */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.85, 0.65, 1.15]} />
        <meshStandardMaterial color="#f2f2eb" roughness={0.95} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.9, 0.65]} castShadow>
        <boxGeometry args={[0.48, 0.48, 0.48]} />
        <meshStandardMaterial color="#f2f2eb" roughness={0.95} />
      </mesh>
      {/* Tan Face */}
      <mesh position={[0, 0.84, 0.9]}>
        <boxGeometry args={[0.34, 0.34, 0.05]} />
        <meshStandardMaterial color="#d4b296" roughness={0.8} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.13, 0.9, 0.92]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.13, 0.9, 0.92]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* 4 Legs */}
      <mesh position={[-0.28, 0.22, 0.38]} castShadow>
        <boxGeometry args={[0.18, 0.45, 0.18]} />
        <meshStandardMaterial color="#d4b296" roughness={0.9} />
      </mesh>
      <mesh position={[0.28, 0.22, 0.38]} castShadow>
        <boxGeometry args={[0.18, 0.45, 0.18]} />
        <meshStandardMaterial color="#d4b296" roughness={0.9} />
      </mesh>
      <mesh position={[-0.28, 0.22, -0.38]} castShadow>
        <boxGeometry args={[0.18, 0.45, 0.18]} />
        <meshStandardMaterial color="#d4b296" roughness={0.9} />
      </mesh>
      <mesh position={[0.28, 0.22, -0.38]} castShadow>
        <boxGeometry args={[0.18, 0.45, 0.18]} />
        <meshStandardMaterial color="#d4b296" roughness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * Area 01 — Spawn Village
 * Matches Reference Image #1:
 * - Lush green terraced ridge bathed in golden sunset
 * - Cozy wooden village cabins with warm glowing windows and smoke
 * - Raised timber garden bed with golden wheat crops
 * - Village stone well, wooden fences, lanterns casting warm amber glow
 * - Sheep, wildflowers, curved dirt trail
 */
export default function SpawnVillage() {
  return (
    <group>
      {/* ── Main Grass Ground ──────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[140, 140]} />
        <meshStandardMaterial color="#4a8a38" roughness={0.9} />
      </mesh>

      {/* ── Rolling Terraced Hills (Horizon & Ridges) ─── */}
      {/* Far Background Mountain Ridge (Smooth low green/forested ridge, NO sharp pyramids) */}
      <mesh position={[-25, 4.0, -38]} receiveShadow castShadow>
        <boxGeometry args={[36, 9, 24]} />
        <meshStandardMaterial color="#3a6f2c" roughness={0.95} />
      </mesh>
      <mesh position={[12, 3.5, -42]} receiveShadow castShadow>
        <boxGeometry args={[42, 8, 22]} />
        <meshStandardMaterial color="#346627" roughness={0.95} />
      </mesh>
      <mesh position={[-42, 6.0, -32]} receiveShadow castShadow>
        <boxGeometry args={[28, 13, 22]} />
        <meshStandardMaterial color="#3a6f2c" roughness={0.95} />
      </mesh>

      {/* Mid-ground Left Hill Terrace (under the sunset) */}
      <mesh position={[-16, 1.2, -14]} receiveShadow castShadow>
        <boxGeometry args={[16, 2.4, 18]} />
        <meshStandardMaterial color="#448234" roughness={0.92} />
      </mesh>
      <mesh position={[-20, 2.6, -18]} receiveShadow castShadow>
        <boxGeometry args={[14, 2.0, 14]} />
        <meshStandardMaterial color="#3f7a30" roughness={0.92} />
      </mesh>

      {/* Mid-ground Right Hill Terrace */}
      <mesh position={[16, 1.2, -12]} receiveShadow castShadow>
        <boxGeometry args={[16, 2.4, 16]} />
        <meshStandardMaterial color="#448234" roughness={0.92} />
      </mesh>
      <mesh position={[20, 2.4, -16]} receiveShadow castShadow>
        <boxGeometry args={[12, 2.0, 14]} />
        <meshStandardMaterial color="#3f7a30" roughness={0.92} />
      </mesh>

      {/* Foreground Subtle Grass Step */}
      <mesh position={[-4, 0.25, 6]} receiveShadow castShadow>
        <boxGeometry args={[12, 0.5, 8]} />
        <meshStandardMaterial color="#4c8d3c" roughness={0.9} />
      </mesh>

      {/* ── Winding Dirt / Cobble Path ────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0.08]} position={[-0.8, 0.02, 1.5]} receiveShadow>
        <planeGeometry args={[3.2, 32]} />
        <meshStandardMaterial color="#744f28" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2.3]} position={[-3.5, 0.02, -4.5]} receiveShadow>
        <planeGeometry args={[2.8, 24]} />
        <meshStandardMaterial color="#6a4724" roughness={1} />
      </mesh>

      {/* ── Village Houses (with warm glowing windows) ─ */}
      {/* Main Village Cabin (Left side behind menu) */}
      <group position={[-9.5, 0, -4.5]}>
        <VoxelHouse roofColor="#8B2500" wallColor="#8B5E3C" scale={1.05} />
        {/* Stone Chimney */}
        <mesh position={[1.4, 4.8, -0.6]} castShadow>
          <boxGeometry args={[0.7, 2.0, 0.7]} />
          <meshStandardMaterial color="#555562" roughness={0.95} />
        </mesh>
      </group>

      {/* Elevated Hilltop House (Upper Left) */}
      <VoxelHouse position={[-16, 2.4, -15]} scale={0.9} roofColor="#5A3A2A" wallColor="#7A5030" />

      {/* Right Village House (Behind Player) */}
      <VoxelHouse position={[9.5, 0, -6.5]} scale={0.95} roofColor="#6B3A2A" wallColor="#7A5030" />

      {/* Far Right House */}
      <VoxelHouse position={[15, 1.2, -16]} scale={0.85} roofColor="#4A6B3A" wallColor="#8B7E5C" />

      {/* ── Village Well ───────────────────────────── */}
      <group position={[0.2, 0, -6.0]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[1.3, 1.3, 0.8, 8]} />
          <meshStandardMaterial color="#656575" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.52, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.15, 8]} />
          <meshStandardMaterial color="#2980b9" roughness={0.15} transparent opacity={0.85} />
        </mesh>
        <mesh position={[-0.85, 1.5, 0]} castShadow>
          <boxGeometry args={[0.16, 2.2, 0.16]} />
          <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
        </mesh>
        <mesh position={[0.85, 1.5, 0]} castShadow>
          <boxGeometry args={[0.16, 2.2, 0.16]} />
          <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.65, 0]} castShadow>
          <boxGeometry args={[2.2, 0.22, 1.8]} />
          <meshStandardMaterial color="#8B2500" roughness={0.85} />
        </mesh>
      </group>

      {/* ── Raised Wooden Crop Garden (matches Reference #1) ── */}
      <group position={[-2.8, 0, -1.2]}>
        {/* Log Edges */}
        <mesh position={[0, 0.25, 2.0]} castShadow>
          <boxGeometry args={[5.8, 0.5, 0.35]} />
          <meshStandardMaterial color="#553419" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.25, -2.0]} castShadow>
          <boxGeometry args={[5.8, 0.5, 0.35]} />
          <meshStandardMaterial color="#553419" roughness={0.9} />
        </mesh>
        <mesh position={[-2.8, 0.25, 0]} castShadow>
          <boxGeometry args={[0.35, 0.5, 3.8]} />
          <meshStandardMaterial color="#553419" roughness={0.9} />
        </mesh>
        <mesh position={[2.8, 0.25, 0]} castShadow>
          <boxGeometry args={[0.35, 0.5, 3.8]} />
          <meshStandardMaterial color="#553419" roughness={0.9} />
        </mesh>

        {/* Farmland Dirt */}
        <mesh position={[0, 0.2, 0]} receiveShadow>
          <boxGeometry args={[5.3, 0.36, 3.6]} />
          <meshStandardMaterial color="#422912" roughness={1} />
        </mesh>

        {/* Water Canal */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[5.3, 0.08, 0.45]} />
          <meshStandardMaterial color="#2980b9" roughness={0.2} transparent opacity={0.8} />
        </mesh>

        {/* Golden Wheat Crop Rows */}
        {[-1.3, -0.65, 0.65, 1.3].map((z, row) =>
          [-2.0, -1.35, -0.7, 0.0, 0.7, 1.35, 2.0].map((x, col) => (
            <mesh key={`crop-${row}-${col}`} position={[x, 0.55, z]} castShadow>
              <boxGeometry args={[0.42, 0.55, 0.42]} />
              <meshStandardMaterial
                color={(row + col) % 3 === 0 ? '#98b835' : '#e2b33c'}
                roughness={0.9}
              />
            </mesh>
          ))
        )}
      </group>

      {/* ── Grazing Sheep (Matching Reference #1) ──── */}
      <VoxelSheep position={[-6.8, 0, 3.8]} rotation={[0, 0.7, 0]} />
      <VoxelSheep position={[-11.5, 1.2, -6.5]} rotation={[0, 1.6, 0]} />
      <VoxelSheep position={[12.5, 0, 4.5]} rotation={[0, -0.9, 0]} />

      {/* ── Oak Trees (Lush ridge foliage under sunset) ─ */}
      {/* Sunset ridge canopy */}
      <VoxelTree position={[-16, 2.4, -20]} variant={1} scale={1.25} />
      <VoxelTree position={[-22, 2.6, -16]} variant={0} scale={1.3} />
      <VoxelTree position={[-12, 1.2, -18]} variant={2} scale={1.1} />
      <VoxelTree position={[-25, 4.0, -28]} variant={0} scale={1.4} />
      <VoxelTree position={[-30, 4.0, -22]} variant={1} scale={1.3} />

      {/* Midground Trees */}
      <VoxelTree position={[-14, 0, 3]} variant={0} scale={1.1} />
      <VoxelTree position={[-18, 0, -3]} variant={2} scale={1.2} />
      <VoxelTree position={[14, 0, 2]} variant={1} scale={1.05} />
      <VoxelTree position={[18, 1.2, -8]} variant={0} scale={1.15} />
      <VoxelTree position={[22, 2.4, -18]} variant={2} scale={1.25} />

      {/* Right Background Ridge Trees */}
      <VoxelTree position={[12, 2.4, -22]} variant={1} scale={1.2} />
      <VoxelTree position={[26, 3.5, -30]} variant={0} scale={1.4} />

      {/* ── Warm Glowing Lanterns ──────────────────── */}
      <VoxelLantern position={[-4.5, 0, -1.8]} color="#ffa726" />
      <VoxelLantern position={[4.2, 0, -2.5]} color="#ffa726" />
      <VoxelLantern position={[-6.5, 0, -8.5]} color="#ff9800" />
      <VoxelLantern position={[5.8, 0, -9.0]} color="#ff9800" />
      <VoxelLantern position={[-1.2, 0, 3.5]} color="#ffb74d" />
      <VoxelLantern position={[7.5, 0, 3.2]} color="#ffb74d" />

      {/* ── Fences ─────────────────────────────────── */}
      <VoxelFence position={[-13.5, 0, 5.5]} length={7} />
      <VoxelFence position={[7.5, 0, 5.5]} length={7} />

      {/* ── Wildflowers (Poppies & Dandelions) ─────── */}
      <VoxelFlower position={[-3.8, 0, 3.8]} color="#e74c3c" />
      <VoxelFlower position={[-2.8, 0, 4.6]} color="#f1c40f" />
      <VoxelFlower position={[-1.6, 0, 5.2]} color="#e74c3c" />
      <VoxelFlower position={[3.8, 0, 3.6]} color="#f1c40f" />
      <VoxelFlower position={[4.8, 0, 4.5]} color="#e74c3c" />
      <VoxelFlower position={[5.8, 0, 3.8]} color="#f1c40f" />
      <VoxelFlower position={[-6.0, 0.25, 6.2]} color="#e74c3c" />
      <VoxelFlower position={[7.0, 0, 2.4]} color="#f1c40f" />
      <VoxelFlower position={[-8.5, 0, 5.0]} color="#e74c3c" />
      <VoxelFlower position={[9.5, 0, 5.8]} color="#f1c40f" />

      {/* ── Blocky Clouds Drifting ─────────────────── */}
      <VoxelCloud position={[-18, 20, -22]} speed={0.05} />
      <VoxelCloud position={[18, 22, -28]} speed={0.04} />
      <VoxelCloud position={[-32, 18, -12]} speed={0.06} />
      <VoxelCloud position={[32, 21, -22]} speed={0.04} />

      {/* ── Golden Sunset Sparkles / Pollen ────────── */}
      <Particles count={50} area={28} color="#ffe082" speed={0.16} />
    </group>
  );
}
