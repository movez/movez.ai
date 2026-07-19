"use client";

import { useEffect, useState } from "react";
import { useAppState } from "./app-state";
import { getElementByDragId } from "./transforms";

type Box = {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
};

const PAD = 6;
const HANDLE = 8;
/** Pale periwinkle matching the Velocity-style text selection chrome */
const BORDER = "#C4B8F0";

/**
 * Figma-style selection boxes with corner handles.
 * Reads getBoundingClientRect on a rAF loop while selected.
 */
export function SelectionOverlay() {
  const { selectedIds, transforms } = useAppState();
  const [boxes, setBoxes] = useState<Box[]>([]);

  useEffect(() => {
    if (selectedIds.length === 0) {
      setBoxes([]);
      return;
    }

    let frame = 0;

    const measure = () => {
      const next: Box[] = [];
      for (const id of selectedIds) {
        const el = getElementByDragId(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        next.push({
          id,
          top: rect.top - PAD,
          left: rect.left - PAD,
          width: rect.width + PAD * 2,
          height: rect.height + PAD * 2,
        });
      }
      setBoxes(next);
      frame = requestAnimationFrame(measure);
    };

    frame = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(frame);
  }, [selectedIds, transforms]);

  if (boxes.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {boxes.map((box) => (
        <div
          key={box.id}
          className="absolute"
          style={{
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
            border: `1px solid ${BORDER}`,
          }}
        >
          {(
            [
              { top: -HANDLE / 2, left: -HANDLE / 2 },
              { top: -HANDLE / 2, right: -HANDLE / 2 },
              { bottom: -HANDLE / 2, left: -HANDLE / 2 },
              { bottom: -HANDLE / 2, right: -HANDLE / 2 },
            ] as const
          ).map((pos, index) => (
            <span
              key={index}
              className="absolute bg-white"
              style={{
                width: HANDLE,
                height: HANDLE,
                ...pos,
                boxShadow: `0 0 0 1px ${BORDER}`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
