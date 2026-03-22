const n=`# 配置参考

> 编辑日期：2026-03-13  
> 以 [GitHub 仓库](https://github.com/quxiangshun/ly-genealogy) 为准。

## 进程管理

使用 **PM2** 时，配置见项目根目录 **\`ecosystem.config.cjs\`**（CommonJS 格式）。可在此修改应用名、启动命令、实例数等。

## 反向代理

**Caddyfile** 位于项目根目录，生产部署时通过：

\`\`\`bash
caddy start --config /var/www/genealogy/Caddyfile
\`\`\`

启动。其中端口（如 9997）、 upstream（Express、Nuxt 端口）以文件内容为准，按需修改域名与 HTTPS。

## 环境与密钥

- **API 端口**：由 \`packages/server\` 或环境变量决定（如 5001）
- **JWT、数据库路径等**：见 \`packages/server\` 内配置或环境变量说明
- **管理员账号**：默认 \`ly-genealogy\` / \`123456\`，首次登录后需在系统中修改

具体配置项以仓库内 \`server\` 包及 README 为准。

## 多姓氏与扩展

系统支持多姓氏数据与展示扩展，具体配置方式见项目文档或管理后台。
`;export{n as default};
