import React, { useCallback, useEffect, useRef } from "react";

const DESKTOP_PARTICLE_COUNT = 800;
const MOBILE_PARTICLE_COUNT = 400;
const MOBILE_BREAKPOINT = 768;

const MOUSE_RADIUS = 200;
const MOUSE_RADIUS_SQUARED = MOUSE_RADIUS * MOUSE_RADIUS;

const MOUSE_FORCE = 0.08;
const HOME_RETURN_FORCE = 0.02;

const BASE_CONNECTION_DISTANCE = 80;
const BASE_CONNECTION_DISTANCE_SQUARED = BASE_CONNECTION_DISTANCE * BASE_CONNECTION_DISTANCE;

const MOVEMENT_BANDS = [
  { speed: 0.0003, amplitude: 1.5 },
  { speed: 0.0005, amplitude: 1.2 },
  { speed: 0.0007, amplitude: 0.9 },
];

const canvasPerformanceStyle = {
  willChange: "transform",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
};

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  frequencyBand: number;
  isFast: boolean;
  vx: number;
  vy: number;
}

interface ConstellationBackgroundProps {
  className?: string;
}

const ConstellationBackground: React.FC<ConstellationBackgroundProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const viewportRef = useRef({ width: 0, height: 0 });
  const mobileRef = useRef(false);

  const createParticles = useCallback((width: number, height: number, isMobile: boolean) => {
    const count = isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;
    const sizeMultiplier = isMobile ? 0.5 : 1;
    const particles: Particle[] = new Array(count);

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const isFast = Math.random() < 0.1;

      particles[i] = {
        x,
        y,
        originX: x,
        originY: y,
        size: (0.6 + Math.random() * 1.8) * sizeMultiplier,
        frequencyBand: i % 3,
        isFast,
        // Fast particles get a straight line velocity
        vx: isFast ? (Math.random() - 0.5) * 3 : 0,
        vy: isFast ? (Math.random() - 0.5) * 3 : 0,
      };
    }
    return particles;
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const wasMobile = mobileRef.current;
    const isMobile = width < MOBILE_BREAKPOINT;
    mobileRef.current = isMobile;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    viewportRef.current = { width, height };

    if (wasMobile !== isMobile || particlesRef.current.length === 0) {
      particlesRef.current = createParticles(width, height, isMobile);
    }
  }, [createParticles]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = event.clientX - rect.left;
    mouseRef.current.y = event.clientY - rect.top;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    mobileRef.current = isMobile;
    
    particlesRef.current = createParticles(window.innerWidth, window.innerHeight, isMobile);
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [createParticles, resizeCanvas, handleMouseMove, handleMouseLeave]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    function animate() {
      const { width, height } = viewportRef.current;
      ctx!.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const dotColor = isDark
        ? "rgba(125, 211, 252, 1)" // sky-300
        : "rgba(37, 99, 235, 1)"; // blue-600
        
      const baseLineOpacity = isDark ? 0.3 : 0.4;
      const globalAlpha = isDark ? 0.5 : 0.6;
      
      const now = Date.now();
      const particles = particlesRef.current;
      const count = particles.length;
      const mobile = mobileRef.current;

      for (let i = 0; i < count; i++) {
        const particle = particles[i];

        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < MOUSE_RADIUS_SQUARED) {
          const distance = Math.sqrt(distanceSquared);
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          particle.x += dx * force * MOUSE_FORCE;
          particle.y += dy * force * MOUSE_FORCE;
        } else {
          if (particle.isFast) {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;
          } else {
            particle.x += (particle.originX - particle.x) * HOME_RETURN_FORCE;
            particle.y += (particle.originY - particle.y) * HOME_RETURN_FORCE;

            const movement = MOVEMENT_BANDS[particle.frequencyBand];
            const phase = now * movement.speed + i;

            particle.x += Math.sin(phase) * movement.amplitude;
            particle.y += Math.cos(phase) * movement.amplitude;
          }
        }

        ctx!.beginPath();
        ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx!.fillStyle = dotColor;
        ctx!.globalAlpha = globalAlpha;
        ctx!.fill();
      }

      ctx!.lineWidth = mobile ? 0.6 : 0.8;

      for (let i = 0; i < count; i += 4) {
        const particleA = particles[i];
        let connections = 0;

        for (let j = 0; j < count && connections < 2; j += 5) {
          const particleB = particles[j];
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared > 0 && distanceSquared < BASE_CONNECTION_DISTANCE_SQUARED) {
            const distance = Math.sqrt(distanceSquared);
            
            ctx!.beginPath();
            ctx!.moveTo(particleA.x, particleA.y);
            ctx!.lineTo(particleB.x, particleB.y);
            
            const opacity = baseLineOpacity * (1 - distance / BASE_CONNECTION_DISTANCE);
            ctx!.strokeStyle = dotColor;
            ctx!.globalAlpha = opacity;
            ctx!.stroke();

            connections++;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={canvasPerformanceStyle}
    />
  );
};

export default ConstellationBackground;
