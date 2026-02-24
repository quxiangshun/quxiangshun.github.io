const n=`# 技术栈总览

> 编辑日期：2024-10-14



## Ly 系列项目技术架构

Ly 系列项目采用现代化的技术栈，以下是各项目的技术架构总览：

## 1. 前端技术栈

### 通用前端技术

| 技术 | 版本 | 用途 | 适用项目 |
|------|------|------|----------|
| Vue 3 | 最新 | 前端框架 | LyEdu、LyMom |
| TypeScript | 最新 | 类型安全 | LyEdu、LyMom |
| Element Plus | 最新 | UI 组件库 | LyEdu、LyMom |
| Pinia | 最新 | 状态管理 | LyEdu、LyMom |
| Vue Router | 最新 | 路由管理 | LyEdu、LyMom |
| Vite | 最新 | 构建工具 | LyEdu、LyMom |
| Axios | 最新 | HTTP 客户端 | LyEdu、LyMom |
| ECharts | 最新 | 图表库 | LyEdu、LyMom |

### 移动端技术

| 技术 | 版本 | 用途 | 适用项目 |
|------|------|------|----------|
| uni-app x | 最新 | 跨平台应用框架 | LyEdu |

## 2. 后端技术栈

### 核心后端技术

| 技术 | 版本 | 用途 | 适用项目 |
|------|------|------|----------|
| Spring Boot | 4.0+ | Java 后端框架 | LyEdu、LyMom |
| Java | 17+ | 后端开发语言 | LyEdu、LyMom |
| FastAPI | 最新 | Python 后端框架 | LyMom |
| Python | 3.9+ | 后端开发语言 | LyMom |
| PostgreSQL | 15+ | 关系型数据库 | LyEdu、LyMom |
| Redis | 7.0+ | 缓存、会话管理 | LyEdu、LyMom |
| MyBatis-Plus | 最新 | ORM 框架 | LyEdu |
| JWT | 最新 | 认证机制 | LyEdu、LyMom |

### 工业协议支持

| 技术 | 版本 | 用途 | 适用项目 |
|------|------|------|----------|
| OPC UA | 最新 | 工业通信协议 | LyMom |
| Modbus TCP | 最新 | 工业通信协议 | LyMom |
| MQTT | 最新 | 物联网通信协议 | LyMom |

## 3. 部署与运维

### 容器化与编排

| 技术 | 版本 | 用途 | 适用项目 |
|------|------|------|----------|
| Docker | 20.10+ | 容器化 | LyEdu、LyMom |
| Docker Compose | 1.29+ | 多容器编排 | LyEdu、LyMom |
| Kubernetes | 1.24+ | 容器编排平台 | LyEdu、LyMom（生产环境） |

### CI/CD 与监控

| 技术 | 版本 | 用途 | 适用项目 |
|------|------|------|----------|
| GitHub Actions | 最新 | CI/CD 流程 | LyEdu、LyMom |
| Prometheus | 最新 | 监控系统 | LyEdu、LyMom |
| Grafana | 最新 | 监控可视化 | LyEdu、LyMom |

## 4. 集成与第三方服务

### 身份认证

| 技术 | 版本 | 用途 | 适用项目 |
|------|------|------|----------|
| Feishu OAuth | 最新 | 第三方登录 | LyEdu |
| JWT | 最新 | 无状态认证 | LyEdu、LyMom |

### 文件存储

| 技术 | 版本 | 用途 | 适用项目 |
|------|------|------|----------|
| 本地存储 | - | 文件存储 | LyEdu、LyMom |
| 对象存储 | - | 大容量文件存储 | LyEdu、LyMom |
| Feishu 云文档 | 最新 | 文档存储与分享 | LyEdu |

## 5. 技术选型原则

Ly 系列项目的技术选型遵循以下原则：

1. **现代化**：采用当前主流的技术栈，确保项目具有良好的可维护性和扩展性
2. **稳定性**：优先选择成熟、稳定的技术，确保项目的可靠性
3. **性能**：考虑技术的性能表现，确保系统能够高效运行
4. **生态**：选择具有丰富生态的技术，便于开发和问题解决
5. **社区支持**：优先选择社区活跃的技术，便于获取支持和更新

## 6. 技术演进路线

### 前端技术演进

- **当前**：Vue 3 + TypeScript + Element Plus
- **未来**：
  - 采用 Vite 5 提升构建性能
  - 引入 Vue 3 Composition API 的最佳实践
  - 探索 Web Components 技术

### 后端技术演进

- **当前**：Spring Boot 4 + Java 17 / FastAPI + Python 3.9+
- **未来**：
  - 引入 GraalVM 提升 Java 应用性能
  - 探索 Spring Boot 5 的新特性
  - 加强微服务架构的实践

### 部署与运维演进

- **当前**：Docker + Docker Compose
- **未来**：
  - 完善 Kubernetes 部署方案
  - 引入 Service Mesh 技术
  - 加强 DevOps 实践

## 7. 技术文档

- [LyEdu 技术栈](/lyedu/tech-stack)
- [LyMom 技术栈](/lymom/tech-stack)`;export{n as default};
