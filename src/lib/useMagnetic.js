import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * useMagnetic — attaches elastic GSAP magnetic pull to an element.
 * @param {number} strength  - how far the element follows the cursor (default 60)
 * @param {number} textStrength - inner text follows slightly less (default 40)
 * @returns ref to attach to the wrapper element
 */
export function useMagnetic(strength = 60, textStrength = 40) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth < 768) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const onMove = (e) => {
      const { width, height, left, top } = el.getBoundingClientRect();
      const newX = ((e.clientX - left) / width - 0.5) * strength;
      const newY = ((e.clientY - top) / height - 0.5) * textStrength;
      xTo(newX);
      yTo(newY);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, textStrength]);

  return ref;
}
