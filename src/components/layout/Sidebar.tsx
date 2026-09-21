"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  label: string;
  icon: string;
  href: string;
}

const studentLinks: SidebarItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/portal" },
  { label: "LMS", icon: "school", href: "/portal/lms" },
  { label: "Projects", icon: "folder_open", href: "/portal/projects" },
  { label: "Progress", icon: "trending_up", href: "/portal/progress" },
  { label: "GitHub", icon: "code", href: "/portal/github" },
  { label: "Attendance", icon: "event_available", href: "/portal/attendance" },
  { label: "Announcements", icon: "campaign", href: "/portal/announcements" },
];

const adminLinks: SidebarItem[] = [
  { label: "Overview", icon: "dashboard", href: "/admin" },
  { label: "Candidates", icon: "people", href: "/admin/candidates" },
  { label: "Onboarding", icon: "person_add", href: "/admin/onboarding" },
  { label: "Certificates", icon: "verified", href: "/admin/certificates" },
];

interface SidebarProps {
  variant?: "student" | "admin";
}

export default function Sidebar({ variant = "student" }: SidebarProps) {
  const pathname = usePathname();
  const links = variant === "admin" ? adminLinks : studentLinks;

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-surface-container-low border-r border-outline-variant/10 pt-[72px]">
      {/* User Section */}
      <div className="px-4 py-5 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
            <span className="text-on-primary-container font-semibold text-sm">
              {variant === "admin" ? "A" : "S"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-label-md text-on-surface">
              {variant === "admin" ? "Admin Panel" : "Student Portal"}
            </span>
            <span className="text-label-sm text-on-surface-variant font-normal">
              {variant === "admin" ? "admin@neurospire.ai" : "student@neurospire.ai"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-body-sm ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? "text-primary" : ""
                    }`}
                  >
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-outline-variant/10">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-body-sm"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="font-medium">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
