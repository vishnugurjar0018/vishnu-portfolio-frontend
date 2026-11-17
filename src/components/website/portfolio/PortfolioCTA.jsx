
import Link from "next/link";

export default function PortfolioCTA() {
  return (
    <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#F0E3FF] px-6 py-14 text-center sm:px-12 sm:py-16">

        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-purple-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-fuchsia-200/50 blur-3xl" />

        <div className="relative">
          <span className="text-sm font-bold uppercase tracking-[2px] text-[#7900D8]">
            Have a Project in Mind?
          </span>

          <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(32px,4vw,48px)] font-bold leading-tight text-[#171321]">
            Let's Create Something
            <span className="block text-[#7900D8]">
              Amazing Together.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            Have an idea or project? I'd love to hear about it.
            Let's connect and turn your vision into reality.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#7900D8] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-[#6500B5]"
            >
              Get In Touch <span>↗</span>
            </Link>

            <a
              href="https://wa.me/918233643514"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-7 py-3.5 text-base font-semibold text-[#7900D8] transition hover:bg-purple-50"
            >
              WhatsApp <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
