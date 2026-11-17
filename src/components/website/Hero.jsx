
import Link from "next/link";
import Image from "next/image";

const technologies = ["React", "Next.js", "Node.js", "MongoDB"];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F8F3FF] text-[#171321]">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-80 w-80 rounded-full bg-purple-200/50 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-80 w-80 rounded-full bg-fuchsia-200/40 blur-[110px]" />

      {/* Main Container */}
      <div className="mx-auto grid max-w-[1400px] items-center gap-4 px-6 py-2 sm:px-10 lg:min-h-[490px] lg:grid-cols-[1fr_1fr] lg:gap-6 lg:px-16 lg:py-2 xl:px-20">

        {/* LEFT CONTENT */}
        <div className="relative z-10 flex min-w-0 flex-col justify-center lg:py-3">

          {/* Intro Badge */}
          <div className="mb-4 inline-flex w-fit items-center gap-3 rounded-full border border-purple-200 bg-white/80 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#7900D8] shadow-[0_0_10px_#C000E8]" />
            <span className="text-xs font-semibold tracking-[2px] text-[#7900D8]">
              HELLO, I'M VISHNU GURJAR
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(28px,3.5vw,52px)] font-bold leading-[1.2] tracking-tight text-[#171321]">
            <span className="block whitespace-nowrap">
              Creative Designer
            </span>

            <span className="block whitespace-nowrap">
              & Full Stack{" "}
              <span className="bg-gradient-to-r from-[#7900D8] to-[#C000E8] bg-clip-text text-transparent">
                Developer.
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            I design stunning visuals and build modern,
            high-performance web experiences that help
            brands stand out in the digital world.
          </p>

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="rounded-full bg-[#7900D8] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-[#6500B5]"
            >
              View My Work <span className="ml-2">→</span>
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-purple-200 bg-white px-7 py-3 text-sm font-semibold text-[#7900D8] transition hover:-translate-y-1 hover:border-[#7900D8] hover:bg-purple-50"
            >
              Let's Talk <span className="ml-2">↗</span>
            </Link>
          </div>

          {/* Technologies */}
          <div className="mt-5 border-t border-purple-200 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-gray-500">
              What I Work With
            </p>

            <div className="flex flex-wrap gap-2.5">
              {technologies.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-purple-100 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-[#7900D8] hover:bg-purple-50 hover:text-[#7900D8]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex h-[320px] w-full items-center justify-center overflow-hidden sm:h-[380px] lg:h-[450px]">

          {/* Soft Image Glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/40 blur-[90px]" />

          <Image
            src="/images/hero-devicev.png"
            alt="VK Creations website displayed on laptop, tablet and smartphone"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="relative z-10 h-full w-full object-contain object-center"
          />

        </div>

      </div>
    </section>
  );
}
