import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Stylized voxel tree — trunk (boxes) + leaf cluster */
export default function VoxelTree({ position = [0, 0, 0], scale = 1, variant = 0 }) {
  const groupRef = useRef();
  const leafOffset = useRef(Math.random() * Math.PI * 2);

  // Subtle wind sway
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + leafOffset.current) * 0.02;
    }
  });

  const trunkColor = variant === 1 ? '#6B4423' : '#5C3A1E';
  const leafColor = variant === 1 ? '#2d8a2d' : variant === 2 ? '#1e6b1e' : '#3a9e3a';
  const leafColor2 = variant === 1 ? '#1e6b1e' : '#2d8a2d';

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.6, 3, 0.6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} />
      </mesh>
      {/* Main leaf cluster */}
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial color={leafColor} roughness={0.8} />
      </mesh>
      {/* Top leaf */}
      <mesh position={[0, 5.5, 0]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color={leafColor2} roughness={0.8} />
      </mesh>
      {/* Side accent leaves */}
      <mesh position={[1, 3.5, 0.5]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={leafColor} roughness={0.85} />
      </mesh>
      <mesh position={[-0.8, 3.8, -0.6]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={leafColor2} roughness={0.85} />
      </mesh>
    </group>
  );
}
