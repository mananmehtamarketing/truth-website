"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight 2D canvas particle field for smoke/dust.
 * No three.js. Curl-noise inspired drift, additive blending, soft glow.
 */
type Props = {
  className?: string;
  density?: number; // 0-1
  hue?: string;
  speed?: number;
  /** When true, particles intensify with scroll velocity */
  velocityReactive?: boolean;
};

export default function SmokeCanvas({
  className = "",
  density = 0.6,
  hue = "rgba(216, 199, 163,",
  speed = 1,
  velocityReactive = true,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const veloc = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let particles: P[] = [];
    let t = 0;

    const onScroll = (e: any) => {
      veloc.current = Math.min(8, Math.abs(e.detail?.velocity ?? 0));
    };
    window.addEventListener("lenis:scroll" as any, onScroll);

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
      life: number;
      max: number;
    };

    const spawn = (count: number) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: h * (0.6 + Math.random() * 0.5),
          vx: (Math.random() - 0.5) * 0.4 * speed,
          vy: -0.2 - Math.random() * 0.6 * speed,
          r: 30 + Math.random() * 80,
          a: 0,
          life: 0,
          max: 320 + Math.random() * 380,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.floor(w * h * 0.00018 * density);
      particles = [];
      spawn(target);
    };

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const boost = velocityReactive ? 1 + veloc.current * 0.25 : 1;

      for (const p of particles) {
        p.life += 1;
        // simple curl-ish drift
        const n = Math.sin((p.x + t) * 0.005) + Math.cos((p.y - t) * 0.004);
        p.vx += n * 0.0025;
        p.x += p.vx * boost;
        p.y += p.vy * boost;
        const norm = p.life / p.max;
        p.a = Math.sin(norm * Math.PI) * 0.55;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grd.addColorStop(0, `${hue} ${0.18 * p.a * boost})`);
        grd.addColorStop(1, `${hue} 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.max || p.y < -p.r) {
          p.x = Math.random() * w;
          p.y = h * (0.85 + Math.random() * 0.2);
          p.vx = (Math.random() - 0.5) * 0.4 * speed;
          p.vy = -0.2 - Math.random() * 0.6 * speed;
          p.life = 0;
          p.max = 320 + Math.random() * 380;
          p.r = 30 + Math.random() * 80;
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("lenis:scroll" as any, onScroll);
    };
  }, [density, hue, speed, velocityReactive]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
