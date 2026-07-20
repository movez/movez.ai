"use client";

import {
  useCallback,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/utils/tailwind-utils";
import { useAppState } from "./app-state";
import { SelectionOverlay } from "./selection-overlay";

type ArtboardProps = {
  children: ReactNode;
  className?: string;
};

function findDragId(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest<HTMLElement>("[data-drag-id]");
  return el?.dataset.dragId ?? null;
}

/**
 * Tracks pointer/touch, manages selection, and shifts selected elements.
 * Wrap any page section you want to make editable.
 */
export function Artboard({ children, className }: ArtboardProps) {
  const {
    setPointer,
    setPointerDown,
    select,
    clearSelection,
    shiftSelection,
  } = useAppState();

  const draggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const id = findDragId(event.target);
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      setPointer(event.clientX, event.clientY);
      setPointerDown(true);

      if (!id) {
        clearSelection();
        draggingRef.current = false;
        return;
      }

      event.preventDefault();
      select(id, event.shiftKey);
      draggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [clearSelection, select, setPointer, setPointerDown]
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const dx = event.clientX - lastPointerRef.current.x;
      const dy = event.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      setPointer(event.clientX, event.clientY);

      if (draggingRef.current) {
        shiftSelection(dx, dy);
      }
    },
    [setPointer, shiftSelection]
  );

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      setPointerDown(false);
      draggingRef.current = false;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [setPointerDown]
  );

  return (
    <div
      className={cn("relative", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {children}
      <SelectionOverlay />
    </div>
  );
}
