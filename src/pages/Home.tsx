import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

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

  // Auto-play carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % combos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeCombo = combos[currentIndex];

  return (
    <div className="min-h-screen bg-[#faf5ef] selection:bg-white selection:text-[#ec7719] flex flex-col overflow-x-hidden">
      {/* ══════════════════════════════════════════
          MOTION CAROUSEL HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full flex flex-col flex-1 items-center justify-center overflow-hidden bg-linear-to-br from-[#ec7719] to-[#c65e0a]"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 2px, transparent 2px)",
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
                
                <p className="mt-4 sm:mt-6 text-orange-50 text-base md:text-lg leading-relaxed max-w-md font-medium min-h-[60px]">
                  {activeCombo.desc}
                </p>
                
                <div className="mt-8 flex flex-col xl:flex-row xl:items-center gap-6 pb-4">
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate("/menu")}
                      className="bg-white text-[#ec7719] font-black text-sm px-8 py-4 rounded-full
                        hover:bg-orange-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl tracking-widest uppercase w-full sm:w-auto"
                    >
                      Order Now
                    </button>
                    <button
                      onClick={() => navigate("/menu")}
                      className="border-2 border-white/40 text-white font-bold text-sm px-8 py-4 rounded-full
                        hover:bg-white/15 hover:border-white hover:scale-105 active:scale-95 transition-all duration-300 tracking-widest uppercase backdrop-blur-sm w-full sm:w-auto text-center"
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

          {/* RIGHT COLUMN: Animated Food Image */}
          {/* Using a fixed responsive height container so absolute images don't collapse on mobile */}
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[600px] flex justify-center lg:justify-end items-center mt-2 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCombo.id}
                initial={{ opacity: 0, x: 100, scale: 0.9, rotate: 5 }}
                animate={{ opacity: 1, x: 0, scale: 1.1, rotate: 0 }}
                exit={{ opacity: 0, x: -100, scale: 0.9, rotate: -5 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                src={activeCombo.image}
                alt={activeCombo.title}
                className="absolute w-[85%] sm:w-[70%] lg:w-[115%] max-w-[320px] sm:max-w-[450px] lg:max-w-none object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10"
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

        {/* Carousel Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {combos.map((combo, idx) => (
            <button
              key={combo.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-white blur-[100px] pointer-events-none rounded-full" />
        
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
              className="md:col-span-2 bg-white rounded-[2rem] p-8 md:p-10 
              border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-end relative overflow-hidden min-h-[250px] md:min-h-0"
            >
              <HiOutlineLocationMarker className="text-[#ec7719] text-5xl md:text-6xl mb-6 opacity-90 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500" />
              <h3 className="text-gray-900 font-black text-3xl md:text-4xl uppercase tracking-tight mb-3 z-10">
                100% Local Squash
              </h3>
              <p className="text-gray-500 font-medium text-sm md:text-base max-w-md z-10 leading-relaxed">
                Real Philippine Calabasa. No shortcuts and absolutely no
                artificial fillers. Just locally grown squash turned into your
                new fast-food addiction.
              </p>
              {/* Abstract decorative shape in the corner */}
              <div className="absolute -right-10 -bottom-10 w-64 h-64 border-[40px] border-orange-50 rounded-full group-hover:border-[#ec7719]/10 transition-colors duration-500" />
            </div>

            {/* BOX 2: Square Feature (Top Right) */}
            <div
              className="md:col-span-1 bg-white rounded-[2rem] p-8 
              border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-center items-center text-center relative min-h-[250px] md:min-h-0"
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
              className="md:col-span-1 bg-white rounded-[2rem] p-8 
              border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-center items-center text-center relative min-h-[250px] md:min-h-0"
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
              className="md:col-span-2 bg-[#ec7719] rounded-[2rem] p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 
              hover:shadow-[0_10px_40px_rgba(236,119,25,0.4)] hover:-translate-y-1 transition-all duration-300 min-h-[250px] md:min-h-0 relative overflow-hidden"
            >
              {/* Texture overlay for the orange box */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 2px, transparent 2px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10 flex-1">
                <h3 className="text-white font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-4 drop-shadow-md">
                  Ready to <br /> Experience It?
                </h3>
                <p className="text-orange-50 font-medium text-sm md:text-base max-w-sm">
                  Stop reading and start eating. Grab your combo meal online
                  right now.
                </p>
              </div>
              <button
                onClick={() => navigate("/menu")}
                className="relative z-10 w-full sm:w-auto bg-white text-[#ec7719] font-black text-sm md:text-base px-8 py-4 rounded-full 
                  hover:bg-orange-50 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shrink-0 shadow-xl"
              >
                View Menu
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
