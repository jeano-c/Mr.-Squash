import { useState, useRef, useEffect } from "react";
import { HiPlus, HiCheck } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { FaLeaf, FaFire } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

// Swap for real asset paths
import pumpletImg from "../assets/pumplet.png";
import kriskalImg from "../assets/krischal.png";
import kalaboomImg from "../assets/kalaboom.png";
import sqfiesImg from "../assets/sqfries.png";
import kalabitsImg from "../assets/kalabits.png";
import sqburgerImg from "../assets/sqburger.png";
import combo1Img from "../assets/combo1.png";
import combo2Img from "../assets/combo2.png";
import combo3Img from "../assets/combo3.png";
import combo4Img from "../assets/combo4.png";
import riceImg from "../assets/rice.png";
import gravyImg from "../assets/gravy.png";
import ketchupImg from "../assets/ketchup.png";
import creamyImg from "../assets/creamy.png";
import lemonImg from "../assets/lemon.png";
import mangoImg from "../assets/mango.png";

// ── Types ────────────────────────────────────────────────────────────────────
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
}

export interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}

const SECTIONS: MenuSection[] = [
  {
    id: "squawk",
    label: "Squawk Meals",
    items: [
      {
        id: 1,
        name: "Pump-let Chicken",
        price: 89,
        image: pumpletImg,
        desc: "Crispy calabasa-coated chicken",
      },
      {
        id: 2,
        name: "Krispy Chickalabasa",
        price: 89,
        image: kriskalImg,
        desc: "Golden fried with squash glaze",
      },
      {
        id: 3,
        name: "Kala-Boom",
        price: 79,
        image: kalaboomImg,
        desc: "Spicy squash battered bites",
      },
    ],
  },
  {
    id: "nacks",
    label: "Squash Nacks",
    items: [
      {
        id: 4,
        name: "Squash Fries",
        price: 39,
        image: sqfiesImg,
        desc: "Seasoned calabasa fries",
      },
      {
        id: 5,
        name: "Kala-Bites",
        price: 49,
        image: kalabitsImg,
        desc: "Bite-sized squash nuggets",
      },
      {
        id: 6,
        name: "Squash Burger",
        price: 69,
        image: sqburgerImg,
        desc: "Juicy patty on a toasted bun",
      },
    ],
  },
  {
    id: "combo",
    label: "Combo Meals",
    items: [
      {
        id: 7,
        name: "Combo A",
        price: 164,
        image: combo1Img,
        desc: "Kala-boom with Drink and Burger",
      },
      {
        id: 8,
        name: "Combo B",
        price: 164,
        image: combo2Img,
        desc: "Pump-let Chicken with Drink and Kala-Bites",
      },
      {
        id: 9,
        name: "Combo C",
        price: 144,
        image: combo3Img,
        desc: "Krispy Chickalabasa with Drink and Fries",
      },
      {
        id: 10,
        name: "Combo D",
        price: 184,
        image: combo4Img,
        desc: "Burger, Fries, Kala-Bites, and Drink",
      },
    ],
  },
  {
    id: "addons",
    label: "Add Ons",
    items: [
      {
        id: 11,
        name: "Rice",
        price: 15,
        image: riceImg,
        desc: "Steamed white rice",
      },
      {
        id: 12,
        name: "Gravy",
        price: 12,
        image: gravyImg,
        desc: "Rich brown gravy",
      },
      {
        id: 13,
        name: "Ketchup Mayo",
        price: 15,
        image: ketchupImg,
        desc: "Creamy ketchup blend",
      },
      {
        id: 14,
        name: "Creamy Sauce",
        price: 15,
        image: creamyImg,
        desc: "House special sauce",
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    items: [
      {
        id: 15,
        name: "Lemon Juice",
        price: 20,
        image: lemonImg,
        desc: "Fresh squeezed lemon",
      },
      {
        id: 16,
        name: "Mango Juice",
        price: 20,
        image: mangoImg,
        desc: "Sweet Philippine mango",
      },
    ],
  },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 13, mass: 0.8 },
  },
};

// ── Card Component ───────────────────────────────────────────────────────────
interface MenuCardProps {
  item: MenuItem;
}

