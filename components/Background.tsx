// Ambient pixelscape background — dystopian decayed city by SILHOUETTE & LIGHT.
// Fully isolated & reversible: flip SHOW_BACKGROUND to false in layout to remove
// it with zero footprint. Everything (markup + CSS) lives in this one file.
//
// Constraints honored:
// - Only transform/opacity animated (GPU compositable, no reflow, no canvas).
// - prefers-reduced-motion: animations off, scene frozen but visible.
// - Palette: only existing @theme tokens (var(--color-*)) + darker warm-dark
//   shades of the same base hue for silhouettes. Zero new hues.
// - Sits behind content (fixed, z-[-1]), pointer-events:none, purely ambient.
// - Self-contained SVG/CSS — no external resources (CSP default-src 'self' safe).

// Silhouette shades: darker warm-dark of the SAME base (#171510), not new hues.
const FAR = "#1c1913"; // hazy distant layer, lifted slightly by atmosphere
const NEAR = "#0d0b08"; // solid foreground silhouette, below base

// Lit windows: sparse, amber. [x, y, w, h, flicker?]
const WINDOWS: [number, number, number, number, boolean][] = [
  [232, 150, 7, 10, false],
  [246, 172, 7, 10, true],
  [498, 168, 8, 11, false],
  [516, 190, 8, 11, true],
  [504, 222, 8, 11, false],
  [712, 176, 7, 10, false],
  [726, 200, 7, 10, true],
  [942, 138, 7, 10, false],
  [1128, 168, 8, 11, false],
  [1210, 200, 8, 11, true],
];

// Floating embers/dust: [leftVw, bottomStart%, size, delay s, dur s, mobileHide]
const PARTICLES: [number, number, number, number, number, boolean][] = [
  [12, 8, 2, 0, 22, false],
  [28, 4, 3, 6, 26, true],
  [46, 12, 2, 12, 20, false],
  [63, 6, 2, 3, 28, true],
  [78, 10, 3, 9, 24, false],
  [90, 3, 2, 15, 30, true],
];

