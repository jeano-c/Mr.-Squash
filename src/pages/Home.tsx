import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import localFarmersImg from "../assets/posters/18_20260620_083744_0001.webp";
import billboardImg from "../assets/posters/26_20260620_083745_0012.webp";

// Import food promo posters
import burgerPromo from "../assets/posters/27_20260620_083744_0006.webp";
import friesPromo from "../assets/posters/28_20260620_083744_0007.webp";
import pumpletPromo from "../assets/posters/29_20260620_083744_0008.webp";
import krispyPromo from "../assets/posters/30_20260620_083745_0009.webp";
import kalaboomPromo from "../assets/posters/31_20260620_083745_0010.webp";
import kalabitesPromo from "../assets/posters/32_20260620_083745_0011.webp";

// Icons
import {
  HiOutlineLocationMarker,
  HiOutlineFire,
  HiOutlineHeart,
  HiOutlineZoomIn,
  HiX,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const PROMOS = [
  { title: "Krispy Chickalabasa", image: krispyPromo },
  { title: "Pump-let Chicken", image: pumpletPromo },
  { title: "Kala-Boom", image: kalaboomPromo },
  { title: "Squash Burger", image: burgerPromo },
  { title: "Squash Fries", image: friesPromo },
  { title: "Kala-Bites", image: kalabitesPromo },
];

function Home() {
  const navigate = useNavigate();
  const [activePoster, setActivePoster] = useState<string | null>(null);

  const [promoEmblaRef, promoEmblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrevPromo = useCallback(() => promoEmblaApi && promoEmblaApi.scrollPrev(), [promoEmblaApi]);
  const scrollNextPromo = useCallback(() => promoEmblaApi && promoEmblaApi.scrollNext(), [promoEmblaApi]);

  // Keyboard listener for lightbox escape
  useEffect(() => {
    if (activePoster === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePoster(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePoster]);

  return (
    <div className="min-h-screen bg-[#faf5ef] selection:bg-white selection:text-[#ec7719] flex flex-col overflow-x-hidden">
      
      {/* ══════════════════════════════════════════
          HERO PROMOTIONS SECTION
      ══════════════════════════════════════════ */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-[#ec7719] to-[#c65e0a] py-16 md:py-24 px-6 select-none shrink-0 border-b-2 border-gray-900/10">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto relative z-10">
          
          {/* Header Row */}
          <div className="text-center mb-10 md:mb-12 flex flex-col items-center">
            {/* Now Serving Badge */}
            <div
              className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white w-max
              text-[10px] md:text-xs font-black tracking-[0.25em] px-4.5 py-1.5 rounded-full uppercase mb-5 shadow-sm backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Now Serving · Valenzuela City
            </div>

            <h1 className="font-black text-4xl md:text-6xl text-white tracking-tighter uppercase leading-none drop-shadow-md">
              Latest <span className="text-yellow-200">Sales</span>
            </h1>
            <p className="text-orange-50 font-bold mt-4 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Crunchy, squashy goodness at unbeatable prices. Click any poster to zoom in!
            </p>
          </div>

          {/* Embla Carousel Track */}
          <div className="overflow-hidden px-2 sm:px-4" ref={promoEmblaRef}>
            <div className="flex -ml-4">
              {PROMOS.map((promo, idx) => (
                <div
                  key={idx}
                  className="pl-4 flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0"
                >
                  <div
                    onClick={() => setActivePoster(promo.image)}
                    className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border-[3px] border-gray-900 bg-gray-900 shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
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

          {/* Centered Controls underneath the scrolling row */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={scrollPrevPromo}
              className="w-12 h-12 rounded-full border-2 border-white/60 bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#ec7719] hover:border-white transition-all shadow-[3px_3px_0px_rgba(255,255,255,0.2)] active:translate-y-[1px] active:shadow-none cursor-pointer backdrop-blur-sm"
              aria-label="Previous promotion"
            >
              <HiChevronLeft className="text-2xl" />
            </button>
            <button
              onClick={scrollNextPromo}
              className="w-12 h-12 rounded-full border-2 border-white/60 bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#ec7719] hover:border-white transition-all shadow-[3px_3px_0px_rgba(255,255,255,0.2)] active:translate-y-[1px] active:shadow-none cursor-pointer backdrop-blur-sm"
              aria-label="Next promotion"
            >
              <HiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          VALUES BENTO BOX (Light Mode)
      ══════════════════════════════════════════ */}
      <section className="bg-[#faf5ef] py-20 md:py-32 px-6 relative z-20 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-125 bg-white blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center md:text-left mb-12 md:mb-16">
            <h2 className="font-black text-4xl md:text-6xl text-gray-900 tracking-tighter uppercase">
              More Than Just <br className="hidden md:block" />
              <span className="text-[#ec7719]">Fast Food</span>
            </h2>
            <p className="text-gray-500 font-medium mt-4 md:mt-6 max-w-lg md:mx-0 mx-auto text-sm md:text-base">
              We are redefining what it means to eat quick, delicious, and
              responsibly. No compromises.
            </p>
          </div>

          {/* ── THE BENTO GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto md:auto-rows-[300px] gap-5 md:gap-6">
            
            {/* BOX 1: Wide Feature (Top Left) */}
            <div
              className="md:col-span-2 bg-white rounded-4xl p-6 md:p-8 
              border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col sm:flex-row justify-between gap-6 relative overflow-hidden min-h-62.5 md:min-h-0"
            >
              <div className="flex-1 flex flex-col justify-center z-10">
                <HiOutlineLocationMarker className="text-[#ec7719] text-5xl md:text-6xl mb-4 opacity-90 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500" />
                <h3 className="text-gray-900 font-black text-2xl md:text-3xl uppercase tracking-tight mb-2">
                  100% Local Squash
                </h3>
                <p className="text-gray-500 font-bold text-xs md:text-sm max-w-sm leading-relaxed">
                  Real Philippine Calabasa. No shortcuts and absolutely no
                  artificial fillers. Just locally grown squash turned into your
                  new fast-food addiction.
                </p>
              </div>
              
              <div 
                onClick={() => setActivePoster(localFarmersImg)}
                className="w-full sm:w-auto h-48 sm:h-full aspect-[4/5] mx-auto sm:mx-0 shrink-0 relative overflow-hidden rounded-3xl border-2 border-orange-100/50 bg-gray-50 group/poster cursor-zoom-in shadow-xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={localFarmersImg}
                  alt="Mr. Squash local farmers"
                  className="w-full h-full object-cover group-hover/poster:scale-[1.03] transition-transform duration-500 pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                  <HiOutlineZoomIn className="text-white text-2xl transform scale-95 group-hover/poster:scale-100 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* BOX 2: Square Feature (Top Right) */}
            <div
              className="md:col-span-1 bg-white rounded-4xl p-8 
              border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-center items-center text-center relative min-h-62.5 md:min-h-0"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-5 group-hover:bg-[#ec7719] transition-colors duration-300">
                <HiOutlineFire className="text-[#ec7719] text-3xl group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-gray-900 font-black text-2xl uppercase tracking-tight mb-3">
                Cooked to Order
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                No heat lamps. No soggy fries. Every Kala-Boom bite is fried the
                second you hit order.
              </p>
            </div>

            {/* BOX 3: Square Feature (Bottom Left) */}
            <div
              className="md:col-span-1 bg-white rounded-4xl p-8 
              border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-center items-center text-center relative min-h-62.5 md:min-h-0"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-5 group-hover:bg-[#ec7719] transition-colors duration-300">
                <HiOutlineHeart className="text-[#ec7719] text-3xl group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-gray-900 font-black text-2xl uppercase tracking-tight mb-3">
                Filipino Proud
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                We took a classic household vegetable and flipped the fast-food
                script entirely.
              </p>
            </div>

            {/* BOX 4: CTA Wide Block (Bottom Right) */}
            <div
              className="md:col-span-2 bg-[#ec7719] rounded-4xl p-6 md:p-8 flex flex-col sm:flex-row items-stretch justify-between gap-6 
              hover:shadow-[0_10px_40px_rgba(236,119,25,0.4)] hover:-translate-y-1 transition-all duration-300 min-h-62.5 md:min-h-0 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <h3 className="text-white font-black text-3xl md:text-4xl uppercase tracking-tighter leading-none mb-3 drop-shadow-md">
                  Ready to <br /> Experience It?
                </h3>
                <p className="text-orange-50 font-bold text-xs md:text-sm max-w-sm mb-5 leading-relaxed">
                  Stop reading and start eating. Grab your combo meal online
                  right now.
                </p>
                <button
                  onClick={() => navigate("/menu")}
                  className="w-max bg-white text-[#ec7719] font-black text-xs md:text-sm px-6 py-3 rounded-full 
                    hover:bg-orange-50 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shadow-lg cursor-pointer"
                >
                  View Menu
                </button>
              </div>
              
              <div 
                onClick={() => setActivePoster(billboardImg)}
                className="w-full sm:w-auto h-48 sm:h-full aspect-[1.29] mx-auto sm:mx-0 shrink-0 relative overflow-hidden rounded-3xl border border-white/20 bg-orange-950/10 group/poster cursor-zoom-in shadow-xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={billboardImg}
                  alt="Mr. Squash Signature Dishes"
                  className="w-full h-full object-cover group-hover/poster:scale-[1.03] transition-transform duration-500 pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                  <HiOutlineZoomIn className="text-white text-2xl transform scale-95 group-hover/poster:scale-100 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Bento Box Posters */}
      <AnimatePresence>
        {activePoster !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-end text-white py-2 px-4 select-none">
              <button
                onClick={() => setActivePoster(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                aria-label="Close details"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden select-none px-2 py-4">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={activePoster}
                alt="Expanded Campaign Poster"
                className="max-w-full max-h-[80vh] object-contain drop-shadow-[0_15px_50px_rgba(0,0,0,0.8)] rounded-xl pointer-events-none"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col items-center gap-2 pb-4 text-gray-400">
              <p className="text-[10px] font-bold uppercase tracking-wider">Press Escape to close.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
