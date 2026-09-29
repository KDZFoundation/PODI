'use client';

import { useState, useEffect } from 'react';
import PodiRobot from '@/components/PodiRobot';

interface TypewriterHeaderProps {
  onComplete?: () => void;
}

export default function TypewriterHeader({ onComplete }: TypewriterHeaderProps) {
  const segA = 'Cześć....';
  const segB = ' Jestem PODI.';
  const segC = ' Twój inteligentny Doradca od drukowania na żądanie.';
  const fullLine1 = segA + segB + segC;

  const line2 = 'Wybierz interesujący Cię temat.';

  const [phase, setPhase] = useState<number>(0);
  const [count1, setCount1] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const showRobot = count1 >= segA.length;

  // DOS terminal boot delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase(1);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Linia 1: DOS prompt typing
  useEffect(() => {
    if (phase !== 1) return;

    if (count1 < fullLine1.length) {
      let delay = 120;

      if (count1 < segA.length) {
        delay = 140;
      } else if (count1 === segA.length) {
        delay = 1200; // przerywnik po Cześć....
      } else if (count1 < segA.length + segB.length) {
        delay = 110;
      } else if (count1 === segA.length + segB.length) {
        delay = 900; // przerywnik po Jestem PODI.
      } else {
        delay = 30; // szybki strumień konsolowy DOS
      }

      const timer = setTimeout(() => {
        setCount1((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase(2);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [phase, count1, fullLine1, segA.length, segB.length]);

  // Pause before line 2
  useEffect(() => {
    if (phase !== 2) return;
    const timer = setTimeout(() => {
      setPhase(3);
    }, 550);
    return () => clearTimeout(timer);
  }, [phase]);

  // Linia 2
  useEffect(() => {
    if (phase !== 3) return;

    if (count2 < line2.length) {
      const delay = 35;
      const timer = setTimeout(() => {
        setCount2((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase(4);
        if (onComplete) onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [phase, count2, line2, onComplete]);

  const displayedLine1 = fullLine1.slice(0, count1);
  const displayedLine2 = line2.slice(0, count2);

  const renderFormattedLine1 = (str: string) => {
    const podiIndex = str.indexOf('PODI');
    if (podiIndex !== -1) {
      const before = str.slice(0, podiIndex);
      const podi = str.slice(podiIndex, podiIndex + 4);
      const after = str.slice(podiIndex + 4);
      return (
        <>
          {before}
          <span className="font-bold text-green-300 bg-green-950/60 px-1 border border-green-500/50 dos-text-glow">
            {podi}
          </span>
          {after}
        </>
      );
    }
    return str;
  };

  return (
    <div className="w-full max-w-4xl text-center px-4 flex flex-col items-center justify-center">
      {/* Robot PODI - pojawia się pośrodku nad tekstem po "Cześć...." */}
      <div className="h-28 sm:h-32 flex items-end justify-center mb-3">
        <PodiRobot isVisible={showRobot} />
      </div>

      {/* Kontener tekstu terminala DOS z fosforową poświatą */}
      <div className="space-y-3 sm:space-y-4 flex flex-col items-center w-full">
        {/* Linia 1: Powitanie PODI w DOS */}
        <div className="inline-block relative">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-mono tracking-wider text-green-400 dos-text-glow leading-relaxed text-center">
            <span className="text-green-600 font-bold select-none mr-2">C:\&gt;</span>
            <span className="inline">{renderFormattedLine1(displayedLine1)}</span>
            {(phase === 1 || phase === 2) && (
              <span
                className="inline-block w-2.5 sm:w-3.5 h-4 sm:h-6 bg-green-400 ml-1.5 align-middle -translate-y-0.5 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.9)]"
                aria-hidden="true"
              />
            )}
          </h1>
        </div>

        {/* Linia 2: Wybierz interesujący Cię temat */}
        <div className="inline-block relative min-h-[1.75rem] sm:min-h-[2.25rem]">
          {(phase >= 2 || count2 > 0) && (
            <p className="text-sm sm:text-lg md:text-xl font-mono text-green-500/90 tracking-wide text-center">
              <span className="text-green-700 select-none mr-2">&gt;&gt;</span>
              <span className="inline">{displayedLine2}</span>
              {phase === 3 && (
                <span
                  className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-5 bg-green-500 ml-1.5 align-middle -translate-y-0.5"
                  aria-hidden="true"
                />
              )}
              {phase === 4 && (
                <span
                  className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-5 bg-green-400 ml-1.5 align-middle -translate-y-0.5 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.9)]"
                  aria-hidden="true"
                />
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
