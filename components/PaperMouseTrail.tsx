'use client';

import { useEffect, useState, useRef } from 'react';

interface PaperPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

// Żywe, wyraziste kolory farb drukarskich CMYK i próbek poligraficznych
const PRINT_COLORS = [
  '#00d4f0', // Cyan
  '#ff2a85', // Magenta
  '#ffd000', // Yellow
  '#10b981', // Print green
  '#8b5cf6', // Violet
  '#ff6b00', // Orange
  '#3b82f6', // Cobalt
  '#ec4899', // Pink
];

export default function PaperMouseTrail() {
  const [particles, setParticles] = useState<PaperPiece[]>([]);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const nextId = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (!lastMousePos.current) {
        lastMousePos.current = { x: mouseX, y: mouseY };
        return;
      }

      const dx = mouseX - lastMousePos.current.x;
      const dy = mouseY - lastMousePos.current.y;
      const dist = Math.hypot(dx, dy);

      // Generowanie mniejszych karteczek
      if (dist > 8) {
        lastMousePos.current = { x: mouseX, y: mouseY };

        const count = dist > 40 ? 2 : 1;
        const newPieces: PaperPiece[] = [];

        for (let i = 0; i < count; i++) {
          const color = PRINT_COLORS[Math.floor(Math.random() * PRINT_COLORS.length)];
          // Zmniejszone wymiary karteczek: 5-8px szerokości, 7-11px wysokości (drobne papierki)
          const width = 5 + Math.floor(Math.random() * 4);
          const height = 7 + Math.floor(Math.random() * 5);
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.6;
          const speed = (Math.random() * 1.8 + 1) * (Math.min(dist, 40) / 25);

          newPieces.push({
            id: nextId.current++,
            x: mouseX + (Math.random() - 0.5) * 8,
            y: mouseY + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * speed * 0.35 + (Math.random() - 0.5) * 0.6,
            vy: Math.sin(angle) * speed * 0.35 + 0.5 + Math.random() * 0.5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            width,
            height,
            color,
            opacity: 0.95,
            life: 0,
            maxLife: 40 + Math.floor(Math.random() * 20),
          });
        }

        setParticles((prev) => [...prev.slice(-30), ...newPieces]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animacja ruchu i kołysania małych karteczek
    const updatePhysics = () => {
      setParticles((prevParticles) => {
        if (prevParticles.length === 0) return prevParticles;

        return prevParticles
          .map((p) => {
            const nextLife = p.life + 1;
            const progress = nextLife / p.maxLife;
            const nextOpacity = progress > 0.65 ? (1 - progress) / 0.35 : 0.95;

            return {
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              vx: p.vx * 0.95 + Math.sin(nextLife * 0.18) * 0.3,
              vy: p.vy * 0.96 + 0.07,
              rotation: p.rotation + p.rotationSpeed,
              opacity: Math.max(0, nextOpacity),
              life: nextLife,
            };
          })
          .filter((p) => p.life < p.maxLife && p.opacity > 0.02);
      });

      animationFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameId.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            borderRadius: '1px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
            border: '0.5px solid rgba(255, 255, 255, 0.6)',
            willChange: 'transform, opacity, left, top',
          }}
        />
      ))}
    </div>
  );
}
