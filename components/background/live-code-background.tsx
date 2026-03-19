"use client";

import { useEffect, useRef } from "react";

const chars = "01";

const rainColors = ["#3B54E3", "#8B5CF6"];

const techWords = [
  "Databricks",
  "Snowflake",
  "AWS",
  "Lakehouse",
  "Spark",
  "Kafka",
  "ML Pipelines",
  "Governance",
  "Terraform",
  "Delta",
  "Analytics",
  "Streaming",
  "Unity Catalog",
  "Gold Layer",
  "Bronze Layer",
  "Silver Layer",
  "Jenkins",
  "Unity Catalog",
  "AWS Glue Catalog",
  "ETL",
  "AI/ML",
  "Data Lake",
  "Data Warehouse",
  "Delta Live Tables",
  "EMR",
  "Glue"
];

type FloatingWord = {
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  color: string;
  size: number;
};

type Trail = {
  head: number;
  length: number;
  speed: number;
};

export function LiveCodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let animationId = 0;
    let fontSize = 16;
    let columns = 0;
    let trails: Trail[] = [];
    let wordTick = 0;

    const floatingWords: FloatingWord[] = Array.from({ length: 20 }).map((_, i) => ({
      text: techWords[i % techWords.length],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: reduceMotion ? 0.00025 : 0.00025 + Math.random() * 0.002,
      opacity: 0.08 + Math.random() * 0.08,
      color: i % 2 === 0 ? "#3B54E3" : "#8B5CF6",
      size: window.innerWidth < 640 ? 12 : 14
    }));

    const setup = () => {
      const dpr = 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fontSize = width < 640 ? 16 : 18;
      columns = Math.floor(width / fontSize);

      trails = Array.from({ length: columns }, () => ({
        head: Math.random() * -40,
        length: 8 + Math.floor(Math.random() * 18),
        speed: reduceMotion ? 0.001 : 0.0045 + Math.random() * 0.003
      }));
    };

    const drawMatrixRain = () => {
      ctx.save();
      ctx.font = `700 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(139,92,246,0.8)";

      for (let i = 0; i < trails.length; i++) {
        const x = i * fontSize;
        const trail = trails[i];

        for (let j = 0; j < trail.length; j++) {
          const y = (trail.head - j) * fontSize;
          if (y < -fontSize || y > height + fontSize) continue;

          const text = chars[Math.floor(Math.random() * chars.length)];

          if (j === 0) {
            ctx.fillStyle = "rgba(255,255,255,0.05)";
          } else if (j < 3) {
            ctx.fillStyle = "rgba(167,139,250,0.05)";
          } else {
            const alpha = Math.max(0.12, 0.7 - j * 0.04);
            ctx.fillStyle = `rgba(59,84,227,${alpha * 0.05})`;
          }

          ctx.fillText(text, x, y);
        }

        trail.head += trail.speed;

        if ((trail.head - trail.length) * fontSize > height && Math.random() > 0.975) {
          trail.head = Math.random() * -20;
          trail.length = 8 + Math.floor(Math.random() * 18);
          trail.speed = reduceMotion ? 0.001 : 0.0045 + Math.random() * 0.003;
        }
      }

      ctx.restore();
    };

    const drawFloatingWords = () => {
      ctx.save();
      ctx.textBaseline = "top";

      floatingWords.forEach((word, index) => {
        ctx.font = `${word.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        const alpha = word.opacity + Math.sin((wordTick + index * 30) * 0.02) * 0.02;
        ctx.globalAlpha = Math.max(0.04, alpha);
        ctx.fillStyle = word.color;
        ctx.fillText(word.text, word.x, word.y);

        word.y += word.speed;
        word.x += Math.sin((wordTick + index * 12) * 0.01) * 0.08;

        if (word.y > height + 40) {
          word.y = -30 - Math.random() * 100;
          word.x = Math.random() * width;
          word.text = techWords[Math.floor(Math.random() * techWords.length)];
        }
      });

      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const draw = () => {
      wordTick += 1;

      ctx.fillStyle = "rgba(4, 6, 24, 0.18)";
      ctx.fillRect(0, 0, width, height);

      drawMatrixRain();
      drawFloatingWords();

      const glow1 = ctx.createRadialGradient(width * 0.2, height * 0.15, 0, width * 0.2, height * 0.15, 220);
      glow1.addColorStop(0, "rgba(59,84,227,0.04)");
      glow1.addColorStop(1, "rgba(59,84,227,0)");
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, width, height);

      const glow2 = ctx.createRadialGradient(width * 0.8, height * 0.22, 0, width * 0.8, height * 0.22, 260);
      glow2.addColorStop(0, "rgba(139,92,246,0.03)");
      glow2.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(draw);
    };

    setup();
    draw();

    const onResize = () => {
      setup();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 -z-20 opacity-100"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,84,227,0.03),transparent_18%),radial-gradient(circle_at_80%_15%,rgba(139,92,246,0.03),transparent_20%),linear-gradient(to_bottom,rgba(4,6,24,0.08),rgba(4,6,24,0.55))]" />
    </>
  );
}
