const n=`# 部署指南

> 编辑日期：2026-03-13  
> 以 [GitHub 仓库](https://github.com/quxiangshun/ly-genealogy) 的构建与部署方式为准。

## 生产部署流程概览

1. **本地构建打包**：执行 \`build.sh\`（Linux/macOS）或 \`build.ps1\`（Windows），生成 \`genealogy-release.tar.gz\`
2. **上传并解压**：将压缩包上传到服务器指定目录并解压
3. **执行部署脚本**：运行 \`deploy.sh\`（创建数据目录、启动 PM2 等）
4. **启动 Caddy**：使用项目内 \`Caddyfile\` 启动反向代理

服务器需预装：**Node.js**、**PM2**、**Caddy**。无需在服务器上执行 \`pnpm install\` 或 \`build\`，所有构建在本地完成。

## 第一步：本地构建

\`\`\`bash
bash build.sh
\`\`\`

生成 \`genealogy-release.tar.gz\`，内含所有构建产物与运行依赖，服务器仅需 Node 运行时。

## 第二步：上传并解压

\`\`\`bash
scp genealogy-release.tar.gz root@<服务器IP>:/var/www/
ssh root@<服务器IP>
\`\`\`

在服务器上：

\`\`\`bash
mkdir -p /var/www/genealogy && cd /var/www/genealogy
tar -xzf /var/www/genealogy-release.tar.gz
bash deploy.sh
caddy start --config /var/www/genealogy/Caddyfile
\`\`\`

\`deploy.sh\` 负责创建数据目录、启动 PM2 等，不执行 install 或 build。

## 服务架构（生产）

\`\`\`
浏览器 → Caddy(:9997)
              ├─ /api/*     → Express(:5001)
              ├─ /admin/*   → Express(:5001) 静态文件
              ├─ /uploads/* → Express(:5001)
              └─ /*         → Nuxt SSR(:3000)
\`\`\`

典型访问地址（以实际 Caddy 与域名配置为准）：

- 前台：\`http://<域名或IP>:9997/\`
- 后台：\`http://<域名或IP>:9997/admin/\`
- API：\`http://<域名或IP>:9997/api/\`

## 默认管理员与密码

- 用户名：\`ly-genealogy\`
- 密码：\`123456\`
- 首次登录后需在系统中修改密码。

## 数据与日志

- 数据库与上传文件：通常在 \`server/data/\` 下（以部署脚本与配置为准）
- 日志：\`logs/\` 或 PM2 日志路径，定期归档与备份即可
`;export{n as default};
