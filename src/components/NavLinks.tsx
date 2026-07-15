"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/nav";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-6 lg:flex lg:gap-10">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`font-inter text-base font-medium uppercase leading-normal text-black transition-opacity hover:opacity-70 ${
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
  );
}
