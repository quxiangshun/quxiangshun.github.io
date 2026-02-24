const n=`# 开发环境搭建

> 编辑日期：2024-10-14



## 环境准备

在开始开发 Ly 系列项目之前，需要准备以下环境：

### 1. 基本工具

| 工具 | 版本 | 用途 | 下载链接 |
|------|------|------|----------|
| Git | 2.20.0+ | 版本控制 | [Git 官网](https://git-scm.com/downloads) |
| Node.js | 18.0.0+ | 前端开发 | [Node.js 官网](https://nodejs.org/en/download/) |
| npm | 9.0.0+ | 包管理 | 随 Node.js 安装 |
| Java | 17.0.0+ | 后端开发 | [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) 或 [OpenJDK](https://openjdk.org/) |
| Maven | 3.8.0+ | Java 项目构建 | [Maven 官网](https://maven.apache.org/download.cgi) |
| Python | 3.9.0+ | 后端开发（LyMom） | [Python 官网](https://www.python.org/downloads/) |
| pip | 20.0.0+ | Python 包管理 | 随 Python 安装 |
| Docker | 20.10.0+ | 容器化 | [Docker 官网](https://www.docker.com/get-started) |
| Docker Compose | 1.29.0+ | 多容器编排 | [Docker Compose 官网](https://docs.docker.com/compose/install/) |

### 2. 开发 IDE

推荐使用以下 IDE：

- **前端**：[Visual Studio Code](https://code.visualstudio.com/) + 相关插件
- **后端**：[IntelliJ IDEA](https://www.jetbrains.com/idea/) 或 [Eclipse](https://www.eclipse.org/downloads/)

## LyEdu 开发环境搭建

### 1. 克隆代码

\`\`\`bash
git clone https://github.com/quxiangshun/ly-edu.git
cd ly-edu
\`\`\`

### 2. 前端环境搭建

#### 2.1 PC 端

\`\`\`bash
cd lyedu-pc
npm install
npm run dev
\`\`\`

#### 2.2 移动端

\`\`\`bash
cd lyedu-unix
npm install
npm run dev:mp-weixin # 微信小程序开发
# 或 npm run dev:h5 # H5 开发
# 或 npm run dev:app-plus # APP 开发
\`\`\`

### 3. 后端环境搭建

#### 3.1 Java API

\`\`\`bash
cd lyedu-api
mvn clean install
mvn spring-boot:run -Dspring.profiles.active=dev
\`\`\`

#### 3.2 Python API

\`\`\`bash
cd lyedu-api-python
# 创建虚拟环境
python -m venv .venv
# 激活虚拟环境
# Windows: .venv\\Scripts\\activate
# Linux/Mac: source .venv/bin/activate
# 安装依赖
pip install -r requirements.txt
# 运行服务
python main.py
\`\`\`

### 4. 数据库配置

#### 4.1 PostgreSQL

\`\`\`bash
# 使用 Docker 启动 PostgreSQL
docker run --name postgres-lyedu -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=lyedu -p 5432:5432 -d postgres:15
\`\`\`

#### 4.2 Redis

\`\`\`bash
# 使用 Docker 启动 Redis
docker run --name redis-lyedu -p 6379:6379 -d redis:7
\`\`\`

### 5. 使用 Docker Compose 快速启动

\`\`\`bash
# 在项目根目录执行
docker compose up -d
\`\`\`

## LyMom 开发环境搭建

### 1. 克隆代码

\`\`\`bash
git clone https://github.com/quxiangshun/ly-factmesh-back.git
cd ly-factmesh-back
\`\`\`

### 2. 前端环境搭建

\`\`\`bash
cd lymom-frontend
npm install
npm run dev
\`\`\`

### 3. 后端环境搭建

#### 3.1 Java API

\`\`\`bash
cd lymom-api
mvn clean install
mvn spring-boot:run -Dspring.profiles.active=dev
\`\`\`

#### 3.2 Python API

\`\`\`bash
cd lymom-api-python
# 创建虚拟环境
python -m venv .venv
# 激活虚拟环境
# Windows: .venv\\Scripts\\activate
# Linux/Mac: source .venv/bin/activate
# 安装依赖
pip install -r requirements.txt
# 运行服务
python main.py
\`\`\`

### 4. 数据库配置

#### 4.1 PostgreSQL

\`\`\`bash
# 使用 Docker 启动 PostgreSQL
docker run --name postgres-lymom -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=lymom -p 5433:5432 -d postgres:15
\`\`\`

#### 4.2 Redis

\`\`\`bash
# 使用 Docker 启动 Redis
docker run --name redis-lymom -p 6380:6379 -d redis:7
\`\`\`

### 5. 使用 Docker Compose 快速启动

\`\`\`bash
# 在项目根目录执行
docker compose up -d
\`\`\`

## 开发文档环境搭建

### 1. 克隆代码

\`\`\`bash
git clone https://github.com/quxiangshun/ly-docs.git
cd ly-docs
\`\`\`

### 2. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 3. 启动开发服务器

\`\`\`bash
npm run docs:dev
\`\`\`

### 4. 构建生产版本

\`\`\`bash
npm run docs:build
\`\`\`

## 常见问题

### 1. 端口冲突

**解决方案**：修改配置文件中的端口号，或停止占用端口的其他服务。

### 2. 依赖安装失败

**解决方案**：
- 检查网络连接
- 尝试使用镜像源，如 npm 使用淘宝镜像：\`npm config set registry https://registry.npmmirror.com\`
- 清理缓存后重新安装：\`npm cache clean --force && npm install\`

### 3. 数据库连接失败

**解决方案**：
- 检查数据库服务是否启动
- 验证数据库连接参数是否正确
- 确保数据库用户有足够的权限

### 4. Docker 相关问题

**解决方案**：
- 检查 Docker 服务是否启动
- 确保 Docker 版本符合要求
- 清理 Docker 缓存：\`docker system prune -a\`

## 开发规范

### 1. 代码规范

- **前端**：遵循 [Vue 3 风格指南](https://vuejs.org/style-guide/) 和 [TypeScript 规范](https://typescriptlang.org/docs/handbook/intro.html)
- **后端**：遵循 [Java 编码规范](https://google.github.io/styleguide/javaguide.html) 或 [Python PEP 8](https://peps.python.org/pep-0008/)

### 2. 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范：

\`\`\`
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
\`\`\`

常见类型：
- \`feat\`：新功能
- \`fix\`：修复 bug
- \`docs\`：文档更新
- \`style\`：代码风格调整
- \`refactor\`：代码重构
- \`test\`：测试相关
- \`chore\`：构建、依赖等调整

### 3. 分支管理

- \`main\`：主分支，用于发布生产版本
- \`develop\`：开发分支，用于集成开发
- \`feature/xxx\`：特性分支，用于开发新功能
- \`fix/xxx\`：修复分支，用于修复 bug

## 开发工具推荐

### 1. Visual Studio Code 插件

- **Volar**：Vue 3 开发工具
- **TypeScript Vue Plugin (Volar)**：TypeScript 支持
- **ESLint**：代码质量检查
- **Prettier**：代码格式化
- **GitLens**：Git 增强工具
- **Docker**：Docker 集成

### 2. IntelliJ IDEA 插件

- **Lombok**：简化 Java 代码
- **MyBatisX**：MyBatis 增强工具
- **Spring Boot Assistant**：Spring Boot 辅助工具
- **Database Navigator**：数据库导航
- **Git Integration**：Git 集成

## 相关链接

- [LyEdu 快速开始](/lyedu/quick-start)
- [LyMom 快速开始](/lymom/quick-start)`;export{n as default};
