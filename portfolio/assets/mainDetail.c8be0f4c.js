/* empty css               */import{S as n,P as o,W as e,a as i,A as t,T as s,c as a,b as r,M as d,d as c}from"./vendor.96f9f1dc.js";const w=new n,l=new o(75,window.innerWidth/window.innerHeight,.1,1e3),p=new e({canvas:document.querySelector("#bg")});p.setPixelRatio(window.devicePixelRatio),p.setSize(window.innerWidth,window.innerHeight),l.position.setZ(30),l.position.setX(-3),p.render(w,l);const f=new i(0);f.position.set(5,5,5);const m=new t(0);w.add(f,m),Array(500).fill().forEach((function(){const n=new a(.25,24,12),o=new r({color:16777215}),e=new d(n,o),[i,t,s]=Array(3).fill().map((()=>c.randFloatSpread(150)));e.position.set(i,t,s),w.add(e)}));const u=(new s).load("../images/bg.jpg");function g(){const n=document.body.getBoundingClientRect().top;l.position.z=-.01*n,l.position.x=-2e-6*n,l.rotation.y=-2e-6*n}w.background=u,document.body.onscroll=g,g(),function n(){requestAnimationFrame(n),p.render(w,l)}();