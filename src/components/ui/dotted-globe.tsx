"use client";

import { useRef, useEffect, useCallback, useState } from "react";

// ── Linear algebra ─────────────────────────────────────────────────────────────

type Vec3 = [number, number, number];
type Mat3 = [number, number, number, number, number, number, number, number, number];

const identity = (): Mat3 => [1, 0, 0, 0, 1, 0, 0, 0, 1];

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
      i === 0 ? c.moveTo(px, py) : c.lineTo(px, py);
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
  phase: number; // pre-computed spatial wave phase, fixed in globe space
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
    // Spatial phase: weighted dot-product with an irrational direction vector
    // creates ~60° wavelength clusters anchored to the globe surface
    const phase = x * 3.2 + y * 2.8 + z * 4.0;
    dots.push({ x, y, z, land: isLand(lat, lon, mask), phase });
  }
  return dots;
}

// ── Pulse markers ─────────────────────────────────────────────────────────────

function latLonToVec3(lat: number, lon: number): Vec3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = lon * (Math.PI / 180);
  return [Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)];
}

function northTangent(p: Vec3): Vec3 {
  const [x, y, z] = p;
  let nx = -y * x, ny = 1 - y * y, nz = -y * z;
  const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
  return len < 1e-6 ? [1, 0, 0] : [nx / len, ny / len, nz / len];
}

function eastTangent(p: Vec3): Vec3 {
  // cross([0,1,0], p) gives east
  const [px, _py, pz] = p;
  const ex = pz, ey = 0, ez = -px;
  const len = Math.sqrt(ex * ex + ey * ey + ez * ez);
  return len < 1e-6 ? [0, 0, 1] : [ex / len, ey / len, ez / len];
}

function sphereOffset(p: Vec3, tangent: Vec3, dist: number): Vec3 {
  const ox = p[0] + tangent[0] * dist;
  const oy = p[1] + tangent[1] * dist;
  const oz = p[2] + tangent[2] * dist;
  const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
  return [ox / len, oy / len, oz / len];
}

type RingStyle = "staggered" | "thick_thin" | "triple" | "double" | "gradient" | "dashed" | "dotted" | "solid";

interface MarkerData {
  pos: Vec3;
  lineEnd: Vec3 | null;
  level: 1 | 2 | 3 | 4 | 5;
  ringStyle: RingStyle;
  period: number;
  offset: number;
}

// Per-level display config
const LVL = {
  1: { size: 7.2, numRings: 5, pMin: 4.5, pMax: 6.0, expand: 4.5, alpha: 0.93, lw: 1.0, glowBlur: 14 },
  2: { size: 5.5, numRings: 3, pMin: 3.0, pMax: 4.5, expand: 3.5, alpha: 0.88, lw: 0.9, glowBlur: 7  },
  3: { size: 4.2, numRings: 2, pMin: 2.5, pMax: 3.5, expand: 2.8, alpha: 0.82, lw: 0.85,glowBlur: 3  },
  4: { size: 2.9, numRings: 1, pMin: 2.0, pMax: 3.0, expand: 2.2, alpha: 0.76, lw: 0.8, glowBlur: 0  },
  5: { size: 1.9, numRings: 1, pMin: 1.5, pMax: 2.5, expand: 1.8, alpha: 0.52, lw: 0.7, glowBlur: 0  },
} as const;

// Level → rgb string
const LVL_RGB: Record<number, string> = {
  1: "17,17,17",
  2: "17,17,17",
  3: "17,17,17",
  4: "17,17,17",
  5: "17,17,17",
};

// [lat, lon, level, ringStyle, hasLine, lineAngleDeg]
const RAW_MARKERS: [number, number, 1|2|3|4|5, RingStyle, boolean, number][] = [
  // ── Level 1 · Critical ─────────────────────────────────────────────────────
  [ 40.7,  -74.0, 1, "staggered",  true,  135],  // New York
  [ 51.5,   -0.1, 1, "staggered",  true,  125],  // London
  [ 25.2,   55.3, 1, "staggered",  true,   30],  // Dubai
  [  1.4,  103.8, 1, "staggered",  true,   60],  // Singapore
  [ 35.7,  139.7, 2, "triple",     true,   55],  // Tokyo
  // ── Level 2 · High ─────────────────────────────────────────────────────────
  [ 19.1,   72.9, 2, "triple",     true,   75],  // Mumbai
  [-33.9,  151.2, 2, "thick_thin", true,  115],  // Sydney
  [-23.5,  -46.6, 2, "thick_thin", true,   65],  // São Paulo
  // ── Level 3 · Medium ───────────────────────────────────────────────────────
  [-26.2,   28.0, 3, "double",     false,   0],  // Johannesburg
  // ── Level 4 · Low ──────────────────────────────────────────────────────────
  [ 30.0,   31.2, 4, "solid",      false,   0],  // Cairo
];

