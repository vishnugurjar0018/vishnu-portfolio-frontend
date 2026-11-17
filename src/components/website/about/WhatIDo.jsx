
const services = [
  {
    number: "01",
    icon: "🎨",
    title: "Graphic Design",
    description:
      "Creative visual designs that help brands communicate their identity and connect with their audience.",
    items: ["Social Media Designs", "Marketing Materials", "Brand Identity"],
  },
  {
    number: "02",
    icon: "💻",
    title: "Web Development",
    description:
      "Modern, responsive and user-friendly websites built to deliver smooth digital experiences.",
    items: ["Business Websites", "E-commerce Websites", "Web Applications"],
  },
  {
    number: "03",
    icon: "✏️",
    title: "UI/UX Design",
    description:
      "Clean and intuitive interfaces focused on usability, visual consistency and user experience.",
    items: ["Website UI Design", "App Interface Design", "Wireframing"],
  },
  {
    number: "04",
    icon: "✦",
    title: "Brand Identity",
    description:
      "Consistent visual identities that give businesses a memorable and professional appearance.",
    items: ["Logo Design", "Brand Guidelines", "Visual Identity"],
  },
];

export default function WhatIDo() {
  return (
    <section className="bg-[#F8F3FF] pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADING */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[2px] text-[#7900D8]">
            My Expertise
          </span>

          <h2 className="mt-3 text-[clamp(32px,3.5vw,48px)] font-bold text-[#171321]">
            What I <span className="text-[#7900D8]">Do.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
            I offer creative and technical solutions to help businesses
            build a strong and effective digital presence.
          </p>
        </div>

        {/* SERVICES CARDS */}
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.number}
              className="group rounded-2xl border border-purple-100 bg-white p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-100 sm:p-8"
            >
              {/* ICON AND NUMBER */}
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                  {service.icon}
                </div>

                <span className="text-2xl font-bold text-purple-200">
                  {service.number}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="mt-6 text-xl font-bold text-[#171321]">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 text-base leading-7 text-gray-600">
                {service.description}
              </p>

              {/* SERVICE ITEMS */}
              <div className="mt-6 flex flex-wrap gap-2">
                {service.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-purple-100 bg-[#FCFAFF] px-3 py-2 text-sm text-gray-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
