import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

/* ================================================================
   KLINIKUM LANDKREIS ERDING — Cinematic Concept (Cogniiq)
   3D scroll hero · orchestrated reveals · fullscreen menu · Klara AI
   ================================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
:root{
  --ink:#07181D; --deep:#0A2A31; --klinik:#0E6E77; --teal:#17919B; --glow:#5FD4CF;
  --porcelain:#F7F6F2; --paper:#FFFFFF; --line:rgba(14,110,119,.14);
  --gold:#C9964B; --bronze:#A8814F; --sand:#EFE9DF; --cream:#FBF9F5; --red:#C24334; --muted:#5E7379;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
html,body{overflow-x:clip;background:var(--ink)}
.app{font-family:'Figtree',system-ui,sans-serif;color:var(--porcelain);line-height:1.6;overflow-x:clip}
.disp{font-family:'Bricolage Grotesque',serif}
.mono{font-family:'IBM Plex Mono',monospace}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}

/* ---------- header ---------- */
.hdr{position:fixed;top:0;left:0;right:0;z-index:60;transition:background .4s,backdrop-filter .4s,border-color .4s;border-bottom:1px solid transparent}
.hdr.scrolled{background:rgba(7,24,29,.72);backdrop-filter:blur(14px);border-color:rgba(255,255,255,.08)}
.hdr .wrap{height:76px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.logo{display:flex;align-items:center;gap:12px;cursor:pointer;background:none;border:0;color:var(--porcelain);text-align:left}
.logo-mark{width:40px;height:40px;border-radius:11px;background:linear-gradient(135deg,var(--klinik),var(--teal));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;font-family:'Bricolage Grotesque';color:#fff;box-shadow:0 0 24px rgba(23,145,155,.45)}
.logo b{display:block;font-size:14.5px;letter-spacing:.01em}
.logo span{font-size:10.5px;color:rgba(247,246,242,.6);letter-spacing:.08em;text-transform:uppercase}
.hdr-right{display:flex;align-items:center;gap:14px}
.lang{display:flex;border:1px solid rgba(255,255,255,.22);border-radius:999px;overflow:hidden}
.lang button{background:none;border:0;color:rgba(247,246,242,.65);padding:4px 12px;font-size:12px;font-weight:700;cursor:pointer}
.lang button.on{background:var(--porcelain);color:var(--ink)}
.menu-btn{display:flex;align-items:center;gap:10px;background:none;border:0;color:var(--porcelain);cursor:pointer;font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:700}
.menu-ico{width:34px;height:34px;display:flex;flex-direction:column;justify-content:center;gap:6px}
.menu-ico i{display:block;height:2px;background:var(--porcelain);border-radius:2px;transition:transform .35s,width .35s,opacity .35s}
.menu-ico i:nth-child(2){width:70%}
.menu-btn:hover .menu-ico i:nth-child(2){width:100%}

/* ---------- fullscreen menu ---------- */
.omenu{position:fixed;inset:0;z-index:70;background:radial-gradient(1200px 800px at 80% 20%,rgba(23,145,155,.22),transparent 60%),var(--ink);display:flex;flex-direction:column;opacity:0;pointer-events:none;transition:opacity .45s cubic-bezier(.4,0,.2,1)}
.omenu.open{opacity:1;pointer-events:auto}
.omenu-top{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;height:76px}
.omenu-x{background:none;border:1px solid rgba(255,255,255,.25);color:var(--porcelain);border-radius:999px;width:46px;height:46px;font-size:18px;cursor:pointer}
.omenu-x:hover{background:rgba(255,255,255,.1)}
.omenu-body{flex:1;display:flex;align-items:center}
.omenu-list{width:100%;max-width:1180px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:1.4fr 1fr;gap:40px}
@media(max-width:820px){.omenu-list{grid-template-columns:1fr;overflow-y:auto;padding-bottom:40px}}
.omenu-links a{display:flex;align-items:baseline;gap:18px;text-decoration:none;color:var(--porcelain);font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(30px,5vw,52px);letter-spacing:-.02em;padding:8px 0;opacity:0;transform:translateY(28px);transition:opacity .5s,transform .5s,color .25s}
.omenu.open .omenu-links a{opacity:1;transform:none}
.omenu-links a:hover{color:var(--glow)}
.omenu-links a .no{font-size:13px;color:var(--gold);font-family:'IBM Plex Mono';font-weight:500}
.omenu-side{align-self:center;font-size:14px;color:rgba(247,246,242,.7);opacity:0;transform:translateY(20px);transition:opacity .6s .25s,transform .6s .25s}
.omenu.open .omenu-side{opacity:1;transform:none}
.omenu-side b{color:var(--porcelain);display:block;margin-bottom:6px;font-size:12px;letter-spacing:.16em;text-transform:uppercase}
.omenu-side .blk{margin-bottom:26px}
.omenu-side .mono{color:var(--glow)}

/* ---------- scroll story (900vh, scroll = playhead, helix owns the first ~42%) ---------- */
.story{position:relative;height:900vh}
.story-stick{position:sticky;top:0;height:100vh;overflow:hidden}
.story-stick canvas{position:absolute;inset:0;display:block}

/* ---------- vital line — the page's pulse (signature) ---------- */
.vital{position:fixed;left:22px;top:0;bottom:0;width:2px;z-index:55;pointer-events:none}
.vital .track{position:absolute;inset:0;background:rgba(7,24,29,.08)}
.vital .fill{position:absolute;top:0;left:0;right:0;height:0%;background:var(--klinik)}
.vital .tip{position:absolute;left:50%;top:0;width:7px;height:7px;border-radius:50%;background:var(--klinik);transform:translate(-50%,-50%)}
.vital .tip::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:1px solid rgba(14,110,119,.35);animation:vpulse 2.4s ease-out infinite}
@keyframes vpulse{0%{transform:scale(.4);opacity:1}100%{transform:scale(1.7);opacity:0}}
@media(max-width:900px){.vital{left:10px}}





.act{position:absolute;inset:0;display:flex;align-items:center;opacity:0;pointer-events:none;will-change:opacity,transform}
.act .wrap{width:100%}
.eyebrow{font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:700;color:var(--glow);margin-bottom:20px;display:flex;align-items:center;gap:12px}
.eyebrow::before{content:"";width:44px;height:1px;background:var(--glow)}
.act h1{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(44px,8.4vw,104px);line-height:.98;letter-spacing:-.035em;max-width:11ch}
.act h1 .thin{font-weight:300;color:rgba(247,246,242,.85)}
.act h1 .accent{background:linear-gradient(100deg,var(--glow),var(--teal));-webkit-background-clip:text;background-clip:text;color:transparent}
.act p.lead{margin-top:26px;max-width:46ch;font-size:clamp(15px,1.6vw,18px);color:rgba(247,246,242,.78)}
.hero-cta{margin-top:36px;display:flex;gap:14px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:10px;border-radius:999px;padding:15px 28px;font-size:15px;font-weight:700;cursor:pointer;border:0;transition:transform .2s,box-shadow .2s,background .2s;text-decoration:none}
.btn.pri{background:var(--porcelain);color:var(--ink)}
.feature .btn.pri{background:var(--ink);color:var(--porcelain)}
.feature .btn.pri:hover{box-shadow:0 14px 30px rgba(10,42,49,.22)}
.feature .btn.gho{color:var(--deep);border-color:rgba(10,42,49,.3)}
.feature .btn.gho:hover{border-color:var(--klinik);color:var(--klinik)}
.btn.pri:hover{transform:translateY(-2px);box-shadow:0 14px 34px rgba(95,212,207,.28)}
.btn.gho{background:transparent;color:var(--porcelain);border:1px solid rgba(255,255,255,.35)}
.btn.gho:hover{border-color:var(--glow);color:var(--glow)}
.scroll-hint{position:absolute;bottom:34px;left:50%;transform:translateX(-50%);font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:rgba(247,246,242,.55);display:flex;flex-direction:column;align-items:center;gap:10px}
.scroll-hint i{width:1px;height:44px;background:linear-gradient(to bottom,var(--glow),transparent);display:block;animation:drip 2s ease-in-out infinite}
@keyframes drip{0%{transform:scaleY(0);transform-origin:top}55%{transform:scaleY(1);transform-origin:top}56%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
.statement{font-family:'Bricolage Grotesque';font-weight:600;font-size:clamp(26px,4.2vw,50px);line-height:1.2;letter-spacing:-.02em;max-width:22ch;color:var(--porcelain)}
.statement em{font-style:normal;color:var(--glow)}
.statement .gold{font-style:normal;color:var(--gold)}
.act .sub{margin-top:18px;font-size:15px;color:rgba(247,246,242,.65);max-width:44ch}
.story-dots{position:absolute;right:26px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:12px}
.story-dots i{width:6px;height:6px;border-radius:50%;background:rgba(247,246,242,.25);transition:background .3s,height .3s;display:block}
.story-dots i.on{background:var(--glow);height:22px;border-radius:4px}
@media(max-width:700px){.story-dots{right:14px}}

/* ---------- light body — porcelain with atmosphere ---------- */
.body-light{background:var(--porcelain);color:var(--deep);position:relative;z-index:5}
.body-light::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:.4;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E")}
.body-light::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(1000px 700px at 85% 12%,rgba(168,129,79,.04),transparent 60%)}
.body-light>*{position:relative;z-index:1}
.sec{padding:120px 0;position:relative}
.sec-head{margin-bottom:64px;max-width:780px;position:relative}
.ghost{position:absolute;top:-70px;left:-14px;font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(120px,17vw,220px);line-height:1;letter-spacing:-.04em;color:transparent;-webkit-text-stroke:1px rgba(168,129,79,.14);pointer-events:none;user-select:none;z-index:0}
.sec-head>*{position:relative;z-index:1}
.sec-head h2{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(34px,5vw,60px);letter-spacing:-.03em;line-height:1.03;color:var(--deep)}
.sec-head p{margin-top:18px;color:var(--muted);font-size:17px;max-width:56ch}

/* ---------- quiet stats — ink numerals on porcelain, hairlines, no ornament ---------- */
.bigstat{padding:56px 52px;border-top:1px solid var(--line);position:relative}
.bigstat:nth-child(odd){border-right:1px solid var(--line)}
@media(max-width:820px){.bigstat:nth-child(odd){border-right:0}.bigstat{padding:42px 6px}}
.bigstat .n{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(74px,9.5vw,140px);line-height:.95;letter-spacing:-.045em;color:var(--deep)}
.bigstat .n small{font-size:.3em;color:var(--bronze);vertical-align:super;letter-spacing:0;font-weight:500}
.bigstat .l{margin-top:16px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:14px;font-weight:500}
.bigstat .l::before{content:"";width:30px;height:1px;background:var(--bronze)}

/* departments — scanner version defined above */

/* ---------- Sprechstunden — departure board ---------- */
.board{background:var(--cream);border:1px solid var(--line);border-radius:20px;overflow:hidden;position:relative}
.board-head{display:grid;grid-template-columns:1fr auto auto;gap:18px;padding:18px 32px;font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--line);font-weight:500}
.board-row{display:grid;grid-template-columns:1fr auto auto;gap:18px;align-items:center;padding:21px 32px;border-top:1px solid var(--line);font-size:15px;position:relative;transition:background .25s}
.board-row:first-of-type{border-top:0}
.board-row:hover{background:rgba(168,129,79,.05)}
.board-row b{font-weight:500;color:var(--deep);letter-spacing:.01em}
.board-row .mono{color:var(--klinik);font-weight:600;font-size:13.5px;white-space:nowrap}
.board-row .day{font-size:12px;color:var(--muted);white-space:nowrap;letter-spacing:.08em;text-transform:uppercase}
@media(max-width:640px){.board-row,.board-head{grid-template-columns:1fr;gap:4px;padding:16px 20px}}

