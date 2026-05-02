import { useState, useEffect } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenuAlt3, HiX, HiPlus, HiMinus, HiTrash } from "react-icons/hi";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router";
import { useCart } from "../context/CartContext";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, cartCount, cartTotal, updateQty, removeFromCart } =
    useCart();

  const navigation = [
    { label: "HOME", path: "/" },
    { label: "MENU", path: "/menu" },
    { label: "CAREER", path: "/career" },
    { label: "ABOUT US", path: "/about" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-50 flex flex-row justify-between items-center bg-[#ec7719]
          transition-all duration-300 ease-in-out
          ${scrolled ? "px-6 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.25)]" : "px-6 py-2.5 shadow-none"}`}
      >
        {/* Logo + Brand */}
        <div
          onClick={() => navigate("/")}
          className="flex flex-row items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <img
              className={`transition-all duration-300 group-hover:rotate-[8deg] group-hover:scale-110 drop-shadow-md
                ${scrolled ? "h-10 w-10 md:h-12 md:w-12" : "h-16 w-16 md:h-20 md:w-20"}`}
              src={logo}
              alt="mrsquash"
            />
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </div>
          <p
            className={`capitalize font-bold font-sans text-white tracking-tight drop-shadow-sm transition-all duration-300
            ${scrolled ? "text-xl md:text-2xl" : "text-3xl md:text-4xl"}`}
          >
            Mr. Squash
          </p>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-row items-center gap-3">
          {navigation.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer relative font-semibold tracking-widest rounded-full transition-all duration-300
                ${scrolled ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"}
                ${
                  isActive(item.path)
                    ? "text-[#ec7719] bg-white shadow-md scale-105"
                    : "text-white hover:bg-white/20 hover:scale-105"
                }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ec7719] shadow-sm" />
              )}
            </button>
          ))}
        </div>

        {/* Right: Cart + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCartOpen(true)}
            className="relative group p-1.5 rounded-full cursor-pointer hover:bg-white/20 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <TiShoppingCart
              className={`text-white drop-shadow-sm transition-all duration-300
              ${scrolled ? "text-4xl" : "text-5xl md:text-6xl"}`}
            />
            {cartCount > 0 && (
              <span
                className="absolute top-1 right-1 min-w-5.5 h-5.5 flex items-center justify-center
                bg-white text-[#ec7719] text-xs font-bold rounded-full border-2 border-[#ec7719]
                animate-bounce shadow-md leading-none px-1"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-1.5 rounded-full hover:bg-white/20 transition-all duration-200 active:scale-95"
          >
            {menuOpen ? (
              <HiX className="text-white text-3xl" />
            ) : (
              <HiMenuAlt3 className="text-white text-3xl" />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown ─────────────────────────────────────── */}
      <div
        className={`md:hidden bg-[#d96810] overflow-hidden transition-all duration-300 ease-in-out z-40 relative
          ${menuOpen ? "max-h-64 py-3" : "max-h-0 py-0"}`}
      >
        {navigation.map((item, i) => (
          <button
            key={item.label}
            onClick={() => {
              navigate(item.path);
              setMenuOpen(false);
            }}
            style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
            className={`w-full text-left px-8 py-3 text-sm font-semibold tracking-widest transition-all duration-200
              ${
                isActive(item.path)
                  ? "text-[#ec7719] bg-white/95 border-l-4 border-white"
                  : "text-white hover:bg-white/10 border-l-4 border-transparent"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ── Backdrop ────────────────────────────────────────────── */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300
          ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── Cart Sidebar ────────────────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl
          flex flex-col transition-transform duration-300 ease-in-out
          ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sidebar header */}
        <div className="bg-[#ec7719] px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <TiShoppingCart className="text-white text-3xl" />
            <h2 className="text-white font-black text-xl tracking-tight">
              Your Order
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="text-white hover:bg-white/20 p-1.5 rounded-full transition-all duration-200 active:scale-95"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <TiShoppingCart className="text-orange-200 text-7xl" />
              <p className="text-gray-400 font-semibold text-sm">
                Your cart is empty.
              </p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  navigate("/menu");
                }}
                className="bg-[#ec7719] text-white text-sm font-bold px-5 py-2.5 rounded-full
                  hover:bg-[#d06710] transition-all duration-200 active:scale-95"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-[#faf5ef] rounded-xl p-3 border border-orange-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-contain rounded-lg bg-white p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm leading-tight truncate">
                    {item.name}
                  </p>
                  <p className="text-[#ec7719] font-black text-base mt-0.5">
                    ₱{item.price}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="bg-white border border-orange-200 text-[#ec7719] rounded-full w-6 h-6
                        flex items-center justify-center hover:bg-orange-50 active:scale-90 transition-all"
                    >
                      <HiMinus className="text-xs" />
                    </button>
                    <span className="font-black text-gray-900 text-sm w-5 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="bg-[#ec7719] text-white rounded-full w-6 h-6
                        flex items-center justify-center hover:bg-[#d06710] active:scale-90 transition-all"
                    >
                      <HiPlus className="text-xs" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <HiTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-orange-100 px-5 py-4 bg-white flex flex-col gap-3 shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm font-semibold">
                {cartCount} item{cartCount > 1 ? "s" : ""}
              </span>
              <span className="text-gray-900 font-black text-xl">
                ₱{cartTotal}
              </span>
            </div>
            <button
              className="w-full bg-[#ec7719] hover:bg-[#d06710] active:scale-95
              text-white font-black text-base py-3.5 rounded-xl transition-all duration-200 shadow-md"
            >
              Place Order
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