function MenuCard({ item }: MenuCardProps) {
  const { addToCart, cartItems } = useCart();
  const [flash, setFlash] = useState<boolean>(false);
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string }[]>([]);
  
  const inCart = cartItems.some((i) => i.id === item.id);

  function handleAdd() {
    addToCart(item);
    setFlash(true);
    setTimeout(() => setFlash(false), 1200);

    // Add floating text particle
    const textId = Date.now();
    const messages = ["+1 Crispy! 🌾", "+1 Squash! 🍊", "+1 Crunch! ✨", "+1 Delicious! 🔥"];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setFloatingTexts((prev) => [...prev, { id: textId, text: randomMsg }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((t) => t.id !== textId));
    }, 800);
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className="group relative bg-white rounded-[2rem] overflow-hidden border-[3px] border-gray-900
      shadow-[5px_5px_0px_#ec7719] hover:shadow-[7px_7px_0px_#111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
    >
      {/* image */}
      <div className="relative bg-[#fff7f0] flex items-center justify-center h-44 overflow-hidden border-b-[3px] border-gray-900 select-none">
        {inCart && (
          <span
            className="absolute top-3 right-3 bg-green-500 text-white text-[9px] font-black uppercase tracking-wider
            px-2.5 py-1 rounded-full border-2 border-gray-900 shadow-sm z-10 animate-bounce"
          >
            In cart
          </span>
        )}
        <img
          src={item.image}
          alt={item.name}
          className="h-36 w-36 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
        />

        {/* Floating particles */}
        <AnimatePresence>
          {floatingTexts.map((ft) => (
            <motion.span
              key={ft.id}
              initial={{ opacity: 0, y: 20, scale: 0.7 }}
              animate={{
                opacity: 1,
                y: -60,
                scale: 1.1,
                rotate: Math.random() * 14 - 7,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="absolute bg-gray-900 text-white text-[9px] font-black uppercase tracking-wider py-1 px-3 rounded-full border-2 border-gray-900 shadow-[2px_2px_0px_#ec7719] z-30 pointer-events-none whitespace-nowrap"
            >
              {ft.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* info */}
      <div className="flex flex-col flex-1 p-5 gap-1.5 bg-white">
        <h3 className="font-black text-gray-900 text-base leading-tight uppercase tracking-tight">
          {item.name}
        </h3>
        <p className="text-gray-400 text-xs font-semibold leading-relaxed flex-1">{item.desc}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-[#ec7719] font-black text-xl">
            ₱{item.price}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full border-2 border-gray-900
              transition-all duration-200 active:scale-95 shadow-[2px_2px_0px_#111] cursor-pointer
              ${flash 
                ? "bg-green-500 text-white border-green-600 shadow-none scale-105" 
                : "bg-[#ec7719] hover:bg-[#c65e0a] text-white hover:-translate-y-0.5"}`}
          >
            {flash ? (
              <HiCheck className="text-sm" />
            ) : (
              <HiPlus className="text-sm" />
            )}
            {flash ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
interface SectionHeadingProps {
  label: string;
}

function SectionHeading({ label }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="font-black text-2xl md:text-3xl text-gray-900 uppercase tracking-tight whitespace-nowrap">
        {label}
      </h2>
      <div className="flex-1 h-1.5 bg-gray-900 rounded-full" />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
function Menu() {
  const [activeSection, setActiveSection] = useState<string>("squawk");
  
  // Refs for scrolling and tracking
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 1. Observe scroll position to highlight active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-120px 0px -60% 0px" } 
    );

    const currentSections = sectionRefs.current;
    Object.values(currentSections).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(currentSections).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // 2. Auto-scroll category menu on mobile
  useEffect(() => {
    const nav = navRef.current;
    const activeBtn = buttonRefs.current[activeSection];
    if (nav && activeBtn) {
      const scrollPos = activeBtn.offsetLeft - nav.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      nav.scrollTo({ left: scrollPos, behavior: "smooth" });
    }
  }, [activeSection]);

  function scrollToSection(id: string) {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="min-h-screen bg-[#faf5ef] selection:bg-[#ec7719] selection:text-white">
      {/* ══════════════════════════════════════════
         HERO SECTION (Curvy & Energetic - Sized Down)
      ══════════════════════════════════════════ */}
      <div className="bg-[#ec7719] rounded-b-[2.5rem] md:rounded-b-[3.5rem] pt-20 pb-16 md:pt-24 md:pb-18 px-6 text-center relative shadow-xl z-20 overflow-hidden">
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="absolute top-12 left-10 text-orange-300 text-4xl opacity-30 hidden md:block"
        >
          <FaLeaf />
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute bottom-12 right-16 text-orange-300 text-5xl opacity-30 hidden md:block"
        >
          <FaFire />
        </motion.div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block bg-white text-[#ec7719] font-black text-[9px] md:text-2xs uppercase tracking-widest px-4.5 py-1.5 rounded-full mb-4 shadow-md rotate-2 border-2 border-gray-900">
            Fresh & Made to Order
          </div>

          <h1 className="font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-tight mb-4 drop-shadow-md">
            OUR MENU
          </h1>

          <p className="text-orange-100 text-xs md:text-sm font-semibold max-w-xl mx-auto leading-relaxed">
            Everything made with real calabasa goodness. Pick your favorites and experience the crunch!
          </p>
        </div>
      </div>

      {/* Sticky category nav */}
      <div className="sticky top-15 z-40 bg-[#faf5ef]/95 backdrop-blur-sm border-b-2 border-gray-900/15 px-4 py-4.5 shadow-sm">
        <div
          ref={navRef} 
          className="max-w-6xl mx-auto flex gap-3 overflow-x-auto py-1 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              ref={(el) => {
                buttonRefs.current[s.id] = el; 
              }}
              onClick={() => scrollToSection(s.id)}
              className={`shrink-0 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider
                transition-all duration-200 whitespace-nowrap cursor-pointer border-2 border-gray-900 shadow-[2.5px_2.5px_0px_#111] hover:scale-105 active:scale-95
                ${
                  activeSection === s.id
                    ? "bg-[#ec7719] text-white shadow-[1px_1px_0px_#111] translate-x-[1px] translate-y-[1px]"
                    : "bg-white text-gray-700 hover:bg-orange-50/50"
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 flex flex-col gap-16">
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            id={section.id} 
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
            className="scroll-mt-28"
          >
            <SectionHeading label={section.label} />
            <div
              className={`grid gap-6
              ${
                section.items.length === 4
                  ? "grid-cols-2 md:grid-cols-4"
                  : section.items.length === 2
                    ? "grid-cols-2 md:grid-cols-2 max-w-sm mx-auto md:max-w-md"
                    : "grid-cols-2 md:grid-cols-3"
              }`}
            >
              {section.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;