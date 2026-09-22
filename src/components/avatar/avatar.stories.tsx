import type { Meta, StoryFn } from "@storybook/react";
import { Avatar } from "./avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/adFvaOeh8E3AKLFKRjYD3r?node-id=1489-27991",
    },
  },
  argTypes: {
    size: { control: "select", options: ["small", "big"] },
  },
} satisfies Meta<typeof Avatar>;

const photoSrc = "https://i.pravatar.cc/150?img=65";

// All 8 variants from Figma (Size × Chat × Icon)
export const AllVariants: StoryFn<typeof Avatar> = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>

    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "var(--palette-neutral-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Small</span>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Avatar size="small" initials="CP" />
        <Avatar size="small" initials="CP" showChat />
        <Avatar size="small" src={photoSrc} alt="Photo" />
        <Avatar size="small" src={photoSrc} alt="Photo" showChat />
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: "Mulish, sans-serif", fontSize: 12, color: "var(--palette-neutral-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Big</span>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Avatar size="big" initials="CP" />
        <Avatar size="big" initials="CP" showChat />
        <Avatar size="big" src={photoSrc} alt="Photo" />
        <Avatar size="big" src={photoSrc} alt="Photo" showChat />
      </div>
    </div>

  </div>
);

export const SmallText: StoryFn<typeof Avatar> = () => <Avatar size="small" initials="CP" />;
export const SmallPhoto: StoryFn<typeof Avatar> = () => <Avatar size="small" src={photoSrc} alt="Photo" />;
export const SmallTextChat: StoryFn<typeof Avatar> = () => <Avatar size="small" initials="CP" showChat />;
export const SmallPhotoChat: StoryFn<typeof Avatar> = () => <Avatar size="small" src={photoSrc} alt="Photo" showChat />;

export const BigText: StoryFn<typeof Avatar> = () => <Avatar size="big" initials="CP" />;
export const BigPhoto: StoryFn<typeof Avatar> = () => <Avatar size="big" src={photoSrc} alt="Photo" />;
export const BigTextChat: StoryFn<typeof Avatar> = () => <Avatar size="big" initials="CP" showChat />;
export const BigPhotoChat: StoryFn<typeof Avatar> = () => <Avatar size="big" src={photoSrc} alt="Photo" showChat />;

export const Default: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;
Default.args = { size: "small", initials: "CP" };
