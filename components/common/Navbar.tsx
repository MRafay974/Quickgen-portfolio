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

  const isActiveRoute = (href: string, label: string) => {
    if (pathname === href) return true;
    if (pathname.startsWith(`${href}/`)) return true;
    return currentPage === label;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${headerClasses}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <Link href="/" className={logoClasses}>
            BRASH
          </Link>
        </div>

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
            className="rounded-full border border-red-500 bg-white px-6 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            Let&apos;s chat
          </Link>
        </nav>
      </div>
    </header>
  );
}
