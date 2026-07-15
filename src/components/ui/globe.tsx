"use client";

import { useCallback, useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 1092,
  height: 1092,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0.3,
  theta: 0.2,
  dark: 0,
  diffuse: 0.55,
  mapSamples: 20000,
  mapBrightness: 1.5,
  baseColor: [1, 1, 1],
  markerColor: [0.05, 0.05, 0.05],
  glowColor: [1, 1, 1],
  scale: 1,
  markers: [{ location: [25.2048, 55.2708], size: 0.08 }],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(config.phi ?? 0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  const initGlobe = useCallback(() => {
    if (!canvasRef.current) return;

    widthRef.current = canvasRef.current.offsetWidth;

    try {
      globeRef.current = createGlobe(canvasRef.current, {
        ...config,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
        onRender: (state) => {
          if (!pointerInteracting.current) phiRef.current += 0.005;
          state.phi = phiRef.current + rs.get();
          state.width = widthRef.current * 2;
          state.height = widthRef.current * 2;
        },
      });

      canvasRef.current.style.opacity = "1";
    } catch {
      // WebGL context unavailable, skip rendering
    }
  }, [config, rs]);

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        globeRef.current?.destroy();
        globeRef.current = null;
      } else {
        initGlobe();
      }
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      globeRef.current?.destroy();
      globeRef.current = null;
    };

    const onContextRestored = () => {
      initGlobe();
    };

    const canvas = canvasRef.current;

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    canvas?.addEventListener("webglcontextlost", onContextLost);
    canvas?.addEventListener("webglcontextrestored", onContextRestored);

    onResize();
    initGlobe();

    return () => {
      globeRef.current?.destroy();
      globeRef.current = null;
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas?.removeEventListener("webglcontextlost", onContextLost);
      canvas?.removeEventListener("webglcontextrestored", onContextRestored);
    };
  }, [rs, config, initGlobe]);

  return (
    <div className={cn("relative size-full", className)}>
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
