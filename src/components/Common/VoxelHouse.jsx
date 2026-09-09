import { useMemo } from 'react';

/** Simple voxel house from boxes — wood walls, stone base, colored roof */
export default function VoxelHouse({ position = [0, 0, 0], scale = 1, roofColor = '#8B2500', wallColor = '#8B5E3C' }) {
  return (
    <group position={position} scale={scale}>
      {/* Stone foundation */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.5, 3.2]} />
        <meshStandardMaterial color="#7a7a8a" roughness={0.95} />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>
      {/* Roof base */}
      <mesh position={[0, 3.6, 0]} castShadow>
        <boxGeometry args={[4.6, 0.4, 3.6]} />
        <meshStandardMaterial color={roofColor} roughness={0.8} />
      </mesh>
      {/* Roof mid */}
      <mesh position={[0, 4.1, 0]} castShadow>
        <boxGeometry args={[3.6, 0.5, 2.8]} />
        <meshStandardMaterial color={roofColor} roughness={0.8} />
      </mesh>
      {/* Roof top */}
      <mesh position={[0, 4.6, 0]} castShadow>
        <boxGeometry args={[2.4, 0.4, 2]} />
        <meshStandardMaterial color={roofColor} roughness={0.8} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 1.2, 1.51]} castShadow>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="#3a2510" roughness={0.9} />
      </mesh>
      {/* Door handle */}
      <mesh position={[0.3, 1.2, 1.6]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#c0a030" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Window left — warm golden glow */}
      <mesh position={[-1.2, 2, 1.51]}>
        <boxGeometry args={[0.7, 0.7, 0.1]} />
        <meshStandardMaterial
          color="#ffe066"
          emissive="#ff9922"
          emissiveIntensity={0.6}
          roughness={0.4}
        />
      </mesh>
      {/* Window right — warm golden glow */}
      <mesh position={[1.2, 2, 1.51]}>
        <boxGeometry args={[0.7, 0.7, 0.1]} />
        <meshStandardMaterial
          color="#ffe066"
          emissive="#ff9922"
          emissiveIntensity={0.6}
          roughness={0.4}
        />
      </mesh>
      {/* Window frames */}
      <mesh position={[-1.2, 2, 1.55]}>
        <boxGeometry args={[0.8, 0.05, 0.05]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
      <mesh position={[-1.2, 2, 1.55]}>
        <boxGeometry args={[0.05, 0.8, 0.05]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
      <mesh position={[1.2, 2, 1.55]}>
        <boxGeometry args={[0.8, 0.05, 0.05]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
      <mesh position={[1.2, 2, 1.55]}>
        <boxGeometry args={[0.05, 0.8, 0.05]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
    </group>
  );
}