/* ---------- news — editorial ---------- */
.ngrid{display:grid;grid-template-columns:1.25fr 1fr;gap:0;border-top:1px solid var(--line)}
@media(max-width:880px){.ngrid{grid-template-columns:1fr}}
.nfeat{padding:44px 44px 44px 0;border-right:1px solid var(--line)}
@media(max-width:880px){.nfeat{border-right:0;padding:36px 0;border-bottom:1px solid var(--line)}}
.nfeat .date{font-family:'IBM Plex Mono';font-size:12px;color:var(--bronze)}
.nfeat h3{margin-top:16px;font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(26px,3.4vw,40px);letter-spacing:-.025em;line-height:1.08;color:var(--deep)}
.nfeat p{margin-top:16px;font-size:15.5px;color:var(--muted);max-width:50ch}
.nfeat .more{margin-top:22px;display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:14px;color:var(--klinik)}
.nside{display:flex;flex-direction:column}
.nitem{padding:30px 0 30px 44px;border-top:1px solid var(--line);transition:padding .3s}
.nitem:first-child{border-top:0}
.nitem:hover{padding-left:52px}
@media(max-width:880px){.nitem{padding-left:0}.nitem:hover{padding-left:8px}}
.nitem .date{font-family:'IBM Plex Mono';font-size:11.5px;color:var(--bronze)}
.nitem b{display:block;margin-top:8px;font-family:'Bricolage Grotesque';font-weight:700;font-size:18px;letter-spacing:-.015em;line-height:1.25;color:var(--deep)}
.nitem p{margin-top:6px;font-size:13.5px;color:var(--muted)}
.kicker{font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:700;color:var(--klinik);margin-bottom:16px;display:flex;align-items:center;gap:12px}
.kicker::before{content:"";width:36px;height:1px;background:var(--klinik)}

/* reveal */
.rv.d1{transition-delay:.08s}.rv.d2{transition-delay:.16s}.rv.d3{transition-delay:.24s}.rv.d4{transition-delay:.32s}

/* ---------- reveals: soft blur-to-sharp (perceived smoothness) ---------- */
.rv{opacity:0;transform:translateY(30px);filter:blur(7px);transition:opacity 1s cubic-bezier(.2,.6,.2,1),transform 1s cubic-bezier(.2,.6,.2,1),filter 1s cubic-bezier(.2,.6,.2,1)}
.rv.in{opacity:1;transform:none;filter:blur(0)}

/* ---------- chapter 01 — horizontal number journey ---------- */
.numsec{position:relative;height:320vh;background:var(--porcelain);color:var(--deep);z-index:5;border-radius:34px 34px 0 0;box-shadow:0 -30px 80px rgba(0,0,0,.5)}
.numstick{position:sticky;top:0;height:100vh;overflow:clip;display:flex;flex-direction:column;justify-content:center}
.numhead{width:100%;margin-bottom:6vh}
.numtitle{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(26px,3.6vw,44px);letter-spacing:-.025em;color:var(--deep)}
.numtrack{display:flex;align-items:stretch;gap:0;width:max-content;will-change:transform;padding-left:max(24px,calc((100vw - 1180px)/2 + 24px))}
.numcell{width:min(78vw,760px);flex:none;border-left:1px solid var(--line);padding:2vh 56px 0 44px;position:relative;display:flex;flex-direction:column;justify-content:flex-start}
.numcell .bigstat{border:0;padding:0}
.numidx{position:absolute;bottom:2vh;left:44px;font-size:11px;letter-spacing:.3em;color:rgba(168,129,79,.55)}
.numend{width:min(60vw,560px);justify-content:center}
.numclose{font-family:'Bricolage Grotesque';font-weight:600;font-size:clamp(22px,3vw,36px);letter-spacing:-.02em;color:var(--deep);max-width:14ch}
@media(max-width:700px){.numcell{width:86vw;padding:2vh 28px 0 24px}.numidx{left:24px}}

/* ---------- chapter 02 — typographic index ---------- */
.index{border-top:1px solid var(--line)}
.ixrow{display:grid;grid-template-columns:70px 1fr auto;align-items:center;gap:26px;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid var(--line);padding:30px 4px;cursor:pointer;color:var(--deep)}
.ixno{font-size:12px;color:rgba(168,129,79,.6);letter-spacing:.06em}
.ixname{position:relative;min-width:0}
.ixname b{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(20px,2.8vw,30px);letter-spacing:-.02em;display:inline-block;transition:transform .5s cubic-bezier(.2,.6,.2,1)}
.ixname i{display:block;font-style:normal;font-size:13px;color:var(--muted);margin-top:4px;opacity:.85}
.ixname::after{content:"";position:absolute;left:0;bottom:-8px;height:1px;width:100%;background:var(--klinik);transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.2,.6,.2,1)}
.ixrow:hover .ixname b{transform:translateX(14px)}
.ixrow:hover .ixname::after{transform:scaleX(1)}
.ixarr{font-size:20px;color:var(--klinik);opacity:0;transform:translateX(-10px);transition:opacity .4s,transform .4s}
.ixrow:hover .ixarr{opacity:1;transform:none}
.ixrow.hl .ixname b{color:var(--klinik)}
.ixrow.hl .ixno{color:var(--bronze)}
@media(max-width:640px){.ixrow{grid-template-columns:44px 1fr auto;gap:14px;padding:22px 2px}}

