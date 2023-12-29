"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4111],{44111:(e,t,n)=>{n.r(t),n.d(t,{default:()=>s});var o=n(77003),r=n(73054),i=n(65657);const a="@datalayer/jupyterlite-ipykernel-extension:kernel",s=[{id:a,autoStart:!0,requires:[i.IKernelSpecs,r.IServiceWorkerRegistrationWrapper],activate:(e,t,r)=>{const i=o.PageConfig.getBaseUrl(),s=JSON.parse(o.PageConfig.getOption("litePluginSettings")||"{}")[a]||{},u=s.pyodideUrl||"https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js",l=o.URLExt.parse(u).href,c=(s.pipliteUrls||[]).map((e=>o.URLExt.parse(e).href)),d=!!s.disablePyPIFallback;t.register({spec:{name:"python",display_name:"Python (Pyodide)",language:"python",argv:[],resources:{"logo-32x32":"TODO","logo-64x64":o.URLExt.join(i,"/kernelspecs/python.png")}},create:async e=>{const{PyoliteKernel:t}=await Promise.all([n.e(8592),n.e(5312),n.e(1445)]).then(n.bind(n,65312));return new t({...e,pyodideUrl:l,pipliteUrls:c,disablePyPIFallback:d,mountDrive:r.enabled})}})}}]},73615:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ActivityMonitor=void 0;const o=n(4016);t.ActivityMonitor=class{constructor(e){this._timer=-1,this._timeout=-1,this._isDisposed=!1,this._activityStopped=new o.Signal(this),e.signal.connect(this._onSignalFired,this),this._timeout=e.timeout||1e3}get activityStopped(){return this._activityStopped}get timeout(){return this._timeout}set timeout(e){this._timeout=e}get isDisposed(){return this._isDisposed}dispose(){this._isDisposed||(this._isDisposed=!0,o.Signal.clearData(this))}_onSignalFired(e,t){clearTimeout(this._timer),this._sender=e,this._args=t,this._timer=setTimeout((()=>{this._activityStopped.emit({sender:this._sender,args:this._args})}),this._timeout)}}},77003:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||o(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),r(n(73615),t),r(n(48195),t),r(n(52664),t),r(n(80335),t),r(n(39971),t),r(n(88589),t),r(n(98842),t),r(n(58726),t)},48195:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},52664:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownCodeBlocks=void 0,function(e){e.CODE_BLOCK_MARKER="```";const t=[".markdown",".mdown",".mkdn",".md",".mkd",".mdwn",".mdtxt",".mdtext",".text",".txt",".Rmd"];class n{constructor(e){this.startLine=e,this.code="",this.endLine=-1}}e.MarkdownCodeBlock=n,e.isMarkdown=function(e){return t.indexOf(e)>-1},e.findMarkdownCodeBlocks=function(t){if(!t||""===t)return[];const o=t.split("\n"),r=[];let i=null;for(let a=0;a<o.length;a++){const t=o[a],s=0===t.indexOf(e.CODE_BLOCK_MARKER),u=null!=i;if(s||u)if(u)i&&(s?(i.endLine=a-1,r.push(i),i=null):i.code+=t+"\n");else{i=new n(a);const o=t.indexOf(e.CODE_BLOCK_MARKER),s=t.lastIndexOf(e.CODE_BLOCK_MARKER);o!==s&&(i.code=t.substring(o+e.CODE_BLOCK_MARKER.length,s),i.endLine=a,r.push(i),i=null)}}return r}}(t.MarkdownCodeBlocks||(t.MarkdownCodeBlocks={}))},80335:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.PageConfig=void 0;const coreutils_1=__webpack_require__(95082),minimist_1=__importDefault(__webpack_require__(96562)),url_1=__webpack_require__(58726);var PageConfig;(function(PageConfig){function getOption(name){if(configData)return configData[name]||getBodyData(name);configData=Object.create(null);let found=!1;if("undefined"!=typeof document&&document){const e=document.getElementById("jupyter-config-data");e&&(configData=JSON.parse(e.textContent||""),found=!0)}if(!found&&"undefined"!=typeof process&&process.argv)try{const cli=(0,minimist_1.default)(process.argv.slice(2)),path=__webpack_require__(26470);let fullPath="";"jupyter-config-data"in cli?fullPath=path.resolve(cli["jupyter-config-data"]):"JUPYTER_CONFIG_DATA"in process.env&&(fullPath=path.resolve(process.env.JUPYTER_CONFIG_DATA)),fullPath&&(configData=eval("require")(fullPath))}catch(e){console.error(e)}if(coreutils_1.JSONExt.isObject(configData))for(const t in configData)"string"!=typeof configData[t]&&(configData[t]=JSON.stringify(configData[t]));else configData=Object.create(null);return configData[name]||getBodyData(name)}function setOption(e,t){const n=getOption(e);return configData[e]=t,n}function getBaseUrl(){return url_1.URLExt.normalize(getOption("baseUrl")||"/")}function getTreeUrl(){return url_1.URLExt.join(getBaseUrl(),getOption("treeUrl"))}function getShareUrl(){return url_1.URLExt.normalize(getOption("shareUrl")||getBaseUrl())}function getTreeShareUrl(){return url_1.URLExt.normalize(url_1.URLExt.join(getShareUrl(),getOption("treeUrl")))}function getUrl(e){var t,n,o,r;let i=e.toShare?getShareUrl():getBaseUrl();const a=null!==(t=e.mode)&&void 0!==t?t:getOption("mode"),s=null!==(n=e.workspace)&&void 0!==n?n:getOption("workspace"),u="single-document"===a?"doc":"lab";i=url_1.URLExt.join(i,u),s!==PageConfig.defaultWorkspace&&(i=url_1.URLExt.join(i,"workspaces",encodeURIComponent(null!==(o=getOption("workspace"))&&void 0!==o?o:PageConfig.defaultWorkspace)));const l=null!==(r=e.treePath)&&void 0!==r?r:getOption("treePath");return l&&(i=url_1.URLExt.join(i,"tree",url_1.URLExt.encodeParts(l))),i}function getWsUrl(e){let t=getOption("wsUrl");if(!t){if(0!==(e=e?url_1.URLExt.normalize(e):getBaseUrl()).indexOf("http"))return"";t="ws"+e.slice(4)}return url_1.URLExt.normalize(t)}function getNBConvertURL({path:e,format:t,download:n}){const o=url_1.URLExt.encodeParts(e),r=url_1.URLExt.join(getBaseUrl(),"nbconvert",t,o);return n?r+"?download=true":r}function getToken(){return getOption("token")||getBodyData("jupyterApiToken")}function getNotebookVersion(){const e=getOption("notebookVersion");return""===e?[0,0,0]:JSON.parse(e)}PageConfig.getOption=getOption,PageConfig.setOption=setOption,PageConfig.getBaseUrl=getBaseUrl,PageConfig.getTreeUrl=getTreeUrl,PageConfig.getShareUrl=getShareUrl,PageConfig.getTreeShareUrl=getTreeShareUrl,PageConfig.getUrl=getUrl,PageConfig.defaultWorkspace="default",PageConfig.getWsUrl=getWsUrl,PageConfig.getNBConvertURL=getNBConvertURL,PageConfig.getToken=getToken,PageConfig.getNotebookVersion=getNotebookVersion;let configData=null,Extension;function getBodyData(e){if("undefined"==typeof document||!document.body)return"";const t=document.body.dataset[e];return void 0===t?"":decodeURIComponent(t)}!function(e){function t(e){try{const t=getOption(e);if(t)return JSON.parse(t)}catch(t){console.warn(`Unable to parse ${e}.`,t)}return[]}e.deferred=t("deferredExtensions"),e.disabled=t("disabledExtensions"),e.isDeferred=function(t){const n=t.indexOf(":");let o="";return-1!==n&&(o=t.slice(0,n)),e.deferred.some((e=>e===t||o&&e===o))},e.isDisabled=function(t){const n=t.indexOf(":");let o="";return-1!==n&&(o=t.slice(0,n)),e.disabled.some((e=>e===t||o&&e===o))}}(Extension=PageConfig.Extension||(PageConfig.Extension={}))})(PageConfig=exports.PageConfig||(exports.PageConfig={}))},39971:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PathExt=void 0;const o=n(26470);!function(e){function t(e){return 0===e.indexOf("/")&&(e=e.slice(1)),e}e.join=function(...e){const n=o.posix.join(...e);return"."===n?"":t(n)},e.basename=function(e,t){return o.posix.basename(e,t)},e.dirname=function(e){const n=t(o.posix.dirname(e));return"."===n?"":n},e.extname=function(e){return o.posix.extname(e)},e.normalize=function(e){return""===e?"":t(o.posix.normalize(e))},e.resolve=function(...e){return t(o.posix.resolve(...e))},e.relative=function(e,n){return t(o.posix.relative(e,n))},e.normalizeExtension=function(e){return e.length>0&&0!==e.indexOf(".")&&(e=`.${e}`),e},e.removeSlash=t}(t.PathExt||(t.PathExt={}))},88589:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Text=void 0,function(e){e.jsIndexToCharIndex=function(e,t){return e},e.charIndexToJsIndex=function(e,t){return e},e.camelCase=function(e,t=!1){return e.replace(/^(\w)|[\s-_:]+(\w)/g,(function(e,n,o){return o?o.toUpperCase():t?n.toUpperCase():n.toLowerCase()}))},e.titleCase=function(e){return(e||"").toLowerCase().split(" ").map((e=>e.charAt(0).toUpperCase()+e.slice(1))).join(" ")}}(t.Text||(t.Text={}))},98842:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Time=void 0;const r=o(n(30381));!function(e){e.formatHuman=function(e){r.default.locale(document.documentElement.lang);let t=(0,r.default)(e).fromNow();return t="a few seconds ago"===t?"seconds ago":t,t},e.format=function(e,t="YYYY-MM-DD HH:mm"){return(0,r.default)(e).format(t)}}(t.Time||(t.Time={}))},58726:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.URLExt=void 0;const r=n(26470),i=o(n(84564));!function(e){function t(e){if("undefined"!=typeof document&&document){const t=document.createElement("a");return t.href=e,t}return(0,i.default)(e)}function n(...e){let t=(0,i.default)(e[0],{});const n=""===t.protocol&&t.slashes;n&&(t=(0,i.default)(e[0],"https:"+e[0]));const o=`${n?"":t.protocol}${t.slashes?"//":""}${t.auth}${t.auth?"@":""}${t.host}`,a=r.posix.join(`${o&&"/"!==t.pathname[0]?"/":""}${t.pathname}`,...e.slice(1));return`${o}${"."===a?"":a}`}e.parse=t,e.getHostName=function(e){return(0,i.default)(e).hostname},e.normalize=function(e){return e&&t(e).toString()},e.join=n,e.encodeParts=function(e){return n(...e.split("/").map(encodeURIComponent))},e.objectToQueryString=function(e){const t=Object.keys(e).filter((e=>e.length>0));return t.length?"?"+t.map((t=>{const n=encodeURIComponent(String(e[t]));return t+(n?"="+n:"")})).join("&"):""},e.queryStringToObject=function(e){return e.replace(/^\?/,"").split("&").reduce(((e,t)=>{const[n,o]=t.split("=");return n.length>0&&(e[n]=decodeURIComponent(o||"")),e}),{})},e.isLocal=function(e){const{protocol:n}=t(e);return(!n||0!==e.toLowerCase().indexOf(n))&&0!==e.indexOf("/")}}(t.URLExt||(t.URLExt={}))}}]);