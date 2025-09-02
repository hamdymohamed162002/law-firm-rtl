"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useEffect, useState } from "react";
import axiosInstance from "@/axiosInstance";
import CircleLoader from "../layout/CircleLoader";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { fetchTeamSlides } from "@/lib/slidersSlice";
const team = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: "John Carter",
  position: "Attorney",
  img: "/portrait.jpg",
}));

export default function TeamSlider() {
  const { t } = useTranslation();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  function useIsRTL() {
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const read = () =>
      typeof document !== "undefined" &&
      document.documentElement.getAttribute("dir") === "rtl";

    setIsRTL(read());

    // watch <html dir> so when you toggle lang, we remount with new dir
    const obs = new MutationObserver(() => setIsRTL(read()));
    if (typeof document !== "undefined") {
      obs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"],
      });
    }
    return () => obs.disconnect();
  }, []);

  return isRTL;
}
const isRTL = useIsRTL();

const dispatch = useAppDispatch();
  const { team, loadingTeam, errorTeam } = useAppSelector((s) => s.sliders);


  useEffect(() => {
    dispatch(fetchTeamSlides());
  }, [dispatch]);

  if (loadingTeam) {
    return (
      <section className="py-16 bg-white flex justify-center">
        <CircleLoader className="border-coffee-700 border-t-coffee-900" />
      </section>
    );
  }
  if (errorTeam) {
    return (
      <section className="py-16 text-center text-red-500">
        Failed to load team
      </section>
    );
  }
  if (!team.length) return null;

  return (
    <section id="team" className="py-16 bg-white">
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-semibold text-coffee-700 mb-2">
            {t("team.sectionTitle")}
          </h2>
          <p className="text-gray-600">{t("team.sectionDesc")}</p>
        </div>

        <div className="relative">
          <Swiper
            className="team-swiper"
             key={isRTL ? "rtl" : "ltr"}     // force remount when dir changes
  dir={isRTL ? "rtl" : "ltr"}     // tell Swiper the direction
            modules={[Navigation]}
            spaceBetween={24}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(s) => {
              // attach custom buttons before init
              (s.params.navigation as any).prevEl = prevRef.current;
              (s.params.navigation as any).nextEl = nextRef.current;
            }}
            onSwiper={(s) => {
              // ensure refs are attached after they mount
              setTimeout(() => {
                s.params.navigation = {
                  ...(s.params.navigation as any),
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                };
                s.navigation.destroy();
                s.navigation.init();
                s.navigation.update();
              });
            }}
            breakpoints={{
              0: { slidesPerView: 1.1 },
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3 },
            }}
          >
            {team.map((m) => (
              <SwiperSlide key={m.id}>
                <article className=" overflow-hidden bg-white ring-1 ring-black/5 shadow-sm  transition">
                  <div className="relative aspect-[4/3]">
                    <Image src={'/Person.png'} alt={m.Name} fill className="object-cover" />
                  </div>
                  <div className="px-4 pt-4 pb-5 text-center">
                    <h3 className="font-semibold">{m?.Name}</h3>
                    <p className="mt-1 text-[11px] tracking-widest text-gray-500">
                      {m?.Postion}
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-4 text-gray-500">
                      <i className="ri-whatsapp-line" aria-label="WhatsApp" />
                      <i className="ri-twitter-x-line" aria-label="X" />
                      <i className="ri-linkedin-line" aria-label="LinkedIn" />
                      <i className="ri-mail-line" aria-label="Email" />
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom arrows (inside the container) */}
          <div className="team-nav">
            <button ref={prevRef} className="team-prev" aria-label="Previous">
              <i className="ri-arrow-left-s-line" />
            </button>
            <button ref={nextRef} className="team-next" aria-label="Next">
              <i className="ri-arrow-right-s-line" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
