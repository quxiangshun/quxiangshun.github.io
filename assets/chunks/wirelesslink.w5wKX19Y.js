const e=`---
title: Wireless Link 无线链路
description: NetBox WirelessLink 模型中英对照
---

# Wireless Link / 无线链路

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/wireless/wirelesslink/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 无线链路表示 exactly 两个无线接口之间的连接。与允许任意数量客户端关联的[无线 LAN](/tech-share/netbox/4.5.1/community/data-model/wireless/wirelesslan)不同，无线链路用于建模点对点无线连接。

**English:** A wireless link represents a connection between exactly two wireless interfaces. Unlike wireless LANs which permit arbitrary client associations, wireless links model point-to-point wireless connections.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| Interfaces | 两侧各选一个无线接口 (A/B) | Select two wireless interfaces |
| Status | Decommissioning/Planned/Connected | The operational status of the link |
| SSID | 可选 SSID | The SSID for the wireless link (optional) |
| Distance | 两端距离及单位（如 100 meters） | The distance between endpoints with unit |
| Authentication Type/Cipher/PSK | 与 Wireless LAN 类似 | Same as Wireless LAN |

## 官方文档

- [Wireless Link 完整文档 →](https://netboxlabs.com/docs/netbox/models/wireless/wirelesslink/)
`;export{e as default};
