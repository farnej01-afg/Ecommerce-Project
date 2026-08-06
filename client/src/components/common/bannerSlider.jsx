import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBanners } from "@/hooks/useBanner";

const AUTO_SLIDE_MS = 3500;
const SWIPE_THRESHOLD = 50;

const BannerSlider = () => {
  const { data: banners, isLoading, isError } = useBanners();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);

  const goToNext = useCallback(() => {
    if (!banners?.length) return;
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners]);

  const goToPrev = useCallback(() => {
    if (!banners?.length) return;
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners]);

  const resetInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goToNext, AUTO_SLIDE_MS);
  }, [goToNext]);

  useEffect(() => {
    if (!banners?.length) return;
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [banners, resetInterval]);

  const handlePrevClick = () => {
    goToPrev();
    resetInterval();
  };

  const handleNextClick = () => {
    goToNext();
    resetInterval();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX.current;

    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) {
        goToNext();
      } else {
        goToPrev();
      }
      resetInterval();
    }

    touchStartX.current = null;
  };

  if (isLoading) {
    return (
      <div className="h-100 w-full animate-pulse bg-gray-200 rounded-xl" />
    );
  }

  if (isError || !banners?.length) {
    return null;
  }

  const banner = banners[current];

  return (
    <div
      className="relative w-full h-50 md:h-100  overflow-hidden rounded-xl touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={banner.image.url}
        alt={banner.title || "Banner"}
        className="w-full h-full object-cover"
        draggable={false}
      />

      <div className="absolute bottom-5 left-0 flex flex-col justify-center items-start px-5">
        <a
          href={banner.ctaLink}
          className="bg-white text-black font-semibold px-3 py-2 text-sm md:px-6 md:py-3 rounded-lg hover:bg-gray-100 transition"
        >
          {banner.ctaText}
        </a>
      </div>

      <button
        onClick={handlePrevClick}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNextClick}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default BannerSlider;
