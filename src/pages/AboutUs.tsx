import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";

// ── Social Media Data ────────────────────────────────────────────────────────
const SOCIALS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/mr.squash_official?igsh=NnNscGpkbGhwZmF3"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61589105545390"
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@mr.squash_official?_r=1&_t=ZS-95wEMOngiH7"
  }
];

// ── Animation Variants ────────────────────────────────────────────────────────
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};
// ─────────────────────────────────────────────────────────────────────────────

function AboutUs() {
  return (
    <div className="min-h-screen bg-[#faf5ef] selection:bg-[#ec7719] selection:text-white pb-16 md:pb-24 flex flex-col font-sans text-gray-900 overflow-hidden">
      
      {/* ══════════════════════════════════════════
          EDITORIAL HERO
      ══════════════════════════════════════════ */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-6 md:px-12 lg:px-24">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.p variants={fadeUpVariants} className="text-[#ec7719] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-6 md:mb-8">
            Chapter 01 — Our Genesis
          </motion.p>
          <motion.h1 variants={fadeUpVariants} className="font-black text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] tracking-tighter uppercase leading-[0.85] md:leading-[0.85] mb-8 md:mb-12 break-words">
            The Calabasa <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec7719] to-[#ffaa55]">
              Revolution.
            </span>
          </motion.h1>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          60/40 SPLIT STORY
      ══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-24 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-32 items-start">
          
          {/* 60% Text Column */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="w-full md:w-[60%] flex flex-col gap-6 md:gap-8 text-base md:text-xl text-gray-600 font-medium leading-relaxed"
          >
            <motion.p variants={fadeUpVariants} className="text-xl md:text-3xl font-bold text-gray-900 leading-snug">
              Mr. Squash is a fast-food restaurant dedicated to serving affordable, nutritious, and high-quality meals. 
            </motion.p>
            <motion.p variants={fadeUpVariants}>
              We specialize in unique offerings like chicken coated in calabasa, giving our customers a healthier twist on their favorite comfort food without sacrificing the crunch they crave.
            </motion.p>
            <motion.p variants={fadeUpVariants}>
              We source fresh, locally grown ingredients while maintaining strict quality standards. Our menu is designed to be budget-friendly, making our products accessible while building long-term customer relationships.
            </motion.p>
          </motion.div>

          {/* 40% Visual Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full md:w-[40%] relative aspect-square md:aspect-[3/4] bg-gray-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ec7719]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mix-blend-overlay">
                Crafting the Perfect Crunch
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          MINIMALIST MISSION & VISION
      ══════════════════════════════════════════ */}
      <section className="bg-gray-900 text-white py-20 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-32">
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="relative"
          >
            <div className="w-12 h-px bg-[#ec7719] mb-6 md:mb-8" />
            <h3 className="font-black text-2xl md:text-3xl tracking-tight uppercase mb-4 md:mb-6">Our Mission</h3>
            <p className="text-gray-400 text-base md:text-xl leading-relaxed font-medium">
              To provide a healthier twist on comfort food by integrating high-quality, locally sourced calabasa into budget-friendly meals, fostering community well-being.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="relative md:border-l border-gray-800 md:pl-16 lg:pl-32"
          >
            <div className="hidden md:block w-12 h-px bg-[#ec7719] mb-8" />
            {/* Mobile-only divider line */}
            <div className="md:hidden w-12 h-px bg-[#ec7719] mb-6 mt-4" />
            <h3 className="font-black text-2xl md:text-3xl tracking-tight uppercase mb-4 md:mb-6">Our Vision</h3>
            <p className="text-gray-400 text-base md:text-xl leading-relaxed font-medium">
              To be the leading innovator in the local fast-food industry, recognized for transforming everyday vegetables into extraordinary culinary experiences.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          EDITORIAL SOCIALS & CONTACT
      ══════════════════════════════════════════ */}
      <section className="pt-20 md:pt-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 border-b border-gray-200 pb-16 md:pb-32">
          
          {/* Giant Social Links (Data-Driven) */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col gap-4 md:gap-6"
          >
            <p className="text-[#ec7719] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-2 md:mb-4">Connect</p>
            {SOCIALS.map((network) => (
              <motion.a 
                key={network.name}
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUpVariants}
                className="font-black text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter text-gray-300 hover:text-gray-900 transition-colors flex items-center gap-4 md:gap-6 group"
              >
                {network.name}
                <HiOutlineArrowRight className="opacity-0 -translate-x-6 md:-translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-3xl md:text-4xl text-[#ec7719]" />
              </motion.a>
            ))}
          </motion.div>

          {/* Elegant Contact Block w/ Map */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="flex flex-col gap-8 md:gap-10 lg:w-[450px]"
          >
            <div>
              <p className="text-[#ec7719] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 md:mb-6">Flagship Store</p>
              
              {/* ── GOOGLE MAPS IFRAME ── */}
              <div className="w-full h-48 sm:h-64 mb-6 bg-gray-200 overflow-hidden relative shadow-sm border border-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241.20314067419363!2d120.98045693767165!3d14.698435163606128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b3f9674e1547%3A0xa7bf49cd0bfd7b4a!2s72%20G.%20Marcelo%2C%20Valenzuela%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1777899742720!5m2!1sen!2sph" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
              </div>

              <p className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                72 G. Marcelo St, Maysan,<br />Valenzuela City
              </p>
            </div>
            
            <div className="w-full h-px bg-gray-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div>
                <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1 md:mb-2">Hours</p>
                <p className="text-sm font-bold text-gray-900 leading-relaxed">Mon – Sun<br />11:00 AM — 9:00 PM</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1 md:mb-2">Contact</p>
                <p className="text-sm font-bold text-gray-900 leading-relaxed hover:text-[#ec7719] cursor-pointer transition-colors mb-0.5">0982 379 0274</p>
                <p className="text-sm font-bold text-gray-900 leading-relaxed hover:text-[#ec7719] cursor-pointer transition-colors truncate">mrsquashofficial@gmail.com</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}

export default AboutUs;