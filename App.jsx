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
  --gold:#C9964B; --red:#C24334; --muted:#5E7379;
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
.vital .track{position:absolute;inset:0;background:rgba(95,212,207,.14)}
.vital .fill{position:absolute;top:0;left:0;right:0;height:0%;background:linear-gradient(to bottom,transparent,var(--glow) 30%,var(--glow));box-shadow:0 0 12px rgba(95,212,207,.55)}
.vital .tip{position:absolute;left:50%;top:0;width:10px;height:10px;border-radius:50%;background:var(--glow);transform:translate(-50%,-50%);box-shadow:0 0 16px var(--glow)}
.vital .tip::after{content:"";position:absolute;inset:-7px;border-radius:50%;border:1.5px solid rgba(95,212,207,.6);animation:vpulse 1.6s ease-out infinite}
@keyframes vpulse{0%{transform:scale(.4);opacity:1}100%{transform:scale(1.7);opacity:0}}
@media(max-width:900px){.vital{left:10px}}

/* ---------- marquee ---------- */
.marq{background:var(--ink);border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);overflow:hidden;position:relative;z-index:6;padding:20px 0}
.marq-in{display:flex;gap:56px;white-space:nowrap;width:max-content;animation:marq 38s linear infinite}
.marq span{font-family:'Bricolage Grotesque';font-weight:600;font-size:15px;letter-spacing:.24em;text-transform:uppercase;color:rgba(247,246,242,.5);display:flex;align-items:center;gap:56px}
.marq b{color:var(--glow);font-weight:600}
@keyframes marq{to{transform:translateX(-50%)}}

/* ---------- ECG self-drawing line in stats ---------- */
.ecgline{display:block;width:100%;height:90px;margin:-10px 0 34px;overflow:visible}
.ecgline path{fill:none;stroke:var(--klinik);stroke-width:2;filter:drop-shadow(0 0 6px rgba(23,145,155,.4))}
.ecgline circle{fill:var(--gold)}

/* ---------- department scanner ---------- */
.dept-wrap{position:relative;padding-left:34px}
.dept-track{position:absolute;left:9px;top:0;bottom:0;width:2px;background:var(--line)}
.dept-fill{position:absolute;left:9px;top:0;width:2px;height:0;background:linear-gradient(to bottom,var(--klinik),var(--gold));box-shadow:0 0 8px rgba(14,110,119,.4)}
.dept-row{position:relative;border-top:1px solid var(--line);display:grid;grid-template-columns:64px 1fr auto;align-items:center;gap:22px;padding:26px 6px;cursor:pointer;transition:background .25s,padding .25s,transform .5s cubic-bezier(.2,.6,.2,1),opacity .5s;text-align:left;background:none;border-left:0;border-right:0;border-bottom:0;width:100%;color:var(--deep)}
.dept-row::before{content:"";position:absolute;left:-31px;top:50%;width:10px;height:10px;border-radius:50%;background:var(--line);transform:translateY(-50%) scale(.7);transition:background .3s,transform .3s,box-shadow .3s}
.dept-row.live::before{background:var(--gold);transform:translateY(-50%) scale(1);box-shadow:0 0 12px rgba(201,150,75,.7)}
.dept-row.live{background:linear-gradient(90deg,rgba(14,110,119,.05),transparent 60%)}
.dept-row.live .no{color:var(--gold)}
.dept-row:last-child{border-bottom:1px solid var(--line)}
.dept-row:hover{background:var(--paper);padding-left:18px}
.dept-row .no{font-family:'IBM Plex Mono';font-size:12.5px;color:rgba(201,150,75,.55);transition:color .3s}
.dept-row b{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(19px,2.6vw,28px);letter-spacing:-.02em;display:block}
.dept-row span{display:block;font-size:13.5px;color:var(--muted);margin-top:3px}
.dept-row .arr{font-size:20px;color:var(--klinik);transform:translateX(-8px);opacity:0;transition:transform .25s,opacity .25s}
.dept-row:hover .arr{transform:none;opacity:1}
.dept-row.hl b{color:var(--klinik)}

