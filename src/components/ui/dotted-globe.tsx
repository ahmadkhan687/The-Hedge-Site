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
  label: string;
  category: string;
  content: string;
  source: string;
  country: string;
  isNew: boolean;
}

export type GlobePulseMarker = {
  id: string;
  latitude: number;
  longitude: number;
  city: string | null;
  countryName: string | null;
  content: string | null;
  source: string | null;
  isNew?: boolean;
};

// Uniform pulse look — same medium-small size for every marker
const UNIFORM_PULSE = {
  size: 3.4,
  numRings: 1,
  pMin: 2.0,
  pMax: 3.0,
  expand: 2.4,
  alpha: 0.82,
  lw: 0.85,
  glowBlur: 2,
} as const;

// Level → rgb string
const LVL_RGB: Record<number, string> = {
  1: "17,17,17",
  2: "17,17,17",
  3: "17,17,17",
  4: "17,17,17",
  5: "17,17,17",
};

const NEW_PULSE_RGB = "27,122,61"; // green highlight for newly arrived pulses

/** Turn plain-text URLs into safe clickable anchors (new tab). */
const URL_IN_TEXT_RE = /(https?:\/\/[^\s<>"'`]+)/gi;

function trimTrailingUrlPunctuation(url: string): { href: string; trailing: string } {
  let href = url;
  let trailing = "";
  while (href.length > 0 && /[.,);:!?'"]$/.test(href)) {
    trailing = href.slice(-1) + trailing;
    href = href.slice(0, -1);
  }
  return { href, trailing };
}

function setTooltipContentWithLinks(el: HTMLElement, raw: string) {
  el.replaceChildren();
  const text = raw || "No excerpt available for this signal.";
  let last = 0;
  URL_IN_TEXT_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = URL_IN_TEXT_RE.exec(text)) !== null) {
    if (match.index > last) {
      el.appendChild(document.createTextNode(text.slice(last, match.index)));
    }
    const { href, trailing } = trimTrailingUrlPunctuation(match[0]);
    if (href) {
      const a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = href;
      a.addEventListener("mousedown", (e) => e.stopPropagation());
      a.addEventListener("click", (e) => e.stopPropagation());
      el.appendChild(a);
    }
    if (trailing) {
      el.appendChild(document.createTextNode(trailing));
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    el.appendChild(document.createTextNode(text.slice(last)));
  }
  if (!el.childNodes.length) {
    el.appendChild(document.createTextNode(text));
  }
}

function buildMarkerGeometry(
  lat: number,
  lon: number,
  level: 1 | 2 | 3 | 4 | 5,
  ringStyle: RingStyle,
  hasLine: boolean,
  lineAngleDeg: number,
  i: number,
  label: string,
  category: string,
  content: string,
  source = "",
  country = "",
  isNew = false,
): MarkerData {
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
  const cfg = UNIFORM_PULSE;
  const period = cfg.pMin + (Math.sin(i * 1.618) * 0.5 + 0.5) * (cfg.pMax - cfg.pMin);
  const offset = (i * 0.731 * period) % period;
  return {
    pos,
    lineEnd,
    level,
    ringStyle,
    period,
    offset,
    label,
    category,
    content,
    source,
    country,
    isNew,
  };
}

function buildMarkersFromPulses(pulses: GlobePulseMarker[]): MarkerData[] {
  return pulses.slice(0, 50).map((pulse, i) => {
    // Same medium-small size for every pulse
    const level = 4 as const;
    const ringStyle: RingStyle = "solid";
    const hasLine = false;
    const lineAngleDeg = 0;
    const country = pulse.countryName?.trim() || "Unknown Location";
    const label = (pulse.city || country).toUpperCase();
    const source = pulse.source?.trim() || "OPEN SOURCE";
    const category = [source, country].filter(Boolean).join(" · ");
    const content = pulse.content ?? "";
    return buildMarkerGeometry(
      pulse.latitude,
      pulse.longitude,
      level,
      ringStyle,
      hasLine,
      lineAngleDeg,
      i,
      label,
      category,
      content,
      source,
      country,
      Boolean(pulse.isNew),
    );
  });
}

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-5) {
    return [
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
      a[2] + (b[2] - a[2]) * t,
    ];
  }
  const so = Math.sin(omega);
  const ka = Math.sin((1 - t) * omega) / so;
  const kb = Math.sin(t * omega) / so;
  return [ka * a[0] + kb * b[0], ka * a[1] + kb * b[1], ka * a[2] + kb * b[2]];
}

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

