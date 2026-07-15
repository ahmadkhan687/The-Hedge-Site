"use client";

export default function ScrollDownButton() {
  const handleScroll = () => {
    document
      .getElementById("operating-model")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      className="flex min-h-[44px] w-full max-w-[240px] items-center justify-center gap-2 bg-[#2E332E] px-6 py-3 font-inter text-sm font-medium uppercase leading-normal text-white transition-opacity hover:opacity-90 sm:w-[228px] sm:text-base"
    >
      SCROLL DOWN
      <svg
        width={12}
        height={12}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M2.4996 6H9.5004M6 9.5004L9.5004 6L6 2.4996"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
