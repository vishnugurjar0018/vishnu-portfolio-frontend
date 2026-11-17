"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Image as ImageIcon,
  Globe,
  Plus,
  ArrowUpRight,
  Eye,
  Pencil,
  ExternalLink,
  Loader2,
  RefreshCw,
  AlertCircle,
  Palette,
  Code2,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`, {
          cache: "no-store",
        });
        const result = await response.json();

        if (!response.ok || result.success === false) {
          throw new Error(result.message || "Unable to load dashboard projects.");
        }

        if (isActive) {
          setProjects(Array.isArray(result.projects) ? result.projects : []);
          setError("");
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || "Something went wrong while loading projects.");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadProjects();

    return () => {
      isActive = false;
    };
  }, []);

  const sortedProjects = useMemo(() => {
    return [...projects].sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    );
  }, [projects]);

  const recentProjects = sortedProjects.slice(0, 5);
  const graphicCount = projects.filter(
    (project) => project.type === "graphic-design"
  ).length;
  const websiteCount = projects.filter(
    (project) => project.type === "web-development"
  ).length;

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      description: "All portfolio projects",
      icon: FolderKanban,
    },
    {
      title: "Graphic Designs",
      value: graphicCount,
      description: "Creative design work",
      icon: ImageIcon,
    },
    {
      title: "Websites",
      value: websiteCount,
      description: "Development projects",
      icon: Globe,
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px]">
      {/* Welcome Section */}
      <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[2px] text-[#7900D8]">
            Portfolio Workspace
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-[#171321] md:text-3xl">
            Welcome back, Vishnu! 👋
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Manage and showcase your latest creative work.
          </p>
        </div>

        <Link
          href="/admin/add-project"
          className="flex w-fit items-center gap-2 rounded-xl bg-[#7900D8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6500B5] active:scale-[0.98]"
        >
          <Plus size={18} />
          Add New Project
        </Link>
      </section>

      {/* Statistics */}
      <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-[#F0E3FA] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#D8B5F0] hover:shadow-md"
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>

                <div className="rounded-xl bg-[#F3E8FF] p-3 text-[#7900D8]">
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#171321]">
                {loading ? (
                  <span className="inline-block h-9 w-12 animate-pulse rounded bg-purple-100" />
                ) : (
                  String(stat.value).padStart(2, "0")
                )}
              </h2>

              <p className="mt-2 text-xs text-gray-500">{stat.description}</p>
            </div>
          );
        })}
      </section>

      {/* Recent Projects */}
      <section
        id="projects"
        className="mb-8 scroll-mt-24 overflow-hidden rounded-2xl border border-[#F0E3FA] bg-white p-5 shadow-sm md:p-7"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#171321]">
              Recent Projects
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your latest uploaded portfolio work
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              title="Refresh dashboard"
              className="rounded-lg border border-purple-100 p-2 text-[#7900D8] transition hover:bg-[#F7F0FF]"
            >
              <RefreshCw size={17} />
            </button>

            <Link
              href="/admin/projects"
              className="flex items-center gap-1 text-sm font-semibold text-[#7900D8] transition hover:text-[#C000E8]"
            >
              View All <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center rounded-xl bg-red-50 px-4 py-10 text-center">
            <AlertCircle size={26} className="text-red-600" />
            <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>
            <p className="mt-1 text-xs text-red-600">
              Check that your backend server is running.
            </p>
          </div>
        ) : loading ? (
          <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-gray-500">
            <Loader2 size={20} className="animate-spin text-[#7900D8]" />
            Loading recent projects...
          </div>
        ) : recentProjects.length === 0 ? (
          <div className="rounded-xl bg-[#FCF9FF] px-5 py-12 text-center">
            <FolderKanban size={34} className="mx-auto text-[#7900D8]" />
            <h3 className="mt-3 font-semibold text-[#171321]">
              No projects added yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Add your first project to see it here.
            </p>
            <Link
              href="/admin/add-project"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#7900D8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6500B5]"
            >
              <Plus size={16} />
              Add New Project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-b border-[#F0E3FA] bg-[#FBF8FF] text-xs text-gray-600">
                  <th className="px-3 py-4 font-semibold">Project Name</th>
                  <th className="px-3 py-4 font-semibold">Category</th>
                  <th className="px-3 py-4 font-semibold">Status</th>
                  <th className="px-3 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {recentProjects.map((project) => {
                  const isWebsite = project.type === "web-development";
                  const Icon = isWebsite ? Code2 : Palette;

                  return (
                    <tr
                      key={project._id}
                      className="border-b border-[#F8F3FC] transition hover:bg-[#FCF9FF] last:border-0"
                    >
                      <td className="px-3 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F3E8FF] text-[#7900D8]">
                            {project.thumbnail?.url ? (
                              <img
                                src={project.thumbnail.url}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Icon size={19} />
                            )}
                          </div>

                          <div>
                            <p className="max-w-[260px] truncate text-sm font-semibold text-[#252033]">
                              {project.title}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {isWebsite ? "Web Development" : "Graphic Design"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-5 text-sm text-gray-600">
                        {project.category || (isWebsite ? "Website" : "Graphic Design")}
                      </td>

                      <td className="px-3 py-5">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            project.isPublished
                              ? "bg-green-50 text-green-700"
                              : "bg-[#F3E8FF] text-[#7900D8]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              project.isPublished ? "bg-green-600" : "bg-[#7900D8]"
                            }`}
                          />
                          {project.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>

                      <td className="px-3 py-5 text-right">
                        <Link
                          href={`/admin/projects/${project._id}/edit`}
                          aria-label={`Edit ${project.title}`}
                          title="Edit project"
                          className="inline-flex rounded-lg p-2 text-gray-500 transition hover:bg-[#F3E8FF] hover:text-[#7900D8]"
                        >
                          <Pencil size={17} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-[#EBD8FA] bg-[#F7F0FF] p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#7900D8] text-white">
            <Plus size={23} />
          </div>

          <h3 className="text-lg font-bold text-[#171321]">
            Add New Project
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Showcase your latest graphic designs or web development work.
          </p>

          <Link
            href="/admin/add-project"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#7900D8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6500B5]"
          >
            Upload Project <ArrowUpRight size={16} />
          </Link>
        </div>

        <div
          id="profile"
          className="scroll-mt-24 rounded-2xl border border-[#F0E3FA] bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7900D8]">
            <Pencil size={21} />
          </div>

          <h3 className="text-lg font-bold text-[#171321]">
            Update Your Profile
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Update your introduction, profile photo and professional details.
          </p>

          <Link
            href="/admin/profile"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#DCC0F0] bg-white px-5 py-3 text-sm font-semibold text-[#7900D8] transition hover:bg-[#7900D8] hover:text-white"
          >
            Edit Profile <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Website Preview */}
      <div className="mt-6 flex flex-col justify-between gap-3 rounded-2xl border border-[#F0E3FA] bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <div>
          <h3 className="font-semibold text-[#171321]">
            Your Public Portfolio
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Preview how visitors see your work.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex w-fit items-center gap-2 text-sm font-semibold text-[#7900D8] transition hover:text-[#C000E8]"
        >
          <Eye size={17} />
          View Website
          <ExternalLink size={15} />
        </Link>
      </div>
    </div>
  );
}
