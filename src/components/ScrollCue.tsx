"use client";

export default function ScrollCue() {
  return (
    <div className="scroll-cue">
      {/* Mouse */}
      <div className="scroll-cue__mouse">
        <div className="scroll-cue__dot" />
      </div>

      {/* Glow ring */}
      <div className="scroll-cue__glow" />

      {/* NEW: Unique bottom content */}
      <div className="scroll-cue__label -translate-x-10">
        <span className="scroll-cue__text">Scroll Down</span>
        <span className="scroll-cue__line" />
      </div>
    </div>
  );
}
