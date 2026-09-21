"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavItem {
  label: string;
  icon: string;
  href: string;
}

const navItems: BottomNavItem[] = [
  { label: "Home", icon: "dashboard", href: "/portal" },
  { label: "LMS", icon: "school", href: "/portal/lms" },
  { label: "Projects", icon: "folder_open", href: "/portal/projects" },
  { label: "Progress", icon: "trending_up", href: "/portal/progress" },
  { label: "More", icon: "more_horiz", href: "/portal/announcements" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-nav border-t border-outline-variant/10 z-50 safe-area-bottom">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[56px] ${
                isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-all ${
                  isActive ? "text-primary" : ""
                }`}
                style={{
                  fontVariationSettings: isActive
                    ? "'FILL' 1, 'wght' 600"
                    : "'FILL' 0, 'wght' 400",
                }}
              >
                {item.icon}
              </span>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-primary" : ""
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-0 w-8 h-[3px] rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
