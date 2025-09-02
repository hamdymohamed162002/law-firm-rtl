import axiosInstance from "@/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


type Slide = any; // replace with a stricter type if you want

type SlidersState = {
  hero: Slide[];
  team: Slide[];
  loadingHero: boolean;
  loadingTeam: boolean;
  errorHero?: string;
  errorTeam?: string;
};

const initialState: SlidersState = {
  hero: [],
  team: [],
  loadingHero: false,
  loadingTeam: false,
};

export const fetchHeroSlides = createAsyncThunk("sliders/fetchHero", async () => {
  const res = await axiosInstance.get("/api/hero-sections?populate=*");
  return res.data.data as Slide[];
});

export const fetchTeamSlides = createAsyncThunk("sliders/fetchTeam", async () => {
  const res = await axiosInstance.get("/api/team-sliders?populate=*");
  return res.data.data as Slide[];
});

const slidersSlice = createSlice({
  name: "sliders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // hero
      .addCase(fetchHeroSlides.pending, (s) => {
        s.loadingHero = true; s.errorHero = undefined;
      })
      .addCase(fetchHeroSlides.fulfilled, (s, a) => {
        s.loadingHero = false; s.hero = a.payload;
      })
      .addCase(fetchHeroSlides.rejected, (s, a) => {
        s.loadingHero = false; s.errorHero = a.error.message;
      })
      // team
      .addCase(fetchTeamSlides.pending, (s) => {
        s.loadingTeam = true; s.errorTeam = undefined;
      })
      .addCase(fetchTeamSlides.fulfilled, (s, a) => {
        s.loadingTeam = false; s.team = a.payload;
      })
      .addCase(fetchTeamSlides.rejected, (s, a) => {
        s.loadingTeam = false; s.errorTeam = a.error.message;
      });
  },
});

export default slidersSlice.reducer;
