
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Sparkles,
  Palette,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (!API_URL) {
        throw new Error("API URL is not configured. Check frontend .env.local");
      }

      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      // Save JWT token
      sessionStorage.setItem("vk_admin_token", data.token);

      // Compatibility with existing dashboard authentication
      sessionStorage.setItem("vk_admin_logged_in", "true");

      // Save admin profile
      if (data.admin) {
        localStorage.setItem(
          "vk-creations-admin-profile",
          JSON.stringify(data.admin)
        );
      }

      // Notify Header and Sidebar
      window.dispatchEvent(
        new Event("vk-admin-profile-updated")
      );

      // Navigate to dashboard
      router.replace("/admin");

    } catch (error) {
      setError(
        error.message || "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F5FC] px-4 py-8 sm:px-6 lg:px-8">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-200/30 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-purple-100 bg-white shadow-[0_25px_80px_rgba(65,20,100,0.12)] lg:min-h-[680px] lg:grid-cols-[1fr_1.05fr]">

        {/* LEFT BRANDING PANEL */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#7900D8] p-10 text-white lg:flex xl:p-14">

          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute bottom-20 right-12 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10">

            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#7900D8] shadow-lg">
                <Palette size={29} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight">
                  VK Creations
                </h2>
                <p className="text-xs font-medium text-purple-200">
                  Creative Portfolio Studio
                </p>
              </div>
            </div>

            {/* Main Text */}
            <div className="mt-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-purple-100">
                <Sparkles size={14} />
                YOUR CREATIVE WORKSPACE
              </div>

              <h1 className="mt-7 text-4xl font-extrabold leading-[1.2] xl:text-5xl">
                Create.
                <br />
                Manage.
                <br />
                <span className="text-purple-200">
                  Showcase.
                </span>
              </h1>

              <p className="mt-6 max-w-sm text-base leading-8 text-purple-100">
                Your creative journey deserves a beautiful space.
                Manage your projects, showcase your best work and
                build your digital presence.
              </p>
            </div>

            {/* Features */}
            <div className="mt-12 space-y-4">
              {[
                "Manage graphic design projects",
                "Showcase web development work",
                "Control your portfolio content",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-purple-100"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                    <CheckCircle2 size={15} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10">
            <div className="h-px bg-white/20" />
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-xs text-purple-200">
                © 2026 VK Creations. All rights reserved.
              </p>
              <ShieldCheck size={20} className="text-purple-200" />
            </div>
          </div>
        </section>

        {/* RIGHT LOGIN PANEL */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">

          <div className="w-full max-w-md">

            {/* Mobile Brand */}
            <div className="mb-9 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7900D8] text-white">
                <Palette size={25} />
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-[#171321]">
                  VK Creations
                </h2>
                <p className="text-xs text-gray-500">
                  Creative Portfolio Studio
                </p>
              </div>
            </div>

            {/* Login Heading */}
            <div className="mb-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#7900D8]">
                <LockKeyhole size={27} />
              </div>

              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[2px] text-[#7900D8]">
                <span className="h-2 w-2 rounded-full bg-[#7900D8]" />
                Admin Portal
              </div>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#171321] sm:text-4xl">
                Welcome back!
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Sign in to access your portfolio dashboard and
                manage your creative projects.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#292238]"
                >
                  Email Address
                </label>

                <div className="group relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#7900D8]"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email address"
                    autoComplete="username"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-[#FCFAFF] py-3.5 pl-12 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:font-normal placeholder:text-gray-400 hover:border-purple-200 focus:border-[#7900D8] focus:bg-white focus:ring-4 focus:ring-purple-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#292238]"
                >
                  Password
                </label>

                <div className="group relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#7900D8]"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-[#FCFAFF] py-3.5 pl-12 pr-12 text-sm font-medium text-gray-900 outline-none transition placeholder:font-normal placeholder:text-gray-400 hover:border-purple-200 focus:border-[#7900D8] focus:bg-white focus:ring-4 focus:ring-purple-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#7900D8]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#7900D8] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-purple-200 transition duration-200 hover:-translate-y-0.5 hover:bg-[#6500B5] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Security Card */}
            <div className="mt-7 rounded-2xl border border-purple-100 bg-[#FAF7FF] p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0E2FF] text-[#7900D8]">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#292238]">
                    Protected Admin Access
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    Authorized administrators only.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Website */}
            <Link
              href="/"
              className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#7900D8]"
            >
              <ArrowRight size={16} className="rotate-180" />
              Back to Portfolio Website
            </Link>

            <p className="mt-7 text-center text-xs text-gray-400">
              © 2026 VK Creations. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
