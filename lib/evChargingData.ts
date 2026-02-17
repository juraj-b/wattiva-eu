// Deterministic pseudo-random number generator (LCG)
function createRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export interface ChargingDataPoint {
  label: string;
  day: number;
  hour: number;
  availability: number;
  charging: number;
  price: number;
}

// Base daily profiles (kWh per 15-min interval for 1,000 EVs)
// hour → [availability_base, charging_base, price_base]
const DAILY_PROFILE: Record<number, [number, number, number]> = {
  0: [500, 230, 70],    // Late night: high availability, managed charging active, cheap
  4: [400, 150, 80],    // Early morning: still high, tapering off
  8: [150, 55, 110],    // Morning: cars leave, minimal charging, price rising
  12: [130, 65, 120],   // Midday: lowest availability, moderate price
  16: [325, 95, 155],   // Evening: cars returning, managed keeps charging moderate, peak price
  20: [460, 185, 95],   // Night: high availability, managed shifts load here, dropping price
};

// Days that get price spikes (matching screenshot: spikes around Nov 8, 20-23)
const SPIKE_DAYS = new Set([8, 20, 21, 22, 23]);

export function generateEVChargingData(): ChargingDataPoint[] {
  const rng = createRng(42);
  const data: ChargingDataPoint[] = [];

  for (let day = 1; day <= 30; day++) {
    for (const hourStr of Object.keys(DAILY_PROFILE)) {
      const hour = Number(hourStr);
      const [baseAvail, baseCharge, basePrice] = DAILY_PROFILE[hour];

      // ±15% random variance
      const avail = baseAvail * (0.85 + rng() * 0.30);
      let charge = baseCharge * (0.85 + rng() * 0.30);
      let price = basePrice * (0.85 + rng() * 0.30);

      // Price spikes on specific days during daytime hours
      if (SPIKE_DAYS.has(day) && hour >= 8 && hour <= 16) {
        price = 280 + rng() * 170; // 280–450 EUR/MWh
      }

      // Ensure charging never exceeds availability
      charge = Math.min(charge, avail * 0.65);

      const dayStr = day.toString();
      const hourStr2 = hour.toString().padStart(2, "0");
      const label = `${dayStr}.11. ${hourStr2}:00`;

      data.push({
        label,
        day,
        hour,
        availability: Math.round(avail * 10) / 10,
        charging: Math.round(charge * 10) / 10,
        price: Math.round(price * 10) / 10,
      });
    }
  }

  return data;
}
