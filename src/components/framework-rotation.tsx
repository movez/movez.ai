import Image from "next/image";
import { assets } from "@/utils/asset-utils";
import { type Framework, frameworks } from "@/utils/framework-utils";
import { cn } from "@/utils/tailwind-utils";

export const FrameworkRotation = ({
  currentFramework,
}: {
  currentFramework: Framework;
}) => {
  return (
    <div className="relative h-[72px] w-[72px] sm:h-[88px] sm:w-[88px]">
      {frameworks.map((name, index) => (
        <Image
          key={name}
          src={assets[name]}
          className={cn(
            "absolute inset-0 h-full w-full object-contain transition-all duration-300",
            currentFramework === name
              ? "translate-y-0 opacity-100"
              : index > frameworks.indexOf(currentFramework)
                ? "-translate-y-2 opacity-0"
                : "translate-y-2 opacity-0"
          )}
          alt=""
          width={88}
          height={88}
          priority={index === 0}
        />
      ))}
    </div>
  );
};
