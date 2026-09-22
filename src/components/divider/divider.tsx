// Divider — Figma node 2537:162703
// Types: Horizontal, Vertical, Draggable
// Margins: True (adds padding around the line) | False (no padding)
// Colour: #CFDAF7 (--palette-neutral-0)
// Draggable Hover: #2358F8 (--palette-primary-0) + resize cursor
import classNames from "classnames";
import css from "./divider.module.scss";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerType = "default" | "draggable";

export type DividerProps = {
  orientation?: DividerOrientation;
  type?: DividerType;
  /** Adds 16px padding (horizontal) or 8px padding (vertical) around the line */
  margins?: boolean;
  /** Hover state for draggable — turns line blue with resize cursor */
  isHovered?: boolean;
  className?: string;
  onDragHandleMouseDown?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

export const Divider = ({
  orientation = "horizontal",
  type = "default",
  margins = false,
  isHovered = false,
  className,
  onDragHandleMouseDown,
  onMouseEnter,
  onMouseLeave,
}: DividerProps) => {
  if (type === "draggable") {
    return (
      <div
        className={classNames(
          css.draggable,
          { [css.draggableHover]: isHovered },
          className
        )}
        onMouseDown={onDragHandleMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="separator"
        aria-orientation="vertical"
        title="Drag to resize"
      />
    );
  }

  return (
    <div
      className={classNames(
        css.divider,
        css[orientation],
        { [css.margins]: margins },
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  );
};
