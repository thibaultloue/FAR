import { useReducedMotion } from "framer-motion";

const instant = { duration: 0 };

export function useMotionSafe() {
  const reduced = useReducedMotion() ?? false;

  const transition = (t) => (reduced ? instant : t);

  const variants = (v) => {
    if (!reduced) return v;
    const out = {};
    for (const [key, val] of Object.entries(v)) {
      if (typeof val === "object" && val !== null && !Array.isArray(val)) {
        out[key] = { ...val, transition: instant };
      } else {
        out[key] = val;
      }
    }
    return out;
  };

  return { reduced, transition, variants };
}
