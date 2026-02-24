const e=`---
title: Introduction 介绍
description: NetBox - Open Source Network Infrastructure Management
---

# Introduction to NetBox / NetBox 介绍

![NetBox Logo](https://raw.githubusercontent.com/netbox-community/netbox/main/docs/netbox_logo_light.svg)

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/introduction/) | 如有侵权请[联系我们](/contact)删除*

## Origin Story / 起源

NetBox was originally developed by its lead maintainer, [Jeremy Stretch](https://github.com/jeremystretch), while he was working as a network engineer at [DigitalOcean](https://www.digitalocean.com/) in 2015 as part of an effort to automate their network provisioning. Recognizing the new tool's potential, DigitalOcean agreed to release it as an open source project in June 2016.

NetBox 最初由其首席维护者 [Jeremy Stretch](https://github.com/jeremystretch) 在 2015 年担任 [DigitalOcean](https://www.digitalocean.com/) 网络工程师时开发，作为自动化网络配置工作的一部分。DigitalOcean 认识到这一新工具的潜力，于 2016 年 6 月同意将其作为开源项目发布。

Since then, thousands of organizations around the world have embraced NetBox as their central network source of truth to empower both network operators and automation. Today, the open source project is stewarded by [NetBox Labs](https://netboxlabs.com/) and a team of volunteer maintainers. Beyond the core product, myriad [plugins](https://netbox.dev/plugins/) have been developed by the NetBox community to enhance and expand its feature set.

此后，全球数千家组织将 NetBox 作为其核心网络真实来源，为网络运营商和自动化提供支持。如今，开源项目由 [NetBox Labs](https://netboxlabs.com/) 和志愿者维护者团队管理。除了核心产品外，NetBox 社区还开发了众多[插件](https://netbox.dev/plugins/)来增强和扩展其功能集。

## Key Features / 核心功能

NetBox was built specifically to serve the needs of network engineers and operators. Key features include:

NetBox 专门为满足网络工程师和运营商的需求而构建。核心功能包括：

- Event-driven scripts & webhooks / 事件驱动脚本和 webhook
- Global search engine / 全局搜索引擎
- Detailed, automatic change logging / 详细、自动的变更日志
- Robust object-based permissions / 健壮的对象级权限
- Single sign-on (SSO) authentication / 单点登录 (SSO) 认证
- Extensive plugin framework / 广泛的插件框架
- Custom reports & scripts / 自定义报告和脚本
- Custom validation & protection rules / 自定义验证和保护规则
- Custom fields for data model extension / 数据模型扩展的自定义字段
- Device & VM configuration contexts / 设备和 VM 配置上下文
- Tenant ownership assignment / 租户所有权分配
- Virtual machines & clusters / 虚拟机和集群
- FHRP groups (VRRP, HSRP, etc.) / FHRP 组 (VRRP、HSRP 等)
- Layer 2 VPN overlays / 第二层 VPN 覆盖
- VPN tunnels / VPN 隧道
- Wireless LAN and point-to-point links / 无线 LAN 和点对点链路
- Data circuit and provider tracking / 数据电路和提供商跟踪
- Power distribution modeling / 电力分配建模
- Network, power, and console cabling with SVG traces / 带 SVG 追踪的网络、电力和控制台线缆
- IP address management (IPAM) with full IPv4/IPv6 parity / 具有完整 IPv4/IPv6 对等的 IP 地址管理 (IPAM)

## What NetBox Is Not / NetBox 不是什么

While NetBox strives to cover many areas of network management, the scope of its feature set is necessarily limited:

虽然 NetBox 努力覆盖网络管理的许多领域，但其功能集的范围必然是有限的：

- Facilities management / 设施管理
- Configuration management / 配置管理
- RADIUS server / RADIUS 服务器
- DNS server / DNS 服务器
- Network monitoring / 网络监控

That said, NetBox can be used to great effect in populating external tools with the data they need to perform these functions.

也就是说，NetBox 可以有效地用外部工具执行这些功能所需的数据填充它们。

## Design Philosophy / 设计理念

### Replicate the Real World / 复制现实世界

Careful consideration has been given to the data model to ensure that it can accurately reflect a real-world network. For instance, IP addresses are assigned not to devices, but to specific interfaces attached to a device.

数据模型经过仔细考虑，以确保能够准确反映现实世界的网络。例如，IP 地址不是分配给设备，而是分配给设备上的特定接口。

### Serve as a "Source of Truth" / 作为「真实来源」

NetBox intends to represent the desired state of a network versus its operational state. As such, automated import of live network state is strongly discouraged. All data created in NetBox should first be vetted by a human to ensure its integrity.

NetBox 旨在表示网络的期望状态而不是其运营状态。因此，强烈不鼓励自动导入实时网络状态。在 NetBox 中创建的所有数据应首先由人工审核以确保其完整性。

### Keep it Simple / 保持简单

When given a choice between a relatively simple 80% solution and a much more complex complete solution, the former will typically be favored. This ensures a lean codebase with a low learning curve.

在相对简单的 80% 解决方案和更复杂的完整解决方案之间做出选择时，通常倾向于前者。这确保了精简的代码库和低学习曲线。

## Application Stack / 应用架构

| Function | Component |
| --- | --- |
| HTTP service | nginx or Apache |
| WSGI service | gunicorn or uWSGI |
| Application | Django/Python |
| Database | PostgreSQL 14+ |
| Task queuing | Redis/django-rq |

## Related Links / 相关链接

- [Features 功能](./features)
- [Installation & Upgrade 安装与升级](./installation/)
- [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/)
- [GitHub Repository](https://github.com/netbox-community/netbox)
`;export{e as default};
