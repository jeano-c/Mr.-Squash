import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { FaMapLocationDot } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Career", path: "/career" },
  { label: "About Us", path: "/about" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61589105545390",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mr.squash_official?igsh=NnNscGpkbGhwZmF3",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@mr.squash_official?_r=1&_t=ZS-95wEMOngiH7",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
      </svg>
    ),
  },
];

function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* ── top orange accent bar ── */}
      <div className="h-1.5 bg-[#ec7719]" />

      {/* ── main footer body ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* col 1 — brand */}
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Mr. Squash"
              className="h-14 w-14 object-contain drop-shadow-md
                group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <p className="font-black text-xl leading-none tracking-tight">
                Mr. Squash
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            A Filipino fast-food restaurant committed to nutritious and
            affordable food options, made with fresh and quality ingredients.
          </p>
          {/* social icons */}
          <div className="flex gap-3 mt-1">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ec7719]
                  flex items-center justify-center transition-all duration-200
                  hover:scale-110 active:scale-95"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* col 2 — quick links + store info */}
        <div className="flex flex-col gap-3">
          <p className="text-[#ec7719] text-xs font-black tracking-[0.2em] uppercase mb-1">
            Quick Links
          </p>
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.path)}
              className="text-gray-300 hover:text-[#ec7719] text-sm font-medium text-left
                transition-colors duration-200 w-fit"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* col 3 — contact + hours */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-[#ec7719] text-xs font-black tracking-[0.2em] uppercase mb-3">
              Find Us
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <FaMapLocationDot className="text-[#ec7719] text-lg mt-0.5 shrink-0" />
                <span>
                  72 G. Marcelo St, Maysan,
                  <br />
                  Valenzuela City
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <SiGmail className="text-[#ec7719] text-lg shrink-0" />
                <a
                  href="mailto:mrsquashofficial04@gmail.com"
                  className="hover:text-[#ec7719] transition-colors duration-200 break-all"
                >
                  mrsquashofficial04@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-[#ec7719] text-lg shrink-0" />
                <a
                  href="tel:09628780274"
                  className="hover:text-[#ec7719] transition-colors duration-200"
                >
                  0962 878 0274
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#ec7719] text-xs font-black tracking-[0.2em] uppercase mb-3">
              Opening Hours
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 flex justify-between items-center">
              <span>Mon - Sat</span>
              <span className="text-white font-bold">10:00am - 10:00pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── bottom copyright bar ── */}
      <div className="border-t border-white/10 py-5 px-6 text-center text-gray-500 text-xs">
        © {year} Escape Company. All rights reserved. ·{" "}
        <span className="text-[#ec7719] font-semibold">Mr. Squash</span>
      </div>
    </footer>
  );
}

export default Footer;
