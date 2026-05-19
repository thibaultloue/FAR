import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe";

const talents = [
  {
    name: "FastGoodCuisine",
    universe: "Food entertainment",
    potential:
      "Formats food, tests, défis, co-brandings, produits, opérations avec marques food.",
    public: true,
  },
  {
    name: "CYRILmp4",
    universe: "Exploration, gaming, divertissement",
    potential:
      "Ambassades, formats longs, aventures, gaming, marques propres, projets annuels.",
    public: true,
  },
  {
    name: "Toinelag",
    universe: "Construction, jeux, divertissement",
    potential:
      "Concepts co-construits, produits, jouets, formats de challenge, collaborations marque.",
    public: true,
  },
  {
    name: "Teeqzy",
    universe: "Fortnite, gaming communautaire",
    potential:
      "Maps, espaces de jeu, formats gaming, communautés, activations qualifiées.",
    public: false,
  },
  {
    name: "Bek1ng",
    universe: "Performance gaming, coaching, Call of Duty",
    potential:
      "Coaching, contenus experts, co-branding expert, équipements, performance.",
    public: false,
  },
];

export function TalentCards() {
  const { variants, transition } = useMotionSafe();
  const item = variants({
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  });
  const container = variants({
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  });

  return (
    <motion.div className="flex min-h-0 flex-1 flex-col gap-4">
      <motion.div
        className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {talents.map((t) => (
          <motion.article
            key={t.name}
            variants={item}
            transition={transition({ duration: 0.4 })}
            className="min-w-[200px] shrink-0 rounded-xl border border-far-line bg-far-off/70 p-4 md:min-w-0"
          >
            <motion.div
              className="mb-3 flex h-16 items-center justify-center rounded-lg border border-dashed border-far-line bg-far-black/50 text-[10px] uppercase tracking-widest text-far-muted"
              aria-hidden
            >
              Portrait
            </motion.div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-sm font-bold text-far-white">
                {t.name}
              </h3>
              {!t.public && (
                <span className="shrink-0 rounded bg-far-yellow/15 px-1.5 py-0.5 text-[8px] font-semibold uppercase text-far-yellow">
                  PDF
                </span>
              )}
            </div>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-far-yellow">
              {t.universe}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-far-muted">
              {t.potential}
            </p>
          </motion.article>
        ))}
      </motion.div>
      <motion.p
        className="font-display text-base font-semibold text-far-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={transition({ delay: 0.45, duration: 0.4 })}
      >
        FAR ne présente pas des profils.{" "}
        <span className="text-far-yellow">FAR développe des univers.</span>
      </motion.p>
    </motion.div>
  );
}
