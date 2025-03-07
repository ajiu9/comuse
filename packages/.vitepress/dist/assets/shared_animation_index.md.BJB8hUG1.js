import{_ as c,a as u}from"./chunks/FunctionInfo.vue_vue_type_script_setup_true_lang.CsFAwKy4.js";import{_ as f}from"./chunks/DemoContainer.vue_vue_type_script_setup_true_lang.D2V_4-Pw.js";import{T as y,A as b,e as A}from"./chunks/index.bS0WfqES.js";import{r as o,i as d,o as m,j as a,Q as k,F as _,g as n,a3 as v,y as p,w as B}from"./chunks/vue.3cVhufXJ.js";import"./chunks/metadata.DVvKwoEt.js";const D={__name:"demo",setup(g){const t=o(null),s=o(null),e=new y;e.start();const l=()=>{e.add(new b({object:t.value.style,property:"transform",startValue:0,endValue:500,duration:2e3,timingFunction:A,template:h=>`translateX(${h}px)`})),s.value&&(s.value.style.transition="transform ease 2s",s.value.style.transform="translateX(500px)")},r=()=>{e.reset(),t.value.style.transition=null,t.value.style.transform=null,s.value.style.transform="translateX(0px)",s.value.style.transition=null,s.value.style.transform="translateX(0px)"};return(h,i)=>(m(),d(_,null,[i[2]||(i[2]=a("p",{class:"font-bold"}," TimeLine Animation ",-1)),a("div",{ref_key:"el",ref:t,class:"h-100px w-100px bg-red","mb-4":""},null,512),i[3]||(i[3]=a("p",{class:"font-bold"}," Browser Css Animation ",-1)),a("div",{ref_key:"el1",ref:s,class:"h-100px w-100px bg-blue"},null,512),a("button",{onClick:l}," add "),a("button",{onClick:r}," reset "),a("button",{onClick:i[0]||(i[0]=()=>k(e).pause())}," pause "),a("button",{onClick:i[1]||(i[1]=()=>k(e).resume())}," resume ")],64))}},F=JSON.parse('{"title":"Animation","description":"","frontmatter":{"category":"Animation"},"headers":[],"relativePath":"shared/animation/index.md","filePath":"shared/animation/index.md","lastUpdated":1741339740000}'),C={name:"shared/animation/index.md"},S=Object.assign(C,{setup(g){return(t,s)=>{const e=c,l=f,r=u;return m(),d("div",null,[s[1]||(s[1]=a("h1",{id:"animation",tabindex:"-1"},[p("Animation "),a("a",{class:"header-anchor",href:"#animation","aria-label":'Permalink to "Animation"'},"​")],-1)),n(e,{fn:"animation"}),s[2]||(s[2]=a("h2",{id:"demo",tabindex:"-1"},[p("Demo "),a("a",{class:"header-anchor",href:"#demo","aria-label":'Permalink to "Demo"'},"​")],-1)),n(l,null,{default:B(()=>[s[0]||(s[0]=a("p",{class:"demo-source-link"},[a("a",{href:"https://github.com/ajiu9/comuse/blob/main/packages/shared/animation/demo.vue",target:"_blank"},"source")],-1)),n(D)]),_:1}),s[3]||(s[3]=v(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="code-block-ts"><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;" tabindex="0"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">import</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Animation</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> TimeLine</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">comuse-core</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">tl</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> new </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">TimeLine</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">tl</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span></code></pre></div></div><div class="code-block-js"><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;" tabindex="0"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">import</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> TimeLine</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">comuse-core</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> tl</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> TimeLine</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">tl</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span></code></pre></div></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/ajiu9/comuse/blob/main/packages/shared/animation/index.ts" target="_blank" rel="noreferrer">Source</a> • <a href="https://github.com/ajiu9/comuse/blob/main/packages/shared/animation/demo.vue" target="_blank" rel="noreferrer">Demo</a> • <a href="https://github.com/ajiu9/comuse/blob/main/packages/shared/animation/index.md" target="_blank" rel="noreferrer">Docs</a></p><h2 id="changelog" tabindex="-1">Changelog <a class="header-anchor" href="#changelog" aria-label="Permalink to &quot;Changelog&quot;">​</a></h2>`,6)),n(r,{fn:"animation"})])}}});export{F as __pageData,S as default};
