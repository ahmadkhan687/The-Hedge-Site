import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import NavLinks from "@/components/NavLinks";

export default function Navbar() {
  return (
    <header className="relative border-b border-[#1E2124] bg-[#F4F0EA]">
      <nav className="mx-auto flex items-center justify-between px-5 py-5 sm:px-8 lg:px-16">
        <Link href="/" className="flex flex-col text-black no-underline">
          <span className="font-barlow-condensed text-base font-extrabold uppercase leading-normal">
            THE
          </span>
          <span className="font-eb-garamond text-[22px] font-medium italic leading-normal">
            Hedge Collective
          </span>
        </Link>

        <NavLinks />
        <MobileNav />
      </nav>
    </header>
  );
}
