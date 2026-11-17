
const skills = [
  "Graphic Design",
  "UI/UX Design",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
];

export default function AboutSkills() {
  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADING */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[2px] text-[#7900D8]">
            My Toolkit
          </span>

          <h2 className="mt-3 text-[clamp(32px,3.5vw,48px)] font-bold text-[#171321]">
            Skills & <span className="text-[#7900D8]">Technologies.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
            Tools and technologies I use to bring creative ideas and
            digital solutions to life.
          </p>
        </div>

        {/* SKILLS LIST */}
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-xl border border-purple-100 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-1 hover:border-[#7900D8] hover:text-[#7900D8] hover:shadow-md"
            >
              {skill}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
