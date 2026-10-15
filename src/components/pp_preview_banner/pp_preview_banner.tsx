// PPPreviewBanner — ProPilot preview mode banner
// Appears at the top-centre of the content area when a suggestion is being previewed.
// Positioned absolute — parent must be position:relative.
//
// Design: dark gradient pill, ProPilot icon, "ProPilot Preview Mode" bold,
//         optional label text muted — "— Move Tech Lead to Mon 14 Sep"

import React from "react";
import css from "./pp_preview_banner.module.scss";

// Inline SVG for the ProPilot icon (white, no external dep)
const ProPilotIcon = () => (
  <svg width={20} height={20} viewBox="0 0 34 36" fill="none" aria-hidden="true">
    <path d="M25.095 5C30.0202 5.04073 34.0003 9.03735 34.0003 13.9609C34.0002 18.833 30.1031 22.7943 25.2493 22.916L25.2503 22.9219H15.7346L14.8548 28.4727C14.7152 29.3524 13.9564 30 13.0657 30C11.9524 29.9999 11.1024 29.0048 11.2766 27.9053L12.6399 19.3066H25.0178C27.9772 19.3066 30.3781 16.9135 30.3782 13.9609C30.3782 11.0082 27.9783 8.61523 25.0188 8.61523H16.6194C15.5171 8.61523 14.6709 7.63656 14.8303 6.5459C14.9602 5.65817 15.7222 5 16.6194 5H25.095Z" fill="white"/>
    <path d="M24.7931 9.66858C27.2105 9.66884 29.1704 11.5905 29.1704 13.9609C29.1704 16.3311 27.2105 18.2529 24.7931 18.2531H11.7707L10.1076 28.4173C9.95827 29.33 9.16965 30 8.24482 30C7.07282 30 6.18413 28.9431 6.38528 27.7885L8.45099 15.9314C8.58122 15.1839 9.23008 14.6383 9.98883 14.6383H24.7931C25.1264 14.638 25.4163 14.2934 25.4163 13.9609C25.4163 13.6283 25.1264 13.2837 24.7931 13.2834H16.0154C14.9133 13.2834 14.0678 12.3055 14.227 11.215C14.3566 10.327 15.118 9.66858 16.0154 9.66858H24.7931Z" fill="white"/>
    <path d="M24 26L25.3505 29.6495L29 31L25.3505 32.3505L24 36L22.6495 32.3505L19 31L22.6495 29.6495L24 26Z" fill="white"/>
    <path d="M4.5 6L5.71541 9.28459L9 10.5L5.71541 11.7154L4.5 15L3.28459 11.7154L0 10.5L3.28459 9.28459L4.5 6Z" fill="white"/>
    <path d="M10.5 0L11.4453 2.55468L14 3.5L11.4453 4.44532L10.5 7L9.55468 4.44532L7 3.5L9.55468 2.55468L10.5 0Z" fill="white"/>
  </svg>
);

export type PPPreviewBannerProps = {
  /** Whether the banner is visible */
  visible: boolean;
  /** Optional label shown after the title — e.g. "Result after applying — Kevin & Diana" */
  label?: string;
  /** Additional class for positioning overrides */
  className?: string;
};

export function PPPreviewBanner({ visible, label, className }: PPPreviewBannerProps) {
  if (!visible) return null;
  return (
    <div className={`${css.banner}${className ? ` ${className}` : ""}`} aria-live="polite">
      <ProPilotIcon />
      <span className={css.title}>ProPilot Preview Mode</span>
      {label && <span className={css.label}>— {label}</span>}
    </div>
  );
}
