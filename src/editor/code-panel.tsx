"use client";

import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/tailwind-utils";
import { useAppState } from "./app-state";
import {
  generateLayoutCode,
  type CodeElement,
} from "./generate-code";

type CodePanelProps = {
  elements: CodeElement[];
  className?: string;
  title?: string;
};

/**
 * Live code panel: regenerates on transform changes and animates line
 * moves via auto-animate.
 */
export function CodePanel({
  elements,
  className,
  title = "layout.tsx",
}: CodePanelProps) {
  const { transforms } = useAppState();
  const listRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (listRef.current) {
      autoAnimate(listRef.current);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    generateLayoutCode(elements, transforms).then((code) => {
      if (!cancelled) {
        setLines(code.split("\n"));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [elements, transforms]);

  return (
    <aside
      className={cn(
        "flex max-h-[min(70vh,560px)] w-full max-w-md flex-col overflow-hidden rounded-lg border border-white/10 bg-black/70 font-mono text-[12px] text-white/90 shadow-2xl backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[11px] text-white/50">
        <span>{title}</span>
        <span className="text-white/30">live</span>
      </div>
      <div
        ref={listRef}
        className="overflow-auto px-3 py-3 leading-5"
        aria-label="Generated layout code"
      >
        {lines.map((line, index) => (
          <div
            key={`${index}-${line}`}
            className="whitespace-pre text-emerald-300/90"
          >
            {line.length === 0 ? " " : line}
          </div>
        ))}
      </div>
    </aside>
  );
}
