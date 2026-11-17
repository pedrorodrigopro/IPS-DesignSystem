// ProPilot "industry" flow — pure logic (no React). Placeholder content, no real AI.

export type IndustryFields = { bio: string; skills: string };

export const isIndustryMessage = (text: string) => /\bindustry\b/i.test(text);

const FILLER = new Set(["the", "this", "that", "a", "an", "your", "my", "our", "of", "in", "to", "for", "any", "each"]);

/** "…to the banking industry" -> "Banking"; no usable word before "industry" -> "Target industry". */
export function industryName(text: string): string {
  const m = text.match(/([\p{L}][\p{L}&-]*)\s+industry\b/iu);
  const w = m?.[1] ?? "";
  if (!w || FILLER.has(w.toLowerCase())) return "Target industry";
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

const EXTRA_SKILLS: Record<string, string[]> = {
  banking: ["Regulatory Reporting", "Basel III", "KYC/AML"],
};

export function adaptCV(cv: IndustryFields, industry: string): IndustryFields {
  const extra = EXTRA_SKILLS[industry.toLowerCase()] ?? [`${industry} regulation`, `${industry} analytics`, "Client advisory"];
  return {
    bio: `Experienced in the ${industry.toLowerCase()} industry, translating financial rigour into reliable results for clients and regulators. ${cv.bio}`,
    skills: `${cv.skills}, ${extra.join(", ")}`,
  };
}
