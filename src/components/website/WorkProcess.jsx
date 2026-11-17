
import Link from "next/link";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Planning",
    description:
      "Understanding your ideas, business goals and project requirements to create the right strategy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4M8 10.5h5M10.5 8v5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design & Creativity",
    description:
      "Creating attractive visuals and intuitive interfaces that reflect your brand and engage your audience.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
        <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Development",
    description:
      "Turning approved designs into responsive, fast and functional digital experiences using modern technologies.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m9 9-3 3 3 3m6-6 3 3-3 3m-2-7-2 8" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Launch & Delivery",
    description:
      "Testing every detail, making final improvements and delivering a polished project ready to go live.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M5 12.5 10 17l9-10" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

export default function WorkProcess() {
  return (
    <section
      id="work-process"
      className="relative overflow-hidden bg-[#FCFAFF] py-7 sm:py-9 lg:py-11"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-0 h-72 w-72 rounded-full bg-purple-100/60 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-fuchsia-100/40 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <div className="mx-auto mb-8 max-w-2xl text-center">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#7900D8]" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#7900D8]">
              How I Work
            </span>
          </div>

          <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-tight text-[#171321]">
            My Work <span className="text-[#7900D8]">Process</span>
          </h2>

          <p className="mt-3 text-base leading-7 text-gray-600 sm:text-lg">
            A simple and effective process to turn your ideas into
            meaningful digital experiences.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Connecting Line - Desktop */}
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[39px] hidden border-t-2 border-dashed border-purple-200 lg:block" />

          {processSteps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/60"
            >

              {/* Icon and Number */}
              <div className="relative z-10 mb-5 flex items-center justify-between">

                <div className="flex h-[62px] w-[62px] items-center justify-center rounded-2xl border border-purple-100 bg-[#F3E8FF] text-[#7900D8] transition-all duration-300 group-hover:border-[#7900D8] group-hover:bg-[#7900D8] group-hover:text-white">
                  {step.icon}
                </div>

                <span className="text-3xl font-bold text-purple-100 transition group-hover:text-purple-300">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold leading-snug text-[#171321] transition-colors group-hover:text-[#7900D8]">
                {step.title}
              </h3>

              <p className="mt-3 text-base leading-7 text-gray-500">
                {step.description}
              </p>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-5 right-5 h-[3px] origin-left scale-x-0 rounded-full bg-[#7900D8] transition-transform duration-300 group-hover:scale-x-100" />

            </div>
          ))}

        </div>

        {/* Bottom CTA */}
        <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:flex-row sm:px-8">

          <div>
            <h3 className="text-lg font-bold text-[#171321]">
              Ready to start your project?
            </h3>

            <p className="mt-2 text-base text-gray-500">
              Let's turn your ideas into something amazing.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#7900D8] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-[#6500B5]"
          >
            Start a Project <span>↗</span>
          </Link>

        </div>

      </div>
    </section>
  );
}
