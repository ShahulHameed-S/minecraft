import VoxelLantern from '../../components/Common/VoxelLantern';
import Particles from '../../components/Environment/Particles';

/** Area 05 — Advancements Hall: experience/education/achievements */
export default function AdvancementsScene() {
  return (
    <group position={[160, 0, 0]}>
      {/* Floor — polished stone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2a2a3e" roughness={0.9} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 4, -10]} castShadow>
        <boxGeometry args={[20, 8, 0.5]} />
        <meshStandardMaterial color="#3d3d56" roughness={0.95} />
      </mesh>
      <mesh position={[-10, 4, 0]} castShadow>
        <boxGeometry args={[0.5, 8, 20]} />
        <meshStandardMaterial color="#3d3d56" roughness={0.95} />
      </mesh>
      <mesh position={[10, 4, 0]} castShadow>
        <boxGeometry args={[0.5, 8, 20]} />
        <meshStandardMaterial color="#3d3d56" roughness={0.95} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[20, 0.3, 20]} />
        <meshStandardMaterial color="#2a2a3e" roughness={0.95} />
      </mesh>

      {/* ── Trophy pedestals ──────────────────────── */}
      {[[-5, -6], [0, -6], [5, -6], [-5, -2], [0, -2], [5, -2]].map(([x, z], i) => (
        <group key={`trophy-${i}`} position={[x, 0, z]}>
          {/* Pedestal */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[1.2, 1, 1.2]} />
            <meshStandardMaterial color="#4a4a6a" roughness={0.85} />
          </mesh>
          {/* Trophy item */}
          <mesh position={[0, 1.3, 0]} castShadow>
            <octahedronGeometry args={[0.25]} />
            <meshStandardMaterial 
              color={['#4ecdc4', '#f39c12', '#9b59b6', '#e74c3c', '#3498db', '#2ecc71'][i]} 
              emissive={['#4ecdc4', '#f39c12', '#9b59b6', '#e74c3c', '#3498db', '#2ecc71'][i]}
              emissiveIntensity={0.3}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
          {/* Glow */}
          <pointLight 
            position={[0, 1.5, 0]} 
            color={['#4ecdc4', '#f39c12', '#9b59b6', '#e74c3c', '#3498db', '#2ecc71'][i]} 
            intensity={0.5} 
            distance={4} 
            decay={2} 
          />
        </group>
      ))}

      {/* ── Wall frames (achievement displays) ────── */}
      {[-6, -3, 0, 3, 6].map((x, i) => (
        <mesh key={`frame-${i}`} position={[x, 4, -9.7]} castShadow>
          <boxGeometry args={[1.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#5a5a7a" roughness={0.85} />
        </mesh>
      ))}

      {/* ── Lanterns ──────────────────────────────── */}
      <VoxelLantern position={[-7, 0, -4]} color="#4ecdc4" />
      <VoxelLantern position={[7, 0, -4]} color="#4ecdc4" />
      <VoxelLantern position={[-7, 0, 3]} color="#f39c12" />
      <VoxelLantern position={[7, 0, 3]} color="#f39c12" />

      {/* Ambient */}
      <pointLight position={[0, 6, -3]} color="#4ecdc4" intensity={1} distance={15} decay={2} />

      <Particles count={20} area={12} color="#4ecdc4" speed={0.1} />
    </group>
  );
}
