import { useState, useEffect, useCallback, useRef, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/** Chemins publics (GitHub Pages projet → BASE_URL `/FAR/`). */
const pu = (path) => {
  const rel = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${rel}`;
};

// ─── THEMES  -  TRICOLOR ────────────────────────────────────────────────────────
const W = "#F8F6F1";
const A = "#FFAA00";
const B = "#1A1A1A";

const T1 = {
  bg:A, c:B, c2:W, m:"rgba(26,26,26,.6)", d:"rgba(26,26,26,.25)",
  a:B, a2:W,
  card:W, cardT:B,
  cardAlt:"rgba(0,0,0,.07)",
  pill:"rgba(0,0,0,.07)", pillA:W,
  brd:"rgba(0,0,0,.08)",
  bar:"rgba(0,0,0,.08)", barF:B,
  nav:B, navT:A, note:B, noteT:W,
  th:B, thT:A,
  th2:W, th2T:B,
  ex:B, exT:A, no:W, noT:B, noBrd:"rgba(0,0,0,.1)",
  section:B, sectionT:W, cR:18, cS:"0 2px 20px rgba(0,0,0,.06)", lv:"black",
};
const T2 = {
  bg:B, c:W, c2:A, m:"rgba(248,246,241,.55)", d:"rgba(248,246,241,.2)",
  a:A, a2:W,
  card:"rgba(255,255,255,.06)", cardT:W,
  cardAlt:"rgba(255,176,0,.08)",
  pill:"rgba(255,176,0,.1)", pillA:"rgba(255,176,0,.18)",
  brd:"rgba(255,255,255,.08)",
  bar:"rgba(255,255,255,.08)", barF:A,
  nav:A, navT:B, note:W, noteT:B,
  th:A, thT:B,
  th2:"rgba(255,255,255,.08)", th2T:W,
  ex:A, exT:B, no:"rgba(255,255,255,.05)", noT:W, noBrd:"rgba(255,255,255,.08)",
  section:A, sectionT:B, cR:16, cBf:"blur(12px)", lv:"yellow",
};
const TS = {
  bg:"#81B840", c:"#1a2e05", c2:W, m:"rgba(26,46,5,.55)", d:"rgba(26,46,5,.25)",
  a:"#1a2e05", a2:W,
  card:W, cardT:"#1a2e05",
  cardAlt:"rgba(0,0,0,.06)",
  pill:"rgba(0,0,0,.06)", pillA:W,
  brd:"rgba(0,0,0,.08)",
  bar:"rgba(0,0,0,.08)", barF:"#1a2e05",
  nav:"#1a2e05", navT:"#81B840", note:"#1a2e05", noteT:"#C8E4A0",
  th:"#1a2e05", thT:"#81B840",
  th2:W, th2T:"#1a2e05",
  ex:"#1a2e05", exT:"#81B840", no:W, noT:"#1a2e05", noBrd:"rgba(0,0,0,.08)",
  section:"#1a2e05", sectionT:W, cR:12, lv:"white",
};
const TR = {
  bg:"#C62828", c:"#fff", c2:B, m:"rgba(255,255,255,.7)", d:"rgba(255,255,255,.3)",
  a:"#fff", a2:B,
  card:"rgba(255,255,255,.1)", cardT:"#fff",
  cardAlt:"rgba(0,0,0,.15)",
  pill:"rgba(255,255,255,.1)", pillA:"rgba(255,255,255,.18)",
  brd:"rgba(255,255,255,.1)",
  bar:"rgba(255,255,255,.1)", barF:"#fff",
  nav:"#fff", navT:"#C62828", note:B, noteT:"#FBC4C4",
  th:"#fff", thT:"#C62828",
  th2:"rgba(0,0,0,.2)", th2T:"#fff",
  ex:"#fff", exT:"#C62828", no:"rgba(255,255,255,.06)", noT:"#fff", noBrd:"rgba(255,255,255,.08)",
  section:"#fff", sectionT:"#C62828", cR:10, lv:"white",
};
/** FGC: fond blush / pêche rosé, rouge tomate, basilic, orange FAR (c2). */
const TFGC = {
  bg:"#FFF2F5",
  c:"#1C1410",
  c2:A,
  m:"rgba(28,20,16,.62)",
  d:"rgba(28,20,16,.3)",
  a:"#E01F2A",
  a2:"#0F6B58",
  card:"#FFFFFF",
  cardT:"#1C1410",
  cardAlt:"rgba(224,31,42,.08)",
  pill:"rgba(232,140,155,.2)",
  pillA:"rgba(255,145,40,.22)",
  brd:"rgba(28,20,16,.08)",
  bar:"rgba(15,107,88,.1)",
  barF:"#E01F2A",
  nav:"#0F6B58",
  navT:"#FFFCF7",
  note:"#1C1410",
  noteT:"#FFFCF7",
  th:"#E01F2A",
  thT:"#FFFCF7",
  th2:"#CDE8DF",
  th2T:"#0A3D32",
  ex:"#E01F2A",
  exT:"#FFFCF7",
  no:"rgba(28,20,16,.04)",
  noT:"#1C1410",
  noBrd:"rgba(28,20,16,.08)",
  section:"#0F6B58",
  sectionT:"#FFFCF7",
  cR:14,
  cS:"0 2px 26px rgba(28,20,16,.07)",
  lv:"black",
};

/** Thème deck [MARQUE] × FastGoodCuisine : clair (même AD que FGC), accents orange & violet. */
const TFGCMarque = {
  bg: "#FFF4F7",
  c: "#1C1410",
  c2: "#FF8A3D",
  m: "rgba(28,20,16,.62)",
  d: "rgba(28,20,16,.3)",
  a: "#FF6B35",
  a2: "#6B5DC9",
  card: "#FFFFFF",
  cardT: "#1C1410",
  cardAlt: "rgba(255,107,53,.1)",
  pill: "rgba(107,93,201,.14)",
  pillA: "rgba(255,107,53,.2)",
  brd: "rgba(28,20,16,.09)",
  bar: "rgba(28,20,16,.08)",
  barF: "#FF6B35",
  nav: "#6B5DC9",
  navT: "#FFFCF7",
  note: "#F8F5FF",
  noteT: "#1C1410",
  th: "#FF6B35",
  thT: "#FFFCF7",
  th2: "#EDE9FE",
  th2T: "#433887",
  ex: "#FF6B35",
  exT: "#FFFCF7",
  no: "rgba(28,20,16,.05)",
  noT: "#1C1410",
  noBrd: "rgba(28,20,16,.1)",
  section: "#6B5DC9",
  sectionT: "#FFFCF7",
  cR: 14,
  cS: "0 2px 24px rgba(28,20,16,.08)",
  lv: "black",
};

/** Toinelag : jaune vif, bleu ciel, noir (AD proche de l'avatar chaîne). */
const TToinelag = {
  bg: "#FFE14A",
  c: "#141414",
  c2: "#2a2a2a",
  m: "rgba(20,20,20,.7)",
  d: "rgba(20,20,20,.35)",
  a: "#1E74E8",
  a2: "#FF5A1F",
  card: "#FFFFFF",
  cardT: "#141414",
  cardAlt: "rgba(30,116,232,.12)",
  pill: "rgba(20,20,20,.1)",
  pillA: "rgba(30,116,232,.22)",
  brd: "rgba(20,20,20,.14)",
  bar: "rgba(20,20,20,.12)",
  barF: "#1E74E8",
  nav: "#141414",
  navT: "#FFE14A",
  note: "#141414",
  noteT: "#FFFBEF",
  th: "#1E74E8",
  thT: "#FFFBEF",
  th2: "#FFF9DC",
  th2T: "#0F3D7A",
  ex: "#1E74E8",
  exT: "#FFFBEF",
  no: "rgba(255,255,255,.5)",
  noT: "#141414",
  noBrd: "rgba(20,20,20,.12)",
  section: "#1E74E8",
  sectionT: "#FFFBEF",
  cR: 18,
  cS: "0 5px 0 rgba(20,20,20,.88)",
  lv: "black",
};

const TC = {
  bg:B, c:W, c2:A, m:"rgba(248,246,241,.55)", d:"rgba(248,246,241,.2)",
  a:A, a2:W,
  card:"rgba(255,255,255,.06)", cardT:W,
  cardAlt:"rgba(255,176,0,.08)",
  pill:"rgba(255,176,0,.1)", pillA:"rgba(255,176,0,.18)",
  brd:"rgba(255,255,255,.08)",
  bar:"rgba(255,255,255,.08)", barF:A,
  nav:A, navT:B, note:W, noteT:B,
  th:A, thT:B,
  th2:"rgba(255,255,255,.08)", th2T:W,
  ex:A, exT:B, no:"rgba(255,255,255,.05)", noT:W, noBrd:"rgba(255,255,255,.08)",
  section:A, sectionT:B, cR:16, cBf:"blur(12px)", lv:"yellow",
};
const TGarmin = {
  bg:"#050A0F", c:"#F7FBFF", c2:"#00A9E0", m:"rgba(247,251,255,.64)", d:"rgba(247,251,255,.24)",
  a:"#00A9E0", a2:"#FFFFFF",
  card:"rgba(255,255,255,.07)", cardT:"#F7FBFF",
  cardAlt:"rgba(0,169,224,.11)",
  pill:"rgba(0,169,224,.12)", pillA:"rgba(0,169,224,.24)",
  brd:"rgba(255,255,255,.1)",
  bar:"rgba(255,255,255,.1)", barF:"#00A9E0",
  nav:"#00A9E0", navT:"#050A0F", note:"#F7FBFF", noteT:"#050A0F",
  th:"#00A9E0", thT:"#050A0F",
  th2:"rgba(255,255,255,.09)", th2T:"#F7FBFF",
  ex:"#00A9E0", exT:"#050A0F", no:"rgba(255,255,255,.05)", noT:"#F7FBFF", noBrd:"rgba(255,255,255,.1)",
  section:"#00A9E0", sectionT:"#050A0F", cR:16, cBf:"blur(12px)", lv:"white",
};
const TOtacosPepe = {
  bg:"#FFC400", c:"#171006", c2:"#111111", m:"rgba(23,16,6,.64)", d:"rgba(23,16,6,.32)",
  a:"#E30613", a2:"#FF7A00",
  card:"#FFF4C7", cardT:"#171006",
  cardAlt:"rgba(227,6,19,.1)",
  pill:"rgba(23,16,6,.08)", pillA:"rgba(227,6,19,.16)",
  brd:"rgba(23,16,6,.13)",
  bar:"rgba(23,16,6,.12)", barF:"#E30613",
  nav:"#111111", navT:"#FFC400", note:"#111111", noteT:"#FFC400",
  th:"#111111", thT:"#FFC400",
  th2:"#FFE37A", th2T:"#171006",
  ex:"#E30613", exT:"#FFF4C7", no:"rgba(255,255,255,.4)", noT:"#171006", noBrd:"rgba(23,16,6,.12)",
  section:"#E30613", sectionT:"#FFF4C7", cR:18, cS:"0 5px 0 rgba(17,17,17,.9)", lv:"black",
};
const TProfil = T1;
const TM = { case1:T1, case2:T2, shopify:TS, rode:TR, fastgoodcuisine:TFGC, fgcmarque:TFGCMarque, toinelag:TToinelag, cyrilmp4:TC, garmin:TGarmin, otacospepe:TOtacosPepe, profil:TProfil };

// ─── FONTS ────────────────────────────────────────────────────────────────────
const FC = `@import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=JetBrains+Mono:wght@400;500;600&display=swap');
html{-webkit-text-size-adjust:100%;}
@keyframes _vibrate{0%{transform:translate(0)}15%{transform:translate(-1px,.5px) rotate(-.5deg)}30%{transform:translate(1px,-.5px) rotate(.5deg)}45%{transform:translate(-.5px,1px) rotate(-.3deg)}60%{transform:translate(.5px,-1px) rotate(.3deg)}75%{transform:translate(-1px,.5px) rotate(-.5deg)}90%{transform:translate(.5px,-.5px) rotate(.3deg)}100%{transform:translate(0)}}
.far-logo-hover{cursor:pointer;}.far-logo-hover:hover{animation:_vibrate .25s ease-in-out;}
@media(max-width:1024px){
  .far-home{padding:32px 28px !important;}
  .far-home h1{font-size:36px !important;}
  .far-home-grid{grid-template-columns:1fr !important;max-width:100% !important;}
  .far-header{padding:10px 16px !important;}
  .far-header .far-bar{display:none !important;}
  .far-slide-wrap{padding:24px 20px 100px !important;}
  .far-slide-inner{max-width:100% !important;}
  .far-slide-inner>div>div[style*="display: flex"][style*="gap"]{flex-wrap:wrap !important;}
  .far-slide-inner>div>div[style*="grid-template-columns: 1fr 1fr 1fr"]{grid-template-columns:1fr 1fr !important;}
  .far-nav-sidebar{width:220px !important;}
  .far-btn-slides{padding:8px 14px !important;font-size:12px !important;}
  .far-btn-pdf{padding:8px 14px !important;font-size:12px !important;}
}
@media(max-width:768px){
  .far-home{padding:24px 16px !important;}
  .far-home h1{font-size:28px !important;}
  .far-home-grid{grid-template-columns:1fr !important;gap:12px !important;}
  .far-header{padding:8px 12px !important;flex-wrap:wrap;}
  .far-header>div:first-child{gap:8px !important;}
  .far-header>div:first-child>span{display:none !important;}
  .far-slide-wrap{padding:16px 12px 90px !important;}
  .far-slide-inner [style*="display: grid"]{grid-template-columns:1fr !important;}
  .far-slide-inner [style*="display: flex"][style*="gap: 24"]{flex-direction:column !important;}
  .far-slide-inner [style*="display: flex"][style*="gap: 28"]{flex-direction:column !important;}
  .far-slide-inner [style*="display: flex"][style*="gap: 32"]{flex-direction:column !important;}
  .far-slide-inner [style*="display: flex"][style*="gap: 40"]{flex-direction:column !important;}
  .far-slide-inner [style*="display: flex"][style*="gap: 48"]{flex-direction:column !important;}
  .far-slide-inner [style*="display: flex"][style*="gap: 16"]:not([style*="flex-wrap"]){flex-direction:column !important;}
  .far-slide-inner [style*="font-size: 52"]{font-size:32px !important;}
  .far-slide-inner [style*="font-size: 44"]{font-size:28px !important;}
  .far-slide-inner [style*="font-size: 42"]{font-size:26px !important;}
  .far-slide-inner [style*="font-size: 40"]{font-size:26px !important;}
  .far-slide-inner [style*="font-size: 38"]{font-size:24px !important;}
  .far-slide-inner [style*="font-size: 36"]{font-size:24px !important;}
  .far-slide-inner [style*="font-size: 34"]{font-size:22px !important;}
  .far-slide-inner [style*="font-size: 96"]{font-size:56px !important;}
  .far-slide-inner [style*="font-size: 80"]{font-size:48px !important;}
  .far-slide-inner [style*="font-size: 64"]{font-size:36px !important;}
  .far-slide-inner [style*="font-size: 56"]{font-size:32px !important;}
  .far-slide-inner [style*="white-space: nowrap"]{white-space:normal !important;}
  .far-slide-inner img[style*="aspect-ratio"]{max-height:300px !important;}
  .far-nav-sidebar{width:100% !important;max-width:280px;}
  .far-btn-nav{padding:8px 16px !important;}
  .far-btn-nav button{font-size:12px !important;}
}
@media(max-width:480px){
  .far-home{padding:20px 12px !important;}
  .far-home h1{font-size:22px !important;margin-bottom:32px !important;}
  .far-slide-wrap{padding:12px 8px 80px !important;}
  .far-slide-inner [style*="font-size: 52"]{font-size:24px !important;}
  .far-slide-inner [style*="font-size: 44"]{font-size:22px !important;}
  .far-slide-inner [style*="font-size: 42"]{font-size:20px !important;}
  .far-slide-inner [style*="font-size: 40"]{font-size:20px !important;}
  .far-slide-inner [style*="font-size: 38"]{font-size:20px !important;}
  .far-slide-inner [style*="font-size: 36"]{font-size:20px !important;}
  .far-slide-inner [style*="font-size: 34"]{font-size:18px !important;}
  .far-slide-inner [style*="font-size: 96"]{font-size:40px !important;}
  .far-slide-inner [style*="font-size: 80"]{font-size:32px !important;}
  .far-slide-inner [style*="font-size: 64"]{font-size:28px !important;}
  .far-slide-inner [style*="font-size: 56"]{font-size:24px !important;}
  .far-slide-inner [style*="padding: 48px 40px"]{padding:20px 16px !important;}
  .far-slide-inner [style*="padding: 28px 24px"]{padding:16px 12px !important;}
  .far-btn-slides{bottom:12px !important;left:12px !important;padding:6px 12px !important;font-size:11px !important;}
  .far-btn-nav button{padding:6px 14px !important;font-size:12px !important;}
  .far-btn-pdf{bottom:12px !important;right:12px !important;padding:6px 12px !important;font-size:11px !important;}
}
`;
const se = { fontFamily:"'Figtree',sans-serif" };
const sa = { fontFamily:"'Figtree',sans-serif" };
const mo = { fontFamily:"'JetBrains Mono',monospace" };

// ─── FAR LOGO ─────────────────────────────────────────────────────────────────
let _lp=null;
const FarLogo = ({size=80,variant="yellow"}) => {
  const[s,setS]=useState(_lp);
  useEffect(()=>{
    if(_lp){setS(_lp);return;}
    const img=new Image();
    img.onload=()=>{
      const cv=document.createElement("canvas");
      cv.width=img.width;cv.height=img.height;
      const cx=cv.getContext("2d");
      cx.drawImage(img,0,0);
      const id=cx.getImageData(0,0,cv.width,cv.height),d=id.data;
      for(let i=0;i<d.length;i+=4){const l=d[i]*.299+d[i+1]*.587+d[i+2]*.114;if(l<80)d[i+3]=0;}
      cx.putImageData(id,0,0);
      _lp=cv.toDataURL();
      setS(_lp);
    };
    img.src=pu("/far-logo.png");
  },[]);
  if(!s)return<div style={{width:size,height:size*.35}}/>;
  const f=variant==="black"?"brightness(0)":variant==="white"?"brightness(0) invert(1)":"none";
  return<img src={s} alt="FAR" style={{width:size,height:"auto",filter:f,display:"block"}}/>;
};

// ─── DECK MOTIFS ──────────────────────────────────────────────────────────────
const DeckMotif = ({deck}) => {
  if(deck==="case1") return <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}><defs><pattern id="dm1" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="40" stroke="rgba(0,0,0,.025)" strokeWidth="1"/></pattern></defs><rect fill="url(#dm1)" width="100%" height="100%"/></svg>;
  if(deck==="case2") return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>{[...Array(20)].map((_,i)=><div key={i} style={{position:"absolute",left:`${(i*37+13)%100}%`,top:`${(i*53+7)%100}%`,width:3+(i%3)*2,height:3+(i%3)*2,borderRadius:"50%",background:"rgba(255,176,0,.035)"}}/>)}</div>;
  if(deck==="shopify") return <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}><defs><pattern id="dm3" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="14" cy="14" r="1" fill="rgba(0,0,0,.03)"/></pattern></defs><rect fill="url(#dm3)" width="100%" height="100%"/></svg>;
  if(deck==="rode") return <div style={{position:"absolute",bottom:0,left:0,right:0,height:80,display:"flex",alignItems:"flex-end",gap:3,padding:"0 60px",opacity:.04,pointerEvents:"none"}}>{[...Array(50)].map((_,i)=><div key={i} style={{flex:1,height:`${20+Math.sin(i*.7)*25+Math.cos(i*1.3)*15}%`,background:"#fff",borderRadius:"2px 2px 0 0"}}/>)}</div>;
  if(deck==="fastgoodcuisine") return <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}} aria-hidden><defs><pattern id="dmfgc" width="48" height="48" patternUnits="userSpaceOnUse"><circle cx="9" cy="11" r="1.35" fill="rgba(235,165,180,.22)"/><circle cx="32" cy="19" r="1" fill="rgba(224,31,42,.1)"/><circle cx="24" cy="38" r="1.15" fill="rgba(15,107,88,.1)"/><circle cx="41" cy="8" r="0.85" fill="rgba(255,145,40,.14)"/><circle cx="18" cy="28" r="0.7" fill="rgba(232,140,155,.16)"/></pattern></defs><rect fill="#FFF2F5" width="100%" height="100%"/><rect fill="url(#dmfgc)" width="100%" height="100%"/></svg>;
  if(deck==="fgcmarque") return <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}} aria-hidden><defs><pattern id="dmfgcx" width="44" height="44" patternUnits="userSpaceOnUse"><circle cx="10" cy="12" r="1.2" fill="rgba(255,107,53,.16)"/><circle cx="30" cy="22" r="0.95" fill="rgba(107,93,201,.14)"/><circle cx="22" cy="36" r="1.05" fill="rgba(255,145,40,.12)"/></pattern></defs><rect fill="#FFF4F7" width="100%" height="100%"/><rect fill="url(#dmfgcx)" width="100%" height="100%"/></svg>;
  if(deck==="toinelag") return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>{[...Array(26)].map((_,i)=><div key={i} style={{position:"absolute",left:`${(i*37+11)%100}%`,top:`${(i*51+9)%100}%`,width:3+(i%4),height:3+(i%4),borderRadius:"50%",background:i%3===0?"rgba(30,116,232,.14)":"rgba(255,255,255,.55)"}}/>)}</div>;
  if(deck==="cyrilmp4") return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>{[...Array(20)].map((_,i)=><div key={i} style={{position:"absolute",left:`${(i*37+13)%100}%`,top:`${(i*53+7)%100}%`,width:3+(i%3)*2,height:3+(i%3)*2,borderRadius:"50%",background:"rgba(255,176,0,.035)"}}/>)}</div>;
  if(deck==="garmin") return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>{[...Array(22)].map((_,i)=><div key={i} style={{position:"absolute",left:`${(i*41+9)%100}%`,top:`${(i*47+15)%100}%`,width:1+(i%4)*2,height:24+(i%5)*18,transform:`rotate(${(i*23)%70-35}deg)`,borderRadius:999,background:i%3===0?"rgba(0,169,224,.12)":"rgba(255,255,255,.035)"}}/>)}</div>;
  if(deck==="otacospepe") return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>{[...Array(28)].map((_,i)=><div key={i} style={{position:"absolute",left:`${(i*31+7)%100}%`,top:`${(i*43+13)%100}%`,width:8+(i%5)*5,height:8+(i%5)*5,borderRadius:i%2?999:4,transform:`rotate(${(i*17)%50-25}deg)`,background:i%3===0?"rgba(227,6,19,.14)":i%3===1?"rgba(255,122,0,.18)":"rgba(17,17,17,.06)"}}/>)}</div>;
  if(deck==="profil") return <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}><defs><pattern id="dmProfil" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="40" stroke="rgba(0,0,0,.025)" strokeWidth="1"/></pattern></defs><rect fill="url(#dmProfil)" width="100%" height="100%"/></svg>;
  return null;
};

// ─── ANIMATION HELPERS ────────────────────────────────────────────────────────
const sv={h:{},v:{transition:{staggerChildren:.07}}};
const fi={h:{opacity:0,y:14},v:{opacity:1,y:0,transition:{duration:.35}}};
const fl={h:{opacity:0,x:20},v:{opacity:1,x:0,transition:{duration:.35}}};
const SV={
  case1:{i:{opacity:0},a:{opacity:1},e:{opacity:0},t:{duration:.25,ease:"easeInOut"}},
  case2:{i:{opacity:0,scale:.97},a:{opacity:1,scale:1},e:{opacity:0,scale:.97},t:{duration:.4,ease:[.25,.46,.45,.94]}},
  shopify:{i:{opacity:0,y:40},a:{opacity:1,y:0},e:{opacity:0,y:-40},t:{type:"spring",stiffness:260,damping:25}},
  rode:{i:{opacity:0},a:{opacity:1},e:{opacity:0},t:{duration:.6,ease:"easeInOut"}},
  fastgoodcuisine:{i:{opacity:0,y:36},a:{opacity:1,y:0},e:{opacity:0,y:-28},t:{type:"spring",stiffness:260,damping:26}},
  fgcmarque:{i:{opacity:0,y:36},a:{opacity:1,y:0},e:{opacity:0,y:-28},t:{type:"spring",stiffness:260,damping:26}},
  toinelag:{i:{opacity:0,y:32},a:{opacity:1,y:0},e:{opacity:0,y:-26},t:{type:"spring",stiffness:260,damping:26}},
  cyrilmp4:{i:{opacity:0,scale:.97},a:{opacity:1,scale:1},e:{opacity:0,scale:.97},t:{duration:.4,ease:[.25,.46,.45,.94]}},
  garmin:{i:{opacity:0,scale:.97},a:{opacity:1,scale:1},e:{opacity:0,scale:.97},t:{duration:.4,ease:[.25,.46,.45,.94]}},
  otacospepe:{i:{opacity:0,y:34},a:{opacity:1,y:0},e:{opacity:0,y:-28},t:{type:"spring",stiffness:260,damping:25}},
  profil:{i:{opacity:0},a:{opacity:1},e:{opacity:0},t:{duration:.25,ease:"easeInOut"}},
};
function AC({v,s="",p="",d=1.2}){const[c,setC]=useState(0);const ref=useRef(false);useEffect(()=>{if(ref.current)return;ref.current=true;const st=performance.now(),ms=d*1000;(function step(now){const pr=Math.min((now-st)/ms,1);setC(Math.round(v*(1-Math.pow(1-pr,3))));if(pr<1)requestAnimationFrame(step);})(performance.now());},[v,d]);return<>{p}{c}{s}</>;}

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const US = {WebkitUserSelect:"text",userSelect:"text"};
const Tg = ({t,children}) => <div style={{...mo,fontSize:13,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:t.d,marginBottom:28,...US}}>{children}</div>;
const Hl = ({t,children,s}) => <div style={{...se,fontSize:52,fontWeight:800,lineHeight:1.1,letterSpacing:"-0.02em",color:t.c,marginBottom:28,...US,...s}}>{children}</div>;
const Sh = ({t,children,white,s}) => <div style={{...sa,fontSize:20,fontWeight:400,color:white?t.c2:t.m,lineHeight:1.6,marginBottom:36,...US,...s}}>{children}</div>;
const Sec = ({t,children,sub}) => <div style={{marginBottom:sub?48:36}}><div style={{...mo,fontSize:16,fontWeight:700,letterSpacing:5,textTransform:"uppercase",color:t.a,marginBottom:sub?12:0,...US}}>{children}</div>{sub&&<div style={{...se,fontSize:36,fontWeight:800,lineHeight:1.2,color:t.c,...US}}>{sub}</div>}</div>;
const Th = ({t,children,s,alt}) => <div style={{...sa,fontSize:18,fontWeight:500,padding:"28px 34px",borderRadius:14,marginTop:32,lineHeight:1.6,background:alt?t.th2:t.th,color:alt?t.th2T:t.thT,...US,...s}}>{children}</div>;
const Wc = ({t,children,s}) => <div style={{padding:32,borderRadius:t.cR||14,background:t.card,color:t.cardT,boxShadow:t.cS||"none",backdropFilter:t.cBf||"none",...US,...s}}>{children}</div>;
const Cc = ({t,children,s}) => <div style={{padding:28,borderRadius:12,background:t.cardAlt,...s}}>{children}</div>;
const Lb = ({t,children,s,w}) => <div style={{...mo,fontSize:12,fontWeight:600,letterSpacing:2,color:w?t.c2:t.d,marginBottom:16,textTransform:"uppercase",...US,...s}}>{children}</div>;
const Fn = ({t,children}) => <div style={{...sa,fontSize:15,color:t.d,marginTop:32,paddingTop:20,borderTop:`1px solid ${t.brd}`,lineHeight:1.75,...US}}>{children}</div>;
const St = ({t,items}) => <div style={{display:"flex",gap:80,margin:"48px 0"}}>{items.map((s,i)=><motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.4,delay:i*.1}}><div style={{...se,fontSize:72,fontWeight:800,letterSpacing:"-0.03em",color:t.a}}>{s.v}</div><div style={{...sa,fontSize:16,fontWeight:500,color:t.m,marginTop:8}}>{s.l}</div></motion.div>)}</div>;
const Pl = ({t,children,a:active,w,s:sx}) => <span style={{...mo,display:"inline-block",fontSize:11,fontWeight:600,padding:"7px 16px",borderRadius:6,margin:3,background:w?t.c2+"25":active?t.pillA:t.pill,color:w?t.c2:active?t.a:t.c,...sx}}>{children}</span>;
/** Nuage de marques (tailles variables, pastilles arrondies). */
const Bc = ({t,labels}) => (
  <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",alignContent:"center",alignItems:"center",maxWidth:980,margin:"6px auto 0"}}>
    {labels.map((txt, i) => {
      const fsz = [12, 11, 13, 10, 14, 11, 12, 13, 11, 15, 12, 10][i % 12];
      const fw = i % 5 === 1 ? 800 : 600;
      return <Pl key={`${txt}-${i}`} t={t} s={{fontSize: fsz, fontWeight: fw, padding: "7px 15px", borderRadius: 999, margin: 3}}>{txt}</Pl>;
    })}
  </div>
);
const Ar = ({t,items,sm,w}) => <div style={{...US}}>{items.map((x,i)=><div key={i} style={{...sa,fontSize:sm?14:16,color:w?t.c2:t.m,padding:"8px 0",paddingLeft:24,position:"relative",lineHeight:1.65,...US}}><span style={{position:"absolute",left:0,color:t.d}}>→</span>{x}</div>)}</div>;

// ─── SCHEMA COMPONENTS (ANIMATED) ─────────────────────────────────────────────
const Flow = ({t,items}) => <motion.div initial="h" animate="v" variants={{h:{},v:{transition:{staggerChildren:.1}}}} style={{display:"flex",gap:0,margin:"32px 0",width:"100%"}}>{items.map((item,i)=>(
  <motion.div key={i} variants={{h:{opacity:0,x:24},v:{opacity:1,x:0,transition:{duration:.4}}}} style={{display:"flex",alignItems:"stretch",flex:1}}>
    <div style={{flex:1,padding:"30px 24px",borderRadius:14,background:i===0?t.th:t.card,color:i===0?t.thT:t.cardT,minHeight:140,display:"flex",flexDirection:"column"}}>
      <div style={{...mo,fontSize:11,fontWeight:600,opacity:.3,marginBottom:8}}>{String(i+1).padStart(2,"0")}</div>
      <div style={{...sa,fontSize:17,fontWeight:700,marginBottom:8}}>{item.t}</div>
      <div style={{...sa,fontSize:14,opacity:.65,lineHeight:1.55,flex:1}}>{item.d}</div>
    </div>
    {i<items.length-1&&<div style={{width:36,display:"flex",alignItems:"center",justifyContent:"center",color:t.d,fontSize:20,flexShrink:0}}>→</div>}
  </motion.div>
))}</motion.div>;

const Fun = ({t,items}) => <motion.div initial="h" animate="v" variants={{h:{},v:{transition:{staggerChildren:.15}}}} style={{margin:"12px auto",width:"100%",maxWidth:420}}>{items.map((item,i)=>{const w=100-i*16;return(
  <motion.div key={i} variants={{h:{opacity:0,scale:.92,y:8},v:{opacity:1,scale:1,y:0,transition:{duration:.4,ease:[.22,1,.36,1]}}}} style={{width:`${w}%`,margin:"0 auto 6px",padding:"12px 18px",borderRadius:10,background:i===0?t.th:t.card,color:i===0?t.thT:t.cardT,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:i===0?"0 3px 12px rgba(0,0,0,.12)":"none"}}>
    <span style={{...sa,fontSize:13,fontWeight:600}}>{item.l}</span>
    <span style={{...se,fontSize:24,fontWeight:800}}>{item.v}</span>
  </motion.div>);})}</motion.div>;

const Esc = ({t,items}) => <motion.div initial="h" animate="v" variants={{h:{},v:{transition:{staggerChildren:.1}}}} style={{display:"flex",alignItems:"flex-end",gap:10,margin:"28px 0",height:300}}>{items.map((item,i)=>{const h=110+i*60;return(
  <motion.div key={i} variants={{h:{opacity:0,y:20},v:{opacity:1,y:0,transition:{duration:.4}}}} style={{flex:1,height:h,padding:"22px 18px",borderRadius:"14px 14px 0 0",background:i===items.length-1?t.th:t.card,color:i===items.length-1?t.thT:t.cardT,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
    <div style={{...mo,fontSize:10,opacity:.4,marginBottom:4}}>NIVEAU {i+1}</div>
    <div style={{...sa,fontSize:15,fontWeight:700,marginBottom:6}}>{item.t}</div>
    <div style={{...sa,fontSize:12,opacity:.65,lineHeight:1.45}}>{item.d}</div>
  </motion.div>);})}</motion.div>;

const Hub = ({t,center,branches}) => <div style={{display:"flex",alignItems:"center",gap:52,margin:"36px 0"}}>
  <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:180,damping:15}} style={{width:180,height:180,borderRadius:"50%",background:t.th,color:t.thT,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",...sa,fontSize:18,fontWeight:700,flexShrink:0,lineHeight:1.2,padding:18,whiteSpace:"pre-line"}}>{center}</motion.div>
  <motion.div initial="h" animate="v" variants={{h:{},v:{transition:{staggerChildren:.08}}}} style={{display:"flex",flexDirection:"column",gap:14,flex:1}}>{branches.map((b,i)=>(
    <motion.div key={i} variants={fl} style={{display:"flex",alignItems:"center",gap:18}}>
      <div style={{width:40,textAlign:"center",color:t.d,fontSize:18}}> - </div>
      <Wc t={t} s={{flex:1,padding:"20px 24px"}}><div style={{...sa,fontSize:16,fontWeight:700,marginBottom:4}}>{b.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.55}}>{b.d}</div></Wc>
    </motion.div>
  ))}</motion.div>
</div>;

const Bars = ({t,items}) => <motion.div initial="h" animate="v" variants={{h:{},v:{transition:{staggerChildren:.12}}}} style={{display:"flex",gap:20,alignItems:"flex-end",height:260,margin:"36px 0"}}>{items.map((m,i)=>(
  <motion.div key={i} variants={{h:{opacity:0,y:30},v:{opacity:1,y:0,transition:{duration:.5}}}} style={{flex:1,height:`${m.pct*2.5+50}px`,background:i===0?t.a:i===1?t.card:t.cardAlt,borderRadius:"12px 12px 0 0",display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",padding:24}}>
    <div style={{...se,fontSize:42,color:i===0?t.bg:t.c}}>{m.pct}%</div>
    <div style={{...sa,fontSize:12,fontWeight:600,color:i===0?t.bg:t.c,textAlign:"center",marginTop:6}}>{m.l}</div>
  </motion.div>
))}</motion.div>;

const TL = ({t,phases}) => <motion.div initial="h" animate="v" variants={{h:{},v:{transition:{staggerChildren:.12}}}} style={{display:"grid",gridTemplateColumns:`repeat(${phases.length},1fr)`,gap:16,margin:"24px 0"}}>{phases.map((ph,i)=>(
  <motion.div key={i} variants={{h:{opacity:0,y:24},v:{opacity:1,y:0,transition:{duration:.4}}}} whileHover={{boxShadow:`0 0 0 2px ${t.a}`,borderRadius:16,transition:{duration:.2}}}>
    <Wc t={t} s={{padding:28,borderTop:`4px solid ${i===0?t.a:t.brd}`,height:"100%"}}>
      <div style={{...sa,fontSize:18,fontWeight:700,color:i===0?t.a:t.cardT,marginBottom:3}}>{ph.t}</div>
      <div style={{...mo,fontSize:10,color:t.d,marginBottom:16}}>{ph.s}</div>
      {ph.items.map((item,j)=><div key={j} style={{...sa,fontSize:12,color:t.m,padding:"4px 0",paddingLeft:14,position:"relative",lineHeight:1.45}}><span style={{position:"absolute",left:0,fontWeight:700,color:t.d}}>·</span>{item}</div>)}
    </Wc>
  </motion.div>
))}</motion.div>;

const Lay = ({t,items}) => <motion.div initial="h" animate="v" variants={{h:{},v:{transition:{staggerChildren:.07}}}} style={{margin:"24px 0",borderRadius:14,overflow:"hidden",border:`1px solid ${t.brd}`}}>{items.map((item,i)=>(
  <motion.div key={i} variants={{h:{opacity:0,x:-16},v:{opacity:1,x:0,transition:{duration:.3}}}}>
    <div style={{padding:"22px 28px",borderBottom:i<items.length-1?`1px solid ${t.brd}`:"",background:i===0?t.th:i===1?t.card:"transparent",color:i===0?t.thT:t.c,display:"grid",gridTemplateColumns:"50px 220px 1fr",gap:16,alignItems:"start"}}>
      <div style={{...mo,fontSize:26,fontWeight:700,opacity:i===0?1:.1}}>{String(i+1).padStart(2,"0")}</div>
      <div style={{...sa,fontSize:15,fontWeight:700,paddingTop:4}}>{item.t}</div>
      <div style={{...sa,fontSize:13,color:i===0?t.thT:t.m,lineHeight:1.55,opacity:i===0?1:.8}}>{item.d}</div>
    </div>
  </motion.div>
))}</motion.div>;

const PT = ({t,rows,total,options}) => <motion.div initial="h" animate="v" variants={{h:{},v:{transition:{staggerChildren:.06}}}} style={{margin:"28px 0"}}>{rows.map((r,i)=><motion.div key={i} variants={{h:{opacity:0,y:8},v:{opacity:1,y:0,transition:{duration:.25}}}} style={{display:"flex",justifyContent:"space-between",padding:"18px 0",borderBottom:`1px solid ${t.brd}`}}><span style={{...sa,fontSize:17,color:t.m}}>{r.i}</span><span style={{...mo,fontSize:18,fontWeight:600,color:t.a}}>{r.p}</span></motion.div>)}<motion.div variants={{h:{opacity:0,scale:.95},v:{opacity:1,scale:1,transition:{duration:.3}}}} style={{display:"flex",justifyContent:"space-between",padding:"28px 0",marginTop:8}}><span style={{...sa,fontSize:20,fontWeight:700}}>{total.l}</span><span style={{...se,fontSize:40,color:t.a}}>{total.v}</span></motion.div>{options&&<motion.div variants={{h:{opacity:0},v:{opacity:1,transition:{delay:.15}}}} style={{marginTop:16}}><Lb t={t}>OPTIONS</Lb>{options.map((o,i)=><div key={i} style={{...sa,fontSize:15,color:t.m,padding:"5px 0"}}>+ {o}</div>)}</motion.div>}</motion.div>;

const Stp = ({t,items}) => <motion.div initial="h" animate="v" variants={{h:{},v:{transition:{staggerChildren:.08}}}} style={{margin:"28px 0"}}>{items.map((s,i)=><motion.div key={i} variants={{h:{opacity:0,x:-16},v:{opacity:1,x:0,transition:{duration:.3}}}} style={{display:"flex",gap:20,alignItems:"center",padding:"18px 0",borderBottom:`1px solid ${t.brd}`}}><div style={{width:40,height:40,borderRadius:"50%",background:t.th,color:t.thT,display:"flex",alignItems:"center",justifyContent:"center",...mo,fontSize:15,fontWeight:700,flexShrink:0}}>{i+1}</div><span style={{...sa,fontSize:17,color:t.m}}>{s}</span></motion.div>)}</motion.div>;

const Cmp = ({t,l,lI,r,rI}) => <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginTop:28}}>
  <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:.4}} style={{padding:36,borderRadius:16,background:t.ex,color:t.exT}}>
    <div style={{...mo,fontSize:12,fontWeight:600,letterSpacing:1.5,marginBottom:22}}>{l}</div>
    {lI.map((e,i)=><div key={i} style={{...sa,fontSize:15,padding:"11px 0",borderBottom:"1px solid rgba(128,128,128,.15)",lineHeight:1.5}}>{e}</div>)}
  </motion.div>
  <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:.4,delay:.1}} style={{padding:36,borderRadius:16,background:t.no,color:t.noT,border:`1px solid ${t.noBrd}`}}>
    <div style={{...mo,fontSize:12,fontWeight:600,letterSpacing:1.5,marginBottom:22,opacity:.6}}>{r}</div>
    {rI.map((e,i)=><div key={i} style={{...sa,fontSize:15,padding:"11px 0",borderBottom:"1px solid rgba(128,128,128,.15)",lineHeight:1.5}}>{e}</div>)}
  </motion.div>
</div>;

const G2 = ({children,s}) => <motion.div initial="h" animate="v" variants={sv} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,...s}}>{Children.map(children,c=>c?<motion.div variants={fi}>{c}</motion.div>:null)}</motion.div>;
const G3 = ({children,s}) => <motion.div initial="h" animate="v" variants={sv} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,...s}}>{Children.map(children,c=>c?<motion.div variants={fi}>{c}</motion.div>:null)}</motion.div>;
const CB = ({color,children}) => <div style={{position:"relative"}}><div style={{position:"absolute",top:-40,right:-80,width:320,height:320,borderRadius:"50%",background:color,opacity:.06}}/><div style={{position:"relative",zIndex:1}}>{children}</div></div>;

// ─── ECOSYSTEM MAP ────────────────────────────────────────────────────────────
const EcoMap = ({t}) => <div style={{margin:"36px 0"}}>
  <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.2}} style={{textAlign:"center",marginBottom:8}}>
    <div style={{...sa,fontSize:20,fontWeight:700,color:t.a}}>YouTube / Twitch</div>
    <div style={{...mo,fontSize:14,color:t.d}}>4,61M + 2,1M abonnés</div>
  </motion.div>
  <motion.div initial={{scaleY:0}} animate={{scaleY:1}} transition={{delay:.35,duration:.3}} style={{width:2,height:32,background:t.a+"30",margin:"0 auto",transformOrigin:"top"}}/>
  <div style={{display:"flex",alignItems:"center"}}>
    <motion.div initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={{delay:.4}} style={{flex:1,textAlign:"right",paddingRight:24}}>
      <div style={{...sa,fontSize:20,fontWeight:700,color:t.a}}>Lockd</div>
      <div style={{...mo,fontSize:14,color:t.d,marginBottom:8}}>E-commerce, Streetwear</div>
    </motion.div>
    <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:.35,duration:.25}} style={{width:28,height:2,background:t.a+"30",flexShrink:0}}/>
    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:.15,type:"spring",stiffness:180,damping:14}} style={{width:160,height:160,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:`3px solid ${t.a}`}}><img src={pu("/lebouseuh.png")} alt="Le Bouseuh" style={{width:"100%",height:"100%",objectFit:"cover"}}/></motion.div>
    <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:.35,duration:.25}} style={{width:28,height:2,background:t.a+"30",flexShrink:0}}/>
    <motion.div initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{delay:.4}} style={{flex:1,paddingLeft:24}}>
      <div style={{...sa,fontSize:20,fontWeight:700,color:t.a}}>Podcast</div>
      <div style={{...mo,fontSize:14,color:t.d,marginBottom:8}}>Hebdo, Acast</div>
    </motion.div>
  </div>
</div>;

// ═══════════════════════════════════════════════════════════════════════════════
// CAS 1
// ═══════════════════════════════════════════════════════════════════════════════
const S1 = [
{title:"Ouverture",r:t=><div style={{textAlign:"center",padding:"80px 0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{marginBottom:48}}><FarLogo size={120} variant={t.lv}/></div><Tg t={t}>CAS PRATIQUE 1 - STRATÉGIE DE DÉVELOPPEMENT COMMERCIAL 12 MOIS</Tg><Hl t={t} s={{fontSize:52,maxWidth:900,margin:"0 auto 32px",textAlign:"center"}}>D'une logique d'opportunités à une logique de portefeuille.</Hl><div style={{...sa,fontSize:16,color:t.d,marginTop:24}}>recommandation par Thibault Loué</div></div>},

{title:"FAR aujourd'hui",r:t=><div><Tg t={t}>DIAGNOSTIC</Tg><Hl t={t} s={{fontSize:44}}>FAR aujourd'hui.</Hl><Sh t={t} white s={{maxWidth:"none"}}>Une base solide, un historique crédible et 4 créateurs exclusifs. Le point de départ pour construire un système commercial plus structuré, plus lisible et plus prévisible.</Sh><G2 s={{marginTop:8}}><div><Wc t={t} s={{padding:28,marginBottom:16}}><Lb t={t}>CE QUE FAR A DÉJÀ</Lb><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{["1 an et demi d'expérimentation","10 ans d'expérience","+50 marques","+100 campagnes","4 créateurs exclusifs","Environnement La Porte"].map((a,i)=><Pl t={t} key={i} s={{fontSize:14,padding:"10px 18px"}}>{a}</Pl>)}</div></Wc><Wc t={t} s={{padding:28}}><Lb t={t}>LES 4 TALENTS EXCLUSIFS</Lb><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{[{n:"Fast Good Cuisine",img:"/fgc.webp"},{n:"Toinelag",img:"/toinelag.webp"},{n:"Le Routin",img:"/leroutin.webp"},{n:"CYRILmp4",img:"/cyrilmp4.webp"}].map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,background:t.a+"10",borderRadius:10,padding:"8px 12px"}}><img src={pu(c.img)} alt={c.n} style={{width:40,height:40,borderRadius:8,objectFit:"cover"}}/><div style={{...sa,fontSize:13,fontWeight:700,color:t.cardT}}>{c.n}</div></div>)}</div></Wc></div><Wc t={t} s={{padding:28}}><Lb t={t}>LES ENJEUX À ADRESSER</Lb><Ar t={t} items={["Augmenter les revenus tout en préservant la marque FAR","Aller au-delà du simple placement de talents","Garder la sélectivité tout en élargissant la surface commerciale","Renforcer la récurrence et la prévisibilité du chiffre d'affaires","Structurer des relais de croissance disciplinés : non-exclusif et conseil","Réduire la dépendance à un trop petit nombre de talents ou de deals"]}/></Wc></G2><div style={{marginTop:24,padding:"16px 32px",borderRadius:14,background:"#1A1A1A",color:"#FFFFFF",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...sa,fontSize:17,lineHeight:1,whiteSpace:"nowrap",color:"#FFFFFF"}}>Comment se servir de l'existant et de nos learnings pour passer un cap dans le développement commercial ?</div></div></div>},

{title:"Ma conviction",r:t=><div><Tg t={t}>MA CONVICTION</Tg><Hl t={t} s={{fontSize:40}}>FAR a tout pour devenir une structure qui transforme des univers de créateurs en plateformes de revenus organisées.</Hl><Sh t={t} white>Tant que FAR se présente comme une « agence de talents », elle se bat sur le même terrain que tout le monde. Le vrai levier de différenciation réside dans la capacité à structurer des revenus, à protéger des catégories, à construire des actifs propriétaires et à défendre un pricing fondé sur la valeur.</Sh><div style={{...mo,fontSize:11,fontWeight:600,letterSpacing:2,color:t.d,marginBottom:16}}>UN ÉCOSYSTÈME BASÉ SUR :</div><div style={{display:"flex",flexDirection:"column",gap:12}}>{[{t:"La récurrence",d:"Revenus longs, partenariats de catégorie, annualisation"},{t:"La cohérence",d:"Catégories protégées, frontières claires, deals sélectionnés"},{t:"La valeur / deal",d:"Pricing structuré, packaging multi-surfaces, droits"},{t:"Les actifs propriétaires",d:"Podcast, chaîne secondaire, format récurrent, événement, live, merch, drop…"},{t:"La sérénité",d:"Rigueur d'exécution, conformité, brand safety"}].map((p,i)=><div key={i} style={{display:"flex",alignItems:"baseline",gap:12,padding:"4px 0"}}><div style={{...sa,fontSize:15,color:t.c,flexShrink:0}}>•</div><div><span style={{...sa,fontSize:15,fontWeight:700,color:t.c}}>{p.t}</span><span style={{...sa,fontSize:15,color:t.m}}> : {p.d}</span></div></div>)}</div><div style={{marginTop:24,padding:"16px 32px",borderRadius:14,background:"#1A1A1A",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...sa,fontSize:16,lineHeight:1,color:"#FFFFFF"}}>Le centre de gravité se déplace du reach brut vers la capacité à construire de la valeur durable.</div></div></div>},

{title:"Priorités",r:t=>{const rows=[{n:"01",title:"Optimiser le roster",d:"Augmenter le rendement des 4 talents actuels. Mieux monétiser ce que FAR contrôle déjà : pricing, récurrence, actifs propriétaires. C'est le premier levier de croissance avant toute expansion.",p:"PARTIE 1"},{n:"02",title:"Stabiliser le portefeuille",d:"Réduire le risque de concentration en passant de 4 à 8 talents exclusifs à 12 mois. Diversifier les verticales (ex : lifestyle, gaming, entertainment), élargir la surface commerciale et renforcer la résilience de l'agence.",p:"PARTIES 1 & 2"},{n:"03",title:"Étendre l'offre commerciale",d:"Construire 2 relais disciplinés : un à destination des talents non-exclusifs et une offre conseil pour les marques. 2 leviers qui nourrissent aussi l'activité des talents in-house.",p:"PARTIES 2 & 3"},{n:"04",title:"Travailler l'attraction",d:"Rendre la marque FAR désirable des 2 côtés du marché (talents & marques).",p:"PARTIE 4"}];return <div><Tg t={t}>PRIORITÉS</Tg><Hl t={t} s={{fontSize:40}}>4 axes pour structurer le développement commercial.</Hl><Sh t={t} white>Chaque axe répond à un enjeu identifié dans le diagnostic. L'ordre reflète la logique de construction : consolider d'abord, étendre ensuite.</Sh><div style={{display:"flex",flexDirection:"column",gap:12,marginTop:28}}>{rows.map((item,i)=><div key={i} style={{display:"flex",gap:16,alignItems:"stretch"}}><Wc t={t} s={{flex:5,padding:"18px 24px",display:"flex",flexDirection:"column",justifyContent:"center"}}><div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:6}}><div style={{...mo,fontSize:12,fontWeight:700,color:t.a,letterSpacing:1}}>{item.n}</div><div style={{...sa,fontSize:18,fontWeight:700,color:t.cardT}}>{item.title}</div></div><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.55}}>{item.d}</div></Wc><div style={{display:"flex",alignItems:"center",flexShrink:0}}><div style={{...mo,fontSize:14,color:t.a,marginRight:10}}>→</div></div><div style={{flex:3,padding:"14px 18px",borderRadius:10,background:t.a+"18",border:`1px solid ${t.a}40`,display:"flex",flexDirection:"column",justifyContent:"center"}}><div style={{...mo,fontSize:11,fontWeight:700,color:t.a,letterSpacing:1}}>{item.p}</div></div></div>)}</div></div>}},

{title:"Partie 1 - Les talents",r:t=><div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh"}}><div style={{...mo,fontSize:16,fontWeight:700,letterSpacing:5,color:t.a,marginBottom:16}}>PARTIE 1</div><Hl t={t} s={{fontSize:44,textAlign:"center",maxWidth:800,margin:"0 auto 24px"}}>Les talents représentés par FAR</Hl><div style={{width:80,height:3,background:t.a,borderRadius:2,margin:"0 auto"}}/></div>},

{title:"4 business plans",r:t=><div><Tg t={t}>APPROCHE</Tg><Hl t={t} s={{fontSize:40}}>4 talents = 4 business plans individualisés.</Hl><Sh t={t} white>Chaque créateur exclusif mérite une approche sur-mesure. Territoire, catégories, formats, actifs, références, pricing, trajectoire : un plan complet qui rend le talent vendable côté marques et pilotable côté agence.</Sh><div style={{display:"flex",gap:16,margin:"36px 0"}}>{[{n:"Fast Good Cuisine",img:"/fgc.webp"},{n:"Toinelag",img:"/toinelag.webp"},{n:"Le Routin",img:"/leroutin.webp"},{n:"CYRILmp4",img:"/cyrilmp4.webp"}].map((c,i)=><div key={i} style={{flex:1,background:t.card,borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}><div style={{aspectRatio:"1/1",overflow:"hidden",margin:10,borderRadius:12}}><img src={pu(c.img)} alt={c.n} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/></div><div style={{padding:"12px 20px 16px"}}><div style={{...se,fontSize:20,fontWeight:700,color:t.cardT}}>{c.n}</div></div></div>)}</div><div style={{marginTop:24,padding:"16px 32px",borderRadius:14,background:"#1A1A1A",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...sa,fontSize:16,lineHeight:1.4,color:"#FFFFFF"}}>À 4 talents, pas de micro-segmentation artificielle. La bonne granularité, c'est un business plan par talent. Chaque créateur doit être piloté comme une mini business unit avec un territoire clair, des catégories protégées, un plan de revenus et un plan d'actifs.</div></div></div>},

{title:"ID card business",r:t=><div><Tg t={t}>ID CARD BUSINESS</Tg><Hl t={t} s={{fontSize:32}}>Un outil indispensable pour comprendre nos talents.</Hl><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderRadius:16,overflow:"hidden",marginTop:24}}>{[{t:"Territoire éditorial exact",d:"Ce que le créateur incarne vraiment, son positionnement naturel"},{t:"Catégories marques naturelles, possibles et interdites",d:"Où vendre, où ne pas vendre, les frontières claires"},{t:"Formats forts",d:"YouTube, live, podcast, shorts, IRL, formats récurrents…"},{t:"Actifs propriétaires existants ou à créer",d:"Podcast, marque, format récurrent, événement, live, communauté"},{t:"Références commerciales",d:"Ce qui crédibilise le dossier auprès des annonceurs"},{t:"Signaux de brand safety",d:"Ce qui rassure les marques : historique, tonalité, risques"},{t:"Shortlist de 20 annonceurs prioritaires",d:"Cibles qualifiées à 12 mois avec hypothèses de partenariat"},{t:"Trajectoire de revenus + plan d'actifs",d:"One-shots, récurrence, ticket moyen, construction d'actifs propriétaires"}].map((f,i)=><div key={i} style={{padding:"20px 24px",background:i%2===0?"#F5F5F0":"#FFFFFF",borderBottom:i<6?"1px solid #E8E8E3":"none"}}><div style={{...sa,fontSize:14,fontWeight:700,marginBottom:4,color:t.cardT}}>{f.t}</div><div style={{...sa,fontSize:12,color:t.m,lineHeight:1.5}}>{f.d}</div></div>)}</div><div style={{display:"flex",gap:8,marginTop:20,width:"100%"}}>{["Plus lisible pour les marques","Plus pilotable côté agence","Plus robuste en pricing","Plus utile pour la récurrence"].map((b,i)=><div key={i} style={{flex:1,textAlign:"center",...mo,fontSize:10,fontWeight:600,padding:"10px 14px",borderRadius:10,background:t.card,color:t.cardT}}>{b}</div>)}</div><div style={{marginTop:24,padding:"16px 32px",borderRadius:14,background:"#1A1A1A",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...sa,fontSize:16,lineHeight:1.4,color:"#FFFFFF"}}>L'ID card business, c'est l'outil de pilotage central pour chaque talent exclusif. Elle permet de rendre le talent vendable côté marque et pilotable côté agence.</div></div></div>},

{title:"Les 5 lignes d'offre exclusive",r:t=><div><Tg t={t}>OFFRE EXCLUSIVE</Tg><Hl t={t} s={{fontSize:28}}>5 piliers d'offres complémentaires pour structurer la valeur d'un talent exclusif.</Hl><div style={{display:"flex",gap:10,marginTop:28}}>{[{n:"01",t:"Sponsoring éditorial",d:"Une marque sponsorise un format existant du créateur (vidéo YouTube, live, épisode), avec une intégration native et des déclinaisons (cutdowns, whitelisting)."},
{n:"02",t:"Partenariats de catégorie",d:"Une marque achète un territoire exclusif (catégorie) sur une durée longue (6-12 mois). Objectif : récurrence, cohérence, mémorisation."},
{n:"03",t:"Brand content co-construit",d:"Un concept sur-mesure conçu avec la marque, où la marque est structurellement utile au récit (pas une démo) et génère des assets exploitables."},
{n:"04",t:"Sponsoring d'actifs propriétaires",d:"Une marque sponsorise un actif que le créateur possède (podcast, marque, format récurrent, événement), avec une présence plus rare mais plus mémorable."},
{n:"05",t:"Partenariats B2B / projets talents",d:"Des deals liés au business du créateur (entrepreneur) : infrastructure, outils, opérations (drop, merch, IRL). Plus partenariat que pub."}].map((b,i)=><div key={i} style={{flex:1,background:t.card,borderRadius:14,padding:"20px 16px",display:"flex",flexDirection:"column",border:`1px solid ${t.brd}`}}><div style={{...mo,fontSize:11,fontWeight:700,color:t.a,letterSpacing:1,marginBottom:8}}>{b.n}</div><div style={{...sa,fontSize:14,fontWeight:700,color:t.cardT,marginBottom:8}}>{b.t}</div><div style={{...sa,fontSize:12,color:t.m,lineHeight:1.5}}>{b.d}</div></div>)}</div><div style={{marginTop:24,padding:"16px 32px",borderRadius:14,background:"#1A1A1A",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...sa,fontSize:16,lineHeight:1.4,color:"#FFFFFF"}}>Chaque talent exclusif devient une offre commerciale multi-surfaces, pas un simple espace publicitaire.</div></div></div>},

{title:"Pricing & proposition commerciale",r:t=><div><Tg t={t}>PRICING & MONÉTISATION</Tg><Hl t={t} s={{fontSize:34}}>Un pricing fondé sur la valeur produite, pas sur la seule portée.</Hl><Sh t={t} white>Défendre un prix structuré permet de sortir d'une logique 100% CPM et de valoriser l'ensemble de ce qu'un talent apporte : créativité, actifs, audience qualifiée, droits, exclusivité.</Sh><G2 s={{marginTop:20}}><Wc t={t} s={{padding:28}}><Lb t={t}>STRUCTURE DES DEVIS - 8 BLOCS</Lb><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.5,marginBottom:12}}>Chaque proposition commerciale est systématiquement décomposée en 8 blocs distincts pour rendre le pricing lisible et défendable auprès des annonceurs.</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>{[{n:"Fee talent",d:"Rémunération du créateur"},{n:"Fee agence",d:"Commission FAR"},{n:"Stratégie / créa",d:"Conception et direction artistique"},{n:"Production",d:"Tournage, montage, post-prod"},{n:"Droits",d:"Exploitation, durée, territoires"},{n:"Exclusivité",d:"Protection catégorielle"},{n:"Amplification",d:"Paid media, whitelisting"},{n:"Performance",d:"Affiliation, tracking, conversion"}].map((b,i)=><div key={i} style={{padding:"12px 14px",borderRadius:10,background:t.a+"15"}}><div style={{...mo,fontSize:11,fontWeight:700,color:t.a,marginBottom:4}}>{b.n}</div><div style={{...sa,fontSize:11,color:t.m,lineHeight:1.4}}>{b.d}</div></div>)}</div></Wc><Wc t={t} s={{padding:28}}><Lb t={t}>POUR ALLER PLUS LOIN : PRICING ENGINE IA</Lb><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.5,marginBottom:12}}>On pourrait imaginer un outil interne assisté par IA qui recommande un prix en fonction de données objectives. L'outil ne décide pas, l'équipe commerciale valide. L'objectif : être plus juste dans le pricing et plus rapide dans la réponse.</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>{[{n:"Performances réelles",d:"Vues, engagement, taux de complétion"},{n:"Évolution audience",d:"Croissance, démographie, qualité"},{n:"Tension marché",d:"Demande sur la catégorie"},{n:"Niveau de production",d:"Complexité du livrable"},{n:"Durée des droits",d:"Exploitation temporelle et géo"},{n:"Pression d'exclusivité",d:"Nombre de catégories bloquées"},{n:"Urgence du deal",d:"Délai et disponibilité"}].map((b,i)=><div key={i} style={{padding:"12px 14px",borderRadius:10,background:t.card,border:`1px solid ${t.brd}`}}><div style={{...sa,fontSize:12,fontWeight:700,color:t.cardT,marginBottom:3}}>{b.n}</div><div style={{...sa,fontSize:11,color:t.m,lineHeight:1.4}}>{b.d}</div></div>)}</div></Wc></G2><div style={{marginTop:24,padding:"16px 32px",borderRadius:14,background:"#1A1A1A",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...sa,fontSize:16,lineHeight:1.4,color:"#FFFFFF"}}>Chaque devis devient un outil de négociation transparent, basé sur du rationnel, pour faciliter les discussions commerciales.</div></div></div>},

{title:"Doubler le roster",r:t=><div><Tg t={t}>DOUBLEMENT DU ROSTER</Tg><div style={{textAlign:"center",padding:"32px 0 36px"}}><div style={{...se,fontSize:96,fontWeight:800,color:t.a,lineHeight:1}}>4 → <AC v={8}/></div><div style={{...sa,fontSize:18,color:t.m,lineHeight:1.6,maxWidth:600,margin:"16px auto 0"}}>Il y a une nécessité de passer de 4 à 8 talents exclusifs en 12 mois pour élargir la surface commerciale, réduire le risque de concentration et rendre FAR plus attractive des 2 côtés du marché.</div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}><Wc t={t} s={{padding:24}}><Lb t={t}>PRIORITÉS</Lb><div style={{...sa,fontSize:14,color:t.cardT,lineHeight:1.7}}>→ 2 profils immédiatement monétisables<br/>→ 2 profils à fort potentiel (actifs, projets, montée en gamme)</div></Wc><Wc t={t} s={{padding:24}}><Lb t={t}>7 CRITÈRES</Lb><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{["Territoire éditorial clair","Potentiel commercial réel","Fiabilité opérationnelle","Partenariats longs","Actifs propriétaires","Culture FAR","Envie de construire"].map((c,i)=><span key={i} style={{...mo,fontSize:11,fontWeight:600,padding:"6px 12px",borderRadius:6,background:t.a+"15",color:t.a}}>{c}</span>)}</div></Wc><Wc t={t} s={{padding:24}}><Lb t={t}>SOURCES</Lb><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{["Réseau FAR & groupe","Recommandations roster","Scouting continu","Non-exclusif testé","Plateformes & events"].map((s,i)=><span key={i} style={{...mo,fontSize:11,fontWeight:600,padding:"6px 12px",borderRadius:6,background:t.a+"15",color:t.a}}>{s}</span>)}</div></Wc></div><div style={{marginTop:20}}><Lb t={t}>EXEMPLE DE FUNNEL DE SIGNATURE</Lb><div style={{display:"flex",gap:8,marginTop:8}}>{[{l:"Long list",v:"30"},{l:"Contacts qualifiés",v:"12"},{l:"Discussions approfondies",v:"6"},{l:"Signatures / 12 mois",v:"4"}].map((item,i)=><motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.12,duration:.4,ease:[.22,1,.36,1]}} style={{flex:1,padding:"16px 20px",borderRadius:12,background:i===0?t.th:t.card,color:i===0?t.thT:t.cardT,border:i===0?"none":`1px solid ${t.brd}`,textAlign:"center"}}><div style={{...se,fontSize:28,fontWeight:800}}>{item.v}</div><div style={{...sa,fontSize:12,color:i===0?t.thT:t.m,marginTop:4}}>{item.l}</div></motion.div>)}</div></div></div>},

{title:"Partie 2 - Intercalaire",r:t=><div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh"}}><div style={{...mo,fontSize:16,fontWeight:700,letterSpacing:5,color:t.a,marginBottom:16}}>PARTIE 2</div><Hl t={t} s={{fontSize:44,textAlign:"center",maxWidth:800,margin:"0 auto 24px"}}>Créateurs non représentés par l'agence</Hl><div style={{width:80,height:3,background:t.a,borderRadius:2,margin:"0 auto"}}/></div>},

{title:"2 nouveaux concepts",r:t=><div><Tg t={t}>HORS-ROSTER</Tg><Hl t={t} s={{fontSize:32}}>Structurer le hors-roster et couvrir l'intégralité du spectre des talents non exclusifs.</Hl><div style={{display:"flex",gap:24,marginTop:40}}><div style={{flex:1,padding:"48px 40px",borderRadius:16,background:t.card,border:`1px solid ${t.brd}`,display:"flex",flexDirection:"column",alignItems:"flex-start"}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}><div style={{...mo,fontSize:14,fontWeight:800,letterSpacing:3,color:t.a,padding:"8px 20px",background:t.a+"20",borderRadius:8}}>OFFRE</div><div style={{...mo,fontSize:10,fontWeight:700,letterSpacing:1,color:"#FFFFFF",background:"#1A1A1A",padding:"4px 12px",borderRadius:6,border:`1px solid ${t.a}`}}>NOUVEAU</div></div><div style={{...se,fontSize:32,fontWeight:800,marginBottom:16,color:t.a,lineHeight:1.2}}>FAR Talent Solutions</div><div style={{...sa,fontSize:18,color:t.m,lineHeight:1.6}}>Une offre dédiée pour les créateurs non représentés.</div></div><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,gap:4}}><div style={{...mo,fontSize:11,color:t.d}}>nourrit</div><div style={{fontSize:28,color:t.d}}>←</div></div><div style={{flex:1,padding:"48px 40px",borderRadius:16,background:"#1A1A1A",border:"2px solid #333",display:"flex",flexDirection:"column",alignItems:"flex-start"}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}><div style={{...mo,fontSize:14,fontWeight:800,letterSpacing:3,color:"#FFFFFF",padding:"8px 20px",background:"rgba(255,255,255,.1)",borderRadius:8}}>OUTIL</div><div style={{...mo,fontSize:10,fontWeight:700,letterSpacing:1,color:"#FFFFFF",background:"#1A1A1A",padding:"4px 12px",borderRadius:6,border:`1px solid ${t.a}`}}>NOUVEAU</div></div><div style={{...se,fontSize:32,fontWeight:800,marginBottom:16,color:"#FFFFFF",lineHeight:1.2}}>Radar Talents</div><div style={{...sa,fontSize:18,color:"#AAAAAA",lineHeight:1.6}}>Un dispositif permanent de scouting et de qualification qui alimente FAR Talent Solutions.</div></div></div></div>},

{title:"FAR Talent Solutions",r:t=><div><Tg t={t}>FAR TALENT SOLUTIONS</Tg><Hl t={t} s={{fontSize:34}}>Le non-exclusif comme accélérateur.</Hl><Sh t={t} white>FAR Talent Solutions la structure sous une offre dédiée, avec ses propres règles.</Sh><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginTop:20}}><div style={{padding:24,borderRadius:16,background:t.a+"15",border:`1px solid ${t.a}30`}}><div style={{...sa,fontSize:14,fontWeight:800,letterSpacing:1,color:t.a,marginBottom:14}}>OFFRE CONCRÈTE</div><Ar t={t} sm items={["Deal desk premium sur brief ou opportunité","Négociation, production, conformité, paiement"]}/></div><Wc t={t} s={{padding:24}}><div style={{...sa,fontSize:14,fontWeight:800,letterSpacing:1,color:t.cardT,marginBottom:14}}>RÈGLES DU JEU</div><Ar t={t} sm items={["Logique deal par deal, sans engagement long","Pas de cannibalisation du roster exclusif, priorité absolue aux talents signés","Pas de deals lourds à faible marge, discipline de sélection","Rôle FAR clarifié dès le départ avec le talent et l'agent","Go / no-go rapide, pas de process interminable"]}/></Wc><div style={{padding:24,borderRadius:16,background:"#1A1A1A",border:"1px solid #333"}}><div style={{...sa,fontSize:14,fontWeight:800,letterSpacing:1,color:"#FFFFFF",marginBottom:14}}>FONCTIONS</div><Ar t={{...t,c:"#E0E0E0",m:"#BBBBBB",a:"#FFFFFF",d:"#999999"}} sm items={["Gagner plus de briefs avec un meilleur casting, avec ou sans agent","Collaboration test et gain de briefs","Générer du CA complémentaire sans gonfler artificiellement le roster","Source de recrutement pour le roster exclusif","Gagner en notoriété auprès des marques et des talents"]}/></div></div></div>},

{title:"Viviers et Radar Talents",r:t=><div><Tg t={t}>SCOUTING & PIPELINE</Tg><Hl t={t} s={{fontSize:34}}>Un outil pour identifier les talents.</Hl><Sh t={t} white>Le scouting doit devenir un vrai dispositif permanent, structuré, alimenté par l'IA et le réseau, avec des viviers clairement segmentés.</Sh><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:32,margin:"32px 0"}}><Wc t={t} s={{flex:1,padding:24,textAlign:"center"}}><div style={{...sa,fontSize:18,fontWeight:700,marginBottom:6}}>Brief-ready</div><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.5}}>Créateurs ou agents déjà qualifiés et activables rapidement. Vivier de réponse aux briefs entrants.</div></Wc><div style={{display:"flex",alignItems:"center",gap:16}}><div style={{width:2,height:40,background:t.brd}}/><motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:180,damping:15}} style={{width:160,height:160,borderRadius:"50%",background:t.th,color:t.thT,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",...se,fontSize:20,fontWeight:800,flexShrink:0,lineHeight:1.2,padding:16}}>Radar<br/>Talents</motion.div><div style={{width:2,height:40,background:t.brd}}/></div><Wc t={t} s={{flex:1,padding:24,textAlign:"center"}}><div style={{...sa,fontSize:18,fontWeight:700,marginBottom:6}}>Exclusive pipeline</div><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.5}}>Les potentielles futures signatures du roster.</div></Wc></div><div style={{display:"flex",justifyContent:"center",margin:"-8px 0 24px"}}><Wc t={t} s={{padding:24,textAlign:"center",maxWidth:400}}><div style={{...sa,fontSize:18,fontWeight:700,marginBottom:6}}>Test pool</div><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.5}}>Créateurs prometteurs mais pas encore totalement validés commercialement. À tester sur des opérations non risquées.</div></Wc></div><Lb t={t}>COMPOSANTES DU RADAR</Lb><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>{["Veille plateforme continue","Alertes de croissance et viralité","Analyse des signaux d'engagement","Suivi des scènes émergentes","Recommandations du réseau","Repérage des créateurs qui construisent des actifs"].map((r,i)=><div key={i} style={{...mo,fontSize:12,fontWeight:600,padding:"14px 18px",borderRadius:10,background:t.a+"15",color:t.a,textAlign:"center"}}>{r}</div>)}</div><div style={{marginTop:16,padding:"16px 32px",borderRadius:14,background:"#1A1A1A",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...sa,fontSize:16,lineHeight:1.4,color:"#FFFFFF"}}>L'IA fait gagner du temps : détection de profils montants, clustering de territoires, signaux de risque, synthèse de tendances, enrichissement de fiches. Nous gardons bien sûr la décision finale.</div></div></div>},

{title:"Exclusif vs non-exclusif  -  Récap",r:t=><div><Tg t={t}>Récapitulatif des 2 niveaux d'accompagnement</Tg><Hl t={t} s={{fontSize:38}}>L'exclusivité doit donner accès à un autre niveau de valeur.</Hl><Sh t={t}>Côté talent, ce différentiel crée l'envie de rejoindre le roster. Côté business, il structure la discipline commerciale ou chaque profil a un périmètre d'offre clair.</Sh><Cmp t={t} l="TALENT EXCLUSIF FAR" lI={["Prospection proactive et structurée","Stratégie de catégories et d'annualisation","Construction d'actifs propriétaires monétisables","Discipline de pricing, droits, exclusivités, extensions","Accompagnement projet autour des idées du talent","Accès réseau marques / plateformes / partenaires","Pilotage business trimestriel","5 lignes d'offre structurées"]} r="FAR TALENT SOLUTIONS (NON-EXCLUSIF)" rI={["Deal desk premium sur brief ou opportunité","Négociation, production, conformité, paiement","Collaboration test et gain de briefs","Moins de profondeur stratégique","Logique deal par deal","Source de recrutement pour le roster exclusif"]}/><div style={{marginTop:24,padding:"16px 32px",borderRadius:14,background:"#1A1A1A",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...sa,fontSize:16,lineHeight:1.4,color:"#FFFFFF"}}>Rejoindre FAR c'est accéder à une stratégie, un réseau et un niveau d'ambition business supérieur.</div></div></div>},

{title:"Partie 3 - Intercalaire",r:t=><div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh"}}><div style={{...mo,fontSize:16,fontWeight:700,letterSpacing:5,color:t.a,marginBottom:16}}>PARTIE 3</div><Hl t={t} s={{fontSize:44,textAlign:"center",maxWidth:800,margin:"0 auto 24px"}}>Conseil marques en stratégie d'influence</Hl><div style={{width:80,height:3,background:t.a,borderRadius:2,margin:"0 auto"}}/></div>},

{title:"Offre conseil marques",r:t=><div><Tg t={t}>OFFRE CONSEIL</Tg><Hl t={t} s={{fontSize:34}}>FAR est le modèle le plus légitime pour accompagner les marques.</Hl><Sh t={t} white>Disposer d'un roster et d'un accès direct aux créateurs donne à FAR un avantage que aucun cabinet généraliste ne peut répliquer. 4 offres concrètes structurent cette expertise en stratégie d'influence, avec un double intérêt : marge de conseil directe et portes d'entrée qui nourrissent l'activité talents.</Sh><div style={{...mo,fontSize:11,fontWeight:600,letterSpacing:2,color:t.d,marginBottom:16}}>4 OFFRES CONSEIL</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>{[{n:"01",t:"Audit & Roadmap",d:"Offre d'entrée pour les marques « niveau 0 » ou peu structurées en influence. Diagnostic de l'existant, mapping des territoires pertinents, recommandation de créateurs, feuille de route à 6-12 mois avec priorités et budgets.",p:"4 000 - 10 000 €"},{n:"02",t:"FAR Creator Lab",d:"Format intensif : 1 marque, 1 talent, 10 jours ouvrés, 1 concept prêt à produire. Immersion dans l'univers du créateur, co-construction du concept, brief créatif, maquette de contenu, plan de diffusion.",p:"15 000 - 30 000 €"},{n:"03",t:"Campaign Studio",d:"Pilotage complet d'une campagne d'influence : recommandation stratégique, casting, négociation, production, coordination, pilotage opérationnel et reporting de performance.",p:"Sur devis"},{n:"04",t:"Accompagnement continu (freelance partenaire)",d:"Au trimestre ou au semestre pour les marques actives mais insuffisamment structurées. Suivi stratégique régulier, optimisation du portefeuille créateurs, revue des performances et ajustements.",p:"5 000 - 12 000 € / mois"}].map((o,i)=><div key={i} style={{padding:"28px 24px",borderRadius:16,background:t.card,border:`1px solid ${t.brd}`,display:"flex",flexDirection:"column"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{...mo,fontSize:11,fontWeight:700,color:t.a,letterSpacing:1}}>{o.n}</div><div style={{...sa,fontSize:18,fontWeight:700,color:t.cardT}}>{o.t}</div></div><div style={{...se,fontSize:18,fontWeight:800,color:t.a}}>{o.p}</div></div><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.6}}>{o.d}</div></div>)}</div></div>},


{title:"Ciblage & canaux",r:t=><div><Tg t={t}>CIBLAGE & CANAUX</Tg><Hl t={t} s={{fontSize:34}}>60-80 marques cibles, 5 verticales, 5 canaux.</Hl><G2 s={{marginTop:20}}><Wc t={t} s={{padding:28}}><Lb t={t}>5 VERTICALES PRIORITAIRES</Lb>{["Food / FMCG / retail food","Gaming / hardware / apps / telecom","Entertainment / streaming / plateformes","Consumer tech / creator tools / e-commerce","Lifestyle / retail / mode / IRL"].map((v,i)=><div key={i} style={{...sa,fontSize:14,color:t.cardT,padding:"10px 0",borderBottom:`1px solid ${t.brd}`}}>{v}</div>)}<div style={{...sa,fontSize:12,color:t.m,marginTop:12,lineHeight:1.6}}>Pour chaque : interlocuteurs clés, hypothèse de partenariat, créateur crédible, idée d'activation, prochaine étape.</div></Wc><Wc t={t} s={{padding:28}}><Lb t={t}>5 CANAUX DE CONTACT</Lb><Ar t={t} items={["Intros réseau agence / talents / groupe","Email très personnalisé","LinkedIn brand / social / influence","WhatsApp post-qualification","Événements, déjeuners, dîners"]}/></Wc></G2></div>},

{title:"Partie 4 - Intercalaire",r:t=><div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh"}}><div style={{...mo,fontSize:16,fontWeight:700,letterSpacing:5,color:t.a,marginBottom:16}}>PARTIE 4</div><Hl t={t} s={{fontSize:44,textAlign:"center",maxWidth:800,margin:"0 auto 24px"}}>Travailler la marque FAR</Hl><div style={{width:80,height:3,background:t.a,borderRadius:2,margin:"0 auto"}}/></div>},

{title:"Attractivité FAR",r:t=><div><Tg t={t}>ATTRACTIVITÉ</Tg><Hl t={t} s={{fontSize:34}}>Rendre FAR désirable des 2 côtés du marché.</Hl><Sh t={t} white>La performance commerciale et la désirabilité vont de pair et se construit des 2 côtés du marché.</Sh><div style={{display:"flex",gap:16,marginTop:20}}><div style={{flex:1,padding:28,borderRadius:16,background:t.card,border:`1px solid ${t.brd}`}}><div style={{...sa,fontSize:16,fontWeight:800,color:t.a,marginBottom:14}}>POUR LES TALENTS</div><Ar t={t} items={["Agence sélective, donc valorisante","Agence qui vend bien et défend un pricing juste","Aide à construire des revenus plus intelligents","Accompagne des projets plus larges que la campagne","Ouvre des portes plateformes, marques, écosystème","Aide à faire émerger des formats propriétaires"]}/></div><div style={{flex:1,padding:28,borderRadius:16,background:"#1A1A1A",border:"1px solid #333"}}><div style={{...sa,fontSize:16,fontWeight:800,color:"#FFFFFF",marginBottom:14}}>POUR LES MARQUES</div><Ar t={{...t,c:"#E0E0E0",m:"#BBBBBB",d:"#999"}} items={["Propose des créateurs ET des concepts","Plus agile qu'une grosse agence de volume","Comprend la culture créateur au-delà du média","Capable de monter des opérations premium multi-surfaces","Packaging structuré, pricing transparent, droits clairs"]}/></div></div><div style={{marginTop:24,padding:"24px 32px",borderRadius:14,background:t.th,display:"flex",alignItems:"center",gap:20}}><div style={{...se,fontSize:48,flexShrink:0}}>🏎️</div><div><div style={{...sa,fontSize:16,fontWeight:700,color:t.thT,marginBottom:6}}>L'exemple du GP Explorer (Bump/Squeezie)</div><div style={{...sa,fontSize:15,color:t.thT,lineHeight:1.5,opacity:.85}}>Un créateur peut devenir le point de départ d'un projet commercial, éditorial et événementiel beaucoup plus large. FAR a intérêt à explorer cette possibilité avec certains talents comme CYRILmp4.</div></div></div></div>},

{title:"Plateformes & marché",r:t=><div><Tg t={t}>PLATEFORMES, ÉVÉNEMENTS & VISIBILITÉ</Tg><Hl t={t} s={{fontSize:30}}>Branchée aux écosystèmes, présente aux bons rendez-vous.</Hl><Sh t={t} white>La stratégie commerciale ne se joue pas seulement dans le CRM. FAR doit être connectée aux plateformes comme partenaire reconnu et sa présence événementielle doit servir 3 objectifs : business, scouting et marque FAR.</Sh><G2 s={{marginTop:16}}><Wc t={t} s={{padding:28}}><Lb t={t}>PLATEFORMES</Lb>{[{n:"Instagram",d:"Découverte, casting et mise en relation marques créateurs via l'écosystème créateurs"},{n:"YouTube",d:"Contenus sponsorisés, deals long format, accès à l'écosystème BrandConnect et aux équipes partenaires"},{n:"TikTok",d:"Collaborations marques créateurs, amplification et formats courts à très fort reach"},{n:"Twitch",d:"Partenariats live, dispositifs récurrents et intégrations community first"}].map((p,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<3?`1px solid ${t.brd}`:"",marginBottom:4}}><div style={{...sa,fontSize:15,fontWeight:700}}>{p.n}</div></div>)}<Lb t={t} s={{marginTop:20}}>ACTIONS CONCRÈTES</Lb><Ar t={t} items={["RDV réguliers avec les équipes plateformes","Circulation d'insights catégories et tendances","Accès aux bêtas et learnings","Cas communs et co-selling quand pertinent"]} sm/></Wc><div><Lb t={t} w>RENDEZ-VOUS PRIORITAIRES</Lb><Sh t={t}>Chaque événement doit servir 3 choses : générer du business, scouter des talents, et renforcer la marque FAR.</Sh><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{[{n:"One to One Monaco",d:"Business"},{n:"VivaTech",d:"Tech & innovation"},{n:"Cannes Lions",d:"Créativité & marques"},{n:"Paris Creator Week",d:"Créateurs & marché"},{n:"TwitchCon Europe",d:"Gaming & communautés"},{n:"gamescom",d:"Gaming & entertainment"},{n:"DMEXCO",d:"Digital marketing"},{n:"Paris Games Week",d:"Gaming grand public"}].map((e,i)=><div key={i} style={{...mo,fontSize:11,fontWeight:600,padding:"12px 16px",borderRadius:8,background:t.card,color:t.cardT,display:"flex",flexDirection:"column",gap:2}}><span>{e.n}</span><span style={{fontSize:9,opacity:.5,fontWeight:400}}>{e.d}</span></div>)}</div></div></G2></div>},


{title:"Partie 5 - Intercalaire",r:t=><div style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh"}}><div style={{...mo,fontSize:16,fontWeight:700,letterSpacing:5,color:t.a,marginBottom:16}}>PARTIE 5</div><Hl t={t} s={{fontSize:44,textAlign:"center",maxWidth:800,margin:"0 auto 24px"}}>Plan d'action</Hl><div style={{width:80,height:3,background:t.a,borderRadius:2,margin:"0 auto"}}/></div>},

{title:"Plan 90 jours",r:t=><div><Tg t={t}>PLAN 90 JOURS</Tg><Hl t={t} s={{fontSize:26}}>Mettre en place la machine.</Hl><Sh t={t} white>Le vrai objectif des 90 premiers jours : poser les fondations du système commercial qui rend tout le reste possible.</Sh><TL t={t} phases={[{t:"Jours 1-30",s:"Se mettre en ordre de bataille",items:["Audit deals passés, marges, cycles de vente","Construction des 4 ID cards business talents","Formalisation de l'offre des talents exclusifs FAR","Formalisation de FAR Talent Solutions","Création Audit & Roadmap Influence + Creator Lab","Définition du process de recrutement 4→8","Constitution long list 30 talents cibles","Sélection 60-80 marques / agences prioritaires","Mise en place des outils + base opératoire + IA"]},{t:"Jours 31-60",s:"Lancer la traction commerciale",items:["Premiers rendez-vous plateformes","Lancement prospection ciblée par verticale","Prise de contact personnalisée comptes prioritaires","Premiers rendez-vous marques","Packaging de 3-4 offres fortes avec le roster","Activation du Radar Talents","Qualification talents dans les 3 viviers","5 rencontres qualitatives talents cibles","Premiers deals test avec profils non-exclusifs","Construction d'un deck de best case in-house"]},{t:"Jours 61-90",s:"Signer, apprendre, recruter",items:["Sécurisation premiers closings roster actuel","Au moins 1 deal structurant multi-assets ou semi-récurrent","Exécution d'un premier Creator Lab ou audit transformé","1 signature talent visée ou 2 en phase très avancée","Arbitrage du pricing engine (le module IA)","Revue win/loss"]}]}/></div>},

{title:"Stack, cadence & IA",r:t=><div><Tg t={t}>STACK, CADENCE & IA</Tg><Hl t={t} s={{fontSize:34}}>Outils simples, cadence rigoureuse, IA comme accélérateur.</Hl><G2 s={{marginTop:20}}><div><Wc t={t} s={{padding:28,marginBottom:16}}><Lb t={t}>STACK TECHNIQUE</Lb>{[{n:"HubSpot",d:"CRM central : comptes, contacts, pipe, forecast. Smart CRM avec IA pour préparation RDV et analyse."},{n:"Airtable",d:"Couche opératoire talents / assets / pricing : la base de données créateurs."},{n:"Make",d:"Automatisation et connexions entre les outils."}].map((x,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<2?`1px solid ${t.brd}`:"",marginBottom:4}}><div style={{...sa,fontSize:15,fontWeight:700}}>{x.n}</div><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.4}}>{x.d}</div></div>)}</Wc><Wc t={t} s={{padding:28}}><Lb t={t}>CADENCE COMMERCIALE</Lb><Ar t={t} items={["Revue pipeline hebdomadaire","Win/loss review mensuel","Point business talent toutes les 2 semaines","Owner unique par opportunité"]}/></Wc></div><Wc t={t} s={{padding:28}}><Lb t={t}>IA  -  7 USAGES CLÉS</Lb><Ar t={t} items={["Scouting et scoring de talents","Enrichissement comptes et veille marques","Recommandations de pricing","Synthèse de réunions et follow-ups","Génération de premières propositions commerciales","Checklists droits / exclusivité / livrables","Priorisation du pipe"]}/></Wc></G2></div>},

{title:"Business mix & KPIs",r:t=><div><Tg t={t}>BUSINESS MIX CIBLE</Tg><Hl t={t} s={{fontSize:36}}>Répartition cible du nouveau chiffre d'affaires.</Hl><Sh t={t} white>C'est cette répartition qui fait que FAR n'est plus exposée à un seul risque. 3 moteurs complémentaires, une ambition de récurrence transversale.</Sh><div style={{display:"flex",gap:0,borderRadius:20,overflow:"hidden",margin:"36px 0",border:`1px solid ${t.brd}`}}>{[{pct:60,l:"Créateurs exclusifs FAR",d:"Le moteur principal. Exclusifs optimisés, mieux packagés, avec des deals structurants."},{pct:25,l:"FAR Talent Solutions",d:"CA complémentaire, gain de briefs, pipeline de recrutement."},{pct:15,l:"Conseil marques",d:"Marge de conseil + portes d'entrée vers l'activité talents."}].map((b,i)=><div key={i} style={{flex:b.pct,padding:"32px 24px",background:i===0?t.th:i===1?t.card:"transparent",color:i===0?t.thT:t.cardT||t.c,borderRight:i<2?`1px solid ${t.brd}`:"none",display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div><div style={{...se,fontSize:48,fontWeight:800,lineHeight:1}}>{b.pct}%</div><div style={{...sa,fontSize:15,fontWeight:700,marginTop:8}}>{b.l}</div></div><div style={{...sa,fontSize:12,color:i===0?t.thT+"bb":t.m,lineHeight:1.5,marginTop:16}}>{b.d}</div></div>)}</div></div>},

{title:"Défis & réponses",r:t=><div><Tg t={t}>RISQUES & RÉPONSES</Tg><Hl t={t} s={{fontSize:30}}>8 scénarios de risque, 8 réponses structurelles.</Hl><Sh t={t} white>Pas seulement les freins du quotidien, les vrais scénarios de crise ou de fragilité structurelle. Pour chaque risque, une réponse qui ne dépend pas de la bonne volonté mais du système.</Sh><div style={{display:"flex",flexDirection:"column",gap:0,marginTop:16}}>{[{c:"Perte d'un talent du roster",r:"Réduction du risque de concentration, pipeline permanent de signatures, relation marques documentée dans le CRM."},{c:"Bad buzz majeur touchant un talent",r:"Protocole de crise 24h, gel commercial temporaire si nécessaire, point immédiat avec les marques concernées."},{c:"Baisse de performance plateforme / algorithme",r:"Vendre des systèmes multi-surfaces, suivre les signaux mensuellement, renforcer les actifs propriétaires."},{c:"Marché publicitaire plus lent ou budgets gelés",r:"Offres d'entrée légères (Audit, Creator Lab), phasage des campagnes, packages modulaires."},{c:"Pression sur les prix et érosion de marge",r:"Discipline de pricing, décomposition des devis, seuils de marge minimum."},{c:"Doublement du roster > capacité d'exécution",r:"Montée en puissance des process en parallèle du recrutement."},{c:"Dépendance à peu de marques / verticales",r:"Portefeuille diversifié, objectifs par verticale, revue régulière de la concentration."},{c:"Désalignement interne sales / talent / prod / juridique",r:"Circuit de validation court, owner unique, debrief systématique."}].map((item,i)=><div key={i} style={{display:"flex",alignItems:"baseline",gap:12,padding:"10px 0",borderBottom:i<7?`1px solid ${t.brd}`:"none"}}><div style={{...sa,fontSize:14,fontWeight:700,flex:1,color:t.c}}>{item.c}</div><div style={{...mo,fontSize:13,color:t.m,flexShrink:0}}>→</div><div style={{...sa,fontSize:13,color:t.m,flex:1,lineHeight:1.45}}>{item.r}</div></div>)}</div></div>},

{title:"Vision",r:t=><div style={{textAlign:"center",padding:"60px 0"}}><div style={{...sa,fontSize:20,color:t.d,textDecoration:"line-through",marginBottom:40}}>Une agence plus grosse.</div><div style={{...se,fontSize:38,fontWeight:800,lineHeight:1.3,maxWidth:840,margin:"0 auto 36px"}}>Faire passer FAR d'une logique d'opportunités à une logique de portefeuille.</div><div style={{...sa,fontSize:16,color:t.c2,lineHeight:1.65,maxWidth:720,margin:"0 auto 36px"}}>Mieux monétiser les exclusifs, doubler le roster sélectivement, utiliser le non-exclusif comme couche de CA et de recrutement, structurer une offre conseil différenciante, et rendre FAR désirable des 2 côtés du marché.</div><div style={{padding:"18px 32px",borderRadius:14,display:"inline-block",background:t.th,color:t.thT,...sa,fontWeight:600,fontSize:17}}>Une agence plus désirable, plus structurante, plus difficile à remplacer.</div></div>},

{title:"Merci",r:(t,back)=><div style={{textAlign:"center",padding:"80px 0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{marginBottom:48}}><FarLogo size={100} variant={t.lv}/></div><div style={{...se,fontSize:56,fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.1,marginBottom:24}}>Merci.</div><div style={{...sa,fontSize:18,color:t.c2,lineHeight:1.6,maxWidth:600}}>Thibault Loué</div><div style={{width:60,height:3,background:t.a,borderRadius:2,margin:"32px auto 0"}}/>{back&&<button onClick={back} style={{marginTop:40,background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div>},
];

// ═══════════════════════════════════════════════════════════════════════════════
// CAS 2  -  14 SLIDES (migré V3 → composants V4)
// ═══════════════════════════════════════════════════════════════════════════════

const PlanSlide=(t,active)=><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"55vh",textAlign:"center"}}><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:24}}>NOTRE FEUILLE DE ROUTE</div><div style={{...se,fontSize:42,fontWeight:800,lineHeight:1.15,marginBottom:48}}>4 étapes pour développer ton business.</div><div style={{display:"flex",gap:0,width:"100%",borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{n:"01",t:"Construire ton business plan",d:"Ton ID card business, tes KPIs, ta trajectoire revenus.",c:"#F5C518"},{n:"02",t:"Structurer précisément ton offre",d:"Ta vision, tes catégories, tes 5 lignes d'offre.",c:"#5B8DEF"},{n:"03",t:"Identifier les bons partenaires",d:"Ton portefeuille cible, Lockd, ton podcast.",c:"#81B840"},{n:"04",t:"Développer tes opérations premium",d:"Tes activations concrètes, prêtes à vendre.",c:"#E53935"}].map((s,i)=><div key={i} style={{flex:1,padding:"36px 24px",borderRight:i<3?`1px solid ${t.brd}`:"none",background:i+1===active?s.c+"18":"transparent"}}><div style={{...se,fontSize:48,fontWeight:800,color:i+1===active?s.c:(t.d||"#999")+"50",marginBottom:16}}>{s.n}</div><div style={{...sa,fontSize:17,fontWeight:700,marginBottom:8,lineHeight:1.3,color:i+1===active?t.c:(t.d||"#999")+"60"}}>{s.t}</div><div style={{...sa,fontSize:15,color:i+1===active?t.m:(t.d||"#999")+"50",lineHeight:1.5}}>{s.d}</div></div>)}</div></div>;

const S2 = [

{title:"Ouverture",
r:t=><div style={{display:"flex",gap:48,alignItems:"center",minHeight:"60vh"}}><div style={{flex:3}}><div style={{display:"flex",alignItems:"center",gap:20,marginBottom:32}}><img src={pu("/lebouseuh.png")} alt="Le Bouseuh" style={{width:64,height:64,borderRadius:"50%",objectFit:"cover",border:`3px solid ${t.brd}`}}/><div style={{width:1,height:36,background:t.brd}}/><FarLogo size={80} variant={t.lv}/></div><div style={{...se,fontSize:64,fontWeight:800,lineHeight:1,marginBottom:24}}>Le Bouseuh × Far</div><div style={{width:60,height:3,background:t.a,borderRadius:2,marginBottom:28}}/><div style={{...sa,fontSize:18,color:t.m,lineHeight:1.7,maxWidth:520}}>T'accompagner au quotidien.<br/>Développer tes actifs et tes projets.<br/>Structurer ton écosystème.<br/>Augmenter ta valeur.</div></div><div style={{flex:2,position:"relative"}}><img src={pu("/case2_imgs/slide1_img1.jpg")} alt="Le Bouseuh" style={{width:"100%",borderRadius:20,objectFit:"cover",aspectRatio:"4/5",filter:"grayscale(1)"}}/></div></div>},

{title:"FAR en bref",
r:t=><div><div style={{display:"flex",alignItems:"center",gap:20,marginBottom:28}}><FarLogo size={60} variant={t.lv}/><div style={{width:1,height:32,background:t.brd}}/><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d}}>QUI SOMMES-NOUS</div></div><div style={{...se,fontSize:38,fontWeight:800,lineHeight:1.15,marginBottom:12}}>Une agence qui structure la valeur commerciale des créateurs.</div><div style={{...sa,fontSize:16,color:t.m,lineHeight:1.7,marginBottom:32}}>FAR ne place pas des talents sur des briefs. FAR construit des écosystèmes de revenus autour de créateurs sélectionnés, avec une discipline commerciale, un pricing fondé sur la valeur et une vision long terme.</div><div style={{display:"flex",gap:16,marginBottom:28}}>{[{v:"4",l:"talents exclusifs aujourd'hui"},{v:"8",l:"à horizon 12 mois"},{v:"10 ans",l:"d'expérience marques & créateurs"},{v:"100+",l:"campagnes réalisées"}].map((s,i)=><div key={i} style={{flex:1,padding:"20px 16px",borderRadius:12,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center"}}><div style={{...se,fontSize:28,fontWeight:800,color:t.a}}>{s.v}</div><div style={{...sa,fontSize:13,color:t.m,marginTop:4}}>{s.l}</div></div>)}</div><div style={{display:"flex",gap:0,borderRadius:14,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{t:"Business plans individualisés",d:"Chaque talent a son ID card business, ses catégories protégées, sa trajectoire de revenus."},{t:"5 piliers d'offre structurés",d:"Sponsoring éditorial, partenariats de catégorie, brand content, actifs propriétaires, projets B2B."},{t:"Pricing fondé sur la valeur",d:"Devis décomposés en 8 blocs. On vend de la valeur, pas du reach."},{t:"Actifs propriétaires",d:"Podcast, marque, format récurrent : on transforme ce que tu possèdes en levier commercial."}].map((item,i)=><div key={i} style={{flex:1,padding:"20px 16px",borderRight:i<3?`1px solid ${t.brd}`:"none"}}><div style={{...sa,fontSize:15,fontWeight:700,color:t.c,marginBottom:6}}>{item.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{item.d}</div></div>)}</div><div style={{padding:"28px 32px",borderRadius:14,background:"#1A1A1A",marginTop:28,textAlign:"center"}}><div style={{...se,fontSize:22,fontWeight:800,color:"#fff",lineHeight:1.3}}>FAR veut devenir la structure la plus désirable du marché, côté talents comme côté marques.</div></div></div>},

{title:"Principes de collaboration",
r:t=><div><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>NOS PRINCIPES DE COLLABORATION</div><div style={{...se,fontSize:36,fontWeight:800,lineHeight:1.15,marginBottom:12}}>Ce qu'on fait. Ce qu'on ne fait pas.</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6,marginBottom:28}}>FAR n'est pas une agence qui impose. C'est un partenaire qui structure, accompagne et protège. Voici nos engagements concrets.</div><div style={{display:"flex",flexDirection:"column",gap:0}}>{[{do:"On structure ton business et ta stratégie commerciale",dont:"On ne touche jamais à ta ligne éditoriale ni à ta créativité"},{do:"On est un support disponible au quotidien",dont:"On ne te surcharge pas de briefs ou de sollicitations inutiles"},{do:"On te présente uniquement des partenaires cohérents avec ton univers",dont:"On ne te propose pas de deals juste pour faire du volume"},{do:"On protège tes catégories et tes associations existantes",dont:"On n'accepte jamais un partenaire qui pourrait fragiliser ton image"},{do:"On t'implique dans chaque décision commerciale importante",dont:"On ne signe rien en ton nom sans ton accord explicite"},{do:"On construit avec toi un plan à 12 mois lisible et ambitieux",dont:"On ne te demande pas d'exclusivité sans contrepartie de valeur claire"},{do:"On négocie pour maximiser ta valeur par deal",dont:"On ne brade pas tes tarifs pour closer plus vite"}].map((item,i)=><div key={i} style={{display:"flex",alignItems:"stretch",gap:0,borderBottom:i<6?`1px solid ${t.brd}`:"none"}}><div style={{flex:1,padding:"14px 16px",display:"flex",alignItems:"center",gap:10}}><div style={{width:8,height:8,borderRadius:4,background:"#81B840",flexShrink:0}}/><div style={{...sa,fontSize:14,color:t.c,lineHeight:1.4}}>{item.do}</div></div><div style={{flex:1,padding:"14px 16px",display:"flex",alignItems:"center",gap:10,borderLeft:`1px solid ${t.brd}`}}><div style={{width:8,height:8,borderRadius:4,background:"#C62828",flexShrink:0}}/><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.4}}>{item.dont}</div></div></div>)}</div><div style={{padding:"28px 32px",borderRadius:14,background:"#1A1A1A",marginTop:28,textAlign:"center"}}><div style={{...se,fontSize:22,fontWeight:800,color:"#fff",lineHeight:1.3}}>Notre rôle : te rendre plus fort commercialement, sans jamais compromettre ce qui fait ta singularité.</div></div></div>},

{title:"Tes actifs",
r:t=><div><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>POURQUOI TOI</div><div style={{...se,fontSize:34,fontWeight:800,lineHeight:1.2,marginBottom:12}}>Tu es déjà structuré.</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6,marginBottom:28}}>On cherche des créateurs qui possèdent des actifs monétisables au-delà du simple inventaire média. Tu en as 3.</div><div style={{display:"flex",gap:16}}>{[{img:"/case2_imgs/slide3_img4.jpg",n:"ACTIF 1",t:"Ton audience",d:"4,61M abonnés YouTube + 2,1M followers Twitch. Le socle qui te permet de porter des opérations premium et de crédibiliser tes actifs propriétaires."},{img:"/bouseuh-lockd2.png",n:"ACTIF 2",t:"Lockd  -  ta marque",d:"Ton site structuré avec lignes produits, FAQ, programme d'affiliation. Un vrai business, pas du merch. C'est exactement le type d'actif qu'on sait monétiser."},{img:"/case2_imgs/slide3_img6.jpg",n:"ACTIF 3",t:"Ton podcast",d:"Ton format hebdomadaire hébergé par Acast, tes invités de tous horizons. Format long, incarné, vendable en sponsoring récurrent."}].map((c,i)=><div key={i} style={{flex:1,borderRadius:16,overflow:"hidden",background:t.card,border:`1px solid ${t.brd}`}}><div style={{height:200,overflow:"hidden"}}><img src={pu(c.img)} alt={c.t} style={{width:"100%",height:"100%",objectFit:c.cover||"cover",background:c.bg||"transparent"}}/></div><div style={{padding:"20px 20px 24px"}}><div style={{...mo,fontSize:14,fontWeight:700,color:t.a,letterSpacing:1,marginBottom:6}}>{c.n}</div><div style={{...sa,fontSize:16,fontWeight:700,marginBottom:6}}>{c.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.55}}>{c.d}</div></div></div>)}</div><div style={{padding:"28px 32px",borderRadius:14,background:"#1A1A1A",marginTop:32,textAlign:"center"}}><div style={{...se,fontSize:28,fontWeight:800,color:"#fff",lineHeight:1.3}}>Tu es exactement le profil que FAR veut dans son roster.</div></div></div>},

{title:"Pourquoi toi",
r:t=><div><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>POURQUOI TOI</div><div style={{...se,fontSize:38,fontWeight:800,lineHeight:1.15,marginBottom:12}}>Le Bouseuh × FAR = le fit parfait.</div><div style={{...sa,fontSize:16,color:t.m,lineHeight:1.7,marginBottom:36}}>FAR est volontairement sélectif : 4 talents aujourd'hui, 8 à horizon 12 mois. Voici pourquoi tu corresponds exactement à ce qu'on cherche.</div><div style={{display:"flex",flexDirection:"column",gap:0}}>{[{c:"Territoire éditorial clair",v:"Gaming, lifestyle, entrepreneuriat. Tu incarnes un récit de passage : du gaming pur au business structuré."},{c:"Partenariats longs",v:"Tu es ambassadeur Samsung France, partenaire Nutripure. Tu sais tenir une association durable."},{c:"Actif propriétaire",v:"Lockd et ton podcast hebdomadaire. 2 actifs à toi, monétisables indépendamment, en plus de ton audience."},{c:"Fiabilité & brand safety",v:"Ton audience est mature, ton ton est maîtrisé, tes associations existantes rassurent les marques."},{c:"Envie de construire",v:"Lockd prouve que tu as une ambition entrepreneuriale concrète. Tu ne monétises pas passivement."}].map((item,i)=><div key={i} style={{display:"flex",alignItems:"stretch",gap:0,borderBottom:i<4?`1px solid ${t.brd}`:"none"}}><div style={{width:48,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><div style={{width:24,height:24,borderRadius:12,background:t.a,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{...mo,fontSize:14,fontWeight:700,color:t.bg}}>✓</span></div></div><div style={{flex:1,padding:"18px 16px"}}><div style={{...sa,fontSize:15,fontWeight:700,color:t.c,marginBottom:4}}>{item.c}</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.5}}>{item.v}</div></div></div>)}</div><div style={{padding:"28px 32px",borderRadius:14,background:"#1A1A1A",marginTop:32,textAlign:"center"}}><div style={{...se,fontSize:28,fontWeight:800,color:"#fff",lineHeight:1.3}}>Comment on t'amène encore plus loin ?</div></div></div>},

{title:"Étape 1",r:t=>PlanSlide(t,1)},

{title:"Ton ID card business",
r:t=><div><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>TON ID CARD BUSINESS</div><div style={{...se,fontSize:34,fontWeight:800,lineHeight:1.15,marginBottom:12}}>L'outil de pilotage qu'on construirait pour toi. Avec toi.</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6,marginBottom:28}}>Chaque talent exclusif a son ID card business pour piloter efficacement son développement commercial. Voici à quoi la tienne pourrait ressembler.</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{t:"Ton territoire éditorial",d:"Gaming × lifestyle × entrepreneuriat. Ton récit : du créateur au fondateur."},{t:"Tes catégories marques",d:"Protégées : habillement (Lockd), nutrition (Nutripure), tech (Samsung). À ouvrir : commerce, finance, logistique, audio, lifestyle adulte."},{t:"Tes formats forts",d:"YouTube long (vidéos héros), Twitch live (lancement drops), podcast hebdo (conversation premium), capsules coulisses."},{t:"Tes actifs propriétaires",d:"Lockd (e-commerce actif), podcast Acast, potentiel format récurrent autour de tes drops."},{t:"Tes références commerciales",d:"Samsung France (ambassadeur), Nutripure (récurrence). Des associations qui crédibilisent ton dossier."},{t:"Tes signaux brand safety",d:"Audience mature, ton maîtrisé, pas de polémiques majeures, associations existantes rassurantes."},{t:"Ta shortlist 20 annonceurs",d:"Shopify, Qonto, Notion, Sendcloud, RØDE, JBL, BMW, CUPRA, CANAL+, Back Market, Pennylane, Nike, Adidas, Samsung, Red Bull, Fnac, Amazon, PlayStation, Acast, Spotify."},{t:"Ta trajectoire revenus",d:"Objectif : augmenter ta valeur moyenne par deal. Récurrence podcast + Lockd structurant + 2-3 ops premium / an."}].map((f,i)=><div key={i} style={{padding:"18px 22px",background:i%2===0?t.card:"transparent",borderBottom:i<6?`1px solid ${t.brd}`:"none",borderRight:i%2===0?`1px solid ${t.brd}`:"none"}}><div style={{...sa,fontSize:14,fontWeight:700,color:t.c,marginBottom:4}}>{f.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{f.d}</div></div>)}</div></div>},

{title:"Étape 2",r:t=>PlanSlide(t,2)},

{title:"Tes catégories",
r:t=><div><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>TES CATÉGORIES</div><div style={{...se,fontSize:42,fontWeight:800,lineHeight:1.15,marginBottom:16}}>D'abord protéger ce que tu as, ensuite ouvrir.</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6,marginBottom:32}}>Avant d'ouvrir de nouvelles marques pour toi, il faut poser tes frontières. 3 catégories à sanctuariser parce qu'elles sont déjà liées à ton univers, 5 territoires à ouvrir intelligemment.</div><div style={{display:"flex",gap:32}}><div style={{flex:1}}><div style={{...mo,fontSize:14,fontWeight:700,letterSpacing:2,color:"#C62828",marginBottom:16}}>🔒 À SANCTUARISER</div>{["Habillement : Lockd est ton actif propriétaire, pas négociable","Nutrition / supplémentation : Nutripure est déjà associé publiquement à toi","Tech grand public (partiel) : Samsung France reste ton association forte à protéger"].map((c,i)=><div key={i} style={{display:"flex",gap:12,padding:"14px 0",borderBottom:`1px solid ${t.brd}`}}><div style={{width:8,height:8,borderRadius:4,background:"#C62828",flexShrink:0,marginTop:5}}/><div style={{...sa,fontSize:14,color:t.c,lineHeight:1.5}}>{c}</div></div>)}</div><div style={{flex:1}}><div style={{...mo,fontSize:14,fontWeight:700,letterSpacing:2,color:"#81B840",marginBottom:16}}>→ TERRITOIRES À OUVRIR POUR TOI</div>{["Commerce / e-commerce / fondateur : extension naturelle de Lockd","Finance / pilotage / comptabilité : le récit de ton passage à entrepreneur","Logistique / expérience client : le backstage de ton business","Audio / conversation / mobilité éditoriale : extension de ton podcast","Lifestyle adulte / performance / auto / culture : la maturité de ton profil"].map((c,i)=><div key={i} style={{display:"flex",gap:12,padding:"14px 0",borderBottom:i<4?`1px solid ${t.brd}`:"none"}}><div style={{width:8,height:8,borderRadius:4,background:"#81B840",flexShrink:0,marginTop:5}}/><div style={{...sa,fontSize:14,color:t.c,lineHeight:1.5}}>{c}</div></div>)}</div></div><div style={{padding:"28px 32px",borderRadius:14,background:"#1A1A1A",marginTop:28,textAlign:"center"}}><div style={{...se,fontSize:22,fontWeight:800,color:"#fff",lineHeight:1.3}}>Le bon accompagnement commercial se voit aussi dans les deals qu'on refuse pour toi.</div></div></div>},

{title:"Vision pour toi",
r:t=><div><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>CE QU'ON VIENT FAIRE POUR TOI</div><div style={{...se,fontSize:42,fontWeight:800,lineHeight:1.15,marginBottom:16}}>Ne pas te vendre davantage, mais te vendre mieux.</div><div style={{padding:"24px 32px",borderRadius:14,borderLeft:`4px solid ${t.a}`,background:t.a+"10",marginBottom:36}}><div style={{...sa,fontSize:17,fontWeight:600,lineHeight:1.5,color:t.c}}>Te faire passer de « créateur gaming à forte audience » à « créateur-entrepreneur multi-actifs ». C'est un glissement de catégorie et c'est ce qui justifie un pricing fondé sur ta valeur, pas sur ton reach.</div></div><div style={{display:"flex",alignItems:"flex-start",gap:0,marginTop:8}}>{[{n:"01",t:"Protéger",d:"Sanctuariser tes catégories sensibles"},{n:"02",t:"Élever",d:"Lockd = actif business, pas du merch"},{n:"03",t:"Stabiliser",d:"Ton podcast = franchise récurrente sponsorisable"},{n:"04",t:"Sélectionner",d:"YouTube/Twitch = surfaces premium réservées"}].map((s,i)=><div key={i} style={{display:"contents"}}><div style={{flex:1,textAlign:"center"}}><div style={{width:40,height:40,borderRadius:"50%",background:t.a,color:"#000",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",...mo,fontSize:14,fontWeight:800}}>{s.n}</div><div style={{...sa,fontSize:17,fontWeight:700,marginBottom:6}}>{s.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.4,padding:"0 8px"}}>{s.d}</div></div>{i<3&&<div style={{display:"flex",alignItems:"center",paddingTop:8,flexShrink:0}}><div style={{width:40,height:2,background:t.a+"60"}}/><div style={{width:0,height:0,borderTop:"5px solid transparent",borderBottom:"5px solid transparent",borderLeft:`6px solid ${t.a}60`}}/></div>}</div>)}</div><div style={{padding:"28px 32px",borderRadius:14,background:"#1A1A1A",marginTop:32,textAlign:"center"}}><div style={{...se,fontSize:22,fontWeight:800,color:"#fff",lineHeight:1.3}}>Conséquence directe : plus de cohérence, plus de rareté, plus de valeur par deal.</div></div></div>},

{title:"Ton offre",
r:t=><div><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>TON OFFRE COMMERCIALE  -  5 LIGNES</div><div style={{...se,fontSize:30,fontWeight:800,lineHeight:1.2,marginBottom:12}}>Les 5 piliers d'offre FAR, traduits pour toi.</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.6,marginBottom:28}}>Chaque ligne d'offre trouve une application concrète dans ton univers. Voici comment on te vend.</div><div style={{display:"flex",flexDirection:"column",gap:0}}>{[{n:"01",t:"Sponsoring éditorial",def:"Une marque sponsorise un format existant du créateur (vidéo YouTube, live, épisode), avec une intégration native et des déclinaisons (cutdowns, whitelisting).",d:"Ton format maître YouTube (vidéo héros) + amplification Twitch, shorts, stories. Droits d'usage et whitelisting inclus. Ta surface principale de monétisation premium."},{n:"02",t:"Partenariats de catégorie",def:"Une marque achète un territoire exclusif (catégorie) sur une durée longue (6-12 mois). Objectif : récurrence, cohérence, mémorisation.",d:"2-3 partenaires max pour toi sur 6-12 mois. Chaque partenaire sur un territoire exclusif. Plus de récurrence et meilleure prévisibilité."},{n:"03",t:"Brand content co-construit",def:"Un concept sur-mesure conçu avec la marque, où la marque est structurellement utile au récit (pas une démo) et génère des assets exploitables.",d:"Formats où la marque a une vraie utilité narrative dans ton univers. Pas du placement, du concept intégré avec toi."},{n:"04",t:"Sponsoring de tes actifs propriétaires",def:"Une marque sponsorise un actif que le créateur possède (podcast, marque, format récurrent, événement), avec une présence plus rare mais plus mémorable.",d:"Ton podcast (sponsoring de saison), Lockd (partenaire e-commerce structurant). Tes actifs les plus rares, les plus contextualisés, les plus mémorables."},{n:"05",t:"Partenariats B2B / tes projets",def:"Des deals liés au business du créateur (entrepreneur) : infrastructure, outils, opérations (drop, merch, IRL). Plus partenariat que pub.",d:"Toi en tant qu'entrepreneur. Tes drops Lockd, événement IRL, communauté premium. Partenariats d'infrastructure plus crédibles et plus durables."}].map((item,i)=><div key={i} style={{display:"flex",gap:16,padding:"16px 0",borderBottom:i<4?`1px solid ${t.brd}`:"none"}}><div style={{...mo,fontSize:15,fontWeight:700,color:t.a,letterSpacing:1,minWidth:24,paddingTop:2}}>{item.n}</div><div style={{flex:1}}><div style={{...sa,fontSize:15,fontWeight:700,color:t.c,marginBottom:4}}>{item.t}</div><div style={{...mo,fontSize:11,fontWeight:600,letterSpacing:1,color:t.d,marginBottom:6}}>Définition</div><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.5,marginBottom:8}}>{item.def}</div><div style={{...mo,fontSize:11,fontWeight:600,letterSpacing:1,color:t.a,marginBottom:4}}>Pour toi</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.5}}>{item.d}</div></div></div>)}</div></div>},

{title:"Étape 3",r:t=>PlanSlide(t,3)},

{title:"Ton portefeuille",
r:t=><div><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>TON PORTEFEUILLE RECOMMANDÉ</div><div style={{...se,fontSize:38,fontWeight:800,lineHeight:1.15,marginBottom:12}}>Moins de volume. Plus de cohérence. Plus de valeur par deal.</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6,marginBottom:32}}>Ton architecture commerciale doit refléter une discipline claire : pas de remplissage d'agenda, mais une montée en valeur systématique de ce que tu acceptes.</div><div style={{display:"flex",flexDirection:"column",gap:0}}>{[{t:"1 partenaire structurant Lockd",d:"Ton commerce comme preuve d'entrepreneuriat"},{t:"1 sponsor récurrent podcast",d:"Ton podcast en logique de saison ou d'année"},{t:"1 partenaire long-terme complémentaire",d:"Un territoire qu'on ouvre pour toi"},{t:"2-3 opérations premium max",d:"Ton YouTube/Twitch comme surfaces premium"}].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:20,padding:"20px 0",borderBottom:i<3?`1px solid ${t.brd}`:"none"}}><div style={{width:40,height:40,borderRadius:10,background:t.a+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,...mo,fontSize:16,fontWeight:700,color:t.a}}>→</div><div><div style={{...sa,fontSize:17,fontWeight:700,color:t.c}}>{s.t}</div><div style={{...sa,fontSize:14,color:t.m,marginTop:2}}>{s.d}</div></div></div>)}</div><div style={{padding:"28px 32px",borderRadius:14,background:"#1A1A1A",marginTop:32,textAlign:"center"}}><div style={{...se,fontSize:22,fontWeight:800,color:"#fff",lineHeight:1.3}}>Le bon objectif à 12 mois : augmenter la valeur moyenne de ce que tu acceptes.</div></div></div>},

{title:"Lockd",
r:t=><div style={{display:"flex",gap:32,alignItems:"stretch"}}><div style={{flex:2,borderRadius:16,overflow:"hidden",position:"relative"}}><img src={pu("/case2_imgs/slide3_img5.jpg")} alt="Lockd" style={{width:"100%",height:"100%",objectFit:"cover",minHeight:500}}/><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"32px 28px",background:"linear-gradient(transparent,rgba(0,0,0,.85))"}}><div style={{...se,fontSize:28,fontWeight:800,color:"#fff"}}>Lockd</div></div></div><div style={{flex:3}}><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>LOCKD  -  PARTENAIRES CIBLES</div><div style={{...se,fontSize:28,fontWeight:800,lineHeight:1.2,marginBottom:12}}>Faire de ta marque une plateforme business.</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6,marginBottom:24}}>Ton site expose déjà des lignes produits, des univers distincts (Performance & Streetwear), une FAQ, un programme d'affiliation. Autour de cet actif, 4 familles de partenaires pour raconter ton passage du créateur au fondateur.</div>{[{n:"Shopify",r:"Commerce structurant",d:"Tout-en-un e-commerce, « epic product drops ». Le meilleur point d'entrée pour raconter Lockd comme une vraie activité."},{n:"Qonto / Pennylane",r:"Finance / pilotage",d:"Compte pro, facturation, dépenses. Passer du récit « créateur qui vend » à « créateur qui pilote une activité »."},{n:"Sendcloud",r:"Logistique / expérience",d:"Shipping e-commerce : checkout, tracking, returns. Le backstage réel de ta marque."},{n:"Notion",r:"Organisation / support",d:"Workspace IA : docs, projets, automatisation. L'envers du décor de ton business."}].map((p,i)=><div key={i} style={{padding:"14px 0",borderBottom:i<3?`1px solid ${t.brd}`:"none"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}><div style={{...sa,fontSize:15,fontWeight:700}}>{p.n}</div><div style={{...mo,fontSize:13,letterSpacing:1,color:t.a,background:t.a+"15",padding:"3px 8px",borderRadius:4}}>{p.r}</div></div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{p.d}</div></div>)}<div style={{...sa,fontSize:14,color:t.d,marginTop:16,fontStyle:"italic"}}>Notre recommandation : 1 partenaire commerce structurant + 1 opérationnel max, pour garder un récit lisible.</div></div></div>},

{title:"Ton podcast",
r:t=><div style={{display:"flex",gap:32,alignItems:"stretch"}}><div style={{flex:3}}><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>PODCAST</div><div style={{...se,fontSize:28,fontWeight:800,lineHeight:1.2,marginBottom:16}}>Ton podcast est une surface premium pour des marques qui veulent s'associer à ta voix et à ton intimité éditoriale.</div><div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:24}}>{["Hebdomadaire","Invités de tous horizons","Au-delà du gaming","Monétisation récurrente"].map((f,i)=><span key={i} style={{...mo,fontSize:14,fontWeight:600,padding:"6px 12px",borderRadius:6,background:t.a+"15",color:t.a}}>{f}</span>)}</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6,marginBottom:16}}>Ton podcast est un actif sponsorisable en logique de saison. 2 routes de partenaires identifiées pour toi :</div><div style={{display:"flex",gap:24}}><div style={{flex:1}}><div style={{...mo,fontSize:14,fontWeight:700,letterSpacing:2,color:t.c,marginBottom:12}}>ROUTE FONCTIONNELLE</div>{[{n:"RØDE",d:"Création, studio, mobilité"},{n:"JBL",d:"Audio lifestyle, studio"}].map((r,i)=><div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${t.brd}`}}><div style={{...sa,fontSize:14,fontWeight:700}}>{r.n}</div><div style={{...sa,fontSize:15,color:t.m}}>{r.d}</div></div>)}</div><div style={{flex:1}}><div style={{...mo,fontSize:14,fontWeight:700,letterSpacing:2,color:t.c,marginBottom:12}}>ROUTE STRATÉGIQUE</div>{[{n:"BMW / CUPRA",d:"Performance, mobilité"},{n:"CANAL+",d:"Sport, séries, culture"},{n:"Back Market",d:"Tech adulte, usage"}].map((r,i)=><div key={i} style={{padding:"10px 0",borderBottom:i<2?`1px solid ${t.brd}`:"none"}}><div style={{...sa,fontSize:14,fontWeight:700}}>{r.n}</div><div style={{...sa,fontSize:15,color:t.m}}>{r.d}</div></div>)}</div></div></div><div style={{flex:2,borderRadius:16,overflow:"hidden",position:"relative"}}><img src={pu("/case2_imgs/slide7_img12.jpg")} alt="Podcast" style={{width:"100%",height:"100%",objectFit:"cover",minHeight:500,filter:"grayscale(1)"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"32px 28px",background:"linear-gradient(transparent,rgba(0,0,0,.85))"}}><div style={{...se,fontSize:28,fontWeight:800,color:"#fff"}}>Ton Podcast</div></div></div></div>},

