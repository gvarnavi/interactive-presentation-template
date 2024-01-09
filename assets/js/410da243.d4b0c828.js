"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5987],{18621:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var a=n(85893),r=n(11151),o=n(74866),s=n(85162),i=n(91994);const l={id:"outline",sidebar_position:1,title:"Pyodide Kernels",hide_table_of_contents:!0,hide_title:!0},c="Pyodide web worker kernels",u={id:"outline",title:"Pyodide Kernels",description:"Markdown preformatted code blocks with the python language identifier are automatically converted",source:"@site/slides/outline.mdx",sourceDirName:".",slug:"/outline",permalink:"/interactive-presentation-template/slides/outline",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"outline",sidebar_position:1,title:"Pyodide Kernels",hide_table_of_contents:!0,hide_title:!0},sidebar:"tutorialSidebar",next:{title:"Jupyterlab Cells",permalink:"/interactive-presentation-template/slides/jupyterlab"}},d={},p=[];function m(e){const t={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,r.useMDXComponents)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"pyodide-web-worker-kernels",children:"Pyodide web worker kernels"}),"\n",(0,a.jsxs)(o.default,{Lazy:!0,children:[(0,a.jsxs)(s.default,{value:"python",label:"Python code",default:!0,children:[(0,a.jsxs)(t.p,{children:["Markdown preformatted code blocks with the ",(0,a.jsx)(t.code,{children:"python"})," language identifier are automatically converted\nto runnable and editable code blocks thanks to ",(0,a.jsx)(t.a,{href:"https://github.com/elilambnz/react-py",children:"react-py"}),"."]}),(0,a.jsx)(t.p,{children:"For example, in a Markdown docs file:"}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:'```python\nimport numpy as np\n\nprint("Hello, World!")\nprint(np.arange(10))\n```\n'})}),(0,a.jsx)(t.p,{children:"Becomes:"}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:'import numpy as np\n\nprint("Hello, World!")\nprint(np.arange(10))\n'})}),(0,a.jsx)(t.p,{children:"We have included numpy in our default install configuration, but if you want any additional\npackages you can specify them using a comma-separated list, per code-block:"}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:'```python packages="scipy python-cowsay"\nfrom scipy import special\nfrom cowsay import cowsay\n\nnum = 27\nres = special.cbrt(num)\nmessage = f"The cube root of {num} is {res}"\nprint(cowsay(message))\n```\n'})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",metastring:'packages="scipy python-cowsay"',children:'from scipy import special\nfrom cowsay import cowsay\n\nnum = 27\nres = special.cbrt(num)\nmessage = f"The cube root of {num} is {res}"\nprint(cowsay(message))\n'})})]}),(0,a.jsxs)(s.default,{value:"matplotlib",label:"Matplotlib output",children:[(0,a.jsxs)(t.p,{children:["You'll notice the examples before used ",(0,a.jsx)(t.code,{children:"print()"})," statements to pipe outputs to stdout.\nThis works reasonably well, but is restricted to textual outputs."]}),(0,a.jsx)(i.default,{metastring:'packages="matplotlib"',code:"import os\nimport base64\nfrom io import BytesIO\n\n# Set this _before_ importing matplotlib\nos.environ['MPLBACKEND'] = 'AGG'\n\nimport matplotlib.pyplot as plt\n\n# Patch\ndef ensure_matplotlib_patch():\n  _old_show = plt.show\n\n  def show():\n    buf = BytesIO()\n    plt.savefig(buf, format='png')\n    buf.seek(0)\n\t\n    # Encode to a base64 str\n    img = \"<MatplotlibOutput>\"\n    img += 'data:image/png;base64,'\n    img += base64.b64encode(buf.read()).decode('utf-8')\n    img += \"</MatplotlibOutput>\"\n    # Write to stdout\n    print(img)\n    plt.clf()\n\n  plt.show = show\n\nensure_matplotlib_patch()\n\n# Plot\nfig, ax = plt.subplots()\nax.plot([1,3,2])\nplt.show()"}),(0,a.jsxs)(t.p,{children:["Above, we patch matplotlib's ",(0,a.jsx)(t.code,{children:"show()"})," function to encode figures as a base64 png str to stdout,\nwhich we catch and render as an image using the ",(0,a.jsx)(t.code,{children:"MatplotlibCodeEditor"})," component."]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"<MatplotlibCodeEditor\nmetastring='packages=\"matplotlib\"' \ncode={`import os...`}\n/>\n"})})]}),(0,a.jsxs)(s.default,{value:"jsx",label:"Javascript markup",children:[(0,a.jsxs)(t.p,{children:["Markdown preformatted code blocks with the ",(0,a.jsx)(t.code,{children:"jsx live"})," language identifier are\nautomatically converted to runnable and editable code blocks thanks\nto ",(0,a.jsx)(t.a,{href:"https://docusaurus.io/docs/markdown-features/code-blocks#interactive-code-editor",children:"@docusaurus/theme-live-codeblock"}),"."]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:'```jsx live\nfunction ReptileListItems() {\n  const reptiles = ["alligator", "snake", "lizard"];\n  return reptiles.map((reptile) => <li key={reptile}>{reptile}</li>);\n}\n```\n'})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-jsx",metastring:"live",live:!0,children:'function ReptileListItems() {\n  const reptiles = ["alligator", "snake", "lizard"];\n  return reptiles.map((reptile) => <li key={reptile}>{reptile}</li>);\n}\n'})})]})]})]})}function h(e={}){const{wrapper:t}={...(0,r.useMDXComponents)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}},85162:(e,t,n)=>{n.r(t),n.d(t,{default:()=>s});n(67294);var a=n(90512);const r={tabItem:"tabItem_Ymn6"};var o=n(85893);function s(e){let{children:t,hidden:n,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,a.default)(r.tabItem,s),hidden:n,children:t})}},74866:(e,t,n)=>{n.r(t),n.d(t,{default:()=>w});var a=n(67294),r=n(90512),o=n(12466),s=n(65262),i=n(20469),l=n(91980),c=n(67392),u=n(50012);function d(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}(n);return function(e){const t=(0,c.duplicates)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.useHistory)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l.useQueryStringValue)(o),(0,a.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(r.location.search);t.set(o,e),r.replace({...r.location,search:t.toString()})}),[o,r])]}function b(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,o=p(e),[s,l]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:o}))),[c,d]=h({queryString:n,groupId:r}),[b,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,o]=(0,u.useStorageSlot)(n);return[r,(0,a.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:r}),g=(()=>{const e=c??b;return m({value:e,tabValues:o})?e:null})();(0,i.default)((()=>{g&&l(g)}),[g]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),f(e)}),[d,f,o]),tabValues:o}}var f=n(72389);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var y=n(85893);function x(e){let{className:t,block:n,selectedValue:a,selectValue:s,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.useScrollPositionBlocker)(),u=e=>{const t=e.currentTarget,n=l.indexOf(t),r=i[n].value;r!==a&&(c(t),s(r))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=l.indexOf(e.currentTarget)+1;t=l[n]??l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=l[n]??l[l.length-1];break}}t?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.default)("tabs",{"tabs--block":n},t),children:i.map((e=>{let{value:t,label:n,attributes:o}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>l.push(e),onKeyDown:d,onClick:u,...o,className:(0,r.default)("tabs__item",g.tabItem,o?.className,{"tabs__item--active":a===t}),children:n??t},t)}))})}function v(e){let{lazy:t,children:n,selectedValue:r}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function j(e){const t=b(e);return(0,y.jsxs)("div",{className:(0,r.default)("tabs-container",g.tabList),children:[(0,y.jsx)(x,{...e,...t}),(0,y.jsx)(v,{...e,...t})]})}function w(e){const t=(0,f.default)();return(0,y.jsx)(j,{...e,children:d(e.children)},String(t))}},91994:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var a=n(67294),r=n(91262),o=n(72389),s=n(92949),i=n(45081),l=n(85893);const c={enableBasicAutocompletion:!1,enableLiveAutocompletion:!1,highlightActiveLine:!1,showPrintMargin:!1,showGutter:!1};function u(e,t,n){let a=e.commands.byName[t];a.bindKeyOriginal||(a.bindKeyOriginal=a.bindKey),a.bindKey=n?a.bindKeyOriginal:null,e.commands.addCommand(a)}const d=e=>{e.renderer.setScrollMargin(10,10,0,0),e.renderer.setPadding(16),e.moveCursorTo(0,0),u(e,"indent",!1),u(e,"outdent",!1),e.commands.on("afterExec",(t=>{"disable-indent"!==t.command.name&&(u(e,"indent",!0),u(e,"outdent",!0))})),e.on("click",(t=>{u(e,"indent",!0),u(e,"outdent",!0)})),e.on("blur",(t=>{u(e,"indent",!1),u(e,"outdent",!1)})),e.commands.addCommand({name:"disable-indent",bindKey:{win:"esc",mac:"esc"},exec:e=>{u(e,"indent",!1),u(e,"outdent",!1)}})},p=()=>!!navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)/i)||navigator.userAgent.includes("Mac")&&"ontouchend"in document;function m(e){let t;if("metastring"in e){t={official:[],micropip:e.metastring.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g,"").split(" ")}}const[u,m]=(0,a.useState)(e.code.trimEnd()),[h,b]=(0,a.useState)(!1),[f,g]=(0,a.useState)(!1),[y,x]=(0,a.useState)(!1);(0,a.useEffect)((()=>{m(e.code.trimEnd()),b(!1)}),[e.code]);const{runPython:v,stdout:j,stderr:w,isLoading:k,isRunning:C,interruptExecution:_}=(0,i.usePython)({packages:t}),{colorMode:N}=(0,s.useColorMode)(),S=(0,o.default)();let E=null;function I(){b(!1),m(e.code.trimEnd())}function M(){return b(!0),v(u)}function P(){b(!1),_()}function V(){const e=[];if(j){const t=j.split(/<MatplotlibOutput>(.*?)<\/MatplotlibOutput>/g).map((e=>e.trim()));for(let n=0;n<t.length;n++)t[n].startsWith("data:image/png;base64,")?e.push((0,l.jsxs)("div",{children:[" ",(0,l.jsx)("img",{src:t[n]})," "]})):e.push((0,l.jsxs)("div",{children:[" ",(0,l.jsxs)("pre",{children:[" ",t[n]," "]})," "]}))}return(0,l.jsxs)("div",{className:"relative mb-10 flex flex-col",children:[e,(0,l.jsx)("pre",{style:{color:"var(--text-code-error)"},children:w})]})}S&&(E=n(74981).default,n(4007),n(22777),n(33783),n(82679));const T=(0,l.jsx)("pre",{style:{margin:0,padding:"0.55rem"},children:u});return(0,l.jsx)(r.default,{fallback:T,children:()=>(0,l.jsxs)("div",{className:"code-editor",onMouseLeave:()=>{g(!1),x(!1)},children:[(0,l.jsxs)("div",{className:"code-editor-window",style:h?{borderRadius:".25em .25em 0 0"}:{},children:[(0,l.jsx)(E,{value:u,mode:"python",name:"CodeBlock",fontSize:"var(--ifm-code-font-size)",theme:"dark"===N?"idle_fingers":"textmate",onChange:(e,t)=>m(e),width:"100%",maxLines:1/0,style:{backgroundColor:"rgba(0, 0, 0, 0)"},onLoad:d,editorProps:{$blockScrolling:!0},setOptions:c}),(0,l.jsx)("div",{className:"button-container",style:e.showButtons||p()||f||y?{opacity:100}:{},children:k?(0,l.jsx)("span",{children:"Loading..."}):(0,l.jsxs)(l.Fragment,{children:[C?(0,l.jsx)("button",{className:"icon-button",disabled:k||!C,onClick:P,onFocus:()=>g(!0),onBlur:()=>g(!1),"aria-label":"Stop Code",title:"Stop Code",children:(0,l.jsx)("span",{className:"icon lsf-icon",title:"stop"})}):(0,l.jsx)("button",{className:"icon-button",disabled:k||C,onClick:M,onFocus:()=>g(!0),onBlur:()=>g(!1),"aria-label":"Run Code",title:"Run Code",children:(0,l.jsx)("span",{className:"icon lsf-icon",title:"play"})}),(0,l.jsx)("button",{className:"icon-button",onClick:I,onFocus:()=>x(!0),onBlur:()=>x(!1),"aria-label":"Reset Code Window",title:"Reset Code Window",children:(0,l.jsx)("span",{className:"icon lsf-icon",title:"refresh"})})]})})]}),h&&V()]})})}}}]);