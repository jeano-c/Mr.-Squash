import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import {
  FaLeaf,
  FaFire,
  FaBriefcase,
  FaPizzaSlice,
  FaRocket,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLink,
} from "react-icons/fa";

// ── Job Data ─────────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 1,
    title: "Content Creator",
    department: "Marketing",
    type: "Full-time",
    location: "Valenzuela, PH (Hybrid)",
    desc: "Drive brand awareness by conceptualizing, shooting, and editing short-form video content across all social channels. Showcase our squash-infused goodness to the world!",
    pay: "₱25k - ₱35k / mo",
    requirements: "Experience in TikTok/Reels editing, passion for food styling, and a portfolio of highly engaging short-form videos."
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    type: "Internship",
    location: "Valenzuela, PH (Remote)",
    desc: "Assist in managing paid ad campaigns, tracking performance metrics, and brainstorming digital growth strategies to get Mr. Squash trending.",
    pay: "Paid Allowance + Bonuses",
    requirements: "Basic SEO/SEM knowledge, great copywriting skills, and currently taking Marketing, Communications, or related course."
  },
  {
    id: 3,
    title: "Kitchen Operations Lead",
    department: "Operations",
    type: "Full-time",
    location: "Valenzuela Flagship",
    desc: "Oversee daily kitchen preparation, inventory management, and high-standard quality control in a fast-paced environment. Master the art of the perfect Calabasa crunch!",
    pay: "₱180 - ₱220 / hr + Tips",
    requirements: "2+ years kitchen leadership experience, food safety certification, high energy, and a solid team-player mindset."
  },
  {
    id: 4,
    title: "Front of House Associate",
    department: "Operations",
    type: "Part-time",
    location: "Valenzuela Flagship",
    desc: "Deliver exceptional client service, manage point-of-sale transactions, and maintain front-of-house hospitality standards. Bring the good vibes to our hungry customers!",
    pay: "₱100 - ₱120 / hr + Tips",
    requirements: "Friendly demeanor, excellent communication, ability to handle cash registers, and flexible working hours."
  },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const bouncyFadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 14, bounce: 0.4 },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] },
  },
};

