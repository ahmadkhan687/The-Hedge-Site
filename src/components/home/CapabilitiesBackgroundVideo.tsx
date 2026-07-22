import LoopingBackgroundVideo from "@/components/ui/LoopingBackgroundVideo";

/** Desktop Capabilities background — optimized MP4, keeps looping while mounted. */
export default function CapabilitiesBackgroundVideo() {
  return (
    <LoopingBackgroundVideo
      src="/Home/moving-flowing-bg.mp4"
      className="pointer-events-none absolute inset-0 hidden size-full object-cover object-[center_45%] opacity-70 lg:block"
    />
  );
}
