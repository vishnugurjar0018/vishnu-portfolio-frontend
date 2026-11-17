
import Link from "next/link";
import Image from "next/image";

const skills = [
  "Graphic Design",
  "UI/UX Design",
  "Photoshop",
  "Illustrator",
  "React.js",
  "Next.js",
  "Node.js",
  "MongoDB",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#FCFAFF] py-3 sm:py-4 lg:py-5"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-purple-100/50 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">

          {/* LEFT - PROFILE IMAGE */}
          <div className="relative mx-auto w-full max-w-[370px] self-center">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-[26px] border-2 border-purple-200" />

            <div className="relative rounded-[26px] bg-[#EEE5FA] p-4">
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-[20px] bg-[#E7D7FA]">
                <Image
                  src="/images/profile.png"
                  alt="Vishnu Gurjar - Creative Designer and Developer"
                  fill
                  sizes="(max-width: 768px) 90vw, 370px"
                  className="object-cover"
                />
              </div>

              <div className="mt-3 rounded-xl border border-white/70 bg-white px-4 py-3 shadow-sm">
                <h3 className="text-lg font-bold text-[#171321]">
                  Vishnu Gurjar
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Creative Designer & Full Stack Developer
                </p>
              </div>
            </div>

            {/* Passion Badge */}
            <div className="absolute -right-3 top-8 rounded-xl border border-purple-100 bg-white px-3 py-2.5 shadow-lg sm:-right-5">
              <p className="text-xs font-semibold text-gray-500">
                My Passion
              </p>
              <p className="mt-1 text-base font-bold text-[#7900D8]">
                Design & Develop
              </p>
            </div>
          </div>

          {/* RIGHT - ABOUT CONTENT */}
          <div className="flex h-full flex-col justify-center">

            {/* Section Label */}
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#7900D8]" />
              <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#7900D8]">
                About Me
              </span>
            </div>

            {/* Heading - Exactly 2 Lines */}
            <h2 className="text-[clamp(30px,3.5vw,46px)] font-bold leading-[1.15] tracking-tight text-[#171321]">
              <span className="block">
                Turning Creative Ideas
              </span>
              <span className="block text-[#7900D8]">
                Into Digital Experiences.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Hi, I'm Vishnu Gurjar, a Creative Designer and Full Stack
              Developer passionate about creating meaningful digital
              experiences. I combine creativity and technology to
              transform ideas into visually appealing designs and
              functional web applications.
            </p>

            <p className="mt-3 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              From designing engaging graphics and user interfaces to
              developing modern, responsive websites, I enjoy every
              part of bringing digital ideas to life.
            </p>

            {/* Expertise Cards */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-purple-100 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-xl">
                  🎨
                </div>
                <h3 className="text-base font-bold text-[#171321]">
                  Graphic Design
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Creative visuals and brand identities.
                </p>
              </div>

              <div className="rounded-xl border border-purple-100 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-xl">
                  💻
                </div>
                <h3 className="text-base font-bold text-[#171321]">
                  Web Development
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Modern and responsive web applications.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-5">
              <h3 className="mb-3 text-base font-bold text-[#171321]">
                Skills & Technologies
              </h3>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-purple-100 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-[#7900D8] hover:text-[#7900D8]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-[#7900D8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:-translate-y-1 hover:bg-[#6500B5]"
              >
                View Portfolio <span>↗</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-6 py-3 text-sm font-semibold text-[#7900D8] transition hover:bg-purple-50"
              >
                Let's Talk <span>↗</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
