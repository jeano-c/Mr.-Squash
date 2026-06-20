import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiX, HiOutlineZoomIn } from "react-icons/hi";

// Import sustainability posters
import packagingPromo from "../assets/posters/17_20260620_083743_0000.webp";
import localPromo from "../assets/posters/18_20260620_083744_0001.webp";
import conservationPromo from "../assets/posters/19_20260620_083744_0002.webp";
import recyclingPromo from "../assets/posters/20_20260620_083744_0003.webp";
import farmingPromo from "../assets/posters/21_20260620_083744_0004.webp";
import oilPromo from "../assets/posters/22_20260620_083744_0005.webp";

const COMMITMENTS = [
  {
    title: "Eco-Friendly Packaging",
    desc: "100% recyclable, reusable, and biodegradable materials to protect our planet.",
    image: packagingPromo,
  },
  {
    title: "Locally Sourced Ingredients",
    desc: "Sourced fresh from local Philippine calabasa farmers, supporting our local community.",
    image: localPromo,
  },
  {
    title: "Resource Conservation",
    desc: "Active electricity and water conservation measures in all our kitchens.",
    image: conservationPromo,
  },
  {
    title: "Bottle Recycling Program",
    desc: "Eco-bins for plastic bottles to turn waste into resource-saving initiatives.",
    image: recyclingPromo,
  },
  {
    title: "Seed Collection & Donation",
    desc: "We collect seeds from our fresh squash and donate them to agricultural NGOs.",
    image: farmingPromo,
  },
  {
    title: "Sustainable Oil Disposal",
    desc: "Transforming cooking oil into solid eco-friendly waste using organic hardeners.",
    image: oilPromo,
  },
];

export function GreenCommitments() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (activeIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev === null || prev === 0 ? COMMITMENTS.length - 1 : prev - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev === null || prev === COMMITMENTS.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx]);

  return (
    <section className="px-6 md:px-12 lg:px-24 pb-20 md:pb-32 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#ec7719] text-xs md:text-sm font-black tracking-[0.25em] uppercase mb-2 block animate-pulse">
            Our Green Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 uppercase leading-none">
            Sustainable <span className="text-[#ec7719]">Commitment</span>
          </h2>
          <p className="text-gray-500 font-bold mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            We care deeply about our footprint. Here are the concrete steps we take every day to ensure our delicious comfort food respects the environment and community.
          </p>
        </div>

        {/* Commitment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {COMMITMENTS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setActiveIdx(index)}
              className="group bg-white rounded-[2.5rem] overflow-hidden border-[3px] border-gray-900 shadow-[5px_5px_0px_#ec7719] hover:shadow-[8px_8px_0px_#111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Container with Blur Backdrop */}
              <div className="relative aspect-[4/5] bg-gray-900 overflow-hidden border-b-[3px] border-gray-900 select-none">
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-xs opacity-40 scale-105 group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-contain p-1 group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                  <span className="bg-white/95 text-gray-900 px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border-2 border-gray-900">
                    <HiOutlineZoomIn className="text-base text-[#ec7719]" />
                    Read Poster
                  </span>
                </div>
              </div>

              {/* Info footer */}
              <div className="p-6 md:p-8 flex flex-col gap-2 flex-1 bg-white">
                <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 font-bold text-xs md:text-sm leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            </motion.div>
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
                Commitment {activeIdx + 1} of {COMMITMENTS.length}
              </span>
              <button
                onClick={() => setActiveIdx(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                aria-label="Close details"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden select-none px-2 py-4">
              <button
                onClick={() =>
                  setActiveIdx((prev) =>
                    prev === null || prev === 0 ? COMMITMENTS.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 z-10"
                aria-label="Previous poster"
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
                  src={COMMITMENTS[activeIdx].image}
                  alt={COMMITMENTS[activeIdx].title}
                  className="max-w-full max-h-[75vh] object-contain drop-shadow-[0_15px_50px_rgba(0,0,0,0.8)] rounded-xl pointer-events-none"
                />
              </AnimatePresence>

              <button
                onClick={() =>
                  setActiveIdx((prev) =>
                    prev === null || prev === COMMITMENTS.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 z-10"
                aria-label="Next poster"
              >
                <HiChevronRight className="text-3xl" />
              </button>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center gap-3 pb-4">
              <div className="flex gap-1.5 max-w-[90vw] overflow-x-auto py-1 px-3 bg-white/5 rounded-full border border-white/10">
                {COMMITMENTS.map((_, idx) => (
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
