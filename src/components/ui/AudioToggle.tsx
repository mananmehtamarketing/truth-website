"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Floating ambient audio toggle.
 *
 * Browsers block autoplay-with-sound until the user interacts with the page,
 * so we never auto-play. We render a small floating gold button bottom-right.
 * Tap once to start, tap again to pause. State persists in localStorage so
 * returning visitors don't have to re-enable.
 *
 * Drop your ambient track at `/public/audio/ambient.mp3` and the toggle will
 * use it. Use a soft, atmospheric loop (~30s+) to match the underground bar mood.
 */
const SRC = "/audio/ambient.mp3";
const STORAGE_KEY = "truth_audio_on";

export default function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Check if the audio file actually exists at the URL before showing the toggle
  useEffect(() => {
    let cancelled = false;
    fetch(SRC, { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setAvailable(r.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Lazily create the Audio element when first toggled
  const ensureAudio = () => {
    if (!audioRef.current) {
      const a = new Audio(SRC);
      a.loop = true;
      a.volume = 0.45;
      audioRef.current = a;
    }
    return audioRef.current;
  };

  // Restore previous preference (only auto-play if user previously enabled it)
  useEffect(() => {
    if (!available) return;
    const prev = localStorage.getItem(STORAGE_KEY);
    if (prev === "1") {
      // Wait for first user interaction to honor browser autoplay rules
      const start = () => {
        const a = ensureAudio();
        a.play()
          .then(() => setPlaying(true))
          .catch(() => {});
        window.removeEventListener("pointerdown", start);
      };
      window.addEventListener("pointerdown", start, { once: true });
      return () => window.removeEventListener("pointerdown", start);
    }
  }, [available]);

  const toggle = () => {
    const a = ensureAudio();
    if (a.paused) {
      a.play()
        .then(() => {
          setPlaying(true);
          localStorage.setItem(STORAGE_KEY, "1");
        })
        .catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, "0");
    }
  };

  if (!available) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute ambient audio" : "Play ambient audio"}
      data-magnetic
      className="fixed bottom-5 right-5 z-[80] grid h-12 w-12 place-items-center rounded-full border border-truth-gold/40 bg-truth-black/70 text-truth-gold backdrop-blur-md transition-all hover:border-truth-gold hover:bg-truth-black/90 md:bottom-7 md:right-7 md:h-14 md:w-14"
      style={{ boxShadow: "0 0 24px rgba(201,169,107,0.18)" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {playing ? (
          <motion.svg
            key="on"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M5 8 H 8 L 12 4 V 18 L 8 14 H 5 Z" />
            <path d="M15 7 C 17 9, 17 13, 15 15" />
            <path d="M17 5 C 20 8, 20 14, 17 17" />
          </motion.svg>
        ) : (
          <motion.svg
            key="off"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M5 8 H 8 L 12 4 V 18 L 8 14 H 5 Z" />
            <path d="M15 8 L 20 14 M 20 8 L 15 14" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
