/**
 * Velocity-style editable page infrastructure.
 *
 * Usage:
 *   <AppStateProvider>
 *     <Artboard>
 *       <Draggable id="hero-title">...</Draggable>
 *       <CodePanel elements={[{ id: "hero-title", label: "Headline" }]} />
 *     </Artboard>
 *   </AppStateProvider>
 */
export { AppStateProvider, useAppState } from "./app-state";
export { Artboard } from "./artboard";
export { Draggable } from "./draggable";
export { SelectionOverlay } from "./selection-overlay";
export { CodePanel } from "./code-panel";
export { generateLayoutCode, type CodeElement } from "./generate-code";
export { useFrameworkRotation } from "./use-framework-rotation";
export {
  parseTranslate3d,
  toTranslate3d,
  getElementByDragId,
  type Point,
} from "./transforms";
