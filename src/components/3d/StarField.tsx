"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function StarField() {
  const ref = useRef<THREE.Points>(null);

  const starCount = 300;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const vels = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      // Widespread background positions
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5; // offset backward slightly

      // Slow drift speed
      vels[i] = 0.002 + Math.random() * 0.005;
    }

    return [pos, vels];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    const geo = ref.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < starCount; i++) {
      // Drift particles forward in Z axis
      arr[i * 3 + 2] += velocities[i];

      // If particles get too close, push them back to the background
      if (arr[i * 3 + 2] > 5) {
        arr[i * 3 + 2] = -25;
        arr[i * 3] = (Math.random() - 0.5) * 30;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      }
    }
    posAttr.needsUpdate = true;

    // Slow rotation
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={starCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a855f7"
        size={0.03}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
