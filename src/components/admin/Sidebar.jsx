
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  UserRound,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";

const PROFILE_STORAGE_KEY = "vk-creations-admin-profile";

const DEFAULT_PROFILE = {
  name: "Vishnu Gurjar",
  role: "Portfolio Administrator",
  profileImage: "",
};

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    name: "My Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    key: "projects",
  },
  {
    name: "Add New Project",
    href: "/admin/add-project",
    icon: PlusCircle,
    key: "add-project",
  },
  {
    name: "Edit Profile",
    href: "/admin/profile",
    icon: UserRound,
    key: "profile",
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Load Admin Profile
  useEffect(() => {
    const loadProfile = () => {
      try {
        const savedProfile = localStorage.getItem(
          PROFILE_STORAGE_KEY
        );

        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);

          setProfile({
            ...DEFAULT_PROFILE,
            ...parsedProfile,
          });
        } else {
          setProfile(DEFAULT_PROFILE);
        }
      } catch (error) {
        console.error("Unable to load profile:", error);
        setProfile(DEFAULT_PROFILE);
      }

      setProfileLoaded(true);
    };

    loadProfile();

    window.addEventListener("storage", loadProfile);
    window.addEventListener("vk-admin-profile-updated", loadProfile);

    return () => {
      window.removeEventListener("storage", loadProfile);
      window.removeEventListener(
        "vk-admin-profile-updated",
        loadProfile
      );
    };
  }, []);

  // Active menu detection
  const activeItem = pathname.startsWith("/admin/projects")
    ? "projects"
    : pathname === "/admin/add-project"
    ? "add-project"
    : pathname.startsWith("/admin/profile")
    ? "profile"
    : pathname === "/admin"
    ? "dashboard"
    : "";

  // Generate initials
  const getInitials = (name) => {
    return (
      name
        ?.trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("") || "VG"
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-purple-950/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[260px] flex-col
          border-r border-purple-100
          bg-white
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="flex h-[85px] shrink-0 items-center justify-between border-b border-purple-100 px-5">
          <Link
            href="/admin"
            onClick={onClose}
          >
            <Image
              src="/images/Logo.png"
              alt="VK Creations"
              width={180}
              height={70}
              priority
              className="h-auto w-[165px] object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-[#F3E8FF] hover:text-[#7900D8] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 py-8">
          <div className="mb-5 flex items-center justify-between px-3">
            <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-gray-400">
              Workspace
            </p>

            <Sparkles size={15} className="text-[#7900D8]" />
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.key;

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center gap-3
                    rounded-xl px-4 py-3.5
                    text-sm font-semibold
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#7900D8] text-white shadow-md shadow-purple-200"
                        : "text-gray-600 hover:bg-[#F3E8FF] hover:text-[#7900D8]"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />

                  <span>{item.name}</span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Creative Tip Card */}
          <div className="mt-10 rounded-2xl border border-purple-100 bg-[#F7EDFF] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#7900D8] text-white">
              <Sparkles size={18} />
            </div>

            <h3 className="text-sm font-bold text-gray-900">
              Keep Creating!
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              Upload your latest creative work and keep your portfolio fresh.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="shrink-0 border-t border-purple-100 p-4">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mb-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#F3E8FF] hover:text-[#7900D8]"
          >
            <ExternalLink size={19} />
            View Portfolio Website
          </Link>

          {/* Admin Profile */}
          <Link
            href="/admin/profile"
            onClick={onClose}
            className="flex items-center gap-3 rounded-2xl border border-purple-100 bg-[#FFFAFF] p-3 transition hover:border-purple-300 hover:bg-[#F7EDFF]"
          >
            {/* Profile Photo */}
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-purple-100 bg-[#7900D8]">
              {profileLoaded && profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt={profile.name || "Admin Profile"}
                  fill
                  sizes="44px"
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                  {getInitials(profile.name)}
                </div>
              )}
            </div>

            {/* Profile Details */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-gray-900">
                {profile.name}
              </p>

              <p className="mt-0.5 truncate text-[11px] font-medium text-[#7900D8]">
                {profile.role}
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
