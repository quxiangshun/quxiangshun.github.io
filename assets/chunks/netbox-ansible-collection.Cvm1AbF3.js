const e=`---
title: NetBox Ansible Collection
description: NetBox Ansible 集成中英对照
---

# NetBox Ansible Collection / NetBox Ansible 集合

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/integrations/tool-integrations/netbox-ansible-collection/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** NetBox Ansible 集合提供与 NetBox 交互的模块和插件。可用于：将 NetBox 作为 Ansible 动态清单源；在 NetBox 中定义预期网络状态；从 NetBox 查询数据驱动自动化。需 pynetbox、pytz。从 Ansible Galaxy 安装：\`ansible-galaxy collection install netbox.netbox\`。

**English:** The NetBox Ansible collection provides modules and plugins to interact with NetBox. Use cases: NetBox as dynamic inventory; define intended network state in NetBox; query NetBox to drive automation. Requires pynetbox, pytz. Install via \`ansible-galaxy collection install netbox.netbox\`.

## 典型用法 | Use Cases

| 用法 | 中文 | English |
|-----|------|---------|
| 动态清单 | 使用 nb_inventory 从 NetBox 生成 inventory，按 device_roles、sites 分组 | Use nb_inventory plugin for dynamic inventory |
| 定义状态 | 使用 netbox_aggregate 等模块确保 NetBox 中存在对象 | Use modules to ensure objects exist/update |
| 查询数据 | 使用 nb_lookup 插件查询 sites、devices 等 | Use nb_lookup to query NetBox data |

## 官方文档

- [NetBox Ansible Collection 完整文档 →](https://netboxlabs.com/docs/integrations/tool-integrations/netbox-ansible-collection/)
`;export{e as default};
