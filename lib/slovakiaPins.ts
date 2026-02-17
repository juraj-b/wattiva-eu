// Pin coordinates for Slovakia map overlay
// x, y are percentages (0-100) relative to the map's viewBox (7001×3375)
// Distribution matches real Wattiva deployment data across Slovakia

// Deterministic pseudo-random number generator (LCG) — same as evChargingData.ts
function createRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export interface PinData {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

interface ClusterDef {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  count: number;
}

// Cluster definitions matching screenshot distribution
// Each cluster: center (cx, cy), radius spread (rx, ry), pin count
const CLUSTERS: ClusterDef[] = [
  // ── Bratislava region (SW) — densest cluster ──
  { cx: 8, cy: 68, rx: 3.5, ry: 5.5, count: 40 },
  { cx: 10, cy: 72, rx: 3.5, ry: 4.5, count: 30 },
  { cx: 6, cy: 63, rx: 2.5, ry: 3.5, count: 24 },
  { cx: 12, cy: 66, rx: 3.5, ry: 4.5, count: 30 },
  { cx: 9, cy: 76, rx: 3.5, ry: 3.5, count: 20 },
  { cx: 11, cy: 60, rx: 2.5, ry: 3, count: 15 },

  // ── Trnava / Piešťany (W) ──
  { cx: 15, cy: 52, rx: 3.5, ry: 5.5, count: 20 },
  { cx: 18, cy: 45, rx: 3.5, ry: 4.5, count: 16 },
  { cx: 14, cy: 40, rx: 3.5, ry: 4.5, count: 14 },
  { cx: 16, cy: 48, rx: 3, ry: 3, count: 10 },

  // ── Nitra area (W-central) ──
  { cx: 22, cy: 58, rx: 4.5, ry: 4.5, count: 16 },
  { cx: 25, cy: 65, rx: 3.5, ry: 3.5, count: 10 },
  { cx: 20, cy: 62, rx: 3, ry: 3, count: 8 },

  // ── Trenčín (NW) ──
  { cx: 20, cy: 30, rx: 3.5, ry: 5.5, count: 20 },
  { cx: 23, cy: 22, rx: 3.5, ry: 4.5, count: 16 },
  { cx: 18, cy: 25, rx: 2.5, ry: 3.5, count: 14 },
  { cx: 21, cy: 35, rx: 3, ry: 3, count: 8 },

  // ── Žilina / Martin (N-central) ──
  { cx: 32, cy: 15, rx: 4.5, ry: 4.5, count: 20 },
  { cx: 36, cy: 12, rx: 3.5, ry: 3.5, count: 16 },
  { cx: 38, cy: 20, rx: 4.5, ry: 4.5, count: 14 },
  { cx: 30, cy: 10, rx: 3.5, ry: 3.5, count: 12 },
  { cx: 34, cy: 18, rx: 3, ry: 3, count: 10 },

  // ── Banská Bystrica (central) ──
  { cx: 40, cy: 40, rx: 4.5, ry: 5.5, count: 16 },
  { cx: 44, cy: 35, rx: 3.5, ry: 4.5, count: 10 },
  { cx: 38, cy: 48, rx: 3.5, ry: 3.5, count: 8 },
  { cx: 42, cy: 44, rx: 3, ry: 3, count: 8 },

  // ── Liptovský Mikuláš / Ružomberok (N) ──
  { cx: 42, cy: 18, rx: 3.5, ry: 3.5, count: 12 },
  { cx: 46, cy: 15, rx: 3.5, ry: 3.5, count: 10 },

  // ── Poprad / Tatras (N-central) ──
  { cx: 52, cy: 14, rx: 4.5, ry: 3.5, count: 16 },
  { cx: 56, cy: 18, rx: 3.5, ry: 3.5, count: 12 },
  { cx: 50, cy: 20, rx: 3.5, ry: 4.5, count: 10 },

  // ── Spišská Nová Ves / Rožňava (E-central) ──
  { cx: 58, cy: 30, rx: 4.5, ry: 5.5, count: 12 },
  { cx: 55, cy: 38, rx: 3.5, ry: 4.5, count: 8 },
  { cx: 57, cy: 34, rx: 3, ry: 3, count: 6 },

  // ── Prešov (E) ──
  { cx: 65, cy: 18, rx: 4.5, ry: 4.5, count: 20 },
  { cx: 68, cy: 25, rx: 4.5, ry: 5.5, count: 16 },
  { cx: 62, cy: 22, rx: 3.5, ry: 3.5, count: 12 },

  // ── Košice (E) ──
  { cx: 72, cy: 38, rx: 4.5, ry: 5.5, count: 20 },
  { cx: 75, cy: 32, rx: 3.5, ry: 4.5, count: 16 },
  { cx: 70, cy: 45, rx: 3.5, ry: 4.5, count: 12 },
  { cx: 73, cy: 42, rx: 3, ry: 3, count: 8 },

  // ── Michalovce / Humenné (far E) ──
  { cx: 82, cy: 22, rx: 4.5, ry: 4.5, count: 12 },
  { cx: 86, cy: 18, rx: 3.5, ry: 3.5, count: 10 },
  { cx: 80, cy: 30, rx: 3.5, ry: 4.5, count: 8 },

  // ── Snina / far NE ──
  { cx: 90, cy: 15, rx: 3.5, ry: 3.5, count: 8 },
  { cx: 93, cy: 22, rx: 3.5, ry: 4.5, count: 6 },

  // ── Southern corridor ──
  { cx: 28, cy: 72, rx: 5.5, ry: 3.5, count: 6 },
  { cx: 35, cy: 68, rx: 4.5, ry: 3.5, count: 5 },
  { cx: 48, cy: 62, rx: 4.5, ry: 3.5, count: 6 },
  { cx: 60, cy: 55, rx: 4.5, ry: 3.5, count: 5 },
  { cx: 42, cy: 58, rx: 4, ry: 3, count: 4 },

  // ── Scattered fills along highway corridors ──
  { cx: 26, cy: 38, rx: 3.5, ry: 4.5, count: 6 },
  { cx: 33, cy: 28, rx: 3.5, ry: 3.5, count: 6 },
  { cx: 48, cy: 28, rx: 3.5, ry: 4.5, count: 6 },
  { cx: 78, cy: 15, rx: 3.5, ry: 3.5, count: 6 },
  { cx: 45, cy: 50, rx: 4, ry: 4, count: 5 },
  { cx: 65, cy: 42, rx: 4, ry: 4, count: 5 },
];

export function generatePins(): PinData[] {
  const rng = createRng(137); // Different seed from chart data
  const pins: PinData[] = [];

  for (const cluster of CLUSTERS) {
    for (let i = 0; i < cluster.count; i++) {
      // Gaussian-ish distribution via Box-Muller approximation (sum of randoms)
      const u1 = rng();
      const u2 = rng();
      const u3 = rng();
      const u4 = rng();
      const gx = (u1 + u2 - 1); // range roughly -1 to 1, centered at 0
      const gy = (u3 + u4 - 1);

      const x = cluster.cx + gx * cluster.rx;
      const y = cluster.cy + gy * cluster.ry;

      // Clamp to valid range
      pins.push({
        x: Math.max(1, Math.min(99, Math.round(x * 100) / 100)),
        y: Math.max(1, Math.min(99, Math.round(y * 100) / 100)),
      });
    }
  }

  return pins;
}
