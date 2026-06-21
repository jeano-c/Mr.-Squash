import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { HiOutlineMap, HiOutlineClock, HiOutlinePhone } from "react-icons/hi";
import { GreenCommitments } from "../components/GreenCommitments";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaLeaf,
  FaFire,
} from "react-icons/fa";
import storeInside from "../assets/store/Screenshot 2026-06-04 144603.png";
import storeCounter from "../assets/store/Screenshot 2026-06-04 144731.png";
import storeVibe from "../assets/store/Screenshot 2026-06-04 144747.png";

// ── Social Media Data ────────────────────────────────────────────────────────
const SOCIALS = [
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/mr.squash_official?igsh=NnNscGpkbGhwZmF3",
    color: "bg-pink-100 text-pink-600 hover:bg-pink-500 hover:text-white",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/profile.php?id=61589105545390",
    color: "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    url: "https://www.tiktok.com/@mr.squash_official?_r=1&_t=ZS-95wEMOngiH7",
    color: "bg-gray-200 text-black hover:bg-black hover:text-white",
  },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const bouncyFadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 15, bounce: 0.5 },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
// ─────────────────────────────────────────────────────────────────────────────

function AboutUs() {
  const [deck, setDeck] = useState([0, 1, 2]);
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");

  const cardsData = [
    {
      id: 0,
      img: storeInside,
      label: "Our Cozy Interior",
      color: "bg-[#fef08a]",
      rotate: -3,
    },
    {
      id: 1,
      img: storeCounter,
      label: "Fresh Out The Fryer!",
      color: "bg-[#ffedd5]",
      rotate: 2,
    },
    {
      id: 2,
      img: storeVibe,
      label: "Good Place • Good Vibes",
      color: "bg-white",
      rotate: -1,
    },
  ];

  const handleCardClick = () => {
    setDeck((prev) => [...prev.slice(1), prev[0]]);
  };

  return (
    <div className="min-h-screen bg-[#faf5ef] selection:bg-[#ec7719] selection:text-white font-sans text-gray-900 overflow-hidden">
      {/* ══════════════════════════════════════════
         HERO SECTION (Curvy & Energetic - Sized Down)
      ══════════════════════════════════════════ */}
      <section className="bg-[#ec7719] rounded-b-[2.5rem] md:rounded-b-[3.5rem] pt-20 pb-16 md:pt-24 md:pb-18 px-6 text-center relative shadow-xl z-20">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-12 left-10 text-orange-300 text-4xl opacity-30 hidden md:block"
        >
          <FaLeaf />
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute bottom-12 right-16 text-orange-300 text-5xl opacity-30 hidden md:block"
        >
          <FaFire />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto relative z-10"
        >
          <motion.div
            variants={bouncyFadeUp}
            className="inline-block bg-white text-[#ec7719] font-black text-[9px] md:text-2xs uppercase tracking-widest px-4.5 py-1.5 rounded-full mb-4 shadow-md rotate-2 border-2 border-gray-900"
          >
            Fresh out the fryer!
          </motion.div>

          <motion.h1
            variants={bouncyFadeUp}
            className="font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-tight mb-4 drop-shadow-md"
          >
            The Crunch You Deserve
          </motion.h1>

          <motion.p
            variants={bouncyFadeUp}
            className="text-orange-100 text-xs md:text-sm font-semibold max-w-xl mx-auto leading-relaxed"
          >
            We are redefining comfort food. No shortcuts. Just affordable,
            delicious meals starring 100% real Philippine Calabasa.
          </motion.p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
         THE STORY (Chunky & Playful - Storefront Edition)
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32 relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* ── UPDATED IMAGE CONTAINER TO MATCH REFERENCE ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={bouncyFadeUp}
            className="w-full md:w-1/2 flex items-center justify-center relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
          >
            {/* Interactive Card Deck Container */}
            <div
              className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] h-[280px] sm:h-[320px] md:h-[360px] cursor-pointer"
              onClick={handleCardClick}
            >
              {cardsData.map((card) => {
                const index = deck.indexOf(card.id);
                const isTop = index === 0;

                return (
                  <motion.div
                    key={card.id}
                    style={{ zIndex: 30 - index }}
                    animate={{
                      x: index * 10,
                      y: index * 10,
                      scale: 1 - index * 0.04,
                      rotate: isTop ? card.rotate : card.rotate + index * 2,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`absolute inset-0 p-3 pb-8 sm:p-4 sm:pb-10 rounded-[2rem] border-[4px] border-[#111] shadow-[4px_4px_0px_#111] ${card.color} flex flex-col justify-between select-none`}
                  >
                    {/* Polaroid-style photo frame */}
                    <div className="w-full h-[80%] rounded-xl border-2 border-gray-900 overflow-hidden bg-gray-100">
                      <img
                        src={card.img}
                        alt={card.label}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                    {/* Handwritten style / bold caption */}
                    <div className="mt-2 text-center font-black uppercase text-xs sm:text-sm tracking-wider text-gray-900">
                      {card.label}
                    </div>

                    {isTop && (
                      <div className="absolute -top-3 -right-3 bg-[#ec7719] text-white text-[9px] sm:text-xs font-black uppercase tracking-widest px-3.5 py-2 rounded-full border-2 border-gray-900 rotate-6 shadow-md animate-pulse">
                        Tap to Shuffle ➔
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Text Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="w-full md:w-1/2 flex flex-col gap-6"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-none">
              Our Cozy <br /> <span className="text-[#ec7719]">Space.</span>
            </h2>
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-orange-100 flex flex-col gap-4">
              <p className="text-gray-600 font-bold text-base leading-relaxed">
                We designed Mr. Squash to be more than just a quick bite. It is a warm, welcoming community space where students, families, and friends can relax and hang out.
              </p>
              <p className="text-gray-600 font-bold text-base leading-relaxed">
                With cozy seating, friendly service, and a clean, eco-friendly atmosphere, our store is built to make you feel right at home.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
         MISSION & VISION TABBED DASHBOARD (Accommodating text)
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-24 pb-20 md:pb-32">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* Tab Switchers */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab("mission")}
              className={`px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest border-4 border-gray-900 transition-all duration-200 cursor-pointer ${
                activeTab === "mission"
                  ? "bg-[#ec7719] text-white shadow-[2px_2px_0px_#111] translate-y-[2px]"
                  : "bg-white text-gray-900 shadow-[6px_6px_0px_#111] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#111]"
              }`}
            >
              🎯 Our Mission
            </button>
            <button
              onClick={() => setActiveTab("vision")}
              className={`px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest border-4 border-gray-900 transition-all duration-200 cursor-pointer ${
                activeTab === "vision"
                  ? "bg-[#fef08a] text-gray-900 shadow-[2px_2px_0px_#111] translate-y-[2px]"
                  : "bg-white text-gray-900 shadow-[6px_6px_0px_#111] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#111]"
              }`}
            >
              🌿 Our Vision
            </button>
          </div>

          {/* Unified Container Card with Layout Animation */}
          <motion.div
            layout
            className="relative bg-white rounded-[2rem] md:rounded-[3rem] border-[4px] md:border-[6px] border-[#111] shadow-[8px_8px_0px_#111] p-6 sm:p-8 md:p-12 overflow-hidden min-h-[400px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {activeTab === "mission" ? (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-start text-left relative"
                >
                  <span className="bg-orange-100 text-[#ec7719] px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-200 mb-4">
                    Purpose & Service
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 mb-6">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 font-bold text-base sm:text-lg md:text-xl leading-relaxed">
                    Mr. Squash is dedicated to providing high-quality, delicious, and
                    healthier food options as an alternative to conventional fast-food
                    offerings. We aim to promote healthier eating habits while
                    delivering exceptional service and value to our customers in
                    Valenzuela City. Our commitment extends to implementing
                    sustainable practices that reduce environmental impact, ensuring
                    operations are both responsible and profitable. We strive to
                    exceed customer expectations through quality products, attentive
                    service, and a focus on balancing people, profit, and planet.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-start text-left relative"
                >
                  <span className="bg-green-100 text-green-600 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200 mb-4">
                    Future & Pillars
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 mb-6">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 font-bold text-base sm:text-lg md:text-xl leading-relaxed">
                    Mr. Squash aims to be positioned in the minds of customers in
                    Valenzuela City as a business that balances operations across
                    three pillars: profit, people, and planet.
                    <br />
                    <br />
                    For People – Mr. Squash aspires to introduce healthier food options
                    to the market, guiding customers toward healthier eating habits.
                    To ensure a positive dining experience, the business will
                    consistently provide high-quality service and complimentary
                    amenities for complete customer satisfaction. Business standards
                    will be strictly implemented to maintain consistency and quality
                    across all operations.
                    <br />
                    <br />
                    For Profit – Mr. Squash will offer its products at reasonable
                    prices, ensuring sustainable profitability while maintaining
                    excellent value for customers. This balance of affordability and
                    quality supports long-term growth and stability.
                    <br />
                    <br />
                    For Planet – The business will strictly adhere to sustainable
                    practices throughout its entire operations to minimize
                    environmental impact and contribute to a greener community. We
                    seek to be a role model for new entrants in the market,
                    demonstrating how to balance purpose and growth while delivering
                    high-quality products and services.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Our Green Commitment Posters */}
      <GreenCommitments />

      {/* ══════════════════════════════════════════
         COMMUNITY & LOCATION (Pill buttons & Soft map)
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Socials Area */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h3 className="text-4xl md:text-6xl font-black tracking-tight text-[#111] leading-none mb-4">
              Join the <span className="text-[#ec7719]">Squad!</span>
            </h3>
            <p className="text-gray-500 font-bold text-base md:text-lg mb-8 max-w-md">
              Follow our journey, get exclusive crunch content, and catch our
              latest drops.
            </p>

            {/* Pill Shaped Social Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {SOCIALS.map((social) => (
                <motion.a
                  key={social.name}
                  variants={bouncyFadeUp}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 rounded-full px-6 py-4 font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 ${social.color}`}
                >
                  <social.icon className="text-xl" />
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Location Area */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={bouncyFadeUp}
            className="w-full lg:w-1/2 flex flex-col gap-6"
          >
            {/* Bouncy Map Container */}
            <div className="w-full h-56 sm:h-64 rounded-[2rem] overflow-hidden bg-gray-200 border-4 border-gray-900 shadow-[8px_8px_0px_#ec7719] relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241.20314067419363!2d120.98045693767165!3d14.698435163606128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b3f9674e1547%3A0xa7bf49cd0bfd7b4a!2s72%20G.%20Marcelo%2C%20Valenzuela%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1777899742720!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            {/* Quick Details Chips */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-orange-50 text-[#ec7719] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-orange-100">
                <HiOutlineMap className="text-lg" />
                Valenzuela 
              </div>
              <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-gray-200">
                <HiOutlineClock className="text-lg" />
                10:00am - 10:00pm
              </div>
              <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-gray-200">
                <HiOutlinePhone className="text-lg" />
                0982 379 0274
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