/* ---------- tilt cards ---------- */
.tilt{transform-style:preserve-3d;transition:transform .35s cubic-bezier(.2,.6,.2,1),box-shadow .35s;will-change:transform}
.tilt:hover{box-shadow:0 26px 60px rgba(10,42,49,.16)}
.tilt .date,.tilt b,.tilt p{transform:translateZ(24px)}

/* ---------- gyn breathing + parallax ---------- */
.feature::after{content:"";position:absolute;left:-15%;bottom:-40%;width:70%;height:120%;background:radial-gradient(closest-side,rgba(201,150,75,.16),transparent 70%);animation:breathe 6s ease-in-out infinite}
@keyframes breathe{0%,100%{transform:scale(.92);opacity:.7}50%{transform:scale(1.06);opacity:1}}
.f-col-l,.f-col-r{will-change:transform}
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

/* ---------- light body ---------- */
.body-light{background:var(--porcelain);color:var(--deep);border-radius:34px 34px 0 0;position:relative;z-index:5;box-shadow:0 -30px 80px rgba(0,0,0,.5)}
.sec{padding:110px 0}
.sec-head{margin-bottom:56px;max-width:720px}
.kicker{font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:700;color:var(--klinik);margin-bottom:16px;display:flex;align-items:center;gap:12px}
.kicker::before{content:"";width:36px;height:1px;background:var(--klinik)}
.sec-head h2{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(32px,4.6vw,54px);letter-spacing:-.03em;line-height:1.04;color:var(--deep)}
.sec-head p{margin-top:18px;color:var(--muted);font-size:17px;max-width:56ch}

/* reveal */
.rv{opacity:0;transform:translateY(44px);transition:opacity .8s cubic-bezier(.2,.6,.2,1),transform .8s cubic-bezier(.2,.6,.2,1)}
.rv.in{opacity:1;transform:none}
.rv.d1{transition-delay:.08s}.rv.d2{transition-delay:.16s}.rv.d3{transition-delay:.24s}.rv.d4{transition-delay:.32s}

/* stats */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:22px;overflow:hidden}
@media(max-width:820px){.stats{grid-template-columns:repeat(2,1fr)}}
.stat{background:var(--paper);padding:38px 30px}
.stat .n{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(40px,4.6vw,58px);letter-spacing:-.03em;color:var(--klinik);line-height:1}
.stat .n small{font-size:.5em;color:var(--gold);vertical-align:super}
.stat .l{margin-top:10px;font-size:13.5px;color:var(--muted);letter-spacing:.02em}

/* departments — scanner version defined above */

/* gyn feature — parallax split */
.feature{background:var(--deep);color:var(--porcelain);border-radius:34px;overflow:hidden;position:relative}
.feature::before{content:"";position:absolute;inset:0;background:radial-gradient(900px 500px at 85% 10%,rgba(23,145,155,.35),transparent 60%)}
.feature-in{position:relative;display:grid;grid-template-columns:1.1fr .9fr;gap:50px;padding:78px 64px}
@media(max-width:900px){.feature-in{grid-template-columns:1fr;padding:52px 28px}}
.feature h3{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(28px,4vw,46px);letter-spacing:-.03em;line-height:1.05}
.feature h3 em{font-style:normal;color:var(--glow)}
.feature p{margin-top:18px;color:rgba(247,246,242,.78);max-width:48ch}
.f-list{display:flex;flex-direction:column;gap:14px}
.f-item{border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:18px 20px;background:rgba(255,255,255,.04);backdrop-filter:blur(4px);transition:transform .25s,border-color .25s}
.f-item:hover{transform:translateX(6px);border-color:var(--glow)}
.f-item b{font-size:15.5px;display:flex;gap:10px;align-items:center}
.f-item span{display:block;font-size:13px;color:rgba(247,246,242,.65);margin-top:5px}
.f-item .mono{color:var(--glow);font-size:12.5px}
.pill{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:6px 14px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--glow);margin-bottom:20px}

