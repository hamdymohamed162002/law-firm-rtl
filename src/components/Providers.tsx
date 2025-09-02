"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import I18nProvider from "@/components/i18n/I18nProvider";

/**
 * Wraps Redux + i18n as a single client component.
 * Default export MUST be a function component.
 */
export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nProvider>{children}</I18nProvider>
    </Provider>
  );
}
