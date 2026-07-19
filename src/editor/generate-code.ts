import type { Point } from "./transforms";

export type CodeElement = {
  id: string;
  tag?: string;
  label?: string;
  className?: string;
};

function indent(level: number, line: string) {
  return `${"  ".repeat(level)}${line}`;
}

/**
 * Position-based code snapshot for the live panel.
 * (Velocity's flex/gap regrouping algorithm was not public — this keeps
 * offsets honest as translate3d so you can evolve generation later.)
 */
export async function generateLayoutCode(
  elements: CodeElement[],
  transforms: Record<string, Point>
): Promise<string> {
  const childLines = elements.flatMap((el) => {
    const point = transforms[el.id] ?? { x: 0, y: 0 };
    const tag = el.tag ?? "div";
    const label = el.label ?? el.id;
    const classAttr = el.className ? ` className="${el.className}"` : "";
    const style =
      point.x !== 0 || point.y !== 0
        ? ` style={{ transform: "translate3d(${point.x}px, ${point.y}px, 0)" }}`
        : "";

    return [
      indent(
        3,
        `<${tag}${classAttr}${style} data-drag-id="${el.id}">`
      ),
      indent(4, label),
      indent(3, `</${tag}>`),
    ];
  });

  return [
    "export function Layout() {",
    indent(1, "return ("),
    indent(2, "<>"),
    ...childLines,
    indent(2, "</>"),
    indent(1, ");"),
    "}",
    "",
  ].join("\n");
}
