export type Point = { x: number; y: number };

export function parseTranslate3d(transform: string | null | undefined): Point {
  if (!transform || transform === "none") {
    return { x: 0, y: 0 };
  }

  const match = transform.match(
    /translate3d\(\s*([-\d.]+)px\s*,\s*([-\d.]+)px\s*,\s*([-\d.]+)px\s*\)/
  );

  if (!match) {
    return { x: 0, y: 0 };
  }

  return {
    x: Number(match[1]) || 0,
    y: Number(match[2]) || 0,
  };
}

export function toTranslate3d(x: number, y: number, z = 0): string {
  return `translate3d(${x}px, ${y}px, ${z}px)`;
}

export function getElementByDragId(id: string): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.querySelector<HTMLElement>(`[data-drag-id="${id}"]`);
}
