/** Le Grand JD — version initiale (DA sombre cinématographique, pré-Keynote). */
import jdPortraitUrl from "./assets/grandjd/jd-portrait.jpg";

export function createSGrandJd(P) {
  const { FarLogo, FarBeams, pu, se, sa, mo, Tg, Hl, Sh } = P;
  return [

{title:"Présentation",
r:t=>{
  const src=jdPortraitUrl;
  return <div style={{display:"flex",gap:44,alignItems:"center",minHeight:"62vh"}}>
  <div style={{flex:3,minWidth:0}}>
    <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:22}}>
      <img src={src} alt="Le Grand JD" style={{width:56,height:56,borderRadius:"50%",objectFit:"cover",border:`2px solid ${t.a}`,flexShrink:0}}/>
      <div style={{width:1,height:32,background:t.brd}}/>
      <FarLogo size={68} variant={t.lv}/>
      <FarBeams w={96} fill={t.a} style={{marginLeft:4}}/>
    </div>
    <div style={{...mo,fontSize:12,fontWeight:700,letterSpacing:2.5,color:t.a,marginBottom:14}}>PROSPECTION · APPORT D'AFFAIRES</div>
    <div style={{...se,fontSize:48,fontWeight:800,lineHeight:1.05,marginBottom:14,color:t.c,whiteSpace:"nowrap"}}>Le Grand JD{"\u00A0"}×{"\u00A0"}FAR</div>
    <div style={{width:60,height:3,background:t.a,borderRadius:2,marginBottom:20}}/>
    <div style={{...sa,fontSize:17,color:t.m,lineHeight:1.45,marginBottom:22,maxWidth:580,whiteSpace:"nowrap"}}>Une force de frappe commerciale pour valoriser ton univers et tes revenus.</div>
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {[
        {t:"Multiplier tes opportunités",d:"Une équipe dédiée, sans te rajouter de charge."},
        {t:"Combler les trous entre tes gros formats",d:"Des marques qui ont une raison d'être dans ton récit."},
        {t:"Faire rayonner ton univers",d:"Reportage, urbex, paranormal, rencontres."},
        {t:"Préserver ton exigence",d:"On protège ta ligne et ton récit. Toujours."},
      ].map((o,i)=><div key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}><div style={{width:7,height:7,borderRadius:4,background:t.a,flexShrink:0,marginTop:8}}/><div><div style={{...sa,fontSize:15.5,fontWeight:700,color:t.c,lineHeight:1.25,whiteSpace:"nowrap"}}>{o.t}</div><div style={{...sa,fontSize:14,color:t.m,lineHeight:1.4,marginTop:2,whiteSpace:"nowrap"}}>{o.d}</div></div></div>)}
    </div>
  </div>
  <div style={{flex:"0 0 420px",width:420,height:440,borderRadius:20,overflow:"hidden",boxShadow:"0 18px 50px rgba(0,0,0,.45)",border:`1px solid ${t.brd}`,flexShrink:0,backgroundColor:"#1a1f24",backgroundImage:`url(${JSON.stringify(src)})`,backgroundSize:"cover",backgroundPosition:"center top",backgroundRepeat:"no-repeat"}}>
    <img src={src} alt="Le Grand JD" style={{width:"100%",height:"100%",objectFit:"cover",display:"block",objectPosition:"center top"}}/>
  </div>
</div>;
}},

