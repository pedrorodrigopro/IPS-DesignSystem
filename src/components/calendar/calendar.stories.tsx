import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "./calendar";

export default {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=3506-209189",
    },
    layout: "centered",
  },
  argTypes: {
    type: { control: "select", options: ["date", "range", "date-time"] },
  },
} satisfies Meta<typeof Calendar>;

// ── Type=Date ─────────────────────────────────────────────────────────────────

export const Date: StoryFn<typeof Calendar> = () => {
  const [value, setValue] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 4));
  return (
    <Calendar
      type="date"
      value={value}
      onChange={setValue}
    />
  );
};

// ── Type=Range ────────────────────────────────────────────────────────────────

export const Range: StoryFn<typeof Calendar> = () => {
  const [start, setStart] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 8));
  const [end, setEnd] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 11));
  return (
    <Calendar
      type="range"
      rangeStart={start}
      rangeEnd={end}
      onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
    />
  );
};

// ── Type=Date & Time ──────────────────────────────────────────────────────────

export const DateAndTime: StoryFn<typeof Calendar> = () => {
  const [value, setValue] = useState<globalThis.Date | null>(new globalThis.Date(2023, 0, 8));
  const [time, setTime] = useState("00:00");
  return (
    <Calendar
      type="date-time"
      value={value}
      timeValue={time}
      onChange={setValue}
      onTimeChange={setTime}
    />
  );
};

// ── Day selector states ───────────────────────────────────────────────────────
// Shows all day states from node 2143:140771

export const DayStates: StoryFn<typeof Calendar> = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center", padding: 16 }}>
    {/* Default */}
    <button style={{
      width: 36, height: 36, borderRadius: 9999, border: "1px solid #D5D5D5",
      background: "white", fontFamily: "Mulish, sans-serif", fontSize: 14, fontWeight: 400,
      color: "#5C6E9E", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    }}>M</button>
    {/* Hover */}
    <button style={{
      width: 36, height: 36, borderRadius: 9999, border: "1px solid #D5D5D5",
      background: "rgba(0,0,0,0.04)", fontFamily: "Mulish, sans-serif", fontSize: 14, fontWeight: 400,
      color: "#5C6E9E", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    }}>M</button>
    {/* Focus */}
    <button style={{
      width: 36, height: 36, borderRadius: 9999, border: "1px solid #D5D5D5",
      background: "white", fontFamily: "Mulish, sans-serif", fontSize: 14, fontWeight: 400,
      color: "#5C6E9E", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 0 0 4px rgba(12,20,87,1), 0 0 0 2px white",
    }}>M</button>
    {/* Selected */}
    <button style={{
      width: 36, height: 36, borderRadius: 9999, border: "none",
      background: "#0C1457", fontFamily: "Mulish, sans-serif", fontSize: 14, fontWeight: 700,
      color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    }}>M</button>
  </div>
);

export const Default: StoryFn<typeof Calendar> = (args) => <Calendar {...args} />;
Default.args = { type: "date" };
