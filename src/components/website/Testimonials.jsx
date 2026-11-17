
"use client";

import { useRef } from "react";

const testimonials = [
  {
    name: "Adiv Aviation",
    role: "Entrepreneur",
    review:
      "Working with Vishnu was a great experience. The design was creative, professional and delivered with attention to detail.",
    rating: 5,
    initials: "CN",
  },
  {
    name: "Manish Mahirrao",
    role: "Entrepreneur",
    review:
      "Excellent work and smooth communication throughout the project. Really appreciated the creativity and dedication.",
    rating: 5,
    initials: "CN",
  },
  {
    name: "Wakefit Innovations Limited",
    role: "Furniture Company",
    review:
      "The final result was exactly what I was looking for. Professional approach and quality work.",
    rating: 5,
    initials: "CN",
  },
];

export default function Testimonials() {
  const sliderRef = useRef(null);

  const slide = (direction) => {
    if (!sliderRef.current) return;

    const card = sliderRef.current.querySelector(
      "[data-testimonial-card]"
    );

    if (!card) return;

    const gap = 20;
    const cardWidth = card.getBoundingClientRect().width;

    sliderRef.current.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#F8F3FF] py-8 sm:py-10 lg:py-12"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-0 h-72 w-72 rounded-full bg-purple-200/40 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-fuchsia-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#7900D8]" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#7900D8]">
              Client Feedback
            </span>
          </div>

          <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-tight text-[#171321]">
            What Clients <span className="text-[#7900D8]">Say</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            Building meaningful relationships through creativity,
            quality work and a commitment to every project.
          </p>
        </div>

        {/* Slider Controls */}
        <div className="mb-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label="Previous testimonials"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-200 bg-white text-[#7900D8] transition hover:bg-[#7900D8] hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5m7 7-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => slide(1)}
            aria-label="Next testimonials"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-200 bg-white text-[#7900D8] transition hover:bg-[#7900D8] hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonials Slider */}
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              data-testimonial-card
              className="w-full shrink-0 snap-start rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/60 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              {/* Quote Icon and Rating */}
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-3xl font-bold text-[#7900D8]">
                  “
                </div>

                <div className="flex gap-1 text-xl text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>

              {/* Review */}
              <p className="mt-5 min-h-[120px] text-base leading-7 text-gray-600">
                {item.review}
              </p>

              {/* Client Details */}
              <div className="mt-5 flex items-center gap-3 border-t border-purple-100 pt-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-fuchsia-200 text-base font-bold text-[#7900D8]">
                  {item.initials}
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-bold text-[#171321]">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
