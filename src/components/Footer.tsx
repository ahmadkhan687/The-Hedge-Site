import Link from "next/link";

const footerNav = [
  { label: "VARRO", href: "/varro" },
  { label: "DOMAINS", href: "/domains" },
  { label: "SOVEREIGNTY", href: "/sovereignty" },
  { label: "PERSPECTIVES", href: "/perspectives" },
  { label: "ABOUT", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#070A0F] py-12 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1728px] flex-col gap-10 px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-5">
            <p className="font-eb-garamond text-[28px] font-medium italic leading-normal text-white">
              The Hedge Collective
            </p>
            <p className="max-w-[560px] font-inter text-base font-normal leading-[160%] text-white">
              Building foundational infrastructure for digital resilience
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/request-access"
                className="font-inter text-base font-extrabold uppercase leading-normal text-[#EAEAEA] no-underline"
              >
                Contact Us
              </Link>
              <Link
                href="/about"
                className="font-inter text-base font-extrabold uppercase leading-normal text-[#EAEAEA] no-underline"
              >
                Open Roles
              </Link>
            </div>
          </div>

          <nav>
            <ul className="flex flex-col items-start gap-2 lg:items-end">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-right font-inter text-base font-extrabold uppercase leading-normal text-white no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="h-[4px] w-full bg-white" />

        <p className="self-end whitespace-pre-line text-right font-inter text-base font-normal uppercase leading-[121.325%] text-white">
          © 2024 THE HEDGE COLLECTIVE.{"\n"}ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
