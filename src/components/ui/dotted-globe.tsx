"use client";

import { useRef, useEffect, useCallback, useState } from "react";

// ── Linear algebra ─────────────────────────────────────────────────────────────

type Vec3 = [number, number, number];
type Mat3 = [number, number, number, number, number, number, number, number, number];

const rotY = (a: number): Mat3 => {
  const c = Math.cos(a), s = Math.sin(a);
  return [c, 0, s, 0, 1, 0, -s, 0, c];
};

const rotX = (a: number): Mat3 => {
  const c = Math.cos(a), s = Math.sin(a);
  return [1, 0, 0, 0, c, -s, 0, s, c];
};

const mulM = (a: Mat3, b: Mat3): Mat3 => [
  a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
  a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
  a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
  a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
  a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
  a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
  a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
  a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
  a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
];

const applyM = (m: Mat3, v: Vec3): Vec3 => [
  m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
  m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
  m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
];

// ── Land polygons [lon, lat] ───────────────────────────────────────────────────

const LAND: [number, number][][] = [
  // North America
  [
    [-168, 72], [-140, 70], [-130, 58], [-125, 50], [-124, 37], [-118, 34],
    [-117, 32], [-105, 20], [-92, 16], [-83, 10], [-78, 8], [-77, 9],
    [-82, 8], [-85, 10], [-90, 18], [-88, 15], [-87, 16], [-83, 8],
    [-80, 9], [-76, 8], [-62, 11], [-65, 18], [-67, 17], [-70, 19],
    [-75, 18], [-80, 25], [-82, 29], [-80, 32], [-75, 35], [-77, 38],
    [-71, 42], [-67, 47], [-64, 44], [-60, 46], [-53, 47], [-56, 52],
    [-64, 58], [-70, 58], [-82, 62], [-92, 68], [-100, 73], [-118, 73],
    [-140, 70], [-165, 68], [-168, 72],
  ],
  // South America
  [
    [-75, 12], [-62, 11], [-60, 6], [-52, 4], [-50, 2], [-48, -3],
    [-35, -7], [-35, -10], [-38, -13], [-40, -20], [-43, -23], [-48, -27],
    [-52, -33], [-56, -38], [-62, -40], [-65, -45], [-68, -55], [-70, -53],
    [-68, -48], [-65, -46], [-62, -43], [-57, -38], [-53, -34], [-52, -30],
    [-50, -28], [-43, -22], [-40, -19], [-38, -14], [-38, -8], [-35, -8],
    [-35, -5], [-38, -2], [-42, -2], [-45, -2], [-48, -3], [-52, 2],
    [-52, 4], [-55, 5], [-60, 7], [-65, 10], [-72, 12], [-75, 12],
  ],
  // Europe
  [
    [-9, 36], [10, 36], [13, 38], [15, 38], [18, 40], [20, 38],
    [23, 38], [28, 41], [32, 42], [28, 45], [32, 48], [28, 50],
    [22, 55], [18, 58], [15, 58], [12, 58], [10, 56], [8, 55],
    [10, 58], [5, 58], [0, 58], [-5, 54], [-5, 50], [-2, 49],
    [-5, 43], [-9, 40], [-9, 36],
  ],
  // Africa
  [
    [-18, 15], [-18, 12], [-15, 10], [-15, 5], [-10, 5], [-5, 5],
    [0, 5], [5, 2], [10, 1], [15, 1], [18, 5], [22, 8],
    [28, 12], [35, 15], [40, 10], [44, 12], [45, 8], [42, 2],
    [40, -3], [38, -10], [36, -18], [34, -22], [30, -27], [28, -32],
    [25, -35], [20, -34], [18, -34], [17, -30], [14, -22], [12, -18],
    [10, -15], [8, -12], [5, -5], [2, -5], [-2, -5], [-5, -5],
    [-10, 0], [-15, 4], [-18, 10], [-18, 15],
  ],
  // Eurasia (West + Central + South Asia)
  [
    [28, 45], [32, 48], [36, 50], [40, 42], [45, 42], [50, 40],
    [55, 40], [60, 44], [68, 38], [72, 38], [75, 34], [80, 30],
    [85, 28], [88, 24], [90, 22], [95, 22], [98, 20], [100, 18],
    [104, 20], [108, 18], [110, 20], [115, 20], [118, 22], [120, 24],
    [122, 26], [118, 32], [115, 36], [110, 38], [105, 42], [100, 42],
    [95, 42], [88, 44], [85, 48], [80, 52], [75, 52], [68, 55],
    [60, 62], [55, 68], [50, 70], [45, 68], [40, 65], [38, 58],
    [35, 55], [28, 50], [28, 45],
  ],
  // Siberia / Russian Far East
  [
    [60, 62], [65, 60], [70, 65], [75, 62], [80, 62], [85, 58],
    [90, 62], [95, 62], [100, 60], [105, 55], [110, 52], [115, 50],
    [120, 50], [125, 48], [130, 48], [135, 50], [140, 52], [142, 55],
    [145, 58], [148, 60], [148, 62], [145, 65], [140, 68], [135, 68],
    [130, 70], [120, 70], [110, 72], [100, 70], [90, 70], [80, 70],
    [70, 72], [60, 68], [60, 62],
  ],
  // East Asia coastline + SE Asia
  [
    [120, 24], [122, 26], [122, 30], [121, 32], [120, 36], [122, 38],
    [124, 38], [126, 36], [128, 34], [130, 32], [132, 34], [134, 36],
    [136, 36], [138, 36], [140, 38], [141, 40], [140, 42], [138, 40],
    [136, 38], [134, 40], [132, 40], [130, 42], [128, 42], [126, 40],
    [125, 38], [124, 36], [122, 34], [120, 32], [119, 28], [118, 24],
    [116, 22], [114, 22], [110, 20], [108, 18], [104, 20], [102, 18],
    [100, 14], [100, 10], [102, 6], [104, 4], [103, 2], [104, 2],
    [103, 1], [104, -1], [104, 1], [100, 4], [100, 6], [99, 6],
    [100, 8], [102, 12], [104, 16], [106, 16], [108, 14], [110, 12],
    [115, 10], [118, 10], [120, 14], [120, 18], [120, 24],
  ],
  // Australia
  [
    [115, -22], [120, -18], [125, -14], [130, -12], [135, -13],
    [138, -14], [140, -16], [142, -18], [145, -18], [148, -14],
    [152, -12], [154, -12], [155, -14], [154, -18], [150, -22],
    [150, -26], [152, -30], [153, -32], [152, -34], [150, -36],
    [148, -38], [146, -38], [142, -38], [138, -35], [134, -33],
    [130, -32], [126, -32], [124, -34], [122, -34], [118, -32],
    [115, -28], [113, -24], [115, -22],
  ],
  // Greenland
  [
    [-48, 60], [-25, 60], [-20, 65], [-18, 70], [-20, 75], [-25, 78],
    [-32, 82], [-42, 83], [-52, 82], [-58, 78], [-58, 73], [-55, 68],
    [-50, 63], [-48, 60],
  ],
  // Antarctica
  [[-180, -68], [180, -68], [180, -90], [-180, -90]],
  // India (subcontinent detail)
  [
    [65, 22], [68, 24], [72, 22], [75, 22], [78, 20], [80, 18],
    [82, 16], [80, 14], [78, 12], [77, 8], [76, 8], [75, 12],
    [73, 14], [72, 18], [70, 20], [68, 22], [65, 22],
  ],
  // Japan
  [
    [130, 31], [132, 33], [134, 34], [136, 36], [138, 38], [140, 40],
    [142, 42], [143, 44], [141, 44], [139, 42], [137, 40], [135, 36],
    [133, 34], [131, 33], [130, 31],
  ],
  // New Guinea
  [
    [132, -2], [136, -4], [140, -4], [144, -6], [147, -6], [148, -8],
    [145, -8], [142, -6], [138, -6], [134, -4], [132, -4], [130, -2], [132, -2],
  ],
  // Sumatra
  [
    [95, 5], [100, 3], [102, 2], [104, 1], [105, -1], [104, -3],
    [102, -4], [100, -5], [98, -4], [96, -3], [95, -1], [95, 5],
  ],
  // Borneo
  [
    [108, 7], [112, 7], [117, 5], [119, 4], [118, 2], [117, 1],
    [115, -1], [112, -2], [110, -2], [108, 1], [108, 4], [108, 7],
  ],
  // Madagascar
  [[44, -12], [48, -12], [50, -16], [50, -20], [48, -24], [44, -25], [44, -16], [44, -12]],
  // British Isles
  [[-5, 50], [-2, 50], [0, 52], [-1, 54], [-2, 55], [-3, 57], [-4, 58], [-6, 56], [-6, 54], [-5, 52], [-5, 50]],
  // New Zealand (North Island)
  [[172, -37], [175, -37], [178, -38], [178, -41], [175, -41], [172, -41], [170, -40], [172, -37]],
  // New Zealand (South Island)
  [[168, -44], [172, -44], [175, -46], [174, -48], [170, -46], [168, -44]],
  // Iceland
  [[-24, 63], [-14, 63], [-13, 65], [-15, 66], [-22, 66], [-24, 65], [-24, 63]],
  // Sri Lanka
  [[80, 10], [82, 9], [82, 7], [80, 6], [80, 8], [80, 10]],
  // Taiwan
  [[120, 22], [122, 22], [122, 25], [120, 25], [120, 22]],
];

