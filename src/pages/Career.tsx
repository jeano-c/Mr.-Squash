import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { HiOutlineX, HiOutlineArrowRight } from "react-icons/hi";

// ── Job Data ─────────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 1,
    orderNo: "#8801",
    title: "CONTENT CREATOR",
    qty: "01",
    type: "FULL TIME",
    desc: "Shoot, edit, and post. Must live on TikTok and make calabasa crunch look irresistible.",
    pay: "COMPETITIVE",
    bonus: "ALLOWANCES",
  },
  {
    id: 2,
    orderNo: "#8802",
    title: "DIGITAL MKTG",
    qty: "01",
    type: "INTERNSHIP",
    desc: "Run ads, track metrics, and brainstorm campaigns to grow the brand online.",
    pay: "ALLOWANCE",
    bonus: "ACADEMIC CREDIT",
  },
  {
    id: 3,
    orderNo: "#8803",
    title: "KITCHEN NINJA",
    qty: "03",
    type: "URGENT",
    desc: "Prep, fry, and assemble combos in a high-energy, fast-paced kitchen.",
    pay: "HOURLY",
    bonus: "FREE MEALS",
  },
  {
    id: 4,
    orderNo: "#8804",
    title: "FRONT OF HOUSE",
    qty: "02",
    type: "PART TIME",
    desc: "Take orders, manage the counter, and keep every customer smiling.",
    pay: "HOURLY",
    bonus: "TIPS INCLUDED",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const receiptVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0, transformOrigin: "top" },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const Barcode = () => {
  const bars = [2, 4, 1, 3, 1, 1, 4, 2, 1, 2, 3, 1, 4, 1, 2, 2, 1, 3, 2];
  return (
    <div className="flex h-12 w-full items-center justify-center gap-0.5 opacity-70 my-4">
      {bars.map((w, i) => (
        <div
          key={i}
          className="h-full bg-gray-900"
          style={{ width: `${w * 2}px` }}
        />
      ))}
    </div>
  );
};

