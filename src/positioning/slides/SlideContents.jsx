import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe";
import { Mapping } from "../components/Mapping";
import { Tripod } from "../components/Tripod";
import { PillarGrid } from "../components/PillarGrid";
import { Workstreams } from "../components/Workstreams";
import { TalentCards } from "../components/TalentCards";
import { OpportunityGrid } from "../components/OpportunityGrid";
import { DoDontTable } from "../components/DoDontTable";

const manifestoLines = [
  "Un univers a ses codes.",
  "Son rythme.",
  "Ses formats.",
  "Sa communauté.",
  "Ses limites.",
  "Ses ambitions.",
  "",
  "Pour aller loin, il ne lui suffit pas d'être visible.",
  "Il doit être compris, structuré, protégé et développé.",
  "",
  "C'est le rôle de FAR :",
  "donner aux univers créateurs le cadre, les opportunités et la sérénité nécessaires pour grandir sans se dénaturer.",
];

const closingPlus = [
  "Plus de vision.",
  "Plus de structure.",
  "Plus de sérénité.",
  "Plus d'ambition.",
  "Plus d'opportunités.",
];

export function SlideContents({ slide }) {
  const { transition, variants } = useMotionSafe();
  const line = variants({
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  });
  const container = variants({
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  });

  switch (slide.id) {
    case "01-intro":
      return (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.p
            className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-far-yellow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition({ duration: 0.5 })}
          >
            FAR by La Porte
          </motion.p>
          <motion.h1
            className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-far-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition({ delay: 0.1, duration: 0.55 })}
          >
            Faire grandir les univers créateurs.
          </motion.h1>
          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed text-far-muted md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition({ delay: 0.25, duration: 0.5 })}
          >
            Une agence pensée pour accompagner les créateurs dans leur
            développement, et aider les marques à construire des projets justes
            avec eux.
          </motion.p>
          <motion.p
            className="mt-12 font-display text-lg font-semibold tracking-wide text-far-yellow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition({ delay: 0.45, duration: 0.5 })}
          >
            Qui veut aller loin, vient ici.
          </motion.p>
          <motion.p
            className="mt-16 text-[11px] uppercase tracking-[0.2em] text-far-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition({ delay: 0.6, duration: 0.4 })}
          >
            10 ans d&apos;expérience · +50 marques · +100 campagnes
          </motion.p>
        </div>
      );

    case "02-manifesto":
      return (
        <motion.div
          className="flex flex-1 flex-col justify-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {manifestoLines.map((text, i) =>
            text === "" ? (
              <div key={i} className="h-4" />
            ) : (
              <motion.p
                key={i}
                variants={line}
                transition={transition({ duration: 0.35 })}
                className={`text-balance ${
                  i >= manifestoLines.length - 3
                    ? "mt-2 font-display text-lg font-semibold text-far-white md:text-xl"
                    : i < 6
                      ? "font-display text-xl text-far-white md:text-2xl"
                      : "text-base text-far-muted md:text-lg"
                }`}
              >
                {text}
              </motion.p>
            ),
          )}
        </motion.div>
      );

    case "03-mapping":
      return <Mapping />;

    case "04-model":
      return <Tripod />;

    case "05-pillars":
      return <PillarGrid />;

    case "06-workstreams":
      return <Workstreams />;

    case "07-talents":
      return <TalentCards />;

    case "08-opportunity":
      return <OpportunityGrid />;

    case "09-dodont":
      return <DoDontTable />;

    case "10-closing":
      return (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.h2
            className="font-display text-4xl font-bold text-far-yellow sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={transition({ duration: 0.5 })}
          >
            Qui veut aller loin, vient ici.
          </motion.h2>
          <motion.p
            className="mt-8 max-w-2xl text-base text-far-muted md:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={transition({ delay: 0.15, duration: 0.45 })}
          >
            FAR by La Porte accompagne les créateurs dans le développement de
            leur univers.
          </motion.p>
          <motion.ul
            className="mt-8 space-y-2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {closingPlus.map((p) => (
              <motion.li
                key={p}
                variants={line}
                transition={transition({ duration: 0.35 })}
                className="font-display text-lg text-far-white md:text-xl"
              >
                {p}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            className="mt-10 max-w-2xl space-y-3 text-sm text-far-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={transition({ delay: 0.5, duration: 0.45 })}
          >
            <p>
              Pour les talents, c&apos;est un cadre pour grandir sans se
              dénaturer.
            </p>
            <p>
              Pour les marques, c&apos;est une façon de créer avec des univers
              forts, sans les interrompre.
            </p>
            <p>
              Pour les audiences, ce sont des projets qui paraissent évidents.
            </p>
          </motion.div>
          <motion.p
            className="mt-12 max-w-xl font-display text-base font-semibold leading-relaxed text-far-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition({ delay: 0.75, duration: 0.5 })}
          >
            Plus qu&apos;une agence, FAR est un partenaire engagé aux côtés des
            créateurs et des marques.
          </motion.p>
        </div>
      );

    default:
      return null;
  }
}
