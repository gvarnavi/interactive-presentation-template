(()=>{"use strict";var t,e,i={80841:(t,e,i)=>{i.r(e);var s=i(54375);const a=new class{constructor(){this._options=null,this._initializer=null,this._localPath="",this._driveName="",this._initialized=new Promise(((t,e)=>{this._initializer={resolve:t,reject:e}}))}async initialize(t){var e;if(this._options=t,t.location.includes(":")){const e=t.location.split(":");this._driveName=e[0],this._localPath=e[1]}else this._driveName="",this._localPath=t.location;await this.initRuntime(t),await this.initPackageManager(t),await this.initKernel(t),await this.initGlobals(t),null===(e=this._initializer)||void 0===e||e.resolve()}async initRuntime(t){const{pyodideUrl:e,indexUrl:i}=t;if(e.endsWith(".mjs")){const t=await import(e);this._pyodide=await t.loadPyodide({indexURL:i})}else importScripts(e),this._pyodide=await self.loadPyodide({indexURL:i})}async initPackageManager(t){if(!this._options)throw new Error("Uninitialized");const{pipliteWheelUrl:e,disablePyPIFallback:i,pipliteUrls:s}=this._options;await this._pyodide.loadPackage(["micropip"]),await this._pyodide.runPythonAsync(`\n      import micropip\n      await micropip.install('${e}', keep_going=True)\n      import piplite.piplite\n      piplite.piplite._PIPLITE_DISABLE_PYPI = ${i?"True":"False"}\n      piplite.piplite._PIPLITE_URLS = ${JSON.stringify(s)}\n    `)}async initKernel(t){await this._pyodide.runPythonAsync("\n      await piplite.install(['matplotlib', 'ipykernel'], keep_going=True);\n      await piplite.install(['pyolite'], keep_going=True);\n      await piplite.install(['ipython'], keep_going=True);\n      import pyolite\n    "),t.mountDrive&&this._localPath&&await this._pyodide.runPythonAsync(`\n        import os;\n        os.chdir("${this._localPath}");\n      `)}async initGlobals(t){const{globals:e}=this._pyodide;this._kernel=e.get("pyolite").kernel_instance.copy(),this._stdout_stream=e.get("pyolite").stdout_stream.copy(),this._stderr_stream=e.get("pyolite").stderr_stream.copy(),this._interpreter=this._kernel.interpreter.copy(),this._interpreter.send_comm=this.sendComm.bind(this)}mapToObject(t){const e=t instanceof Array?[]:{};return t.forEach(((t,i)=>{e[i]=t instanceof Map||t instanceof Array?this.mapToObject(t):t})),e}formatResult(t){if(!this._pyodide.isPyProxy(t))return t;const e=t.toJs();return this.mapToObject(e)}async setup(t){await this._initialized,this._kernel._parent_header=this._pyodide.toPy(t)}async execute(t,e){await this.setup(e);const i=(t,e,i)=>{const s={ename:t,evalue:e,traceback:i};postMessage({parentHeader:this.formatResult(this._kernel._parent_header).header,bundle:s,type:"execute_error"})},s=(t,e)=>{const i={name:this.formatResult(t),text:this.formatResult(e)};postMessage({parentHeader:this.formatResult(this._kernel._parent_header).header,bundle:i,type:"stream"})};this._stdout_stream.publish_stream_callback=s,this._stderr_stream.publish_stream_callback=s,this._interpreter.display_pub.clear_output_callback=t=>{const e={wait:this.formatResult(t)};postMessage({parentHeader:this.formatResult(this._kernel._parent_header).header,bundle:e,type:"clear_output"})},this._interpreter.display_pub.display_data_callback=(t,e,i)=>{const s={data:this.formatResult(t),metadata:this.formatResult(e),transient:this.formatResult(i)};postMessage({parentHeader:this.formatResult(this._kernel._parent_header).header,bundle:s,type:"display_data"})},this._interpreter.display_pub.update_display_data_callback=(t,e,i)=>{const s={data:this.formatResult(t),metadata:this.formatResult(e),transient:this.formatResult(i)};postMessage({parentHeader:this.formatResult(this._kernel._parent_header).header,bundle:s,type:"update_display_data"})},this._interpreter.displayhook.publish_execution_result=(t,e,i)=>{const s={execution_count:t,data:this.formatResult(e),metadata:this.formatResult(i)};postMessage({parentHeader:this.formatResult(this._kernel._parent_header).header,bundle:s,type:"execute_result"})},this._interpreter.input=this.input.bind(this),this._interpreter.getpass=this.getpass.bind(this);const a=await this._kernel.run(t.code),r=this.formatResult(a);return"error"===r.status&&i(r.ename,r.evalue,r.traceback),r}async complete(t,e){await this.setup(e);const i=this._kernel.complete(t.code,t.cursor_pos);return this.formatResult(i)}async inspect(t,e){await this.setup(e);const i=this._kernel.inspect(t.code,t.cursor_pos,t.detail_level);return this.formatResult(i)}async isComplete(t,e){await this.setup(e);const i=this._kernel.is_complete(t.code);return this.formatResult(i)}async commInfo(t,e){await this.setup(e);const i=this._kernel.comm_info(t.target_name);return{comms:this.formatResult(i),status:"ok"}}async commOpen(t,e){await this.setup(e);const i=this._kernel.comm_manager.comm_open(this._pyodide.toPy(t));return this.formatResult(i)}async commMsg(t,e){await this.setup(e);const i=this._kernel.comm_manager.comm_msg(this._pyodide.toPy(t));return this.formatResult(i)}async commClose(t,e){await this.setup(e);const i=this._kernel.comm_manager.comm_close(this._pyodide.toPy(t));return this.formatResult(i)}async inputReply(t,e){await this.setup(e),this._resolveInputReply(t)}async sendInputRequest(t,e){const i={prompt:t,password:e};postMessage({type:"input_request",parentHeader:this.formatResult(this._kernel._parent_header).header,content:i})}async getpass(t){t=void 0===t?"":t,await this.sendInputRequest(t,!0);const e=new Promise((t=>{this._resolveInputReply=t}));return(await e).value}async input(t){t=void 0===t?"":t,await this.sendInputRequest(t,!1);const e=new Promise((t=>{this._resolveInputReply=t}));return(await e).value}async sendComm(t,e,i,s,a){postMessage({type:t,content:this.formatResult(e),metadata:this.formatResult(i),ident:this.formatResult(s),buffers:this.formatResult(a),parentHeader:this.formatResult(this._kernel._parent_header).header})}};(0,s.expose)(a)}},s={};function a(t){var e=s[t];if(void 0!==e)return e.exports;var r=s[t]={id:t,loaded:!1,exports:{}};return i[t].call(r.exports,r,r.exports,a),r.loaded=!0,r.exports}a.m=i,a.x=()=>{var t=a.O(void 0,[8592],(()=>a(80841)));return t=a.O(t)},a.amdD=function(){throw new Error("define cannot be used indirect")},t=[],a.O=(e,i,s,r)=>{if(!i){var n=1/0;for(h=0;h<t.length;h++){i=t[h][0],s=t[h][1],r=t[h][2];for(var o=!0,l=0;l<i.length;l++)(!1&r||n>=r)&&Object.keys(a.O).every((t=>a.O[t](i[l])))?i.splice(l--,1):(o=!1,r<n&&(n=r));if(o){t.splice(h--,1);var p=s();void 0!==p&&(e=p)}}return e}r=r||0;for(var h=t.length;h>0&&t[h-1][2]>r;h--)t[h]=t[h-1];t[h]=[i,s,r]},a.d=(t,e)=>{for(var i in e)a.o(e,i)&&!a.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},a.f={},a.e=t=>Promise.all(Object.keys(a.f).reduce(((e,i)=>(a.f[i](t,e),e)),[])),a.u=t=>"assets/js/common.ab831136.js",a.miniCssF=t=>{},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),a.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),a.p="/interactive-presentation-template/",a.gca=function(t){return t={}[t]||t,a.p+a.u(t)},(()=>{var t={841:1};a.f.i=(e,i)=>{t[e]||importScripts(a.p+a.u(e))};var e=self.webpackChunkmy_website=self.webpackChunkmy_website||[],i=e.push.bind(e);e.push=e=>{var s=e[0],r=e[1],n=e[2];for(var o in r)a.o(r,o)&&(a.m[o]=r[o]);for(n&&n(a);s.length;)t[s.pop()]=1;i(e)}})(),e=a.x,a.x=()=>a.e(8592).then(e);a.x()})();