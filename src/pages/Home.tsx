import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import localFarmersImg from "../assets/posters/18_20260620_083744_0001.webp";
import billboardImg from "../assets/posters/26_20260620_083745_0012.webp";

// Images
import combo1 from "../assets/combo1.png";
import combo2 from "../assets/combo2.png";
import combo3 from "../assets/combo3.png";
import combo4 from "../assets/combo4.png";

// Icons
import {
  HiOutlineLocationMarker,
  HiOutlineFire,
  HiOutlineHeart,
  HiOutlineZoomIn,
  HiX,
} from "react-icons/hi";

// Combo Data
const combos = [
  {
    id: 1,
    title: "COMBO",
    subtitle: "1",
    desc: "Kala-Boom with Drink and Burger.",
    price: "₱164",
    image: combo1,
    badge: "🔥 Best Seller",
  },
  {
    id: 2,
    title: "COMBO",
    subtitle: "2",
    desc: "Pump-let Chicken with Drink and Kala-Bites.",
    price: "₱164",
    image: combo2,
    badge: "✨ Fan Favorite",
  },
  {
    id: 3,
    title: "COMBO",
    subtitle: "3",
    desc: "Krispy Chickalabasa with Drink and Fries.",
    price: "₱144",
    image: combo3,
    badge: "💯 Great Value",
  },
  {
    id: 4,
    title: "COMBO",
    subtitle: "4",
    desc: "Drink, Burger, Kala-Bites, and Fries.",
    price: "₱184",
    image: combo4,
    badge: "👑 The Feast",
  },
];

