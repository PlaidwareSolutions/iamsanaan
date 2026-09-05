"use client";

import { useEffect, useRef } from "react";

/**
 * Signature hero motif: a field of nodes that is tangled on the left and
 * resolves into a clean grid on the right — chaos becoming order.
 * Pure canvas, DPR-aware, paused for prefers-reduced-motion (renders one frame).
 */
export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    const spacing = 72;

    type Node = { gx: number; gy: number; phase: number; speed: number; accent: boolean };
    let nodes: Node[][] = [];

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / spacing) + 2;
      rows = Math.ceil(height / spacing) + 2;
      nodes = [];
      let accentBudget = 5;
      for (let r = 0; r < rows; r++) {
        const row: Node[] = [];
        for (let c = 0; c < cols; c++) {
          const accent = accentBudget > 0 && Math.random() < 0.008;
          if (accent) accentBudget--;
          row.push({
            gx: c * spacing,
            gy: r * spacing,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.5,
            accent,
          });
        }
        nodes.push(row);
      }
    };

    /** amplitude of displacement: large on the left, ~0 on the right */
    const ampAt = (x: number) => {
      const p = Math.min(Math.max(x / width, 0), 1);
      return Math.pow(1 - p, 2.2) * spacing * 0.9;
    };

    const posAt = (n: Node, t: number) => {
      const amp = ampAt(n.gx);
      const wobble = reduced ? 1 : Math.sin(t * n.speed + n.phase);
      const wobble2 = reduced ? 1 : Math.cos(t * n.speed * 0.8 + n.phase * 1.7);
      return {
        x: n.gx + amp * wobble * 0.9,
        y: n.gy + amp * wobble2 * 0.7,
      };
    };

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);

      // connections to right + down neighbors
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n = nodes[r][c];
          const p = posAt(n, t);
          const xp = Math.min(Math.max(n.gx / width, 0), 1);
          const lineAlpha = 0.05 + xp * 0.09;
          ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
          ctx.lineWidth = 1;

          if (c + 1 < cols) {
            const q = posAt(nodes[r][c + 1], t);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
          if (r + 1 < rows) {
            const q = posAt(nodes[r + 1][c], t);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n = nodes[r][c];
          const p = posAt(n, t);
          const xp = Math.min(Math.max(n.gx / width, 0), 1);
          if (n.accent) {
            ctx.fillStyle = "rgba(41, 151, 255, 0.9)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.14 + xp * 0.26})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      build();
      if (reduced) draw(0);
    });
    ro.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
