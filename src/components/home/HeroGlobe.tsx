"use client";

import { useEffect, useState } from "react";
import DottedGlobe from "@/components/ui/dotted-globe";

export default function HeroGlobe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0" aria-hidden="true" />;
  }

  return <DottedGlobe className="absolute inset-0" />;
}
