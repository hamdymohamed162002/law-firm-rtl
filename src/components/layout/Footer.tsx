"use client";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="bg-coffee-700 text-white">
      <div className="mx-auto max-w-screen-xl px-6 pt-10 pb-8">
        {/* Top row: newsletter + contacts */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-9 items-center rounded-full bg-white/10 ring-1 ring-white/20 overflow-hidden">
            <input
              type="email"
              placeholder={t("footer.email")!}
              className="h-full bg-transparent px-3 text-sm placeholder-white/70 outline-none"
            />
            <button
              className="h-full rounded-full bg-white/90 text-coffee-800 px-3 text-xs font-medium hover:bg-white"
              aria-label={t("footer.subscribe")!}
            >
              {t("footer.subscribe")}
            </button>
          </div>

          <div className="ms-auto flex items-center gap-4">
            <span className="text-sm opacity-90">{t("footer.contacts")}</span>
            <div className="flex items-center gap-4 text-base opacity-90">
              <a href="#" aria-label="Twitter" className="hover:opacity-100">
                <i className="ri-twitter-x-line" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:opacity-100">
                <i className="ri-facebook-fill" />
              </a>
              <a href="#" aria-label="Google" className="hover:opacity-100">
                <i className="ri-google-fill" />
              </a>
            </div>
          </div>
        </div>

        {/* Thin divider */}
        <hr className="my-6 border-white/15" />

        {/* Bottom row: links left, copyright right */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm opacity-90">
          <a href="#" className="hover:opacity-100">{t("footer.links.about")}</a>
          <a href="#" className="hover:opacity-100">{t("footer.links.strategy")}</a>
          <a href="#" className="hover:opacity-100">{t("footer.links.advantages")}</a>
          <a href="#" className="hover:opacity-100">{t("footer.links.responsibility")}</a>
          <a href="#" className="hover:opacity-100">{t("footer.links.services")}</a>

          <span className="ms-auto">
            {t("footer.rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
