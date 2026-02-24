const n=`---
title: Tunnel Group 隧道组
description: NetBox Tunnel Group 模型中英对照
---

# Tunnel Group / 隧道组

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/vpn/tunnelgroup/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 隧道组用于对[隧道](/tech-share/netbox/4.5.1/community/data-model/vpn/tunnel)进行管理分组，如管理网状网络内的点对点隧道。归属组为可选。

**English:** Tunnels can be arranged into administrative groups. E.g. a group for peer-to-peer tunnels in a mesh. Assignment is optional.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| Name | 唯一名称 | A unique human-friendly name |
| Slug | URL 友好标识符 | A unique URL-friendly identifier |

## 官方文档

- [Tunnel Group 完整文档 →](https://netboxlabs.com/docs/netbox/models/vpn/tunnelgroup/)
`;export{n as default};
