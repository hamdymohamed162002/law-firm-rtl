"use client";

import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { fetchHeroSlides } from "@/lib/slidersSlice";
import CircleLoader from "@/components/layout/CircleLoader";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function SlideContent({
  i,
  t,
  data,
}: {
  i: number;
  t: ReturnType<typeof useTranslation>["t"];
  data: any;
}) {
  const { isActive } = useSwiperSlide();
  const imgUrl =
    data?.Image?.url ||
    data?.Image?.formats?.small?.url ||
    data?.Image?.formats?.thumbnail?.url ||
    "/Person.png";

  return (
    <>
      {/* Background (replace with data if you have it) */}
      <div className="absolute inset-0">
        <Image src={"/Banner.png"} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-coffee-900/40" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 md:mx-auto max-w-screen-xl px-6 h-full
                      flex md:flex-row flex-col gap-8 md:items-center
                      py-10 md:py-0 justify-center md:justify-between">
        {/* TEXT (under image on mobile via order) */}
        <motion.div
          className="max-w-xl text-white order-2 md:order-1"
          variants={fadeUp}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          key={`text-${i}`}
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            {data?.Title || "Title here"}
          </h1>
          <p className="opacity-90 mb-6">{t("hero.desc")}</p>
          <button className="bg-white text-coffee-800 rounded-full px-4 py-2">
            {t("hero.readMore")}
          </button>
        </motion.div>

        {/* IMAGE (on top on mobile) */}
        <motion.div
          className=" md:order-2 w-full flex items-center justify-center md:w-[320px]"
          variants={fadeUp}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          key={`img-${i}`}
        >
          <div className="bg-coffee-600 w-[320px] p-2 rounded ">
            <Image
              src={imgUrl}
              alt={data?.Title || "portrait"}
              width={400}
              height={400}
              className=" h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}

function useIsRTL() {
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    const read = () =>
      typeof document !== "undefined" &&
      document.documentElement.getAttribute("dir") === "rtl";
    setIsRTL(read());
    const obs = new MutationObserver(() => setIsRTL(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
    return () => obs.disconnect();
  }, []);
  return isRTL;
}

export default function HeroSlider() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { hero, loadingHero, errorHero } = useAppSelector((s) => s.sliders);
  const [swiper, setSwiper] = useState<any>(null);
  const pagRef = useRef<HTMLDivElement>(null);
  const isRTL = useIsRTL();

  useEffect(() => {
    dispatch(fetchHeroSlides());
  }, [dispatch]);

  if (loadingHero) {
    return (
      <section className="relative h-[80vh] flex items-center justify-center text-white">
        <CircleLoader />
      </section>
    );
  }
  if (errorHero) {
    return (
      <section className="relative h-[80vh] flex items-center justify-center text-red-200">
        Failed to load hero
      </section>
    );
  }
  if (!hero.length) return null;

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        className="h-full"
        effect="fade"
        loop
        key={isRTL ? "rtl" : "ltr"}
        dir={isRTL ? "rtl" : "ltr"}
        autoplay={{ delay: 5000 }}
        onSwiper={setSwiper}
        pagination={{ el: pagRef.current!, clickable: true }}
        onBeforeInit={(s) => {
          (s.params.pagination as any).el = pagRef.current;
        }}
      >
        {hero.map((s: any, i: number) => (
          <SwiperSlide key={s.id ?? i}>
            <SlideContent i={i} t={t} data={s} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom next + bullets column */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="mx-auto max-w-screen-xl px-6 relative h-full">
          <div className="hero-controls pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <button
              aria-label="Next slide"
              onClick={() => swiper?.slideNext()}
              className="hero-next text-white cursor-pointer"
              type="button"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <div ref={pagRef} className="hero-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
