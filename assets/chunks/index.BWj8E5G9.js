const n=`---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
lastUpdated: 2024-10-14

hero:
  name: "Ly 开源项目"
  text: "以爱之名，为技术赋能"
  tagline: 专注于教育和制造业数字化转型的开源解决方案
  actions:
    - theme: brand
      text: LyEdu 企业培训系统
      link: /lyedu/introduction
    - theme: alt
      text: LyMom 制造业运营管理系统
      link: /lymom/introduction

features:
  - title: LyEdu 企业培训系统
    details: 轻量化教育类系统，支持在线学习、课程管理、考试中心、证书系统等功能，一键部署私有化培训平台
  - title: LyMom 制造业运营管理系统
    details: 基于 DDD 架构的现代化 MOM 系统，支持设备管理、生产执行、仓储管理、质量管理等全流程
  - title: 技术创新
    details: 采用现代技术栈，双后端架构，支持微服务部署，为不同场景提供灵活的技术解决方案
  - title: 用户友好
    details: 现代化 UI 设计，多端支持，统一入口，提供良好的用户体验
  - title: 安全可靠
    details: 视频私有化存储、JWT 认证、飞书集成登录，确保系统安全
  - title: 开源精神
    details: 100% 开源，欢迎社区贡献，共同推进数字化转型
---

## 项目随笔

### 关于 Ly 系列开源项目

Ly 系列开源项目始于对教育和制造业数字化转型的思考。作为一名技术爱好者和父亲，我希望通过技术的力量，为教育和制造业的发展贡献自己的一份力量。

Ly 这个名字来源于我的女儿，象征着希望和未来。我希望通过这些开源项目，不仅能够解决实际业务问题，也能够为技术社区提供有价值的参考。

### 项目愿景

我们的愿景是打造一系列高质量的开源解决方案，帮助企业和组织实现数字化转型：

- **LyEdu**：让企业培训变得简单高效，为员工成长提供有力支持
- **LyMom**：让制造业运营管理更加智能，提升生产效率和管理水平
- **未来项目**：持续探索其他领域的数字化解决方案

### 技术理念

在技术选型和架构设计上，我们坚持以下原则：

1. **技术多样性**：提供多种技术栈选择，满足不同团队的需求
2. **架构合理性**：采用领域驱动设计，确保系统的可维护性和扩展性
3. **用户体验优先**：注重界面设计和交互体验，让系统易于使用
4. **开源共享**：通过开源方式，与社区共同成长

### 近期进展

- **LyEdu**：已实现飞书登录集成和通讯录同步，支持多端访问
- **LyMom**：完成核心模块开发，支持设备管理和生产执行
- **文档完善**：持续更新项目文档，为用户提供详细的使用指南

### 未来规划

- 增强 LyEdu 的智能化学习推荐功能
- 扩展 LyMom 的工业协议支持
- 探索两个项目的集成可能性
- 构建更加活跃的开源社区

## 项目简介

### LyEdu

LyEdu 是一个 100% 开源的企业培训系统，界面美观，操作简单，一键部署您的私有化培训平台！

**核心功能**：
- 部门/学员管理
- 在线视频学习与进度追踪
- 课程评论与互动
- 考试中心与证书系统
- 知识中心与文档管理
- 任务系统与积分排行
- 飞书集成登录与通讯录同步

### LyMom

LyMom（LY-FactMesh）是一个面向制造业的现代化运营管理系统(MOM)，采用 DDD 架构设计，实现了业务与技术的解耦，支持微服务部署。

**核心优势**：
- DDD 架构设计，业务与技术解耦
- 微服务架构，支持模块化部署
- 强大的设备管理，支持多种工业协议
- 全面的生产管理，覆盖生产全流程
- 智能仓储管理，优化物料流转
- 严格的质量管理，确保产品质量

## 技术架构

### LyEdu 技术栈

- **后端**：SpringBoot 4 + JDK 25 / FastAPI + Python 3
- **前端**：Vue 3 + TypeScript + Element Plus / uni-app x
- **数据库**：MySQL 8.0+
- **部署**：Docker 支持

### LyMom 技术栈

- **后端**：Spring Boot 3.5.3 + Java 24
- **数据库**：PostgreSQL
- **消息队列**：EMQX/MQTT
- **工业协议**：OPC UA/Modbus/TCP
- **缓存**：Redis
- **监控**：Prometheus/Grafana

## 如何参与

我们欢迎社区的参与和贡献：

1. **Star 项目**：如果您觉得项目有价值，欢迎给我们点个 Star
2. **提交 Issue**：如果您发现问题或有建议，欢迎提交 Issue
3. **贡献代码**：如果您有兴趣参与开发，欢迎提交 Pull Request
4. **分享项目**：如果您觉得项目对他人有帮助，欢迎分享给更多人

## 联系我们

- **GitHub**：[https://github.com/quxiangshun](https://github.com/quxiangshun)
- **Gitee**：[https://gitee.com/quxiangshun](https://gitee.com/quxiangshun)
- **GitCode**：[https://gitcode.com/quxiangshun](https://gitcode.com/quxiangshun)
- **邮箱**：735591110@qq.com | quxiangshun@gmail.com

---

以爱之名，为技术赋能。我们相信，通过开源的力量，能够让技术更加普惠，让数字化转型更加简单。

`;export{n as default};
