import { cn } from "@/utils/tailwind-utils";
import { NumberRotation } from "./number-rotation";

export const TimeUnit = ({
  label,
  value,
  currentFramework,
}: {
  label: string;
  value: number;
  currentFramework: string;
}) => (
  <div className="flex flex-col">
    <div className="text-3xl font-semibold text-white">
      <NumberRotation number={value} />
    </div>
    <div
      className={cn("text-[8px] font-medium", {
        "text-orange-400":
          currentFramework === "svelte" || currentFramework === "eventbrite",
        "text-purple-300": currentFramework === "foursquare",
        "text-sky-300": currentFramework === "safari",
        "text-yellow-300": currentFramework === "chrome",
        "text-red-300": currentFramework === "meetup",
        "text-green-300": currentFramework === "tripadvisor",
        "text-teal-300": currentFramework === "notepad",
        "text-rose-300": currentFramework === "mobile",
        "text-neutral-300": currentFramework === "desktop",
        "text-red-400": currentFramework === "yelp",
      })}
    >
      {label}
    </div>
  </div>
);
