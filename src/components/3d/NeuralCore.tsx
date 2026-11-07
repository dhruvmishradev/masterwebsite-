"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface NeuralCoreProps {
  mouse: React.RefObject<{ x: number; y: number }>;
  scroll: React.RefObject<number>;
}

export default function NeuralCore({ mouse, scroll }: NeuralCoreProps) {
  // --- REFS ---
  const landscapeRef = useRef<THREE.Group>(null);
  const ballRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Line>(null);

  const brainRef = useRef<THREE.Group>(null);
  const skillsRef = useRef<THREE.Group>(null);
  const workflowRef = useRef<THREE.Group>(null);
  const projectsGroupRef = useRef<THREE.Group>(null);
  const portalRef = useRef<THREE.Group>(null);

  // --- ML METRICS STATE ---
  const [metrics, setMetrics] = useState({
    epoch: 124,
    loss: 0.85,
    accuracy: 98.2
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => ({
        epoch: prev.epoch + 1,
        loss: Math.max(0.005, prev.loss - 0.0002 * Math.random()),
        accuracy: Math.min(99.9, prev.accuracy + 0.01 * Math.random())
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // --- MODEL 1: LOSS LANDSCAPE CONFIG ---
  const gridSize = 3.5;
  const segments = 24;

  const lossFunction = (x: number, y: number) => {
    return (
      Math.sin(x * 1.2) * Math.cos(y * 1.2) * 0.6 +
      Math.sin(x * 0.4) * Math.cos(y * 0.4) * 0.3 -
      (x * x + y * y) * 0.03
    );
  };

  const lossGradient = (x: number, y: number) => {
    const dfdx =
      Math.cos(x * 1.2) * 1.2 * Math.cos(y * 1.2) * 0.6 +
      Math.cos(x * 0.4) * 0.4 * Math.cos(y * 0.4) * 0.3 -
      2 * x * 0.03;
    const dfdy =
      -Math.sin(x * 1.2) * Math.sin(y * 1.2) * 1.2 * 0.6 -
      Math.sin(x * 0.4) * Math.sin(y * 0.4) * 0.3 * 0.3 -
      2 * y * 0.03;
    return [dfdx, dfdy];
  };

  const [landscapeGeometry, wireframeGeometry] = useMemo(() => {
    const geo = new THREE.PlaneGeometry(gridSize * 2, gridSize * 2, segments, segments);
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < pos.count; i++) {
      const x = arr[i * 3];
      const y = arr[i * 3 + 1];
      arr[i * 3 + 2] = lossFunction(x, y);
    }
    
    geo.computeVertexNormals();
    const wireGeo = new THREE.WireframeGeometry(geo);
    return [geo, wireGeo];
  }, []);

  const optState = useRef({
    x: 2.5,
    y: 2.5,
    z: 0.0,
    vx: 0.0,
    vy: 0.0,
    trail: [] as THREE.Vector3[],
    steps: 0
  });

  // --- MODEL 2: CYBER BRAIN CONFIG ---
  const brainNodeCount = 45;
  const [brainNodes, brainConnections] = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < brainNodeCount; i++) {
      // Distribute points on a sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.3 + Math.random() * 0.3; // radius

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodes.push(new THREE.Vector3(x, y, z));
    }

    const lines: number[] = [];
    for (let i = 0; i < brainNodeCount; i++) {
      let count = 0;
      for (let j = i + 1; j < brainNodeCount; j++) {
        if (count > 2) break;
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 1.4) {
          lines.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
          count++;
        }
      }
    }

    return [nodes, lines];
  }, []);

  // --- ANIMATION LOOP ---
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const s = scroll.current !== null ? scroll.current : 0;

    // 1. CINEMATIC CAMERA FLIGHT COORDINATES MAPPING (PeachWeb Style)
    const keyframes = [
      // Hero (Scroll = 0): Center on Loss landscape on the right
      { s: 0.0, cam: [0, 0, 5.8], target: [1.6, 0, 0] },
      // About (Scroll = 0.16): Fly camera to Cyber Brain on the left
      { s: 0.16, cam: [0, -5.5, 5.5], target: [-1.8, -5.5, 0] },
      // Skills (Scroll = 0.33): Fly to Torus rings on the right
      { s: 0.33, cam: [0, -11.0, 5.5], target: [1.8, -11.0, 0] },
      // Workflow (Scroll = 0.50): Fly to RAG nodes in the center
      { s: 0.50, cam: [0, -16.5, 4.5], target: [0, -16.5, 0] },
      // Projects (Scroll = 0.68): Fly to Solar cluster on the left
      { s: 0.68, cam: [0, -22.0, 6.0], target: [-1.8, -22.0, 0] },
      // Journey (Scroll = 0.84): Dynamic camera sweep down
      { s: 0.84, cam: [0, -27.5, 6.5], target: [0, -27.5, 0] },
      // Contact (Scroll = 1.0): Deep plunge look into portal
      { s: 1.0, cam: [0, -33.0, 4.5], target: [0, -33.0, 0] }
    ];

    // Interpolate keyframes
    let lower = keyframes[0];
    let upper = keyframes[keyframes.length - 1];

    for (let i = 0; i < keyframes.length - 1; i++) {
      if (s >= keyframes[i].s && s <= keyframes[i + 1].s) {
        lower = keyframes[i];
        upper = keyframes[i + 1];
        break;
      }
    }

    const range = upper.s - lower.s;
    const t = range > 0 ? (s - lower.s) / range : 0;
    const easeT = t * t * (3 - 2 * t); // Smooth easing curve

    const camX = THREE.MathUtils.lerp(lower.cam[0], upper.cam[0], easeT);
    const camY = THREE.MathUtils.lerp(lower.cam[1], upper.cam[1], easeT);
    const camZ = THREE.MathUtils.lerp(lower.cam[2], upper.cam[2], easeT);

    const targetX = THREE.MathUtils.lerp(lower.target[0], upper.target[0], easeT);
    const targetY = THREE.MathUtils.lerp(lower.target[1], upper.target[1], easeT);
    const targetZ = THREE.MathUtils.lerp(lower.target[2], upper.target[2], easeT);

    // Apply mouse-move parallax drift to camera coordinates
    if (mouse.current) {
      const driftX = mouse.current.x * 0.45;
      const driftY = mouse.current.y * 0.45;
      state.camera.position.set(camX + driftX, camY + driftY, camZ);
    } else {
      state.camera.position.set(camX, camY, camZ);
    }
    state.camera.lookAt(targetX, targetY, targetZ);

    // 2. MODEL 1 ANIMATIONS (Loss Surface)
    const opt = optState.current;
    const [dfdx, dfdy] = lossGradient(opt.x, opt.y);
    const lr = 0.025;
    const momentum = 0.88;

    opt.vx = momentum * opt.vx - lr * dfdx;
    opt.vy = momentum * opt.vy - lr * dfdy;
    opt.x += opt.vx;
    opt.y += opt.vy;
    opt.z = lossFunction(opt.x, opt.y) + 0.12;

    if (Math.abs(opt.x) > gridSize || Math.abs(opt.y) > gridSize) {
      opt.x = (Math.random() - 0.5) * 5.0;
      opt.y = (Math.random() - 0.5) * 5.0;
      opt.vx = 0; opt.vy = 0;
      opt.trail = [];
      opt.steps = 0;
    }

    opt.steps++;
    if (opt.steps > 200 && Math.sqrt(opt.vx * opt.vx + opt.vy * opt.vy) < 0.005) {
      opt.x = (Math.random() - 0.5) * 6.0;
      opt.y = (Math.random() - 0.5) * 6.0;
      opt.vx = 0; opt.vy = 0;
      opt.trail = [];
      opt.steps = 0;
    }

    if (ballRef.current) ballRef.current.position.set(opt.x, opt.y, opt.z);

    if (trailRef.current && ballRef.current) {
      if (opt.trail.length === 0 || opt.trail[opt.trail.length - 1].distanceTo(ballRef.current.position) > 0.12) {
        opt.trail.push(ballRef.current.position.clone());
        if (opt.trail.length > 25) opt.trail.shift();

        const pathCoords: number[] = [];
        opt.trail.forEach(pt => pathCoords.push(pt.x, pt.y, pt.z));
        trailRef.current.geometry.setAttribute("position", new THREE.Float32BufferAttribute(pathCoords, 3));
        trailRef.current.geometry.computeBoundingSphere();
      }
    }

    if (landscapeRef.current) {
      landscapeRef.current.rotation.z = time * 0.05;
    }

    // 3. MODEL 2 ANIMATIONS (Cyber Brain Node)
    if (brainRef.current) {
      brainRef.current.rotation.y = time * 0.12;
      brainRef.current.rotation.x = Math.sin(time * 0.25) * 0.1;
    }

    // 4. MODEL 3 ANIMATIONS (Concentric Skills Rings)
    if (skillsRef.current) {
      const childs = skillsRef.current.children;
      if (childs.length >= 2) {
        childs[0].rotation.y = time * 0.18;
        childs[0].rotation.x = time * 0.08;
        childs[1].rotation.x = -time * 0.22;
        childs[1].rotation.y = time * 0.12;
      }
    }

    // 5. MODEL 4 ANIMATIONS (RAG pipeline node links)
    if (workflowRef.current) {
      workflowRef.current.rotation.y = Math.sin(time * 0.15) * 0.12;
    }

    // 6. MODEL 5 ANIMATIONS (Solar projects core)
    if (projectsGroupRef.current) {
      projectsGroupRef.current.rotation.y = time * 0.08;
      const satellites = projectsGroupRef.current.children;
      // Animate orbiting project nodes
      for (let i = 1; i < satellites.length; i++) {
        const sat = satellites[i] as THREE.Mesh;
        const angle = time * (0.35 + i * 0.1) + i * 2.0;
        const dist = 1.0 + i * 0.5;
        sat.position.set(Math.cos(angle) * dist, Math.sin(time * 0.25) * 0.15, Math.sin(angle) * dist);
      }
    }

    // 7. MODEL 6 ANIMATIONS (Quantum Portal)
    if (portalRef.current) {
      const rings = portalRef.current.children;
      for (let i = 0; i < rings.length; i++) {
        const ring = rings[i] as THREE.Mesh;
        ring.rotation.z = time * (0.4 + i * 0.15) * (i % 2 === 0 ? 1 : -1);
        const scalePulse = 1.0 + Math.sin(time * 2.0 + i * 0.5) * 0.06;
        ring.scale.set(scalePulse, scalePulse, scalePulse);
      }
    }
  });

  return (
    <group>
      
      {/* ========================================================
          MODEL 1: LOSS LANDSCAPE OPTIMIZER (Y = 0)
          ======================================================== */}
      <group ref={landscapeRef} position={[1.6, 0, 0]} rotation={[-Math.PI / 3, 0, 0]}>
        <lineSegments geometry={wireframeGeometry}>
          <lineBasicMaterial
            color="#06b6d4"
            transparent={true}
            opacity={0.22}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        <mesh geometry={landscapeGeometry}>
          <meshBasicMaterial
            color="#1e1b4b"
            transparent={true}
            opacity={0.08}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        <mesh ref={ballRef}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshBasicMaterial color="#a855f7" transparent={true} opacity={0.9} />
          <Html distanceFactor={5} center>
            <div className="bg-zinc-950/90 border border-purple-500/30 text-[7px] font-mono px-2 py-0.5 rounded text-purple-400 select-none backdrop-blur-sm shadow-lg tracking-wider whitespace-nowrap translate-y-[-12px]">
              LOSS: {metrics.loss.toFixed(4)}
            </div>
          </Html>
        </mesh>

        <line ref={trailRef as any}>
          <bufferGeometry />
          <lineBasicMaterial color="#6366f1" transparent={true} opacity={0.5} />
        </line>
      </group>

      {/* ========================================================
          MODEL 2: CYBER BRAIN DUAL CORE (Y = -5.5)
          ======================================================== */}
      <group ref={brainRef} position={[-1.8, -5.5, 0]}>
        {/* Glowing brain synapses */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(brainNodeCount * 3), 3]}
              count={brainNodeCount}
              array={new Float32Array(brainNodes.flatMap(n => [n.x, n.y, n.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#06b6d4"
            size={0.08}
            sizeAttenuation={true}
            transparent={true}
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Connecting synapse lines */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(brainConnections), 3]}
              count={brainConnections.length / 3}
              array={new Float32Array(brainConnections)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#6366f1"
            transparent={true}
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Core brain glow sphere */}
        <mesh>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe={true}
            transparent={true}
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <Html position={[0, 1.6, 0]} distanceFactor={5} center>
          <div className="bg-zinc-950/90 border border-indigo-500/25 text-[7px] font-mono px-2 py-0.5 rounded text-indigo-400 select-none tracking-wider whitespace-nowrap">
            [ AGENT_BRAIN // CONTEXT_SIZE: 128K ]
          </div>
        </Html>
      </group>

      {/* ========================================================
          MODEL 3: CONCENTRIC SKILLS RINGS (Y = -11.0)
          ======================================================== */}
      <group ref={skillsRef} position={[1.8, -11.0, 0]}>
        {/* Outer Torus */}
        <mesh>
          <torusGeometry args={[1.5, 0.03, 10, 48]} />
          <meshBasicMaterial
            color="#06b6d4"
            wireframe={true}
            transparent={true}
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner Torus */}
        <mesh>
          <torusGeometry args={[0.9, 0.02, 8, 36]} />
          <meshBasicMaterial
            color="#a855f7"
            wireframe={true}
            transparent={true}
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Center Nucleus */}
        <mesh>
          <octahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial
            color="#6366f1"
            wireframe={true}
            transparent={true}
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <Html position={[0, 1.8, 0]} distanceFactor={5} center>
          <div className="bg-zinc-950/90 border border-cyan-500/25 text-[7px] font-mono px-2 py-0.5 rounded text-cyan-400 select-none tracking-wider whitespace-nowrap">
            CORE_MATRIX: ONLINE
          </div>
        </Html>
      </group>

      {/* ========================================================
          MODEL 4: RAG PIPELINE NODES (Y = -16.5)
          ======================================================== */}
      <group ref={workflowRef} position={[0, -16.5, 0]}>
        {/* Node 1: Ingestion */}
        <mesh position={[-1.8, 0, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial color="#06b6d4" wireframe={true} transparent={true} opacity={0.5} />
        </mesh>

        {/* Node 2: Vector DB */}
        <mesh position={[0, 0.3, 0]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial color="#a855f7" wireframe={true} transparent={true} opacity={0.6} />
        </mesh>

        {/* Node 3: LLM Reader */}
        <mesh position={[1.8, 0, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial color="#6366f1" wireframe={true} transparent={true} opacity={0.5} />
        </mesh>

        {/* Linking lines */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(18), 3]}
              count={3}
              array={new Float32Array([
                -1.8, 0, 0,  0, 0.3, 0,
                0, 0.3, 0,   1.8, 0, 0,
                -1.8, 0, 0,  1.8, 0, 0
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#52525b" transparent={true} opacity={0.4} />
        </lineSegments>

        <Html position={[0, 1.4, 0]} distanceFactor={5} center>
          <div className="bg-zinc-950/90 border border-zinc-800 text-[7px] font-mono px-2 py-0.5 rounded text-zinc-400 select-none tracking-wider whitespace-nowrap">
            VECTOR_RETR // COSINE_SIM: {(metrics.accuracy / 100).toFixed(4)}
          </div>
        </Html>
      </group>

      {/* ========================================================
          MODEL 5: ORBITING PROJECTS SYSTEM (Y = -22.0)
          ======================================================== */}
      <group ref={projectsGroupRef} position={[-1.8, -22.0, 0]}>
        {/* Core Profile Node */}
        <mesh>
          <sphereGeometry args={[0.4, 12, 12]} />
          <meshBasicMaterial color="#6366f1" wireframe={true} transparent={true} opacity={0.7} />
        </mesh>

        {/* Satellites project coordinates (dynamically updated in useFrame) */}
        <mesh>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial color="#06b6d4" transparent={true} opacity={0.8} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial color="#a855f7" transparent={true} opacity={0.8} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial color="#cbd5e1" transparent={true} opacity={0.7} />
        </mesh>

        <Html position={[0, 1.6, 0]} distanceFactor={5} center>
          <div className="bg-zinc-950/90 border border-purple-500/25 text-[7px] font-mono px-2 py-0.5 rounded text-purple-400 select-none tracking-wider whitespace-nowrap">
            PROJECTS_CLUSTER // ACTIVE_REPOS: 4
          </div>
        </Html>
      </group>

      {/* ========================================================
          MODEL 6: QUANTUM PORTAL WORMHOLE (Y = -33.0)
          ======================================================== */}
      <group ref={portalRef} position={[0, -33.0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.05, 12, 64]} />
          <meshBasicMaterial color="#8b5cf6" wireframe={true} transparent={true} opacity={0.3} />
        </mesh>

        <mesh>
          <torusGeometry args={[1.0, 0.04, 10, 48]} />
          <meshBasicMaterial color="#06b6d4" wireframe={true} transparent={true} opacity={0.4} />
        </mesh>

        <mesh>
          <torusGeometry args={[0.6, 0.03, 8, 36]} />
          <meshBasicMaterial color="#ec4899" wireframe={true} transparent={true} opacity={0.45} />
        </mesh>

        <Html position={[0, 2.2, 0]} distanceFactor={5} center>
          <div className="bg-zinc-950/90 border border-indigo-500/30 text-[7px] font-mono px-2 py-0.5 rounded text-indigo-400 select-none tracking-wider whitespace-nowrap">
            [ QUANTUM_BRIDGE // PORTAL_ACTIVE ]
          </div>
        </Html>
      </group>

    </group>
  );
}
