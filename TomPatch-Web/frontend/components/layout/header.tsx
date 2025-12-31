import Link from "next/link";
import Button from "../ui/Button";
import MobileMenu from "./mobileMenu";

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#171420] text-[#f6f6f6]">
      {/* Logo */}
      <div className="font-bold text-2xl text-[#69686D]">TomFlash</div>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-10 text-xl">
        <li>
          <Link href="#">Features</Link>
        </li>
        <li>
          <Link href="#">Pricing</Link>
        </li>
        <li>
          <Link href="#">Docs</Link>
        </li>
        <li>
          <Link href="#">About</Link>
        </li>
      </ul>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="hidden md:block text-lg font-medium hover:opacity-70"
        >
          Log in
        </Link>

        <Button
          color="#6D57FF"
          label="Get Started"
          redirect="/login"
          fontStyle={500}
        />

        {/* Client island */}
        <MobileMenu />
      </div>
    </nav>
  );
}
