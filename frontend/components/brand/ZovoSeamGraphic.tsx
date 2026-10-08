'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const ZovoSeamGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full max-w-[520px] aspect-square rounded-2xl bg-[#FFFFFF] border border-[#E2E6EF] p-6 sm:p-10 shadow-[0_20px_50px_rgba(20,23,31,0.06)] flex flex-col justify-between overflow-hidden select-none ${className}`}
    >
      {/* Background Precision Grid */}
      <div className="absolute inset-0 bg-grid-swiss opacity-70 pointer-events-none" />

      {/* Top Technical Metadata */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#5A6578] uppercase border-b border-[#E2E6EF] pb-3">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1F5BFF]" />
          SYS: SEAM.MODULAR
        </span>
        <span className="font-semibold text-[#14171F]">TWO BLOCKS / ONE CONNECTION</span>
        <span>VER: 2.0</span>
      </div>

      {/* Center Interactive Brand Geometry */}
      <div className="relative z-10 my-auto flex items-center justify-center py-6">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72">
          {/* Block A: Ideas / Ink Charcoal */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-[#14171F] p-4 flex flex-col justify-between shadow-lg text-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-wider opacity-60">BLOCK 01</span>
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest opacity-60">SOURCE</p>
              <p className="text-base font-bold tracking-tight">IDEAS</p>
            </div>
          </motion.div>

          {/* Block B: Technology / Electric Blue */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-[#1F5BFF] p-4 flex flex-col justify-between shadow-lg text-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-wider text-white/70">BLOCK 02</span>
              <span className="h-2 w-2 rounded-full bg-white/30" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-white/70">MEDIUM</p>
              <p className="text-base font-bold tracking-tight">TECHNOLOGY</p>
            </div>
          </motion.div>

          {/* Signature Z-Shaped SEAM in Signal Coral */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20"
            viewBox="0 0 288 288"
          >
            {/* Geometric connection line */}
            <motion.path
              d="M 60 144 L 228 144 M 228 144 L 80 200 M 80 200 L 240 200"
              fill="none"
              stroke="#FF6B3D"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Center Anchor Point */}
            <motion.circle
              cx="144"
              cy="172"
              r="6"
              fill="#FF6B3D"
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 1.1, ease: 'backOut' }}
            />
          </svg>
        </div>
      </div>

      {/* Bottom Technical Coordinates */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#5A6578] border-t border-[#E2E6EF] pt-3">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 bg-[#FF6B3D] rounded-sm" />
          <span className="font-semibold text-[#14171F]">ZOVO SEAM</span>: COUPLING COMPLETE
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[#5A6578]">
          [X: 144.0 • Y: 172.0]
        </span>
      </div>
    </div>
  );
};
