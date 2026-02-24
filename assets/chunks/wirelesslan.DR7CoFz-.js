const e=`---
title: Wireless LAN 无线局域网
description: NetBox WirelessLAN 模型中英对照
---

# Wireless LAN / 无线局域网

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/wireless/wirelesslan/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 无线 LAN 是一组通过共同无线信道连接的接口，由 SSID 和认证参数标识。无线[接口](/tech-share/netbox/4.5.1/community/data-model/dcim/interface)可与无线 LAN 关联，用于建模多接入无线网段。

**English:** A wireless LAN is a set of interfaces connected via a common wireless channel, identified by its SSID and authentication parameters. Wireless interfaces can be associated with wireless LANs to model multi-access wireless segments.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| SSID | 服务集标识符 | The service set identifier for the wireless network |
| Group | 所属[无线 LAN 组](/tech-share/netbox/4.5.1/community/data-model/wireless/wirelesslangroup) | The wireless LAN group (optional) |
| Status | 运行状态 | The operational status of the wireless network |
| VLAN | 可选映射的 VLAN | Optional VLAN to model wired-wireless bridge |
| Authentication Type | WPA Enterprise/Personal、WEP、Open | The type of wireless authentication |
| Authentication Cipher | AES、TKIP、Auto | The security cipher |
| Pre-Shared Key | 预共享密钥（仅特定认证类型） | The security key for client access |
| Scope | 关联的区域/站点/位置 | The region, site, site group or location |

## 官方文档

- [Wireless LAN 完整文档 →](https://netboxlabs.com/docs/netbox/models/wireless/wirelesslan/)
`;export{e as default};
