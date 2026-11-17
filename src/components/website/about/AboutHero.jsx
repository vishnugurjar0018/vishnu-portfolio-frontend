
import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F3FF] py-8 sm:py-10 lg:py-12">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-purple-200/40 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-fuchsia-200/30 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">

        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#7900D8]" />
            <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#7900D8]">
              Get To Know Me
            </span>
          </div>

          <h1 className="text-[clamp(38px,5vw,62px)] font-bold leading-[1.12] tracking-tight text-[#171321]">
            I'm Vishnu Gurjar,
            <span className="mt-1 block text-[#7900D8]">
              Designer & Developer.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            I turn creative ideas into meaningful digital experiences
            through thoughtful design and modern web development. I enjoy
            combining creativity with technology to build things that look
            great and work beautifully.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-[#7900D8] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-[#6500B5]"
            >
              Explore My Work <span>↗</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-7 py-3.5 text-base font-semibold text-[#7900D8] transition hover:bg-purple-50"
            >
              Let's Talk <span>↗</span>
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="https://instagram.com/vkcreations018"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-gray-600 transition hover:text-[#7900D8]"
            >
              Instagram ↗
            </a>

            <a
              href="https://www.linkedin.com/in/vishnu-gurjar-30473a274/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-gray-600 transition hover:text-[#7900D8]"
            >
              LinkedIn ↗
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-gray-600 transition hover:text-[#7900D8]"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* PROFILE IMAGE */}
        <div className="relative mx-auto w-full max-w-[430px]">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[32px] border-2 border-purple-200" />

          <div className="relative rounded-[32px] bg-[#EEE5FA] p-4 shadow-xl shadow-purple-100">
            <div className="relative aspect-[4/4.3] overflow-hidden rounded-[24px] bg-[#E7D7FA]">
              <Image
                src="/images/profile.png"
                alt="Vishnu Gurjar"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 430px"
                className="object-cover"
              />
            </div>

            <div className="px-3 pb-2 pt-5">
              <h2 className="text-2xl font-bold text-[#171321]">
                Vishnu Gurjar
              </h2>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">
                Creative Designer & Full Stack Developer
              </p>
            </div>
          </div>

          <div className="absolute -right-3 top-10 rounded-2xl border border-purple-100 bg-white px-5 py-3 shadow-lg sm:-right-8">
            <p className="text-xs font-medium text-gray-500">
              My Passion
            </p>
            <p className="mt-1 text-base font-bold text-[#7900D8]">
              Design & Develop
            </p>
          </div>

          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-purple-100 bg-white px-5 py-3 shadow-lg sm:-left-8">
            <p className="text-sm font-bold text-[#7900D8]">
              Creative + Technology
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
