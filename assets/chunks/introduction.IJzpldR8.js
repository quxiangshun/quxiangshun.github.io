const n=`# NetBox 介绍

> 编辑日期：2026-02-13

![NetBox Logo](https://raw.githubusercontent.com/netbox-community/netbox/main/docs/netbox_logo_light.svg)

*图片来源 / Image Source: [NetBox 官方](https://github.com/netbox-community/netbox) | 如有侵权请[联系我们](/contact)删除 / [Contact us](/contact) for removal if infringement*

## 什么是 NetBox

NetBox 是一个开源的网络基础设施管理（Network Infrastructure Management）工具，专为数据中心和网络工程师设计。它提供了一个集中式平台，用于管理网络设备、IP 地址、VLAN、线缆连接等网络基础设施资源。

### 核心功能

- **IP 地址管理 (IPAM)**：管理 IPv4 和 IPv6 地址空间
- **设备管理 (DCIM)**：管理网络设备、机架、机房等物理基础设施
- **线缆管理**：跟踪设备间的物理连接
- **VLAN 管理**：管理 VLAN 和 VLAN 组
- **虚拟环境管理**：管理虚拟机和集群
- **电路管理**：管理外部电路和服务提供商
- **API 集成**：提供 REST API 和 GraphQL API
- **自定义报告**：创建自定义报告和导出数据

### 技术架构

- **后端**：Python、Django
- **前端**：JavaScript、jQuery、Bootstrap
- **数据库**：PostgreSQL
- **缓存**：Redis
- **搜索**：PostgreSQL 全文搜索

## 为什么使用 NetBox

### 优势

- **集中式管理**：在一个平台中管理所有网络基础设施资源
- **自动化集成**：通过 API 与其他系统集成
- **详细的文档**：提供完整的功能和 API 文档
- **可扩展性**：支持插件系统
- **开源免费**：基于 Apache 2.0 许可

### 适用场景

- **企业数据中心**：管理复杂的网络基础设施
- **服务提供商**：管理客户网络和电路
- **教育机构**：管理校园网络
- **云提供商**：管理多租户网络环境

## 快速开始

要开始使用 NetBox，您可以：

1. **安装 NetBox**：参考 [安装指南](installation.md) 部署自己的 NetBox 实例
2. **探索功能**：了解 NetBox 的核心功能
3. **API 集成**：使用 API 与其他系统集成
4. **社区参与**：加入 NetBox 社区，分享经验和贡献代码

## 学习资源

- [官方文档](https://docs.netbox.dev/)
- [GitHub 仓库](https://github.com/netbox-community/netbox)
- [NetBox 社区论坛](https://github.com/netbox-community/netbox/discussions)
- [NetBox 插件库](https://github.com/netbox-community/netbox/wiki/Plugins)

---

**配图说明 / Image Attribution:** 配图来源于 [NetBox 官方](https://github.com/netbox-community/netbox)。仅供学习参考，如有侵权请[联系我们](/contact)删除。 / Images from [NetBox official](https://github.com/netbox-community/netbox). For reference only. [Contact us](/contact) for removal if infringement.

## 相关链接

- [文档导航](README.md) - 完整文档索引
- [安装指南](installation.md)
- [初始化清单](init-guide.md)
- [API 集成](api-integration.md)`;export{n as default};
