import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * VoxelSky — Warm Golden-Hour Sunset Sky & Radiant Sun
 * Matches Reference Image #1:
 * - Rich sunset sky: deep evening blue blending into golden amber & fiery sunset orange
 * - Radiant glowing sun disc on the left horizon with atmospheric corona
 */
export default function VoxelSky() {
  // Sky dome with golden sunset gradient
  const skyMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    // Zenith — dusk blue
    grad.addColorStop(0.0, '#15325b');
    grad.addColorStop(0.2, '#234b7d');
    grad.addColorStop(0.4, '#3f6c99');
    grad.addColorStop(0.55, '#7893a8');
    // Golden-hour transition
    grad.addColorStop(0.68, '#c77f46');
    grad.addColorStop(0.78, '#e88a38');
    grad.addColorStop(0.86, '#fa9d32');
    // Horizon glow
    grad.addColorStop(0.92, '#fca738');
    // Ground haze
    grad.addColorStop(1.0, '#b86628');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
      fog: false,
      depthWrite: false,
    });
  }, []);

  // Soft radiant sun corona texture
  const sunGlowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0.0, 'rgba(255, 255, 240, 1.0)');
    grad.addColorStop(0.18, 'rgba(255, 220, 120, 0.9)');
    grad.addColorStop(0.45, 'rgba(255, 150, 40, 0.45)');
    grad.addColorStop(0.75, 'rgba(240, 100, 20, 0.15)');
    grad.addColorStop(1.0, 'rgba(200, 70, 10, 0.0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <group>
      {/* Inverted Sky Sphere */}
      <mesh material={skyMaterial}>
        <sphereGeometry args={[95, 32, 16]} />
      </mesh>

      {/* Radiant Sunset Sun on Horizon (Positioned behind village hills on the left) */}
      <group position={[-26, 12, -42]}>
        {/* Glowing Sun Core Sprite */}
        <sprite scale={[16, 16, 1]}>
          <spriteMaterial
            map={sunGlowTexture}
            transparent
            blending={THREE.AdditiveBlending}
            fog={false}
            depthWrite={false}
          />
        </sprite>

        {/* Large Atmospheric Sun Bloom */}
        <sprite scale={[38, 38, 1]}>
          <spriteMaterial
            map={sunGlowTexture}
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
            fog={false}
            depthWrite={false}
          />
        </sprite>
      </group>
    </group>
  );
}
