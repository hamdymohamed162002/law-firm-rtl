"use client";
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import slidersReducer from "./slidersSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store =
 configureStore({ reducer:
     { ui: uiReducer,
          sliders: slidersReducer,
      } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
