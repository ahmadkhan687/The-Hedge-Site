"use client";

import { useEffect, useRef } from "react";

type LoopingBackgroundVideoProps = {
  src: string;
  className?: string;
};

/** Optimized, faststart MP4 background that keeps looping while mounted/in view. */
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

    const onEnded = () => {
      video.currentTime = 0;
      play();
    };

    const onStall = () => {
      play();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 },
    );

    video.addEventListener("ended", onEnded);
    video.addEventListener("waiting", onStall);
    video.addEventListener("stalled", onStall);
    observer.observe(video);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("waiting", onStall);
      video.removeEventListener("stalled", onStall);
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
