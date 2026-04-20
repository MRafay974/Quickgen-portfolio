import Link from "next/link";

type FooterProps = {
  activeLink?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Footer({ activeLink: _activeLink }: FooterProps) {
  return (
    <footer className="bg-black text-white">
      {/* CTA */}
      <div className="flex flex-col items-center justify-center px-6 py-28 text-center">
        <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Let&apos;s build <br /> what&apos;s next.
        </h2>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded bg-[#C0392B] px-25 py-4 text-base font-semibold text-white transition hover:bg-[#a93226]"
        >
          Book Your Free Discovery Call →
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-8 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-zinc-400">
          <span>QuickGen Technology</span>
          <span>Dubai, UAE &nbsp;·&nbsp; hello@quickgentech.com</span>
        </div>
      </div>
    </footer>
  );
}

