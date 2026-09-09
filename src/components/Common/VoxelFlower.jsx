import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/** Small decorative voxel flower */
export default function VoxelFlower({ position = [0, 0, 0], color = '#e74c3c' }) {
  const ref = useRef();
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 2 + offset.current) * 0.05;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Stem */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.06, 0.5, 0.06]} />
        <meshStandardMaterial color="#2d8a2d" roughness={0.8} />
      </mesh>
      {/* Petals */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Center */}
      <mesh position={[0, 0.55, 0.13]}>
        <boxGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial color="#f1c40f" roughness={0.5} />
      </mesh>
    </group>
  );
}
