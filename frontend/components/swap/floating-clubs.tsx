"use client";
import React from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { fanClubs } from "@/config/fan-token-data";

interface FloatingClubsProps {
  onClubSelect: (clubSymbol: string) => void;
}

const FloatingClubs: React.FC<FloatingClubsProps> = React.memo(
  ({ onClubSelect }) => {
    const AnimatedClub = ({
      club,
      children,
    }: {
      club: any;
      children: React.ReactNode;
    }) => {
      const y = useMotionValue(0);
      useAnimationFrame((t) => {
        const time = t / 1000;
        y.set(Math.sin((time + club.delay) * ((Math.PI * 2) / 8)) * 20);
      });
      return (
        <motion.div
          key={club.symbol}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.3,
            scale: 1,
          }}
          style={{ ...club.position, y }}
          transition={{
            duration: 2,
            delay: club.delay,
          }}
          whileHover={{
            opacity: 1,
            scale: 1.2,
            zIndex: 50,
            transition: { duration: 0.15, delay: 0 },
          }}
          className="absolute pointer-events-auto cursor-pointer"
        >
          {children}
        </motion.div>
      );
    };

    return (
      <div className="absolute inset-0 z-30 pointer-events-none">
        {fanClubs.map((club) => (
          <AnimatedClub club={club} key={club.symbol}>
            <motion.div
              onClick={() => onClubSelect(club.symbol)}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="relative group cursor-pointer"
            >
              <div
                className="w-20 h-20 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:border-white/60 transition-all duration-300"
                style={{ zIndex: 1 }}
              >
                <img
                  src={club.logo}
                  alt={club.name}
                  className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                  {club.name}
                </div>
              </motion.div>
            </motion.div>
          </AnimatedClub>
        ))}
      </div>
    );
  }
);

FloatingClubs.displayName = "FloatingClubs";

export default FloatingClubs;