{title:"L'agence",
r:t=><div>
  <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:12}}><FarLogo size={48} variant={t.lv}/><div style={{width:1,height:26,background:t.brd}}/><div style={{...mo,fontSize:12,fontWeight:600,letterSpacing:3,color:t.d}}>L'AGENCE</div><div style={{flex:1}}/><FarBeams w={90} fill={t.a}/></div>
  <div style={{...se,fontSize:30,fontWeight:800,lineHeight:1.12,marginBottom:8,whiteSpace:"nowrap"}}>Valoriser les univers créateurs.</div>
  <div style={{...sa,fontSize:14,color:t.m,lineHeight:1.4,marginBottom:12,whiteSpace:"nowrap"}}>Chez FAR, un créateur ne se résume pas à son audience{"\u00A0"}: c'est un univers. Notre mission{"\u00A0"}: le valoriser juste.</div>
  <div style={{display:"flex",gap:10,marginBottom:14}}>{[
    {v:"Roster",l:"à taille humaine"},
    {v:"10\u00A0ans",l:"d'expérience marques & créateurs"},
    {v:"+50",l:"marques accompagnées"},
    {v:"100+",l:"campagnes réalisées"},
  ].map((s,i)=><div key={i} style={{flex:1,padding:"11px 10px",borderRadius:10,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center"}}><div style={{...se,fontSize:20,fontWeight:800,color:t.a}}>{s.v}</div><div style={{...sa,fontSize:11.5,color:t.m,marginTop:3,whiteSpace:"nowrap"}}>{s.l}</div></div>)}</div>
  <div style={{display:"flex",gap:0,borderRadius:14,overflow:"hidden",border:`1px solid ${t.brd}`}}>{[
    {
      t:"Garantir la croissance",
      hook:"Ouvrir sans dénaturer.",
      pts:["Partenariats long terme","Actifs propriétaires","Opérations premium","Remplissage intelligent"],
    },
    {
      t:"Solidifier la structure",
      hook:"Rendre l'univers pilotable.",
      pts:["Priorisation & calendrier","Data & visibilité business","Cadre admin, juridique, fiscal","Process & outils"],
    },
    {
      t:"Laisser la création intacte",
      hook:"Défendre l'ADN de l'univers.",
      pts:["Ligne éditoriale & territoire","Intégrations marques crédibles","Arbitrage des opportunités","Protection des catégories"],
    },
  ].map((item,i)=><div key={i} style={{flex:1,padding:"14px 16px",borderRight:i<2?`1px solid ${t.brd}`:"none",background:i%2===0?t.card:"transparent"}}>
    <div style={{marginBottom:8}}><FarBeams w={52} fill={t.a} active={i+1} dimOpacity={0.22}/></div>
    <div style={{...mo,fontSize:9,fontWeight:800,letterSpacing:1.5,color:t.a,marginBottom:4}}>{`FAISCEAU 0${i+1}`}</div>
    <div style={{...sa,fontSize:14.5,fontWeight:700,color:t.c,marginBottom:3,lineHeight:1.2,whiteSpace:"nowrap"}}>{item.t}</div>
    <div style={{...sa,fontSize:12.5,color:t.m,marginBottom:10,lineHeight:1.35,whiteSpace:"nowrap"}}>{item.hook}</div>
    {item.pts.map((p,j)=><div key={j} style={{display:"flex",gap:8,padding:"4px 0",borderTop:j===0?`1px solid ${t.brd}`:"none"}}>
      <span style={{...sa,fontSize:12,fontWeight:800,color:t.a,flexShrink:0}}>→</span>
      <span style={{...sa,fontSize:12.5,color:t.c,lineHeight:1.35,whiteSpace:"nowrap"}}>{p}</span>
    </div>)}
  </div>)}</div>
</div>},

{title:"Manifesto",
r:t=>{
  const ms=k=>{
    switch(k){
      case"hook":return{...se,fontSize:19,fontWeight:700,color:t.c,lineHeight:1.18,margin:"0 0 10px"};
      case"verse":return{...se,fontSize:14,fontWeight:600,color:t.c,lineHeight:1.2,margin:"0 0 1px"};
      case"univers":return{...se,fontSize:16,fontWeight:800,color:t.a,lineHeight:1.2,margin:"6px 0 4px"};
      case"trait":return{...se,fontSize:13,fontWeight:700,color:t.c,lineHeight:1.22,margin:"0 0 2px"};
      case"pillar":return{...sa,fontSize:12.5,fontWeight:600,color:t.c,lineHeight:1.3,margin:"0 0 2px"};
      case"mission":return{...se,fontSize:14,fontWeight:800,color:t.a,lineHeight:1.22,margin:"6px 0 4px"};
      case"tagline":return{...se,fontSize:16,fontWeight:800,color:t.a,lineHeight:1.2,margin:"8px 0 0"};
      default:return{...sa,fontSize:12,color:t.m,lineHeight:1.32,margin:"0 0 3px"};
    }
  };
  const blocks=[
    {k:"verse",t:"C'est une manière de voir."},
    {k:"verse",t:"De créer."},
    {k:"verse",t:"De raconter."},
    {k:"verse",t:"De rassembler."},
    {k:"univers",t:"C'est un univers."},
    {k:"trait",t:"Un univers a ses codes."},
    {k:"trait",t:"Son rythme. Ses formats. Sa communauté."},
    {k:"trait",t:"Ses exigences. Ses limites. Ses ambitions."},
    {k:"body",t:"Pour aller loin, il ne suffit pas d'être visible."},
    {k:"pillar",t:"Il faut être compris avant d'être exposé."},
    {k:"pillar",t:"Structuré sans être bridé."},
    {k:"pillar",t:"Protégé sans être enfermé."},
    {k:"pillar",t:"Développé sans être dénaturé."},
    {k:"mission",t:"C'est la mission de FAR."},
    {k:"body",t:"Accompagner les univers créateurs avec la vision, le cadre, les opportunités et la sérénité nécessaires pour grandir juste."},
    {k:"body",t:"Pour que chaque créateur puisse construire plus grand, sans perdre ce qui le rend singulier."},
    {k:"body",t:"Et que chaque marque puisse trouver sa place dans un univers qui existe déjà."},
    {k:"tagline",t:"Qui veut aller loin, vient ici."},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",width:"100%"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:14}}>
        <FarLogo size={72} variant={t.lv}/>
        <div style={{marginTop:10,display:"flex",justifyContent:"center"}}>
          <FarBeams w={110} fill={t.a}/>
        </div>
      </div>
      <div style={{...mo,fontSize:13,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:t.d,marginBottom:10}}>MANIFESTO</div>
      <p style={{...ms("hook"),maxWidth:900}}>Chez FAR, nous pensons qu&apos;un créateur ne se résume pas à son audience.</p>
      <div style={{maxWidth:920,width:"100%",textAlign:"center"}}>
        {blocks.map((b,i)=><p key={i} style={ms(b.k)}>{b.t}</p>)}
      </div>
    </div>
  );
}},

{title:"Pourquoi toi",
r:t=><div style={{display:"flex",gap:28,alignItems:"stretch"}}>
  <div style={{flex:3,display:"flex",flexDirection:"column",justifyContent:"center"}}>
    <Tg t={t}>POURQUOI TOI</Tg>
    <Hl t={t} s={{fontSize:28,marginBottom:8,whiteSpace:"nowrap"}}>Tu es le type de créateur que FAR veut accompagner.</Hl>
    <Sh t={t} s={{fontSize:14,marginBottom:14,whiteSpace:"nowrap"}}>Des univers singuliers, déjà structurés, formats longs à forte valeur. Pas du reach seul{"\u00A0"}: un récit défendable.</Sh>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10,marginBottom:14}}>
      {[
        {v:"4,2M",l:"abonnés YouTube"},
        {v:"6,4M+",l:"audience cumulée"},
        {v:"~950K",l:"abonnés Instagram"},
        {v:"17 ans",l:"d'ancienneté créateur"},
      ].map((s,i)=><div key={i} style={{padding:"11px 8px",borderRadius:10,background:t.card,border:`1px solid ${t.brd}`,textAlign:"center"}}>
        <div style={{...se,fontSize:20,fontWeight:800,color:t.a}}>{s.v}</div>
        <div style={{...sa,fontSize:10.5,color:t.m,marginTop:3,lineHeight:1.3,whiteSpace:"nowrap"}}>{s.l}</div>
      </div>)}
    </div>
    {[
      {t:"Tes formats",d:"Du long incarné, documentaire, enquête : une surface premium, pas du contenu jetable."},
      {t:"Ton territoire",d:"Reportage, urbex, paranormal, rencontres : un positionnement lisible pour les marques."},
      {t:"Ta signature",d:"Phantasma et tes actifs propriétaires : ce qui te différencie, et qu'on sait défendre."},
      {t:"Ton potentiel",d:"Brand safety, audience solide, et un taux de remplissage encore très ouvert."},
    ].map((a,i)=><div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<3?`1px solid ${t.brd}`:"none",alignItems:"baseline"}}>
      <div style={{...sa,fontSize:13.5,fontWeight:700,color:t.a,minWidth:110,whiteSpace:"nowrap"}}>{a.t}</div>
      <div style={{...sa,fontSize:13.5,color:t.m,lineHeight:1.4,whiteSpace:"nowrap"}}>{a.d}</div>
    </div>)}
    <div style={{...mo,fontSize:10,fontWeight:700,letterSpacing:2,color:t.d,marginTop:14,marginBottom:8}}>TON UNIVERS</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>{[
      {t:"Reportages & documentaires",img:"/grandjd/axe-1-reportage.png"},
      {t:"Paranormal / Urbex",img:"/grandjd/axe-2-urbex.png"},
      {t:"Rencontres",img:"/grandjd/axe-3-rencontres.png"},
    ].map((a,i)=><div key={i} style={{borderRadius:10,overflow:"hidden",border:`1px solid ${t.brd}`,background:t.card}}>
      <img src={pu(a.img)} alt={a.t} style={{width:"100%",height:72,objectFit:"cover",objectPosition:"center",display:"block"}}/>
      <div style={{...sa,fontSize:12,fontWeight:700,color:t.c,padding:"7px 8px",lineHeight:1.25,whiteSpace:"nowrap"}}>{a.t}</div>
    </div>)}</div>
  </div>
  <div style={{width:280,flexShrink:0,alignSelf:"center",borderRadius:14,overflow:"hidden",border:`1px solid ${t.brd}`}}>
    <img src={pu("/grandjd/jd-portrait-2.jpg")} alt="Le Grand JD" style={{width:"100%",height:440,objectFit:"cover",display:"block",objectPosition:"center top"}}/>
  </div>
