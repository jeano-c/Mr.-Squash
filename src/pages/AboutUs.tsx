import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { HiOutlineMap, HiOutlineClock, HiOutlinePhone } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTiktok, FaLeaf, FaFire } from "react-icons/fa";

// ── Social Media Data ────────────────────────────────────────────────────────
const SOCIALS = [
  { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/mr.squash_official?igsh=NnNscGpkbGhwZmF3", color: "bg-pink-100 text-pink-600 hover:bg-pink-500 hover:text-white" },
  { name: "Facebook", icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61589105545390", color: "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white" },
  { name: "TikTok", icon: FaTiktok, url: "https://www.tiktok.com/@mr.squash_official?_r=1&_t=ZS-95wEMOngiH7", color: "bg-gray-200 text-black hover:bg-black hover:text-white" }
];

// ── Animation Variants ────────────────────────────────────────────────────────
const bouncyFadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 200, damping: 15, bounce: 0.5 } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
// ─────────────────────────────────────────────────────────────────────────────

function AboutUs() {
  return (
    <div className="min-h-screen bg-[#faf5ef] selection:bg-[#ec7719] selection:text-white font-sans text-gray-900 overflow-hidden">
      
      {/* ══════════════════════════════════════════
          HERO SECTION (Curvy & Energetic)
      ══════════════════════════════════════════ */}
      <section className="bg-[#ec7719] rounded-b-[3rem] md:rounded-b-[5rem] pt-28 md:pt-36 pb-24 md:pb-32 px-6 text-center relative shadow-xl z-20">
        
        {/* Floating Background Icons (Purely Decorative) */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-20 left-10 text-orange-300 text-5xl opacity-50 hidden md:block"><FaLeaf /></motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute bottom-20 right-16 text-orange-300 text-6xl opacity-50 hidden md:block"><FaFire /></motion.div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto relative z-10">
          <motion.div variants={bouncyFadeUp} className="inline-block bg-white text-[#ec7719] font-black text-[10px] md:text-xs uppercase tracking-widest px-5 py-2 rounded-full mb-6 shadow-md rotate-2">
            Fresh out the fryer!
          </motion.div>
          
          <motion.h1 variants={bouncyFadeUp} className="font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-[0.9] mb-6 drop-shadow-md">
            The Crunch <br />
            You Deserve.
          </motion.h1>
          
          <motion.p variants={bouncyFadeUp} className="text-orange-50 text-base md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
            We are redefining comfort food. No shortcuts. Just affordable, delicious meals starring 100% real Philippine Calabasa.
          </motion.p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          THE STORY (Chunky & Playful - Storefront Edition)
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32 relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          
          {/* Fun Image Container -> Now Storefront focused */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={bouncyFadeUp} 
            className="w-full md:w-1/2 relative"
          >
            {/* The tilted background blob */}
            <div className="absolute inset-0 bg-[#fef08a] rounded-[3rem] rotate-6 scale-105 shadow-sm" />
            
            {/* The actual image container */}
            <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-[3rem] border-4 border-gray-900 flex flex-col items-center justify-center p-8 text-center shadow-[8px_8px_0px_#111] overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
               <p className="text-[#111] font-black text-xl md:text-2xl uppercase tracking-widest relative z-10 group-hover:scale-110 transition-transform duration-300">
                 [ Valenzuela Storefront ]
               </p>
               
               {/* Sticker Badge changed to Flagship Store */}
               <div className="absolute -bottom-4 -right-4 bg-red-500 text-white font-black text-xs uppercase px-4 py-4 rounded-full border-4 border-[#111] -rotate-12 shadow-md">
                 Flagship Store
               </div>
            </div>
          </motion.div>

          {/* Text Block */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-none">
              A Healthier <br/> <span className="text-[#ec7719]">Twist.</span>
            </h2>
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-orange-100 flex flex-col gap-4">
              <p className="text-gray-600 font-bold text-base leading-relaxed">
                Mr. Squash is a fast-food restaurant dedicated to serving affordable, nutritious, and high-quality meals. We specialize in unique offerings like chicken coated in calabasa.
              </p>
              <p className="text-gray-600 font-bold text-base leading-relaxed">
                Located near schools and community areas, our store provides a convenient, comfortable, and eco-friendly dining space where families and students can relax safely.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          TILTED MISSION & VISION CARDS
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-24 pb-20 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Mission Card (Tilted Left) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={bouncyFadeUp} 
            className="bg-gray-900 text-white rounded-[3rem] p-10 md:p-14 shadow-xl md:-rotate-3 hover:rotate-0 transition-transform duration-300 border-4 border-gray-900"
          >
             <div className="w-16 h-16 bg-[#ec7719] rounded-full flex items-center justify-center mb-8 border-4 border-gray-900 -mt-16 md:-mt-20">
               <FaFire className="text-2xl text-white" />
             </div>
             <h3 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-4">Our Mission</h3>
             <p className="text-gray-300 font-bold text-base md:text-lg leading-relaxed">
               To provide a healthier twist on comfort food by integrating high-quality, locally sourced calabasa into budget-friendly meals, fostering community well-being.
             </p>
          </motion.div>

          {/* Vision Card (Tilted Right) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={bouncyFadeUp} 
            className="bg-[#fef08a] text-gray-900 rounded-[3rem] p-10 md:p-14 shadow-xl md:rotate-3 hover:rotate-0 transition-transform duration-300 border-4 border-gray-900 mt-8 md:mt-0"
          >
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 border-4 border-gray-900 -mt-16 md:-mt-20">
               <FaLeaf className="text-2xl text-[#111]" />
             </div>
             <h3 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-4">Our Vision</h3>
             <p className="text-gray-700 font-bold text-base md:text-lg leading-relaxed">
               To be the leading innovator in the local fast-food industry, recognized for transforming everyday vegetables into extraordinary culinary experiences.
             </p>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMUNITY & LOCATION (Pill buttons & Soft map)
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Socials Area */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-4xl md:text-6xl font-black tracking-tight text-[#111] leading-none mb-4">
              Join the <span className="text-[#ec7719]">Squad!</span>
            </h3>
            <p className="text-gray-500 font-bold text-base md:text-lg mb-8 max-w-md">
              Follow our journey, get exclusive crunch content, and catch our latest drops.
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={bouncyFadeUp} className="w-full lg:w-1/2 flex flex-col gap-6">
            
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
                Valenzuela Flagship
              </div>
              <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-gray-200">
                <HiOutlineClock className="text-lg" />
                11am - 9pm
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