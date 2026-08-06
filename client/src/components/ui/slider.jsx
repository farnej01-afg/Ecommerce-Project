import React, { useState, useEffect } from "react";

// ---- Typewriter timing ----
const TYPE_SPEED = 40;        // ms per character typed
const GAP_BETWEEN_LINES = 200; // ms pause before starting the next line
const HOLD_AFTER_LAST = 500;   // ms pause after the last line finishes, before swipe
const SWIPE_DURATION = 1400;   // ms for the slowest curtain layer to exit

// Types each word onto its own line, keeping earlier lines visible.
function useMultiLineTypewriter(words) {
  const [lines, setLines] = useState(() => words.map(() => ""));
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const currentWord = words[lineIndex];
    const currentText = lines[lineIndex];
    let timer;

    if (currentText.length < currentWord.length) {
      timer = setTimeout(() => {
        setLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentWord.slice(0, currentText.length + 1);
          return next;
        });
      }, TYPE_SPEED);
    } else if (lineIndex < words.length - 1) {
      timer = setTimeout(() => setLineIndex((i) => i + 1), GAP_BETWEEN_LINES);
    } else {
      timer = setTimeout(() => setDone(true), HOLD_AFTER_LAST);
    }

    return () => clearTimeout(timer);
  }, [lines, lineIndex, words, done]);

  return { lines, activeLine: lineIndex, done };
}

export default function PageTransition({
  words = ["Barati", "Carpets"],
  onComplete,
}) {
  const { lines, activeLine, done } = useMultiLineTypewriter(words);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Once typing is done, swipe the curtains away
  useEffect(() => {
    if (!done) return;
    setIsSwiping(true);
    const unmountTimer = setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, SWIPE_DURATION);
    return () => clearTimeout(unmountTimer);
  }, [done]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black select-none font-sans">
      {/* Hero words, typed line by line */}
      <div
        className={`absolute inset-0 z-40 flex flex-col items-center justify-center gap-1 transition-all duration-300 ease-out
          ${isSwiping ? "opacity-0 scale-95 -translate-y-8" : "opacity-100"}`}
      >
        {words.map((word, i) => (
          <h1
            key={i}
            className="font-bold text-6xl md:text-7xl text-center leading-tight text-white"
          >
            {lines[i]}
            {i === activeLine && !done && (
              <span className="inline-block w-0.75 md:w-1 h-[0.9em] ml-1 align-middle bg-white animate-pulse" />
            )}
          </h1>
        ))}
      </div>

      {/* Curtain layer 1 — exits first */}
      <div
        className={`absolute inset-0 z-30 bg-neutral-900 border-b border-neutral-800
          transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]
          ${isSwiping ? "-translate-y-full duration-1000" : "translate-y-0"}`}
      />

      {/* Curtain layer 2 — exits mid */}
      <div
        className={`absolute inset-0 z-20 bg-neutral-950 border-b border-neutral-900
          transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]
          ${isSwiping ? "-translate-y-full duration-1200" : "translate-y-0"}`}
      />

      {/* Curtain layer 3 — exits last, reveals the page */}
      <div
        className={`absolute inset-0 z-10 bg-black
          transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]
          ${isSwiping ? "-translate-y-full duration-1400" : "translate-y-0"}`}
      />
    </div>
  );
}