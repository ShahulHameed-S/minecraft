import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/** Glowing voxel lantern — post + emissive light box */
export default function VoxelLantern({ position = [0, 0, 0], color = '#f39c12' }) {
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 3 + position[0]) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Post */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[0.2, 2, 0.2]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
      {/* Lantern housing */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Glow */}
      <mesh ref={glowRef} position={[0, 2.2, 0]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} roughness={0.3} />
      </mesh>
      {/* Point light */}
      <pointLight position={[0, 2.4, 0]} color={color} intensity={2} distance={8} decay={2} />
    </group>
  );
}
