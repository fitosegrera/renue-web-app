import{S as u,i as f,s as _,N as b,e as m,c as $,a as p,d as i,b as o,f as c,O as k,P as x,Q as A,x as d,u as h,k as E,n as S,U as v,A as V,a7 as I,j as g,m as j,o as w,v as y}from"../chunks/vendor-0f86114f.js";import{_ as N}from"../chunks/preload-helper-ec9aa979.js";function P(r){let e,a;const t=r[1].default,s=b(t,r,r[0],null);return{c(){e=m("main"),s&&s.c(),this.h()},l(n){e=$(n,"MAIN",{id:!0,class:!0});var l=p(e);s&&s.l(l),l.forEach(i),this.h()},h(){o(e,"id","main-container"),o(e,"class","w-full gradient-blue-to-green-light-vertical svelte-fx0rbu")},m(n,l){c(n,e,l),s&&s.m(e,null),a=!0},p(n,[l]){s&&s.p&&(!a||l&1)&&k(s,t,n,n[0],a?A(t,n[0],l,null):x(n[0]),null)},i(n){a||(d(s,n),a=!0)},o(n){h(s,n),a=!1},d(n){n&&i(e),s&&s.d(n)}}}function T(r,e,a){let{$$slots:t={},$$scope:s}=e;return r.$$set=n=>{"$$scope"in n&&a(0,s=n.$$scope)},[s,t]}class C extends u{constructor(e){super();f(this,e,T,P,_,{})}}function D(r){let e,a,t;return{c(){e=m("canvas"),a=E(),t=m("div"),this.h()},l(s){e=$(s,"CANVAS",{}),p(e).forEach(i),a=S(s),t=$(s,"DIV",{id:!0,class:!0}),p(t).forEach(i),this.h()},h(){o(t,"id","loader"),o(t,"class","flex w-full h-full items-center justify-center text-4xl text-secondary-dark svelte-lusfug")},m(s,n){c(s,e,n),r[1](e),c(s,a,n),c(s,t,n)},p:v,i:v,o:v,d(s){s&&i(e),r[1](null),s&&i(a),s&&i(t)}}}function M(r,e,a){let t;V(async()=>{const{createScene:n}=await N(()=>import("../chunks/scene-c0694409.js"),[]);n(t)});function s(n){I[n?"unshift":"push"](()=>{t=n,a(0,t)})}return[t,s]}class O extends u{constructor(e){super();f(this,e,M,D,_,{})}}function q(r){let e,a;return e=new O({}),{c(){g(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,s){w(e,t,s),a=!0},i(t){a||(d(e.$$.fragment,t),a=!0)},o(t){h(e.$$.fragment,t),a=!1},d(t){y(e,t)}}}function L(r){let e,a;return e=new C({props:{$$slots:{default:[q]},$$scope:{ctx:r}}}),{c(){g(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,s){w(e,t,s),a=!0},p(t,[s]){const n={};s&1&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){a||(d(e.$$.fragment,t),a=!0)},o(t){h(e.$$.fragment,t),a=!1},d(t){y(e,t)}}}class U extends u{constructor(e){super();f(this,e,null,L,_,{})}}export{U as default};