function buildMarkers(): MarkerData[] {
  return RAW_MARKERS.map(([lat, lon, level, ringStyle, hasLine, lineAngleDeg], i) => {
    const pos = latLonToVec3(lat, lon);
    let lineEnd: Vec3 | null = null;
    if (hasLine) {
      const nT = northTangent(pos);
      const eT = eastTangent(pos);
      const a = lineAngleDeg * (Math.PI / 180);
      const tangent: Vec3 = [
        Math.cos(a) * nT[0] + Math.sin(a) * eT[0],
        Math.cos(a) * nT[1] + Math.sin(a) * eT[1],
        Math.cos(a) * nT[2] + Math.sin(a) * eT[2],
      ];
      lineEnd = sphereOffset(pos, tangent, 0.088);
    }
    const cfg = LVL[level];
    const period = cfg.pMin + (Math.sin(i * 1.618) * 0.5 + 0.5) * (cfg.pMax - cfg.pMin);
    const offset = (i * 0.731 * period) % period;
    return { pos, lineEnd, level, ringStyle, period, offset };
  });
}

// ── Marker tooltip data ────────────────────────────────────────────────────────

// Names ordered to match RAW_MARKERS indices (0–9)
const MARKER_NAMES: string[] = [
  "NEW YORK", "LONDON", "DUBAI", "SINGAPORE", "TOKYO",
  "MUMBAI", "SYDNEY", "SÃO PAULO", "JOHANNESBURG", "CAIRO",
];

const MARKER_CATEGORIES: string[] = [
  "Financial Networks", "Cyber Intelligence", "Maritime Activity",
  "Economic Signals", "Communications",
  "Supply Chain", "Satellite Monitoring", "Network Analysis",
  "Maritime Activity", "Communications",
];

const TOOLTIP_META: Record<number, { label: string; dot: string; color: string }> = {
  1: { label: "Priority", dot: "#111111", color: "#111111" },
  2: { label: "Active",   dot: "#111111", color: "#111111" },
  3: { label: "Active",   dot: "#111111", color: "#111111" },
  4: { label: "Active",   dot: "#111111", color: "#111111" },
  5: { label: "Active",   dot: "#111111", color: "#111111" },
};

// ── Global connectivity ────────────────────────────────────────────────────────

const PAKISTAN_VEC3: Vec3 = latLonToVec3(30, 70);

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.max(-1, Math.min(1, a[0]*b[0] + a[1]*b[1] + a[2]*b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-5) {
    return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t];
  }
  const so = Math.sin(omega);
  const ka = Math.sin((1-t)*omega)/so, kb = Math.sin(t*omega)/so;
  return [ka*a[0]+kb*b[0], ka*a[1]+kb*b[1], ka*a[2]+kb*b[2]];
}

interface ConnDatum { vec: Vec3; pPhase: number; pSpeed: number; oPhase: number; oSpeed: number; nParts: number }

const CONN_LL: [number, number][] = [
  [ 51.51,  -0.13],  // London
  [ 40.71, -74.01],  // New York
  [-23.55, -46.63],  // São Paulo
  [-26.20,  28.04],  // Johannesburg
  [ 35.69, 139.69],  // Tokyo
  [-33.87, 151.21],  // Sydney
];

const CONN_DATA: ConnDatum[] = CONN_LL.map(([lat, lon], i) => ({
  vec:    latLonToVec3(lat, lon),
  pPhase: i * 0.6173,
  pSpeed: 0.07 + (i * 17 % 8) * 0.008,  // slow: ~7–12s per trip
  oPhase: i * 2.3941,
  oSpeed: 0.12 + (i * 11 % 5) * 0.03,   // slow pulse cycle
  nParts: 1,
}));

