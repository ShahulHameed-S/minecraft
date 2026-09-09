import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { AREAS } from '../../utils/constants';

/**
 * Voxel Diamond Pickaxe held in hand
 * Matches Reference Image #1
 */
function VoxelPickaxe() {
  return (
    <group position={[0.15, -0.35, 0.35]} rotation={[0.65, -0.2, -0.15]} scale={1.15}>
      {/* Wood Handle */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.07, 0.95, 0.07]} />
        <meshStandardMaterial color="#82522c" roughness={0.9} />
      </mesh>
      {/* Pickaxe Head Base */}
      <mesh position={[0, 0.44, 0]}>
        <boxGeometry args={[0.16, 0.12, 0.14]} />
        <meshStandardMaterial color="#424254" roughness={0.6} />
      </mesh>
      {/* Diamond Wings */}
      <mesh position={[-0.22, 0.43, 0]}>
        <boxGeometry args={[0.32, 0.12, 0.1]} />
        <meshStandardMaterial color="#00e5ff" emissive="#0099bb" emissiveIntensity={0.35} roughness={0.3} />
      </mesh>
      <mesh position={[0.22, 0.43, 0]}>
        <boxGeometry args={[0.32, 0.12, 0.1]} />
        <meshStandardMaterial color="#00e5ff" emissive="#0099bb" emissiveIntensity={0.35} roughness={0.3} />
      </mesh>
      {/* Curved Pickaxe Tips */}
      <mesh position={[-0.4, 0.34, 0]}>
        <boxGeometry args={[0.12, 0.18, 0.08]} />
        <meshStandardMaterial color="#33ffff" emissive="#00cccc" emissiveIntensity={0.4} roughness={0.2} />
      </mesh>
      <mesh position={[0.4, 0.34, 0]}>
        <boxGeometry args={[0.12, 0.18, 0.08]} />
        <meshStandardMaterial color="#33ffff" emissive="#00cccc" emissiveIntensity={0.4} roughness={0.2} />
      </mesh>
    </group>
  );
}

/**
 * Player + Camera controller
 * Matches Reference Image #1:
 * - Prominently framed on the right third of the screen
 * - Clean Minecraft player skin with hair, beard, eyes, cyan chest stripe
 * - Diamond pickaxe held in hand
 * - Floating green 'Shahul' nametag
 * - Subtle idle breathing animation
 */
