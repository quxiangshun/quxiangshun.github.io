const n=`# 常见问题

> 编辑日期：2026-03-13  
> 以 [GitHub 仓库](https://github.com/quxiangshun/ly-genealogy) 为准。

## 如何修改管理员密码？

默认账号为 \`ly-genealogy\` / \`123456\`。首次登录后需在**管理后台**中修改密码（如通过「修改密码」功能）。生产环境部署前建议在配置或初始化脚本中设置强密码。

## 数据库文件在哪里？

SQLite 数据库位于 **server/data/** 目录下（开发时为 \`packages/server/data/\`），具体文件名以项目配置为准。首次正常启动 API 后会按需创建库与表。

## 开发时要开几个终端？

需要三个：一个运行 \`pnpm dev:server\`（API），一个运行 \`pnpm dev:web\`（公共前端），一个运行 \`pnpm dev:admin\`（管理后台）。端口分别为 5001、3000、3001。

## 生产环境如何部署？

在本地执行 \`bash build.sh\` 得到 \`genealogy-release.tar.gz\`，上传到服务器解压后执行 \`deploy.sh\`，再用 Caddy 加载项目内 \`Caddyfile\`。详见 [部署指南](/projects/lygenealogy/deployment)。

## 姓名显示为星号？

为保护隐私，系统对成员姓名做脱敏展示（具体规则以当前版本逻辑为准）。可在管理后台查看完整数据。

## 如何支持多姓氏或新族谱？

系统支持多族谱与多姓氏。通过**管理后台**新增族谱并维护成员、字辈等数据；API 与前端会按现有接口展示。

## 技术栈与旧版不同？

当前版本采用 **Node.js** 技术栈（Express + Nuxt 3 + Vue Admin，pnpm Monorepo）。若从旧版（如 Flask 版）迁移，需按仓库提供的迁移说明或自行做数据与配置迁移。
`;export{n as default};