/* sprechstunden ticker-style board */
.board{background:var(--paper);border:1px solid var(--line);border-radius:22px;overflow:hidden}
.board-row{display:grid;grid-template-columns:1fr auto auto;gap:18px;align-items:center;padding:19px 26px;border-top:1px solid var(--line);font-size:15px}
.board-row:first-child{border-top:0}
.board-row b{font-weight:600;color:var(--deep)}
.board-row .mono{color:var(--klinik);font-weight:600;font-size:13.5px;white-space:nowrap}
.board-row .day{font-size:13px;color:var(--muted);white-space:nowrap}
@media(max-width:640px){.board-row{grid-template-columns:1fr;gap:4px}}

/* news */
.ngrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:880px){.ngrid{grid-template-columns:1fr}}
.ncard{background:var(--paper);border:1px solid var(--line);border-radius:22px;padding:30px;transition:transform .3s,box-shadow .3s}
.ncard:hover{transform:translateY(-6px);box-shadow:0 22px 50px rgba(10,42,49,.12)}
.ncard .date{font-family:'IBM Plex Mono';font-size:12px;color:var(--gold)}
.ncard b{display:block;margin-top:12px;font-family:'Bricolage Grotesque';font-size:19px;font-weight:700;letter-spacing:-.015em;line-height:1.25;color:var(--deep)}
.ncard p{margin-top:10px;font-size:14px;color:var(--muted)}

/* locations */
.loc{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:760px){.loc{grid-template-columns:1fr}}
.lcard{border-radius:22px;padding:34px;background:var(--paper);border:1px solid var(--line)}
.lcard.dark{background:var(--deep);color:var(--porcelain);border:0}
.lcard h4{font-family:'Bricolage Grotesque';font-size:24px;font-weight:800;letter-spacing:-.02em}
.lcard .mono{display:block;margin-top:12px;font-size:13.5px;color:var(--klinik)}
.lcard.dark .mono{color:var(--glow)}
.lcard p{margin-top:12px;font-size:14.5px;color:var(--muted)}
.lcard.dark p{color:rgba(247,246,242,.7)}

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

      // self-drawing ECG in the stats section
      const ecg = document.getElementById("ecgpath");
      if (ecg) {
        const r = ecg.getBoundingClientRect();
        const p = Math.min(Math.max((vh * 0.9 - r.top) / (vh * 0.9), 0), 1);
        ecg.style.strokeDasharray = "1";
        ecg.style.strokeDashoffset = String(1 - p);
        const dot = document.getElementById("ecgdot");
        if (dot && ecg.getTotalLength) {
          const pt = ecg.getPointAtLength(p * ecg.getTotalLength());
          dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y);
          dot.setAttribute("r", p > 0.02 && p < 1 ? "4" : "0");
        }
      }

      // department scanner — nodes light up as rows pass the reading line
      const rows = document.querySelectorAll(".dept-row");
      let lastLiveBottom = 0;
      rows.forEach(row => {
        const r = row.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const live = c < vh * 0.62 && r.bottom > 0;
        row.classList.toggle("live", live && c > vh * 0.1);
        if (live) lastLiveBottom = Math.max(lastLiveBottom, c);
      });
      const wrap = document.querySelector(".dept-wrap");
      const fill = document.querySelector(".dept-fill");
      if (wrap && fill) {
        const wr = wrap.getBoundingClientRect();
        const h = Math.min(Math.max(vh * 0.62 - wr.top, 0), wr.height);
        fill.style.height = `${h}px`;
      }

      // Frauenklinik parallax — the two columns drift at different speeds
      const feat = document.querySelector(".feature");
      if (feat) {
        const r = feat.getBoundingClientRect();
        const p = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1) - 0.5;
        const l = document.querySelector(".f-col-l"), rt = document.querySelector(".f-col-r");
        if (l) l.style.transform = `translateY(${(-p * 34).toFixed(1)}px)`;
        if (rt) rt.style.transform = `translateY(${(p * 46).toFixed(1)}px)`;
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

