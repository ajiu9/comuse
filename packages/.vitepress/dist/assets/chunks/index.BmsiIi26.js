import{Q as M,N as h}from"./vue.3cVhufXJ.js";function N(u=0,r={}){let s=M(u);const e=h(u),{min:a=Number.MIN_SAFE_INTEGER,max:n=Number.MAX_SAFE_INTEGER}=r,m=(t=1)=>e.value=Math.max(Math.min(n,e.value+t),a),c=(t=1)=>e.value=Math.max(Math.min(n,e.value-t),a),l=()=>e.value,o=t=>e.value=Math.max(Math.min(n,t),a);return{count:e,inc:m,dec:c,get:l,set:o,reset:(t=s)=>(s=t,o(t))}}export{N as u};
