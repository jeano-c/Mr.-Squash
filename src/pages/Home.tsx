import AutoCarousel from "../components/AutoCarousel";
import combo1 from "../assets/combo1.png";

function Home() {
  const combo = [
    { name: "COMBO A", image: combo1, decs: "Kala-Boom with Drink and Burger", price: "₱149" },
    { name: "COMBO B", image: combo1, decs: "Pump-let Chicken with Drink and Kala-Bites", price: "₱169" },
    { name: "COMBO C", image: combo1, decs: "Krispy Chickalabasa with Drink and Fries", price: "₱159" },
    { name: "COMBO D", image: combo1, decs: "Drink, Burger, Kala-Bites, and Fries", price: "₱189" },
  ];

  return (
    <>
      <AutoCarousel />

      <div className="w-full bg-[#faf5ef] py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="mb-14">
            <p className="text-[#ea7a20] text-sm font-bold tracking-[0.3em] uppercase mb-2">
              What's on the Table
            </p>
            <h2 className="font-black text-5xl md:text-6xl text-gray-900 leading-none">
              COMBO <span className="text-[#ea7a20]">MEALS</span>
            </h2>
            <div className="mt-4 w-16 h-1.5 rounded-full bg-[#ea7a20]" />
          </div>

          {/* Combo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {combo.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden
                  shadow-sm hover:shadow-xl
                  transition-all duration-300 hover:-translate-y-2
                  border border-orange-100 flex flex-col"
              >
                {/* Image area with orange bg on hover */}
                <div className="relative bg-[#fef3e8] flex items-center justify-center pt-6 px-4 overflow-hidden">
                  {/* Combo badge */}
                  <span className="absolute top-3 left-3 bg-[#ea7a20] text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                    {item.name}
                  </span>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full max-w-52 h-48 object-contain
                      transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <p className="text-gray-700 text-sm text-center leading-snug flex-1">
                    {item.decs}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-orange-100" />

                  {/* Price + CTA row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[#ea7a20] font-black text-xl">{item.price}</span>
                    <button
                      className="bg-[#ea7a20] hover:bg-[#d06a10] active:scale-95
                        text-white text-xs font-bold px-4 py-2 rounded-full
                        transition-all duration-200 tracking-wide cursor-pointer"
                    >
                      ORDER
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;