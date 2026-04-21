"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  currentPage?: string;
};

const navLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Media", href: "/media" },
];

export function Navbar({ currentPage }: NavbarProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;
      const nearTop = currentScrollY < 24;

      if (nearTop || scrollingUp) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = currentPage === "Home";
  const isWhiteBackground = !isHome;

  const headerClasses = isWhiteBackground
    ? "border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur"
    : "border-b border-zinc-800 bg-black/90 backdrop-blur";

  const navLinkClasses = (isActive: boolean) => {
    if (isActive) {
      return "transition text-red-500";
    }

    return isWhiteBackground
      ? "transition text-zinc-950 hover:text-red-500"
      : "transition text-white hover:text-red-500";
  };

  const logoClasses = isWhiteBackground
    ? "flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white"
    : "flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-zinc-950";

  const hamburgerColor = isWhiteBackground ? "text-zinc-950" : "text-white";

  const isActiveRoute = (href: string, label: string) => {
    if (pathname === href) return true;
    if (pathname.startsWith(`${href}/`)) return true;
    return currentPage === label;
  };

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-transform duration-500 ease-out ${
        isVisible || mobileOpen ? "translate-y-0" : "-translate-y-full"
      } ${headerClasses}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-6">
        <div className="flex items-center gap-3">
          <Link href="/" className={logoClasses}>
            BRASH
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = isActiveRoute(link.href, link.label);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={navLinkClasses(isActive)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded px-6 py-2 text-sm font-semibold text-white bg-[#C0392B] transition hover:bg-[#a93226]"
          >
            Book Free Call
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col justify-center gap-[5px] p-2 ${hamburgerColor}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </header>

      {/* Mobile menu — full screen overlay, outside header so z-index works correctly */}
      <div
        className={`md:hidden fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } ${isWhiteBackground ? "bg-white" : "bg-black"}`}
      >
        {/* Close button */}
        <button
          className={`absolute top-5 right-6 p-2 ${hamburgerColor}`}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <span className="block h-0.5 w-6 bg-current translate-y-[3px] rotate-45" />
          <span className="block h-0.5 w-6 bg-current -translate-y-[3px] -rotate-45" />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => {
            const isActive = isActiveRoute(link.href, link.label);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-2xl font-bold ${navLinkClasses(isActive)}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-4 rounded px-8 py-3 text-base font-semibold text-white bg-[#C0392B] transition hover:bg-[#a93226]"
            onClick={() => setMobileOpen(false)}
          >
            Book Free Call
          </Link>
        </nav>
      </div>
    </>
  );
}
