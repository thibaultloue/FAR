import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe";

const pillars = [
  {
    name: "Vision",
    q: "Est-ce que ça construit aujourd'hui en pensant à demain ?",
  },
  {
    name: "Sérénité",
    q: "Est-ce que le cadre est fluide, clair et sur-mesure ?",
  },
  {
    name: "Structure",
    q: "Est-ce que ça simplifie, automatise ou clarifie quelque chose ?",
  },
  {
    name: "Ambition",
    q: "Est-ce que l'idée mérite plus qu'une simple prise de parole ?",
  },
  {
    name: "Opportunité",
    q: "Est-ce que ça fait émerger un projet durable ?",
  },
];

export function PillarGrid() {
  const { variants, transition } = useMotionSafe();
  const item = variants({
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  });
  const container = variants({
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  });

  return (
    <motion.div className="flex min-h-0 flex-1 flex-col gap-5">
      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {pillars.map((p) => (
          <motion.div
            key={p.name}
            variants={item}
            transition={transition({ duration: 0.4 })}
            className="flex flex-col rounded-xl border border-far-line bg-far-off/70 p-4"
          >
            <p className="font-display text-xl font-bold text-far-yellow">
              {p.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-far-muted">
              {p.q}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <motion.p
        className="font-display text-base font-semibold text-far-white md:text-lg"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition({ delay: 0.55, duration: 0.4 })}
      >
        Chez FAR, les valeurs ne décorent pas le discours.{" "}
        <span className="text-far-yellow">Elles cadrent les décisions.</span>
      </motion.p>
    </motion.div>
  );
}
