
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    const adminToken = sessionStorage.getItem("vk_admin_token");
    const isLoggedIn =
      sessionStorage.getItem("vk_admin_logged_in") === "true";

    if (isLoggedIn && adminToken) {
      setIsAuthenticated(true);
      setCheckingAuth(false);
    } else {
      setIsAuthenticated(false);
      router.replace("/admin/login");
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return children;
  }

  if (checkingAuth || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5FC]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-100 border-t-[#7900D8]" />
          <p className="mt-4 text-sm font-medium text-gray-700">
            Checking admin access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:ml-[260px]">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="min-h-[calc(100vh-76px)] p-5 md:p-8 lg:p-9">
          {children}
        </main>
      </div>
    </div>
  );
}
