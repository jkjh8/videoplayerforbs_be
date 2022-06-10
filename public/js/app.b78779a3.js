(()=>{var e={4647:(e,t,r)=>{"use strict";r(8964),r(702);var o=r(1957),n=r(1947),s=r(499),i=r(9835);function a(e,t,r,o,n,s){const a=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(a)}const l=(0,i.aZ)({name:"App"});var c=r(1639);const d=(0,c.Z)(l,[["render",a]]),u=d;var p=r(3340),h=r(8910);const v=[{path:"/",component:()=>Promise.all([r.e(736),r.e(64),r.e(563)]).then(r.bind(r,5777)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(64),r.e(808)]).then(r.bind(r,1602))}]},{path:"/video",component:()=>Promise.all([r.e(736),r.e(334)]).then(r.bind(r,6334)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(796)]).then(r.bind(r,6796))}]},{path:"/playlist",component:()=>Promise.all([r.e(736),r.e(64),r.e(563)]).then(r.bind(r,5777)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(64),r.e(970)]).then(r.bind(r,3943))}]},{path:"/files",component:()=>Promise.all([r.e(736),r.e(64),r.e(563)]).then(r.bind(r,5777)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(64),r.e(22)]).then(r.bind(r,5440))}]},{path:"/setup",component:()=>Promise.all([r.e(736),r.e(64),r.e(563)]).then(r.bind(r,5777)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(64),r.e(620)]).then(r.bind(r,6620))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(862)]).then(r.bind(r,1862))}],f=v,j=(0,p.BC)((function(){const e=h.r5,t=(0,h.p7)({scrollBehavior:()=>({left:0,top:0}),routes:f,history:e("")});return t}));async function m(e,t){const r=e(u);r.use(n.Z,t);const o=(0,s.Xl)("function"===typeof j?await j({}):j);return{app:r,router:o}}var b=r(3322),g=r(7286),y=r(6827),w=r(6950),P=r(2941);const k={config:{},lang:b.Z,plugins:{Dialog:g.Z,Notify:y.Z,Loading:w.Z,AppFullscreen:P.Z}},O="";async function C({app:e,router:t},r){let o=!1;const n=e=>{try{return t.resolve(e).href}catch(r){}return Object(e)===e?null:e},s=e=>{if(o=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const t=n(e);null!==t&&(window.location.href=t,window.location.reload())},i=window.location.href.replace(window.location.origin,"");for(let l=0;!1===o&&l<r.length;l++)try{await r[l]({app:e,router:t,ssrContext:null,redirect:s,urlPath:i,publicPath:O})}catch(a){return a&&a.url?void s(a.url):void console.error("[Quasar] boot error:",a)}!0!==o&&(e.use(t),e.mount("#q-app"))}m(o.ri,k).then((e=>Promise.all([Promise.resolve().then(r.bind(r,1569)),Promise.resolve().then(r.bind(r,8269)),Promise.resolve().then(r.bind(r,5488))]).then((t=>{const r=t.map((e=>e.default)).filter((e=>"function"===typeof e));C(e,r)}))))},1569:(e,t,r)=>{"use strict";r.r(t),r.d(t,{api:()=>i,default:()=>a});var o=r(3340),n=r(9981),s=r.n(n);const i=s().create({baseURL:`http://${window.location.hostname}:3000/api`,withCredentials:!0}),a=(0,o.xr)((({app:e})=>{e.config.globalProperties.$axios=s(),e.config.globalProperties.$api=i}))},8269:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i,socket:()=>s});var o=r(3340),n=r(3819);const s=(0,n.ZP)(`http://${window.location.hostname}:3000?client=client`,{reconnectionDelayMax:5e3,transports:["websocket"],autoConnect:!1}),i=(0,o.xr)((({app:e})=>{e.config.globalProperties.$socket=s}))},9975:(e,t,r)=>{var o={"./bootstrap-icons.js":[9633,736],"./eva-icons.js":[5817,736],"./fontawesome-v5-pro.js":[4907,736],"./fontawesome-v5.js":[8381,736],"./ionicons-v4.js":[6670,736],"./ionicons-v5.js":[2901,736],"./line-awesome.js":[1061,736],"./material-icons-outlined.js":[3531,736],"./material-icons-round.js":[4537,736],"./material-icons-sharp.js":[555,736],"./material-icons.js":[5957,736],"./mdi-v3.js":[9057,736],"./mdi-v4.js":[4013,736],"./mdi-v5.js":[8040,736],"./mdi-v6.js":[1599,736],"./svg-bootstrap-icons.js":[4356,736],"./svg-eva-icons.js":[5341,736],"./svg-fontawesome-v5.js":[857,736],"./svg-ionicons-v4.js":[6696,736],"./svg-ionicons-v5.js":[8014,736],"./svg-line-awesome.js":[1731,736],"./svg-material-icons-outlined.js":[1434,736],"./svg-material-icons-round.js":[1679,736],"./svg-material-icons-sharp.js":[5496,736],"./svg-material-icons.js":[4880,736],"./svg-mdi-v4.js":[193,736],"./svg-mdi-v5.js":[4671,736],"./svg-mdi-v6.js":[9205,736],"./svg-themify.js":[2774,736],"./themify.js":[2542,736]};function n(e){if(!r.o(o,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],n=t[0];return r.e(t[1]).then((()=>r(n)))}n.keys=()=>Object.keys(o),n.id=9975,e.exports=n},1692:(e,t,r)=>{var o={"./ar.js":[8744,736],"./az-Latn.js":[9699,736],"./bg.js":[5545,736],"./bn.js":[2518,736],"./ca.js":[216,736],"./cs.js":[6790,736],"./da.js":[1121,736],"./de.js":[3640,736],"./el.js":[5279,736],"./en-GB.js":[858,736],"./en-US.js":[7360,736],"./eo.js":[2378,736],"./es.js":[6733,736],"./et.js":[9581,736],"./fa-IR.js":[2353,736],"./fa.js":[8540,736],"./fi.js":[941,736],"./fr.js":[7589,736],"./gn.js":[1054,736],"./he.js":[1752,736],"./hr.js":[8282,736],"./hu.js":[695,736],"./id.js":[5729,736],"./is.js":[6586,736],"./it.js":[9119,736],"./ja.js":[5559,736],"./km.js":[5067,736],"./ko-KR.js":[8503,736],"./kur-CKB.js":[9047,736],"./lt.js":[8523,736],"./lu.js":[344,736],"./lv.js":[258,736],"./ml.js":[3253,736],"./ms.js":[1279,736],"./nb-NO.js":[1308,736],"./nl.js":[9024,736],"./pl.js":[9717,736],"./pt-BR.js":[1607,736],"./pt.js":[5072,736],"./ro.js":[9553,736],"./ru.js":[961,736],"./sk.js":[6860,736],"./sl.js":[7742,736],"./sr-CYR.js":[4478,736],"./sr.js":[3294,736],"./sv.js":[633,736],"./ta.js":[9199,736],"./th.js":[3093,736],"./tr.js":[6891,736],"./ug.js":[3517,736],"./uk.js":[4369,736],"./vi.js":[133,736],"./zh-CN.js":[8826,736],"./zh-TW.js":[6342,736]};function n(e){if(!r.o(o,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],n=t[0];return r.e(t[1]).then((()=>r(n)))}n.keys=()=>Object.keys(o),n.id=1692,e.exports=n}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,r),s.exports}r.m=e,(()=>{var e=[];r.O=(t,o,n,s)=>{if(!o){var i=1/0;for(d=0;d<e.length;d++){for(var[o,n,s]=e[d],a=!0,l=0;l<o.length;l++)(!1&s||i>=s)&&Object.keys(r.O).every((e=>r.O[e](o[l])))?o.splice(l--,1):(a=!1,s<i&&(i=s));if(a){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[o,n,s]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+(64===e?"chunk-common":e)+"."+{22:"7433c434",64:"14324399",334:"be5c69b5",563:"f1208934",620:"16119776",796:"869e9c87",808:"4c39aa00",862:"1b524248",970:"35a2019c"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+({143:"app",736:"vendor"}[e]||e)+"."+{22:"2f606a9c",143:"f9890cf3",563:"df6dceee",736:"0f8be49d",808:"570ac8a9",970:"2f606a9c"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="videoplayerforbs:";r.l=(o,n,s,i)=>{if(e[o])e[o].push(n);else{var a,l;if(void 0!==s)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==o||u.getAttribute("data-webpack")==t+s){a=u;break}}a||(l=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",t+s),a.src=o),e[o]=[n];var p=(t,r)=>{a.onerror=a.onload=null,clearTimeout(h);var n=e[o];if(delete e[o],a.parentNode&&a.parentNode.removeChild(a),n&&n.forEach((e=>e(r))),t)return t(r)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=p.bind(null,a.onerror),a.onload=p.bind(null,a.onload),l&&document.head.appendChild(a)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p=""})(),(()=>{var e=(e,t,r,o)=>{var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var s=s=>{if(n.onerror=n.onload=null,"load"===s.type)r();else{var i=s&&("load"===s.type?"missing":s.type),a=s&&s.target&&s.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=a,n.parentNode.removeChild(n),o(l)}};return n.onerror=n.onload=s,n.href=t,document.head.appendChild(n),n},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var n=r[o],s=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(s===e||s===t))return n}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){n=i[o],s=n.getAttribute("data-href");if(s===e||s===t)return n}},o=o=>new Promise(((n,s)=>{var i=r.miniCssF(o),a=r.p+i;if(t(i,a))return n();e(o,a,n,s)})),n={143:0};r.f.miniCss=(e,t)=>{var r={22:1,563:1,808:1,970:1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=o(e).then((()=>{n[e]=0}),(t=>{throw delete n[e],t})))}})(),(()=>{var e={143:0};r.f.j=(t,o)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var s=new Promise(((r,o)=>n=e[t]=[r,o]));o.push(n[2]=s);var i=r.p+r.u(t),a=new Error,l=o=>{if(r.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var s=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;a.message="Loading chunk "+t+" failed.\n("+s+": "+i+")",a.name="ChunkLoadError",a.type=s,a.request=i,n[1](a)}};r.l(i,l,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,o)=>{var n,s,[i,a,l]=o,c=0;if(i.some((t=>0!==e[t]))){for(n in a)r.o(a,n)&&(r.m[n]=a[n]);if(l)var d=l(r)}for(t&&t(o);c<i.length;c++)s=i[c],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(d)},o=self["webpackChunkvideoplayerforbs"]=self["webpackChunkvideoplayerforbs"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=r.O(void 0,[736],(()=>r(4647)));o=r.O(o)})();