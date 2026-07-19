"use client";

import { useEffect, useState } from "react";
import {
  frameworks,
  type Framework,
} from "@/utils/framework-utils";

/**
 * Cycles through frameworks every `intervalMs` (default 2s), matching
 * the Velocity-style rotating theme infrastructure.
 */
export function useFrameworkRotation(intervalMs = 2000) {
  const [currentFramework, setCurrentFramework] = useState<Framework>(
    frameworks[0]
  );

  useEffect(() => {
    let index = 0;
    const id = setInterval(() => {
      index = (index + 1) % frameworks.length;
      setCurrentFramework(frameworks[index]);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return currentFramework;
}
