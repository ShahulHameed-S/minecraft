import VoxelLantern from '../../components/Common/VoxelLantern';
import Particles from '../../components/Environment/Particles';

/** Cherry Blossom Tree matching /reference/about player.png */
function CherryTree({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[0.9, 5, 0.9]} />
        <meshStandardMaterial color="#3c2415" roughness={0.9} />
      </mesh>
      {/* Branch */}
      <mesh position={[0.6, 3.8, 0]} castShadow>
        <boxGeometry args={[1.2, 0.5, 0.5]} />
        <meshStandardMaterial color="#3c2415" roughness={0.9} />
      </mesh>
      {/* Pink Cherry Blossom Foliage (Layered Voxel Leaves) */}
      <mesh position={[0, 5.2, 0]} castShadow>
        <boxGeometry args={[4.2, 2.2, 4.2]} />
        <meshStandardMaterial color="#f7a8b8" roughness={0.85} />
      </mesh>
      <mesh position={[0, 6.4, 0]} castShadow>
        <boxGeometry args={[3.2, 1.4, 3.2]} />
        <meshStandardMaterial color="#ffaec0" roughness={0.85} />
      </mesh>
      <mesh position={[0.8, 4.2, 0.4]} castShadow>
        <boxGeometry args={[1.8, 1.6, 1.8]} />
        <meshStandardMaterial color="#f28da3" roughness={0.85} />
      </mesh>

      {/* Hanging Beehive (as in reference #2) */}
      <group position={[0.8, 3.2, 0.4]}>
        <mesh castShadow>
          <boxGeometry args={[0.65, 0.7, 0.65]} />
          <meshStandardMaterial color="#d4a030" roughness={0.8} />
        </mesh>
        {/* Entrance slit */}
        <mesh position={[0, -0.15, 0.33]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    </group>
  );
}

/** Area 02 — Builder's Workshop & Cherry Grove: matches /reference/about player.png */
export default function Workshop() {
  return (
    <group position={[40, 0, 0]}>
      {/* Grass Ground — with pink petal scatter */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial color="#4f8f3c" roughness={0.95} />
      </mesh>

      {/* Water Pool / Creek */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, 0.02, 3]} receiveShadow>
        <planeGeometry args={[7, 12]} />
        <meshStandardMaterial color="#3498db" roughness={0.2} transparent opacity={0.8} />
      </mesh>

      {/* ── Cherry Trees ───────────────────────────── */}
      <CherryTree position={[-6, 0, -4]} scale={1.1} />
      <CherryTree position={[7, 0, -5]} scale={1.0} />
      <CherryTree position={[-8, 0, 5]} scale={0.9} />
      <CherryTree position={[9, 0, 6]} scale={1.15} />

      {/* ── Workshop Pavilion ───────────────────────── */}
      <group position={[0, 0, -6]}>
        {/* Foundation */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[10, 0.4, 8]} />
          <meshStandardMaterial color="#6a6a7a" roughness={0.9} />
        </mesh>
        {/* Wood Floor */}
        <mesh position={[0, 0.42, 0]} receiveShadow>
          <boxGeometry args={[9.6, 0.1, 7.6]} />
          <meshStandardMaterial color="#6b4423" roughness={0.9} />
        </mesh>
        {/* Corner Log Pillars */}
        {[[-4.5, -3.5], [4.5, -3.5], [-4.5, 3.5], [4.5, 3.5]].map(([x, z], i) => (
          <mesh key={i} position={[x, 2.5, z]} castShadow>
            <boxGeometry args={[0.7, 4.5, 0.7]} />
            <meshStandardMaterial color="#3c2415" roughness={0.9} />
          </mesh>
        ))}
        {/* Roof */}
        <mesh position={[0, 5.0, 0]} castShadow>
          <boxGeometry args={[11.2, 0.6, 9.2]} />
          <meshStandardMaterial color="#8B2500" roughness={0.85} />
        </mesh>
        {/* Workbench */}
        <mesh position={[0, 1.1, -2.5]} castShadow>
          <boxGeometry args={[2.5, 1.2, 1.2]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.85} />
        </mesh>
        {/* Bookshelf */}
        <mesh position={[-3.5, 2.2, -2.8]} castShadow>
          <boxGeometry args={[1.5, 3.2, 0.8]} />
          <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
        </mesh>
        {/* Chest */}
        <mesh position={[3.2, 0.9, -2.5]} castShadow>
          <boxGeometry args={[1.2, 0.8, 1.0]} />
          <meshStandardMaterial color="#8B5E3C" roughness={0.85} />
        </mesh>
        {/* Lanterns */}
        <VoxelLantern position={[-2, 0.42, -1]} color="#ffa726" />
        <VoxelLantern position={[2, 0.42, -1]} color="#ffa726" />
      </group>

      {/* ── Pink Blossom Falling Petals (Particles) ── */}
      <Particles count={35} area={18} color="#fca5b9" speed={0.12} />
    </group>
  );
}
