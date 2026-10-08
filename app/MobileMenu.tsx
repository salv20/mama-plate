"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./component/ui/Button";
import { site } from "./lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-blush-50"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full border-b border-line bg-cream px-5 py-4 shadow-sm"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[
                ...site.nav,
                { label: "Urgent help", href: "/urgent-care" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-xl px-3 py-3 font-medium text-ink transition-colors hover:bg-blush-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3" onClick={close}>
              <Button href="/plan" className="w-full">
                Plan my day
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