{title:"Partenaire long-terme",
r:t=>{const rb="#DB0A40",rbBg="#1E1E2C",rbY="#F5C518";return <div><div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}><img src={pu("/redbull-logo.png")} alt="Red Bull" style={{height:40,objectFit:"contain",flexShrink:0}}/><div style={{...mo,fontSize:15,fontWeight:600,letterSpacing:3,color:rb}}>PARTENAIRE DE CATÉGORIE  -  LONG TERME</div></div><div style={{...se,fontSize:36,fontWeight:800,lineHeight:1.15,marginBottom:4}}><span style={{color:rb}}>Red Bull</span> × Le Bouseuh</div><div style={{width:60,height:3,background:rb,borderRadius:2,marginBottom:20}}/><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6,marginBottom:28}}>Un partenariat de catégorie sur 12 mois minimum, qui couvre le territoire « énergie, performance et ambition », la passerelle naturelle entre ton ADN gaming et ton récit d'entrepreneur.</div><div style={{display:"flex",gap:28}}><div style={{flex:3}}><div style={{...sa,fontSize:17,fontWeight:700,color:t.c,marginBottom:16}}>Pourquoi Red Bull est le fit parfait</div><div style={{display:"flex",flexDirection:"column",gap:0}}>{[{t:"ADN gaming crédible",d:"Red Bull est déjà omniprésent dans l'esport et le gaming. S'associer à toi, c'est toucher un public gaming qui évolue vers le lifestyle."},{t:"Récit entrepreneurial",d:"Red Bull valorise les fondateurs, les bâtisseurs, les personnalités qui créent. Lockd et ton podcast incarnent exactement ça."},{t:"Multi-surfaces",d:"YouTube (vidéo héros), Twitch (live events), podcast (conversations), Lockd (co-branding drops). Un partenaire qui active l'ensemble de ton écosystème."},{t:"Partenariat premium, pas du placement",d:"Red Bull sait faire des associations longues et structurantes. C'est la ligne d'offre 02 dans sa version la plus ambitieuse."}].map((item,i)=><div key={i} style={{padding:"14px 0",borderBottom:i<3?`1px solid ${t.brd}`:"none"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}><div style={{width:6,height:6,borderRadius:3,background:rb,flexShrink:0}}/><div style={{...sa,fontSize:15,fontWeight:700,color:t.c}}>{item.t}</div></div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5,paddingLeft:14}}>{item.d}</div></div>)}</div></div><div style={{flex:2,padding:28,borderRadius:16,background:rbBg,border:`1px solid ${rb}30`,display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div><div style={{...mo,fontSize:14,fontWeight:700,letterSpacing:2,color:rb,marginBottom:16}}>FORMAT DU PARTENARIAT</div>{["Ambassadeur catégorie énergie / performance","Intégrations YouTube + Twitch (4-6 / an)","Sponsor récurrent podcast (1 saison)","Co-branding potentiel drop Lockd × Red Bull","Présence événementielle IRL"].map((f,i)=><div key={i} style={{display:"flex",gap:10,padding:"8px 0"}}><div style={{...sa,fontSize:14,color:rb}}>→</div><div style={{...sa,fontSize:14,color:"#fff",lineHeight:1.4}}>{f}</div></div>)}</div><div style={{padding:"14px 20px",borderRadius:10,background:rb+"20",marginTop:16,textAlign:"center"}}><div style={{...se,fontSize:24,fontWeight:800,color:rb}}>150-200 k€ / an</div></div></div></div></div>}},

