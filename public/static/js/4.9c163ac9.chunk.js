(this["webpackJsonprouter-example"]=this["webpackJsonprouter-example"]||[]).push([[4],{611:function(e,t,a){"use strict";a.r(t);var n=a(6),r=a(46),c=a(0),l=a.n(c),u=a(609),i=a(583),o=a.n(i),m=a(61),d=a.n(m),s=(a(93),a(584),a(608)),f=s.a,p="#ff0000",h="#25bafa",E="#c2b527",y=function(e){var t=e.chartData,a=e.width;return"bar"===e.chartType?l.a.createElement(l.a.Fragment,null,l.a.createElement(u.b,{width:a,height:300,data:t,margin:{top:5,right:20,bottom:5,left:0}},l.a.createElement(u.e,{type:"monotone",dataKey:"uv",stroke:"#8884d8"}),l.a.createElement(u.c,{stroke:"#ccc",strokeDasharray:"5 5"}),l.a.createElement(u.h,{dataKey:"City"}),l.a.createElement(u.i,null),l.a.createElement(u.g,null),l.a.createElement(u.d,null),l.a.createElement(u.a,{dataKey:"Dead",fill:p}),l.a.createElement(u.a,{dataKey:"Cured",fill:h}),l.a.createElement(u.a,{dataKey:"Infected",fill:E})),l.a.createElement("br",null)):l.a.createElement(l.a.Fragment,null,l.a.createElement(u.f,{data:t,width:a,height:300},l.a.createElement(u.e,{type:"monotone",dataKey:"Dead",stroke:p}),l.a.createElement(u.e,{type:"monotone",dataKey:"Cured",stroke:h}),l.a.createElement(u.e,{type:"monotone",dataKey:"Infected",stroke:E}),l.a.createElement(u.c,{stroke:"#ccc",strokeDasharray:"5 5"}),l.a.createElement(u.h,{dataKey:"City"}),l.a.createElement(u.i,null),l.a.createElement(u.g,null),l.a.createElement(u.d,null)),l.a.createElement("br",null))};y.defaultProps={chartData:[],width:600,chartType:"line"};var b=Object(c.memo)(y),v=function(e){var t=e.chartData,a=e.width,n=e.size,c=e.chartType;return t.reduce?t.reduce((function(e,t,a,c){return a%n?e:[].concat(Object(r.a)(e),[c.slice(a,a+n)])}),[]).map((function(e,t){return l.a.createElement(b,{key:e[0].City,chartType:c,chartData:e,width:a})})):null};v.defaultProps={chartData:[],width:600,size:10,chartType:"line"};var C=Object(c.memo)(v);t.default=Object(c.memo)((function(e){var t=Object(c.useState)(0),a=Object(n.a)(t,2),r=a[0],u=a[1],i=Object(c.useState)(null),m=Object(n.a)(i,2),s=m[0],p=m[1],h=Object(c.useState)(0),E=Object(n.a)(h,2),y=E[0],b=E[1],v=Object(c.useRef)(),g=f(),j=g.ref,D=g.width,O=void 0===D?1:D,k=d()({url:window.location.origin.includes("localhost")?"http://localhost:4000/api":window.location.origin+"/api",retries:3},[]),w=k.data,K=k.loading,T=Object(c.useState)("bar"),S=Object(n.a)(T,2),Y=S[0],N=S[1],I=Object(c.useState)(""),x=Object(n.a)(I,2),F=x[0],H=x[1],M=Object(c.useState)([]),z=Object(n.a)(M,2),A=z[0],J=z[1];var P=Object(c.useCallback)((function(e){if(v.current)return v.current.reduce((function(t,a){return t+a[e]}),0)}),[v]);return Object(c.useEffect)((function(){if(!s&&!K&&w){var e=w.results.map((function(e){return e.updateTime})).sort((function(e,t){return e.updateTime<t.updateTime}))[0],t=o()(e).format("DD/MM-YYYY HH:mm"),a=function(e){var t=e.results.reduce((function(e,t){var a=e[t.countryEnglishName||t.countryName];return a?(a.Dead+=t.deadCount,a.Cured+=t.curedCount,a.Infected+=t.confirmedCount):e[t.countryEnglishName||t.countryName]={City:t.countryEnglishName||t.countryName,Dead:t.deadCount,Cured:t.curedCount,Infected:t.confirmedCount},e}),{});return Object.values(t).sort((function(e,t){return String(e.City).localeCompare(String(t.City))}))}(w);b(t),v.current=a,p(a),u(Date.now()),J(a.map((function(e){return e.City}))),H(a[0].City)}}),[s,w,K]),l.a.createElement("div",{className:"fetch-div",ref:j},l.a.createElement("p",null,"Data kommer fra: ",l.a.createElement("a",{href:"https://ncov.dxy.cn"},"https://ncov.dxy.cn")," ","via ",l.a.createElement("a",{href:"https://lab.isaaclin.cn/"},"https://lab.isaaclin.cn/")),!K&&l.a.createElement(l.a.Fragment,null,l.a.createElement("p",null,"Data er opdateret: ",y," lokal tid"),l.a.createElement("p",null,"Data blev hentet: ",o()(r).format("DD/MM-YYYY HH:mm")),l.a.createElement("p",null,"Antal inficerede p\xe5 verdensplan: ",P("Infected")),l.a.createElement("p",null,"Antal kurerede p\xe5 verdensplan: ",P("Cured")),l.a.createElement("p",null,"Antal d\xf8de p\xe5 verdensplan: ",P("Dead"))),l.a.createElement("select",{onChange:function(e){H(e.target.value)},value:F},A.map((function(e,t){return l.a.createElement("option",{key:"country-option"+t,value:e},e)}))),l.a.createElement("button",{onClick:function(){!function(e){if(s){var t=s.filter((function(t){return t.City!==e}));p(t)}}(F)}},"Fjern det valge land fra graf")," ",l.a.createElement("button",{onClick:function(){return p(v.current)}},"Gendan original graf")," ",l.a.createElement("button",{onClick:function(){N("line"===Y?"bar":"line")}},"line"===Y?"Vis som s\xf8jlediagram":"Vis graf"),!K&&s&&l.a.createElement(C,{chartData:s,chartType:Y,width:O,size:O<600?3:10}))}))}}]);
//# sourceMappingURL=4.9c163ac9.chunk.js.map