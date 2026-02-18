"use client";

import React from "react";
import Image from "next/image";

export default function MarqueeStrip({ speedSeconds = 160 }: { speedSeconds?: number }) {
  const repeats = 5;

  return (
    <div className="marquee-strip">
      <div className="marquee-strip__panel">
        <div className="marquee-strip__wrap">
          <div
            className="marquee-strip__track"
            style={{ ["--marquee-duration" as any]: `${speedSeconds}s` } as React.CSSProperties}
          >
            {/* Track A */}
            <div className="marquee-strip__row">
              {Array.from({ length: repeats }).map((_, i) => (
                <React.Fragment key={`a-${i}`}>
                  <MarqueeItem type="design" icon="/icons/design.svg" text="Design" />
                  <MarqueeItem type="develop" icon="/icons/develop.svg" text="Develop" />
                  <MarqueeItem type="deploy" icon="/icons/deploy.svg" text="Deploy" />

                  <span className="marquee-divider" />

                  <MarqueeItem type="code" icon="/icons/code.svg" text="Code" />
                  <MarqueeItem type="cloud" icon="/icons/cloud.svg" text="Cloud" />
                  <MarqueeItem type="creativity" icon="/icons/creativity.svg" text="Creativity" />
                </React.Fragment>
              ))}
            </div>

            {/* Track B */}
            <div className="marquee-strip__row" aria-hidden="true">
              {Array.from({ length: repeats }).map((_, i) => (
                <React.Fragment key={`b-${i}`}>
                  <MarqueeItem type="design" icon="/icons/design.svg" text="Design" />
                  <MarqueeItem type="develop" icon="/icons/develop.svg" text="Develop" />
                  <MarqueeItem type="deploy" icon="/icons/deploy.svg" text="Deploy" />

                  <span className="marquee-divider" />

                  <MarqueeItem type="code" icon="/icons/code.svg" text="Code" />
                  <MarqueeItem type="cloud" icon="/icons/cloud.svg" text="Cloud" />
                  <MarqueeItem type="creativity" icon="/icons/creativity.svg" text="Creativity" />
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="marquee-strip__fade-left" />
          <div className="marquee-strip__fade-right" />
        </div>
      </div>
    </div>
  );
}

function MarqueeItem({ type, icon, text }: { type: string; icon: string; text: string }) {
  return (
    <span className="marquee-item" data-type={type}>
      <Image src={icon} alt={text} width={28} height={28} className="marquee-icon" />
      <span className="marquee-strip__text">{text}</span>
    </span>
  );
}
