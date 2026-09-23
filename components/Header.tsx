"use client";

import { categories } from "@/lib/tools";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="border-b border-[var(--line)] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Link
          href="/"
          className="text-xl font-black tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          <span className="text-[var(--green)]">energy</span> tools hub
        </Link>
        <nav
          className="hidden gap-6 text-sm font-bold text-[var(--ink-muted)] md:flex"
          aria-label="Primary navigation"
        >
          {categories.map((category) => (
            <Link key={category.slug} href={category.path}>
              {category.name.replace(" Tools", "")}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/tools" className="text-sm font-bold text-[var(--green)]">
            All tools
          </Link>
          <button
            type="button"
            className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-bold md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-[var(--line)] px-5 py-3 md:hidden"
          aria-label="Mobile navigation"
        >
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={category.path}
              className="block border-b border-[var(--line)] py-3 font-bold"
              onClick={() => setMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/tools"
            className="block py-3 font-bold text-[var(--green)]"
            onClick={() => setMenuOpen(false)}
          >
            All Tools
          </Link>
        </nav>
      )}
    </header>
  );
}
