
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  ImagePlus,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const graphicCategories = [
  "Logo Design",
  "Social Media Design",
  "T-Shirt Design",
  "Banner & Poster",
  "Business Card",
  "Packaging Design",
  "Other",
];

export default function AddProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    type: "graphic-design",
    category: "Logo Design",
    description: "",
    liveUrl: "",
    technologies: "",
    featured: false,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleThumbnail = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setThumbnail(file);
    }

    e.target.value = "";
  };

  const handleImages = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    setImages((prev) => [...prev, ...selectedFiles]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!thumbnail) {
      setMessage({
        type: "error",
        text: "Please select a project thumbnail.",
      });
      return;
    }

    if (
      formData.type === "web-development" &&
      !formData.liveUrl.trim()
    ) {
      setMessage({
        type: "error",
        text: "Please enter the live website URL.",
      });
      return;
    }

    const data = new FormData();

    data.append("title", formData.title.trim());
    data.append("type", formData.type);
    data.append("description", formData.description.trim());
    data.append("thumbnail", thumbnail);
    data.append("featured", String(formData.featured));

    if (formData.type === "graphic-design") {
      data.append("category", formData.category);
    }

    if (formData.type === "web-development") {
      data.append("liveUrl", formData.liveUrl.trim());

      const technologies = formData.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      data.append("technologies", JSON.stringify(technologies));
    }

    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to create project."
        );
      }

      setMessage({
        type: "success",
        text: "Project created successfully! Redirecting to My Projects...",
      });

      // Open the projects list after the API confirms the project was saved.
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#7900D8] focus:ring-2 focus:ring-purple-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="mx-auto max-w-5xl space-y-7">
      {/* Page Heading */}
      <div>
        <Link
          href="/admin"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#7900D8]"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Add New Project
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Showcase your creative work and development projects.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Project Information */}
        <section className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm md:p-7">
          <h2 className="text-lg font-bold text-gray-900">
            Project Information
          </h2>

          <p className="mb-6 mt-1 text-sm text-gray-500">
            Enter the basic details of your project.
          </p>

          {/* Project Type */}
          <div className="mb-6">
            <label className={labelClass}>
              Project Type *
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: "graphic-design",
                  title: "Graphic Design",
                  description: "Logos, posters, social media designs",
                },
                {
                  value: "web-development",
                  title: "Web Development",
                  description: "Websites and web applications",
                },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: item.value,
                    }))
                  }
                  className={`rounded-xl border p-4 text-left transition ${
                    formData.type === item.value
                      ? "border-[#7900D8] bg-[#F7EDFF] ring-2 ring-purple-100"
                      : "border-purple-100 hover:border-purple-300"
                  }`}
                >
                  <span className="block text-sm font-bold text-gray-900">
                    {item.title}
                  </span>

                  <span className="mt-1 block text-xs text-gray-500">
                    {item.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className={labelClass}>
              Project Title *
            </label>

            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              className={inputClass}
            />
          </div>

          {/* Category */}
          {formData.type === "graphic-design" && (
            <div className="mb-5">
              <label className={labelClass}>
                Project Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                required
              >
                {graphicCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Description */}
          <div>
            <label className={labelClass}>
              Project Description *
            </label>

            <textarea
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              className={`${inputClass} resize-y`}
            />
          </div>
        </section>

        {/* Website Details */}
        {formData.type === "web-development" && (
          <section className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm md:p-7">
            <h2 className="text-lg font-bold text-gray-900">
              Website Details
            </h2>

            <p className="mb-6 mt-1 text-sm text-gray-500">
              Add the website link and technologies used.
            </p>

            <div className="mb-5">
              <label className={labelClass}>
                Live Website URL *
              </label>

              <input
                type="url"
                name="liveUrl"
                required
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Technologies Used
              </label>

              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="Next.js, React, Node.js, MongoDB"
                className={inputClass}
              />

              <p className="mt-2 text-xs text-gray-400">
                Separate technologies using commas.
              </p>
            </div>
          </section>
        )}

        {/* Thumbnail Upload */}
        <section className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm md:p-7">
          <h2 className="text-lg font-bold text-gray-900">
            Project Thumbnail
          </h2>

          <p className="mb-5 mt-1 text-sm text-gray-500">
            Upload one main image for your portfolio project.
          </p>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-[#FCF9FF] p-8 text-center transition hover:border-[#7900D8] hover:bg-[#F7EDFF]">
            <Upload size={30} className="mb-3 text-[#7900D8]" />

            <span className="text-sm font-bold text-gray-800">
              {thumbnail ? thumbnail.name : "Choose Thumbnail"}
            </span>

            <span className="mt-2 text-xs text-gray-400">
              JPG, PNG or WEBP
            </span>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleThumbnail}
              className="hidden"
            />
          </label>

          {thumbnail && (
            <div className="mt-3 flex items-center justify-between rounded-xl bg-[#F7EDFF] p-3">
              <span className="truncate text-sm font-medium text-gray-700">
                {thumbnail.name}
              </span>

              <button
                type="button"
                onClick={() => setThumbnail(null)}
                className="ml-3 rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </section>

        {/* Additional Images */}
        <section className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm md:p-7">
          <h2 className="text-lg font-bold text-gray-900">
            Additional Project Images
          </h2>

          <p className="mb-5 mt-1 text-sm text-gray-500">
            Upload extra images or screenshots. This section is optional.
          </p>

          <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-purple-200 bg-[#FCF9FF] p-5 text-sm font-semibold text-[#7900D8] transition hover:bg-[#F7EDFF]">
            <ImagePlus size={21} />
            Add Multiple Images

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImages}
              className="hidden"
            />
          </label>

          {images.length > 0 && (
            <div className="mt-5 space-y-2">
              {images.map((image, index) => (
                <div
                  key={`${image.name}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-purple-100 p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <ImagePlus
                      size={19}
                      className="shrink-0 text-[#7900D8]"
                    />

                    <span className="truncate text-sm text-gray-700">
                      {image.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="ml-3 rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <X size={17} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured */}
        <section className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm md:p-7">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mt-1 h-4 w-4 accent-[#7900D8]"
            />

            <span>
              <span className="block text-sm font-bold text-gray-800">
                Featured Project
              </span>

              <span className="mt-1 block text-xs text-gray-500">
                Mark this project as featured for special display.
              </span>
            </span>
          </label>
        </section>

        {/* API Message */}
        {message.text && (
          <div
            className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 size={19} className="shrink-0" />
            ) : (
              <AlertCircle size={19} className="shrink-0" />
            )}

            {message.text}
          </div>
        )}

        {/* Submit */}
        <div className="flex flex-wrap justify-end gap-3">
          <Link
            href="/admin"
            className="rounded-xl border border-purple-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-purple-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#7900D8] px-7 py-3 text-sm font-bold text-white shadow-md shadow-purple-200 transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Uploading Project...
              </>
            ) : (
              <>
                <Plus size={18} />
                Save Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
