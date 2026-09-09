import VoxelLantern from '../../components/Common/VoxelLantern';
import Particles from '../../components/Environment/Particles';

/** Sculk Block with glowing cyan tendrils */
function SculkBlock({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={scale} />
        <meshStandardMaterial color="#05181b" roughness={0.9} />
      </mesh>
      {/* Cyan glowing veins */}
      <mesh position={[0, scale[1] / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[scale[0] * 0.8, scale[2] * 0.8]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00b4cc"
          emissiveIntensity={0.8}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

/** Area 05 — Advancements & Deep Dark Ruins: matches /reference/achievements.png */
export default function AdvancementsScene() {
  return (
    <group position={[160, 0, 0]}>
      {/* Deep Dark Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 26]} />
        <meshStandardMaterial color="#0a1215" roughness={0.95} />
      </mesh>

      {/* Deepslate Stone Walls & Ancient City Archway */}
      <mesh position={[0, 6, -11]} castShadow>
        <boxGeometry args={[30, 12, 1.2]} />
        <meshStandardMaterial color="#1a2024" roughness={0.9} />
      </mesh>
      <mesh position={[-15, 6, 0]} castShadow>
        <boxGeometry args={[1.2, 12, 26]} />
        <meshStandardMaterial color="#161b1e" roughness={0.9} />
      </mesh>
      <mesh position={[15, 6, 0]} castShadow>
        <boxGeometry args={[1.2, 12, 26]} />
        <meshStandardMaterial color="#161b1e" roughness={0.9} />
      </mesh>

      {/* ── Ancient Ruins Pillars ───────────────────── */}
      {[[-6, -6], [6, -6], [-8, 2], [8, 2], [-4, 6], [4, 6]].map(([x, z], i) => (
        <group key={`ruin-${i}`} position={[x, 0, z]}>
          <mesh position={[0, 3.5, 0]} castShadow>
            <boxGeometry args={[1.4, 7, 1.4]} />
            <meshStandardMaterial color="#1f262b" roughness={0.95} />
          </mesh>
          <mesh position={[0, 7.2, 0]} castShadow>
            <boxGeometry args={[1.8, 0.6, 1.8]} />
            <meshStandardMaterial color="#273037" roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* ── Terraced Sculk Catalyst Beds ───────────── */}
      <SculkBlock position={[-5, 0.4, -4]} scale={[6, 0.8, 4]} />
      <SculkBlock position={[5, 0.4, -4]} scale={[6, 0.8, 4]} />
      <SculkBlock position={[-3, 1.0, -7]} scale={[5, 0.6, 3]} />
      <SculkBlock position={[3, 1.0, -7]} scale={[5, 0.6, 3]} />

      {/* ── Stone Steps leading up ─────────────────── */}
      {[0, 1, 2, 3].map((step) => (
        <mesh key={`step-${step}`} position={[0, step * 0.35 + 0.18, -2 - step * 0.8]} receiveShadow>
          <boxGeometry args={[4, 0.35, 0.8]} />
          <meshStandardMaterial color="#2c353c" roughness={0.9} />
        </mesh>
      ))}

      {/* ── Soul Lanterns (Cyan glowing lights) ────── */}
      <VoxelLantern position={[-3, 0.8, -3]} color="#00e5ff" />
      <VoxelLantern position={[3, 0.8, -3]} color="#00e5ff" />
      <VoxelLantern position={[-6, 0, 4]} color="#00e5ff" />
      <VoxelLantern position={[6, 0, 4]} color="#00e5ff" />

      {/* ── Atmospheric Cyan Soul Lights ───────────── */}
      <pointLight position={[0, 5, -5]} color="#00e5ff" intensity={2.2} distance={18} decay={2} />
      <pointLight position={[-6, 2, 0]} color="#00ffff" intensity={1.5} distance={10} decay={2} />
      <pointLight position={[6, 2, 0]} color="#00ffff" intensity={1.5} distance={10} decay={2} />

      {/* ── Cyan Sculk Soul Particles ──────────────── */}
      <Particles count={45} area={20} color="#00e5ff" speed={0.12} />
    </group>
  );
}