/* ---------- sticky split system (chapters 03/04) ---------- */
.chapter{background:var(--sand);position:relative;z-index:5;padding:120px 0}
.split{display:grid;grid-template-columns:1fr 1.1fr;gap:72px;align-items:start}
@media(max-width:900px){.split{grid-template-columns:1fr;gap:36px}}
.split-pin{position:sticky;top:120px}
@media(max-width:900px){.split-pin{position:static}}
.split-h{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(28px,3.8vw,46px);letter-spacing:-.028em;line-height:1.06;color:var(--deep)}
.split-h em{font-style:normal;color:var(--klinik)}
.split-h2{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(26px,3.4vw,40px);letter-spacing:-.026em;line-height:1.08;color:var(--deep)}
.split-p{margin-top:18px;color:var(--muted);max-width:44ch;font-size:16px}
.contactline{margin-top:22px;font-size:13px;color:var(--klinik);line-height:1.9}
.split-r{display:flex;flex-direction:column;gap:16px}
.qcard2{background:rgba(255,255,255,.72);border:1px solid rgba(168,129,79,.2);border-radius:18px;padding:26px 28px;transition:transform .5s cubic-bezier(.2,.6,.2,1),border-color .4s}
.qcard2:hover{transform:translateX(8px);border-color:var(--bronze)}
.qcard2 b{font-family:'Bricolage Grotesque';font-weight:700;font-size:17.5px;letter-spacing:-.01em;color:var(--deep);display:block}
.qcard2 span{display:block;margin-top:8px;font-size:14px;color:var(--muted);line-height:1.6}
.qcard2.hl{background:var(--paper);border-color:rgba(168,129,79,.45)}
.qcard2.hl b{color:var(--klinik)}
.ctarow{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.ctarow.center{justify-content:center;margin-top:34px}
.btn.ink{background:var(--ink);color:var(--porcelain)}
.btn.ink:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(10,42,49,.2)}
.btn.line{background:transparent;color:var(--deep);border:1px solid rgba(10,42,49,.28)}
.btn.line:hover{border-color:var(--klinik);color:var(--klinik)}

/* ---------- chapter 06 — curtains ---------- */
.cphoto{margin:-34px -34px 22px;border-radius:19px 19px 0 0;overflow:hidden;aspect-ratio:16/9;position:relative}
.cphoto img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.82) contrast(1.02);transform:scale(1.01);transition:transform 1.2s cubic-bezier(.2,.6,.2,1)}
.curtain:hover .cphoto img{transform:scale(1.06)}
.cphoto::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(239,233,223,.28),transparent 45%)}
.curtains{display:flex;gap:14px;min-height:380px}
.curtain{flex:1;background:var(--cream);border:1px solid var(--line);border-radius:20px;padding:34px;display:flex;flex-direction:column;justify-content:space-between;transition:flex .8s cubic-bezier(.2,.6,.2,1),background .5s,border-color .5s;min-width:0}
.curtain:hover{flex:1.9;background:var(--paper);border-color:rgba(168,129,79,.35)}
.ctop{display:flex;align-items:baseline;gap:16px}
.cno{font-size:11px;letter-spacing:.28em;color:rgba(168,129,79,.6)}
.curtain h4{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(20px,2.4vw,28px);letter-spacing:-.02em;color:var(--deep)}
.cbody p{margin-top:14px;font-size:14px;color:var(--muted);line-height:1.65}
.cbody .mono{font-size:12.5px;color:var(--klinik);line-height:1.8}
@media(max-width:760px){.curtains{flex-direction:column}.curtain:hover{flex:1}}

/* ---------- closing statement ---------- */
.closing{padding:130px 0 150px;text-align:center}
.close-line{font-family:'Bricolage Grotesque';font-weight:600;font-size:clamp(24px,3.6vw,42px);letter-spacing:-.024em;line-height:1.25;color:var(--deep);max-width:26ch;margin:0 auto}
.close-line em{font-style:normal;color:var(--bronze)}

/* departments — scanner version defined above */

.pill{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(168,129,79,.4);border-radius:999px;padding:6px 14px;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;color:var(--bronze);margin-bottom:20px}

/* sprechstunden ticker-style board */



/* footer */
.foot{background:var(--ink);color:rgba(247,246,242,.65);position:relative;z-index:5}
.foot .wrap{padding:70px 24px 34px}
.foot-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:34px;padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,.1)}
@media(max-width:760px){.foot-grid{grid-template-columns:1fr}}
.foot h5{font-family:'Bricolage Grotesque';color:var(--porcelain);font-size:22px;font-weight:800;letter-spacing:-.02em;margin-bottom:12px}
.foot b{display:block;color:var(--porcelain);font-size:12px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:12px}
.foot a{display:block;color:rgba(247,246,242,.65);text-decoration:none;font-size:14px;padding:3px 0}
.foot a:hover{color:var(--glow)}
.foot .legal{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;padding-top:22px;font-size:12.5px}

