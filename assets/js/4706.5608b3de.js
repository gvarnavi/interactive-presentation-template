"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4706],{72486:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ActivityMonitor=void 0;const r=n(76674);t.ActivityMonitor=class{constructor(e){this._timer=-1,this._timeout=-1,this._isDisposed=!1,this._activityStopped=new r.Signal(this),e.signal.connect(this._onSignalFired,this),this._timeout=e.timeout||1e3}get activityStopped(){return this._activityStopped}get timeout(){return this._timeout}set timeout(e){this._timeout=e}get isDisposed(){return this._isDisposed}dispose(){this._isDisposed||(this._isDisposed=!0,r.Signal.clearData(this))}_onSignalFired(e,t){clearTimeout(this._timer),this._sender=e,this._args=t,this._timer=setTimeout((()=>{this._activityStopped.emit({sender:this._sender,args:this._args})}),this._timeout)}}},25323:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(72486),t),o(n(13769),t),o(n(19142),t),o(n(57889),t),o(n(85463),t),o(n(60944),t),o(n(63601),t),o(n(44031),t)},13769:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},19142:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MarkdownCodeBlocks=void 0,function(e){e.CODE_BLOCK_MARKER="```";const t=[".markdown",".mdown",".mkdn",".md",".mkd",".mdwn",".mdtxt",".mdtext",".text",".txt",".Rmd"];class n{constructor(e){this.startLine=e,this.code="",this.endLine=-1}}e.MarkdownCodeBlock=n,e.isMarkdown=function(e){return t.indexOf(e)>-1},e.findMarkdownCodeBlocks=function(t){if(!t||""===t)return[];const r=t.split("\n"),o=[];let i=null;for(let s=0;s<r.length;s++){const t=r[s],u=0===t.indexOf(e.CODE_BLOCK_MARKER),a=null!=i;if(u||a)if(a)i&&(u?(i.endLine=s-1,o.push(i),i=null):i.code+=t+"\n");else{i=new n(s);const r=t.indexOf(e.CODE_BLOCK_MARKER),u=t.lastIndexOf(e.CODE_BLOCK_MARKER);r!==u&&(i.code=t.substring(r+e.CODE_BLOCK_MARKER.length,u),i.endLine=s,o.push(i),i=null)}}return o}}(t.MarkdownCodeBlocks||(t.MarkdownCodeBlocks={}))},57889:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.PageConfig=void 0;const coreutils_1=__webpack_require__(95082),minimist_1=__importDefault(__webpack_require__(96562)),url_1=__webpack_require__(44031);var PageConfig;(function(PageConfig){function getOption(name){if(configData)return configData[name]||getBodyData(name);configData=Object.create(null);let found=!1;if("undefined"!=typeof document&&document){const e=document.getElementById("jupyter-config-data");e&&(configData=JSON.parse(e.textContent||""),found=!0)}if(!found&&"undefined"!=typeof process&&process.argv)try{const cli=(0,minimist_1.default)(process.argv.slice(2)),path=__webpack_require__(26470);let fullPath="";"jupyter-config-data"in cli?fullPath=path.resolve(cli["jupyter-config-data"]):"JUPYTER_CONFIG_DATA"in process.env&&(fullPath=path.resolve(process.env.JUPYTER_CONFIG_DATA)),fullPath&&(configData=eval("require")(fullPath))}catch(e){console.error(e)}if(coreutils_1.JSONExt.isObject(configData))for(const t in configData)"string"!=typeof configData[t]&&(configData[t]=JSON.stringify(configData[t]));else configData=Object.create(null);return configData[name]||getBodyData(name)}function setOption(e,t){const n=getOption(e);return configData[e]=t,n}function getBaseUrl(){return url_1.URLExt.normalize(getOption("baseUrl")||"/")}function getTreeUrl(){return url_1.URLExt.join(getBaseUrl(),getOption("treeUrl"))}function getShareUrl(){return url_1.URLExt.normalize(getOption("shareUrl")||getBaseUrl())}function getTreeShareUrl(){return url_1.URLExt.normalize(url_1.URLExt.join(getShareUrl(),getOption("treeUrl")))}function getUrl(e){var t,n,r,o;let i=e.toShare?getShareUrl():getBaseUrl();const s=null!==(t=e.mode)&&void 0!==t?t:getOption("mode"),u=null!==(n=e.workspace)&&void 0!==n?n:getOption("workspace"),a="single-document"===s?"doc":"lab";i=url_1.URLExt.join(i,a),u!==PageConfig.defaultWorkspace&&(i=url_1.URLExt.join(i,"workspaces",encodeURIComponent(null!==(r=getOption("workspace"))&&void 0!==r?r:PageConfig.defaultWorkspace)));const l=null!==(o=e.treePath)&&void 0!==o?o:getOption("treePath");return l&&(i=url_1.URLExt.join(i,"tree",url_1.URLExt.encodeParts(l))),i}function getWsUrl(e){let t=getOption("wsUrl");if(!t){if(0!==(e=e?url_1.URLExt.normalize(e):getBaseUrl()).indexOf("http"))return"";t="ws"+e.slice(4)}return url_1.URLExt.normalize(t)}function getNBConvertURL({path:e,format:t,download:n}){const r=url_1.URLExt.encodeParts(e),o=url_1.URLExt.join(getBaseUrl(),"nbconvert",t,r);return n?o+"?download=true":o}function getToken(){return getOption("token")||getBodyData("jupyterApiToken")}function getNotebookVersion(){const e=getOption("notebookVersion");return""===e?[0,0,0]:JSON.parse(e)}PageConfig.getOption=getOption,PageConfig.setOption=setOption,PageConfig.getBaseUrl=getBaseUrl,PageConfig.getTreeUrl=getTreeUrl,PageConfig.getShareUrl=getShareUrl,PageConfig.getTreeShareUrl=getTreeShareUrl,PageConfig.getUrl=getUrl,PageConfig.defaultWorkspace="default",PageConfig.getWsUrl=getWsUrl,PageConfig.getNBConvertURL=getNBConvertURL,PageConfig.getToken=getToken,PageConfig.getNotebookVersion=getNotebookVersion;let configData=null,Extension;function getBodyData(e){if("undefined"==typeof document||!document.body)return"";const t=document.body.dataset[e];return void 0===t?"":decodeURIComponent(t)}!function(e){function t(e){try{const t=getOption(e);if(t)return JSON.parse(t)}catch(t){console.warn(`Unable to parse ${e}.`,t)}return[]}e.deferred=t("deferredExtensions"),e.disabled=t("disabledExtensions"),e.isDeferred=function(t){const n=t.indexOf(":");let r="";return-1!==n&&(r=t.slice(0,n)),e.deferred.some((e=>e===t||r&&e===r))},e.isDisabled=function(t){const n=t.indexOf(":");let r="";return-1!==n&&(r=t.slice(0,n)),e.disabled.some((e=>e===t||r&&e===r))}}(Extension=PageConfig.Extension||(PageConfig.Extension={}))})(PageConfig=exports.PageConfig||(exports.PageConfig={}))},85463:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PathExt=void 0;const r=n(26470);!function(e){function t(e){return 0===e.indexOf("/")&&(e=e.slice(1)),e}e.join=function(...e){const n=r.posix.join(...e);return"."===n?"":t(n)},e.basename=function(e,t){return r.posix.basename(e,t)},e.dirname=function(e){const n=t(r.posix.dirname(e));return"."===n?"":n},e.extname=function(e){return r.posix.extname(e)},e.normalize=function(e){return""===e?"":t(r.posix.normalize(e))},e.resolve=function(...e){return t(r.posix.resolve(...e))},e.relative=function(e,n){return t(r.posix.relative(e,n))},e.normalizeExtension=function(e){return e.length>0&&0!==e.indexOf(".")&&(e=`.${e}`),e},e.removeSlash=t}(t.PathExt||(t.PathExt={}))},60944:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Text=void 0,function(e){e.jsIndexToCharIndex=function(e,t){return e},e.charIndexToJsIndex=function(e,t){return e},e.camelCase=function(e,t=!1){return e.replace(/^(\w)|[\s-_:]+(\w)/g,(function(e,n,r){return r?r.toUpperCase():t?n.toUpperCase():n.toLowerCase()}))},e.titleCase=function(e){return(e||"").toLowerCase().split(" ").map((e=>e.charAt(0).toUpperCase()+e.slice(1))).join(" ")}}(t.Text||(t.Text={}))},63601:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Time=void 0;const o=r(n(30381));!function(e){e.formatHuman=function(e){o.default.locale(document.documentElement.lang);let t=(0,o.default)(e).fromNow();return t="a few seconds ago"===t?"seconds ago":t,t},e.format=function(e,t="YYYY-MM-DD HH:mm"){return(0,o.default)(e).format(t)}}(t.Time||(t.Time={}))},44031:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.URLExt=void 0;const o=n(26470),i=r(n(84564));!function(e){function t(e){if("undefined"!=typeof document&&document){const t=document.createElement("a");return t.href=e,t}return(0,i.default)(e)}function n(...e){let t=(0,i.default)(e[0],{});const n=""===t.protocol&&t.slashes;n&&(t=(0,i.default)(e[0],"https:"+e[0]));const r=`${n?"":t.protocol}${t.slashes?"//":""}${t.auth}${t.auth?"@":""}${t.host}`,s=o.posix.join(`${r&&"/"!==t.pathname[0]?"/":""}${t.pathname}`,...e.slice(1));return`${r}${"."===s?"":s}`}e.parse=t,e.getHostName=function(e){return(0,i.default)(e).hostname},e.normalize=function(e){return e&&t(e).toString()},e.join=n,e.encodeParts=function(e){return n(...e.split("/").map(encodeURIComponent))},e.objectToQueryString=function(e){const t=Object.keys(e).filter((e=>e.length>0));return t.length?"?"+t.map((t=>{const n=encodeURIComponent(String(e[t]));return t+(n?"="+n:"")})).join("&"):""},e.queryStringToObject=function(e){return e.replace(/^\?/,"").split("&").reduce(((e,t)=>{const[n,r]=t.split("=");return n.length>0&&(e[n]=decodeURIComponent(r||"")),e}),{})},e.isLocal=function(e){const{protocol:n}=t(e);return(!n||0!==e.toLowerCase().indexOf(n))&&0!==e.indexOf("/")}}(t.URLExt||(t.URLExt={}))},80581:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.supportedKernelWebSocketProtocols=t.isInputReplyMsg=t.isInputRequestMsg=t.isDebugReplyMsg=t.isDebugRequestMsg=t.isExecuteReplyMsg=t.isInfoRequestMsg=t.isCommMsgMsg=t.isCommCloseMsg=t.isCommOpenMsg=t.isDebugEventMsg=t.isClearOutputMsg=t.isStatusMsg=t.isErrorMsg=t.isExecuteResultMsg=t.isExecuteInputMsg=t.isUpdateDisplayDataMsg=t.isDisplayDataMsg=t.isStreamMsg=t.createMessage=void 0;const r=n(95082);t.createMessage=function(e){var t,n,o,i,s;return{buffers:null!==(t=e.buffers)&&void 0!==t?t:[],channel:e.channel,content:e.content,header:{date:(new Date).toISOString(),msg_id:null!==(n=e.msgId)&&void 0!==n?n:r.UUID.uuid4(),msg_type:e.msgType,session:e.session,username:null!==(o=e.username)&&void 0!==o?o:"",version:"5.2"},metadata:null!==(i=e.metadata)&&void 0!==i?i:{},parent_header:null!==(s=e.parentHeader)&&void 0!==s?s:{}}},t.isStreamMsg=function(e){return"stream"===e.header.msg_type},t.isDisplayDataMsg=function(e){return"display_data"===e.header.msg_type},t.isUpdateDisplayDataMsg=function(e){return"update_display_data"===e.header.msg_type},t.isExecuteInputMsg=function(e){return"execute_input"===e.header.msg_type},t.isExecuteResultMsg=function(e){return"execute_result"===e.header.msg_type},t.isErrorMsg=function(e){return"error"===e.header.msg_type},t.isStatusMsg=function(e){return"status"===e.header.msg_type},t.isClearOutputMsg=function(e){return"clear_output"===e.header.msg_type},t.isDebugEventMsg=function(e){return"debug_event"===e.header.msg_type},t.isCommOpenMsg=function(e){return"comm_open"===e.header.msg_type},t.isCommCloseMsg=function(e){return"comm_close"===e.header.msg_type},t.isCommMsgMsg=function(e){return"comm_msg"===e.header.msg_type},t.isInfoRequestMsg=function(e){return"kernel_info_request"===e.header.msg_type},t.isExecuteReplyMsg=function(e){return"execute_reply"===e.header.msg_type},t.isDebugRequestMsg=function(e){return"debug_request"===e.header.msg_type},t.isDebugReplyMsg=function(e){return"debug_reply"===e.header.msg_type},t.isInputRequestMsg=function(e){return"input_request"===e.header.msg_type},t.isInputReplyMsg=function(e){return"input_reply"===e.header.msg_type},function(e){e.v1KernelWebsocketJupyterOrg="v1.kernel.websocket.jupyter.org"}(t.supportedKernelWebSocketProtocols||(t.supportedKernelWebSocketProtocols={}))},19075:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.deserialize=t.serialize=void 0;const s=i(n(80581));var u;t.serialize=function(e,t=""){return t===s.supportedKernelWebSocketProtocols.v1KernelWebsocketJupyterOrg?u.serializeV1KernelWebsocketJupyterOrg(e):u.serializeDefault(e)},t.deserialize=function(e,t=""){return t===s.supportedKernelWebSocketProtocols.v1KernelWebsocketJupyterOrg?u.deserializeV1KernelWebsocketJupyterOrg(e):u.deserializeDefault(e)},function(e){e.deserializeV1KernelWebsocketJupyterOrg=function(e){let t;const n=new DataView(e),r=Number(n.getBigUint64(0,!0));let o=[];for(let g=0;g<r;g++)o.push(Number(n.getBigUint64(8*(g+1),!0)));const i=new TextDecoder("utf8"),s=i.decode(e.slice(o[0],o[1])),u=JSON.parse(i.decode(e.slice(o[1],o[2]))),a=JSON.parse(i.decode(e.slice(o[2],o[3]))),l=JSON.parse(i.decode(e.slice(o[3],o[4]))),c=JSON.parse(i.decode(e.slice(o[4],o[5])));let f=[];for(let g=5;g<o.length;g++)g==o.length-1?f.push(e.slice(o[g])):f.push(e.slice(o[g],o[g+1]));return t={channel:s,header:u,parent_header:a,metadata:l,content:c,buffers:f},t},e.serializeV1KernelWebsocketJupyterOrg=function(e){const t=JSON.stringify(e.header),n=null==e.parent_header?"{}":JSON.stringify(e.parent_header),r=JSON.stringify(e.metadata),o=JSON.stringify(e.content),i=void 0!==e.buffers?e.buffers:[],s=5+i.length+1;let u=[];u.push(8*(1+s)),u.push(e.channel.length+u[u.length-1]);const a=new TextEncoder,l=a.encode(e.channel),c=a.encode(t),f=a.encode(n),g=a.encode(r),d=a.encode(o),p=new Uint8Array(l.length+c.length+f.length+g.length+d.length);p.set(l),p.set(c,l.length),p.set(f,l.length+c.length),p.set(g,l.length+c.length+f.length),p.set(d,l.length+c.length+f.length+g.length);for(let b of[c.length,f.length,g.length,d.length])u.push(b+u[u.length-1]);let h=0;for(let b of i){let e=b.byteLength;u.push(e+u[u.length-1]),h+=e}const _=new Uint8Array(8*(1+s)+p.byteLength+h),m=new ArrayBuffer(8),y=new DataView(m);y.setBigUint64(0,BigInt(s),!0),_.set(new Uint8Array(m),0);for(let b=0;b<u.length;b++)y.setBigUint64(0,BigInt(u[b]),!0),_.set(new Uint8Array(m),8*(b+1));_.set(p,u[0]);for(let b=0;b<i.length;b++){const e=i[b];_.set(new Uint8Array(ArrayBuffer.isView(e)?e.buffer:e),u[5+b])}return _.buffer},e.deserializeDefault=function(e){let t;return t="string"==typeof e?JSON.parse(e):function(e){const t=new DataView(e),n=t.getUint32(0),r=[];if(n<2)throw new Error("Invalid incoming Kernel Message");for(let s=1;s<=n;s++)r.push(t.getUint32(4*s));const o=new Uint8Array(e.slice(r[0],r[1])),i=JSON.parse(new TextDecoder("utf8").decode(o));i.buffers=[];for(let s=1;s<n;s++){const t=r[s],n=r[s+1]||e.byteLength;i.buffers.push(new DataView(e.slice(t,n)))}return i}(e),t},e.serializeDefault=function(e){var t;let n;return n=(null===(t=e.buffers)||void 0===t?void 0:t.length)?function(e){const t=[],n=[],r=new TextEncoder;let o=[];void 0!==e.buffers&&(o=e.buffers,delete e.buffers);const i=r.encode(JSON.stringify(e));n.push(i.buffer);for(let l=0;l<o.length;l++){const e=o[l];n.push(ArrayBuffer.isView(e)?e.buffer:e)}const s=n.length;t.push(4*(s+1));for(let l=0;l+1<n.length;l++)t.push(t[t.length-1]+n[l].byteLength);const u=new Uint8Array(t[t.length-1]+n[n.length-1].byteLength),a=new DataView(u.buffer);a.setUint32(0,s);for(let l=0;l<t.length;l++)a.setUint32(4*(l+1),t[l]);for(let l=0;l<n.length;l++)u.set(new Uint8Array(n[l]),t[l]);return u.buffer}(e):JSON.stringify(e),n}}(u||(u={}))}}]);