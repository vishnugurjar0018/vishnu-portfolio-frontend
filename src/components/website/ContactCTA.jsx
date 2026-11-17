
import Link from "next/link";

const email = "vishnugurjar0018@gmail.com";
const whatsapp = "8233643514";

export default function ContactCTA() {
  const message = encodeURIComponent(
    "Hi Vishnu, I would like to discuss a project with you."
  );

  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden bg-[#FCFAFF] py-5 sm:py-7 lg:py-9"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-purple-200/50 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-fuchsia-200/40 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Main CTA Card */}
        <div className="relative overflow-hidden rounded-[28px] border border-purple-200 bg-[#F3E8FF] px-6 py-10 shadow-sm sm:px-10 sm:py-12 lg:px-16">

          {/* Decorative Circles */}
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-purple-300/50" />
          <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border border-purple-300/40" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-fuchsia-200/40 blur-[80px]" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">

            {/* Label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#7900D8]" />
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#7900D8]">
                Let's Connect
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold leading-[1.15] tracking-tight text-[#171321]">
              Have a Project <br className="sm:hidden" />
              in <span className="text-[#7900D8]">Mind?</span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Whether you need creative designs or a modern website,
              let's work together and turn your ideas into reality.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#7900D8] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-300/50 transition duration-300 hover:-translate-y-1 hover:bg-[#6500B5]"
              >
                Let's Talk
                <span>↗</span>
              </Link>

              <a
                href={`https://wa.me/${whatsapp}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-7 py-3.5 text-base font-bold text-[#7900D8] transition duration-300 hover:-translate-y-1 hover:border-[#7900D8] hover:bg-purple-50"
              >
                WhatsApp Me
                <span>↗</span>
              </a>

            </div>

            {/* Email */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-base text-gray-600">
              <span className="text-lg text-[#7900D8]">✉</span>
              <span>Prefer email?</span>
              <a
                href={`mailto:${email}`}
                className="font-semibold text-[#7900D8] transition hover:underline"
              >
                {email}
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
