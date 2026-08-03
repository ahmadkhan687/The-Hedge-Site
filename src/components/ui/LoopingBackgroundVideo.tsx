"use client";

import { useEffect, useRef } from "react";

type LoopingBackgroundVideoProps = {
  src: string;
  className?: string;
};

/** Background MP4 that autoplays and loops continuously while in view. */
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

    // Ensure playback starts (autoplay policies / hydration).
    play();

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

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
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
