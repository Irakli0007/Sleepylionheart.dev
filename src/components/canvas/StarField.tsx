import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { StarLayerConfig, AnimationPhase } from '../../types';

interface StarFieldProps {
  config: StarLayerConfig;
  animationPhase: AnimationPhase;
  speedMultiplier: number;
  scrollProgress: number;
  triggerAnimation?: boolean;
}

export const StarField = ({ config, speedMultiplier, scrollProgress }: StarFieldProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { count, depth, size, speed, parallax } = config;

  // Store star positions and velocities
  const stars = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const velocities: number[] = [];
    const colors: THREE.Color[] = [];

    // Helper function to generate position avoiding center
    const generatePosition = () => {
      let x, y;
      const centerDeadZone = 50; // Radius of area to avoid in the center

      do {
        x = (Math.random() - 0.5) * 200;
        y = (Math.random() - 0.5) * 200;
      } while (Math.sqrt(x * x + y * y) < centerDeadZone);

      return { x, y };
    };

    for (let i = 0; i < count; i++) {
      // Random position in 3D space, avoiding center
      const { x, y } = generatePosition();
      // Start all stars at the far end of depth range
      const z = -depth + (Math.random() * depth * 0.2); // Start between -depth and -80% depth

      positions.push(new THREE.Vector3(x, y, z));
      velocities.push(Math.random() * 0.5 + 0.5);

      // All stars are aqua with slight variation
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        colors.push(new THREE.Color(0, 1, 1)); // Bright aqua
      } else if (colorChoice < 0.7) {
        colors.push(new THREE.Color(0.3, 1, 1)); // Aqua with slight variation
      } else {
        colors.push(new THREE.Color(0.5, 1, 1)); // Lighter aqua
      }
    }

    return { positions, velocities, colors };
  }, [count, depth]);

  // Set initial positions and colors
  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();
    const colorAttribute = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      dummy.position.copy(stars.positions[i]);
      dummy.scale.set(size, size, size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const color = stars.colors[i];
      colorAttribute[i * 3] = color.r;
      colorAttribute[i * 3 + 1] = color.g;
      colorAttribute[i * 3 + 2] = color.b;
    }

    meshRef.current.geometry.setAttribute(
      'color',
      new THREE.InstancedBufferAttribute(colorAttribute, 3)
    );

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, size, stars]);

  // Animation loop
  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();
    const effectiveSpeed = speed * speedMultiplier;
    const centerDeadZone = 50;

    for (let i = 0; i < count; i++) {
      const star = stars.positions[i];
      const velocity = stars.velocities[i];

      // Move star forward (towards camera)
      star.z += effectiveSpeed * velocity * delta * 60;

      // Apply parallax based on scroll
      const parallaxOffset = scrollProgress * parallax * 100;
      const yOffset = parallaxOffset;

      // Recycle star when it passes the camera
      if (star.z > 5) {
        star.z = -depth;

        // Regenerate position avoiding center (use same dead zone value)
        let newX, newY;
        do {
          newX = (Math.random() - 0.5) * 200;
          newY = (Math.random() - 0.5) * 200;
        } while (Math.sqrt(newX * newX + newY * newY) < 50);

        star.x = newX;
        star.y = newY;
      }

      // Calculate final position with parallax
      const finalX = star.x;
      const finalY = star.y - yOffset;

      // Check if star would be in dead zone after parallax offset
      // The center of the screen is always at (0, 0) from user's perspective
      const distanceFromCenter = Math.sqrt(finalX * finalX + finalY * finalY);

      // Set position
      dummy.position.set(finalX, finalY, star.z);

      // If star is in dead zone, make it invisible, otherwise normal size
      if (distanceFromCenter < centerDeadZone) {
        dummy.scale.set(0, 0, 0);
      } else {
        dummy.scale.set(size, size, size);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
};
