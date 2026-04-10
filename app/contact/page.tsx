import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <Navbar currentPage="Contact" />

      <main className="max-w-5xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
        <section className="mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-red-500">Contact</p>
          <h1 className="mt-6 text-6xl font-black tracking-tight sm:text-7xl">
            Let&apos;s talk about what&apos;s next.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            Reach out to start a conversation about your product, brand, or new business direction.
          </p>
        </section>

        <section className="rounded-4xl border border-zinc-200 bg-zinc-50 p-10 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Office</p>
              <p className="mt-4 text-xl font-semibold text-zinc-950">San Diego</p>
              <p className="mt-3 text-base leading-7 text-zinc-600">2173 Salk Ave, Suite 250</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Email</p>
              <p className="mt-4 text-xl font-semibold text-zinc-950">hello@brashinc.com</p>
              <p className="mt-3 text-base leading-7 text-zinc-600">We reply within one business day.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer activeLink="Contact" />
    </div>
  );
}
