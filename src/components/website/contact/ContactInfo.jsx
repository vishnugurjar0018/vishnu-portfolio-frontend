
const contactDetails = [
  {
    icon: "✉️",
    title: "Email Address",
    value: "vishnugurjar0018@gmail.com",
    link: "mailto:vishnugurjar0018@gmail.com",
    color: "bg-purple-100",
  },
  {
    icon: "📞",
    title: "Phone Number",
    value: "+91 8233643514",
    link: "tel:+918233643514",
    color: "bg-blue-100",
  },
  {
    icon: "💬",
    title: "WhatsApp",
    value: "Chat with me",
    link: "https://wa.me/918233643514",
    color: "bg-green-100",
  },
  {
    icon: "📍",
    title: "Location",
    value: "Jaipur, Rajasthan, India",
    link: "https://www.google.com/maps/search/?api=1&query=Jaipur%2C+Rajasthan%2C+India",
    color: "bg-pink-100",
  },
];

export default function ContactInfo() {
  return (
    <section className="relative overflow-hidden bg-[#FCFAFF] py-8 sm:py-10 lg:py-12">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-purple-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[2px] text-[#7900D8]">
            Get In Touch
          </span>

          <h2 className="mt-3 text-[clamp(30px,3.5vw,44px)] font-bold tracking-tight text-[#171321]">
            Contact <span className="text-[#7900D8]">Information.</span>
          </h2>

          <p className="mt-3 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            Have a project in mind or want to discuss an idea? Feel free to
            reach out. I'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {contactDetails.map((item) => (
            <a
              key={item.title}
              href={item.link}
              target={item.title === "WhatsApp" || item.title === "Location" ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${item.color} text-2xl transition duration-300 group-hover:scale-110`}>
                {item.icon}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>
                <p className="mt-1 break-words text-base font-bold text-[#171321] transition group-hover:text-[#7900D8]">
                  {item.value}
                </p>
              </div>

              <span className="text-xl text-[#7900D8] transition group-hover:translate-x-1">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
