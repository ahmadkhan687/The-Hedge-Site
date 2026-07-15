"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/nav";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle menu"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-0.5 w-6 bg-black transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`h-0.5 w-6 bg-black transition-opacity ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`h-0.5 w-6 bg-black transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-[#1E2124] bg-[#F4F0EA] px-5 py-6 shadow-sm">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`font-inter text-base font-medium uppercase leading-normal text-black ${
                      isActive
                        ? "underline underline-offset-4"
                        : "no-underline"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
