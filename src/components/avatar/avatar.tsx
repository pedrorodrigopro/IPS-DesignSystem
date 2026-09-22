import classNames from "classnames";
import css from "./avatar.module.scss";

export type AvatarSize = "sm" | "md" | "lg";

export type AvatarProps = {
  src?: string;
  initials?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
};

export const Avatar = ({ src, initials, name, size = "md", className }: AvatarProps) => (
  <div
    className={classNames(css.avatar, css[size], className)}
    title={name}
    aria-label={name}
  >
    {src ? (
      <img src={src} alt={name ?? "avatar"} className={css.image} />
    ) : (
      <span className={css.initials}>{initials ?? name?.slice(0, 2).toUpperCase() ?? "?"}</span>
    )}
  </div>
);
