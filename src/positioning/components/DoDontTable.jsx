import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe";

const dos = [
  "Parler d'univers créateur.",
  "Construire autour de la création.",
  "Chercher le rôle juste de la marque.",
  "Structurer sans rigidifier.",
  "Développer des actifs, produits, formats ou marques propres.",
  "Protéger la cohérence éditoriale.",
  "Dire « partenaire de stratégie, de création et de visibilité ».",
  "Parler de développement serein et durable.",
];

const donts = [
  "Parler de profil ou d'inventaire.",
  "Partir uniquement du brief marque.",
  "Plaquer une intégration sponsorisée.",
  "Ajouter de la complexité.",
  "Réduire le talent à son audience.",
  "Dire oui à tout.",
  "Dire « support de campagne ».",
  "Parler seulement de monétisation.",
];

export function DoDontTable() {
  const { variants, transition } = useMotionSafe();
  const col = variants({
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0 },
  });
  const colR = variants({
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0 },
  });

  return (
    <motion.div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <motion.div
          variants={col}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={transition({ duration: 0.45 })}
          className="rounded-xl border border-far-yellow/30 bg-far-yellow/6 p-4 md:p-5"
        >
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-far-yellow">
            Do
          </p>
          <ul className="space-y-2">
            {dos.map((line) => (
              <li
                key={line}
                className="flex gap-2 text-sm leading-snug text-far-white"
              >
                <span className="text-far-yellow" aria-hidden>
                  +
                </span>
                {line}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          variants={colR}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={transition({ duration: 0.45, delay: 0.12 })}
          className="rounded-xl border border-far-line bg-far-off/40 p-4 opacity-90 md:p-5"
        >
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-far-muted">
            Don&apos;t
          </p>
          <ul className="space-y-2">
            {donts.map((line) => (
              <li
                key={line}
                className="flex gap-2 text-sm leading-snug text-far-muted"
              >
                <span aria-hidden>−</span>
                {line}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <motion.p
        className="font-display text-base font-semibold text-far-white md:text-lg"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition({ delay: 0.35, duration: 0.4 })}
      >
        FAR ne vend pas l&apos;accès aux créateurs.{" "}
        <span className="text-far-yellow">
          FAR construit ce qui les fait aller plus loin.
        </span>
      </motion.p>
    </motion.div>
  );
}
