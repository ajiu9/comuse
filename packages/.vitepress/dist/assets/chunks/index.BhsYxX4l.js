import{N as w}from"./index.CNs7rMaE.js";import{I as P,J as T}from"./vue.3cVhufXJ.js";function j(i,t){function e(...r){return new Promise((l,n)=>{Promise.resolve(i(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(l).catch(n)})}return e}function x(...i){let t=0,e,r=!0,l=w,n,s,u,o,f;!P(i[0])&&typeof i[0]=="object"?{delay:s,trailing:u=!0,leading:o=!0,rejectOnCancel:f=!1}=i[0]:[s,u=!0,o=!0,f=!1]=i;const m=()=>{e&&(clearTimeout(e),e=void 0,l(),l=w)};return d=>{const a=T(s),p=Date.now()-t,c=()=>n=d();return m(),a<=0?(t=Date.now(),c()):(p>a&&(o||!r)?(t=Date.now(),c()):u&&(n=new Promise((h,D)=>{l=f?D:h,e=setTimeout(()=>{t=Date.now(),r=!0,h(c()),m()},Math.max(0,a-p))})),!o&&!e&&(e=setTimeout(()=>r=!0,a)),r=!1,n)}}function F(i,t=200,e=!1,r=!0,l=!1){return j(x(t,e,r,l),i)}export{F as u};
