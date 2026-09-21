"use client";

import Link from "next/link";
import { useState } from "react";
import { CONFIG } from "@/config";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function TopAppBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full glass-nav shadow-sm z-50">
      <div className="relative flex justify-between items-center px-6 md:px-12 py-3 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group"
        >
          <BrandLogo size={36} className="group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-5 xl:gap-8 items-center absolute left-1/2 -translate-x-1/2">
          <Link
            href="/#solutions"
            className="text-label-caps text-on-surface-variant hover:text-primary transition-colors"
          >
            Solutions
          </Link>
          <Link
            href="/#programs"
            className="text-label-caps text-on-surface-variant hover:text-primary transition-colors"
          >
            Programs
          </Link>
          <Link
            href="/#workflow"
            className="text-label-caps text-on-surface-variant hover:text-primary transition-colors"
          >
            Workflow
          </Link>
          <Link
            href="/#pricing"
            className="text-label-caps text-on-surface-variant hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <Link
            href="/login"
            className="text-label-caps text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap"
          >
            Student<span className="hidden xl:inline"> Portal</span>
          </Link>
          <ThemeToggle />
          <Link
            href="/apply"
            className="bg-primary text-on-primary text-label-caps px-5 py-2.5 rounded-lg hover:bg-primary-fixed transition-colors active:scale-95 whitespace-nowrap"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-on-surface p-2 hover:bg-surface-container rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel-strong border-t border-outline-variant/10 animate-fade-in">
          <div className="flex flex-col px-6 py-4 gap-1">
            <Link
              href="/#solutions"
              className="text-label-caps text-on-surface-variant hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-surface-container"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="/#programs"
              className="text-label-caps text-on-surface-variant hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-surface-container"
              onClick={() => setMobileMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="/#workflow"
              className="text-label-caps text-on-surface-variant hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-surface-container"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workflow
            </Link>
            <Link
              href="/#pricing"
              className="text-label-caps text-on-surface-variant hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-surface-container"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="border-t border-outline-variant/10 mt-2 pt-3 flex flex-col gap-2">
              <Link
                href="/login"
                className="text-label-caps text-on-surface-variant hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-surface-container text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Student Portal
              </Link>
              <Link
                href="/apply"
                className="bg-primary text-on-primary text-label-caps px-5 py-3 rounded-lg hover:bg-primary-fixed transition-colors active:scale-95 text-center mt-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
