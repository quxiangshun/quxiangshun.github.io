const n=`---
outline: deep
---

# LyTools 快速开始

> 编辑日期：2026-03-22

## 获取源码

任选其一远程仓库克隆即可（三端内容同步维护）：

\`\`\`bash
git clone https://github.com/quxiangshun/ly-tools.git
# 或
git clone https://gitee.com/quxiangshun/ly-tools.git
# 或
git clone https://gitcode.com/quxiangshun/ly-tools.git
\`\`\`

## 开发调试

\`\`\`bash
cd ly-tools
npm install
npm run dev
\`\`\`

## 构建

\`\`\`bash
npm run build
\`\`\`

主程序构建默认不包含插件；插件目录为 \`~/.ly/tools/plugins\`，可通过插件市场安装。若需在插件市场上架，将 \`plugins/*.zip\` 上传至插件市场指定地址（以仓库 README 为准）。

## 技术栈摘要

- Electron、Vue 3、Element Plus、Vite

项目概览与功能说明见 [项目介绍](./introduction)。
`;export{n as default};
