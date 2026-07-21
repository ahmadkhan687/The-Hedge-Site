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
    <footer className="w-full bg-[#111] py-12 lg:bg-[#070A0F] lg:py-16">
      <div className="mx-auto flex w-full max-w-[1728px] flex-col gap-8 px-5 lg:gap-10 lg:px-16">
        {/* Mobile layout */}
        <div className="flex flex-col gap-10 lg:hidden">
          <div className="flex flex-col gap-3">
            <p className="font-eb-garamond text-[28px] font-medium italic leading-normal text-white">
              The Hedge Collective
            </p>
            <p className="font-inter text-sm font-normal leading-[160%] text-white/90">
              Building foundational infrastructure for digital resilience
            </p>
          </div>

          <nav>
            <ul className="flex flex-col items-start gap-4">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-inter text-base font-extrabold uppercase leading-normal tracking-[0.02em] text-white no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-8">
            <Link
              href="/request-access"
              className="font-inter text-sm font-extrabold uppercase leading-normal tracking-[0.04em] text-white no-underline"
            >
              Contact Us
            </Link>
            <Link
              href="https://www.linkedin.com/company/thehedgecollective/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm font-extrabold uppercase leading-normal tracking-[0.04em] text-white no-underline"
            >
              Open Roles
            </Link>
          </div>

          <div className="h-px w-full bg-white" />

          <p className="font-inter text-xs font-normal uppercase leading-[160%] tracking-[0.02em] text-white">
            © 2024 THE HEDGE COLLECTIVE. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Desktop layout */}
        <div className="hidden justify-between gap-10 lg:flex lg:items-start">
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
                href="https://www.linkedin.com/company/thehedgecollective/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-base font-extrabold uppercase leading-normal text-[#EAEAEA] no-underline"
              >
                Open Roles
              </Link>
            </div>
          </div>

          <nav>
            <ul className="flex flex-col items-end gap-2">
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

        <div className="hidden h-px w-full bg-white lg:block lg:h-[4px]" />

        <p className="hidden whitespace-pre-line self-end text-right font-inter text-base font-normal uppercase leading-[121.325%] text-white lg:block">
          © 2024 THE HEDGE COLLECTIVE.{"\n"}ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
