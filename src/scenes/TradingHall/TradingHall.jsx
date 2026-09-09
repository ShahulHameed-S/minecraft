import VoxelLantern from '../../components/Common/VoxelLantern';
import Particles from '../../components/Environment/Particles';

/** A trading booth/stall */
function TradingBooth({ position, color = '#8B5E3C' }) {
  return (
    <group position={position}>
      {/* Counter */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[2.5, 1.5, 1]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      {/* Counter top */}
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[2.7, 0.1, 1.2]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
      {/* Display items */}
      <mesh position={[-0.5, 1.7, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#4ecdc4" roughness={0.6} emissive="#4ecdc4" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0.5, 1.7, 0]} castShadow>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshStandardMaterial color="#f39c12" roughness={0.5} emissive="#f39c12" emissiveIntensity={0.1} />
      </mesh>
      {/* Awning posts */}
      <mesh position={[-1.2, 2, 0.5]} castShadow>
        <boxGeometry args={[0.15, 2.5, 0.15]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
      <mesh position={[1.2, 2, 0.5]} castShadow>
        <boxGeometry args={[0.15, 2.5, 0.15]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
      {/* Awning */}
      <mesh position={[0, 3.3, 0.3]} castShadow>
        <boxGeometry args={[3, 0.1, 1.8]} />
        <meshStandardMaterial color="#8B2500" roughness={0.85} />
      </mesh>
    </group>
  );
}

/** Area 04 — Trading Hall: projects area */
export default function TradingHall() {
  return (
    <group position={[120, 0, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 20]} />
        <meshStandardMaterial color="#6b4423" roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 4, -10]} castShadow>
        <boxGeometry args={[24, 8, 0.5]} />
        <meshStandardMaterial color="#7a7a8a" roughness={0.95} />
      </mesh>
      {/* Side walls */}
      <mesh position={[-12, 4, 0]} castShadow>
        <boxGeometry args={[0.5, 8, 20]} />
        <meshStandardMaterial color="#7a7a8a" roughness={0.95} />
      </mesh>
      <mesh position={[12, 4, 0]} castShadow>
        <boxGeometry args={[0.5, 8, 20]} />
        <meshStandardMaterial color="#7a7a8a" roughness={0.95} />
      </mesh>

      {/* Ceiling beams */}
      {[-6, 0, 6].map((x) => (
        <mesh key={`beam-${x}`} position={[x, 7, 0]} castShadow>
          <boxGeometry args={[0.4, 0.4, 20]} />
          <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
        </mesh>
      ))}

      {/* Roof */}
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[24, 0.3, 20]} />
        <meshStandardMaterial color="#6B4423" roughness={0.95} />
      </mesh>

      {/* ── Trading Booths ────────────────────────── */}
      <TradingBooth position={[-6, 0, -6]} color="#8B5E3C" />
      <TradingBooth position={[0, 0, -6]} color="#7A5030" />
      <TradingBooth position={[6, 0, -6]} color="#9B7E5C" />

      {/* ── Banner decorations ────────────────────── */}
      {[-8, -4, 0, 4, 8].map((x, i) => (
        <group key={`banner-${i}`} position={[x, 5, -9.7]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.8, 2, 0.05]} />
            <meshStandardMaterial 
              color={['#8B2500', '#2d5a27', '#1a1a6e', '#6b4423', '#4a1a6e'][i]} 
              roughness={0.85} 
            />
          </mesh>
          {/* Rod */}
          <mesh position={[0, 1.05, 0]}>
            <boxGeometry args={[1, 0.1, 0.1]} />
            <meshStandardMaterial color="#c0a030" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ── Lanterns ──────────────────────────────── */}
      <VoxelLantern position={[-9, 0, -3]} color="#f39c12" />
      <VoxelLantern position={[9, 0, -3]} color="#f39c12" />
      <VoxelLantern position={[-9, 0, 5]} color="#e67e22" />
      <VoxelLantern position={[9, 0, 5]} color="#e67e22" />

      {/* Ambient light */}
      <pointLight position={[0, 6, 0]} color="#f39c12" intensity={1.5} distance={20} decay={2} />

      <Particles count={20} area={15} color="#f9e784" speed={0.1} />
    </group>
  );
}