function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activePoster, setActivePoster] = useState<string | null>(null);

  // Auto-play carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % combos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard listener for lightbox escape
  useEffect(() => {
    if (activePoster === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePoster(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePoster]);

  const activeCombo = combos[currentIndex];

  return (
    <div className="min-h-screen bg-[#faf5ef] selection:bg-white selection:text-[#ec7719] flex flex-col overflow-x-hidden">
      
      {/* ══════════════════════════════════════════
          MOBILE HERO VIEW (No-Scroll Viewport Height)
      ══════════════════════════════════════════ */}
      <section
        className="flex md:hidden relative w-full h-[calc(100dvh-56px)] overflow-hidden bg-linear-to-br from-[#ec7719] to-[#c65e0a] flex-col justify-between px-5 py-6 text-center shrink-0"
      >
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/10 rounded-full blur-[100px] pointer-events-none" />

        {/* 1. Header Information */}
        <div className="relative z-10 flex flex-col items-center pt-1">
          <div
            className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 text-white
            text-[9px] font-black tracking-wider px-3.5 py-1.5 rounded-full uppercase mb-4 shadow-sm backdrop-blur-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Now Serving · Valenzuela City
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCombo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <h1 className="font-black uppercase tracking-tight leading-none text-white text-5xl drop-shadow-md">
                {activeCombo.title}{" "}
                <span className="text-yellow-200">{activeCombo.subtitle}</span>
              </h1>
              <p className="mt-2 text-orange-50 text-xs font-semibold leading-relaxed max-w-70">
                {activeCombo.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. Middle Food Image Section */}
        <div className="relative z-10 flex-1 flex items-center justify-center py-2 select-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeCombo.id}
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1.05, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.25 }}
              src={activeCombo.image}
              alt={activeCombo.title}
              className="w-auto h-[24vh] max-h-46.25 min-h-30 object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
            />
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-mobile-${activeCombo.id}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-[12%] right-[8%] bg-white rounded-xl px-2.5 py-1.5 shadow-lg border border-orange-100 rotate-6"
            >
              <p className="text-[#ec7719] font-black text-[9px] uppercase tracking-wider">
                {activeCombo.badge}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. Action and Price Footer */}
        <div className="relative z-10 flex flex-col items-center pb-1">
          <div className="text-orange-50 font-black text-xs tracking-wide mb-3">
            Only <span className="text-white text-sm bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg ml-1 font-black">
              {activeCombo.price}
            </span>
          </div>

          <div className="flex flex-row gap-3 w-full max-w-70">
            <button
              onClick={() => navigate("/menu")}
              className="flex-1 bg-white text-[#ec7719] font-black text-xs py-3.5 rounded-full hover:bg-orange-50 active:scale-95 transition-all shadow-md uppercase tracking-wider cursor-pointer"
            >
              Order Now
            </button>
            <button
              onClick={() => navigate("/menu")}
              className="flex-1 border border-white/40 text-white font-bold text-xs py-3.5 rounded-full hover:bg-white/10 active:scale-95 transition-all uppercase tracking-wider backdrop-blur-xs cursor-pointer"
            >
              View Menu
            </button>
          </div>

          {/* Indicators */}
          <div className="flex gap-2.5 mt-5">
            {combos.map((combo, idx) => (
              <button
                key={combo.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DESKTOP HERO VIEW (Original 2-Column Grid Layout)
      ══════════════════════════════════════════ */}
      <section
        className="hidden md:flex relative w-full flex-col flex-1 items-center justify-center overflow-hidden bg-linear-to-br from-[#ec7719] to-[#c65e0a]"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10 py-12 lg:py-0">
          
          {/* LEFT COLUMN: Animated Text */}
          <div className="w-full relative z-20 flex flex-col justify-center pt-4 lg:pt-0">
            <div
              className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white w-max
              text-[10px] md:text-xs font-black tracking-[0.2em] px-4 py-1.5 rounded-full uppercase mb-4 md:mb-6 shadow-sm backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Now Serving · Valenzuela City
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCombo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col"
              >
                <h1 className="font-black uppercase tracking-tighter select-none leading-none flex flex-col">
                  <span className="text-white text-[16vw] sm:text-[110px] lg:text-[130px] xl:text-[150px] drop-shadow-lg">
                    {activeCombo.title}
                  </span>
                  <span className="text-orange-200/90 text-[18vw] sm:text-[140px] lg:text-[170px] xl:text-[200px] -mt-2 sm:-mt-8 lg:-mt-12 ml-1 sm:ml-2">
                    {activeCombo.subtitle}
                  </span>
                </h1>

                <p className="mt-4 sm:mt-6 text-orange-50 text-base md:text-lg leading-relaxed max-w-md font-medium min-h-15">
                  {activeCombo.desc}
                </p>

                <div className="mt-8 flex flex-col xl:flex-row xl:items-center gap-6 pb-4">
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate("/menu")}
                      className="bg-white text-[#ec7719] font-black text-sm px-8 py-4 rounded-full
                        hover:bg-orange-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl tracking-widest uppercase w-full sm:w-auto cursor-pointer"
                    >
                      Order Now
                    </button>
                    <button
                      onClick={() => navigate("/menu")}
                      className="border-2 border-white/40 text-white font-bold text-sm px-8 py-4 rounded-full
                        hover:bg-white/15 hover:border-white hover:scale-105 active:scale-95 transition-all duration-300 tracking-widest uppercase backdrop-blur-sm w-full sm:w-auto text-center cursor-pointer"
                    >
                      View Menu
                    </button>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-3 text-orange-100">
                    <div className="w-8 h-px bg-orange-200/50 hidden xl:block" />
                    <p className="text-sm font-medium tracking-wide">
                      Only{" "}
                      <span className="font-black text-white text-xl ml-1">
                        {activeCombo.price}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Food Image */}
          <div className="relative w-full h-80 sm:h-100 lg:h-150 flex justify-center lg:justify-end items-center mt-2 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCombo.id}
                initial={{ opacity: 0, x: 100, scale: 0.9, rotate: 5 }}
                animate={{ opacity: 1, x: 0, scale: 1.1, rotate: 0 }}
                exit={{ opacity: 0, x: -100, scale: 0.9, rotate: -5 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                src={activeCombo.image}
                alt={activeCombo.title}
                className="absolute w-[85%] sm:w-[70%] lg:w-[115%] max-w-[320px] sm:max-w-112.5 lg:max-w-none object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10"
              />
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${activeCombo.id}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
                className="absolute top-[5%] lg:top-[15%] left-[5%] lg:left-[-5%] bg-white rounded-2xl px-4 py-2 lg:px-5 lg:py-3
                  shadow-2xl -rotate-6 flex items-center gap-2 select-none z-20"
              >
                <p className="text-[#ec7719] font-black text-xs lg:text-sm uppercase tracking-widest">
                  {activeCombo.badge}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {combos.map((combo, idx) => (
            <button
              key={combo.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-10 bg-white"
                  : "w-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
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
