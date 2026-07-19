"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { assets } from "@/utils/asset-utils";
import { cn } from "@/utils/tailwind-utils";
import { FrameworkRotation } from "@/components/framework-rotation";
import { Poppins } from "next/font/google";
import {
  AppStateProvider,
  Artboard,
  Draggable,
  useFrameworkRotation,
} from "@/editor";

const poppins = Poppins({
  weight: ["700", "800"],
  subsets: ["latin"],
});

function HomeCanvas() {
  const currentFramework = useFrameworkRotation(2000);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    setShowBackground(true);
  }, []);

  return (
    <Artboard className={cn("relative min-h-screen", `theme-${currentFramework}`)}>
      {/* warm dark base */}
      <div className="fixed inset-0 bg-[#0c0a09]" />
      {/* orange grid */}
      <div className="hero-grid pointer-events-none fixed inset-0 opacity-50" />
      {/* soft vignette */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(255,122,61,0.12), transparent 60%)",
        }}
      />
      {/* reveal */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-20 bg-black transition-opacity duration-1000",
          showBackground ? "opacity-0" : "opacity-100"
        )}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <Draggable id="logos" className="mb-7 flex items-center justify-center gap-3 sm:mb-9 sm:gap-4">
          <FrameworkRotation currentFramework={currentFramework} />
          <span
            className="select-none text-3xl font-light text-white sm:text-4xl"
            aria-hidden
          >
            &gt;
          </span>
          <Image
            alt="Movez"
            src={assets.movezlarge}
            width={96}
            height={112}
            className="h-[80px] w-auto drop-shadow-[0_0_18px_rgba(168,85,247,0.55)] sm:h-[96px]"
            priority
          />
        </Draggable>

        <Draggable id="headline">
          <h1
            className={cn(
              poppins.className,
              "mb-8 text-center text-[3.25rem] font-extrabold leading-[1.05] tracking-tight sm:mb-10 sm:text-6xl md:text-7xl"
            )}
          >
            <span className="block text-white">Interactive</span>
            <span className="block text-white">Discovery</span>
            <span className="accent-text block">reimagined</span>
          </h1>
        </Draggable>

        <Draggable id="subcopy">
          <p className="mb-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px] text-white/80 sm:text-base md:text-lg">
            <span>Request Beta Access</span>
            <Image
              alt="Movez"
              src={assets.movez}
              width={28}
              height={32}
              className="inline-block h-7 w-auto drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
            <span className="text-white/70">+</span>
            <Image
              alt="OpenAI"
              src={assets.openai}
              width={120}
              height={28}
              className="inline-block h-6 w-auto sm:h-7"
            />
          </p>
        </Draggable>

        <Draggable id="cta">
          <a
            href="https://beta.movez.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="accent-bg block rounded-md px-7 py-3.5 text-sm font-bold text-black sm:text-base"
            onClick={(event) => {
              // Edit mode: drag wins; double-click still opens the link.
              event.preventDefault();
            }}
            onDoubleClick={() => {
              window.open("https://beta.movez.ai", "_blank", "noopener,noreferrer");
            }}
          >
            Request Access
          </a>
        </Draggable>
      </div>

    </Artboard>
  );
}

export default function Home() {
  return (
    <AppStateProvider>
      <HomeCanvas />
    </AppStateProvider>
  );
}
