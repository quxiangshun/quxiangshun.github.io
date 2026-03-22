const n=`# 技术栈

> 编辑日期：2026-03-13  
> 与 [GitHub 仓库](https://github.com/quxiangshun/ly-genealogy) 当前技术选型一致。

## 技术架构概览

LyGenealogy 采用 **Node.js** 技术栈，**pnpm workspace** Monorepo，前后端分离：公共前端（Nuxt 3）、管理后台（Vue SPA）、REST API（Express）。

## 模块与技术

| 模块 | 技术 | 说明 |
| --- | --- | --- |
| API 后端 | Express + TypeScript | REST API、JWT 认证、文件上传 |
| 数据库 | better-sqlite3 | 高性能同步 SQLite |
| 公共前端 | Nuxt 3 + Vue 3 | SSR/SSG/ISR，SEO 友好，PWA |
| 管理后台 | Vue 3 + Element Plus | SPA，独立构建 |
| 包管理 | pnpm workspace | Monorepo 多包 |

## 目录结构（开发）

\`\`\`
├── packages/
│   ├── server/          # Express API（TypeScript）
│   ├── web/             # Nuxt 3 公共前端
│   └── admin/           # Vue 3 管理后台 SPA
├── docs/                # 族谱原始资料（PDF/DOC 等）
├── ecosystem.config.cjs # PM2 配置
├── Caddyfile            # Caddy 反向代理（端口 9997）
├── build.sh / build.ps1 # 构建脚本
├── deploy.sh            # 部署脚本
├── package.json         # 根 workspace 配置
├── pnpm-workspace.yaml
└── tsconfig.base.json
\`\`\`

## 生产部署目录（示例）

部署解压后的典型结构（以仓库 \`README\` 为准）：

\`\`\`
├── server/              # Express API
│   ├── dist/            # 编译后的 JS
│   ├── data/            # SQLite 数据库 + 上传文件
│   ├── node_modules/
│   └── package.json
├── admin/
│   └── dist/            # 管理后台静态资源
├── web/
│   └── .output/         # Nuxt SSR 构建产物
├── logs/                # 日志
├── ecosystem.config.cjs
└── Caddyfile
\`\`\`

## 设计要点

- **better-sqlite3**：同步 SQLite 驱动，无需单独数据库服务，适合单机部署
- **Nuxt 3**：公共站 SSR/静态化与 SEO，支持 PWA
- **Express + TypeScript**：API 与鉴权统一在后端，便于扩展与维护
`;export{n as default};
