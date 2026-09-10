import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { asset, prefersReducedMotion } from "./asset.js";

export function Kicker({ children }) {
  return <div className="far-studio-kicker">{children}</div>;
}

export function Display({ as: Tag = "h1", size = "title", children, style }) {
  const cls = size === "lg" ? "far-studio-title-lg" : size === "md" ? "far-studio-title-md" : "far-studio-title";
  return (
    <Tag className={`far-studio-display ${cls}`} style={style}>
      {children}
    </Tag>
  );
}

export function Body({ as: Tag = "p", lead, children, style }) {
  return (
    <Tag className={lead ? "far-studio-lead" : "far-studio-body"} style={style}>
      {children}
    </Tag>
  );
}

export function Source({ children }) {
  if (!children) return null;
  return <div className="far-studio-source" style={{ marginTop: "auto", paddingTop: "calc(10px * var(--fs-u))" }}>{children}</div>;
}

export function Photo({ src, alt, fit = "cover", focus = "center center", credit, style, className = "" }) {
  return (
    <figure className={`far-studio-photo ${className}`} style={style}>
      <img src={asset(src)} alt={alt} style={{ objectFit: fit, objectPosition: focus }} />
      {credit ? <figcaption className="far-studio-caption" style={{ position: "absolute", left: 12, bottom: 10, color: "rgba(255,255,255,.78)" }}>{credit}</figcaption> : null}
    </figure>
  );
}

export function LogoMark({ src, alt, height = 36, invert }) {
  return (
    <img
      className="far-studio-logo"
      src={asset(src)}
      alt={alt}
      style={{
        height: `calc(${height}px * var(--fs-u))`,
        width: "auto",
        maxWidth: `calc(180px * var(--fs-u))`,
        filter: invert ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );
}

export function FarMark({ variant = "black", size = 72 }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const cv = document.createElement("canvas");
      cv.width = img.width;
      cv.height = img.height;
      const cx = cv.getContext("2d");
      cx.drawImage(img, 0, 0);
      const id = cx.getImageData(0, 0, cv.width, cv.height);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const l = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
        if (l < 80) {
          d[i + 3] = 0;
          continue;
        }
        if (variant === "black") {
          d[i] = 0;
          d[i + 1] = 0;
          d[i + 2] = 0;
        }
        if (variant === "white") {
          d[i] = 255;
          d[i + 1] = 255;
          d[i + 2] = 255;
        }
      }
      cx.putImageData(id, 0, 0);
      setUrl(cv.toDataURL());
    };
    img.src = asset("/far-logo.png");
  }, [variant]);
  const h = size * (192 / 436);
  if (!url) return <div style={{ width: `calc(${size}px * var(--fs-u))`, height: `calc(${h}px * var(--fs-u))`, flexShrink: 0 }} />;
  return (
    <img
      src={url}
      alt="FAR"
      className="far-studio-logo"
      style={{
        width: `calc(${size}px * var(--fs-u))`,
        height: `calc(${h}px * var(--fs-u))`,
        objectFit: "contain",
      }}
    />
  );
}

export function Reveal({ children, delay = 0, y = 12 }) {
  const box = { height: "100%", minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" };
  if (prefersReducedMotion()) return <div style={box}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
      style={box}
    >
      {children}
    </motion.div>
  );
}

export function Surface({ children, style, contrast }) {
  return (
    <div
      style={{
        background: contrast ? "var(--fs-contrast)" : "var(--fs-surface)",
        color: contrast ? "var(--fs-contrast-ink)" : "var(--fs-ink)",
        borderRadius: "var(--fs-radius)",
        padding: "calc(22px * var(--fs-u))",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
