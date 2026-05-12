

export default function ScrollCue() {
  return (
    <>
      <style>{`
        /* ── wrapper ─────────────────────────────────── */
        .sc {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: fit-content;
          margin: 0 auto;           /* always centred, no translate hack */
        }

        /* ── mouse shell ─────────────────────────────── */
        .sc-mouse {
          width: 26px;
          height: 40px;
          border-radius: 13px;
          border: 2px solid rgba(255,255,255,0.35);
          position: relative;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }

        /* ── scroll dot — bounces inside the mouse ───── */
        .sc-dot {
          width: 4px;
          height: 7px;
          border-radius: 2px;
          background: rgb(45 212 191);   /* teal-400 */
          animation: sc-bounce 1.6s ease-in-out infinite;
        }

        @keyframes sc-bounce {
          0%, 100% { transform: translateY(0);   opacity: 1;   }
          50%       { transform: translateY(10px); opacity: 0.4; }
        }

        /* ── glow ring behind the mouse ──────────────── */
        .sc-glow {
          position: absolute;
          width: 44px;
          height: 58px;
          border-radius: 22px;
          background: radial-gradient(
            circle,
            rgba(45,212,191,0.18) 0%,
            rgba(99,102,241,0.10) 50%,
            transparent 70%
          );
          top: -7px;
          left: -9px;
          pointer-events: none;
          animation: sc-pulse 2.4s ease-in-out infinite;
        }

        @keyframes sc-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1);    }
          50%       { opacity: 1;   transform: scale(1.12); }
        }

        /* ── label row ───────────────────────────────── */
        .sc-label {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sc-text {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.40);
          white-space: nowrap;
        }

        .sc-line {
          display: block;
          width: 28px;
          height: 1px;
          background: linear-gradient(
            to right,
            rgba(45,212,191,0.6),
            rgba(99,102,241,0.3)
          );
        }

        /* ── reduced motion: keep visible, stop moving ── */
        @media (prefers-reduced-motion: reduce) {
          .sc-dot, .sc-glow { animation: none; }
        }
      `}</style>

      {/* aria-hidden — purely decorative scroll indicator */}
      <div className="sc" aria-hidden="true">
        {/* Mouse shell */}
        <div className="sc-mouse" style={{ position: "relative" }}>
          <div className="sc-glow" />
          <div className="sc-dot" />
        </div>

        {/* Label */}
        <div className="sc-label">
          <span className="sc-text">Scroll Down</span>
          <span className="sc-line" />
        </div>
      </div>
    </>
  );
}
