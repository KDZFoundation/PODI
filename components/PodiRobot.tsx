'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

interface PodiRobotProps {
  isVisible: boolean;
}

export default function PodiRobot({ isVisible }: PodiRobotProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: -20, rotate: -6 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 18,
        mass: 0.7,
      }}
      className="flex flex-col items-center justify-center select-none cursor-pointer py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group flex flex-col items-center">
        {/* Miękki, ciepły cień pod lewitującym robotem */}
        <motion.div
          animate={{
            scaleX: isHovered ? [1, 1.25, 1] : [1, 0.85, 1],
            opacity: [0.35, 0.2, 0.35],
          }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="absolute -bottom-2 w-20 h-3 bg-neutral-400 rounded-full blur-[3px]"
        />

        {/* Cała postać PODI z płynną lewitacją */}
        <motion.div
          animate={{
            y: isHovered ? [0, -8, 0] : [0, -6, 0],
            rotate: isHovered ? [0, 4, -4, 0] : 0,
          }}
          transition={{
            y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
            rotate: { duration: 0.4 },
          }}
          className="relative flex flex-col items-center"
        >
          {/* Antenka z ciepłym serduszkiem / świecącą diodą */}
          <div className="flex flex-col items-center -mb-0.5">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 10px rgba(56, 189, 248, 0.6)',
                  '0 0 16px rgba(56, 189, 248, 0.9)',
                  '0 0 10px rgba(56, 189, 248, 0.6)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-sky-400 to-cyan-200 border-2 border-white shadow-md z-10"
            />
            <div className="w-1.5 h-2.5 bg-neutral-300 rounded-t-full shadow-inner" />
          </div>

          {/* Główna obła biała główka (styl nowoczesnej maskotki) */}
          <div className="relative w-24 h-20 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 rounded-[28px] p-2 flex flex-col items-center justify-center border-2 border-neutral-200/80 shadow-[0_8px_20px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,1)]">
            
            {/* Małe zaokrąglone słuchaweczki po bokach */}
            <div className="absolute -left-2 top-6 w-2.5 h-7 bg-sky-500 rounded-full border border-white shadow-sm flex items-center justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full" />
            </div>
            <div className="absolute -right-2 top-6 w-2.5 h-7 bg-sky-500 rounded-full border border-white shadow-sm flex items-center justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full" />
            </div>

            {/* Szklany, błyszczący ekranik z twarzą */}
            <div className="relative w-20 h-13 bg-neutral-900 rounded-[20px] p-2 flex flex-col items-center justify-between overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),0_1px_2px_rgba(255,255,255,0.4)] border border-neutral-700">
              
              {/* Szklany odblask na ekranie */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/20 to-transparent rounded-t-[18px] pointer-events-none" />

              {/* Oczka robota */}
              <div className="w-full flex items-center justify-around px-1 mt-0.5">
                {/* Lewe oko */}
                <motion.div
                  animate={{
                    scaleY: isHovered ? 0.3 : [1, 1, 0.1, 1, 1],
                    borderRadius: isHovered ? '4px' : '9999px',
                  }}
                  transition={{
                    scaleY: {
                      repeat: isHovered ? 0 : Infinity,
                      duration: 3.2,
                      times: [0, 0.45, 0.48, 0.52, 1],
                    },
                  }}
                  className="relative w-4 h-4.5 rounded-full bg-gradient-to-b from-cyan-200 to-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)] flex items-center justify-center"
                >
                  {/* Błysk w oku (iskierka radości) */}
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full" />
                </motion.div>

                {/* Prawe oko */}
                <motion.div
                  animate={{
                    scaleY: isHovered ? 0.3 : [1, 1, 0.1, 1, 1],
                    borderRadius: isHovered ? '4px' : '9999px',
                  }}
                  transition={{
                    scaleY: {
                      repeat: isHovered ? 0 : Infinity,
                      duration: 3.2,
                      times: [0, 0.45, 0.48, 0.52, 1],
                    },
                  }}
                  className="relative w-4 h-4.5 rounded-full bg-gradient-to-b from-cyan-200 to-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)] flex items-center justify-center"
                >
                  {/* Błysk w oku (iskierka radości) */}
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full" />
                </motion.div>
              </div>

              {/* Rumieńce i uśmieszek */}
              <div className="w-full flex items-center justify-between px-2 mb-0.5">
                {/* Lewy różowy rumieniec */}
                <div className="w-2.5 h-1 bg-rose-400/80 rounded-full blur-[0.5px]" />

                {/* Radosny, łukowaty uśmieszek */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                  }}
                  className="flex flex-col items-center"
                >
                  <svg width="14" height="6" viewBox="0 0 14 6" fill="none">
                    <path
                      d="M2 1C4 4 10 4 12 1"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>

                {/* Prawy różowy rumieniec */}
                <div className="w-2.5 h-1 bg-rose-400/80 rounded-full blur-[0.5px]" />
              </div>
            </div>
          </div>

          {/* Mały, gładki korpusik robota z plakietką "PODI" */}
          <div className="relative -mt-1 w-16 h-8 bg-gradient-to-b from-white to-neutral-100 rounded-b-2xl border-2 border-t-0 border-neutral-200/90 shadow-sm flex items-center justify-center">
            {/* Mały emblemat z logo PODI */}
            <div className="px-2 py-0.5 rounded-full bg-sky-50 border border-sky-100 flex items-center gap-1 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-[9px] font-bold tracking-wider text-sky-900 font-mono">
                PODI
              </span>
            </div>

            {/* Przyjazna machająca rączka (prawa) */}
            <motion.div
              animate={{
                rotate: [0, 24, -10, 24, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: 'easeInOut',
                repeatDelay: 1,
              }}
              className="absolute -right-3.5 top-0 w-4 h-4 bg-white rounded-full border-2 border-neutral-200 shadow-sm origin-left flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400/80" />
            </motion.div>

            {/* Spokojna lewa rączka */}
            <div className="absolute -left-3.5 top-1 w-4 h-4 bg-white rounded-full border-2 border-neutral-200 shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400/80" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
