import { useState, useRef } from "react";
import { HiPlus, HiCheck } from "react-icons/hi";
import { useCart } from "../context/CartContext";

// ── swap for your real asset paths ───────────────────────────────────────────
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
// ─────────────────────────────────────────────────────────────────────────────

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
// ─────────────────────────────────────────────────────────────────────────────

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

// ── Card ─────────────────────────────────────────────────────────────────────
interface MenuCardProps {
  item: MenuItem;
}

function MenuCard({ item }: MenuCardProps) {
  const { addToCart, cartItems } = useCart();
  const [flash, setFlash] = useState<boolean>(false);
 // ✅ Fixed code (Removed ': MenuItem')
const inCart = cartItems.some((i) => i.id === item.id);

  function handleAdd() {
    addToCart(item);
    setFlash(true);
    setTimeout(() => setFlash(false), 1200);
  }

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-orange-100
      shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
    >
      {/* image */}
      <div className="relative bg-[#fff7f0] flex items-center justify-center h-44 overflow-hidden">
        {inCart && (
          <span
            className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold
            px-2 py-0.5 rounded-full z-10"
          >
            In cart
          </span>
        )}
        <img
          src={item.image}
          alt={item.name}
          className="h-36 w-36 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
        />
      </div>

      {/* info */}
      <div className="flex flex-col flex-1 p-4 gap-1">
        <h3 className="font-black text-gray-900 text-base leading-tight">
          {item.name}
        </h3>
        <p className="text-gray-400 text-xs leading-snug flex-1">{item.desc}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[#ec7719] font-black text-xl">
            ₱{item.price}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full
              transition-all duration-200 active:scale-95
              ${flash ? "bg-green-500 text-white scale-110" : "bg-[#ec7719] hover:bg-[#d06710] text-white"}`}
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
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
interface SectionHeadingProps {
  label: string;
}

function SectionHeading({ label }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="font-black text-3xl md:text-4xl text-gray-900 uppercase tracking-tight whitespace-nowrap">
        {label}
      </h2>
      <div className="flex-1 h-px bg-orange-200" />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
function Menu() {
  const [activeSection, setActiveSection] = useState<string>("squawk");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function scrollToSection(id: string) {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="min-h-screen bg-[#faf5ef]">
      {/* Hero */}
      <div className="bg-[#ec7719] py-10 px-6 text-center">
        <p className="text-orange-200 text-xs font-bold tracking-[0.3em] uppercase mb-1">
          Fresh & Made to Order
        </p>
        <h1 className="text-white font-black text-5xl md:text-6xl tracking-tight">
          OUR MENU
        </h1>
        <p className="text-orange-100 mt-2 text-sm max-w-sm mx-auto">
          Everything made with real calabasa goodness. Pick your favourites.
        </p>
      </div>

      {/* Sticky category nav */}
      <div className="sticky top-15 z-40 bg-[#faf5ef]/90 backdrop-blur-sm border-b border-orange-100 px-4 py-3">
        <div
          className="max-w-6xl mx-auto flex gap-2 overflow-x-auto pb-0.5"
          style={{ scrollbarWidth: "none" }}
        >
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide
                transition-all duration-200 whitespace-nowrap
                ${
                  activeSection === s.id
                    ? "bg-[#ec7719] text-white shadow-md"
                    : "bg-white text-gray-600 border border-orange-200 hover:border-[#ec7719] hover:text-[#ec7719]"
                }`}
            >
              {s.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 flex flex-col gap-16">
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
            className="scroll-mt-28"
          >
            <SectionHeading label={section.label} />
            <div
              className={`grid gap-5
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
