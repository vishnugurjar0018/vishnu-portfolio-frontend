
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Plus,
  Search,
  Trash2,
  ExternalLink,
  Loader2,
  FolderOpen,
  RefreshCw,
  Globe,
  EyeOff,
  Star,
  Pencil,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function MyProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [actionId, setActionId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch projects from MongoDB
  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch(`${API_URL}/api/projects`, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok || data.success === false) {
          throw new Error(data.message || "Unable to load projects.");
        }

        setProjects(data.projects || []);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => controller.abort();
  }, [refreshKey]);

  // Search and category filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        project.title?.toLowerCase().includes(searchText) ||
        project.category?.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "all" || project.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [projects, search, filter]);

  // Refresh projects
  const refreshProjects = () => {
    setLoading(true);
    setRefreshKey((previous) => previous + 1);
  };

  // Delete project
  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    try {
      setActionId(project._id);

      const response = await fetch(
        `${API_URL}/api/projects/${project._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Failed to delete project.");
      }

      setProjects((previous) =>
        previous.filter((item) => item._id !== project._id)
      );

      if (data.storageWarning) {
        alert(
          "Project deleted, but some image files may not have been removed from storage."
        );
      }
    } catch (err) {
      alert(err.message || "Could not delete project.");
    } finally {
      setActionId(null);
    }
  };

  // Publish / Unpublish project
  const handleTogglePublish = async (project) => {
    try {
      setActionId(project._id);

      const response = await fetch(
        `${API_URL}/api/projects/${project._id}/publish`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Failed to update publish status.");
      }

      if (data.project) {
        setProjects((previous) =>
          previous.map((item) =>
            item._id === project._id ? data.project : item
          )
        );
      } else {
        refreshProjects();
      }
    } catch (err) {
      alert(err.message || "Could not update project.");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-7">
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-[#7900D8]">
            Portfolio Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            My Projects
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage all your graphic design and web development projects.
          </p>
        </div>

        <Link
          href="/admin/add-project"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7900D8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-800"
        >
          <Plus size={18} />
          Add New Project
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-purple-100 bg-white p-5">
          <p className="text-sm text-gray-500">Total Projects</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {projects.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-white p-5">
          <p className="text-sm text-gray-500">Published</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {projects.filter((p) => p.isPublished).length}
          </h2>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-white p-5">
          <p className="text-sm text-gray-500">Unpublished</p>

          <h2 className="mt-2 text-3xl font-bold text-orange-500">
            {projects.filter((p) => !p.isPublished).length}
          </h2>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-purple-100 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#7900D8]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { label: "All Projects", value: "all" },
            { label: "Graphic Design", value: "graphic-design" },
            { label: "Web Development", value: "web-development" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                filter === item.value
                  ? "bg-[#7900D8] text-white"
                  : "bg-[#F7EDFF] text-gray-600 hover:text-[#7900D8]"
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={refreshProjects}
            disabled={loading}
            title="Refresh projects"
            className="rounded-xl border border-purple-100 p-2.5 text-[#7900D8] transition hover:bg-[#F7EDFF] disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-purple-100 bg-white">
          <div className="text-center">
            <Loader2
              size={34}
              className="mx-auto animate-spin text-[#7900D8]"
            />

            <p className="mt-3 text-sm text-gray-500">
              Loading your projects...
            </p>
          </div>
        </div>
      ) : error ? (
        /* Error State */
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">{error}</p>

          <button
            onClick={refreshProjects}
            className="mt-4 rounded-lg bg-[#7900D8] px-5 py-2 text-sm font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-purple-100 bg-white px-5 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#7900D8]">
            <FolderOpen size={30} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-gray-900">
            {projects.length === 0
              ? "No Projects Added Yet"
              : "No Projects Found"}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {projects.length === 0
              ? "Start showcasing your creative work by adding your first project."
              : "Try another search term or change the selected filter."}
          </p>

          {projects.length === 0 && (
            <Link
              href="/admin/add-project"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#7900D8] px-5 py-3 text-sm font-semibold text-white"
            >
              <Plus size={18} />
              Add Your First Project
            </Link>
          )}
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Project Thumbnail */}
              <div className="relative aspect-[16/10] bg-[#F7EDFF]">
                {project.thumbnail?.url ? (
                  <img
                    src={project.thumbnail.url}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#7900D8]">
                    <FolderOpen size={40} />
                  </div>
                )}

                {project.featured && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#7900D8] shadow">
                    <Star size={13} />
                    Featured
                  </span>
                )}
              </div>

              {/* Project Details */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-lg bg-[#F3E8FF] px-3 py-1.5 text-xs font-semibold text-[#7900D8]">
                    {project.type === "graphic-design"
                      ? "Graphic Design"
                      : "Web Development"}
                  </span>

                  <span
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                      project.isPublished
                        ? "bg-green-50 text-green-700"
                        : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    {project.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                <h3 className="mt-4 truncate text-lg font-bold text-gray-900">
                  {project.title}
                </h3>

                <p className="mt-1 truncate text-sm text-gray-500">
                  {project.category || "No category"}
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  Added{" "}
                  {project.createdAt
                    ? new Date(project.createdAt).toLocaleDateString("en-IN")
                    : "Recently"}
                </p>

                {/* Project Actions */}
                <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleTogglePublish(project)}
                    disabled={actionId === project._id}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F3E8FF] px-3 py-2.5 text-xs font-bold text-[#7900D8] transition hover:bg-purple-100 disabled:opacity-50"
                  >
                    {actionId === project._id ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : project.isPublished ? (
                      <>
                        <EyeOff size={15} />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Globe size={15} />
                        Publish
                      </>
                    )}
                  </button>

                  <Link
                    href={`/admin/projects/${project._id}/edit`}
                    title="Edit project"
                    className="rounded-xl border border-purple-100 p-2.5 text-[#7900D8] transition hover:bg-purple-50"
                  >
                    <Pencil size={16} />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Open live project"
                      className="rounded-xl border border-gray-200 p-2.5 text-gray-500 hover:bg-gray-50"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}

                  <button
                    onClick={() => handleDelete(project)}
                    disabled={actionId === project._id}
                    title="Delete project"
                    className="rounded-xl border border-red-100 p-2.5 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {actionId === project._id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
