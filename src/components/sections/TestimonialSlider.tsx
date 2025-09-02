"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const items = [
  { name: "Mohammed Saif", title: "CEO/Company", img: "/portrait.jpg" },
  { name: "Alya", title: "COO/Company", img: "/portrait.jpg" },
];

export default function TestimonialSlider() {
  const { t } = useTranslation();

  // auto-flip icons in RTL
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

  return (
    <section className="py-16 bg-coffee-600 text-white">
      <div className="mx-auto max-w-screen-xl px-6">
        <h2 className="text-3xl font-semibold mb-3">{t("testi.title")}</h2>
        <p className="max-w-lg text-white/80 text-sm leading-6 mb-8"></p>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            className="testi-swiper"
            loop
            autoplay={{ delay: 6000 }}
            pagination={{ clickable: true }}
            // 👉 Use class selectors, not refs
            navigation={{ prevEl: ".testi-prev", nextEl: ".testi-next" }}
            // ensure binding after React renders buttons
            onSwiper={(s) => {
              setTimeout(() => {
                s.params.navigation = {
                  ...(s.params.navigation as any),
                  prevEl: ".testi-prev",
                  nextEl: ".testi-next",
                };
                s.navigation.destroy();
                s.navigation.init();
                s.navigation.update();
              });
            }}
          >
            {items.map((it, i) => (
              <SwiperSlide key={i}>
                <div className="grid md:grid-cols-[280px_1fr] gap-8 items-center">
                  <div className="bg-coffee-500 p-2 rounded-md w-[260px] h-[260px] relative">
                    <Image src={it.img} alt={it.name} fill className="object-cover rounded" />
                  </div>

                  <div>
                    <p className="opacity-90 leading-7">{t("testi.quote")}</p>
                    <div className="mt-6">
                      <div className="font-semibold">{it.name}</div>
                      <div className="text-sm opacity-80">{it.title}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom arrows at bottom-right */}
          <div className="pointer-events-none absolute right-0 -bottom-2 flex items-center gap-3 z-10">
            <button className="testi-prev pointer-events-auto" aria-label="Previous">
              <i className={isRTL ? "ri-arrow-right-s-line" : "ri-arrow-left-s-line"} />
            </button>
            <button className="testi-next pointer-events-auto" aria-label="Next">
              <i className={isRTL ? "ri-arrow-left-s-line" : "ri-arrow-right-s-line"} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
