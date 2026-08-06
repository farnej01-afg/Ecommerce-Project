import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import ProductCard from "./ProductCard";
/**
 * ProductShowcaseSlider
 * ---------------------------------------------------------------------------
 * Slider engine only — auto-advance every 1.5s, seamless infinite loop,
 * mouse drag + touch swipe, keyboard nav, pause-on-hover/focus/drag.
 *
 * No demo data, no card component wired in. Pass your real `products` array
 * as a prop and render your own card inside the marked TODO below.
 * ---------------------------------------------------------------------------
 */

// ----------------------------------------------------------------------------
// Responsive "cards visible" hook — tracks Tailwind-equivalent breakpoints.
// ----------------------------------------------------------------------------
function useVisibleCount() {
  const getCount = () => {
    if (typeof window === "undefined") return 4;
    const w = window.innerWidth;
    if (w < 640) return 1; // mobile
    if (w < 1024) return 2; // tablet
    if (w < 1280) return 3; // laptop
    return 4; // desktop
  };

  const [count, setCount] = useState(getCount);

  useEffect(() => {
    let frame;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCount(getCount()));
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return count;
}

// ----------------------------------------------------------------------------
// Main Slider
// ----------------------------------------------------------------------------
export default function ProductShowcaseSlider({
  products,
  autoScrollMs = 10000000,
}) {
  const visibleCount = useVisibleCount();
  const widthPercent = 100 / visibleCount;

  // Clone `visibleCount` items from each edge so the track can loop seamlessly.
  // Real index in `products` = (trackIndex - visibleCount + products.length) % products.length
  const extended = useMemo(() => {
    if (!products || products.length === 0) return [];
    const head = products.slice(-visibleCount);
    const tail = products.slice(0, visibleCount);
    return [...head, ...products, ...tail];
  }, [products, visibleCount]);

  // trackIndex starts at `visibleCount` — i.e. the first real (non-cloned) slide.
  const [trackIndex, setTrackIndex] = useState(visibleCount);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const dragState = useRef({ startX: 0, deltaX: 0, dragging: false });
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Re-anchor trackIndex to a valid position whenever visibleCount changes
  // (e.g. resizing from desktop to mobile changes the clone offset).
  useEffect(() => {
    setIsAnimating(false);
    setTrackIndex(visibleCount);
  }, [visibleCount]);

  // -----------------------------
  // Advance one slide (left -> right visual motion = index increases)
  // -----------------------------
  const goNext = useCallback(() => {
    setIsAnimating(true);
    setTrackIndex((i) => i + 1);
  }, []);

  const goPrev = useCallback(() => {
    setIsAnimating(true);
    setTrackIndex((i) => i - 1);
  }, []);

  // -----------------------------
  // Auto-scroll timer
  // -----------------------------
  useEffect(() => {
    if (isPaused || !products || products.length === 0) return undefined;
    timerRef.current = setInterval(goNext, autoScrollMs);
    return () => clearInterval(timerRef.current);
  }, [isPaused, goNext, autoScrollMs, products]);

  // -----------------------------
  // Seamless loop: when we transition past a cloned edge, silently jump
  // back to the equivalent real slide with no animation (invisible to user).
  // -----------------------------
  const handleTransitionEnd = () => {
    if (!products || products.length === 0) return;
    const total = products.length;
    if (trackIndex >= total + visibleCount) {
      setIsAnimating(false);
      setTrackIndex(trackIndex - total);
    } else if (trackIndex < visibleCount) {
      setIsAnimating(false);
      setTrackIndex(trackIndex + total);
    }
  };

  // Restore animation on the next frame after a silent jump.
  useEffect(() => {
    if (!isAnimating) {
      const id = requestAnimationFrame(() => setIsAnimating(true));
      return () => cancelAnimationFrame(id);
    }
  }, [isAnimating]);

  // -----------------------------
  // Drag / swipe handlers (mouse + touch unified)
  // -----------------------------
  const onDragStart = (clientX) => {
    dragState.current = { startX: clientX, deltaX: 0, dragging: true };
    setIsPaused(true);
    setIsAnimating(false);
  };

  const onDragMove = (clientX) => {
    if (!dragState.current.dragging) return;
    dragState.current.deltaX = clientX - dragState.current.startX;
    if (trackRef.current) {
      const slideWidthPercent = 100 / extended.length;
      const dragPercent =
        (dragState.current.deltaX / (containerRef.current?.offsetWidth || 1)) *
        100;
      trackRef.current.style.transform = `translateX(calc(-${
        trackIndex * slideWidthPercent
      }% + ${dragPercent}%))`;
    }
  };

  const onDragEnd = () => {
    if (!dragState.current.dragging) return;
    const { deltaX } = dragState.current;
    const threshold = 60; // px swipe distance to trigger a slide change
    setIsAnimating(true);
    if (trackRef.current) trackRef.current.style.transform = "";

    if (deltaX > threshold) {
      goPrev();
    } else if (deltaX < -threshold) {
      goNext();
    }
    dragState.current.dragging = false;
    setIsPaused(false);
  };

  // Mouse events
  const onMouseDown = (e) => onDragStart(e.clientX);
  const onMouseMove = (e) => onDragMove(e.clientX);
  const onMouseUp = () => onDragEnd();
  const onMouseLeaveTrack = () => {
    if (dragState.current.dragging) onDragEnd();
  };

  // Touch events
  const onTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const onTouchMove = (e) => onDragMove(e.touches[0].clientX);
  const onTouchEnd = () => onDragEnd();

  // -----------------------------
  // Keyboard navigation
  // -----------------------------
  const onKeyDown = (e) => {
    if (!products || products.length === 0) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "Home") {
      e.preventDefault();
      setIsAnimating(true);
      setTrackIndex(visibleCount);
    } else if (e.key === "End") {
      e.preventDefault();
      setIsAnimating(true);
      setTrackIndex(visibleCount + products.length - 1);
    }
  };

  const slideWidthPercent = extended.length > 0 ? 100 / extended.length : 0;
  const trackWidthPercent = extended.length * widthPercent;

  return (
    <section aria-label="Featured products" className="relative w-full py-10">
      {/* Ambient glass glow blobs behind the slider for extra depth */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          onMouseLeaveTrack();
        }}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="
          relative mx-auto max-w-7xl select-none overflow-hidden
          rounded-[2rem] border border-white/10 <bg-white />
          <3></3>
          px-2 py-6 backdrop-blur-2xl
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
          cursor-grab active:cursor-grabbing
        "
      >
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          className="flex items-stretch"
          style={{
            width: `${trackWidthPercent}%`,
            transform: `translateX(-${trackIndex * slideWidthPercent}%)`,
            transition: isAnimating
              ? "transform 500ms cubic-bezier(0.22,1,0.36,1)"
              : "none",
          }}
        >
          {extended.map((product, i) => (
            <div
              key={`${product._id}-${i}`}
              className="shrink-0 px-3"
              style={{ width: `${widthPercent}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next controls */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous product"
        className="
          absolute left-2 top-1/2 z-30 hidden -translate-y-1/2 sm:flex
          h-11 w-11 items-center justify-center rounded-full
          border border-white/20 bg-white/10 text-white backdrop-blur-xl
          transition-all duration-300 hover:bg-white/20 hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next product"
        className="
          absolute right-2 top-1/2 z-30 hidden -translate-y-1/2 sm:flex
          h-11 w-11 items-center justify-center rounded-full
          border border-white/20 bg-white/10 text-white backdrop-blur-xl
          transition-all duration-300 hover:bg-white/20 hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      {products && products.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {products.map((_, i) => {
            const realIndex =
              (((trackIndex - visibleCount) % products.length) +
                products.length) %
              products.length;
            const active = i === realIndex;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to product ${i + 1}`}
                aria-current={active}
                onClick={() => {
                  setIsAnimating(true);
                  setTrackIndex(visibleCount + i);
                }}
                className={`
                  h-1.5 rounded-full transition-all duration-300
                  ${active ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"}
                `}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
