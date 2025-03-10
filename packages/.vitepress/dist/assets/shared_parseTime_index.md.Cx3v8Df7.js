import{_ as m}from"./chunks/DemoContainer.vue_vue_type_script_setup_true_lang.9sap8pYt.js";import{p as g,f as c,_ as u}from"./chunks/FunctionInfo.vue_vue_type_script_setup_true_lang.Dwr9cZln.js";import{d as y,t as f,D as b,o,b as k,e as a,y as n,x as l,E as p,ac as A,ad as _,F as D,l as t,k as v,a7 as T,r as x}from"./chunks/framework.vs0cRJ_R.js";import{t as C}from"./chunks/is.BL9DzFAM.js";import"./chunks/theme.CiVHEWIn.js";const B={class:"text-primary text-center"},F={class:"text-center opacity-50"},j=y({__name:"demo",setup(d){const e=f(0),s=b(()=>C()+e.value**3);return(h,i)=>(o(),k(D,null,[a("div",B,[n(" parseTime: "+l(p(g)(s.value,"yyyy-MM-dd hh:mm:ss"))+" ",1),i[1]||(i[1]=a("br",null,null,-1)),n(" formatTime: "+l(p(c)(s.value)),1)]),A(a("input",{"onUpdate:modelValue":i[0]||(i[0]=r=>e.value=r),class:"slider",type:"range",min:"-3800",max:"0"},null,512),[[_,e.value]]),a("div",F,l(e.value**3)+"ms ",1)],64))}}),V=JSON.parse('{"title":"formatTime","description":"","frontmatter":{"category":"Time"},"headers":[],"relativePath":"shared/parseTime/index.md","filePath":"shared/parseTime/index.md","lastUpdated":1737110061000}'),P={name:"shared/parseTime/index.md"},E=Object.assign(P,{setup(d){return(e,s)=>{const h=u,i=m,r=x("Changelog");return o(),k("div",null,[s[1]||(s[1]=a("h1",{id:"formattime",tabindex:"-1"},[n("formatTime "),a("a",{class:"header-anchor",href:"#formattime","aria-label":'Permalink to "formatTime"'},"​")],-1)),t(h,{fn:"parseTime"}),s[2]||(s[2]=a("p",null,"Automatically update the time ago string when the time changes.",-1)),s[3]||(s[3]=a("h2",{id:"demo",tabindex:"-1"},[n("Demo "),a("a",{class:"header-anchor",href:"#demo","aria-label":'Permalink to "Demo"'},"​")],-1)),t(i,null,{default:v(()=>[s[0]||(s[0]=a("p",{class:"demo-source-link"},[a("a",{href:"https://github.com/ajiu9/comuse/blob/main/packages/shared/parseTime/demo.vue",target:"_blank"},"source")],-1)),t(j)]),_:1}),s[4]||(s[4]=T(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;" tabindex="0"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">import</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> formatTime</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> paresTime</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">comuse-shared</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> timeAgo</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> formatTime</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> Date</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2024</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 12</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">paresTime</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> Date</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(),</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">yyyy-MM-dd hh:mm:ss</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/ajiu9/comuse/blob/main/packages/shared/parseTime/index.ts" target="_blank" rel="noreferrer">Source</a> • <a href="https://github.com/ajiu9/comuse/blob/main/packages/shared/parseTime/demo.vue" target="_blank" rel="noreferrer">Demo</a> • <a href="https://github.com/ajiu9/comuse/blob/main/packages/shared/parseTime/index.md" target="_blank" rel="noreferrer">Docs</a></p><h2 id="changelog" tabindex="-1">Changelog <a class="header-anchor" href="#changelog" aria-label="Permalink to &quot;Changelog&quot;">​</a></h2>`,5)),t(r,{fn:"parseTime"})])}}});export{V as __pageData,E as default};
