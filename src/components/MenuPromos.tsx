import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiX, HiOutlineZoomIn } from "react-icons/hi";

// Import food promo posters
import burgerPromo from "../assets/posters/27_20260620_083744_0006.webp";
import friesPromo from "../assets/posters/28_20260620_083744_0007.webp";
import pumpletPromo from "../assets/posters/29_20260620_083744_0008.webp";
import krispyPromo from "../assets/posters/30_20260620_083745_0009.webp";
import kalaboomPromo from "../assets/posters/31_20260620_083745_0010.webp";
import kalabitesPromo from "../assets/posters/32_20260620_083745_0011.webp";

const PROMOS = [
  { title: "Krispy Chickalabasa", image: krispyPromo },
  { title: "Pump-let Chicken", image: pumpletPromo },
  { title: "Kala-Boom", image: kalaboomPromo },
  { title: "Squash Burger", image: burgerPromo },
  { title: "Squash Fries", image: friesPromo },
  { title: "Kala-Bites", image: kalabitesPromo },
];

export function MenuPromos() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx: number) => emblaApi && emblaApi.scrollTo(idx), [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev === null || prev === 0 ? PROMOS.length - 1 : prev - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev === null || prev === PROMOS.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx]);

  return (
    <section className="bg-[#faf5ef] pt-12 pb-6 px-4 md:px-8 max-w-6xl mx-auto relative select-none">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-gray-900/10 pb-4">
        <div>
          <h2 className="font-black text-xl md:text-2xl text-gray-900 uppercase tracking-tight">
            🔥 Featured <span className="text-[#ec7719]">Specials & Promos</span>
          </h2>
          <p className="text-gray-400 text-xs font-semibold mt-1">
            Don't miss out on our special menu items. Click any poster for a closer look!
          </p>
        </div>

        {/* Desktop nav controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white text-gray-900 flex items-center justify-center hover:bg-[#ec7719] hover:text-white transition-all shadow-[2px_2px_0px_#111] active:translate-y-[1px] active:shadow-none cursor-pointer"
            aria-label="Previous slide"
          >
            <HiChevronLeft className="text-xl" />
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white text-gray-900 flex items-center justify-center hover:bg-[#ec7719] hover:text-white transition-all shadow-[2px_2px_0px_#111] active:translate-y-[1px] active:shadow-none cursor-pointer"
            aria-label="Next slide"
          >
            <HiChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {PROMOS.map((promo, idx) => (
            <div
              key={idx}
              className="pl-4 flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0"
            >
              <div
                onClick={() => setActiveIdx(idx)}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border-[3px] border-gray-900 bg-gray-900 shadow-[4px_4px_0px_#ec7719] hover:shadow-[6px_6px_0px_#111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                {/* Blur background */}
                <img
                  src={promo.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-xs opacity-35 scale-105"
                  loading="lazy"
                />
                {/* Foreground fitted image */}
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="absolute inset-0 w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                  <span className="bg-white/95 text-gray-900 px-4 py-2 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md border-2 border-gray-900">
                    <HiOutlineZoomIn className="text-base text-[#ec7719]" />
                    Zoom Ad
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile controls & dot indicators */}
      <div className="flex items-center justify-between mt-6">
        {/* Mobile buttons */}
        <div className="flex sm:hidden gap-2">
          <button
            onClick={scrollPrev}
            className="w-9 h-9 rounded-full border-2 border-gray-900 bg-white text-gray-900 flex items-center justify-center active:bg-[#ec7719] active:text-white shadow-[1.5px_1.5px_0px_#111] cursor-pointer"
            aria-label="Previous slide"
          >
            <HiChevronLeft className="text-lg" />
          </button>
          <button
            onClick={scrollNext}
            className="w-9 h-9 rounded-full border-2 border-gray-900 bg-white text-gray-900 flex items-center justify-center active:bg-[#ec7719] active:text-white shadow-[1.5px_1.5px_0px_#111] cursor-pointer"
            aria-label="Next slide"
          >
            <HiChevronRight className="text-lg" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mx-auto sm:mx-0">
          {PROMOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === idx
                  ? "w-8 bg-[#ec7719] border border-gray-900"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between text-white py-2 px-4 select-none">
              <span className="font-black text-xs md:text-sm tracking-wider uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                Promo {activeIdx + 1} of {PROMOS.length}
              </span>
              <button
                onClick={() => setActiveIdx(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                aria-label="Close lightbox"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden select-none px-2 py-4">
              <button
                onClick={() =>
                  setActiveIdx((prev) =>
                    prev === null || prev === 0 ? PROMOS.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 z-10"
                aria-label="Previous promo"
              >
                <HiChevronLeft className="text-3xl" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  src={PROMOS[activeIdx].image}
                  alt={PROMOS[activeIdx].title}
                  className="max-w-full max-h-[75vh] object-contain drop-shadow-[0_15px_50px_rgba(0,0,0,0.8)] rounded-xl pointer-events-none"
                />
              </AnimatePresence>

              <button
                onClick={() =>
                  setActiveIdx((prev) =>
                    prev === null || prev === PROMOS.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 z-10"
                aria-label="Next promo"
              >
                <HiChevronRight className="text-3xl" />
              </button>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center gap-3 pb-4">
              <div className="flex gap-1.5 max-w-[90vw] overflow-x-auto py-1 px-3 bg-white/5 rounded-full border border-white/10">
                {PROMOS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-2 rounded-full transition-all duration-300 shrink-0 cursor-pointer ${
                      activeIdx === idx ? "w-6 bg-[#ec7719]" : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Use Left / Right keys to browse, Escape to close.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
