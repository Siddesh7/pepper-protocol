"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NUM_PARTICLES = 20;

const StadiumBackground = () => {
  const [particlePositions, setParticlePositions] = useState<
    Array<{ x: number; y: number }>
  >([]);

  useEffect(() => {
    // Only runs on client
    const positions = Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setParticlePositions(positions);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Stadium Background Image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20football%20stadium%20interior%20panoramic%20view%20with%20green%20grass%20field%20illuminated%20at%20night%20atmospheric%20lighting%20empty%20seats%20blurred%20background%20cinematic%20quality&width=1920&height=1080&seq=stadium1&orientation=landscape')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: pos.x,
              y: pos.y,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-transparent to-blue-900/30" />

      {/* Animated Grid Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

export default StadiumBackground;
