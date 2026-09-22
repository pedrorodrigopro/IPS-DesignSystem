// Avatar — Figma node 1489:27991
// Props: size (small=30px / big=80px), src (photo), initials, showChat
import classNames from "classnames";
import css from "./avatar.module.scss";

export type AvatarSize = "small" | "big";

export type AvatarProps = {
  /** Display photo — Icon=Photo variant */
  src?: string;
  /** Initials shown when no src — Icon=Text variant (e.g. "CP") */
  initials?: string;
  /** Alt text for the photo */
  alt?: string;
  size?: AvatarSize;
  /** Show chat bubble badge (Chat=True) */
  showChat?: boolean;
  className?: string;
};

export const Avatar = ({
  src,
  initials,
  alt,
  size = "small",
  showChat = false,
  className,
}: AvatarProps) => (
  <span className={classNames(css.avatar, css[size], className)}>
    {src ? (
      <img src={src} alt={alt ?? initials ?? "avatar"} className={css.photo} />
    ) : (
      <span className={css.initials} aria-label={alt ?? initials}>
        {initials}
      </span>
    )}
    {showChat && (
      <span className={classNames(css.chat, css[`chat_${size}`])} aria-hidden="true">
        {/* chat icon — green bubble, fill="currentColor" */}
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M2.00233 9.50066C2.00233 5.90733 5.65866 3 10.169 3C14.6793 3 18.338 5.9085 18.338 9.49949C18.338 13.0905 14.6816 16.0001 10.1713 16.0001C9.00231 16.0016 7.84226 15.7963 6.74483 15.3935C5.46704 16.4104 3.88836 16.9753 2.2555 17C2.20627 17.0006 2.15794 16.9868 2.11647 16.9603C2.075 16.9337 2.04222 16.8956 2.02217 16.8506C2.00158 16.8058 1.99513 16.7558 2.00367 16.7073C2.01222 16.6587 2.03535 16.6139 2.07 16.5788C2.86769 15.7223 3.46539 14.6994 3.82 13.584C3.25829 13.0603 2.80785 12.4289 2.49556 11.7273C2.18326 11.0258 2.01552 10.2685 2.00233 9.50066Z" fill="currentColor" />
        </svg>
      </span>
    )}
  </span>
);
