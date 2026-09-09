/** Background voxel mountains — simple stepped geometry */
export default function VoxelMountain({ position = [0, 0, 0], scale = 1, color = '#4a5568' }) {
  const darkColor = '#3a4558';
  const snowColor = '#dfe6e9';
  
  return (
    <group position={position} scale={scale}>
      {/* Base */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[10, 6, 6]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
      {/* Mid */}
      <mesh position={[0, 7, 0]}>
        <boxGeometry args={[7, 4, 4.5]} />
        <meshStandardMaterial color={darkColor} roughness={0.95} />
      </mesh>
      {/* Upper */}
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial color={darkColor} roughness={0.95} />
      </mesh>
      {/* Peak */}
      <mesh position={[0, 12.5, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={snowColor} roughness={0.8} />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, 13.6, 0]}>
        <boxGeometry args={[2.5, 0.3, 2.5]} />
        <meshStandardMaterial color={snowColor} roughness={0.7} />
      </mesh>
    </group>
  );
}
