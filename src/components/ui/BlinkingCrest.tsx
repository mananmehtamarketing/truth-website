"use client";

/**
 * Truth crest with a blinking Eye of Ra at the center.
 *
 * Layered SVG:
 *   - Bottom: ornate gold frame (rays + ring)
 *   - Middle: eye shape (almond + iris + pupil)
 *   - Top: animated lid that blinks via CSS keyframes
 *
 * The keyframes are inlined as a <style> block in the SVG so the
 * blink runs purely on CSS without prop wiring.
 */
type Props = {
  size?: number;
  className?: string;
};

export default function BlinkingCrest({ size = 64, className = "" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`text-truth-gold ${className}`}
      style={{ filter: "drop-shadow(0 0 14px rgba(201,169,107,0.4))" }}
      aria-hidden
    >
      <defs>
        <radialGradient id="crestGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5d999" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#c9a96b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5a3f17" stopOpacity="0" />
        </radialGradient>
      </defs>

      <style>{`
        @keyframes truthBlink {
          0%, 92%, 100% { transform: scaleY(0); }
          94%, 98%      { transform: scaleY(1); }
        }
        .truth-lid-top {
          transform-origin: 60px 60px;
          transform-box: fill-box;
          animation: truthBlink 5.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .truth-lid-bot {
          transform-origin: 60px 60px;
          transform-box: fill-box;
          animation: truthBlink 5.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes truthIris {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-2px); }
          75%      { transform: translateX(2px); }
        }
        .truth-iris-group {
          animation: truthIris 9s ease-in-out infinite;
          transform-origin: 60px 60px;
          transform-box: fill-box;
        }
      `}</style>

      {/* Outer ring */}
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.85"
      />
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.6"
      />

      {/* Sun rays — short ticks around the ring */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.7">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r1 = 49;
          const r2 = 53;
          const x1 = 60 + Math.cos(a) * r1;
          const y1 = 60 + Math.sin(a) * r1;
          const x2 = 60 + Math.cos(a) * r2;
          const y2 = 60 + Math.sin(a) * r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* Triangle / pyramid above the eye */}
      <path
        d="M 60 22 L 84 56 L 36 56 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Glow behind the iris */}
      <circle cx="60" cy="60" r="20" fill="url(#crestGlow)" />

      {/* Eye almond outline */}
      <path
        d="M 28 60 C 40 46, 80 46, 92 60 C 80 74, 40 74, 28 60 Z"
        fill="#0a0606"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Iris + pupil — slight side-to-side drift */}
      <g className="truth-iris-group">
        <circle cx="60" cy="60" r="9" fill="currentColor" />
        <circle cx="60" cy="60" r="3.5" fill="#0a0606" />
        <circle cx="58" cy="58" r="1.2" fill="#fff8e7" opacity="0.85" />
      </g>

      {/* Eyelids — top and bottom rectangles that scale-Y to close */}
      <g>
        {/* Each lid is a rect inside a clipPath shaped like the eye almond */}
        <clipPath id="eyeClip">
          <path d="M 28 60 C 40 46, 80 46, 92 60 C 80 74, 40 74, 28 60 Z" />
        </clipPath>

        <g clipPath="url(#eyeClip)">
          <rect
            x="28"
            y="46"
            width="64"
            height="14"
            fill="#0a0606"
            className="truth-lid-top"
          />
          <rect
            x="28"
            y="60"
            width="64"
            height="14"
            fill="#0a0606"
            className="truth-lid-bot"
          />
          {/* Gold lid edges */}
          <line
            x1="28"
            y1="60"
            x2="92"
            y2="60"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.6"
          />
        </g>
      </g>

      {/* Tear-stroke under the eye (Eye of Ra signature) */}
      <path
        d="M 52 73 L 48 86 M 68 73 C 74 80, 80 84, 90 86"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
