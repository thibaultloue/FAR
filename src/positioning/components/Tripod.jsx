import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe";

const legs = [
  {
    id: "creation",
    title: "Création",
    desc: "L'ADN du créateur : ton, formats, communauté, imaginaire, exigence éditoriale.",
    x: 80,
    y: 200,
  },
  {
    id: "structure",
    title: "Structure",
    desc: "Le cadre qui permet d'aller plus loin : administratif, juridique, fiscal, comptable, recrutement, process, data, outils, priorisation.",
    x: 200,
    y: 200,
  },
  {
    id: "growth",
    title: "Croissance",
    desc: "Ce qui ouvre de nouveaux champs : collaborations, ambassades, produits propriétaires, marques propres, actifs, acquisitions, participations, opportunités business.",
    x: 320,
    y: 200,
  },
];

export function Tripod() {
  const { transition } = useMotionSafe();
  const apex = { x: 200, y: 55 };

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6">
      <div className="relative w-full max-w-xl">
        <svg
          viewBox="0 0 400 260"
          className="h-auto w-full"
          aria-label="Schéma : univers créateur sur trois appuis"
        >
          <motion.line
            x1={apex.x}
            y1={apex.y}
            x2={legs[0].x}
            y2={legs[0].y}
            stroke="#FFD400"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={transition({ duration: 0.5, delay: 0.2 })}
          />
          <motion.line
            x1={apex.x}
            y1={apex.y}
            x2={legs[1].x}
            y2={legs[1].y}
            stroke="#FFD400"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={transition({ duration: 0.5, delay: 0.35 })}
          />
          <motion.line
            x1={apex.x}
            y1={apex.y}
            x2={legs[2].x}
            y2={legs[2].y}
            stroke="#FFD400"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={transition({ duration: 0.5, delay: 0.5 })}
          />
          <motion.circle
            cx={apex.x}
            cy={apex.y}
            r="36"
            fill="#111111"
            stroke="#FFD400"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={transition({ type: "spring", stiffness: 200, delay: 0.1 })}
          />
          <text
            x={apex.x}
            y={apex.y - 4}
            textAnchor="middle"
            fill="#F5F1E8"
            fontSize="11"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="600"
          >
            Univers
          </text>
          <text
            x={apex.x}
            y={apex.y + 12}
            textAnchor="middle"
            fill="#A8A29A"
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            créateur
          </text>
          {legs.map((leg, i) => (
            <motion.g
              key={leg.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transition({ delay: 0.45 + i * 0.15, duration: 0.4 })}
            >
              <circle
                cx={leg.x}
                cy={leg.y}
                r="28"
                fill="#080808"
                stroke="rgba(245,241,232,0.18)"
                strokeWidth="1"
              />
              <text
                x={leg.x}
                y={leg.y + 4}
                textAnchor="middle"
                fill="#FFD400"
                fontSize="10"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="700"
              >
                {leg.title}
              </text>
            </motion.g>
          ))}
        </svg>
        <p className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-far-muted">
          FAR — système qui stabilise l&apos;ensemble
        </p>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-3 md:grid-cols-3">
        {legs.map((leg, i) => (
          <motion.div
            key={leg.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition({ delay: 0.55 + i * 0.1, duration: 0.4 })}
            className="rounded-lg border border-far-line bg-far-off/60 p-3"
          >
            <p className="font-display text-sm font-bold text-far-yellow">
              {leg.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-far-muted">
              {leg.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="max-w-2xl text-center font-display text-base font-semibold text-far-white md:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={transition({ delay: 0.85, duration: 0.45 })}
      >
        La structure n&apos;éteint pas la création.{" "}
        <span className="text-far-yellow">Elle lui donne de l&apos;espace.</span>
      </motion.p>
    </div>
  );
}
