"use client";

import { useEffect, useRef } from "react";

type LoopingBackgroundVideoProps = {
  src: string;
  className?: string;
};

/** Background MP4 that autoplays and loops only while in (or near) view. */
export default function LoopingBackgroundVideo({
  src,
  className,
}: LoopingBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Load source only when near viewport
          if (video.preload !== "auto") {
            video.preload = "auto";
            video.load();
          }
          play();
        } else {
          video.pause();
        }
      },
      { rootMargin: "40% 0px", threshold: 0.01 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
