const n=`---
title: Planning Your Move 规划迁移
description: 规划成功迁移到 NetBox 的步骤
---

# Planning Your Move / 规划迁移

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/getting-started/planning/) | 如有侵权请[联系我们](/contact)删除*

This guide outlines the steps necessary for planning a successful migration to NetBox. Although it is written under the context of a completely new installation, the general approach outlined here works just as well for adding new data to existing NetBox deployments.

本指南概述规划成功迁移到 NetBox 所需的步骤。虽然以全新安装为背景编写，但同样适用于向现有 NetBox 部署添加新数据。

## Identify Current Sources of Truth / 识别当前数据源

Before beginning to use NetBox for your own data, it's crucial to first understand where your existing sources of truth reside. A "source of truth" is really just any repository of data that is authoritative for a given domain.

在开始使用 NetBox 管理数据之前，首先要了解现有数据源所在位置。数据源是指对特定领域具有权威性的数据仓库。

Anything can be a source of truth, provided it meets two conditions:

1. The domain to which it applies is well-defined.
2. It is agreed upon by all relevant parties that this source of data is correct.

常见挑战包括：

- **No source of truth** - 某些领域可能根本没有数据源
- **Inaccessible data formatting** - 数据格式难以程序化使用
- **Sources with no domain defined** - 不同团队使用不同工具，缺乏统一规范
- **Multiple conflicting sources** - 多个版本的数据相互冲突

## Determine What to Move / 确定迁移内容

**General rule:** If there's a model for it, it belongs in NetBox.

**一般规则：** 若 NetBox 有对应模型，则适合放入 NetBox。

NetBox provides two core mechanisms for extending its data model:

1. **Custom fields** - 为大多数模型添加自定义字段
2. **Plugins** - 引入全新模型、视图和 API 端点

That said, it doesn't always make sense to migrate a domain of data to NetBox. Many organizations opt to use only IPAM or only DCIM components and integrate with other sources of truth.

## Validate Existing Data / 验证现有数据

The GIGO (garbage in, garbage out) principle is in full effect. Tips:

- Use custom scripts to automatically populate patterned data
- Consider defining custom validation rules prior to import
- Ensure complete, well-formatted data (JSON or CSV recommended)

## Order of Operations / 创建顺序

Recommended order for creating NetBox objects:

1. Virtual machines and VM interfaces
2. Cluster types, cluster groups, and clusters
3. VLAN groups and VLANs
4. Prefixes, IP ranges, and IP addresses
5. IP/VLAN roles
6. RIRs and aggregates
7. Route targets and VRFs
8. Wireless LAN groups and wireless LANs
9. Circuit types and circuits
10. Providers, provider accounts, and provider networks
11. Devices and modules
12. Platforms and device roles
13. Manufacturers, device types, and module types
14. Rack roles and racks
15. Regions, site groups, sites, and locations
16. Tenant groups and tenants
`;export{n as default};
