import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 400, damping: 28 });
  const ringY = useSpring(cursorY, { stiffness: 400, damping: 28 });
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, .project-card, .skill-card, .education-card, .cert-card");
      setIsHovered(!!target);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        style={{ left: cursorX, top: cursorY }}
      />
      <motion.div
        className={`custom-cursor-ring ${isHovered ? "active" : ""}`}
        style={{ left: ringX, top: ringY }}
      />
    </>
  );
}