</div>},

{title:"Ce que l'on te propose",
r:t=><div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
  <div style={{...mo,fontSize:13,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:10}}>MAIS AUSSI, OPTIMISER TON REMPLISSAGE</div>
  <div style={{...se,fontSize:32,fontWeight:800,lineHeight:1.12,marginBottom:10,color:t.c,whiteSpace:"nowrap"}}>Un manque à gagner qui ralentit ta croissance.</div>
  <div style={{...sa,fontSize:15,color:t.m,lineHeight:1.45,marginBottom:34,whiteSpace:"nowrap"}}>Au-delà de tes qualités{"\u00A0"}: un taux trop bas. L'objectif{"\u00A0"}: se rapprocher de 100{"\u00A0"}% sur le long terme, un sponsor par vidéo, sans dénaturer ton univers.</div>
  <div style={{...mo,fontSize:12,fontWeight:800,letterSpacing:2,color:t.a,marginBottom:20}}>OBJECTIF REMPLISSAGE · LONG TERME</div>
  <div style={{display:"flex",alignItems:"baseline",justifyContent:"center",gap:28,whiteSpace:"nowrap",marginBottom:36}}>
    <div style={{...se,fontSize:100,fontWeight:800,color:t.c,letterSpacing:"-0.03em",lineHeight:1}}>~28{"\u00A0"}%</div>
    <div style={{...sa,fontSize:52,color:t.a,fontWeight:700}}>→</div>
    <div style={{...se,fontSize:100,fontWeight:800,color:t.a,letterSpacing:"-0.03em",lineHeight:1}}>~100{"\u00A0"}%</div>
  </div>
  <div style={{...sa,fontSize:17,color:t.m,lineHeight:1.55,whiteSpace:"nowrap"}}>Une trajectoire long terme{"\u00A0"}: plus de CA à chaque vidéo, réinvesti dans tes productions - sans jamais te dénaturer.</div>
</div>},

