const r=`# LyEdu 部署指南\r
\r
> 编辑日期：2026-02-26  \r
> 基于 [ly-edu](https://gitee.com/quxiangshun/ly-edu) 项目结构整理\r
\r
## 一、部署方式概览\r
\r
| 方式 | 适用场景 | 说明 |\r
|------|----------|------|\r
| Docker Compose | 快速部署、中小规模 | 单机多容器，当前默认使用 Java 后端 |\r
| Kubernetes | 生产、高可用 | 需自行编写 K8s 清单 |\r
| 手动部署 | 定制化强 | 按模块分别部署前后端与数据库 |\r
\r
## 二、Docker Compose 部署\r
\r
### 环境要求\r
\r
- Docker 20.10+\r
- Docker Compose 1.29+\r
- 可用内存 4GB+\r
\r
### 当前 Docker 方案（Java 后端）\r
\r
Docker 默认使用 **Java** 后端，需先本地构建 jar。\r
\r
#### 1. 构建 jar\r
\r
\`\`\`bash\r
cd lyedu-api\r
.\\build-api.ps1   # Windows\r
# 或 ./build-api.sh  # Linux / Mac\r
\`\`\`\r
\r
产物输出到 \`pkg/lyedu-api.jar\`。\r
\r
#### 2. 配置环境变量\r
\r
\`\`\`bash\r
cd scripts/docker\r
cp .env.example .env\r
\`\`\`\r
\r
编辑 \`.env\`，配置数据库密码、Redis、镜像源等。国内可配置：\r
\r
\`\`\`bash\r
DOCKER_REGISTRY=registry.cn-hangzhou.aliyuncs.com\r
NPM_REGISTRY=https://registry.npmmirror.com\r
\`\`\`\r
\r
#### 3. 构建与启动\r
\r
\`\`\`bash\r
cd scripts/docker\r
docker compose build api\r
docker compose up -d\r
\`\`\`\r
\r
#### 4. 访问地址\r
\r
- 管理后台：http://localhost:9900\r
- PC 端：http://localhost:9800\r
- API：http://localhost:9700（若使用 Python  compose）或 8080（Java）\r
\r
### 初始化与升级\r
\r
- **初始化数据**：首次部署后，按 README 执行初始化命令（如 Java：\`--spring.profiles.active=init\`）\r
- **数据库迁移**：Java 使用 Flyway 自动迁移；Python 需执行 \`alembic upgrade head\`\r
\r
## 三、生产部署\r
\r
### 1. 资源规划\r
\r
- **CPU**：建议 4 核+\r
- **内存**：8GB+，视并发调整\r
- **存储**：数据库 + 视频/文件，建议 50GB+\r
\r
### 2. 部署\r
\r
#### 2.1. 部署后端\r
- 安装MySQL数据库数据；视频、附件、图片存储到本地\r
- \r
- 创建\`/app/ly-edu\` 文件夹，拷贝\r
\r
\`\`\`caddyfile\r
# 全局配置\r
{\r
    # 关闭冗余日志，只保留警告及以上\r
    log {\r
        level warn\r
    }\r
    # 禁用自动HTTPS（避免Caddy自动监听443/80端口，彻底杜绝HTTP/HTTPS混淆）\r
    auto_https off\r
    # 关闭admin接口（减少端口占用，非必需）\r
    admin off\r
}\r
\r
# 配置1：ly-edu-admin 后台管理（9900端口，纯HTTP）\r
:9900 {\r
    # 显式绑定所有网卡（解决WARN提示）\r
    bind 0.0.0.0\r
    # 前端代码目录（确保路径正确）\r
    root * /app/ly-edu/lyedu-admin/dist\r
    # gzip压缩\r
    encode gzip\r
    # 静态文件服务\r
    file_server\r
    # 解决Vue/Router刷新404\r
    try_files {path} /index.html\r
    # 跨域配置\r
    header {\r
        Access-Control-Allow-Origin *\r
        Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS\r
        Access-Control-Allow-Headers Content-Type,Authorization\r
    }\r
}\r
\r
# 配置2：ly-edu-h5 移动端（9901端口，纯HTTP）\r
:9901 {\r
    bind 0.0.0.0\r
    root * /app/ly-edu/lyedu-h5\r
    encode gzip\r
    file_server\r
    try_files {path} /index.html\r
    header {\r
        Access-Control-Allow-Origin *\r
    }\r
}\r
\`\`\`\r
\r
- 使用 Nginx / Caddy 反向代理，配置 HTTPS\r
- 仅开放 80/443，后端端口不直接暴露\r
- 配置防火墙与安全组\r
\r
### 4. 备份\r
\r
- 定期备份 MySQL 数据\r
- 备份上传的文件目录\r
\r
## 四、Kubernetes 部署（规划）\r
\r
生产环境可选用 Kubernetes。需准备：\r
\r
- Deployment、Service、Ingress 等清单\r
- ConfigMap / Secret 管理配置\r
- 持久化卷（PVC）用于数据库与文件\r
\r
具体清单可参考项目 \`docs/\` 或社区示例，后续可补充到本文档。\r
\r
## 五、常见部署问题\r
\r
### 1. 端口冲突\r
\r
- 检查 9700、9800、9900、3306、6379 等端口占用\r
- 修改 \`docker-compose.yml\` 或 \`.env\` 中的端口映射\r
\r
### 2. 数据库连接失败\r
\r
- 确认 MySQL 已启动且可从容器内访问\r
- 检查 \`DATABASE_URL\` / \`application.yml\` 中的主机、端口、用户、密码\r
\r
### 3. 前端访问 404\r
\r
- 确认 Nginx/Caddy 配置了 SPA 的 \`try_files\` 或 \`fallback\`\r
- 检查 base URL 与 API 代理配置\r
\r
### 4. 镜像构建慢\r
\r
- 使用国内镜像源（\`DOCKER_REGISTRY\`、\`NPM_REGISTRY\`）\r
- 合理利用构建缓存\r
\r
## 六、升级流程\r
\r
1. **备份**：数据库、配置文件、上传文件\r
2. **拉取新代码**：\`git pull\`\r
3. **重新构建**：\`docker compose build\`\r
4. **执行迁移**：Java 自动；Python 需 \`alembic upgrade head\`\r
5. **重启服务**：\`docker compose up -d\`\r
6. **验证**：访问各端，检查功能正常\r
\r
## 相关链接\r
\r
- [快速开始](/projects/lyedu/quick-start)\r
- [配置参考](/projects/lyedu/configuration)\r
- [常见问题](/projects/lyedu/faq)\r
- [项目仓库](https://gitee.com/quxiangshun/ly-edu)\r
`;export{r as default};
