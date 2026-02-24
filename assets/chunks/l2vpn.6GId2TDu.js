const n=`---
title: L2VPN
description: NetBox L2VPN 模型中英对照
---

# L2VPN

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/vpn/l2vpn/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** L2VPN 对象表示二层桥接技术，如 VXLAN、VPLS、EPL。创建后可终止到[接口](/tech-share/netbox/4.5.1/community/data-model/dcim/interface)和 [VLAN](/tech-share/netbox/4.5.1/community/data-model/ipam/vlan)。

**English:** An L2VPN object represents a layer 2 bridge technology such as VXLAN, VPLS, or EPL. L2VPNs can be terminated to interfaces and VLANs.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| Name | 唯一名称 | A unique human-friendly name |
| Slug | URL 友好标识符 | A unique URL-friendly identifier |
| Type | 技术类型：VXLAN、VPLS、EPL、EVPN 等；VPWS/EPL/EP-LAN/EP-TREE 限 2 个终止点 | The technology employed (VXLAN, VPLS, etc.) |
| Status | 运行状态 (Faulty/Planned/Active) | The operational status |
| Identifier | 可选数字标识（如伪线 ID） | An optional numeric identifier |
| Import/Export Targets | 关联的[路由目标](/tech-share/netbox/4.5.1/community/data-model/ipam/routetarget) | Route targets for forwarding info |

## 官方文档

- [L2VPN 完整文档 →](https://netboxlabs.com/docs/netbox/models/vpn/l2vpn/)
`;export{n as default};
