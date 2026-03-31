"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import { CASHFLOW_DATA } from "@/lib/constants";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-ink text-bg border-2 border-ink px-3 py-2 shadow-neo-sm font-mono text-[10px]">
      <p className="opacity-50 mb-1 tracking-widest uppercase">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="flex gap-2 items-center">
          <span
            className="w-2 h-2 inline-block"
            style={{ background: entry.color }}
          />
          <span className="opacity-60">{entry.name === "revenue" ? "Rev" : "Burn"}:</span>
          <span className="font-bold">${entry.value}K</span>
        </p>
      ))}
    </div>
  );
}

export function CashflowChart() {
  return (
    <div className="chart-breathe">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={CASHFLOW_DATA}
          margin={{ top: 10, right: 8, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0047FF" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#0047FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradBurn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF3B30" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#FF3B30" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            stroke="#0C0C0A"
            strokeOpacity={0.06}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontFamily: "var(--font-space-mono)", fontSize: 9, fill: "#6E6B62" }}
            tickLine={false}
            axisLine={false}
            interval={1}
          />
          <YAxis
            tick={{ fontFamily: "var(--font-space-mono)", fontSize: 9, fill: "#6E6B62" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}K`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#0C0C0A", strokeWidth: 1, strokeDasharray: "4 4" }} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#0047FF"
            strokeWidth={2}
            fill="url(#gradRev)"
            dot={false}
            activeDot={{ r: 4, fill: "#0047FF", stroke: "#EDE8DB", strokeWidth: 2 }}
            animationDuration={2400}
            animationEasing="ease-out"
          />
          <Area
            type="monotone"
            dataKey="burn"
            stroke="#FF3B30"
            strokeWidth={2}
            fill="url(#gradBurn)"
            dot={false}
            activeDot={{ r: 4, fill: "#FF3B30", stroke: "#EDE8DB", strokeWidth: 2 }}
            animationDuration={2800}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
