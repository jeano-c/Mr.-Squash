import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import slide from "../assets/slide.png";

function AutoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    // FIXED: Explicitly typed 'index' as a number
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const slides = [null, null, null]; // just for dot count

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={emblaRef}>
      {/* Carousel track */}
      <div className="flex h-full">
        {/* Slide 1 — Hero image, object-cover fills the screen */}
        <div className="flex-[0_0_100%] min-w-0 relative h-full">
          <img
            className="w-full h-full object-cover object-center"
            src={slide}
            alt="Mr. Squash Promotion"
          />
          {/* subtle bottom fade so dots stay readable */}
          {/* FIXED: Changed bg-gradient-to-t to bg-linear-to-t */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Slide 2 — Farm to Table */}
        <div className="flex-[0_0_100%] min-w-0 relative h-full bg-green-700 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="text-green-200 text-sm font-bold tracking-[0.25em] uppercase">
            Fresh & Local
          </span>
          <h2 className="text-white text-6xl md:text-8xl font-black leading-none">
            Farm to Table
            <br />
            Produce
          </h2>
          <p className="text-green-100 text-lg md:text-xl max-w-md mt-2">
            Sourced fresh every morning from local farms.
          </p>
          {/* FIXED: Changed bg-gradient-to-t to bg-linear-to-t */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Slide 3 — Weekly Deals */}
        <div className="flex-[0_0_100%] min-w-0 relative h-full bg-[#c45e0a] flex flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="text-orange-200 text-sm font-bold tracking-[0.25em] uppercase">
            Limited Time
          </span>
          <h2 className="text-white text-6xl md:text-8xl font-black leading-none">
            Weekly
            <br />
            Special Deals!
          </h2>
          <p className="text-orange-100 text-lg md:text-xl max-w-md mt-2">
            New deals every week — don't miss out.
          </p>
          {/* FIXED: Changed bg-gradient-to-t to bg-linear-to-t */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Dot / pill indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-300 
              ${
                selectedIndex === i
                  ? "w-8 h-3 bg-white"
                  : "w-3 h-3 bg-white/50 hover:bg-white/75"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export default AutoCarousel;
