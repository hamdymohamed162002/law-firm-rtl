"use client";

import React, { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setLocale } from "@/lib/uiSlice";

let inited = false;

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const { locale, dir } = useAppSelector((s) => s.ui);
  const dispatch = useAppDispatch();

  if (!inited) {
    i18n.use(initReactI18next).init({
      resources: { en: { common: en }, ar: { common: ar } },
      lng: "en",
      fallbackLng: "en",
      ns: ["common"],
      defaultNS: "common",
      interpolation: { escapeValue: false },
    });
    inited = true;
  }

  useEffect(() => {
    const htmlLang = document.documentElement.getAttribute("lang") as "en" | "ar" | null;
    if (htmlLang && htmlLang !== locale) dispatch(setLocale(htmlLang));
  }, []);

  useEffect(() => {
    i18n.changeLanguage(locale);
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", locale);
  }, [locale, dir]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