function Career() {
  const [selectedJob, setSelectedJob] = useState<(typeof JOBS)[0] | null>(JOBS[0]);
  const [appliedIds, setAppliedIds] = useState<number[]>([]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");

  // Filtered jobs
  const filteredJobs = JOBS.filter(
    (job) => selectedDept === "All" || job.department === selectedDept
  );

  const handleDeptChange = (dept: string) => {
    setSelectedDept(dept);
    const newFiltered = JOBS.filter(
      (job) => dept === "All" || job.department === dept
    );
    if (newFiltered.length > 0) {
      const isStillInList = newFiltered.some((j) => j.id === selectedJob?.id);
      if (!isStillInList) {
        setSelectedJob(newFiltered[0]);
      }
    } else {
      setSelectedJob(null);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJob) {
      setAppliedIds((prev) => [...prev, selectedJob.id]);
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setLink("");
      setNote("");
    }
  };

  // Get distinct departments dynamically
  const departments = ["All", ...Array.from(new Set(JOBS.map((j) => j.department)))];

  const hasApplied = selectedJob ? appliedIds.includes(selectedJob.id) : false;

  return (
    <div className="min-h-screen bg-[#faf5ef] selection:bg-[#ec7719] selection:text-white font-sans text-gray-900 overflow-x-hidden pb-32">
      
      {/* ══════════════════════════════════════════
         HERO SECTION (Curvy & Energetic - Sized Down)
      ══════════════════════════════════════════ */}
      <section className="bg-[#ec7719] rounded-b-[2.5rem] md:rounded-b-[3.5rem] pt-20 pb-16 md:pt-24 md:pb-18 px-6 text-center relative shadow-xl z-20 animate-fade-in">
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-12 left-10 text-orange-300 text-4xl opacity-30 hidden md:block"
        >
          <FaLeaf />
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
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
            Grow with the squad! 🚀
          </motion.div>

          <motion.h1
            variants={bouncyFadeUp}
            className="font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-tight mb-4 drop-shadow-md uppercase"
          >
            Join the <span className="text-[#fef08a]">Squash Squad</span>
          </motion.h1>

          <motion.p
            variants={bouncyFadeUp}
            className="text-orange-100 text-xs md:text-sm font-semibold max-w-xl mx-auto leading-relaxed"
          >
            Ready to scale the crunch? We are looking for high-energy creators, operations leads, and kitchen masters to take Mr. Squash to the next level.
          </motion.p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
         THE CULTURE BENTO GRID
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10 -mt-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-gray-900 leading-none">
            Why work at <span className="text-[#ec7719]">Mr. Squash?</span>
          </h2>
          <p className="text-gray-500 font-bold text-sm md:text-base mt-4 max-w-md mx-auto">
            We believe in good vibes, great food, and taking care of the amazing people who make the crunch possible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1 */}
          <div className="bg-white rounded-4xl border-4 border-gray-900 p-8 shadow-[6px_6px_0px_#ec7719] hover:shadow-[10px_10px_0px_#111] hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-5 border-2 border-gray-900 shadow-sm">
              <FaPizzaSlice className="text-[#ec7719] text-xl" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-gray-900">Calabasa Fuel</h3>
            <p className="text-sm font-semibold text-gray-500 leading-relaxed">
              Enjoy free, freshly fried Mr. Squash combo meals on every shift. Slay your hunger with the finest crunch!
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white rounded-4xl border-4 border-gray-900 p-8 shadow-[6px_6px_0px_#fef08a] hover:shadow-[10px_10px_0px_#111] hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-5 border-2 border-gray-900 shadow-sm">
              <FaRocket className="text-yellow-600 text-xl" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-gray-900">Rocket Growth</h3>
            <p className="text-sm font-semibold text-gray-500 leading-relaxed">
              We're expanding fast! Learn business operations, store marketing, and culinary management from the ground up.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white rounded-4xl border-4 border-gray-900 p-8 shadow-[6px_6px_0px_#ec7719] hover:shadow-[10px_10px_0px_#111] hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-5 border-2 border-gray-900 shadow-sm">
              <HiOutlineCurrencyDollar className="text-[#ec7719] text-2xl" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-gray-900">Sweet Pay</h3>
            <p className="text-sm font-semibold text-gray-500 leading-relaxed">
              Competitive salary, hourly rates, transparent shared tip pools, and performance bonuses. We reward high skills!
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white rounded-4xl border-4 border-gray-900 p-8 shadow-[6px_6px_0px_#fef08a] hover:shadow-[10px_10px_0px_#111] hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-5 border-2 border-gray-900 shadow-sm">
              <HiOutlineClock className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-gray-900">Flex Schedules</h3>
            <p className="text-sm font-semibold text-gray-500 leading-relaxed">
              Whether you are a student or a creator with other gigs, our flexible operations shifts and hybrid setups keep it easy.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
         JOB OPENINGS SECTION (Master-Detail Layout)
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-4 w-full z-10 relative">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-gray-900 leading-none">
              Open <span className="text-[#ec7719]">Positions</span>
            </h2>
            <p className="text-gray-500 font-bold text-sm mt-3">
              Find your perfect role and help us fry up a storm.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border-[3px] border-gray-900 shadow-[4px_4px_0px_#111]">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => handleDeptChange(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer
                  ${selectedDept === dept
                    ? "bg-[#ec7719] text-white border-2 border-gray-900 shadow-[2px_2px_0px_#111]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-2 border-transparent"
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* ── RESPONSIVE DOCK GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. LEFT PANEL: Positions List (Shown on Desktop, or Mobile when detail is closed) */}
          <div className={`lg:col-span-5 space-y-5 ${isMobileDetailOpen ? "hidden lg:block" : "block"}`}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-4xl border-4 border-gray-900 p-8 text-center shadow-[4px_4px_0px_#111]">
                  <p className="text-gray-400 font-black text-sm uppercase">No positions available in this department.</p>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isActive = selectedJob?.id === job.id;
                  const isApplied = appliedIds.includes(job.id);
                  
                  // Active card styles vs Default card styles
                  const activeBorder = isActive ? "border-[#ec7719]" : "border-gray-900";
                  const activeShadow = isActive ? "shadow-[6px_6px_0px_#ec7719]" : "shadow-[6px_6px_0px_#111]";
                  const activeBg = isActive ? "bg-orange-50/20" : "bg-white";

                  return (
                    <motion.div
                      key={job.id}
                      variants={cardVariants}
                      onClick={() => {
                        setSelectedJob(job);
                        setIsMobileDetailOpen(true);
                      }}
                      className={`rounded-4xl border-4 p-6 flex flex-col justify-between transition-all duration-200 group cursor-pointer ${activeBorder} ${activeShadow} ${activeBg} hover:-translate-y-0.5`}
                    >
                      <div>
                        {/* Meta Tags Row */}
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                          <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-gray-900 text-white border border-gray-900 shadow-sm leading-none">
                            {job.department}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#fef08a] text-gray-900 border-2 border-gray-900 shadow-sm leading-none">
                            {job.type}
                          </span>
                          {isApplied && (
                            <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-green-500 text-white border border-green-600 shadow-sm leading-none">
                              Applied!
                            </span>
                          )}
                        </div>

                        {/* Position Title */}
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight group-hover:text-[#ec7719] transition-colors leading-tight mb-2">
                          {job.title}
                        </h3>
                        
                        <p className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                          <HiOutlineLocationMarker className="text-[#ec7719] text-sm" />
                          {job.location}
                        </p>
                      </div>

                      {/* Bottom Info Row */}
                      <div className="pt-4 mt-4 border-t-2 border-gray-100/50 flex items-center justify-between">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Pay Scale</span>
                        <span className="text-xs font-black text-[#ec7719] leading-none">{job.pay}</span>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </div>

          {/* 2. RIGHT PANEL: Detailed View & Application Form (Shown on Desktop, or Mobile when detail is open) */}
          <div className={`lg:col-span-7 ${isMobileDetailOpen ? "block" : "hidden lg:block"}`}>
            {selectedJob ? (
              <div className="bg-white rounded-[2.5rem] border-4 border-gray-900 p-6 sm:p-8 shadow-[8px_8px_0px_#fef08a] relative">
                
                {/* Mobile Back Button */}
                <button
                  onClick={() => setIsMobileDetailOpen(false)}
                  className="lg:hidden inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-700 hover:text-[#ec7719] mb-6 cursor-pointer"
                >
                  <HiOutlineArrowLeft className="text-sm stroke-3" />
                  Back to Positions
                </button>

                {/* Detail Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b-2 border-dashed border-gray-100">
                  <div>
                    <span className="text-[10px] font-black text-[#ec7719] uppercase tracking-widest block mb-1">
                      Job Specifications
                    </span>
                    <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight leading-none">
                      {selectedJob.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs font-semibold text-gray-500">
                      <span className="flex items-center gap-1">
                        <HiOutlineLocationMarker className="text-[#ec7719]" />
                        {selectedJob.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiOutlineClock className="text-[#ec7719]" />
                        {selectedJob.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiOutlineCurrencyDollar className="text-[#ec7719] text-sm" />
                        {selectedJob.pay}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detail Body */}
                <div className="py-6 space-y-6">
                  <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Role Overview</h4>
                    <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                      {selectedJob.desc}
                    </p>
                  </div>

                  <div className="bg-[#faf5ef] p-5 rounded-2xl border-2 border-gray-900/10">
                    <h4 className="text-xs font-black text-[#ec7719] uppercase tracking-widest mb-1.5">Core Requirements</h4>
                    <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                      {selectedJob.requirements}
                    </p>
                  </div>
                </div>

                {/* Embedded Application Form / Success Alert */}
                <div className="pt-6 border-t-2 border-dashed border-gray-100">
                  {hasApplied ? (
                    /* Success Alert */
                    <div className="bg-green-50 border-4 border-green-600 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-600 text-green-600 shrink-0">
                        <HiOutlineCheckCircle className="text-3xl" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-green-800 uppercase tracking-wide">
                          Application Received! 🎉
                        </h4>
                        <p className="text-xs font-semibold text-green-700 mt-1 leading-snug">
                          Your application for the <strong>{selectedJob.title}</strong> role has been successfully submitted. We will review your info and get in touch soon!
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* The Form */
                    <div>
                      <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span>Apply For This Position</span> 
                      </h4>

                      <form onSubmit={handleFinalSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                            <FaUser className="text-[#ec7719] text-2xs" /> Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Juan dela Cruz"
                            className="w-full bg-white border-2 border-gray-900 focus:border-[#ec7719] focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 focus:outline-none transition-all text-sm font-semibold text-gray-900 shadow-sm"
                          />
                        </div>

                        {/* Contact info grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                              <FaEnvelope className="text-[#ec7719] text-2xs" /> Email Address
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="juan@example.com"
                              className="w-full bg-white border-2 border-gray-900 focus:border-[#ec7719] focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 focus:outline-none transition-all text-sm font-semibold text-gray-900 shadow-sm"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                              <FaPhoneAlt className="text-[#ec7719] text-2xs" /> Phone Number
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="0917 123 4567"
                              className="w-full bg-white border-2 border-gray-900 focus:border-[#ec7719] focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 focus:outline-none transition-all text-sm font-semibold text-gray-900 shadow-sm"
                            />
                          </div>
                        </div>

                        {/* Resume / Portfolio */}
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                            <FaLink className="text-[#ec7719] text-2xs" /> Resume or Portfolio URL
                          </label>
                          <input
                            type="url"
                            required
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://linkedin.com/in/username or drive link"
                            className="w-full bg-white border-2 border-gray-900 focus:border-[#ec7719] focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 focus:outline-none transition-all text-sm font-semibold text-gray-900 shadow-sm"
                          />
                        </div>

                        {/* Pitch */}
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-wider text-gray-600 mb-1.5">
                            Why do you want to join the Squash Squad?
                          </label>
                          <textarea
                            rows={3}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Tell us about yourself and what you bring to the table..."
                            className="w-full bg-white border-2 border-gray-900 focus:border-[#ec7719] focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 focus:outline-none transition-all text-sm font-semibold text-gray-900 shadow-sm resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#ec7719] text-white font-black uppercase tracking-widest py-4 rounded-xl border-3 border-gray-900 shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:bg-[#c65e0a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95 transition-all text-sm mt-3 cursor-pointer text-center"
                        >
                          Submit Application 🚀
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] border-4 border-gray-900 p-12 text-center shadow-[8px_8px_0px_#ec7719]">
                <HiOutlineLocationMarker className="text-[#ec7719] text-6xl mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-black uppercase text-gray-900">No Job Selected</h3>
                <p className="text-gray-400 font-semibold text-sm mt-2">Select a position from the left list to view details and apply.</p>
              </div>
            )}
          </div>

        </div>

        {/* ── SPONTANEOUS APPLICATION CTA ── */}
        <div className="mt-24 max-w-2xl mx-auto text-center bg-gray-900 text-white rounded-[2.5rem] p-10 border-4 border-gray-900 shadow-[8px_8px_0px_#ec7719] relative overflow-hidden group">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
              backgroundSize: "20px 20px",
            }}
          />
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-[#ec7719] rounded-full flex items-center justify-center mb-6 mx-auto border-4 border-gray-900 -rotate-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
              <FaBriefcase className="text-lg text-white" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
              Don't see your role?
            </h3>
            <p className="text-gray-300 font-semibold text-sm max-w-md mx-auto mb-8 leading-relaxed">
              We are always searching for exceptional talent. If you bring pure passion and amazing vibes, let's create a custom role for you.
            </p>

            <button
              onClick={() => {
                setSelectedJob({
                  id: 999,
                  title: "Spontaneous Squad Member",
                  department: "General Inquiry",
                  type: "Flexible",
                  location: "Valenzuela Flagship / Remote",
                  desc: "Tell us how you can help us grow the Mr. Squash kingdom!",
                  pay: "Based on role & value",
                  requirements: "High energy, passion for our mission, unique talent."
                });
                setIsMobileDetailOpen(true);
              }}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white text-gray-900 border-3 border-gray-900 px-6 py-3.5 rounded-full hover:bg-[#fef08a] transition-all duration-300 hover:scale-105 shadow-[4px_4px_0px_#ec7719] active:scale-95 cursor-pointer"
            >
              Submit Spontaneous Application &arr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Career;