const n=`---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
lastUpdated: 2026-02-26

hero:
  name: "Ly 开源项目"
  text: "以爱之名，为技术赋能"
  tagline: 专注于教育和制造业数字化转型的开源解决方案
  actions:
    - theme: brand
      text: OpenClaw 一键部署
      link: "#openclaw"
    - theme: alt
      text: LyEdu 企业培训系统
      link: /projects/lyedu/introduction
    - theme: alt
      text: LyMom 制造业运营管理系统
      link: /projects/lymom/introduction

features:
  - title: OpenClaw 一键部署
    details: 自研安装包，简化 OpenClaw 部署流程，告别手动配置报错，技术小白 1 分钟开箱即用
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

## OpenClaw 一键部署 {#openclaw}

<div class="openclaw-section">

自研安装包，简化 OpenClaw 部署流程，技术小白的福音。1 分钟开箱即用，告别手动配置报错。

<div class="openclaw-cards" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1.5rem 0;">

<div class="openclaw-card">
**一键安装 · 开箱即用**
- 官方版 OpenClaw，同步最新更新
- 手动配置报错，一键解决
- 迎合大众与最新趋势
</div>

<div class="openclaw-card">
**简化部署 · 告别繁琐**
- 无需逐项配置，安装即运行
- 常见部署问题，内置自动处理
- 降低使用门槛，人人可上手
</div>

<div class="openclaw-card">
**多平台连接 · 随时随地**
- 钉钉、飞书、微信、Telegram
- 手机即可操作电脑
- 适配主流办公协作工具
</div>

<div class="openclaw-card">
**AI 助手 · 高效赋能**
- 一句话完成复杂任务
- 丰富技能生态，覆盖办公场景
- 本地记忆系统，越用越懂你
</div>

</div>

<p class="openclaw-cta-wrap" style="text-align: center; margin: 1.5rem 0;">
  <a href="http://39.106.39.125:9999/%E6%A0%BE%E5%AA%9B%E5%85%BB%E8%99%BE_Setup_1.0.0.exe" target="_blank" rel="noopener" class="vp-button brand" style="display: inline-block;">
    立即获取 OpenClaw 一键部署 →
  </a>
</p>

<div class="openclaw-about" style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(232, 93, 4, 0.2); color: var(--vp-c-text-2); font-size: 0.9rem;">
**关于我们** — Ly 系列开源项目始于对教育和制造业数字化转型的思考。Ly 这个名字来源于我的女儿，象征着希望和未来。愿景：打造高质量开源解决方案；理念：技术多样性、架构合理性、用户体验优先、开源共享。
</div>

</div>

---

## 项目简介

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">

<div style="padding: 1.25rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft);">

### LyEdu 企业培训系统

[项目介绍 →](/projects/lyedu/introduction)

100% 开源的企业培训系统，界面美观，操作简单，一键部署私有化培训平台。

**核心功能**：部门/学员管理、在线视频学习、进度追踪、课程评论、考试中心、证书系统、知识中心、任务系统、积分排行、飞书集成

**技术栈**：Vue 3 + TypeScript + Element Plus / uni-app x | SpringBoot 4 / FastAPI | MySQL 8.0+ | Docker

</div>

<div style="padding: 1.25rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft);">

### LyMom 制造业运营管理系统

[项目介绍 →](/projects/lymom/introduction)

面向制造业的现代化 MOM 系统，采用 DDD 架构，业务与技术解耦，支持微服务部署。

**核心优势**：DDD 架构、微服务、设备管理（OPC UA/Modbus）、生产管理、仓储管理、质量管理

**技术栈**：Vue 3 + Element Plus | Spring Boot 3.5.3 + Java 24 | PostgreSQL | EMQX/MQTT | Redis | Prometheus/Grafana

</div>

</div>

---

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
