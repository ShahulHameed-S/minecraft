import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/** Simple voxel cloud — group of white boxes drifting slowly */
export default function VoxelCloud({ position = [0, 20, 0], speed = 0.1 }) {
  const ref = useRef();
  const startX = useRef(position[0]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = startX.current + Math.sin(state.clock.elapsedTime * speed) * 5;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[4, 1.2, 2.5]} />
        <meshStandardMaterial color="#e8e8f0" roughness={0.9} transparent opacity={0.7} />
      </mesh>
      <mesh position={[2, 0.3, 0]}>
        <boxGeometry args={[2.5, 1, 2]} />
        <meshStandardMaterial color="#dcdce4" roughness={0.9} transparent opacity={0.6} />
      </mesh>
      <mesh position={[-1.5, 0.2, 0.5]}>
        <boxGeometry args={[2, 0.8, 1.5]} />
        <meshStandardMaterial color="#e8e8f0" roughness={0.9} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}
