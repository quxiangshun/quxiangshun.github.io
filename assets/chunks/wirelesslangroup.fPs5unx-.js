const e=`---
title: Wireless LAN Group 无线 LAN 组
description: NetBox WirelessLANGroup 模型中英对照
---

# Wireless LAN Group / 无线 LAN 组

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/wireless/wirelesslangroup/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 无线 LAN 组用于组织和分类[无线 LAN](/tech-share/netbox/4.5.1/community/data-model/wireless/wirelesslan)。组具有层级结构，可嵌套；每个无线 LAN 仅能归属一个组。

**English:** Wireless LAN groups can be used to organize and classify wireless LANs. Groups are hierarchical and can be nested; each wireless LAN may be assigned only to one group.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| Parent | 父组（如有） | The parent wireless LAN group |
| Name | 唯一名称 | A unique human-friendly name |
| Slug | URL 友好标识符 | A unique URL-friendly identifier |

## 官方文档

- [Wireless LAN Group 完整文档 →](https://netboxlabs.com/docs/netbox/models/wireless/wirelesslangroup/)
`;export{e as default};
