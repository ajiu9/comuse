import{_ as g,a as b}from"./chunks/FunctionInfo.vue_vue_type_script_setup_true_lang.MXZQNUn5.js";import{_ as f}from"./chunks/DemoContainer.vue_vue_type_script_setup_true_lang.D2V_4-Pw.js";import{_}from"./chunks/Note.3oiywOlF.js";import{u as D}from"./chunks/index.BhsYxX4l.js";import{d as y,r as h,i as d,o as k,j as s,g as a,w as c,y as l,t as p,a3 as A}from"./chunks/vue.3cVhufXJ.js";import"./chunks/metadata.DVvKwoEt.js";import"./chunks/plugin-vue_export-helper.DlAUqK2U.js";import"./chunks/index.CNs7rMaE.js";const v=y({__name:"demo",setup(u){const i=h(0),e=h(0),t=D(()=>{i.value+=1},1e3);function n(){e.value+=1,t()}return(o,r)=>{const m=_;return k(),d("div",null,[s("button",{onClick:n}," Smash me! "),a(m,null,{default:c(()=>r[0]||(r[0]=[l("Delay is set to 1000ms for this demo.")])),_:1}),s("p",null,"Button clicked: "+p(e.value),1),s("p",null,"Event handler called: "+p(i.value),1)])}}}),E=JSON.parse('{"title":"useThrottle","description":"","frontmatter":{"category":"Utilities","related":"useDebounce"},"headers":[],"relativePath":"core/useDebounce/index.md","filePath":"core/useDebounce/index.md","lastUpdated":1736415165000}'),B={name:"core/useDebounce/index.md"},V=Object.assign(B,{setup(u){return(i,e)=>{const t=g,n=f,o=b;return k(),d("div",null,[e[1]||(e[1]=s("h1",{id:"usethrottle",tabindex:"-1"},[l("useThrottle "),s("a",{class:"header-anchor",href:"#usethrottle","aria-label":'Permalink to "useThrottle"'},"​")],-1)),a(t,{fn:"useDebounce"}),e[2]||(e[2]=s("p",null,"Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.",-1)),e[3]||(e[3]=s("h2",{id:"demo",tabindex:"-1"},[l("Demo "),s("a",{class:"header-anchor",href:"#demo","aria-label":'Permalink to "Demo"'},"​")],-1)),a(n,null,{default:c(()=>[e[0]||(e[0]=s("p",{class:"demo-source-link"},[s("a",{href:"https://github.com/ajiu9/comuse/blob/main/packages/core/useDebounce/demo.vue",target:"_blank"},"source")],-1)),a(v)]),_:1}),e[4]||(e[4]=A(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;" tabindex="0"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">import</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> useThrottle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">comuse-core</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> throttledFn</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> useThrottle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =&gt;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  // do something, it will be called at most 1 time per second</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">},</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 1000</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">window</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">addEventListener</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">resize</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> throttledFn</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre></div><h2 id="recommended-reading" tabindex="-1">Recommended Reading <a class="header-anchor" href="#recommended-reading" aria-label="Permalink to &quot;Recommended Reading&quot;">​</a></h2><ul><li><a href="https://redd.one/blog/debounce-vs-throttle" target="_blank" rel="noreferrer"><strong>Debounce vs Throttle</strong>: Definitive Visual Guide</a></li></ul><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/ajiu9/comuse/blob/main/packages/core/useDebounce/index.ts" target="_blank" rel="noreferrer">Source</a> • <a href="https://github.com/ajiu9/comuse/blob/main/packages/core/useDebounce/demo.vue" target="_blank" rel="noreferrer">Demo</a> • <a href="https://github.com/ajiu9/comuse/blob/main/packages/core/useDebounce/index.md" target="_blank" rel="noreferrer">Docs</a></p><h2 id="changelog" tabindex="-1">Changelog <a class="header-anchor" href="#changelog" aria-label="Permalink to &quot;Changelog&quot;">​</a></h2>`,7)),a(o,{fn:"useDebounce"})])}}});export{E as __pageData,V as default};
