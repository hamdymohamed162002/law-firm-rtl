"use client";

import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants, Easing } from "framer-motion";
import { useEffect } from "react";
import axiosInstance from "@/axiosInstance";
const slides = [
  { img: "/Person.jpg" },
  { img: "/Person.jpg" },
  { img: "/Person.jpg" },
];
const easeOutCubic: Easing = [0.22, 1, 0.36, 1]; // <- numbers, not strings
// Framer Motion variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
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
 
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0">
        <Image src={"/Banner.png"} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-coffee-900/40" />
      </div>

      {/* Foreground content (animated when this slide becomes active) */}
      <div className="relative z-10 md:mx-auto  max-w-screen-xl px-6 h-full flex items-center justify-center md:justify-center flex-col md:flex-row  gap-8">
        <motion.div
          className="max-w-xl text-white"
          variants={fadeUp}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          key={`text-${i}`}
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
           {data?.Title || 'Title here'}
          </h1>
          <p className="opacity-90 mb-6">{t("hero.desc")}</p>
          <button className="bg-white text-coffee-800 rounded-full px-4 py-2">
            {t("hero.readMore")}
          </button>
        </motion.div>

        <motion.div
          className=" md:block md:ms-auto w-[320px]"
          variants={fadeUp}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          key={`img-${i}`}
        >
          <div className="bg-coffee-600 p-2 rounded flex items-center justify-center">
            <Image
              src={data?.Image.url ||'/Person.png'}
              alt="portrait"
              width={600}
              height={700}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function HeroSlider() {
  const { t } = useTranslation();
  const [swiper, setSwiper] = useState<any>(null);
  const pagRef = useRef<HTMLDivElement>(null);
  const [SliderData, setSliderData] = useState<any[]>([]);

  useEffect(() => {
   axiosInstance.get("/api/hero-sections?populate=*")
     .then((response) => {
       setSliderData(response.data.data);
     })
     .catch((error) => {
       console.error("Error fetching hero sections:", error);
     });
  }, []);

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
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        className="h-full"
        effect="fade"
        loop
                   key={isRTL ? "rtl" : "ltr"}     // force remount when dir changes
  dir={isRTL ? "rtl" : "ltr"}     // tell Swiper the direction
        autoplay={{ delay: 5000 }}
        onSwiper={setSwiper}
        // mount bullets in our custom container
        pagination={{ el: pagRef.current!, clickable: true }}
        onBeforeInit={(s) => {
          (s.params.pagination as any).el = pagRef.current;
        }}
      >
        {SliderData?.map((s, i) => (
          <SwiperSlide key={i}>
            <SlideContent i={i} t={t} data={s} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom controls aligned with content column */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="mx-auto max-w-screen-xl px-6 relative h-full">
          <div className="hero-controls pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            {/* NEXT ONLY */}
            <button
              aria-label="Next slide"
              onClick={() => swiper?.slideNext()}
              className="hero-next text-white cursor-pointer"
              type="button"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            {/* Bullets go here */}
            <div ref={pagRef} className="hero-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
