import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import combo1 from "../assets/combo1.png"; // Swap with other combo images later
const combos = [
  {
    id: 1,
    title: "COMBO",
    subtitle: "1",
    desc: "Kala-Boom with Drink and Burger. Crispy, bold, and unlike anything you've tasted.",
    price: "₱164",
    image: combo1,
    badge: "🔥 Best Seller",
  },
  {
    id: 2,
    title: "COMBO",
    subtitle: "2",
    desc: "Pump-let Chicken with Drink and Kala-Bites. The perfect balance of sweet and savory.",
    price: "₱164",
    image: combo1, // Replace with combo2
    badge: "✨ Fan Favorite",
  },
  {
    id: 3,
    title: "COMBO",
    subtitle: "3",
    desc: "Krispy Chickalabasa with Drink and Fries. Golden fried perfection.",
    price: "₱144",
    image: combo1, // Replace with combo3
    badge: "💯 Great Value",
  },
];

function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % combos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeCombo = combos[currentIndex];

  return (
    <div className="min-h-screen bg-[#faf5ef] selection:bg-white selection:text-[#ec7719] flex flex-col">
      {/* ══════════════════════════════════════════
          MOTION CAROUSEL HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full flex flex-1 items-center overflow-hidden bg-linear-to-br from-[#ec7719] to-[#c65e0a]"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        {/* Subtle Background Pattern/Glow */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-20 lg:py-0">
          
          {/* ── LEFT COLUMN: ANIMATED TEXT ───────────────────────── */}
          <div className="w-full relative z-20 flex flex-col justify-center pt-8 lg:pt-0 h-100">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white w-max
              text-[10px] font-black tracking-[0.2em] px-4 py-1.5 rounded-full uppercase mb-6 shadow-sm backdrop-blur-sm">
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
                {/* Stacked Typography */}
                <h1 className="font-black uppercase tracking-tighter select-none leading-none flex flex-col">
                  <span className="text-white text-[18vw] sm:text-[110px] lg:text-[130px] xl:text-[150px] drop-shadow-lg">
                    {activeCombo.title}
                  </span>
                  <span className="text-orange-200/90 text-[22vw] sm:text-[140px] lg:text-[170px] xl:text-[200px] -mt-4 sm:-mt-8 lg:-mt-12 ml-2">
                    {activeCombo.subtitle}
                  </span>
                </h1>

                <p className="mt-6 text-orange-50 text-base md:text-lg leading-relaxed max-w-md font-medium text-shadow-sm h-15">
                  {activeCombo.desc}
                </p>

                {/* Action Row */}
                <div className="mt-10 flex flex-col xl:flex-row xl:items-center gap-6">
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate("/menu")}
                      className="bg-white text-[#ec7719] font-black text-sm px-8 py-4 rounded-full
                        hover:bg-orange-50 hover:scale-105 active:scale-95
                        transition-all duration-300 shadow-xl tracking-widest uppercase"
                    >
                      Order Now
                    </button>
                    <button
                      onClick={() => navigate("/menu")}
                      className="border-2 border-white/40 text-white font-bold text-sm px-8 py-4 rounded-full
                        hover:bg-white/15 hover:border-white hover:scale-105 active:scale-95
                        transition-all duration-300 tracking-widest uppercase backdrop-blur-sm"
                    >
                      View Menu
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-orange-100">
                    <div className="w-8 h-px bg-orange-200/50 hidden xl:block" />
                    <p className="text-sm font-medium tracking-wide">
                      Only <span className="font-black text-white text-xl ml-1">{activeCombo.price}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT COLUMN: ANIMATED FOOD IMAGE ─────────────────────── */}
          <div className="relative w-full h-100 lg:h-150 flex justify-center lg:justify-end items-center mt-10 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCombo.id}
                initial={{ opacity: 0, x: 100, scale: 0.9, rotate: 5 }}
                animate={{ opacity: 1, x: 0, scale: 1.1, rotate: 0 }}
                exit={{ opacity: 0, x: -100, scale: 0.9, rotate: -5 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                src={activeCombo.image}
                alt={activeCombo.title}
                className="absolute w-[90%] lg:w-[115%] max-w-150 lg:max-w-200 object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 origin-center"
              />
            </AnimatePresence>

            {/* Floating Label (Animate with image) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${activeCombo.id}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
                className="absolute top-[5%] left-[5%] lg:left-[-5%] bg-white rounded-2xl px-5 py-3
                  shadow-2xl -rotate-6 flex items-center gap-2 select-none z-20"
              >
                <p className="text-[#ec7719] font-black text-sm uppercase tracking-widest">
                  {activeCombo.badge}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── CAROUSEL DOT INDICATORS ─────────────────────── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {combos.map((combo, idx) => (
            <button
              key={combo.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;