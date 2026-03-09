"use client";

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollCanvasProps {
  frameCount: number;
  framePathTemplate: string; // e.g., "/frames/cup_anim_{index}.svg"
  className?: string;
}

export function ScrollCanvas({ frameCount, framePathTemplate, className }: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedFrames, setLoadedFrames] = useState(0);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Replace {index} with padded number
      const path = framePathTemplate.replace("{index}", i.toString().padStart(4, "0"));
      img.src = path;
      img.onload = () => {
        loaded++;
        setLoadedFrames(loaded);
        if (loaded === frameCount) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, [frameCount, framePathTemplate]);

  // Framer Motion simple scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const currentFrameMotion = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    // Match canvas size to image aspect ratio (or cover it nicely)
    const ratio = window.devicePixelRatio || 1;
    if (canvas.width !== img.width * ratio || canvas.height !== img.height * ratio) {
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        // Optionally resize logic if desired, but for now we'll just scale to cover.
    }
    
    // Simple draw logic: Center and Cover
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

  }, [images]);

  // Initial draw once loaded
  useLayoutEffect(() => {
    if (images.length === frameCount) {
      drawFrame(0);
    }
  }, [images, frameCount, drawFrame]);

  // Draw continuously as scroll changes
  useMotionValueEvent(currentFrameMotion, "change", (latest) => {
    const frameIndex = Math.floor(latest);
    if (images[frameIndex]) {
      drawFrame(frameIndex);
    }
  });

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className || ""}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
        {loadedFrames < frameCount && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#2B1B15] text-[#F3E5D8] font-mono text-sm">
            Loading Cinematic Frames... {Math.round((loadedFrames / frameCount) * 100)}%
          </div>
        )}
      </div>
    </div>
  );
}