/* chat */
.fab{position:fixed;right:22px;bottom:22px;z-index:90;background:linear-gradient(135deg,var(--klinik),var(--teal));color:#fff;border:0;border-radius:999px;padding:15px 22px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 16px 40px rgba(23,145,155,.5);display:flex;align-items:center;gap:10px;transition:transform .2s}
.fab:hover{transform:translateY(-3px)}
.chat{position:fixed;right:22px;bottom:22px;z-index:95;width:min(400px,calc(100vw - 24px));height:min(600px,calc(100vh - 90px));background:var(--paper);border-radius:22px;box-shadow:0 30px 80px rgba(0,0,0,.4);display:flex;flex-direction:column;overflow:hidden;color:var(--deep)}
.chat-h{background:linear-gradient(135deg,var(--deep),var(--klinik));color:#fff;padding:15px 18px;display:flex;justify-content:space-between;align-items:center}
.chat-h b{font-size:15px}.chat-h span{display:block;font-size:11px;color:rgba(255,255,255,.75)}
.chat-h button{background:rgba(255,255,255,.18);border:0;color:#fff;border-radius:9px;width:30px;height:30px;cursor:pointer}
.chat-b{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:var(--porcelain)}
.msg{max-width:86%;padding:11px 14px;border-radius:15px;font-size:14px;white-space:pre-wrap;line-height:1.5}
.msg.u{align-self:flex-end;background:var(--klinik);color:#fff;border-bottom-right-radius:4px}
.msg.a{align-self:flex-start;background:var(--paper);border:1px solid var(--line);border-bottom-left-radius:4px}
.msg.e{align-self:stretch;background:#FBE9E6;border:1px solid #E4B2AA;color:#7A2419;border-radius:13px}
.chips{display:flex;gap:6px;flex-wrap:wrap;padding:0 14px 8px;background:var(--porcelain)}
.chips button{background:var(--paper);border:1px solid var(--line);border-radius:999px;padding:6px 12px;font-size:12.5px;color:var(--klinik);font-weight:600;cursor:pointer}
.chat-f{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line);background:var(--paper)}
.chat-f input{flex:1;border:1px solid var(--line);border-radius:11px;padding:11px 13px;font-size:14px;font-family:inherit;outline:none;background:var(--porcelain);color:var(--deep)}
.chat-f input:focus{border-color:var(--klinik)}
.chat-f button{background:var(--klinik);color:#fff;border:0;border-radius:11px;padding:0 16px;font-weight:700;cursor:pointer}
.chat-note{font-size:10.5px;color:var(--muted);text-align:center;padding:0 12px 10px;background:var(--paper)}
.typing{align-self:flex-start;color:var(--muted);font-size:13px;padding:4px}
.demochip{position:fixed;left:18px;bottom:18px;z-index:80;background:rgba(7,24,29,.85);backdrop-filter:blur(6px);color:rgba(247,246,242,.8);font-size:11px;padding:7px 13px;border-radius:999px;border:1px solid rgba(255,255,255,.14);letter-spacing:.06em}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}.rv{opacity:1;transform:none}}
`;

/* Standort-Foto Klinikum Erding (Demo-Platzhalter, eingebettet) */
const IMG_ERDING = "data:image/jpeg;base64,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";

const IMG_DORFEN = "data:image/jpeg;base64,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";

/* ------------------ i18n ------------------ */
const T = {
  de: {
    sub: "Lehrkrankenhaus der TU München",
    menu: "Menü",
    heroTitle1: "Medizin,", heroTitle2: "die bei Ihnen", heroTitle3: "bleibt.",
    heroText: "330 Betten. 11 Fachabteilungen. Über 1.000 Menschen, die an 365 Tagen für den Landkreis Erding da sind — Spitzenmedizin, ganz nah.",
    cta1: "Abteilung finden", cta2: "Notfall-Informationen",
    scroll: "Scrollen",
    statement: ["Jede Behandlung beginnt mit ", "Vertrauen", ". Wir bauen es — Tag für Tag, Patientin für Patient."],
    statsK: "Das Klinikum in Zahlen",
    statsH: "Verlässlichkeit, messbar gemacht.",
    stats: [["330", "", "stationäre Betten"], ["600", "≈", "Geburten pro Jahr"], ["1000", "+", "Mitarbeitende"], ["365", "", "Tage rund um die Uhr"]],
    deptK: "Behandlungsangebot",
    deptH: "Elf Wege zur richtigen Hilfe.",
    deptP: "Von der Notaufnahme bis zur zertifizierten Onkologie — interdisziplinär vernetzt an zwei Standorten in Erding und Dorfen.",
    gynPill: "Im Fokus · Frauenklinik",
    gynH: ["Wo ", "neues Leben", " beginnt — und Frauen in jeder Lage die beste Medizin finden."],
    gynP: "Rund 600 Geburten im Jahr, ein zertifiziertes Brustzentrum in Kooperation mit dem Klinikum rechts der Isar der TU München, moderne minimalinvasive Chirurgie — und ab Sommer 2028 eine Kinderklinik direkt am Haus.",
    boardK: "Sprechstunden Gynäkologie",
    boardH: "Direkter Zugang, klare Zeiten.",
    boardP: "Terminvereinbarung über das Sekretariat: 08122 59-1648 · sekretariat.gynaekologie@klinikum-erding.de",
    newsK: "Aktuelles",
    newsH: "Was uns gerade bewegt.",
    locK: "Standorte",
    locH: "Zwei Häuser. Ein Anspruch.",
    footNote: "Konzeptstudie — nicht die offizielle Website des Klinikums Landkreis Erding.",
    openChat: "Digitaler Empfang",
  },
  en: {
    sub: "Teaching hospital of TU Munich",
    menu: "Menu",
    heroTitle1: "Medicine", heroTitle2: "that stays", heroTitle3: "close.",
    heroText: "330 beds. 11 departments. Over 1,000 people caring for the district of Erding, 365 days a year — excellent medicine, close to home.",
    cta1: "Find a department", cta2: "Emergency information",
    scroll: "Scroll",
    statement: ["Every treatment begins with ", "trust", ". We build it — day by day, patient by patient."],
    statsK: "The hospital in numbers",
    statsH: "Reliability, made measurable.",
    stats: [["330", "", "inpatient beds"], ["600", "≈", "births per year"], ["1000", "+", "employees"], ["365", "", "days around the clock"]],
    deptK: "Medical services",
    deptH: "Eleven paths to the right care.",
    deptP: "From the emergency room to certified oncology — connected across two sites in Erding and Dorfen.",
    gynPill: "In focus · Women's clinic",
    gynH: ["Where ", "new life", " begins — and women find the best medicine at every stage."],
    gynP: "Around 600 births a year, a certified breast center in cooperation with Klinikum rechts der Isar (TU Munich), modern minimally invasive surgery — and from summer 2028, a children's clinic right next door.",
    boardK: "Gynecology consultation hours",
    boardH: "Direct access, clear times.",
    boardP: "Appointments via the department office: +49 8122 59-1648 · sekretariat.gynaekologie@klinikum-erding.de",
    newsK: "News",
    newsH: "What moves us right now.",
    locK: "Locations",
    locH: "Two houses. One standard.",
    footNote: "Concept study — not the official website of Klinikum Landkreis Erding.",
    openChat: "Digital reception",
  },
};

const DEPTS = [
  { hl: true, de: ["Gynäkologie & Geburtshilfe", "Zertifiziertes Brustzentrum · ≈600 Geburten/Jahr"], en: ["Gynecology & Obstetrics", "Certified breast center · ≈600 births/year"] },
  { de: ["Notaufnahme", "Rund um die Uhr, 365 Tage"], en: ["Emergency Department", "Around the clock, 365 days"] },
  { de: ["Kardiologie & Pneumologie", "Herzkatheterlabor · Pneumozentrum"], en: ["Cardiology & Pulmonology", "Cath lab · lung center"] },
  { de: ["Gastroenterologie / Hepatologie", "Endoskopie · zertifiziertes Darmzentrum"], en: ["Gastroenterology / Hepatology", "Endoscopy · certified colorectal center"] },
  { de: ["Unfallchirurgie & Orthopädie", "Regionales Traumazentrum · Endoprothetik"], en: ["Trauma Surgery & Orthopedics", "Regional trauma center · joint replacement"] },
  { de: ["Allgemein-, Viszeral- & Thoraxchirurgie", "Robotik-Chirurgie mit dem Dexter-System"], en: ["General, Visceral & Thoracic Surgery", "Robotic surgery with the Dexter system"] },
  { de: ["Gefäßchirurgie", "Gefäßzentrum von Kopf bis Fuß"], en: ["Vascular Surgery", "Vascular center, head to toe"] },
  { de: ["Urologie", "Hauptabteilung seit 2021"], en: ["Urology", "Main department since 2021"] },
  { de: ["Geriatrie", "Altersmedizin, ganzheitlich gedacht"], en: ["Geriatrics", "Holistic medicine for older patients"] },
  { de: ["Schmerztherapie Dorfen", "Tagesklinik mit 12 Plätzen"], en: ["Pain Therapy Dorfen", "Day clinic with 12 places"] },
  { de: ["Anästhesie & Intensivmedizin", "Intensiv- & Intermediate Care"], en: ["Anesthesia & Intensive Care", "ICU & intermediate care"] },
];

const SPRECH = [
  { de: "Allgemeine Gynäkologische Sprechstunde", en: "General gynecological consultation", day: { de: "Donnerstag", en: "Thursday" }, time: "08:30–12:00" },
  { de: "Brustsprechstunde", en: "Breast consultation", day: { de: "Dienstag", en: "Tuesday" }, time: "09:00–13:00" },
  { de: "Laparoskopie & Endometriose", en: "Laparoscopy & endometriosis", day: { de: "Dienstag", en: "Tuesday" }, time: "10:00–13:00" },
  { de: "Urologisch-gynäkologische Sprechstunde", en: "Uro-gynecological consultation", day: { de: "Freitag", en: "Friday" }, time: "09:00–12:00" },
  { de: "Vulva- & Dysplasiesprechstunde", en: "Vulva & dysplasia clinic", day: { de: "Mittwoch", en: "Wednesday" }, time: "09:00–12:00" },
  { de: "Vorstellung zur Geburtsplanung", en: "Birth planning consultation", day: { de: "Di & Do", en: "Tue & Thu" }, time: "08:00–14:00" },
  { de: "Wachstumskontrollen", en: "Growth monitoring", day: { de: "Mittwoch", en: "Wednesday" }, time: "11:30–14:00" },
];

const NEWS = [
  { d: "10 · 07 · 2026", de: ["Grünes Licht für die Kinderklinik: Eröffnung Sommer 2028", "Das Bayerische Gesundheitsministerium ebnet den Weg — Kinder- und Jugendversorgung direkt am Klinikum."], en: ["Green light for the children's clinic: opening summer 2028", "The Bavarian Ministry of Health clears the way — pediatric care directly at the Klinikum."] },
  { d: "08 · 06 · 2026", de: ["Weltpremiere: robotischer Nebennieren-Eingriff mit Dexter", "Unserem chirurgischen Team gelang weltweit erstmals die robotisch-assistierte Entfernung einer Nebenniere."], en: ["World first: robotic adrenal surgery with Dexter", "Our surgical team performed the world's first robot-assisted removal of an adrenal gland."] },
  { d: "22 · 05 · 2026", de: ["Babyboom: Sieben Geburten in 26 Stunden", "Die Geburtshilfe begrüßte sieben Neugeborene an einem Wochenende — Erding bleibt erste Adresse für werdende Eltern."], en: ["Baby boom: seven births in 26 hours", "Obstetrics welcomed seven newborns in one weekend — Erding remains the first choice for expectant parents."] },
];

/* ------------------ AI receptionist ------------------ */
const SYS_PROMPT = `Du bist „Klara", die digitale Empfangsassistenz des Klinikums Landkreis Erding (Demo-Konzept). Regeln, in dieser Reihenfolge:
1. NOTFÄLLE: Bei Hinweisen auf einen medizinischen Notfall antworte AUSSCHLIESSLICH: sofort 112 anrufen oder die Notaufnahme aufsuchen. Keine weiteren Ratschläge.
2. KEINE medizinische Beratung, Diagnose oder Therapieempfehlung — freundlich an Ärztin/Arzt bzw. die passende Sprechstunde verweisen.
3. Antworte NUR auf Basis der Wissensbasis; Unbekanntes ehrlich sagen und an die Zentrale 08122 59-0 verweisen.
4. Sprache des Nutzers spiegeln (Deutsch/Englisch). Kurz, freundlich, konkret — max. 4 Sätze. Nummern und Zeiten exakt.
5. Du bist eine KI und sagst das auf Nachfrage offen.
WISSENSBASIS: Klinikum Landkreis Erding, Bajuwarenstraße 5, 85435 Erding, Zentrale 08122 59-0. Kommunales Krankenhaus (Träger: Landkreis Erding), Lehrkrankenhaus der TU München, 330 Betten, zwei Standorte (Erding, Dorfen). Gynäkologie & Geburtshilfe: Sekretariat Anja Schrath, Tel. 08122 59-1648, sekretariat.gynaekologie@klinikum-erding.de; zertifiziertes Brustzentrum (Kooperation Klinikum rechts der Isar); ≈600 Geburten/Jahr; Kontinenz- & Beckenbodenzentrum. Sprechstunden: Allgemein Do 08:30–12:00 · Brust Di 09:00–13:00 · Laparoskopie/Endometriose Di 10:00–13:00 · Urogynäkologie Fr 09:00–12:00 · Vulva/Dysplasie Mi 09:00–12:00 · Geburtsplanung Di & Do 08:00–14:00 · Wachstumskontrollen Mi 11:30–14:00 · Tumorgenetik nach tel. Vereinbarung. Geburtsanmeldung über Sekretariat oder Sprechstunde Di/Do. Infoabend für werdende Eltern: jeden ersten Mittwoch im Monat. Kinderklinik am Klinikum eröffnet Sommer 2028. Andere Abteilungen/Besuchszeiten: an Zentrale 08122 59-0 verweisen.`;

const EMERGENCY_RE = /(notfall|herzinfarkt|brustschmerz|atemnot|bewusstlos|ohnmächtig|schlaganfall|stroke|starke blutung|heavy bleeding|unconscious|chest pain|can'?t breathe|suizid|suicide)/i;
const FALLBACK = {
  de: "Ich kann gerade keine Live-Verbindung aufbauen. Zentrale: 08122 59-0 · Sekretariat Gynäkologie: 08122 59-1648.",
  en: "I can't reach the live service right now. Switchboard: +49 8122 59-0 · Gynecology office: +49 8122 59-1648.",
};

function ChatWidget({ lang }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);
  const greet = lang === "de"
    ? "Grüß Gott! Ich bin Klara, die digitale Empfangsassistenz. Ich helfe bei Sprechstunden, Kontakten und der Geburtsanmeldung. Im Notfall wählen Sie bitte sofort die 112."
    : "Hello! I'm Klara, the digital reception assistant. I can help with consultation hours, contacts and birth registration. In an emergency, please call 112 immediately.";
  useEffect(() => { if (open && msgs.length === 0) setMsgs([{ role: "assistant", content: greet }]); }, [open]);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs, busy]);
  const chips = lang === "de"
    ? ["Wann ist die Brustsprechstunde?", "Geburt anmelden", "Telefon Gynäkologie"]
    : ["Breast clinic hours?", "Register a birth", "Gynecology phone"];

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setInput("");
    const next = [...msgs, { role: "user", content }];
    setMsgs(next);
    if (EMERGENCY_RE.test(content)) {
      setMsgs([...next, { role: "assistant", emergency: true, content: lang === "de"
        ? "⚠️ Das klingt nach einem möglichen Notfall. Bitte rufen Sie sofort die 112 an oder kommen Sie direkt in unsere Notaufnahme (rund um die Uhr, Bajuwarenstraße 5, Erding)."
        : "⚠️ This sounds like a possible emergency. Please call 112 immediately or come directly to our emergency department (24/7, Bajuwarenstraße 5, Erding)." }]);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS_PROMPT,
          messages: next.filter(m => !m.emergency).map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
      setMsgs(m => [...m, { role: "assistant", content: reply || FALLBACK[lang] }]);
    } catch { setMsgs(m => [...m, { role: "assistant", content: FALLBACK[lang] }]); }
    finally { setBusy(false); }
  }

  if (!open) return <button className="fab" onClick={() => setOpen(true)}>💬 {T[lang].openChat}</button>;
  return (
    <div className="chat" role="dialog" aria-label="Digitaler Empfang">
      <div className="chat-h">
        <div><b>Klara · {lang === "de" ? "Digitaler Empfang" : "Digital reception"}</b>
          <span>{lang === "de" ? "KI-Assistenz · keine medizinische Beratung" : "AI assistant · no medical advice"}</span></div>
        <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
      </div>
      <div className="chat-b" ref={bodyRef}>
        {msgs.map((m, i) => <div key={i} className={`msg ${m.emergency ? "e" : m.role === "user" ? "u" : "a"}`}>{m.content}</div>)}
        {busy && <div className="typing">{lang === "de" ? "Klara schreibt …" : "Klara is typing …"}</div>}
      </div>
      <div className="chips">{chips.map(c => <button key={c} onClick={() => send(c)}>{c}</button>)}</div>
      <div className="chat-f">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder={lang === "de" ? "Ihre Frage …" : "Your question …"} aria-label="Message" />
        <button onClick={() => send()}>➤</button>
      </div>
      <div className="chat-note">{lang === "de" ? "Demo · Notfall: 112 · Zentrale: 08122 59-0" : "Demo · Emergency: 112 · Switchboard: +49 8122 59-0"}</div>
    </div>
  );
}

/* ------------------ 3D helix hero ------------------ */
/* ------------------ scroll-story 3D stage ------------------ */
/* One particle system, five keyframed shapes. Scroll = the playhead:
   helix (wide) → helix (traveled down the strand, closer) → ECG heartbeat → cell (new life) → core (one Klinikum) */
const N_PARTICLES = 2400;

function buildHelix(phaseShift, yShift, radius) {
  const out = new Float32Array(N_PARTICLES * 3);
  const TURNS = 5.5, HEIGHT = 42; // tall strand — enough material for a long descent
  for (let i = 0; i < N_PARTICLES; i++) {
    const k = i * 3;
    const r = (i * 2654435761 % 1000) / 1000; // deterministic so both helix frames pair particle-for-particle
    const t = ((i * 7919) % N_PARTICLES) / N_PARTICLES;
    const jx = (((i * 104729) % 100) / 100 - 0.5) * 0.14;
    const jz = (((i * 224737) % 100) / 100 - 0.5) * 0.14;
    if (r < 0.84) {
      const strand = r < 0.42 ? 0 : Math.PI;
      const ang = t * Math.PI * 2 * TURNS + strand + phaseShift;
      out[k] = Math.cos(ang) * radius + jx;
      out[k + 1] = (t - 0.5) * HEIGHT + yShift;
      out[k + 2] = Math.sin(ang) * radius + jz;
    } else {
      const tt = Math.floor(t * 46) / 46;
      const ang = tt * Math.PI * 2 * TURNS + phaseShift;
      const s = (r - 0.84) / 0.16 * 2 - 1;
      out[k] = Math.cos(ang) * radius * s;
      out[k + 1] = (tt - 0.5) * HEIGHT + yShift;
      out[k + 2] = Math.sin(ang) * radius * s;
    }
  }
  return out;
}

function buildShapes() {
  // Acts 0+1: the same strand, but the second frame is phase-rotated and lifted —
  // morphing between them reads as the camera travelling DOWN the DNA.
  const helixA = buildHelix(0, 0, 2.1);
  const helixB = buildHelix(Math.PI * 2.2, 9.5, 2.5);

  const ecg = new Float32Array(N_PARTICLES * 3);
  const cell = new Float32Array(N_PARTICLES * 3);
  const core = new Float32Array(N_PARTICLES * 3);

  // ECG heartbeat line (two PQRST pulses across the screen)
  const pulse = (u) => {
    if (u < 0.14) return Math.sin(u / 0.14 * Math.PI) * 0.32;
    if (u < 0.22) return 0;
    if (u < 0.26) return -((u - 0.22) / 0.04) * 0.5;
    if (u < 0.32) return -0.5 + ((u - 0.26) / 0.06) * 3.4;
    if (u < 0.38) return 2.9 - ((u - 0.32) / 0.06) * 3.7;
    if (u < 0.46) return -0.8 + ((u - 0.38) / 0.08) * 0.8;
    if (u < 0.72) return Math.sin((u - 0.46) / 0.26 * Math.PI) * 0.6;
    return 0;
  };
  for (let i = 0; i < N_PARTICLES; i++) {
    const k = i * 3;
    const t = i / N_PARTICLES;
    const x = (t - 0.5) * 19;
    const beat = (t * 2) % 1;
    ecg[k] = x + (Math.random() - 0.5) * 0.05;
    ecg[k + 1] = pulse(beat) * 1.6 + (Math.random() - 0.5) * 0.16;
    ecg[k + 2] = (Math.random() - 0.5) * 0.5;
  }

  // Cell: fibonacci-sphere membrane + dense nucleus
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N_PARTICLES; i++) {
    const k = i * 3;
    if (i % 5 === 0) {
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      const rr = 1.05 * Math.cbrt(Math.random());
      cell[k] = rr * Math.sin(ph) * Math.cos(th);
      cell[k + 1] = rr * Math.sin(ph) * Math.sin(th);
      cell[k + 2] = rr * Math.cos(ph);
    } else {
      const y = 1 - (i / (N_PARTICLES - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = GA * i;
      const R = 3.3 + (Math.random() - 0.5) * 0.12;
      cell[k] = Math.cos(th) * rad * R;
      cell[k + 1] = y * R;
      cell[k + 2] = Math.sin(th) * rad * R;
    }
  }

  // Core: dense glowing gaussian ball
  for (let i = 0; i < N_PARTICLES; i++) {
    const k = i * 3;
    const g = () => (Math.random() + Math.random() + Math.random() - 1.5) * 0.75;
    core[k] = g(); core[k + 1] = g(); core[k + 2] = g();
  }

  return [helixA, helixB, ecg, cell, core];
}

const smooth = (x) => x * x * (3 - 2 * x);
/* Non-uniform act timing: the helix descent owns the first 42% of the story. */
const KEYTIMES = [0, 0.42, 0.62, 0.80, 1];
function segFromProg(prog) {
  for (let i = 0; i < KEYTIMES.length - 1; i++) {
    if (prog <= KEYTIMES[i + 1] || i === KEYTIMES.length - 2) {
      const local = (prog - KEYTIMES[i]) / (KEYTIMES[i + 1] - KEYTIMES[i]);
      return i + Math.min(Math.max(local, 0), 0.9999);
    }
  }
  return KEYTIMES.length - 2 + 0.9999;
}
const ACT_COLORS = [
  [0x5f / 255, 0xd4 / 255, 0xcf / 255],  // helix wide — teal
  [0x8f / 255, 0xe0 / 255, 0xdb / 255],  // helix traveled — lighter teal
  [0xf7 / 255, 0xf6 / 255, 0xf2 / 255],  // ECG — porcelain
  [0xc9 / 255, 0x96 / 255, 0x4b / 255],  // cell — gold
  [0x5f / 255, 0xd4 / 255, 0xcf / 255],  // core — teal
];
const CAM_Z = [14.5, 11, 14.5, 10.5, 7.5];
const CAM_Y = [0, -5.5, 0, 0, 0];         // camera dives DOWN while the helix travels
const ROT_SPEED = [0.22, 0.3, 0.015, 0.1, 0.4];
const HELIX_TRAVEL = 13;                   // cloud streams upward by this much over the helix acts → you descend the strand
const N_ACTS = 5;

function StoryStage({ lang, goto }) {
  const storyRef = useRef(null);
  const stickRef = useRef(null);
  const actRefs = useRef([]);
  const dotRefs = useRef([]);
  const t = T[lang];

  useEffect(() => {
    const stick = stickRef.current, story = storyRef.current;
    if (!stick || !story) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07181d, 0.045);
    const camera = new THREE.PerspectiveCamera(50, stick.clientWidth / stick.clientHeight, 0.1, 100);
    camera.position.set(0, 0, CAM_Z[0]);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(stick.clientWidth, stick.clientHeight);
    stick.insertBefore(renderer.domElement, stick.firstChild);

    const shapes = buildShapes();
    const geo = new THREE.BufferGeometry();
    const posArr = new Float32Array(shapes[0]); // start as helix
    geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    const mat = new THREE.PointsMaterial({ color: new THREE.Color(...ACT_COLORS[0]), size: 0.075, transparent: true, opacity: 0.95, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const cloud = new THREE.Points(geo, mat);
    cloud.rotation.z = 0.22;
    scene.add(cloud);

    // per-particle wobble phase for organic life
    const phase = new Float32Array(N_PARTICLES);
    for (let i = 0; i < N_PARTICLES; i++) phase[i] = Math.random() * Math.PI * 2;

    let mouseX = 0, mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);
    const onResize = () => {
      camera.aspect = stick.clientWidth / stick.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(stick.clientWidth, stick.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf, tPrev = 0, time = 0;
    const col = new THREE.Color();

    const animate = (tNow) => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min((tNow - tPrev) / 1000, 0.05); tPrev = tNow; time += dt;

      // scroll progress across the whole story (0..1) — this IS the playhead
      const vh = window.innerHeight;
      const total = story.offsetHeight - vh;
      const storyRect = story.getBoundingClientRect();
      const y = Math.min(Math.max(-storyRect.top, 0), total);
      const prog = total > 0 ? y / total : 0;

      // Belt & braces: if position:sticky is broken by the environment
      // (e.g. an ancestor with overflow:hidden), pin the stage manually.
      const inStory = storyRect.top <= 0 && storyRect.bottom >= vh;
      const stickRect = stick.getBoundingClientRect();
      const stickyBroken = inStory && Math.abs(stickRect.top) > 2;
      if (stickyBroken && stick.style.position !== "fixed") {
        stick.style.position = "fixed";
        stick.style.top = "0"; stick.style.left = "0"; stick.style.right = "0";
      } else if (!inStory && stick.style.position === "fixed") {
        stick.style.position = ""; stick.style.top = ""; stick.style.left = ""; stick.style.right = "";
        stick.style.transform = storyRect.top < 0 ? `translateY(${total}px)` : "";
      }

      // which two keyframes are we between? (non-uniform: helix owns the first 42%)
      const seg = segFromProg(prog);
      const idx = Math.floor(seg);
      const local = smooth(seg - idx);
      const A = shapes[idx], B = shapes[idx + 1];

      // continuous descent: during the helix acts the whole cloud streams upward
      // past the camera in proportion to scroll — you travel DOWN the strand.
      const helixT = Math.min(seg / 2, 1);           // 0..1 across both helix segments
      const streamY = smooth(helixT) * HELIX_TRAVEL * (idx <= 1 ? 1 : Math.max(1 - (seg - 2), 0));
      cloud.position.y += (streamY - cloud.position.y) * 0.08;

      // morph particles toward blended target (+ gentle wobble)
      const arr = geo.attributes.position.array;
      const wob = reduced ? 0 : 0.05;
      for (let i = 0; i < N_PARTICLES; i++) {
        const k = i * 3;
        const tx = A[k] + (B[k] - A[k]) * local;
        const ty = A[k + 1] + (B[k + 1] - A[k + 1]) * local + Math.sin(time * 1.4 + phase[i]) * wob;
        const tz = A[k + 2] + (B[k + 2] - A[k + 2]) * local;
        arr[k] += (tx - arr[k]) * 0.09;
        arr[k + 1] += (ty - arr[k + 1]) * 0.09;
        arr[k + 2] += (tz - arr[k + 2]) * 0.09;
      }
      geo.attributes.position.needsUpdate = true;

      // color grade between acts
      const cA = ACT_COLORS[idx], cB = ACT_COLORS[idx + 1];
      col.setRGB(cA[0] + (cB[0] - cA[0]) * local, cA[1] + (cB[1] - cA[1]) * local, cA[2] + (cB[2] - cA[2]) * local);
      mat.color.copy(col);

      // ECG act (now index 2) pulses like a live monitor
      const ecgW = idx === 1 ? local : idx === 2 ? 1 - local : 0;
      mat.size = 0.075 + ecgW * 0.02 * (1 + Math.sin(time * 6)) + (idx >= 3 ? local * 0.02 : 0);

      if (!reduced) {
        // camera travel (z AND y — it dives down the strand) + parallax
        const camZ = CAM_Z[idx] + (CAM_Z[idx + 1] - CAM_Z[idx]) * local;
        const camY = CAM_Y[idx] + (CAM_Y[idx + 1] - CAM_Y[idx]) * local;
        camera.position.z += (camZ - camera.position.z) * 0.06;
        camera.position.x += (mouseX * 1.1 - camera.position.x) * 0.04;
        camera.position.y += (camY - mouseY * 0.8 - camera.position.y) * 0.04;
        camera.lookAt(0, camY * 0.8, 0);
        // rotation speed eases between acts (ECG barely rotates so it stays readable)
        const rs = ROT_SPEED[idx] + (ROT_SPEED[idx + 1] - ROT_SPEED[idx]) * local;
        cloud.rotation.y += dt * rs;
        cloud.rotation.z += ((idx <= 1 ? 0.22 : 0) - cloud.rotation.z) * 0.05;
      }

      // act overlay fades + pointer-events, and progress dots — DOM writes in the same loop
      const center = seg; // 0..4
      actRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = Math.abs(center - i);
        const o = Math.max(0, 1 - d * 1.25); // wide window: no dead screens between acts
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translateY(${(center - i) * -26}px)`;
        el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      });
      dotRefs.current.forEach((el, i) => { if (el) el.classList.toggle("on", Math.round(center) === i); });

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      stick.removeChild(renderer.domElement);
      renderer.dispose(); geo.dispose(); mat.dispose();
    };
  }, []);

  const acts = lang === "de" ? [
    null, // act 0 = hero markup below
    { h: [<>Medizin auf <em>Universitätsniveau</em> — im Landkreis zuhause.</>], sub: "Akademisches Lehrkrankenhaus der Technischen Universität München. Wissen, das ankommt, wo Sie leben." },
    { h: [<>Jede Behandlung beginnt mit <em>Vertrauen</em>.</>], sub: "Wir bauen es — Tag für Tag, Patientin für Patient. Rund um die Uhr, an 365 Tagen." },
    { h: [<>Rund <span className="gold">600 Mal im Jahr</span> beginnt hier neues Leben.</>], sub: "Geburtshilfe, zertifiziertes Brustzentrum, Frauenmedizin auf Universitätsniveau — mitten im Landkreis. Ab 2028 mit eigener Kinderklinik." },
    { h: [<>Ein Klinikum. <em>Ganz nah.</em></>], sub: "330 Betten · 11 Fachabteilungen · über 1.000 Menschen für Erding und Dorfen." },
  ] : [
    null,
    { h: [<>Medicine at <em>university level</em> — at home in the district.</>], sub: "Academic teaching hospital of the Technical University of Munich. Knowledge that arrives where you live." },
    { h: [<>Every treatment begins with <em>trust</em>.</>], sub: "We build it — day by day, patient by patient. Around the clock, 365 days a year." },
    { h: [<>Around <span className="gold">600 times a year</span>, new life begins here.</>], sub: "Obstetrics, a certified breast center, women's medicine at university level — in the heart of the district. With its own children's clinic from 2028." },
    { h: [<>One hospital. <em>Close to home.</em></>], sub: "330 beds · 11 departments · over 1,000 people for Erding and Dorfen." },
  ];

  return (
    <section className="story" ref={storyRef}>
      <div className="story-stick" ref={stickRef}>
        {/* act 0 — hero */}
        <div className="act" ref={el => actRefs.current[0] = el} style={{ opacity: 1 }}>
          <div className="wrap">
            <div className="eyebrow">Klinikum Landkreis Erding · Erding & Dorfen</div>
            <h1>
              <span className="accent">{t.heroTitle1}</span><br />
              <span className="thin">{t.heroTitle2}</span><br />
              {t.heroTitle3}
            </h1>
            <p className="lead">{t.heroText}</p>
            <div className="hero-cta">
              <button className="btn pri" onClick={() => goto("depts")}>{t.cta1} →</button>
              <button className="btn gho" onClick={() => goto("loc")}>{t.cta2}</button>
            </div>
          </div>
          <div className="scroll-hint">{t.scroll}<i /></div>
        </div>
        {/* acts 1–3 — statements over the morphing scene */}
        {acts.slice(1).map((a, i) => (
          <div className="act" key={i} ref={el => actRefs.current[i + 1] = el}>
            <div className="wrap">
              <p className="statement">{a.h}</p>
              <p className="sub">{a.sub}</p>
            </div>
          </div>
        ))}
        <div className="story-dots" aria-hidden="true">
          {[0, 1, 2, 3, 4].map(i => <i key={i} ref={el => dotRefs.current[i] = el} className={i === 0 ? "on" : ""} />)}
        </div>
      </div>
    </section>
  );
}

