(()=>{"use strict";var e,a,c,t,f,d={},r={};function o(e){var a=r[e];if(void 0!==a)return a.exports;var c=r[e]={id:e,loaded:!1,exports:{}};return d[e].call(c.exports,c,c.exports,o),c.loaded=!0,c.exports}o.m=d,o.c=r,o.amdD=function(){throw new Error("define cannot be used indirect")},e=[],o.O=(a,c,t,f)=>{if(!c){var d=1/0;for(i=0;i<e.length;i++){c=e[i][0],t=e[i][1],f=e[i][2];for(var r=!0,b=0;b<c.length;b++)(!1&f||d>=f)&&Object.keys(o.O).every((e=>o.O[e](c[b])))?c.splice(b--,1):(r=!1,f<d&&(d=f));if(r){e.splice(i--,1);var n=t();void 0!==n&&(a=n)}}return a}f=f||0;for(var i=e.length;i>0&&e[i-1][2]>f;i--)e[i]=e[i-1];e[i]=[c,t,f]},o.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return o.d(a,{a:a}),a},c=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var f=Object.create(null);o.r(f);var d={};a=a||[null,c({}),c([]),c(c)];for(var r=2&t&&e;"object"==typeof r&&!~a.indexOf(r);r=c(r))Object.getOwnPropertyNames(r).forEach((a=>d[a]=()=>e[a]));return d.default=()=>e,o.d(f,d),f},o.d=(e,a)=>{for(var c in a)o.o(a,c)&&!o.o(e,c)&&Object.defineProperty(e,c,{enumerable:!0,get:a[c]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((a,c)=>(o.f[c](e,a),a)),[])),o.u=e=>"assets/js/"+({53:"935f2afb",4058:"caf2b8a3",4195:"c4f5d8e4",4368:"a94703ab",5174:"226557e9",5987:"410da243",7918:"17896441",8518:"a7bd4aaa",8592:"common",9661:"5e95c892",9918:"b3efe221"}[e]||e)+"."+{53:"c5190b7b",98:"a3a292ce",177:"f20fa555",228:"991834e3",305:"8e43bb74",310:"11fc9fa6",370:"1315fffa",402:"9dafc6ca",426:"9ff322c1",617:"d91bf4db",673:"ecf50cda",758:"96228037",870:"4ba9c1c3",889:"5949624f",1053:"922904b6",1084:"f9b9de01",1390:"e712e80f",1445:"043df882",1446:"5a687d57",1639:"ea878969",1650:"dec5a781",1660:"7755b861",1770:"2290f868",1772:"85e7387c",1873:"86ac1bf6",1920:"91e9dbb9",2040:"a670d164",2119:"7dc0ba64",2136:"f8bdd9b8",2200:"1dc3a2bf",2314:"f7dcca5d",2386:"ade753a3",2406:"7a4a4c00",2542:"2b0ddac4",2602:"aa5f2571",2615:"41a69209",2675:"d69fe95b",2744:"65470564",2820:"01b58537",2822:"1b3519c4",2865:"0489a5e3",2877:"212615ad",3203:"cf8396cb",3211:"d114f4f3",3283:"27c1e263",3314:"3fdeb9a9",3465:"cd179c60",3482:"236e8cba",3509:"e1401a64",3519:"863db5a9",3605:"42ff1ede",3833:"f01423b3",3883:"cf7ab9d4",3885:"3769eea1",3993:"64385669",4058:"08283ecb",4084:"40ea9c8c",4111:"63053b16",4144:"d2be93e1",4163:"31888bc5",4195:"c0deb4f8",4212:"f199714b",4293:"fdc54e8b",4323:"af1efaa1",4368:"00bc3a84",4439:"8a204221",4511:"53d9de24",4796:"c3229e8f",4812:"67681268",4879:"208d220b",5134:"c723552f",5174:"0e1f74e6",5188:"8adfb25d",5312:"49caafaf",5372:"192f8b78",5461:"723205b0",5616:"1509960a",5648:"f1dda5e2",5753:"121e0962",5815:"81be23b0",5819:"6e44b1b8",5860:"a7cf5a6e",5879:"fe00e10c",5987:"44029804",6062:"21334f82",6092:"b3e2a9f5",6121:"02408917",6395:"4ef4dd8d",6443:"86057bcb",6471:"24e62a2f",6665:"e51a17f7",6692:"5eaee8ce",6732:"1bee123b",6827:"35e5b113",6907:"aeb00dd2",6991:"fac7388c",7001:"deb59eb4",7213:"710c7f90",7285:"81a23cbf",7315:"4d56db79",7365:"5f0e0951",7370:"0e973de3",7421:"e550b518",7475:"975524e3",7525:"38a4a302",7565:"471a02d3",7590:"ea96ad9d",7601:"712c34e8",7663:"670ff866",7762:"3fae9504",7912:"396ea79d",7917:"bf65e41a",7918:"6ee03afa",7988:"f46dc1d4",8007:"65f1cff5",8029:"1fa3b7c2",8142:"71372eb9",8171:"9b5444be",8225:"05d90e51",8283:"ff2a41a6",8393:"ea7598d0",8518:"6d92c5a9",8561:"1b1fdc07",8592:"fd5ec5d5",8676:"8c493919",8770:"1e30797a",8813:"cc3aa5cc",8825:"54bc6e7b",8910:"e8e34196",8915:"cfcbe10d",9071:"345fc0ba",9121:"10b02965",9155:"da9969aa",9232:"705474e3",9296:"5f80654e",9411:"1e8f8332",9558:"ca3d099d",9607:"5daee906",9661:"3526eba6",9713:"69b1643f",9781:"74d7c2fa",9831:"28244dfd",9918:"b21b1c00",9972:"ade603fa"}[e]+".js",o.miniCssF=e=>{},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),t={},f="my-website:",o.l=(e,a,c,d)=>{if(t[e])t[e].push(a);else{var r,b;if(void 0!==c)for(var n=document.getElementsByTagName("script"),i=0;i<n.length;i++){var l=n[i];if(l.getAttribute("src")==e||l.getAttribute("data-webpack")==f+c){r=l;break}}r||(b=!0,(r=document.createElement("script")).charset="utf-8",r.timeout=120,o.nc&&r.setAttribute("nonce",o.nc),r.setAttribute("data-webpack",f+c),r.src=e),t[e]=[a];var u=(a,c)=>{r.onerror=r.onload=null,clearTimeout(s);var f=t[e];if(delete t[e],r.parentNode&&r.parentNode.removeChild(r),f&&f.forEach((e=>e(c))),a)return a(c)},s=setTimeout(u.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=u.bind(null,r.onerror),r.onload=u.bind(null,r.onload),b&&document.head.appendChild(r)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),o.p="/interactive-presentation-template/",o.gca=function(e){return e={17896441:"7918","935f2afb":"53",caf2b8a3:"4058",c4f5d8e4:"4195",a94703ab:"4368","226557e9":"5174","410da243":"5987",a7bd4aaa:"8518",common:"8592","5e95c892":"9661",b3efe221:"9918"}[e]||e,o.p+o.u(e)},(()=>{o.b=document.baseURI||self.location.href;var e={1303:0,532:0};o.f.j=(a,c)=>{var t=o.o(e,a)?e[a]:void 0;if(0!==t)if(t)c.push(t[2]);else if(/^(1303|532)$/.test(a))e[a]=0;else{var f=new Promise(((c,f)=>t=e[a]=[c,f]));c.push(t[2]=f);var d=o.p+o.u(a),r=new Error;o.l(d,(c=>{if(o.o(e,a)&&(0!==(t=e[a])&&(e[a]=void 0),t)){var f=c&&("load"===c.type?"missing":c.type),d=c&&c.target&&c.target.src;r.message="Loading chunk "+a+" failed.\n("+f+": "+d+")",r.name="ChunkLoadError",r.type=f,r.request=d,t[1](r)}}),"chunk-"+a,a)}},o.O.j=a=>0===e[a];var a=(a,c)=>{var t,f,d=c[0],r=c[1],b=c[2],n=0;if(d.some((a=>0!==e[a]))){for(t in r)o.o(r,t)&&(o.m[t]=r[t]);if(b)var i=b(o)}for(a&&a(c);n<d.length;n++)f=d[n],o.o(e,f)&&e[f]&&e[f][0](),e[f]=0;return o.O(i)},c=self.webpackChunkmy_website=self.webpackChunkmy_website||[];c.forEach(a.bind(null,0)),c.push=a.bind(null,c.push.bind(c))})(),o.nc=void 0})();