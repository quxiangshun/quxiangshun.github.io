const n=`# 项目列表

> 编辑日期：2026-03-22



## Ly 开源项目介绍

Ly 是一系列开源项目的集合，旨在为企业和开发者提供高质量、易用的解决方案。目前主要包含以下项目：

## 1. LyEdu

### 项目简介

LyEdu 是一个企业级教育训练系统，专为企业内部培训和学习管理设计。它提供了完整的课程管理、学习跟踪、考试评估等功能，帮助企业构建高效的内部学习平台。

### 核心功能

- **课程管理**：支持课程创建、分类、章节管理、视频上传等
- **学习跟踪**：实时监控学习进度，生成学习报告
- **考试评估**：支持在线考试、自动评分、成绩分析等
- **用户管理**：支持用户分组、权限管理、部门管理等
- **Feishu 集成**：支持 Feishu 登录和地址簿同步
- **多端支持**：PC 端和移动端（基于 uni-app x）

### 技术架构

- **前端**：Vue 3、TypeScript、Element Plus、uni-app x
- **后端**：Spring Boot 4、Java 17、PostgreSQL、Redis
- **部署**：Docker、Docker Compose

### 相关链接

- [项目介绍](/projects/lyedu/introduction)
- [技术栈](/projects/lyedu/tech-stack)
- [快速开始](/projects/lyedu/quick-start)
- [GitHub 仓库](https://github.com/quxiangshun/ly-edu)
- [Gitee 仓库](https://gitee.com/quxiangshun/ly-edu)
- [GitCode 仓库](https://gitcode.com/quxiangshun/ly-edu)

## 2. LyGenealogy

### 项目简介

LyGenealogy（屈氏宗谱）是基于 **Node.js** 技术栈的开源族谱数字化平台，包含公共前端（Nuxt 3，H5 适配）、管理后台（Vue 3 + Element Plus）和 REST API（Express + TypeScript），采用 pnpm Monorepo，前后端分离，支持多姓氏扩展。

### 核心功能

- **族谱管理**：多族谱，按地区、年代检索，谱籍与字辈摘要
- **世系树**：可视化展示世代传承关系
- **成员与亲缘**：成员搜索、字辈查询、亲缘关系递归展示
- **文化传承**：百科、新闻、姓氏文化展示与管理
- **认证与安全**：JWT 登录、首次修改密码、姓名脱敏等

### 技术架构

- **API**：Express + TypeScript，better-sqlite3，JWT
- **公共前端**：Nuxt 3 + Vue 3（SSR/SSG/ISR，PWA）
- **管理后台**：Vue 3 + Element Plus（SPA）
- **包与部署**：pnpm workspace，build.sh 打包，Caddy + PM2

### 相关链接

- [项目介绍](/projects/lygenealogy/introduction)
- [技术栈](/projects/lygenealogy/tech-stack)
- [快速开始](/projects/lygenealogy/quick-start)
- [在线演示](http://39.106.39.125:9997/)
- [GitHub 仓库](https://github.com/quxiangshun/ly-genealogy)

## 3. LyMom

### 项目简介

LyMom (Ly Manufacturing Operations Management) 是一个开源的制造运营管理系统，专为中小型制造企业设计，提供全面的生产管理、设备监控和数据分析功能。

### 核心功能

- **生产管理**：生产计划与排产、工单管理、物料需求计划、生产过程跟踪、质量控制
- **设备管理**：设备状态监控、设备维护计划、故障记录与分析、OEE 计算
- **数据分析**：生产报表、设备性能分析、质量数据分析、能耗分析
- **系统集成**：MES 系统集成、ERP 系统集成、设备控制系统集成、工业协议支持 (OPC UA/Modbus/TCP)

### 技术架构

- **前端**：Vue 3、TypeScript、Element Plus
- **后端**：Spring Boot 4、FastAPI、Python 3、PostgreSQL、Redis
- **工业协议**：OPC UA、Modbus TCP、MQTT
- **部署**：Docker、Docker Compose

### 相关链接

- [项目介绍](/projects/lymom/introduction)
- [技术栈](/projects/lymom/tech-stack)
- [快速开始](/projects/lymom/quick-start)
- [GitHub 仓库](https://github.com/quxiangshun/ly-factmesh-back)
- [Gitee 仓库](https://gitee.com/quxiangshun/ly-factmesh-back)
- [GitCode 仓库](https://gitcode.com/quxiangshun/ly-factmesh-back)

## 4. LyTools {#lytools}

LyTools（栾媛小工具）是基于 **Electron + Vue 3 + Element Plus** 的桌面实用工具集，插件化扩展；三端仓库同步维护。

**完整文档**：[LyTools 文档](/projects/lytools/introduction)

**仓库**：[GitHub](https://github.com/quxiangshun/ly-tools) · [Gitee](https://gitee.com/quxiangshun/ly-tools) · [GitCode](https://gitcode.com/quxiangshun/ly-tools)

## 未来规划

Ly 系列项目将持续迭代和扩展，未来计划推出以下项目：

- **LyCRM**：客户关系管理系统
- **LyERP**：企业资源计划系统
- **LyIoT**：物联网平台

欢迎关注和参与 Ly 系列开源项目的开发和贡献！`;export{n as default};
