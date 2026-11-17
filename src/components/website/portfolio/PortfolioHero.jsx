
import Link from "next/link";

export default function PortfolioHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#FCFAFF] via-[#F8F3FF] to-[#F1E5FF] py-14 sm:py-16 lg:py-20">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-purple-300/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-fuchsia-200/40 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-200/30 blur-[100px]" />

      {/* COLORFUL SOLID DOTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* LEFT SIDE */}
        <span className="absolute left-[8%] top-[15%] h-4 w-4 rounded-full bg-purple-400" />
        <span className="absolute left-[17%] top-[32%] h-3 w-3 rounded-full bg-pink-400" />
        <span className="absolute left-[5%] top-[48%] h-5 w-5 rounded-full bg-orange-400" />
        <span className="absolute left-[24%] top-[12%] h-2.5 w-2.5 rounded-full bg-blue-400" />
        <span className="absolute left-[12%] top-[72%] h-3.5 w-3.5 rounded-full bg-yellow-400" />
        <span className="absolute left-[30%] top-[80%] h-3 w-3 rounded-full bg-fuchsia-500" />
        <span className="absolute left-[3%] top-[85%] h-2.5 w-2.5 rounded-full bg-cyan-400" />

        {/* RIGHT SIDE */}
        <span className="absolute right-[8%] top-[18%] h-5 w-5 rounded-full bg-pink-400" />
        <span className="absolute right-[18%] top-[35%] h-3 w-3 rounded-full bg-purple-500" />
        <span className="absolute right-[5%] top-[52%] h-3.5 w-3.5 rounded-full bg-yellow-400" />
        <span className="absolute right-[27%] top-[12%] h-3 w-3 rounded-full bg-orange-400" />
        <span className="absolute right-[13%] top-[75%] h-4 w-4 rounded-full bg-blue-400" />
        <span className="absolute right-[32%] top-[83%] h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
        <span className="absolute right-[3%] top-[88%] h-3 w-3 rounded-full bg-green-400" />

        {/* SMALL FLOATING DOTS */}
        <span className="absolute left-[40%] top-[8%] h-2 w-2 rounded-full bg-pink-400" />
        <span className="absolute right-[42%] top-[20%] h-2.5 w-2.5 rounded-full bg-cyan-400" />
        <span className="absolute left-[42%] bottom-[12%] h-3 w-3 rounded-full bg-violet-400" />
        <span className="absolute right-[40%] bottom-[10%] h-2 w-2 rounded-full bg-orange-400" />

        {/* LARGE DECORATIVE DOTS */}
        <span className="absolute left-[15%] top-[55%] h-7 w-7 rounded-full bg-fuchsia-300/80" />
        <span className="absolute right-[14%] top-[58%] h-6 w-6 rounded-full bg-purple-300/80" />
        <span className="absolute left-[35%] top-[45%] h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="absolute right-[35%] top-[45%] h-3 w-3 rounded-full bg-pink-500" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-10">

        {/* BADGE */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7900D8] opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7900D8]" />
          </span>

          <span className="text-xs font-bold uppercase tracking-[2px] text-[#7900D8]">
            My Creative Universe
          </span>

          <span className="text-sm">✦</span>
        </div>

        {/* HEADING */}
        <h1 className="mx-auto max-w-4xl text-[clamp(38px,5.5vw,68px)] font-extrabold leading-[1.1] tracking-tight text-[#171321]">
          Turning Ideas Into
          <span className="mt-2 block bg-gradient-to-r from-[#7900D8] via-[#A000E8] to-[#D000B8] bg-clip-text text-transparent">
            Digital Experiences.
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
          Welcome to my creative space! Explore a collection of graphic
          designs, brand identities and web development projects where
          creativity meets technology.
        </p>

        {/* BUTTONS */}
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="#my-projects"
            className="group inline-flex items-center gap-3 rounded-full bg-[#7900D8] px-8 py-4 text-base font-bold text-white shadow-xl shadow-purple-200/70 transition duration-300 hover:-translate-y-1 hover:bg-[#6500B5] hover:shadow-2xl"
          >
            Explore My Work
            <span className="text-lg transition-transform group-hover:translate-y-1">
              ↓
            </span>
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full border border-purple-200 bg-white/80 px-8 py-4 text-base font-bold text-[#7900D8] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#7900D8] hover:bg-white hover:shadow-lg"
          >
            Let's Collaborate
            <span className="text-lg transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </div>

        {/* CREATIVE HIGHLIGHTS */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="group relative overflow-hidden rounded-2xl border border-white bg-white/70 p-5 text-left shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-100">
            <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-purple-100/70 blur-xl" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                🎨
              </div>
              <div>
                <h3 className="font-bold text-[#171321]">Graphic Design</h3>
                <p className="mt-1 text-xs text-gray-500">Creative Visuals & Branding</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white bg-white/70 p-5 text-left shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-100">
            <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-fuchsia-100/70 blur-xl" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fuchsia-100 text-2xl">
                💻
              </div>
              <div>
                <h3 className="font-bold text-[#171321]">Web Development</h3>
                <p className="mt-1 text-xs text-gray-500">Modern Websites & Apps</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white bg-white/70 p-5 text-left shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-100">
            <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-violet-100/70 blur-xl" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-2xl">
                ✨
              </div>
              <div>
                <h3 className="font-bold text-[#171321]">Creative Solutions</h3>
                <p className="mt-1 text-xs text-gray-500">Ideas Into Reality</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM DESIGN ELEMENT */}
        <div className="mx-auto mt-12 flex items-center justify-center gap-2">
          <span className="h-1.5 w-8 rounded-full bg-purple-200" />
          <span className="h-1.5 w-12 rounded-full bg-gradient-to-r from-[#7900D8] to-[#D000B8]" />
          <span className="h-1.5 w-8 rounded-full bg-purple-200" />
        </div>

      </div>
    </section>
  );
}