{title:"Étape 4",r:t=>PlanSlide(t,4)},

{title:"Activations",
r:(t,back,nav)=>{const cards=[{id:"shopify",bg:"#81B840",c:"#1a2e05",tag:"ACTIVATION",title:"Activation Shopify",sub:"Shopify × Le Bouseuh × Lockd « L'envers du drop »",img:"/shopify-logo.png",imgW:110,imgFilter:"brightness(0) invert(1)",logoVar:"white"},{id:"rode",bg:"#C62828",c:"#fff",tag:"ACTIVATION",title:"Activation RØDE",sub:"RØDE × Le Bouseuh Podcast « Hors du setup »",img:"/rode-logo-white.png",imgW:80,imgFilter:"none",logoVar:"white"},{id:"fastgoodcuisine",bg:"#FFF2F5",c:"#1C1410",tag:"OPÉRATION",title:"Le combat des chefs",sub:"Partenaire exclusif · long format YouTube · 50 chefs, jury, finale",img:"/fgc.webp",imgW:72,imgFilter:"none",logoVar:"black"},{id:"fgcmarque",bg:"#FFF4F7",c:"#1C1410",tag:"ACTIVATION",title:"[MARQUE] × FastGoodCuisine",sub:"Média, divertissement, Pepe Chicken & Pop's",img:"/fgc.webp",imgW:72,imgFilter:"none",logoVar:"black"},{id:"toinelag",bg:"#FFE14A",c:"#141414",tag:"ACTIVATION",title:"[MARQUE] × Toinelag",sub:"Retail & jouet  -  le magasin terrain de jeu",img:"/toinelag-avatar.png",imgW:76,imgFilter:"none",logoVar:"black"}];return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",minHeight:"60vh"}}><div style={{...mo,fontSize:16,fontWeight:700,letterSpacing:5,color:t.a,marginBottom:20,textAlign:"center"}}>EXEMPLES D'ACTIVATION</div><div style={{...se,fontSize:44,fontWeight:800,lineHeight:1.15,maxWidth:900,margin:"0 auto 24px",textAlign:"center"}}>Exemples concrets d'activation & de format à destination des marques.</div><div style={{width:80,height:3,background:t.a,borderRadius:2,margin:"0 auto 40px"}}/><div style={{display:"grid",gridTemplateColumns:"repeat(2, minmax(0, 1fr))",gap:16,maxWidth:900,margin:"0 auto"}}>{cards.map((a,i)=><ActCard key={i} a={a} nav={nav}/>)}</div></div>}},

{title:"Merci",
r:(t,back)=><div style={{textAlign:"center",padding:"80px 0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{marginBottom:48}}><FarLogo size={100} variant={t.lv}/></div><div style={{...se,fontSize:56,fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.1,marginBottom:24}}>Merci.</div><div style={{...sa,fontSize:18,color:t.c2,lineHeight:1.6,maxWidth:600}}>Thibault Loué</div><div style={{width:60,height:3,background:t.a,borderRadius:2,margin:"32px auto 0"}}/>{back&&<button onClick={back} style={{marginTop:40,background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div>},
];

// ═══════════════════════════════════════════════════════════════════════════════
// SHOPIFY  -  13 SLIDES (structure harmonisée)
// ═══════════════════════════════════════════════════════════════════════════════
const SS = [
{title:"Ouverture",
r:t=><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"65vh",textAlign:"center"}}><div style={{display:"flex",alignItems:"center",gap:20,marginBottom:40}}><FarLogo size={80} variant={t.lv}/><div style={{width:1,height:32,background:t.brd}}/><img src={pu("/shopify-logo.png")} alt="Shopify" style={{width:110,height:"auto",filter:"brightness(0)",opacity:.85}}/></div><div style={{...mo,fontSize:12,fontWeight:600,padding:"8px 16px",background:t.pill,borderRadius:6,display:"inline-block",marginBottom:20}}>ACTIVATION SHOPIFY × LE BOUSEUH × LOCKD</div><Hl t={t} s={{fontSize:48,textAlign:"center",maxWidth:800,margin:"0 auto 24px"}}>L'envers du drop.</Hl><div style={{...sa,fontSize:20,color:t.m,lineHeight:1.5,maxWidth:700,margin:"0 auto"}}>Et si on montrait ce que ça implique vraiment de lancer un drop quand on est créateur-fondateur ?</div></div>},

{title:"Le Bouseuh comme créateur partenaire",
r:t=><div style={{display:"flex",gap:32,alignItems:"stretch"}}><div style={{flex:3,display:"flex",flexDirection:"column",justifyContent:"center"}}><Tg t={t}>POURQUOI LE BOUSEUH</Tg><Hl t={t} s={{fontSize:36}}>Le créateur partenaire idéal pour cette opération.</Hl><Sh t={t}>Ce n'est pas juste un gros créateur disponible. C'est un profil qui coche les 3 cases que Shopify devrait chercher : puissance, preuve d'usage et récit authentique.</Sh><div style={{display:"flex",gap:12,marginBottom:24}}>{[{v:"4,61M",l:"abonnés YouTube"},{v:"2,1M",l:"followers Twitch"},{v:"6,7M+",l:"audience cumulée"}].map((s,i)=><div key={i} style={{flex:1,padding:"14px 12px",borderRadius:10,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center"}}><div style={{...se,fontSize:26,fontWeight:800,color:t.a}}>{s.v}</div><div style={{...sa,fontSize:11,color:t.m,marginTop:4}}>{s.l}</div></div>)}</div>{[{t:"Lockd",d:"Sa propre marque e-commerce. 2 lignes de produits (textile & accessoires), un site structuré avec FAQ, programme d'affiliation, drops réguliers et une communauté active. Pas du merch à logo, un vrai business avec gestion de stock, pricing, logistique et parcours d'achat complet."},{t:"Brand safety",d:"Audience mature, ton maîtrisé, associations existantes rassurantes (Samsung, Nutripure)."},{t:"Timing parfait",d:"Le prochain drop Lockd est un moment naturel de tension narrative où Shopify entre dans l'histoire."}].map((a,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<2?`1px solid ${t.brd}`:"none"}}><div style={{...sa,fontSize:14,fontWeight:700,color:t.a,minWidth:100}}>{a.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{a.d}</div></div>)}</div><div style={{flex:2,borderRadius:16,overflow:"hidden",flexShrink:0}}><img src={pu("/lebouseuh.png")} alt="Le Bouseuh" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:16,filter:"grayscale(1)"}}/></div></div>},

{title:"Insight",
r:t=><div><Tg t={t}>INSIGHT</Tg><Hl t={t} s={{fontSize:36}}>La zone invisible du merch créateur.</Hl><Wc t={t} s={{padding:"40px 36px",marginTop:24}}><div style={{...sa,fontSize:18,color:t.m,lineHeight:1.7,marginBottom:28}}>Beaucoup de créateurs sortent du merch, mais presque aucun ne montre ce que cela implique réellement au quotidien :</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:28}}>{["Décider d'une gamme","Fixer des prix","Préparer la mise en ligne","Gérer le stress du lancement","Absorber les imprévus","Tirer un bilan honnête"].map((p,i)=><span key={i} style={{...mo,fontSize:13,fontWeight:600,padding:"14px 20px",borderRadius:10,background:t.a+"15",color:t.a,textAlign:"center"}}>{p}</span>)}</div><div style={{...se,fontSize:22,lineHeight:1.4,color:t.a}}>C'est exactement cette zone invisible qui nous intéresse pour Shopify. Pas comme sponsor démonstratif, mais comme infrastructure qui rend le projet crédible, fluide et scalable dans un moment de tension réelle.</div></Wc></div>},

{title:"Positionnement",
r:t=><div><Tg t={t}>POSITIONNEMENT</Tg><Hl t={t} s={{fontSize:36}}>Un concept commercial connecté à un actif réel.</Hl><Sh t={t}>Ce qui rend cette activation structurellement différente d'un placement créateur classique.</Sh><div style={{display:"flex",flexDirection:"column",gap:0,marginTop:28,borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{t:"Un terrain de preuve existant",d:"Lockd est un business e-commerce qui tourne : 2 lignes produits, FAQ, affiliation, drops réguliers. Le créateur utilise déjà l'outil au quotidien. Shopify est visible parce qu'il est utilisé."},{t:"Un récit fondé sur la tension réelle",d:"Le drop est un moment de vérité entre arbitrages, stress, mise en ligne, lancement. Shopify est dans le sujet parce que le sujet c'est l'e-commerce. Le format produit une tension narrative naturelle et pas fabriquée."},{t:"Un écosystème, pas une vidéo",d:"Vidéo youtube, live twitch, capsules, podcast. Plusieurs points de contact pour un seul récit cohérent et exploitable. Et surtout, des assets réutilisables dans la durée et pas un contenu qui disparaît après 48h."}].map((item,i)=><div key={i} style={{display:"flex",gap:0,borderBottom:i<2?`1px solid ${t.brd}`:"none"}}><div style={{width:280,padding:"28px 24px",display:"flex",alignItems:"center"}}><div style={{...se,fontSize:17,fontWeight:700,color:t.c}}>{item.t}</div></div><div style={{flex:1,padding:"28px 24px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6}}>{item.d}</div></div></div>)}</div><div style={{marginTop:24,padding:"20px 32px",borderRadius:14,background:t.th,display:"flex",alignItems:"center",gap:16}}><div style={{...mo,fontSize:11,fontWeight:700,letterSpacing:2,color:t.thT,opacity:.5,flexShrink:0}}>MISSION FIT</div><div style={{...sa,fontSize:16,lineHeight:1.5,color:t.thT}}>Cette activation s'inscrit directement dans la mission de Shopify, <span style={{fontWeight:700,fontStyle:"italic"}}>« Make commerce better for everyone »</span>, en montrant qu'un créateur peut construire un vrai business e-commerce avec les bons outils.</div></div></div>},

{title:"Big Idea",
r:t=><div><div style={{textAlign:"center",padding:"24px 0"}}><div style={{...mo,fontSize:14,fontWeight:800,letterSpacing:3,color:t.a,marginBottom:20}}>BIG IDEA</div><div style={{...se,fontSize:52,fontWeight:800,lineHeight:1.1,marginBottom:28}}>« 7 jours pour préparer le prochain drop Lockd »</div><div style={{...sa,fontSize:18,color:t.m,lineHeight:1.7,maxWidth:740,margin:"0 auto 36px"}}>Pendant une semaine, on est en totale immersion sur la préparation complète du drop : les choix de gamme, les arbitrages de prix, la mise en ligne, le stress du lancement, le regard du créateur sur ce qu'il construit en tant que fondateur.</div></div><div style={{display:"flex",justifyContent:"center"}}><div style={{borderRadius:16,overflow:"hidden",display:"inline-block"}}><img src={pu("/bouseuh-lockd.png")} alt="Le Bouseuh Lockd" style={{maxWidth:560,height:"auto",display:"block",filter:"grayscale(1)",borderRadius:16}}/></div></div></div>},

{title:"Exécution",
r:t=><div><Tg t={t}>EXÉCUTION</Tg><Hl t={t} s={{fontSize:36}}>Le récit du passage du créateur au fondateur.</Hl><G2 s={{marginTop:24}}><Wc t={t} s={{background:t.a+"10",border:`1px solid ${t.a}25`,padding:32}}><Lb t={t} s={{color:t.a,fontSize:14}}>LA BONNE EXÉCUTION</Lb><div style={{...sa,fontSize:16,color:t.m,lineHeight:1.7,marginBottom:20}}>Le créateur n'a rien à forcer, il montre ce qu'il fait déjà.</div><Ar t={t} items={["Montrer un business réel, pas un usage théorique","Shopify dans un moment de tension naturelle : le drop","Contenu qui bénéficie au créateur ET à la marque","Exploitable en social, rights, paid et CRM marque","Le créateur n'a rien à forcer  -  il montre ce qu'il fait déjà"]}/></Wc><Wc t={t} s={{background:"rgba(204,0,0,.06)",border:"1px solid rgba(204,0,0,.12)",padding:32}}><Lb t={t} s={{color:"rgba(204,0,0,.6)",fontSize:14}}>LA MAUVAISE EXÉCUTION</Lb><div style={{...sa,fontSize:16,color:t.m,lineHeight:1.7,marginBottom:20}}>Faire une démonstration produit classique.</div><Ar t={t} items={["Script imposé et artificiel","Placement déconnecté de l'univers du créateur","Aucune tension narrative","Contenu jetable après publication"]}/></Wc></G2><div style={{textAlign:"center",padding:"32px 40px",marginTop:24,borderRadius:14,background:t.card,border:`1px solid ${t.brd}`}}><div style={{...se,fontSize:20,lineHeight:1.5,color:t.c}}>Shopify ne doit pas apparaître comme un sponsor mais comme ce qui fait tourner la boutique parce que c'est littéralement le cas.</div></div></div>},

{title:"Phasing",
r:t=><div><Tg t={t}>PHASING</Tg><Hl t={t} s={{fontSize:34}}>Shopify apparaît naturellement à chaque étape.</Hl><div style={{position:"relative",marginTop:40}}><div style={{position:"absolute",top:22,left:0,right:0,height:3,background:t.brd,zIndex:0}}/><div style={{display:"flex",gap:0,position:"relative",zIndex:1}}>{[{day:"JOUR 1-2",t:"Choix & sourcing",d:"Sélection des pièces, arbitrages quantités/tailles, premiers doutes",shopify:"Gestion catalogue, fiches produits, collections"},{day:"JOUR 3-4",t:"Mise en ligne & pricing",d:"Pages produits, fixation des prix, tests du parcours d'achat",shopify:"Checkout, paiement, design du store, aperçu mobile"},{day:"JOUR 5-6",t:"Communication & stress",d:"Annonce du drop, gestion de l'attente et de la pression, derniers ajustements",shopify:"Analytics, suivi visites, gestion stocks, countdown"},{day:"JOUR 7",t:"Lancement & bilan",d:"Le drop est live, premières commandes, gestion en temps réel, bilan",shopify:"Commandes en direct, tableau de bord, bilan chiffré"}].map((phase,i)=><div key={i} style={{flex:1,paddingRight:i<3?16:0}}><div style={{width:44,height:44,borderRadius:"50%",background:t.a,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",...mo,fontSize:16,fontWeight:700,color:t.bg}}>{i+1}</div><div style={{padding:"20px 16px",borderRadius:12,background:t.card,border:`1px solid ${t.brd}`,minHeight:220}}><div style={{...mo,fontSize:12,fontWeight:600,letterSpacing:2,color:t.d,marginBottom:8}}>{phase.day}</div><div style={{...sa,fontSize:17,fontWeight:700,marginBottom:8}}>{phase.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5,marginBottom:12}}>{phase.d}</div><div style={{padding:"10px 12px",borderRadius:8,background:t.a+"10"}}><div style={{...mo,fontSize:10,fontWeight:600,color:t.a,marginBottom:3}}>SHOPIFY VISIBLE</div><div style={{...sa,fontSize:13,color:t.m}}>{phase.shopify}</div></div></div></div>)}</div></div></div>},

{title:"Dispositif",
r:t=>{const items=[{t:"Vidéo YouTube",d:"Film principal 15-20 min",angle:-60},{t:"Live Twitch",d:"Drop lancé en direct",angle:0},{t:"3 capsules courtes",d:"Shorts / Reels / TikTok",angle:60},{t:"Podcast",d:"Retour sur l'expérience",angle:120},{t:"Code promo créateur",d:"Offre exclusive audience",angle:180},{t:"Droits digitaux",d:"Social, paid, site, CRM",angle:240}];const R=190;return <div style={{textAlign:"center"}}><style>{`@keyframes _orb{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes _corb{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}._orbw{animation:_orb 20s linear infinite}._orbi{animation:_corb 20s linear infinite}._eco._paused ._orbw{animation-play-state:paused}._eco._paused ._orbi{animation-play-state:paused}`}</style><Tg t={t}>DISPOSITIF</Tg><Hl t={t} s={{fontSize:36,textAlign:"center"}}>Un écosystème de contenu, pas une vidéo isolée.</Hl><Sh t={t} s={{textAlign:"center",maxWidth:700,margin:"0 auto"}}>Chaque brique a un rôle narratif précis et une fonction dans l'exploitation pour la marque.</Sh><div className="_eco" style={{position:"relative",width:600,height:480,margin:"24px auto 0",cursor:"pointer"}}><div onMouseEnter={e=>e.currentTarget.closest("._eco").classList.add("_paused")} onMouseLeave={e=>e.currentTarget.closest("._eco").classList.remove("_paused")} style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:130,height:130,borderRadius:"50%",background:t.a,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,cursor:"default"}}><div style={{...se,fontSize:14,fontWeight:800,color:t.bg,textAlign:"center",lineHeight:1.2}}>7 JOURS<br/>DROP LOCKD</div></div><div className="_orbw" style={{position:"absolute",left:0,top:0,width:"100%",height:"100%",transformOrigin:"300px 240px"}}>{items.map((it,i)=>{const rad=it.angle*Math.PI/180;const cx=300,cy=240;const x=cx+R*Math.cos(rad);const y=cy+R*Math.sin(rad);return <div key={i}><svg style={{position:"absolute",left:0,top:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}><line x1={300} y1={240} x2={x} y2={y} stroke={t.brd} strokeWidth={1.5} strokeDasharray="4 4"/></svg><div className="_orbi" style={{position:"absolute",left:x-80,top:y-30,width:160,zIndex:1,textAlign:"center"}}><div style={{width:14,height:14,borderRadius:"50%",background:t.a,margin:"0 auto 6px",opacity:.7}}/><div style={{...sa,fontSize:14,fontWeight:700,marginBottom:2}}>{it.t}</div><div style={{...sa,fontSize:12,color:t.m}}>{it.d}</div></div></div>})}</div></div></div>}},

{title:"Amplification média",
r:t=><div><Tg t={t}>AMPLIFICATION MÉDIA</Tg><Hl t={t} s={{fontSize:34}}>Ce que Shopify peut exploiter au-delà de l'organique.</Hl><Sh t={t}>L'opération produit un catalogue d'assets que Shopify peut activer sur ses propres canaux dans la durée.</Sh><div style={{display:"flex",flexDirection:"column",gap:0,marginTop:28,borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{n:"01",t:"Whitelisting",d:"Shopify booste les contenus directement depuis le compte du créateur. L'audience perçoit du contenu natif : meilleur taux de clic, meilleur CPV, et la marque garde le contrôle du ciblage."},{n:"02",t:"Cutdowns paid social",d:"3 à 5 formats courts (15-30s) optimisés pour les campagnes paid de Shopify sur Meta, TikTok et YouTube. Chaque cutdown met en scène un usage réel de la plateforme par un créateur-fondateur."},{n:"03",t:"Retargeting viewers",d:"Shopify peut recibler les audiences qui ont vu la vidéo héros ou les capsules avec des messages de conversion : landing pages Shopify, témoignages marchands, offres d'essai."},{n:"04",t:"Assets site & CRM",d:"Vidéos, visuels et verbatims exploitables sur le site Shopify, dans les newsletters marchands, sur les pages « créateurs » et dans les présentations commerciales B2B."},{n:"05",t:"Earned media & RP",d:"Le cas Le Bouseuh × Lockd devient un proof point pour les relations presse de Shopify : un créateur français qui gère un vrai business e-commerce avec la plateforme."}].map((item,i)=><div key={i} style={{display:"flex",gap:0,borderBottom:i<4?`1px solid ${t.brd}`:"none"}}><div style={{width:50,padding:"22px 16px",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...mo,fontSize:12,fontWeight:700,color:t.a}}>{item.n}</div></div><div style={{width:220,padding:"22px 16px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:15,fontWeight:700}}>{item.t}</div></div><div style={{flex:1,padding:"22px 16px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{item.d}</div></div></div>)}</div></div>},

{title:"Extension & scalabilité",
r:t=><div style={{display:"flex",flexDirection:"column",justifyContent:"center",minHeight:"100%"}}><Tg t={t}>EXTENSION & SCALABILITÉ</Tg><Hl t={t} s={{fontSize:36}}>Une série de contenus réutilisables.</Hl><div style={{display:"flex",gap:0,borderRadius:16,overflow:"hidden",margin:"28px 0",border:`1px solid ${t.brd}`}}>{[{t:"Saison 2",d:"Le prochain drop Lockd = le prochain épisode. Chaque collection est un nouveau récit avec Shopify au centre."},{t:"Partenariat annuel",d:"Passer du one-shot au deal récurrent : Shopify comme partenaire structurant de Lockd sur 12 mois."},{t:"Autres marques Lockd",d:"Le format est adaptable pour d'autres partenaires de l'écosystème Lockd : logistique, paiement, organisation."},{t:"Autres créateurs FAR",d:"Le template fonctionne pour tout créateur du roster qui construit un actif propriétaire. Un format duplicable."}].map((item,i)=><div key={i} style={{flex:1,padding:"28px 22px",background:t.th,color:t.thT,borderRight:i<3?`1px solid ${t.brd}`:"none"}}><div style={{...se,fontSize:18,fontWeight:700,marginBottom:10,color:t.thT}}>{item.t}</div><div style={{...sa,fontSize:14,color:t.thT,opacity:.85,lineHeight:1.55}}>{item.d}</div></div>)}</div></div>},

{title:"Estimatif",
r:t=><div style={{padding:"20px 0"}}><Tg t={t}>ESTIMATIF</Tg><div style={{height:16}}/><PT t={t} rows={[{i:"Talent & diffusion (YouTube, Twitch, capsules, podcast)",p:"140-160 k€"},{i:"Stratégie / concept / coordination FAR",p:"30 k€"},{i:"Production & post-production",p:"30-40 k€"},{i:"Droits d'usage digitaux (social, paid, site, CRM)",p:"20-30 k€"}]} total={{l:"Ballpark",v:"220-260 k€ HT"}} options={["Amplification paid / usage étendu : +40 k€","Extension saison 2 : à définir selon périmètre"]}/><div style={{marginTop:28}}><div style={{...mo,fontSize:12,fontWeight:700,letterSpacing:2,color:t.a,marginBottom:14}}>ROI</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>{[{v:"6,7M+",l:"audience cumulée organique exposée (YouTube + Twitch + capsules)"},{v:"15-20",l:"assets exploitables en paid, site, CRM et RP, durée de vie 12 mois+"},{v:"1",l:"cas de référence « créateur-fondateur × Shopify » activable en RP et B2B"}].map((r,i)=><div key={i} style={{padding:"18px 16px",borderRadius:12,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center"}}><div style={{...se,fontSize:28,fontWeight:800,color:t.a,marginBottom:6}}>{r.v}</div><div style={{...sa,fontSize:12,color:t.m,lineHeight:1.4}}>{r.l}</div></div>)}</div></div></div>},

{title:"Next steps",
r:t=><div><Tg t={t}>NEXT STEPS</Tg><div style={{height:20}}/><Stp t={t} items={["Workshop FAR × Shopify × Le Bouseuh  -  alignement créatif et stratégique","Identification du prochain temps fort Lockd  -  calage du calendrier de drop","Remise d'une note créative détaillée sous 10 jours ouvrés","Validation du dispositif et du budget","Production & post-production  -  tournage sur 7 jours + montage","Lancement synchronisé avec le drop Lockd"]}/></div>},

{title:"Merci",
r:(t,back)=><div style={{textAlign:"center",padding:"80px 0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{marginBottom:48}}><FarLogo size={100} variant={t.lv}/></div><div style={{...se,fontSize:56,fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.1,marginBottom:24}}>Merci.</div><div style={{...sa,fontSize:18,color:t.c2,lineHeight:1.6,maxWidth:600}}>Thibault Loué</div><div style={{width:60,height:3,background:t.a,borderRadius:2,margin:"32px auto 0"}}/>{back&&<button onClick={back} style={{marginTop:40,background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div>},
];

// ═══════════════════════════════════════════════════════════════════════════════
// RØDE  -  13 SLIDES (structure harmonisée)
// ═══════════════════════════════════════════════════════════════════════════════
const SR = [
{title:"Ouverture",
r:t=><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"65vh",textAlign:"center"}}><div style={{display:"flex",alignItems:"center",gap:20,marginBottom:40}}><FarLogo size={80} variant={t.lv}/><div style={{width:1,height:32,background:"rgba(255,255,255,.2)"}}/><img src={pu("/rode-logo-white.png")} alt="RØDE" style={{width:80,height:"auto"}}/></div><div style={{...mo,fontSize:12,fontWeight:600,padding:"8px 16px",background:t.pill,borderRadius:6,display:"inline-block",marginBottom:20}}>ACTIVATION RØDE × LE BOUSEUH PODCAST</div><Hl t={t} s={{fontSize:44,textAlign:"center",maxWidth:800,margin:"0 auto 24px"}}>Hors du setup.</Hl><div style={{...sa,fontSize:20,color:t.m,lineHeight:1.5,maxWidth:700,margin:"0 auto"}}>Et si le podcast quittait le studio pour aller dans l'univers réel de chaque&nbsp;invité&nbsp;?</div></div>},

{title:"Le Bouseuh comme créateur partenaire",
r:t=><div style={{display:"flex",gap:32,alignItems:"stretch"}}><div style={{flex:3,display:"flex",flexDirection:"column",justifyContent:"center"}}><Tg t={t}>POURQUOI LE BOUSEUH</Tg><Hl t={t} s={{fontSize:36}}>Le créateur partenaire idéal pour ce format.</Hl><Sh t={t}>Un nom fort de la creator economy française avec un podcast déjà installé, une audience massive et la crédibilité pour porter un partenaire récurrent premium.</Sh><div style={{display:"flex",gap:12,marginBottom:24}}>{[{v:"52+",l:"épisodes / an"},{v:"Acast",l:"infra monétisation"},{v:"Large",l:"amplitude éditoriale"}].map((s,i)=><div key={i} style={{flex:1,padding:"14px 12px",borderRadius:10,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center"}}><div style={{...se,fontSize:26,fontWeight:800,color:t.a}}>{s.v}</div><div style={{...sa,fontSize:11,color:t.m,marginTop:4}}>{s.l}</div></div>)}</div>{[{t:"Podcast installé",d:"Minimum 1 épisode par semaine. Invités de tous horizons : créateurs, sportifs, artistes, entrepreneurs. Format long, incarné."},{t:"Image en expansion",d:"Au-delà du gaming pur. Crédibilité suffisante pour porter un partenaire récurrent et premium."},{t:"Infrastructure prête",d:"Hébergé par Acast : analytics, distribution, host-read sponsorship. Tout est en place pour la monétisation structurée."}].map((a,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<2?`1px solid ${t.brd}`:"none"}}><div style={{...sa,fontSize:14,fontWeight:700,color:t.a,minWidth:120}}>{a.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{a.d}</div></div>)}</div><div style={{flex:2,borderRadius:16,overflow:"hidden"}}><img src={pu("/lebouseuh.png")} alt="Le Bouseuh" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:16}}/></div></div>},

{title:"Insight",
r:t=><div><Tg t={t}>INSIGHT</Tg><Hl t={t} s={{fontSize:36}}>Le podcast est partout. Et tout le monde fait la même chose.</Hl><Wc t={t} s={{padding:"40px 36px",marginTop:24}}><div style={{...sa,fontSize:18,color:t.m,lineHeight:1.7,marginBottom:24}}>Même studio, même canapé, même cadrage : le sponsoring podcast se résume à un message lu en début d'épisode que personne n'écoute vraiment. Aucune marque ne construit de territoire avec ça et par conséquent, aucun auditeur ne s'en souvient.</div><div style={{textAlign:"center",margin:"20px 0",opacity:.3,fontSize:20}}>↓</div><div style={{...se,fontSize:22,lineHeight:1.4,color:t.a,marginBottom:24}}>C'est exactement ce territoire mort qui nous intéresse pour RØDE : une marque qui va rendre possible un format que personne d'autre ne fait.</div></Wc></div>},

{title:"Big Idea",
r:t=><div><div style={{textAlign:"center",padding:"24px 0"}}><div style={{...mo,fontSize:14,fontWeight:800,letterSpacing:3,color:t.a,marginBottom:20}}>BIG IDEA</div><div style={{...se,fontSize:52,fontWeight:800,lineHeight:1.1,marginBottom:28}}>« Hors du setup »</div><div style={{...sa,fontSize:18,color:t.m,lineHeight:1.7,maxWidth:740,margin:"0 auto 36px"}}>Une fois par mois, le podcast quitte le studio et part dans l'univers réel de l'invité. On va deep sur les workflows, les décisions, les coulisses, comme le Colin & Samir Show, mais en terrain réel avec RØDE.</div></div><div style={{display:"flex",justifyContent:"center"}}><div style={{borderRadius:16,overflow:"hidden",display:"inline-block"}}><img src={pu("/case2_imgs/slide10_img18.jpg")} alt="Podcast terrain" style={{maxWidth:340,height:"auto",display:"block",filter:"grayscale(1)",borderRadius:16}}/></div></div><div style={{padding:"20px 24px",borderRadius:12,background:t.a+"10",border:`1px solid ${t.a}20`,marginTop:28,maxWidth:740,margin:"28px auto 0"}}><div style={{...mo,fontSize:10,fontWeight:700,letterSpacing:2,color:t.a,marginBottom:8}}>RÉFÉRENCE FORMAT</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6,textAlign:"justify"}}>Le <span style={{fontWeight:700,color:t.c}}>Colin & Samir Show</span> a prouvé qu'un podcast qui va en profondeur sur les workflows et l'envers du décor des créateurs crée une audience ultra-engagée. Leur épisode avec <span style={{fontWeight:700,color:t.c}}>MrBeast</span>, où ils décryptent les process de production, les décisions business et les coulisses, est un des plus performants du format. C'est exactement cette mécanique d'immersion terrain qu'on transpose ici.</div></div></div>},

{title:"Exécution",
r:t=><div><Tg t={t}>EXÉCUTION</Tg><Hl t={t} s={{fontSize:34}}>Créer un format qui se répète.</Hl><G2 s={{marginTop:24}}><Wc t={t} s={{background:t.a+"10",border:`1px solid ${t.a}25`,padding:32}}><Lb t={t} s={{color:t.a,fontSize:14}}>LA BONNE EXÉCUTION</Lb><div style={{...sa,fontSize:16,color:t.m,lineHeight:1.7,marginBottom:20}}>Le format construit un territoire sur la durée, pas un emplacement ponctuel.</div><Ar t={t} items={["Saison sponsorisée = répétition = mémorisation","Présence produit utile au récit, pas intrusive","Format exploitable en social, rights et paid","Le podcast grandit = la marque grandit avec","Logique de renouvellement annuel intégrée"]}/></Wc><Wc t={t} s={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",padding:32}}><Lb t={t} s={{color:"rgba(255,100,100,.8)",fontSize:14}}>LA MAUVAISE EXÉCUTION</Lb><div style={{...sa,fontSize:16,color:t.m,lineHeight:1.7,marginBottom:20}}>Sponsoriser un épisode isolé.</div><Ar t={t} items={["Placement déconnecté du récit","Pas de construction de territoire","Contenu jetable après publication","Aucune logique de renouvellement"]}/></Wc></G2><div style={{textAlign:"center",padding:"32px 40px",marginTop:24,borderRadius:14,background:t.card,border:`1px solid ${t.brd}`}}><div style={{...se,fontSize:20,lineHeight:1.5,color:t.c}}>RØDE doit apparaître comme le sponsor qui rend le format possible.</div></div></div>},

{title:"Positionnement",
r:t=><div><Tg t={t}>POSITIONNEMENT</Tg><Hl t={t} s={{fontSize:36}}>Un format de saison qui construit un territoire, pas un achat média ponctuel.</Hl><Sh t={t}>La logique de saison est structurellement supérieure au sponsoring épisode par épisode.</Sh><div style={{display:"flex",flexDirection:"column",gap:0,marginTop:28,borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{t:"Répétition = mémorisation",d:"L'audience associe progressivement RØDE au format. Véritable construction de territoire ou chaque épisode renforce le précédent."},{t:"Association long terme",d:"Le sponsor devient partie intégrante du format. L'audience ne perçoit pas un interrupteur publicitaire mais une marque qui rend possible. La logique de saison crée naturellement une base pour un renouvellement annuel."},{t:"Un format adaptable",d:"Après la saison pilote RØDE, la mécanique peut accueillir un sponsor plus statutaire. Contenu social, droits, cutdowns : chaque épisode génère des assets exploitables qui s'additionnent."}].map((item,i)=><div key={i} style={{display:"flex",gap:0,borderBottom:i<2?`1px solid ${t.brd}`:"none"}}><div style={{width:280,padding:"28px 24px",display:"flex",alignItems:"center"}}><div style={{...se,fontSize:17,fontWeight:700,color:t.c}}>{item.t}</div></div><div style={{flex:1,padding:"28px 24px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6}}>{item.d}</div></div></div>)}</div></div>},

{title:"Phasing",
r:t=><div><Tg t={t}>PHASING</Tg><Hl t={t} s={{fontSize:34}}>La mécanique de saison en 4 temps.</Hl><div style={{position:"relative",marginTop:40}}><div style={{position:"absolute",top:22,left:0,right:0,height:3,background:t.brd,zIndex:0}}/><div style={{display:"flex",gap:0,position:"relative",zIndex:1}}>{[{month:"MOIS 1",t:"Épisode 1  -  Salle de sport",d:"Coach / sportif. Territoire performance et discipline. Premier épisode terrain : installation du concept.",rode:"Micro mobile, captation terrain, qualité pro"},{month:"MOIS 2",t:"Épisode 2  -  Atelier",d:"Artisan / créateur physique. Territoire craft et savoir-faire. L'audience découvre un nouvel univers.",rode:"Setup adaptatif, enregistrement en conditions réelles"},{month:"MOIS 3",t:"Épisode 3  -  Backstage",d:"Artiste / musicien. Territoire création et scène. Le format prouve sa flexibilité.",rode:"Captation live, gestion du bruit ambiant"},{month:"MOIS 4",t:"Épisode 4 + best-of",d:"Entrepreneur / fondateur. Territoire business et terrain. Clôture de saison.",rode:"Bilan de saison, démonstration de la polyvalence RØDE"}].map((phase,i)=><div key={i} style={{flex:1,paddingRight:i<3?16:0}}><div style={{width:44,height:44,borderRadius:"50%",background:t.a,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",...mo,fontSize:16,fontWeight:700,color:t.bg}}>{i+1}</div><div style={{padding:"20px 16px",borderRadius:12,background:t.card,border:`1px solid ${t.brd}`,minHeight:220}}><div style={{...mo,fontSize:12,fontWeight:600,letterSpacing:2,color:t.d,marginBottom:8}}>{phase.month}</div><div style={{...sa,fontSize:16,fontWeight:700,marginBottom:8}}>{phase.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5,marginBottom:12}}>{phase.d}</div><div style={{padding:"10px 12px",borderRadius:8,background:t.a+"10"}}><div style={{...mo,fontSize:10,fontWeight:600,color:t.a,marginBottom:3}}>RØDE VISIBLE</div><div style={{...sa,fontSize:13,color:t.m}}>{phase.rode}</div></div></div></div>)}</div></div></div>},

{title:"Dispositif",
r:t=>{const items=[{t:"4 épisodes terrain",d:"1 / mois, univers différent",angle:-72},{t:"Vidéo YouTube",d:"Épisode long format",angle:0},{t:"Branding de saison",d:"Présence produit récurrente",angle:72},{t:"8-12 cutdowns sociaux",d:"TikTok, Reels, Shorts",angle:144},{t:"Best-of / live final",d:"Capitalisation audience",angle:216}];const R=190;return <div style={{textAlign:"center"}}><style>{`@keyframes _orb{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes _corb{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}._orbw{animation:_orb 20s linear infinite}._orbi{animation:_corb 20s linear infinite}._eco._paused ._orbw{animation-play-state:paused}._eco._paused ._orbi{animation-play-state:paused}`}</style><Tg t={t}>DISPOSITIF</Tg><Hl t={t} s={{fontSize:34,textAlign:"center"}}>Un système de contenu, pas une vidéo isolée.</Hl><Sh t={t} s={{textAlign:"center",maxWidth:700,margin:"0 auto"}}>Chaque brique du dispositif a un rôle précis dans le récit et dans l'exploitation.</Sh><div className="_eco" style={{position:"relative",width:600,height:480,margin:"24px auto 0",cursor:"pointer"}}><div onMouseEnter={e=>e.currentTarget.closest("._eco").classList.add("_paused")} onMouseLeave={e=>e.currentTarget.closest("._eco").classList.remove("_paused")} style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:130,height:130,borderRadius:"50%",background:t.a,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,cursor:"default"}}><div style={{...se,fontSize:13,fontWeight:800,color:t.bg,textAlign:"center",lineHeight:1.2}}>HORS DU<br/>SETUP</div></div><div className="_orbw" style={{position:"absolute",left:0,top:0,width:"100%",height:"100%",transformOrigin:"300px 240px"}}>{items.map((it,i)=>{const rad=it.angle*Math.PI/180;const cx=300,cy=240;const x=cx+R*Math.cos(rad);const y=cy+R*Math.sin(rad);return <div key={i}><svg style={{position:"absolute",left:0,top:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}><line x1={300} y1={240} x2={x} y2={y} stroke={t.brd} strokeWidth={1.5} strokeDasharray="4 4"/></svg><div className="_orbi" style={{position:"absolute",left:x-80,top:y-30,width:160,zIndex:1,textAlign:"center"}}><div style={{width:14,height:14,borderRadius:"50%",background:t.a,margin:"0 auto 6px",opacity:.7}}/><div style={{...sa,fontSize:14,fontWeight:700,marginBottom:2}}>{it.t}</div><div style={{...sa,fontSize:12,color:t.m}}>{it.d}</div></div></div>})}</div></div></div>}},

{title:"Amplification média",
r:t=><div><Tg t={t}>AMPLIFICATION MÉDIA</Tg><Hl t={t} s={{fontSize:34}}>Ce que RØDE peut exploiter au-delà de l'organique.</Hl><Sh t={t}>La saison produit un catalogue d'assets que RØDE peut activer sur ses propres canaux épisode après épisode.</Sh><div style={{display:"flex",flexDirection:"column",gap:0,marginTop:28,borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{n:"01",t:"Whitelisting",d:"RØDE booste les contenus directement depuis le compte du créateur. Le format natif surperforme les publicités classiques : meilleur CPV, meilleur taux d'engagement, ciblage maîtrisé par la marque."},{n:"02",t:"Cutdowns paid social",d:"2 à 3 formats courts par épisode pour les campagnes paid de RØDE sur Meta, TikTok et YouTube. Chaque cutdown montre le matériel RØDE en conditions réelles, hors studio."},{n:"03",t:"Retargeting cumulatif",d:"RØDE recibler les viewers d'un épisode avec le suivant. L'audience de la saison se construit mois après mois : chaque épisode amplifie le précédent."},{n:"04",t:"Assets site & CRM",d:"Vidéos, visuels et verbatims exploitables sur le site RØDE, dans les newsletters, les pages produits et les présentations retail. Le podcast terrain devient un argument de vente B2B."},{n:"05",t:"Earned media & RP",d:"Le format « Hors du setup » devient un proof point pour les RP de RØDE : une marque qui rend possible un podcast professionnel en toutes conditions, pas juste du matériel en studio."}].map((item,i)=><div key={i} style={{display:"flex",gap:0,borderBottom:i<4?`1px solid ${t.brd}`:"none"}}><div style={{width:50,padding:"22px 16px",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...mo,fontSize:12,fontWeight:700,color:t.a}}>{item.n}</div></div><div style={{width:220,padding:"22px 16px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:15,fontWeight:700}}>{item.t}</div></div><div style={{flex:1,padding:"22px 16px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{item.d}</div></div></div>)}</div></div>},

{title:"Estimatif",
r:t=><div style={{padding:"20px 0"}}><Tg t={t}>ESTIMATIF</Tg><div style={{height:16}}/><PT t={t} rows={[{i:"Talent / host-read / diffusion",p:"90-110 k€"},{i:"Conception de format & coordination FAR",p:"20-30 k€"},{i:"Production terrain / montage / habillage",p:"30-40 k€"},{i:"Droits d'usage digitaux",p:"20 k€"}]} total={{l:"Ballpark",v:"160-190 k€ HT"}} options={["Option annuelle : sur devis"]}/><div style={{marginTop:28}}><div style={{...mo,fontSize:12,fontWeight:700,letterSpacing:2,color:t.a,marginBottom:14}}>ROI</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>{[{v:"4 mois",l:"de présence continue avec construction de territoire cumulatif"},{v:"20+",l:"assets exploitables en paid, social, site, CRM et RP"},{v:"1",l:"format propriétaire « Hors du setup » activable en renouvellement annuel"}].map((r,i)=><div key={i} style={{padding:"18px 16px",borderRadius:12,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center"}}><div style={{...se,fontSize:28,fontWeight:800,color:t.a,marginBottom:6}}>{r.v}</div><div style={{...sa,fontSize:12,color:t.m,lineHeight:1.4}}>{r.l}</div></div>)}</div></div></div>},

{title:"Next steps",
r:t=><div><Tg t={t}>NEXT STEPS</Tg><div style={{height:20}}/><Stp t={t} items={["Choix des 4 territoires et invités de la saison 1","Cadrage créatif FAR × RØDE × Le Bouseuh","Validation de la charte d'intégration produit","Calendrier de tournage sur 4 mois","Mise à l'antenne du premier épisode « Hors du setup »"]}/></div>},

{title:"Merci",
r:(t,back)=><div style={{textAlign:"center",padding:"80px 0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{marginBottom:48}}><FarLogo size={100} variant={t.lv}/></div><div style={{...se,fontSize:56,fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.1,marginBottom:24}}>Merci.</div><div style={{...sa,fontSize:18,color:t.c2,lineHeight:1.6,maxWidth:600}}>Thibault Loué</div><div style={{width:60,height:3,background:t.a,borderRadius:2,margin:"32px auto 0"}}/>{back&&<button onClick={back} style={{marginTop:40,background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div>},
];

// ═══════════════════════════════════════════════════════════════════════════════
// FASTGOODCUISINE  -  OP LE COMBAT DES CHEFS  -  LONG FORMAT YOUTUBE  -  5 SLIDES
// ═══════════════════════════════════════════════════════════════════════════════
const SFGC = [
{title:"Le concept",
r:t=><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"65vh",textAlign:"center"}}><div style={{display:"flex",alignItems:"center",gap:24,marginBottom:36}}><FarLogo size={80} variant={t.lv}/><div style={{width:1,height:36,background:t.brd}}/><img src={pu("/fgc.webp")} alt="Fast Good Cuisine" style={{width:78,height:"auto",borderRadius:12,border:`1px solid ${t.brd}`,boxShadow:t.cS||"none"}}/></div><div style={{...mo,fontSize:12,fontWeight:600,padding:"8px 16px",background:t.pill,borderRadius:6,display:"inline-block",marginBottom:18}}>OP · LE COMBAT DES CHEFS</div><Hl t={t} s={{fontSize:42,textAlign:"center",maxWidth:940,margin:"0 auto 20px"}}>Le combat des chefs</Hl><div style={{...sa,fontSize:20,fontWeight:600,color:t.c,marginBottom:14,maxWidth:720}}>YouTube en long format : 50 chefs, jury star, un vainqueur.</div><div style={{...sa,fontSize:18,color:t.m,lineHeight:1.58,maxWidth:720,margin:"0 auto 28px"}}>Un format FastGoodCuisine porté par un partenaire exclusif : compétition sur le plateau, rythme serré, pensé pour tenir jusqu'à la fin et vivre en replay.</div><div style={{...se,fontSize:32,fontWeight:800,lineHeight:1.15,color:t.a,maxWidth:720,margin:"0 auto"}}>50 chefs entrent.<br/>1 seul reste.</div></div>},

{title:"Qui est Fast Good Cuisine",
r:t=><div style={{display:"flex",gap:32,alignItems:"stretch"}}><div style={{flex:3,display:"flex",flexDirection:"column",justifyContent:"center"}}><Tg t={t}>FAST GOOD CUISINE</Tg><Hl t={t} s={{fontSize:36}}>La chaîne food qui rassemble des millions de viewers.</Hl><Sh t={t}>Chaîne YouTube française majeure : recettes accessibles, défis et formats qui mettent la cuisine au centre. Une audience très large et engagée, le bon socle pour porter un long format événementiel avec jury et partenaire exclusif.</Sh><div style={{display:"flex",gap:12,marginBottom:24}}>{[{v:"7M+",l:"abonnés YouTube"},{v:"2,5 Md+",l:"vues cumulées"},{v:"2012",l:"création de la chaîne"}].map((s,i)=><div key={i} style={{flex:1,padding:"14px 12px",borderRadius:10,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center"}}><div style={{...se,fontSize:26,fontWeight:800,color:t.a}}>{s.v}</div><div style={{...sa,fontSize:11,color:t.m,marginTop:4}}>{s.l}</div></div>)}</div>{[{t:"Chaîne",d:"Food grand public sur YouTube : longs formats, shorts et présence continue sur le fil."},{t:"Formats forts",d:"Recettes, défis, collaborations : la cuisine comme spectacle, lisible pour le sponsor."},{t:"Marques",d:"Territoires naturels alimentaire, équipement, retail et lifestyle autour de la table et du geste."}].map((a,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<2?`1px solid ${t.brd}`:"none"}}><div style={{...sa,fontSize:14,fontWeight:700,color:t.a,minWidth:120}}>{a.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{a.d}</div></div>)}</div><div style={{flex:2,borderRadius:16,overflow:"hidden",flexShrink:0}}><img src={pu("/fgc.webp")} alt="Fast Good Cuisine" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:16}}/></div></div>},

{title:"L'idée en une slide",
r:t=><div><Tg t={t}>L'IDÉE EN UNE SLIDE</Tg><Hl t={t} s={{fontSize:34}}>Le format en 3 blocs</Hl><Sh t={t} s={{marginBottom:20}}>Un long format où la cuisine est le spectacle : chefs en compétition, jury star et un partenaire exclusif inscrit dans l'épreuve.</Sh><Wc t={t} s={{padding:"30px 26px",marginTop:8}}><div style={{display:"flex",flexDirection:"column",gap:22}}>{[{n:"1",t:"Les 50 chefs en compétition",d:"50 profils de cuisine réelle sur le plateau : brigades, indépendants, profils techniques ou créatifs. Le geste, le goût et la pression du service portent le récit sur toute la durée du film."},{n:"2",t:"Le jury de chefs stars",d:"Des figures très suivies : notes, remarques, décisions serrées. Le jury crédibilise le niveau et structure les temps forts du parcours."},{n:"3",t:"Un partenaire exclusif dans l'épreuve",d:"Ingrédient, matériel, prime, lieu ou twist : une seule marque structure le jeu là où ça sert le plat ou le chrono, avec une présence lisible tout au long du visionnage."}].map((x,i)=><div key={i} style={{display:"flex",gap:14,alignItems:"flex-start"}}><div style={{...se,fontSize:17,fontWeight:800,color:t.a2,minWidth:26}}>{x.n}</div><div><div style={{...sa,fontSize:16,fontWeight:700,color:t.c,marginBottom:6}}>{x.t}</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6}}>{x.d}</div></div></div>)}</div></Wc></div>},

{title:"La mécanique",
r:t=><div><Tg t={t}>MÉCANIQUE</Tg><Hl t={t} s={{fontSize:36}}>Pression, élimination, progression.</Hl><Sh t={t}>Les chefs enchaînent des épreuves devant le jury. Le groupe se resserre au fil du jeu jusqu'à la finale et au vainqueur.</Sh><div style={{display:"flex",gap:16,marginTop:26,flexWrap:"wrap"}}>{[{n:"01",t:"Corps du film",d:"Enchaînement d'épreuves pour suivre la progression des chefs, garder la tension et faire vivre le récit jusqu'au bout."},{n:"02",t:"Élimination",d:"Le jury tranche au fil du jeu ; le plateau se resserre jusqu'aux phases décisives."},{n:"03",t:"Climax",d:"Finale, couronnement du vainqueur : le moment le plus intense pour l'émotion collective et pour l'empreinte du partenaire."}].map((x,i)=><div key={i} style={{flex:"1 1 220px",padding:22,borderRadius:14,background:t.card,border:`1px solid ${t.brd}`,boxShadow:t.cS||"none"}}><div style={{...mo,fontSize:11,fontWeight:700,color:t.a,marginBottom:10}}>{x.n}</div><div style={{...se,fontSize:17,fontWeight:800,marginBottom:8,color:t.c}}>{x.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.55}}>{x.d}</div></div>)}</div></div>},

{title:"L'opportunité",
r:(t,back)=><div><Tg t={t}>OPPORTUNITÉ</Tg><Hl t={t} s={{fontSize:36}}>Un partenaire, une catégorie.</Hl><Sh t={t}>Un seul annonceur occupe le territoire choisi et s'aligne sur les séquences utiles aux 50 chefs et sur les temps forts visibles dans la timeline de la vidéo.</Sh><div style={{marginTop:26,padding:"22px 28px",borderRadius:14,background:t.th,display:"flex",alignItems:"center",gap:14}}><div style={{...mo,fontSize:11,fontWeight:700,letterSpacing:2,color:t.thT,opacity:.55,flexShrink:0}}>LECTURE MARQUE</div><div style={{...sa,fontSize:16,lineHeight:1.62,color:t.thT}}>Le partenaire unique incarne contraintes et récompenses du jeu sur tout le parcours. Intro, séquences jury et climax concentrent l'attention : idéal pour les temps forts du dispositif et pour les relances après la mise en ligne.</div></div><div style={{...sa,fontSize:12,color:t.m,marginTop:14,marginBottom:6,opacity:.9}}>Exemples de familles où un exclusif peut s'installer :</div><div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:4}}>{["Food et boisson","Ustensiles et cuisine pro","Electro et captation","Retail et last mile","Banque et assurance","Lifestyle et beauté"].map((w,i)=><span key={i} style={{...mo,fontSize:12,fontWeight:600,padding:"8px 14px",borderRadius:8,background:t.card,border:`1px solid ${t.brd}`,color:t.cardT}}>{w}</span>)}</div><div style={{textAlign:"center",marginTop:36}}>{back&&<button onClick={back} style={{background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div></div>},
];

// ═══════════════════════════════════════════════════════════════════════════════
// FASTGOODCUISINE  -  [MARQUE] × ACTIVATION  -  5 SLIDES
// ═══════════════════════════════════════════════════════════════════════════════
const SFGCMarque = [
{title:"[MARQUE] × FASTGOODCUISINE",
r:t=><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"65vh",textAlign:"center"}}><div style={{display:"flex",alignItems:"center",gap:18,marginBottom:22}}><FarLogo size={72} variant={t.lv}/><div style={{width:1,height:28,background:t.brd}}/><img src={pu("/fgc.webp")} alt="Fast Good Cuisine" style={{width:72,height:"auto",borderRadius:12,border:`1px solid ${t.brd}`,boxShadow:t.cS||"none"}}/></div><div style={{...mo,fontSize:11,fontWeight:600,letterSpacing:2.5,padding:"7px 14px",background:t.card,borderRadius:8,border:`1px solid ${t.brd}`,display:"inline-block",color:t.d,marginBottom:20}}>[MARQUE] × FASTGOODCUISINE</div><div style={{...se,fontSize:34,fontWeight:800,lineHeight:1.2,maxWidth:720,margin:"0 auto 16px",color:t.a}}>Quand la cuisine devient le spectacle de la marque.</div><div style={{...sa,fontSize:16,color:t.m,lineHeight:1.65,maxWidth:520,margin:"0 auto 20px"}}>Chaîne : <a href="https://www.youtube.com/@FastGoodCuisine" target="_blank" rel="noopener noreferrer" style={{color:t.a,fontWeight:700}}>youtube.com/@FastGoodCuisine</a></div></div>},

{title:"FastGoodCuisine",
r:t=><div style={{display:"flex",gap:32,alignItems:"stretch"}}><div style={{flex:3,display:"flex",flexDirection:"column",justifyContent:"center"}}><Tg t={t}>PRÉSENTATION</Tg><Hl t={t} s={{fontSize:34}}>Un profil food rare : média, spectacle, business.</Hl><Sh t={t}>Trois leviers dans la même collaboration : puissance média, divertissement grand public, prolongement business via ses marques. Territoire éditorial clair : dégustation, divertissement, test/hack.</Sh><div style={{display:"flex",gap:12,marginBottom:20}}>{[{v:"7,5M+",l:"abonnés YouTube"},{v:"2M",l:"Instagram"},{v:"Formats",l:"tests, hacks, défis"}].map((s,i)=><div key={i} style={{flex:1,padding:"14px 12px",borderRadius:12,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center",boxShadow:t.cS}}><div style={{...se,fontSize:24,fontWeight:800,color:t.a}}>{s.v}</div><div style={{...sa,fontSize:11,color:t.m,marginTop:4}}>{s.l}</div></div>)}</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.58}}>Il rend le produit désirable et sait monter en spectacle. Ses formats naturels : comparatifs, tests, hacks, dégustations, grands concepts à enjeu. C'est ce qui lui permet d'aller du simple placement produit à des vidéos-événement comme Le Dernier Qui Quitte La Table ou Plat à 1€ vs 10 000€ avec MrBeast. Exemples publics à très fort volume de vues (ex. ~3,5 M sur une « Last to Leave the Table », ~2,7 M sur un food hack TikTok).</div><a href="https://www.youtube.com/@FastGoodCuisine" target="_blank" rel="noopener noreferrer" style={{...mo,fontSize:12,fontWeight:700,color:t.a,marginTop:16,textDecoration:"underline"}}>youtube.com/@FastGoodCuisine</a></div><div style={{flex:2,borderRadius:16,overflow:"hidden",flexShrink:0}}><img src={pu("/fgc.webp")} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:16,minHeight:320}}/></div></div>},

{title:"Les 3 principaux enjeux",
r:t=><div><Tg t={t}>STRUCTURE</Tg><Hl t={t} s={{fontSize:30,marginBottom:8,lineHeight:1.15}}>Les 3 principaux enjeux de FastGoodCuisine</Hl><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginTop:22}}>{[{h:"Formats verticaux",d:"Volonté de développer les intégrations et les placements de marques dans les verticaux (TikTok, Shorts, Reels), aujourd'hui sous-exploités.",c:t.a},{h:"Rôle éditorial au cœur du concept",d:"Penser et co-construire des activations où la marque a un vrai rôle éditorial au cœur du concept, et pas seulement des intégrations.",c:t.a2},{h:"Pepe Chicken & Pop's",d:"Deux actifs extrêmement puissants : une opportunité énorme et un terrain de jeu très fertile pour la co-construction avec les marques.",c:t.a}].map((b,i)=><Wc key={i} t={t} s={{padding:20,marginTop:0,border:`2px solid ${t.brd}`,boxShadow:t.cS,borderTop:`4px solid ${b.c}`}}><div style={{...mo,fontSize:10,fontWeight:800,letterSpacing:2,color:b.c,marginBottom:10}}>{String(i+1).padStart(2,"0")}</div><div style={{...se,fontSize:16,fontWeight:800,color:t.c,marginBottom:10,lineHeight:1.2}}>{b.h}</div><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.5}}>{b.d}</div></Wc>)}</div></div>},

{title:"Deux actifs extrêmement puissants",
r:t=><div><Tg t={t}>FAST GOOD CUISINE</Tg><Hl t={t} s={{fontSize:32,lineHeight:1.15}}>2 actifs extrêmement puissants</Hl><Sh t={t}>Une opportunité énorme et un terrain de jeu très fertile pour la co-construction avec les marques.</Sh><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:20}}><Wc t={t} s={{padding:22}}><div style={{...mo,fontSize:10,fontWeight:700,letterSpacing:2,color:t.a,marginBottom:10}}>PEPE CHICKEN</div><div style={{...se,fontSize:17,fontWeight:800,color:t.c,marginBottom:10}}>Dark kitchen distribuée</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.55}}>Sur Uber Eats et Deliveroo. Opportunité de collaborer avec une marque de dessert ou de bonbon. Possibilité d'imaginer des partenariats avec de grandes chaînes pour des LTO.</div></Wc><Wc t={t} s={{padding:22}}><div style={{...mo,fontSize:10,fontWeight:700,letterSpacing:2,color:t.a2,marginBottom:10}}>POP'S</div><div style={{...se,fontSize:17,fontWeight:800,color:t.c,marginBottom:10}}>Thé glacé</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.55}}>Aujourd'hui distribué chez Pepe Chicken et en grande distribution. Volonté d'être en CHR.</div></Wc></div></div>},

{title:"Nuage de marques",
r:(t,back)=><div><Tg t={t}>CIBLES INDICATIVES</Tg><Hl t={t} s={{fontSize:32,marginBottom:14}}>Marques au bon profil pour l'activation</Hl><Sh t={t} s={{marginBottom:18,fontSize:17}}>Inclut les terrains type long format food / OP, food service, snacking, GMS, CHR, livraison, financement, électroménager et seconde main.</Sh><Bc t={t} labels={["McDonald's","KFC","Burger King","Subway","Starbucks","Five Guys","Quick","Kinder","Haribo","Oreo","LU","Milka","Ben & Jerry's","Häagen-Dazs","Yoplait","Activia","Danone","Barilla","Panzani","Evian","Volvic","Coca-Cola","Oasis","Sprite","Schweppes","Red Bull","Monster","Pepsi","Lurpak","Président","Elle & Vire","Kiri","Uber Eats","Deliveroo","Carrefour","Auchan","Intermarché","Leclerc","Monoprix","Franprix","Mastercard","MACIF","MACSF","Groupama","Tefal","Moulinex","KitchenAid","Le Creuset","Seb","Rowenta","De'Longhi","Bosch","Siemens","Smeg","LG","Samsung","Miele","Whirlpool","Electrolux","Philips","Candy","Beko","Dyson","Vinted"]}/><div style={{...sa,fontSize:11,color:t.d,marginTop:14,lineHeight:1.45,maxWidth:760,marginLeft:"auto",marginRight:"auto",textAlign:"center"}}>Illustrations indicatives ; aucune présupposition de partenariat ou de contact en cours avec les marques citées.</div><div style={{textAlign:"center",marginTop:28}}>{back&&<button onClick={back} style={{background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div></div>},
];

// ═══════════════════════════════════════════════════════════════════════════════
// O'TACOS × PEPE CHICKEN  -  LTO FOOD / DRIVE TO STORE  -  11 SLIDES
// ═══════════════════════════════════════════════════════════════════════════════
const TitleBars = ({color="#000",w=130,h=34,style}) => (
  <svg width={w} height={h} viewBox="0 0 130 34" style={{flexShrink:0,display:"block",...style}} aria-hidden>
    <path d="M30,4 L122,3 a3,3 0 0,1 0,6 L30,8 Z" fill={color}/>
    <path d="M3,15 L122,14 a3,3 0 0,1 0,6 L3,19 Z" fill={color}/>
    <path d="M48,26 L122,25 a3,3 0 0,1 0,6 L48,30 Z" fill={color}/>
  </svg>
);
const FarHeader = ({t}) => (
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
    <FarLogo size={42} variant="black"/>
    <TitleBars w={110} h={28}/>
  </div>
);
const SocialIcon = ({k,size=16}) => {
  if(k==="twitter") return <span style={{display:"inline-flex",width:size,height:size,borderRadius:Math.round(size*0.22),background:"#1DA1F2",alignItems:"center",justifyContent:"center",flexShrink:0,verticalAlign:"middle"}}>
    <svg width={size*0.66} height={size*0.66} viewBox="0 0 24 24" fill="#FFF"><path d="M22 5.8a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.6 1A4.2 4.2 0 0 0 11.5 9a11.9 11.9 0 0 1-8.6-4.4 4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 18.6a11.9 11.9 0 0 0 6.4 1.9c7.7 0 11.9-6.4 11.9-11.9v-.5A8.5 8.5 0 0 0 22 5.8z"/></svg>
  </span>;
  const map={youtube:"/youtube-logo.png",tiktok:"/tiktok-logo.png",instagram:"/instagram-logo.png"};
  const isCircle=k==="tiktok"||k==="youtube";
  return <span style={{display:"inline-flex",width:size,height:size,borderRadius:k==="instagram"?Math.round(size*0.22):isCircle?999:4,overflow:"hidden",alignItems:"center",justifyContent:"center",background:"#FFF",flexShrink:0,verticalAlign:"middle"}}><img src={pu(map[k])} alt={k} style={{width:"100%",height:"100%",objectFit:"contain",display:"block"}}/></span>;
};
const Crosspost = ({platforms,times=2,light=false}) => {
  const fg=light?"#FFFFFF":"#171006";
  const bg=light?"rgba(255,255,255,.18)":"rgba(255,196,0,.22)";
  const brd=light?"rgba(255,255,255,.55)":"rgba(23,16,6,.35)";
  return <div style={{display:"inline-flex",flexDirection:"column",alignItems:"stretch",gap:4,padding:"6px 8px",background:bg,borderRadius:8,border:`1.5px dashed ${brd}`}}>
    <div style={{...mo,fontSize:8.5,letterSpacing:1.4,fontWeight:900,color:fg,textAlign:"center"}}>CROSSPOST{times?` × ${times}`:""}</div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:3}}>
      {platforms.map((p,i)=><span key={i} style={{display:"flex",alignItems:"center",gap:3}}>
        {i>0&&<span style={{width:8,height:1.5,background:fg,borderRadius:1,opacity:.7}}/>}
        <SocialIcon k={p} size={14}/>
      </span>)}
    </div>
  </div>;
};
const BrandIcon = ({k,size=32}) => {
  const r=Math.max(4,size*0.18);
  const base={width:size,height:size,objectFit:"cover",borderRadius:r,flexShrink:0,display:"block",border:"1px solid rgba(23,16,6,.12)"};
  if(k==="otacos") return <img title="O'Tacos" src={pu("/otacos-logo.png")} alt="O'Tacos" style={base}/>;
  if(k==="pepe") return <img title="Pepe Chicken" src={pu("/pepe-chicken-logo.png")} alt="Pepe Chicken" style={base}/>;
  if(k==="fgc") return <img title="FastGoodCuisine" src={pu("/fgc.webp")} alt="FGC" style={base}/>;
  return null;
};
const BrandRow = ({brands=[],size=28,gap=4}) => <div style={{display:"flex",alignItems:"center",gap,flexWrap:"nowrap",justifyContent:"center"}}>{brands.map((b,i)=><BrandIcon key={i} k={b} size={size}/>)}</div>;

const RoadmapTable = ({n,cols,t,labelW=160,iconSize=24,fmtFs=11,thFs=10.5,thMin=86,newAccent="#FF7A00"}) => {
  const grid=`${labelW}px repeat(${cols.length}, 1fr)`;
  return <div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,gap:14}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <TitleBars w={92} h={24}/>
        <div style={{...se,fontSize:30,fontWeight:900,color:t.c,letterSpacing:0.5}}>ROADMAP · DISPOSITIF {n}</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {n>1&&<div style={{...mo,fontSize:9.5,fontWeight:900,letterSpacing:1.5,padding:"5px 10px",background:newAccent,color:"#FFF",borderRadius:999,display:"inline-flex",alignItems:"center",gap:6}}><span style={{width:7,height:7,borderRadius:999,background:"#FFF"}}/>NOUVEAUX VS DISPOSITIF {n-1}</div>}
        <div style={{...mo,fontSize:14,fontWeight:900,color:t.m,letterSpacing:1}}>2026</div>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:grid,gap:6,alignItems:"center",marginBottom:6,position:"relative"}}>
      <div style={{...mo,fontSize:10,fontWeight:900,letterSpacing:1.8,padding:"8px 10px",background:"#171006",color:"#FFF",borderRadius:8,textAlign:"center"}}>TIMING</div>
      {cols.map((c,i)=>{const pillBg=c.isNew?newAccent:"#171006";return <div key={i} style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {i>0&&<div style={{position:"absolute",left:-6,right:"50%",top:"50%",height:2,background:"#171006",transform:"translateY(-50%)",opacity:.35}}/>}
        {i<cols.length-1&&<div style={{position:"absolute",left:"50%",right:-6,top:"50%",height:2,background:"#171006",transform:"translateY(-50%)",opacity:.35}}/>}
        <div style={{...mo,fontSize:10.5,fontWeight:900,letterSpacing:1.2,padding:"7px 10px",background:pillBg,color:"#FFF",borderRadius:8,position:"relative",zIndex:1,boxShadow:c.isNew?`0 0 0 2px #FFF, 0 0 0 3px ${pillBg}`:"none"}}>{c.date}</div>
      </div>;})}
    </div>
    {[
      {l:"CHAÎNES",render:c=><BrandRow brands={c.brands||[]} size={iconSize} gap={3}/>,minH:46,justify:"center"},
      {l:"PLATEFORMES",render:c=><div style={{display:"flex",gap:5,justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>{(c.platforms||[]).map((p,i)=><SocialIcon key={i} k={p} size={iconSize}/>)}</div>,minH:46,justify:"center"},
      {l:"FORMATS",render:c=><div style={{...sa,fontSize:fmtFs,lineHeight:1.35,color:t.c,textAlign:"center",width:"100%"}}>{c.format}</div>,minH:62,justify:"center"},
      {l:"THÉMATIQUE",render:c=><div style={{...sa,fontSize:thFs,lineHeight:1.42,color:t.c,textAlign:"left",width:"100%"}}>{c.theme}</div>,minH:thMin,justify:"flex-start"},
    ].map((row,ri)=><div key={ri} style={{display:"grid",gridTemplateColumns:grid,gap:6,marginBottom:6}}>
      <div style={{...mo,fontSize:10,fontWeight:900,letterSpacing:1.8,padding:"10px 10px",background:"#171006",color:"#FFF",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center"}}>{row.l}</div>
      {cols.map((c,i)=>{const isNew=c.isNew;const cellBorder=isNew?newAccent:"#FFC400";const borderW=isNew?3:1.5;return <div key={i} style={{padding:isNew?"13px 7px 9px":"9px 7px",borderRadius:10,background:"#FFFFFF",border:`${borderW}px solid ${cellBorder}`,display:"flex",alignItems:"center",minHeight:row.minH,justifyContent:row.justify,position:"relative",overflow:"hidden"}}>
        {isNew&&<div style={{position:"absolute",top:0,left:0,right:0,height:5,background:newAccent}}/>}
        {ri===0&&isNew&&<div style={{position:"absolute",top:-11,right:6,...mo,fontSize:8.5,fontWeight:900,letterSpacing:1.2,padding:"3px 7px",background:newAccent,color:"#FFF",borderRadius:999,boxShadow:"0 1px 3px rgba(0,0,0,.2)",zIndex:2}}>NEW</div>}
        {row.render(c)}
      </div>;})}
    </div>)}
  </div>;
};
const DispositifsRow = ({focus="all",compact=false}) => {
  const items=[
    {n:"DISPOSITIF 1",h:"Le lancement essentiel",c:"10 contenus",col:"#171006",txt:"#FFC400",accent:"#FFC400"},
    {n:"DISPOSITIF 2",h:"Lancement amplifié",c:"17 contenus",col:"#FF7A00",txt:"#FFFFFF",accent:"#FFFFFF"},
    {n:"DISPOSITIF 3",h:"Le dispositif complet",c:"22 contenus",col:"#E30613",txt:"#FFFFFF",accent:"#FFC400"},
  ];
  const isBlurred=(i)=>{if(focus==="all")return false;return i+1>focus;};
  return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:compact?10:14}}>{items.map((x,i)=>{const blur=isBlurred(i);return <div key={i} style={{padding:compact?"14px 14px":"22px 20px",borderRadius:14,background:x.col,color:x.txt,border:`2px solid ${x.col}`,boxShadow:"0 5px 0 rgba(17,17,17,.9)",position:"relative",overflow:"hidden",filter:blur?"blur(5px) saturate(.6)":"none",opacity:blur?.55:1,transition:"all .3s"}}>
    <div style={{position:"absolute",top:-26,right:-26,width:110,height:110,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
    <div style={{...mo,fontSize:compact?9:10,fontWeight:900,letterSpacing:2.5,color:x.accent,marginBottom:6,position:"relative"}}>{x.n}</div>
    <div style={{...se,fontSize:compact?16:20,fontWeight:900,lineHeight:1.1,marginBottom:compact?8:12,position:"relative"}}>{x.h}</div>
    <div style={{display:"flex",gap:6,alignItems:"center",position:"relative",flexWrap:"wrap"}}>
      <div style={{...mo,fontSize:compact?9.5:11,fontWeight:900,padding:compact?"4px 9px":"6px 11px",background:"rgba(255,255,255,.18)",color:x.txt,borderRadius:999}}>{x.c}</div>
    </div>
  </div>;})}</div>;
};
const SOtacosPepe = [

// 01 — COVER (logos + 1 phrase)
{title:"O'Tacos × Pepe Chicken",
r:t=><div>
  <FarHeader t={t}/>
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"58vh",textAlign:"center"}}>
    <div style={{...mo,fontSize:11,fontWeight:900,letterSpacing:3,padding:"8px 16px",background:t.c2,color:t.bg,borderRadius:999,display:"inline-block",marginBottom:36}}>LTO · COLLABORATION 2026</div>
    <div style={{display:"flex",alignItems:"center",gap:54,flexWrap:"wrap",justifyContent:"center",marginBottom:34}}>
      <img src={pu("/otacos-logo.png")} alt="O'Tacos" style={{width:300,maxHeight:160,objectFit:"contain",borderRadius:14,boxShadow:t.cS,display:"block"}}/>
      <div style={{...se,fontSize:60,fontWeight:900,color:t.c}}>×</div>
      <img src={pu("/pepe-chicken-logo.png")} alt="Pepe Chicken" style={{width:200,height:200,objectFit:"cover",borderRadius:14,boxShadow:t.cS,display:"block"}}/>
    </div>
    <div style={{...se,fontSize:22,fontWeight:900,color:t.c,lineHeight:1.4,maxWidth:820}}>Deux communautés, deux produits éphémères, une LTO pensée comme un événement.</div>
  </div>
</div>},

// 02 — ENJEUX (fidèle au PDF, principe + 5 enjeux)
{title:"Enjeux",
r:t=><div>
  <FarHeader t={t}/>
  <Tg t={t}>LTO O'TACOS × PEPE CHICKEN · ENJEUX</Tg>
  <Hl t={t} s={{fontSize:32,marginBottom:14}}>Capitaliser sur deux communautés et créer la désirabilité autour de deux produits.</Hl>
  <div style={{padding:"16px 22px",borderRadius:14,background:t.c2,color:t.bg,marginBottom:18,boxShadow:t.cS}}>
    <div style={{...sa,fontSize:15,lineHeight:1.55}}>Développer une collaboration entre les deux entités afin de capitaliser sur les communautés respectives et créer de la désirabilité autour de deux produits : l'un disponible chez O'Tacos, l'autre chez Pepe Chicken, dans le but de générer du trafic.</div>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:10,marginTop:6}}>{[
    {n:"01",h:"Créer de la désirabilité",d:"Par la notion de produits éphémères : proposer une offre de produits limités pour stimuler l'intérêt."},
    {n:"02",h:"Toucher une nouvelle clientèle",d:"Profiter des deux communautés."},
    {n:"03",h:"Événementialiser",d:"Renforcer l'attachement aux marques : expérience unique en point de vente / commande, offres limitées en exclusivité, désirabilité."},
    {n:"04",h:"Booster les ventes",d:"Augmenter le trafic croisé en point de vente (drive to store) / commande, augmenter le panier moyen via l'effet nouveauté."},
    {n:"05",h:"Puissance marketing",d:"Coup de communication unique, production de contenus, multiplication des axes, partage spontané, moment fort ancré dans les mémoires."},
  ].map((x,i)=><Wc key={i} t={t} s={{padding:18,borderTop:`5px solid ${i%2?t.a2:t.a}`,boxShadow:t.cS}}>
    <div style={{...mo,fontSize:10,fontWeight:900,letterSpacing:2,color:i%2?t.a2:t.a,marginBottom:8}}>{x.n}</div>
    <div style={{...se,fontSize:15,fontWeight:900,color:t.c,marginBottom:8,lineHeight:1.18}}>{x.h}</div>
    <div style={{...sa,fontSize:12.5,color:t.m,lineHeight:1.5}}>{x.d}</div>
  </Wc>)}</div>
</div>},

// 03 — VALORISATION O'TACOS (mesurée, transition naturelle)
{title:"O'Tacos a les fondations pour réussir cette LTO",
r:t=><div>
  <FarHeader t={t}/>
  <Tg t={t}>UN TERRAIN DÉJÀ FERTILE</Tg>
  <Hl t={t} s={{fontSize:38,lineHeight:1.1,marginBottom:32,maxWidth:1100}}>O'Tacos a les fondations pour faire de cette LTO un succès.</Hl>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:14,marginTop:4}}>{[
    {h:"Marque iconique",d:"Un nom installé dans la culture food, immédiatement reconnaissable et chargé d'attachement communautaire."},
    {h:"Produit signature",d:"Le tacos O'Tacos est une catégorie en soi. Une LTO trouve naturellement son territoire dans cette grammaire produit."},
    {h:"Distribution massive",d:"Un maillage point de vente puissant qui rend le drive to store immédiat et activable partout, dès J-J."},
    {h:"Communication active",d:"Présence sociale, campagnes, prises de parole : O'Tacos sait déjà parler à sa communauté avec impact."},
  ].map((x,i)=><Wc key={i} t={t} s={{padding:"24px 22px",borderTop:`5px solid ${t.c2}`,boxShadow:t.cS,display:"flex",flexDirection:"column",gap:10,minHeight:200}}>
    <div style={{...se,fontSize:18,fontWeight:900,color:t.c,lineHeight:1.2}}>{x.h}</div>
    <div style={{...sa,fontSize:13.5,color:t.m,lineHeight:1.55}}>{x.d}</div>
  </Wc>)}</div>
</div>},

// 04 — TEASING centré (titre + 1 phrase)
{title:"Mais on a une arme à mobiliser",
r:t=><div>
  <FarHeader t={t}/>
  <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"58vh",textAlign:"center"}}>
    <Hl t={t} s={{fontSize:64,lineHeight:1.05,marginBottom:32,maxWidth:1100,textAlign:"center"}}>Mais on a <span style={{background:t.a,color:"#FFF",padding:"2px 16px",borderRadius:10}}>une arme</span> qu'il faut absolument mobiliser.</Hl>
    <Sh t={t} s={{fontSize:24,maxWidth:880,lineHeight:1.45,textAlign:"center",margin:"0 auto"}}>Pour transformer cette LTO en un évènement food incontournable.</Sh>
  </div>
</div>},

// 05 — FGC REVEAL (modèle présentation créateur : photo à droite, infos à gauche)
{title:"FastGoodCuisine",
r:t=><div>
  <FarHeader t={t}/>
  <div style={{display:"flex",gap:32,alignItems:"stretch"}}>
    <div style={{flex:3,display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <Tg t={t}>L'ARME : FASTGOODCUISINE</Tg>
      <Hl t={t} s={{fontSize:38,lineHeight:1.05,marginBottom:10}}>FastGoodCuisine.<br/>Le créateur food n°1 français.</Hl>
      <Sh t={t} s={{fontSize:15.5,marginBottom:18}}>Une audience massive, une communauté ultra engagée, et un entrepreneur installé.</Sh>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:18}}>{[
        {ic:"youtube",p:"YouTube",n:"7,78M",l:"abonnés",e:["Vues 1 an : 2,4M","Shorts : 2,7M"],headBg:"#FF0000"},
        {ic:"tiktok",p:"TikTok",n:"2,4M",l:"abonnés",e:["Vues moyennes : 3M"],headBg:"#000000"},
        {ic:"instagram",p:"Instagram",n:"2,3M",l:"abonnés",e:["Vues Reels : 650k"],headBg:"linear-gradient(135deg,#F58529 0%,#DD2A7B 50%,#8134AF 100%)"},
      ].map((x,i)=><div key={i} style={{borderRadius:12,overflow:"hidden",boxShadow:t.cS,border:`2px solid ${t.c2}`,background:t.card,display:"flex",flexDirection:"column"}}>
        <div style={{background:x.headBg,color:"#FFF",padding:"9px 11px",display:"flex",alignItems:"center",gap:7}}>
          <SocialIcon k={x.ic} size={18}/>
          <div style={{...mo,fontSize:10.5,fontWeight:900,letterSpacing:1.5}}>{x.p.toUpperCase()}</div>
        </div>
        <div style={{padding:"11px 13px",background:t.card,color:t.cardT,flex:1}}>
          <div style={{...se,fontSize:24,fontWeight:900,lineHeight:1,color:t.a}}>{x.n}</div>
          <div style={{...mo,fontSize:9,fontWeight:700,opacity:.7,marginTop:2,marginBottom:7,letterSpacing:1.2}}>{x.l.toUpperCase()}</div>
          {x.e.map((e,j)=><div key={j} style={{...sa,fontSize:10.5,lineHeight:1.4,color:t.m,paddingTop:4,marginTop:j?4:0,borderTop:j?`1px solid ${t.brd}`:"none"}}>{e}</div>)}
        </div>
      </div>)}</div>
      <div>{[
        {ti:"Audience massive",d:"Le plus gros créateur food en France, suivi par des millions de viewers fidèles."},
        {ti:"Communauté ultra engagée",d:"Un public actif, qui partage, commente et déplace ses choix de consommation."},
        {ti:"Entrepreneur food installé",d:"Pepe Chicken et Pop's : il fabrique du désir produit, pas seulement du contenu."},
      ].map((s,i)=><div key={i} style={{...sa,fontSize:14.5,color:t.m,padding:"12px 0",borderTop:i?`1px solid ${t.brd}`:"none",lineHeight:1.55,display:"flex",gap:14}}>
        <div style={{...se,fontSize:14,fontWeight:900,color:t.c,minWidth:220,flexShrink:0}}>{s.ti}</div>
        <div style={{flex:1}}>{s.d}</div>
      </div>)}</div>
    </div>
    <div style={{flex:1.7,position:"relative",display:"flex",alignItems:"stretch"}}>
      <div style={{position:"relative",width:"100%",borderRadius:18,overflow:"hidden",boxShadow:t.cS,border:`3px solid ${t.c2}`}}>
        <img src={pu("/fgc.webp")} alt="FastGoodCuisine" style={{width:"100%",height:"100%",objectFit:"cover",display:"block",minHeight:408}}/>
        <div style={{position:"absolute",left:0,right:0,bottom:0,padding:"18px 22px",background:"linear-gradient(180deg,transparent 0%,rgba(0,0,0,.92) 100%)"}}>
          <div style={{...se,fontSize:24,fontWeight:900,color:"#FFF",lineHeight:1.1}}>FastGoodCuisine.</div>
          <div style={{...sa,fontSize:13,color:"rgba(255,255,255,.78)",marginTop:6,lineHeight:1.5}}>Créateur food n°1 français + entrepreneur Pepe Chicken & Pop's.</div>
        </div>
      </div>
    </div>
  </div>
</div>},

// 06 — INTERCALAIRE DISPOSITIF 1 (focus 1 ; D2 et D3 floutés)
{title:"Notre dispositif · D1",
r:t=><div>
  <FarHeader t={t}/>
  <Tg t={t}>NOTRE DISPOSITIF · O'TACOS × PEPE CHICKEN</Tg>
  <Hl t={t} s={{fontSize:38,marginBottom:8}}>Trois dispositifs. Une montée en intensité.</Hl>
  <Sh t={t} s={{fontSize:16,marginBottom:26}}>On commence par le dispositif 1 : le lancement essentiel, concentré sur la fenêtre de lancement.</Sh>
  <DispositifsRow focus={1}/>
</div>},

// 07 — DISPOSITIF 1 DÉTAILLÉ (fidèle PDF v2 p.1)
{title:"Dispositif 1 · Roadmap",
r:t=><div>
  <FarHeader t={t}/>
  <RoadmapTable n={1} t={t} labelW={150} iconSize={26} fmtFs={12} thFs={11.5} thMin={150} cols={[
    {date:"J-1",brands:["otacos","pepe","fgc"],platforms:["tiktok","instagram","youtube"],format:"Reels\nTiktok\nShorts",theme:"Annonce de la collaboration le jeudi : vidéo courte dans l'ADN de la collaboration avec Xavier Pincemin incluant des visuels produits, en co-création."},
    {date:"J-J",brands:["fgc"],platforms:["youtube"],format:"Manche dédiée (à travers un concept phare tel que « Le dernier qui quitte la table… »)\nIGS additionnelles : « Surprise dans ma nouvelle vidéo » : Annonce nouvelle LTO disponible (repost de FG)",theme:<div><div style={{fontWeight:900,marginBottom:5}}>LAUNCH à la publication de FG · 18H le vendredi</div>Une manche entière dédiée à la LTO. Objectif drive to store via une offre de lancement annoncée dans la vidéo, en exclusivité du vendredi au dimanche (J-J à J+3). L'offre : 1 tacos de la LTO acheté chez l'un ou chez l'autre, du vendredi 18h au dimanche 00h = % offert chez l'autre + second produit de la LTO offert. Événementialisation. Partage des deux communautés.</div>},
  ].map(c=>({...c,format:typeof c.format==="string"?<div style={{whiteSpace:"pre-line"}}>{c.format}</div>:c.format}))}/>
</div>},

// 08 — INTERCALAIRE DISPOSITIF 2 (focus 2 ; D3 toujours flouté)
{title:"Notre dispositif · D2",
r:t=><div>
  <FarHeader t={t}/>
  <Tg t={t}>NOTRE DISPOSITIF · O'TACOS × PEPE CHICKEN</Tg>
  <Hl t={t} s={{fontSize:38,marginBottom:8}}>On monte d'un cran.</Hl>
  <Sh t={t} s={{fontSize:16,marginBottom:26}}>Le dispositif 2 garde tout le 1, et ajoute du teasing en amont, une vidéo organique chez O'Tacos, des rappels et un stunt final.</Sh>
  <DispositifsRow focus={2}/>
</div>},

// 09 — DISPOSITIF 2 DÉTAILLÉ (fidèle PDF v2 p.2)
{title:"Dispositif 2 · Roadmap",
r:t=><div>
  <FarHeader t={t}/>
  <RoadmapTable n={2} t={t} newAccent="#FF7A00" labelW={130} iconSize={22} fmtFs={10.5} thFs={9.5} thMin={170} cols={[
    {date:"J-3",isNew:true,brands:["pepe","fgc"],platforms:["instagram"],format:<div>Post Photo</div>,theme:<div>Teasing mardi :<br/>Indices produits</div>},
    {date:"J-1",brands:["otacos","pepe","fgc"],platforms:["tiktok","instagram"],format:<div style={{whiteSpace:"pre-line"}}>{"Reels\nTiktok"}</div>,theme:<div>Annonce de la collaboration le jeudi : vidéo courte dans l'ADN de la collaboration avec Xavier Pincemin et visuels produits</div>},
    {date:"J-J",brands:["fgc"],platforms:["youtube"],format:<div>Manche dédiée (à travers un concept phare « Le dernier qui quitte la table… »)<br/>IGS additionnelles : « Surprise dans ma nouvelle vidéo » · Nouvelle LTO dispo (repost de FG)</div>,theme:<div><b>LAUNCH à la publication de FG · 18H le vendredi.</b> Une manche entière dédiée à la LTO. Objectif drive to store via une offre de lancement annoncée dans la vidéo en exclusivité (J-J à J+3). L'offre : 1 tacos de la LTO acheté chez l'un ou chez l'autre, du vendredi 18h au dimanche 00h = % offert chez l'autre + second produit de la LTO offert. Événementialisation. Partage des deux communautés.</div>},
    {date:"J+6/7",isNew:true,brands:["fgc","otacos"],platforms:["instagram"],format:<div>Reels</div>,theme:<div>Vidéo organique FG chez O'tacos : contenu plus naturel = Inspiration de la vidéo avec Xavier Pincemin</div>},
    {date:"J+14",isNew:true,brands:["pepe","fgc"],platforms:["instagram"],format:<div>Reels</div>,theme:<div style={{color:"#1A73E8",textDecoration:"underline"}}>Tiny to giant O'Tacos LTO</div>},
    {date:"J+20",isNew:true,brands:["fgc","otacos"],platforms:["instagram"],format:<div>IGS</div>,theme:<div>« C'est toujours dispo »<br/>Repost de <BrandIcon k="otacos" size={16}/></div>},
    {date:"J+25",isNew:true,brands:["pepe","fgc"],platforms:["twitter"],format:<div>Tweet</div>,theme:<div>Stunt de fin : offres de codes</div>},
  ]}/>
</div>},

// 10 — INTERCALAIRE DISPOSITIF 3 (focus 3 ; tout est révélé, D3 mis en avant)
{title:"Notre dispositif · D3",
r:t=><div>
  <FarHeader t={t}/>
  <Tg t={t}>NOTRE DISPOSITIF · O'TACOS × PEPE CHICKEN</Tg>
  <Hl t={t} s={{fontSize:38,marginBottom:8}}>Le dispositif complet.</Hl>
  <Sh t={t} s={{fontSize:16,marginBottom:26}}>Le dispositif 3 garde tout le 2, et densifie : implantation, drive to store gamifié (QR codes), last push J+27 et clôture J+29-31.</Sh>
  <DispositifsRow focus={3}/>
</div>},

// 11 — DISPOSITIF 3 DÉTAILLÉ (fidèle PDF v2 p.3)
{title:"Dispositif 3 · Roadmap",
r:t=><div>
  <FarHeader t={t}/>
  <RoadmapTable n={3} t={t} newAccent="#E30613" labelW={108} iconSize={20} fmtFs={9.5} thFs={8.5} thMin={180} cols={[
    {date:"J-3",brands:["pepe","fgc"],platforms:["instagram"],format:<div>Post Photo</div>,theme:<div>Teasing le mardi :<br/>Indices produits</div>},
    {date:"J-1",brands:["otacos","pepe","fgc"],platforms:["tiktok","instagram","youtube"],format:<div style={{whiteSpace:"pre-line"}}>{"Reels\nTiktok\nShorts"}</div>,theme:<div>Annonce de la collaboration le jeudi : vidéo courte dans l'ADN de la collaboration avec Xavier Pincemin et visuels produits</div>},
    {date:"J-J",brands:["fgc"],platforms:["youtube"],format:<div>Manche dédiée (à travers un concept phare « Le dernier qui quitte la table… »)<br/>IGS additionnelles : « Surprise dans ma nouvelle vidéo » · Nouvelle LTO dispo (repost de FG)</div>,theme:<div><b>LAUNCH à la publication de FG · 18H le vendredi.</b> Une manche entière dédiée à la LTO. Objectif drive to store via une offre de lancement annoncée dans la vidéo en exclusivité (J-J à J+3). L'offre : 1 tacos de la LTO acheté chez l'un ou chez l'autre, du vendredi 18h au dimanche 00h = % offert chez l'autre + second produit de la LTO offert. Événementialisation. Partage des deux communautés.</div>},
    {date:"J+6/7",brands:["pepe","otacos"],platforms:["instagram"],format:<div>Post photo</div>,theme:<div>Rappel LTO « c'est toujours dispo ». Avis de la communauté pour l'engagement. Implanter la collaboration.</div>},
    {date:"J+9",isNew:true,brands:["fgc","otacos"],platforms:["youtube"],format:<div>Shorts</div>,theme:<div style={{color:"#1A73E8",textDecoration:"underline"}}>Tiny to giant O'Tacos LTO</div>},
    {date:"J+11/12",isNew:true,brands:["pepe","otacos"],platforms:["instagram"],format:<div>Reels</div>,theme:<div>Vidéo organique FG chez O'tacos : contenu plus naturel = Inspiration de la vidéo avec <span style={{color:"#1A73E8",textDecoration:"underline"}}>Xavier Pincemin</span></div>},
    {date:"J+20",brands:["fgc","otacos"],platforms:["instagram"],format:<div>IGS</div>,theme:<div>« C'est toujours dispo »<br/>Repost de</div>},
    {date:"J+25",brands:["pepe","fgc"],platforms:["instagram"],format:<div>Post Giveaway Reels crosspost</div>,theme:<div>Drive to store. Thématique de jeu : des QR codes cachés chez O'tacos qui permettent de gagner des produits / réductions chez les deux entités, + possibilité de gagner 1 000€.</div>},
    {date:"J+27",isNew:true,brands:["fgc","otacos"],platforms:["instagram"],format:<div>IGS</div>,theme:<div>Surfer sur l'actu · IGS avec OT</div>},
    {date:"J+29-31",isNew:true,brands:["pepe","fgc"],platforms:["twitter"],format:<div>Tweet</div>,theme:<div>Stunt de fin : offres de codes</div>},
  ]}/>
</div>},

// 12 — RÉCAPITULATIF (alignement propre, textes blancs harmonisés, badge ristourne custom)
{title:"Récapitulatif",
r:t=>{const offers=[
    {n:"DISPOSITIF 1",total:10,full:"100 000€",discountPct:null,final:"100 000€",col:"#171006",badge:"#FFC400",badgeT:"#171006",cols:[
      {brand:"otacos",items:["1 Reels","1 Tiktok","1 Shorts"]},
      {brand:"pepe",items:["1 Reels","1 Tiktok","1 Shorts"]},
      {brand:"fgc",items:["1 Reels","1 Tiktok","1 Shorts","","1 vidéo Youtube manche dédiée"]},
    ]},
    {n:"DISPOSITIF 2",total:17,full:"145 000€",discountPct:"-3%",final:"140 650€",col:"#FF7A00",badge:"#FFFFFF",badgeT:"#FF7A00",cols:[
      {brand:"otacos",items:["2 Reels","1 Tiktok","1 Story"]},
      {brand:"pepe",items:["2 Reels","1 Tiktok","1 Post","1 Tweet"]},
      {brand:"fgc",items:["3 Reels","1 Tiktok","1 Post","1 Tweet","1 Story","","1 vidéo Youtube (manche dédiée)"]},
    ]},
    {n:"DISPOSITIF 3",total:23,full:"206 000€",discountPct:"-5%",final:"195 700€",col:"#E30613",badge:"#FFC400",badgeT:"#171006",cols:[
      {brand:"otacos",items:["2 Reels","1 Tiktok","2 Shorts","1 Story"]},
      {brand:"pepe",items:["2 Reels","1 Tiktok","1 Shorts","2 Post","1 Story"]},
      {brand:"fgc",items:["3 Reels","1 Tiktok","2 Shorts","1 Post","1 Story","1 Tweet","","1 vidéo Youtube manche dédiée"]},
    ]},
  ];const W="#FFFFFF";return <div>
    <FarHeader t={t}/>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,gap:18}}>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <Tg t={t}>RÉCAPITULATIF</Tg>
        <Hl t={t} s={{fontSize:36,marginBottom:0,lineHeight:1.05}}>O'Tacos × Pepe Chicken.</Hl>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <BrandIcon k="otacos" size={56}/>
        <div style={{...se,fontSize:24,fontWeight:900,color:t.c2}}>×</div>
        <BrandIcon k="pepe" size={56}/>
        <div style={{...se,fontSize:24,fontWeight:900,color:t.c2}}>×</div>
        <BrandIcon k="fgc" size={56}/>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,alignItems:"stretch"}}>{offers.map((x,i)=><div key={i} style={{padding:"22px 22px 24px",borderRadius:18,background:x.col,color:W,boxShadow:t.cS,position:"relative",overflow:"hidden",border:`3px solid ${x.col}`,display:"flex",flexDirection:"column"}}>
      <div style={{position:"absolute",top:-50,right:-50,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
      <div style={{position:"relative",flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{...mo,fontSize:11,fontWeight:900,letterSpacing:2.5,padding:"6px 12px",background:x.badge,color:x.badgeT,borderRadius:999,display:"inline-block",alignSelf:"flex-start",marginBottom:16}}>{x.n}</div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
          <div style={{...mo,fontSize:9.5,fontWeight:900,letterSpacing:2,color:W,opacity:.7}}>LIVRABLES</div>
          <div style={{flex:1,height:1,background:W,opacity:.18}}/>
          <div style={{...mo,fontSize:10,fontWeight:900,padding:"4px 10px",background:"rgba(255,255,255,.18)",color:W,borderRadius:999}}>Total · {x.total}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:18,flex:1,alignItems:"start"}}>{x.cols.map((c,j)=><div key={j} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,textAlign:"center"}}>
          <BrandIcon k={c.brand} size={42}/>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:1,...sa,fontSize:11.5,color:W,opacity:.94,lineHeight:1.5,textAlign:"center"}}>
            {c.items.map((it,k)=>it===""?<div key={k} style={{height:5}}/>:<div key={k}>{it}</div>)}
          </div>
        </div>)}</div>
        <div style={{borderTop:`1.5px solid rgba(255,255,255,.18)`,paddingTop:14,marginTop:"auto"}}>
          <div style={{...mo,fontSize:9.5,fontWeight:900,letterSpacing:2,color:W,opacity:.7,marginBottom:8}}>BUDGET</div>
          {x.discountPct?<div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <div style={{...se,fontSize:15,fontWeight:700,color:W,textDecoration:"line-through",opacity:.55}}>{x.full}</div>
            <div style={{position:"relative",display:"inline-flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"5px 12px",background:W,borderRadius:10,transform:"rotate(-6deg)",boxShadow:"0 3px 0 rgba(0,0,0,.18)"}}>
              <div style={{...se,fontSize:18,fontWeight:900,color:x.col,lineHeight:1,letterSpacing:0.5}}>{x.discountPct}</div>
              <div style={{...mo,fontSize:7.5,fontWeight:900,letterSpacing:1.6,color:x.col,marginTop:2,opacity:.9}}>RISTOURNE</div>
            </div>
            <div style={{...se,fontSize:34,fontWeight:900,color:W,letterSpacing:0.5,lineHeight:1}}>{x.final}</div>
          </div>:<div style={{...se,fontSize:40,fontWeight:900,color:W,letterSpacing:0.5,lineHeight:1}}>{x.final}</div>}
        </div>
      </div>
    </div>)}</div>
  </div>;}},

// 13 — MERCI (juste MERCI)
{title:"Merci",
r:t=><div style={{minHeight:"72vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
  <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:40}}>
    <FarLogo size={48} variant="black"/>
    <TitleBars w={120} h={32}/>
  </div>
  <div style={{background:t.c2,color:t.bg,padding:"28px 88px",...se,fontSize:120,fontWeight:900,letterSpacing:-3,lineHeight:1,boxShadow:t.cS,borderRadius:10}}>MERCI.</div>
</div>},
];

// ═══════════════════════════════════════════════════════════════════════════════
// TOINELAG  -  ACTIVATION RETAIL / JOUET  -  5 SLIDES
// ═══════════════════════════════════════════════════════════════════════════════
const SToinelag = [
{title:"[MARQUE] × TOINELAG",
r:t=><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",textAlign:"center"}}><div style={{display:"flex",alignItems:"center",gap:18,marginBottom:22}}><FarLogo size={72} variant={t.lv}/><div style={{width:1,height:28,background:t.brd}}/><img src={pu("/toinelag-avatar.png")} alt="Toinelag" style={{width:64,height:64,borderRadius:16,objectFit:"cover",border:`3px solid ${t.c}`,boxShadow:t.cS}}/></div><div style={{...mo,fontSize:11,fontWeight:600,letterSpacing:2.5,padding:"7px 14px",background:t.card,borderRadius:8,border:`1px solid ${t.brd}`,display:"inline-block",color:t.d,marginBottom:20}}>[MARQUE] × TOINELAG</div><div style={{...se,fontSize:34,fontWeight:800,lineHeight:1.2,maxWidth:720,margin:"0 auto 16px",color:t.a}}>Quand le magasin devient l'aventure.</div><div style={{...sa,fontSize:16,color:t.m,lineHeight:1.65,maxWidth:520,margin:"0 auto 20px"}}>Chaîne : <a href="https://www.youtube.com/@toinelag" target="_blank" rel="noopener noreferrer" style={{color:t.a,fontWeight:700}}>youtube.com/@toinelag</a></div></div>},

{title:"Pourquoi Toinelag",
r:t=><div style={{display:"flex",gap:32,alignItems:"stretch"}}><div style={{flex:3,display:"flex",flexDirection:"column",justifyContent:"center"}}><Tg t={t}>POURQUOI TOINELAG</Tg><Hl t={t} s={{fontSize:36}}>Une audience jeune et familiale, des concepts immédiatement désirables.</Hl><Sh t={t}>Ses formats forts tournent autour de la construction, du défi, de la cachette et du jeu à grande échelle. Il a la capacité rare de transformer un lieu ou un produit en terrain d'aventure. C'est ce qui rend son profil très lisible pour des activations retail, jouet ou FMCG familiales.</Sh><div style={{display:"flex",gap:12,marginBottom:24}}>{[{v:"1,6M+",l:"abonnés YouTube"},{v:"645M+",l:"vues cumulées"},{v:"2017",l:"création chaîne"}].map((s,i)=><div key={i} style={{flex:1,padding:"14px 12px",borderRadius:12,background:t.card,border:`2px solid ${t.brd}`,textAlign:"center",boxShadow:t.cS}}><div style={{...se,fontSize:24,fontWeight:800,color:t.a}}>{s.v}</div><div style={{...sa,fontSize:11,color:t.m,marginTop:4}}>{s.l}</div></div>)}</div>{[{t:"Exemples de titres",d:"« Je construis une pièce secrète dans un trampoline park », « Énorme bataille de Nerf », « Cache-cache extrême dans des cartons », « Bonbon vs vraie vie pendant 24 h »."},{t:"Lecture marque",d:"Concepts simples, visuels, très partageables. Le produit ou le lieu devient vite le moteur du scénario."},{t:"Territoires",d:"Retail, jouet, grande distribution familiale, snacking, licences kids : des univers où son ADN colle naturellement."}].map((a,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<2?`2px solid ${t.brd}`:"none"}}><div style={{...sa,fontSize:14,fontWeight:700,color:t.a,minWidth:130}}>{a.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.55}}>{a.d}</div></div>)}</div><div style={{flex:2,display:"flex",justifyContent:"center",alignItems:"flex-start"}}><div style={{width:"80%",maxWidth:"100%",borderRadius:18,overflow:"hidden",flexShrink:0,border:`4px solid ${t.c}`,boxShadow:t.cS}}><img src={pu("/toinelag-thumb.png")} alt="Toinelag" style={{width:"100%",height:"100%",objectFit:"cover",minHeight:352,display:"block"}}/></div></div></div>},

{title:"In-store : le magasin comme zone de jeu",
r:t=><div><Tg t={t}>ACTIVATIONS IN-STORE</Tg><Hl t={t} s={{fontSize:34}}>Le lieu fait partie du concept.</Hl><Sh t={t}>Chez Toinelag, le magasin se lit comme une zone de jeu. Les rayons deviennent des épreuves, les produits deviennent outils, indices ou récompenses, et le parcours client tient une histoire du début à la fin.</Sh><div style={{...sa,fontSize:16,color:t.m,lineHeight:1.6,marginTop:20,marginBottom:4}}>On pourrait imaginer des opérations comme :</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:16}}>{[{t:"Rentrée des classes",h:"60 minutes pour préparer la rentrée parfaite",d:"Dans une grande surface alimentaire : mission rentrée avec budget, chrono et défis cachés en rayon."},{t:"Hyper / supermarché",h:"Le dernier qui quitte son rayon gagne",d:"Chaque univers du magasin devient une étape : papeterie, goûter, jouet, licences kids, snack."},{t:"Magasin de jouets",h:"Je construis une pièce secrète dans un magasin de jouets",d:"Très naturel pour lui : tournage après fermeture ou zone scénarisée dédiée."},{t:"Noël",h:"10 minutes pour remplir le caddie idéal",d:"Temps fort catalogue et jouets : wishlist, mission surprise, sélection produits, activation communautaire."}].map((x,i)=><Wc key={i} t={t} s={{padding:22,marginTop:0,border:`2px solid ${t.brd}`,boxShadow:t.cS}}><div style={{...mo,fontSize:10,fontWeight:700,letterSpacing:2,color:t.a,marginBottom:8}}>{x.t.toUpperCase()}</div><div style={{...se,fontSize:16,fontWeight:800,color:t.c,marginBottom:8}}>{x.h}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.55}}>{x.d}</div></Wc>)}</div></div>},

{title:"Opérations ponctuelles",
r:t=><div><Tg t={t}>OPÉRATIONS PONCTUELLES</Tg><Hl t={t} s={{fontSize:28,lineHeight:1.2}}>Pas une simple intégration → Une volonté d'intégrer la marque à 100 %</Hl><Sh t={t}>La marque peut tenir tout le fil : accroche, enjeux, gags. Voici des exemples de ce qu'on pourrait imaginer.</Sh><div style={{display:"flex",flexDirection:"column",gap:0,marginTop:22,borderRadius:16,overflow:"hidden",border:`2px solid ${t.brd}`}}>{[{b:"LEGO",q:"Et si on construisait la meilleure cachette possible uniquement en LEGO ?"},{b:"Playmobil",q:"Et si on recréait un univers Playmobil à taille réelle pour y cacher une pièce secrète ?"},{b:"Bonbons (ex. Têtes Brûlées, Chupa Chups)",q:"Et si on faisait un challenge « bonbon vs vraie vie » pendant 24 h ?"},{b:"Retail jouet (ex. JouéClub)",q:"Et si on devait survivre une nuit avec seulement ce qu'on trouve dans les rayons ?"}].map((row,i)=><div key={i} style={{display:"flex",gap:16,padding:"18px 22px",background:i%2===0?t.card:t.th2,borderBottom:i<3?`1px solid ${t.brd}`:"none",alignItems:"flex-start"}}><div style={{...mo,fontSize:12,fontWeight:800,color:t.a,minWidth:100}}>{row.b}</div><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.55}}>{row.q}</div></div>)}</div><div style={{...sa,fontSize:12,color:t.d,marginTop:14,lineHeight:1.5}}>Exemples illustratifs de terrains créatifs. Validation créative, droits et disponibilités magasin à caler avec la marque et le point de vente.</div></div>},

{title:"Nuage de marques",
r:(t,back)=><div><Tg t={t}>CIBLES INDICATIVES</Tg><Hl t={t} s={{fontSize:32,marginBottom:14}}>Marques au bon profil pour l'activation</Hl><Sh t={t} s={{marginBottom:18,fontSize:17}}>Jouet, licences, snacking, grande distribution familiale et retail spécialisé : des univers où le magasin devient terrain de jeu.</Sh><Bc t={t} labels={["LEGO","Playmobil","Hasbro","Mattel","Funko","Nerf","Hot Wheels","Barbie","Play-Doh","JouéClub","PicWicToys","King Jouet","Micromania","La Grande Récré","Decathlon","Intersport","Carrefour","Auchan","Leclerc","Intermarché","Monoprix","Ferrero","Kinder","Haribo","Chupa Chups","Têtes Brûlées","Oreo","Nestlé","Pampers","Disney","Marvel","Pokémon"]}/><div style={{...sa,fontSize:11,color:t.d,marginTop:14,lineHeight:1.45,maxWidth:760,marginLeft:"auto",marginRight:"auto",textAlign:"center"}}>Illustrations indicatives ; aucune présupposition de partenariat ou de contact en cours avec les marques citées.</div><div style={{textAlign:"center",marginTop:28}}>{back&&<button onClick={back} style={{background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div></div>},
];

// ═══════════════════════════════════════════════════════════════════════════════
// CYRILMP4  -  ACTIVATION AUTO  -  7 SLIDES
// ═══════════════════════════════════════════════════════════════════════════════
const SCyril = [
{title:"Sur la route avec CYRILmp4",
r:t=><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"65vh",textAlign:"center"}}><div style={{display:"flex",alignItems:"center",gap:20,marginBottom:40}}><FarLogo size={80} variant={t.lv}/><div style={{width:1,height:32,background:t.brd}}/><img src={pu("/cyrilmp4.png")} alt="CYRILmp4" style={{width:64,height:64,borderRadius:"50%",objectFit:"cover",border:`3px solid ${t.brd}`}}/></div><div style={{...mo,fontSize:12,fontWeight:600,padding:"8px 16px",background:t.pill,borderRadius:6,display:"inline-block",marginBottom:20}}>ACTIVATION [MARQUE] × CYRILMP4</div><Hl t={t} s={{fontSize:48,textAlign:"center",maxWidth:800,margin:"0 auto 24px"}}>La route fait partie de l'histoire.</Hl><div style={{...sa,fontSize:20,color:t.m,lineHeight:1.5,maxWidth:700,margin:"0 auto"}}>Le partenaire officiel des aventures MP4. Un partenariat annuel emblématique dans lequel le partenaire devient le fil rouge naturel de ses explorations, road trips et formats documentaires.</div></div>},

{title:"Pourquoi Cyril",
r:t=><div style={{display:"flex",gap:32,alignItems:"stretch"}}><div style={{flex:3,display:"flex",flexDirection:"column",justifyContent:"center"}}><Tg t={t}>POURQUOI CYRILMP4</Tg><Hl t={t} s={{fontSize:36}}>Le créateur partenaire idéal pour un deal auto exclusif.</Hl><Sh t={t}>Créateur depuis plus de 15 ans, Cyril a construit une audience massive et fidèle. Son territoire éditorial mêle divertissement, documentaire, vlog et aventure, un terrain rare et crédible pour une marque automobile.</Sh><div style={{display:"flex",gap:12,marginBottom:24}}>{[{v:"5,21M",l:"abonnés YouTube"},{v:"8,5M+",l:"audience cumulée"},{v:"15 ans",l:"d'ancienneté créateur"}].map((s,i)=><div key={i} style={{flex:1,padding:"14px 12px",borderRadius:10,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center"}}><div style={{...se,fontSize:26,fontWeight:800,color:t.a}}>{s.v}</div><div style={{...sa,fontSize:11,color:t.m,marginTop:4}}>{s.l}</div></div>)}</div>{[{t:"MP4",d:"La chaîne dédiée à la découverte et l'exploration."},{t:"Formats forts",d:"« 300 heures sur les traces d'animaux sauvages en Namibie », « 24H sur le train le plus dangereux du monde », « 100H dans un lac radioactif »."},{t:"Brand safety",d:"Audience large et engagée, tonalité maîtrisée, récit positif centré sur l'aventure, la curiosité et la découverte."}].map((a,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<2?`1px solid ${t.brd}`:"none"}}><div style={{...sa,fontSize:14,fontWeight:700,color:t.a,minWidth:120}}>{a.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{a.d}</div></div>)}</div><div style={{flex:2,borderRadius:16,overflow:"hidden",flexShrink:0}}><img src={pu("/cyrilmp4.png")} alt="CYRILmp4" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:16}}/></div></div>},

{title:"Pourquoi l'automobile est un fit évident",
r:t=><div><Tg t={t}>FIT AUTOMOBILE</Tg><Hl t={t} s={{fontSize:36}}>La voiture occupe le centre du récit.</Hl><Wc t={t} s={{padding:"40px 36px",marginTop:24}}><div style={{...sa,fontSize:18,color:t.m,lineHeight:1.7,marginBottom:28}}>Sur MP4, la voiture structure l'aventure : elle permet de partir plus loin, d'accéder à l'inattendu, de gérer la logistique, le confort, la sécurité et l'autonomie.</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:28}}>{["Partir plus loin","Accéder à l'inattendu","Gérer la logistique","Confort & sécurité","Autonomie terrain","Gérer l'imprévu"].map((p,i)=><span key={i} style={{...mo,fontSize:13,fontWeight:600,padding:"14px 20px",borderRadius:10,background:t.a+"15",color:t.a,textAlign:"center"}}>{p}</span>)}</div><div style={{...se,fontSize:22,lineHeight:1.4,color:t.a}}>Le véhicule est montré pour ce qu'il permet de vivre : usage réel, au cœur du récit, dans le respect de l'authenticité du contenu.</div></Wc></div>},


{title:"Le territoire créatif",
r:t=><div><Tg t={t}>TERRITOIRE CRÉATIF</Tg><Hl t={t} s={{fontSize:36}}>4 axes d'activation naturels pour une marque auto.</Hl><Sh t={t}>CYRILmp4 sait activer du dédié, de l'intégration, de l'ambassadeur et du concours, un vrai territoire d'expression.</Sh><div style={{display:"flex",flexDirection:"column",gap:0,marginTop:28,borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{t:"Road trips de découverte",d:"Lieux sans avis, spots isolés, destinations méconnues, routes improbables. Le véhicule est le compagnon constant."},{t:"Expéditions",d:"Météo, terrain, préparation, embarquement, autonomie, conditions réelles. Le véhicule est mis à l'épreuve."},{t:"Vie à bord",d:"Confort, modularité, technologie, sécurité, recharge ou performance. Le véhicule est montré en usage quotidien."},{t:"Activation communauté",d:"Concours, destination choisie par l'audience, défi spécial, arrivée surprise. Le véhicule génère de l'engagement."}].map((item,i)=><div key={i} style={{display:"flex",gap:0,borderBottom:i<3?`1px solid ${t.brd}`:"none"}}><div style={{width:280,padding:"28px 24px",display:"flex",alignItems:"center"}}><div style={{...se,fontSize:17,fontWeight:700,color:t.c}}>{item.t}</div></div><div style={{flex:1,padding:"28px 24px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6}}>{item.d}</div></div></div>)}</div></div>},

{title:"Le partenariat recommandé",
r:t=><div><Tg t={t}>PARTENARIAT</Tg><Hl t={t} s={{fontSize:34}}>Un partenariat annuel exclusif sur MP4, pensé comme une saison.</Hl><Sh t={t}>Un fil rouge sur l'année entière, avec une continuité narrative sur les mois.</Sh><div style={{display:"flex",flexDirection:"column",gap:0,marginTop:28,borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{n:"01",t:"3 à 4 vidéos fortes",d:"[MARQUE] tient une place centrale dans l'aventure, avec une présence visible tout au long du récit."},{n:"02",t:"Présence organique",d:"Le véhicule apparaît naturellement dans d'autres épisodes de l'année."},{n:"03",t:"Déclinaisons sociales",d:"Capsules courtes, stories, cutdowns pour prolonger la mémorisation."},{n:"04",t:"Droits de reprise",d:"Assets exploitables par la marque sur ses propres canaux : social, paid, site, CRM."},{n:"05",t:"Temps fort possible",d:"Lancement modèle, road trip signature, défi spécial ou événement."}].map((item,i)=><div key={i} style={{display:"flex",gap:0,borderBottom:i<4?`1px solid ${t.brd}`:"none"}}><div style={{width:50,padding:"22px 16px",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...mo,fontSize:12,fontWeight:700,color:t.a}}>{item.n}</div></div><div style={{width:220,padding:"22px 16px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:15,fontWeight:700}}>{item.t}</div></div><div style={{flex:1,padding:"22px 16px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{item.d}</div></div></div>)}</div><div style={{marginTop:24,padding:"20px 32px",borderRadius:14,background:t.th,display:"flex",alignItems:"center",gap:16}}><div style={{...mo,fontSize:11,fontWeight:700,letterSpacing:2,color:t.thT,opacity:.5,flexShrink:0}}>VISION</div><div style={{...sa,fontSize:16,lineHeight:1.5,color:t.thT}}>L'opportunité : devenir <span style={{fontWeight:700,fontStyle:"italic"}}>la marque qui accompagne durablement toutes les prochaines aventures de Cyril</span>.</div></div></div>},

{title:"Ce que gagne la marque",
r:t=>{
  const gains=[
    {t:"Territoire éditorial propriétaire",d:"L\u2019exploration et l\u2019aventure deviennent le territoire de la marque dans la creator economy."},
    {t:"Visibilité répétée et crédible",d:"Un partenariat annuel accumule les contacts avec l'audience et renforce la mémorisation de la marque."},
    {t:"Démonstration produit en usage réel",d:"Le véhicule est filmé dans des conditions authentiques de terrain et d'usage réel."},
    {t:"Association long terme",d:"Cyril cherche explicitement à construire des partenariats annuels emblématiques sur MP4."},
  ];
  return(
    <div style={{textAlign:"center"}}>
      <Tg t={t}>{"BÉNÉFICES"}</Tg>
      <Hl t={t} s={{fontSize:36}}>{"Ce que gagne la marque."}</Hl>
      <div style={{display:"flex",gap:0,borderRadius:16,overflow:"hidden",margin:"28px auto 0",border:`1px solid ${t.brd}`,maxWidth:1180,justifyContent:"center"}}>
        {gains.map((item,i)=>(
          <div key={i} style={{flex:1,padding:"28px 22px",background:t.th,color:t.thT,borderRight:i<3?`1px solid ${t.brd}`:"none",textAlign:"left"}}>
            <div style={{...se,fontSize:18,fontWeight:700,marginBottom:10,color:t.thT}}>{item.t}</div>
            <div style={{...sa,fontSize:14,color:t.thT,opacity:.85,lineHeight:1.55}}>{item.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}},

{title:"Nuage de marques auto",
r:(t,back)=><div><Tg t={t}>CIBLES INDICATIVES</Tg><Hl t={t} s={{fontSize:32,marginBottom:14}}>Constructeurs & marques auto</Hl><Sh t={t} s={{marginBottom:18,fontSize:17}}>Exemples de marques grand public et généralistes : usage réel, road trip et aventure sur MP4 (hors segment luxe).</Sh><Bc t={t} labels={["Renault","Peugeot","Citroën","Dacia","Volkswagen","Toyota","Honda","Hyundai","Kia","Ford","Tesla","Nissan","Mazda","Suzuki","Skoda","Seat","Cupra","Fiat","Jeep","Abarth","Smart","MG","BYD","Opel","Mitsubishi","Subaru"]}/><div style={{...sa,fontSize:11,color:t.d,marginTop:14,lineHeight:1.45,maxWidth:760,marginLeft:"auto",marginRight:"auto",textAlign:"center"}}>Illustrations indicatives ; aucune présupposition de partenariat ou de contact en cours avec les marques citées.</div><div style={{textAlign:"center",marginTop:28}}>{back&&<button onClick={back} style={{background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div></div>},
];

// ═══════════════════════════════════════════════════════════════════════════════
// GARMIN × CYRILMP4  -  ACTIVATION AVENTURE / SPORT CONNECTÉ  -  7 SLIDES
// ═══════════════════════════════════════════════════════════════════════════════
const SGarmin = [
{title:"Garmin accompagne l'aventure",
r:t=><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"65vh",textAlign:"center"}}><div style={{display:"flex",alignItems:"center",gap:20,marginBottom:38}}><FarLogo size={76} variant={t.lv}/><div style={{width:1,height:32,background:t.brd}}/><div style={{...se,fontSize:32,fontWeight:900,letterSpacing:2,color:t.a}}>GARMIN</div><div style={{width:1,height:32,background:t.brd}}/><img src={pu("/cyrilmp4.png")} alt="CYRILmp4" style={{width:62,height:62,borderRadius:"50%",objectFit:"cover",border:`3px solid ${t.a}`}}/></div><div style={{...mo,fontSize:12,fontWeight:600,padding:"8px 16px",background:t.pill,borderRadius:6,display:"inline-block",marginBottom:20}}>ACTIVATION GARMIN × CYRILMP4</div><Hl t={t} s={{fontSize:48,textAlign:"center",maxWidth:860,margin:"0 auto 24px"}}>Chaque aventure se prépare, se sécurise et se raconte.</Hl><div style={{...sa,fontSize:20,color:t.m,lineHeight:1.5,maxWidth:760,margin:"0 auto"}}>Garmin devient l'écosystème officiel des explorations MP4 : GPS outdoor, communication satellite, dashcam, tracking, capteurs, cartes et données réelles au service du récit.</div></div>},

{title:"Pourquoi Cyril pour Garmin",
r:t=><div style={{display:"flex",gap:32,alignItems:"stretch"}}><div style={{flex:3,display:"flex",flexDirection:"column",justifyContent:"center"}}><Tg t={t}>POURQUOI CYRILMP4</Tg><Hl t={t} s={{fontSize:36}}>Un créateur crédible pour rendre la technologie utile.</Hl><Sh t={t}>Cyril construit des formats d'exploration où l'itinéraire, l'effort, les imprévus et la préparation font partie du spectacle. C'est un terrain naturel pour Garmin : le produit n'est pas posé, il aide à vivre l'aventure.</Sh><div style={{display:"flex",gap:12,marginBottom:24}}>{[{v:"5,21M",l:"abonnés YouTube"},{v:"8,5M+",l:"audience cumulée"},{v:"15 ans",l:"d'ancienneté créateur"}].map((s,i)=><div key={i} style={{flex:1,padding:"14px 12px",borderRadius:10,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center"}}><div style={{...se,fontSize:26,fontWeight:800,color:t.a}}>{s.v}</div><div style={{...sa,fontSize:11,color:t.m,marginTop:4}}>{s.l}</div></div>)}</div>{[{t:"Fit éditorial",d:"Exploration, voyage, endurance, lieux extrêmes : des contextes où Garmin a une vraie raison d'être."},{t:"Usage visible",d:"Navigation, trace GPS, autonomie batterie, suivi cardio, altitude, météo, sécurité : des preuves concrètes dans le film."},{t:"Brand safety",d:"Un récit positif, maîtrisé et aspirationnel autour de la curiosité, de la préparation et du dépassement."}].map((a,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<2?`1px solid ${t.brd}`:"none"}}><div style={{...sa,fontSize:14,fontWeight:700,color:t.a,minWidth:120}}>{a.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{a.d}</div></div>)}</div><div style={{flex:2,borderRadius:16,overflow:"hidden",flexShrink:0,border:`1px solid ${t.brd}`}}><img src={pu("/cyrilmp4.png")} alt="CYRILmp4" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:16}}/></div></div>},

{title:"Pourquoi Garmin est un fit évident",
r:t=><div><Tg t={t}>FIT GARMIN</Tg><Hl t={t} s={{fontSize:36}}>L'écosystème devient un outil de récit.</Hl><Wc t={t} s={{padding:"40px 36px",marginTop:24}}><div style={{...sa,fontSize:18,color:t.m,lineHeight:1.7,marginBottom:28}}>Dans un épisode MP4, Garmin peut accompagner les décisions importantes : préparer l'itinéraire, suivre l'avancée, communiquer hors réseau, documenter la route, gérer l'autonomie et rassurer en terrain inconnu.</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:28}}>{["Cartographie & GPS","Satellite & sécurité","Dashcam & route","Cyclisme & outdoor","Marine / eau","Données de l'aventure"].map((p,i)=><span key={i} style={{...mo,fontSize:13,fontWeight:600,padding:"14px 20px",borderRadius:10,background:t.a+"18",color:t.a,textAlign:"center"}}>{p}</span>)}</div><div style={{...se,fontSize:22,lineHeight:1.4,color:t.a}}>La marque est montrée pour ce qu'elle permet : mieux préparer, mieux s'orienter, rester joignable et transformer l'aventure en preuves visibles.</div></Wc></div>},
{title:"Produits × activations",
r:t=><div><Tg t={t}>IDÉES D'USAGES</Tg><Hl t={t} s={{fontSize:34}}>Un produit Garmin = un rôle dans l'histoire.</Hl><Sh t={t} s={{fontSize:17,marginBottom:20}}>L'intérêt est de répartir Garmin sur plusieurs usages concrets, pas de concentrer toute la présence sur une montre.</Sh><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginTop:18}}>{[{p:"GPSMAP / eTrex",u:"Trouver un lieu sans réseau",d:"Un épisode où Cyril doit rejoindre un point isolé uniquement grâce à une trace préparée."},{p:"inReach",u:"Sécurité hors couverture",d:"Check-ins satellite, message de sécurité, point de contact équipe : Garmin rassure sans casser le récit."},{p:"Dash Cam",u:"Route & preuve vidéo",d:"Trajet improbable, incident météo, arrivée de nuit : la route devient une séquence documentée."},{p:"Edge / vélo",u:"Segment ou traversée",d:"Défi vélo, ascension, boucle choisie par la communauté, data de vitesse et dénivelé."},{p:"Montre outdoor",u:"Effort & récupération",d:"Cardio, sommeil, acclimatation, stress : la donnée sert à comprendre l'état de Cyril."},{p:"Marine / eau",u:"Kayak, lac, côte",d:"Navigation sur l'eau, météo, distance, retour au point de départ : ouverture vers des aventures aquatiques."}].map((x,i)=><Wc key={i} t={t} s={{padding:20,border:`1px solid ${t.brd}`,boxShadow:"none"}}><div style={{...mo,fontSize:10,fontWeight:800,letterSpacing:2,color:t.a,marginBottom:10}}>{x.p}</div><div style={{...se,fontSize:16,fontWeight:800,color:t.c,marginBottom:8,lineHeight:1.2}}>{x.u}</div><div style={{...sa,fontSize:13,color:t.m,lineHeight:1.5}}>{x.d}</div></Wc>)}</div></div>},

{title:"Le territoire créatif",
r:t=><div><Tg t={t}>TERRITOIRE CRÉATIF</Tg><Hl t={t} s={{fontSize:36}}>4 axes naturels pour Garmin × CYRILmp4.</Hl><Sh t={t}>Des concepts où la donnée, la cartographie, la sécurité et la captation route renforcent l'histoire au lieu de l'interrompre.</Sh><div style={{display:"flex",flexDirection:"column",gap:0,marginTop:28,borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{t:"Mission exploration",d:"Objectif géographique clair, trace à suivre, progression visible à l'écran et tension autour de l'itinéraire."},{t:"Défi multi-sport",d:"Vélo, marche, kayak ou course : chaque discipline active un produit Garmin différent."},{t:"Survie & sécurité",d:"Terrain isolé, imprévus, orientation, satellite, préparation, autonomie batterie : Garmin sécurise l'aventure."},{t:"Activation communauté",d:"Parcours choisi par l'audience, segment à battre, itinéraire surprise ou challenge data à reproduire."}].map((item,i)=><div key={i} style={{display:"flex",gap:0,borderBottom:i<3?`1px solid ${t.brd}`:"none"}}><div style={{width:280,padding:"28px 24px",display:"flex",alignItems:"center"}}><div style={{...se,fontSize:17,fontWeight:700,color:t.c}}>{item.t}</div></div><div style={{flex:1,padding:"28px 24px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:15,color:t.m,lineHeight:1.6}}>{item.d}</div></div></div>)}</div></div>},

{title:"Le partenariat recommandé",
r:t=><div><Tg t={t}>PARTENARIAT</Tg><Hl t={t} s={{fontSize:34}}>Un partenariat annuel Garmin, pensé comme une saison d'explorations.</Hl><Sh t={t}>Garmin devient le fil rouge équipement, données, navigation, captation et sécurité des prochaines aventures MP4.</Sh><div style={{display:"flex",flexDirection:"column",gap:0,marginTop:28,borderRadius:16,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[{n:"01",t:"3 à 4 vidéos fortes",d:"Chaque épisode met un produit Garmin en usage réel : préparation, terrain, imprévus et bilan data."},{n:"02",t:"Présence organique",d:"GPS, inReach, dashcam, Edge ou montre apparaissent selon le besoin réel du format."},{n:"03",t:"Déclinaisons sociales",d:"Capsules data, cartes, traces, check-ins satellite, moments route et cutdowns pédagogiques."},{n:"04",t:"Droits de reprise",d:"Assets exploitables par Garmin : social, paid, retail, CRM, pages produit et temps forts sportifs."},{n:"05",t:"Temps fort possible",d:"Lancement produit, challenge communautaire, itinéraire signature ou grande expédition co-construite."}].map((item,i)=><div key={i} style={{display:"flex",gap:0,borderBottom:i<4?`1px solid ${t.brd}`:"none"}}><div style={{width:50,padding:"22px 16px",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{...mo,fontSize:12,fontWeight:700,color:t.a}}>{item.n}</div></div><div style={{width:220,padding:"22px 16px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:15,fontWeight:700}}>{item.t}</div></div><div style={{flex:1,padding:"22px 16px",display:"flex",alignItems:"center"}}><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.5}}>{item.d}</div></div></div>)}</div><div style={{marginTop:24,padding:"20px 32px",borderRadius:14,background:t.th,display:"flex",alignItems:"center",gap:16}}><div style={{...mo,fontSize:11,fontWeight:700,letterSpacing:2,color:t.thT,opacity:.55,flexShrink:0}}>VISION</div><div style={{...sa,fontSize:16,lineHeight:1.5,color:t.thT}}>L'opportunité : devenir <span style={{fontWeight:700,fontStyle:"italic"}}>la marque qui prépare, équipe, documente et sécurise durablement les prochaines aventures de Cyril</span>.</div></div></div>},

{title:"Ce que gagne Garmin",
r:(t,back)=>{
  const gains=[
    {t:"Écosystème démontré",d:"Plusieurs produits Garmin apparaissent en situation réelle, chacun avec un rôle clair dans le récit."},
    {t:"Territoire aventure propriétaire",d:"La marque s'associe durablement à l'exploration, au dépassement et à la préparation."},
    {t:"Preuves utiles mémorisables",d:"Trace, satellite, route, météo, effort, autonomie et sécurité deviennent des éléments narratifs faciles à reprendre."},
    {t:"Assets activables",d:"Des images et séquences réutilisables pour social, retail, paid, CRM et pages produit."},
  ];
  return <div style={{textAlign:"center"}}><Tg t={t}>BÉNÉFICES GARMIN</Tg><Hl t={t} s={{fontSize:36}}>Ce que gagne Garmin.</Hl><div style={{display:"flex",gap:0,borderRadius:16,overflow:"hidden",margin:"28px auto 0",border:`1px solid ${t.brd}`,maxWidth:1180,justifyContent:"center"}}>{gains.map((item,i)=><div key={i} style={{flex:1,padding:"28px 22px",background:t.th,color:t.thT,borderRight:i<3?`1px solid ${t.brd}`:"none",textAlign:"left"}}><div style={{...se,fontSize:18,fontWeight:700,marginBottom:10,color:t.thT}}>{item.t}</div><div style={{...sa,fontSize:14,color:t.thT,opacity:.85,lineHeight:1.55}}>{item.d}</div></div>)}</div><div style={{textAlign:"center",marginTop:34}}>{back&&<button onClick={back} style={{background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div></div>;
}},
];

// ═══════════════════════════════════════════════════════════════════════════════
// PROFIL / CV  -  contenu issu du CV Thibault Loué
// ═══════════════════════════════════════════════════════════════════════════════
const SProfil = [
{title:"Présentation",
r:t=><div><Tg t={t}>MON PROFIL</Tg><Hl t={t} s={{fontSize:42}}>Thibault Loué</Hl><div style={{...mo,fontSize:11,fontWeight:600,letterSpacing:3,textTransform:"uppercase",opacity:.45,marginBottom:20}}>Business developer · Advertiser · Athlète & content creator</div><Sh t={t}>Je m'appelle Thibault. Business developer et publicitaire avec plus de 10 ans dans des agences de premier plan, j'ai conçu des campagnes 360° pour des dizaines de marques nationales et internationales, piloté des P&L et des équipes. Athlète et créateur de contenu, je transforme les courses les plus exigeantes en films pour YouTube et les réseaux sociaux. Un profil hybride entre branding, storytelling, production et social media.</Sh><div style={{display:"flex",flexWrap:"wrap",gap:10}}>{["thibault.loue@gmail.com","+33 6 26 28 11 05","Instagram @Thibaultloue","YouTube @thibault8349","Né le 18/12/1992"].map((x,i)=><span key={i} style={{...mo,fontSize:12,padding:"8px 14px",borderRadius:8,background:t.card,border:`1px solid ${t.brd}`,color:t.cardT}}>{x}</span>)}</div></div>},

{title:"Compétences",
r:t=><div><Tg t={t}>COMPÉTENCES</Tg><Hl t={t} s={{fontSize:32}}>Expertises opérationnelles</Hl><div style={{...mo,fontSize:11,fontWeight:600,letterSpacing:2,color:t.d,marginBottom:12}}>DOMAINES</div><div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:28}}>{["Account direction","Advertising","Creative direction","Content creation","Project management","Management","Campaign management","Content strategy","Social media","Shooting","Video editing","Campagnes 360°","Influence","Activation","Copywriting"].map((w,i)=><span key={i} style={{...mo,fontSize:12,fontWeight:600,padding:"6px 12px",borderRadius:6,background:t.a+"18",color:t.a}}>{w}</span>)}</div><div style={{...mo,fontSize:11,fontWeight:600,letterSpacing:2,color:t.d,marginBottom:12}}>CORE COMPETENCIES</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{["Business Development","Advertising","Marketing Strategy","Content Creation","Digital Marketing","Brand Partnerships","360° Campaigns","Account Management","Account Direction","Team Leadership","Project Management","P&L","Budget Management","ROI","Influencer Marketing","Social Media","Video Production","Video Editing","Creative Direction","Content Strategy","Campaign Management","Strategic Partnerships","New Business","Entrepreneurship","Storytelling","Celebrity Partnerships","Key Account Management"].map((w,i)=><span key={i} style={{...sa,fontSize:11,padding:"5px 10px",borderRadius:4,background:t.card,border:`1px solid ${t.brd}`,color:t.m}}>{w}</span>)}</div></div>},

{title:"Expérience pro",
r:t=><div><Tg t={t}>EXPÉRIENCES</Tg><Hl t={t} s={{fontSize:32}}>Parcours professionnel</Hl><div style={{display:"flex",flexDirection:"column",gap:0}}>{[{per:"Depuis 2019",role:"Athlète / Content creator",org:"Salomon · ASICS · YouTube · Instagram · TikTok",tags:["Content strategy","Creative direction","Video production","Video editing","Copywriting","Influencer marketing","Social media"]},{per:"2021 - 2025",role:"Business Director & Partner",org:"Ogilvy Paris, France",tags:["Account management","Advertising","Team leadership","P&L","ROI","Campagnes 360°","Influence","Activation"]},{per:"2017 - 2020",role:"Account Director & New Business",org:"Romance (DDB), France",tags:["Key accounts","Advertising","Creative production","Strategic partnerships","Business development","Campagnes 360°"]},{per:"2015 - 2017",role:"Account Manager",org:"FRED & FARID Paris, France",tags:["Campagnes 360°","Advertising","Celebrity partnerships","Influencer marketing","Activation"]},{per:"2010 - 2014",role:"Co-fondateur & Managing Director",org:"SAS SOWEB AGENCY, France",tags:["Entrepreneuriat","Business strategy","Digital strategy","Web development","Sales"]}].map((x,i)=><div key={i} style={{padding:"18px 0",borderBottom:i<4?`1px solid ${t.brd}`:"none"}}><div style={{display:"flex",flexWrap:"wrap",alignItems:"baseline",gap:12,marginBottom:6}}><span style={{...mo,fontSize:11,fontWeight:700,color:t.a}}>{x.per}</span><span style={{...sa,fontSize:17,fontWeight:700,color:t.c}}>{x.role}</span></div><div style={{...sa,fontSize:14,color:t.m,marginBottom:8}}>{x.org}</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{x.tags.map((tg,j)=><span key={j} style={{...mo,fontSize:10,padding:"4px 8px",borderRadius:4,background:t.card,border:`1px solid ${t.brd}`,color:t.cardT}}>{tg}</span>)}</div></div>)}</div></div>},

{title:"Réalisations",
r:t=><div><Tg t={t}>RÉALISATIONS</Tg><Hl t={t} s={{fontSize:30}}>Missions & projets marquants</Hl><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}><div style={{borderRadius:14,padding:22,border:`1px solid ${t.brd}`,background:t.card}}><div style={{...mo,fontSize:11,fontWeight:700,letterSpacing:2,color:t.a,marginBottom:14}}>ATHLÈTE & CRÉATEUR</div>{["Chaîne YouTube avec des milliers d'abonnés","Documentaire INVISIBLES, écriture & réalisation","Documentaire Winter Spine Race 2026 (UK) avec Salomon France","Documentaire MT FUJI 100 (Japon) avec ASICS Europe","Écriture, tournage et montage en autonomie (YouTube / Instagram)","Collaboration quotidienne avec les marques"].map((b,i)=><div key={i} style={{...sa,fontSize:13,color:t.m,lineHeight:1.5,padding:"6px 0",borderBottom:i<5?`1px solid ${t.brd}`:"none"}}>→ {b}</div>)}</div><div style={{borderRadius:14,padding:22,border:`1px solid ${t.brd}`,background:t.card}}><div style={{...mo,fontSize:11,fontWeight:700,letterSpacing:2,color:t.a,marginBottom:14}}>AGENCES & ENTREPRENEURIAT</div>{["Portefeuille clients ~3M$ : IKEA, Doctolib, Atlantic, Monkey Shoulder, Candia, Panzani","Direction d'une équipe de 15 personnes","Pilotage de la rentabilité et de la croissance de l'agence","Campagnes 360° intégrées : TV, influence sociale, outdoor, PR, radio, IA","Account Director Intermarché, campagnes « C'est magnifique »","Partenariat Fédération française de football","Libération « Libé des Réfugiés » : 36 prix, invitation Élysée","Schweppes « What Did You Expect ? » avec Penélope Cruz","Carambar avec Marilou Berry ; autres comptes : HP, Audi, Orangina, Pulco, Humanis","Co-fondation SOWEB avec 3 associés : offre web, apps iPhone, formation social media"].map((b,i)=><div key={i} style={{...sa,fontSize:13,color:t.m,lineHeight:1.5,padding:"6px 0",borderBottom:i<9?`1px solid ${t.brd}`:"none"}}>→ {b}</div>)}</div></div></div>},

{title:"Formations",
r:t=><div><Tg t={t}>ÉTUDES</Tg><Hl t={t} s={{fontSize:32}}>Formations & diplômes</Hl><div style={{display:"flex",flexDirection:"column",gap:0}}>{[{y:"2024",d:"Design Thinking & Innovation Degree",s:"Harvard Business School (USA)"},{y:"2013 - 2015",d:"Master 2 Marketing Digital Web",s:"INSEEC Bordeaux, France"},{y:"2012 - 2013",d:"Bachelor of Arts Marketing & Advertising",s:"University of Hull, Angleterre"},{y:"2012 - 2013",d:"DU International Studies",s:"Université d'Angers, France"},{y:"2010 - 2012",d:"DUT Sales and Marketing",s:"IUT Angers, France"},{y:"2010",d:"Bac ES",s:"Lycée Montesquieu, Le Mans, France"}].map((e,i)=><div key={i} style={{display:"flex",gap:20,padding:"16px 0",borderBottom:i<5?`1px solid ${t.brd}`:"none",alignItems:"flex-start"}}><div style={{...mo,fontSize:12,fontWeight:700,color:t.a,minWidth:100,flexShrink:0}}>{e.y}</div><div><div style={{...sa,fontSize:16,fontWeight:700,color:t.c}}>{e.d}</div><div style={{...sa,fontSize:14,color:t.m,marginTop:4}}>{e.s}</div></div></div>)}</div></div>},

{title:"Sport & langues",
r:(t,back)=><div><Tg t={t}>SPORT & PASSIONS</Tg><Hl t={t} s={{fontSize:30}}>Ultra trail, marathon & culture</Hl><div style={{display:"flex",gap:28,flexWrap:"wrap"}}><div style={{flex:"1 1 320px"}}><div style={{...mo,fontSize:11,fontWeight:700,letterSpacing:2,color:t.d,marginBottom:12}}>ULTRA & TRAIL</div>{["Winter Spine Race : 430 km, 11 000 D+ (UK)","UTMB : 175 km, 10 800 D+ (France)","Diagonale des Fous : 175 km, 10 000 D+ (2018 & 2019)","MT Fuji 100 : 168 km, 6 600 D+ (Japon)","Madeira MIUT : 120 km, 7 600 D+ (Portugal)","Marathon de Paris ×5 (dont une édition les yeux bandés) : pacer en 2024","Des dizaines de trails 30-80 km sur 4 continents"].map((l,i)=><div key={i} style={{...sa,fontSize:14,color:t.m,lineHeight:1.5,padding:"5px 0"}}>• {l}</div>)}</div><div style={{flex:"1 1 280px"}}><div style={{...mo,fontSize:11,fontWeight:700,letterSpacing:2,color:t.d,marginBottom:12}}>AUTRES SPORTS & INTÉRÊTS</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.65,marginBottom:20}}>Football (20 ans) · Tennis (15 ans) · Golf (index 21)<br/>Musique : batterie (15 ans), piano (10 ans)<br/>Échecs : stratégie & compétition</div><div style={{...mo,fontSize:11,fontWeight:700,letterSpacing:2,color:t.d,marginBottom:12}}>LANGUES</div><div style={{...sa,fontSize:15,color:t.c,lineHeight:1.6}}>Français, langue maternelle<br/>Anglais, courant (expérience de vie en Angleterre)</div></div></div><div style={{textAlign:"center",marginTop:40}}>{back&&<button onClick={back} style={{background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div></div>},
];

// ═══════════════════════════════════════════════════════════════════════════════
// DATA + META
// ═══════════════════════════════════════════════════════════════════════════════
const ALL = { case1:S1, case2:S2, shopify:SS, rode:SR, fastgoodcuisine:SFGC, fgcmarque:SFGCMarque, otacospepe:SOtacosPepe, toinelag:SToinelag, cyrilmp4:SCyril, garmin:SGarmin, profil:SProfil };
/** Liens partagés / SEO informel : id court → id interne (ex. deck « sur la route » = CYRILmp4). */
const DECK_ALIASES = { route: "cyrilmp4", cyril: "cyrilmp4", cyrilmp: "cyrilmp4", garmincyril: "garmin", fgc: "fastgoodcuisine", fastgood: "fastgoodcuisine", fgcx: "fgcmarque", fgcmarque: "fgcmarque", fastgoodmarque: "fgcmarque", otacos: "otacospepe", pepeotacos: "otacospepe", toine: "toinelag", tl: "toinelag" };
function normalizeDeckId(raw) {
  if (!raw) return null;
  const id = DECK_ALIASES[raw] ?? raw;
  return ALL[id] ? id : null;
}
const META = {
  case1:{l:"Cas Pratique 1",s:"Stratégie de développement commercial FAR sur 12 mois",tag:"STRATÉGIE",card:"dark"},
  case2:{l:"Cas Pratique 2",s:"Pitch créateur & marques  -  Le Bouseuh",tag:"PITCH",card:"light"},
  shopify:{l:"Activation Shopify",s:"Shopify × Le Bouseuh × Lockd  -  « L'envers du drop »",tag:"ACTIVATION",card:"shopify"},
  rode:{l:"Activation RØDE",s:"RØDE × Le Bouseuh Podcast  -  « Hors du setup »",tag:"ACTIVATION",card:"rode"},
  fastgoodcuisine:{l:"Le combat des chefs",s:"Partenaire exclusif · long format YouTube · 50 chefs, jury, finale",tag:"OPÉRATION",card:"fgc"},
  fgcmarque:{l:"[MARQUE] × FastGoodCuisine",s:"Média, divertissement, Pepe Chicken & Pop's",tag:"ACTIVATION",card:"fgcmarque"},
  otacospepe:{l:"O'Tacos × Pepe Chicken",s:"LTO food · offre croisée · drive to store",tag:"COLLABORATION",card:"otacospepe"},
  toinelag:{l:"[MARQUE] × Toinelag",s:"Retail & jouet  -  le magasin devient un terrain de jeu",tag:"ACTIVATION",card:"toinelag"},
  cyrilmp4:{l:"Activation Auto × CYRILmp4",s:"[MARQUE] × CYRILmp4  -  « La route fait partie de l'histoire »",tag:"ACTIVATION",card:"dark"},
  garmin:{l:"Garmin × CYRILmp4",s:"Sport connecté, GPS & aventures MP4",tag:"ACTIVATION",card:"garmin"},
  profil:{l:"Mon profil",s:"CV · parcours, compétences & expériences",tag:"CV",card:"dark"},
};

/** Export PDF : même pipeline pour tous les decks ouverts dans `Pres`. */
const PDF_RENDER_W = 1232;
const PDF_CAPTURE_SCALE = 3;
const PDF_PAGE_W_MM = 338.67;
const PDF_PAGE_H_MM = 190.5;

function pdfFooterLabel(deckId) {
  return deckId === "profil" ? "confidentiel - thibault loué" : "confidentiel";
}

function pdfConvertVhVwToPx(root, renderW, renderH) {
  root.querySelectorAll("*").forEach((el) => {
    for (let j = 0; j < el.style.length; j++) {
      const prop = el.style[j];
      const val = el.style.getPropertyValue(prop);
      if (val && (val.includes("vh") || val.includes("vw"))) {
        const fixed = val
          .replace(/(\d+(?:\.\d+)?)vh/g, (_, num) => (parseFloat(num) * renderH) / 100 + "px")
          .replace(/(\d+(?:\.\d+)?)vw/g, (_, num) => (parseFloat(num) * renderW) / 100 + "px");
        el.style.setProperty(prop, fixed);
      }
    }
  });
}

/** html2canvas déforme object-fit → fond CSS (cover/contain) pour tous les decks. */
function pdfReplaceObjectFitImages(root) {
  root.querySelectorAll("img").forEach((img) => {
    const cs = getComputedStyle(img);
    const fit = cs.objectFit;
    if ((fit !== "cover" && fit !== "contain") || !img.src) return;
    const w = img.offsetWidth;
    const h = img.offsetHeight;
    if (w < 1 || h < 1) return;
    const div = document.createElement("div");
    div.style.width = `${w}px`;
    div.style.height = `${h}px`;
    div.style.backgroundImage = `url(${JSON.stringify(img.src)})`;
    div.style.backgroundSize = fit === "contain" ? "contain" : "cover";
    div.style.backgroundPosition = "center";
    div.style.backgroundRepeat = "no-repeat";
    div.style.borderRadius = cs.borderRadius;
    div.style.flexShrink = "0";
    img.parentNode.replaceChild(div, img);
  });
}

// ─── ACTIVATION CARD (hover animation like homepage) ─────────────────────────
function ActCard({a,nav}){
  const [hovered,setHovered]=useState(false);
  return <motion.div
    whileHover={{}}
    onHoverStart={()=>setHovered(true)} onHoverEnd={()=>setHovered(false)}
    onClick={()=>nav&&nav(a.id)}
    style={{padding:44,borderRadius:18,cursor:"pointer",background:a.bg,color:a.c,position:"relative",overflow:"hidden"}}
  >
    <div style={{display:"flex",gap:24,alignItems:"center",opacity:hovered?0:1,transition:"opacity .25s ease"}}>
      <div style={{flex:1}}>
        <span style={{...mo,fontSize:10,fontWeight:600,letterSpacing:2,padding:"5px 12px",borderRadius:5,background:"rgba(0,0,0,.1)",color:a.c,marginBottom:18,display:"inline-block"}}>{a.tag}</span>
        <div style={{...sa,fontSize:24,fontWeight:700,marginBottom:8}}>{a.title}</div>
        <div style={{...sa,fontSize:14,opacity:.7,lineHeight:1.5}}>{a.sub}</div>
      </div>
      <div style={{flexShrink:0}}>{a.imgType==="photo" ? <img src={pu(a.img)} alt="" style={{width:a.imgW,height:a.imgW,borderRadius:"50%",objectFit:"cover",border:"3px solid rgba(255,255,255,.2)",opacity:.9}} /> : <img src={pu(a.img)} alt="" style={{width:a.imgW,height:"auto",filter:a.imgFilter||"none",opacity:.85}} />}</div>
    </div>
    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,opacity:hovered?1:0,transition:"opacity .25s ease"}}>
      <LaPorteLogo size={70} color={a.c}/>
      <div style={{width:30,height:1.5,background:a.c,opacity:.15,borderRadius:1}}/>
      <FarLogo size={56} variant={a.logoVar}/>
    </div>
  </motion.div>;
}

// ─── PRESENTATION ─────────────────────────────────────────────────────────────
function Pres({id,onBack,onNav}) {
  const [cur,setCurRaw] = useState(()=>{const h=window.location.hash.replace(/^#/,"");if(!h)return 0;const[,s]=h.split("/");return parseInt(s)||0;});
  const setCur = useCallback(v=>{setCurRaw(prev=>{const next=typeof v==="function"?v(prev):v;window.location.hash=`${id}/${next}`;return next;});},[id]);
  const [notes,setNotes] = useState(false);
  const [nav,setNav] = useState(false);
  const [pdfing,setPdfing] = useState(false);
  const t = TM[id];
  const slides = ALL[id];
  const n = slides.length;
  const s = slides[cur];

  const AxesProgress = ({slideNo})=>{
    if(id!=="case1") return null;
    if(slideNo<5 || slideNo>21) return null;
    const axes=[
      {k:1,l:"Axe 1 : Optimiser le roster",a:slideNo>=5&&slideNo<=9},
      {k:2,l:"Axe 2 : Stabiliser le portefeuille",a:slideNo===10},
      {k:3,l:"Axe 3 : Étendre l'offre commerciale",a:slideNo>=11&&slideNo<=18},
      {k:4,l:"Axe 4 : Travailler l'attraction",a:slideNo>=18&&slideNo<=21},
    ];
    return (
      <div style={{position:"absolute",top:18,right:18,zIndex:5,display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end",pointerEvents:"none"}}>
        {axes.map(x=>(
          <div key={x.k} style={{...mo,fontSize:10,fontWeight:700,letterSpacing:1.4,padding:"6px 10px",borderRadius:999,background:x.a?t.a:t.card,border:`1px solid ${x.a?t.a:t.brd}`,color:x.a?t.bg:t.m,opacity:x.a?1:.65,whiteSpace:"nowrap"}}>
            {x.l}
          </div>
        ))}
      </div>
    );
  };

  const exportPDF = async () => {
    setPdfing(true);
    const saved = cur;
    try {
      await document.fonts?.ready?.catch(() => {});
    } catch {
      /* ignore */
    }

    const renderW = PDF_RENDER_W;
    const renderH = Math.round((renderW * 9) / 16);

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [PDF_PAGE_W_MM, PDF_PAGE_H_MM],
      compress: true,
    });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const footerLabel = pdfFooterLabel(id);

    const container = document.createElement("div");
    container.style.cssText = `position:fixed;left:-12000px;top:0;width:${renderW}px;height:${renderH}px;overflow:hidden;z-index:2147483646;isolation:isolate;background:${t.bg};color:${t.c};font-family:${sa.fontFamily};`;
    document.body.appendChild(container);

    const rdom = await import("react-dom/client");

    try {
      for (let i = 0; i < n; i++) {
        const wrap = document.createElement("div");
        wrap.style.cssText = `box-sizing:border-box;width:100%;height:100%;display:flex;flex-direction:column;padding:14px 28px 4px;background:${t.bg};color:${t.c};font-family:${sa.fontFamily};overflow:hidden;`;
        const slideArea = document.createElement("div");
        slideArea.style.cssText =
          "flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;";
        const inner = document.createElement("div");
        inner.style.cssText = "width:100%;max-width:1580px;";
        const footer = document.createElement("div");
        footer.style.cssText = `flex-shrink:0;width:100%;text-align:center;font-size:9px;line-height:1;opacity:.2;letter-spacing:0.6px;color:${t.m};padding-top:3px;font-family:${sa.fontFamily};`;
        footer.textContent = footerLabel;

        slideArea.appendChild(inner);
        wrap.appendChild(slideArea);
        wrap.appendChild(footer);

        container.innerHTML = "";
        container.appendChild(wrap);

        const tempRoot = rdom.createRoot(inner);
        await new Promise((resolve) => {
          tempRoot.render(slides[i].r(t, null));
          setTimeout(resolve, 480);
        });
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await new Promise((resolve) => setTimeout(resolve, 220));

        pdfConvertVhVwToPx(inner, renderW, renderH);
        pdfReplaceObjectFitImages(inner);
        await new Promise((resolve) => requestAnimationFrame(resolve));

        const canvas = await html2canvas(container, {
          scale: PDF_CAPTURE_SCALE,
          useCORS: true,
          allowTaint: false,
          backgroundColor: t.bg,
          width: renderW,
          height: renderH,
          windowWidth: renderW,
          windowHeight: renderH,
          logging: false,
          imageTimeout: 20000,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pageW, pageH, undefined, "MEDIUM");
        tempRoot.unmount();
      }
    } finally {
      document.body.removeChild(container);
    }

    pdf.save(`${META[id].l.replace(/\s/g, "_")}.pdf`);
    setCur(saved);
    setPdfing(false);
  };

  const hk = useCallback(e=>{
    if(e.key==="ArrowRight"||e.key==="ArrowDown"||e.key===" "){e.preventDefault();setCur(c=>Math.min(c+1,n-1));setNotes(false);}
    else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();setCur(c=>Math.max(c-1,0));setNotes(false);}
    else if(e.key==="Escape")onBack();
    else if(e.key==="n")setNotes(x=>!x);
  },[n,onBack]);

  useEffect(()=>{window.addEventListener("keydown",hk);return()=>window.removeEventListener("keydown",hk)},[hk]);

  const touchRef = useRef(null);
  const onTouchStart = useCallback(e=>{touchRef.current={x:e.touches[0].clientX,y:e.touches[0].clientY};},[]);
  const onTouchEnd = useCallback(e=>{if(!touchRef.current)return;const dx=e.changedTouches[0].clientX-touchRef.current.x;const dy=e.changedTouches[0].clientY-touchRef.current.y;if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>50){if(dx<0)setCur(c=>Math.min(c+1,n-1));else setCur(c=>Math.max(c-1,0));setNotes(false);}touchRef.current=null;},[n]);

  const slideRef = useRef(null);
  useEffect(()=>{
    const fix = () => { if(!slideRef.current) return; slideRef.current.querySelectorAll("*").forEach(el=>{el.style.setProperty("user-select","text","important");el.style.setProperty("-webkit-user-select","text","important");}); };
    fix();
    const t2 = setTimeout(fix, 100);
    const t3 = setTimeout(fix, 400);
    return ()=>{clearTimeout(t2);clearTimeout(t3);};
  },[cur]);

  return (
    <div style={{position:"fixed",inset:0,zIndex:100,display:"flex",flexDirection:"column",background:t.bg,color:t.c,...sa}}>
      <style>{FC}{"\n* { -webkit-user-select: text !important; user-select: text !important; }"}</style>
      <DeckMotif deck={id}/>
      <div className="far-header" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 36px",flexShrink:0,position:"relative",zIndex:12}}>
        <div style={{display:"flex",alignItems:"center",gap:18,flexWrap:"wrap",minWidth:0}}>
          <button onClick={onBack} style={{background:"none",border:`1px solid ${t.brd}`,color:t.c,...sa,fontSize:13,padding:"7px 18px",borderRadius:8,cursor:"pointer",opacity:.4,flexShrink:0}}>← Retour</button>
          <div className="far-logo-hover" style={{flexShrink:0}} onClick={onBack}><FarLogo size={52} variant={t.lv}/></div>
          <span style={{...sa,fontSize:14,fontWeight:600,opacity:.4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{META[id].l}</span>
          <span style={{...mo,fontSize:13,opacity:.2,flexShrink:0}}>{String(cur+1).padStart(2,"0")} / {String(n).padStart(2,"0")}</span>
        </div>
        <motion.div className="far-bar" style={{width:220,height:3,borderRadius:2,overflow:"hidden",background:t.bar,flexShrink:0}}>
          <motion.div animate={{width:`${(cur+1)/n*100}%`}} transition={{type:"spring",stiffness:200,damping:25}} style={{height:"100%",background:t.barF,borderRadius:2}}/>
        </motion.div>
      </div>
      <AnimatePresence>{nav&&<motion.div className="far-nav-sidebar" initial={{x:-280,opacity:0}} animate={{x:0,opacity:1}} exit={{x:-280,opacity:0}} transition={{type:"spring",stiffness:300,damping:30}} style={{position:"fixed",top:0,left:0,bottom:0,width:260,background:t.bg,borderRight:`1px solid ${t.brd}`,zIndex:10,display:"flex",flexDirection:"column",paddingTop:64}}>
        <div style={{padding:"16px 16px 12px",borderBottom:`1px solid ${t.brd}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{...mo,fontSize:11,fontWeight:700,letterSpacing:2,opacity:.3}}>SLIDES</div><button onClick={()=>setNav(false)} style={{background:"none",border:"none",color:t.c,fontSize:18,cursor:"pointer",opacity:.4,padding:"2px 6px",lineHeight:1}}>✕</button></div>
        <div style={{flex:1,overflowY:"auto",padding:"8px 0"}}>{slides.map((sl,i)=><button key={i} onClick={()=>{setCur(i);setNotes(false);}} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"10px 16px",border:"none",background:i===cur?t.a+"18":"transparent",cursor:"pointer",textAlign:"left",borderLeft:i===cur?`3px solid ${t.a}`:"3px solid transparent",transition:"all .15s"}}>
          <span style={{...mo,fontSize:11,fontWeight:700,color:i===cur?t.a:t.c,opacity:i===cur?1:.3,minWidth:22}}>{String(i+1).padStart(2,"0")}</span>
          <span style={{...sa,fontSize:13,color:i===cur?t.c:t.m,fontWeight:i===cur?600:400,lineHeight:1.3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{sl.title}</span>
        </button>)}</div>
      </motion.div>}</AnimatePresence>
      <div ref={slideRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{flex:1,overflowY:"auto",position:"relative",zIndex:1,WebkitUserSelect:"text",userSelect:"text"}}>
        <AnimatePresence mode="wait">
          <motion.div key={cur} initial={SV[id].i} animate={SV[id].a} exit={SV[id].e} transition={SV[id].t} className="far-slide-wrap" style={{position:"relative",minHeight:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 36px 110px",WebkitUserSelect:"text",userSelect:"text"}}>
            <AxesProgress slideNo={cur+1}/>
            <div onPointerDownCapture={e=>e.stopPropagation()} onMouseDownCapture={e=>e.stopPropagation()} className="far-slide-inner" style={{width:"100%",maxWidth:1580,WebkitUserSelect:"text",userSelect:"text",cursor:"text"}}>{s.r(t,onBack,onNav)}<div style={{...sa,fontSize:12,color:t.m,opacity:.25,textAlign:"center",marginTop:48,letterSpacing:1}}>{pdfFooterLabel(id)}</div></div>
          </motion.div>
        </AnimatePresence>
      </div>
      <button className="far-btn-slides" onClick={()=>setNav(true)} style={{position:"fixed",bottom:24,left:24,zIndex:20,display:"flex",alignItems:"center",gap:8,background:t.nav,color:t.navT,...sa,fontSize:13,fontWeight:600,padding:"10px 20px",borderRadius:8,border:"none",cursor:"pointer",opacity:nav?0:1,pointerEvents:nav?"none":"auto",transition:"opacity .2s"}}>☰ Slides</button>
      <div className="far-btn-nav" style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,zIndex:20}}>
        <button onClick={()=>{setCur(c=>Math.max(c-1,0));setNotes(false);}} disabled={cur===0} style={{background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"10px 26px",borderRadius:8,cursor:cur===0?"not-allowed":"pointer",opacity:cur===0?.2:1,border:"none"}}>←</button>
        <button onClick={()=>{setCur(c=>Math.min(c+1,n-1));setNotes(false);}} disabled={cur===n-1} style={{background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"10px 26px",borderRadius:8,cursor:cur===n-1?"not-allowed":"pointer",opacity:cur===n-1?.2:1,border:"none"}}>→</button>
      </div>
      <button className="far-btn-pdf" onClick={exportPDF} disabled={pdfing} style={{position:"fixed",bottom:24,right:24,zIndex:20,display:"flex",alignItems:"center",gap:8,background:t.nav,color:t.navT,...sa,fontSize:13,fontWeight:600,padding:"10px 20px",borderRadius:8,border:"none",cursor:pdfing?"wait":"pointer",opacity:pdfing?.5:1,transition:"opacity .2s"}}>{pdfing?"Export en cours…":"↓ PDF"}</button>
      {s.note&&<button onClick={()=>setNotes(x=>!x)} style={{position:"fixed",bottom:24,right:120,zIndex:30,background:notes?t.cardAlt:"none",border:`1px solid ${t.brd}`,color:t.c,...mo,fontSize:11,fontWeight:600,padding:"10px 16px",borderRadius:8,cursor:"pointer",opacity:notes?.9:.3}}>📝 Web note</button>}
      <AnimatePresence>{notes&&s.note&&<motion.div initial={{opacity:0,scale:.96,y:8}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96,y:8}} transition={{duration:.2}} style={{position:"fixed",bottom:70,right:24,width:500,maxHeight:440,borderRadius:16,padding:32,zIndex:30,overflowY:"auto",background:t.note,color:t.noteT}}><div style={{...mo,fontSize:11,letterSpacing:2,textTransform:"uppercase",opacity:.3,marginBottom:16}}>WEB NOTE  -  SLIDE {cur+1}</div><p style={{...sa,fontSize:15,lineHeight:1.85,opacity:.85}}>{s.note}</p></motion.div>}</AnimatePresence>
    </div>
  );
}

// ─── DECK CARD ───────────────────────────────────────────────────────────────
function DeckCard({id,st,d,onOpen,delay,children}) {
  const [hovered,setHovered] = useState(false);
  const logoVar = st.bg===B||st.bg==="#C62828"||st.bg==="#81B840"||st.bg==="#1A1A1A"?"white":"black";

  return(
    <motion.div
      initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.4,delay}}
      whileHover={{}}
      onHoverStart={()=>setHovered(true)} onHoverEnd={()=>setHovered(false)}
      onClick={()=>onOpen(id)}
      style={{padding:44,borderRadius:18,cursor:"pointer",background:st.bg,color:st.c,border:st.brd||"none",position:"relative",overflow:"hidden"}}
    >
      <div style={{display:"flex",gap:24,alignItems:"center",opacity:hovered?0:1,transition:"opacity .25s ease"}}>
        <div style={{flex:1}}>
          <span style={{...mo,fontSize:10,fontWeight:600,letterSpacing:2,padding:"5px 12px",borderRadius:5,background:st.tBg,color:st.tC,marginBottom:18,display:"inline-block"}}>{d.tag}</span>
          <h3 style={{...sa,fontSize:24,fontWeight:700,marginBottom:8}}>{d.l}</h3>
          <p style={{...sa,fontSize:14,opacity:.55,lineHeight:1.5,marginBottom:18}}>{d.s}</p>
          <div style={{...mo,fontSize:11,opacity:.3}}>{ALL[id].length} slides</div>
        </div>
        <div style={{flexShrink:0}}>{children}</div>
      </div>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,opacity:hovered?1:0,transform:hovered?"scale(1)":"scale(.92)",transition:"opacity .25s ease, transform .3s cubic-bezier(.22,1,.36,1)"}}>
        <LaPorteLogo size={70} color={st.c}/>
        <div style={{width:30,height:1.5,background:st.c,opacity:.15,borderRadius:1}}/>
        <FarLogo size={56} variant={logoVar}/>
      </div>
    </motion.div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({onOpen}) {
  const cs = {
    dark:{bg:B,c:W,tBg:"rgba(255,176,0,.15)",tC:A},
    light:{bg:W,c:B,tBg:"rgba(26,26,26,.06)",tC:B,brd:`1px solid rgba(0,0,0,.08)`},
    shopify:{bg:"#81B840",c:"#1a2e05",tBg:"rgba(0,0,0,.1)",tC:"#1a2e05"},
    rode:{bg:"#C62828",c:"#fff",tBg:"rgba(255,255,255,.15)",tC:"#fff"},
    fgc:{bg:"#FFF2F5",c:"#1C1410",tBg:"rgba(224,31,42,.11)",tC:"#B01822"},
    fgcmarque:{bg:"#FFF4F7",c:"#1C1410",tBg:"rgba(255,107,53,.16)",tC:"#E85A24"},
    otacospepe:{bg:"#111111",c:"#FFC400",tBg:"rgba(255,122,0,.2)",tC:"#FF7A00"},
    toinelag:{bg:"#FFE14A",c:"#141414",tBg:"rgba(30,116,232,.22)",tC:"#0F3D7A"},
    garmin:{bg:"#050A0F",c:"#F7FBFF",tBg:"rgba(0,169,224,.16)",tC:"#00A9E0"},
  };
  return (
    <div className="far-home" style={{minHeight:"100vh",background:A,padding:"44px 52px",...sa,color:B}}>
      <style>{FC}</style>
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:.5}} style={{marginBottom:72}}>
        <div onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",cursor:"pointer"}}>
          <div className="far-logo-hover"><FarLogo size={80} variant="black"/></div>
          <div style={{width:1,height:32,background:"rgba(0,0,0,.12)"}}/>
          <span style={{...se,fontSize:22,fontWeight:700}}>THIBAULT LOUÉ</span>
        </div>
        <div style={{...mo,fontSize:11,fontWeight:600,letterSpacing:3,textTransform:"uppercase",opacity:.3,marginTop:12}}>Candidature · Head of Sales & Business Development</div>
      </motion.div>
      <motion.h1 initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.1}} style={{...se,fontSize:54,lineHeight:1.05,marginBottom:60}}>Cas pratiques & activations marques</motion.h1>
      <div style={{...mo,fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",opacity:.2,marginBottom:20}}>CAS PRATIQUES</div>
      <div className="far-home-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:52,maxWidth:1155}}>
        {[{id:"case1",logo:"far"},{id:"case2",img:"/lebouseuh.png",imgType:"photo"}].map(({id,img,imgType,logo},idx)=>{const d=META[id];const st=cs[d.card];return(
          <DeckCard key={id} id={id} st={st} d={d} onOpen={onOpen} delay={.3+idx*.1}>
            {logo==="far"&&<FarLogo size={90} variant="white"/>}
            {img&&imgType==="photo"&&<img src={pu(img)} alt="" style={{width:100,height:100,borderRadius:"50%",objectFit:"cover",border:"3px solid rgba(255,255,255,.2)",flexShrink:0}}/>}
          </DeckCard>
        );})}
      </div>
      <div style={{...mo,fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",opacity:.2,marginBottom:20}}>ACTIVATIONS MARQUES</div>
      <div className="far-home-grid" style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:20,maxWidth:1155}}>
        {[{id:"shopify",img:"/shopify-logo.png",imgW:110,filter:"brightness(0) invert(1)"},{id:"rode",img:"/rode-logo-white.png",imgW:80,filter:"none"},{id:"fastgoodcuisine",img:"/fgc.webp",imgW:76,filter:"none"},{id:"fgcmarque",img:"/fgc.webp",imgW:76,filter:"none"},{id:"otacospepe",img:"/otacos-logo.png",imgW:118,filter:"none"},{id:"toinelag",img:"/toinelag-avatar.png",imgW:78,filter:"none"},{id:"cyrilmp4",img:"/cyrilmp4.png",imgW:80,filter:"none",imgType:"photo"},{id:"garmin",img:"/cyrilmp4.png",imgW:80,filter:"none",imgType:"photo"}].map(({id,img,imgW,filter,imgType},idx)=>{const d=META[id];const st=cs[d.card];return(
          <DeckCard key={id} id={id} st={st} d={d} onOpen={onOpen} delay={.5+idx*.1}>
            {imgType==="photo"?<img src={pu(img)} alt="" style={{width:imgW,height:imgW,borderRadius:"50%",objectFit:"cover",border:"3px solid rgba(255,255,255,.2)",flexShrink:0}}/>:<img src={pu(img)} alt="" style={{width:imgW,height:"auto",filter,opacity:.92,flexShrink:0,borderRadius:10,border: id==="toinelag" ? "3px solid rgba(20,20,20,.15)" : id==="fgcmarque" ? "2px solid rgba(28,20,16,.12)" : "none"}}/>}
          </DeckCard>
        );})}
      </div>
      <div style={{maxWidth:1155,margin:"0 auto",marginTop:8}}>
        <motion.button type="button" onClick={()=>onOpen("profil")} whileHover={{opacity:.55}} whileTap={{scale:.98}} style={{display:"block",width:"100%",background:"transparent",border:"none",borderTop:"1px solid rgba(26,26,26,.1)",padding:"20px 12px 4px",cursor:"pointer",...mo,fontSize:9,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:B,opacity:.26,textAlign:"center"}}>Mon profil · CV</motion.button>
      </div>
      <div style={{...sa,fontSize:12,color:B,opacity:.25,textAlign:"center",marginTop:36,letterSpacing:1}}>confidentiel - thibault loué</div>
    </div>
  );
}

// ─── LA PORTE LOGO SVG ───────────────────────────────────────────────────────
const LaPorteLogo = ({size=120,color="#fff"}) => <svg viewBox="0 0 87 40" fill={color} style={{width:size,height:size*40/87}}><path d="M29.17 0h-3.5v18.56h3.5V0Z"/><path d="M36.33 21.97a6.6 6.6 0 0 0-3.16-.85c-1.11 0-2.05.28-2.82.85a4.9 4.9 0 0 0-1.23 1.33l-.16-1.87h-3.28V40h3.5v-7.1c.33.51.72.93 1.18 1.27.77.56 1.71.85 2.82.85 1.22 0 2.27-.28 3.16-.85.9-.56 1.59-1.37 2.08-2.41.5-1.05.74-2.27.74-3.69s-.25-2.66-.74-3.7c-.49-1.03-1.18-1.83-2.08-2.4Zm-1.23 8.03c-.28.57-.67 1.01-1.15 1.33a2.83 2.83 0 0 1-1.68.48c-.6 0-1.13-.16-1.6-.48s-.84-.57-1.1-1.14a4.16 4.16 0 0 1-.4-1.93c0-.73.13-1.37.4-1.92.27-.56.64-1 1.11-1.32.48-.32 1.02-.48 1.62-.48.64 0 1.2.16 1.7.48.48.32.86.76 1.13 1.32.28.56.41 1.2.41 1.92 0 .73-.14 1.37-.43 1.93Z"/><path d="M42.85 11.21c.02-1.34-.19-2.48-.63-3.4a4.32 4.32 0 0 0-2-2.11c-.89-.48-2-.72-3.32-.72-1.11 0-2.05.17-2.82.52-.77.34-1.39.79-1.87 1.33a6.1 6.1 0 0 0-1.08 1.66l3.18 1.09c.3-.51.66-.88 1.09-1.11.42-.23.9-.34 1.43-.34.6 0 1.08.15 1.44.44.36.29.63.71.81 1.27.07.22.13.47.17.73h-3.03c-1.71 0-3.04.36-3.98 1.07-.95.72-1.42 1.78-1.42 3.2 0 1.29.44 2.29 1.31 3 .87.71 2.1 1.06 3.69 1.06s2.71-.5 3.4-1.51l.07 1.48h3.31l.08-7.34Zm-3.9 3.27a2.63 2.63 0 0 1-1.05 1.06 2.9 2.9 0 0 1-1.51.41c-.64 0-1.13-.11-1.48-.33-.35-.22-.53-.53-.53-.92 0-.49.22-.88.66-1.15.44-.27 1.24-.41 2.38-.41h1.91c0 .46-.13.91-.38 1.34Z"/><path d="M50.66 22.01c-1.04-.59-2.24-.89-3.6-.89s-2.53.3-3.57.89c-1.04.59-1.85 1.41-2.44 2.45-.58 1.04-.87 2.25-.87 3.61s.29 2.56.89 3.61c.59 1.04 1.41 1.86 2.45 2.45s2.2.89 3.56.89 2.53-.3 3.56-.89 1.84-1.41 2.42-2.45c.58-1.05.87-2.25.87-3.61s-.29-2.56-.87-3.61a6.17 6.17 0 0 0-2.44-2.45Zm-.69 7.98a3.1 3.1 0 0 1-1.15 1.31c-.49.32-1.05.48-1.71.48s-1.24-.16-1.75-.48a3.2 3.2 0 0 1-1.19-1.31 4.22 4.22 0 0 1-.42-1.92c0-.73.14-1.37.42-1.92.28-.56.67-1 1.18-1.32.5-.32 1.08-.48 1.73-.48.65 0 1.21.16 1.71.48s.89.76 1.18 1.32c.28.56.42 1.2.42 1.92s-.14 1.37-.42 1.92Z"/><path d="M58.81 23.88v-2.47h-3.5v13.26h3.5V27.7c0-.69.22-1.6.66-2.04.44-.44 1.02-.76 1.73-.96.67-.18 1.39-.28 2.15-.29v-3c-.9.02-1.77.25-2.59.69-.78.41-1.42 1-1.95 1.78Z"/><path d="M71.16 31.66a1.3 1.3 0 0 1-.58.12c-.48 0-.84-.15-1.09-.44-.25-.29-.37-.72-.37-1.29v-5.65h3.31v-2.97h-3.31v-4.14h-3.49v4.14h-1.44v2.97h1.44v6.42c0 1.34.37 2.38 1.12 3.1.75.72 1.86 1.09 3.33 1.09.51 0 1.03-.1 1.55-.31.52-.2.99-.46 1.42-.78l-1.22-2.63c-.23.16-.45.28-.66.36Z"/><path d="M84.84 29h1.72c0-1.68-.3-3.11-.9-4.28-.6-1.17-1.39-2.07-2.37-2.68a6.1 6.1 0 0 0-3.19-1.92c-1.34 0-2.53.3-3.56.89-1.03.59-1.84 1.41-2.44 2.45-.59 1.04-.89 2.25-.89 3.61 0 1.36.29 2.56.86 3.61s1.33 1.86 2.34 2.45c1.01.59 2.16.89 3.47.89 1.04 0 1.97-.14 2.78-.42.81-.28 1.51-.7 2.1-1.23.51-.47.94-1.01 1.29-1.63l-3.12-1.56c-.23.47-.56.86-1 1.16-.43.3-1 .45-1.69.45s-1.22-.14-1.75-.41a2.76 2.76 0 0 1-1.27-1.21 3.4 3.4 0 0 1-.41-1.17h7.98Zm-7.81-2.73c.04-.12.07-.23.12-.33.24-.57.6-1 1.07-1.29.48-.28 1.07-.43 1.75-.43.62 0 1.16.15 1.62.47.46.31.82.81 1.07 1.51l.02.07h-5.65Z"/><path d="m2.85 9.99 11.42 5.72v17.15l5.71-2.86V12.85L8.56 7.13 2.85 9.99Z"/><path d="m5.71 14.28-5.71 2.86v17.15l11.41 5.71 5.71-2.86L5.71 31.43V14.28Z"/></svg>;

// ─── PASSWORD GATE ───────────────────────────────────────────────────────────
const PASS_HASH = "thibault";
function Gate({children}){
  const [ok,setOk] = useState(()=>sessionStorage.getItem("far_auth")==="1");
  const [v,setV] = useState("");
  const [err,setErr] = useState(false);
  const [focused,setFocused] = useState(false);
  const submit = e=>{e.preventDefault();if(v===PASS_HASH){sessionStorage.setItem("far_auth","1");setOk(true);}else{setErr(true);setTimeout(()=>setErr(false),1500);}};
  if(ok) return children;
  return <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#FFAA00",padding:20}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap');@keyframes _vibrate{0%{transform:translate(0)}15%{transform:translate(-1px,.5px) rotate(-.5deg)}30%{transform:translate(1px,-.5px) rotate(.5deg)}45%{transform:translate(-.5px,1px) rotate(-.3deg)}60%{transform:translate(.5px,-1px) rotate(.3deg)}75%{transform:translate(-1px,.5px) rotate(-.5deg)}90%{transform:translate(.5px,-.5px) rotate(.3deg)}100%{transform:translate(0)}}.far-logo-hover{cursor:pointer;}.far-logo-hover:hover{animation:_vibrate .25s ease-in-out;}`}</style>
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{display:"flex",flexDirection:"column",alignItems:"center",maxWidth:400,width:"100%"}}>
      <div className="far-logo-hover" onClick={()=>window.location.reload()} style={{display:"flex",alignItems:"center",gap:16,marginBottom:40,cursor:"pointer"}}><FarLogo size={80} variant="black"/><div style={{width:1,height:32,background:"rgba(0,0,0,.25)"}}/><span style={{...se,fontSize:22,fontWeight:700,color:"#1A1A1A"}}>THIBAULT LOUÉ</span></div>
      <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:16,width:"100%"}}>
        <input value={v} onChange={e=>setV(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} type="password" placeholder={focused?"":"Mot de passe"} style={{...sa,fontSize:16,padding:"14px 20px",borderRadius:10,border:`1px solid ${err?"#e53935":"rgba(0,0,0,.15)"}`,background:"rgba(0,0,0,.08)",color:"#1A1A1A",outline:"none",textAlign:"center",transition:"border .3s"}}/>
        <button type="submit" style={{...mo,fontSize:13,fontWeight:700,letterSpacing:2,padding:"14px 32px",borderRadius:10,border:"none",background:"#1A1A1A",color:"#FFAA00",cursor:"pointer"}}>ACCÉDER</button>
      </form>
      {err&&<motion.div initial={{opacity:0}} animate={{opacity:1}} style={{...sa,fontSize:13,color:"#e53935",marginTop:12}}>Mot de passe incorrect</motion.div>}
    </motion.div>
  </div>;
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function parseHash() {
  const h = window.location.hash.replace(/^#/, "");
  if (!h) return { d: null, s: 0 };
  const [raw, s] = h.split("/");
  const d = normalizeDeckId(raw);
  const slide = parseInt(s, 10);
  return { d, s: Number.isFinite(slide) && slide >= 0 ? slide : 0 };
}
export default function App() {
  const [deck, setDeck] = useState(() => parseHash().d);
  const navDeck = useCallback((d) => {
    setDeck(d);
    window.location.hash = d ? `${d}/0` : "";
  }, []);
  const goBack = useCallback(() => {
    setDeck(null);
    window.location.hash = "";
  }, []);
  useEffect(() => {
    const syncFromHash = () => {
      const h = window.location.hash.replace(/^#/, "");
      const [raw, sPart] = h.split("/");
      const d = normalizeDeckId(raw);
      if (raw && !d) {
        const u = new URL(window.location.href);
        u.hash = "";
        window.history.replaceState(null, "", u.pathname + u.search);
        setDeck(null);
        return;
      }
      if (d && d !== raw) {
        const slide = parseInt(sPart, 10);
        const s = Number.isFinite(slide) && slide >= 0 ? slide : 0;
        const u = new URL(window.location.href);
        u.hash = `#${d}/${s}`;
        window.history.replaceState(null, "", u.toString());
      }
      setDeck(parseHash().d);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);
  return <Gate>{deck ? <Pres key={deck} id={deck} onBack={goBack} onNav={navDeck} /> : <Home onOpen={navDeck} />}</Gate>;
}
