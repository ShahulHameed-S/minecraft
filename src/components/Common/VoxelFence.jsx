/** Simple voxel fence segment */
export default function VoxelFence({ position = [0, 0, 0], length = 4 }) {
  const posts = Math.ceil(length / 2);
  return (
    <group position={position}>
      {Array.from({ length: posts }).map((_, i) => (
        <group key={i} position={[i * 2, 0, 0]}>
          {/* Post */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[0.2, 1.2, 0.2]} />
            <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
          </mesh>
          {/* Rail top */}
          {i < posts - 1 && (
            <mesh position={[1, 0.8, 0]} castShadow>
              <boxGeometry args={[2, 0.15, 0.1]} />
              <meshStandardMaterial color="#6B4423" roughness={0.9} />
            </mesh>
          )}
          {/* Rail bottom */}
          {i < posts - 1 && (
            <mesh position={[1, 0.4, 0]} castShadow>
              <boxGeometry args={[2, 0.15, 0.1]} />
              <meshStandardMaterial color="#6B4423" roughness={0.9} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
