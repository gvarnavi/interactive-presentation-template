"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2675],{2675:(e,t,n)=>{n.r(t),n.d(t,{brainfuck:()=>o});var m="><+-.,[]".split("");const o={name:"brainfuck",startState:function(){return{commentLine:!1,left:0,right:0,commentLoop:!1}},token:function(e,t){if(e.eatSpace())return null;e.sol()&&(t.commentLine=!1);var n=e.next().toString();return-1===m.indexOf(n)?(t.commentLine=!0,e.eol()&&(t.commentLine=!1),"comment"):!0===t.commentLine?(e.eol()&&(t.commentLine=!1),"comment"):"]"===n||"["===n?("["===n?t.left++:t.right++,"bracket"):"+"===n||"-"===n?"keyword":"<"===n||">"===n?"atom":"."===n||","===n?"def":void(e.eol()&&(t.commentLine=!1))}}}}]);