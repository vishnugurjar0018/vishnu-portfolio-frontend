
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const INITIAL_PROJECTS = 3;
const LOAD_MORE_COUNT = 3;

/* CATEGORY DETECTION */
function getCategory(type = "") {
  const value = String(type).toLowerCase();

  if (
    value.includes("graphic") ||
    value.includes("brand") ||
    value.includes("social media")
  ) {
    return "graphic";
  }

  if (
    value.includes("web") ||
    value.includes("development") ||
    value.includes("website")
  ) {
    return "web";
  }

  return "other";
}

/* PROJECT CARD */
function ProjectCard({ project, category }) {
  const imageUrl =
    typeof project.thumbnail === "string"
      ? project.thumbnail
      : project.thumbnail?.url || "";

  const isWeb = category === "web";

  return (
    <article className="group relative overflow-hidden rounded-[24px] border border-purple-100/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-200/50">

      {/* IMAGE AREA */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#F0E5FF] to-[#FCEBFF]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title || "Portfolio project"}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl text-purple-300">
            ✦
          </div>
        )}

        {/* IMAGE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171321]/45 via-transparent to-transparent opacity-60 transition duration-300 group-hover:opacity-90" />

        {/* CATEGORY BADGE */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-bold text-[#7900D8] shadow-md backdrop-blur-md">
            <span
              className={`h-2 w-2 rounded-full ${
                isWeb ? "bg-blue-500" : "bg-fuchsia-500"
              }`}
            />
            {isWeb ? "Web Development" : "Graphic Design"}
          </span>
        </div>

        {/* HOVER ICON */}
        <div className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white text-xl text-[#7900D8] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          ↗
        </div>
      </div>

      {/* PROJECT DETAILS */}
      <div className="relative p-5 sm:p-6">
        <div className="mb-4 h-1 w-10 rounded-full bg-gradient-to-r from-[#7900D8] to-[#D000B8] transition-all duration-300 group-hover:w-20" />

        <h3 className="text-xl font-bold tracking-tight text-[#171321] transition-colors duration-300 group-hover:text-[#7900D8]">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-7 text-gray-600">
          {project.description}
        </p>

        {/* TECHNOLOGIES */}
        {Array.isArray(project.technologies) &&
          project.technologies.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-purple-100 bg-[#FAF6FF] px-3 py-1.5 text-xs font-semibold text-[#7900D8] transition hover:border-purple-300 hover:bg-purple-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

        {/* PROJECT LINK */}
        {project.liveUrl && (
          <div className="mt-5 border-t border-purple-50 pt-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-2 text-base font-bold text-[#7900D8] transition-all hover:gap-3"
            >
              View Project
              <span className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                ↗
              </span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

/* PROJECT SECTION */
function ProjectSection({
  title,
  label,
  description,
  projects,
  category,
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECTS);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < projects.length;
  const isWeb = category === "web";

  function handleLoadMore() {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, projects.length)
    );
  }

  return (
    <div className="relative">
      {/* SECTION BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -left-20 top-20 h-48 w-48 rounded-full bg-purple-100/50 blur-[80px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-fuchsia-100/40 blur-[80px]" />

      <div className="relative">
        {/* SECTION HEADER */}
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 shadow-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  isWeb ? "bg-blue-500" : "bg-fuchsia-500"
                }`}
              />

              <span className="text-xs font-bold uppercase tracking-[1.8px] text-[#7900D8]">
                {label}
              </span>

              <span className="text-sm text-[#7900D8]">✦</span>
            </div>

            <h2 className="text-[clamp(30px,3.5vw,46px)] font-extrabold leading-tight tracking-tight text-[#171321]">
              {title}{" "}
              <span className="bg-gradient-to-r from-[#7900D8] to-[#C000E8] bg-clip-text text-transparent">
                Projects.
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              {description}
            </p>
          </div>

          {/* PROJECT COUNT */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-purple-100 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-xl text-[#7900D8]">
              {isWeb ? "💻" : "🎨"}
            </div>

            <div>
              <p className="text-xl font-extrabold leading-none text-[#171321]">
                {projects.length}
              </p>
              <p className="mt-1 text-xs font-medium text-gray-500">
                Total Projects
              </p>
            </div>
          </div>
        </div>

        {/* PROJECT GRID */}
        {projects.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project._id || project.id || project.title}
                  project={project}
                  category={category}
                />
              ))}
            </div>

            {/* VIEW MORE BUTTON */}
            {hasMoreProjects && (
              <div className="mt-11 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="group inline-flex items-center gap-3 rounded-full border border-purple-200 bg-white px-9 py-4 text-base font-bold text-[#7900D8] shadow-md shadow-purple-100 transition-all duration-300 hover:-translate-y-1 hover:border-[#7900D8] hover:bg-gradient-to-r hover:from-[#7900D8] hover:to-[#A000E8] hover:text-white hover:shadow-xl hover:shadow-purple-200"
                >
                  View More Projects

                  <span className="text-lg transition-transform duration-300 group-hover:translate-y-1">
                    ↓
                  </span>
                </button>
              </div>
            )}

            {/* ALL PROJECTS SHOWN */}
            {!hasMoreProjects && projects.length > INITIAL_PROJECTS && (
              <div className="mt-9 flex items-center justify-center gap-3 text-sm font-medium text-gray-500">
                <span className="h-px w-10 bg-purple-200" />
                You've viewed all projects
                <span className="h-px w-10 bg-purple-200" />
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-purple-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
              {isWeb ? "💻" : "🎨"}
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#171321]">
              No Projects Yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              New {title.toLowerCase()} projects will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* MAIN PORTFOLIO GRID */
export default function PortfolioGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* FETCH PROJECTS */
  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/projects`);

        if (!response.ok) {
          throw new Error("Unable to load projects.");
        }

        const data = await response.json();

        const projectList = Array.isArray(data)
          ? data
          : data.projects || [];

        if (isMounted) {
          setProjects(projectList);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  /* FILTER GRAPHIC PROJECTS */
  const graphicProjects = useMemo(
    () =>
      projects.filter(
        (project) => getCategory(project.type) === "graphic"
      ),
    [projects]
  );

  /* FILTER WEB PROJECTS */
  const webProjects = useMemo(
    () =>
      projects.filter(
        (project) => getCategory(project.type) === "web"
      ),
    [projects]
  );

  return (
    <section
      id="my-projects"
      className="relative overflow-hidden bg-gradient-to-b from-[#FCFAFF] via-[#F9F5FF] to-[#FCFAFF] pb-12 pt-4 sm:pb-16 sm:pt-6 lg:pb-20 lg:pt-8"
    >
      {/* COLORFUL BACKGROUND DOTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[5%] top-[8%] h-4 w-4 rounded-full bg-purple-300/70" />
        <span className="absolute right-[8%] top-[14%] h-5 w-5 rounded-full bg-pink-300/70" />
        <span className="absolute left-[12%] top-[48%] h-3 w-3 rounded-full bg-orange-300/70" />
        <span className="absolute right-[5%] top-[55%] h-3.5 w-3.5 rounded-full bg-blue-300/70" />
        <span className="absolute bottom-[10%] left-[30%] h-3 w-3 rounded-full bg-fuchsia-300/70" />
        <span className="absolute bottom-[8%] right-[25%] h-4 w-4 rounded-full bg-yellow-300/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-5 sm:px-8 lg:space-y-16 lg:px-10">

        {/* LOADING */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] animate-pulse bg-purple-100" />

                <div className="space-y-3 p-6">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-purple-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-purple-50" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-purple-50" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div className="rounded-3xl border border-red-100 bg-white px-5 py-14 text-center shadow-sm">
            <div className="text-4xl">!</div>

            <p className="mt-3 font-bold text-red-600">
              {error}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Please check your backend server and try again.
            </p>
          </div>
        )}

        {/* PROJECT SECTIONS */}
        {!loading && !error && (
          <>
            {/* WEB DEVELOPMENT FIRST */}
            <ProjectSection
              label="Digital Experiences"
              title="Web Development"
              description="A showcase of responsive websites, e-commerce platforms and modern web applications."
              projects={webProjects}
              category="web"
            />

            {/* GRAPHIC DESIGN SECOND */}
            <ProjectSection
              label="Creative Designs"
              title="Graphic Design"
              description="A collection of creative visuals, brand identities, social media designs and marketing materials."
              projects={graphicProjects}
              category="graphic"
            />
          </>
        )}
      </div>
    </section>
  );
}
