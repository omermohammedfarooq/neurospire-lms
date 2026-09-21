import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-background border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Brand block */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center">
            <BrandLogo size={36} />
          </div>
          <p className="text-body-sm text-on-secondary-container opacity-80 leading-relaxed max-w-sm">
            Neurospire AI Technologies is an MSME registered organization dedicated to advanced computer programs, 
            software engineering, machine learning, and artificial intelligence solutions. We aim to educate technical leaders 
            and build next-generation software architectures.
          </p>
        </div>

        {/* Platform */}
        <div className="col-span-1 flex flex-col gap-3">
          <span className="text-label-caps text-on-surface-variant mb-1">
            Platform
          </span>
          <Link
            href="/#solutions"
            className="text-body-sm text-on-secondary-container hover:text-primary transition-all opacity-80 hover:opacity-100"
          >
            Solutions
          </Link>
          <Link
            href="/#pricing"
            className="text-body-sm text-on-secondary-container hover:text-primary transition-all opacity-80 hover:opacity-100"
          >
            Programs
          </Link>
          <Link
            href="/apply"
            className="text-body-sm text-on-secondary-container hover:text-primary transition-all opacity-80 hover:opacity-100"
          >
            Enroll Now
          </Link>
        </div>

        {/* Resources */}
        <div className="col-span-1 flex flex-col gap-3">
          <span className="text-label-caps text-on-surface-variant mb-1">
            Resources
          </span>
          <Link
            href="/portal"
            className="text-body-sm text-on-secondary-container hover:text-primary transition-all opacity-80 hover:opacity-100"
          >
            Verify Certificate
          </Link>
          <Link
            href="/login"
            className="text-body-sm text-on-secondary-container hover:text-primary transition-all opacity-80 hover:opacity-100"
          >
            Student Login
          </Link>

          <Link
            href="/admin/register-student"
            className="text-body-sm text-on-secondary-container hover:text-primary transition-all opacity-80 hover:opacity-100 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px] text-primary">admin_panel_settings</span>
            Admin Provisioning
          </Link>
        </div>

        {/* Legal */}
        <div className="col-span-1 flex flex-col gap-3">
          <span className="text-label-caps text-on-surface-variant mb-1">
            Legal
          </span>
          <Link
            href="#"
            className="text-body-sm text-on-secondary-container hover:text-primary transition-all opacity-80 hover:opacity-100"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-body-sm text-on-secondary-container hover:text-primary transition-all opacity-80 hover:opacity-100"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-body-sm text-on-secondary-container hover:text-primary transition-all opacity-80 hover:opacity-100"
          >
            Cookie Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
