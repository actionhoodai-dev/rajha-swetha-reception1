'use client';

import { useEffect, useRef } from 'react';

export default function PetalsCanvas({ isVisible = true }) {
  const canvasRef = useRef(null);
  const isVisibleRef = useRef(isVisible);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Heart petal count
    const petalCount = 30;
    const petals = [];

    // Romantic palette for heart petals: Rose pink, coral blush, pastel crimson, warm champagne
    const heartColors = [
      { r: 240, g: 128, b: 128, a: 0.75 }, // light coral
      { r: 255, g: 160, b: 175, a: 0.8 },  // sweet rose pink
      { r: 255, g: 192, b: 203, a: 0.85 }, // soft blush pink
      { r: 220, g: 100, b: 120, a: 0.7 },  // romantic crimson
      { r: 255, g: 218, b: 185, a: 0.75 }, // peach blossom
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 8, // sized 8 to 16px for visible heart shapes
        speedX: Math.random() * 1.4 - 0.7,
        speedY: Math.random() * 1.0 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.015,
        swayAmp: Math.random() * 1.5 + 0.5,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Always advance petal positions so they drift naturally in background
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.x += p.speedX + Math.sin(time + p.swayOffset) * p.swayAmp;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x > width + 25) p.x = -25;
        if (p.x < -25) p.x = width + 25;

        // Only draw when visible (hidden on section 2 video)
        if (isVisibleRef.current) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          // 3D fluttering flip effect
          ctx.scale(Math.cos(p.flip), 1);

          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a})`;
          ctx.beginPath();

          // Precise organic heart petal shape
          const s = p.size;
          const topCurveHeight = s * 0.3;
          ctx.moveTo(0, topCurveHeight);

          // Left heart lobe
          ctx.bezierCurveTo(-s * 0.55, -s * 0.55, -s * 1.05, s * 0.35, 0, s);
          // Right heart lobe
          ctx.bezierCurveTo(s * 1.05, s * 0.35, s * 0.55, -s * 0.55, 0, topCurveHeight);

          ctx.closePath();
          ctx.fill();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="petals-canvas"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: 'none',
      }}
    />
  );
}
