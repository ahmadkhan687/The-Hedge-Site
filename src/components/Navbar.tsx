import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import NavLinks from "@/components/NavLinks";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1E2124] bg-[#F4F0EA]">
      <nav className="mx-auto flex items-center justify-between px-5 py-5 sm:px-8 lg:px-16">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-black no-underline sm:gap-3"
        >
          <Image
            src="/Home/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="size-8 shrink-0 sm:size-9"
          />
          <span className="flex flex-col">
            <span className="font-barlow-condensed text-base font-extrabold uppercase leading-normal">
              THE
            </span>
            <span className="font-eb-garamond text-[22px] font-medium italic leading-normal">
              Hedge Collective
            </span>
          </span>
        </Link>

        <NavLinks />
        <MobileNav />
      </nav>
    </header>
  );
}
