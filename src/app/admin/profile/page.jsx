
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Save,
  Loader2,
  ArrowLeft,
  Globe,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Code2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  Camera,
  Trash2,
  Upload,
  X,
} from "lucide-react";

const API =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const initialProfile = {
  name: "",
  role: "",
  tagline: "",
  about: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  instagram: "",
  linkedin: "",
  github: "",
  skills: "",
  profileImage: "",
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  readOnly = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#292238]">
        {label}
      </span>

      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          />
        )}

        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full rounded-xl border border-[#E6D9F0] bg-white px-4 py-3 text-sm text-[#211A2D] outline-none placeholder:text-gray-400 focus:border-[#7900D8] focus:ring-4 focus:ring-purple-100 ${
            Icon ? "pl-10" : ""
          } ${readOnly ? "cursor-not-allowed bg-gray-50" : ""}`}
        />
      </div>
    </label>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  setShow,
  placeholder,
  autoComplete,
  required = false,
  minLength,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#292238]">
        {label}
      </span>

      <div className="relative">
        <KeyRound
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[#E6D9F0] py-3 pl-10 pr-12 text-sm text-gray-900 outline-none focus:border-[#7900D8] focus:ring-4 focus:ring-purple-100"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );
}

function normalizeAdmin(admin) {
  return {
    ...initialProfile,
    ...admin,
    skills: Array.isArray(admin?.skills)
      ? admin.skills.join(", ")
      : admin?.skills || "",
  };
}

export default function AdminProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState(initialProfile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoDeleting, setPhotoDeleting] = useState(false);
  const [credentialsSaving, setCredentialsSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [credentialMessage, setCredentialMessage] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [photoError, setPhotoError] = useState("");

  const fileInputRef = useRef(null);

  // Get JWT token
  const getToken = () => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("vk_admin_token");
  };

  // Save admin data in localStorage for Sidebar and Header
  const syncAdminProfile = (admin) => {
    if (typeof window === "undefined") return;

    const updatedProfile = normalizeAdmin(admin);

    localStorage.setItem(
      "vk-creations-admin-profile",
      JSON.stringify(updatedProfile)
    );

    window.dispatchEvent(new Event("vk-admin-profile-updated"));
  };

  // Common API request function
  const request = async (path, options = {}) => {
    const token = getToken();

    if (!token) {
      throw new Error(
        "Your session has expired. Please login again."
      );
    }

    const isFormData = options.body instanceof FormData;

    const headers = {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    // Browser automatically sets multipart boundary for FormData
    if (!isFormData && options.body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API}${path}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 401 || response.status === 403) {
      sessionStorage.removeItem("vk_admin_token");
      sessionStorage.removeItem("vk_admin_logged_in");

      window.location.href = "/admin/login";

      throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong."
      );
    }

    return data;
  };

  // Load profile from MongoDB
  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const data = await request("/api/admin/profile");

        if (!data.admin) {
          throw new Error("Admin profile data not found.");
        }

        if (active) {
          const adminData = normalizeAdmin(data.admin);

          setProfile(adminData);
          setNewEmail(adminData.email || "");

          syncAdminProfile(adminData);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  // Handle profile fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // Save profile to MongoDB
  const handleSave = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const data = await request("/api/admin/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: profile.name,
          role: profile.role,
          tagline: profile.tagline,
          about: profile.about,
          phone: profile.phone,
          location: profile.location,
          website: profile.website,
          instagram: profile.instagram,
          linkedin: profile.linkedin,
          github: profile.github,
          skills: profile.skills,
        }),
      });

      if (!data.admin) {
        throw new Error(
          "Updated profile was not returned by the server."
        );
      }

      const updatedProfile = normalizeAdmin(data.admin);

      setProfile(updatedProfile);
      setNewEmail(updatedProfile.email || "");

      syncAdminProfile(updatedProfile);

      setMessage(
        data.message || "Profile updated successfully."
      );

      // Redirect to Admin Dashboard after successful profile save
      router.replace("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Upload profile photo
  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];

    // Allow selecting the same image again
    event.target.value = "";

    if (!file) return;

    setPhotoError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Image size must be less than 2 MB.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    setPhotoUploading(true);

    try {
      const data = await request(
        "/api/admin/profile/photo",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!data.admin) {
        throw new Error(
          "Profile photo was uploaded but admin data was not returned."
        );
      }

      const updatedProfile = normalizeAdmin(data.admin);

      setProfile(updatedProfile);
      syncAdminProfile(updatedProfile);

      setMessage(
        data.message || "Profile photo updated successfully."
      );
    } catch (err) {
      setPhotoError(err.message);
    } finally {
      setPhotoUploading(false);
    }
  };

  // Remove profile photo
  const handleRemovePhoto = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove your profile photo?"
    );

    if (!confirmed) return;

    setPhotoError("");
    setMessage("");
    setPhotoDeleting(true);

    try {
      const data = await request(
        "/api/admin/profile/photo",
        {
          method: "DELETE",
        }
      );

      if (!data.admin) {
        throw new Error("Updated admin profile was not returned.");
      }

      const updatedProfile = normalizeAdmin(data.admin);

      setProfile(updatedProfile);
      syncAdminProfile(updatedProfile);

      setMessage(
        data.message || "Profile photo removed successfully."
      );
    } catch (err) {
      setPhotoError(err.message);
    } finally {
      setPhotoDeleting(false);
    }
  };

  // Update login email and/or password
  const handleSaveCredentials = async (event) => {
    event.preventDefault();

    setCredentialMessage("");
    setCredentialError("");

    const emailChanged =
      newEmail.trim().toLowerCase() !==
      (profile.email || "").trim().toLowerCase();

    const passwordChanged = newPassword.trim().length > 0;

    if (!emailChanged && !passwordChanged) {
      setCredentialError(
        "Please enter a new email or a new password."
      );
      return;
    }

    if (!currentPassword) {
      setCredentialError(
        "Enter your current password to verify this change."
      );
      return;
    }

    if (passwordChanged && newPassword.length < 8) {
      setCredentialError(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (passwordChanged && newPassword !== confirmPassword) {
      setCredentialError("New passwords do not match.");
      return;
    }

    setCredentialsSaving(true);

    try {
      const payload = {
        currentPassword,
      };

      if (emailChanged) {
        payload.newEmail = newEmail.trim().toLowerCase();
      }

      if (passwordChanged) {
        payload.newPassword = newPassword;
      }

      const data = await request(
        "/api/admin/credentials",
        {
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );

      if (data.token) {
        sessionStorage.setItem("vk_admin_token", data.token);
        sessionStorage.setItem("vk_admin_logged_in", "true");
      }

      if (data.admin) {
        const updatedProfile = normalizeAdmin(data.admin);

        setProfile(updatedProfile);
        setNewEmail(updatedProfile.email || "");

        syncAdminProfile(updatedProfile);
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setCredentialMessage(
        data.message ||
          "Login credentials updated successfully."
      );
    } catch (err) {
      setCredentialError(err.message);
    } finally {
      setCredentialsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2
          size={34}
          className="animate-spin text-[#7900D8]"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1150px] space-y-7">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[2px] text-[#7900D8]">
            Portfolio Settings
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#171321]">
            Edit Profile
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Manage your personal, professional and account information.
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#E6D9F0] bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-[#F7F0FF]"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>
      </div>

      {/* Success Message */}
      {message && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">

        {/* Profile Photo */}
        <section className="rounded-2xl border border-[#F0E3FA] bg-white p-5 shadow-sm md:p-7">
          <h2 className="text-lg font-bold text-[#171321]">
            Profile Photo
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Upload your profile photo. It will also appear in the admin panel.
          </p>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#F3E8FF] bg-[#F7F0FF] text-[#7900D8]">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Admin Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={48} />
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-[#292238]">
                {profile.name || "Your Profile Photo"}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                JPG, PNG, WEBP or other supported image formats.
                Maximum file size: 2 MB.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={photoUploading || photoDeleting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#7900D8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6500B5] disabled:opacity-60"
                >
                  {photoUploading ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Camera size={17} />
                  )}

                  {photoUploading ? "Uploading..." : "Change Photo"}
                </button>

                {profile.profileImage && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    disabled={photoUploading || photoDeleting}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                  >
                    {photoDeleting ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={17} />
                    )}

                    {photoDeleting ? "Removing..." : "Remove Photo"}
                  </button>
                )}
              </div>

              {photoError && (
                <p className="mt-3 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle size={16} />
                  {photoError}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Basic Information */}
        <section className="rounded-2xl border border-[#F0E3FA] bg-white p-5 shadow-sm md:p-7">
          <h2 className="mb-6 text-lg font-bold text-[#171321]">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field
              label="Full Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Your full name"
            />

            <Field
              label="Professional Title"
              name="role"
              value={profile.role}
              onChange={handleChange}
              placeholder="Your professional title"
              icon={BriefcaseBusiness}
            />

            <div className="md:col-span-2">
              <Field
                label="Short Tagline"
                name="tagline"
                value={profile.tagline}
                onChange={handleChange}
                placeholder="A short line about your work"
              />
            </div>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#292238]">
                About Me
              </span>

              <textarea
                name="about"
                rows={5}
                value={profile.about}
                onChange={handleChange}
                placeholder="Write your professional introduction..."
                className="w-full rounded-xl border border-[#E6D9F0] px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#7900D8] focus:ring-4 focus:ring-purple-100"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#292238]">
                Skills
              </span>

              <textarea
                name="skills"
                rows={3}
                value={profile.skills}
                onChange={handleChange}
                placeholder="Separate skills with commas"
                className="w-full rounded-xl border border-[#E6D9F0] px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#7900D8] focus:ring-4 focus:ring-purple-100"
              />
            </label>
          </div>
        </section>

        {/* Contact Information */}
        <section className="rounded-2xl border border-[#F0E3FA] bg-white p-5 shadow-sm md:p-7">
          <h2 className="mb-6 text-lg font-bold text-[#171321]">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field
              label="Admin Email"
              name="email"
              value={profile.email}
              placeholder="admin@example.com"
              type="email"
              icon={Mail}
              readOnly
            />

            <Field
              label="Phone Number"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              icon={Phone}
            />

            <Field
              label="Location"
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="City, State, Country"
              icon={MapPin}
            />

            <Field
              label="Portfolio Website"
              name="website"
              value={profile.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
              type="url"
              icon={Globe}
            />
          </div>
        </section>

        {/* Social Media */}
        <section className="rounded-2xl border border-[#F0E3FA] bg-white p-5 shadow-sm md:p-7">
          <h2 className="mb-6 text-lg font-bold text-[#171321]">
            Social Media Links
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field
              label="Instagram URL"
              name="instagram"
              value={profile.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/username"
              type="url"
              icon={Globe}
            />

            <Field
              label="LinkedIn URL"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              type="url"
              icon={Globe}
            />

            <Field
              label="GitHub URL"
              name="github"
              value={profile.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              type="url"
              icon={Code2}
            />
          </div>
        </section>

        {/* Save Profile */}
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-xl border border-[#E6D9F0] bg-white px-6 py-3 text-sm font-semibold text-gray-700"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7900D8] px-7 py-3 text-sm font-semibold text-white hover:bg-[#6500B5] disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}

            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>

      {/* Login Credentials */}
      <section className="rounded-2xl border border-[#F0E3FA] bg-white p-5 shadow-sm md:p-7">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7900D8]">
            <ShieldCheck size={25} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#171321]">
              Admin Login Credentials
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Change your login email or password.
            </p>
          </div>
        </div>

        {credentialMessage && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle2 size={18} />
            {credentialMessage}
          </div>
        )}

        {credentialError && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle size={18} />
            {credentialError}
          </div>
        )}

        <form
          onSubmit={handleSaveCredentials}
          className="space-y-5"
        >
          <Field
            label="Admin Email / Login ID"
            name="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="admin@example.com"
            type="email"
            icon={Mail}
          />

          <PasswordField
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            show={showCurrent}
            setShow={setShowCurrent}
            placeholder="Enter current password"
            autoComplete="current-password"
            required
          />

          <div>
            <PasswordField
              label="New Password (Optional)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              show={showNew}
              setShow={setShowNew}
              placeholder="Enter new password"
              autoComplete="new-password"
              minLength={8}
            />

            <p className="mt-2 text-xs text-gray-500">
              Leave this blank if you do not want to change your password.
            </p>
          </div>

          {newPassword.length > 0 && (
            <PasswordField
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              show={showConfirm}
              setShow={setShowConfirm}
              placeholder="Confirm new password"
              autoComplete="new-password"
              required
            />
          )}

          <div className="rounded-xl border border-purple-100 bg-[#F7F0FF] p-4 text-sm text-[#51445F]">
            Your current password is required only to verify a login credential change.
            You can update your email without changing your password.
          </div>

          <button
            type="submit"
            disabled={credentialsSaving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7900D8] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6500B5] disabled:opacity-60"
          >
            {credentialsSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ShieldCheck size={18} />
            )}

            {credentialsSaving
              ? "Updating..."
              : "Update Login Credentials"}
          </button>
        </form>
      </section>
    </div>
  );
}