/* ------------------ page conductor ------------------ */
/* One rAF loop drives every scroll-linked element outside the 3D story:
   the vital line (the page's pulse), the self-drawing ECG, the department
   scanner, and the Frauenklinik parallax. */
function PageConductor() {
  const fillRef = useRef(null);
  const tipRef = useRef(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const vh = window.innerHeight;
      const scroller = document.scrollingElement || document.documentElement;
      const prog = Math.min(scroller.scrollTop / Math.max(scroller.scrollHeight - vh, 1), 1);

      // vital line — the page's pulse
      if (fillRef.current) fillRef.current.style.height = `${(prog * 100).toFixed(2)}%`;
      if (tipRef.current) tipRef.current.style.top = `${(prog * 100).toFixed(2)}%`;

      // chapter 01 — horizontal number journey (lerped sideways playhead)
      const numsec = document.querySelector(".numsec");
      const track = document.getElementById("numtrack");
      if (numsec && track) {
        const r = numsec.getBoundingClientRect();
        const total = numsec.offsetHeight - vh;
        const p = Math.min(Math.max(-r.top / Math.max(total, 1), 0), 1);
        const dist = Math.max(track.scrollWidth - window.innerWidth, 0);
        const target = -p * dist;
        const cur = parseFloat(track.dataset.x || "0");
        const next = cur + (target - cur) * 0.09;
        track.dataset.x = String(next);
        track.style.transform = `translate3d(${next.toFixed(2)}px,0,0)`;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="vital" aria-hidden="true">
      <div className="track" />
      <div className="fill" ref={fillRef} />
      <div className="tip" ref={tipRef} />
    </div>
  );
}


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.14 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------ count-up stat ------------------ */
function Stat({ n, suffix, label }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const target = parseInt(n, 10);
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const step = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [n]);
  return (
    <div className="bigstat rv" ref={ref}>
      <div className="n">{suffix === "≈" && <small>≈ </small>}{val.toLocaleString("de-DE")}{suffix === "+" && <small>+</small>}</div>
      <div className="l">{label}</div>
    </div>
  );
}