export default function Background() {
  return (
    <div aria-hidden className="pxbg">
      {/* amber horizon glow — opacity breathe only */}
      <div className="pxbg-glow" />

      {/* far skyline — subtle parallax drift */}
      <svg
        className="pxbg-far"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        fill={FAR}
      >
        <rect x="0" y="120" width="90" height="100" />
        <rect x="90" y="150" width="70" height="70" />
        <rect x="160" y="90" width="60" height="130" />
        <rect x="220" y="140" width="110" height="80" />
        <rect x="330" y="110" width="80" height="110" />
        <rect x="410" y="160" width="120" height="60" />
        <rect x="530" y="100" width="70" height="120" />
        <rect x="600" y="145" width="140" height="75" />
        <rect x="740" y="115" width="90" height="105" />
        <rect x="830" y="155" width="110" height="65" />
        <rect x="940" y="95" width="70" height="125" />
        <rect x="1010" y="135" width="130" height="85" />
        <rect x="1140" y="120" width="90" height="100" />
        <rect x="1230" y="150" width="120" height="70" />
        <rect x="1350" y="110" width="90" height="110" />
      </svg>

      {/* near skyline — stronger parallax, carries windows + signal elements */}
      <svg
        className="pxbg-near"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <g fill={NEAR}>
          <rect x="0" y="160" width="120" height="160" />
          <rect x="120" y="210" width="90" height="110" />
          <rect x="210" y="120" width="70" height="200" />
          <rect x="280" y="180" width="110" height="140" />
          <rect x="390" y="230" width="60" height="90" />
          {/* antenna building — normal roofline + a thin mast rising above it */}
          <rect x="450" y="150" width="140" height="170" />
          <rect x="517" y="42" width="5" height="108" />
          {/* broken / jagged-top structure */}
          <rect x="670" y="150" width="100" height="170" />
          <rect x="670" y="150" width="55" height="14" />
          <rect x="742" y="138" width="28" height="26" />
          <rect x="590" y="190" width="80" height="130" />
          <rect x="770" y="170" width="130" height="150" />
          <rect x="900" y="110" width="70" height="210" />
          <rect x="970" y="190" width="120" height="130" />
          <rect x="1090" y="145" width="90" height="175" />
          <rect x="1180" y="175" width="160" height="145" />
          <rect x="1340" y="130" width="100" height="190" />
        </g>

        {/* antenna beacon — amber, slow blink */}
        <rect
          className="pxbg-beacon"
          x="513"
          y="30"
          width="9"
          height="9"
          fill="var(--color-accent)"
        />

        {/* lit windows */}
        <g fill="var(--color-accent)">
          {WINDOWS.map(([x, y, w, h, flick], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              className={flick ? "pxbg-win pxbg-flicker" : "pxbg-win"}
              style={{ animationDelay: `${(i % 5) * 1.7}s` }}
            />
          ))}
        </g>
      </svg>

      {/* embers/dust — slow float, transform+opacity only */}
      {PARTICLES.map(([left, bottom, size, delay, dur, mHide], i) => (
        <span
          key={i}
          className={mHide ? "pxbg-p pxbg-p-m" : "pxbg-p"}
          style={{
            left: `${left}vw`,
            bottom: `${bottom}vh`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${dur}s`,
          }}
        />
      ))}

      <style>{`
        .pxbg {
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }
        /* amber glow hugging the horizon, desaturated & low */
        .pxbg-glow {
          position: absolute;
          left: -10%;
          right: -10%;
          bottom: 0;
          height: 34vh;
          background: radial-gradient(
            120% 100% at 50% 100%,
            color-mix(in oklab, var(--color-accent) 55%, transparent) 0%,
            color-mix(in oklab, var(--color-accent) 22%, transparent) 32%,
            transparent 70%
          );
          opacity: 0.16;
          animation: pxbg-breathe 14s ease-in-out infinite;
        }
        .pxbg-far {
          position: absolute;
          left: -3%;
          bottom: 0;
          width: 106%;
          height: 15vh;
          opacity: 0.45;
          animation: pxbg-drift-a 40s ease-in-out infinite;
        }
        .pxbg-near {
          position: absolute;
          left: -3%;
          bottom: 0;
          width: 106%;
          height: 21vh;
          opacity: 0.82;
          animation: pxbg-drift-b 34s ease-in-out infinite;
        }
        .pxbg-win { opacity: 0.75; }
        .pxbg-flicker { animation: pxbg-flicker 7s ease-in-out infinite; }
        .pxbg-beacon { opacity: 0.5; animation: pxbg-beacon 4.5s ease-in-out infinite; }
        .pxbg-p {
          position: absolute;
          border-radius: 50%;
          background: color-mix(in oklab, var(--color-accent) 70%, var(--color-fg));
          opacity: 0.4;
          animation-name: pxbg-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes pxbg-breathe { 0%,100% { opacity: 0.12; } 50% { opacity: 0.22; } }
        @keyframes pxbg-drift-a { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-14px); } }
        @keyframes pxbg-drift-b { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-24px); } }
        @keyframes pxbg-flicker { 0%,100% { opacity: 0.85; } 40% { opacity: 0.4; } 55% { opacity: 0.8; } 72% { opacity: 0.3; } }
        @keyframes pxbg-beacon { 0%,100% { opacity: 0.12; } 50% { opacity: 0.7; } }
        @keyframes pxbg-float {
          0% { transform: translate(0, 0); opacity: 0; }
          15% { opacity: 0.5; }
          85% { opacity: 0.35; }
          100% { transform: translate(12px, -70px); opacity: 0; }
        }

        /* quieter on mobile: drop half the embers, calm the glow */
        @media (max-width: 640px) {
          .pxbg-p-m { display: none; }
          .pxbg-glow { height: 30vh; opacity: 0.12; }
          .pxbg-far { height: 12vh; opacity: 0.35; }
          .pxbg-near { height: 16vh; opacity: 0.72; }
        }

        /* accessibility: freeze everything, scene stays visible but still */
        @media (prefers-reduced-motion: reduce) {
          .pxbg-glow, .pxbg-far, .pxbg-near,
          .pxbg-flicker, .pxbg-beacon, .pxbg-p {
            animation: none !important;
          }
          /* give frozen embers a resting visibility (float keyframe ends at 0) */
          .pxbg-p { opacity: 0.32; }
        }
      `}</style>
    </div>
  );
}
