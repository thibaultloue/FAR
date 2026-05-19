import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe";

const zones = [
  {
    id: "platforms",
    label: "Plateformes",
    desc: "Accès, volume, campagnes en quelques clics.",
    pos: "col-start-1 row-start-2",
    delay: 0.1,
  },
  {
    id: "entertainment",
    label: "Entertainment",
    desc: "Grands talents, YouTube, Twitch, événements, licences.",
    pos: "col-start-2 row-start-1",
    delay: 0.2,
  },
  {
    id: "networks",
    label: "Réseaux internationaux",
    desc: "Storytelling, média, production, data.",
    pos: "col-start-2 row-start-2",
    delay: 0.3,
  },
  {
    id: "content",
    label: "Content / management",
    desc: "Stratégie, production, management.",
    pos: "col-start-1 row-start-1",
    delay: 0.35,
  },
  {
    id: "agents",
    label: "Agents de carrière",
    desc: "Ligne éditoriale, image, carrière, protection.",
    pos: "col-start-1 row-start-1 col-span-1",
    delay: 0.4,
    hidden: true,
  },
];

const benchNames = [
  "Bump",
  "Foll-ow",
  "We Are Era",
  "Webedia Creators",
  "Nouvel Arc",
];

export function Mapping() {
  const { variants, transition } = useMotionSafe();

  const zoneMotion = variants({
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1 },
  });

  const container = variants({
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="grid min-h-0 flex-1 grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] gap-3 md:gap-4">
        <motion.div
          className="col-start-2 row-start-1 flex items-end justify-center pb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition({ delay: 0.05, duration: 0.4 })}
        >
          <span className="text-center text-[10px] uppercase tracking-[0.18em] text-far-muted md:text-xs">
            Accès à l&apos;audience
            <span className="mx-2 text-far-yellow">→</span>
            Développement d&apos;univers
          </span>
        </motion.div>

        <motion.div
          className="col-start-1 row-start-2 flex items-center justify-end pr-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition({ delay: 0.05, duration: 0.4 })}
        >
          <span
            className="max-w-[4.5rem] text-right text-[10px] uppercase leading-tight tracking-[0.14em] text-far-muted md:max-w-none md:text-xs"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Activation ponctuelle
            <span className="my-2 block text-far-yellow">↓</span>
            Construction long terme
          </span>
        </motion.div>

        <motion.div
          className="relative col-start-2 row-start-2 grid min-h-[220px] grid-cols-2 grid-rows-2 gap-2 rounded-xl border border-far-line bg-far-off/50 p-2 md:min-h-[280px] md:gap-3 md:p-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {zones
            .filter((z) => !z.hidden)
            .map((z) => (
              <motion.div
                key={z.id}
                variants={zoneMotion}
                transition={transition({ duration: 0.45, delay: z.delay })}
                className={`flex flex-col justify-center rounded-lg border border-far-line bg-far-black/80 p-3 md:p-4 ${z.pos}`}
              >
                <p className="font-display text-xs font-semibold text-far-muted md:text-sm">
                  {z.label}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-far-muted/90 md:text-xs">
                  {z.desc}
                </p>
              </motion.div>
            ))}

          <motion.div
            variants={zoneMotion}
            transition={transition({ duration: 0.55, delay: 0.55 })}
            className="absolute inset-[18%] z-10 flex flex-col items-center justify-center rounded-xl border-2 border-far-yellow bg-far-yellow/10 p-4 text-center shadow-[0_0_60px_rgba(255,212,0,0.12)] backdrop-blur-sm"
          >
            <p className="font-display text-lg font-bold text-far-yellow md:text-xl">
              FAR
            </p>
            <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-far-white md:text-sm">
              Développement d&apos;univers créateurs par la création, la
              structure et la croissance.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.p
        className="font-display text-base font-semibold text-far-white md:text-lg"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition({ delay: 0.7, duration: 0.45 })}
      >
        FAR n&apos;est pas une agence d&apos;influence de plus.{" "}
        <span className="text-far-yellow">
          FAR développe ce qui fait aller les créateurs plus loin.
        </span>
      </motion.p>

      <p className="text-[10px] text-far-muted/80">
        Benchmark (routes marché) : {benchNames.join(" · ")}
      </p>
    </div>
  );
}