/* ------------------ app ------------------ */
export default function App() {
  const [lang, setLang] = useState("de");
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; }, [menu]);

  const goto = (id) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const MENU = lang === "de"
    ? [["depts", "Behandlungsangebot"], ["gyn", "Gynäkologie & Geburtshilfe"], ["sprech", "Sprechstunden"], ["news", "Aktuelles"], ["loc", "Standorte & Kontakt"]]
    : [["depts", "Medical services"], ["gyn", "Gynecology & Obstetrics"], ["sprech", "Consultation hours"], ["news", "News"], ["loc", "Locations & contact"]];

  return (
    <div className="app">
      <style>{CSS}</style>

      {/* header */}
      <header className={`hdr ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap">
          <button className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="logo-mark">K</span>
            <span><b>Klinikum Landkreis Erding</b><span>{t.sub}</span></span>
          </button>
          <div className="hdr-right">
            <div className="lang">
              <button className={lang === "de" ? "on" : ""} onClick={() => setLang("de")}>DE</button>
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            </div>
            <button className="menu-btn" onClick={() => setMenu(true)} aria-label="Open menu">
              {t.menu}
              <span className="menu-ico"><i /><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      {/* fullscreen menu */}
      <div className={`omenu ${menu ? "open" : ""}`} aria-hidden={!menu}>
        <div className="omenu-top">
          <button className="logo" onClick={() => { setMenu(false); window.scrollTo({ top: 0 }); }}>
            <span className="logo-mark">K</span>
            <span><b style={{ color: "var(--porcelain)" }}>Klinikum Landkreis Erding</b></span>
          </button>
          <button className="omenu-x" onClick={() => setMenu(false)} aria-label="Close menu">✕</button>
        </div>
        <div className="omenu-body">
          <div className="omenu-list">
            <nav className="omenu-links">
              {MENU.map(([id, label], i) => (
                <a key={id} href={`#${id}`} style={{ transitionDelay: `${0.08 + i * 0.07}s` }}
                  onClick={(e) => { e.preventDefault(); goto(id); }}>
                  <span className="no">0{i + 1}</span>{label}
                </a>
              ))}
            </nav>
            <aside className="omenu-side">
              <div className="blk">
                <b>{lang === "de" ? "Notfall" : "Emergency"}</b>
                <span className="mono" style={{ fontSize: 26, fontWeight: 600 }}>112</span>
                <div style={{ marginTop: 4 }}>{lang === "de" ? "Notaufnahme rund um die Uhr" : "Emergency room 24/7"}</div>
              </div>
              <div className="blk">
                <b>{lang === "de" ? "Zentrale" : "Switchboard"}</b>
                <span className="mono">08122 59-0</span>
                <div style={{ marginTop: 4 }}>Bajuwarenstraße 5 · 85435 Erding</div>
              </div>
              <div className="blk">
                <b>{lang === "de" ? "Gynäkologie & Geburtshilfe" : "Gynecology & Obstetrics"}</b>
                <span className="mono">08122 59-1648</span>
                <div style={{ marginTop: 4 }}>sekretariat.gynaekologie@klinikum-erding.de</div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* 700vh scroll story — scroll is the playhead */}
      <StoryStage lang={lang} goto={goto} />
      <PageConductor />

      {/* ============ THE QUIET JOURNAL — everything below the story ============ */}

      {/* chapter 01 — Zahlen: horizontal number journey (scroll = sideways playhead) */}
      <section className="numsec" id="stats">
        <div className="numstick">
          <div className="numhead wrap">
            <div className="kicker">{t.statsK}</div>
            <h2 className="numtitle">{t.statsH}</h2>
          </div>
          <div className="numtrack" id="numtrack">
            {t.stats.map(([n, suf, l], i) => (
              <div className="numcell" key={l}>
                <Stat n={n} suffix={suf} label={l} />
                <span className="numidx mono">0{i + 1} / 04</span>
              </div>
            ))}
            <div className="numcell numend">
              <p className="numclose">{lang === "de" ? "Und dahinter: Menschen." : "And behind them: people."}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="body-light">
        {/* chapter 02 — Behandlungsangebot: pure typographic index */}
        <section className="sec" id="depts">
          <div className="wrap">
            <div className="sec-head rv">
              <div className="kicker">{t.deptK}</div>
              <h2>{t.deptH}</h2>
              <p>{t.deptP}</p>
            </div>
            <div className="index">
              {DEPTS.map((d, i) => (
                <button key={d.de[0]} className={`ixrow rv ${d.hl ? "hl" : ""}`}
                  onClick={() => d.hl ? goto("gyn") : goto("loc")}>
                  <span className="ixno mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ixname"><b>{d[lang][0]}</b><i>{d[lang][1]}</i></span>
                  <span className="ixarr" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* chapter 03 — Frauenklinik: sticky split on sand */}
        <section className="chapter" id="gyn">
          <div className="wrap">
            <div className="split">
              <div className="split-l">
                <div className="split-pin">
                  <div className="pill">{t.gynPill}</div>
                  <h3 className="split-h">{t.gynH[0]}<em>{t.gynH[1]}</em>{t.gynH[2]}</h3>
                  <p className="split-p">{t.gynP}</p>
                  <div className="ctarow">
                    <a className="btn ink" href="tel:+498122591648">☎ 08122 59-1648</a>
                    <button className="btn line" onClick={() => goto("sprech")}>{lang === "de" ? "Sprechstunden" : "Consultation hours"}</button>
                  </div>
                </div>
              </div>
              <div className="split-r">
                {[
                  { t: lang === "de" ? "Zertifiziertes Brustzentrum" : "Certified breast center", s: lang === "de" ? "In Kooperation mit dem Klinikum rechts der Isar der TU München. Alle Krebsoperationen durch die ärztliche Leitung oder Oberärzte." : "In cooperation with Klinikum rechts der Isar (TU Munich). All cancer surgery by the department lead or senior physicians." },
                  { t: lang === "de" ? "Geburtshilfe & Kreißsaal" : "Obstetrics & delivery", s: lang === "de" ? "Rund 600 Geburten im Jahr. Infoabend für werdende Eltern an jedem ersten Mittwoch im Monat. Stillberatung durch zertifizierte Beraterinnen." : "Around 600 births a year. Info evening on the first Wednesday of each month. Certified lactation counseling." },
                  { t: lang === "de" ? "Minimalinvasive Chirurgie & Endometriose" : "Minimally invasive surgery & endometriosis", s: lang === "de" ? "Eigene Laparoskopie- und Endometriosesprechstunde mit moderner Schlüsselloch-Chirurgie." : "Dedicated laparoscopy and endometriosis clinic with modern keyhole surgery." },
                  { t: lang === "de" ? "Kontinenz- & Beckenbodenzentrum" : "Continence & pelvic floor center", s: lang === "de" ? "Interdisziplinär mit Urologie und Viszeralchirurgie — diskret, wirksam, individuell." : "Interdisciplinary with urology and visceral surgery — discreet, effective, individual." },
                  { t: lang === "de" ? "Kinderklinik ab Sommer 2028" : "Children's clinic from summer 2028", s: lang === "de" ? "Geburtshilfe und Kinderversorgung künftig unter einem Dach — direkt am Klinikum." : "Obstetrics and pediatric care under one roof — directly at the Klinikum.", hl: true },
                ].map(c => (
                  <div className={`qcard2 rv ${c.hl ? "hl" : ""}`} key={c.t}>
                    <b>{c.t}</b><span>{c.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* chapter 04 — Sprechstunden: sticky intro + hairline board */}
        <section className="sec" id="sprech">
          <div className="wrap">
            <div className="split">
              <div className="split-l">
                <div className="split-pin">
                  <div className="kicker">{t.boardK}</div>
                  <h2 className="split-h2">{t.boardH}</h2>
                  <p className="split-p">{lang === "de" ? "Terminvereinbarung über das Sekretariat." : "Appointments via the department office."}</p>
                  <p className="mono contactline">08122 59-1648<br />sekretariat.gynaekologie@<br />klinikum-erding.de</p>
                </div>
              </div>
              <div className="split-r">
                <div className="board rv">
                  <div className="board-head" aria-hidden="true">
                    <span>{lang === "de" ? "Sprechstunde" : "Clinic"}</span>
                    <span>{lang === "de" ? "Tag" : "Day"}</span>
                    <span>{lang === "de" ? "Zeit" : "Time"}</span>
                  </div>
                  {SPRECH.map(s => (
                    <div className="board-row" key={s.de}>
                      <b>{s[lang]}</b>
                      <span className="day">{s.day[lang]}</span>
                      <span className="mono">{typeof s.time === "object" ? s.time[lang] : s.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* chapter 05 — Aktuelles: editorial */}
        <section className="sec" id="news">
          <div className="wrap">
            <div className="sec-head rv">
              <div className="kicker">{t.newsK}</div>
              <h2>{t.newsH}</h2>
            </div>
            <div className="ngrid rv">
              <article className="nfeat">
                <span className="date">{NEWS[0].d}</span>
                <h3>{NEWS[0][lang][0]}</h3>
                <p>{NEWS[0][lang][1]}</p>
                <span className="more">{lang === "de" ? "Mehr erfahren" : "Read more"} →</span>
              </article>
              <div className="nside">
                {NEWS.slice(1).map(n => (
                  <article className="nitem" key={n.d}>
                    <span className="date">{n.d}</span>
                    <b>{n[lang][0]}</b>
                    <p>{n[lang][1]}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* chapter 06 — Standorte: curtains */}
        <section className="sec" id="loc">
          <div className="wrap">
            <div className="sec-head rv">
              <div className="kicker">{t.locK}</div>
              <h2>{t.locH}</h2>
            </div>
            <div className="curtains rv">
              <div className="curtain">
                <div className="cphoto" aria-hidden="true"><img src={IMG_ERDING} alt="" loading="lazy" /></div>
                <div className="ctop"><span className="mono cno">01</span><h4>Klinikum Erding</h4></div>
                <div className="cbody">
                  <p className="mono">Bajuwarenstraße 5 · 85435 Erding<br />☎ 08122 59-0</p>
                  <p>{lang === "de"
                    ? "Hauptstandort mit Notaufnahme (24/7), allen Hauptabteilungen, Kreißsaal, Herzkatheter und regionalem Traumazentrum."
                    : "Main site with 24/7 ER, all main departments, delivery rooms, cath lab and regional trauma center."}</p>
                </div>
              </div>
              <div className="curtain">
                <div className="cphoto" aria-hidden="true"><img src={IMG_DORFEN} alt="" loading="lazy" style={{ objectPosition: "center 32%" }} /></div>
                <div className="ctop"><span className="mono cno">02</span><h4>Klinik Dorfen</h4></div>
                <div className="cbody">
                  <p className="mono">☎ 08122 59-0 ({lang === "de" ? "Zentrale" : "switchboard"})</p>
                  <p>{lang === "de"
                    ? "Innere Medizin mit Schwerpunkt Gastroenterologie sowie die Interdisziplinäre Schmerztherapie mit Tagesklinik."
                    : "Internal medicine focused on gastroenterology, plus interdisciplinary pain therapy with a day clinic."}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* closing statement */}
        <section className="closing">
          <div className="wrap">
            <p className="close-line rv">{lang === "de"
              ? <>Medizin, die bei Ihnen bleibt — <em>seit Generationen, für Generationen.</em></>
              : <>Medicine that stays close — <em>for generations, since generations.</em></>}</p>
            <div className="ctarow center rv d1">
              <button className="btn ink" onClick={() => goto("depts")}>{t.cta1} →</button>
              <a className="btn line" href="tel:+498122590">☎ 08122 59-0</a>
            </div>
          </div>
        </section>
      </div>

      {/* footer */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <h5>Klinikum Landkreis Erding</h5>
              <p style={{ fontSize: 14, maxWidth: "44ch" }}>{lang === "de"
                ? "Kommunalunternehmen des Landkreises Erding (AöR) · Akademisches Lehrkrankenhaus der TU München."
                : "Municipal enterprise of the district of Erding · Academic teaching hospital of TU Munich."}</p>
              <p className="mono" style={{ marginTop: 12, fontSize: 13, color: "var(--glow)" }}>Bajuwarenstraße 5 · 85435 Erding · ☎ 08122 59-0</p>
            </div>
            <div>
              <b>{lang === "de" ? "Schnellzugriff" : "Quick access"}</b>
              {MENU.map(([id, label]) => <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); goto(id); }}>{label}</a>)}
            </div>
            <div>
              <b>{lang === "de" ? "Rechtliches" : "Legal"}</b>
              <a href="#" onClick={e => e.preventDefault()}>{lang === "de" ? "Impressum" : "Legal notice"}</a>
              <a href="#" onClick={e => e.preventDefault()}>{lang === "de" ? "Datenschutz" : "Privacy"}</a>
              <a href="#" onClick={e => e.preventDefault()}>{lang === "de" ? "Barrierefreiheit" : "Accessibility"}</a>
            </div>
          </div>
          <div className="legal">
            <span>© 2026 · {t.footNote}</span>
            <span>{lang === "de" ? "Konzept & Umsetzung: Cogniiq" : "Concept & build: Cogniiq"}</span>
          </div>
        </div>
      </footer>

      <div className="demochip">Cogniiq · {lang === "de" ? "Konzeptstudie" : "Concept study"}</div>
      <ChatWidget lang={lang} />
    </div>
  );
}
