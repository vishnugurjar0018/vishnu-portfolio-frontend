
import Link from "next/link";
import Image from "next/image";

// Instagram Icon
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// LinkedIn Icon
function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M5.2 3.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.4 9.5H7v11H3.4v-11Zm5.7 0h3.5V11h.1a3.8 3.8 0 0 1 3.5-1.9c3.7 0 4.4 2.4 4.4 5.5v5.9H17v-5.2c0-1.2 0-2.8-1.8-2.8s-2.1 1.3-2.1 2.7v5.3H9.1v-11Z" />
    </svg>
  );
}

// GitHub Icon
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.3-1.2-1.6-1.2-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1 .8 2v3c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

// WhatsApp Icon
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.47 0 .11 5.35.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.59 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.19-3.49-8.41ZM12.06 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.86 9.86 0 0 1-1.52-5.25c0-5.46 4.44-9.9 9.89-9.9a9.84 9.84 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.46-4.45 9.9-9.92 9.9Zm5.43-7.41c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.24-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.52s1.08 2.92 1.23 3.12c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.73 2.02-1.44.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

const quickLinks = [
  { name: "Home", href: "/home" },
  { name: "About Me", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/vkcreations018",
    icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vishnu-gurjar-30473a274/",
    icon: LinkedinIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: GithubIcon,
  },
];

const whatsappMessage =
  "Hello Vishnu! I visited your portfolio website and would like to discuss a project with you.";

const whatsappLink = `https://wa.me/918233643514?text=${encodeURIComponent(whatsappMessage)}`;

export default function Footer() {
  return (
    <footer className="border-t border-[#F0E3FA] bg-[#FCFAFF]">
      <div className="mx-auto max-w-7xl px-6 py-9 md:px-10 lg:py-10">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Brand Section */}
          <div>
            <Link
              href="/home"
              className="relative inline-flex h-20 w-52 items-center sm:h-24 sm:w-60"
            >
              <Image
                src="/images/Logo2.png"
                alt="VK Creations Logo"
                fill
                sizes="240px"
                className="object-contain object-left"
              />
            </Link>

            <p className="mt-3 max-w-xs text-base leading-7 text-gray-500">
              Creative Designer & Full Stack Developer.
              Turning ideas into creative designs and
              meaningful digital experiences.
            </p>

            {/* Social Media Icons */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#EADCF6] bg-white text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-[#7900D8] hover:bg-[#7900D8] hover:text-white"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#171321]">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-base text-gray-500 transition-all duration-300 hover:translate-x-1 hover:text-[#7900D8]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-[#171321]">
              My Services
            </h3>

            <ul className="mt-4 space-y-3 text-base text-gray-500">
              <li>Graphic Design</li>
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Brand Identity</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold text-[#171321]">
              Get In Touch
            </h3>

            <p className="mt-4 text-base leading-7 text-gray-500">
              Have a project or creative idea? Let's work
              together and create something amazing.
            </p>

            <div className="mt-4 space-y-3">
              <Link
                href="/contact"
                className="flex items-center gap-3 text-base text-gray-600 transition hover:text-[#7900D8]"
              >
                <span className="text-xl text-[#7900D8]">@</span>
                Contact Me
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-base text-gray-600 transition hover:text-[#16A34A]"
              >
                <span className="text-xl text-[#16A34A]">☎</span>
                Let's Connect
              </a>
            </div>

            {/* WhatsApp Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with me on WhatsApp"
              title="Chat on WhatsApp"
              className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-1 hover:bg-[#1DA851] hover:shadow-green-300"
            >
              <WhatsAppIcon />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-9 flex flex-col items-center justify-between gap-3 border-t border-[#EDE3F5] pt-5 text-center sm:flex-row">
          <p className="text-sm text-gray-500 sm:text-base">
            © {new Date().getFullYear()} VK Creations. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-gray-500 sm:text-base">
            Made with
            <span className="text-[#7900D8]">♥</span>
            by Vishnu Gurjar
          </p>
        </div>

      </div>
    </footer>
  );
}
