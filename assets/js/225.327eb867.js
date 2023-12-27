(()=>{"use strict";var e,t,n={8225:(e,t,n)=>{n.r(t);var r,o=n(4375),i=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{l(r.next(e))}catch(t){i(t)}}function a(e){try{l(r.throw(e))}catch(t){i(t)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))},s=function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,r=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(l){a=[6,l],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}},a=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},l=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s};importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"),"localhost"!==self.location.hostname&&(console.log=function(){},console.error=function(){});var c={getInput:function(e,t){var n=new XMLHttpRequest;return n.open("GET","/react-py-get-input/?id=".concat(e,"&prompt=").concat(t),!1),n.send(null),n.responseText}},u={init:function(e,t,n){return i(this,void 0,void 0,(function(){var o,i,a,l,u,p,d,f,y,h;return s(this,(function(s){switch(s.label){case 0:return o=self,[4,self.loadPyodide({})];case 1:return o.pyodide=s.sent(),[4,self.pyodide.loadPackage(["pyodide-http"])];case 2:return s.sent(),n[0].length>0?[4,self.pyodide.loadPackage(n[0])]:[3,4];case 3:s.sent(),s.label=4;case 4:return n[1].length>0?[4,self.pyodide.loadPackage(["micropip"])]:[3,7];case 5:return s.sent(),[4,self.pyodide.pyimport("micropip").install(n[1])];case 6:s.sent(),s.label=7;case 7:return i=self.crypto.randomUUID(),a=self.pyodide.version,self.pyodide.registerJsModule("react_py",c),l=self.pyodide.globals.get("dict")(),'\nimport pyodide_http\npyodide_http.patch_all()\n\nimport sys\nfrom pyodide.ffi import to_js\nfrom pyodide.console import PyodideConsole, repr_shorten, BANNER\nimport __main__\nBANNER = "Welcome to the Pyodide terminal emulator \ud83d\udc0d\\n" + BANNER\npyconsole = PyodideConsole(__main__.__dict__)\nimport builtins\nasync def await_fut(fut):\n  res = await fut\n  if res is not None:\n    builtins._ = res\n  return to_js([res], depth=1)\ndef clear_console():\n  pyconsole.buffer = []\n',[4,self.pyodide.runPythonAsync('\nimport pyodide_http\npyodide_http.patch_all()\n\nimport sys\nfrom pyodide.ffi import to_js\nfrom pyodide.console import PyodideConsole, repr_shorten, BANNER\nimport __main__\nBANNER = "Welcome to the Pyodide terminal emulator \ud83d\udc0d\\n" + BANNER\npyconsole = PyodideConsole(__main__.__dict__)\nimport builtins\nasync def await_fut(fut):\n  res = await fut\n  if res is not None:\n    builtins._ = res\n  return to_js([res], depth=1)\ndef clear_console():\n  pyconsole.buffer = []\n',{globals:l})];case 8:return s.sent(),u='\nimport sys, builtins\nimport react_py\n__prompt_str__ = ""\ndef get_input(prompt=""):\n    global __prompt_str__\n    __prompt_str__ = prompt\n    print(prompt, end="")\n    s = react_py.getInput("'.concat(i,'", prompt)\n    print()\n    return s\nbuiltins.input = get_input\nsys.stdin.readline = lambda: react_py.getInput("').concat(i,'", __prompt_str__)\n'),[4,self.pyodide.runPythonAsync(u,{globals:l})];case 9:return s.sent(),p=l.get("repr_shorten"),d=l.get("BANNER"),f=l.get("await_fut"),y=l.get("pyconsole"),h=l.get("clear_console"),l.destroy(),y.stdout_callback=e,r={reprShorten:p,awaitFut:f,pyconsole:y,clearConsole:h},t({id:i,version:a,banner:d}),[2]}}))}))},run:function(e){return i(this,void 0,void 0,(function(){var t,n,o,i,c,u,p,d,f,y,h,_,m;return s(this,(function(s){switch(s.label){case 0:if(!r)throw new Error("Console has not been initialised");if(void 0===e)throw new Error("No code to push");s.label=1;case 1:s.trys.push([1,9,10,11]),n=a(e.split("\n")),o=n.next(),s.label=2;case 2:if(o.done)return[3,8];i=o.value,c=r.pyconsole.push(i),t=c.syntax_check,u=r.awaitFut(c),s.label=3;case 3:return s.trys.push([3,5,6,7]),[4,u];case 4:return p=l.apply(void 0,[s.sent(),1]),d=p[0],self.pyodide.isPyProxy(d)&&d.destroy(),[3,7];case 5:if("PythonError"===(f=s.sent()).constructor.name)return y=c.formatted_error||f.message,[2,{state:t,error:y.trimEnd()}];throw f;case 6:return c.destroy(),u.destroy(),[7];case 7:return o=n.next(),[3,2];case 8:return[3,11];case 9:return h=s.sent(),_={error:h},[3,11];case 10:try{o&&!o.done&&(m=n.return)&&m.call(n)}finally{if(_)throw _.error}return[7];case 11:return[2,{state:t}]}}))}))},readFile:function(e){return self.pyodide.FS.readFile(e,{encoding:"utf8"})},writeFile:function(e,t){return self.pyodide.FS.writeFile(e,t,{encoding:"utf8"})},mkdir:function(e){self.pyodide.FS.mkdir(e)},rmdir:function(e){self.pyodide.FS.rmdir(e)}};(0,o.expose)(u)}},r={};function o(e){var t=r[e];if(void 0!==t)return t.exports;var i=r[e]={id:e,loaded:!1,exports:{}};return n[e].call(i.exports,i,i.exports,o),i.loaded=!0,i.exports}o.m=n,o.x=()=>{var e=o.O(void 0,[592],(()=>o(8225)));return e=o.O(e)},o.amdD=function(){throw new Error("define cannot be used indirect")},e=[],o.O=(t,n,r,i)=>{if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],r=e[u][1],i=e[u][2];for(var a=!0,l=0;l<n.length;l++)(!1&i||s>=i)&&Object.keys(o.O).every((e=>o.O[e](n[l])))?n.splice(l--,1):(a=!1,i<s&&(s=i));if(a){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,r,i]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,n)=>(o.f[n](e,t),t)),[])),o.u=e=>"assets/js/common.dfe05c8c.js",o.miniCssF=e=>{},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),o.p="/interactive-presentation-template/",o.gca=function(e){return e={}[e]||e,o.p+o.u(e)},(()=>{var e={225:1};o.f.i=(t,n)=>{e[t]||importScripts(o.p+o.u(t))};var t=self.webpackChunkmy_website=self.webpackChunkmy_website||[],n=t.push.bind(t);t.push=t=>{var r=t[0],i=t[1],s=t[2];for(var a in i)o.o(i,a)&&(o.m[a]=i[a]);for(s&&s(o);r.length;)e[r.pop()]=1;n(t)}})(),t=o.x,o.x=()=>o.e(592).then(t);o.x()})();