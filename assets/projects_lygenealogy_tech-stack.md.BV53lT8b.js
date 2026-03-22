import{_ as s,o as n,c as e,a2 as t}from"./chunks/framework.C766EroN.js";const u=JSON.parse('{"title":"技术栈","description":"","frontmatter":{},"headers":[],"relativePath":"projects/lygenealogy/tech-stack.md","filePath":"projects/lygenealogy/tech-stack.md"}'),p={name:"projects/lygenealogy/tech-stack.md"};function l(i,a,o,r,d,c){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="技术栈" tabindex="-1">技术栈 <a class="header-anchor" href="#技术栈" aria-label="Permalink to &quot;技术栈&quot;">​</a></h1><blockquote><p>编辑日期：2026-03-13<br> 与 <a href="https://github.com/quxiangshun/ly-genealogy" target="_blank" rel="noreferrer">GitHub 仓库</a> 当前技术选型一致。</p></blockquote><h2 id="技术架构概览" tabindex="-1">技术架构概览 <a class="header-anchor" href="#技术架构概览" aria-label="Permalink to &quot;技术架构概览&quot;">​</a></h2><p>LyGenealogy 采用 <strong>Node.js</strong> 技术栈，<strong>pnpm workspace</strong> Monorepo，前后端分离：公共前端（Nuxt 3）、管理后台（Vue SPA）、REST API（Express）。</p><h2 id="模块与技术" tabindex="-1">模块与技术 <a class="header-anchor" href="#模块与技术" aria-label="Permalink to &quot;模块与技术&quot;">​</a></h2><table tabindex="0"><thead><tr><th>模块</th><th>技术</th><th>说明</th></tr></thead><tbody><tr><td>API 后端</td><td>Express + TypeScript</td><td>REST API、JWT 认证、文件上传</td></tr><tr><td>数据库</td><td>better-sqlite3</td><td>高性能同步 SQLite</td></tr><tr><td>公共前端</td><td>Nuxt 3 + Vue 3</td><td>SSR/SSG/ISR，SEO 友好，PWA</td></tr><tr><td>管理后台</td><td>Vue 3 + Element Plus</td><td>SPA，独立构建</td></tr><tr><td>包管理</td><td>pnpm workspace</td><td>Monorepo 多包</td></tr></tbody></table><h2 id="目录结构-开发" tabindex="-1">目录结构（开发） <a class="header-anchor" href="#目录结构-开发" aria-label="Permalink to &quot;目录结构（开发）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├── packages/</span></span>
<span class="line"><span>│   ├── server/          # Express API（TypeScript）</span></span>
<span class="line"><span>│   ├── web/             # Nuxt 3 公共前端</span></span>
<span class="line"><span>│   └── admin/           # Vue 3 管理后台 SPA</span></span>
<span class="line"><span>├── docs/                # 族谱原始资料（PDF/DOC 等）</span></span>
<span class="line"><span>├── ecosystem.config.cjs # PM2 配置</span></span>
<span class="line"><span>├── Caddyfile            # Caddy 反向代理（端口 9997）</span></span>
<span class="line"><span>├── build.sh / build.ps1 # 构建脚本</span></span>
<span class="line"><span>├── deploy.sh            # 部署脚本</span></span>
<span class="line"><span>├── package.json         # 根 workspace 配置</span></span>
<span class="line"><span>├── pnpm-workspace.yaml</span></span>
<span class="line"><span>└── tsconfig.base.json</span></span></code></pre></div><h2 id="生产部署目录-示例" tabindex="-1">生产部署目录（示例） <a class="header-anchor" href="#生产部署目录-示例" aria-label="Permalink to &quot;生产部署目录（示例）&quot;">​</a></h2><p>部署解压后的典型结构（以仓库 <code>README</code> 为准）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├── server/              # Express API</span></span>
<span class="line"><span>│   ├── dist/            # 编译后的 JS</span></span>
<span class="line"><span>│   ├── data/            # SQLite 数据库 + 上传文件</span></span>
<span class="line"><span>│   ├── node_modules/</span></span>
<span class="line"><span>│   └── package.json</span></span>
<span class="line"><span>├── admin/</span></span>
<span class="line"><span>│   └── dist/            # 管理后台静态资源</span></span>
<span class="line"><span>├── web/</span></span>
<span class="line"><span>│   └── .output/         # Nuxt SSR 构建产物</span></span>
<span class="line"><span>├── logs/                # 日志</span></span>
<span class="line"><span>├── ecosystem.config.cjs</span></span>
<span class="line"><span>└── Caddyfile</span></span></code></pre></div><h2 id="设计要点" tabindex="-1">设计要点 <a class="header-anchor" href="#设计要点" aria-label="Permalink to &quot;设计要点&quot;">​</a></h2><ul><li><strong>better-sqlite3</strong>：同步 SQLite 驱动，无需单独数据库服务，适合单机部署</li><li><strong>Nuxt 3</strong>：公共站 SSR/静态化与 SEO，支持 PWA</li><li><strong>Express + TypeScript</strong>：API 与鉴权统一在后端，便于扩展与维护</li></ul>`,13)])])}const g=s(p,[["render",l]]);export{u as __pageData,g as default};
