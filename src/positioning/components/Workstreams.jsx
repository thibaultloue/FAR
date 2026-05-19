import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe";

const streams = [
  {
    n: "01",
    title: "Clarifier",
    desc: "Positionnement, valeurs, ambitions, ligne éditoriale, priorités.",
  },
  {
    n: "02",
    title: "Structurer",
    desc: "Administratif, juridique, fiscal, comptable, recrutement, process, outils, data.",
  },
  {
    n: "03",
    title: "Développer",
    desc: "Collaborations, ambassades, formats, produits propriétaires, marques propres, actifs, acquisitions, participations.",
  },
  {
    n: "04",
    title: "Protéger",
    desc: "Cohérence éditoriale, image, droits, arbitrages, choix des bonnes opportunités.",
  },
];

const outcomes = [
  { who: "Talent", text: "grandir sans se disperser." },
  { who: "Marque", text: "trouver un rôle juste dans un univers clair." },
  {
    who: "Audience",
    text: "comprendre naturellement pourquoi le projet existe.",
  },
];

export function Workstreams() {
  const { variants, transition } = useMotionSafe();
  const item = variants({
    hidden: { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0 },
  });
  const container = variants({
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  });

  return (
    <motion.div className="flex min-h-0 flex-1 flex-col gap-5">
      <motion.div
        className="grid grid-cols-1 gap-3 md:grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {streams.map((s) => (
          <motion.div
            key={s.n}
            variants={item}
            transition={transition({ duration: 0.4 })}
            className="rounded-xl border border-far-line bg-far-off/60 p-4 md:p-5"
          >
            <span className="font-display text-xs font-bold tracking-widest text-far-yellow">
              {s.n}
            </span>
            <p className="mt-2 font-display text-lg font-bold text-far-white">
              {s.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-far-muted">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid gap-2 border-t border-far-line pt-4 sm:grid-cols-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={transition({ delay: 0.5, duration: 0.45 })}
      >
        {outcomes.map((o) => (
          <p key={o.who} className="text-sm text-far-muted">
            <span className="font-display font-semibold text-far-white">
              {o.who}
            </span>
            {" — "}
            {o.text}
          </p>
        ))}
      </motion.div>
    </motion.div>
  );
}
