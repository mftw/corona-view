(this["webpackJsonprouter-example"]=this["webpackJsonprouter-example"]||[]).push([[4],{581:function(e,t,a){"use strict";a.r(t);var n=a(7),r=a(40),c=a(0),l=a.n(c),u=a(580),i=a(549),o=a.n(i),m=a(354),d=a.n(m),f=(a(78),a(555),a(579)),s=f.a,p="#ff0000",E="#25bafa",h="#c2b527",y=function(e){var t=e.chartData,a=e.width;return"bar"===e.chartType?l.a.createElement(l.a.Fragment,null,l.a.createElement(u.b,{width:a,height:300,data:t,margin:{top:5,right:20,bottom:5,left:0}},l.a.createElement(u.e,{type:"monotone",dataKey:"uv",stroke:"#8884d8"}),l.a.createElement(u.c,{stroke:"#ccc",strokeDasharray:"5 5"}),l.a.createElement(u.h,{dataKey:"City"}),l.a.createElement(u.i,null),l.a.createElement(u.g,null),l.a.createElement(u.d,null),l.a.createElement(u.a,{dataKey:"Dead",fill:p}),l.a.createElement(u.a,{dataKey:"Cured",fill:E}),l.a.createElement(u.a,{dataKey:"Infected",fill:h})),l.a.createElement("br",null)):l.a.createElement(l.a.Fragment,null,l.a.createElement(u.f,{data:t,width:a,height:300},l.a.createElement(u.e,{type:"monotone",dataKey:"Dead",stroke:p}),l.a.createElement(u.e,{type:"monotone",dataKey:"Cured",stroke:E}),l.a.createElement(u.e,{type:"monotone",dataKey:"Infected",stroke:h}),l.a.createElement(u.c,{stroke:"#ccc",strokeDasharray:"5 5"}),l.a.createElement(u.h,{dataKey:"City"}),l.a.createElement(u.i,null),l.a.createElement(u.g,null),l.a.createElement(u.d,null)),l.a.createElement("br",null))};y.defaultProps={chartData:[],width:600,chartType:"line"};var b=Object(c.memo)(y),C=function(e){var t=e.chartData,a=e.width,n=e.size,c=e.chartType;return t.reduce((function(e,t,a,c){return a%n?e:[].concat(Object(r.a)(e),[c.slice(a,a+n)])}),[]).map((function(e,t){return l.a.createElement(b,{key:e[0].City,chartType:c,chartData:e,width:a})}))};C.defaultProps={chartData:[],width:600,size:10,chartType:"line"};var v=Object(c.memo)(C);t.default=function(e){var t=Object(c.useState)(0),a=Object(n.a)(t,2),r=a[0],u=a[1],i=Object(c.useState)(null),m=Object(n.a)(i,2),f=m[0],p=m[1],E=Object(c.useRef)(),h=Object(c.useState)(0),y=Object(n.a)(h,2),b=y[0],C=y[1],g=s(),j=g.ref,D=g.width,k=void 0===D?1:D,O=d()({url:window.location.href+"api",retries:3},[]),w=O.data,K=O.loading,S=Object(c.useState)("bar"),Y=Object(n.a)(S,2),N=Y[0],T=Y[1],I=Object(c.useState)(""),F=Object(n.a)(I,2),H=F[0],M=F[1],z=Object(c.useState)([]),A=Object(n.a)(z,2),x=A[0],J=A[1];var P=Object(c.useCallback)((function(e){if(E.current)return E.current.reduce((function(t,a){return t+a[e]}),0)}),[E]);return Object(c.useEffect)((function(){if(!f&&!K&&w){var e=w.results[0].updateTime,t=o()(e).format("DD/MM-YYYY HH:mm"),a=function(e){var t=e.results.reduce((function(e,t){var a=e[t.countryEnglishName||t.countryName];return a?(a.Dead+=t.deadCount,a.Cured+=t.curedCount,a.Infected+=t.confirmedCount):e[t.countryEnglishName||t.countryName]={City:t.countryEnglishName||t.countryName,Dead:t.deadCount,Cured:t.curedCount,Infected:t.confirmedCount},e}),{});return Object.values(t).sort((function(e,t){return String(e.City).localeCompare(String(t.City))}))}(w);C(t),E.current=a,p(a),u(Date.now()),J(a.map((function(e){return e.City}))),M(a[0].City)}}),[f,w,K]),l.a.createElement("div",{className:"fetch-div",ref:j},l.a.createElement("p",null,"Data kommer fra: https://lab.isaaclin.cn/"),!K&&l.a.createElement(l.a.Fragment,null,l.a.createElement("p",null,"Data er opdateret: ",b," lokal tid"),l.a.createElement("p",null,"Data blev hentet: ",o()(r).format("DD/MM-YYYY HH:mm")),l.a.createElement("p",null,"Antal inficerede p\xe5 verdensplan: ",P("Infected")),l.a.createElement("p",null,"Antal kurerede p\xe5 verdensplan: ",P("Cured")),l.a.createElement("p",null,"Antal d\xf8de p\xe5 verdensplan: ",P("Dead"))),l.a.createElement("select",{onChange:function(e){M(e.target.value)},value:H},x.map((function(e,t){return l.a.createElement("option",{key:"country-option"+t,value:e},e)}))),l.a.createElement("button",{onClick:function(){!function(e){if(f){var t=f.filter((function(t){return t.City!==e}));p(t)}}(H)}},"Fjern det valge land fra graf")," ",l.a.createElement("button",{onClick:function(){return p(E.current)}},"Gendan original graf")," ",l.a.createElement("button",{onClick:function(){T("line"===N?"bar":"line")}},"line"===N?"Vis som s\xf8jlediagram":"Vis graf"),!K&&f&&l.a.createElement(v,{chartData:f,chartType:N,width:k,size:10}))}}}]);
//# sourceMappingURL=4.96468518.chunk.js.map