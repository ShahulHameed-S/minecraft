import VoxelLantern from '../../components/Common/VoxelLantern';
import Particles from '../../components/Environment/Particles';

/** 3D Voxel Villager NPC matching /reference/trading-hall.png */
function VoxelVillager({ position = [0, 0, 0] }) {
  return (
    <group position={position} scale={1.1}>
      {/* Head */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <boxGeometry args={[0.7, 0.85, 0.7]} />
        <meshStandardMaterial color="#c6966d" roughness={0.8} />
      </mesh>
      {/* Big Villager Nose */}
      <mesh position={[0, 1.95, 0.42]} castShadow>
        <boxGeometry args={[0.18, 0.42, 0.18]} />
        <meshStandardMaterial color="#b38259" roughness={0.8} />
      </mesh>
      {/* Unibrow & Eyes */}
      <mesh position={[0, 2.3, 0.36]}>
        <boxGeometry args={[0.45, 0.08, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.14, 2.18, 0.36]}>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshStandardMaterial color="#2d7d32" />
      </mesh>
      <mesh position={[0.14, 2.18, 0.36]}>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshStandardMaterial color="#2d7d32" />
      </mesh>

      {/* Robe / Torso (Green Cleric Robe as in reference) */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.85} />
      </mesh>
      {/* Robe Lower skirt */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.85, 0.8, 0.65]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.85} />
      </mesh>

      {/* Folded Arms (Classic Minecraft Villager crossed arms) */}
      <mesh position={[0, 1.15, 0.32]} castShadow>
        <boxGeometry args={[0.82, 0.38, 0.25]} />
        <meshStandardMaterial color="#27682a" roughness={0.85} />
      </mesh>
    </group>
  );
}

/** Area 04 — Trading Hall & Mineshaft: matches /reference/trading-hall.png and /reference/Screenshot_...png */
export default function TradingHall() {
  return (
    <group position={[120, 0, 0]}>
      {/* Wood & Stone Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 22]} />
        <meshStandardMaterial color="#553820" roughness={0.95} />
      </mesh>

      {/* Cobblestone & Oak Walls */}
      <mesh position={[0, 4.5, -9.5]} castShadow>
        <boxGeometry args={[26, 9, 0.8]} />
        <meshStandardMaterial color="#6a6a72" roughness={0.95} />
      </mesh>
      <mesh position={[-13, 4.5, 0]} castShadow>
        <boxGeometry args={[0.8, 9, 22]} />
        <meshStandardMaterial color="#5a402a" roughness={0.95} />
      </mesh>
      <mesh position={[13, 4.5, 0]} castShadow>
        <boxGeometry args={[0.8, 9, 22]} />
        <meshStandardMaterial color="#5a402a" roughness={0.95} />
      </mesh>

      {/* ── Trading Counter & Villager (Reference #5) ── */}
      <group position={[2.5, 0, -3.5]}>
        {/* Wooden Trading Counter */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.0, 1.5, 1.4]} />
          <meshStandardMaterial color="#7a5030" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.55, 0]} castShadow>
          <boxGeometry args={[7.4, 0.12, 1.6]} />
          <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
        </mesh>

        {/* Lectern on Counter */}
        <mesh position={[-1.8, 1.9, 0]} castShadow>
          <boxGeometry args={[1.2, 0.6, 0.9]} />
          <meshStandardMaterial color="#9B7E5C" roughness={0.8} />
        </mesh>

        {/* 3D Villager NPC standing behind counter */}
        <VoxelVillager position={[0.5, 0, -1.8]} />
      </group>

      {/* ── Item Frames with Emerald and Diamond on wall ── */}
      {/* Emerald Frame */}
      <group position={[0, 4.2, -9.0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 1.2, 0.08]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={0.6} />
        </mesh>
      </group>
      {/* Diamond Frame */}
      <group position={[3.2, 4.2, -9.0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 1.2, 0.08]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.6} />
        </mesh>
      </group>
      {/* Book Frame */}
      <group position={[6.4, 4.2, -9.0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 1.2, 0.08]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[0.4, 0.5, 0.1]} />
          <meshStandardMaterial color="#9b59b6" emissive="#9b59b6" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* ── Mineshaft Section (Left side of Hall) ──── */}
      <group position={[-7.5, 0, 0]}>
        {/* Minecart Rails on ground */}
        {[-3, -1.5, 0, 1.5, 3].map((z, i) => (
          <mesh key={i} position={[0, 0.04, z]} receiveShadow>
            <boxGeometry args={[1.8, 0.04, 0.25]} />
            <meshStandardMaterial color="#8B5E3C" roughness={0.9} />
          </mesh>
        ))}
        {/* Rail irons */}
        <mesh position={[-0.7, 0.06, 0]} receiveShadow>
          <boxGeometry args={[0.08, 0.05, 7.5]} />
          <meshStandardMaterial color="#7f8c8d" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.7, 0.06, 0]} receiveShadow>
          <boxGeometry args={[0.08, 0.05, 7.5]} />
          <meshStandardMaterial color="#7f8c8d" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Open Chests */}
        <mesh position={[-2.8, 0.5, -4]} castShadow>
          <boxGeometry args={[1.4, 1.0, 1.1]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.85} />
        </mesh>
        <mesh position={[-2.8, 0.5, -2]} castShadow>
          <boxGeometry args={[1.4, 1.0, 1.1]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.85} />
        </mesh>

        {/* Glowing Campfire / Ore Pit */}
        <mesh position={[-2.2, 0.35, 1.5]} castShadow>
          <boxGeometry args={[1.2, 0.7, 1.2]} />
          <meshStandardMaterial color="#e67e22" emissive="#f39c12" emissiveIntensity={1.5} />
        </mesh>
        <pointLight position={[-2.2, 1.2, 1.5]} color="#ff9800" intensity={2.5} distance={10} decay={2} />
      </group>

      {/* Hanging Lanterns */}
      <VoxelLantern position={[4, 0, 3]} color="#ffa726" />
      <VoxelLantern position={[-4, 0, 3]} color="#ffa726" />
      <VoxelLantern position={[8, 0, -4]} color="#ffa726" />

      {/* Particles */}
      <Particles count={30} area={16} color="#ffdf88" speed={0.12} />
    </group>
  );
}
