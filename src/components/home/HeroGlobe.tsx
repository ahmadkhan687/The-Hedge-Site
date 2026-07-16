"use client";

import { useEffect, useState } from "react";
import { Globe } from "@/components/ui/globe";

export default function HeroGlobe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0" aria-hidden="true" />;
  }

  return <Globe className="absolute inset-0" />;
}