export default function DottedGlobe({
  className,
  pulses,
}: {
  className?: string;
  /** Live feed pulses only — no hardcoded markers. */
  pulses?: GlobePulseMarker[] | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursor, setCursor] = useState<"grab" | "grabbing" | "default">("default");
  const [interactive, setInteractive] = useState(false);

  // Hover tooltip state (imperative DOM — avoid React re-renders that hitch the canvas)
  const mouseCanvasRef = useRef<[number, number] | null>(null);
  const hoveredMarkerIdxRef = useRef<number | null>(null);
  const tooltipElRef = useRef<HTMLDivElement>(null);
  const tooltipNameRef = useRef<HTMLSpanElement>(null);
  const tooltipSourceRef = useRef<HTMLSpanElement>(null);
  const tooltipCountryRef = useRef<HTMLSpanElement>(null);
  const tooltipContentRef = useRef<HTMLParagraphElement>(null);
  const tooltipNewBadgeRef = useRef<HTMLSpanElement>(null);
  const tooltipPinnedRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchDidDragRef = useRef(false);
  const isMobileRef = useRef(false);
  const showTooltipRef = useRef<(mk: MarkerData) => void>(() => {});
  const hideTooltipRef = useRef<() => void>(() => {});
  const lastHoveredIdxRef = useRef<number | null>(null);
  const hideTooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    // Enable drag + pulse interaction on all breakpoints (including mobile).
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => {
      isMobileRef.current = mq.matches;
      setInteractive(true);
      setCursor("grab");
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Build dots after mount — fewer on mobile for smoother first paint/CPU
  useEffect(() => {
    const mask = buildMask();
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    S.current.dots = makeDots(isMobile ? 7000 : 12000, mask);
  }, []);

  useEffect(() => {
    // Live feed only — no hardcoded city markers
    if (pulses && pulses.length > 0) {
      S.current.markers = buildMarkersFromPulses(pulses);
      return;
    }
    S.current.markers = [];
  }, [pulses]);

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
      const isMobile = window.innerWidth < 1024;
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

      // Lerp auto-rotation fade — pause while dragging OR while a pulse is hovered
      // so the marker stays under the cursor and the tooltip remains readable.
      const pauseAuto =
        st.dragging || hoveredMarkerIdxRef.current !== null;
      st.autoFade += ((pauseAuto ? 0 : 1) - st.autoFade) * 0.08;

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

      // ── Pulse markers + chain connections between live pulses ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Chain: each pulse links to the next (ring), with traveling particles
      {
        const markers = st.markers;
        const n = markers.length;
        if (n >= 2) {
          const N_ARC = 28;
          ctx.lineCap = "round";

          for (let i = 0; i < n; i++) {
            const a = markers[i].pos;
            const b = markers[(i + 1) % n].pos;
            const oPhase = i * 2.3941;
            const oSpeed = 0.12 + (i * 11 % 5) * 0.03;
            const pPhase = i * 0.6173;
            const pSpeed = 0.07 + (i * 17 % 8) * 0.008;

            const opW = 0.5 + 0.5 * Math.sin(now * oSpeed * Math.PI * 2 + oPhase);
            const lineAlpha = 0.08 + opW * 0.18;

            ctx.setLineDash([2, 3.5]);
            ctx.lineWidth = 0.85;
            let px = 0,
              py = 0,
              pz = 0,
              hp = false;
            for (let s = 0; s <= N_ARC; s++) {
              const tt = s / N_ARC;
              const pt = slerp(a, b, tt);
              const [rx, ry, rz] = applyM(m, pt);
              const sx = cx + rx * R,
                sy = cy - ry * R;
              if (hp) {
                const sz = Math.min(rz, pz);
                if (sz > -0.03) {
                  const df = Math.max(0, Math.min(1, (sz + 0.08) / 0.2));
                  const alpha = df * lineAlpha;
                  if (alpha > 0.008) {
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(sx, sy);
                    ctx.strokeStyle = `rgba(28,33,52,${alpha.toFixed(3)})`;
                    ctx.stroke();
                  }
                }
              }
              px = sx;
              py = sy;
              pz = rz;
              hp = true;
            }
            ctx.setLineDash([]);

            const tv = (now * pSpeed + pPhase) % 1;
            const pp = slerp(a, b, tv);
            const [prx, pry, prz] = applyM(m, pp);
            if (prz >= 0.02) {
              const df2 = Math.max(0, Math.min(1, (prz + 0.08) / 0.2));
              ctx.save();
              ctx.shadowColor = "rgba(28,33,52,0.45)";
              ctx.shadowBlur = 3 * st.scale;
              ctx.beginPath();
              ctx.arc(
                cx + prx * R,
                cy - pry * R,
                1.3 * st.scale,
                0,
                Math.PI * 2,
              );
              ctx.fillStyle = `rgba(28,33,52,${(0.5 * df2).toFixed(3)})`;
              ctx.fill();
              ctx.restore();
            }
          }

          ctx.lineCap = "butt";
        }
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
        const cfg        = UNIFORM_PULSE;
        const rgb        = mk.isNew ? NEW_PULSE_RGB : LVL_RGB[mk.level];
        const depthScale = 0.55 + rz * 0.45;
        const markerScale = isMobile ? 1.22 : 1;
        const baseR      = cfg.size * depthScale * st.scale * markerScale * (isHovMk ? 1.12 : 1);

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
          ctx.lineWidth   = lw * st.scale * (isMobile ? 1.05 : 1);
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

        // ── Core dot (with optional glow for levels 1–3, always on hover / new) ──
        const coreA = (fade * cfg.alpha).toFixed(3);
        const effectiveGlow = mk.isNew
          ? Math.max(10, cfg.glowBlur)
          : isHovMk
            ? Math.max(6, cfg.glowBlur)
            : cfg.glowBlur;
        if (effectiveGlow > 0) {
          ctx.save();
          ctx.shadowColor = `rgba(${rgb},${(fade * (isHovMk || mk.isNew ? 0.82 : 0.65)).toFixed(3)})`;
          ctx.shadowBlur  = effectiveGlow * depthScale * st.scale * (isHovMk || mk.isNew ? 1.45 : 1) * (isMobile ? 1.1 : 1);
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
              ctx.lineWidth   = (0.7 + depthScale * 0.25) * st.scale * (isMobile ? 0.72 : 1);
              ctx.setLineDash([]);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(lsx, lsy, (1.5 + depthScale * 0.5) * st.scale * (isMobile ? 0.72 : 1), 0, Math.PI * 2);
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

  // Tooltip hover detection + position tracking RAF (no React setState — keeps pulses smooth)
  useEffect(() => {
    let rafId: number;
    let prevHovered: number | null = null;

    function clearHideTimer() {
      if (hideTooltipTimerRef.current) {
        clearTimeout(hideTooltipTimerRef.current);
        hideTooltipTimerRef.current = null;
      }
    }

    function showTooltip(mk: MarkerData) {
      const el = tooltipElRef.current;
      if (!el) return;
      clearHideTimer();
      if (tooltipNameRef.current) {
        tooltipNameRef.current.textContent = mk.label || "UNKNOWN";
      }
      if (tooltipSourceRef.current) {
        const source = mk.source || "OPEN SOURCE";
        tooltipSourceRef.current.textContent = source;
        tooltipSourceRef.current.style.display = "inline";
      }
      if (tooltipCountryRef.current) {
        const country = mk.country || "Unknown Location";
        tooltipCountryRef.current.textContent = country;
        tooltipCountryRef.current.style.display = "inline";
      }
      if (tooltipContentRef.current) {
        setTooltipContentWithLinks(
          tooltipContentRef.current,
          mk.content || "No excerpt available for this signal.",
        );
        tooltipContentRef.current.scrollTop = 0;
      }
      if (tooltipNewBadgeRef.current) {
        tooltipNewBadgeRef.current.style.display = mk.isNew ? "inline-flex" : "none";
      }
      // Responsive panel width for phone screens
      const panel = el.firstElementChild as HTMLElement | null;
      if (panel && canvasRef.current) {
        const maxW = Math.min(320, canvasRef.current.clientWidth - 16);
        panel.style.width = `${maxW}px`;
      }
      el.style.opacity = "1";
      el.style.transform = "translateY(0px) scale(1)";
      el.style.pointerEvents = "auto";
    }

    function hideTooltipNow() {
      const el = tooltipElRef.current;
      if (!el) return;
      clearHideTimer();
      tooltipPinnedRef.current = false;
      lastHoveredIdxRef.current = null;
      el.style.opacity = "0";
      el.style.transform = "translateY(10px) scale(0.98)";
      el.style.pointerEvents = "none";
    }

    showTooltipRef.current = showTooltip;
    hideTooltipRef.current = hideTooltipNow;

    function scheduleHideTooltip() {
      if (tooltipPinnedRef.current) return;
      clearHideTimer();
      // Delay so cursor can move from pulse → box without closing
      hideTooltipTimerRef.current = setTimeout(() => {
        if (tooltipPinnedRef.current) return;
        hideTooltipNow();
        prevHovered = null;
        hoveredMarkerIdxRef.current = null;
      }, 320);
    }

    function tick() {
      const canvas = canvasRef.current;
      if (!canvas) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const lw = canvas.clientWidth,
        lh = canvas.clientHeight;
      const cx = lw / 2,
        cy = lh / 2;
      const R = Math.min(lw, lh) * 0.42 * S.current.scale;
      const m = S.current.rot;

      const mp = mouseCanvasRef.current;
      let newHovered: number | null = null;

      // Keep open while cursor / finger is on the tooltip box
      if (tooltipPinnedRef.current && lastHoveredIdxRef.current !== null) {
        newHovered = lastHoveredIdxRef.current;
      } else if (mp && !S.current.dragging) {
        const mobile = isMobileRef.current;
        const acquireR = mobile ? 40 : 28;
        const keepR = mobile ? 56 : 42;
        let minDist = prevHovered !== null ? keepR : acquireR;
        for (let i = 0; i < S.current.markers.length; i++) {
          const [rx, ry, rz] = applyM(m, S.current.markers[i].pos);
          if (rz < 0.05) continue;
          const sx = cx + rx * R,
            sy = cy - ry * R;
          const d = Math.sqrt((mp[0] - sx) ** 2 + (mp[1] - sy) ** 2);
          const limit = i === prevHovered ? keepR : acquireR;
          if (d < limit && d < minDist) {
            minDist = d;
            newHovered = i;
          }
        }
      }

      hoveredMarkerIdxRef.current = newHovered;

      if (newHovered !== null) {
        lastHoveredIdxRef.current = newHovered;
        clearHideTimer();
        if (newHovered !== prevHovered) {
          const mk = S.current.markers[newHovered];
          if (mk) showTooltip(mk);
          prevHovered = newHovered;
        }
      } else if (prevHovered !== null && !tooltipPinnedRef.current) {
        scheduleHideTooltip();
        prevHovered = null;
      }

      const el = tooltipElRef.current;
      const activeIdx = lastHoveredIdxRef.current;
      if (el && activeIdx !== null && (prevHovered !== null || tooltipPinnedRef.current)) {
        const mk = S.current.markers[activeIdx];
        if (mk) {
          const [rx, ry, rz] = applyM(m, mk.pos);
          if (rz < 0.04 && !tooltipPinnedRef.current) {
            hideTooltipNow();
            prevHovered = null;
            hoveredMarkerIdxRef.current = null;
          } else {
            const sx = cx + rx * R;
            const sy = cy - ry * R;
            const panel = el.firstElementChild as HTMLElement | null;
            const TW = panel?.offsetWidth || (isMobileRef.current ? 280 : 320);
            const TH = 190;
            const GAP = 16;
            let tx = sx - TW / 2;
            let ty = sy - TH - GAP;
            if (ty < 8) ty = sy + GAP;
            tx = Math.max(8, Math.min(lw - TW - 8, tx));
            el.style.left = `${tx}px`;
            el.style.top = `${ty}px`;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearHideTimer();
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
    // Keep last canvas point if moving onto the tooltip box
    if (!tooltipPinnedRef.current) {
      mouseCanvasRef.current = null;
    }
    if (S.current.dragging) { S.current.dragging = false; setCursor("grab"); }
  }, [interactive]);

  // ── Touch ──────────────────────────────────────────────────────────────────

  const findNearestMarkerIdx = useCallback(
    (canvasX: number, canvasY: number): number | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const lw = canvas.clientWidth;
      const lh = canvas.clientHeight;
      const cx = lw / 2;
      const cy = lh / 2;
      const R = Math.min(lw, lh) * 0.42 * S.current.scale;
      const m = S.current.rot;
      const hitR = isMobileRef.current ? 44 : 30;
      let best: number | null = null;
      let bestD = hitR;
      for (let i = 0; i < S.current.markers.length; i++) {
        const [rx, ry, rz] = applyM(m, S.current.markers[i].pos);
        if (rz < 0.05) continue;
        const sx = cx + rx * R;
        const sy = cy - ry * R;
        const d = Math.sqrt((canvasX - sx) ** 2 + (canvasY - sy) ** 2);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return best;
    },
    [],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!interactive) return;
    const t = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    touchStartRef.current = { x: t.clientX, y: t.clientY };
    touchDidDragRef.current = false;
    S.current.dragging = true;
    S.current.lastXY = [t.clientX, t.clientY];
    S.current.recentD = [];
    S.current.vel = [0, 0];
    if (rect) {
      mouseCanvasRef.current = [t.clientX - rect.left, t.clientY - rect.top];
    }
  }, [interactive]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!interactive) return;
    if (!S.current.dragging) return;
    const t = e.touches[0];
    const start = touchStartRef.current;
    if (start) {
      const dist = Math.hypot(t.clientX - start.x, t.clientY - start.y);
      if (dist > 10) touchDidDragRef.current = true;
    }
    if (touchDidDragRef.current) {
      e.preventDefault();
    }
    const dx = t.clientX - S.current.lastXY[0];
    const dy = t.clientY - S.current.lastXY[1];
    if (touchDidDragRef.current) {
      applyDrag(dx, dy);
      S.current.recentD.push([dx, dy, performance.now()]);
      if (S.current.recentD.length > 6) S.current.recentD.shift();
    }
    S.current.lastXY = [t.clientX, t.clientY];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseCanvasRef.current = [t.clientX - rect.left, t.clientY - rect.top];
    }
  }, [interactive]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!interactive) return;
    if (!S.current.dragging) return;
    S.current.dragging = false;

    if (!touchDidDragRef.current) {
      // Tap: open nearest pulse tooltip
      const rect = canvasRef.current?.getBoundingClientRect();
      const t = e.changedTouches[0];
      if (rect && t) {
        const cx = t.clientX - rect.left;
        const cy = t.clientY - rect.top;
        mouseCanvasRef.current = [cx, cy];
        const idx = findNearestMarkerIdx(cx, cy);
        if (idx !== null) {
          const mk = S.current.markers[idx];
          if (mk) {
            hoveredMarkerIdxRef.current = idx;
            lastHoveredIdxRef.current = idx;
            tooltipPinnedRef.current = true;
            showTooltipRef.current(mk);
            // Auto-unpin after a few seconds so the globe can resume
            window.setTimeout(() => {
              tooltipPinnedRef.current = false;
            }, 4500);
          }
        } else {
          hideTooltipRef.current();
          hoveredMarkerIdxRef.current = null;
          lastHoveredIdxRef.current = null;
        }
      }
    } else {
      flushVelocity();
    }

    touchStartRef.current = null;
    touchDidDragRef.current = false;
  }, [interactive, findNearestMarkerIdx]);

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
          WebkitUserSelect: "none",
          userSelect: "none",
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

      {/* Signal briefing tooltip — brand editorial panel */}
      <div
        ref={tooltipElRef}
        aria-hidden="true"
        onMouseEnter={() => {
          tooltipPinnedRef.current = true;
          if (hideTooltipTimerRef.current) {
            clearTimeout(hideTooltipTimerRef.current);
            hideTooltipTimerRef.current = null;
          }
        }}
        onMouseLeave={() => {
          tooltipPinnedRef.current = false;
          // Close shortly after leaving the box (unless pulse is hovered again)
          if (hideTooltipTimerRef.current) {
            clearTimeout(hideTooltipTimerRef.current);
          }
          hideTooltipTimerRef.current = setTimeout(() => {
            if (tooltipPinnedRef.current) return;
            const el = tooltipElRef.current;
            if (!el) return;
            el.style.opacity = "0";
            el.style.transform = "translateY(10px) scale(0.98)";
            el.style.pointerEvents = "none";
            lastHoveredIdxRef.current = null;
            hoveredMarkerIdxRef.current = null;
          }, 220);
        }}
        style={{
          position: "absolute",
          zIndex: 30,
          pointerEvents: "none",
          opacity: 0,
          transform: "translateY(10px) scale(0.98)",
          transition:
            "opacity 0.22s cubic-bezier(0.22,1,0.36,1), transform 0.22s cubic-bezier(0.22,1,0.36,1)",
          willChange: "opacity, transform",
          left: 0,
          top: 0,
        }}
      >
        <div
          style={{
            width: "320px",
            background:
              "linear-gradient(165deg, rgba(255,252,247,0.97) 0%, rgba(244,240,234,0.96) 100%)",
            border: "1px solid rgba(17,17,17,0.12)",
            borderTop: "2px solid #C6A02C",
            boxShadow: "0 18px 40px rgba(17,17,17,0.12)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "10px 12px 11px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "9px",
                    fontWeight: 800,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#C6A02C",
                    lineHeight: 1,
                  }}
                >
                  Live signal
                </span>
                <span
                  ref={tooltipNewBadgeRef}
                  style={{
                    display: "none",
                    alignItems: "center",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "8px",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#1B7A3D",
                    background: "rgba(27,122,61,0.12)",
                    padding: "2px 5px",
                    lineHeight: 1,
                  }}
                >
                  New
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#6B665F",
                    lineHeight: 1,
                  }}
                >
                  Source
                </span>
                <span
                  ref={tooltipSourceRef}
                  style={{
                    fontFamily: "var(--font-archivo-narrow), sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#111111",
                    lineHeight: 1,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "5px",
              }}
            >
              <span
                ref={tooltipNameRef}
                style={{
                  fontFamily: "var(--font-eb-garamond), serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: "#111111",
                  lineHeight: 1,
                }}
              />
              <span
                ref={tooltipCountryRef}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#6B665F",
                  lineHeight: 1.1,
                }}
              />
            </div>

            <div
              style={{
                height: "1px",
                background: "rgba(17,17,17,0.1)",
                margin: "0 0 6px",
              }}
            />

            <p
              ref={tooltipContentRef}
              className="globe-signal-scroll"
              style={{
                margin: 0,
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                fontStyle: "normal",
                color: "#272521",
                lineHeight: 1.35,
                height: "6.25em",
                overflowY: "auto",
                overflowX: "hidden",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                overscrollBehavior: "contain",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
