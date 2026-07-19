"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Point } from "./transforms";

export type AppState = {
  mouseX: number;
  mouseY: number;
  isPointerDown: boolean;
  selectedIds: string[];
  transforms: Record<string, Point>;
  setPointer: (x: number, y: number) => void;
  setPointerDown: (down: boolean) => void;
  select: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  shiftSelection: (dx: number, dy: number) => void;
  setTransform: (id: string, point: Point) => void;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [transforms, setTransforms] = useState<Record<string, Point>>({});
  const selectedIdsRef = useRef(selectedIds);
  selectedIdsRef.current = selectedIds;

  const setPointer = useCallback((x: number, y: number) => {
    setMouseX(x);
    setMouseY(y);
  }, []);

  const setPointerDown = useCallback((down: boolean) => {
    setIsPointerDown(down);
  }, []);

  const select = useCallback((id: string, multi = false) => {
    setSelectedIds((current) => {
      if (multi) {
        return current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id];
      }
      return [id];
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const setTransform = useCallback((id: string, point: Point) => {
    setTransforms((current) => ({ ...current, [id]: point }));
  }, []);

  const shiftSelection = useCallback((dx: number, dy: number) => {
    if (dx === 0 && dy === 0) return;

    setTransforms((current) => {
      const next = { ...current };
      for (const id of selectedIdsRef.current) {
        const prev = next[id] ?? { x: 0, y: 0 };
        next[id] = { x: prev.x + dx, y: prev.y + dy };
      }
      return next;
    });
  }, []);

  const value = useMemo<AppState>(
    () => ({
      mouseX,
      mouseY,
      isPointerDown,
      selectedIds,
      transforms,
      setPointer,
      setPointerDown,
      select,
      clearSelection,
      shiftSelection,
      setTransform,
    }),
    [
      mouseX,
      mouseY,
      isPointerDown,
      selectedIds,
      transforms,
      setPointer,
      setPointerDown,
      select,
      clearSelection,
      shiftSelection,
      setTransform,
    ]
  );

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
}