/* 3D tilt for cards — physical, cursor-following */
function tiltMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(900px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg) translateY(-4px)`;
}
function tiltLeave(e) { e.currentTarget.style.transform = ""; }

/* ECG path for the stats section (drawn by scroll) */
const ECG_D = "M0,50 L150,50 L170,42 L190,50 L260,50 L272,58 L284,10 L296,78 L308,44 L340,50 L420,50 L450,38 L480,50 L620,50 L640,42 L660,50 L730,50 L742,58 L754,10 L766,78 L778,44 L810,50 L900,50 L930,38 L960,50 L1120,50";
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
    <div className="stat" ref={ref}>
      <div className="n">{suffix === "≈" && <small>≈</small>}{val.toLocaleString("de-DE")}{suffix === "+" && <small>+</small>}</div>
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

      {/* marquee — editorial band between the story and the practical site */}
      <div className="marq" aria-hidden="true">
        <div className="marq-in">
          {[0, 1].map(k => (
            <span key={k}>
              Spitzenmedizin ganz nah <b>·</b> Lehrkrankenhaus der TU München <b>·</b> 330 Betten <b>·</b> Zwei Standorte <b>·</b> ≈600 Geburten im Jahr <b>·</b> Zertifiziertes Brustzentrum <b>·</b> Kinderklinik 2028 <b>·</b>
            </span>
          ))}
        </div>
      </div>

      {/* light body */}
      <div className="body-light">
        {/* stats */}
        <section className="sec" id="stats">
          <div className="wrap">
            <div className="sec-head rv">
              <div className="kicker">{t.statsK}</div>
              <h2>{t.statsH}</h2>
            </div>
            <svg className="ecgline" viewBox="0 0 1120 90" preserveAspectRatio="none" aria-hidden="true">
              <path id="ecgpath" d={ECG_D} pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} />
              <circle id="ecgdot" cx="0" cy="50" r="0" />
            </svg>
            <div className="stats rv d1">
              {t.stats.map(([n, suf, l]) => <Stat key={l} n={n} suffix={suf} label={l} />)}
            </div>
          </div>
        </section>

        {/* departments */}
        <section className="sec" id="depts" style={{ paddingTop: 30 }}>
          <div className="wrap">
            <div className="sec-head rv">
              <div className="kicker">{t.deptK}</div>
              <h2>{t.deptH}</h2>
              <p>{t.deptP}</p>
            </div>
            <div className="dept-wrap">
              <div className="dept-track" aria-hidden="true" />
              <div className="dept-fill" aria-hidden="true" />
              {DEPTS.map((d, i) => (
                <button key={d.de[0]} className={`dept-row rv ${d.hl ? "hl" : ""}`}
                  onClick={() => d.hl ? goto("gyn") : goto("loc")}>
                  <span className="no">{String(i + 1).padStart(2, "0")}</span>
                  <span><b>{d[lang][0]}</b><span>{d[lang][1]}</span></span>
                  <span className="arr">→</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* gyn feature */}
        <section className="sec" id="gyn" style={{ paddingTop: 40 }}>
          <div className="wrap">
            <div className="feature rv">
              <div className="feature-in">
                <div className="f-col-l">
                  <div className="pill">{t.gynPill}</div>
                  <h3>{t.gynH[0]}<em>{t.gynH[1]}</em>{t.gynH[2]}</h3>
                  <p>{t.gynP}</p>
                  <div className="hero-cta" style={{ marginTop: 30 }}>
                    <a className="btn pri" href="tel:+498122591648">☎ 08122 59-1648</a>
                    <button className="btn gho" onClick={() => goto("sprech")}>{lang === "de" ? "Sprechstunden ansehen" : "See consultation hours"}</button>
                  </div>
                </div>
                <div className="f-list f-col-r">
                  <div className="f-item rv d1"><b>🎗️ {lang === "de" ? "Zertifiziertes Brustzentrum" : "Certified breast center"}</b>
                    <span>{lang === "de" ? "In Kooperation mit dem Klinikum rechts der Isar der TU München." : "In cooperation with Klinikum rechts der Isar (TU Munich)."}</span></div>
                  <div className="f-item rv d2"><b>👶 {lang === "de" ? "Geburtshilfe & Kreißsaal" : "Obstetrics & delivery"}</b>
                    <span>{lang === "de" ? "≈600 Geburten/Jahr · Infoabend jeden 1. Mittwoch im Monat · Stillberatung." : "≈600 births/year · info evening every 1st Wednesday · lactation counseling."}</span></div>
                  <div className="f-item rv d3"><b>🔍 {lang === "de" ? "Minimalinvasiv & Endometriose" : "Minimally invasive & endometriosis"}</b>
                    <span>{lang === "de" ? "Eigene Laparoskopie- und Endometriosesprechstunde." : "Dedicated laparoscopy and endometriosis clinic."}</span></div>
                  <div className="f-item rv d4"><b>🏥 {lang === "de" ? "Kinderklinik ab Sommer 2028" : "Children's clinic from 2028"}</b>
                    <span>{lang === "de" ? "Geburtshilfe und Kinderversorgung künftig unter einem Dach." : "Obstetrics and pediatric care under one roof."}</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* sprechstunden board */}
        <section className="sec" id="sprech" style={{ paddingTop: 40 }}>
          <div className="wrap">
            <div className="sec-head rv">
              <div className="kicker">{t.boardK}</div>
              <h2>{t.boardH}</h2>
              <p className="mono" style={{ fontSize: 13.5, color: "var(--klinik)" }}>{t.boardP}</p>
            </div>
            <div className="board rv d1">
              {SPRECH.map(s => (
                <div className="board-row" key={s.de}>
                  <b>{s[lang]}</b>
                  <span className="day">{s.day[lang]}</span>
                  <span className="mono">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* news */}
        <section className="sec" id="news" style={{ paddingTop: 40 }}>
          <div className="wrap">
            <div className="sec-head rv">
              <div className="kicker">{t.newsK}</div>
              <h2>{t.newsH}</h2>
            </div>
            <div className="ngrid">
              {NEWS.map((n, i) => (
                <article className={`ncard tilt rv d${i + 1}`} key={n.d} onMouseMove={tiltMove} onMouseLeave={tiltLeave}>
                  <span className="date">{n.d}</span>
                  <b>{n[lang][0]}</b>
                  <p>{n[lang][1]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* locations */}
        <section className="sec" id="loc" style={{ paddingTop: 40, paddingBottom: 130 }}>
          <div className="wrap">
            <div className="sec-head rv">
              <div className="kicker">{t.locK}</div>
              <h2>{t.locH}</h2>
            </div>
            <div className="loc">
              <div className="lcard dark rv d1">
                <h4>Klinikum Erding</h4>
                <span className="mono">Bajuwarenstraße 5 · 85435 Erding · ☎ 08122 59-0</span>
                <p>{lang === "de"
                  ? "Hauptstandort mit Notaufnahme (24/7), allen Hauptabteilungen, Kreißsaal, Herzkatheter und regionalem Traumazentrum. S2 München–Erding, Parkhaus am Haus."
                  : "Main site with 24/7 ER, all main departments, delivery rooms, cath lab and regional trauma center. S2 line Munich–Erding, on-site parking."}</p>
              </div>
              <div className="lcard rv d2">
                <h4 style={{ color: "var(--deep)" }}>Klinik Dorfen</h4>
                <span className="mono">☎ 08122 59-0 ({lang === "de" ? "Zentrale" : "switchboard"})</span>
                <p>{lang === "de"
                  ? "Innere Medizin mit Schwerpunkt Gastroenterologie und die Interdisziplinäre Schmerztherapie mit Tagesklinik (12 Plätze) und stationärem Bereich."
                  : "Internal medicine focused on gastroenterology, plus interdisciplinary pain therapy with a day clinic (12 places) and inpatient unit."}</p>
              </div>
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