{title:"Valeur ajoutée",
r:t=>{
  const cols="48px minmax(0,1.15fr) minmax(0,1.25fr)";
  const rows=[
    {
      n:"01",
      v:"58 jours pour filmer un animal que personne ne voit",
      brand:"Optique & capture",
      angle:"Rendre visible l'invisible",
      d:"Moment clé : « à l'œil nu, on ne voit rien ». Cut sur l'optique qui révèle l'animal. La marque = l'outil du récit. Ex. Sony, Canon, Fujifilm.",
    },
    {
      n:"02",
      v:"L'épidémie la plus étrange de France",
      brand:"Santé digitale",
      angle:"Sortir du flou médical",
      d:"Symptômes flous, aucune réponse claire : la téléconsultation / l'assurance comme premier réflexe pour être entendu. Ex. Qare, Doctolib, Alan.",
    },
    {
      n:"03",
      v:"Le lac aux squelettes",
      brand:"4x4 & mobilité",
      angle:"L'expédition avant le mystère",
      d:"Ouvrir sur la route (altitude, pistes) : le véhicule rend le lieu atteignable, puis le récit bascule sur le lac. Ex. Land Rover, Jeep, Toyota.",
    },
  ];
  return(
    <div>
      <div style={{...mo,fontSize:13,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:10}}>PREUVE DE LECTURE</div>
      <div style={{...se,fontSize:30,fontWeight:800,lineHeight:1.15,marginBottom:8,color:t.c}}>3 vidéos sans marque. 3 intégrations qu'on aurait imaginées.</div>
      <div style={{...sa,fontSize:15,color:t.m,lineHeight:1.45,marginBottom:22}}>Trois succès diffusés sans sponsor{"\u00A0"}: autant de manque à gagner. Voici ce qu'on aurait activé - natif, exigeant, défendable.</div>
      <div style={{display:"grid",gridTemplateColumns:cols,gap:24,padding:"0 0 10px",borderBottom:`1px solid ${t.brd}`}}>
        <div/>
        <div style={{...mo,fontSize:10,fontWeight:700,letterSpacing:1.5,color:t.d}}>VIDÉO · CATÉGORIE</div>
        <div style={{...mo,fontSize:10,fontWeight:700,letterSpacing:1.5,color:t.d}}>INTÉGRATION</div>
      </div>
      {rows.map((x,i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:cols,gap:24,alignItems:"start",padding:"18px 0",borderBottom:`1px solid ${t.brd}`}}>
          <div style={{...mo,fontSize:15,fontWeight:800,color:t.a,lineHeight:1.3}}>{x.n}</div>
          <div>
            <div style={{...sa,fontSize:15.5,fontWeight:700,color:t.c,lineHeight:1.35,marginBottom:10}}>{x.v}</div>
            <div style={{...se,fontSize:20,fontWeight:800,color:t.a,lineHeight:1.15,marginBottom:4}}>{x.brand}</div>
            <div style={{...sa,fontSize:13.5,fontWeight:600,color:t.c,lineHeight:1.35}}>{x.angle}</div>
          </div>
          <div style={{...sa,fontSize:14.5,color:t.m,lineHeight:1.5,paddingTop:2}}>{x.d}</div>
        </div>
      ))}
    </div>
  );
}},

