import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe";

const criteria = [
  { name: "Fidèle", desc: "Elle respecte l'univers du créateur." },
  { name: "Fluide", desc: "Elle s'intègre naturellement à son contenu." },
  {
    name: "Structurante",
    desc: "Elle simplifie, clarifie ou renforce son développement.",
  },
  {
    name: "Ambitieuse",
    desc: "Elle peut ouvrir plus qu'une prise de parole.",
  },
  {
    name: "Utile",
    desc: "Elle crée une valeur claire pour le talent, la marque et l'audience.",
  },
];

export function OpportunityGrid() {
  const { variants, transition } = useMotionSafe();
  const item = variants({
    hidden: { opacity: 0, scale: 0.97 },
    show: { opacity: 1, scale: 1 },
  });
  const container = variants({
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  });

  return (
    <motion.div className="flex min-h-0 flex-1 flex-col gap-4">
      <motion.div
        className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {criteria.map((c) => (
          <motion.div
            key={c.name}
            variants={item}
            transition={transition({ duration: 0.35 })}
            className="rounded-lg border border-far-line bg-far-off/60 p-3"
          >
            <p className="font-display text-sm font-bold text-far-yellow">
              {c.name}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-far-muted">
              {c.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="rounded-xl border-2 border-far-yellow/40 bg-far-yellow/8 p-4 md:p-5"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={transition({ delay: 0.4, duration: 0.45 })}
      >
        <p className="font-display text-sm font-bold text-far-yellow">
          L&apos;entorse intelligente
        </p>
        <p className="mt-3 text-sm leading-relaxed text-far-white/90">
          FAR peut accepter une opportunité moins évidente au départ si elle ouvre
          un vrai levier de développement : revenu structurant, produit
          propriétaire, acquisition, participation, marque stratégique, nouveau
          vertical, recrutement clé ou accélération business.
        </p>
        <p className="mt-3 text-sm font-medium text-far-muted">
          Dans ce cas, le rôle de FAR est de transformer l&apos;opportunité en
          projet légitime.
        </p>
      </motion.div>
    </motion.div>
  );
}
