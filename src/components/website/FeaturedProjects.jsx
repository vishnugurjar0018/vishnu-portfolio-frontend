
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const filters = [
  { label: "All Projects", value: "all" },
  { label: "Graphic Design", value: "graphic" },
  { label: "Web Development", value: "web" },
];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const sliderRef = useRef(null);

  // Fetch Featured Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error("API URL is not configured.");
        }

        const response = await fetch(`${API_URL}/api/projects`);

        if (!response.ok) {
          throw new Error("Unable to fetch projects.");
        }

        const data = await response.json();

        const allProjects = Array.isArray(data)
          ? data
          : data.projects || [];

        const featuredProjects = allProjects.filter(
          (project) =>
            project.featured === true ||
            project.featured === "true"
        );

        setProjects(featuredProjects);
      } catch (err) {
        console.error("Featured Projects Error:", err);
        setError("Projects could not be loaded. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter Projects
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;

    const projectType = String(project.type || "").toLowerCase();

    if (activeFilter === "graphic") {
      return projectType.includes("graphic");
    }

    if (activeFilter === "web") {
      return (
        projectType.includes("web") ||
        projectType.includes("development")
      );
    }

    return true;
  });

  // Duplicate Projects For Infinite Slider
  const sliderProjects =
    filteredProjects.length > 0
      ? [...filteredProjects, ...filteredProjects]
      : [];

  // Manual Slider Navigation
  const slide = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector("[data-project-card]");
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 16;

    const loopWidth = slider.scrollWidth / 2;

    const nextPosition =
      slider.scrollLeft + direction * (cardWidth + gap);

    if (nextPosition < 0) {
      slider.scrollLeft = loopWidth;
    } else if (nextPosition >= loopWidth) {
      slider.scrollLeft = 0;
    } else {
      slider.scrollTo({
        left: nextPosition,
        behavior: "smooth",
      });
    }
  };

  // Reset Slider On Filter Change
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  }, [activeFilter]);

  // Continuous Infinite Auto Slider
  useEffect(() => {
    if (
      loading ||
      error ||
      isPaused ||
      filteredProjects.length === 0
    ) {
      return;
    }

    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrame;
    let previousTime = 0;

    const speed = 45; // Pixels per second

    const animate = (time) => {
      if (!sliderRef.current) return;

      if (!previousTime) previousTime = time;

      const delta = Math.min(time - previousTime, 50);
      previousTime = time;

      const currentSlider = sliderRef.current;
      const loopWidth = currentSlider.scrollWidth / 2;

      if (loopWidth > 0) {
        currentSlider.scrollLeft += (speed * delta) / 1000;

        // Seamless loop without stopping
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
  }, [loading, error, filteredProjects.length, isPaused]);

  return (
    <section
      id="featured-projects"
      className="relative overflow-hidden bg-[#F8F3FF] py-6 sm:py-8 lg:py-10"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-purple-200/40 blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-fuchsia-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#7900D8]" />

            <span className="text-xs font-bold uppercase tracking-[2px] text-[#7900D8]">
              My Recent Work
            </span>
          </div>

          <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-tight text-[#171321]">
            Featured <span className="text-[#7900D8]">Projects</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            A selection of my creative designs and development projects,
            built with passion, creativity and attention to detail.
          </p>
        </div>

        {/* Filters and Slider Arrows */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter.value
                    ? "border-[#7900D8] bg-[#7900D8] text-white shadow-md shadow-purple-200"
                    : "border-purple-200 bg-white text-gray-600 hover:border-[#7900D8] hover:text-[#7900D8]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-2">

            {/* Previous */}
            <button
              type="button"
              onClick={() => slide(-1)}
              aria-label="Previous projects"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-200 bg-white text-[#7900D8] shadow-sm transition hover:border-[#7900D8] hover:bg-[#7900D8] hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={() => slide(1)}
              aria-label="Next projects"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-200 bg-white text-[#7900D8] shadow-sm transition hover:border-[#7900D8] hover:bg-[#7900D8] hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-purple-100 bg-white p-3"
              >
                <div className="aspect-[4/3] animate-pulse rounded-xl bg-purple-100" />

                <div className="mt-4 h-5 w-2/3 rounded bg-purple-100" />

                <div className="mt-3 h-3 w-full rounded bg-purple-50" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
            <p className="text-base text-red-500">{error}</p>
          </div>
        )}

        {/* No Projects */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-purple-100 bg-white px-5 py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl text-[#7900D8]">
              ✦
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#171321]">
              {projects.length === 0
                ? "Projects Coming Soon"
                : "No Projects Found"}
            </h3>

            <p className="mt-2 text-base text-gray-500">
              {projects.length === 0
                ? "I'm working on some exciting projects. Stay tuned!"
                : "No projects available in this category yet."}
            </p>
          </div>
        )}

        {/* Infinite Horizontal Project Slider */}
        {!loading && !error && filteredProjects.length > 0 && (
          <div
            ref={sliderRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              scrollBehavior: "auto",
              overscrollBehaviorX: "contain",
            }}
          >
            {sliderProjects.map((project, index) => {
              const imageUrl =
                typeof project.thumbnail === "string"
                  ? project.thumbnail
                  : project.thumbnail?.url || "";

              const projectType = String(
                project.type || project.category || "Project"
              );

              const technologies = Array.isArray(project.technologies)
                ? project.technologies
                : [];

              return (
                <article
                  key={`${project._id || project.id || project.title}-${index}`}
                  data-project-card
                  className="group w-full shrink-0 rounded-2xl border border-purple-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/70 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#F0E5FF]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={project.title || "Portfolio project"}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl text-purple-400">
                        ✦
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-bold text-[#7900D8] shadow-sm">
                      {projectType}
                    </span>
                  </div>

                  {/* Project Details */}
                  <div className="px-2 pb-2 pt-4">
                    <h3 className="truncate text-lg font-bold text-[#171321] transition-colors group-hover:text-[#7900D8]">
                      {project.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-500">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {technologies.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={`${tech}-${index}`}
                            className="rounded-md bg-purple-50 px-2.5 py-1.5 text-xs font-medium text-[#7900D8]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Project Link */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-base font-bold text-[#7900D8] transition-all hover:gap-3"
                      >
                        View Project <span>↗</span>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* View All */}
        <div className="mt-6 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-[#7900D8] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-[#6500B5]"
          >
            View All Projects <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