// ── Globe component ────────────────────────────────────────────────────────────

interface GlobeState {
  rot: Mat3;
  vel: [number, number];
  dragging: boolean;
  hovered: boolean;
  lastXY: [number, number];
  recentD: [number, number, number][];
  dots: Dot[];
  markers: MarkerData[];
  scale: number;
  glowA: number;
  autoFade: number;
}

export default function DottedGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursor, setCursor] = useState<"grab" | "grabbing" | "default">("default");
  const [interactive, setInteractive] = useState(false);

  // Hover tooltip state
  const mouseCanvasRef = useRef<[number, number] | null>(null);
  const hoveredMarkerIdxRef = useRef<number | null>(null);
  const tooltipElRef = useRef<HTMLDivElement>(null);
  const tooltipPosRef = useRef({ x: 0, y: 0 });
  interface TooltipData { idx: number; name: string; level: number; category: string }
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const S = useRef<GlobeState>({
    rot: mulM(rotX(-0.18), rotY(-0.35)),
    vel: [0, 0],
    dragging: false,
    hovered: false,
    lastXY: [0, 0],
    recentD: [],
    dots: [],
    markers: [],
    scale: 1,
    glowA: 0,
    autoFade: 1,
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      const on = mq.matches;
      setInteractive(on);
      setCursor(on ? "grab" : "default");
      if (!on) {
        S.current.dragging = false;
        S.current.hovered = false;
        mouseCanvasRef.current = null;
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Build dots and markers after mount
  useEffect(() => {
    const mask = buildMask();
    S.current.dots = makeDots(24000, mask);
    S.current.markers = buildMarkers();
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const AUTO_V = 0.0055;
    const DAMP = 0.905;

    function frame() {
      const st = S.current;
      if (!canvas || !st.dots.length) { raf = requestAnimationFrame(frame); return; }
      const now = performance.now() / 1000; // seconds

      const dpr = window.devicePixelRatio || 1;
      const lw = canvas.clientWidth, lh = canvas.clientHeight;
      const tw = Math.round(lw * dpr), th = Math.round(lh * dpr);
      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw;
        canvas.height = th;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#F4F0EA";
      ctx.fillRect(0, 0, lw, lh);

      const cx = lw / 2, cy = lh / 2;
      const baseR = Math.min(lw, lh) * 0.42;

      // Lerp scale
      const tScale = st.hovered ? 1.022 : 1;
      st.scale += (tScale - st.scale) * 0.07;
      const R = baseR * st.scale;

      // Lerp glow
      st.glowA += ((st.hovered ? 1 : 0) - st.glowA) * 0.07;

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

      // ── Beige globe base (matches site background) ──
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = "#F4F0EA";
      ctx.fill();

      // ── Inner glow — warm diffused light from just inside center ──
      // Creates the sense of an illuminated sphere with volume
      const innerGlow = ctx.createRadialGradient(
        cx - R * 0.18, cy - R * 0.22, 0,
        cx, cy, R * 0.92
      );
      innerGlow.addColorStop(0,   "rgba(253, 250, 243, 0.55)");
      innerGlow.addColorStop(0.3, "rgba(250, 246, 238, 0.22)");
      innerGlow.addColorStop(0.7, "rgba(240, 234, 222, 0.08)");
      innerGlow.addColorStop(1,   "rgba(244, 240, 234, 0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // ── Limb darkening — edge of sphere falls into shadow ──
      const limb = ctx.createRadialGradient(cx, cy, R * 0.58, cx, cy, R);
      limb.addColorStop(0,   "rgba(120, 108, 85, 0.0)");
      limb.addColorStop(0.75,"rgba(120, 108, 85, 0.03)");
      limb.addColorStop(0.9, "rgba(105, 93, 70, 0.08)");
      limb.addColorStop(1,   "rgba(90, 78, 56, 0.14)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = limb;
      ctx.fill();

      // ── Dots ──
      const m = st.rot;
      // Key light: upper-left, in front; fill light: right, softer
      const lx = -0.40, ly = -0.50, lz = 0.76;
      const fx =  0.55, fy =  0.10, fz = 0.60; // fill/bounce light

      // Project all dots; keep a thin band of the back hemisphere
      // so dots fade gracefully past the silhouette rather than popping
      const FADE_BAND = 0.18; // how far past horizon still renders (0 = hard clip)
      const visible: { sx: number; sy: number; rz: number; land: boolean; key: number; fill: number; phase: number }[] = [];
      for (const d of st.dots) {
        const [rx, ry, rz] = applyM(m, [d.x, d.y, d.z]);
        if (rz < -FADE_BAND) continue;
        const sx = cx + rx * R;
        const sy = cy - ry * R;
        const key  = Math.max(0, rx * lx + ry * ly + rz * lz);
        const fill = Math.max(0, rx * fx + ry * fy + rz * fz) * 0.28;
        visible.push({ sx, sy, rz, land: d.land, key, fill, phase: d.phase });
      }
      visible.sort((a, b) => a.rz - b.rz);

      for (const { sx, sy, rz, land, key, fill, phase } of visible) {
        // Smooth depth fade: rz=1 (centre-front) → 1.0, rz=0 (horizon) → 0, rz<0 → fades to 0
        // Using a soft cosine-like curve for a more organic falloff
        const depthT = Math.max(0, rz + FADE_BAND) / (1 + FADE_BAND); // 0..1
        const depthFade = depthT * depthT * (3 - 2 * depthT);          // smoothstep

        if (land) {
          // ── Wave modulation: three overlapping sine waves in globe space ──
          // Each wave has a distinct spatial frequency and drift speed.
          // Speeds chosen so fades at any given dot take ~1.5–3 s.
          // Coefficients sum to 0.30 → waveMod range: 0.40 – 1.00 exactly.
          const s1 = Math.sin(phase        + now * 0.35);          // primary   ~3 s cycle
          const s2 = Math.sin(phase * 1.31 + now * 0.27 + 1.8);   // secondary ~3.7 s cycle
          const s3 = Math.sin(phase * 0.73 + now * 0.18 + 4.0);   // slow drift ~5.5 s cycle
          const waveMod = 0.70 + 0.10 * s1 + 0.12 * s2 + 0.08 * s3;

          const lightness = key * 0.22 + fill * 0.12;
          const alpha = depthFade * (0.72 - lightness * 0.15) * waveMod;
          if (alpha < 0.015) continue;
          const dr = (0.82 + depthT * 0.52) * st.scale;
          ctx.beginPath();
          ctx.arc(sx, sy, dr, 0, Math.PI * 2);
          const base = 139;
          const r = Math.round(base + (1 - depthFade) * 42);
          const g = Math.round(base - 9 + (1 - depthFade) * 45);
          const b = Math.round(base - 21 + (1 - depthFade) * 45);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
          ctx.fill();
        } else {
          const alpha = depthFade * (rz * 0.055 + key * 0.025);
          if (alpha < 0.006) continue;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.44 * st.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,172,158,${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      // ── Pulse markers + connectivity ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // ── Global connectivity lines (rendered before markers so they sit beneath) ──
      {
        const N_ARC = 30;
        let pkArrival = 0;
        ctx.lineCap = "round";

        for (const cd of CONN_DATA) {
          // Independent opacity pulse per line
          const opW = 0.5 + 0.5 * Math.sin(now * cd.oSpeed * Math.PI * 2 + cd.oPhase);
          const lineAlpha = 0.08 + opW * 0.18; // 0.08–0.26

          // Arc segments — drawn as individual short strokes for depth-based fading
          ctx.setLineDash([2, 3.5]);
          ctx.lineWidth = 0.85;
          let px = 0, py = 0, pz = 0, hp = false;
          for (let i = 0; i <= N_ARC; i++) {
            const t = i / N_ARC;
            const pt = slerp(cd.vec, PAKISTAN_VEC3, t);
            const [rx, ry, rz] = applyM(m, pt);
            const sx = cx + rx * R, sy = cy - ry * R;
            if (hp) {
              const sz = Math.min(rz, pz);
              if (sz > -0.03) {
                const df = Math.max(0, Math.min(1, (sz + 0.08) / 0.20));
                const a  = df * lineAlpha;
                if (a > 0.008) {
                  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy);
                  ctx.strokeStyle = `rgba(28,33,52,${a.toFixed(3)})`;
                  ctx.stroke();
                }
              }
            }
            px = sx; py = sy; pz = rz; hp = true;
          }
          ctx.setLineDash([]);

          // Travelling particles
          for (let p = 0; p < cd.nParts; p++) {
            const tv = (now * cd.pSpeed + cd.pPhase + p / cd.nParts) % 1;
            const pp = slerp(cd.vec, PAKISTAN_VEC3, tv);
            const [prx, pry, prz] = applyM(m, pp);
            if (prz < 0.02) continue;
            const df2 = Math.max(0, Math.min(1, (prz + 0.08) / 0.20));
            // Accumulate arrival glow boost for Pakistan
            pkArrival += Math.max(0, (tv - 0.85) / 0.15) * df2;
            ctx.save();
            ctx.shadowColor = "rgba(28,33,52,0.45)";
            ctx.shadowBlur  = 3 * st.scale;
            ctx.beginPath();
            ctx.arc(cx + prx * R, cy - pry * R, 1.3 * st.scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(28,33,52,${(0.50 * df2).toFixed(3)})`;
            ctx.fill();
            ctx.restore();
          }
        }

        // Pakistan hub marker — slightly larger and more prominent than existing L1
        const [pkrx, pkry, pkrz] = applyM(m, PAKISTAN_VEC3);
        if (pkrz > 0.02) {
          const pksx  = cx + pkrx * R, pksy = cy - pkry * R;
          const pkD   = 0.55 + pkrz * 0.45;
          const pkF   = Math.max(0, Math.min(1, pkrz * 5));
          const pkBR  = 8.8 * pkD * st.scale;
          const pkTp  = (now * 0.52) % 1;
          const pkPop = Math.sin(pkTp * Math.PI);
          const pkPulse  = 1 + 0.42 * pkPop * pkPop;
          const glowBoost = Math.min(2.4, 1 + Math.min(pkArrival, 4) * 0.45);
          const pkRgb = "17,17,17";
          // Four staggered rings
          for (let i = 0; i < 4; i++) {
            const rt = (pkTp + i / 4) % 1;
            ctx.beginPath();
            ctx.arc(pksx, pksy, pkBR * (1 + rt * 5.5), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${pkRgb},${(pkF * (1 - rt) * (i === 3 ? 0.58 : 0.36)).toFixed(3)})`;
            ctx.lineWidth   = (i === 3 ? 2.0 : 0.9) * pkD * st.scale;
            ctx.setLineDash([]);
            ctx.stroke();
          }
          // Core dot with arrival glow boost
          ctx.save();
          ctx.shadowColor = `rgba(${pkRgb},${(pkF * 0.72 * glowBoost).toFixed(3)})`;
          ctx.shadowBlur  = 20 * pkD * st.scale * glowBoost;
          ctx.beginPath();
          ctx.arc(pksx, pksy, pkBR * pkPulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pkRgb},${(pkF * 0.94).toFixed(3)})`;
          ctx.fill();
          ctx.restore();
        }

        ctx.lineCap = "butt"; // restore default for marker loop
      }

      for (let _mi = 0; _mi < st.markers.length; _mi++) {
        const mk = st.markers[_mi];
        const [rx, ry, rz] = applyM(m, mk.pos);
        if (rz < -0.05) continue;

        const sx = cx + rx * R;
        const sy = cy - ry * R;

        const FADE_BAND = 0.18;
        const depthT = Math.max(0, rz + FADE_BAND) / (1 + FADE_BAND);
        const fade   = depthT * depthT * (3 - 2 * depthT);
        if (fade < 0.04) continue;

        const isHovMk   = hoveredMarkerIdxRef.current === _mi;
        const cfg        = LVL[mk.level];
        const rgb        = LVL_RGB[mk.level];
        const depthScale = 0.55 + rz * 0.45;
        const baseR      = cfg.size * depthScale * st.scale * (isHovMk ? 1.12 : 1);

        // Pulse: sine-squared pop (slightly more dramatic on hover)
        const t          = ((now - mk.offset) % mk.period) / mk.period;
        const pop        = Math.sin(t * Math.PI);
        const pulseFactor = 1 + (isHovMk ? 0.42 : 0.28) * pop * pop;

        // ── Ring helper ────────────────────────────────────────────────────
        const ring = (radius: number, alpha: number, lw: number, dash?: number[]) => {
          if (alpha < 0.005 || radius < 0.5) return;
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
          ctx.lineWidth   = lw * st.scale;
          ctx.setLineDash(dash ? dash.map(d => d * st.scale) : []);
          ctx.stroke();
          ctx.setLineDash([]);
        };

        // ── Ring styles ─────────────────────────────────────────────────────
        switch (mk.ringStyle) {

          case "staggered": {
            // 5 rings, evenly staggered — outer ring is thicker and brighter
            const n = cfg.numRings;
            for (let i = 0; i < n; i++) {
              const rt = (t + i / n) % 1;
              const isOuter = i === n - 1;
              ring(
                baseR * (1 + rt * cfg.expand),
                fade * (1 - rt) * (isOuter ? 0.60 : 0.40),
                isOuter ? 2.0 * depthScale : 0.8
              );
            }
            break;
          }

          case "thick_thin": {
            // Thick outer wave + thinner trailing wave
            const rt1 = t;
            ring(baseR * (1 + rt1 * cfg.expand), fade * (1 - rt1) * 0.58, 2.0 * depthScale);
            const rt2 = (t + 0.22) % 1;
            ring(baseR * (1 + rt2 * cfg.expand * 0.72), fade * (1 - rt2) * 0.38, 0.8);
            break;
          }

          case "triple": {
            // 3 evenly staggered rings, decreasing weight
            const weights = [1.5, 1.1, 0.75] as const;
            for (let i = 0; i < 3; i++) {
              const rt = (t + i / 3) % 1;
              ring(baseR * (1 + rt * cfg.expand), fade * (1 - rt) * 0.55, weights[i]);
            }
            break;
          }

          case "double": {
            for (let i = 0; i < 2; i++) {
              const rt = (t + i * 0.42) % 1;
              ring(baseR * (1 + rt * cfg.expand), fade * (1 - rt) * 0.58, i === 0 ? 1.3 : 0.85);
            }
            break;
          }

          case "gradient": {
            // Soft glow ring — three strokes at ±offset simulate a Gaussian falloff
            const rt = t;
            const rr = baseR * (1 + rt * cfg.expand);
            const peak = fade * (1 - rt) * 0.58;
            const blur = Math.max(1.0, baseR * 0.38);
            ring(rr - blur * 0.6, peak * 0.30, 1.0);
            ring(rr,               peak,         1.2);
            ring(rr + blur * 0.6, peak * 0.30, 1.0);
            // Second softer echo ring
            const rt2 = (t + 0.38) % 1;
            ring(baseR * (1 + rt2 * cfg.expand * 0.78), fade * (1 - rt2) * 0.35, 0.85);
            break;
          }

          case "dashed": {
            const rt = t;
            ring(baseR * (1 + rt * cfg.expand), fade * (1 - rt) * 0.65, 1.1, [5, 4]);
            break;
          }

          case "dotted": {
            const rt = t;
            ring(baseR * (1 + rt * cfg.expand), fade * (1 - rt) * 0.65, 1.05, [1.5, 5]);
            break;
          }

          case "solid":
          default: {
            const rt = t;
            ring(baseR * (1 + rt * cfg.expand), fade * (1 - rt) * 0.62, cfg.lw);
            break;
          }
        }

        // ── Core dot (with optional glow for levels 1–3, always on hover) ──
        const coreA = (fade * cfg.alpha).toFixed(3);
        const effectiveGlow = isHovMk ? Math.max(6, cfg.glowBlur) : cfg.glowBlur;
        if (effectiveGlow > 0) {
          ctx.save();
          ctx.shadowColor = `rgba(${rgb},${(fade * (isHovMk ? 0.82 : 0.65)).toFixed(3)})`;
          ctx.shadowBlur  = effectiveGlow * depthScale * st.scale * (isHovMk ? 1.45 : 1);
          ctx.beginPath();
          ctx.arc(sx, sy, baseR * pulseFactor, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb},${coreA})`;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, baseR * pulseFactor, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb},${coreA})`;
          ctx.fill();
        }

        // ── Leader line ────────────────────────────────────────────────────
        if (mk.lineEnd) {
          const [lrx, lry, lrz] = applyM(m, mk.lineEnd);
          if (lrz > -0.05) {
            const lsx = cx + lrx * R;
            const lsy = cy - lry * R;
            const breathe = 0.45 + 0.55 * Math.sin(now * 0.38 + mk.offset * 1.7);
            const lineA   = fade * breathe * 0.50;
            if (lineA > 0.01) {
              ctx.beginPath();
              ctx.moveTo(sx, sy);
              ctx.lineTo(lsx, lsy);
              ctx.strokeStyle = `rgba(${rgb},${lineA.toFixed(3)})`;
              ctx.lineWidth   = (0.7 + depthScale * 0.25) * st.scale;
              ctx.setLineDash([]);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(lsx, lsy, (1.5 + depthScale * 0.5) * st.scale, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${rgb},${Math.min(1, lineA * 1.4).toFixed(3)})`;
              ctx.fill();
            }
          }
        }
      }
      ctx.restore();

      // ── Specular highlight — crisp catch-light upper-left ──
      const spec = ctx.createRadialGradient(
        cx - R * 0.34, cy - R * 0.36, 0,
        cx - R * 0.22, cy - R * 0.24, R * 0.52
      );
      spec.addColorStop(0,   "rgba(255,252,244,0.22)");
      spec.addColorStop(0.35,"rgba(255,252,244,0.06)");
      spec.addColorStop(0.7, "rgba(255,252,244,0.02)");
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
      rim.addColorStop(0.55,"rgba(235,225,205,0.04)");
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

  // Tooltip hover detection + position tracking RAF
  useEffect(() => {
    let rafId: number;
    let prevHovered: number | null = null;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    function tick() {
      const canvas = canvasRef.current;
      if (!canvas) { rafId = requestAnimationFrame(tick); return; }

      const lw = canvas.clientWidth, lh = canvas.clientHeight;
      const cx = lw / 2, cy = lh / 2;
      const R = Math.min(lw, lh) * 0.42 * S.current.scale;
      const m = S.current.rot;

      // ── Hover detection ──────────────────────────────────────────────────
      const mp = mouseCanvasRef.current;
      let newHovered: number | null = null;
      if (mp && !S.current.dragging) {
        let minDist = 22; // hover radius px
        for (let i = 0; i < S.current.markers.length; i++) {
          const [rx, ry, rz] = applyM(m, S.current.markers[i].pos);
          if (rz < 0.05) continue;
          const sx = cx + rx * R, sy = cy - ry * R;
          const d = Math.sqrt((mp[0] - sx) ** 2 + (mp[1] - sy) ** 2);
          if (d < minDist) { minDist = d; newHovered = i; }
        }
      }

      hoveredMarkerIdxRef.current = newHovered;

      if (newHovered !== prevHovered) {
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

        if (newHovered !== null) {
          const mk = S.current.markers[newHovered];
          const name = MARKER_NAMES[newHovered] ?? "UNKNOWN";
          const cat  = MARKER_CATEGORIES[newHovered] ?? "Intelligence";
          setTooltip({ idx: newHovered, name, level: mk.level, category: cat });
          setTooltipVisible(true);
        } else {
          setTooltipVisible(false);
          hideTimer = setTimeout(() => setTooltip(null), 220);
        }
        prevHovered = newHovered;
      }

      // ── Tooltip position tracking ─────────────────────────────────────────
      const el = tooltipElRef.current;
      if (el && prevHovered !== null) {
        const mk = S.current.markers[prevHovered];
        if (mk) {
          const [rx, ry, rz] = applyM(m, mk.pos);
          if (rz < 0.04) {
            // Marker behind globe — hide immediately
            setTooltipVisible(false);
            hideTimer = setTimeout(() => setTooltip(null), 220);
            prevHovered = null;
            hoveredMarkerIdxRef.current = null;
          } else {
            const sx = cx + rx * R, sy = cy - ry * R;
            const TW = 168, TH = 82; // approx tooltip dimensions
            const GAP = 13;

            // Default: above the marker
            let tx = sx - TW / 2;
            let ty = sy - TH - GAP;

            // Flip below if near top of canvas
            if (ty < 8) ty = sy + GAP;

            // Clamp horizontally
            tx = Math.max(8, Math.min(lw - TW - 8, tx));

            el.style.left = `${tx}px`;
            el.style.top  = `${ty}px`;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  // ── Input helpers ──────────────────────────────────────────────────────────

  const getR = () =>
    canvasRef.current
      ? Math.min(canvasRef.current.clientWidth, canvasRef.current.clientHeight) * 0.42
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
    if (!interactive) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) mouseCanvasRef.current = [e.clientX - rect.left, e.clientY - rect.top];
    if (!S.current.dragging) return;
    const dx = e.clientX - S.current.lastXY[0];
    const dy = e.clientY - S.current.lastXY[1];
    applyDrag(dx, dy);
    S.current.recentD.push([dx, dy, performance.now()]);
    if (S.current.recentD.length > 6) S.current.recentD.shift();
    S.current.lastXY = [e.clientX, e.clientY];
  }, [interactive]);

  const onMouseUp = useCallback(() => {
    if (!interactive) return;
    if (!S.current.dragging) return;
    S.current.dragging = false;
    flushVelocity();
    setCursor("grab");
  }, [interactive]);

  const onMouseEnter = useCallback(() => {
    if (!interactive) return;
    S.current.hovered = true;
  }, [interactive]);

  const onMouseLeave = useCallback(() => {
    if (!interactive) return;
    S.current.hovered = false;
    mouseCanvasRef.current = null;
    if (S.current.dragging) { S.current.dragging = false; setCursor("grab"); }
  }, [interactive]);

  // ── Touch ──────────────────────────────────────────────────────────────────

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!interactive) return;
    e.preventDefault();
    const t = e.touches[0];
    S.current.dragging = true;
    S.current.lastXY = [t.clientX, t.clientY];
    S.current.recentD = [];
    S.current.vel = [0, 0];
  }, [interactive]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!interactive) return;
    e.preventDefault();
    if (!S.current.dragging) return;
    const t = e.touches[0];
    const dx = t.clientX - S.current.lastXY[0];
    const dy = t.clientY - S.current.lastXY[1];
    applyDrag(dx, dy);
    S.current.recentD.push([dx, dy, performance.now()]);
    if (S.current.recentD.length > 6) S.current.recentD.shift();
    S.current.lastXY = [t.clientX, t.clientY];
  }, [interactive]);

  const onTouchEnd = useCallback(() => {
    if (!interactive) return;
    if (!S.current.dragging) return;
    S.current.dragging = false;
    flushVelocity();
  }, [interactive]);

  return (
    <div
      className={`size-full flex items-center justify-center relative ${className ?? ""}`}
      style={{
        background: "#F4F0EA",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          cursor,
          touchAction: interactive ? "none" : "pan-y",
          pointerEvents: interactive ? "auto" : "none",
          display: "block",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {/* Hover tooltip — anchored above the hovered marker */}
      {tooltip && (() => {
        const meta = TOOLTIP_META[tooltip.level];
        return (
          <div
            ref={tooltipElRef}
            style={{
              position: "absolute",
              zIndex: 30,
              pointerEvents: "none",
              opacity: tooltipVisible ? 1 : 0,
              transform: tooltipVisible ? "translateY(0px)" : "translateY(7px)",
              transition: "opacity 0.19s ease, transform 0.19s ease",
              willChange: "opacity, transform",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.93)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(0,0,0,0.07)",
                borderLeft: `2px solid ${meta.dot}`,
                borderRadius: "10px",
                width: "168px",
                fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",
                boxShadow: "0 3px 16px rgba(0,0,0,0.09),0 1px 3px rgba(0,0,0,0.05)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "11px 13px 11px 11px" }}>
                {/* Location + status dot */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "7px" }}>
                  <div style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: meta.dot, flexShrink: 0,
                    boxShadow: `0 0 4px ${meta.dot}80`,
                  }} />
                  <span style={{
                    fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em",
                    color: "#0f172a", textTransform: "uppercase" as const, lineHeight: 1,
                  }}>
                    {tooltip.name}
                  </span>
                </div>

              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
