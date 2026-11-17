
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    number: "01",
    icon: "✦",
    title: "Graphic Design",
    description:
      "Creative and eye-catching designs that help your brand stand out and make a lasting impression.",
    features: [
      "Social Media Designs",
      "Marketing Posters",
      "Print Design",
    ],
  },
  {
    number: "02",
    icon: "⌘",
    title: "Web Development",
    description:
      "Modern, responsive and high-performance websites built to turn your ideas into digital experiences.",
    features: [
      "Business Websites",
      "E-commerce Websites",
      "Web Applications",
    ],
  },
  {
    number: "03",
    icon: "▣",
    title: "UI/UX Design",
    description:
      "Clean, user-friendly interfaces focused on creating smooth and engaging digital experiences.",
    features: [
      "Website UI Design",
      "App Interface Design",
      "Wireframing",
    ],
  },
  {
    number: "04",
    icon: "◇",
    title: "Brand Identity",
    description:
      "Build a strong and consistent brand identity that gives your business a unique personality.",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Visual Identity",
    ],
  },
];

function ServiceCard({ service, index }) {
  return (
    <div
      data-service-card
      className="group relative h-full w-[85vw] max-w-[340px] shrink-0 overflow-hidden rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/70 sm:w-[calc((100%-1rem)/2)] sm:max-w-none lg:w-auto"
    >
      {/* Card Number */}
      <div className="absolute right-5 top-5 text-base font-bold text-purple-200 transition group-hover:text-purple-400">
        {service.number}
      </div>

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F3E8FF] text-3xl font-bold text-[#7900D8] transition duration-300 group-hover:bg-[#7900D8] group-hover:text-white">
        {service.icon}
      </div>

      {/* Content */}
      <h3 className="mt-5 text-lg font-bold text-[#171321]">
        {service.title}
      </h3>

      <p className="mt-3 min-h-[96px] text-base leading-6 text-gray-500">
        {service.description}
      </p>

      {/* Features */}
      <div className="mt-4 space-y-3 border-t border-purple-100 pt-5">
        {service.features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 text-sm font-medium text-gray-600"
          >
            <span className="text-base font-bold text-[#7900D8]">
              ✓
            </span>
            {feature}
          </div>
        ))}
      </div>

      {/* Contact Link */}
      <Link
        href="/contact"
        className="mt-6 inline-flex items-center gap-2 text-base font-bold text-[#7900D8] transition-all group-hover:gap-3"
      >
        Get Started <span>↗</span>
      </Link>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#7900D8] transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

export default function Services() {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Continuous Auto Slider - Mobile Only
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || isPaused) return;

    let animationFrame;
    let previousTime = 0;

    const speed = 40; // Pixels per second

    const animate = (time) => {
      if (!sliderRef.current) return;

      // Stop auto-slide on desktop
      if (window.innerWidth >= 1024) {
        animationFrame = requestAnimationFrame(animate);
        previousTime = time;
        return;
      }

      if (!previousTime) previousTime = time;

      const delta = Math.min(time - previousTime, 50);
      previousTime = time;

      const currentSlider = sliderRef.current;
      const loopWidth = currentSlider.scrollWidth / 2;

      if (loopWidth > 0) {
        currentSlider.scrollLeft += (speed * delta) / 1000;

        // Infinite seamless loop
        if (currentSlider.scrollLeft >= loopWidth) {
          currentSlider.scrollLeft -= loopWidth;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPaused]);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#FCFAFF] py-3 sm:py-4 lg:py-5"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-purple-100/50 blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-fuchsia-100/40 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#7900D8]" />

            <span className="text-xs font-bold uppercase tracking-[2px] text-[#7900D8]">
              What I Offer
            </span>
          </div>

          <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-tight text-[#171321]">
            My <span className="text-[#7900D8]">Services</span>
          </h2>

          <p className="mt-3 text-base leading-7 text-gray-600 sm:text-lg">
            Combining creativity and technology to deliver impactful
            designs and powerful digital solutions for your business.
          </p>
        </div>

        {/* Mobile Services Slider */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onTouchCancel={() => setIsPaused(false)}
          className="flex gap-4 overflow-x-auto pb-4 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            scrollBehavior: "auto",
            overscrollBehaviorX: "contain",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[...services, ...services].map((service, index) => (
            <ServiceCard
              key={`${service.number}-${index}`}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Desktop Services Grid */}
        <div className="hidden gap-5 lg:grid lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex flex-col items-center justify-between gap-5 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:flex-row sm:px-8">
          <div>
            <h3 className="text-lg font-bold text-[#171321]">
              Have a project in mind?
            </h3>

            <p className="mt-2 text-base text-gray-500">
              Let's discuss your ideas and create something amazing.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#7900D8] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-[#6500B5]"
          >
            Let's Work Together <span>↗</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
