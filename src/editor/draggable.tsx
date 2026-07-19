"use client";

import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/tailwind-utils";
import { useAppState } from "./app-state";
import { toTranslate3d } from "./transforms";

type DraggableProps = {
  id: string;
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Marks a node as drag-selectable via `data-drag-id`.
 * Position offsets are applied with GPU-friendly translate3d.
 */
export function Draggable({
  id,
  children,
  className,
  as: Tag = "div",
}: DraggableProps) {
  const { transforms, selectedIds } = useAppState();
  const point = transforms[id] ?? { x: 0, y: 0 };
  const selected = selectedIds.includes(id);

  const style: CSSProperties = {
    transform: toTranslate3d(point.x, point.y),
    willChange: "transform",
    touchAction: "none",
  };

  const Component = Tag as "div";

  return (
    <Component
      data-drag-id={id}
      className={cn(
        "relative cursor-grab active:cursor-grabbing",
        // Force grab cursor on nested media/links so hover always signals draggable
        "[&_*]:!cursor-grab [&_*:active]:!cursor-grabbing",
        selected && "cursor-grabbing [&_*]:!cursor-grabbing",
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}
