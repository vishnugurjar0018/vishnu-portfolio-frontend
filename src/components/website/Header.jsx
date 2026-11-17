
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "About Me", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "WhatsApp",
    href: `https://wa.me/918233643514?text=${encodeURIComponent(
      "Hello Vishnu! I visited your portfolio website and would like to discuss a project with you."
    )}`,
    icon: FaWhatsapp,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/vkcreations018",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vishnu-gurjar-30473a274/",
    icon: FaLinkedinIn,
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* LOGO */}
        <Link
          href="/home"
          onClick={() => setMenuOpen(false)}
          className="group relative flex h-14 w-32 shrink-0 items-center sm:w-36"
        >
          <Image
            src="/images/logo.png"
            alt="VK Creations Logo"
            fill
            priority
            sizes="144px"
            className="object-contain object-left transition duration-300 group-hover:scale-105"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative py-2 text-base font-semibold transition-colors ${
                  isActive
                    ? "text-[#7900D8]"
                    : "text-gray-600 hover:text-[#7900D8]"
                }`}
              >
                {link.name}

                <span
                  className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#7900D8] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP SOCIAL ICONS */}
        <div className="hidden items-center gap-3 md:flex">
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
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-purple-100 bg-[#7900D8] text-white shadow-md shadow-purple-100 transition duration-300 hover:-translate-y-1 hover:bg-[#6500B5] hover:shadow-lg hover:shadow-purple-200"
              >
                <Icon className="text-xl transition-transform duration-300 group-hover:scale-110" />
              </a>
            );
          })}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-100 bg-[#FAF7FF] text-[#7900D8] transition hover:bg-purple-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div className="border-t border-purple-100 bg-white px-5 py-5 shadow-lg md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                    isActive
                      ? "bg-[#F5EAFF] text-[#7900D8]"
                      : "text-gray-700 hover:bg-[#F5EAFF] hover:text-[#7900D8]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* MOBILE SOCIAL ICONS */}
            <div className="mt-5 flex items-center justify-center gap-4 border-t border-purple-100 pt-5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    onClick={() => setMenuOpen(false)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7900D8] text-white shadow-md shadow-purple-100 transition hover:-translate-y-1 hover:bg-[#6500B5]"
                  >
                    <Icon className="text-xl" />
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
