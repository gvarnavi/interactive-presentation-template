"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4812],{34812:(e,n,t)=>{t.r(n),t.d(n,{dockerFile:()=>p});var r=t(44125),o="from",l=new RegExp("^(\\s*)\\b("+o+")\\b","i"),s=["run","cmd","entrypoint","shell"],x=new RegExp("^(\\s*)("+s.join("|")+")(\\s+\\[)","i"),g="expose",k=new RegExp("^(\\s*)("+g+")(\\s+)","i"),u="("+[o,g].concat(s).concat(["arg","from","maintainer","label","env","add","copy","volume","user","workdir","onbuild","stopsignal","healthcheck","shell"]).join("|")+")",a=new RegExp("^(\\s*)"+u+"(\\s*)(#.*)?$","i"),i=new RegExp("^(\\s*)"+u+"(\\s+)","i");const p=(0,r.simpleMode)({start:[{regex:/^\s*#.*$/,sol:!0,token:"comment"},{regex:l,token:[null,"keyword"],sol:!0,next:"from"},{regex:a,token:[null,"keyword",null,"error"],sol:!0},{regex:x,token:[null,"keyword",null],sol:!0,next:"array"},{regex:k,token:[null,"keyword",null],sol:!0,next:"expose"},{regex:i,token:[null,"keyword",null],sol:!0,next:"arguments"},{regex:/./,token:null}],from:[{regex:/\s*$/,token:null,next:"start"},{regex:/(\s*)(#.*)$/,token:[null,"error"],next:"start"},{regex:/(\s*\S+\s+)(as)/i,token:[null,"keyword"],next:"start"},{token:null,next:"start"}],single:[{regex:/(?:[^\\']|\\.)/,token:"string"},{regex:/'/,token:"string",pop:!0}],double:[{regex:/(?:[^\\"]|\\.)/,token:"string"},{regex:/"/,token:"string",pop:!0}],array:[{regex:/\]/,token:null,next:"start"},{regex:/"(?:[^\\"]|\\.)*"?/,token:"string"}],expose:[{regex:/\d+$/,token:"number",next:"start"},{regex:/[^\d]+$/,token:null,next:"start"},{regex:/\d+/,token:"number"},{regex:/[^\d]+/,token:null},{token:null,next:"start"}],arguments:[{regex:/^\s*#.*$/,sol:!0,token:"comment"},{regex:/"(?:[^\\"]|\\.)*"?$/,token:"string",next:"start"},{regex:/"/,token:"string",push:"double"},{regex:/'(?:[^\\']|\\.)*'?$/,token:"string",next:"start"},{regex:/'/,token:"string",push:"single"},{regex:/[^#"']+[\\`]$/,token:null},{regex:/[^#"']+$/,token:null,next:"start"},{regex:/[^#"']+/,token:null},{token:null,next:"start"}],languageData:{commentTokens:{line:"#"}}})}}]);