// ── Land mask (offscreen canvas → pixel lookup) ────────────────────────────────

const MW = 720, MH = 360;
let cachedMask: Uint8Array | null = null;

function buildMask(): Uint8Array {
  if (cachedMask) return cachedMask;
  const cv = document.createElement("canvas");
  cv.width = MW; cv.height = MH;
  const c = cv.getContext("2d")!;
  c.fillStyle = "#000";
  c.fillRect(0, 0, MW, MH);
  c.fillStyle = "#fff";
  for (const poly of LAND) {
    c.beginPath();
    poly.forEach(([lon, lat], i) => {
      const px = ((lon + 180) / 360) * MW;
      const py = ((90 - lat) / 180) * MH;
      if (i === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    });
    c.closePath();
    c.fill();
  }
  const px = c.getImageData(0, 0, MW, MH).data;
  cachedMask = new Uint8Array(MW * MH);
  for (let i = 0; i < cachedMask.length; i++) cachedMask[i] = px[i * 4] > 64 ? 1 : 0;
  return cachedMask;
}

function isLand(lat: number, lon: number, mask: Uint8Array): boolean {
  const x = Math.max(0, Math.min(MW - 1, Math.floor(((lon + 180) / 360) * MW)));
  const y = Math.max(0, Math.min(MH - 1, Math.floor(((90 - lat) / 180) * MH)));
  return mask[y * MW + x] === 1;
}

// ── Dot generation (Fibonacci sphere) ─────────────────────────────────────────

interface Dot {
  x: number; y: number; z: number;
  land: boolean;
}

function makeDots(n: number, mask: Uint8Array): Dot[] {
  const ga = Math.PI * (3 - Math.sqrt(5));
  const dots: Dot[] = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const t = ga * i;
    const x = Math.cos(t) * r;
    const z = Math.sin(t) * r;
    const lat = Math.asin(Math.max(-1, Math.min(1, y))) * (180 / Math.PI);
    const lon = Math.atan2(z, x) * (180 / Math.PI);
    dots.push({ x, y, z, land: isLand(lat, lon, mask) });
  }
  return dots;
}

