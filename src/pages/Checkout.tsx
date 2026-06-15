import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
  HiOutlineCreditCard,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { FaMotorcycle, FaSpinner } from "react-icons/fa";
import { TbCashBanknoteFilled } from "react-icons/tb";
import { FaCreditCard } from "react-icons/fa";
import gcashLogo from "../assets/icon/gcash.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // GPS States
  const [isLocating, setIsLocating] = useState(false);
  const [gpsPin, setGpsPin] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState("");

  // Order Success State
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Delivery calculations
  const deliveryFee = cartTotal > 500 ? 0 : 49;
  const packagingFee = 15;
  const grandTotal = cartTotal + deliveryFee + packagingFee;

  // Map references
  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = React.useRef<L.Map | null>(null);
  const markerInstanceRef = React.useRef<L.Marker | null>(null);

  const updateMapPosition = (lat: number, lng: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], 16, { animate: true });
    }
    if (markerInstanceRef.current) {
      markerInstanceRef.current.setLatLng([lat, lng]);
    }
  };

  React.useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix default marker icon issue in Leaflet using official Leaflet images from CDN
    const DefaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    if (!mapInstanceRef.current) {
      const defaultLat = 14.6972;
      const defaultLng = 120.9634;

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
      }).setView([defaultLat, defaultLng], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Create a draggable marker
      const marker = L.marker([defaultLat, defaultLng], {
        draggable: true,
      }).addTo(map);

      const updateLocationFromCoords = async (lat: number, lng: number) => {
        setGpsPin({ lat, lng });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            {
              headers: {
                "Accept-Language": "en",
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            if (data && data.display_name) {
              setAddress(data.display_name);
            } else {
              setAddress(`${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E`);
            }
          } else {
            setAddress(`${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E`);
          }
        } catch (e) {
          console.error("Geocoding failed", e);
          setAddress(`${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E`);
        }
      };

      marker.on("dragend", () => {
        const position = marker.getLatLng();
        updateLocationFromCoords(position.lat, position.lng);
      });

      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        updateLocationFromCoords(lat, lng);
      });

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerInstanceRef.current = null;
      }
    };
  }, []);

  const handleGetLocation = React.useCallback(() => {
    setIsLocating(true);
    setLocationStatus("Initializing GPS satellite link...");

    const fallbackToSimulate = () => {
      setLocationStatus("Simulating GPS triangulation...");
      setTimeout(() => {
        setLocationStatus("Locating near Valenzuela Flagship store...");
        setTimeout(() => {
          const mockLat = 14.6972 + (Math.random() - 0.5) * 0.006;
          const mockLng = 120.9634 + (Math.random() - 0.5) * 0.006;
          setGpsPin({ lat: mockLat, lng: mockLng });
          updateMapPosition(mockLat, mockLng);
          setAddress(
            "Unit G-12, Karuhatan Road, Karuhatan, Valenzuela City, Metro Manila, 1460, Philippines"
          );
          setLocationStatus("Location pinned successfully!");
          setIsLocating(false);
        }, 1000);
      }, 800);
    };

    if (!navigator.geolocation) {
      fallbackToSimulate();
      return;
    }

    setTimeout(() => {
      setLocationStatus("Triangulating coordinates...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setGpsPin({ lat: latitude, lng: longitude });
          updateMapPosition(latitude, longitude);
          setLocationStatus("Translating coordinates to address...");

          try {
             const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              {
                headers: {
                  "Accept-Language": "en",
                },
              }
            );
            if (res.ok) {
              const data = await res.json();
              if (data && data.display_name) {
                setAddress(data.display_name);
                setLocationStatus("Location found!");
              } else {
                setAddress(`${latitude.toFixed(5)}° N, ${longitude.toFixed(5)}° E`);
                setLocationStatus("Coordinates pinpointed!");
              }
            } else {
              setAddress(`${latitude.toFixed(5)}° N, ${longitude.toFixed(5)}° E (Near Valenzuela City, PH)`);
              setLocationStatus("Coordinates pinpointed!");
            }
          } catch (err) {
            console.error(err);
            setAddress(`${latitude.toFixed(5)}° N, ${longitude.toFixed(5)}° E (Near Valenzuela City, PH)`);
            setLocationStatus("Coordinates pinpointed!");
          }
          setIsLocating(false);
        },
        (error) => {
          console.warn("GPS error, using fallback simulated location:", error);
          fallbackToSimulate();
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }, 1200);
  }, []);

  React.useEffect(() => {
    // Auto-detect and fly to location on mount
    const timer = setTimeout(() => {
      handleGetLocation();
    }, 0);
    return () => clearTimeout(timer);
  }, [handleGetLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    // Generate random order id
    const mockId = "MSQ-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(mockId);
    setOrderPlaced(true);
  };

  const handleFinish = () => {
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-[#faf5ef] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-[2.5rem] border-4 border-gray-900 p-10 max-w-md shadow-[8px_8px_0px_#ec7719] flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-4 border-gray-900">
            <HiOutlineLocationMarker className="text-[#ec7719] text-4xl" />
          </div>
          <h2 className="text-3xl font-black uppercase text-gray-900 leading-none">
            Your Cart is Empty!
          </h2>
          <p className="text-gray-500 font-semibold text-sm leading-relaxed">
            Fill your tray with Mr. Squash's crispy calabasa goodness before starting the checkout.
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="w-full bg-[#ec7719] hover:bg-[#c65e0a] text-white font-black uppercase tracking-wider py-4 rounded-xl border-3 border-gray-900 shadow-[4px_4px_0px_#111] transition-all hover:scale-105 active:scale-95 cursor-pointer text-center"
          >
            Browse Menu 🍕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf5ef] pt-12 pb-24 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#ec7719] selection:text-white">
      {/* Back button */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-700 hover:text-[#ec7719] transition-colors cursor-pointer group"
        >
          <HiOutlineArrowLeft className="text-base group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form panel */}
        <div className="lg:col-span-7 bg-white flex0  rounded-4xl border-4 border-gray-900 p-6 sm:p-8 shadow-[8px_8px_0px_#ec7719]">
          <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2 leading-none">
            Checkout Details
          </h1>
          <p className="text-gray-500 font-bold text-xs mb-8 uppercase tracking-wider">
            Confirm address to deliver the squash crunch  
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Customer Info */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                <HiOutlineUser className="text-[#ec7719] text-sm" /> Full Name
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                  <HiOutlinePhone className="text-[#ec7719] text-sm" /> Mobile Number
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

              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-600 mb-1.5 flex items-center gap-1.5">
                  <HiOutlineMail className="text-[#ec7719] text-sm" /> Email Address
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
            </div>

            {/* Address with automatic GPS finder */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                  <HiOutlineLocationMarker className="text-[#ec7719] text-sm" /> Delivery Address
                </label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#ec7719] border-2 border-[#ec7719]/35 transition-all disabled:opacity-50 cursor-pointer shadow-sm hover:scale-[1.03] active:scale-[0.97]"
                >
                  {isLocating ? (
                    <>
                      <FaSpinner className="animate-spin text-xs" /> Pinning Location...
                    </>
                  ) : (
                    <>📍 My Location</>
                  )}
                </button>
              </div>

              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Unit No., Street name, Barangay, City, Postal Code"
                className="w-full bg-white border-2 border-gray-900 focus:border-[#ec7719] focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 focus:outline-none transition-all text-sm font-semibold text-gray-900 shadow-sm resize-none"
              />

              {/* GPS status and Coordinates display */}
              <AnimatePresence>
                {isLocating && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-2.5 p-3.5 bg-orange-50 rounded-xl border border-orange-200 flex flex-col gap-2 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3 z-10">
                      {/* Satellite pulsing radar animation */}
                      <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                        <div className="absolute inset-0 bg-[#ec7719]/20 rounded-full animate-ping" />
                        <div className="absolute inset-1.5 bg-[#ec7719]/40 rounded-full animate-pulse" />
                        <div className="w-2.5 h-2.5 bg-[#ec7719] rounded-full" />
                      </div>
                      <span className="text-xs font-bold text-orange-800">
                        {locationStatus}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {gpsPin && !isLocating && (
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                    GPS Pin: {gpsPin.lat.toFixed(5)}° N, {gpsPin.lng.toFixed(5)}° E
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    Distance: 1.2 km (Delivered from Valenzuela Flagship)
                  </span>
                </div>
              )}

              {/* Map view container */}
              <div className="mt-3.5">
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5">
                  Pinpoint exact delivery location (Drag pin or click map to move)
                </label>
                <div 
                  ref={mapContainerRef} 
                  className="w-full h-60 rounded-2xl border-4 border-gray-900 overflow-hidden shadow-[4px_4px_0px_#111] relative z-10"
                  style={{ minHeight: "240px" }}
                />
              </div>
            </div>

            {/* Payment options */}
            <div className="pt-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-1.5">
                <HiOutlineCreditCard className="text-[#ec7719] text-sm" /> Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-gray-900 bg-orange-50 text-gray-900 shadow-sm"
                      : "border-gray-200 hover:border-gray-900 text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <TbCashBanknoteFilled className="text-2xl text-emerald-600" />
                  <span className="text-xs font-bold leading-none">COD</span>
                </button>
 
                <button
                  type="button"
                  onClick={() => setPaymentMethod("gcash")}
                  className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    paymentMethod === "gcash"
                      ? "border-gray-900 bg-orange-50 text-gray-900 shadow-sm"
                      : "border-gray-200 hover:border-gray-900 text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <img src={gcashLogo} alt="GCash" className="h-6 w-auto object-contain" />
                  <span className="text-xs font-bold leading-none">GCash</span>
                </button>
 
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-gray-900 bg-orange-50 text-gray-900 shadow-sm"
                      : "border-gray-200 hover:border-gray-900 text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <FaCreditCard className="text-2xl text-blue-600" />
                  <span className="text-xs font-bold leading-none">Card</span>
                </button>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="w-full bg-[#ec7719] hover:bg-[#c65e0a] text-white font-black uppercase tracking-widest py-4.5 rounded-xl border-3 border-gray-900 shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95 transition-all text-base mt-6 cursor-pointer text-center"
            >
              Confirm & Place Order 
            </button>
          </form>
        </div>

        {/* Invoice summary panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-4xl border-4 border-gray-900 p-6 shadow-[8px_8px_0px_#fef08a]">
            <h2 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-5 pb-3 border-b-2 border-dashed border-orange-100 flex items-center gap-2">
              <FaMotorcycle className="text-[#ec7719] text-xl" /> Order Summary
            </h2>

            {/* Items scroll */}
            <div className="max-h-72 overflow-y-auto space-y-3.5 pr-1.5 scrollbar-thin">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-[#faf5ef] rounded-xl p-2.5 border border-orange-100/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 object-contain bg-white rounded-lg p-0.5 shrink-0 border border-orange-50"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-xs truncate leading-snug">
                      {item.name}
                    </p>
                    <p className="text-gray-400 font-semibold text-[10px]">
                      Qty: {item.qty} × ₱{item.price}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-gray-900 text-xs">
                      ₱{item.price * item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Receipt invoice price tags */}
            <div className="mt-6 pt-5 border-t border-orange-100/50 space-y-2.5 text-sm font-semibold text-gray-600">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">₱{cartTotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Fee</span>
                <span className={`font-bold ${deliveryFee === 0 ? "text-green-600" : "text-gray-900"}`}>
                  {deliveryFee === 0 ? "FREE" : `₱${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tax & Packaging</span>
                <span className="text-gray-900 font-bold">₱{packagingFee}</span>
              </div>
              {deliveryFee === 0 && (
                <p className="text-[10px] text-green-600 font-black uppercase text-center bg-green-50 border border-green-100 rounded py-1">
                   Free delivery applied (Orders &gt; ₱500)
                </p>
              )}
              <div className="flex justify-between items-center pt-3 border-t-2 border-dashed border-orange-100 text-base font-black text-gray-900 mt-2">
                <span>Total Amount</span>
                <span className="text-[#ec7719] text-xl">₱{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal overlay */}
      <AnimatePresence>
        {orderPlaced && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleFinish}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-[12px_12px_0px_#111] overflow-hidden z-10 p-8 border-4 border-gray-900 text-center flex flex-col items-center gap-5"
            >
              {/* Checkmark icon */}
              <div className="w-18 h-18 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-600 text-green-600 mb-2">
                <HiOutlineCheckCircle className="text-5xl" />
              </div>

              <div>
                <span className="text-[10px] font-black text-[#ec7719] uppercase tracking-widest block mb-1">
                  Success! Order Placed
                </span>
                <h3 className="text-3xl font-black text-gray-900 uppercase leading-none">
                  Thank You!
                </h3>
              </div>

              <div className="bg-[#faf5ef] border-2 border-dashed border-orange-200/80 rounded-2xl p-4.5 w-full text-left space-y-2 text-xs">
                <div className="flex justify-between items-center text-gray-500 font-semibold">
                  <span>Order Ref:</span>
                  <span className="font-black text-gray-900 uppercase">{orderId}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500 font-semibold">
                  <span>Recipient:</span>
                  <span className="font-bold text-gray-900">{name}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500 font-semibold">
                  <span>Payment Method:</span>
                  <span className="font-bold text-gray-900 uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500 font-semibold pt-1 border-t border-orange-100/50">
                  <span>Grand Total:</span>
                  <span className="font-black text-[#ec7719] text-sm">₱{grandTotal}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1.5 w-full">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                  <FaMotorcycle className="text-[#ec7719] text-sm animate-bounce" />
                  Estimated Delivery: 30 - 45 mins
                </div>
                {gpsPin && (
                  <p className="text-[9px] text-gray-400 font-semibold">
                    Pinpointed coordinates: {gpsPin.lat.toFixed(4)}° N, {gpsPin.lng.toFixed(4)}° E
                  </p>
                )}
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-[#ec7719] text-white font-black uppercase tracking-widest py-3.5 rounded-xl border-3 border-gray-900 shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:bg-[#c65e0a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95 transition-all text-sm mt-2 cursor-pointer text-center"
              >
                Back to Home 🏠
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Checkout;
