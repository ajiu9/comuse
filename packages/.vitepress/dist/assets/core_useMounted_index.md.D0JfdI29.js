import{_ as d,a as k}from"./chunks/FunctionInfo.vue_vue_type_script_setup_true_lang.CcO2eMYP.js";import{_ as u}from"./chunks/DemoContainer.vue_vue_type_script_setup_true_lang.D2V_4-Pw.js";import{u as c}from"./chunks/index.Wvqviais.js";import{d as g,i as l,o,t as m,Q as f,j as a,g as e,a3 as _,y as n,w as y}from"./chunks/vue.3cVhufXJ.js";import"./chunks/metadata.DGzQe3Yx.js";const b=g({__name:"demo",setup(h){const i=c();return(s,t)=>(o(),l("div",null,m(f(i)?"mounted":"unmounted"),1))}}),x=JSON.parse('{"title":"useMounted","description":"","frontmatter":{"category":"Component"},"headers":[],"relativePath":"core/useMounted/index.md","filePath":"core/useMounted/index.md","lastUpdated":1743076499000}'),D={name:"core/useMounted/index.md"},P=Object.assign(D,{setup(h){return(i,s)=>{const t=d,r=u,p=k;return o(),l("div",null,[s[1]||(s[1]=a("h1",{id:"usemounted",tabindex:"-1"},[n("useMounted "),a("a",{class:"header-anchor",href:"#usemounted","aria-label":'Permalink to "useMounted"'},"​")],-1)),e(t,{fn:"useMounted"}),s[2]||(s[2]=a("p",null,"Mounted state in ref.",-1)),s[3]||(s[3]=a("h2",{id:"demo",tabindex:"-1"},[n("Demo "),a("a",{class:"header-anchor",href:"#demo","aria-label":'Permalink to "Demo"'},"​")],-1)),e(r,null,{default:y(()=>[s[0]||(s[0]=a("p",{class:"demo-source-link"},[a("a",{href:"https://github.com/ajiu9/comuse/blob/main/packages/core/useMounted/demo.vue",target:"_blank"},"source")],-1)),e(b)]),_:1}),s[4]||(s[4]=_(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;" tabindex="0"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">import</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> useMounted</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">comuse-core</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> isMounted</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> useMounted</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span></code></pre></div><p>Which is essentially a shorthand of:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;" tabindex="0"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">isMounted</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> ref</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">false</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">onMounted</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =&gt;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">  isMounted</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">value</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> true</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">})</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/ajiu9/comuse/blob/main/packages/core/useMounted/index.ts" target="_blank" rel="noreferrer">Source</a> • <a href="https://github.com/ajiu9/comuse/blob/main/packages/core/useMounted/demo.vue" target="_blank" rel="noreferrer">Demo</a> • <a href="https://github.com/ajiu9/comuse/blob/main/packages/core/useMounted/index.md" target="_blank" rel="noreferrer">Docs</a></p><h2 id="changelog" tabindex="-1">Changelog <a class="header-anchor" href="#changelog" aria-label="Permalink to &quot;Changelog&quot;">​</a></h2>`,7)),e(p,{fn:"useMounted"})])}}});export{x as __pageData,P as default};
