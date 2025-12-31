"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex flex-col gap-1.5"
        aria-label="Open menu"
      >
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
      </button>

      {/* Fullscreen menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[#171420] text-white flex flex-col">
          <div className="flex justify-end px-6 py-6">
            <button onClick={() => setOpen(false)} className="text-3xl">
              ✕
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center gap-8 flex-1 text-2xl">
            <Link href="#" onClick={() => setOpen(false)}>
              Features
            </Link>
            <Link href="#" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link href="#" onClick={() => setOpen(false)}>
              Docs
            </Link>
            <Link href="/login" onClick={() => setOpen(false)}>
              Log in
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
