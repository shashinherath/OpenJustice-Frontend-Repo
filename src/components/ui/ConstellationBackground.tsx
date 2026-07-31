import React, { useCallback, useEffect, useRef } from "react";

const DESKTOP_PARTICLE_COUNT = 800;
const MOBILE_PARTICLE_COUNT = 400;
const MOBILE_BREAKPOINT = 768;

const MOUSE_RADIUS = 200;
const MOUSE_RADIUS_SQUARED = MOUSE_RADIUS * MOUSE_RADIUS;

const MOUSE_FORCE = 0.08;
const HOME_RETURN_FORCE = 0.05;

const BASE_CONNECTION_DISTANCE = 83;
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
};

function getSingleStagePulse(elapsed: number): number {
  return elapsed < 300 ? Math.sin((elapsed / 300) * Math.PI) : 0;
}

function getTwoStagePulse(elapsed: number): number {
  if (elapsed < 200) {
    return Math.sin((elapsed / 200) * Math.PI);
  }
  if (elapsed >= 240 && elapsed < 440) {
    return Math.sin(((elapsed - 240) / 200) * Math.PI) * 0.75;
  }
  return 0;
}

function getThreeStagePulse(elapsed: number): number {
  if (elapsed < 150) {
    return Math.sin((elapsed / 150) * Math.PI);
  }
  if (elapsed >= 180 && elapsed < 330) {
    return Math.sin(((elapsed - 180) / 150) * Math.PI) * 0.8;
  }
  if (elapsed >= 360 && elapsed < 510) {
    return Math.sin(((elapsed - 360) / 150) * Math.PI) * 0.6;
  }
  return 0;
}

function getFiveStagePulse(elapsed: number): number {
  if (elapsed < 130) return Math.sin((elapsed / 130) * Math.PI);
  if (elapsed >= 150 && elapsed < 280) return Math.sin(((elapsed - 150) / 130) * Math.PI) * 0.9;
  if (elapsed >= 300 && elapsed < 430) return Math.sin(((elapsed - 300) / 130) * Math.PI) * 0.85;
  if (elapsed >= 450 && elapsed < 580) return Math.sin(((elapsed - 450) / 130) * Math.PI) * 0.8;
  if (elapsed >= 600 && elapsed < 730) return Math.sin(((elapsed - 600) / 130) * Math.PI) * 0.75;
  return 0;
}

