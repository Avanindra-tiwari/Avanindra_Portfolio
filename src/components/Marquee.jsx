import React from "react";

const ITEMS = [
  "BUILD", "ANALYZE", "LEARN", "CREATE",
  "DESIGN", "CODE", "EXPLORE", "DEVELOP",
  "BUILD", "ANALYZE", "LEARN", "CREATE",
  "DESIGN", "CODE", "EXPLORE", "DEVELOP",
];

export default function Marquee() {
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((set) => (
          <div key={set} className="marquee-content">
            {ITEMS.map((item, i) => (
              <span key={i} className="marquee-item">
                {item} <span className="marquee-dot">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
