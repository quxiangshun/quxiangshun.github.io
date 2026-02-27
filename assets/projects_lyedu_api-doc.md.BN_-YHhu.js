import{_ as s,o as n,c as p,a2 as t}from"./chunks/framework.C766EroN.js";const u=JSON.parse('{"title":"LyEdu 接口文档","description":"FastAPI + Uvicorn 集成结构、接口文档与 Swagger","frontmatter":{"title":"LyEdu 接口文档","description":"FastAPI + Uvicorn 集成结构、接口文档与 Swagger"},"headers":[],"relativePath":"projects/lyedu/api-doc.md","filePath":"projects/lyedu/api-doc.md"}'),e={name:"projects/lyedu/api-doc.md"};function i(l,a,d,o,c,r){return n(),p("div",null,[...a[0]||(a[0]=[t(`<h1 id="fastapi-uvicorn-集成结构" tabindex="-1">FastAPI + Uvicorn 集成结构 <a class="header-anchor" href="#fastapi-uvicorn-集成结构" aria-label="Permalink to &quot;FastAPI + Uvicorn 集成结构&quot;">​</a></h1><p>本文档说明 lyedu-api-python 中 <code>pip install fastapi uvicorn</code> 的依赖关系与集成方式。</p><h2 id="一、依赖配置" tabindex="-1">一、依赖配置 <a class="header-anchor" href="#一、依赖配置" aria-label="Permalink to &quot;一、依赖配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>requirements.txt</span></span>
<span class="line"><span>├── fastapi&gt;=0.115.0      # Web 框架：路由、中间件、OpenAPI 文档</span></span>
<span class="line"><span>└── uvicorn[standard]&gt;=0.34.0   # ASGI 服务器：运行 FastAPI 应用</span></span></code></pre></div><ul><li><strong>fastapi</strong>：构建 REST API，提供路由、请求校验（Pydantic）、自动文档（/docs）、CORS 等</li><li><strong>uvicorn[standard]</strong>：<code>[standard]</code> 含 uvloop、httptools，提升异步性能</li></ul><h2 id="二、集成结构" tabindex="-1">二、集成结构 <a class="header-anchor" href="#二、集成结构" aria-label="Permalink to &quot;二、集成结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>lyedu-api-python/</span></span>
<span class="line"><span>├── main.py                 # 入口：创建 FastAPI 实例，注册路由，启动 uvicorn</span></span>
<span class="line"><span>├── config.py               # 配置（HOST/PORT/MYSQL/REDIS 等）</span></span>
<span class="line"><span>├── routers/                # 路由模块（挂载到 /api 下）</span></span>
<span class="line"><span>│   ├── auth.py</span></span>
<span class="line"><span>│   ├── course.py</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>├── services/               # 业务逻辑层</span></span>
<span class="line"><span>├── models/                 # 数据模型</span></span>
<span class="line"><span>├── util/                   # 工具（logger、jwt、upload 等）</span></span>
<span class="line"><span>└── alembic/                # 数据库迁移</span></span></code></pre></div><h3 id="main-py-中的集成关系" tabindex="-1">main.py 中的集成关系 <a class="header-anchor" href="#main-py-中的集成关系" aria-label="Permalink to &quot;main.py 中的集成关系&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  from fastapi import FastAPI                                 │</span></span>
<span class="line"><span>│  app = FastAPI(title=&#39;LyEdu API&#39;, lifespan=...)              │</span></span>
<span class="line"><span>│  app.add_middleware(CORSMiddleware, ...)                     │</span></span>
<span class="line"><span>│  app.include_router(xxx.router, prefix=&#39;/api&#39;)               │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  if __name__ == &quot;__main__&quot;:                                  │</span></span>
<span class="line"><span>│      if &quot;--serve&quot; in sys.argv:                               │</span></span>
<span class="line"><span>│          import uvicorn                                       │</span></span>
<span class="line"><span>│          uvicorn.run(app, host=config.HOST, port=config.PORT) │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><ul><li><strong>FastAPI</strong>：定义 <code>app</code>，挂载所有 router</li><li><strong>Uvicorn</strong>：加载 <code>app</code>，监听端口，处理 HTTP 请求</li></ul><h2 id="三、启动方式" tabindex="-1">三、启动方式 <a class="header-anchor" href="#三、启动方式" aria-label="Permalink to &quot;三、启动方式&quot;">​</a></h2><table tabindex="0"><thead><tr><th>方式</th><th>命令</th><th>适用场景</th></tr></thead><tbody><tr><td>开发</td><td><code>python main.py</code></td><td>主进程启动子进程 <code>--serve</code>，后台运行并等待就绪后退出</td></tr><tr><td>直接</td><td><code>python main.py --serve</code></td><td>内部使用，由主进程 fork 后调用</td></tr><tr><td>命令行</td><td><code>uvicorn main:app --host 0.0.0.0 --port 9700</code></td><td>Docker、生产环境常用</td></tr><tr><td>打包 exe</td><td>双击运行</td><td>Windows 下等价于 <code>python main.py</code></td></tr></tbody></table><h3 id="docker-中的用法" tabindex="-1">Docker 中的用法 <a class="header-anchor" href="#docker-中的用法" aria-label="Permalink to &quot;Docker 中的用法&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Dockerfile：pip install -r requirements.txt</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ENTRYPOINT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./docker-entrypoint.sh&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># docker-entrypoint.sh 末尾</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exec</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> uvicorn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> main:app</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --host</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.0.0.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --port</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9700</span></span></code></pre></div><h2 id="四、请求链路" tabindex="-1">四、请求链路 <a class="header-anchor" href="#四、请求链路" aria-label="Permalink to &quot;四、请求链路&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>HTTP 请求</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>Uvicorn (ASGI 服务器)</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>FastAPI (Starlette 应用)</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ├─→ CORS 中间件</span></span>
<span class="line"><span>    ├─→ NoCache 中间件</span></span>
<span class="line"><span>    ├─→ 路由匹配 /api/xxx</span></span>
<span class="line"><span>    │       │</span></span>
<span class="line"><span>    │       ▼</span></span>
<span class="line"><span>    │   routers/*.py 中的 @router.get/post/...</span></span>
<span class="line"><span>    │       │</span></span>
<span class="line"><span>    │       ▼</span></span>
<span class="line"><span>    │   services/*.py 业务逻辑</span></span>
<span class="line"><span>    │       │</span></span>
<span class="line"><span>    │       ▼</span></span>
<span class="line"><span>    │   db / Redis 等</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>HTTP 响应</span></span></code></pre></div><h2 id="五、相关配置" tabindex="-1">五、相关配置 <a class="header-anchor" href="#五、相关配置" aria-label="Permalink to &quot;五、相关配置&quot;">​</a></h2><table tabindex="0"><thead><tr><th>变量</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td><code>HOST</code></td><td><code>0.0.0.0</code></td><td>监听地址，0.0.0.0 允许外网访问</td></tr><tr><td><code>PORT</code></td><td><code>9700</code></td><td>监听端口</td></tr></tbody></table><p>配置来源：<code>.env</code> / <code>.env.dev</code>（开发）或 <code>~/.lyedu/conf/config.ini</code>（打包后）。</p><hr><h2 id="六、接口文档" tabindex="-1">六、接口文档 <a class="header-anchor" href="#六、接口文档" aria-label="Permalink to &quot;六、接口文档&quot;">​</a></h2><table tabindex="0"><thead><tr><th>文档</th><th>路径</th><th>说明</th></tr></thead><tbody><tr><td><strong>Swagger UI</strong></td><td><code>/docs</code></td><td>FastAPI 自动生成，可在线调试接口</td></tr><tr><td><strong>OpenAPI JSON</strong></td><td><code>/openapi.json</code></td><td>标准 OpenAPI 3.0 规范</td></tr><tr><td><strong>接口说明（人工维护）</strong></td><td><code>docs/LYEDU_API_PYTHON.md</code></td><td>业务说明、入参/出参、示例，供前端对接</td></tr><tr><td><strong>接口文档（运行时）</strong></td><td><code>/interface-doc</code></td><td>服务运行时提供接口说明 Markdown（开发环境含仓库文档时可用）</td></tr></tbody></table><h3 id="文档关系" tabindex="-1">文档关系 <a class="header-anchor" href="#文档关系" aria-label="Permalink to &quot;文档关系&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>LYEDU_API_PYTHON.md  ←→  代码 routers/*.py</span></span>
<span class="line"><span>        │                         │</span></span>
<span class="line"><span>        │                         ▼</span></span>
<span class="line"><span>        │                   OpenAPI schema</span></span>
<span class="line"><span>        │                         │</span></span>
<span class="line"><span>        └─────────────────────────┼──→ /docs (Swagger UI)</span></span>
<span class="line"><span>                                 └──→ /interface-doc (Markdown)</span></span></code></pre></div><ul><li><strong>Swagger <code>/docs</code></strong>：随代码自动更新，适合快速调试</li><li><strong>LYEDU_API_PYTHON.md</strong>：人工编写，含业务规则、可见性说明、错误示例，便于前后端协同</li><li>新增接口时建议同步更新 <code>docs/LYEDU_API_PYTHON.md</code></li></ul>`,26)])])}const g=s(e,[["render",i]]);export{u as __pageData,g as default};