export default function Player() {
  const groupRef = useRef();
  const bodyRef = useRef();
  const rightArmRef = useRef();
  const leftArmRef = useRef();
  const { camera } = useThree();
  const { currentArea, phase } = useGame();

  // Movement state
  const keys = useRef({ w: false, a: false, s: false, d: false });
  // Menu player position: right foreground
  const targetPosition = useRef(new THREE.Vector3(2.6, 0, 3.8));
  const walkCycle = useRef(0);
  const idleTime = useRef(0);

  // Menu camera framing: close, looking across at village and player
  const menuCameraPos = useRef(new THREE.Vector3(0.5, 2.5, 7.6));
  const menuCameraTarget = useRef(new THREE.Vector3(0.2, 1.8, 0.5));

  // Camera orbit & look controls
  const cameraYaw = useRef(0);
  const cameraPitch = useRef(0.38);
  const cameraDistance = useRef(8.0);
  const isDragging = useRef(false);
  const previousMousePos = useRef({ x: 0, y: 0 });

  // Area teleportation
  useEffect(() => {
    if (phase === 'menu') {
      targetPosition.current.set(2.6, 0, 3.8);
      return;
    }
    // Teleport to target area coordinates in playing phase
    if (phase === 'playing') {
      const areaObj = Object.values(AREAS).find((a) => a.id === currentArea);
      if (areaObj) {
        cameraYaw.current = 0;
        cameraPitch.current = 0.38;
        if (currentArea === 'spawn') {
          targetPosition.current.set(0, 0, 2);
        } else {
          targetPosition.current.set(areaObj.position[0], areaObj.position[1], areaObj.position[2] + 4);
        }
      }
    }
  }, [currentArea, phase]);

  // Keyboard controls (playing only)
  useEffect(() => {
    if (phase !== 'playing') return;

    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key in keys.current) keys.current[key] = true;
    };
    const onKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (key in keys.current) keys.current[key] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [phase]);

  // Mouse Drag / Touch Look & Zoom controls
  useEffect(() => {
    if (phase !== 'playing') return;

    const onPointerDown = (e) => {
      // Ignore clicks on UI buttons, inputs, modals, hotbar
      if (e.target.closest('button, a, input, textarea, .inv-slot, .panel-rpg, .hud-panel, .tooltip-rpg')) {
        return;
      }
      isDragging.current = true;
      previousMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePos.current.x;
      const deltaY = e.clientY - previousMousePos.current.y;
      previousMousePos.current = { x: e.clientX, y: e.clientY };

      const sensitivity = 0.005;
      cameraYaw.current -= deltaX * sensitivity;
      cameraPitch.current = Math.max(0.08, Math.min(1.35, cameraPitch.current + deltaY * sensitivity));
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const onWheel = (e) => {
      if (e.target.closest('.panel-rpg, .book-page, .scrollable')) return;
      cameraDistance.current = Math.max(3.5, Math.min(15.0, cameraDistance.current + e.deltaY * 0.005));
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('wheel', onWheel);
    };
  }, [phase]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (phase === 'menu') {
      // ── MENU MODE ──────────────────────────────
      idleTime.current += delta;

      // Keep player position in right foreground
      groupRef.current.position.lerp(targetPosition.current, 0.08);

      // Angled slightly toward camera & left
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        -0.42,
        0.06
      );

      // Breathing bob
      if (bodyRef.current) {
        bodyRef.current.position.y = 1.2 + Math.sin(idleTime.current * 1.8) * 0.025;
      }

      // Idle arm swing
      const idleSwing = Math.sin(idleTime.current * 1.5) * 0.035;
      if (leftArmRef.current) leftArmRef.current.rotation.x = idleSwing;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -0.25 + idleSwing * 0.5;

      // Menu camera framing
      camera.position.lerp(menuCameraPos.current, 0.05);
      camera.lookAt(
        menuCameraTarget.current.x,
        menuCameraTarget.current.y,
        menuCameraTarget.current.z
      );
      return;
    }

    // ── PLAYING MODE ────────────────────────────
    const speed = 8;
    const sinYaw = Math.sin(cameraYaw.current);
    const cosYaw = Math.cos(cameraYaw.current);

    // Forward and Right vectors relative to camera orientation
    const forwardX = -sinYaw;
    const forwardZ = -cosYaw;
    const rightX = cosYaw;
    const rightZ = -sinYaw;

    const worldMoveDir = new THREE.Vector3();
    if (keys.current.w) {
      worldMoveDir.x += forwardX;
      worldMoveDir.z += forwardZ;
    }
    if (keys.current.s) {
      worldMoveDir.x -= forwardX;
      worldMoveDir.z -= forwardZ;
    }
    if (keys.current.a) {
      worldMoveDir.x -= rightX;
      worldMoveDir.z -= rightZ;
    }
    if (keys.current.d) {
      worldMoveDir.x += rightX;
      worldMoveDir.z += rightZ;
    }

    const isMoving = worldMoveDir.lengthSq() > 0;
    if (isMoving) {
      worldMoveDir.normalize().multiplyScalar(speed * delta);
      targetPosition.current.add(worldMoveDir);
      walkCycle.current += delta * 8;

      // Rotate player character mesh smoothly towards movement direction
      const targetAngle = Math.atan2(worldMoveDir.x, worldMoveDir.z);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetAngle, 0.18);
    } else {
      walkCycle.current *= 0.9;
    }

    groupRef.current.position.lerp(targetPosition.current, 0.12);

    if (bodyRef.current) {
      bodyRef.current.position.y = 1.2 + Math.sin(walkCycle.current) * (isMoving ? 0.08 : 0.02);
    }

    const swing = Math.sin(walkCycle.current) * (isMoving ? 0.5 : 0);
    if (leftArmRef.current) leftArmRef.current.rotation.x = swing;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -swing;

    const parts = groupRef.current.children;
    if (parts[4]) parts[4].rotation.x = -swing;
    if (parts[5]) parts[5].rotation.x = swing;

    // Follow camera: spherical orbit around player with mouse look yaw and pitch
    const dist = cameraDistance.current;
    const pitch = cameraPitch.current;
    const yaw = cameraYaw.current;

    const camOffsetX = dist * Math.sin(yaw) * Math.cos(pitch);
    const camOffsetY = dist * Math.sin(pitch);
    const camOffsetZ = dist * Math.cos(yaw) * Math.cos(pitch);

    const targetCamPos = new THREE.Vector3(
      groupRef.current.position.x + camOffsetX,
      groupRef.current.position.y + 1.8 + camOffsetY,
      groupRef.current.position.z + camOffsetZ
    );

    camera.position.lerp(targetCamPos, 0.12);
    camera.lookAt(
      groupRef.current.position.x,
      groupRef.current.position.y + 1.6,
      groupRef.current.position.z
    );
  });

  return (
    <group ref={groupRef} position={[2.3, 0, 3.8]}>
      {/* Minecraft Nametag */}
      <Html position={[0, 2.85, 0]} center distanceFactor={10}>
        <div
          className="hud-text select-none pointer-events-none"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '2px 8px',
            color: '#55ff55',
            fontSize: '11px',
            whiteSpace: 'nowrap',
            border: '1px solid rgba(0,0,0,0.8)',
            textShadow: '1px 1px 0 #000',
          }}
        >
          Shahul
        </div>
      </Html>

      {/* Head */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <boxGeometry args={[0.72, 0.72, 0.72]} />
        <meshStandardMaterial color="#c6966d" roughness={0.8} />
      </mesh>

      {/* Hair (Black voxel top + sides) */}
      <mesh position={[0, 2.45, -0.04]} castShadow>
        <boxGeometry args={[0.76, 0.22, 0.76]} />
        <meshStandardMaterial color="#181412" roughness={0.95} />
      </mesh>
      {/* Hair Back */}
      <mesh position={[0, 2.15, -0.37]} castShadow>
        <boxGeometry args={[0.74, 0.48, 0.08]} />
        <meshStandardMaterial color="#181412" roughness={0.95} />
      </mesh>
      {/* Hair Sideburns */}
      <mesh position={[-0.37, 2.18, 0]} castShadow>
        <boxGeometry args={[0.06, 0.42, 0.45]} />
        <meshStandardMaterial color="#181412" roughness={0.95} />
      </mesh>
      <mesh position={[0.37, 2.18, 0]} castShadow>
        <boxGeometry args={[0.06, 0.42, 0.45]} />
        <meshStandardMaterial color="#181412" roughness={0.95} />
      </mesh>

      {/* Facial Features — Minecraft Skin */}
      {/* Eyebrows */}
      <mesh position={[-0.15, 2.24, 0.365]}>
        <boxGeometry args={[0.16, 0.05, 0.015]} />
        <meshStandardMaterial color="#181412" />
      </mesh>
      <mesh position={[0.15, 2.24, 0.365]}>
        <boxGeometry args={[0.16, 0.05, 0.015]} />
        <meshStandardMaterial color="#181412" />
      </mesh>
      {/* Eyes Sclera (White) */}
      <mesh position={[-0.15, 2.12, 0.365]}>
        <boxGeometry args={[0.15, 0.1, 0.015]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[0.15, 2.12, 0.365]}>
        <boxGeometry args={[0.15, 0.1, 0.015]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {/* Pupils (Dark Brown) */}
      <mesh position={[-0.13, 2.12, 0.375]}>
        <boxGeometry args={[0.09, 0.09, 0.015]} />
        <meshStandardMaterial color="#22150f" />
      </mesh>
      <mesh position={[0.13, 2.12, 0.375]}>
        <boxGeometry args={[0.09, 0.09, 0.015]} />
        <meshStandardMaterial color="#22150f" />
      </mesh>

      {/* Neat Stubble / Beard along jawline */}
      <mesh position={[0, 1.82, 0.365]}>
        <boxGeometry args={[0.42, 0.12, 0.015]} />
        <meshStandardMaterial color="#22150f" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.94, 0.365]}>
        <boxGeometry args={[0.24, 0.05, 0.015]} />
        <meshStandardMaterial color="#22150f" roughness={0.9} />
      </mesh>

      {/* Torso */}
      <group ref={bodyRef} position={[0, 1.15, 0]}>
        {/* Black shirt */}
        <mesh castShadow>
          <boxGeometry args={[0.66, 0.88, 0.36]} />
          <meshStandardMaterial color="#1c1c1e" roughness={0.75} />
        </mesh>
        {/* Signature Cyan Chest Stripe (front) */}
        <mesh position={[0, 0.03, 0.185]}>
          <boxGeometry args={[0.66, 0.16, 0.02]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#0088aa"
            emissiveIntensity={0.3}
            roughness={0.4}
          />
        </mesh>
        {/* Cyan Stripe (back) */}
        <mesh position={[0, 0.03, -0.185]}>
          <boxGeometry args={[0.66, 0.16, 0.02]} />
          <meshStandardMaterial color="#00b0cc" roughness={0.4} />
        </mesh>
      </group>

      {/* Left Arm (Standing at side) */}
      <group ref={leftArmRef} position={[-0.5, 1.15, 0]}>
        {/* Black sleeve */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.26, 0.44, 0.28]} />
          <meshStandardMaterial color="#1c1c1e" roughness={0.75} />
        </mesh>
        {/* Skin */}
        <mesh position={[0, -0.18, 0]} castShadow>
          <boxGeometry args={[0.24, 0.42, 0.26]} />
          <meshStandardMaterial color="#c6966d" roughness={0.8} />
        </mesh>
      </group>

      {/* Right Arm (Holding Pickaxe angled forward) */}
      <group ref={rightArmRef} position={[0.5, 1.15, 0]}>
        {/* Black sleeve */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.26, 0.44, 0.28]} />
          <meshStandardMaterial color="#1c1c1e" roughness={0.75} />
        </mesh>
        {/* Skin */}
        <mesh position={[0, -0.18, 0]} castShadow>
          <boxGeometry args={[0.24, 0.42, 0.26]} />
          <meshStandardMaterial color="#c6966d" roughness={0.8} />
        </mesh>
        {/* Diamond Pickaxe in Hand */}
        <VoxelPickaxe />
      </group>

      {/* Left Leg */}
      <group position={[-0.17, 0.38, 0]}>
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.28, 0.65, 0.32]} />
          <meshStandardMaterial color="#2d2d38" roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.28, 0.02]} castShadow>
          <boxGeometry args={[0.3, 0.22, 0.35]} />
          <meshStandardMaterial color="#141418" roughness={0.95} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.17, 0.38, 0]}>
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.28, 0.65, 0.32]} />
          <meshStandardMaterial color="#2d2d38" roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.28, 0.02]} castShadow>
          <boxGeometry args={[0.3, 0.22, 0.35]} />
          <meshStandardMaterial color="#141418" roughness={0.95} />
        </mesh>
      </group>
    </group>
  );
}
