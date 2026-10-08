import Link from "next/link";
import { Container } from "../ui/Container";
import { Logo } from "@/app/Logo";
import { site } from "@/app/lib/site";

const quickLinks = [
  { label: "Plan my day", href: "/plan" },
  { label: "Urgent help", href: "/urgent-care" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Sources & References", href: "/sources" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white text-muted">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Disclaimer */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-sm leading-relaxed">
              General nutrition education for pregnancy. It does not replace
              advice from your doctor or midwife.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-900">Navigation</h3>
            <nav
              aria-label="Footer Navigation"
              className="flex flex-col gap-2 text-sm"
            >
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-blush-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact & Web Creation */}
          <div className="flex flex-col gap-3 text-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-2">
              <p>
                <span className="block font-medium text-slate-700">
                  Questions & Support:
                </span>
                <a
                  href="mailto:salvationamoke@gmail.com"
                  className="transition-colors hover:text-blush-700"
                >
                  salvationamoke@gmail.com
                </a>
              </p>
              <p>
                <span className="block font-medium text-slate-700">Phone:</span>
                <a
                  href="tel:+2349030866613"
                  className="transition-colors hover:text-blush-700"
                >
                  +234 (903) 086-6613
                </a>
              </p>
              <p>
                <span className="block font-medium text-slate-700">
                  Website Creation:
                </span>
                <a
                  href="mailto:nexeahub@gmail.com"
                  className="transition-colors hover:text-blush-700"
                >
                  nexeahub@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Donations & Support */}
          <div className="flex flex-col gap-3 text-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Support Our Work
            </h3>
            <p className="text-sm leading-relaxed">
              Help us continue providing free maternal nutrition resources.
            </p>
            <div>
              <Link
                href="/donate"
                className="inline-block rounded-md bg-blush-700 px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Make a Donation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs sm:flex-row">
          <p>&copy; 2026 {site.name}. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://nexeaapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-800 underline underline-offset-2 hover:text-blush-700"
            >
              Nexea
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
