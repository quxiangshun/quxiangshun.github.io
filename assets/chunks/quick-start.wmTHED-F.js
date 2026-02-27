const n=`# LyEdu 快速开始

> 编辑日期：2026-02-26



## 环境准备

在部署 LyEdu 之前，需要准备以下环境：

### 硬件要求
- **CPU**：至少 4 核
- **内存**：至少 8GB
- **存储**：至少 50GB 可用空间
- **网络**：稳定的网络连接

### 软件要求
- **操作系统**：Linux (推荐 Ubuntu 20.04+) 或 Windows Server
- **Docker**：20.10.0 或更高版本
- **Docker Compose**：1.29.0 或更高版本
- **Git**：2.20.0 或更高版本

## 部署方式

LyEdu 提供了多种部署方式，以下是推荐的部署方法：

### 方式一：Docker Compose 快速部署

1. **克隆代码仓库**

\`\`\`bash
git clone https://github.com/quxiangshun/ly-edu.git
cd ly-edu
\`\`\`

2. **配置环境变量**

复制 \`.env.example\` 文件为 \`.env\`，并根据实际情况修改配置：

\`\`\`bash
cp .env.example .env
# 编辑 .env 文件，设置数据库密码、Feishu 应用信息等配置
\`\`\`

3. **启动服务**

\`\`\`bash
docker compose up -d
\`\`\`

4. **初始化数据**

服务启动后，需要初始化数据库和默认数据：

\`\`\`bash
docker compose exec api java -jar app.jar --spring.profiles.active=init
\`\`\`

5. **验证部署**

服务启动后，可以通过以下方式验证：

- 访问 API 文档：\`http://localhost:8080/api-docs\`
- 访问前端应用：\`http://localhost:80\`
- 访问移动端应用：通过小程序或 APP 访问

### 方式二：Kubernetes 部署

对于生产环境，推荐使用 Kubernetes 进行部署。具体步骤请参考 [Kubernetes 部署指南](https://quxiangshun.github.io/ly-docs/projects/lyedu/kubernetes-deployment.html)。

## 首次使用

### 1. 登录系统

部署完成后，打开浏览器访问前端应用地址（默认为 \`http://localhost\`），使用默认账号登录：

- **用户名**：admin
- **密码**：123456

### 2. 系统配置

首次登录后，需要进行以下配置：

#### 2.1 企业信息配置

- 进入「系统管理」→「企业信息」
- 填写企业名称、联系方式等基本信息
- 保存配置

#### 2.2 Feishu 集成配置

- 进入「系统管理」→「Feishu 集成」
- 填写 Feishu 应用的 App ID 和 App Secret
- 配置回调地址和权限范围
- 保存配置并启用集成

#### 2.3 课程分类配置

- 进入「课程管理」→「分类管理」
- 点击「添加分类」按钮
- 填写分类名称和描述
- 保存分类

### 3. 基本操作

#### 3.1 课程管理

- 进入「课程管理」→「课程列表」
- 点击「新建课程」按钮
- 填写课程名称、描述、封面等信息
- 选择课程分类和教师
- 保存课程
- 点击「添加章节」按钮，为课程添加章节和视频

#### 3.2 用户管理

- 进入「系统管理」→「用户管理」
- 点击「添加用户」按钮
- 填写用户基本信息
- 选择用户角色和部门
- 保存用户

#### 3.3 学习跟踪

- 进入「学习管理」→「学习跟踪」
- 选择用户和课程，查看学习进度
- 点击「查看详情」按钮，查看具体章节的学习情况

#### 3.4 考试管理

- 进入「考试管理」→「题库管理」
- 点击「添加题目」按钮，添加考试题目
- 进入「考试管理」→「考试列表」
- 点击「新建考试」按钮，创建考试
- 选择题目和设置考试规则
- 保存考试并发布

## 常见问题

### 1. Feishu 登录失败

**可能原因**：
- Feishu 应用配置错误
- 回调地址设置不正确
- 网络连接问题

**解决方案**：
- 检查 Feishu 应用的 App ID 和 App Secret 是否正确
- 确保回调地址与 Feishu 应用中设置的一致
- 检查网络连接是否正常

### 2. 视频无法播放

**可能原因**：
- 视频文件未正确上传
- 视频格式不支持
- 网络带宽不足

**解决方案**：
- 检查视频文件是否正确上传
- 确保视频格式为 MP4、WebM 等支持的格式
- 提高网络带宽或使用 CDN 加速

### 3. 系统运行缓慢

**可能原因**：
- 系统资源不足
- 数据库性能问题
- 缓存配置不当

**解决方案**：
- 增加系统资源（CPU/内存）
- 优化数据库配置和查询
- 调整 Redis 缓存配置

## 技术支持

如果在使用过程中遇到问题，可以通过以下方式获取支持：

- **GitHub Issues**：在 [GitHub 仓库](https://github.com/quxiangshun/ly-edu) 提交 Issue
- **社区论坛**：加入 LyEdu 社区论坛交流
- **文档中心**：查阅 [官方文档](https://quxiangshun.github.io/ly-docs/projects/lyedu/)

## 升级指南

当有新版本发布时，可以通过以下步骤升级：

1. **备份数据**

\`\`\`bash
# 备份数据库
docker compose exec db pg_dump -U lyedu lyedu > backup.sql
\`\`\`

2. **更新代码**

\`\`\`bash
git pull
\`\`\`

3. **重新构建和启动服务**

\`\`\`bash
docker compose down
docker compose build
docker compose up -d
\`\`\`

4. **执行数据库迁移**

\`\`\`bash
docker compose exec api java -jar app.jar --spring.profiles.active=migrate
\`\`\`

5. **验证升级**

访问系统，确认所有功能正常运行。

## 最佳实践

### 1. 系统架构

- **开发环境**：单节点部署，所有服务运行在同一台机器
- **测试环境**：小规模集群，模拟生产环境配置
- **生产环境**：多节点部署，高可用配置

### 2. 数据管理

- 定期备份数据库和文件存储
- 配置数据 retention 策略，避免数据量过大
- 使用监控工具监控数据增长趋势

### 3. 安全管理

- 定期更新系统密码和 Feishu 应用密钥
- 配置防火墙规则，限制访问范围
- 启用 HTTPS 加密通信
- 定期进行安全审计

### 4. 性能优化

- 根据用户量和课程数量调整系统资源
- 优化数据库查询和索引
- 使用缓存减少数据库负载
- 对视频资源进行转码和压缩，提高播放速度

## 相关链接

- [API 文档](https://quxiangshun.github.io/ly-docs/projects/lyedu/api-docs.html)
- [前端开发指南](/projects/lyedu/frontend-dev)
- [后端开发指南](/projects/lyedu/backend-dev)
- [Feishu 集成指南](https://quxiangshun.github.io/ly-docs/projects/lyedu/feishu-integration.html)
- [故障排查指南](https://quxiangshun.github.io/ly-docs/projects/lyedu/troubleshooting.html)`;export{n as default};
