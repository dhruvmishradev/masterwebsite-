"use client";

import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import NeuralCore from "./NeuralCore";
import StarField from "./StarField";

export default function NeuralScene() {
  const [isMounted, setIsMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance refs for animation states (prevents React re-renders)
  const mouse = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0); // value from 0 (top) to 1 (bottom)

  useEffect(() => {
    setIsMounted(true);

    // Verify WebGL support
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!ctx) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    // Check reduced motion query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    // Track scroll ratio
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollRef.current = window.scrollY / totalScroll;
      }
    };

    // Track mouse move for parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", listener);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isMounted) {
    return <div className="fixed inset-0 w-screen h-screen bg-black -z-10" />;
  }

  // Fallback if WebGL is not supported or reduced motion is active
  if (!webglSupported || reducedMotion) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black -z-10 overflow-hidden">
        {/* Animated glowing mesh pattern for fallback */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse duration-10000" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-cyan-500/5 blur-[120px] animate-pulse duration-7000" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-screen h-screen bg-black -z-10 overflow-hidden pointer-events-none"
    >
      {/* R3F Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6.0], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#06b6d4" />
        
        <NeuralCore mouse={mouse} scroll={scrollRef} />
        
        <StarField />
      </Canvas>
    </div>
  );
}
