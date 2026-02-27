const r=`# LyEdu 配置参考\r
\r
> 编辑日期：2026-02-26  \r
> 基于 [ly-edu](https://gitee.com/quxiangshun/ly-edu) 项目结构整理\r
\r
## 一、配置概览\r
\r
LyEdu 的配置分为以下几类：\r
\r
| 类型 | 位置 | 说明 |\r
|------|------|------|\r
| 开发环境 | scripts/dev/dev-config.yml | 一键启动脚本使用的配置 |\r
| Python 后端 | lyedu-api-python/.env、.env.dev | 环境变量 |\r
| Java 后端 | lyedu-api/application.yml | Spring Boot 配置 |\r
| Docker 部署 | scripts/docker/.env | 镜像源、构建参数等 |\r
| 系统配置 | 管理后台「系统配置」 | 网站、播放器、学员端等运行时配置 |\r
\r
## 二、开发环境配置（dev-config.yml）\r
\r
**路径**：\`scripts/dev/dev-config.yml\`（从 \`dev-config.example.yml\` 复制）\r
\r
\`\`\`yaml\r
# 示例结构\r
database:\r
  host: localhost\r
  port: 3306\r
  user: root\r
  password: your_password\r
  name: lyedu\r
\r
redis:\r
  host: localhost\r
  port: 6379\r
\r
# 若本机未监听 MySQL 端口，是否自动启动 Docker MySQL+Redis\r
start_docker_mysql_redis: true\r
\r
# 是否启动各服务\r
start_lyedu_api_python: true\r
start_lyedu_admin: true\r
start_lyedu_pc: true\r
\`\`\`\r
\r
- \`database.port\` 可用于判断是否自动执行 \`docker compose\` 启动 MySQL+Redis\r
- 修改后需重新运行 \`.\\scripts\\dev\\start.ps1\`\r
\r
## 三、Python 后端配置（.env）\r
\r
**路径**：\`lyedu-api-python/.env\` 或 \`.env.dev\`\r
\r
\`\`\`bash\r
# 示例\r
ENV=dev\r
DATABASE_URL=mysql+aiomysql://user:password@localhost:3306/lyedu\r
REDIS_URL=redis://localhost:6379/0\r
\r
# JWT\r
SECRET_KEY=your-secret-key\r
\r
# Feishu（若启用）\r
FEISHU_APP_ID=your-app-id\r
FEISHU_APP_SECRET=your-app-secret\r
\`\`\`\r
\r
- \`DATABASE_URL\`：Alembic 与 SQLAlchemy 使用\r
- Java 使用 \`application.yml\`，配置格式不同，但含义对应\r
\r
## 四、Java 后端配置（application.yml）\r
\r
**路径**：\`lyedu-api/src/main/resources/application.yml\`\r
\r
\`\`\`yaml\r
spring:\r
  datasource:\r
    url: jdbc:mysql://localhost:3306/lyedu\r
    username: root\r
    password: your_password\r
  redis:\r
    host: localhost\r
    port: 6379\r
\`\`\`\r
\r
按 profile（dev / prod）可拆分多份配置文件。\r
\r
## 五、Docker 部署配置（.env）\r
\r
**路径**：\`scripts/docker/.env\`（从 \`.env.example\` 复制）\r
\r
\`\`\`bash\r
# 镜像源（国内加速）\r
DOCKER_REGISTRY=registry.cn-hangzhou.aliyuncs.com\r
NPM_REGISTRY=https://registry.npmmirror.com\r
\`\`\`\r
\r
用于 \`docker compose build\` 时的拉取与构建加速。\r
\r
## 六、系统级配置（管理后台）\r
\r
在「系统管理」→「系统配置」中可配置：\r
\r
### 1. 网站配置\r
\r
- 网站名称、Logo、版权信息等\r
- 影响 PC 端、学员端展示\r
\r
### 2. 播放器配置\r
\r
- **防拖拽**：是否禁止视频拖拽\r
- **禁倍速**：是否禁止调整播放倍速\r
- 适用于 PC 端与 H5 播放器\r
\r
### 3. 学员端配置\r
\r
- 学员端相关展示与行为\r
- 与 lyedu-unix 前端配合使用\r
\r
### 4. 第三方配置\r
\r
- **飞书**：App ID、App Secret、回调地址\r
- **钉钉 / 企微**：预留，可按需扩展\r
\r
## 七、环境变量一览（Python）\r
\r
| 变量 | 说明 | 示例 |\r
|------|------|------|\r
| ENV | 环境 | dev / prod |\r
| DATABASE_URL | 数据库连接 | mysql+aiomysql://... |\r
| REDIS_URL | Redis 连接 | redis://localhost:6379/0 |\r
| SECRET_KEY | JWT 密钥 | 随机长字符串 |\r
| FEISHU_APP_ID | 飞书 App ID | - |\r
| FEISHU_APP_SECRET | 飞书 App Secret | - |\r
\r
## 八、配置最佳实践\r
\r
1. **敏感信息**：密码、密钥等使用环境变量，勿提交代码库\r
2. **多环境**：dev/test/prod 使用不同配置文件或 env\r
3. **默认值**：提供 \`.env.example\` / \`dev-config.example.yml\` 作为模板\r
4. **系统配置**：运行时修改的配置走管理后台，避免改代码重启\r
\r
## 相关链接\r
\r
- [部署指南](/projects/lyedu/deployment)\r
- [API 文档](/projects/lyedu/api-docs)\r
- [集成说明](/projects/lyedu/integrations)\r
- [项目仓库](https://gitee.com/quxiangshun/ly-edu)\r
`;export{r as default};
