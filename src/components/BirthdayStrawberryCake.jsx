import React, { useState, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BirthdayStrawberryCake = forwardRef((props, ref) => {
  const [isLit, setIsLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);

  useImperativeHandle(ref, () => ({
    lightUp: () => {
      setShowSmoke(false);
      setIsLit(true);
    },
    blowOut: () => {
      setIsLit(false);
      setShowSmoke(true);
      setTimeout(() => setShowSmoke(false), 1800);
    },
  }));

  const flameVariants = {
    hidden: { scale: 0.7, opacity: 0 },
    idle: {
      scale: [0.95, 1.05, 0.98],
      rotate: [-1.5, 1.5, -0.5],
      opacity: [0.9, 1, 0.95],
      transition: { duration: 0.9, repeat: Infinity, repeatType: "mirror" },
    },
    extinguish: { scale: 0.5, opacity: 0, transition: { duration: 0.6 } },
  };

  const smokeVariants = {
    initial: { opacity: 0, y: 0, scale: 0.8 },
    rise: {
      opacity: [0.1, 0.7, 0],
      y: [-6, -24, -45],
      scale: [0.9, 1.05, 1.2],
      transition: { duration: 1.8 },
    },
  };

  // Candle positions (spread along top)
  const candlePositions = [[140,100], [170,90], [200,85], [230,90], [260,100]];

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-white/60 p-4 rounded-2xl shadow-lg backdrop-blur-sm" style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}>
          <svg viewBox="0 0 400 300" width="100%" xmlns="http://www.w3.org/2000/svg" style={{
              width: "100%",
              height: "100%",
              maxWidth: "900px", // limit max size
              display: "block",
            }}>
            <defs>
              <filter id="softBlur"><feGaussianBlur stdDeviation="1.2" /></filter>
              <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/>
                <feColorMatrix type="saturate" values="0"/>
                <feBlend in2="SourceGraphic" mode="multiply"/>
              </filter>
            </defs>


            {/* Cake layers */}
            <g>
              <path d="M80 180 Q200 140 320 180 L320 230 Q200 270 80 230 Z" fill="#ffe5ec" stroke="#e8bfc4" strokeWidth="2" />
              <path d="M80 150 Q200 110 320 150 L320 180 Q200 140 80 180 Z" fill="#ffccd5" stroke="#e8bfc4" strokeWidth="2" />
              <path d="M80 130 Q200 90 320 130 L320 150 Q200 110 80 150 Z" fill="#fff0f5" stroke="#e8bfc4" strokeWidth="2" />
            </g>

            {/* Cream drips */}
            {/*<path d="M100 150 q5 20 15 0 t20 0 t20 0 q5 20 15 0 t20 0 t20 0 q5 20 15 0 t20 0 t20 0 q5 20 15 0" fill="#fffafc" stroke="#f2d4dd" strokeWidth="1" />*/}

            {/* Strawberries */}
            {[[120,150], [160,140], [200,135], [240,140], [280,150]].map(([x,y], i) => (
              <g key={i} transform={`translate(${x},${y})`}>
                <ellipse cx="0" cy="0" rx="12" ry="16" fill="#ff5a6b" stroke="#c43f50" strokeWidth="1" />
                <path d="M-5 -8 C -3 -14, 3 -14, 5 -8" fill="#53b26a" stroke="#3a8b54" strokeWidth="0.8" />
                <circle cx="-4" cy="-2" r="1.2" fill="#fff0f0" />
                <circle cx="0" cy="1" r="1.2" fill="#fff0f0" />
                <circle cx="4" cy="-3" r="1.2" fill="#fff0f0" />
              </g>
            ))}

            {/* Candles */}
            {candlePositions.map(([cx,cy], i) => (
              <g key={i} transform={`translate(${cx},${cy})`}>
                <rect x="-5" y="-30" width="10" height="60" rx="3" fill="#fff" stroke="#ffd6d6" strokeWidth="1" />
                <rect x="-5" y="-30" width="10" height="60" rx="2" fill="#fde6ee" />
                <AnimatePresence>
                  {isLit && (
                    <motion.g key="flame" initial="hidden" animate="idle" exit="extinguish" variants={flameVariants}>
                      <ellipse cx="0" cy="-40" rx="8" ry="12" fill="#ffd89e" opacity="0.9" />
                      <path d="M0 -50 C6 -44, 6 -36, 0 -32 C-6 -36, -6 -44, 0 -50 Z" fill="#ffb36b" />
                      <path d="M0 -48 C3 -44, 3 -40, 0 -38 C-3 -40, -3 -44, 0 -48 Z" fill="#fff7cc" />
                    </motion.g>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {showSmoke && (
                    <motion.g key="smoke" initial="initial" animate="rise" variants={smokeVariants}>
                      <path d="M-2 -44 Q4 -56, 2 -68 Q-4 -78, -2 -86" stroke="#cfc9c8" strokeWidth="3" fill="none" opacity="0.7" />
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
});

export default BirthdayStrawberryCake;
