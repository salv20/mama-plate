import Link from "next/link";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Logo } from "@/app/Logo";
import { MobileMenu } from "@/app/MobileMenu";
import { site } from "@/app/lib/site";

const linkStyle =
  "relative text-sm font-medium text-muted transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-blush-600 after:transition-transform after:duration-300 hover:after:scale-x-100";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkStyle}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/urgent-care"
            className="text-sm font-semibold text-blush-700 transition-colors hover:text-blush-500"
          >
            Urgent help
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="/plan">Plan my day</Button>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