{title:"On ne te met pas la bague au doigt",
r:t=><div style={{width:"100%"}}>
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",minHeight:"58vh"}}>
    <div style={{...mo,fontSize:13,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:22}}>LE CADRE</div>
    <div style={{...se,fontSize:54,fontWeight:800,lineHeight:1.08,marginBottom:24,color:t.c,whiteSpace:"nowrap"}}>On ne te met pas la bague au doigt.</div>
    <div style={{width:60,height:3,background:t.a,borderRadius:2,marginBottom:26}}/>
    <div style={{...sa,fontSize:18.5,color:t.m,lineHeight:1.55,whiteSpace:"nowrap"}}>FAR s'ajoute à ce que tu as déjà{"\u00A0"}: un bonus commercial, sans exclusivité, sans toucher à ta liberté.</div>
  </div>
</div>},

{title:"Nos engagements",
r:t=><div><div style={{...mo,fontSize:14,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>NOS ENGAGEMENTS</div>
  <div style={{...se,fontSize:34,fontWeight:800,lineHeight:1.15,marginBottom:10,whiteSpace:"nowrap"}}>Une équipe commerciale externe, à tes côtés.</div>
  <div style={{...sa,fontSize:15,color:t.m,lineHeight:1.5,marginBottom:18,whiteSpace:"nowrap"}}>Tu gardes la main sur tes deals, ton réseau et ta ligne édito. Voici nos règles, sans ambiguïté.</div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
    <div style={{padding:"22px 26px",borderRadius:16,background:t.ex,color:t.exT}}>
      <div style={{...mo,fontSize:12,fontWeight:700,letterSpacing:2,marginBottom:16}}>CE QU'ON FAIT</div>
      {[
        "Commission uniquement sur le business qu'on t'apporte.",
        "Uniquement des marques cohérentes avec ton univers.",
        "On filtre pour toi : moins de bruit, plus de partenaires.",
        "Rien n'est signé sans ton accord.",
        "On défend ta valeur et ton pricing.",
        "Tu gardes la main sur ton réseau et ta ligne édito.",
      ].map((line,i,arr)=><div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"8px 0",borderBottom:i<arr.length-1?"1px solid rgba(0,0,0,.1)":"none"}}>
        <span style={{width:22,height:22,borderRadius:6,background:"rgba(0,0,0,.14)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13,fontWeight:800}} aria-hidden>✓</span>
        <span style={{...sa,fontSize:13.5,lineHeight:1.45,whiteSpace:"nowrap"}}>{line}</span>
      </div>)}
    </div>
    <div style={{padding:"22px 26px",borderRadius:16,background:t.no,color:t.noT,border:`1px solid ${t.noBrd}`}}>
      <div style={{...mo,fontSize:12,fontWeight:700,letterSpacing:2,marginBottom:16,opacity:0.65}}>CE QU'ON NE FAIT PAS</div>
      {[
        "Prendre une commission sur tes deals entrants.",
        "Te pousser des marques hors sujet pour faire du volume.",
        "T'ajouter des sollicitations et du bruit inutiles.",
        "Signer quoi que ce soit dans ton dos.",
        "Brader tes tarifs pour closer plus vite.",
        "Toucher à ta ligne éditoriale ou à ta créativité.",
      ].map((line,i,arr)=><div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"8px 0",borderBottom:i<arr.length-1?"1px solid rgba(128,128,128,.12)":"none"}}>
        <span style={{width:22,height:22,borderRadius:6,background:"rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13,fontWeight:800,color:t.m}} aria-hidden>✕</span>
        <span style={{...sa,fontSize:13.5,lineHeight:1.45,opacity:0.9,whiteSpace:"nowrap"}}>{line}</span>
      </div>)}
    </div>
  </div>
</div>},

{title:"Le deal",
r:t=><div>
  <div style={{...mo,fontSize:13,fontWeight:600,letterSpacing:3,color:t.d,marginBottom:12}}>LE DEAL · APPORT D'AFFAIRES</div>
  <div style={{...se,fontSize:34,fontWeight:800,lineHeight:1.1,marginBottom:26,color:t.c,whiteSpace:"nowrap"}}>Commission uniquement sur le business additionnel.</div>
  <div style={{display:"flex",gap:0,borderRadius:14,overflow:"hidden",border:`1px solid ${t.brd}`,marginBottom:26}}>
    {[
      {r:"Deal < 20\u00A0k€",p:"20\u00A0%"},
      {r:"Deal 20 - 35\u00A0k€",p:"25\u00A0%"},
      {r:"Deal > 35\u00A0k€",p:"30\u00A0%"},
    ].map((c,i)=><div key={i} style={{flex:1,padding:"26px 22px",background:i===1?t.card:i===2?t.cardAlt:"transparent",borderRight:i<2?`1px solid ${t.brd}`:"none",textAlign:"center"}}>
      <div style={{...sa,fontSize:14.5,color:t.m,marginBottom:12,whiteSpace:"nowrap"}}>{c.r}</div>
      <div style={{...se,fontSize:42,fontWeight:800,color:t.a,letterSpacing:"-0.02em",whiteSpace:"nowrap"}}>{c.p}</div>
    </div>)}
  </div>
  <div style={{width:28,height:2,background:t.a,marginBottom:16}}/>
  <div style={{...sa,fontSize:16,color:t.c,lineHeight:1.55,fontWeight:500,whiteSpace:"nowrap"}}>La cohérence d'abord{"\u00A0"}: chaque marque a sa place dans ton récit, tu gardes la main, on ne brade jamais tes tarifs.</div>
</div>},

{title:"Merci",
r:(t,back)=>{
  const pdf=Boolean(globalThis.__FAR_PDF_EXPORT);
  return <div style={{textAlign:"center",padding:pdf?"0":"80px 0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{marginBottom:40}}><FarLogo size={100} variant={t.lv}/></div><div style={{...se,fontSize:52,fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.1,marginBottom:16}}>Merci.</div><div style={{...sa,fontSize:17,color:t.c2,lineHeight:1.6,maxWidth:520,marginBottom:8}}>Qui veut aller loin, vient ici.</div><div style={{width:60,height:3,background:t.a,borderRadius:2,margin:"28px auto 0"}}/>{back&&<button onClick={back} style={{marginTop:36,background:t.nav,color:t.navT,...sa,fontSize:14,fontWeight:600,padding:"12px 32px",borderRadius:10,border:"none",cursor:"pointer"}}>← Retour à l'accueil</button>}</div>;
}},
];
}
