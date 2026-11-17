
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  Menu,
  Search,
  Bell,
  ExternalLink,
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const PROFILE_STORAGE_KEY = "vk-creations-admin-profile";

const DEFAULT_PROFILE = {
  name: "Vishnu Gurjar",
  role: "Portfolio Administrator",
  email: "",
  profileImage: "",
};

export default function Header({ onMenuClick }) {
  const pathname = usePathname();

  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Load latest profile information from localStorage
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
        console.error("Unable to load admin profile:", error);
        setProfile(DEFAULT_PROFILE);
      }

      setProfileLoaded(true);
    };

    loadProfile();

    // Update when profile changes in another browser tab
    window.addEventListener("storage", loadProfile);

    // Update when Profile page dispatches this event
    window.addEventListener("vk-admin-profile-updated", loadProfile);

    return () => {
      window.removeEventListener("storage", loadProfile);
      window.removeEventListener(
        "vk-admin-profile-updated",
        loadProfile
      );
    };
  }, [pathname]);

  const closeAllMenus = () => {
    setSearchOpen(false);
    setProfileOpen(false);
    setNotificationOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("vk_admin_logged_in");
    window.location.href = "/admin/login";
  };

  // Generate initials if profile photo is not uploaded
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

  // Reusable profile avatar
  const ProfileAvatar = ({ size = 42 }) => {
    const image = profile.profileImage;

    return (
      <div
        className="relative shrink-0 overflow-hidden rounded-full border-2 border-purple-100 bg-[#7900D8] shadow-sm"
        style={{ width: size, height: size }}
      >
        {profileLoaded && image ? (
          <Image
            src={image}
            alt={profile.name || "Admin Profile"}
            fill
            sizes={`${size}px`}
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
            {getInitials(profile.name)}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-purple-100 bg-white px-4 sm:px-6 lg:px-8">

      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="rounded-xl border border-purple-100 p-2.5 text-[#7900D8] transition hover:bg-[#F3E8FF] lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#171321] md:text-xl">
            Dashboard
          </h2>

          <p className="hidden text-xs text-gray-500 sm:block">
            Manage your creative portfolio
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Preview Website */}
        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-xl bg-[#7900D8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6500B5] sm:flex"
        >
          <ExternalLink size={16} />
          Preview Website
        </Link>

        {/* Search */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setNotificationOpen(false);
              setProfileOpen(false);
            }}
            aria-label="Toggle search"
            className="rounded-xl border border-purple-100 p-2.5 text-gray-600 transition hover:bg-[#F3E8FF] hover:text-[#7900D8]"
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>

          {searchOpen && (
            <div className="absolute right-0 top-14 z-50 w-[270px] rounded-xl border border-purple-100 bg-white p-3 shadow-xl sm:w-[320px]">
              <input
                type="text"
                placeholder="Search projects..."
                autoFocus
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-[#7900D8] focus:ring-2 focus:ring-purple-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Search functionality can be connected to My Projects.
              </p>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              setSearchOpen(false);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            className="relative rounded-xl border border-purple-100 p-2.5 text-gray-600 transition hover:bg-[#F3E8FF] hover:text-[#7900D8]"
          >
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D000E8]" />
          </button>

          {notificationOpen && (
            <div className="absolute right-0 top-14 z-50 w-[280px] rounded-xl border border-purple-100 bg-white p-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">
                  Notifications
                </h3>

                <button
                  type="button"
                  onClick={() => setNotificationOpen(false)}
                  aria-label="Close notifications"
                  className="text-gray-500 hover:text-[#7900D8]"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="mt-4 rounded-lg border border-purple-100 bg-[#F7EDFF] p-3">
                <p className="text-sm font-semibold text-[#7900D8]">
                  Welcome to your portfolio manager!
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Your creative workspace is ready.
                </p>
              </div>

              <p className="mt-3 text-center text-xs text-gray-500">
                No new notifications
              </p>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setSearchOpen(false);
              setNotificationOpen(false);
            }}
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-[#F3E8FF]"
          >
            {/* Actual Profile Photo */}
            <ProfileAvatar size={42} />

            <ChevronDown
              size={15}
              className={`hidden text-gray-500 transition sm:block ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 z-50 w-[260px] overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-xl">

              {/* Profile Information */}
              <div className="border-b border-purple-100 bg-[#F7EDFF] p-4">
                <div className="flex items-center gap-3">
                  <ProfileAvatar size={48} />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {profile.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-600">
                      {profile.role}
                    </p>

                    {profile.email && (
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {profile.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <Link
                  href="/admin/profile"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-[#F3E8FF] hover:text-[#7900D8]"
                >
                  <UserRound size={17} />
                  Edit Profile
                </Link>

                <Link
                  href="/admin/profile#settings"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-[#F3E8FF] hover:text-[#7900D8]"
                >
                  <Settings size={17} />
                  Settings
                </Link>

                <div className="my-2 border-t border-gray-100" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
