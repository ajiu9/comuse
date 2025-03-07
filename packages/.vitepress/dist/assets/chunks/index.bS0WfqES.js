class V{constructor(t){this.object=t.object,this.property=t.property,this.startValue=t.startValue,this.endValue=t.endValue,this.duration=t.duration,this.delay=t.delay||0,this.timingFunction=t.timingFunction||(s=>s),this.template=t.template||(s=>s)}receiveTime(t){const s=this.endValue-this.startValue,i=this.timingFunction(t/this.duration);this.object[this.property]=this.template(this.startValue+s*i)}}const u=Symbol("tick"),l=Symbol("tick-handler"),c=Symbol("animations"),m=Symbol("start-time"),d=Symbol("pause-start"),h=Symbol("pause-time");class C{constructor(){this.state="initial",this[c]=new Set,this[m]=new Map,this[h]=0,this[d]=0,this[l]=null,this[u]=()=>{}}start(){if(this.state!=="initial")return;this.state="started";const t=Date.now();this[h]=0,this[u]=()=>{const s=Date.now();for(const i of this[c]){let r;(this[m].get(i)??0)<t?r=s-t-this[h]-i.delay:r=s-(this[m].get(i)??0)-this[h]-i.delay,i.duration<r&&(this[c].delete(i),r=i.duration),r>0&&i.receiveTime(r)}this[l]=requestAnimationFrame(this[u])},this[u]()}add(t,s){arguments.length<2&&(s=Date.now()),this[c].add(t),this[m].set(t,s)}pause(){this.state="paused",this[d]=Date.now(),this[l]!==null&&cancelAnimationFrame(this[l])}resume(){this.state==="paused"&&(this.state="started",this[h]+=Date.now()-this[d],this[u]())}reset(){this.pause(),this.state="initial",this[h]=0,this[d]=0,this[c]=new Set,this[m]=new Map,this[l]=null}getState(){return this.state}}const L=n=>n;function b(n,t,s,i){const S=3*n-3*s+1,f=3*s-6*n,y=3*n,w=3*t-3*i+1,A=3*i-6*t,E=3*t;function _(e){return(3*S*e+2*f)*e+y}function v(e){return((S*e+f)*e+y)*e}function D(e){return((w*e+A)*e+E)*e}function O(e){let a=e,T,o;for(let M=0;M<8;M++){if(o=v(a)-e,Math.abs(o)<1e-6)return a;if(T=_(a),Math.abs(T)<1e-6)break;a-=o/T;let p=1,I=0;for(a=e;p>I;){if(o=v(a)-e,Math.abs(o)<1e-6)return a;o>0?p=a:I=a,a=(p+I)/2}return a}}function R(e){return D(O(e))}return R}const F=b(.25,.1,.25,1),Z=b(.42,0,1,1),g=b(0,0,.58,1),j=b(.42,0,.58,1);export{V as A,C as T,Z as a,g as b,j as c,F as e,L as l};
