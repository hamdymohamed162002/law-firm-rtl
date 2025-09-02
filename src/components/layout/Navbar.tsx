"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/lib/store";
import { toggleLocale } from "@/lib/uiSlice";

const services = [
  "Legal Consultation Services",
  "Foreign Investment Services",
  "Contracts",
  "Notarization",
  "Insurance",
  "… and Defense in All Cases",
  "Banks and Financial Institutions",
  "Corporate Governance Services",
  "Companies Liquidation",
  "Internal Regulations for Companies",
  "Services for Companies and Institutions",
  "Arbitration",
  "Intellectual Property",
  "Corporate Restructuring and Reorganization",
  "Establishing National and Foreign Companies",
  "Commercial Agencies",
  "Supporting Vision 2030",
  "Estates",
];

export default function Navbar() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopSvcOpen, setDesktopSvcOpen] = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);

  // Close desktop dropdown when clicking outside
  const dropdownRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setDesktopSvcOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Respect RTL: position dropdown on the side of content padding
  const isRTL =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("dir") === "rtl";

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-screen-xl px-6">
        <nav
          className="mt-3 rounded-xl bg-coffee-900/70 backdrop-blur shadow-lg
                     text-white flex items-center justify-between px-4 py-3"
        >
          {/* Left: Logo */}
          <div className="font-semibold tracking-wide">Logo</div>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 text-sm opacity-90">
            <li><a className="hover:opacity-100" href="#">{t("nav.home")}</a></li>
            <li><a className="hover:opacity-100" href="#">{t("nav.about")}</a></li>

            {/* Services (mega dropdown) */}
            <li className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDesktopSvcOpen((v) => !v)}
                className="hover:opacity-100 inline-flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={desktopSvcOpen}
              >
                {t("nav.services")}
                <span className={`ri-arrow-down-s-line transition ${desktopSvcOpen ? "rotate-180" : ""}`} />
              </button>

              {desktopSvcOpen && (
                <div
                  className={`absolute top-full mt-2 w-[860px] rounded-xl bg-coffee-800 text-white shadow-xl p-6
                              grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-3
                              ${isRTL ? "right-0" : "left-0"}`}
                  role="menu"
                >
                  {services.map((s, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block text-sm text-white/90 hover:text-white leading-6"
                      role="menuitem"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              )}
            </li>

            <li><a className="hover:opacity-100" href="#team">{t("nav.team")}</a></li>
            <li><a className="hover:opacity-100" href="#">{t("nav.blog")}</a></li>
            <li><a className="hover:opacity-100" href="#contact">{t("nav.contact")}</a></li>
          </ul>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <input
              placeholder={t("nav.search")!}
              className="hidden md:block rounded-full bg-white/10 placeholder-white/60 px-3 py-1 text-sm outline-none"
            />
            <button className="hidden sm:inline-flex rounded-full bg-white text-coffee-800 text-sm px-3 py-1">
              {t("nav.book")}
            </button>
            <button
              onClick={() => dispatch(toggleLocale())}
              className="rounded-full border border-white/40 px-3 py-1 text-sm"
            >
              عربي
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-xl"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <i className={`ri-${mobileOpen ? "close-line" : "menu-line"}`} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 rounded-xl bg-coffee-900/90 backdrop-blur text-white shadow-lg px-4 py-3">
            <a className="block py-2 text-sm" href="#">{t("nav.home")}</a>
            <a className="block py-2 text-sm" href="#">{t("nav.about")}</a>

            {/* Mobile Services collapsible */}
            <button
              className="w-full flex items-center justify-between py-2 text-sm"
              onClick={() => setMobileSvcOpen((v) => !v)}
              aria-expanded={mobileSvcOpen}
            >
              <span>{t("nav.services")}</span>
              <i className={`ri-arrow-down-s-line transition ${mobileSvcOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileSvcOpen && (
              <div className="pl-3 pb-2">
                {services.map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="block py-1.5 text-sm text-white/85 hover:text-white"
                  >
                    {s}
                  </a>
                ))}
              </div>
            )}

            <a className="block py-2 text-sm" href="#team">{t("nav.team")}</a>
            <a className="block py-2 text-sm" href="#">{t("nav.blog")}</a>
            <a className="block py-2 text-sm" href="#contact">{t("nav.contact")}</a>

            {/* Actions inside mobile menu (optional) */}
            <div className="mt-3 flex items-center gap-2">
              <input
                placeholder={t("nav.search")!}
                className="flex-1 rounded-full bg-white/10 placeholder-white/60 px-3 py-1 text-sm outline-none"
              />
              <button className="rounded-full bg-white text-coffee-800 text-sm px-3 py-1">
                {t("nav.book")}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
