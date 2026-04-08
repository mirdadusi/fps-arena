var rd=Object.defineProperty;var Il=s=>{throw TypeError(s)};var ad=(s,t,e)=>t in s?rd(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var Rt=(s,t,e)=>ad(s,typeof t!="symbol"?t+"":t,e),co=(s,t,e)=>t.has(s)||Il("Cannot "+e);var c=(s,t,e)=>(co(s,t,"read from private field"),e?e.call(s):t.get(s)),z=(s,t,e)=>t.has(s)?Il("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),q=(s,t,e,n)=>(co(s,t,"write to private field"),n?n.call(s,e):t.set(s,e),e),Z=(s,t,e)=>(co(s,t,"access private method"),e);var In=(s,t,e,n)=>({set _(i){q(s,t,i,e)},get _(){return c(s,t,n)}});(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const od="modulepreload",ld=function(s){return"/"+s},Ul={},cd=function(t,e,n){let i=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");i=Promise.allSettled(e.map(l=>{if(l=ld(l),l in Ul)return;Ul[l]=!0;const h=l.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":od,h||(d.as="script"),d.crossOrigin="",d.href=l,o&&d.setAttribute("nonce",o),document.head.appendChild(d),h)return new Promise((f,g)=>{d.addEventListener("load",f),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return i.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})},jo={classic:{name:"Classic Arena",description:"Balanced layout with symmetric cover",preview:"🏛️",pillars:[[-12,-12],[12,-12],[-12,12],[12,12],[0,-20],[0,20],[-20,0],[20,0]],coverBlocks:[{x:-8,z:0,w:6,d:1.5},{x:8,z:0,w:6,d:1.5},{x:0,z:-8,w:1.5,d:6},{x:0,z:8,w:1.5,d:6},{x:-20,z:-15,w:4,d:2},{x:20,z:15,w:4,d:2},{x:-15,z:20,w:2,d:4},{x:15,z:-20,w:2,d:4}],crates:[[-5,-18],[5,18],[-18,5],[18,-5],[-22,-22],[22,22],[0,0]],pickupSpots:[{x:0,z:0,type:"health"},{x:-20,z:-20,type:"ammo"},{x:20,z:20,type:"ammo"},{x:-20,z:20,type:"shield"},{x:20,z:-20,type:"speed"},{x:0,z:-25,type:"damage"}],playerSpawns:[{x:-25,z:-25},{x:25,z:25},{x:-25,z:25},{x:25,z:-25},{x:0,z:-25},{x:0,z:25}]},warehouse:{name:"Warehouse",description:"Tight corridors and close-quarters combat",preview:"🏭",pillars:[[-10,-25],[-10,-15],[-10,-5],[-10,5],[-10,15],[-10,25],[10,-25],[10,-15],[10,-5],[10,5],[10,15],[10,25]],coverBlocks:[{x:-18,z:-10,w:1.5,d:20},{x:18,z:10,w:1.5,d:20},{x:0,z:-18,w:12,d:1.5},{x:0,z:18,w:12,d:1.5},{x:-5,z:-5,w:8,d:1.5},{x:5,z:5,w:8,d:1.5},{x:-24,z:0,w:1.5,d:10},{x:24,z:0,w:1.5,d:10}],crates:[[-15,-20],[15,20],[-23,-15],[23,15],[-8,20],[8,-20],[0,-12],[0,12],[-15,8],[15,-8],[-22,22],[22,-22]],pickupSpots:[{x:0,z:0,type:"health"},{x:-15,z:-15,type:"ammo"},{x:15,z:15,type:"ammo"},{x:-22,z:22,type:"shield"},{x:22,z:-22,type:"speed"},{x:0,z:25,type:"damage"}],playerSpawns:[{x:-25,z:-25},{x:25,z:25},{x:-25,z:25},{x:25,z:-25},{x:0,z:0},{x:15,z:-15}]},colosseum:{name:"Colosseum",description:"Open circular arena with long sightlines",preview:"⭕",pillars:[[22,0],[19,11],[11,19],[0,22],[-11,19],[-19,11],[-22,0],[-19,-11],[-11,-19],[0,-22],[11,-19],[19,-11]],coverBlocks:[{x:-7,z:0,w:4,d:1.5},{x:7,z:0,w:4,d:1.5},{x:0,z:-7,w:1.5,d:4},{x:0,z:7,w:1.5,d:4},{x:-18,z:-18,w:3,d:3},{x:18,z:18,w:3,d:3},{x:-18,z:18,w:3,d:3},{x:18,z:-18,w:3,d:3}],crates:[[-12,0],[12,0],[0,-12],[0,12],[-8,-8],[8,8],[-8,8],[8,-8]],pickupSpots:[{x:0,z:0,type:"damage"},{x:-18,z:0,type:"health"},{x:18,z:0,type:"health"},{x:0,z:-18,type:"ammo"},{x:0,z:18,type:"ammo"},{x:-12,z:-12,type:"speed"},{x:12,z:12,type:"shield"}],playerSpawns:[{x:-25,z:0},{x:25,z:0},{x:0,z:-25},{x:0,z:25},{x:-18,z:-18},{x:18,z:18}]},fortress:{name:"Fortress",description:"Central stronghold with defensive positions",preview:"🏰",pillars:[[-5,-5],[5,-5],[-5,5],[5,5],[-20,-20],[20,-20],[-20,20],[20,20],[-20,0],[20,0],[0,-20],[0,20]],coverBlocks:[{x:-8,z:-8,w:1.5,d:8},{x:8,z:-8,w:1.5,d:8},{x:-8,z:8,w:1.5,d:8},{x:8,z:8,w:1.5,d:8},{x:-4,z:-12,w:8,d:1.5},{x:4,z:12,w:8,d:1.5},{x:-12,z:-4,w:1.5,d:8},{x:12,z:4,w:1.5,d:8},{x:-22,z:-10,w:4,d:2},{x:22,z:10,w:4,d:2},{x:-10,z:22,w:2,d:4},{x:10,z:-22,w:2,d:4}],crates:[[0,0],[-15,-15],[15,15],[-15,15],[15,-15],[-25,10],[25,-10],[10,25],[-10,-25]],pickupSpots:[{x:0,z:0,type:"damage"},{x:-15,z:-15,type:"health"},{x:15,z:15,type:"health"},{x:-15,z:15,type:"ammo"},{x:15,z:-15,type:"ammo"},{x:-25,z:0,type:"shield"},{x:25,z:0,type:"speed"}],playerSpawns:[{x:-25,z:-25},{x:25,z:25},{x:-25,z:25},{x:25,z:-25},{x:0,z:-25},{x:0,z:25}]}},rt=Object.freeze({arena:{size:60,wallHeight:8},player:{height:1.7,speed:8,sprintMultiplier:1.6,radius:.4,maxHP:100},weapon:{bulletSpeed:80,bulletDamage:12,fireRate:.12,maxAmmo:30,reloadTime:1.8,spread:.015},weapons:{rifle:{name:"Assault Rifle",key:0,bulletSpeed:80,bulletDamage:12,fireRate:.12,maxAmmo:30,reloadTime:1.8,spread:.015,bulletsPerShot:1,bulletColor:16763904},shotgun:{name:"Shotgun",key:1,bulletSpeed:60,bulletDamage:8,fireRate:.7,maxAmmo:8,reloadTime:2.2,spread:.08,bulletsPerShot:6,bulletColor:16746564},sniper:{name:"Sniper Rifle",key:2,bulletSpeed:150,bulletDamage:55,fireRate:1.2,maxAmmo:5,reloadTime:2.8,spread:.003,bulletsPerShot:1,bulletColor:4508927},rocket:{name:"Rocket Launcher",key:3,bulletSpeed:40,bulletDamage:80,fireRate:1.5,maxAmmo:4,reloadTime:3,spread:.01,bulletsPerShot:1,bulletColor:16729156,explosive:!0,explosionRadius:5}},grenade:{maxCount:3,throwForce:20,fuseTime:2.5,damage:60,radius:6,bounceDecay:.4},skins:[{name:"Default",primary:4491519,secondary:2236962},{name:"Crimson",primary:13378082,secondary:4456448},{name:"Toxic",primary:2280516,secondary:17408},{name:"Gold",primary:14527010,secondary:4469504},{name:"Shadow",primary:5592405,secondary:1118481},{name:"Neon",primary:16729343,secondary:4456516},{name:"Arctic",primary:11197951,secondary:3359829},{name:"Lava",primary:16737792,secondary:4460800}],teams:{colors:{red:16729156,blue:4491519},ctfScoreToWin:3,flagReturnTime:30,respawnDelay:3},enemy:{maxHP:150,speedBase:7,fireRateBase:.55,accuracyBase:.18,bulletDamageBase:10,range:45,radius:.6,hitRadius:.7,hitHalfHeight:1.3},physics:{gravity:25},difficulty:{thresholds:[3,6,10,15],names:["Normal","Hard","Veteran","Nightmare","Impossible"],colors:["#4f4","#fc0","#f80","#f44","#f0f"],speedPerTier:1.2,fireRatePerTier:.08,accuracyPerTier:.04,damagePerTier:3,hpPerTier:40,dodgeBase:.05,dodgePerTier:.06,minFireRate:.18,minAccuracy:.06},rendering:{fogColor:2763317,fogDensity:.006,toneMappingExposure:1.6,ambientColor:8952251,ambientIntensity:1.4,hemiSkyColor:11189213,hemiGroundColor:4478310,hemiIntensity:.8,dirLightColor:16772829,dirLightIntensity:2},particles:{wallHitCount:4,playerHitCount:6,enemyHitCount:8},scoring:{baseKillScore:100,tierBonus:50,streakBonus:10}});var Xs,qs,Ji,Rr,Me,Jn,Gt,fh,ph,mh,gh,_h,Zo,vh,xh,Mh,yh,ba,Sh,Sr,Jo;class hd{constructor(){z(this,Gt);z(this,Xs);z(this,qs,null);z(this,Ji,null);z(this,Rr,"ffa");z(this,Me,null);z(this,Jn,{sp:0,cr:0,jr:0});q(this,Xs,document.getElementById("lobby")),Z(this,Gt,fh).call(this),Z(this,Gt,ph).call(this),Z(this,Gt,mh).call(this),Z(this,Gt,_h).call(this),Z(this,Gt,gh).call(this)}show(){c(this,Xs).style.display="flex"}hide(){c(this,Xs).style.display="none"}onStart(t){q(this,qs,t)}}Xs=new WeakMap,qs=new WeakMap,Ji=new WeakMap,Rr=new WeakMap,Me=new WeakMap,Jn=new WeakMap,Gt=new WeakSet,fh=function(){document.querySelectorAll(".lobby-tab").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".lobby-tab").forEach(n=>n.classList.remove("active")),t.classList.add("active"),document.querySelectorAll(".lobby-panel").forEach(n=>n.classList.add("hidden"));const e=document.getElementById(`panel-${t.dataset.tab}`);e&&e.classList.remove("hidden")})})},ph=function(){for(const t of["sp-arena","cr-arena"]){const e=document.getElementById(t);if(e){e.innerHTML="";for(const[n,i]of Object.entries(jo)){const r=document.createElement("div");r.className="arena-card"+(n==="classic"?" selected":""),r.dataset.arena=n,r.innerHTML=`<div class="arena-preview">${i.preview}</div><div class="arena-name">${i.name}</div><div class="arena-desc">${i.description}</div>`,r.addEventListener("click",()=>{e.querySelectorAll(".arena-card").forEach(a=>a.classList.remove("selected")),r.classList.add("selected")}),e.appendChild(r)}}}},mh=function(){for(const t of["sp","cr","jr"]){const e=document.getElementById(`${t}-skin`);e&&(e.innerHTML="",rt.skins.forEach((n,i)=>{const r=document.createElement("div");r.className="skin-swatch"+(i===0?" selected":""),r.style.background="#"+n.primary.toString(16).padStart(6,"0"),r.title=n.name,r.addEventListener("click",()=>{e.querySelectorAll(".skin-swatch").forEach(a=>a.classList.remove("selected")),r.classList.add("selected"),c(this,Jn)[t]=i}),e.appendChild(r)}))}},gh=function(){const t=document.getElementById("cr-game-mode"),e=document.getElementById("cr-team-field");t&&e&&t.addEventListener("change",()=>{e.style.display=t.value!=="ffa"?"block":"none"})},_h=function(){const t=(e,n)=>{const i=document.getElementById(e),r=document.getElementById(n);i&&r&&i.addEventListener("input",()=>{r.textContent=i.value})};t("sp-bots","sp-bot-count"),t("cr-bots","cr-bot-count"),t("cr-max-players","cr-max-count"),document.getElementById("btn-start-single")?.addEventListener("click",()=>{var r;const e=document.querySelector("#sp-arena .arena-card.selected")?.dataset.arena||"classic",n=parseInt(document.getElementById("sp-bots")?.value||"1"),i=document.getElementById("sp-name")?.value?.trim()||"Player";(r=c(this,qs))==null||r.call(this,{mode:"single",arena:e,botCount:n,playerName:i,skinIndex:c(this,Jn).sp})}),document.getElementById("btn-create-room")?.addEventListener("click",()=>Z(this,Gt,vh).call(this)),document.getElementById("btn-refresh-rooms")?.addEventListener("click",()=>Z(this,Gt,xh).call(this)),document.getElementById("btn-join-room")?.addEventListener("click",()=>{if(c(this,Ji)&&c(this,Me)?.connected){const e=document.getElementById("jr-name")?.value?.trim()||"Player",n=document.getElementById("jr-team")?.value||"red";c(this,Me).joinRoom(c(this,Ji),e,n,c(this,Jn).jr)}}),document.getElementById("btn-start-room")?.addEventListener("click",()=>c(this,Me)?.startGame()),document.getElementById("btn-leave-room")?.addEventListener("click",()=>{c(this,Me)?.leaveRoom(),Z(this,Gt,ba).call(this,"create")})},Zo=async function(){if(c(this,Me)?.connected)return!0;const{NetworkManager:t}=await cd(async()=>{const{NetworkManager:e}=await import("./NetworkManager-kma_VWa8.js");return{NetworkManager:e}},[]);q(this,Me,new t);try{const e=location.protocol==="https:"?"wss:":"ws:";return await c(this,Me).connect(`${e}//${location.hostname}:3000`),Z(this,Gt,Mh).call(this),!0}catch{return alert("Cannot connect to server. Run: npm start"),!1}},vh=async function(){if(!await Z(this,Gt,Zo).call(this))return;const t=document.querySelector("#cr-arena .arena-card.selected")?.dataset.arena||"classic",e=document.getElementById("cr-room-name")?.value?.trim()||"My Arena",n=parseInt(document.getElementById("cr-max-players")?.value||"4"),i=parseInt(document.getElementById("cr-bots")?.value||"2"),r=document.getElementById("cr-name")?.value?.trim()||"Player",a=document.getElementById("cr-game-mode")?.value||"ffa",o=a!=="ffa"?document.getElementById("cr-team")?.value||"red":null;c(this,Me).createRoom(e,t,n,i,r,a,o,c(this,Jn).cr)},xh=async function(){await Z(this,Gt,Zo).call(this)&&c(this,Me).listRooms()},Mh=function(){c(this,Me)&&(c(this,Me).on("ROOM_LIST",t=>Z(this,Gt,Sh).call(this,t.rooms)),c(this,Me).on("ROOM_CREATED",t=>{Z(this,Gt,ba).call(this,"waiting"),document.getElementById("waiting-room-name").textContent=t.roomName,document.getElementById("btn-start-room").style.display="block",Z(this,Gt,Sr).call(this,t.players)}),c(this,Me).on("JOINED",t=>{Z(this,Gt,ba).call(this,"waiting"),document.getElementById("waiting-room-name").textContent=t.roomName,document.getElementById("btn-start-room").style.display=t.isHost?"block":"none",Z(this,Gt,Sr).call(this,t.players)}),c(this,Me).on("PLAYER_JOINED",t=>Z(this,Gt,Sr).call(this,t.players)),c(this,Me).on("PLAYER_LEFT",t=>Z(this,Gt,Sr).call(this,t.players)),c(this,Me).on("GAME_STARTED",t=>{var e;(e=c(this,qs))==null||e.call(this,{mode:"multi",arena:t.arena,botCount:t.botCount,playerName:t.playerName||Z(this,Gt,yh).call(this),network:c(this,Me),players:t.players,playerId:c(this,Me).playerId,gameMode:t.gameMode||"ffa",team:t.team||null,skinIndex:c(this,Jn).cr||c(this,Jn).jr||0})}))},yh=function(){return document.getElementById("cr-name")?.value?.trim()||document.getElementById("jr-name")?.value?.trim()||"Player"},ba=function(t){document.querySelectorAll(".lobby-panel").forEach(e=>e.classList.add("hidden")),document.getElementById(`panel-${t}`)?.classList.remove("hidden")},Sh=function(t){const e=document.getElementById("room-list"),n=document.getElementById("btn-join-room"),i=document.getElementById("jr-team-field");if(!t?.length){e.innerHTML='<div class="room-empty">No rooms available</div>',n.disabled=!0;return}e.innerHTML="",q(this,Ji,null),t.forEach(r=>{const a=document.createElement("div");a.className="room-item";const o=r.gameMode==="tdm"?"TDM":r.gameMode==="ctf"?"CTF":"FFA";a.innerHTML=`<div class="room-name-text">${Z(this,Gt,Jo).call(this,r.name)}</div><div class="room-info">${r.arena} · ${o} · ${r.playerCount}/${r.maxPlayers}</div>`,a.addEventListener("click",()=>{e.querySelectorAll(".room-item").forEach(l=>l.classList.remove("selected")),a.classList.add("selected"),q(this,Ji,r.id),q(this,Rr,r.gameMode||"ffa"),n.disabled=!1,i&&(i.style.display=c(this,Rr)!=="ffa"?"block":"none")}),e.appendChild(a)})},Sr=function(t){const e=document.getElementById("waiting-players");e.innerHTML="",t?.forEach(n=>{const i=document.createElement("div");i.className="waiting-player";const r=n.team?` [${n.team.toUpperCase()}]`:"";i.innerHTML=`<span class="player-dot" style="background:${n.color}"></span> ${Z(this,Gt,Jo).call(this,n.name)}${r}${n.isHost?" (Host)":""}`,e.appendChild(i)}),document.getElementById("waiting-info").textContent=`${t?.length||0} player(s) in room`},Jo=function(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _l="163",ud=0,Nl=1,dd=2,Eh=1,wh=2,Zn=3,Ui=0,Ze=1,mn=2,Ci=0,Gs=1,Fl=2,Ol=3,Bl=4,fd=5,$i=100,pd=101,md=102,gd=103,_d=104,vd=200,xd=201,Md=202,yd=203,Qo=204,tl=205,Sd=206,Ed=207,wd=208,Td=209,bd=210,Ad=211,Rd=212,Cd=213,Pd=214,Ld=0,Dd=1,Id=2,Pa=3,Ud=4,Nd=5,Fd=6,Od=7,Th=0,Bd=1,zd=2,Pi=0,Hd=1,kd=2,Gd=3,bh=4,Vd=5,Wd=6,Xd=7,Ah=300,er=301,nr=302,el=303,nl=304,Qa=306,il=1e3,ji=1001,sl=1002,gn=1003,qd=1004,Qr=1005,Rn=1006,ho=1007,Zi=1008,Li=1009,Yd=1010,$d=1011,Rh=1012,Ch=1013,ir=1014,Ri=1015,La=1016,Ph=1017,Lh=1018,Kr=1020,Kd=35902,jd=1021,Zd=1022,Gn=1023,Jd=1024,Qd=1025,Vs=1026,br=1027,tf=1028,Dh=1029,ef=1030,Ih=1031,Uh=1033,uo=33776,fo=33777,po=33778,mo=33779,zl=35840,Hl=35841,kl=35842,Gl=35843,Nh=36196,Vl=37492,Wl=37496,Xl=37808,ql=37809,Yl=37810,$l=37811,Kl=37812,jl=37813,Zl=37814,Jl=37815,Ql=37816,tc=37817,ec=37818,nc=37819,ic=37820,sc=37821,go=36492,rc=36494,ac=36495,nf=36283,oc=36284,lc=36285,cc=36286,sf=3200,rf=3201,Fh=0,af=1,vi="",Nn="srgb",Oi="srgb-linear",vl="display-p3",to="display-p3-linear",Da="linear",le="srgb",Ia="rec709",Ua="p3",vs=7680,hc=519,of=512,lf=513,cf=514,Oh=515,hf=516,uf=517,df=518,ff=519,rl=35044,uc="300 es",ci=2e3,Na=2001;class cr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_o=Math.PI/180,al=180/Math.PI;function Di(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Oe[s&255]+Oe[s>>8&255]+Oe[s>>16&255]+Oe[s>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]).toLowerCase()}function je(s,t,e){return Math.max(t,Math.min(e,s))}function pf(s,t){return(s%t+t)%t}function vo(s,t,e){return(1-e)*s+e*t}function kn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function te(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Et{constructor(t=0,e=0){Et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,n,i,r,a,o,l,h){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,h)}set(t,e,n,i,r,a,o,l,h){const u=this.elements;return u[0]=t,u[1]=i,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],h=n[1],u=n[4],d=n[7],f=n[2],g=n[5],M=n[8],y=i[0],m=i[3],p=i[6],w=i[1],x=i[4],T=i[7],D=i[2],P=i[5],C=i[8];return r[0]=a*y+o*w+l*D,r[3]=a*m+o*x+l*P,r[6]=a*p+o*T+l*C,r[1]=h*y+u*w+d*D,r[4]=h*m+u*x+d*P,r[7]=h*p+u*T+d*C,r[2]=f*y+g*w+M*D,r[5]=f*m+g*x+M*P,r[8]=f*p+g*T+M*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],u=t[8];return e*a*u-e*o*h-n*r*u+n*o*l+i*r*h-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],u=t[8],d=u*a-o*h,f=o*l-u*r,g=h*r-a*l,M=e*d+n*f+i*g;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/M;return t[0]=d*y,t[1]=(i*h-u*n)*y,t[2]=(o*n-i*a)*y,t[3]=f*y,t[4]=(u*e-i*l)*y,t[5]=(i*r-o*e)*y,t[6]=g*y,t[7]=(n*l-h*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),h=Math.sin(r);return this.set(n*l,n*h,-n*(l*a+h*o)+a+t,-i*h,i*l,-i*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(xo.makeScale(t,e)),this}rotate(t){return this.premultiply(xo.makeRotation(-t)),this}translate(t,e){return this.premultiply(xo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const xo=new Ot;function Bh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Fa(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function mf(){const s=Fa("canvas");return s.style.display="block",s}const dc={};function zh(s){s in dc||(dc[s]=!0,console.warn(s))}const fc=new Ot().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),pc=new Ot().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ta={[Oi]:{transfer:Da,primaries:Ia,toReference:s=>s,fromReference:s=>s},[Nn]:{transfer:le,primaries:Ia,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[to]:{transfer:Da,primaries:Ua,toReference:s=>s.applyMatrix3(pc),fromReference:s=>s.applyMatrix3(fc)},[vl]:{transfer:le,primaries:Ua,toReference:s=>s.convertSRGBToLinear().applyMatrix3(pc),fromReference:s=>s.applyMatrix3(fc).convertLinearToSRGB()}},gf=new Set([Oi,to]),ee={enabled:!0,_workingColorSpace:Oi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!gf.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=ta[t].toReference,i=ta[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return ta[s].primaries},getTransfer:function(s){return s===vi?Da:ta[s].transfer}};function Ws(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Mo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let xs;class _f{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{xs===void 0&&(xs=Fa("canvas")),xs.width=t.width,xs.height=t.height;const n=xs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=xs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Fa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Ws(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ws(e[n]/255)*255):e[n]=Ws(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let vf=0;class Hh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=Di(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(yo(i[a].image)):r.push(yo(i[a]))}else r=yo(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function yo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?_f.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xf=0;class qe extends cr{constructor(t=qe.DEFAULT_IMAGE,e=qe.DEFAULT_MAPPING,n=ji,i=ji,r=Rn,a=Zi,o=Gn,l=Li,h=qe.DEFAULT_ANISOTROPY,u=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=Di(),this.name="",this.source=new Hh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ah)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case il:t.x=t.x-Math.floor(t.x);break;case ji:t.x=t.x<0?0:1;break;case sl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case il:t.y=t.y-Math.floor(t.y);break;case ji:t.y=t.y<0?0:1;break;case sl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=Ah;qe.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,n=0,i=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,h=l[0],u=l[4],d=l[8],f=l[1],g=l[5],M=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(M-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(M+m)<.1&&Math.abs(h+g+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(h+1)/2,T=(g+1)/2,D=(p+1)/2,P=(u+f)/4,C=(d+y)/4,I=(M+m)/4;return x>T&&x>D?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=P/n,r=C/n):T>D?T<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(T),n=P/i,r=I/i):D<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(D),n=C/r,i=I/r),this.set(n,i,r,e),this}let w=Math.sqrt((m-M)*(m-M)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(w)<.001&&(w=1),this.x=(m-M)/w,this.y=(d-y)/w,this.z=(f-u)/w,this.w=Math.acos((h+g+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Mf extends cr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const r=new qe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Hh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gs extends Mf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class kh extends qe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=gn,this.minFilter=gn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yf extends qe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=gn,this.minFilter=gn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jr{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],h=n[i+1],u=n[i+2],d=n[i+3];const f=r[a+0],g=r[a+1],M=r[a+2],y=r[a+3];if(o===0){t[e+0]=l,t[e+1]=h,t[e+2]=u,t[e+3]=d;return}if(o===1){t[e+0]=f,t[e+1]=g,t[e+2]=M,t[e+3]=y;return}if(d!==y||l!==f||h!==g||u!==M){let m=1-o;const p=l*f+h*g+u*M+d*y,w=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const D=Math.sqrt(x),P=Math.atan2(D,p*w);m=Math.sin(m*P)/D,o=Math.sin(o*P)/D}const T=o*w;if(l=l*m+f*T,h=h*m+g*T,u=u*m+M*T,d=d*m+y*T,m===1-o){const D=1/Math.sqrt(l*l+h*h+u*u+d*d);l*=D,h*=D,u*=D,d*=D}}t[e]=l,t[e+1]=h,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],h=n[i+2],u=n[i+3],d=r[a],f=r[a+1],g=r[a+2],M=r[a+3];return t[e]=o*M+u*d+l*g-h*f,t[e+1]=l*M+u*f+h*d-o*g,t[e+2]=h*M+u*g+o*f-l*d,t[e+3]=u*M-o*d-l*f-h*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(n/2),u=o(i/2),d=o(r/2),f=l(n/2),g=l(i/2),M=l(r/2);switch(a){case"XYZ":this._x=f*u*d+h*g*M,this._y=h*g*d-f*u*M,this._z=h*u*M+f*g*d,this._w=h*u*d-f*g*M;break;case"YXZ":this._x=f*u*d+h*g*M,this._y=h*g*d-f*u*M,this._z=h*u*M-f*g*d,this._w=h*u*d+f*g*M;break;case"ZXY":this._x=f*u*d-h*g*M,this._y=h*g*d+f*u*M,this._z=h*u*M+f*g*d,this._w=h*u*d-f*g*M;break;case"ZYX":this._x=f*u*d-h*g*M,this._y=h*g*d+f*u*M,this._z=h*u*M-f*g*d,this._w=h*u*d+f*g*M;break;case"YZX":this._x=f*u*d+h*g*M,this._y=h*g*d+f*u*M,this._z=h*u*M-f*g*d,this._w=h*u*d-f*g*M;break;case"XZY":this._x=f*u*d-h*g*M,this._y=h*g*d-f*u*M,this._z=h*u*M+f*g*d,this._w=h*u*d+f*g*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],h=e[2],u=e[6],d=e[10],f=n+o+d;if(f>0){const g=.5/Math.sqrt(f+1);this._w=.25/g,this._x=(u-l)*g,this._y=(r-h)*g,this._z=(a-i)*g}else if(n>o&&n>d){const g=2*Math.sqrt(1+n-o-d);this._w=(u-l)/g,this._x=.25*g,this._y=(i+a)/g,this._z=(r+h)/g}else if(o>d){const g=2*Math.sqrt(1+o-n-d);this._w=(r-h)/g,this._x=(i+a)/g,this._y=.25*g,this._z=(l+u)/g}else{const g=2*Math.sqrt(1+d-n-o);this._w=(a-i)/g,this._x=(r+h)/g,this._y=(l+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(je(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,h=e._z,u=e._w;return this._x=n*u+a*o+i*h-r*l,this._y=i*u+a*l+r*o-n*h,this._z=r*u+a*h+n*l-i*o,this._w=a*u-n*o-i*l-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const g=1-e;return this._w=g*a+e*this._w,this._x=g*n+e*this._x,this._y=g*i+e*this._y,this._z=g*r+e*this._z,this.normalize(),this}const h=Math.sqrt(l),u=Math.atan2(h,o),d=Math.sin((1-e)*u)/h,f=Math.sin(e*u)/h;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(mc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(mc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*i-o*n),u=2*(o*e-r*i),d=2*(r*n-a*e);return this.x=e+l*h+a*d-o*u,this.y=n+l*u+o*h-r*d,this.z=i+l*d+r*u-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return So.copy(this).projectOnVector(t),this.sub(So)}reflect(t){return this.sub(So.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const So=new A,mc=new jr;class hr{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(_n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,_n):_n.fromBufferAttribute(r,a),_n.applyMatrix4(t.matrixWorld),this.expandByPoint(_n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ea.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ea.copy(n.boundingBox)),ea.applyMatrix4(t.matrixWorld),this.union(ea)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(pr),na.subVectors(this.max,pr),Ms.subVectors(t.a,pr),ys.subVectors(t.b,pr),Ss.subVectors(t.c,pr),di.subVectors(ys,Ms),fi.subVectors(Ss,ys),Hi.subVectors(Ms,Ss);let e=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Hi.z,Hi.y,di.z,0,-di.x,fi.z,0,-fi.x,Hi.z,0,-Hi.x,-di.y,di.x,0,-fi.y,fi.x,0,-Hi.y,Hi.x,0];return!Eo(e,Ms,ys,Ss,na)||(e=[1,0,0,0,1,0,0,0,1],!Eo(e,Ms,ys,Ss,na))?!1:(ia.crossVectors(di,fi),e=[ia.x,ia.y,ia.z],Eo(e,Ms,ys,Ss,na))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const qn=[new A,new A,new A,new A,new A,new A,new A,new A],_n=new A,ea=new hr,Ms=new A,ys=new A,Ss=new A,di=new A,fi=new A,Hi=new A,pr=new A,na=new A,ia=new A,ki=new A;function Eo(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){ki.fromArray(s,r);const o=i.x*Math.abs(ki.x)+i.y*Math.abs(ki.y)+i.z*Math.abs(ki.z),l=t.dot(ki),h=e.dot(ki),u=n.dot(ki);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>o)return!1}return!0}const Sf=new hr,mr=new A,wo=new A;class eo{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Sf.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;mr.subVectors(t,this.center);const e=mr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(mr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(wo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(mr.copy(t.center).add(wo)),this.expandByPoint(mr.copy(t.center).sub(wo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Yn=new A,To=new A,sa=new A,pi=new A,bo=new A,ra=new A,Ao=new A;class xl{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Yn.copy(this.origin).addScaledVector(this.direction,e),Yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){To.copy(t).add(e).multiplyScalar(.5),sa.copy(e).sub(t).normalize(),pi.copy(this.origin).sub(To);const r=t.distanceTo(e)*.5,a=-this.direction.dot(sa),o=pi.dot(this.direction),l=-pi.dot(sa),h=pi.lengthSq(),u=Math.abs(1-a*a);let d,f,g,M;if(u>0)if(d=a*l-o,f=a*o-l,M=r*u,d>=0)if(f>=-M)if(f<=M){const y=1/u;d*=y,f*=y,g=d*(d+a*f+2*o)+f*(a*d+f+2*l)+h}else f=r,d=Math.max(0,-(a*f+o)),g=-d*d+f*(f+2*l)+h;else f=-r,d=Math.max(0,-(a*f+o)),g=-d*d+f*(f+2*l)+h;else f<=-M?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),g=-d*d+f*(f+2*l)+h):f<=M?(d=0,f=Math.min(Math.max(-r,-l),r),g=f*(f+2*l)+h):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),g=-d*d+f*(f+2*l)+h);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),g=-d*d+f*(f+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(To).addScaledVector(sa,f),g}intersectSphere(t,e){Yn.subVectors(t.center,this.origin);const n=Yn.dot(this.direction),i=Yn.dot(Yn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const h=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return h>=0?(n=(t.min.x-f.x)*h,i=(t.max.x-f.x)*h):(n=(t.max.x-f.x)*h,i=(t.min.x-f.x)*h),u>=0?(r=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Yn)!==null}intersectTriangle(t,e,n,i,r){bo.subVectors(e,t),ra.subVectors(n,t),Ao.crossVectors(bo,ra);let a=this.direction.dot(Ao),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;pi.subVectors(this.origin,t);const l=o*this.direction.dot(ra.crossVectors(pi,ra));if(l<0)return null;const h=o*this.direction.dot(bo.cross(pi));if(h<0||l+h>a)return null;const u=-o*pi.dot(Ao);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,i,r,a,o,l,h,u,d,f,g,M,y,m){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,h,u,d,f,g,M,y,m)}set(t,e,n,i,r,a,o,l,h,u,d,f,g,M,y,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=h,p[6]=u,p[10]=d,p[14]=f,p[3]=g,p[7]=M,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Es.setFromMatrixColumn(t,0).length(),r=1/Es.setFromMatrixColumn(t,1).length(),a=1/Es.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),h=Math.sin(i),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const f=a*u,g=a*d,M=o*u,y=o*d;e[0]=l*u,e[4]=-l*d,e[8]=h,e[1]=g+M*h,e[5]=f-y*h,e[9]=-o*l,e[2]=y-f*h,e[6]=M+g*h,e[10]=a*l}else if(t.order==="YXZ"){const f=l*u,g=l*d,M=h*u,y=h*d;e[0]=f+y*o,e[4]=M*o-g,e[8]=a*h,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=g*o-M,e[6]=y+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*u,g=l*d,M=h*u,y=h*d;e[0]=f-y*o,e[4]=-a*d,e[8]=M+g*o,e[1]=g+M*o,e[5]=a*u,e[9]=y-f*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*u,g=a*d,M=o*u,y=o*d;e[0]=l*u,e[4]=M*h-g,e[8]=f*h+y,e[1]=l*d,e[5]=y*h+f,e[9]=g*h-M,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,g=a*h,M=o*l,y=o*h;e[0]=l*u,e[4]=y-f*d,e[8]=M*d+g,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-h*u,e[6]=g*d+M,e[10]=f-y*d}else if(t.order==="XZY"){const f=a*l,g=a*h,M=o*l,y=o*h;e[0]=l*u,e[4]=-d,e[8]=h*u,e[1]=f*d+y,e[5]=a*u,e[9]=g*d-M,e[2]=M*d-g,e[6]=o*u,e[10]=y*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ef,t,wf)}lookAt(t,e,n){const i=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),mi.crossVectors(n,Qe),mi.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),mi.crossVectors(n,Qe)),mi.normalize(),aa.crossVectors(Qe,mi),i[0]=mi.x,i[4]=aa.x,i[8]=Qe.x,i[1]=mi.y,i[5]=aa.y,i[9]=Qe.y,i[2]=mi.z,i[6]=aa.z,i[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],h=n[12],u=n[1],d=n[5],f=n[9],g=n[13],M=n[2],y=n[6],m=n[10],p=n[14],w=n[3],x=n[7],T=n[11],D=n[15],P=i[0],C=i[4],I=i[8],S=i[12],_=i[1],N=i[5],k=i[9],L=i[13],X=i[2],Y=i[6],J=i[10],tt=i[14],V=i[3],nt=i[7],et=i[11],_t=i[15];return r[0]=a*P+o*_+l*X+h*V,r[4]=a*C+o*N+l*Y+h*nt,r[8]=a*I+o*k+l*J+h*et,r[12]=a*S+o*L+l*tt+h*_t,r[1]=u*P+d*_+f*X+g*V,r[5]=u*C+d*N+f*Y+g*nt,r[9]=u*I+d*k+f*J+g*et,r[13]=u*S+d*L+f*tt+g*_t,r[2]=M*P+y*_+m*X+p*V,r[6]=M*C+y*N+m*Y+p*nt,r[10]=M*I+y*k+m*J+p*et,r[14]=M*S+y*L+m*tt+p*_t,r[3]=w*P+x*_+T*X+D*V,r[7]=w*C+x*N+T*Y+D*nt,r[11]=w*I+x*k+T*J+D*et,r[15]=w*S+x*L+T*tt+D*_t,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],h=t[13],u=t[2],d=t[6],f=t[10],g=t[14],M=t[3],y=t[7],m=t[11],p=t[15];return M*(+r*l*d-i*h*d-r*o*f+n*h*f+i*o*g-n*l*g)+y*(+e*l*g-e*h*f+r*a*f-i*a*g+i*h*u-r*l*u)+m*(+e*h*d-e*o*g-r*a*d+n*a*g+r*o*u-n*h*u)+p*(-i*o*u-e*l*d+e*o*f+i*a*d-n*a*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],u=t[8],d=t[9],f=t[10],g=t[11],M=t[12],y=t[13],m=t[14],p=t[15],w=d*m*h-y*f*h+y*l*g-o*m*g-d*l*p+o*f*p,x=M*f*h-u*m*h-M*l*g+a*m*g+u*l*p-a*f*p,T=u*y*h-M*d*h+M*o*g-a*y*g-u*o*p+a*d*p,D=M*d*l-u*y*l-M*o*f+a*y*f+u*o*m-a*d*m,P=e*w+n*x+i*T+r*D;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/P;return t[0]=w*C,t[1]=(y*f*r-d*m*r-y*i*g+n*m*g+d*i*p-n*f*p)*C,t[2]=(o*m*r-y*l*r+y*i*h-n*m*h-o*i*p+n*l*p)*C,t[3]=(d*l*r-o*f*r-d*i*h+n*f*h+o*i*g-n*l*g)*C,t[4]=x*C,t[5]=(u*m*r-M*f*r+M*i*g-e*m*g-u*i*p+e*f*p)*C,t[6]=(M*l*r-a*m*r-M*i*h+e*m*h+a*i*p-e*l*p)*C,t[7]=(a*f*r-u*l*r+u*i*h-e*f*h-a*i*g+e*l*g)*C,t[8]=T*C,t[9]=(M*d*r-u*y*r-M*n*g+e*y*g+u*n*p-e*d*p)*C,t[10]=(a*y*r-M*o*r+M*n*h-e*y*h-a*n*p+e*o*p)*C,t[11]=(u*o*r-a*d*r-u*n*h+e*d*h+a*n*g-e*o*g)*C,t[12]=D*C,t[13]=(u*y*i-M*d*i+M*n*f-e*y*f-u*n*m+e*d*m)*C,t[14]=(M*o*i-a*y*i-M*n*l+e*y*l+a*n*m-e*o*m)*C,t[15]=(a*d*i-u*o*i+u*n*l-e*d*l-a*n*f+e*o*f)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,h=r*a,u=r*o;return this.set(h*a+n,h*o-i*l,h*l+i*o,0,h*o+i*l,u*o+n,u*l-i*a,0,h*l-i*o,u*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,h=r+r,u=a+a,d=o+o,f=r*h,g=r*u,M=r*d,y=a*u,m=a*d,p=o*d,w=l*h,x=l*u,T=l*d,D=n.x,P=n.y,C=n.z;return i[0]=(1-(y+p))*D,i[1]=(g+T)*D,i[2]=(M-x)*D,i[3]=0,i[4]=(g-T)*P,i[5]=(1-(f+p))*P,i[6]=(m+w)*P,i[7]=0,i[8]=(M+x)*C,i[9]=(m-w)*C,i[10]=(1-(f+y))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Es.set(i[0],i[1],i[2]).length();const a=Es.set(i[4],i[5],i[6]).length(),o=Es.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],vn.copy(this);const h=1/r,u=1/a,d=1/o;return vn.elements[0]*=h,vn.elements[1]*=h,vn.elements[2]*=h,vn.elements[4]*=u,vn.elements[5]*=u,vn.elements[6]*=u,vn.elements[8]*=d,vn.elements[9]*=d,vn.elements[10]*=d,e.setFromRotationMatrix(vn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=ci){const l=this.elements,h=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),f=(n+i)/(n-i);let g,M;if(o===ci)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Na)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=ci){const l=this.elements,h=1/(e-t),u=1/(n-i),d=1/(a-r),f=(e+t)*h,g=(n+i)*u;let M,y;if(o===ci)M=(a+r)*d,y=-2*d;else if(o===Na)M=r*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=y,l[14]=-M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Es=new A,vn=new he,Ef=new A(0,0,0),wf=new A(1,1,1),mi=new A,aa=new A,Qe=new A,gc=new he,_c=new jr;class Vn{constructor(t=0,e=0,n=0,i=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],h=i[5],u=i[9],d=i[2],f=i[6],g=i[10];switch(e){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,g),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return gc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(gc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return _c.setFromEuler(this),this.setFromQuaternion(_c,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class Ml{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Tf=0;const vc=new A,ws=new jr,$n=new he,oa=new A,gr=new A,bf=new A,Af=new jr,xc=new A(1,0,0),Mc=new A(0,1,0),yc=new A(0,0,1),Sc={type:"added"},Rf={type:"removed"},Ts={type:"childadded",child:null},Ro={type:"childremoved",child:null};class be extends cr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new A,e=new Vn,n=new jr,i=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new he},normalMatrix:{value:new Ot}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ml,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.multiply(ws),this}rotateOnWorldAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.premultiply(ws),this}rotateX(t){return this.rotateOnAxis(xc,t)}rotateY(t){return this.rotateOnAxis(Mc,t)}rotateZ(t){return this.rotateOnAxis(yc,t)}translateOnAxis(t,e){return vc.copy(t).applyQuaternion(this.quaternion),this.position.add(vc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xc,t)}translateY(t){return this.translateOnAxis(Mc,t)}translateZ(t){return this.translateOnAxis(yc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?oa.copy(t):oa.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(gr,oa,this.up):$n.lookAt(oa,gr,this.up),this.quaternion.setFromRotationMatrix($n),i&&($n.extractRotation(i.matrixWorld),ws.setFromRotationMatrix($n),this.quaternion.premultiply(ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Sc),Ts.child=t,this.dispatchEvent(Ts),Ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rf),Ro.child=t,this.dispatchEvent(Ro),Ro.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),$n.multiply(t.parent.matrixWorld)),t.applyMatrix4($n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Sc),Ts.child=t,this.dispatchEvent(Ts),Ts.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,t,bf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,Af,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++){const o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){const d=l[h];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),u=a(t.images),d=a(t.shapes),f=a(t.skeletons),g=a(t.animations),M=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),g.length>0&&(n.animations=g),M.length>0&&(n.nodes=M)}return n.object=i,n;function a(o){const l=[];for(const h in o){const u=o[h];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}be.DEFAULT_UP=new A(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new A,Kn=new A,Co=new A,jn=new A,bs=new A,As=new A,Ec=new A,Po=new A,Lo=new A,Do=new A;class Cn{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),xn.subVectors(t,e),i.cross(xn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){xn.subVectors(i,e),Kn.subVectors(n,e),Co.subVectors(t,e);const a=xn.dot(xn),o=xn.dot(Kn),l=xn.dot(Co),h=Kn.dot(Kn),u=Kn.dot(Co),d=a*h-o*o;if(d===0)return r.set(0,0,0),null;const f=1/d,g=(h*l-o*u)*f,M=(a*u-o*l)*f;return r.set(1-g-M,M,g)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,jn.x),l.addScaledVector(a,jn.y),l.addScaledVector(o,jn.z),l)}static isFrontFacing(t,e,n,i){return xn.subVectors(n,e),Kn.subVectors(t,e),xn.cross(Kn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return xn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),xn.cross(Kn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Cn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Cn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Cn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Cn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Cn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;bs.subVectors(i,n),As.subVectors(r,n),Po.subVectors(t,n);const l=bs.dot(Po),h=As.dot(Po);if(l<=0&&h<=0)return e.copy(n);Lo.subVectors(t,i);const u=bs.dot(Lo),d=As.dot(Lo);if(u>=0&&d<=u)return e.copy(i);const f=l*d-u*h;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(bs,a);Do.subVectors(t,r);const g=bs.dot(Do),M=As.dot(Do);if(M>=0&&g<=M)return e.copy(r);const y=g*h-l*M;if(y<=0&&h>=0&&M<=0)return o=h/(h-M),e.copy(n).addScaledVector(As,o);const m=u*M-g*d;if(m<=0&&d-u>=0&&g-M>=0)return Ec.subVectors(r,i),o=(d-u)/(d-u+(g-M)),e.copy(i).addScaledVector(Ec,o);const p=1/(m+y+f);return a=y*p,o=f*p,e.copy(n).addScaledVector(bs,a).addScaledVector(As,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Gh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},la={h:0,s:0,l:0};function Io(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Nn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ee.workingColorSpace){if(t=pf(t,1),e=je(e,0,1),n=je(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Io(a,r,t+1/3),this.g=Io(a,r,t),this.b=Io(a,r,t-1/3)}return ee.toWorkingColorSpace(this,i),this}setStyle(t,e=Nn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Nn){const n=Gh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ws(t.r),this.g=Ws(t.g),this.b=Ws(t.b),this}copyLinearToSRGB(t){return this.r=Mo(t.r),this.g=Mo(t.g),this.b=Mo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Nn){return ee.fromWorkingColorSpace(Be.copy(this),t),Math.round(je(Be.r*255,0,255))*65536+Math.round(je(Be.g*255,0,255))*256+Math.round(je(Be.b*255,0,255))}getHexString(t=Nn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Be.copy(this),e);const n=Be.r,i=Be.g,r=Be.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,h;const u=(o+a)/2;if(o===a)l=0,h=0;else{const d=a-o;switch(h=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=h,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=Nn){ee.fromWorkingColorSpace(Be.copy(this),t);const e=Be.r,n=Be.g,i=Be.b;return t!==Nn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(gi),this.setHSL(gi.h+t,gi.s+e,gi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(gi),t.getHSL(la);const n=vo(gi.h,la.h,e),i=vo(gi.s,la.s,e),r=vo(gi.l,la.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new zt;zt.NAMES=Gh;let Cf=0;class _s extends cr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=Di(),this.name="",this.type="Material",this.blending=Gs,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qo,this.blendDst=tl,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Pa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vs,this.stencilZFail=vs,this.stencilZPass=vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(n.blending=this.blending),this.side!==Ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qo&&(n.blendSrc=this.blendSrc),this.blendDst!==tl&&(n.blendDst=this.blendDst),this.blendEquation!==$i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ke extends _s{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Th,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new A,ca=new Et;class Pn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=rl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return zh("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ca.fromBufferAttribute(this,e),ca.applyMatrix3(t),this.setXY(e,ca.x,ca.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=kn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=te(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=kn(e,this.array)),e}setX(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=kn(e,this.array)),e}setY(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=kn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=kn(e,this.array)),e}setW(t,e){return this.normalized&&(e=te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array),i=te(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=te(e,this.array),n=te(n,this.array),i=te(i,this.array),r=te(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==rl&&(t.usage=this.usage),t}}class Vh extends Pn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Wh extends Pn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class re extends Pn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Pf=0;const hn=new he,Uo=new be,Rs=new A,tn=new hr,_r=new hr,Pe=new A;class Ye extends cr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=Di(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bh(t)?Wh:Vh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,n){return hn.makeTranslation(t,e,n),this.applyMatrix4(hn),this}scale(t,e,n){return hn.makeScale(t,e,n),this.applyMatrix4(hn),this}lookAt(t){return Uo.lookAt(t),Uo.updateMatrix(),this.applyMatrix4(Uo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rs).negate(),this.translate(Rs.x,Rs.y,Rs.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new re(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new eo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(tn.min,_r.min),tn.expandByPoint(Pe),Pe.addVectors(tn.max,_r.max),tn.expandByPoint(Pe)):(tn.expandByPoint(_r.min),tn.expandByPoint(_r.max))}tn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Pe.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Pe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let h=0,u=o.count;h<u;h++)Pe.fromBufferAttribute(o,h),l&&(Rs.fromBufferAttribute(t,h),Pe.add(Rs)),i=Math.max(i,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new A,l[I]=new A;const h=new A,u=new A,d=new A,f=new Et,g=new Et,M=new Et,y=new A,m=new A;function p(I,S,_){h.fromBufferAttribute(n,I),u.fromBufferAttribute(n,S),d.fromBufferAttribute(n,_),f.fromBufferAttribute(r,I),g.fromBufferAttribute(r,S),M.fromBufferAttribute(r,_),u.sub(h),d.sub(h),g.sub(f),M.sub(f);const N=1/(g.x*M.y-M.x*g.y);isFinite(N)&&(y.copy(u).multiplyScalar(M.y).addScaledVector(d,-g.y).multiplyScalar(N),m.copy(d).multiplyScalar(g.x).addScaledVector(u,-M.x).multiplyScalar(N),o[I].add(y),o[S].add(y),o[_].add(y),l[I].add(m),l[S].add(m),l[_].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let I=0,S=w.length;I<S;++I){const _=w[I],N=_.start,k=_.count;for(let L=N,X=N+k;L<X;L+=3)p(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const x=new A,T=new A,D=new A,P=new A;function C(I){D.fromBufferAttribute(i,I),P.copy(D);const S=o[I];x.copy(S),x.sub(D.multiplyScalar(D.dot(S))).normalize(),T.crossVectors(P,S);const N=T.dot(l[I])<0?-1:1;a.setXYZW(I,x.x,x.y,x.z,N)}for(let I=0,S=w.length;I<S;++I){const _=w[I],N=_.start,k=_.count;for(let L=N,X=N+k;L<X;L+=3)C(t.getX(L+0)),C(t.getX(L+1)),C(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,g=n.count;f<g;f++)n.setXYZ(f,0,0,0);const i=new A,r=new A,a=new A,o=new A,l=new A,h=new A,u=new A,d=new A;if(t)for(let f=0,g=t.count;f<g;f+=3){const M=t.getX(f+0),y=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,M),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,m),u.subVectors(a,r),d.subVectors(i,r),u.cross(d),o.fromBufferAttribute(n,M),l.fromBufferAttribute(n,y),h.fromBufferAttribute(n,m),o.add(u),l.add(u),h.add(u),n.setXYZ(M,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,g=e.count;f<g;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,r),d.subVectors(i,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,l){const h=o.array,u=o.itemSize,d=o.normalized,f=new h.constructor(l.length*u);let g=0,M=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?g=l[y]*o.data.stride+o.offset:g=l[y]*u;for(let p=0;p<u;p++)f[M++]=h[g++]}return new Pn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ye,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],h=t(l,n);e.setAttribute(o,h)}const r=this.morphAttributes;for(const o in r){const l=[],h=r[o];for(let u=0,d=h.length;u<d;u++){const f=h[u],g=t(f,n);l.push(g)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],u=[];for(let d=0,f=h.length;d<f;d++){const g=h[d];u.push(g.toJSON(t.data))}u.length>0&&(i[l]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const h in i){const u=i[h];this.setAttribute(h,u.clone(e))}const r=t.morphAttributes;for(const h in r){const u=[],d=r[h];for(let f=0,g=d.length;f<g;f++)u.push(d[f].clone(e));this.morphAttributes[h]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,u=a.length;h<u;h++){const d=a[h];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wc=new he,Gi=new xl,ha=new eo,Tc=new A,Cs=new A,Ps=new A,Ls=new A,No=new A,ua=new A,da=new Et,fa=new Et,pa=new Et,bc=new A,Ac=new A,Rc=new A,ma=new A,ga=new A;class ht extends be{constructor(t=new Ye,e=new ke){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){ua.set(0,0,0);for(let l=0,h=r.length;l<h;l++){const u=o[l],d=r[l];u!==0&&(No.fromBufferAttribute(d,t),a?ua.addScaledVector(No,u):ua.addScaledVector(No.sub(e),u))}e.add(ua)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ha.copy(n.boundingSphere),ha.applyMatrix4(r),Gi.copy(t.ray).recast(t.near),!(ha.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(ha,Tc)===null||Gi.origin.distanceToSquared(Tc)>(t.far-t.near)**2))&&(wc.copy(r).invert(),Gi.copy(t.ray).applyMatrix4(wc),!(n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Gi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,h=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let M=0,y=f.length;M<y;M++){const m=f[M],p=a[m.materialIndex],w=Math.max(m.start,g.start),x=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let T=w,D=x;T<D;T+=3){const P=o.getX(T),C=o.getX(T+1),I=o.getX(T+2);i=_a(this,p,t,n,h,u,d,P,C,I),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const M=Math.max(0,g.start),y=Math.min(o.count,g.start+g.count);for(let m=M,p=y;m<p;m+=3){const w=o.getX(m),x=o.getX(m+1),T=o.getX(m+2);i=_a(this,a,t,n,h,u,d,w,x,T),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let M=0,y=f.length;M<y;M++){const m=f[M],p=a[m.materialIndex],w=Math.max(m.start,g.start),x=Math.min(l.count,Math.min(m.start+m.count,g.start+g.count));for(let T=w,D=x;T<D;T+=3){const P=T,C=T+1,I=T+2;i=_a(this,p,t,n,h,u,d,P,C,I),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const M=Math.max(0,g.start),y=Math.min(l.count,g.start+g.count);for(let m=M,p=y;m<p;m+=3){const w=m,x=m+1,T=m+2;i=_a(this,a,t,n,h,u,d,w,x,T),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Lf(s,t,e,n,i,r,a,o){let l;if(t.side===Ze?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Ui,o),l===null)return null;ga.copy(o),ga.applyMatrix4(s.matrixWorld);const h=e.ray.origin.distanceTo(ga);return h<e.near||h>e.far?null:{distance:h,point:ga.clone(),object:s}}function _a(s,t,e,n,i,r,a,o,l,h){s.getVertexPosition(o,Cs),s.getVertexPosition(l,Ps),s.getVertexPosition(h,Ls);const u=Lf(s,t,e,n,Cs,Ps,Ls,ma);if(u){i&&(da.fromBufferAttribute(i,o),fa.fromBufferAttribute(i,l),pa.fromBufferAttribute(i,h),u.uv=Cn.getInterpolation(ma,Cs,Ps,Ls,da,fa,pa,new Et)),r&&(da.fromBufferAttribute(r,o),fa.fromBufferAttribute(r,l),pa.fromBufferAttribute(r,h),u.uv1=Cn.getInterpolation(ma,Cs,Ps,Ls,da,fa,pa,new Et)),a&&(bc.fromBufferAttribute(a,o),Ac.fromBufferAttribute(a,l),Rc.fromBufferAttribute(a,h),u.normal=Cn.getInterpolation(ma,Cs,Ps,Ls,bc,Ac,Rc,new A),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c:h,normal:new A,materialIndex:0};Cn.getNormal(Cs,Ps,Ls,d.normal),u.face=d}return u}class kt extends Ye{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],h=[],u=[],d=[];let f=0,g=0;M("z","y","x",-1,-1,n,e,t,a,r,0),M("z","y","x",1,-1,n,e,-t,a,r,1),M("x","z","y",1,1,t,n,e,i,a,2),M("x","z","y",1,-1,t,n,-e,i,a,3),M("x","y","z",1,-1,t,e,n,i,r,4),M("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new re(h,3)),this.setAttribute("normal",new re(u,3)),this.setAttribute("uv",new re(d,2));function M(y,m,p,w,x,T,D,P,C,I,S){const _=T/C,N=D/I,k=T/2,L=D/2,X=P/2,Y=C+1,J=I+1;let tt=0,V=0;const nt=new A;for(let et=0;et<J;et++){const _t=et*N-L;for(let Wt=0;Wt<Y;Wt++){const ie=Wt*_-k;nt[y]=ie*w,nt[m]=_t*x,nt[p]=X,h.push(nt.x,nt.y,nt.z),nt[y]=0,nt[m]=0,nt[p]=P>0?1:-1,u.push(nt.x,nt.y,nt.z),d.push(Wt/C),d.push(1-et/I),tt+=1}}for(let et=0;et<I;et++)for(let _t=0;_t<C;_t++){const Wt=f+_t+Y*et,ie=f+_t+Y*(et+1),W=f+(_t+1)+Y*(et+1),it=f+(_t+1)+Y*et;l.push(Wt,ie,it),l.push(ie,W,it),V+=6}o.addGroup(g,V,S),g+=V,f+=tt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function sr(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function We(s){const t={};for(let e=0;e<s.length;e++){const n=sr(s[e]);for(const i in n)t[i]=n[i]}return t}function Df(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Xh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const If={clone:sr,merge:We};var Uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ni extends _s{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uf,this.fragmentShader=Nf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=sr(t.uniforms),this.uniformsGroups=Df(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class qh extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=ci}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const _i=new A,Cc=new Et,Pc=new Et;class on extends qh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=al*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(_o*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return al*2*Math.atan(Math.tan(_o*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(_i.x,_i.y).multiplyScalar(-t/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_i.x,_i.y).multiplyScalar(-t/_i.z)}getViewSize(t,e){return this.getViewBounds(t,Cc,Pc),e.subVectors(Pc,Cc)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(_o*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/h,i*=a.width/l,n*=a.height/h}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ds=-90,Is=1;class Ff extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new on(Ds,Is,t,e);i.layers=this.layers,this.add(i);const r=new on(Ds,Is,t,e);r.layers=this.layers,this.add(r);const a=new on(Ds,Is,t,e);a.layers=this.layers,this.add(a);const o=new on(Ds,Is,t,e);o.layers=this.layers,this.add(o);const l=new on(Ds,Is,t,e);l.layers=this.layers,this.add(l);const h=new on(Ds,Is,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const h of e)this.remove(h);if(t===ci)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Na)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,h,u]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),M=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,h),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(d,f,g),t.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class Yh extends qe{constructor(t,e,n,i,r,a,o,l,h,u){t=t!==void 0?t:[],e=e!==void 0?e:er,super(t,e,n,i,r,a,o,l,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Of extends gs{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Yh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Rn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new kt(5,5,5),r=new Ni({name:"CubemapFromEquirect",uniforms:sr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ze,blending:Ci});r.uniforms.tEquirect.value=e;const a=new ht(i,r),o=e.minFilter;return e.minFilter===Zi&&(e.minFilter=Rn),new Ff(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const Fo=new A,Bf=new A,zf=new Ot;class qi{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Fo.subVectors(n,e).cross(Bf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Fo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||zf.getNormalMatrix(t),i=this.coplanarPoint(Fo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vi=new eo,va=new A;class yl{constructor(t=new qi,e=new qi,n=new qi,i=new qi,r=new qi,a=new qi){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ci){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],h=i[4],u=i[5],d=i[6],f=i[7],g=i[8],M=i[9],y=i[10],m=i[11],p=i[12],w=i[13],x=i[14],T=i[15];if(n[0].setComponents(l-r,f-h,m-g,T-p).normalize(),n[1].setComponents(l+r,f+h,m+g,T+p).normalize(),n[2].setComponents(l+a,f+u,m+M,T+w).normalize(),n[3].setComponents(l-a,f-u,m-M,T-w).normalize(),n[4].setComponents(l-o,f-d,m-y,T-x).normalize(),e===ci)n[5].setComponents(l+o,f+d,m+y,T+x).normalize();else if(e===Na)n[5].setComponents(o,d,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(t){return Vi.center.set(0,0,0),Vi.radius=.7071067811865476,Vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(va.x=i.normal.x>0?t.max.x:t.min.x,va.y=i.normal.y>0?t.max.y:t.min.y,va.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(va)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function $h(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Hf(s){const t=new WeakMap;function e(o,l){const h=o.array,u=o.usage,d=h.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,h,u),o.onUploadCallback();let g;if(h instanceof Float32Array)g=s.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?g=s.HALF_FLOAT:g=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=s.SHORT;else if(h instanceof Uint32Array)g=s.UNSIGNED_INT;else if(h instanceof Int32Array)g=s.INT;else if(h instanceof Int8Array)g=s.BYTE;else if(h instanceof Uint8Array)g=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,h){const u=l.array,d=l._updateRange,f=l.updateRanges;if(s.bindBuffer(h,o),d.count===-1&&f.length===0&&s.bufferSubData(h,0,u),f.length!==0){for(let g=0,M=f.length;g<M;g++){const y=f[g];s.bufferSubData(h,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}d.count!==-1&&(s.bufferSubData(h,d.offset*u.BYTES_PER_ELEMENT,u,d.offset,d.count),d.count=-1),l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,l),h.version=o.version}}return{get:i,remove:r,update:a}}class ur extends Ye{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),h=o+1,u=l+1,d=t/o,f=e/l,g=[],M=[],y=[],m=[];for(let p=0;p<u;p++){const w=p*f-a;for(let x=0;x<h;x++){const T=x*d-r;M.push(T,-w,0),y.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){const x=w+h*p,T=w+h*(p+1),D=w+1+h*(p+1),P=w+1+h*p;g.push(x,T,P),g.push(T,D,P)}this.setIndex(g),this.setAttribute("position",new re(M,3)),this.setAttribute("normal",new re(y,3)),this.setAttribute("uv",new re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ur(t.width,t.height,t.widthSegments,t.heightSegments)}}var kf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kf=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Zf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ep=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ap=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,op=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,cp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,hp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,up=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_p="gl_FragColor = linearToOutputTexel( gl_FragColor );",vp=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,xp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Mp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ep=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Pp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ip=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Up=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Np=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Op=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Hp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Gp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$p=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Zp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,em=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,im=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,sm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,am=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,um=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_m=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ym=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Em=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,wm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Am=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Lm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Dm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Im=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Um=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, newPeak * vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Hm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const km=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$m=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Km=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ng=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ig=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ag=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,og=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,lg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ug=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_g=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:kf,alphahash_pars_fragment:Gf,alphamap_fragment:Vf,alphamap_pars_fragment:Wf,alphatest_fragment:Xf,alphatest_pars_fragment:qf,aomap_fragment:Yf,aomap_pars_fragment:$f,batching_pars_vertex:Kf,batching_vertex:jf,begin_vertex:Zf,beginnormal_vertex:Jf,bsdfs:Qf,iridescence_fragment:tp,bumpmap_pars_fragment:ep,clipping_planes_fragment:np,clipping_planes_pars_fragment:ip,clipping_planes_pars_vertex:sp,clipping_planes_vertex:rp,color_fragment:ap,color_pars_fragment:op,color_pars_vertex:lp,color_vertex:cp,common:hp,cube_uv_reflection_fragment:up,defaultnormal_vertex:dp,displacementmap_pars_vertex:fp,displacementmap_vertex:pp,emissivemap_fragment:mp,emissivemap_pars_fragment:gp,colorspace_fragment:_p,colorspace_pars_fragment:vp,envmap_fragment:xp,envmap_common_pars_fragment:Mp,envmap_pars_fragment:yp,envmap_pars_vertex:Sp,envmap_physical_pars_fragment:Up,envmap_vertex:Ep,fog_vertex:wp,fog_pars_vertex:Tp,fog_fragment:bp,fog_pars_fragment:Ap,gradientmap_pars_fragment:Rp,lightmap_fragment:Cp,lightmap_pars_fragment:Pp,lights_lambert_fragment:Lp,lights_lambert_pars_fragment:Dp,lights_pars_begin:Ip,lights_toon_fragment:Np,lights_toon_pars_fragment:Fp,lights_phong_fragment:Op,lights_phong_pars_fragment:Bp,lights_physical_fragment:zp,lights_physical_pars_fragment:Hp,lights_fragment_begin:kp,lights_fragment_maps:Gp,lights_fragment_end:Vp,logdepthbuf_fragment:Wp,logdepthbuf_pars_fragment:Xp,logdepthbuf_pars_vertex:qp,logdepthbuf_vertex:Yp,map_fragment:$p,map_pars_fragment:Kp,map_particle_fragment:jp,map_particle_pars_fragment:Zp,metalnessmap_fragment:Jp,metalnessmap_pars_fragment:Qp,morphinstance_vertex:tm,morphcolor_vertex:em,morphnormal_vertex:nm,morphtarget_pars_vertex:im,morphtarget_vertex:sm,normal_fragment_begin:rm,normal_fragment_maps:am,normal_pars_fragment:om,normal_pars_vertex:lm,normal_vertex:cm,normalmap_pars_fragment:hm,clearcoat_normal_fragment_begin:um,clearcoat_normal_fragment_maps:dm,clearcoat_pars_fragment:fm,iridescence_pars_fragment:pm,opaque_fragment:mm,packing:gm,premultiplied_alpha_fragment:_m,project_vertex:vm,dithering_fragment:xm,dithering_pars_fragment:Mm,roughnessmap_fragment:ym,roughnessmap_pars_fragment:Sm,shadowmap_pars_fragment:Em,shadowmap_pars_vertex:wm,shadowmap_vertex:Tm,shadowmask_pars_fragment:bm,skinbase_vertex:Am,skinning_pars_vertex:Rm,skinning_vertex:Cm,skinnormal_vertex:Pm,specularmap_fragment:Lm,specularmap_pars_fragment:Dm,tonemapping_fragment:Im,tonemapping_pars_fragment:Um,transmission_fragment:Nm,transmission_pars_fragment:Fm,uv_pars_fragment:Om,uv_pars_vertex:Bm,uv_vertex:zm,worldpos_vertex:Hm,background_vert:km,background_frag:Gm,backgroundCube_vert:Vm,backgroundCube_frag:Wm,cube_vert:Xm,cube_frag:qm,depth_vert:Ym,depth_frag:$m,distanceRGBA_vert:Km,distanceRGBA_frag:jm,equirect_vert:Zm,equirect_frag:Jm,linedashed_vert:Qm,linedashed_frag:tg,meshbasic_vert:eg,meshbasic_frag:ng,meshlambert_vert:ig,meshlambert_frag:sg,meshmatcap_vert:rg,meshmatcap_frag:ag,meshnormal_vert:og,meshnormal_frag:lg,meshphong_vert:cg,meshphong_frag:hg,meshphysical_vert:ug,meshphysical_frag:dg,meshtoon_vert:fg,meshtoon_frag:pg,points_vert:mg,points_frag:gg,shadow_vert:_g,shadow_frag:vg,sprite_vert:xg,sprite_frag:Mg},lt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},Hn={basic:{uniforms:We([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:We([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new zt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:We([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:We([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:We([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new zt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:We([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:We([lt.points,lt.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:We([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:We([lt.common,lt.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:We([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:We([lt.sprite,lt.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:We([lt.common,lt.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:We([lt.lights,lt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Hn.physical={uniforms:We([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const xa={r:0,b:0,g:0},Wi=new Vn,yg=new he;function Sg(s,t,e,n,i,r,a){const o=new zt(0);let l=r===!0?0:1,h,u,d=null,f=0,g=null;function M(m,p){let w=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?e:t).get(x)),x===null?y(o,l):x&&x.isColor&&(y(x,1),w=!0);const T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||w)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Qa)?(u===void 0&&(u=new ht(new kt(1,1,1),new Ni({name:"BackgroundCubeMaterial",uniforms:sr(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Wi.copy(p.backgroundRotation),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(yg.makeRotationFromEuler(Wi)),u.material.toneMapped=ee.getTransfer(x.colorSpace)!==le,(d!==x||f!==x.version||g!==s.toneMapping)&&(u.material.needsUpdate=!0,d=x,f=x.version,g=s.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(h===void 0&&(h=new ht(new ur(2,2),new Ni({name:"BackgroundMaterial",uniforms:sr(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=x,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=ee.getTransfer(x.colorSpace)!==le,x.matrixAutoUpdate===!0&&x.updateMatrix(),h.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||f!==x.version||g!==s.toneMapping)&&(h.material.needsUpdate=!0,d=x,f=x.version,g=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null))}function y(m,p){m.getRGB(xa,Xh(s)),n.buffers.color.setClear(xa.r,xa.g,xa.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,y(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,y(o,l)},render:M}}function Eg(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,a=!1;function o(_,N,k,L,X){let Y=!1;const J=d(L,k,N);r!==J&&(r=J,h(r.object)),Y=g(_,L,k,X),Y&&M(_,L,k,X),X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,T(_,N,k,L),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return s.createVertexArray()}function h(_){return s.bindVertexArray(_)}function u(_){return s.deleteVertexArray(_)}function d(_,N,k){const L=k.wireframe===!0;let X=n[_.id];X===void 0&&(X={},n[_.id]=X);let Y=X[N.id];Y===void 0&&(Y={},X[N.id]=Y);let J=Y[L];return J===void 0&&(J=f(l()),Y[L]=J),J}function f(_){const N=[],k=[],L=[];for(let X=0;X<e;X++)N[X]=0,k[X]=0,L[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:k,attributeDivisors:L,object:_,attributes:{},index:null}}function g(_,N,k,L){const X=r.attributes,Y=N.attributes;let J=0;const tt=k.getAttributes();for(const V in tt)if(tt[V].location>=0){const et=X[V];let _t=Y[V];if(_t===void 0&&(V==="instanceMatrix"&&_.instanceMatrix&&(_t=_.instanceMatrix),V==="instanceColor"&&_.instanceColor&&(_t=_.instanceColor)),et===void 0||et.attribute!==_t||_t&&et.data!==_t.data)return!0;J++}return r.attributesNum!==J||r.index!==L}function M(_,N,k,L){const X={},Y=N.attributes;let J=0;const tt=k.getAttributes();for(const V in tt)if(tt[V].location>=0){let et=Y[V];et===void 0&&(V==="instanceMatrix"&&_.instanceMatrix&&(et=_.instanceMatrix),V==="instanceColor"&&_.instanceColor&&(et=_.instanceColor));const _t={};_t.attribute=et,et&&et.data&&(_t.data=et.data),X[V]=_t,J++}r.attributes=X,r.attributesNum=J,r.index=L}function y(){const _=r.newAttributes;for(let N=0,k=_.length;N<k;N++)_[N]=0}function m(_){p(_,0)}function p(_,N){const k=r.newAttributes,L=r.enabledAttributes,X=r.attributeDivisors;k[_]=1,L[_]===0&&(s.enableVertexAttribArray(_),L[_]=1),X[_]!==N&&(s.vertexAttribDivisor(_,N),X[_]=N)}function w(){const _=r.newAttributes,N=r.enabledAttributes;for(let k=0,L=N.length;k<L;k++)N[k]!==_[k]&&(s.disableVertexAttribArray(k),N[k]=0)}function x(_,N,k,L,X,Y,J){J===!0?s.vertexAttribIPointer(_,N,k,X,Y):s.vertexAttribPointer(_,N,k,L,X,Y)}function T(_,N,k,L){y();const X=L.attributes,Y=k.getAttributes(),J=N.defaultAttributeValues;for(const tt in Y){const V=Y[tt];if(V.location>=0){let nt=X[tt];if(nt===void 0&&(tt==="instanceMatrix"&&_.instanceMatrix&&(nt=_.instanceMatrix),tt==="instanceColor"&&_.instanceColor&&(nt=_.instanceColor)),nt!==void 0){const et=nt.normalized,_t=nt.itemSize,Wt=t.get(nt);if(Wt===void 0)continue;const ie=Wt.buffer,W=Wt.type,it=Wt.bytesPerElement,ft=W===s.INT||W===s.UNSIGNED_INT||nt.gpuType===Ch;if(nt.isInterleavedBufferAttribute){const ut=nt.data,Ut=ut.stride,Bt=nt.offset;if(ut.isInstancedInterleavedBuffer){for(let $t=0;$t<V.locationSize;$t++)p(V.location+$t,ut.meshPerAttribute);_.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let $t=0;$t<V.locationSize;$t++)m(V.location+$t);s.bindBuffer(s.ARRAY_BUFFER,ie);for(let $t=0;$t<V.locationSize;$t++)x(V.location+$t,_t/V.locationSize,W,et,Ut*it,(Bt+_t/V.locationSize*$t)*it,ft)}else{if(nt.isInstancedBufferAttribute){for(let ut=0;ut<V.locationSize;ut++)p(V.location+ut,nt.meshPerAttribute);_.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let ut=0;ut<V.locationSize;ut++)m(V.location+ut);s.bindBuffer(s.ARRAY_BUFFER,ie);for(let ut=0;ut<V.locationSize;ut++)x(V.location+ut,_t/V.locationSize,W,et,_t*it,_t/V.locationSize*ut*it,ft)}}else if(J!==void 0){const et=J[tt];if(et!==void 0)switch(et.length){case 2:s.vertexAttrib2fv(V.location,et);break;case 3:s.vertexAttrib3fv(V.location,et);break;case 4:s.vertexAttrib4fv(V.location,et);break;default:s.vertexAttrib1fv(V.location,et)}}}}w()}function D(){I();for(const _ in n){const N=n[_];for(const k in N){const L=N[k];for(const X in L)u(L[X].object),delete L[X];delete N[k]}delete n[_]}}function P(_){if(n[_.id]===void 0)return;const N=n[_.id];for(const k in N){const L=N[k];for(const X in L)u(L[X].object),delete L[X];delete N[k]}delete n[_.id]}function C(_){for(const N in n){const k=n[N];if(k[_.id]===void 0)continue;const L=k[_.id];for(const X in L)u(L[X].object),delete L[X];delete k[_.id]}}function I(){S(),a=!0,r!==i&&(r=i,h(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:S,dispose:D,releaseStatesOfGeometry:P,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:m,disableUnusedAttributes:w}}function wg(s,t,e){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<u;f++)this.render(l[f],h[f]);else{d.multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Tg(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const x=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=e.precision!==void 0?e.precision:"highp";const o=r(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);const l=e.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),u=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_TEXTURE_SIZE),f=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),m=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),p=u>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:l,maxTextures:h,maxVertexTextures:u,maxTextureSize:d,maxCubemapSize:f,maxAttributes:g,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:m,vertexTextures:p,maxSamples:w}}function bg(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new qi,o=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const g=d.length!==0||f||n!==0||i;return i=f,n=d.length,g},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=u(d,f,0)},this.setState=function(d,f,g){const M=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!i||M===null||M.length===0||r&&!m)r?u(null):h();else{const w=r?0:n,x=w*4;let T=p.clippingState||null;l.value=T,T=u(M,f,x,g);for(let D=0;D!==x;++D)T[D]=e[D];p.clippingState=T,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,f,g,M){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=l.value,M!==!0||m===null){const p=g+y*4,w=f.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,T=g;x!==y;++x,T+=4)a.copy(d[x]).applyMatrix4(w,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}function Ag(s){let t=new WeakMap;function e(a,o){return o===el?a.mapping=er:o===nl&&(a.mapping=nr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===el||o===nl)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new Of(l.height);return h.fromEquirectangularTexture(s,a),t.set(a,h),a.addEventListener("dispose",i),e(h.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Kh extends qh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ks=4,Lc=[.125,.215,.35,.446,.526,.582],Ki=20,Oo=new Kh,Dc=new zt;let Bo=null,zo=0,Ho=0,ko=!1;const Yi=(1+Math.sqrt(5))/2,Us=1/Yi,Ic=[new A(1,1,1),new A(-1,1,1),new A(1,1,-1),new A(-1,1,-1),new A(0,Yi,Us),new A(0,Yi,-Us),new A(Us,0,Yi),new A(-Us,0,Yi),new A(Yi,Us,0),new A(-Yi,Us,0)];class Uc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Bo=this._renderer.getRenderTarget(),zo=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Oc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Bo,zo,Ho),this._renderer.xr.enabled=ko,t.scissorTest=!1,Ma(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===er||t.mapping===nr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Bo=this._renderer.getRenderTarget(),zo=this._renderer.getActiveCubeFace(),Ho=this._renderer.getActiveMipmapLevel(),ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:La,format:Gn,colorSpace:Oi,depthBuffer:!1},i=Nc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Rg(r)),this._blurMaterial=Cg(r,t,e)}return i}_compileMaterial(t){const e=new ht(this._lodPlanes[0],t);this._renderer.compile(e,Oo)}_sceneToCubeUV(t,e,n,i){const o=new on(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Dc),u.toneMapping=Pi,u.autoClear=!1;const g=new ke({name:"PMREM.Background",side:Ze,depthWrite:!1,depthTest:!1}),M=new ht(new kt,g);let y=!1;const m=t.background;m?m.isColor&&(g.color.copy(m),t.background=null,y=!0):(g.color.copy(Dc),y=!0);for(let p=0;p<6;p++){const w=p%3;w===0?(o.up.set(0,l[p],0),o.lookAt(h[p],0,0)):w===1?(o.up.set(0,0,l[p]),o.lookAt(0,h[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,h[p]));const x=this._cubeSize;Ma(i,w*x,p>2?x:0,x,x),u.setRenderTarget(i),y&&u.render(M,o),u.render(t,o)}M.geometry.dispose(),M.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===er||t.mapping===nr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Oc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new ht(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Ma(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Oo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=Ic[(i-1)%Ic.length];this._blur(t,i-1,i,r,a)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ht(this._lodPlanes[i],h),f=h.uniforms,g=this._sizeLods[n]-1,M=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Ki-1),y=r/M,m=isFinite(r)?1+Math.floor(u*y):Ki;m>Ki&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ki}`);const p=[];let w=0;for(let C=0;C<Ki;++C){const I=C/y,S=Math.exp(-I*I/2);p.push(S),C===0?w+=S:C<m&&(w+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/w;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=M,f.mipInt.value=x-n;const T=this._sizeLods[i],D=3*T*(i>x-ks?i-x+ks:0),P=4*(this._cubeSize-T);Ma(e,D,P,3*T,2*T),l.setRenderTarget(e),l.render(d,Oo)}}function Rg(s){const t=[],e=[],n=[];let i=s;const r=s-ks+1+Lc.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-ks?l=Lc[a-s+ks-1]:a===0&&(l=0),n.push(l);const h=1/(o-2),u=-h,d=1+h,f=[u,u,d,u,d,d,u,u,d,d,u,d],g=6,M=6,y=3,m=2,p=1,w=new Float32Array(y*M*g),x=new Float32Array(m*M*g),T=new Float32Array(p*M*g);for(let P=0;P<g;P++){const C=P%3*2/3-1,I=P>2?0:-1,S=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];w.set(S,y*M*P),x.set(f,m*M*P);const _=[P,P,P,P,P,P];T.set(_,p*M*P)}const D=new Ye;D.setAttribute("position",new Pn(w,y)),D.setAttribute("uv",new Pn(x,m)),D.setAttribute("faceIndex",new Pn(T,p)),t.push(D),i>ks&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Nc(s,t,e){const n=new gs(s,t,e);return n.texture.mapping=Qa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ma(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Cg(s,t,e){const n=new Float32Array(Ki),i=new A(0,1,0);return new Ni({name:"SphericalGaussianBlur",defines:{n:Ki,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Fc(){return new Ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Oc(){return new Ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Sl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Pg(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,h=l===el||l===nl,u=l===er||l===nr;if(h||u){let d=t.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Uc(s)),d=h?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const g=o.image;return h&&g&&g.height>0||u&&g&&i(g)?(e===null&&(e=new Uc(s)),d=h?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function i(o){let l=0;const h=6;for(let u=0;u<h;u++)o[u]!==void 0&&l++;return l===h}function r(o){const l=o.target;l.removeEventListener("dispose",r);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Lg(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Dg(s,t,e,n){const i={},r=new WeakMap;function a(d){const f=d.target;f.index!==null&&t.remove(f.index);for(const M in f.attributes)t.remove(f.attributes[M]);for(const M in f.morphAttributes){const y=f.morphAttributes[M];for(let m=0,p=y.length;m<p;m++)t.remove(y[m])}f.removeEventListener("dispose",a),delete i[f.id];const g=r.get(f);g&&(t.remove(g),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(d,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(d){const f=d.attributes;for(const M in f)t.update(f[M],s.ARRAY_BUFFER);const g=d.morphAttributes;for(const M in g){const y=g[M];for(let m=0,p=y.length;m<p;m++)t.update(y[m],s.ARRAY_BUFFER)}}function h(d){const f=[],g=d.index,M=d.attributes.position;let y=0;if(g!==null){const w=g.array;y=g.version;for(let x=0,T=w.length;x<T;x+=3){const D=w[x+0],P=w[x+1],C=w[x+2];f.push(D,P,P,C,C,D)}}else if(M!==void 0){const w=M.array;y=M.version;for(let x=0,T=w.length/3-1;x<T;x+=3){const D=x+0,P=x+1,C=x+2;f.push(D,P,P,C,C,D)}}else return;const m=new(Bh(f)?Wh:Vh)(f,1);m.version=y;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function u(d){const f=r.get(d);if(f){const g=d.index;g!==null&&f.version<g.version&&h(d)}else h(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Ig(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*a),e.update(f,n,1)}function h(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),e.update(f,n,g))}function u(d,f,g){if(g===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let y=0;y<g;y++)this.render(d[y]/a,f[y]);else{M.multiDrawElementsWEBGL(n,f,0,r,d,0,g);let y=0;for(let m=0;m<g;m++)y+=f[m];e.update(y,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=u}function Ug(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Ng(s,t,e){const n=new WeakMap,i=new me;function r(a,o,l){const h=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let _=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var g=_;f!==void 0&&f.texture.dispose();const M=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let T=0;M===!0&&(T=1),y===!0&&(T=2),m===!0&&(T=3);let D=o.attributes.position.count*T,P=1;D>t.maxTextureSize&&(P=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const C=new Float32Array(D*P*4*d),I=new kh(C,D,P,d);I.type=Ri,I.needsUpdate=!0;const S=T*4;for(let N=0;N<d;N++){const k=p[N],L=w[N],X=x[N],Y=D*P*4*N;for(let J=0;J<k.count;J++){const tt=J*S;M===!0&&(i.fromBufferAttribute(k,J),C[Y+tt+0]=i.x,C[Y+tt+1]=i.y,C[Y+tt+2]=i.z,C[Y+tt+3]=0),y===!0&&(i.fromBufferAttribute(L,J),C[Y+tt+4]=i.x,C[Y+tt+5]=i.y,C[Y+tt+6]=i.z,C[Y+tt+7]=0),m===!0&&(i.fromBufferAttribute(X,J),C[Y+tt+8]=i.x,C[Y+tt+9]=i.y,C[Y+tt+10]=i.z,C[Y+tt+11]=X.itemSize===4?i.w:1)}}f={count:d,texture:I,size:new Et(D,P)},n.set(o,f),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let M=0;for(let m=0;m<h.length;m++)M+=h[m];const y=o.morphTargetsRelative?1:1-M;l.getUniforms().setValue(s,"morphTargetBaseInfluence",y),l.getUniforms().setValue(s,"morphTargetInfluences",h)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Fg(s,t,e,n){let i=new WeakMap;function r(l){const h=n.render.frame,u=l.geometry,d=t.get(l,u);if(i.get(d)!==h&&(t.update(d),i.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==h&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==h&&(f.update(),i.set(f,h))}return d}function a(){i=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:a}}class jh extends qe{constructor(t,e,n,i,r,a,o,l,h,u){if(u=u!==void 0?u:Vs,u!==Vs&&u!==br)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Vs&&(n=ir),n===void 0&&u===br&&(n=Kr),super(null,i,r,a,o,l,u,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:gn,this.minFilter=l!==void 0?l:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Zh=new qe,Jh=new jh(1,1);Jh.compareFunction=Oh;const Qh=new kh,tu=new yf,eu=new Yh,Bc=[],zc=[],Hc=new Float32Array(16),kc=new Float32Array(9),Gc=new Float32Array(4);function dr(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Bc[i];if(r===void 0&&(r=new Float32Array(i),Bc[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Ae(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Re(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function no(s,t){let e=zc[t];e===void 0&&(e=new Int32Array(t),zc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Og(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Bg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2fv(this.addr,t),Re(e,t)}}function zg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;s.uniform3fv(this.addr,t),Re(e,t)}}function Hg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4fv(this.addr,t),Re(e,t)}}function kg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Gc.set(n),s.uniformMatrix2fv(this.addr,!1,Gc),Re(e,n)}}function Gg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;kc.set(n),s.uniformMatrix3fv(this.addr,!1,kc),Re(e,n)}}function Vg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Hc.set(n),s.uniformMatrix4fv(this.addr,!1,Hc),Re(e,n)}}function Wg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Xg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2iv(this.addr,t),Re(e,t)}}function qg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;s.uniform3iv(this.addr,t),Re(e,t)}}function Yg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4iv(this.addr,t),Re(e,t)}}function $g(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Kg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2uiv(this.addr,t),Re(e,t)}}function jg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;s.uniform3uiv(this.addr,t),Re(e,t)}}function Zg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4uiv(this.addr,t),Re(e,t)}}function Jg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?Jh:Zh;e.setTexture2D(t||r,i)}function Qg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||tu,i)}function t0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||eu,i)}function e0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Qh,i)}function n0(s){switch(s){case 5126:return Og;case 35664:return Bg;case 35665:return zg;case 35666:return Hg;case 35674:return kg;case 35675:return Gg;case 35676:return Vg;case 5124:case 35670:return Wg;case 35667:case 35671:return Xg;case 35668:case 35672:return qg;case 35669:case 35673:return Yg;case 5125:return $g;case 36294:return Kg;case 36295:return jg;case 36296:return Zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Jg;case 35679:case 36299:case 36307:return Qg;case 35680:case 36300:case 36308:case 36293:return t0;case 36289:case 36303:case 36311:case 36292:return e0}}function i0(s,t){s.uniform1fv(this.addr,t)}function s0(s,t){const e=dr(t,this.size,2);s.uniform2fv(this.addr,e)}function r0(s,t){const e=dr(t,this.size,3);s.uniform3fv(this.addr,e)}function a0(s,t){const e=dr(t,this.size,4);s.uniform4fv(this.addr,e)}function o0(s,t){const e=dr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function l0(s,t){const e=dr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function c0(s,t){const e=dr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function h0(s,t){s.uniform1iv(this.addr,t)}function u0(s,t){s.uniform2iv(this.addr,t)}function d0(s,t){s.uniform3iv(this.addr,t)}function f0(s,t){s.uniform4iv(this.addr,t)}function p0(s,t){s.uniform1uiv(this.addr,t)}function m0(s,t){s.uniform2uiv(this.addr,t)}function g0(s,t){s.uniform3uiv(this.addr,t)}function _0(s,t){s.uniform4uiv(this.addr,t)}function v0(s,t,e){const n=this.cache,i=t.length,r=no(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Zh,r[a])}function x0(s,t,e){const n=this.cache,i=t.length,r=no(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||tu,r[a])}function M0(s,t,e){const n=this.cache,i=t.length,r=no(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||eu,r[a])}function y0(s,t,e){const n=this.cache,i=t.length,r=no(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Qh,r[a])}function S0(s){switch(s){case 5126:return i0;case 35664:return s0;case 35665:return r0;case 35666:return a0;case 35674:return o0;case 35675:return l0;case 35676:return c0;case 5124:case 35670:return h0;case 35667:case 35671:return u0;case 35668:case 35672:return d0;case 35669:case 35673:return f0;case 5125:return p0;case 36294:return m0;case 36295:return g0;case 36296:return _0;case 35678:case 36198:case 36298:case 36306:case 35682:return v0;case 35679:case 36299:case 36307:return x0;case 35680:case 36300:case 36308:case 36293:return M0;case 36289:case 36303:case 36311:case 36292:return y0}}class E0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=n0(e.type)}}class w0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=S0(e.type)}}class T0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Go=/(\w+)(\])?(\[|\.)?/g;function Vc(s,t){s.seq.push(t),s.map[t.id]=t}function b0(s,t,e){const n=s.name,i=n.length;for(Go.lastIndex=0;;){const r=Go.exec(n),a=Go.lastIndex;let o=r[1];const l=r[2]==="]",h=r[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===i){Vc(e,h===void 0?new E0(o,s,t):new w0(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new T0(o),Vc(e,d)),e=d}}}class Aa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);b0(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Wc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const A0=37297;let R0=0;function C0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function P0(s){const t=ee.getPrimaries(ee.workingColorSpace),e=ee.getPrimaries(s);let n;switch(t===e?n="":t===Ua&&e===Ia?n="LinearDisplayP3ToLinearSRGB":t===Ia&&e===Ua&&(n="LinearSRGBToLinearDisplayP3"),s){case Oi:case to:return[n,"LinearTransferOETF"];case Nn:case vl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Xc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+C0(s.getShaderSource(t),a)}else return i}function L0(s,t){const e=P0(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function D0(s,t){let e;switch(t){case Hd:e="Linear";break;case kd:e="Reinhard";break;case Gd:e="OptimizedCineon";break;case bh:e="ACESFilmic";break;case Wd:e="AgX";break;case Xd:e="Neutral";break;case Vd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function I0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function U0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function N0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Er(s){return s!==""}function qc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Yc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const F0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ol(s){return s.replace(F0,B0)}const O0=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function B0(s,t){let e=Ft[t];if(e===void 0){const n=O0.get(t);if(n!==void 0)e=Ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ol(e)}const z0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $c(s){return s.replace(z0,H0)}function H0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Kc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function k0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Eh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===wh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Zn&&(t="SHADOWMAP_TYPE_VSM"),t}function G0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case er:case nr:t="ENVMAP_TYPE_CUBE";break;case Qa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function V0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case nr:t="ENVMAP_MODE_REFRACTION";break}return t}function W0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Th:t="ENVMAP_BLENDING_MULTIPLY";break;case Bd:t="ENVMAP_BLENDING_MIX";break;case zd:t="ENVMAP_BLENDING_ADD";break}return t}function X0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function q0(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=k0(e),h=G0(e),u=V0(e),d=W0(e),f=X0(e),g=I0(e),M=U0(r),y=i.createProgram();let m,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(Er).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(Er).join(`
`),p.length>0&&(p+=`
`)):(m=[Kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),p=[Kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Pi?"#define TONE_MAPPING":"",e.toneMapping!==Pi?Ft.tonemapping_pars_fragment:"",e.toneMapping!==Pi?D0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,L0("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Er).join(`
`)),a=ol(a),a=qc(a,e),a=Yc(a,e),o=ol(o),o=qc(o,e),o=Yc(o,e),a=$c(a),o=$c(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===uc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===uc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=w+m+a,T=w+p+o,D=Wc(i,i.VERTEX_SHADER,x),P=Wc(i,i.FRAGMENT_SHADER,T);i.attachShader(y,D),i.attachShader(y,P),e.index0AttributeName!==void 0?i.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function C(N){if(s.debug.checkShaderErrors){const k=i.getProgramInfoLog(y).trim(),L=i.getShaderInfoLog(D).trim(),X=i.getShaderInfoLog(P).trim();let Y=!0,J=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,D,P);else{const tt=Xc(i,D,"vertex"),V=Xc(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+k+`
`+tt+`
`+V)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(L===""||X==="")&&(J=!1);J&&(N.diagnostics={runnable:Y,programLog:k,vertexShader:{log:L,prefix:m},fragmentShader:{log:X,prefix:p}})}i.deleteShader(D),i.deleteShader(P),I=new Aa(i,y),S=N0(i,y)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=i.getProgramParameter(y,A0)),_},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=R0++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=D,this.fragmentShader=P,this}let Y0=0;class $0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new K0(t),e.set(t,n)),n}}class K0{constructor(t){this.id=Y0++,this.code=t,this.usedTimes=0}}function j0(s,t,e,n,i,r,a){const o=new Ml,l=new $0,h=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let g=i.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return h.add(S),S===0?"uv":`uv${S}`}function m(S,_,N,k,L){const X=k.fog,Y=L.geometry,J=S.isMeshStandardMaterial?k.environment:null,tt=(S.isMeshStandardMaterial?e:t).get(S.envMap||J),V=tt&&tt.mapping===Qa?tt.image.height:null,nt=M[S.type];S.precision!==null&&(g=i.getMaxPrecision(S.precision),g!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",g,"instead."));const et=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,_t=et!==void 0?et.length:0;let Wt=0;Y.morphAttributes.position!==void 0&&(Wt=1),Y.morphAttributes.normal!==void 0&&(Wt=2),Y.morphAttributes.color!==void 0&&(Wt=3);let ie,W,it,ft;if(nt){const Ne=Hn[nt];ie=Ne.vertexShader,W=Ne.fragmentShader}else ie=S.vertexShader,W=S.fragmentShader,l.update(S),it=l.getVertexShaderID(S),ft=l.getFragmentShaderID(S);const ut=s.getRenderTarget(),Ut=L.isInstancedMesh===!0,Bt=L.isBatchedMesh===!0,$t=!!S.map,F=!!S.matcap,Vt=!!tt,bt=!!S.aoMap,Ee=!!S.lightMap,Ct=!!S.bumpMap,ne=!!S.normalMap,b=!!S.displacementMap,v=!!S.emissiveMap,G=!!S.metalnessMap,$=!!S.roughnessMap,K=S.anisotropy>0,j=S.clearcoat>0,wt=S.iridescence>0,Q=S.sheen>0,Mt=S.transmission>0,Tt=K&&!!S.anisotropyMap,ot=j&&!!S.clearcoatMap,dt=j&&!!S.clearcoatNormalMap,Pt=j&&!!S.clearcoatRoughnessMap,pt=wt&&!!S.iridescenceMap,mt=wt&&!!S.iridescenceThicknessMap,Yt=Q&&!!S.sheenColorMap,Kt=Q&&!!S.sheenRoughnessMap,Qt=!!S.specularMap,Zt=!!S.specularColorMap,ue=!!S.specularIntensityMap,vt=Mt&&!!S.transmissionMap,R=Mt&&!!S.thicknessMap,at=!!S.gradientMap,st=!!S.alphaMap,xt=S.alphaTest>0,yt=!!S.alphaHash,se=!!S.extensions;let de=Pi;S.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(de=s.toneMapping);const ge={shaderID:nt,shaderType:S.type,shaderName:S.name,vertexShader:ie,fragmentShader:W,defines:S.defines,customVertexShaderID:it,customFragmentShaderID:ft,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:g,batching:Bt,instancing:Ut,instancingColor:Ut&&L.instanceColor!==null,instancingMorph:Ut&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ut===null?s.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:Oi,alphaToCoverage:!!S.alphaToCoverage,map:$t,matcap:F,envMap:Vt,envMapMode:Vt&&tt.mapping,envMapCubeUVHeight:V,aoMap:bt,lightMap:Ee,bumpMap:Ct,normalMap:ne,displacementMap:f&&b,emissiveMap:v,normalMapObjectSpace:ne&&S.normalMapType===af,normalMapTangentSpace:ne&&S.normalMapType===Fh,metalnessMap:G,roughnessMap:$,anisotropy:K,anisotropyMap:Tt,clearcoat:j,clearcoatMap:ot,clearcoatNormalMap:dt,clearcoatRoughnessMap:Pt,iridescence:wt,iridescenceMap:pt,iridescenceThicknessMap:mt,sheen:Q,sheenColorMap:Yt,sheenRoughnessMap:Kt,specularMap:Qt,specularColorMap:Zt,specularIntensityMap:ue,transmission:Mt,transmissionMap:vt,thicknessMap:R,gradientMap:at,opaque:S.transparent===!1&&S.blending===Gs&&S.alphaToCoverage===!1,alphaMap:st,alphaTest:xt,alphaHash:yt,combine:S.combine,mapUv:$t&&y(S.map.channel),aoMapUv:bt&&y(S.aoMap.channel),lightMapUv:Ee&&y(S.lightMap.channel),bumpMapUv:Ct&&y(S.bumpMap.channel),normalMapUv:ne&&y(S.normalMap.channel),displacementMapUv:b&&y(S.displacementMap.channel),emissiveMapUv:v&&y(S.emissiveMap.channel),metalnessMapUv:G&&y(S.metalnessMap.channel),roughnessMapUv:$&&y(S.roughnessMap.channel),anisotropyMapUv:Tt&&y(S.anisotropyMap.channel),clearcoatMapUv:ot&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:dt&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pt&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:Kt&&y(S.sheenRoughnessMap.channel),specularMapUv:Qt&&y(S.specularMap.channel),specularColorMapUv:Zt&&y(S.specularColorMap.channel),specularIntensityMapUv:ue&&y(S.specularIntensityMap.channel),transmissionMapUv:vt&&y(S.transmissionMap.channel),thicknessMapUv:R&&y(S.thicknessMap.channel),alphaMapUv:st&&y(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(ne||K),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!Y.attributes.uv&&($t||st),fog:!!X,useFog:S.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:L.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Wt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&N.length>0,shadowMapType:s.shadowMap.type,toneMapping:de,useLegacyLights:s._useLegacyLights,decodeVideoTexture:$t&&S.map.isVideoTexture===!0&&ee.getTransfer(S.map.colorSpace)===le,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===mn,flipSided:S.side===Ze,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:se&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:se&&S.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ge.vertexUv1s=h.has(1),ge.vertexUv2s=h.has(2),ge.vertexUv3s=h.has(3),h.clear(),ge}function p(S){const _=[];if(S.shaderID?_.push(S.shaderID):(_.push(S.customVertexShaderID),_.push(S.customFragmentShaderID)),S.defines!==void 0)for(const N in S.defines)_.push(N),_.push(S.defines[N]);return S.isRawShaderMaterial===!1&&(w(_,S),x(_,S),_.push(s.outputColorSpace)),_.push(S.customProgramCacheKey),_.join()}function w(S,_){S.push(_.precision),S.push(_.outputColorSpace),S.push(_.envMapMode),S.push(_.envMapCubeUVHeight),S.push(_.mapUv),S.push(_.alphaMapUv),S.push(_.lightMapUv),S.push(_.aoMapUv),S.push(_.bumpMapUv),S.push(_.normalMapUv),S.push(_.displacementMapUv),S.push(_.emissiveMapUv),S.push(_.metalnessMapUv),S.push(_.roughnessMapUv),S.push(_.anisotropyMapUv),S.push(_.clearcoatMapUv),S.push(_.clearcoatNormalMapUv),S.push(_.clearcoatRoughnessMapUv),S.push(_.iridescenceMapUv),S.push(_.iridescenceThicknessMapUv),S.push(_.sheenColorMapUv),S.push(_.sheenRoughnessMapUv),S.push(_.specularMapUv),S.push(_.specularColorMapUv),S.push(_.specularIntensityMapUv),S.push(_.transmissionMapUv),S.push(_.thicknessMapUv),S.push(_.combine),S.push(_.fogExp2),S.push(_.sizeAttenuation),S.push(_.morphTargetsCount),S.push(_.morphAttributeCount),S.push(_.numDirLights),S.push(_.numPointLights),S.push(_.numSpotLights),S.push(_.numSpotLightMaps),S.push(_.numHemiLights),S.push(_.numRectAreaLights),S.push(_.numDirLightShadows),S.push(_.numPointLightShadows),S.push(_.numSpotLightShadows),S.push(_.numSpotLightShadowsWithMaps),S.push(_.numLightProbes),S.push(_.shadowMapType),S.push(_.toneMapping),S.push(_.numClippingPlanes),S.push(_.numClipIntersection),S.push(_.depthPacking)}function x(S,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),S.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.skinning&&o.enable(4),_.morphTargets&&o.enable(5),_.morphNormals&&o.enable(6),_.morphColors&&o.enable(7),_.premultipliedAlpha&&o.enable(8),_.shadowMapEnabled&&o.enable(9),_.useLegacyLights&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.alphaToCoverage&&o.enable(20),S.push(o.mask)}function T(S){const _=M[S.type];let N;if(_){const k=Hn[_];N=If.clone(k.uniforms)}else N=S.uniforms;return N}function D(S,_){let N;for(let k=0,L=u.length;k<L;k++){const X=u[k];if(X.cacheKey===_){N=X,++N.usedTimes;break}}return N===void 0&&(N=new q0(s,_,S,r),u.push(N)),N}function P(S){if(--S.usedTimes===0){const _=u.indexOf(S);u[_]=u[u.length-1],u.pop(),S.destroy()}}function C(S){l.remove(S)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:D,releaseProgram:P,releaseShaderCache:C,programs:u,dispose:I}}function Z0(){let s=new WeakMap;function t(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function e(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function J0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function jc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Zc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(d,f,g,M,y,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:f,material:g,groupOrder:M,renderOrder:d.renderOrder,z:y,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=g,p.groupOrder=M,p.renderOrder=d.renderOrder,p.z=y,p.group=m),t++,p}function o(d,f,g,M,y,m){const p=a(d,f,g,M,y,m);g.transmission>0?n.push(p):g.transparent===!0?i.push(p):e.push(p)}function l(d,f,g,M,y,m){const p=a(d,f,g,M,y,m);g.transmission>0?n.unshift(p):g.transparent===!0?i.unshift(p):e.unshift(p)}function h(d,f){e.length>1&&e.sort(d||J0),n.length>1&&n.sort(f||jc),i.length>1&&i.sort(f||jc)}function u(){for(let d=t,f=s.length;d<f;d++){const g=s[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:u,sort:h}}function Q0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Zc,s.set(n,[a])):i>=r.length?(a=new Zc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function t_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new zt};break;case"SpotLight":e={position:new A,direction:new A,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new A,halfWidth:new A,halfHeight:new A};break}return s[t.id]=e,e}}}function e_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let n_=0;function i_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function s_(s){const t=new t_,e=e_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new A);const i=new A,r=new he,a=new he;function o(h,u){let d=0,f=0,g=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let M=0,y=0,m=0,p=0,w=0,x=0,T=0,D=0,P=0,C=0,I=0;h.sort(i_);const S=u===!0?Math.PI:1;for(let N=0,k=h.length;N<k;N++){const L=h[N],X=L.color,Y=L.intensity,J=L.distance,tt=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=X.r*Y*S,f+=X.g*Y*S,g+=X.b*Y*S;else if(L.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(L.sh.coefficients[V],Y);I++}else if(L.isDirectionalLight){const V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity*S),L.castShadow){const nt=L.shadow,et=e.get(L);et.shadowBias=nt.bias,et.shadowNormalBias=nt.normalBias,et.shadowRadius=nt.radius,et.shadowMapSize=nt.mapSize,n.directionalShadow[M]=et,n.directionalShadowMap[M]=tt,n.directionalShadowMatrix[M]=L.shadow.matrix,x++}n.directional[M]=V,M++}else if(L.isSpotLight){const V=t.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(X).multiplyScalar(Y*S),V.distance=J,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,n.spot[m]=V;const nt=L.shadow;if(L.map&&(n.spotLightMap[P]=L.map,P++,nt.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[m]=nt.matrix,L.castShadow){const et=e.get(L);et.shadowBias=nt.bias,et.shadowNormalBias=nt.normalBias,et.shadowRadius=nt.radius,et.shadowMapSize=nt.mapSize,n.spotShadow[m]=et,n.spotShadowMap[m]=tt,D++}m++}else if(L.isRectAreaLight){const V=t.get(L);V.color.copy(X).multiplyScalar(Y),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),n.rectArea[p]=V,p++}else if(L.isPointLight){const V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity*S),V.distance=L.distance,V.decay=L.decay,L.castShadow){const nt=L.shadow,et=e.get(L);et.shadowBias=nt.bias,et.shadowNormalBias=nt.normalBias,et.shadowRadius=nt.radius,et.shadowMapSize=nt.mapSize,et.shadowCameraNear=nt.camera.near,et.shadowCameraFar=nt.camera.far,n.pointShadow[y]=et,n.pointShadowMap[y]=tt,n.pointShadowMatrix[y]=L.shadow.matrix,T++}n.point[y]=V,y++}else if(L.isHemisphereLight){const V=t.get(L);V.skyColor.copy(L.color).multiplyScalar(Y*S),V.groundColor.copy(L.groundColor).multiplyScalar(Y*S),n.hemi[w]=V,w++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=lt.LTC_FLOAT_1,n.rectAreaLTC2=lt.LTC_FLOAT_2):(n.rectAreaLTC1=lt.LTC_HALF_1,n.rectAreaLTC2=lt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=g;const _=n.hash;(_.directionalLength!==M||_.pointLength!==y||_.spotLength!==m||_.rectAreaLength!==p||_.hemiLength!==w||_.numDirectionalShadows!==x||_.numPointShadows!==T||_.numSpotShadows!==D||_.numSpotMaps!==P||_.numLightProbes!==I)&&(n.directional.length=M,n.spot.length=m,n.rectArea.length=p,n.point.length=y,n.hemi.length=w,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=D,n.spotShadowMap.length=D,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=D+P-C,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=I,_.directionalLength=M,_.pointLength=y,_.spotLength=m,_.rectAreaLength=p,_.hemiLength=w,_.numDirectionalShadows=x,_.numPointShadows=T,_.numSpotShadows=D,_.numSpotMaps=P,_.numLightProbes=I,n.version=n_++)}function l(h,u){let d=0,f=0,g=0,M=0,y=0;const m=u.matrixWorldInverse;for(let p=0,w=h.length;p<w;p++){const x=h[p];if(x.isDirectionalLight){const T=n.directional[d];T.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(i),T.direction.transformDirection(m),d++}else if(x.isSpotLight){const T=n.spot[g];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(i),T.direction.transformDirection(m),g++}else if(x.isRectAreaLight){const T=n.rectArea[M];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),T.halfWidth.set(x.width*.5,0,0),T.halfHeight.set(0,x.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),M++}else if(x.isPointLight){const T=n.point[f];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const T=n.hemi[y];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),y++}}}return{setup:o,setupView:l,state:n}}function Jc(s){const t=new s_(s),e=[],n=[];function i(){e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(u){t.setup(e,u)}function l(u){t.setupView(e,u)}return{init:i,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function r_(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Jc(s),t.set(i,[o])):r>=a.length?(o=new Jc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class a_ extends _s{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class o_ extends _s{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const l_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function h_(s,t,e){let n=new yl;const i=new Et,r=new Et,a=new me,o=new a_({depthPacking:rf}),l=new o_,h={},u=e.maxTextureSize,d={[Ui]:Ze,[Ze]:Ui,[mn]:mn},f=new Ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:l_,fragmentShader:c_}),g=f.clone();g.defines.HORIZONTAL_PASS=1;const M=new Ye;M.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ht(M,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eh;let p=this.type;this.render=function(P,C,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;const S=s.getRenderTarget(),_=s.getActiveCubeFace(),N=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Ci),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const L=p!==Zn&&this.type===Zn,X=p===Zn&&this.type!==Zn;for(let Y=0,J=P.length;Y<J;Y++){const tt=P[Y],V=tt.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",tt,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const nt=V.getFrameExtents();if(i.multiply(nt),r.copy(V.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/nt.x),i.x=r.x*nt.x,V.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/nt.y),i.y=r.y*nt.y,V.mapSize.y=r.y)),V.map===null||L===!0||X===!0){const _t=this.type!==Zn?{minFilter:gn,magFilter:gn}:{};V.map!==null&&V.map.dispose(),V.map=new gs(i.x,i.y,_t),V.map.texture.name=tt.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const et=V.getViewportCount();for(let _t=0;_t<et;_t++){const Wt=V.getViewport(_t);a.set(r.x*Wt.x,r.y*Wt.y,r.x*Wt.z,r.y*Wt.w),k.viewport(a),V.updateMatrices(tt,_t),n=V.getFrustum(),T(C,I,V.camera,tt,this.type)}V.isPointLightShadow!==!0&&this.type===Zn&&w(V,I),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(S,_,N)};function w(P,C){const I=t.update(y);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,g.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,g.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new gs(i.x,i.y)),f.uniforms.shadow_pass.value=P.map.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(C,null,I,f,y,null),g.uniforms.shadow_pass.value=P.mapPass.texture,g.uniforms.resolution.value=P.mapSize,g.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(C,null,I,g,y,null)}function x(P,C,I,S){let _=null;const N=I.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(N!==void 0)_=N;else if(_=I.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const k=_.uuid,L=C.uuid;let X=h[k];X===void 0&&(X={},h[k]=X);let Y=X[L];Y===void 0&&(Y=_.clone(),X[L]=Y,C.addEventListener("dispose",D)),_=Y}if(_.visible=C.visible,_.wireframe=C.wireframe,S===Zn?_.side=C.shadowSide!==null?C.shadowSide:C.side:_.side=C.shadowSide!==null?C.shadowSide:d[C.side],_.alphaMap=C.alphaMap,_.alphaTest=C.alphaTest,_.map=C.map,_.clipShadows=C.clipShadows,_.clippingPlanes=C.clippingPlanes,_.clipIntersection=C.clipIntersection,_.displacementMap=C.displacementMap,_.displacementScale=C.displacementScale,_.displacementBias=C.displacementBias,_.wireframeLinewidth=C.wireframeLinewidth,_.linewidth=C.linewidth,I.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const k=s.properties.get(_);k.light=I}return _}function T(P,C,I,S,_){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&_===Zn)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,P.matrixWorld);const L=t.update(P),X=P.material;if(Array.isArray(X)){const Y=L.groups;for(let J=0,tt=Y.length;J<tt;J++){const V=Y[J],nt=X[V.materialIndex];if(nt&&nt.visible){const et=x(P,nt,S,_);P.onBeforeShadow(s,P,C,I,L,et,V),s.renderBufferDirect(I,null,L,et,P,V),P.onAfterShadow(s,P,C,I,L,et,V)}}}else if(X.visible){const Y=x(P,X,S,_);P.onBeforeShadow(s,P,C,I,L,Y,null),s.renderBufferDirect(I,null,L,Y,P,null),P.onAfterShadow(s,P,C,I,L,Y,null)}}const k=P.children;for(let L=0,X=k.length;L<X;L++)T(k[L],C,I,S,_)}function D(P){P.target.removeEventListener("dispose",D);for(const I in h){const S=h[I],_=P.target.uuid;_ in S&&(S[_].dispose(),delete S[_])}}}function u_(s){function t(){let R=!1;const at=new me;let st=null;const xt=new me(0,0,0,0);return{setMask:function(yt){st!==yt&&!R&&(s.colorMask(yt,yt,yt,yt),st=yt)},setLocked:function(yt){R=yt},setClear:function(yt,se,de,ge,Ne){Ne===!0&&(yt*=ge,se*=ge,de*=ge),at.set(yt,se,de,ge),xt.equals(at)===!1&&(s.clearColor(yt,se,de,ge),xt.copy(at))},reset:function(){R=!1,st=null,xt.set(-1,0,0,0)}}}function e(){let R=!1,at=null,st=null,xt=null;return{setTest:function(yt){yt?ft(s.DEPTH_TEST):ut(s.DEPTH_TEST)},setMask:function(yt){at!==yt&&!R&&(s.depthMask(yt),at=yt)},setFunc:function(yt){if(st!==yt){switch(yt){case Ld:s.depthFunc(s.NEVER);break;case Dd:s.depthFunc(s.ALWAYS);break;case Id:s.depthFunc(s.LESS);break;case Pa:s.depthFunc(s.LEQUAL);break;case Ud:s.depthFunc(s.EQUAL);break;case Nd:s.depthFunc(s.GEQUAL);break;case Fd:s.depthFunc(s.GREATER);break;case Od:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}st=yt}},setLocked:function(yt){R=yt},setClear:function(yt){xt!==yt&&(s.clearDepth(yt),xt=yt)},reset:function(){R=!1,at=null,st=null,xt=null}}}function n(){let R=!1,at=null,st=null,xt=null,yt=null,se=null,de=null,ge=null,Ne=null;return{setTest:function(ae){R||(ae?ft(s.STENCIL_TEST):ut(s.STENCIL_TEST))},setMask:function(ae){at!==ae&&!R&&(s.stencilMask(ae),at=ae)},setFunc:function(ae,Ln,Dn){(st!==ae||xt!==Ln||yt!==Dn)&&(s.stencilFunc(ae,Ln,Dn),st=ae,xt=Ln,yt=Dn)},setOp:function(ae,Ln,Dn){(se!==ae||de!==Ln||ge!==Dn)&&(s.stencilOp(ae,Ln,Dn),se=ae,de=Ln,ge=Dn)},setLocked:function(ae){R=ae},setClear:function(ae){Ne!==ae&&(s.clearStencil(ae),Ne=ae)},reset:function(){R=!1,at=null,st=null,xt=null,yt=null,se=null,de=null,ge=null,Ne=null}}}const i=new t,r=new e,a=new n,o=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,M=!1,y=null,m=null,p=null,w=null,x=null,T=null,D=null,P=new zt(0,0,0),C=0,I=!1,S=null,_=null,N=null,k=null,L=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,J=0;const tt=s.getParameter(s.VERSION);tt.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(tt)[1]),Y=J>=1):tt.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(tt)[1]),Y=J>=2);let V=null,nt={};const et=s.getParameter(s.SCISSOR_BOX),_t=s.getParameter(s.VIEWPORT),Wt=new me().fromArray(et),ie=new me().fromArray(_t);function W(R,at,st,xt){const yt=new Uint8Array(4),se=s.createTexture();s.bindTexture(R,se),s.texParameteri(R,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(R,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let de=0;de<st;de++)R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY?s.texImage3D(at,0,s.RGBA,1,1,xt,0,s.RGBA,s.UNSIGNED_BYTE,yt):s.texImage2D(at+de,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,yt);return se}const it={};it[s.TEXTURE_2D]=W(s.TEXTURE_2D,s.TEXTURE_2D,1),it[s.TEXTURE_CUBE_MAP]=W(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[s.TEXTURE_2D_ARRAY]=W(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),it[s.TEXTURE_3D]=W(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ft(s.DEPTH_TEST),r.setFunc(Pa),Ct(!1),ne(Nl),ft(s.CULL_FACE),bt(Ci);function ft(R){h[R]!==!0&&(s.enable(R),h[R]=!0)}function ut(R){h[R]!==!1&&(s.disable(R),h[R]=!1)}function Ut(R,at){return u[R]!==at?(s.bindFramebuffer(R,at),u[R]=at,R===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=at),R===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=at),!0):!1}function Bt(R,at){let st=f,xt=!1;if(R){st=d.get(at),st===void 0&&(st=[],d.set(at,st));const yt=R.textures;if(st.length!==yt.length||st[0]!==s.COLOR_ATTACHMENT0){for(let se=0,de=yt.length;se<de;se++)st[se]=s.COLOR_ATTACHMENT0+se;st.length=yt.length,xt=!0}}else st[0]!==s.BACK&&(st[0]=s.BACK,xt=!0);xt&&s.drawBuffers(st)}function $t(R){return g!==R?(s.useProgram(R),g=R,!0):!1}const F={[$i]:s.FUNC_ADD,[pd]:s.FUNC_SUBTRACT,[md]:s.FUNC_REVERSE_SUBTRACT};F[gd]=s.MIN,F[_d]=s.MAX;const Vt={[vd]:s.ZERO,[xd]:s.ONE,[Md]:s.SRC_COLOR,[Qo]:s.SRC_ALPHA,[bd]:s.SRC_ALPHA_SATURATE,[wd]:s.DST_COLOR,[Sd]:s.DST_ALPHA,[yd]:s.ONE_MINUS_SRC_COLOR,[tl]:s.ONE_MINUS_SRC_ALPHA,[Td]:s.ONE_MINUS_DST_COLOR,[Ed]:s.ONE_MINUS_DST_ALPHA,[Ad]:s.CONSTANT_COLOR,[Rd]:s.ONE_MINUS_CONSTANT_COLOR,[Cd]:s.CONSTANT_ALPHA,[Pd]:s.ONE_MINUS_CONSTANT_ALPHA};function bt(R,at,st,xt,yt,se,de,ge,Ne,ae){if(R===Ci){M===!0&&(ut(s.BLEND),M=!1);return}if(M===!1&&(ft(s.BLEND),M=!0),R!==fd){if(R!==y||ae!==I){if((m!==$i||x!==$i)&&(s.blendEquation(s.FUNC_ADD),m=$i,x=$i),ae)switch(R){case Gs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Fl:s.blendFunc(s.ONE,s.ONE);break;case Ol:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Bl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Gs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Fl:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ol:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Bl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}p=null,w=null,T=null,D=null,P.set(0,0,0),C=0,y=R,I=ae}return}yt=yt||at,se=se||st,de=de||xt,(at!==m||yt!==x)&&(s.blendEquationSeparate(F[at],F[yt]),m=at,x=yt),(st!==p||xt!==w||se!==T||de!==D)&&(s.blendFuncSeparate(Vt[st],Vt[xt],Vt[se],Vt[de]),p=st,w=xt,T=se,D=de),(ge.equals(P)===!1||Ne!==C)&&(s.blendColor(ge.r,ge.g,ge.b,Ne),P.copy(ge),C=Ne),y=R,I=!1}function Ee(R,at){R.side===mn?ut(s.CULL_FACE):ft(s.CULL_FACE);let st=R.side===Ze;at&&(st=!st),Ct(st),R.blending===Gs&&R.transparent===!1?bt(Ci):bt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),r.setFunc(R.depthFunc),r.setTest(R.depthTest),r.setMask(R.depthWrite),i.setMask(R.colorWrite);const xt=R.stencilWrite;a.setTest(xt),xt&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),v(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?ft(s.SAMPLE_ALPHA_TO_COVERAGE):ut(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(R){S!==R&&(R?s.frontFace(s.CW):s.frontFace(s.CCW),S=R)}function ne(R){R!==ud?(ft(s.CULL_FACE),R!==_&&(R===Nl?s.cullFace(s.BACK):R===dd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ut(s.CULL_FACE),_=R}function b(R){R!==N&&(Y&&s.lineWidth(R),N=R)}function v(R,at,st){R?(ft(s.POLYGON_OFFSET_FILL),(k!==at||L!==st)&&(s.polygonOffset(at,st),k=at,L=st)):ut(s.POLYGON_OFFSET_FILL)}function G(R){R?ft(s.SCISSOR_TEST):ut(s.SCISSOR_TEST)}function $(R){R===void 0&&(R=s.TEXTURE0+X-1),V!==R&&(s.activeTexture(R),V=R)}function K(R,at,st){st===void 0&&(V===null?st=s.TEXTURE0+X-1:st=V);let xt=nt[st];xt===void 0&&(xt={type:void 0,texture:void 0},nt[st]=xt),(xt.type!==R||xt.texture!==at)&&(V!==st&&(s.activeTexture(st),V=st),s.bindTexture(R,at||it[R]),xt.type=R,xt.texture=at)}function j(){const R=nt[V];R!==void 0&&R.type!==void 0&&(s.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function wt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Q(){try{s.compressedTexImage3D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Mt(){try{s.texSubImage2D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Tt(){try{s.texSubImage3D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ot(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function dt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Pt(){try{s.texStorage2D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function pt(){try{s.texStorage3D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function mt(){try{s.texImage2D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Yt(){try{s.texImage3D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Kt(R){Wt.equals(R)===!1&&(s.scissor(R.x,R.y,R.z,R.w),Wt.copy(R))}function Qt(R){ie.equals(R)===!1&&(s.viewport(R.x,R.y,R.z,R.w),ie.copy(R))}function Zt(R,at){let st=l.get(at);st===void 0&&(st=new WeakMap,l.set(at,st));let xt=st.get(R);xt===void 0&&(xt=s.getUniformBlockIndex(at,R.name),st.set(R,xt))}function ue(R,at){const xt=l.get(at).get(R);o.get(at)!==xt&&(s.uniformBlockBinding(at,xt,R.__bindingPointIndex),o.set(at,xt))}function vt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},V=null,nt={},u={},d=new WeakMap,f=[],g=null,M=!1,y=null,m=null,p=null,w=null,x=null,T=null,D=null,P=new zt(0,0,0),C=0,I=!1,S=null,_=null,N=null,k=null,L=null,Wt.set(0,0,s.canvas.width,s.canvas.height),ie.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),a.reset()}return{buffers:{color:i,depth:r,stencil:a},enable:ft,disable:ut,bindFramebuffer:Ut,drawBuffers:Bt,useProgram:$t,setBlending:bt,setMaterial:Ee,setFlipSided:Ct,setCullFace:ne,setLineWidth:b,setPolygonOffset:v,setScissorTest:G,activeTexture:$,bindTexture:K,unbindTexture:j,compressedTexImage2D:wt,compressedTexImage3D:Q,texImage2D:mt,texImage3D:Yt,updateUBOMapping:Zt,uniformBlockBinding:ue,texStorage2D:Pt,texStorage3D:pt,texSubImage2D:Mt,texSubImage3D:Tt,compressedTexSubImage2D:ot,compressedTexSubImage3D:dt,scissor:Kt,viewport:Qt,reset:vt}}function d_(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Et,u=new WeakMap;let d;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(b,v){return g?new OffscreenCanvas(b,v):Fa("canvas")}function y(b,v,G){let $=1;const K=ne(b);if((K.width>G||K.height>G)&&($=G/Math.max(K.width,K.height)),$<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const j=Math.floor($*K.width),wt=Math.floor($*K.height);d===void 0&&(d=M(j,wt));const Q=v?M(j,wt):d;return Q.width=j,Q.height=wt,Q.getContext("2d").drawImage(b,0,0,j,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+j+"x"+wt+")."),Q}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),b;return b}function m(b){return b.generateMipmaps&&b.minFilter!==gn&&b.minFilter!==Rn}function p(b){s.generateMipmap(b)}function w(b,v,G,$,K=!1){if(b!==null){if(s[b]!==void 0)return s[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let j=v;if(v===s.RED&&(G===s.FLOAT&&(j=s.R32F),G===s.HALF_FLOAT&&(j=s.R16F),G===s.UNSIGNED_BYTE&&(j=s.R8)),v===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(j=s.R8UI),G===s.UNSIGNED_SHORT&&(j=s.R16UI),G===s.UNSIGNED_INT&&(j=s.R32UI),G===s.BYTE&&(j=s.R8I),G===s.SHORT&&(j=s.R16I),G===s.INT&&(j=s.R32I)),v===s.RG&&(G===s.FLOAT&&(j=s.RG32F),G===s.HALF_FLOAT&&(j=s.RG16F),G===s.UNSIGNED_BYTE&&(j=s.RG8)),v===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(j=s.RG8UI),G===s.UNSIGNED_SHORT&&(j=s.RG16UI),G===s.UNSIGNED_INT&&(j=s.RG32UI),G===s.BYTE&&(j=s.RG8I),G===s.SHORT&&(j=s.RG16I),G===s.INT&&(j=s.RG32I)),v===s.RGB&&G===s.UNSIGNED_INT_5_9_9_9_REV&&(j=s.RGB9_E5),v===s.RGBA){const wt=K?Da:ee.getTransfer($);G===s.FLOAT&&(j=s.RGBA32F),G===s.HALF_FLOAT&&(j=s.RGBA16F),G===s.UNSIGNED_BYTE&&(j=wt===le?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT_4_4_4_4&&(j=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(j=s.RGB5_A1)}return(j===s.R16F||j===s.R32F||j===s.RG16F||j===s.RG32F||j===s.RGBA16F||j===s.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(b,v){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==gn&&b.minFilter!==Rn?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function T(b){const v=b.target;v.removeEventListener("dispose",T),P(v),v.isVideoTexture&&u.delete(v)}function D(b){const v=b.target;v.removeEventListener("dispose",D),I(v)}function P(b){const v=n.get(b);if(v.__webglInit===void 0)return;const G=b.source,$=f.get(G);if($){const K=$[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&C(b),Object.keys($).length===0&&f.delete(G)}n.remove(b)}function C(b){const v=n.get(b);s.deleteTexture(v.__webglTexture);const G=b.source,$=f.get(G);delete $[v.__cacheKey],a.memory.textures--}function I(b){const v=n.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(v.__webglFramebuffer[$]))for(let K=0;K<v.__webglFramebuffer[$].length;K++)s.deleteFramebuffer(v.__webglFramebuffer[$][K]);else s.deleteFramebuffer(v.__webglFramebuffer[$]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[$])}else{if(Array.isArray(v.__webglFramebuffer))for(let $=0;$<v.__webglFramebuffer.length;$++)s.deleteFramebuffer(v.__webglFramebuffer[$]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let $=0;$<v.__webglColorRenderbuffer.length;$++)v.__webglColorRenderbuffer[$]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[$]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const G=b.textures;for(let $=0,K=G.length;$<K;$++){const j=n.get(G[$]);j.__webglTexture&&(s.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(G[$])}n.remove(b)}let S=0;function _(){S=0}function N(){const b=S;return b>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+i.maxTextures),S+=1,b}function k(b){const v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function L(b,v){const G=n.get(b);if(b.isVideoTexture&&Ee(b),b.isRenderTargetTexture===!1&&b.version>0&&G.__version!==b.version){const $=b.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Wt(G,b,v);return}}e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+v)}function X(b,v){const G=n.get(b);if(b.version>0&&G.__version!==b.version){Wt(G,b,v);return}e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+v)}function Y(b,v){const G=n.get(b);if(b.version>0&&G.__version!==b.version){Wt(G,b,v);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+v)}function J(b,v){const G=n.get(b);if(b.version>0&&G.__version!==b.version){ie(G,b,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+v)}const tt={[il]:s.REPEAT,[ji]:s.CLAMP_TO_EDGE,[sl]:s.MIRRORED_REPEAT},V={[gn]:s.NEAREST,[qd]:s.NEAREST_MIPMAP_NEAREST,[Qr]:s.NEAREST_MIPMAP_LINEAR,[Rn]:s.LINEAR,[ho]:s.LINEAR_MIPMAP_NEAREST,[Zi]:s.LINEAR_MIPMAP_LINEAR},nt={[of]:s.NEVER,[ff]:s.ALWAYS,[lf]:s.LESS,[Oh]:s.LEQUAL,[cf]:s.EQUAL,[df]:s.GEQUAL,[hf]:s.GREATER,[uf]:s.NOTEQUAL};function et(b,v){if(v.type===Ri&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Rn||v.magFilter===ho||v.magFilter===Qr||v.magFilter===Zi||v.minFilter===Rn||v.minFilter===ho||v.minFilter===Qr||v.minFilter===Zi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(b,s.TEXTURE_WRAP_S,tt[v.wrapS]),s.texParameteri(b,s.TEXTURE_WRAP_T,tt[v.wrapT]),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,tt[v.wrapR]),s.texParameteri(b,s.TEXTURE_MAG_FILTER,V[v.magFilter]),s.texParameteri(b,s.TEXTURE_MIN_FILTER,V[v.minFilter]),v.compareFunction&&(s.texParameteri(b,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(b,s.TEXTURE_COMPARE_FUNC,nt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===gn||v.minFilter!==Qr&&v.minFilter!==Zi||v.type===Ri&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");s.texParameterf(b,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function _t(b,v){let G=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",T));const $=v.source;let K=f.get($);K===void 0&&(K={},f.set($,K));const j=k(v);if(j!==b.__cacheKey){K[j]===void 0&&(K[j]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,G=!0),K[j].usedTimes++;const wt=K[b.__cacheKey];wt!==void 0&&(K[b.__cacheKey].usedTimes--,wt.usedTimes===0&&C(v)),b.__cacheKey=j,b.__webglTexture=K[j].texture}return G}function Wt(b,v,G){let $=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&($=s.TEXTURE_3D);const K=_t(b,v),j=v.source;e.bindTexture($,b.__webglTexture,s.TEXTURE0+G);const wt=n.get(j);if(j.version!==wt.__version||K===!0){e.activeTexture(s.TEXTURE0+G);const Q=ee.getPrimaries(ee.workingColorSpace),Mt=v.colorSpace===vi?null:ee.getPrimaries(v.colorSpace),Tt=v.colorSpace===vi||Q===Mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let ot=y(v.image,!1,i.maxTextureSize);ot=Ct(v,ot);const dt=r.convert(v.format,v.colorSpace),Pt=r.convert(v.type);let pt=w(v.internalFormat,dt,Pt,v.colorSpace,v.isVideoTexture);et($,v);let mt;const Yt=v.mipmaps,Kt=v.isVideoTexture!==!0&&pt!==Nh,Qt=wt.__version===void 0||K===!0,Zt=j.dataReady,ue=x(v,ot);if(v.isDepthTexture)pt=s.DEPTH_COMPONENT16,v.type===Ri?pt=s.DEPTH_COMPONENT32F:v.type===ir?pt=s.DEPTH_COMPONENT24:v.type===Kr&&(pt=s.DEPTH24_STENCIL8),Qt&&(Kt?e.texStorage2D(s.TEXTURE_2D,1,pt,ot.width,ot.height):e.texImage2D(s.TEXTURE_2D,0,pt,ot.width,ot.height,0,dt,Pt,null));else if(v.isDataTexture)if(Yt.length>0){Kt&&Qt&&e.texStorage2D(s.TEXTURE_2D,ue,pt,Yt[0].width,Yt[0].height);for(let vt=0,R=Yt.length;vt<R;vt++)mt=Yt[vt],Kt?Zt&&e.texSubImage2D(s.TEXTURE_2D,vt,0,0,mt.width,mt.height,dt,Pt,mt.data):e.texImage2D(s.TEXTURE_2D,vt,pt,mt.width,mt.height,0,dt,Pt,mt.data);v.generateMipmaps=!1}else Kt?(Qt&&e.texStorage2D(s.TEXTURE_2D,ue,pt,ot.width,ot.height),Zt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ot.width,ot.height,dt,Pt,ot.data)):e.texImage2D(s.TEXTURE_2D,0,pt,ot.width,ot.height,0,dt,Pt,ot.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Kt&&Qt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ue,pt,Yt[0].width,Yt[0].height,ot.depth);for(let vt=0,R=Yt.length;vt<R;vt++)mt=Yt[vt],v.format!==Gn?dt!==null?Kt?Zt&&e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,vt,0,0,0,mt.width,mt.height,ot.depth,dt,mt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,vt,pt,mt.width,mt.height,ot.depth,0,mt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?Zt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,vt,0,0,0,mt.width,mt.height,ot.depth,dt,Pt,mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,vt,pt,mt.width,mt.height,ot.depth,0,dt,Pt,mt.data)}else{Kt&&Qt&&e.texStorage2D(s.TEXTURE_2D,ue,pt,Yt[0].width,Yt[0].height);for(let vt=0,R=Yt.length;vt<R;vt++)mt=Yt[vt],v.format!==Gn?dt!==null?Kt?Zt&&e.compressedTexSubImage2D(s.TEXTURE_2D,vt,0,0,mt.width,mt.height,dt,mt.data):e.compressedTexImage2D(s.TEXTURE_2D,vt,pt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?Zt&&e.texSubImage2D(s.TEXTURE_2D,vt,0,0,mt.width,mt.height,dt,Pt,mt.data):e.texImage2D(s.TEXTURE_2D,vt,pt,mt.width,mt.height,0,dt,Pt,mt.data)}else if(v.isDataArrayTexture)Kt?(Qt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ue,pt,ot.width,ot.height,ot.depth),Zt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,dt,Pt,ot.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,pt,ot.width,ot.height,ot.depth,0,dt,Pt,ot.data);else if(v.isData3DTexture)Kt?(Qt&&e.texStorage3D(s.TEXTURE_3D,ue,pt,ot.width,ot.height,ot.depth),Zt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,dt,Pt,ot.data)):e.texImage3D(s.TEXTURE_3D,0,pt,ot.width,ot.height,ot.depth,0,dt,Pt,ot.data);else if(v.isFramebufferTexture){if(Qt)if(Kt)e.texStorage2D(s.TEXTURE_2D,ue,pt,ot.width,ot.height);else{let vt=ot.width,R=ot.height;for(let at=0;at<ue;at++)e.texImage2D(s.TEXTURE_2D,at,pt,vt,R,0,dt,Pt,null),vt>>=1,R>>=1}}else if(Yt.length>0){if(Kt&&Qt){const vt=ne(Yt[0]);e.texStorage2D(s.TEXTURE_2D,ue,pt,vt.width,vt.height)}for(let vt=0,R=Yt.length;vt<R;vt++)mt=Yt[vt],Kt?Zt&&e.texSubImage2D(s.TEXTURE_2D,vt,0,0,dt,Pt,mt):e.texImage2D(s.TEXTURE_2D,vt,pt,dt,Pt,mt);v.generateMipmaps=!1}else if(Kt){if(Qt){const vt=ne(ot);e.texStorage2D(s.TEXTURE_2D,ue,pt,vt.width,vt.height)}Zt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,dt,Pt,ot)}else e.texImage2D(s.TEXTURE_2D,0,pt,dt,Pt,ot);m(v)&&p($),wt.__version=j.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function ie(b,v,G){if(v.image.length!==6)return;const $=_t(b,v),K=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,b.__webglTexture,s.TEXTURE0+G);const j=n.get(K);if(K.version!==j.__version||$===!0){e.activeTexture(s.TEXTURE0+G);const wt=ee.getPrimaries(ee.workingColorSpace),Q=v.colorSpace===vi?null:ee.getPrimaries(v.colorSpace),Mt=v.colorSpace===vi||wt===Q?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Tt=v.isCompressedTexture||v.image[0].isCompressedTexture,ot=v.image[0]&&v.image[0].isDataTexture,dt=[];for(let R=0;R<6;R++)!Tt&&!ot?dt[R]=y(v.image[R],!0,i.maxCubemapSize):dt[R]=ot?v.image[R].image:v.image[R],dt[R]=Ct(v,dt[R]);const Pt=dt[0],pt=r.convert(v.format,v.colorSpace),mt=r.convert(v.type),Yt=w(v.internalFormat,pt,mt,v.colorSpace),Kt=v.isVideoTexture!==!0,Qt=j.__version===void 0||$===!0,Zt=K.dataReady;let ue=x(v,Pt);et(s.TEXTURE_CUBE_MAP,v);let vt;if(Tt){Kt&&Qt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ue,Yt,Pt.width,Pt.height);for(let R=0;R<6;R++){vt=dt[R].mipmaps;for(let at=0;at<vt.length;at++){const st=vt[at];v.format!==Gn?pt!==null?Kt?Zt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,at,0,0,st.width,st.height,pt,st.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,at,Yt,st.width,st.height,0,st.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?Zt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,at,0,0,st.width,st.height,pt,mt,st.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,at,Yt,st.width,st.height,0,pt,mt,st.data)}}}else{if(vt=v.mipmaps,Kt&&Qt){vt.length>0&&ue++;const R=ne(dt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ue,Yt,R.width,R.height)}for(let R=0;R<6;R++)if(ot){Kt?Zt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,0,0,0,dt[R].width,dt[R].height,pt,mt,dt[R].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,0,Yt,dt[R].width,dt[R].height,0,pt,mt,dt[R].data);for(let at=0;at<vt.length;at++){const xt=vt[at].image[R].image;Kt?Zt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,at+1,0,0,xt.width,xt.height,pt,mt,xt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,at+1,Yt,xt.width,xt.height,0,pt,mt,xt.data)}}else{Kt?Zt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,0,0,0,pt,mt,dt[R]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,0,Yt,pt,mt,dt[R]);for(let at=0;at<vt.length;at++){const st=vt[at];Kt?Zt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,at+1,0,0,pt,mt,st.image[R]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+R,at+1,Yt,pt,mt,st.image[R])}}}m(v)&&p(s.TEXTURE_CUBE_MAP),j.__version=K.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function W(b,v,G,$,K,j){const wt=r.convert(G.format,G.colorSpace),Q=r.convert(G.type),Mt=w(G.internalFormat,wt,Q,G.colorSpace);if(!n.get(v).__hasExternalTextures){const ot=Math.max(1,v.width>>j),dt=Math.max(1,v.height>>j);K===s.TEXTURE_3D||K===s.TEXTURE_2D_ARRAY?e.texImage3D(K,j,Mt,ot,dt,v.depth,0,wt,Q,null):e.texImage2D(K,j,Mt,ot,dt,0,wt,Q,null)}e.bindFramebuffer(s.FRAMEBUFFER,b),bt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,K,n.get(G).__webglTexture,0,Vt(v)):(K===s.TEXTURE_2D||K>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,K,n.get(G).__webglTexture,j),e.bindFramebuffer(s.FRAMEBUFFER,null)}function it(b,v,G){if(s.bindRenderbuffer(s.RENDERBUFFER,b),v.depthBuffer&&!v.stencilBuffer){let $=s.DEPTH_COMPONENT24;if(G||bt(v)){const K=v.depthTexture;K&&K.isDepthTexture&&(K.type===Ri?$=s.DEPTH_COMPONENT32F:K.type===ir&&($=s.DEPTH_COMPONENT24));const j=Vt(v);bt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,j,$,v.width,v.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,j,$,v.width,v.height)}else s.renderbufferStorage(s.RENDERBUFFER,$,v.width,v.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,b)}else if(v.depthBuffer&&v.stencilBuffer){const $=Vt(v);G&&bt(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,$,s.DEPTH24_STENCIL8,v.width,v.height):bt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$,s.DEPTH24_STENCIL8,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,b)}else{const $=v.textures;for(let K=0;K<$.length;K++){const j=$[K],wt=r.convert(j.format,j.colorSpace),Q=r.convert(j.type),Mt=w(j.internalFormat,wt,Q,j.colorSpace),Tt=Vt(v);G&&bt(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Tt,Mt,v.width,v.height):bt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Tt,Mt,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Mt,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ft(b,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),L(v.depthTexture,0);const $=n.get(v.depthTexture).__webglTexture,K=Vt(v);if(v.depthTexture.format===Vs)bt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0);else if(v.depthTexture.format===br)bt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function ut(b){const v=n.get(b),G=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!v.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");ft(v.__webglFramebuffer,b)}else if(G){v.__webglDepthbuffer=[];for(let $=0;$<6;$++)e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[$]),v.__webglDepthbuffer[$]=s.createRenderbuffer(),it(v.__webglDepthbuffer[$],b,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=s.createRenderbuffer(),it(v.__webglDepthbuffer,b,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ut(b,v,G){const $=n.get(b);v!==void 0&&W($.__webglFramebuffer,b,b.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&ut(b)}function Bt(b){const v=b.texture,G=n.get(b),$=n.get(v);b.addEventListener("dispose",D);const K=b.textures,j=b.isWebGLCubeRenderTarget===!0,wt=K.length>1;if(wt||($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=v.version,a.memory.textures++),j){G.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){G.__webglFramebuffer[Q]=[];for(let Mt=0;Mt<v.mipmaps.length;Mt++)G.__webglFramebuffer[Q][Mt]=s.createFramebuffer()}else G.__webglFramebuffer[Q]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){G.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)G.__webglFramebuffer[Q]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(wt)for(let Q=0,Mt=K.length;Q<Mt;Q++){const Tt=n.get(K[Q]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=s.createTexture(),a.memory.textures++)}if(b.samples>0&&bt(b)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let Q=0;Q<K.length;Q++){const Mt=K[Q];G.__webglColorRenderbuffer[Q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[Q]);const Tt=r.convert(Mt.format,Mt.colorSpace),ot=r.convert(Mt.type),dt=w(Mt.internalFormat,Tt,ot,Mt.colorSpace,b.isXRRenderTarget===!0),Pt=Vt(b);s.renderbufferStorageMultisample(s.RENDERBUFFER,Pt,dt,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Q,s.RENDERBUFFER,G.__webglColorRenderbuffer[Q])}s.bindRenderbuffer(s.RENDERBUFFER,null),b.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),it(G.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(j){e.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),et(s.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let Mt=0;Mt<v.mipmaps.length;Mt++)W(G.__webglFramebuffer[Q][Mt],b,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Mt);else W(G.__webglFramebuffer[Q],b,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(v)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let Q=0,Mt=K.length;Q<Mt;Q++){const Tt=K[Q],ot=n.get(Tt);e.bindTexture(s.TEXTURE_2D,ot.__webglTexture),et(s.TEXTURE_2D,Tt),W(G.__webglFramebuffer,b,Tt,s.COLOR_ATTACHMENT0+Q,s.TEXTURE_2D,0),m(Tt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let Q=s.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Q=b.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Q,$.__webglTexture),et(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let Mt=0;Mt<v.mipmaps.length;Mt++)W(G.__webglFramebuffer[Mt],b,v,s.COLOR_ATTACHMENT0,Q,Mt);else W(G.__webglFramebuffer,b,v,s.COLOR_ATTACHMENT0,Q,0);m(v)&&p(Q),e.unbindTexture()}b.depthBuffer&&ut(b)}function $t(b){const v=b.textures;for(let G=0,$=v.length;G<$;G++){const K=v[G];if(m(K)){const j=b.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,wt=n.get(K).__webglTexture;e.bindTexture(j,wt),p(j),e.unbindTexture()}}}function F(b){if(b.samples>0&&bt(b)===!1){const v=b.textures,G=b.width,$=b.height;let K=s.COLOR_BUFFER_BIT;const j=[],wt=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=n.get(b),Mt=v.length>1;if(Mt)for(let Tt=0;Tt<v.length;Tt++)e.bindFramebuffer(s.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Q.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Q.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Q.__webglFramebuffer);for(let Tt=0;Tt<v.length;Tt++){j.push(s.COLOR_ATTACHMENT0+Tt),b.depthBuffer&&j.push(wt);const ot=Q.__ignoreDepthValues!==void 0?Q.__ignoreDepthValues:!1;if(ot===!1&&(b.depthBuffer&&(K|=s.DEPTH_BUFFER_BIT),b.stencilBuffer&&Q.__isTransmissionRenderTarget!==!0&&(K|=s.STENCIL_BUFFER_BIT)),Mt&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Q.__webglColorRenderbuffer[Tt]),ot===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[wt]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[wt])),Mt){const dt=n.get(v[Tt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,dt,0)}s.blitFramebuffer(0,0,G,$,0,0,G,$,K,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,j)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Mt)for(let Tt=0;Tt<v.length;Tt++){e.bindFramebuffer(s.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.RENDERBUFFER,Q.__webglColorRenderbuffer[Tt]);const ot=n.get(v[Tt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Q.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Tt,s.TEXTURE_2D,ot,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Q.__webglMultisampledFramebuffer)}}function Vt(b){return Math.min(i.maxSamples,b.samples)}function bt(b){const v=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Ee(b){const v=a.render.frame;u.get(b)!==v&&(u.set(b,v),b.update())}function Ct(b,v){const G=b.colorSpace,$=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||G!==Oi&&G!==vi&&(ee.getTransfer(G)===le?($!==Gn||K!==Li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),v}function ne(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(h.width=b.naturalWidth||b.width,h.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(h.width=b.displayWidth,h.height=b.displayHeight):(h.width=b.width,h.height=b.height),h}this.allocateTextureUnit=N,this.resetTextureUnits=_,this.setTexture2D=L,this.setTexture2DArray=X,this.setTexture3D=Y,this.setTextureCube=J,this.rebindTextures=Ut,this.setupRenderTarget=Bt,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=ut,this.setupFrameBufferTexture=W,this.useMultisampledRTT=bt}function f_(s,t){function e(n,i=vi){let r;const a=ee.getTransfer(i);if(n===Li)return s.UNSIGNED_BYTE;if(n===Ph)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Lh)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Kd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Yd)return s.BYTE;if(n===$d)return s.SHORT;if(n===Rh)return s.UNSIGNED_SHORT;if(n===Ch)return s.INT;if(n===ir)return s.UNSIGNED_INT;if(n===Ri)return s.FLOAT;if(n===La)return s.HALF_FLOAT;if(n===jd)return s.ALPHA;if(n===Zd)return s.RGB;if(n===Gn)return s.RGBA;if(n===Jd)return s.LUMINANCE;if(n===Qd)return s.LUMINANCE_ALPHA;if(n===Vs)return s.DEPTH_COMPONENT;if(n===br)return s.DEPTH_STENCIL;if(n===tf)return s.RED;if(n===Dh)return s.RED_INTEGER;if(n===ef)return s.RG;if(n===Ih)return s.RG_INTEGER;if(n===Uh)return s.RGBA_INTEGER;if(n===uo||n===fo||n===po||n===mo)if(a===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===uo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===uo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zl||n===Hl||n===kl||n===Gl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===zl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Hl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===kl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Gl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Nh)return r=t.get("WEBGL_compressed_texture_etc1"),r!==null?r.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===Vl||n===Wl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Vl)return a===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xl||n===ql||n===Yl||n===$l||n===Kl||n===jl||n===Zl||n===Jl||n===Ql||n===tc||n===ec||n===nc||n===ic||n===sc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ql)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Yl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$l)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Kl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===jl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Zl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Jl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ql)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tc)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ec)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===nc)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ic)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sc)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===go||n===rc||n===ac)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===go)return a===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===rc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ac)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nf||n===oc||n===lc||n===cc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===go)return r.COMPRESSED_RED_RGTC1_EXT;if(n===oc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===lc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===cc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Kr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class p_ extends on{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Le extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const m_={type:"move"};class Vo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Le,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Le,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Le,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const y of t.hand.values()){const m=e.getJointPose(y,n),p=this._getHandJoint(h,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=h.joints["index-finger-tip"],d=h.joints["thumb-tip"],f=u.position.distanceTo(d.position),g=.02,M=.005;h.inputState.pinching&&f>g+M?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&f<=g-M&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(m_)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Le;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const g_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,__=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class v_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new qe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,i=new Ni({vertexShader:g_,fragmentShader:__,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ht(new ur(20,20),i)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class x_ extends cr{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,h=null,u=null,d=null,f=null,g=null,M=null;const y=new v_,m=e.getContextAttributes();let p=null,w=null;const x=[],T=[],D=new Et;let P=null;const C=new on;C.layers.enable(1),C.viewport=new me;const I=new on;I.layers.enable(2),I.viewport=new me;const S=[C,I],_=new p_;_.layers.enable(1),_.layers.enable(2);let N=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let it=x[W];return it===void 0&&(it=new Vo,x[W]=it),it.getTargetRaySpace()},this.getControllerGrip=function(W){let it=x[W];return it===void 0&&(it=new Vo,x[W]=it),it.getGripSpace()},this.getHand=function(W){let it=x[W];return it===void 0&&(it=new Vo,x[W]=it),it.getHandSpace()};function L(W){const it=T.indexOf(W.inputSource);if(it===-1)return;const ft=x[it];ft!==void 0&&(ft.update(W.inputSource,W.frame,h||a),ft.dispatchEvent({type:W.type,data:W.inputSource}))}function X(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",Y);for(let W=0;W<x.length;W++){const it=T[W];it!==null&&(T[W]=null,x[W].disconnect(it))}N=null,k=null,y.reset(),t.setRenderTarget(p),g=null,f=null,d=null,i=null,w=null,ie.stop(),n.isPresenting=!1,t.setPixelRatio(P),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(W){h=W},this.getBaseLayer=function(){return f!==null?f:g},this.getBinding=function(){return d},this.getFrame=function(){return M},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",X),i.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(D),i.renderState.layers===void 0){const it={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(i,e,it),i.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),w=new gs(g.framebufferWidth,g.framebufferHeight,{format:Gn,type:Li,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let it=null,ft=null,ut=null;m.depth&&(ut=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=m.stencil?br:Vs,ft=m.stencil?Kr:ir);const Ut={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:r};d=new XRWebGLBinding(i,e),f=d.createProjectionLayer(Ut),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),w=new gs(f.textureWidth,f.textureHeight,{format:Gn,type:Li,depthTexture:new jh(f.textureWidth,f.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0});const Bt=t.properties.get(w);Bt.__ignoreDepthValues=f.ignoreDepthValues}w.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await i.requestReferenceSpace(o),ie.setContext(i),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function Y(W){for(let it=0;it<W.removed.length;it++){const ft=W.removed[it],ut=T.indexOf(ft);ut>=0&&(T[ut]=null,x[ut].disconnect(ft))}for(let it=0;it<W.added.length;it++){const ft=W.added[it];let ut=T.indexOf(ft);if(ut===-1){for(let Bt=0;Bt<x.length;Bt++)if(Bt>=T.length){T.push(ft),ut=Bt;break}else if(T[Bt]===null){T[Bt]=ft,ut=Bt;break}if(ut===-1)break}const Ut=x[ut];Ut&&Ut.connect(ft)}}const J=new A,tt=new A;function V(W,it,ft){J.setFromMatrixPosition(it.matrixWorld),tt.setFromMatrixPosition(ft.matrixWorld);const ut=J.distanceTo(tt),Ut=it.projectionMatrix.elements,Bt=ft.projectionMatrix.elements,$t=Ut[14]/(Ut[10]-1),F=Ut[14]/(Ut[10]+1),Vt=(Ut[9]+1)/Ut[5],bt=(Ut[9]-1)/Ut[5],Ee=(Ut[8]-1)/Ut[0],Ct=(Bt[8]+1)/Bt[0],ne=$t*Ee,b=$t*Ct,v=ut/(-Ee+Ct),G=v*-Ee;it.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(G),W.translateZ(v),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const $=$t+v,K=F+v,j=ne-G,wt=b+(ut-G),Q=Vt*F/K*$,Mt=bt*F/K*$;W.projectionMatrix.makePerspective(j,wt,Q,Mt,$,K),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function nt(W,it){it===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(it.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;y.texture!==null&&(W.near=y.depthNear,W.far=y.depthFar),_.near=I.near=C.near=W.near,_.far=I.far=C.far=W.far,(N!==_.near||k!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),N=_.near,k=_.far,C.near=N,C.far=k,I.near=N,I.far=k,C.updateProjectionMatrix(),I.updateProjectionMatrix(),W.updateProjectionMatrix());const it=W.parent,ft=_.cameras;nt(_,it);for(let ut=0;ut<ft.length;ut++)nt(ft[ut],it);ft.length===2?V(_,C,I):_.projectionMatrix.copy(C.projectionMatrix),et(W,_,it)};function et(W,it,ft){ft===null?W.matrix.copy(it.matrixWorld):(W.matrix.copy(ft.matrixWorld),W.matrix.invert(),W.matrix.multiply(it.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(it.projectionMatrix),W.projectionMatrixInverse.copy(it.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=al*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&g===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=W)},this.hasDepthSensing=function(){return y.texture!==null};let _t=null;function Wt(W,it){if(u=it.getViewerPose(h||a),M=it,u!==null){const ft=u.views;g!==null&&(t.setRenderTargetFramebuffer(w,g.framebuffer),t.setRenderTarget(w));let ut=!1;ft.length!==_.cameras.length&&(_.cameras.length=0,ut=!0);for(let Bt=0;Bt<ft.length;Bt++){const $t=ft[Bt];let F=null;if(g!==null)F=g.getViewport($t);else{const bt=d.getViewSubImage(f,$t);F=bt.viewport,Bt===0&&(t.setRenderTargetTextures(w,bt.colorTexture,f.ignoreDepthValues?void 0:bt.depthStencilTexture),t.setRenderTarget(w))}let Vt=S[Bt];Vt===void 0&&(Vt=new on,Vt.layers.enable(Bt),Vt.viewport=new me,S[Bt]=Vt),Vt.matrix.fromArray($t.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray($t.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(F.x,F.y,F.width,F.height),Bt===0&&(_.matrix.copy(Vt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ut===!0&&_.cameras.push(Vt)}const Ut=i.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const Bt=d.getDepthInformation(ft[0]);Bt&&Bt.isValid&&Bt.texture&&y.init(t,Bt,i.renderState)}}for(let ft=0;ft<x.length;ft++){const ut=T[ft],Ut=x[ft];ut!==null&&Ut!==void 0&&Ut.update(ut,it,h||a)}y.render(t,_),_t&&_t(W,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),M=null}const ie=new $h;ie.setAnimationLoop(Wt),this.setAnimationLoop=function(W){_t=W},this.dispose=function(){}}}const Xi=new Vn,M_=new he;function y_(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Xh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,w,x,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&g(m,p,T)):p.isMeshMatcapMaterial?(r(m,p),M(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,x):p.isSpriteMaterial?h(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ze&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ze&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=t.get(p),x=w.envMap,T=w.envMapRotation;if(x&&(m.envMap.value=x,Xi.copy(T),Xi.x*=-1,Xi.y*=-1,Xi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Xi.y*=-1,Xi.z*=-1),m.envMapRotation.value.setFromMatrix4(M_.makeRotationFromEuler(Xi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const D=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*D,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function g(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ze&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function M(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){const w=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function S_(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,x){const T=x.program;n.uniformBlockBinding(w,T)}function h(w,x){let T=i[w.id];T===void 0&&(M(w),T=u(w),i[w.id]=T,w.addEventListener("dispose",m));const D=x.program;n.updateUBOMapping(w,D);const P=t.render.frame;r[w.id]!==P&&(f(w),r[w.id]=P)}function u(w){const x=d();w.__bindingPointIndex=x;const T=s.createBuffer(),D=w.__size,P=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,D,P),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,T),T}function d(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){const x=i[w.id],T=w.uniforms,D=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let P=0,C=T.length;P<C;P++){const I=Array.isArray(T[P])?T[P]:[T[P]];for(let S=0,_=I.length;S<_;S++){const N=I[S];if(g(N,P,S,D)===!0){const k=N.__offset,L=Array.isArray(N.value)?N.value:[N.value];let X=0;for(let Y=0;Y<L.length;Y++){const J=L[Y],tt=y(J);typeof J=="number"||typeof J=="boolean"?(N.__data[0]=J,s.bufferSubData(s.UNIFORM_BUFFER,k+X,N.__data)):J.isMatrix3?(N.__data[0]=J.elements[0],N.__data[1]=J.elements[1],N.__data[2]=J.elements[2],N.__data[3]=0,N.__data[4]=J.elements[3],N.__data[5]=J.elements[4],N.__data[6]=J.elements[5],N.__data[7]=0,N.__data[8]=J.elements[6],N.__data[9]=J.elements[7],N.__data[10]=J.elements[8],N.__data[11]=0):(J.toArray(N.__data,X),X+=tt.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,N.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function g(w,x,T,D){const P=w.value,C=x+"_"+T;if(D[C]===void 0)return typeof P=="number"||typeof P=="boolean"?D[C]=P:D[C]=P.clone(),!0;{const I=D[C];if(typeof P=="number"||typeof P=="boolean"){if(I!==P)return D[C]=P,!0}else if(I.equals(P)===!1)return I.copy(P),!0}return!1}function M(w){const x=w.uniforms;let T=0;const D=16;for(let C=0,I=x.length;C<I;C++){const S=Array.isArray(x[C])?x[C]:[x[C]];for(let _=0,N=S.length;_<N;_++){const k=S[_],L=Array.isArray(k.value)?k.value:[k.value];for(let X=0,Y=L.length;X<Y;X++){const J=L[X],tt=y(J),V=T%D;V!==0&&D-V<tt.boundary&&(T+=D-V),k.__data=new Float32Array(tt.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=T,T+=tt.storage}}}const P=T%D;return P>0&&(T+=D-P),w.__size=T,w.__cache={},this}function y(w){const x={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(x.boundary=4,x.storage=4):w.isVector2?(x.boundary=8,x.storage=8):w.isVector3||w.isColor?(x.boundary=16,x.storage=12):w.isVector4?(x.boundary=16,x.storage=16):w.isMatrix3?(x.boundary=48,x.storage=48):w.isMatrix4?(x.boundary=64,x.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),x}function m(w){const x=w.target;x.removeEventListener("dispose",m);const T=a.indexOf(x.__bindingPointIndex);a.splice(T,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(const w in i)s.deleteBuffer(i[w]);a=[],i={},r={}}return{bind:l,update:h,dispose:p}}class E_{constructor(t={}){const{canvas:e=mf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),M=new Int32Array(4);let y=null,m=null;const p=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Nn,this._useLegacyLights=!1,this.toneMapping=Pi,this.toneMappingExposure=1;const x=this;let T=!1,D=0,P=0,C=null,I=-1,S=null;const _=new me,N=new me;let k=null;const L=new zt(0);let X=0,Y=e.width,J=e.height,tt=1,V=null,nt=null;const et=new me(0,0,Y,J),_t=new me(0,0,Y,J);let Wt=!1;const ie=new yl;let W=!1,it=!1;const ft=new he,ut=new Et,Ut=new A,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function $t(){return C===null?tt:1}let F=n;function Vt(E,U){const B=e.getContext(E,U);return B!==null?B:null}try{const E={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_l}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",st,!1),e.addEventListener("webglcontextcreationerror",xt,!1),F===null){const U="webgl2";if(F=Vt(U,E),F===null)throw Vt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let bt,Ee,Ct,ne,b,v,G,$,K,j,wt,Q,Mt,Tt,ot,dt,Pt,pt,mt,Yt,Kt,Qt,Zt,ue;function vt(){bt=new Lg(F),bt.init(),Ee=new Tg(F,bt,t),Qt=new f_(F,bt),Ct=new u_(F),ne=new Ug(F),b=new Z0,v=new d_(F,bt,Ct,b,Ee,Qt,ne),G=new Ag(x),$=new Pg(x),K=new Hf(F),Zt=new Eg(F,K),j=new Dg(F,K,ne,Zt),wt=new Fg(F,j,K,ne),mt=new Ng(F,Ee,v),dt=new bg(b),Q=new j0(x,G,$,bt,Ee,Zt,dt),Mt=new y_(x,b),Tt=new Q0,ot=new r_(bt),pt=new Sg(x,G,$,Ct,wt,f,l),Pt=new h_(x,wt,Ee),ue=new S_(F,ne,Ee,Ct),Yt=new wg(F,bt,ne),Kt=new Ig(F,bt,ne),ne.programs=Q.programs,x.capabilities=Ee,x.extensions=bt,x.properties=b,x.renderLists=Tt,x.shadowMap=Pt,x.state=Ct,x.info=ne}vt();const R=new x_(x,F);this.xr=R,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const E=bt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=bt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(E){E!==void 0&&(tt=E,this.setSize(Y,J,!1))},this.getSize=function(E){return E.set(Y,J)},this.setSize=function(E,U,B=!0){if(R.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=E,J=U,e.width=Math.floor(E*tt),e.height=Math.floor(U*tt),B===!0&&(e.style.width=E+"px",e.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(Y*tt,J*tt).floor()},this.setDrawingBufferSize=function(E,U,B){Y=E,J=U,tt=B,e.width=Math.floor(E*B),e.height=Math.floor(U*B),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(_)},this.getViewport=function(E){return E.copy(et)},this.setViewport=function(E,U,B,H){E.isVector4?et.set(E.x,E.y,E.z,E.w):et.set(E,U,B,H),Ct.viewport(_.copy(et).multiplyScalar(tt).round())},this.getScissor=function(E){return E.copy(_t)},this.setScissor=function(E,U,B,H){E.isVector4?_t.set(E.x,E.y,E.z,E.w):_t.set(E,U,B,H),Ct.scissor(N.copy(_t).multiplyScalar(tt).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(E){Ct.setScissorTest(Wt=E)},this.setOpaqueSort=function(E){V=E},this.setTransparentSort=function(E){nt=E},this.getClearColor=function(E){return E.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor.apply(pt,arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha.apply(pt,arguments)},this.clear=function(E=!0,U=!0,B=!0){let H=0;if(E){let O=!1;if(C!==null){const ct=C.texture.format;O=ct===Uh||ct===Ih||ct===Dh}if(O){const ct=C.texture.type,gt=ct===Li||ct===ir||ct===Rh||ct===Kr||ct===Ph||ct===Lh,St=pt.getClearColor(),At=pt.getClearAlpha(),Dt=St.r,Lt=St.g,It=St.b;gt?(g[0]=Dt,g[1]=Lt,g[2]=It,g[3]=At,F.clearBufferuiv(F.COLOR,0,g)):(M[0]=Dt,M[1]=Lt,M[2]=It,M[3]=At,F.clearBufferiv(F.COLOR,0,M))}else H|=F.COLOR_BUFFER_BIT}U&&(H|=F.DEPTH_BUFFER_BIT),B&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",st,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),Tt.dispose(),ot.dispose(),b.dispose(),G.dispose(),$.dispose(),wt.dispose(),Zt.dispose(),ue.dispose(),Q.dispose(),R.dispose(),R.removeEventListener("sessionstart",Ln),R.removeEventListener("sessionend",Dn),Bi.stop()};function at(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function st(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const E=ne.autoReset,U=Pt.enabled,B=Pt.autoUpdate,H=Pt.needsUpdate,O=Pt.type;vt(),ne.autoReset=E,Pt.enabled=U,Pt.autoUpdate=B,Pt.needsUpdate=H,Pt.type=O}function xt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function yt(E){const U=E.target;U.removeEventListener("dispose",yt),se(U)}function se(E){de(E),b.remove(E)}function de(E){const U=b.get(E).programs;U!==void 0&&(U.forEach(function(B){Q.releaseProgram(B)}),E.isShaderMaterial&&Q.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,B,H,O,ct){U===null&&(U=Bt);const gt=O.isMesh&&O.matrixWorld.determinant()<0,St=ed(E,U,B,H,O);Ct.setMaterial(H,gt);let At=B.index,Dt=1;if(H.wireframe===!0){if(At=j.getWireframeAttribute(B),At===void 0)return;Dt=2}const Lt=B.drawRange,It=B.attributes.position;let xe=Lt.start*Dt,Je=(Lt.start+Lt.count)*Dt;ct!==null&&(xe=Math.max(xe,ct.start*Dt),Je=Math.min(Je,(ct.start+ct.count)*Dt)),At!==null?(xe=Math.max(xe,0),Je=Math.min(Je,At.count)):It!=null&&(xe=Math.max(xe,0),Je=Math.min(Je,It.count));const Ce=Je-xe;if(Ce<0||Ce===1/0)return;Zt.setup(O,H,St,B,At);let Xn,_e=Yt;if(At!==null&&(Xn=K.get(At),_e=Kt,_e.setIndex(Xn)),O.isMesh)H.wireframe===!0?(Ct.setLineWidth(H.wireframeLinewidth*$t()),_e.setMode(F.LINES)):_e.setMode(F.TRIANGLES);else if(O.isLine){let Nt=H.linewidth;Nt===void 0&&(Nt=1),Ct.setLineWidth(Nt*$t()),O.isLineSegments?_e.setMode(F.LINES):O.isLineLoop?_e.setMode(F.LINE_LOOP):_e.setMode(F.LINE_STRIP)}else O.isPoints?_e.setMode(F.POINTS):O.isSprite&&_e.setMode(F.TRIANGLES);if(O.isBatchedMesh)_e.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)_e.renderInstances(xe,Ce,O.count);else if(B.isInstancedBufferGeometry){const Nt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ro=Math.min(B.instanceCount,Nt);_e.renderInstances(xe,Ce,ro)}else _e.render(xe,Ce)};function ge(E,U,B){E.transparent===!0&&E.side===mn&&E.forceSinglePass===!1?(E.side=Ze,E.needsUpdate=!0,Jr(E,U,B),E.side=Ui,E.needsUpdate=!0,Jr(E,U,B),E.side=mn):Jr(E,U,B)}this.compile=function(E,U,B=null){B===null&&(B=E),m=ot.get(B),m.init(),w.push(m),B.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),E!==B&&E.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights(x._useLegacyLights);const H=new Set;return E.traverse(function(O){const ct=O.material;if(ct)if(Array.isArray(ct))for(let gt=0;gt<ct.length;gt++){const St=ct[gt];ge(St,B,O),H.add(St)}else ge(ct,B,O),H.add(ct)}),w.pop(),m=null,H},this.compileAsync=function(E,U,B=null){const H=this.compile(E,U,B);return new Promise(O=>{function ct(){if(H.forEach(function(gt){b.get(gt).currentProgram.isReady()&&H.delete(gt)}),H.size===0){O(E);return}setTimeout(ct,10)}bt.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let Ne=null;function ae(E){Ne&&Ne(E)}function Ln(){Bi.stop()}function Dn(){Bi.start()}const Bi=new $h;Bi.setAnimationLoop(ae),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(E){Ne=E,R.setAnimationLoop(E),E===null?Bi.stop():Bi.start()},R.addEventListener("sessionstart",Ln),R.addEventListener("sessionend",Dn),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),R.enabled===!0&&R.isPresenting===!0&&(R.cameraAutoUpdate===!0&&R.updateCamera(U),U=R.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,U,C),m=ot.get(E,w.length),m.init(),w.push(m),ft.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ie.setFromProjectionMatrix(ft),it=this.localClippingEnabled,W=dt.init(this.clippingPlanes,it),y=Tt.get(E,p.length),y.init(),p.push(y),bl(E,U,0,x.sortObjects),y.finish(),x.sortObjects===!0&&y.sort(V,nt),this.info.render.frame++,W===!0&&dt.beginShadows();const B=m.state.shadowsArray;if(Pt.render(B,E,U),W===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(R.enabled===!1||R.isPresenting===!1||R.hasDepthSensing()===!1)&&pt.render(y,E),m.setupLights(x._useLegacyLights),U.isArrayCamera){const H=U.cameras;for(let O=0,ct=H.length;O<ct;O++){const gt=H[O];Al(y,E,gt,gt.viewport)}}else Al(y,E,U);C!==null&&(v.updateMultisampleRenderTarget(C),v.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(x,E,U),Zt.resetDefaultState(),I=-1,S=null,w.pop(),w.length>0?m=w[w.length-1]:m=null,p.pop(),p.length>0?y=p[p.length-1]:y=null};function bl(E,U,B,H){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)B=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ie.intersectsSprite(E)){H&&Ut.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ft);const gt=wt.update(E),St=E.material;St.visible&&y.push(E,gt,St,B,Ut.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ie.intersectsObject(E))){const gt=wt.update(E),St=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ut.copy(E.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Ut.copy(gt.boundingSphere.center)),Ut.applyMatrix4(E.matrixWorld).applyMatrix4(ft)),Array.isArray(St)){const At=gt.groups;for(let Dt=0,Lt=At.length;Dt<Lt;Dt++){const It=At[Dt],xe=St[It.materialIndex];xe&&xe.visible&&y.push(E,gt,xe,B,Ut.z,It)}}else St.visible&&y.push(E,gt,St,B,Ut.z,null)}}const ct=E.children;for(let gt=0,St=ct.length;gt<St;gt++)bl(ct[gt],U,B,H)}function Al(E,U,B,H){const O=E.opaque,ct=E.transmissive,gt=E.transparent;m.setupLightsView(B),W===!0&&dt.setGlobalState(x.clippingPlanes,B),ct.length>0&&td(O,ct,U,B),H&&Ct.viewport(_.copy(H)),O.length>0&&Zr(O,U,B),ct.length>0&&Zr(ct,U,B),gt.length>0&&Zr(gt,U,B),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function td(E,U,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;if(m.state.transmissionRenderTarget===null){m.state.transmissionRenderTarget=new gs(1,1,{generateMipmaps:!0,type:bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float")?La:Li,minFilter:Zi,samples:4,stencilBuffer:r});const Dt=b.get(m.state.transmissionRenderTarget);Dt.__isTransmissionRenderTarget=!0}const ct=m.state.transmissionRenderTarget;x.getDrawingBufferSize(ut),ct.setSize(ut.x,ut.y);const gt=x.getRenderTarget();x.setRenderTarget(ct),x.getClearColor(L),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear();const St=x.toneMapping;x.toneMapping=Pi,Zr(E,B,H),v.updateMultisampleRenderTarget(ct),v.updateRenderTargetMipmap(ct);let At=!1;for(let Dt=0,Lt=U.length;Dt<Lt;Dt++){const It=U[Dt],xe=It.object,Je=It.geometry,Ce=It.material,Xn=It.group;if(Ce.side===mn&&xe.layers.test(H.layers)){const _e=Ce.side;Ce.side=Ze,Ce.needsUpdate=!0,Rl(xe,B,H,Je,Ce,Xn),Ce.side=_e,Ce.needsUpdate=!0,At=!0}}At===!0&&(v.updateMultisampleRenderTarget(ct),v.updateRenderTargetMipmap(ct)),x.setRenderTarget(gt),x.setClearColor(L,X),x.toneMapping=St}function Zr(E,U,B){const H=U.isScene===!0?U.overrideMaterial:null;for(let O=0,ct=E.length;O<ct;O++){const gt=E[O],St=gt.object,At=gt.geometry,Dt=H===null?gt.material:H,Lt=gt.group;St.layers.test(B.layers)&&Rl(St,U,B,At,Dt,Lt)}}function Rl(E,U,B,H,O,ct){E.onBeforeRender(x,U,B,H,O,ct),E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(x,U,B,H,E,ct),O.transparent===!0&&O.side===mn&&O.forceSinglePass===!1?(O.side=Ze,O.needsUpdate=!0,x.renderBufferDirect(B,U,H,O,E,ct),O.side=Ui,O.needsUpdate=!0,x.renderBufferDirect(B,U,H,O,E,ct),O.side=mn):x.renderBufferDirect(B,U,H,O,E,ct),E.onAfterRender(x,U,B,H,O,ct)}function Jr(E,U,B){U.isScene!==!0&&(U=Bt);const H=b.get(E),O=m.state.lights,ct=m.state.shadowsArray,gt=O.state.version,St=Q.getParameters(E,O.state,ct,U,B),At=Q.getProgramCacheKey(St);let Dt=H.programs;H.environment=E.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(E.isMeshStandardMaterial?$:G).get(E.envMap||H.environment),H.envMapRotation=H.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Dt===void 0&&(E.addEventListener("dispose",yt),Dt=new Map,H.programs=Dt);let Lt=Dt.get(At);if(Lt!==void 0){if(H.currentProgram===Lt&&H.lightsStateVersion===gt)return Pl(E,St),Lt}else St.uniforms=Q.getUniforms(E),E.onBuild(B,St,x),E.onBeforeCompile(St,x),Lt=Q.acquireProgram(St,At),Dt.set(At,Lt),H.uniforms=St.uniforms;const It=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(It.clippingPlanes=dt.uniform),Pl(E,St),H.needsLights=id(E),H.lightsStateVersion=gt,H.needsLights&&(It.ambientLightColor.value=O.state.ambient,It.lightProbe.value=O.state.probe,It.directionalLights.value=O.state.directional,It.directionalLightShadows.value=O.state.directionalShadow,It.spotLights.value=O.state.spot,It.spotLightShadows.value=O.state.spotShadow,It.rectAreaLights.value=O.state.rectArea,It.ltc_1.value=O.state.rectAreaLTC1,It.ltc_2.value=O.state.rectAreaLTC2,It.pointLights.value=O.state.point,It.pointLightShadows.value=O.state.pointShadow,It.hemisphereLights.value=O.state.hemi,It.directionalShadowMap.value=O.state.directionalShadowMap,It.directionalShadowMatrix.value=O.state.directionalShadowMatrix,It.spotShadowMap.value=O.state.spotShadowMap,It.spotLightMatrix.value=O.state.spotLightMatrix,It.spotLightMap.value=O.state.spotLightMap,It.pointShadowMap.value=O.state.pointShadowMap,It.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=Lt,H.uniformsList=null,Lt}function Cl(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Aa.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function Pl(E,U){const B=b.get(E);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function ed(E,U,B,H,O){U.isScene!==!0&&(U=Bt),v.resetTextureUnits();const ct=U.fog,gt=H.isMeshStandardMaterial?U.environment:null,St=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Oi,At=(H.isMeshStandardMaterial?$:G).get(H.envMap||gt),Dt=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Lt=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),It=!!B.morphAttributes.position,xe=!!B.morphAttributes.normal,Je=!!B.morphAttributes.color;let Ce=Pi;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Ce=x.toneMapping);const Xn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,_e=Xn!==void 0?Xn.length:0,Nt=b.get(H),ro=m.state.lights;if(W===!0&&(it===!0||E!==S)){const cn=E===S&&H.id===I;dt.setState(H,E,cn)}let fe=!1;H.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==ro.state.version||Nt.outputColorSpace!==St||O.isBatchedMesh&&Nt.batching===!1||!O.isBatchedMesh&&Nt.batching===!0||O.isInstancedMesh&&Nt.instancing===!1||!O.isInstancedMesh&&Nt.instancing===!0||O.isSkinnedMesh&&Nt.skinning===!1||!O.isSkinnedMesh&&Nt.skinning===!0||O.isInstancedMesh&&Nt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Nt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Nt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Nt.instancingMorph===!1&&O.morphTexture!==null||Nt.envMap!==At||H.fog===!0&&Nt.fog!==ct||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==dt.numPlanes||Nt.numIntersection!==dt.numIntersection)||Nt.vertexAlphas!==Dt||Nt.vertexTangents!==Lt||Nt.morphTargets!==It||Nt.morphNormals!==xe||Nt.morphColors!==Je||Nt.toneMapping!==Ce||Nt.morphTargetsCount!==_e)&&(fe=!0):(fe=!0,Nt.__version=H.version);let zi=Nt.currentProgram;fe===!0&&(zi=Jr(H,U,O));let Ll=!1,fr=!1,ao=!1;const Fe=zi.getUniforms(),ui=Nt.uniforms;if(Ct.useProgram(zi.program)&&(Ll=!0,fr=!0,ao=!0),H.id!==I&&(I=H.id,fr=!0),Ll||S!==E){Fe.setValue(F,"projectionMatrix",E.projectionMatrix),Fe.setValue(F,"viewMatrix",E.matrixWorldInverse);const cn=Fe.map.cameraPosition;cn!==void 0&&cn.setValue(F,Ut.setFromMatrixPosition(E.matrixWorld)),Ee.logarithmicDepthBuffer&&Fe.setValue(F,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Fe.setValue(F,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,fr=!0,ao=!0)}if(O.isSkinnedMesh){Fe.setOptional(F,O,"bindMatrix"),Fe.setOptional(F,O,"bindMatrixInverse");const cn=O.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),Fe.setValue(F,"boneTexture",cn.boneTexture,v))}O.isBatchedMesh&&(Fe.setOptional(F,O,"batchingTexture"),Fe.setValue(F,"batchingTexture",O._matricesTexture,v));const oo=B.morphAttributes;if((oo.position!==void 0||oo.normal!==void 0||oo.color!==void 0)&&mt.update(O,B,zi),(fr||Nt.receiveShadow!==O.receiveShadow)&&(Nt.receiveShadow=O.receiveShadow,Fe.setValue(F,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(ui.envMap.value=At,ui.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(ui.envMapIntensity.value=U.environmentIntensity),fr&&(Fe.setValue(F,"toneMappingExposure",x.toneMappingExposure),Nt.needsLights&&nd(ui,ao),ct&&H.fog===!0&&Mt.refreshFogUniforms(ui,ct),Mt.refreshMaterialUniforms(ui,H,tt,J,m.state.transmissionRenderTarget),Aa.upload(F,Cl(Nt),ui,v)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Aa.upload(F,Cl(Nt),ui,v),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Fe.setValue(F,"center",O.center),Fe.setValue(F,"modelViewMatrix",O.modelViewMatrix),Fe.setValue(F,"normalMatrix",O.normalMatrix),Fe.setValue(F,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const cn=H.uniformsGroups;for(let lo=0,sd=cn.length;lo<sd;lo++){const Dl=cn[lo];ue.update(Dl,zi),ue.bind(Dl,zi)}}return zi}function nd(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function id(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,U,B){b.get(E.texture).__webglTexture=U,b.get(E.depthTexture).__webglTexture=B;const H=b.get(E);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,U){const B=b.get(E);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,B=0){C=E,D=U,P=B;let H=!0,O=null,ct=!1,gt=!1;if(E){const At=b.get(E);At.__useDefaultFramebuffer!==void 0?(Ct.bindFramebuffer(F.FRAMEBUFFER,null),H=!1):At.__webglFramebuffer===void 0?v.setupRenderTarget(E):At.__hasExternalTextures&&v.rebindTextures(E,b.get(E.texture).__webglTexture,b.get(E.depthTexture).__webglTexture);const Dt=E.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(gt=!0);const Lt=b.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Lt[U])?O=Lt[U][B]:O=Lt[U],ct=!0):E.samples>0&&v.useMultisampledRTT(E)===!1?O=b.get(E).__webglMultisampledFramebuffer:Array.isArray(Lt)?O=Lt[B]:O=Lt,_.copy(E.viewport),N.copy(E.scissor),k=E.scissorTest}else _.copy(et).multiplyScalar(tt).floor(),N.copy(_t).multiplyScalar(tt).floor(),k=Wt;if(Ct.bindFramebuffer(F.FRAMEBUFFER,O)&&H&&Ct.drawBuffers(E,O),Ct.viewport(_),Ct.scissor(N),Ct.setScissorTest(k),ct){const At=b.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,At.__webglTexture,B)}else if(gt){const At=b.get(E.texture),Dt=U||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.__webglTexture,B||0,Dt)}I=-1},this.readRenderTargetPixels=function(E,U,B,H,O,ct,gt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=b.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&gt!==void 0&&(St=St[gt]),St){Ct.bindFramebuffer(F.FRAMEBUFFER,St);try{const At=E.texture,Dt=At.format,Lt=At.type;if(Dt!==Gn&&Qt.convert(Dt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const It=Lt===La&&(bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float"));if(Lt!==Li&&Qt.convert(Lt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&Lt!==Ri&&!It){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-H&&B>=0&&B<=E.height-O&&F.readPixels(U,B,H,O,Qt.convert(Dt),Qt.convert(Lt),ct)}finally{const At=C!==null?b.get(C).__webglFramebuffer:null;Ct.bindFramebuffer(F.FRAMEBUFFER,At)}}},this.copyFramebufferToTexture=function(E,U,B=0){const H=Math.pow(2,-B),O=Math.floor(U.image.width*H),ct=Math.floor(U.image.height*H);v.setTexture2D(U,0),F.copyTexSubImage2D(F.TEXTURE_2D,B,0,0,E.x,E.y,O,ct),Ct.unbindTexture()},this.copyTextureToTexture=function(E,U,B,H=0){const O=U.image.width,ct=U.image.height,gt=Qt.convert(B.format),St=Qt.convert(B.type);v.setTexture2D(B,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment),U.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,H,E.x,E.y,O,ct,gt,St,U.image.data):U.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,H,E.x,E.y,U.mipmaps[0].width,U.mipmaps[0].height,gt,U.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,H,E.x,E.y,gt,St,U.image),H===0&&B.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),Ct.unbindTexture()},this.copyTextureToTexture3D=function(E,U,B,H,O=0){const ct=Math.round(E.max.x-E.min.x),gt=Math.round(E.max.y-E.min.y),St=E.max.z-E.min.z+1,At=Qt.convert(H.format),Dt=Qt.convert(H.type);let Lt;if(H.isData3DTexture)v.setTexture3D(H,0),Lt=F.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)v.setTexture2DArray(H,0),Lt=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,H.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,H.unpackAlignment);const It=F.getParameter(F.UNPACK_ROW_LENGTH),xe=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Je=F.getParameter(F.UNPACK_SKIP_PIXELS),Ce=F.getParameter(F.UNPACK_SKIP_ROWS),Xn=F.getParameter(F.UNPACK_SKIP_IMAGES),_e=B.isCompressedTexture?B.mipmaps[O]:B.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,_e.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,_e.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,E.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,E.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,E.min.z),B.isDataTexture||B.isData3DTexture?F.texSubImage3D(Lt,O,U.x,U.y,U.z,ct,gt,St,At,Dt,_e.data):H.isCompressedArrayTexture?F.compressedTexSubImage3D(Lt,O,U.x,U.y,U.z,ct,gt,St,At,_e.data):F.texSubImage3D(Lt,O,U.x,U.y,U.z,ct,gt,St,At,Dt,_e),F.pixelStorei(F.UNPACK_ROW_LENGTH,It),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,xe),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Je),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ce),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Xn),O===0&&H.generateMipmaps&&F.generateMipmap(Lt),Ct.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?v.setTextureCube(E,0):E.isData3DTexture?v.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?v.setTexture2DArray(E,0):v.setTexture2D(E,0),Ct.unbindTexture()},this.resetState=function(){D=0,P=0,C=null,Ct.reset(),Zt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===vl?"display-p3":"srgb",e.unpackColorSpace=ee.workingColorSpace===to?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class El{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new zt(t),this.density=e}clone(){return new El(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class w_ extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class T_{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=rl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Di()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return zh("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ve=new A;class Oa{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=kn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=te(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=te(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=kn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=kn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=kn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=kn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array),i=te(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=te(e,this.array),n=te(n,this.array),i=te(i,this.array),r=te(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Pn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Oa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ra extends _s{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ns;const vr=new A,Fs=new A,Os=new A,Bs=new Et,xr=new Et,nu=new he,ya=new A,Mr=new A,Sa=new A,Qc=new Et,Wo=new Et,th=new Et;class Xo extends be{constructor(t=new Ra){if(super(),this.isSprite=!0,this.type="Sprite",Ns===void 0){Ns=new Ye;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new T_(e,5);Ns.setIndex([0,1,2,0,2,3]),Ns.setAttribute("position",new Oa(n,3,0,!1)),Ns.setAttribute("uv",new Oa(n,2,3,!1))}this.geometry=Ns,this.material=t,this.center=new Et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fs.setFromMatrixScale(this.matrixWorld),nu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Os.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fs.multiplyScalar(-Os.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Ea(ya.set(-.5,-.5,0),Os,a,Fs,i,r),Ea(Mr.set(.5,-.5,0),Os,a,Fs,i,r),Ea(Sa.set(.5,.5,0),Os,a,Fs,i,r),Qc.set(0,0),Wo.set(1,0),th.set(1,1);let o=t.ray.intersectTriangle(ya,Mr,Sa,!1,vr);if(o===null&&(Ea(Mr.set(-.5,.5,0),Os,a,Fs,i,r),Wo.set(0,1),o=t.ray.intersectTriangle(ya,Sa,Mr,!1,vr),o===null))return;const l=t.ray.origin.distanceTo(vr);l<t.near||l>t.far||e.push({distance:l,point:vr.clone(),uv:Cn.getInterpolation(vr,ya,Mr,Sa,Qc,Wo,th,new Et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ea(s,t,e,n,i,r){Bs.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(xr.x=r*Bs.x-i*Bs.y,xr.y=i*Bs.x+r*Bs.y):xr.copy(Bs),s.copy(t),s.x+=xr.x,s.y+=xr.y,s.applyMatrix4(nu)}class iu extends _s{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const eh=new A,nh=new A,ih=new he,qo=new xl,wa=new eo;class b_ extends be{constructor(t=new Ye,e=new iu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)eh.fromBufferAttribute(e,i-1),nh.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=eh.distanceTo(nh);t.setAttribute("lineDistance",new re(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(i),wa.radius+=r,t.ray.intersectsSphere(wa)===!1)return;ih.copy(i).invert(),qo.copy(t.ray).applyMatrix4(ih);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=new A,u=new A,d=new A,f=new A,g=this.isLineSegments?2:1,M=n.index,m=n.attributes.position;if(M!==null){const p=Math.max(0,a.start),w=Math.min(M.count,a.start+a.count);for(let x=p,T=w-1;x<T;x+=g){const D=M.getX(x),P=M.getX(x+1);if(h.fromBufferAttribute(m,D),u.fromBufferAttribute(m,P),qo.distanceSqToSegment(h,u,f,d)>l)continue;f.applyMatrix4(this.matrixWorld);const I=t.ray.origin.distanceTo(f);I<t.near||I>t.far||e.push({distance:I,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),w=Math.min(m.count,a.start+a.count);for(let x=p,T=w-1;x<T;x+=g){if(h.fromBufferAttribute(m,x),u.fromBufferAttribute(m,x+1),qo.distanceSqToSegment(h,u,f,d)>l)continue;f.applyMatrix4(this.matrixWorld);const P=t.ray.origin.distanceTo(f);P<t.near||P>t.far||e.push({distance:P,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const sh=new A,rh=new A;class A_ extends b_{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)sh.fromBufferAttribute(e,i),rh.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+sh.distanceTo(rh);t.setAttribute("lineDistance",new re(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class R_ extends qe{constructor(t,e,n,i,r,a,o,l,h){super(t,e,n,i,r,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wl extends Ye{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],h=new A,u=new Et;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){const g=n+d/e*i;h.x=t*Math.cos(g),h.y=t*Math.sin(g),a.push(h.x,h.y,h.z),o.push(0,0,1),u.x=(a[f]/t+1)/2,u.y=(a[f+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new re(a,3)),this.setAttribute("normal",new re(o,3)),this.setAttribute("uv",new re(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ce extends Ye{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const h=this;i=Math.floor(i),r=Math.floor(r);const u=[],d=[],f=[],g=[];let M=0;const y=[],m=n/2;let p=0;w(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new re(d,3)),this.setAttribute("normal",new re(f,3)),this.setAttribute("uv",new re(g,2));function w(){const T=new A,D=new A;let P=0;const C=(e-t)/n;for(let I=0;I<=r;I++){const S=[],_=I/r,N=_*(e-t)+t;for(let k=0;k<=i;k++){const L=k/i,X=L*l+o,Y=Math.sin(X),J=Math.cos(X);D.x=N*Y,D.y=-_*n+m,D.z=N*J,d.push(D.x,D.y,D.z),T.set(Y,C,J).normalize(),f.push(T.x,T.y,T.z),g.push(L,1-_),S.push(M++)}y.push(S)}for(let I=0;I<i;I++)for(let S=0;S<r;S++){const _=y[S][I],N=y[S+1][I],k=y[S+1][I+1],L=y[S][I+1];u.push(_,N,L),u.push(N,k,L),P+=6}h.addGroup(p,P,0),p+=P}function x(T){const D=M,P=new Et,C=new A;let I=0;const S=T===!0?t:e,_=T===!0?1:-1;for(let k=1;k<=i;k++)d.push(0,m*_,0),f.push(0,_,0),g.push(.5,.5),M++;const N=M;for(let k=0;k<=i;k++){const X=k/i*l+o,Y=Math.cos(X),J=Math.sin(X);C.x=S*J,C.y=m*_,C.z=S*Y,d.push(C.x,C.y,C.z),f.push(0,_,0),P.x=Y*.5+.5,P.y=J*.5*_+.5,g.push(P.x,P.y),M++}for(let k=0;k<i;k++){const L=D+k,X=N+k;T===!0?u.push(X,X+1,L):u.push(X+1,X,L),I+=3}h.addGroup(p,I,T===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ce(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ar extends ce{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Ar(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Tl extends Ye{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),h(n),u(),this.setAttribute("position",new re(r,3)),this.setAttribute("normal",new re(r.slice(),3)),this.setAttribute("uv",new re(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(w){const x=new A,T=new A,D=new A;for(let P=0;P<e.length;P+=3)g(e[P+0],x),g(e[P+1],T),g(e[P+2],D),l(x,T,D,w)}function l(w,x,T,D){const P=D+1,C=[];for(let I=0;I<=P;I++){C[I]=[];const S=w.clone().lerp(T,I/P),_=x.clone().lerp(T,I/P),N=P-I;for(let k=0;k<=N;k++)k===0&&I===P?C[I][k]=S:C[I][k]=S.clone().lerp(_,k/N)}for(let I=0;I<P;I++)for(let S=0;S<2*(P-I)-1;S++){const _=Math.floor(S/2);S%2===0?(f(C[I][_+1]),f(C[I+1][_]),f(C[I][_])):(f(C[I][_+1]),f(C[I+1][_+1]),f(C[I+1][_]))}}function h(w){const x=new A;for(let T=0;T<r.length;T+=3)x.x=r[T+0],x.y=r[T+1],x.z=r[T+2],x.normalize().multiplyScalar(w),r[T+0]=x.x,r[T+1]=x.y,r[T+2]=x.z}function u(){const w=new A;for(let x=0;x<r.length;x+=3){w.x=r[x+0],w.y=r[x+1],w.z=r[x+2];const T=m(w)/2/Math.PI+.5,D=p(w)/Math.PI+.5;a.push(T,1-D)}M(),d()}function d(){for(let w=0;w<a.length;w+=6){const x=a[w+0],T=a[w+2],D=a[w+4],P=Math.max(x,T,D),C=Math.min(x,T,D);P>.9&&C<.1&&(x<.2&&(a[w+0]+=1),T<.2&&(a[w+2]+=1),D<.2&&(a[w+4]+=1))}}function f(w){r.push(w.x,w.y,w.z)}function g(w,x){const T=w*3;x.x=t[T+0],x.y=t[T+1],x.z=t[T+2]}function M(){const w=new A,x=new A,T=new A,D=new A,P=new Et,C=new Et,I=new Et;for(let S=0,_=0;S<r.length;S+=9,_+=6){w.set(r[S+0],r[S+1],r[S+2]),x.set(r[S+3],r[S+4],r[S+5]),T.set(r[S+6],r[S+7],r[S+8]),P.set(a[_+0],a[_+1]),C.set(a[_+2],a[_+3]),I.set(a[_+4],a[_+5]),D.copy(w).add(x).add(T).divideScalar(3);const N=m(D);y(P,_+0,w,N),y(C,_+2,x,N),y(I,_+4,T,N)}}function y(w,x,T,D){D<0&&w.x===1&&(a[x]=w.x-1),T.x===0&&T.z===0&&(a[x]=D/2/Math.PI+.5)}function m(w){return Math.atan2(w.z,-w.x)}function p(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tl(t.vertices,t.indices,t.radius,t.details)}}class Ba extends Tl{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ba(t.radius,t.detail)}}class io extends Ye{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],h=[],u=[];let d=t;const f=(e-t)/i,g=new A,M=new Et;for(let y=0;y<=i;y++){for(let m=0;m<=n;m++){const p=r+m/n*a;g.x=d*Math.cos(p),g.y=d*Math.sin(p),l.push(g.x,g.y,g.z),h.push(0,0,1),M.x=(g.x/e+1)/2,M.y=(g.y/e+1)/2,u.push(M.x,M.y)}d+=f}for(let y=0;y<i;y++){const m=y*(n+1);for(let p=0;p<n;p++){const w=p+m,x=w,T=w+n+1,D=w+n+2,P=w+1;o.push(x,T,P),o.push(T,D,P)}}this.setIndex(o),this.setAttribute("position",new re(l,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new io(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ln extends Ye{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let h=0;const u=[],d=new A,f=new A,g=[],M=[],y=[],m=[];for(let p=0;p<=n;p++){const w=[],x=p/n;let T=0;p===0&&a===0?T=.5/e:p===n&&l===Math.PI&&(T=-.5/e);for(let D=0;D<=e;D++){const P=D/e;d.x=-t*Math.cos(i+P*r)*Math.sin(a+x*o),d.y=t*Math.cos(a+x*o),d.z=t*Math.sin(i+P*r)*Math.sin(a+x*o),M.push(d.x,d.y,d.z),f.copy(d).normalize(),y.push(f.x,f.y,f.z),m.push(P+T,1-x),w.push(h++)}u.push(w)}for(let p=0;p<n;p++)for(let w=0;w<e;w++){const x=u[p][w+1],T=u[p][w],D=u[p+1][w],P=u[p+1][w+1];(p!==0||a>0)&&g.push(x,T,P),(p!==n-1||l<Math.PI)&&g.push(T,D,P)}this.setIndex(g),this.setAttribute("position",new re(M,3)),this.setAttribute("normal",new re(y,3)),this.setAttribute("uv",new re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ln(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ue extends _s{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fh,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class so extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class C_ extends so{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Yo=new he,ah=new A,oh=new A;class su{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yl,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ah.setFromMatrixPosition(t.matrixWorld),e.position.copy(ah),oh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(oh),e.updateMatrixWorld(),Yo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Yo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const lh=new he,yr=new A,$o=new A;class P_ extends su{constructor(){super(new on(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Et(4,2),this._viewportCount=6,this._viewports=[new me(2,1,1,1),new me(0,1,1,1),new me(3,1,1,1),new me(1,1,1,1),new me(3,0,1,1),new me(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),yr.setFromMatrixPosition(t.matrixWorld),n.position.copy(yr),$o.copy(n.position),$o.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt($o),n.updateMatrixWorld(),i.makeTranslation(-yr.x,-yr.y,-yr.z),lh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lh)}}class Ii extends so{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new P_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class L_ extends su{constructor(){super(new Kh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class D_ extends so{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new L_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class I_ extends so{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const ch=new he;class U_{constructor(t,e,n=0,i=1/0){this.ray=new xl(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Ml,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ch.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ch),this}intersectObject(t,e=!0,n=[]){return ll(t,this,n,e),n.sort(hh),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)ll(t[i],this,n,e);return n.sort(hh),n}}function hh(s,t){return s.distance-t.distance}function ll(s,t,e,n){if(s.layers.test(t.layers)&&s.raycast(t,e),n===!0){const i=s.children;for(let r=0,a=i.length;r<a;r++)ll(i[r],t,e,!0)}}class N_ extends A_{constructor(t=10,e=10,n=4473924,i=8947848){n=new zt(n),i=new zt(i);const r=e/2,a=t/e,o=t/2,l=[],h=[];for(let f=0,g=0,M=-o;f<=e;f++,M+=a){l.push(-o,0,M,o,0,M),l.push(M,0,-o,M,0,o);const y=f===r?n:i;y.toArray(h,g),g+=3,y.toArray(h,g),g+=3,y.toArray(h,g),g+=3,y.toArray(h,g),g+=3}const u=new Ye;u.setAttribute("position",new re(l,3)),u.setAttribute("color",new re(h,3));const d=new iu({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_l}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_l);var xi;class F_{constructor(){z(this,xi,new Map)}on(t,e){return c(this,xi).has(t)||c(this,xi).set(t,new Set),c(this,xi).get(t).add(e),()=>this.off(t,e)}off(t,e){c(this,xi).get(t)?.delete(e)}emit(t,e){c(this,xi).get(t)?.forEach(n=>n(e))}}xi=new WeakMap;var Cr,Pr,Lr,Dr,Mi,Qn,Jt,ru,au,ou,lu,cu,hu,uu,Hs,du,fu,pu,mu;class O_{constructor(t="classic"){z(this,Jt);Rt(this,"scene");Rt(this,"renderer");Rt(this,"camera");Rt(this,"colliders",[]);z(this,Cr);z(this,Pr);z(this,Lr);z(this,Dr);z(this,Mi,[]);z(this,Qn);Z(this,Jt,ru).call(this),Z(this,Jt,au).call(this),Z(this,Jt,ou).call(this),Z(this,Jt,lu).call(this),Z(this,Jt,cu).call(this),Z(this,Jt,uu).call(this),Z(this,Jt,du).call(this),this.buildLayout(t)}get pickupSpots(){return c(this,Qn)?.pickupSpots||[]}get playerSpawns(){return c(this,Qn)?.playerSpawns||[]}buildLayout(t){this.clearLayout(),q(this,Qn,jo[t]||jo.classic),Z(this,Jt,fu).call(this,c(this,Qn).pillars),Z(this,Jt,pu).call(this,c(this,Qn).coverBlocks),Z(this,Jt,mu).call(this,c(this,Qn).crates)}clearLayout(){for(const t of c(this,Mi))this.scene.remove(t);q(this,Mi,[]),this.colliders.splice(4)}onResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}render(){this.renderer.render(this.scene,this.camera)}destroy(){this.renderer.domElement.remove(),this.renderer.dispose()}}Cr=new WeakMap,Pr=new WeakMap,Lr=new WeakMap,Dr=new WeakMap,Mi=new WeakMap,Qn=new WeakMap,Jt=new WeakSet,ru=function(){this.renderer=new E_({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=wh,this.renderer.toneMapping=bh,this.renderer.toneMappingExposure=rt.rendering.toneMappingExposure,document.body.appendChild(this.renderer.domElement)},au=function(){this.scene=new w_,this.scene.background=new zt(rt.rendering.fogColor),this.scene.fog=new El(rt.rendering.fogColor,rt.rendering.fogDensity)},ou=function(){this.camera=new on(75,window.innerWidth/window.innerHeight,.1,200),this.camera.position.set(0,rt.player.height,0),this.scene.add(this.camera)},lu=function(){q(this,Cr,new Ue({color:3355456,roughness:.7,metalness:.2})),q(this,Pr,new Ue({color:4473941,roughness:.6,metalness:.3})),q(this,Lr,new Ue({color:5596774,roughness:.4,metalness:.5})),q(this,Dr,new Ue({color:8939076,roughness:.8,metalness:.1}))},cu=function(){const t=rt.rendering;this.scene.add(new I_(t.ambientColor,t.ambientIntensity)),this.scene.add(new C_(t.hemiSkyColor,t.hemiGroundColor,t.hemiIntensity));const e=new D_(t.dirLightColor,t.dirLightIntensity);e.position.set(20,30,10),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.left=e.shadow.camera.bottom=-40,e.shadow.camera.right=e.shadow.camera.top=40,this.scene.add(e),Z(this,Jt,hu).call(this)},hu=function(){const t=rt.arena.size,e=[16729156,4491519,4521864,16755200];[[-t/2+3,5,-t/2+3],[t/2-3,5,-t/2+3],[-t/2+3,5,t/2-3],[t/2-3,5,t/2-3]].forEach((i,r)=>{const a=new Ii(e[r],12,40);a.position.set(...i),this.scene.add(a);const o=new ht(new ln(.3,8,8),new ke({color:e[r]}));o.position.set(...i),this.scene.add(o)})},uu=function(){const t=rt.arena.size,e=new ht(new ur(t,t),c(this,Cr));e.rotation.x=-Math.PI/2,e.receiveShadow=!0,this.scene.add(e);const n=new N_(t,30,2236979,2236979);n.position.y=.01,this.scene.add(n)},Hs=function(t,e,n,i,r=!1){const a=rt.arena.wallHeight,o=new ht(new kt(n,a,i),c(this,Pr));o.position.set(t,a/2,e),o.castShadow=!0,o.receiveShadow=!0,this.scene.add(o),r&&c(this,Mi).push(o),this.colliders.push({min:new A(t-n/2,0,e-i/2),max:new A(t+n/2,a,e+i/2)})},du=function(){const t=rt.arena.size/2;Z(this,Jt,Hs).call(this,0,-t,rt.arena.size+1,1),Z(this,Jt,Hs).call(this,0,t,rt.arena.size+1,1),Z(this,Jt,Hs).call(this,-t,0,1,rt.arena.size+1),Z(this,Jt,Hs).call(this,t,0,1,rt.arena.size+1)},fu=function(t){const e=rt.arena.wallHeight;(t||[]).forEach(([n,i])=>{const r=new ht(new ce(1.2,1.2,e,8),c(this,Lr));r.position.set(n,e/2,i),r.castShadow=!0,r.receiveShadow=!0,this.scene.add(r),c(this,Mi).push(r),this.colliders.push({min:new A(n-1.2,0,i-1.2),max:new A(n+1.2,e,i+1.2)})})},pu=function(t){(t||[]).forEach(e=>Z(this,Jt,Hs).call(this,e.x,e.z,e.w,e.d,!0))},mu=function(t){(t||[]).forEach(([e,n])=>{const i=1.5+Math.random(),r=new ht(new kt(i,i,i),c(this,Dr));r.position.set(e,i/2,n),r.rotation.y=Math.random()*Math.PI,r.castShadow=!0,r.receiveShadow=!0,this.scene.add(r),c(this,Mi).push(r),this.colliders.push({min:new A(e-i/2,0,n-i/2),max:new A(e+i/2,i,n+i/2)})})};var ze,rr,gu,_u;class B_{constructor(t){z(this,rr);Rt(this,"hp",rt.player.maxHP);Rt(this,"yaw",0);Rt(this,"pitch",0);z(this,ze,{});this.camera=t,Z(this,rr,gu).call(this)}get position(){return this.camera.position}get isMoving(){return!!(c(this,ze).KeyW||c(this,ze).KeyS||c(this,ze).KeyA||c(this,ze).KeyD)}wantsReload(){return!!c(this,ze).KeyR}update(t,e=1){this.camera.rotation.order="YXZ",this.camera.rotation.y=this.yaw,this.camera.rotation.x=this.pitch;const n=new A(0,0,-1).applyAxisAngle(new A(0,1,0),this.yaw),i=new A(1,0,0).applyAxisAngle(new A(0,1,0),this.yaw),r=c(this,ze).ShiftLeft||c(this,ze).ShiftRight,a=rt.player.speed*(r?rt.player.sprintMultiplier:1)*e,o=new A;return c(this,ze).KeyW&&o.add(n),c(this,ze).KeyS&&o.sub(n),c(this,ze).KeyD&&o.add(i),c(this,ze).KeyA&&o.sub(i),o.length()>0&&o.normalize(),this.position.x+=o.x*a*t,this.position.z+=o.z*a*t,o}updateFromTouch(t,e,n,i,r,a=1){if(this.yaw-=i*.005,this.pitch-=r*.005,this.pitch=Math.max(-Math.PI/2+.05,Math.min(Math.PI/2-.05,this.pitch)),this.camera.rotation.order="YXZ",this.camera.rotation.y=this.yaw,this.camera.rotation.x=this.pitch,Math.abs(e)>.05||Math.abs(n)>.05){const o=new A(0,0,-1).applyAxisAngle(new A(0,1,0),this.yaw),l=new A(1,0,0).applyAxisAngle(new A(0,1,0),this.yaw),h=rt.player.speed*a,u=new A;u.add(l.multiplyScalar(e)),u.add(o.multiplyScalar(-n)),u.length()>1&&u.normalize(),this.position.x+=u.x*h*t,this.position.z+=u.z*h*t}}takeDamage(t){return this.hp-=t,this.hp<0&&(this.hp=0),this.hp<=0}reset(){this.hp=rt.player.maxHP,this.yaw=0,this.pitch=0,this.position.set(0,rt.player.height,0)}clampToBounds(){const t=rt.arena.size/2-1;this.position.x=Math.max(-t,Math.min(t,this.position.x)),this.position.z=Math.max(-t,Math.min(t,this.position.z)),this.position.y=rt.player.height}}ze=new WeakMap,rr=new WeakSet,gu=function(){document.addEventListener("keydown",t=>{c(this,ze)[t.code]=!0}),document.addEventListener("keyup",t=>{c(this,ze)[t.code]=!1}),document.addEventListener("mousemove",t=>Z(this,rr,_u).call(this,t))},_u=function(t){this.yaw-=t.movementX*.002,this.pitch-=t.movementY*.002,this.pitch=Math.max(-Math.PI/2+.05,Math.min(Math.PI/2-.05,this.pitch))};const Un=Object.keys(rt.weapons),Ta=rt.weapons;var yi,za,ti,Mn,Qi,yn,ei,Sn,ts,Ir,ar,vu,xu;class z_{constructor(t){z(this,ar);Rt(this,"group",new Le);Rt(this,"reloading",!1);Rt(this,"reloadTimer",0);Rt(this,"fireCooldown",0);z(this,yi,0);z(this,za);z(this,ti,0);z(this,Mn,{});z(this,Qi,{});z(this,yn);z(this,ei);z(this,Sn,!1);z(this,ts,0);z(this,Ir,.3);q(this,za,t);for(const e of Un)c(this,Qi)[e]=Ta[e].maxAmmo,c(this,Mn)[e]=Z(this,ar,vu).call(this,e),c(this,Mn)[e].visible=!1,this.group.add(c(this,Mn)[e]);c(this,Mn)[Un[0]].visible=!0,Z(this,ar,xu).call(this),this.group.position.set(.3,-.28,-.5),t.add(this.group)}get currentKey(){return Un[c(this,ti)]}get currentDef(){return Ta[this.currentKey]}get ammo(){return c(this,Qi)[this.currentKey]}set ammo(t){c(this,Qi)[this.currentKey]=t}get weaponIndex(){return c(this,ti)}get weaponName(){return this.currentDef.name}get isSwitching(){return c(this,Sn)}static get KEYS(){return Un}switchTo(t){t===c(this,ti)||t<0||t>=Un.length||c(this,Sn)||(this.reloading=!1,q(this,Sn,!0),q(this,ts,c(this,Ir)),c(this,Mn)[this.currentKey].visible=!1,q(this,ti,t),c(this,Mn)[this.currentKey].visible=!0,this.fireCooldown=0)}scrollWeapon(t){let e=c(this,ti)+(t>0?1:-1);e<0&&(e=Un.length-1),e>=Un.length&&(e=0),this.switchTo(e)}tryFire(){return this.reloading||this.fireCooldown>0||c(this,Sn)?!1:this.ammo<=0?(this.startReload(),!1):(this.ammo--,this.fireCooldown=this.currentDef.fireRate,q(this,yi,this.currentKey==="shotgun"?2:this.currentKey==="rocket"?1.5:1),c(this,yn).intensity=15,c(this,ei).visible=!0,this.ammo<=0&&this.startReload(),!0)}startReload(){this.reloading||this.ammo>=this.currentDef.maxAmmo||c(this,Sn)||(this.reloading=!0,this.reloadTimer=this.currentDef.reloadTime)}reset(){for(const t of Un)c(this,Qi)[t]=Ta[t].maxAmmo;q(this,ti,0);for(const t of Un)c(this,Mn)[t].visible=!1;c(this,Mn)[Un[0]].visible=!0,this.reloading=!1,this.fireCooldown=0,q(this,yi,0),q(this,Sn,!1),this.group.rotation.z=0}update(t,e,n){if(this.fireCooldown=Math.max(0,this.fireCooldown-t),c(this,Sn)){q(this,ts,c(this,ts)-t);const a=c(this,ts)/c(this,Ir);return this.group.position.y=-.28-(1-Math.abs(a*2-1))*.3,c(this,ts)<=0&&(q(this,Sn,!1),this.group.position.y=-.28),!1}q(this,yi,c(this,yi)*.85),this.group.rotation.x=-c(this,yi)*.15,this.group.position.z=-.5+c(this,yi)*.05,c(this,yn).intensity*=.7,c(this,yn).intensity<.5&&(c(this,yn).intensity=0,c(this,ei).visible=!1);const i=n?10:3,r=n?.03:.008;return this.group.position.y=-.28+Math.sin(e*.001*i)*r,this.group.position.x=.3+Math.cos(e*.001*i*.5)*r*.5,this.reloading&&(this.reloadTimer-=t,this.group.rotation.z=Math.sin(this.reloadTimer*4)*.3,this.reloadTimer<=0)?(this.reloading=!1,this.ammo=this.currentDef.maxAmmo,this.group.rotation.z=0,!0):!1}}yi=new WeakMap,za=new WeakMap,ti=new WeakMap,Mn=new WeakMap,Qi=new WeakMap,yn=new WeakMap,ei=new WeakMap,Sn=new WeakMap,ts=new WeakMap,Ir=new WeakMap,ar=new WeakSet,vu=function(t){const e=new Le,n=new Ue({color:2236962,metalness:.8,roughness:.3}),i=new Ue({color:Ta[t].bulletColor,metalness:.6,roughness:.4}),r=new Ue({color:3355426,roughness:.7}),a=(o,l,h,u)=>{const d=new ht(o,l);return d.position.set(...h),u&&d.rotation.set(...u),e.add(d),d};return t==="rifle"?(a(new kt(.12,.14,.6),n,[0,-.05,-.2]),a(new ce(.025,.03,.35,8),n,[0,0,-.55],[Math.PI/2,0,0]),a(new kt(.08,.2,.1),r,[0,-.17,-.05],[-.2,0,0])):t==="shotgun"?(a(new kt(.14,.12,.7),n,[0,-.05,-.25]),a(new ce(.035,.035,.4,8),n,[0,.02,-.6],[Math.PI/2,0,0]),a(new ce(.035,.035,.4,8),n,[0,-.02,-.6],[Math.PI/2,0,0]),a(new kt(.1,.22,.12),r,[0,-.18,.05],[-.25,0,0]),a(new kt(.12,.06,.25),i,[0,-.12,-.1])):t==="sniper"?(a(new kt(.09,.1,.8),n,[0,-.05,-.3]),a(new ce(.02,.025,.5,8),n,[0,0,-.7],[Math.PI/2,0,0]),a(new ce(.04,.04,.15,8),i,[0,.08,-.25]),a(new kt(.07,.2,.1),r,[0,-.17,.05],[-.2,0,0])):t==="rocket"&&(a(new ce(.06,.06,.7,8),n,[0,0,-.3],[Math.PI/2,0,0]),a(new ce(.07,.065,.1,8),i,[0,0,-.65],[Math.PI/2,0,0]),a(new kt(.1,.2,.12),r,[0,-.14,0],[-.2,0,0]),a(new kt(.04,.08,.15),n,[0,.08,-.15])),e},xu=function(){q(this,yn,new Ii(16755200,0,8)),c(this,yn).position.set(0,0,-.75),this.group.add(c(this,yn)),q(this,ei,new ht(new ln(.06,6,6),new ke({color:16763972}))),c(this,ei).position.copy(c(this,yn).position),c(this,ei).visible=!1,this.group.add(c(this,ei))};var es,ns,is,Ge,Mu,yu,Su,Eu,wu,Tu,bu;class H_{constructor(t){z(this,Ge);Rt(this,"group",new Le);Rt(this,"hp");Rt(this,"alive",!0);Rt(this,"body");Rt(this,"head");Rt(this,"leftArm");Rt(this,"rightArm");Rt(this,"leftLeg");Rt(this,"rightLeg");z(this,es);z(this,ns);z(this,is);this.scene=t,this.hp=rt.enemy.maxHP,Z(this,Ge,Mu).call(this),this.group.position.set(20,0,-20),t.add(this.group)}get position(){return this.group.position}takeDamage(t){return this.hp-=t,this.hp<0&&(this.hp=0),this.hp<=0}kill(){this.alive=!1,this.group.visible=!1}spawn(t,e){this.hp=e,this.alive=!0,this.group.visible=!0,this.position.copy(t)}updateAnimation(t){const e=t*.005,n=Math.sin(e)*.05;this.body.position.y=1.05+n,this.head.position.y=1.85+n;const i=Math.sin(e*2)*.3;this.leftArm.rotation.x=i,this.rightArm.rotation.x=-i,this.leftLeg.rotation.x=-i*.6,this.rightLeg.rotation.x=i*.6,c(this,es).intensity=2+Math.sin(e*3)*1.5,c(this,ns).intensity=2+Math.sin(e*4)*2,c(this,is).intensity=1.5+Math.sin(e*2)*.8}}es=new WeakMap,ns=new WeakMap,is=new WeakMap,Ge=new WeakSet,Mu=function(){const t=new Ue({color:1710618,roughness:.3,metalness:.9}),e=new Ue({color:2754568,roughness:.4,metalness:.7}),n=new ke({color:16720384}),i=new ke({color:16737792});Z(this,Ge,yu).call(this,e,t,n),Z(this,Ge,Su).call(this,t,e,n),Z(this,Ge,Eu).call(this,e,t),Z(this,Ge,wu).call(this,t,e,i),Z(this,Ge,Tu).call(this,t,e),Z(this,Ge,bu).call(this,t,e,i),q(this,is,new Ii(16724736,2,8)),c(this,is).position.set(0,1.2,0),this.group.add(c(this,is))},yu=function(t,e,n){this.body=new ht(new kt(.9,1.1,.6),t),this.body.position.y=1.05,this.body.castShadow=!0,this.group.add(this.body);const i=new ht(new kt(.7,.5,.12),e);i.position.set(0,1.15,-.32),this.group.add(i);const r=new ht(new ln(.1,8,8),n);r.position.set(0,1.1,-.38),this.group.add(r),q(this,es,new Ii(16720384,3,4)),c(this,es).position.copy(r.position),this.group.add(c(this,es));const a=new ht(new ce(.38,.42,.25,8),e);a.position.y=.52,a.castShadow=!0,this.group.add(a)},Su=function(t,e,n){this.head=new ht(new kt(.48,.42,.5),t),this.head.position.y=1.85,this.head.castShadow=!0,this.group.add(this.head);const i=new ht(new kt(.08,.18,.5),e);i.position.set(0,2.1,0),this.group.add(i);const r=new ht(new kt(.4,.08,.06),n);r.position.set(0,1.88,-.26),this.group.add(r),q(this,ns,new Ii(16720384,4,5)),c(this,ns).position.set(0,1.88,-.3),this.group.add(c(this,ns)),[-.1,.1].forEach(l=>{const h=new ht(new ln(.04,6,6),new ke({color:16729088}));h.position.set(l,1.88,-.28),this.group.add(h)});const a=new ht(new kt(.36,.12,.15),e);a.position.set(0,1.68,-.18),this.group.add(a);const o=new ht(new ce(.12,.18,.2,6),t);o.position.y=1.6,this.group.add(o)},Eu=function(t,e){[-1,1].forEach(n=>{const i=new ht(new kt(.35,.2,.4),t);i.position.set(n*.6,1.5,0),i.castShadow=!0,this.group.add(i);const r=new ht(new Ar(.06,.25,5),e);r.position.set(n*.65,1.65,0),this.group.add(r)})},wu=function(t,e,n){this.leftArm=new Le,this.rightArm=new Le,[-1,1].forEach(o=>{const l=o===-1?this.leftArm:this.rightArm,h=new ht(new ce(.1,.12,.5,6),t);h.position.set(0,-.25,0),h.castShadow=!0,l.add(h);const u=new ht(new ln(.1,6,6),e);u.position.set(0,-.5,0),l.add(u);const d=new ht(new ce(.08,.1,.45,6),t);d.position.set(0,-.75,0),d.castShadow=!0,l.add(d);const f=new ht(new kt(.15,.1,.12),e);f.position.set(0,-1,0),l.add(f);for(let g=-1;g<=1;g++){const M=new ht(new Ar(.02,.15,4),n);M.position.set(g*.05,-1.12,-.04),M.rotation.x=.3,l.add(M)}l.position.set(o*.6,1.35,0),this.group.add(l)});const i=new ht(new kt(.1,.1,.5),t);i.position.set(0,-.85,-.28),this.rightArm.add(i);const r=new ht(new ce(.035,.04,.3,6),new Ue({color:1118481,metalness:.95,roughness:.1}));r.rotation.x=Math.PI/2,r.position.set(0,-.85,-.58),this.rightArm.add(r);const a=new ht(new ln(.04,6,6),n);a.position.set(0,-.85,-.72),this.rightArm.add(a)},Tu=function(t,e){this.leftLeg=new Le,this.rightLeg=new Le,[-1,1].forEach(n=>{const i=n===-1?this.leftLeg:this.rightLeg,r=new ht(new ce(.12,.14,.45,6),t);r.position.y=-.22,r.castShadow=!0,i.add(r);const a=new ht(new ln(.1,6,6),e);a.position.y=-.45,i.add(a);const o=new ht(new ce(.1,.12,.4,6),t);o.position.y=-.68,o.castShadow=!0,i.add(o);const l=new ht(new kt(.08,.3,.15),e);l.position.set(0,-.65,-.1),i.add(l);const h=new ht(new kt(.16,.08,.28),t);h.position.set(0,-.92,-.04),h.castShadow=!0,i.add(h),i.position.set(n*.22,.52,0),this.group.add(i)})},bu=function(t,e,n){[-.2,.2].forEach(i=>{const r=new ht(new ce(.08,.1,.3,6),t);r.position.set(i,1.25,.32),this.group.add(r);const a=new ht(new wl(.07,6),n);a.position.set(i,1.25,.47),this.group.add(a)});for(let i=0;i<4;i++){const r=new ht(new kt(.12,.08,.1),e);r.position.set(0,.7+i*.28,.3),this.group.add(r)}};const uh=[4491519,16746564,4521864,16729343,16777028,4521983,16729156,8978244];var ss,Ur,rs,as,Ys,os,$s,Ks,ls,cs,Fn,Fi,Au,Ru,Cu;class dh{constructor(t,e,n,i=0){z(this,Fi);Rt(this,"group",new Le);Rt(this,"hp",rt.player.maxHP);Rt(this,"alive",!0);Rt(this,"id");Rt(this,"name");Rt(this,"color");z(this,ss,new A);z(this,Ur,0);z(this,rs);z(this,as);z(this,Ys);z(this,os);z(this,$s);z(this,Ks);z(this,ls);z(this,cs);z(this,Fn);this.id=e,this.name=n,this.color=uh[i%uh.length],this.scene=t,Z(this,Fi,Au).call(this),Z(this,Fi,Ru).call(this),Z(this,Fi,Cu).call(this),t.add(this.group)}get position(){return this.group.position}setTarget(t,e){c(this,ss).set(t.x,0,t.z),q(this,Ur,e)}update(t){this.group.position.lerp(c(this,ss),Math.min(1,t*12));let e=c(this,Ur)-this.group.rotation.y;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;this.group.rotation.y+=e*Math.min(1,t*12);const n=performance.now()*.005,i=Math.sin(n*2)*.25;c(this,Ys).rotation.x=i,c(this,os).rotation.x=-i,c(this,$s).rotation.x=-i*.5,c(this,Ks).rotation.x=i*.5;const r=Math.max(0,this.hp/rt.player.maxHP);c(this,Fn).scale.x=Math.max(.01,r),c(this,Fn).position.x=-(1-r)*.5,c(this,Fn).material.color.setHex(r>.5?4521796:r>.25?16763904:16729156)}takeDamage(t){return this.hp-=t,this.hp<=0?(this.hp=0,this.kill(),!0):!1}kill(){this.alive=!1,this.group.visible=!1}respawn(t){this.hp=rt.player.maxHP,this.alive=!0,this.group.visible=!0,c(this,ss).set(t.x,0,t.z),this.group.position.copy(c(this,ss))}destroy(){this.scene.remove(this.group)}}ss=new WeakMap,Ur=new WeakMap,rs=new WeakMap,as=new WeakMap,Ys=new WeakMap,os=new WeakMap,$s=new WeakMap,Ks=new WeakMap,ls=new WeakMap,cs=new WeakMap,Fn=new WeakMap,Fi=new WeakSet,Au=function(){const t=new Ue({color:this.color,roughness:.4,metalness:.6}),e=new Ue({color:2236962,roughness:.3,metalness:.8});q(this,rs,new ht(new kt(.7,.9,.45),t)),c(this,rs).position.y=1.1,c(this,rs).castShadow=!0,this.group.add(c(this,rs)),q(this,as,new ht(new kt(.4,.35,.4),e)),c(this,as).position.y=1.8,c(this,as).castShadow=!0,this.group.add(c(this,as));const n=new ht(new kt(.32,.08,.05),new ke({color:this.color}));n.position.set(0,1.82,-.22),this.group.add(n),q(this,Ys,new Le),q(this,os,new Le),[-1,1].forEach(r=>{const a=r===-1?c(this,Ys):c(this,os);a.add(Object.assign(new ht(new ce(.08,.1,.4,6),e),{position:new A(0,-.2,0)})),a.add(Object.assign(new ht(new ce(.06,.08,.35,6),t),{position:new A(0,-.55,0)})),a.position.set(r*.45,1.35,0),this.group.add(a)});const i=new ht(new kt(.08,.08,.4),e);i.position.set(0,-.6,-.2),c(this,os).add(i),q(this,$s,new Le),q(this,Ks,new Le),[-1,1].forEach(r=>{const a=r===-1?c(this,$s):c(this,Ks);a.add(Object.assign(new ht(new ce(.1,.12,.4,6),e),{position:new A(0,-.2,0)})),a.add(Object.assign(new ht(new ce(.08,.1,.35,6),t),{position:new A(0,-.55,0)}));const o=new ht(new kt(.14,.06,.22),e);o.position.set(0,-.76,-.03),a.add(o),a.position.set(r*.18,.55,0),this.group.add(a)})},Ru=function(){const t=document.createElement("canvas");t.width=256,t.height=64;const e=t.getContext("2d");e.fillStyle="#"+this.color.toString(16).padStart(6,"0"),e.font="bold 28px Arial",e.textAlign="center",e.fillText(this.name,128,40);const n=new R_(t);q(this,ls,new Xo(new Ra({map:n,transparent:!0}))),c(this,ls).position.y=2.4,c(this,ls).scale.set(2,.5,1),this.group.add(c(this,ls))},Cu=function(){q(this,cs,new Xo(new Ra({color:3355443,transparent:!0,opacity:.6}))),c(this,cs).position.y=2.15,c(this,cs).scale.set(1,.06,1),this.group.add(c(this,cs)),q(this,Fn,new Xo(new Ra({color:4521796}))),c(this,Fn).position.y=2.15,c(this,Fn).scale.set(1,.05,1),this.group.add(c(this,Fn))};class k_{constructor(t){this.colliders=t}checkAABB(t,e){for(const n of this.colliders){const i=Math.max(n.min.x,Math.min(t.x,n.max.x)),r=Math.max(n.min.z,Math.min(t.z,n.max.z)),a=t.x-i,o=t.z-r;if(a*a+o*o<e*e)return{box:n,dx:a,dz:o}}return null}resolveCollision(t,e){for(let n=0;n<4;n++){const i=this.checkAABB(t,e);if(!i)break;const{dx:r,dz:a}=i,o=Math.sqrt(r*r+a*a);if(o>0){const l=(e-o)/o;t.x+=r*l,t.z+=a*l}else t.x+=e}}pointInsideWall(t){for(const e of this.colliders)if(t.x>=e.min.x&&t.x<=e.max.x&&t.y>=e.min.y&&t.y<=e.max.y&&t.z>=e.min.z&&t.z<=e.max.z)return!0;return!1}hasLineOfSight(t,e){const n=new A().subVectors(e,t).normalize(),i=new U_(t.clone(),n),r=t.distanceTo(e);for(const a of this.colliders){const o=new hr(a.min,a.max);if(i.ray.intersectsBox(o)){const l=i.ray.intersectBox(o,new A);if(l&&l.distanceTo(t)<r)return!1}}return!0}}var On,Ha,dl,fl,hs,wr;class G_{constructor(t,e){z(this,hs);z(this,On,[]);z(this,Ha,new ln(.08,6,6));z(this,dl,new ke({color:16763904}));z(this,fl,new ke({color:16729156}));this.scene=t,this.physics=e}get activeBullets(){return c(this,On)}spawn(t,e,n,i=null){const r=i?.bulletSpeed||rt.weapon.bulletSpeed,a=n?16729156:i?.bulletColor||16763904,o=new ke({color:a}),l=new ht(c(this,Ha),o);l.position.copy(t),l.add(new Ii(a,2,4)),this.scene.add(l),c(this,On).push({mesh:l,velocity:e.clone().multiplyScalar(r),isEnemy:n,life:3,weaponDef:i})}update(t,e){for(let n=c(this,On).length-1;n>=0;n--){const i=c(this,On)[n];if(i.mesh.position.add(i.velocity.clone().multiplyScalar(t)),i.life-=t,i.life<=0||this.physics.pointInsideWall(i.mesh.position)){e.onWallHit?.(i.mesh.position),Z(this,hs,wr).call(this,n);continue}if(i.isEnemy&&e.onPlayerHit?.(i)){Z(this,hs,wr).call(this,n);continue}if(!i.isEnemy&&e.onEnemyHit?.(i)){Z(this,hs,wr).call(this,n);continue}}}testPlayerHit(t,e,n){const i=t.mesh.position,r=t.velocity.clone().multiplyScalar(n),a=r.length(),o=1;let l=i.distanceTo(e);if(a>.001){const h=r.clone().normalize(),u=new A().subVectors(e,i),d=Math.max(0,Math.min(a,u.dot(h)));l=i.clone().add(h.multiplyScalar(d)).distanceTo(e)}return l<o}testEnemyHit(t,e){const n=t.mesh.position,i=n.x-e.x,r=n.z-e.z,a=n.y-e.y;return i*i+r*r<rt.enemy.hitRadius**2&&Math.abs(a)<rt.enemy.hitHalfHeight}clearAll(){for(let t=c(this,On).length-1;t>=0;t--)Z(this,hs,wr).call(this,t)}}On=new WeakMap,Ha=new WeakMap,dl=new WeakMap,fl=new WeakMap,hs=new WeakSet,wr=function(t){const e=c(this,On)[t];this.scene.remove(e.mesh),c(this,On).splice(t,1)};var us;class V_{constructor(t){z(this,us,[]);this.scene=t}spawn(t,e,n=8){for(let i=0;i<n;i++){const r=new ht(new kt(.06,.06,.06),new ke({color:e}));r.position.copy(t),this.scene.add(r),c(this,us).push({mesh:r,velocity:new A((Math.random()-.5)*8,Math.random()*5+2,(Math.random()-.5)*8),life:.6+Math.random()*.4})}}update(t){for(let e=c(this,us).length-1;e>=0;e--){const n=c(this,us)[e];n.velocity.y-=rt.physics.gravity*t,n.mesh.position.add(n.velocity.clone().multiplyScalar(t)),n.life-=t,n.mesh.material.opacity=n.life,n.life<=0&&(this.scene.remove(n.mesh),c(this,us).splice(e,1))}}}us=new WeakMap;const W_={health:{name:"Health Pack",color:4521796,glow:65280,value:50,respawn:15,duration:0,css:"#4f4"},ammo:{name:"Ammo Crate",color:16763904,glow:16755200,value:30,respawn:10,duration:0,css:"#fc0"},shield:{name:"Shield",color:4491519,glow:2254591,value:.5,respawn:20,duration:10,css:"#48f"},speed:{name:"Speed Boost",color:16729343,glow:16711935,value:1.5,respawn:20,duration:8,css:"#f4f"},damage:{name:"Double Damage",color:16729156,glow:16711680,value:2,respawn:25,duration:10,css:"#f44"}};var js,En,He,ka,Pu;class X_{constructor(t){z(this,ka);z(this,js);z(this,En,[]);z(this,He,[]);q(this,js,t)}get activeEffects(){return c(this,He)}get pickups(){return c(this,En)}getSpeedMultiplier(){return c(this,He).some(t=>t.type==="speed")?1.5:1}getDamageMultiplier(){return c(this,He).some(t=>t.type==="damage")?2:1}getShieldMultiplier(){return c(this,He).some(t=>t.type==="shield")?.5:1}spawnFromLayout(t){this.clearAll(),t.forEach((e,n)=>{const i=W_[e.type];if(!i)return;const r=new Le;r.position.set(e.x,.8,e.z);const a=Z(this,ka,Pu).call(this,e.type,i);r.add(a);const o=new Ii(i.glow,3,6);o.position.y=.2,r.add(o);const l=new ht(new io(.5,.7,16),new ke({color:i.glow,transparent:!0,opacity:.4,side:mn}));l.rotation.x=-Math.PI/2,l.position.y=-.75,r.add(l),c(this,js).add(r),c(this,En).push({id:n,type:e.type,def:i,group:r,mesh:a,light:o,ring:l,active:!0,respawnTimer:0,spot:e})})}update(t,e,n){const i=performance.now()*.001;for(const r of c(this,En))if(r.active){r.group.rotation.y=i*1.5,r.group.position.y=.8+Math.sin(i*2+r.id)*.15,r.light.intensity=2.5+Math.sin(i*3+r.id*.7),r.ring.material.opacity=.3+Math.sin(i*2+r.id)*.15;const a=e.x-r.spot.x,o=e.z-r.spot.z;a*a+o*o<2.25&&(this.collect(r.id),n?.(r))}else r.respawnTimer-=t,r.respawnTimer<=0&&(r.active=!0,r.group.visible=!0);for(let r=c(this,He).length-1;r>=0;r--)c(this,He)[r].remaining-=t,c(this,He)[r].remaining<=0&&c(this,He).splice(r,1)}collect(t){const e=c(this,En).find(n=>n.id===t);return!e||!e.active?null:(e.active=!1,e.group.visible=!1,e.respawnTimer=e.def.respawn,e.def.duration>0&&(q(this,He,c(this,He).filter(n=>n.type!==e.type)),c(this,He).push({type:e.type,name:e.def.name,remaining:e.def.duration,total:e.def.duration,css:e.def.css})),e)}getPickupPositions(){return c(this,En).filter(t=>t.active).map(t=>({x:t.spot.x,z:t.spot.z,color:t.def.css}))}clearAll(){for(const t of c(this,En))c(this,js).remove(t.group);q(this,En,[]),q(this,He,[])}reset(){for(const t of c(this,En))t.active=!0,t.group.visible=!0,t.respawnTimer=0;q(this,He,[])}}js=new WeakMap,En=new WeakMap,He=new WeakMap,ka=new WeakSet,Pu=function(t,e){const n=i=>new Ue({color:i,metalness:.5,roughness:.3,emissive:i,emissiveIntensity:.3});switch(t){case"health":{const i=new Le,r=n(e.color);return i.add(new ht(new kt(.5,.15,.15),r)),i.add(new ht(new kt(.15,.5,.15),r)),i}case"ammo":return new ht(new kt(.4,.4,.4),n(e.color));case"shield":{const i=new ht(new Ba(.28),n(e.color));return i.scale.y=1.3,i}case"speed":return new ht(new Ar(.25,.5,6),n(e.color));case"damage":return new ht(new Ba(.3),new Ue({color:e.color,metalness:.7,roughness:.2,emissive:e.color,emissiveIntensity:.4}));default:return new ht(new ln(.25,8,8),n(e.color))}};var ni,ii,en,Nr,Ga,Va,Wa,Lu;class q_{constructor(t,e){z(this,Wa);z(this,ni,[]);z(this,ii,[]);z(this,en);z(this,Nr);z(this,Ga,new ln(.12,8,8));z(this,Va,new Ue({color:4482628,roughness:.5,metalness:.3}));Rt(this,"count",rt.grenade.maxCount);q(this,en,t),q(this,Nr,e)}throw(t,e,n,i){if(this.count<=0)return!1;this.count--;const r=new ht(c(this,Ga),c(this,Va));r.position.copy(t),r.castShadow=!0,c(this,en).add(r);const a=new ht(new io(.08,.12,12),new ke({color:16729156,side:mn}));a.rotation.x=-Math.PI/2,r.add(a);const o=rt.grenade.throwForce,l=e.clone().multiplyScalar(o);return l.y=o*.5,c(this,ni).push({mesh:r,velocity:l,life:rt.grenade.fuseTime,bounced:!1}),!0}update(t,e,n,i){const r={playerDamage:0,enemyHits:[],remoteHits:[]};for(let a=c(this,ni).length-1;a>=0;a--){const o=c(this,ni)[a];o.velocity.y-=rt.physics.gravity*t,o.mesh.position.add(o.velocity.clone().multiplyScalar(t)),o.mesh.rotation.x+=t*5,o.mesh.rotation.z+=t*3,o.life-=t,o.mesh.position.y<=.12&&(o.mesh.position.y=.12,o.velocity.y=Math.abs(o.velocity.y)*rt.grenade.bounceDecay,o.velocity.x*=.7,o.velocity.z*=.7),c(this,Nr).pointInsideWall(o.mesh.position)&&(o.velocity.x*=-.5,o.velocity.z*=-.5);const l=rt.arena.size/2-1;Math.abs(o.mesh.position.x)>l&&(o.mesh.position.x=Math.sign(o.mesh.position.x)*l,o.velocity.x*=-.5),Math.abs(o.mesh.position.z)>l&&(o.mesh.position.z=Math.sign(o.mesh.position.z)*l,o.velocity.z*=-.5),o.life<=0&&(Z(this,Wa,Lu).call(this,o.mesh.position,e,n,i,r),c(this,en).remove(o.mesh),c(this,ni).splice(a,1))}for(let a=c(this,ii).length-1;a>=0;a--){const o=c(this,ii)[a];o.life-=t;const l=1+(1-o.life/o.maxLife)*3;o.mesh.scale.setScalar(l),o.mesh.material.opacity=o.life/o.maxLife,o.light.intensity=o.life/o.maxLife*20,o.life<=0&&(c(this,en).remove(o.mesh),c(this,en).remove(o.light),c(this,ii).splice(a,1))}return r}reset(){for(const t of c(this,ni))c(this,en).remove(t.mesh);c(this,ni).length=0;for(const t of c(this,ii))c(this,en).remove(t.mesh),c(this,en).remove(t.light);c(this,ii).length=0,this.count=rt.grenade.maxCount}clearAll(){this.reset()}}ni=new WeakMap,ii=new WeakMap,en=new WeakMap,Nr=new WeakMap,Ga=new WeakMap,Va=new WeakMap,Wa=new WeakSet,Lu=function(t,e,n,i,r){const a=new ht(new ln(1,12,12),new ke({color:16737792,transparent:!0,opacity:1}));a.position.copy(t),c(this,en).add(a);const o=new Ii(16737792,20,15);o.position.copy(t),c(this,en).add(o),c(this,ii).push({mesh:a,light:o,life:.5,maxLife:.5});const l=rt.grenade.radius,h=rt.grenade.damage,u=t.distanceTo(e);if(u<l){const d=Math.round(h*(1-u/l));r.playerDamage+=d}for(const d of n){if(!d.enemy.alive)continue;const f=new A;d.enemy.group.getWorldPosition(f);const g=t.distanceTo(f);if(g<l){const M=Math.round(h*(1-g/l));r.enemyHits.push({bot:d,damage:M})}}for(const[d,f]of i){if(!f.alive)continue;const g=t.distanceTo(f.position);if(g<l){const M=Math.round(h*(1-g/l));r.remoteHits.push({id:d,rp:f,damage:M})}}};var nn,Bn,oe,Xa,$e,Si,wn,hi,Du,Tr;class Y_{constructor(t){z(this,hi);Rt(this,"mode","ffa");Rt(this,"localTeam",null);Rt(this,"scores",{red:0,blue:0});z(this,nn,{});z(this,Bn);z(this,oe,{});z(this,Xa,{});z(this,$e,{red:null,blue:null});z(this,Si,{red:0,blue:0});z(this,wn,{red:null,blue:null});q(this,Bn,t)}init(t,e,n){this.mode=t||"ffa",this.localTeam=e||null,this.scores={red:0,blue:0},this.mode==="ctf"&&Z(this,hi,Du).call(this,n)}isTeamMode(){return this.mode==="tdm"||this.mode==="ctf"}getEnemyTeam(){return this.localTeam==="red"?"blue":"red"}isFriendly(t,e){return this.isTeamMode()&&e===this.localTeam}tryPickupFlag(t,e){if(this.mode!=="ctf")return null;const n=this.getEnemyTeam(),i=c(this,wn)[n]||c(this,nn)[n];if(!c(this,$e)[n]&&t.distanceTo(i)<2)return c(this,$e)[n]=e,c(this,wn)[n]=null,c(this,oe)[n]&&(c(this,oe)[n].pole.visible=!1,c(this,oe)[n].flag.visible=!1),n;const r=this.localTeam;return c(this,wn)[r]&&t.distanceTo(c(this,nn)[r])<2?(Z(this,hi,Tr).call(this,r),"return_"+r):null}tryCapture(t,e){if(this.mode!=="ctf")return!1;const n=this.getEnemyTeam();if(c(this,$e)[n]===e){const i=c(this,nn)[this.localTeam];if(t.distanceTo(i)<2)return this.scores[this.localTeam]++,c(this,$e)[n]=null,Z(this,hi,Tr).call(this,n),!0}return!1}dropFlag(t,e){for(const n of["red","blue"])if(c(this,$e)[n]===t)return c(this,$e)[n]=null,c(this,wn)[n]=e.clone(),c(this,Si)[n]=rt.teams.flagReturnTime,c(this,oe)[n]&&(c(this,oe)[n].pole.visible=!0,c(this,oe)[n].flag.visible=!0,c(this,oe)[n].pole.position.set(e.x,1.5,e.z),c(this,oe)[n].flag.position.set(e.x+.4,2.8,e.z),c(this,oe)[n].base.position.set(e.x,.1,e.z)),n;return null}update(t,e,n){if(this.mode!=="ctf")return null;let i=null;for(const o of["red","blue"])c(this,wn)[o]&&(c(this,Si)[o]-=t,c(this,Si)[o]<=0&&(Z(this,hi,Tr).call(this,o),i={type:"flag_returned",team:o}));const r=performance.now()*.003;for(const o of["red","blue"])c(this,oe)[o]?.flag.visible&&(c(this,oe)[o].flag.rotation.y=Math.sin(r)*.3);const a=this.getEnemyTeam();return c(this,$e)[a],this.tryCapture(e,n)&&(i={type:"capture",team:this.localTeam,scores:{...this.scores}}),this.scores.red>=rt.teams.ctfScoreToWin&&(i={type:"win",team:"red"}),this.scores.blue>=rt.teams.ctfScoreToWin&&(i={type:"win",team:"blue"}),i}getTeamScores(){return{...this.scores}}isCarrying(t){return c(this,$e).red===t||c(this,$e).blue===t}reset(){this.scores={red:0,blue:0};for(const t of["red","blue"])c(this,$e)[t]=null,c(this,wn)[t]=null,c(this,Si)[t]=0,Z(this,hi,Tr).call(this,t)}destroy(){for(const t of["red","blue"])c(this,oe)[t]&&(c(this,Bn).remove(c(this,oe)[t].pole),c(this,Bn).remove(c(this,oe)[t].flag),c(this,Bn).remove(c(this,oe)[t].base))}}nn=new WeakMap,Bn=new WeakMap,oe=new WeakMap,Xa=new WeakMap,$e=new WeakMap,Si=new WeakMap,wn=new WeakMap,hi=new WeakSet,Du=function(t){const e=t/2-5,n={red:new A(-e,0,0),blue:new A(e,0,0)};for(const i of["red","blue"]){const r=rt.teams.colors[i],a=new ht(new ce(1,1,.2,16),new Ue({color:r,roughness:.3,metalness:.5}));a.position.copy(n[i]),a.position.y=.1,c(this,Bn).add(a),c(this,Xa)[i]=a;const o=new ht(new ce(.04,.04,3,6),new Ue({color:8947848}));o.position.copy(n[i]),o.position.y=1.5,c(this,Bn).add(o);const l=new ht(new ur(.8,.5),new ke({color:r,side:mn}));l.position.copy(n[i]),l.position.y=2.8,l.position.x+=.4,c(this,Bn).add(l),c(this,oe)[i]={pole:o,flag:l,base:a},c(this,nn)[i]=n[i].clone(),c(this,$e)[i]=null,c(this,wn)[i]=null}},Tr=function(t){c(this,wn)[t]=null,c(this,Si)[t]=0,c(this,oe)[t]&&(c(this,oe)[t].pole.visible=!0,c(this,oe)[t].flag.visible=!0,c(this,oe)[t].pole.position.set(c(this,nn)[t].x,1.5,c(this,nn)[t].z),c(this,oe)[t].flag.position.set(c(this,nn)[t].x+.4,2.8,c(this,nn)[t].z),c(this,oe)[t].base.position.set(c(this,nn)[t].x,.1,c(this,nn)[t].z))};var Fr,Wn,Iu,Uu,Nu,Fu;class $_{constructor(t,e){z(this,Wn);Rt(this,"state","patrol");Rt(this,"stateTimer",0);Rt(this,"strafeDir",1);Rt(this,"fireCooldown",0);Rt(this,"burstRemaining",0);Rt(this,"burstCooldown",0);z(this,Fr,new A);this.enemy=t,this.physics=e}update(t,e,n){if(!this.enemy.alive)return[];const i=this.enemy.position,r=new A().subVectors(e,i),a=r.length();r.normalize();let l=Math.atan2(r.x,r.z)-this.enemy.group.rotation.y;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;this.enemy.group.rotation.y+=l*(5+n.tier*2)*t;const h=this.physics.hasLineOfSight(new A(i.x,1.5,i.z),new A(e.x,rt.player.height,e.z));this.stateTimer-=t,this.stateTimer<=0&&Z(this,Wn,Iu).call(this,a,n);const u=Z(this,Wn,Uu).call(this,r,a),d=this.state==="dodge"?n.enemySpeed*2:n.enemySpeed;u.length()>0&&u.normalize(),i.add(u.multiplyScalar(d*t)),this.physics.resolveCollision(i,rt.enemy.radius);const f=rt.arena.size/2-1.5;return i.x=Math.max(-f,Math.min(f,i.x)),i.z=Math.max(-f,Math.min(f,i.z)),Z(this,Wn,Nu).call(this,t,r,a,h,n,i)}reset(){this.state="patrol",this.stateTimer=0,this.burstRemaining=0,this.fireCooldown=0}}Fr=new WeakMap,Wn=new WeakSet,Iu=function(t,e){if(t>25){this.state="chase",this.stateTimer=1.5+Math.random()*1.5;return}if(t<6){Math.random()<e.dodgeChance*2?(this.state="dodge",this.strafeDir=Math.random()>.5?1:-1,this.stateTimer=.4+Math.random()*.3):(this.state="strafe",this.strafeDir=Math.random()>.5?1:-1,this.stateTimer=1+Math.random());return}const n=Math.random();n<.3?(this.state="chase",this.stateTimer=1+Math.random()*1.5):n<.55?(this.state="strafe",this.strafeDir=Math.random()>.5?1:-1,this.stateTimer=1.5+Math.random()*1.5):n<.75&&e.tier>=1?(this.state="flank",this.strafeDir=Math.random()>.5?1:-1,this.stateTimer=2+Math.random()*2):n<.85&&e.tier>=2?(this.state="dodge",this.strafeDir=Math.random()>.5?1:-1,this.stateTimer=.5+Math.random()*.4):(this.state="patrol",c(this,Fr).set((Math.random()-.5)*(rt.arena.size-6),0,(Math.random()-.5)*(rt.arena.size-6)),this.stateTimer=2+Math.random()*2)},Uu=function(t,e){const n=new A;switch(this.state){case"chase":n.copy(t);break;case"strafe":{const i=new A(-t.z,0,t.x);n.copy(i).multiplyScalar(this.strafeDir),e>12&&n.add(t.clone().multiplyScalar(.4));break}case"flank":{const i=new A(-t.z,0,t.x);n.copy(i).multiplyScalar(this.strafeDir*.7),n.add(t.clone().multiplyScalar(.5));break}case"dodge":{const i=new A(-t.z,0,t.x);n.copy(i).multiplyScalar(this.strafeDir);break}case"patrol":{const i=new A().subVectors(c(this,Fr),this.enemy.position);i.y=0,i.length()<2&&(this.stateTimer=0),n.copy(i).normalize();break}}return n.y=0,n},Nu=function(t,e,n,i,r,a){const o=[];if(this.fireCooldown-=t,this.burstCooldown-=t,this.burstRemaining>0&&this.burstCooldown<=0&&i){this.burstRemaining--,this.burstCooldown=.1;const l=Z(this,Wn,Fu).call(this,e,r.accuracy);o.push(l)}return this.fireCooldown<=0&&n<rt.enemy.range&&i&&(this.fireCooldown=r.fireRate+Math.random()*.2,this.burstRemaining=r.burstCount,this.burstCooldown=0),o},Fu=function(t,e){const n=t.clone();return n.x+=(Math.random()-.5)*e,n.y+=(Math.random()-.5)*e*.4,n.z+=(Math.random()-.5)*e,n.normalize()};var qa,Ou;class K_{constructor(){z(this,qa)}getProfile(t){const e=rt.difficulty,n=Z(this,qa,Ou).call(this,t);return{tier:n,name:e.names[n],color:e.colors[n],enemySpeed:rt.enemy.speedBase+n*e.speedPerTier,fireRate:Math.max(e.minFireRate,rt.enemy.fireRateBase-n*e.fireRatePerTier),accuracy:Math.max(e.minAccuracy,rt.enemy.accuracyBase-n*e.accuracyPerTier),bulletDamage:rt.enemy.bulletDamageBase+n*e.damagePerTier,enemyHP:rt.enemy.maxHP+n*e.hpPerTier,dodgeChance:e.dodgeBase+n*e.dodgePerTier,burstCount:1+Math.min(n,3)}}}qa=new WeakSet,Ou=function(t){const e=rt.difficulty.thresholds;return t<e[0]?0:t<e[1]?1:t<e[2]?2:t<e[3]?3:4};var Ht,Ya,Bu;class j_{constructor(){z(this,Ya);z(this,Ht);q(this,Ht,{health:document.getElementById("player-health"),hpBar:document.getElementById("player-hp-bar"),ammo:document.getElementById("player-ammo"),score:document.getElementById("hud-score"),kills:document.getElementById("hud-kills"),timer:document.getElementById("hud-timer"),enemyBar:document.getElementById("enemy-health-bar"),diffBadge:document.getElementById("difficulty-badge"),hitMarker:document.getElementById("hitmarker"),killFeed:document.getElementById("kill-feed"),powerupBar:document.getElementById("powerup-bar"),weaponName:document.getElementById("weapon-name"),grenadeCount:document.getElementById("grenade-count"),teamScores:document.getElementById("team-scores"),weaponSlots:document.getElementById("weapon-slots")})}update(t,e){const n=Math.max(0,Math.ceil(t.playerHP));c(this,Ht).health.textContent=n;const i=t.playerHP/rt.player.maxHP*100;c(this,Ht).hpBar.style.width=i+"%",t.playerHP<30?(c(this,Ht).health.style.color="#f44",c(this,Ht).hpBar.style.background="linear-gradient(90deg, #f44, #f66)"):t.playerHP<60?(c(this,Ht).health.style.color="#fc0",c(this,Ht).hpBar.style.background="linear-gradient(90deg, #fc0, #fd0)"):(c(this,Ht).health.style.color="#4f4",c(this,Ht).hpBar.style.background="linear-gradient(90deg, #4f4, #2d2)"),c(this,Ht).ammo.textContent=t.reloading?"RE...":t.ammo,c(this,Ht).enemyBar.style.width=t.enemyHP/e.enemyHP*100+"%",c(this,Ht).score.textContent=t.score,c(this,Ht).kills.textContent=t.kills;const r=Math.floor(t.gameTime/60),a=Math.floor(t.gameTime%60).toString().padStart(2,"0");if(c(this,Ht).timer.textContent=`${r}:${a}`,c(this,Ht).diffBadge.textContent=e.name,c(this,Ht).diffBadge.style.color=e.color,c(this,Ht).diffBadge.style.borderColor=e.color,c(this,Ht).diffBadge.style.background=e.color+"22",c(this,Ht).weaponName&&(c(this,Ht).weaponName.textContent=t.weaponName||"Assault Rifle"),c(this,Ht).weaponSlots){const o=c(this,Ht).weaponSlots.children;for(let l=0;l<o.length;l++)o[l].classList.toggle("active",l===(t.weaponIndex??0))}c(this,Ht).grenadeCount&&(c(this,Ht).grenadeCount.textContent=t.grenades??0),c(this,Ht).teamScores&&t.teamScores?(c(this,Ht).teamScores.style.display="flex",c(this,Ht).teamScores.innerHTML=`<span class="team-red">RED ${t.teamScores.red}</span><span class="team-sep">-</span><span class="team-blue">${t.teamScores.blue} BLUE</span>`):c(this,Ht).teamScores&&(c(this,Ht).teamScores.style.display="none"),Z(this,Ya,Bu).call(this,t.activeEffects||[])}flashHitMarker(){c(this,Ht).hitMarker.classList.add("show"),setTimeout(()=>c(this,Ht).hitMarker.classList.remove("show"),120)}flashDamage(){const t=document.getElementById("damage-overlay");t.classList.add("hit"),setTimeout(()=>t.classList.remove("hit"),150)}showKillMessage(){const t=document.getElementById("kill-message");return t.style.display="block",()=>{t.style.display="none"}}addKillFeed(t){const e=document.createElement("div");e.className="kill-feed-entry",e.textContent=t,c(this,Ht).killFeed.appendChild(e),setTimeout(()=>e.remove(),3200)}clearKillFeed(){c(this,Ht).killFeed.innerHTML=""}}Ht=new WeakMap,Ya=new WeakSet,Bu=function(t){const e=c(this,Ht).powerupBar;if(e){e.innerHTML="";for(const n of t){const i=Math.max(0,n.remaining/n.total*100),r=document.createElement("div");r.className="powerup-indicator",r.style.borderColor=n.css,r.innerHTML=`<div class="powerup-name" style="color:${n.css}">${n.name}</div><div class="powerup-timer-bg"><div class="powerup-timer-fill" style="width:${i}%;background:${n.css}"></div></div><div class="powerup-time">${n.remaining.toFixed(1)}s</div>`,e.appendChild(r)}}};var Or,Br,zr,Hr;class Z_{constructor(){z(this,Or);z(this,Br);z(this,zr);z(this,Hr);const t=document.getElementById("minimap");q(this,Or,t.getContext("2d")),t.width=t.height=140,q(this,Br,q(this,zr,140)),q(this,Hr,140/rt.arena.size)}draw(t,e,n,i=[],r=[]){const a=c(this,Or),o=c(this,Hr),l=rt.arena.size/2;a.clearRect(0,0,c(this,Br),c(this,zr)),a.fillStyle="rgba(80, 80, 100, 0.7)";for(const d of t)a.fillRect((d.min.x+l)*o,(d.min.z+l)*o,(d.max.x-d.min.x)*o,(d.max.z-d.min.z)*o);for(const d of r){const f=(d.x+l)*o,g=(d.z+l)*o;a.fillStyle=d.color,a.beginPath(),a.moveTo(f,g-2.5),a.lineTo(f+2.5,g),a.lineTo(f,g+2.5),a.lineTo(f-2.5,g),a.fill()}const h=(e.x+l)*o,u=(e.z+l)*o;a.fillStyle="#4f4",a.beginPath(),a.arc(h,u,3,0,Math.PI*2),a.fill(),a.strokeStyle="#4f4",a.lineWidth=1.5,a.beginPath(),a.moveTo(h,u),a.lineTo(h-Math.sin(n)*8,u-Math.cos(n)*8),a.stroke();for(const d of i){const f=(d.x+l)*o,g=(d.z+l)*o;a.fillStyle=d.color||"#f44",a.beginPath(),a.arc(f,g,3,0,Math.PI*2),a.fill()}}}Or=new WeakMap,Br=new WeakMap,zr=new WeakMap,Hr=new WeakMap;var kr,Zs,$a;class J_{constructor(){z(this,kr,document.getElementById("blocker"));z(this,Zs,document.getElementById("game-over"));z(this,$a,document.getElementById("go-stats"))}showBlocker(){c(this,kr).style.display="flex"}hideBlocker(){c(this,kr).style.display="none"}showGameOver(t){c(this,$a).textContent=`Score: ${t.score}  |  Kills: ${t.kills}  |  Time: ${t.time}  |  Best Streak: ${t.maxStreak}`,c(this,Zs).style.display="flex"}hideGameOver(){c(this,Zs).style.display="none"}onGameOverClick(t){c(this,Zs).addEventListener("click",t)}}kr=new WeakMap,Zs=new WeakMap,$a=new WeakMap;var si,Js,Ka,zu;class Q_{constructor(){z(this,Ka);z(this,si,document.getElementById("scoreboard"));z(this,Js,document.getElementById("scoreboard-body"));document.addEventListener("keydown",t=>{t.code==="Tab"&&(t.preventDefault(),this.show())}),document.addEventListener("keyup",t=>{t.code==="Tab"&&this.hide()})}show(){c(this,si)&&(c(this,si).style.display="flex")}hide(){c(this,si)&&(c(this,si).style.display="none")}update(t){if(!c(this,Js)||!c(this,si)||c(this,si).style.display==="none")return;c(this,Js).innerHTML="";const e=[...t].sort((n,i)=>(i.score||0)-(n.score||0));for(const n of e){const i=document.createElement("tr");n.isLocal&&i.classList.add("local-player"),i.innerHTML=`<td style="color:${n.color||"#fff"}">${Z(this,Ka,zu).call(this,n.name)}</td><td>${n.kills||0}</td><td>${n.deaths||0}</td><td>${n.score||0}</td>`,c(this,Js).appendChild(i)}}}si=new WeakMap,Js=new WeakMap,Ka=new WeakSet,zu=function(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML};var ri,Tn,Ei,wi,Gr,or,Hu,ku;class tv{constructor(){z(this,or);z(this,ri);z(this,Tn);z(this,Ei);z(this,wi,!1);z(this,Gr,null);q(this,ri,document.getElementById("chat-panel")),q(this,Tn,document.getElementById("chat-log")),q(this,Ei,document.getElementById("chat-input")),c(this,ri)&&Z(this,or,Hu).call(this)}onSend(t){q(this,Gr,t)}open(){c(this,ri)&&(q(this,wi,!0),c(this,ri).classList.add("active"),c(this,Ei).focus())}close(){c(this,ri)&&(q(this,wi,!1),c(this,ri).classList.remove("active"),c(this,Ei).value="",c(this,Ei).blur())}get isOpen(){return c(this,wi)}addMessage(t,e,n="#fff"){if(!c(this,Tn))return;const i=document.createElement("div");i.className="chat-msg";const r=document.createElement("span");r.className="chat-name",r.style.color=n,r.textContent=t+": ";const a=document.createTextNode(e);for(i.appendChild(r),i.appendChild(a),c(this,Tn).appendChild(i);c(this,Tn).children.length>50;)c(this,Tn).removeChild(c(this,Tn).firstChild);c(this,Tn).scrollTop=c(this,Tn).scrollHeight,setTimeout(()=>{i.classList.add("fade"),setTimeout(()=>i.remove(),1e3)},8e3)}addSystem(t){this.addMessage("System",t,"#f80")}}ri=new WeakMap,Tn=new WeakMap,Ei=new WeakMap,wi=new WeakMap,Gr=new WeakMap,or=new WeakSet,Hu=function(){document.addEventListener("keydown",t=>{t.code==="Enter"&&(c(this,wi)?Z(this,or,ku).call(this):this.open(),t.preventDefault(),t.stopPropagation()),t.code==="Escape"&&c(this,wi)&&(this.close(),t.preventDefault(),t.stopPropagation())})},ku=function(){var e;const t=c(this,Ei).value.trim();t.length>0&&t.length<=200&&((e=c(this,Gr))==null||e.call(this,t)),this.close()};var ds,pl,ml,Qs,Ti,fs,ps,ai,lr,Gu,Vu;class ev{constructor(){z(this,lr);z(this,ds);z(this,pl);z(this,ml);z(this,Qs,!1);Rt(this,"moveX",0);Rt(this,"moveY",0);Rt(this,"lookDX",0);Rt(this,"lookDY",0);Rt(this,"shooting",!1);Rt(this,"wantsReload",!1);Rt(this,"wantsGrenade",!1);Rt(this,"weaponSwitch",-1);z(this,Ti,null);z(this,fs,null);z(this,ps,null);z(this,ai,null);if(q(this,ds,document.getElementById("touch-controls")),!!c(this,ds)){if(q(this,Qs,Z(this,lr,Gu).call(this)),!c(this,Qs)){c(this,ds).style.display="none";return}c(this,ds).style.display="block",document.body.classList.add("is-touch"),Z(this,lr,Vu).call(this)}}get active(){return c(this,Qs)}consumeFrame(){if(this.lookDX=0,this.lookDY=0,this.weaponSwitch>=0){const t=this.weaponSwitch;return this.weaponSwitch=-1,t}return-1}}ds=new WeakMap,pl=new WeakMap,ml=new WeakMap,Qs=new WeakMap,Ti=new WeakMap,fs=new WeakMap,ps=new WeakMap,ai=new WeakMap,lr=new WeakSet,Gu=function(){return"ontouchstart"in window||navigator.maxTouchPoints>0},Vu=function(){const t=document.getElementById("touch-move-zone"),e=document.getElementById("touch-look-zone");t?.addEventListener("touchstart",r=>{r.preventDefault();const a=r.changedTouches[0];q(this,fs,a.identifier),q(this,Ti,{x:a.clientX,y:a.clientY})},{passive:!1}),t?.addEventListener("touchmove",r=>{r.preventDefault();for(const a of r.changedTouches)if(a.identifier===c(this,fs)&&c(this,Ti)){const o=a.clientX-c(this,Ti).x,l=a.clientY-c(this,Ti).y,h=50,u=Math.min(Math.sqrt(o*o+l*l),h),d=Math.atan2(l,o);this.moveX=u/h*Math.cos(d),this.moveY=u/h*Math.sin(d);const f=document.getElementById("touch-stick-inner");f&&(f.style.transform=`translate(${this.moveX*30}px, ${this.moveY*30}px)`)}},{passive:!1});const n=r=>{for(const a of r.changedTouches)if(a.identifier===c(this,fs)){q(this,fs,null),q(this,Ti,null),this.moveX=0,this.moveY=0;const o=document.getElementById("touch-stick-inner");o&&(o.style.transform="translate(0, 0)")}};t?.addEventListener("touchend",n),t?.addEventListener("touchcancel",n),e?.addEventListener("touchstart",r=>{r.preventDefault();const a=r.changedTouches[0];q(this,ps,a.identifier),q(this,ai,{x:a.clientX,y:a.clientY}),this.shooting=!0},{passive:!1}),e?.addEventListener("touchmove",r=>{r.preventDefault();for(const a of r.changedTouches)a.identifier===c(this,ps)&&c(this,ai)&&(this.lookDX=(a.clientX-c(this,ai).x)*.4,this.lookDY=(a.clientY-c(this,ai).y)*.4,q(this,ai,{x:a.clientX,y:a.clientY}))},{passive:!1});const i=r=>{for(const a of r.changedTouches)a.identifier===c(this,ps)&&(q(this,ps,null),q(this,ai,null),this.shooting=!1,this.lookDX=0,this.lookDY=0)};e?.addEventListener("touchend",i),e?.addEventListener("touchcancel",i),document.getElementById("touch-btn-reload")?.addEventListener("touchstart",r=>{r.preventDefault(),this.wantsReload=!0}),document.getElementById("touch-btn-reload")?.addEventListener("touchend",()=>{this.wantsReload=!1}),document.getElementById("touch-btn-grenade")?.addEventListener("touchstart",r=>{r.preventDefault(),this.wantsGrenade=!0}),document.getElementById("touch-btn-grenade")?.addEventListener("touchend",()=>{this.wantsGrenade=!1});for(let r=0;r<4;r++)document.getElementById(`touch-btn-w${r}`)?.addEventListener("touchstart",o=>{o.preventDefault(),this.weaponSwitch=r})};var gl,ja,Vr,Xt,jt,pe,bi,sn,bn,Xe,zn,Se,oi,un,we,dn,De,Wr,ve,Xr,An,qr,Ke,Te,fn,pn,rn,Ie,ms,Ai,an,li,tr,Za,Yr,$r,Ja,qt,Wu,Xu,qu,cl,hl,Yu,$u,Ku,Ca,ju,Zu,Ju,ul,Qu;class nv{constructor(t,e){z(this,qt);z(this,gl,new F_);z(this,ja);z(this,Vr);z(this,Xt);z(this,jt);z(this,pe);z(this,bi);z(this,sn);z(this,bn);z(this,Xe);z(this,zn);z(this,Se);z(this,oi,new K_);z(this,un,[]);z(this,we,null);z(this,dn,null);z(this,De,new Map);z(this,Wr,[]);z(this,ve);z(this,Xr);z(this,An);z(this,qr);z(this,Ke);z(this,Te);z(this,fn,!1);z(this,pn,!1);z(this,rn,0);z(this,Ie,0);z(this,ms,0);z(this,Ai,0);z(this,an,0);z(this,li,0);z(this,tr);z(this,Za,0);z(this,Yr,performance.now());z(this,$r,0);z(this,Ja);if(q(this,ja,t),q(this,Vr,t.mode||"single"),q(this,Ja,e),q(this,tr,t.playerName||"Player"),q(this,Za,t.skinIndex||0),q(this,Xt,new O_(t.arena||"classic")),q(this,jt,new B_(c(this,Xt).camera)),q(this,pe,new z_(c(this,Xt).camera)),q(this,bi,new k_(c(this,Xt).colliders)),q(this,sn,new G_(c(this,Xt).scene,c(this,bi))),q(this,bn,new V_(c(this,Xt).scene)),q(this,Xe,new X_(c(this,Xt).scene)),q(this,zn,new q_(c(this,Xt).scene,c(this,bi))),q(this,Se,new Y_(c(this,Xt).scene)),c(this,Se).init(t.gameMode||"ffa",t.team||null,rt.arena.size),c(this,Xe).spawnFromLayout(c(this,Xt).pickupSpots),Z(this,qt,Wu).call(this,t.botCount??1),q(this,ve,new j_),q(this,Xr,new Z_),q(this,An,new J_),q(this,qr,new Q_),q(this,Ke,new tv),q(this,Te,new ev),c(this,Xt).playerSpawns.length){const n=c(this,Xt).playerSpawns[0];c(this,jt).position.set(n.x,rt.player.height,n.z)}c(this,Vr)==="multi"&&t.network&&(q(this,we,t.network),q(this,dn,t.playerId),Z(this,qt,Xu).call(this,t.players||[])),c(this,Ke).onSend(n=>{c(this,we)&&c(this,we).sendChat(n),c(this,Ke).addMessage(c(this,tr),n,"#4f4")}),Z(this,qt,qu).call(this),c(this,An).showBlocker(),Z(this,qt,ul).call(this)}destroy(){cancelAnimationFrame(c(this,$r));for(const t of c(this,Wr))t();for(const[,t]of c(this,De))t.destroy();c(this,De).clear(),c(this,Xe).clearAll(),c(this,sn).clearAll(),c(this,zn).clearAll(),c(this,Se).destroy(),c(this,Xt).destroy()}}gl=new WeakMap,ja=new WeakMap,Vr=new WeakMap,Xt=new WeakMap,jt=new WeakMap,pe=new WeakMap,bi=new WeakMap,sn=new WeakMap,bn=new WeakMap,Xe=new WeakMap,zn=new WeakMap,Se=new WeakMap,oi=new WeakMap,un=new WeakMap,we=new WeakMap,dn=new WeakMap,De=new WeakMap,Wr=new WeakMap,ve=new WeakMap,Xr=new WeakMap,An=new WeakMap,qr=new WeakMap,Ke=new WeakMap,Te=new WeakMap,fn=new WeakMap,pn=new WeakMap,rn=new WeakMap,Ie=new WeakMap,ms=new WeakMap,Ai=new WeakMap,an=new WeakMap,li=new WeakMap,tr=new WeakMap,Za=new WeakMap,Yr=new WeakMap,$r=new WeakMap,Ja=new WeakMap,qt=new WeakSet,Wu=function(t){const e=c(this,Xt).playerSpawns;for(let n=0;n<t;n++){const i=new H_(c(this,Xt).scene),r=new $_(i,c(this,bi)),a=e[(n+1)%e.length]||{x:20,z:-20},o=c(this,oi).getProfile(0);i.spawn(new A(a.x,0,a.z),o.enemyHP),c(this,un).push({enemy:i,ai:r})}},Xu=function(t){let e=0;for(const i of t){if(i.id===c(this,dn)){e++;continue}const r=new dh(c(this,Xt).scene,i.id,i.name,e++);r._team=i.team||null,c(this,De).set(i.id,r)}const n=(i,r)=>{c(this,Wr).push(c(this,we).on(i,r))};n("PLAYER_STATE",i=>{const r=c(this,De).get(i.playerId);r&&r.setTarget(i.position,i.rotation.y)}),n("PLAYER_SHOOT",i=>{const r=i.origin,a=i.direction;c(this,sn).spawn(new A(r.x,r.y,r.z),new A(a.x,a.y,a.z),!0)}),n("PLAYER_JOINED",i=>{if(i.playerId!==c(this,dn)&&!c(this,De).has(i.playerId)){const r=new dh(c(this,Xt).scene,i.playerId,i.name,c(this,De).size+1);r._team=i.team||null,c(this,De).set(i.playerId,r)}}),n("PLAYER_LEFT",i=>{const r=c(this,De).get(i.playerId);r&&(r.destroy(),c(this,De).delete(i.playerId))}),n("PICKUP_COLLECTED",i=>{c(this,Xe).collect(i.pickupId)}),n("PLAYER_HIT",i=>{i.targetId===c(this,dn)&&(c(this,jt).takeDamage(i.damage),c(this,ve).flashDamage())}),n("PLAYER_KILLED",i=>{if(i.targetId===c(this,dn)&&(In(this,ms)._++,c(this,Se).mode==="ctf")){const r=c(this,Se).dropFlag(c(this,dn),c(this,jt).position);r&&c(this,Ke).addSystem(`You dropped the ${r} flag!`)}i.killerId===c(this,dn)&&(In(this,Ie)._++,q(this,rn,c(this,rn)+100),c(this,ve).addKillFeed("Enemy player eliminated +100"))}),n("CHAT_MESSAGE",i=>{c(this,Ke).addMessage(i.name||"Player",i.text,i.color||"#fff")}),n("WEAPON_SWITCH",i=>{}),n("GRENADE_THROW",i=>{}),n("disconnected",()=>{c(this,ve).addKillFeed("Disconnected from server")})},qu=function(){document.addEventListener("pointerlockchange",()=>{q(this,fn,document.pointerLockElement===c(this,Xt).renderer.domElement),c(this,fn)?c(this,An).hideBlocker():c(this,pn)||c(this,An).showBlocker()}),document.addEventListener("mousedown",t=>{if(!c(this,Ke).isOpen){if(!c(this,fn)&&!c(this,pn)&&!c(this,Te).active){c(this,Xt).renderer.domElement.requestPointerLock();return}t.button===0&&Z(this,qt,cl).call(this)}}),document.addEventListener("keydown",t=>{c(this,Ke).isOpen||(t.code==="KeyR"&&c(this,fn)&&c(this,pe).startReload(),t.code==="Digit1"&&c(this,pe).switchTo(0),t.code==="Digit2"&&c(this,pe).switchTo(1),t.code==="Digit3"&&c(this,pe).switchTo(2),t.code==="Digit4"&&c(this,pe).switchTo(3),t.code==="KeyG"&&c(this,fn)&&Z(this,qt,hl).call(this))}),document.addEventListener("wheel",t=>{c(this,fn)&&!c(this,Ke).isOpen&&c(this,pe).scrollWeapon(t.deltaY)}),c(this,An).onGameOverClick(()=>Z(this,qt,Zu).call(this)),window.addEventListener("resize",()=>c(this,Xt).onResize())},cl=function(){if(c(this,pn)||!c(this,pe).tryFire())return;const t=c(this,Xt).camera,e=c(this,pe).currentDef,n=e.bulletsPerShot||1;for(let i=0;i<n;i++){const r=new A(0,0,-1).applyQuaternion(t.quaternion),a=e.spread;r.x+=(Math.random()-.5)*a*2,r.y+=(Math.random()-.5)*a*2,r.z+=(Math.random()-.5)*a*2,r.normalize();const o=t.position.clone().add(r.clone().multiplyScalar(.8));c(this,sn).spawn(o,r,!1,e)}if(c(this,we)){const i=new A(0,0,-1).applyQuaternion(t.quaternion),r=t.position.clone().add(i.clone().multiplyScalar(.8));c(this,we).sendShoot(r,i)}},hl=function(){if(c(this,pn))return;const t=c(this,Xt).camera,e=new A(0,0,-1).applyQuaternion(t.quaternion),n=t.position.clone();c(this,zn).throw(n,e,c(this,jt).yaw,c(this,jt).pitch)&&c(this,ve).addKillFeed(`Grenade thrown (${c(this,zn).count} left)`)},Yu=function(t,e){if(c(this,pn)||!c(this,sn).testPlayerHit(t,c(this,Xt).camera.position,e))return!1;const n=c(this,Xe).getShieldMultiplier(),i=c(this,oi).getProfile(c(this,Ie)),r=Math.round(i.bulletDamage*n),a=c(this,jt).takeDamage(r);if(q(this,an,0),c(this,bn).spawn(t.mesh.position,16711680,rt.particles.playerHitCount),c(this,ve).flashDamage(),a){q(this,pn,!0),In(this,ms)._++,document.exitPointerLock();const o=Math.floor(c(this,Ai)/60),l=Math.floor(c(this,Ai)%60).toString().padStart(2,"0");c(this,An).showGameOver({score:c(this,rn),kills:c(this,Ie),time:`${o}:${l}`,maxStreak:c(this,li)})}return!0},$u=function(t){const e=t.weaponDef||c(this,pe).currentDef,n=e.bulletDamage||rt.weapon.bulletDamage;for(const i of c(this,un)){if(!i.enemy.alive)continue;const r=new A;if(i.enemy.group.getWorldPosition(r),r.y=1,!c(this,sn).testEnemyHit(t,r))continue;const a=c(this,Xe).getDamageMultiplier(),o=i.enemy.takeDamage(Math.round(n*a));if(In(this,an)._++,c(this,an)>c(this,li)&&q(this,li,c(this,an)),c(this,bn).spawn(t.mesh.position,16729156,rt.particles.enemyHitCount),c(this,ve).flashHitMarker(),e.explosive&&Z(this,qt,Ku).call(this,t.mesh.position,e),o){i.enemy.kill();const l=c(this,oi).getProfile(c(this,Ie)),h=rt.scoring.baseKillScore+l.tier*rt.scoring.tierBonus+c(this,an)*rt.scoring.streakBonus;q(this,rn,c(this,rn)+h),In(this,Ie)._++,c(this,Se).isTeamMode()&&c(this,Se).scores[c(this,Se).localTeam||"red"]++,c(this,ve).addKillFeed(`Enemy eliminated +${h}`);const u=c(this,ve).showKillMessage(),d=i;setTimeout(()=>{u(),Z(this,qt,Ca).call(this,d)},2e3)}return!0}for(const[i,r]of c(this,De)){if(!r.alive||c(this,Se).isFriendly(i,r._team))continue;const a=r.position.clone();if(a.y=1,!c(this,sn).testEnemyHit(t,a))continue;const o=c(this,Xe).getDamageMultiplier(),l=Math.round(n*o);return c(this,bn).spawn(t.mesh.position,16729156,rt.particles.enemyHitCount),c(this,ve).flashHitMarker(),In(this,an)._++,c(this,an)>c(this,li)&&q(this,li,c(this,an)),c(this,we)&&(c(this,we).sendPlayerHit(i,l),r.takeDamage(l)&&(c(this,we).sendPlayerKilled(i),In(this,Ie)._++,q(this,rn,c(this,rn)+100),c(this,ve).addKillFeed("Player eliminated +100"))),!0}return!1},Ku=function(t,e){const n=e.explosionRadius||5;c(this,bn).spawn(t,16737792,20);const i=t.distanceTo(c(this,Xt).camera.position);if(i<n){const r=Math.round(e.bulletDamage*.5*(1-i/n));r>0&&c(this,jt).takeDamage(r)}},Ca=function(t){const e=c(this,oi).getProfile(c(this,Ie));let n;do n=new A((Math.random()-.5)*(rt.arena.size-10),0,(Math.random()-.5)*(rt.arena.size-10));while(n.distanceTo(c(this,Xt).camera.position)<15);t.enemy.spawn(n,e.enemyHP),t.ai.reset(),q(this,an,0),c(this,ve).addKillFeed(`Difficulty: ${e.name}`)},ju=function(t){switch(t.type){case"health":c(this,jt).hp=Math.min(rt.player.maxHP,c(this,jt).hp+t.def.value);break;case"ammo":c(this,pe).ammo=Math.min(c(this,pe).currentDef.maxAmmo,c(this,pe).ammo+t.def.value);break}c(this,ve).addKillFeed(`Picked up ${t.def.name}`),c(this,bn).spawn(new A(t.spot.x,1,t.spot.z),t.def.color,10),c(this,we)&&c(this,we).sendPickupCollected(t.id)},Zu=function(){c(this,jt).reset(),c(this,pe).reset(),c(this,sn).clearAll(),c(this,Xe).reset(),c(this,zn).reset(),c(this,Se).reset(),q(this,rn,0),q(this,Ie,0),q(this,ms,0),q(this,Ai,0),q(this,an,0),q(this,li,0),q(this,pn,!1),c(this,An).hideGameOver(),c(this,ve).clearKillFeed();for(const t of c(this,un))Z(this,qt,Ca).call(this,t);if(c(this,Xt).playerSpawns.length){const t=c(this,Xt).playerSpawns[0];c(this,jt).position.set(t.x,rt.player.height,t.z)}c(this,Te).active||c(this,Xt).renderer.domElement.requestPointerLock()},Ju=function(){const t=[{name:c(this,tr),kills:c(this,Ie),deaths:c(this,ms),score:c(this,rn),color:"#4f4",isLocal:!0,team:c(this,Se).localTeam}];for(const[,n]of c(this,De))t.push({name:n.name,kills:0,deaths:0,score:0,color:"#"+n.color.toString(16).padStart(6,"0"),team:n._team});let e=1;for(const n of c(this,un))t.push({name:`Bot ${e++}`,kills:0,deaths:0,score:0,color:"#f44"});return t},ul=function(){q(this,$r,requestAnimationFrame(()=>Z(this,qt,ul).call(this)));const t=performance.now(),e=Math.min((t-c(this,Yr))/1e3,.05);if(q(this,Yr,t),c(this,Te).active&&Z(this,qt,Qu).call(this,e),(c(this,fn)||c(this,Te).active)&&!c(this,pn)){const a=c(this,Xe).getSpeedMultiplier();c(this,Te).active?c(this,jt).updateFromTouch(e,c(this,Te).moveX,c(this,Te).moveY,c(this,Te).lookDX,c(this,Te).lookDY,a):c(this,jt).update(e,a),c(this,bi).resolveCollision(c(this,jt).position,rt.player.radius),c(this,jt).clampToBounds(),c(this,pe).update(e,t,c(this,jt).isMoving),(c(this,jt).wantsReload()||c(this,Te).wantsReload)&&c(this,pe).startReload();const o=c(this,Te).consumeFrame();o>=0&&c(this,pe).switchTo(o),c(this,Te).active&&c(this,Te).shooting&&Z(this,qt,cl).call(this),c(this,Te).wantsGrenade&&(Z(this,qt,hl).call(this),c(this,Te).wantsGrenade=!1);const l=c(this,oi).getProfile(c(this,Ie));for(const u of c(this,un)){const d=u.ai.update(e,c(this,Xt).camera.position,l);for(const f of d){const g=new A(u.enemy.position.x,1.5,u.enemy.position.z);c(this,sn).spawn(g,f,!0)}u.enemy.updateAnimation(t)}c(this,Xe).update(e,c(this,jt).position,u=>Z(this,qt,ju).call(this,u));const h=c(this,zn).update(e,c(this,Xt).camera.position,c(this,un),c(this,De));h.playerDamage>0&&(c(this,jt).takeDamage(h.playerDamage),c(this,ve).flashDamage());for(const u of h.enemyHits)if(u.bot.enemy.takeDamage(u.damage)){u.bot.enemy.kill(),In(this,Ie)._++,q(this,rn,c(this,rn)+100),c(this,ve).addKillFeed("Enemy eliminated by grenade +100");const f=c(this,ve).showKillMessage(),g=u.bot;setTimeout(()=>{f(),Z(this,qt,Ca).call(this,g)},2e3)}for(const u of h.remoteHits)c(this,we)&&(c(this,we).sendPlayerHit(u.id,u.damage),u.rp.takeDamage(u.damage)&&(c(this,we).sendPlayerKilled(u.id),In(this,Ie)._++,q(this,rn,c(this,rn)+100),c(this,ve).addKillFeed("Player eliminated by grenade +100")));if(c(this,Se).mode==="ctf"){const u=c(this,Se).tryPickupFlag(c(this,jt).position,c(this,dn)||"local");u&&!u.startsWith("return_")?c(this,Ke).addSystem(`You picked up the ${u} flag!`):u?.startsWith("return_")&&c(this,Ke).addSystem(`${u.split("_")[1]} flag returned!`);const d=c(this,Se).update(e,c(this,jt).position,c(this,dn)||"local");d?.type==="capture"&&(c(this,Ke).addSystem(`Flag captured! Score: Red ${d.scores.red} - Blue ${d.scores.blue}`),q(this,rn,c(this,rn)+500))}for(const[,u]of c(this,De))u.update(e);c(this,we)&&c(this,we).sendPlayerState(c(this,jt).position,{y:c(this,jt).yaw,x:c(this,jt).pitch}),q(this,Ai,c(this,Ai)+e)}c(this,sn).update(e,{onWallHit:a=>c(this,bn).spawn(a,16755268,rt.particles.wallHitCount),onPlayerHit:a=>Z(this,qt,Yu).call(this,a,e),onEnemyHit:a=>Z(this,qt,$u).call(this,a)}),c(this,bn).update(e);const n=c(this,oi).getProfile(c(this,Ie)),i=c(this,un).length?c(this,un).reduce((a,o)=>a.enemy.position.distanceTo(c(this,jt).position)<o.enemy.position.distanceTo(c(this,jt).position)?a:o):null;c(this,ve).update({playerHP:c(this,jt).hp,ammo:c(this,pe).ammo,reloading:c(this,pe).reloading,enemyHP:i?.enemy.hp??0,score:c(this,rn),kills:c(this,Ie),gameTime:c(this,Ai),activeEffects:c(this,Xe).activeEffects,weaponName:c(this,pe).weaponName,weaponIndex:c(this,pe).weaponIndex,grenades:c(this,zn).count,teamScores:c(this,Se).isTeamMode()?c(this,Se).getTeamScores():null,gameMode:c(this,Se).mode},n);const r=c(this,un).filter(a=>a.enemy.alive).map(a=>({x:a.enemy.position.x,z:a.enemy.position.z,color:"#f44"}));for(const[,a]of c(this,De))a.alive&&r.push({x:a.position.x,z:a.position.z,color:"#"+a.color.toString(16).padStart(6,"0")});c(this,Xr).draw(c(this,Xt).colliders,c(this,jt).position,c(this,jt).yaw,r,c(this,Xe).getPickupPositions()),c(this,qr).update(Z(this,qt,Ju).call(this)),c(this,Xt).render()},Qu=function(t){!c(this,fn)&&!c(this,pn)&&(q(this,fn,!0),c(this,An).hideBlocker())};const Ko=new hd;let zs=null;Ko.onStart(s=>{Ko.hide(),zs&&(zs.destroy(),zs=null),zs=new nv(s,()=>{zs.destroy(),zs=null,Ko.show()})});
