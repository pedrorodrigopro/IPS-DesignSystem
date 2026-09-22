import type { Meta, StoryFn } from "@storybook/react";
import { Toast } from "./toast";

export default {
  title: "Molecules/Toast",
  component: Toast,
} satisfies Meta<typeof Toast>;

export const AllKinds: StoryFn<typeof Toast> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    <Toast kind="info" message="Booking created successfully." onDismiss={() => {}} />
    <Toast kind="success" message="Profile updated." onDismiss={() => {}} />
    <Toast kind="warning" message="This booking overlaps with another." onDismiss={() => {}} />
    <Toast kind="error" message="Failed to save. Please try again." onDismiss={() => {}} />
  </div>
);
