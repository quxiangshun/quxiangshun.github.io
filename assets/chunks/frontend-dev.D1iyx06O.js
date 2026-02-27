const n=`# LyEdu 前端开发指南\r
\r
> 编辑日期：2026-02-26  \r
> 基于 [ly-edu](https://gitee.com/quxiangshun/ly-edu) 项目结构整理\r
\r
## 一、前端项目概览\r
\r
LyEdu 前端采用多端架构，包含以下子项目：\r
\r
| 项目 | 目录 | 技术栈 | 端口 | 说明 |\r
|------|------|--------|------|------|\r
| 管理后台 | lyedu-admin | Vue 3 + TypeScript + Vite + Element Plus | 9900 | 管理员操作、课程/用户/考试等管理 |\r
| PC 端 | lyedu-pc | Vue 3 + TypeScript + Vite + Element Plus | 9800 | 学员端 PC 学习界面 |\r
| 学员端 H5/小程序 | lyedu-unix | uni-app x | - | H5、微信小程序等多端 |\r
\r
## 二、开发环境准备\r
\r
### 环境要求\r
\r
- **Node.js**：18+\r
- **包管理器**：npm / pnpm / yarn\r
- **IDE**：推荐 VS Code，学员端使用 HBuilderX 打开 lyedu-unix\r
\r
### 克隆项目\r
\r
\`\`\`bash\r
git clone https://gitee.com/quxiangshun/ly-edu.git\r
cd ly-edu\r
\`\`\`\r
\r
## 三、各子项目开发说明\r
\r
### 1. 管理后台（lyedu-admin）\r
\r
\`\`\`bash\r
cd lyedu-admin\r
npm install\r
npm run dev\r
\`\`\`\r
\r
- **入口**：http://localhost:9900\r
- **配置文件**：\`scripts/dev/dev-config.yml\` 中可配置 \`start_lyedu_admin: true\`\r
- **功能**：课程管理、用户/部门管理、考试中心、系统配置、飞书集成等\r
\r
### 2. PC 端（lyedu-pc）\r
\r
\`\`\`bash\r
cd lyedu-pc\r
npm install\r
npm run dev\r
\`\`\`\r
\r
- **入口**：http://localhost:9800\r
- **功能**：学员学习、视频播放、课程评论、知识中心、考试、证书、积分排行等\r
\r
### 3. 学员端 H5/小程序（lyedu-unix）\r
\r
- 使用 **HBuilderX** 打开 \`lyedu-unix\` 项目\r
- 运行到浏览器或微信开发者工具\r
- 技术栈：uni-app x，支持 H5、微信小程序等多端\r
\r
## 四、一键启动（Windows）\r
\r
项目提供一键开发脚本，详见 [scripts/README.md](https://gitee.com/quxiangshun/ly-edu/blob/main/scripts/README.md)：\r
\r
\`\`\`powershell\r
# 首次：复制 dev-config.example.yml 为 dev-config.yml，按需修改\r
cp scripts/dev/dev-config.example.yml scripts/dev/dev-config.yml\r
\r
# 启动\r
.\\scripts\\dev\\start.ps1\r
\r
# 停止\r
.\\scripts\\dev\\stop.ps1\r
\`\`\`\r
\r
\`dev-config.yml\` 中可配置：\r
\r
- \`start_lyedu_admin\`：是否启动管理后台\r
- \`start_lyedu_pc\`：是否启动 PC 端\r
- \`start_lyedu_api_python\`：是否启动 Python 后端（9700 端口）\r
- \`database\` / \`redis\`：MySQL、Redis 连接信息\r
\r
## 五、技术栈与架构\r
\r
### 公共技术\r
\r
- **Vue 3**：Composition API、\`<script setup>\`\r
- **TypeScript**：类型安全\r
- **Vite**：快速构建\r
- **Element Plus**：管理后台、PC 端 UI 组件\r
- **Pinia**：状态管理\r
- **Vue Router**：路由\r
- **Axios**：HTTP 请求\r
\r
### API 对接\r
\r
- 默认 API 地址：\`http://localhost:9700\`（Python 后端）或 \`http://localhost:8080\`（Java 后端）\r
- 认证：JWT，请求头 \`Authorization: Bearer <token>\`\r
- 具体接口见 [API 文档](/projects/lyedu/api-docs)\r
\r
## 六、目录结构（示例：lyedu-admin）\r
\r
\`\`\`\r
lyedu-admin/\r
├── src/\r
│   ├── api/          # 接口封装\r
│   ├── assets/       # 静态资源\r
│   ├── components/   # 公共组件\r
│   ├── views/        # 页面视图\r
│   ├── router/       # 路由配置\r
│   ├── store/        # Pinia 状态\r
│   ├── utils/        # 工具函数\r
│   └── main.ts\r
├── index.html\r
├── vite.config.ts\r
└── package.json\r
\`\`\`\r
\r
## 七、开发规范建议\r
\r
1. **命名**：组件 PascalCase，文件 kebab-case\r
2. **接口**：统一在 \`api/\` 下封装，避免在组件内直接写 \`axios\`\r
3. **类型**：为接口返回值定义 TypeScript 类型\r
4. **路由**：使用路由守卫做登录校验\r
5. **环境变量**：通过 \`.env\` / \`.env.dev\` 区分开发/生产 API 地址\r
\r
## 八、常见问题\r
\r
- **跨域**：开发时 Vite 代理到后端，见 \`vite.config.ts\` 的 \`proxy\`\r
- **端口占用**：\`start.ps1\` / \`stop.ps1\` 会管理 9700/9800/9900 端口\r
- **依赖安装失败**：可配置 \`NPM_REGISTRY\` 使用国内镜像\r
\r
## 相关链接\r
\r
- [后端开发指南](/projects/lyedu/backend-dev)\r
- [API 文档](/projects/lyedu/api-docs)\r
- [配置参考](/projects/lyedu/configuration)\r
- [项目仓库](https://gitee.com/quxiangshun/ly-edu)\r
`;export{n as default};