function Career() {
  const [selectedJob, setSelectedJob] = useState<(typeof JOBS)[0] | null>(null);
  const [appliedId, setAppliedId] = useState<number | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedJob]);

  const handleFinalSubmit = () => {
    if (selectedJob) {
      setAppliedId(selectedJob.id);
      setSelectedJob(null);
      setTimeout(() => setAppliedId(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5ef] selection:bg-[#ec7719] selection:text-white pb-24 flex flex-col font-sans relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ec7719 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ══════════════════════════════════════════
          APPLICATION MODAL
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="font-mono">
                  <p className="text-[#ec7719] text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                    NEW ORDER: {selectedJob.orderNo}
                  </p>
                  <h3 className="text-2xl font-black text-gray-900">
                    {selectedJob.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <HiOutlineX className="text-2xl" />
                </button>
              </div>

              <div className="space-y-6 font-mono">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Applicant Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name..."
                    className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 focus:outline-none focus:border-[#ec7719] transition-colors uppercase text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Payload (Portfolio URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full bg-gray-50 border-b-2 border-gray-200 py-3 focus:outline-none focus:border-[#ec7719] transition-colors text-sm font-bold"
                  />
                </div>
                <button
                  onClick={handleFinalSubmit}
                  className="w-full bg-gray-900 text-white font-black py-4 rounded-xl hover:bg-[#ec7719] transition-all uppercase tracking-[0.2em] text-xs shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  Confirm Order <HiOutlineArrowRight />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-12 px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#ec7719] font-mono text-sm font-bold tracking-[0.2em] uppercase mb-4 animate-pulse">
            [ System: Hiring Protocol ]
          </p>
          <h1 className="text-gray-900 font-black text-5xl md:text-6xl tracking-tighter uppercase mb-4 drop-shadow-sm">
            Pending <span className="text-[#ec7719]">Orders.</span>
          </h1>
          <p className="text-gray-500 font-mono text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Please review the open tickets below. Select an order to join the
            Mr. Squash kitchen.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RECEIPT GRID
      ══════════════════════════════════════════ */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 w-full pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10"
      >
        {JOBS.map((job) => (
          <motion.div
            key={job.id}
            variants={receiptVariants}
            className="flex flex-col drop-shadow-xl hover:-translate-y-2 hover:drop-shadow-2xl transition-all duration-300"
          >
            <div className="bg-white text-gray-900 p-6 flex-1 flex flex-col relative border border-gray-100 rounded-t-sm">
              <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-6">
                <h3 className="font-black text-xl tracking-tight uppercase">
                  Mr. Squash
                </h3>
                <p className="font-mono text-[10px] text-gray-500 mt-1 font-bold">
                  VALENZUELA FLAGSHIP
                </p>
                <div className="flex justify-between items-center font-mono text-[10px] text-gray-400 mt-4 font-bold">
                  <span>CHK {job.orderNo}</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between font-mono text-[10px] font-black border-b border-gray-200 pb-2 mb-4 text-gray-400 tracking-widest">
                  <span>QTY / POSITION</span>
                  <span>STATUS</span>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <span className="font-mono text-4xl font-black text-gray-900 leading-none">
                    {job.qty}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="bg-[#ec7719] text-white font-mono text-sm font-black px-2 py-0.5 w-fit uppercase">
                      {job.title}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold ${job.type === "URGENT" ? "text-red-500 animate-pulse" : "text-gray-400"}`}
                    >
                      {job.type}
                    </span>
                  </div>
                </div>

                <p className="font-mono text-[11px] text-gray-500 leading-relaxed mb-8 uppercase font-medium border-l-2 border-gray-100 pl-3">
                  {job.desc}
                </p>

                <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-auto space-y-1.5 font-mono">
                  <div className="flex justify-between text-xs font-medium text-gray-400">
                    <span>BASE PAY</span>
                    <span className="text-gray-900">{job.pay}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium text-gray-400">
                    <span>ADD-ONS</span>
                    <span className="text-gray-900">{job.bonus}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black pt-3 mt-2 border-t border-gray-100 text-gray-900">
                    <span>TOTAL VALUE</span>
                    <span className="text-[#ec7719]">PRICELESS</span>
                  </div>
                </div>
              </div>

              <Barcode />

              <button
                onClick={() => setSelectedJob(job)}
                disabled={appliedId === job.id}
                className={`w-full font-mono font-black text-xs py-4 transition-all duration-300 uppercase tracking-widest mt-2 shadow-sm
                  ${
                    appliedId === job.id
                      ? "bg-green-50 text-green-700 border-2 border-dashed border-green-500 cursor-default"
                      : "bg-gray-900 text-white hover:bg-[#ec7719] hover:shadow-md active:scale-95"
                  }`}
              >
                {appliedId === job.id
                  ? "*** ORDER RECEIVED ***"
                  : "CONFIRM ORDER"}
              </button>
            </div>
            <div className="h-3 w-full bg-white border-b-4 border-dotted border-gray-300 flex items-end"></div>
          </motion.div>
        ))}
      </motion.section>

      {/* ── Spontaneous Application Block ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="max-w-2xl mx-auto w-full px-6 mt-16 relative z-10"
      >
        <div className="border-2 border-dashed border-gray-300 bg-white shadow-sm p-6 text-center font-mono rounded-xl">
          <p className="text-gray-500 text-xs uppercase font-bold mb-2">
            Error 404: Role Not Found?
          </p>
          <p className="text-gray-900 text-sm font-medium mb-4">
            Upload custom payload (resume) to the Mr. Squash server.
          </p>
          <button className="text-[#ec7719] hover:text-gray-900 transition-colors text-xs font-black tracking-widest uppercase pb-1 border-b-2 border-[#ec7719] hover:border-gray-900">
            &gt; INITIALIZE UPLOAD
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Career;
