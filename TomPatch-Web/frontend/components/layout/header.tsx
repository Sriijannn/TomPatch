import Link from "next/link";
import Button from "../ui/Button";
import MobileMenu from "./mobileMenu";

const LogoIcon = () => (
  <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 7L2 14l10 5 10-5-10-5z" />
  </svg>
);

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#171420] text-[#f6f6f6]">
      <style>{`
        @keyframes underlineExpand {
          from {
            width: 0;
            left: 0;
          }
          to {
            width: 100%;
            left: 0;
          }
        }

        @keyframes underlineCollapse {
          from {
            width: 100%;
            left: 0;
          }
          to {
            width: 0;
            left: 100%;
          }
        }

        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #6D57FF;
        }

        .nav-link:hover::after {
          animation: underlineExpand 0.4s ease forwards;
        }

        .nav-link:not(:hover)::after {
          animation: underlineCollapse 0.4s ease forwards;
        }
      `}</style>

      {/* Logo */}
      <div className="font-bold text-2xl text-[#69686D] flex flex-row">
        <div className="hidden md:flex">
          <LogoIcon />
        </div>
        TomFlash
      </div>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-10 text-xl">
        <li>
          <Link href="#" className="nav-link">
            Features
          </Link>
        </li>
        <li>
          <Link href="#" className="nav-link">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="#" className="nav-link">
            Docs
          </Link>
        </li>
        <li>
          <Link href="/" className="nav-link">
            About
          </Link>
        </li>
      </ul>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Link
          href="/auth/signin"
          className="hidden md:block text-lg font-medium hover:opacity-70"
        >
          Log in
        </Link>

        <Button
          color="#6D57FF"
          label="Get Started"
          redirect="/auth/signup"
          fontStyle={500}
        />

        {/* Client island */}
        <MobileMenu />
      </div>
    </nav>
  );
}
