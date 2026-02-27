const n=`# LyMom 快速开始

> 编辑日期：2026-02-26



## 环境准备

在部署 LyMom 之前，需要准备以下环境：

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

LyMom 提供了多种部署方式，以下是推荐的部署方法：

### 方式一：Docker Compose 快速部署

1. **克隆代码仓库**

\`\`\`bash
git clone https://github.com/quxiangshun/ly-factmesh-back.git
cd ly-factmesh-back
\`\`\`

2. **配置环境变量**

复制 \`.env.example\` 文件为 \`.env\`，并根据实际情况修改配置：

\`\`\`bash
cp .env.example .env
# 编辑 .env 文件，设置数据库密码等配置
\`\`\`

3. **启动服务**

\`\`\`bash
docker compose up -d
\`\`\`

4. **验证部署**

服务启动后，可以通过以下方式验证：

- 访问 API 文档：\`http://localhost:8080/api-docs\`
- 访问前端应用：\`http://localhost:80\`

### 方式二：Kubernetes 部署

对于生产环境，推荐使用 Kubernetes 进行部署。具体步骤请参考 [Kubernetes 部署指南](https://quxiangshun.github.io/ly-docs/projects/lymom/kubernetes-deployment.html)。

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

#### 2.2 设备接入配置

- 进入「设备管理」→「设备接入」
- 点击「添加设备」按钮
- 填写设备信息，包括设备名称、设备类型、通信协议等
- 配置设备连接参数
- 保存并启用设备

#### 2.3 生产参数配置

- 进入「生产管理」→「生产参数」
- 配置生产班次、工作时间等参数
- 保存配置

### 3. 基本操作

#### 3.1 生产计划管理

- 进入「生产管理」→「生产计划」
- 点击「新建计划」按钮
- 填写计划名称、产品信息、生产数量等
- 选择计划时间和生产线
- 保存计划

#### 3.2 工单管理

- 进入「生产管理」→「工单管理」
- 点击「新建工单」按钮
- 选择生产计划，填写工单信息
- 保存工单
- 点击「开始生产」按钮启动工单

#### 3.3 设备监控

- 进入「设备管理」→「设备监控」
- 在设备列表中查看设备状态
- 点击设备名称进入设备详情页
- 查看设备实时数据和历史趋势

#### 3.4 数据分析

- 进入「数据分析」→「生产报表」
- 选择报表类型和时间范围
- 查看生产数据统计和分析图表

## 常见问题

### 1. 设备连接失败

**可能原因**：
- 设备网络未连通
- 设备参数配置错误
- 防火墙阻止了通信

**解决方案**：
- 检查设备网络连接
- 验证设备参数配置
- 确保防火墙允许设备通信端口

### 2. 数据采集异常

**可能原因**：
- 设备通信中断
- 数据格式错误
- 系统资源不足

**解决方案**：
- 检查设备状态和连接
- 验证数据格式配置
- 增加系统资源（CPU/内存）

### 3. 系统运行缓慢

**可能原因**：
- 系统资源不足
- 数据库性能问题
- 网络延迟

**解决方案**：
- 增加系统资源
- 优化数据库配置
- 检查网络连接

## 技术支持

如果在使用过程中遇到问题，可以通过以下方式获取支持：

- **GitHub Issues**：在 [GitHub 仓库](https://github.com/quxiangshun/ly-factmesh-back) 提交 Issue
- **社区论坛**：加入 LyMom 社区论坛交流
- **文档中心**：查阅 [官方文档](https://quxiangshun.github.io/ly-docs/projects/lymom/)

## 升级指南

当有新版本发布时，可以通过以下步骤升级：

1. **备份数据**

\`\`\`bash
# 备份数据库
docker compose exec db pg_dump -U lymom lymom > backup.sql
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

4. **验证升级**

访问系统，确认所有功能正常运行。

## 最佳实践

### 1. 系统架构

- **开发环境**：单节点部署，所有服务运行在同一台机器
- **测试环境**：小规模集群，模拟生产环境配置
- **生产环境**：多节点部署，高可用配置

### 2. 数据管理

- 定期备份数据库
- 配置数据 retention 策略，避免数据量过大
- 使用监控工具监控数据增长趋势

### 3. 安全管理

- 定期更新系统密码
- 配置防火墙规则，限制访问范围
- 启用 HTTPS 加密通信
- 定期进行安全审计

### 4. 性能优化

- 根据设备数量和数据量调整系统资源
- 优化数据库查询和索引
- 使用缓存减少数据库负载
- 定期清理无用数据

## 相关链接

- [API 文档](https://quxiangshun.github.io/ly-docs/projects/lymom/api-docs.html)
- [前端开发指南](https://quxiangshun.github.io/ly-docs/projects/lymom/frontend-guide.html)
- [后端开发指南](https://quxiangshun.github.io/ly-docs/projects/lymom/backend-guide.html)
- [设备集成指南](https://quxiangshun.github.io/ly-docs/projects/lymom/device-integration.html)
- [故障排查指南](https://quxiangshun.github.io/ly-docs/projects/lymom/troubleshooting.html)`;export{n as default};