// ── Globe component ────────────────────────────────────────────────────────────

interface GlobeState {
  rot: Mat3;
  vel: [number, number];
  dragging: boolean;
  lastXY: [number, number];
  recentD: [number, number, number][];
  dots: Dot[];
  autoFade: number;
}

export default function DottedGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursor, setCursor] = useState<"grab" | "grabbing" | "default">("default");
  // Desktop only: drag to rotate. Mobile stays auto-rotate (page scroll works).
  const [interactive, setInteractive] = useState(false);

  const S = useRef<GlobeState>({
    rot: mulM(rotX(-0.18), rotY(-0.35)),
    vel: [0, 0],
    dragging: false,
    lastXY: [0, 0],
    recentD: [],
    dots: [],
    autoFade: 1,
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      const on = mq.matches;
      setInteractive(on);
      setCursor(on ? "grab" : "default");
      if (!on) S.current.dragging = false;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Build dots after mount
  useEffect(() => {
    const mask = buildMask();
    S.current.dots = makeDots(30000, mask);
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const AUTO_V = 0.007;
    const DAMP = 0.905;

    function frame() {
      const st = S.current;
      if (!canvas || !st.dots.length) { raf = requestAnimationFrame(frame); return; }

      const dpr = window.devicePixelRatio || 1;
      const lw = canvas.clientWidth, lh = canvas.clientHeight;
      const tw = Math.round(lw * dpr), th = Math.round(lh * dpr);
      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw;
        canvas.height = th;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, lw, lh);

      const cx = lw / 2, cy = lh / 2;
      const baseR = Math.min(lw, lh) * 0.35;
      const isMobile = window.innerWidth < 1024;

      const R = baseR;

      // Lerp auto-rotation fade
      st.autoFade += ((st.dragging ? 0 : 1) - st.autoFade) * 0.025;

      // Physics
      if (!st.dragging) {
        st.vel[0] *= DAMP;
        st.vel[1] *= DAMP;
        if (Math.abs(st.vel[0]) < 5e-5) st.vel[0] = 0;
        if (Math.abs(st.vel[1]) < 5e-5) st.vel[1] = 0;

        const [vx, vy] = st.vel;
        if (vx || vy) st.rot = mulM(rotY(vx), mulM(rotX(vy), st.rot));

        const av = AUTO_V * st.autoFade;
        if (av > 5e-5) st.rot = mulM(rotY(av), st.rot);
      }

      // ── Beige globe base (matches site background family) ──
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = "#F4F0EA";
      ctx.fill();

      // ── Inner glow — warm diffused light from just inside center ──
      const innerGlow = ctx.createRadialGradient(
        cx - R * 0.18, cy - R * 0.22, 0,
        cx, cy, R * 0.92
      );
      innerGlow.addColorStop(0,   "rgba(253, 250, 243, 0.85)");
      innerGlow.addColorStop(0.3, "rgba(250, 246, 238, 0.35)");
      innerGlow.addColorStop(0.7, "rgba(240, 234, 222, 0.10)");
      innerGlow.addColorStop(1,   "rgba(232, 224, 208, 0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // ── Limb darkening — edge of sphere falls into shadow ──
      const limb = ctx.createRadialGradient(cx, cy, R * 0.58, cx, cy, R);
      limb.addColorStop(0,   "rgba(120, 108, 85, 0.0)");
      limb.addColorStop(0.75,"rgba(120, 108, 85, 0.04)");
      limb.addColorStop(0.9, "rgba(105, 93, 70, 0.12)");
      limb.addColorStop(1,   "rgba(90, 78, 56, 0.24)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = limb;
      ctx.fill();

      // ── Dots ──
      const m = st.rot;
      // Key light: upper-left, in front; fill light: right, softer
      const lx = -0.40, ly = -0.50, lz = 0.76;
      const fx =  0.55, fy =  0.10, fz = 0.60; // fill/bounce light

      // Keep a thin band of the back hemisphere so dots fade past the silhouette
      const FADE_BAND = 0.18;
      const visible: { sx: number; sy: number; rz: number; land: boolean; key: number; fill: number }[] = [];
      for (const d of st.dots) {
        const [rx, ry, rz] = applyM(m, [d.x, d.y, d.z]);
        if (rz < -FADE_BAND) continue;
        const sx = cx + rx * R;
        const sy = cy - ry * R;
        const key  = Math.max(0, rx * lx + ry * ly + rz * lz);
        const fill = Math.max(0, rx * fx + ry * fy + rz * fz) * 0.28;
        visible.push({ sx, sy, rz, land: d.land, key, fill });
      }
      visible.sort((a, b) => a.rz - b.rz);

      for (const { sx, sy, rz, land, key, fill } of visible) {
        const depthT = Math.max(0, rz + FADE_BAND) / (1 + FADE_BAND); // 0..1
        const depthFade = depthT * depthT * (3 - 2 * depthT);          // smoothstep

        if (land) {
          // Warm taupe — matches site cream palette, still readable on #F4F0EA.
          // Mobile: lighter base color and softer alpha.
          const lightness = key * 0.22 + fill * 0.12;
          const alpha = depthFade * ((isMobile ? 0.42 : 0.72) - lightness * 0.15);
          if (alpha < 0.02) continue;
          const dr = (1.1 + depthT * 0.7) * (isMobile ? 0.75 : 1);
          ctx.beginPath();
          ctx.arc(sx, sy, dr, 0, Math.PI * 2);
          const base = isMobile ? 200 : 139;
          const r = Math.round(base + (1 - depthFade) * 42);
          const g = Math.round(base - 9 + (1 - depthFade) * 45);
          const b = Math.round(base - 21 + (1 - depthFade) * 45);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
          ctx.fill();
        } else {
          const alpha = depthFade * (rz * 0.08 + key * 0.03) * (isMobile ? 0.7 : 1);
          if (alpha < 0.01) continue;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.58, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${isMobile ? "200,193,180" : "180,172,158"},${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      // ── Specular highlight — crisp catch-light upper-left ──
      const spec = ctx.createRadialGradient(
        cx - R * 0.34, cy - R * 0.36, 0,
        cx - R * 0.22, cy - R * 0.24, R * 0.52
      );
      spec.addColorStop(0,   "rgba(255,252,244,0.40)");
      spec.addColorStop(0.35,"rgba(255,252,244,0.12)");
      spec.addColorStop(0.7, "rgba(255,252,244,0.03)");
      spec.addColorStop(1,   "rgba(255,252,244,0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = spec;
      ctx.fill();

      // ── Rim light — subtle cool gleam along lower-right edge ──
      const rim = ctx.createRadialGradient(
        cx + R * 0.55, cy + R * 0.45, R * 0.55,
        cx + R * 0.55, cy + R * 0.45, R * 1.05
      );
      rim.addColorStop(0,   "rgba(235,225,205,0.0)");
      rim.addColorStop(0.55,"rgba(235,225,205,0.07)");
      rim.addColorStop(1,   "rgba(235,225,205,0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Input helpers ──────────────────────────────────────────────────────────

  const getR = () =>
    canvasRef.current
      ? Math.min(canvasRef.current.clientWidth, canvasRef.current.clientHeight) * 0.35
      : 200;

  const applyDrag = (dx: number, dy: number) => {
    const f = 1.85 / getR();
    S.current.rot = mulM(rotY(dx * f), mulM(rotX(dy * f), S.current.rot));
  };

  const flushVelocity = () => {
    const rd = S.current.recentD;
    if (rd.length >= 2) {
      const dt = rd[rd.length - 1][2] - rd[0][2];
      if (dt > 0 && dt < 300) {
        const tdx = rd.reduce((s, d) => s + d[0], 0);
        const tdy = rd.reduce((s, d) => s + d[1], 0);
        const f = (16 / dt) * (1.85 / getR());
        const cap = 0.09;
        S.current.vel[0] = Math.max(-cap, Math.min(cap, tdx * f));
        S.current.vel[1] = Math.max(-cap, Math.min(cap, tdy * f));
      }
    }
  };

  // ── Mouse ──────────────────────────────────────────────────────────────────

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!interactive) return;
    S.current.dragging = true;
    S.current.lastXY = [e.clientX, e.clientY];
    S.current.recentD = [];
    S.current.vel = [0, 0];
    setCursor("grabbing");
    e.preventDefault();
  }, [interactive]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!interactive || !S.current.dragging) return;
    const dx = e.clientX - S.current.lastXY[0];
    const dy = e.clientY - S.current.lastXY[1];
    applyDrag(dx, dy);
    S.current.recentD.push([dx, dy, performance.now()]);
    if (S.current.recentD.length > 6) S.current.recentD.shift();
    S.current.lastXY = [e.clientX, e.clientY];
  }, [interactive]);

  const onMouseUp = useCallback(() => {
    if (!interactive || !S.current.dragging) return;
    S.current.dragging = false;
    flushVelocity();
    setCursor("grab");
  }, [interactive]);

  const onMouseLeave = useCallback(() => {
    if (!interactive) return;
    if (S.current.dragging) { S.current.dragging = false; setCursor("grab"); }
  }, [interactive]);

  // ── Touch (desktop only; mobile is auto-rotate) ────────────────────────────

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!interactive) return;
    const t = e.touches[0];
    S.current.dragging = true;
    S.current.lastXY = [t.clientX, t.clientY];
    S.current.recentD = [];
    S.current.vel = [0, 0];
  }, [interactive]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!interactive || !S.current.dragging) return;
    const t = e.touches[0];
    const dx = t.clientX - S.current.lastXY[0];
    const dy = t.clientY - S.current.lastXY[1];
    applyDrag(dx, dy);
    S.current.recentD.push([dx, dy, performance.now()]);
    if (S.current.recentD.length > 6) S.current.recentD.shift();
    S.current.lastXY = [t.clientX, t.clientY];
  }, [interactive]);

  const onTouchEnd = useCallback(() => {
    if (!interactive || !S.current.dragging) return;
    S.current.dragging = false;
    flushVelocity();
  }, [interactive]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          cursor,
          touchAction: interactive ? "none" : "pan-y",
          display: "block",
          pointerEvents: interactive ? "auto" : "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    </div>
  );
}
