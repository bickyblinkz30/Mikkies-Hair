"use client";

import { useEffect, useRef } from "react";

interface GoldParticlesProps {
  density?: number;
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function GoldParticles({ density = 80, speed = 0.25 }: GoldParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    const particles: Particle[] = [];
    const count = Math.floor(density * (window.innerWidth / 1920));

    const hue = 43;
    const palette = [
      `hsla(${hue}, 80%, 60%,`,
      `hsla(${hue + 5}, 75%, 70%,`,
      `hsla(${hue - 3}, 85%, 50%,`,
      `hsla(${hue + 10}, 70%, 75%,`,
      `hsla(${hue - 5}, 90%, 45%,`,
    ];

    for (let i = 0; i < count; i++) {
      const maxLife = 200 + Math.random() * 400;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed * 0.4,
        vy: -Math.random() * speed * 0.3,
        size: 0.8 + Math.random() * 2.2,
        alpha: 0,
        life: 0,
        maxLife,
      });
    }

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.0006;
        p.vx += (Math.random() - 0.5) * 0.02;

        if (p.life < 30) p.alpha = p.life / 30;
        else if (p.life > p.maxLife - 40)
          p.alpha = Math.max(0, (p.maxLife - p.life) / 40);
        else p.alpha = 1;

        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 5;
          p.vx = (Math.random() - 0.5) * speed * 0.4;
          p.vy = -Math.random() * speed * 0.35 - 0.03;
          p.alpha = 0;
          p.maxLife = 200 + Math.random() * 500;
        }

        const colorIdx = Math.floor(Math.random() * palette.length);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${palette[colorIdx]} ${p.alpha})`;
        ctx.fill();

        if (p.alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${palette[colorIdx]} ${p.alpha * 0.08})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    const ro = new ResizeObserver(() => resize());
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
