const n=`# LyEdu 后端开发指南\r
\r
> 编辑日期：2026-02-26  \r
> 基于 [ly-edu](https://gitee.com/quxiangshun/ly-edu) 项目结构整理\r
\r
## 一、后端项目概览\r
\r
LyEdu 提供**双后端**架构，可按团队技术栈任选其一或对照使用：\r
\r
| 实现 | 目录 | 技术栈 | 端口 | 说明 |\r
|------|------|--------|------|------|\r
| Java | lyedu-api | Spring Boot 4、JDK 25、MyBatis Plus、MySQL、Flyway | 8080 | 传统 Java 技术栈 |\r
| Python | lyedu-api-python | FastAPI、SQLAlchemy、MySQL、Alembic | 9700 | 推荐，更新更活跃 |\r
\r
接口设计保持一致，数据库共用 \`db/\` 下的迁移脚本。\r
\r
## 二、开发环境准备\r
\r
### 公共依赖\r
\r
- **MySQL**：8.0+\r
- **Redis**：可选，用于会话/缓存\r
- **Docker & Docker Compose**：可选，快速启动 MySQL + Redis\r
\r
### 启动 MySQL + Redis（Docker）\r
\r
\`\`\`bash\r
docker compose -f scripts/docker/compose-mysql-redis.yml up -d\r
\`\`\`\r
\r
若使用自有 MySQL/Redis，可跳过此步，直接在配置中填写连接信息。\r
\r
## 三、Python 后端（推荐）\r
\r
### 环境要求\r
\r
- Python 3.10+\r
- 虚拟环境（venv）\r
\r
### 启动步骤\r
\r
\`\`\`bash\r
cd lyedu-api-python\r
\r
# 创建虚拟环境\r
python -m venv .venv\r
\r
# 激活（Windows）\r
.\\.venv\\Scripts\\activate\r
\r
# 激活（Linux / Mac）\r
# source .venv/bin/activate\r
\r
# 安装依赖\r
pip install -r requirements.txt\r
\r
# 复制环境变量\r
cp .env.example .env.dev   # 或 .env\r
\r
# 修改 .env.dev 中的 database / redis 等配置\r
\r
# 数据库迁移（首次或 schema 变更后）\r
alembic -c alembic.ini upgrade head\r
\r
# 启动服务\r
ENV=dev uvicorn main:app --reload --host 0.0.0.0 --port 9700\r
\`\`\`\r
\r
- **API 文档**：http://localhost:9700/api-docs\r
- **数据库配置**：\`database.url\` 等，见 \`configuration.md\`\r
\r
### 一键启动\r
\r
使用项目脚本（会先迁移再启动）：\r
\r
\`\`\`powershell\r
.\\scripts\\dev\\start.ps1\r
\`\`\`\r
\r
在 \`scripts/dev/dev-config.yml\` 中配置 \`start_lyedu_api_python: true\` 及数据库连接。\r
\r
## 四、Java 后端\r
\r
### 环境要求\r
\r
- JDK 25\r
- Gradle（项目含 Wrapper）\r
\r
### 构建与启动\r
\r
\`\`\`bash\r
cd lyedu-api\r
\r
# 初始化 Gradle Wrapper（首次）\r
.\\init-gradle.ps1   # Windows\r
# 或手动: gradle wrapper\r
\r
# 构建 jar\r
.\\build-api.ps1     # Windows\r
# 或 ./build-api.sh # Linux / Mac\r
# 或 ./gradlew bootJar\r
\r
# jar 输出到 pkg/lyedu-api.jar\r
\`\`\`\r
\r
启动方式：\r
\r
- **IDE**：运行 \`Application\` 主类，\`--spring.profiles.active=dev\`\r
- **命令行**：\`java -jar pkg/lyedu-api.jar --spring.profiles.active=dev\`\r
- **Docker**：见 \`deployment.md\`\r
\r
数据库配置在 \`application.yml\` 中。\r
\r
## 五、数据库与迁移\r
\r
### 统一迁移目录\r
\r
- **Java / Flyway**：\`db/flyway/\`\r
- **Python / Alembic**：\`db/alembic/\`\r
\r
详细说明见 [db/README.md](https://gitee.com/quxiangshun/ly-edu/blob/main/db/README.md)。\r
\r
### Python 迁移命令\r
\r
\`\`\`bash\r
cd lyedu-api-python\r
\r
# 升级到最新\r
alembic -c alembic.ini upgrade head\r
\r
# 生成迁移\r
alembic -c alembic.ini revision --autogenerate -m "描述"\r
\r
# 回滚\r
alembic -c alembic.ini downgrade -1\r
\`\`\`\r
\r
### Java 迁移\r
\r
Flyway 随应用启动自动执行，只需保证 \`db/flyway/\` 下脚本符合规范。\r
\r
## 六、项目结构（Python 示例）\r
\r
\`\`\`\r
lyedu-api-python/\r
├── main.py           # FastAPI 入口\r
├── alembic.ini       # Alembic 配置\r
├── requirements.txt\r
├── .env.example\r
├── app/\r
│   ├── api/          # 路由\r
│   ├── core/         # 配置、安全\r
│   ├── models/       # ORM 模型\r
│   ├── schemas/      # Pydantic 模型\r
│   └── services/     # 业务逻辑\r
└── alembic/\r
    └── versions/\r
\`\`\`\r
\r
## 七、认证与授权\r
\r
- **JWT**：登录后返回 token，请求头 \`Authorization: Bearer <token>\`\r
- **飞书登录**：OAuth2 流程，回调后生成 JWT\r
- **权限**：基于角色（RBAC），接口有权限注解/依赖\r
\r
## 八、开发建议\r
\r
1. **环境变量**：敏感信息放 \`.env\`，勿提交仓库\r
2. **迁移**：改表结构先写迁移，再改代码\r
3. **接口**：与前端约定路径、请求/响应格式，可参考 Swagger\r
4. **日志**：统一使用 logging，区分 dev/prod 级别\r
\r
## 相关链接\r
\r
- [前端开发指南](/projects/lyedu/frontend-dev)\r
- [API 文档](/projects/lyedu/api-docs)\r
- [配置参考](/projects/lyedu/configuration)\r
- [部署指南](/projects/lyedu/deployment)\r
- [项目仓库](https://gitee.com/quxiangshun/ly-edu)\r
`;export{n as default};
