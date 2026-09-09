import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Floating particle system for atmosphere */
export default function Particles({ count = 50, area = 30, color = '#4ecdc4', speed = 0.3 }) {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * area,
        y: Math.random() * 15 + 1,
        z: (Math.random() - 0.5) * area,
        speed: Math.random() * speed + 0.1,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count, area, speed]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 2,
        p.y + Math.sin(t * p.speed * 0.5 + p.offset) * 1.5,
        p.z + Math.cos(t * p.speed + p.offset) * 2,
      );
      dummy.scale.setScalar(0.03 + Math.sin(t * 2 + p.offset) * 0.015);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
}
