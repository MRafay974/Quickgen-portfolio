import Link from "next/link";

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
  const headerClasses = currentPage === "Home"
    ? "border-b border-zinc-800 bg-black"
    : "border-b border-zinc-200 bg-white";

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white">
            BRASH
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentPage === link.label;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  `transition ${
                    isActive ? "text-red-500" : "text-zinc-950 hover:text-zinc-500"
                  }`
                }
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
