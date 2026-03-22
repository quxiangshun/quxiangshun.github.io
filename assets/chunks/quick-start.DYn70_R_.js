const n=`# 快速开始

> 编辑日期：2026-03-13  
> 以 [GitHub 仓库](https://github.com/quxiangshun/ly-genealogy) 为准。

## 环境要求

- Node.js（建议 LTS）
- pnpm

## 获取代码

\`\`\`bash
git clone https://github.com/quxiangshun/ly-genealogy.git
cd ly-genealogy
\`\`\`

## 安装依赖

\`\`\`bash
pnpm install
\`\`\`

## 开发模式

需要同时启动 API、公共前端和管理后台（三个终端）：

\`\`\`bash
# 终端 1：启动 API
pnpm dev:server

# 终端 2：启动 Nuxt 公共前端
pnpm dev:web

# 终端 3：启动管理后台
pnpm dev:admin
\`\`\`

| 服务 | 地址 |
| --- | --- |
| API | http://localhost:5001 |
| 公共前端 | http://localhost:3000 |
| 管理后台 | http://localhost:3001/admin/ |

## 默认管理员

- **用户名**：\`ly-genealogy\`
- **密码**：\`123456\`
- 首次登录后需修改密码。

::: warning 安全提示
生产环境务必修改默认密码，并做好账号与权限配置。
:::

## 数据库与数据目录

SQLite 数据库及上传文件位于 \`packages/server/data/\`（开发时以实际配置为准）。首次运行 API 时会按需初始化数据与表结构。
`;export{n as default};
