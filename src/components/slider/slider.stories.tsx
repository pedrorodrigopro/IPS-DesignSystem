import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { SliderNumber, SliderPercentage, SliderRange } from "./slider";

export default {
  title: "Components/Slider",
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=7165-336045" },
    layout: "centered",
  },
};

// ── Range (Type=Range) ────────────────────────────────────────────────────────

export const Range: StoryFn = () => {
  const [from, setFrom] = useState(3);
  const [to, setTo] = useState(5);
  return (
    <div style={{ width: 528, padding: 24 }}>
      <SliderRange
        label="Show a range"
        valueFrom={from}
        valueTo={to}
        min={0}
        max={24}
        minLabel="0h"
        maxLabel="24h"
        onChangeFrom={setFrom}
        onChangeTo={setTo}
      />
    </div>
  );
};

// ── Number (Type=Number) ──────────────────────────────────────────────────────

export const Number: StoryFn = () => {
  const [value, setValue] = useState(3);
  return (
    <div style={{ width: 528, padding: 24 }}>
      <SliderNumber
        label="Show a number"
        value={value}
        min={0}
        max={12}
        onChange={setValue}
      />
    </div>
  );
};

// ── Percentage (Type=Percentage) ──────────────────────────────────────────────

export const Percentage: StoryFn = () => {
  const [value, setValue] = useState(30);
  return (
    <div style={{ width: 528, padding: 24 }}>
      <SliderPercentage
        label="Show a stepped percentage steps *1"
        value={value}
        step={1}
        onChange={setValue}
      />
    </div>
  );
};

// ── All variants ──────────────────────────────────────────────────────────────

export const AllVariants: StoryFn = () => {
  const [rangeFrom, setRangeFrom] = useState(3);
  const [rangeTo, setRangeTo] = useState(5);
  const [num, setNum] = useState(3);
  const [pct, setPct] = useState(30);
  return (
    <div style={{ width: 528, display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
      <SliderRange label="Show a range" valueFrom={rangeFrom} valueTo={rangeTo} min={0} max={24} minLabel="0h" maxLabel="24h" onChangeFrom={setRangeFrom} onChangeTo={setRangeTo} />
      <SliderNumber label="Show a number" value={num} min={0} max={12} onChange={setNum} />
      <SliderPercentage label="Show a stepped percentage steps *1" value={pct} onChange={setPct} />
    </div>
  );
};
