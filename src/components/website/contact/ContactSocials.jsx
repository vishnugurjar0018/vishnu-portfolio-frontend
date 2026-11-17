
const socialLinks = [
  {
    name: "Instagram",
    username: "@vkcreations018",
    url: "https://instagram.com/vkcreations018",
    icon: "◎",
    color: "group-hover:bg-pink-100 group-hover:text-pink-600",
  },
  {
    name: "LinkedIn",
    username: "Connect professionally",
    url: "https://www.linkedin.com/in/vishnu-gurjar-30473a274/",
    icon: "in",
    color: "group-hover:bg-blue-100 group-hover:text-blue-600",
  },
  {
    name: "GitHub",
    username: "Explore my code",
    url: "https://github.com",
    icon: "⌘",
    color: "group-hover:bg-gray-100 group-hover:text-gray-900",
  },
];

export default function ContactSocials() {
  return (
    <section className="relative overflow-hidden bg-[#FCFAFF] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[2px] text-[#7900D8]">
            Find Me Online
          </span>

          <h2 className="mt-3 text-[clamp(30px,3.5vw,44px)] font-bold text-[#171321]">
            Let's Connect on{" "}
            <span className="text-[#7900D8]">Social Media.</span>
          </h2>

          <p className="mt-3 text-base leading-7 text-gray-600 sm:text-lg">
            Follow my work, explore my creative journey and stay connected.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-2xl font-bold text-[#7900D8] transition ${social.color}`}>
                {social.icon}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-[#171321] transition group-hover:text-[#7900D8]">
                  {social.name}
                </h3>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {social.username}
                </p>
              </div>

              <span className="text-lg text-[#7900D8] transition group-hover:translate-x-1">
                ↗
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
