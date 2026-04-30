"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop || window.scrollY) / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("lenis:scroll" as any, onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("lenis:scroll" as any, onScroll);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[9997] h-[2px] origin-left bg-gradient-to-r from-truth-gold via-truth-ember to-truth-gold"
      style={{ transform: `scaleX(${p})`, width: "100%" }}
    />
  );
}
