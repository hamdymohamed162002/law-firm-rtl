"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UILocale = "en" | "ar";
type UIDir = "ltr" | "rtl";

interface UIState {
  locale: UILocale;
  dir: UIDir;
}

const initial: UIState = { locale: "en", dir: "ltr" };

const uiSlice = createSlice({
  name: "ui",
  initialState: initial,
  reducers: {
    setLocale(state, action: PayloadAction<UILocale>) {
      state.locale = action.payload;
      state.dir = action.payload === "ar" ? "rtl" : "ltr";
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("dir", state.dir);
        document.documentElement.setAttribute("lang", state.locale);
      }
    },
    toggleLocale(state) {
      const next = state.locale === "en" ? "ar" : "en";
      state.locale = next;
      state.dir = next === "ar" ? "rtl" : "ltr";
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("dir", state.dir);
        document.documentElement.setAttribute("lang", state.locale);
      }
    },
  },
});

export const { setLocale, toggleLocale } = uiSlice.actions;
export default uiSlice.reducer;
