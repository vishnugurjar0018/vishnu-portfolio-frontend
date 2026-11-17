
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  ImagePlus,
  X,
  Star,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [project, setProject] = useState(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("graphic-design");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [featured, setFeatured] = useState(false);

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Load existing project
  useEffect(() => {
    const controller = new AbortController();

    async function loadProject() {
      try {
        const response = await fetch(
          `${API_URL}/api/projects/${projectId}`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok || data.success === false) {
          throw new Error(data.message || "Unable to load project.");
        }

        const item = data.project;

        if (!item) {
          throw new Error("Project not found.");
        }

        setProject(item);
        setTitle(item.title || "");
        setType(item.type || "graphic-design");
        setCategory(item.category || "");
        setDescription(item.description || "");
        setLiveUrl(item.liveUrl || "");

        setTechnologies(
          Array.isArray(item.technologies)
            ? item.technologies.join(", ")
            : ""
        );

        setFeatured(Boolean(item.featured));
        setThumbnailPreview(item.thumbnail?.url || "");
        setExistingImages(Array.isArray(item.images) ? item.images : []);
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

    if (projectId) {
      loadProject();
    }

    return () => controller.abort();
  }, [projectId]);

  // Thumbnail selection
  const handleThumbnailChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  // Additional image selection
  const handleImagesChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    const validFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length !== selectedFiles.length) {
      alert("Only image files are allowed.");
    }

    setImages((previous) => [...previous, ...validFiles]);

    setImagePreviews((previous) => [
      ...previous,
      ...validFiles.map((file) => URL.createObjectURL(file)),
    ]);

    event.target.value = "";
  };

  // Remove newly selected image
  const removeNewImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);

    setImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index)
    );

    setImagePreviews((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  // Remove an already uploaded gallery image from the edit form.
  const removeExistingImage = (index) => {
    setExistingImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  // Clean up preview URLs
  useEffect(() => {
    return () => {
      if (thumbnailPreview.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailPreview);
      }

      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [thumbnailPreview, imagePreviews]);

  // Submit updated project
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!thumbnailPreview && !thumbnail) {
      alert("Please upload a thumbnail image. A project must have a thumbnail.");
      return;
    }

    if (!title.trim() || !description.trim()) {
      alert("Please enter project title and description.");
      return;
    }

    if (type === "graphic-design" && !category.trim()) {
      alert("Please enter project category.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("type", type);
      formData.append("category", category.trim());
      formData.append("description", description.trim());
      formData.append("liveUrl", liveUrl.trim());
      formData.append("featured", String(featured));
      formData.append(
        "keepImagePublicIds",
        JSON.stringify(existingImages.map((image) => image.publicId).filter(Boolean))
      );

      const technologyList = technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      formData.append(
        "technologies",
        JSON.stringify(technologyList)
      );

      // Replace thumbnail only when a new one is selected
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // Add new gallery images
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch(
        `${API_URL}/api/projects/${projectId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Failed to update project.");
      }

      alert("Project updated successfully!");

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err.message || "Could not update project.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={36}
            className="mx-auto animate-spin text-[#7900D8]"
          />

          <p className="mt-3 text-sm text-gray-600">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !project) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-xl font-bold text-red-700">
          Unable to Open Project
        </h2>

        <p className="mt-2 text-sm text-red-600">{error}</p>

        <Link
          href="/admin/projects"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#7900D8] px-5 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft size={17} />
          Back to My Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-7">
      {/* Header */}
      <div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#7900D8]"
        >
          <ArrowLeft size={18} />
          Back to My Projects
        </Link>

        <div className="mt-5">
          <p className="text-sm font-medium text-[#7900D8]">
            Portfolio Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Edit Project
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Update your project information and images.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Information */}
        <section className="rounded-2xl border border-purple-100 bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Project Information
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Update the basic details of your project.
          </p>

          {/* Project Type */}
          <div className="mt-7">
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Project Type *
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setType("graphic-design")}
                className={`rounded-xl border p-4 text-left transition ${
                  type === "graphic-design"
                    ? "border-[#7900D8] bg-[#F7EDFF] ring-1 ring-[#7900D8]"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <span className="font-bold text-gray-900">
                  Graphic Design
                </span>

                <p className="mt-1 text-sm text-gray-600">
                  Logos, posters, social media designs
                </p>
              </button>

              <button
                type="button"
                onClick={() => setType("web-development")}
                className={`rounded-xl border p-4 text-left transition ${
                  type === "web-development"
                    ? "border-[#7900D8] bg-[#F7EDFF] ring-1 ring-[#7900D8]"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <span className="font-bold text-gray-900">
                  Web Development
                </span>

                <p className="mt-1 text-sm text-gray-600">
                  Websites and web applications
                </p>
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Project Title *
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter project title"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#7900D8] focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Category */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Project Category
              {type === "graphic-design" ? " *" : ""}
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required={type === "graphic-design"}
              placeholder={
                type === "graphic-design"
                  ? "e.g. Logo Design, Poster Design, T-Shirt Design"
                  : "e.g. Business Website, E-commerce"
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#7900D8] focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Project Description *
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Write about your project..."
              className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium leading-6 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#7900D8] focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Web Development Fields */}
          {type === "web-development" && (
            <>
              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Live Website URL
                </label>

                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#7900D8] focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Technologies
                </label>

                <input
                  type="text"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="Next.js, React, Node.js, MongoDB"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#7900D8] focus:ring-2 focus:ring-purple-100"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Separate technologies with commas.
                </p>
              </div>
            </>
          )}

          {/* Featured */}
          <label className="mt-7 flex cursor-pointer items-center gap-3 rounded-xl border border-purple-100 bg-[#FFFAFF] p-4">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 accent-[#7900D8]"
            />

            <div>
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Star size={16} className="text-[#7900D8]" />
                Featured Project
              </span>

              <p className="mt-1 text-xs text-gray-500">
                Highlight this project on your portfolio.
              </p>
            </div>
          </label>
        </section>

        {/* Thumbnail */}
        <section className="rounded-2xl border border-purple-100 bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Project Thumbnail
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Current thumbnail is shown below. Upload a new one to replace it.
          </p>

          {thumbnailPreview && (
            <div className="relative mt-5 max-w-md overflow-hidden rounded-xl border border-purple-100 bg-gray-50">
              <img
                src={thumbnailPreview}
                alt="Project thumbnail"
                className="max-h-72 w-full object-contain"
              />

              {thumbnail && (
                <span className="absolute left-3 top-3 rounded-lg bg-[#7900D8] px-3 py-1.5 text-xs font-semibold text-white">
                  New Thumbnail
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setThumbnail(null);
                  setThumbnailPreview("");
                }}
                className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white shadow transition hover:bg-red-700"
              >
                <X size={14} />
                Remove
              </button>
            </div>
          )}

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-200 bg-[#FFFAFF] px-5 py-8 text-center transition hover:border-[#7900D8] hover:bg-[#F7EDFF]">
            <Upload size={28} className="text-[#7900D8]" />

            <span className="mt-3 text-sm font-bold text-gray-800">
              Upload New Thumbnail
            </span>

            <span className="mt-1 text-xs text-gray-500">
              PNG, JPG or WEBP
            </span>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleThumbnailChange}
              className="hidden"
            />
          </label>
        </section>

        {/* Additional Images */}
        <section className="rounded-2xl border border-purple-100 bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Additional Project Images
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Remove unwanted existing images with the red cross, or upload more images below.
          </p>

          {existingImages.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-3 text-sm font-semibold text-gray-800">
                Existing Images
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {existingImages.map((image, index) => (
                  <div
                    key={image.publicId || image.url || index}
                    className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                  >
                    <img
                      src={image.url}
                      alt={`Project image ${index + 1}`}
                      className="h-28 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      title="Remove this existing image"
                      className="absolute right-2 top-2 inline-flex items-center justify-center rounded-full bg-red-600 p-2 text-white shadow transition hover:bg-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-200 bg-[#FFFAFF] px-5 py-8 text-center transition hover:border-[#7900D8] hover:bg-[#F7EDFF]">
            <ImagePlus size={28} className="text-[#7900D8]" />

            <span className="mt-3 text-sm font-bold text-gray-800">
              Add More Images
            </span>

            <span className="mt-1 text-xs text-gray-500">
              Select multiple images if needed
            </span>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              onChange={handleImagesChange}
              className="hidden"
            />
          </label>

          {images.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-3 text-sm font-semibold text-gray-800">
                New Images ({images.length})
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={`${images[index].name}-${index}`}
                    className="relative overflow-hidden rounded-xl border border-purple-100"
                  >
                    <img
                      src={preview}
                      alt={images[index].name}
                      className="h-28 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      title="Remove selected image"
                      className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-500 shadow"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Form Buttons */}
        <div className="flex flex-col-reverse justify-end gap-3 pb-5 sm:flex-row">
          <Link
            href="/admin/projects"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7900D8] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
