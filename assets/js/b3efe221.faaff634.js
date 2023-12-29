(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9918],{50867:(e,t,r)=>{"use strict";r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>y,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var n=r(85893),s=r(11151),l=(r(67294),r(91262));const a=e=>{const{token:t,serverHttpUrl:s,serverWsUrl:a,source:i}=e;return(0,n.jsx)(l.default,{fallback:(0,n.jsx)("div",{children:"Jupyter Cell fallback content for prerendering."}),children:()=>{const{Jupyter:e}=r(61094),{Cell:l}=r(78731);return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(e,{jupyterToken:t,jupyterServerHttpUrl:s,jupyterServerWsUrl:a,disableCssLoading:!0,useRunningKernelIndex:-1,startDefaultKernel:!0,terminals:!1,lite:!1,children:(0,n.jsx)(l,{source:i})})})}})},i={id:"jupyterlab",sidebar_position:2,title:"Jupyterlab Cells",hide_table_of_contents:!0,hide_title:!0},p="Jupyterlab cells",o={id:"jupyterlab",title:"Jupyterlab Cells",description:"We can also use the jupyter-react library to connect and interact with a Jupyter server.",source:"@site/slides/jupyterlab.mdx",sourceDirName:".",slug:"/jupyterlab",permalink:"/interactive-presentation-template/slides/jupyterlab",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"jupyterlab",sidebar_position:2,title:"Jupyterlab Cells",hide_table_of_contents:!0,hide_title:!0},sidebar:"tutorialSidebar",previous:{title:"Pyodide Kernels",permalink:"/interactive-presentation-template/slides/outline"}},c={},u=[];function d(e){const t={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,s.useMDXComponents)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"jupyterlab-cells",children:"Jupyterlab cells"}),"\n",(0,n.jsxs)(t.p,{children:["We can also use the ",(0,n.jsx)(t.a,{href:"https://jupyter-ui.datalayer.tech/",children:"jupyter-react"})," library to connect and interact with a Jupyter server."]}),"\n",(0,n.jsx)(a,{source:"import numpy as np\nimport matplotlib.pyplot as plt\nx1 = np.linspace(0.0, 5.0)\nx2 = np.linspace(0.0, 2.0)\ny1 = np.cos(2 * np.pi * x1) * np.exp(-x1)\ny2 = np.cos(2 * np.pi * x2)\nfig, (ax1, ax2) = plt.subplots(2, 1)\nfig.suptitle('A tale of 2 subplots')\nax1.plot(x1, y1, 'o-')\nax1.set_ylabel('Damped oscillation')\nax2.plot(x2, y2, '.-')\nax2.set_xlabel('time (s)')\nax2.set_ylabel('Undamped')\nplt.show()",serverHttpUrl:"https://oss.datalayer.tech/api/jupyter",serverWsUrl:"wss://oss.datalayer.tech/api/jupyter",token:"60c1661cc408f978c309d04157af55c9588ff9557c9380e4fb50785750703da6"}),"\n",(0,n.jsx)(t.p,{children:"Here, we're connecting to a remotely-hosted Jupyter server by datalayer, but we can also point this to a local Jupyter server, e.g. using:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"<JupyterCell\n  source= {`import numpy as np...`}\n  serverHttpUrl='http://localhost:8686/api/jupyter'\n  serverWsUrl='ws://localhost:8686/api/jupyter'\n  token='60c1661cc408f978c309d04157af55c9588ff9557c9380e4fb50785750703da6'\n/>\n"})})]})}function y(e={}){const{wrapper:t}={...(0,s.useMDXComponents)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},21549:()=>{},22868:()=>{},14777:()=>{},99830:()=>{},70209:()=>{},87414:()=>{}}]);