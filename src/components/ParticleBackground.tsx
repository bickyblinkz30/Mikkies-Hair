"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacityDelta: number;
  gold: boolean;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 120;

    const resize = () => {
      canvas.width  = document.documentElement.scrollWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    const createParticle = (): Particle => ({
      x:            Math.random() * canvas.width,
      y:            Math.random() * canvas.height,
      size:         Math.random() * 2 + 0.5,
      speedX:       (Math.random() - 0.5) * 0.4,
      speedY:       (Math.random() - 0.5) * 0.4,
      opacity:      Math.random() * 0.6 + 0.1,
      opacityDelta: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      gold:         Math.random() < 0.25,
    });

    const init = () => {
      resize();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        p.opacity += p.opacityDelta;
        if (p.opacity <= 0.05 || p.opacity >= 0.75) p.opacityDelta *= -1;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        const color = p.gold
          ? `rgba(212,175,55,${p.opacity})`
          : `rgba(255,255,255,${p.opacity})`;

        ctx.fillStyle = color;

        if (p.gold) {
          ctx.shadowBlur  = 6;
          ctx.shadowColor = `rgba(212,175,55,${p.opacity * 0.8})`;
        } else {
          ctx.shadowBlur  = 3;
          ctx.shadowColor = `rgba(255,255,255,${p.opacity * 0.5})`;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      init();
    };

    init();
    draw();

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:  "fixed",
        top:       0,
        left:      0,
        width:     "100%",
        height:    "100%",
        pointerEvents: "none",
        zIndex:    0,
      }}
    />
  );
}