function getSixStagePulse(elapsed: number): number {
  if (elapsed < 110) return Math.sin((elapsed / 110) * Math.PI);
  if (elapsed >= 125 && elapsed < 235) return Math.sin(((elapsed - 125) / 110) * Math.PI) * 0.9;
  if (elapsed >= 250 && elapsed < 360) return Math.sin(((elapsed - 250) / 110) * Math.PI) * 0.85;
  if (elapsed >= 375 && elapsed < 485) return Math.sin(((elapsed - 375) / 110) * Math.PI) * 0.8;
  if (elapsed >= 500 && elapsed < 610) return Math.sin(((elapsed - 500) / 110) * Math.PI) * 0.75;
  if (elapsed >= 625 && elapsed < 735) return Math.sin(((elapsed - 625) / 110) * Math.PI) * 0.7;
  return 0;
}

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
    // Ignore mouse interaction in the upper border / navbar area (logo, theme toggle, language switcher, login)
    if (event.clientY < 85) {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      return;
    }
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

    let nextPulseTime = 0;
    let pulseStartTime = 0;
    let pulsePattern = 0;

    let themeWaveOriginX = -1000;
    let themeWaveOriginY = -1000;
    let themeWaveStartTime = 0;

    let nextJumpyTime = 0;
    let jumpyStartTime = 0;

    const handleThemeWave = (e: any) => {
      const rect = canvas.getBoundingClientRect();
      themeWaveOriginX = (e.detail?.x ?? window.innerWidth / 2) - rect.left;
      themeWaveOriginY = (e.detail?.y ?? window.innerHeight / 2) - rect.top;
      themeWaveStartTime = Date.now();
    };
    window.addEventListener("theme-toggle-wave", handleThemeWave);

    function animate() {
      const { width, height } = viewportRef.current;
      ctx!.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const dotColor = isDark
        ? "rgba(125, 211, 252, 1)" // sky-300 (Softer, reduced brightness in dark mode)
        : "rgba(29, 78, 216, 1)"; // blue-700 (Light mode dot/line color - balanced medium royal blue)

      const baseLineOpacity = isDark ? 0.30 : 0.45; // Connector line opacity (light mode: 0.45)
      const globalAlpha = isDark ? 0.45 : 0.70; // Lower dot brightness/opacity in dark mode (light mode: 0.70)

      const now = Date.now();
      const particles = particlesRef.current;
      const count = particles.length;
      const mobile = mobileRef.current;

      const waveElapsed = now - themeWaveStartTime;
      const isThemeWaveActive = waveElapsed > 0 && waveElapsed < 550;
      const waveMaxRadius = Math.hypot(
        Math.max(themeWaveOriginX, width - themeWaveOriginX),
        Math.max(themeWaveOriginY, height - themeWaveOriginY)
      );
      const currentWaveRadius = (waveElapsed / 500) * waveMaxRadius;

      // Occasional forward-jump movement addon effect (active for 20s every 40-60s)
      if (nextJumpyTime === 0) {
        nextJumpyTime = now + 6000;
      } else if (now >= nextJumpyTime) {
        jumpyStartTime = now;
        nextJumpyTime = now + 40000 + Math.random() * 20000;
      }

      const jumpyElapsed = now - jumpyStartTime;
      const isJumpyModeActive = jumpyElapsed < 20000;
      const jumpCycle = jumpyElapsed % 450; // Periodic jump every 450ms
      const jumpBoost =
        isJumpyModeActive && jumpCycle < 120
          ? Math.sin((jumpCycle / 120) * Math.PI) * 1 // Positive-only forward hop
          : 0;

      // Trigger a subtle short-distance movement pulse across 18 clean 2D patterns
      if (nextPulseTime === 0) {
        nextPulseTime = now + 1500;
      } else if (now >= nextPulseTime) {
        pulseStartTime = now;
        nextPulseTime = now + 5000 + Math.random() * 2000;
        pulsePattern = Math.floor(Math.random() * 15); // 15 total clean 2D movement structures
      }

      const elapsed = now - pulseStartTime;
      let pulseValue = 0;
      if (pulsePattern < 3) {
        pulseValue = getSingleStagePulse(elapsed);
      } else if (pulsePattern < 8) {
        pulseValue = getTwoStagePulse(elapsed);
      } else if (pulsePattern === 8) {
        pulseValue = getThreeStagePulse(elapsed);
      } else if (pulsePattern < 12) {
        pulseValue = getFiveStagePulse(elapsed);
      } else {
        pulseValue = getSixStagePulse(elapsed);
      }

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
          let normalDx = 0;
          let normalDy = 0;

          if (particle.isFast) {
            normalDx = particle.vx;
            normalDy = particle.vy;
          } else {
            particle.x += (particle.originX - particle.x) * HOME_RETURN_FORCE;
            particle.y += (particle.originY - particle.y) * HOME_RETURN_FORCE;

            const movement = MOVEMENT_BANDS[particle.frequencyBand];
            const phase = now * movement.speed + i;

            normalDx = Math.sin(phase) * movement.amplitude;
            normalDy = Math.cos(phase) * movement.amplitude;
          }

          let finalDx = normalDx;
          let finalDy = normalDy;

          if (pulseValue > 0) {
            const dxC = particle.x - width / 2;
            const dyC = particle.y - height / 2;
            const distC = Math.hypot(dxC, dyC) || 1;

            if (pulsePattern === 0) {
              // Pattern 0: 1-Stage Forward Surge (Favorite)
              finalDx *= 1 + pulseValue * 1.6;
              finalDy *= 1 + pulseValue * 1.6;
            } else if (pulsePattern === 1) {
              // Pattern 1: 1-Stage Lateral Shift (Favorite)
              finalDx += -normalDy * pulseValue * 2.5;
              finalDy += normalDx * pulseValue * 2.5;
            } else if (pulsePattern === 2) {
              // Pattern 2: 1-Stage Diagonal Sidestep (45° Lane Change)
              finalDx += (normalDx - normalDy) * 0.707 * pulseValue * 2.2;
              finalDy += (normalDy + normalDx) * 0.707 * pulseValue * 2.2;
            } else if (pulsePattern === 3) {
              // Pattern 3: 2-Stage Double Forward Surge (Favorite)
              finalDx *= 1 + pulseValue * 1.5;
              finalDy *= 1 + pulseValue * 1.5;
            } else if (pulsePattern === 4) {
              // Pattern 4: 2-Stage Zig-Zag (Sideways Left then Sideways Right) (Favorite)
              const stageSign = elapsed < 220 ? 1 : -1;
              finalDx += stageSign * -normalDy * pulseValue * 2.5;
              finalDy += stageSign * normalDx * pulseValue * 2.5;
            } else if (pulsePattern === 5) {
              // Pattern 5: 2-Stage L-Turn (Forward then Sideways)
              if (elapsed < 220) {
                finalDx *= 1 + pulseValue * 1.6;
                finalDy *= 1 + pulseValue * 1.6;
              } else {
                finalDx += -normalDy * pulseValue * 2.5;
                finalDy += normalDx * pulseValue * 2.5;
              }
            } else if (pulsePattern === 6) {
              // Pattern 6: 2-Stage Chevron Advance (Diagonal-Left then Diagonal-Right)
              if (elapsed < 220) {
                finalDx += (normalDx - normalDy) * 0.707 * pulseValue * 2.2;
                finalDy += (normalDy + normalDx) * 0.707 * pulseValue * 2.2;
              } else {
                finalDx += (normalDx + normalDy) * 0.707 * pulseValue * 2.2;
                finalDy += (normalDy - normalDx) * 0.707 * pulseValue * 2.2;
              }
            } else if (pulsePattern === 7) {
              // Pattern 7: 2-Stage Push-and-Coast (Forward Burst then Lateral Drift)
              if (elapsed < 220) {
                finalDx *= 1 + pulseValue * 1.8;
                finalDy *= 1 + pulseValue * 1.8;
              } else {
                finalDx += -normalDy * pulseValue * 2.2;
                finalDy += normalDx * pulseValue * 2.2;
              }
            } else if (pulsePattern === 8) {
              // Pattern 8: 3-Stage Step-Step-Surge (Short-Short-Long Advance)
              if (elapsed < 340) {
                finalDx *= 1 + pulseValue * 1.1;
                finalDy *= 1 + pulseValue * 1.1;
              } else {
                finalDx *= 1 + pulseValue * 2.0;
                finalDy *= 1 + pulseValue * 2.0;
              }
            } else if (pulsePattern === 9) {
              // Pattern 9: 5-Stage Staircase Climb (Forward -> Right -> Forward -> Right -> Forward)
              const step = Math.floor(elapsed / 140);
              if (step % 2 === 0) {
                finalDx *= 1 + pulseValue * 1.6;
                finalDy *= 1 + pulseValue * 1.6;
              } else {
                finalDx += normalDy * pulseValue * 2.2;
                finalDy += -normalDx * pulseValue * 2.2;
              }
            } else if (pulsePattern === 10) {
              // Pattern 10: 5-Stage Pulse-Train (Short -> Short -> Long -> Short -> Long)
              const step = Math.floor(elapsed / 140);
              const boost = (step === 2 || step === 4) ? 2.0 : 1.1;
              finalDx *= 1 + pulseValue * boost;
              finalDy *= 1 + pulseValue * boost;
            } else if (pulsePattern === 11) {
              // Pattern 11: 5-Stage Diamond Perimeter (Up-Right -> Down-Right -> Down-Left -> Up-Left -> Settle)
              const step = Math.floor(elapsed / 140);
              const dirs = [
                [0.707, -0.707],
                [0.707, 0.707],
                [-0.707, 0.707],
                [-0.707, -0.707],
                [normalDx, normalDy]
              ];
              const d = dirs[Math.min(step, 4)];
              finalDx += d[0] * pulseValue * 2.0;
              finalDy += d[1] * pulseValue * 2.0;
            } else if (pulsePattern === 12) {
              // Pattern 12: 6-Stage Hexagon Circuit (6 Equal 60-degree turns)
              const step = Math.min(Math.floor(elapsed / 115), 5);
              const angle = step * (Math.PI / 3);
              const cosA = Math.cos(angle);
              const sinA = Math.sin(angle);
              finalDx += (normalDx * cosA - normalDy * sinA) * pulseValue * 2.0;
              finalDy += (normalDx * sinA + normalDy * cosA) * pulseValue * 2.0;
            } else if (pulsePattern === 13) {
              // Pattern 13: 6-Stage Zig-Zag Ladder (Left -> Forward -> Right -> Forward -> Left -> Forward)
              const step = Math.floor(elapsed / 115);
              if (step % 2 === 1) {
                finalDx *= 1 + pulseValue * 1.5;
                finalDy *= 1 + pulseValue * 1.5;
              } else {
                const dir = (step === 0 || step === 4) ? 1 : -1;
                finalDx += dir * -normalDy * pulseValue * 2.2;
                finalDy += dir * normalDx * pulseValue * 2.2;
              }
            } else if (pulsePattern === 14) {
              // Pattern 14: 6-Stage Box-Step & Surge (Forward -> Right -> Back -> Left -> Surge -> Surge)
              const step = Math.floor(elapsed / 115);
              if (step >= 4) {
                finalDx *= 1 + pulseValue * 1.8;
                finalDy *= 1 + pulseValue * 1.8;
              } else {
                const boxDirs = [
                  [normalDx, normalDy],
                  [normalDy, -normalDx],
                  [-normalDx, -normalDy],
                  [-normalDy, normalDx]
                ];
                const bd = boxDirs[step % 4];
                finalDx += bd[0] * pulseValue * 2.0;
                finalDy += bd[1] * pulseValue * 2.0;
              }
            }
          }

          const jumpFactor = 1 + jumpBoost;
          particle.x += finalDx * jumpFactor;
          particle.y += finalDy * jumpFactor;

          if (isThemeWaveActive) {
            const dxW = particle.x - themeWaveOriginX;
            const dyW = particle.y - themeWaveOriginY;
            const distW = Math.hypot(dxW, dyW) || 1;
            const diffW = Math.abs(distW - currentWaveRadius);

            if (diffW < 100) {
              const waveStrength = Math.sin(((100 - diffW) / 100) * (Math.PI / 2)) * 1.5;
              particle.x += (dxW / distW) * waveStrength;
              particle.y += (dyW / distW) * waveStrength;
            }
          }

          if (particle.isFast) {
            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;
          }
        }

        ctx!.beginPath();
        ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx!.fillStyle = dotColor;
        ctx!.globalAlpha = globalAlpha;
        ctx!.fill();
      }

      ctx!.lineWidth = mobile ? 0.6 : 0.8;

      for (let i = 0; i < count; i += 3) {
        const particleA = particles[i];
        let connections = 0;

        for (let j = 0; j < count && connections < 2; j += 4) {
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
      window.removeEventListener("theme-toggle-wave", handleThemeWave);
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
