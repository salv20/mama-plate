import Link from "next/link";
import { Container } from "../ui/Container";
import { Logo } from "@/app/Logo";
import { site } from "@/app/lib/site";

const links = [
  { label: "Plan my day", href: "/plan" },
  { label: "Urgent help", href: "/urgent-care" },
  { label: "Privacy", href: "/privacy" },
  { label: "Sources", href: "/sources" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              General nutrition education for pregnancy. It does not replace
              advice from your doctor or midwife.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted transition-colors hover:text-blush-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-muted">
          &copy; 2026 {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
