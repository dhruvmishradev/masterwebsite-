"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Terminal from "@/components/sections/Terminal";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import LearningJourney from "@/components/sections/LearningJourney";
import Hackathons from "@/components/sections/Hackathons";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/ui/Preloader";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      <div
        className="flex flex-col min-h-screen"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <Navbar />

        {/* Global ambient background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-indigo-900/8 blur-[200px]" />
          <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-purple-900/6 blur-[200px]" />
        </div>

        <main className="flex-1 flex flex-col w-full relative z-10">
          <Hero />
          <div className="divider mx-6" />
          <About />
          <div className="divider mx-6" />
          <Terminal />
          <div className="divider mx-6" />
          <Skills />
          <div className="divider mx-6" />
          <Projects />
          <div className="divider mx-6" />
          <Certifications />
          <div className="divider mx-6" />
          <Hackathons />
          <div className="divider mx-6" />
          <LearningJourney />
          <div className="divider mx-6" />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
