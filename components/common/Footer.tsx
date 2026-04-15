import Link from "next/link";

type FooterProps = {
  activeLink?: string;
};

export function Footer({ activeLink }: FooterProps) {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "#services" },
    { label: "Media", href: "#media" },
    { label: "Contact", href: "/contact" },
  ];
  const socialLinks = ["LinkedIn", "Clutch", "Upwork"];
  const downloadLinks = [
    "Software Design Brochure",
    "Product Design Brochure",
    "Product Development Guide",
  ];

  return (
    <footer className="relative bg-black text-white">
      <div className="mx-auto max-w-7xl px-2 py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#49c88e] px-4 py-20 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.35)] sm:px-8 sm:py-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.18),transparent_20%)] opacity-80" />
          <div className="relative flex flex-col items-center justify-center gap-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
               Let's build <br/> what's next.

            </h2>
            <button className="inline-flex items-center justify-center rounded-full bg-black px-11 py-4 text-xl font-semibold text-[#7ee4c2] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)] transition hover:bg-zinc-900">
              Say hello
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-14">
          <p className="text-2xl font-semibold">hello@quickgentech.com</p>
        </div>

       <div className="flex items-start justify-between">
  {/* Left group: Address columns — close together */}
  <div className="flex gap-16">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">UAE</p>
      <p className="mt-3 text-lg font-semibold">Dubai</p>
      {/* <p className="mt-2 text-base text-zinc-300">2173 Salk Ave, Suite 250</p>
      <p className="text-base text-zinc-300">Carlsbad, California</p> */}
    </div>
    {/* <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">Canada</p>
      <p className="mt-3 text-lg font-semibold">Ottawa</p>
      <p className="mt-2 text-base text-zinc-300">168 Dalhousie St.</p>
      <p className="text-base text-zinc-300">Ottawa, Ontario</p>
    </div> */}
  </div>

  {/* Right group: Nav columns — close together */}
  <div className="flex gap-12">
    <div>
      <div className="space-y-3 text-base text-zinc-300">
        {navLinks.map((link) => {
          const isActive = activeLink === link.label || (!activeLink && link.label === "Home");
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`block transition ${
                isActive ? "text-red-500 font-semibold" : "text-zinc-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">Socials</p>
      <div className="mt-5 space-y-3 text-base text-zinc-300">
        {socialLinks.map((link) => (
          <p key={link}>{link}</p>
        ))}
      </div>
    </div>
  </div>
</div>

        <div className="mt-16 flex flex-col gap-10 border-t border-zinc-800 pt-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            {downloadLinks.map((item) => (
              <p key={item} className="text-base font-semibold text-white">
                {item} <span className="text-zinc-500">↓</span>
              </p>
            ))}
          </div>

          <div className="space-y-3 text-sm text-zinc-500 lg:text-right">
            <p>Brash Product Development inc.</p>
            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 text-[18rem] font-black uppercase tracking-[-0.12em] text-white/5 sm:px-8">
          BRASH
        </div>
      </div>
    </footer>
  );
}
