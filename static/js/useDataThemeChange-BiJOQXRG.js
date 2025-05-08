var F=Object.defineProperty;var A=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var L=(t,e,a)=>e in t?F(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,H=(t,e)=>{for(var a in e||(e={}))O.call(e,a)&&L(t,a,e[a]);if(A)for(var a of A(e))V.call(e,a)&&L(t,a,e[a]);return t};var w=(t,e,a)=>new Promise((o,n)=>{var s=r=>{try{f(a.next(r))}catch(m){n(m)}},g=r=>{try{f(a.throw(r))}catch(m){n(m)}},f=r=>r.done?o(r.value):Promise.resolve(r.value).then(s,g);f((a=a.apply(t,e)).next())});import{aq as P,p as E,aZ as W,ag as R,l as _,s as Q,N as v,m as T,aa as C,U as J,n as S,aJ as U,a7 as x,aI as Z,a_ as K}from"./index-z501862F.js";import{u as k}from"./epTheme-B7g_PWz4.js";function X(){const{$storage:t,$config:e}=P(),a=()=>{var s,g,f,r,m,h,y,$,b,p,u,l,d,c,i;W().multiTagsCache&&(!t.tags||t.tags.length===0)&&(t.tags=R),t.layout||(t.layout={layout:(s=e==null?void 0:e.Layout)!=null?s:"horizontal",theme:(g=e==null?void 0:e.Theme)!=null?g:"light",darkMode:(f=e==null?void 0:e.DarkMode)!=null?f:!0,sidebarStatus:(r=e==null?void 0:e.SidebarStatus)!=null?r:!0,epThemeColor:(m=e==null?void 0:e.EpThemeColor)!=null?m:"#409EFF",themeColor:(h=e==null?void 0:e.Theme)!=null?h:"light",overallStyle:(y=e==null?void 0:e.OverallStyle)!=null?y:"light"}),t.configure||(t.configure={grey:($=e==null?void 0:e.Grey)!=null?$:!1,weak:(b=e==null?void 0:e.Weak)!=null?b:!1,hideTabs:(p=e==null?void 0:e.HideTabs)!=null?p:!0,hideFooter:(u=e.HideFooter)!=null?u:!0,showLogo:(l=e==null?void 0:e.ShowLogo)!=null?l:!0,showModel:(d=e==null?void 0:e.ShowModel)!=null?d:"smart",multiTagsCache:(c=e==null?void 0:e.MultiTagsCache)!=null?c:!1,stretch:(i=e==null?void 0:e.Stretch)!=null?i:!1})},o=E(()=>t==null?void 0:t.layout.layout),n=E(()=>t.layout);return{layout:o,layoutTheme:n,initStorage:a}}const Y=_({id:"pure-app",state:()=>{var t,e,a,o;return{sidebar:{opened:(e=(t=v().getItem(`${C()}layout`))==null?void 0:t.sidebarStatus)!=null?e:T().SidebarStatus,withoutAnimation:!1,isClickCollapse:!1},layout:(o=(a=v().getItem(`${C()}layout`))==null?void 0:a.layout)!=null?o:T().Layout,device:J()?"mobile":"desktop",viewportSize:{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}}},getters:{getSidebarStatus(t){return t.sidebar.opened},getDevice(t){return t.device},getViewportWidth(t){return t.viewportSize.width},getViewportHeight(t){return t.viewportSize.height}},actions:{TOGGLE_SIDEBAR(t,e){const a=v().getItem(`${C()}layout`);t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!0,a.sidebarStatus=!0):!t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!1,a.sidebarStatus=!1):!t&&!e&&(this.sidebar.withoutAnimation=!1,this.sidebar.opened=!this.sidebar.opened,this.sidebar.isClickCollapse=!this.sidebar.opened,a.sidebarStatus=this.sidebar.opened),v().setItem(`${C()}layout`,a)},toggleSideBar(t,e){return w(this,null,function*(){yield this.TOGGLE_SIDEBAR(t,e)})},toggleDevice(t){this.device=t},setLayout(t){this.layout=t},setViewportSize(t){this.viewportSize=t},setSortSwap(t){this.sortSwap=t}}});function ee(){return Y(Q)}const B={themeLinkTagId:"theme-link-tag",themeLinkTagInjectTo:"head",multipleScopeVars:[{scopeName:"layout-theme-light",varsContent:`
        $subMenuActiveText: #000000d9 !default;
        $menuBg: #fff !default;
        $menuHover: #f6f6f6 !default;
        $subMenuBg: #fff !default;
        $subMenuActiveBg: #e0ebf6 !default;
        $menuText: rgb(0 0 0 / 60%) !default;
        $sidebarLogo: #fff !default;
        $menuTitleHover: #000 !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-default",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #001529 !default;
        $menuHover: rgb(64 145 247 / 15%) !default;
        $subMenuBg: #0f0303 !default;
        $subMenuActiveBg: #4091f7 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #002140 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-saucePurple",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #130824 !default;
        $menuHover: rgb(105 58 201 / 15%) !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #693ac9 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #1f0c38 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #693ac9 !default;
      `},{scopeName:"layout-theme-pink",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #28081a !default;
        $menuHover: rgb(216 68 147 / 15%) !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #d84493 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #3f0d29 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #d84493 !default;
      `},{scopeName:"layout-theme-dusk",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2a0608 !default;
        $menuHover: rgb(225 60 57 / 15%) !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #e13c39 !default;
        $menuText: rgb(254 254 254 / 65.1%) !default;
        $sidebarLogo: #42090c !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e13c39 !default;
      `},{scopeName:"layout-theme-volcano",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2b0e05 !default;
        $menuHover: rgb(232 95 51 / 15%) !default;
        $subMenuBg: #0f0603 !default;
        $subMenuActiveBg: #e85f33 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #441708 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e85f33 !default;
      `},{scopeName:"layout-theme-mingQing",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #032121 !default;
        $menuHover: rgb(89 191 193 / 15%) !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #59bfc1 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #053434 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #59bfc1 !default;
      `},{scopeName:"layout-theme-auroraGreen",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #0b1e15 !default;
        $menuHover: rgb(96 172 128 / 15%) !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #60ac80 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #112f21 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #60ac80 !default;
      `}]},te="/",ae="assets",D=t=>{let e=t.replace("#","").match(/../g);for(let a=0;a<3;a++)e[a]=parseInt(e[a],16);return e},j=(t,e,a)=>{let o=[t.toString(16),e.toString(16),a.toString(16)];for(let n=0;n<3;n++)o[n].length==1&&(o[n]=`0${o[n]}`);return`#${o.join("")}`},oe=(t,e)=>{let a=D(t);for(let o=0;o<3;o++)a[o]=Math.floor(a[o]*(1-e));return j(a[0],a[1],a[2])},ue=(t,e)=>{let a=D(t);for(let o=0;o<3;o++)a[o]=Math.floor((255-a[o])*e+a[o]);return j(a[0],a[1],a[2])},N=t=>`(^${t}\\s+|\\s+${t}\\s+|\\s+${t}$|^${t}$)`,I=({scopeName:t,multipleScopeVars:e})=>{const a=Array.isArray(e)&&e.length?e:B.multipleScopeVars;let o=document.documentElement.className;new RegExp(N(t)).test(o)||(a.forEach(n=>{o=o.replace(new RegExp(N(n.scopeName),"g"),` ${t} `)}),document.documentElement.className=o.replace(/(^\s+|\s+$)/g,""))},G=({id:t,href:e})=>{const a=document.createElement("link");return a.rel="stylesheet",a.href=e,a.id=t,a},ne=t=>{const e=H({scopeName:"theme-default",customLinkHref:s=>s},t),a=e.themeLinkTagId||B.themeLinkTagId;let o=document.getElementById(a);const n=e.customLinkHref(`${te.replace(/\/$/,"")}${`/${ae}/${e.scopeName}.css`.replace(/\/+(?=\/)/g,"")}`);if(o){o.id=`${a}_old`;const s=G({id:a,href:n});o.nextSibling?o.parentNode.insertBefore(s,o.nextSibling):o.parentNode.appendChild(s),s.onload=()=>{setTimeout(()=>{o.parentNode.removeChild(o),o=null},60),I(e)};return}o=G({id:a,href:n}),I(e),document[(e.themeLinkTagInjectTo||B.themeLinkTagInjectTo).replace("-prepend","")].appendChild(o)};function ie(){var b,p;const{layoutTheme:t,layout:e}=X(),a=S([{color:"#ffffff",themeColor:"light"},{color:"#1b2a47",themeColor:"default"},{color:"#722ed1",themeColor:"saucePurple"},{color:"#eb2f96",themeColor:"pink"},{color:"#f5222d",themeColor:"dusk"},{color:"#fa541c",themeColor:"volcano"},{color:"#13c2c2",themeColor:"mingQing"},{color:"#52c41a",themeColor:"auroraGreen"}]),{$storage:o}=P(),n=S((b=o==null?void 0:o.layout)==null?void 0:b.darkMode),s=S((p=o==null?void 0:o.layout)==null?void 0:p.overallStyle),g=document.documentElement;function f(u,l,d){const c=d||document.body;let{className:i}=c;i=i.replace(l,"").trim(),c.className=u?`${i} ${l}`:i}function r(u=(d=>(d=T().Theme)!=null?d:"light")(),l=!0){var i,M;t.value.theme=u,ne({scopeName:`layout-theme-${u}`});const c=o.layout.themeColor;if(o.layout={layout:e.value,theme:u,darkMode:n.value,sidebarStatus:(i=o.layout)==null?void 0:i.sidebarStatus,epThemeColor:(M=o.layout)==null?void 0:M.epThemeColor,themeColor:l?u:c,overallStyle:s.value},u==="default"||u==="light")h(T().EpThemeColor);else{const q=a.value.find(z=>z.themeColor===u);h(q.color)}}function m(u,l,d){document.documentElement.style.setProperty(`--el-color-primary-${u}-${l}`,n.value?oe(d,l/10):ue(d,l/10))}const h=u=>{k().setEpThemeColor(u),document.documentElement.style.setProperty("--el-color-primary",u);for(let l=1;l<=2;l++)m("dark",l,u);for(let l=1;l<=9;l++)m("light",l,u)};function y(u){s.value=u,k().epTheme==="light"&&n.value?r("default",!1):r(k().epTheme,!1),n.value?document.documentElement.classList.add("dark"):(o.layout.themeColor==="light"&&r("light",!1),document.documentElement.classList.remove("dark"))}function $(){U(),v().clear();const{Grey:u,Weak:l,MultiTagsCache:d,EpThemeColor:c,Layout:i}=T();ee().setLayout(i),h(c),x().multiTagsCacheChange(d),f(u,"html-grey",document.querySelector("html")),f(l,"html-weakness",document.querySelector("html")),Z.push("/login"),x().handleTags("equal",[...R]),K()}return{body:g,dataTheme:n,overallStyle:s,layoutTheme:t,themeColors:a,onReset:$,toggleClass:f,dataThemeChange:y,setEpThemeColor:h,setLayoutThemeColor:r}}export{ee as a,X as b,ne as t,ie as u};
