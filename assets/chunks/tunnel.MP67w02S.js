const n=`---
title: Tunnel 隧道
description: NetBox Tunnel 模型中英对照
---

# Tunnel / 隧道

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/vpn/tunnel/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 隧道表示通过协议封装在共享基础设施上建立的两端或多端之间的私有虚拟连接。常见封装包括 GRE、IP-in-IP、IPSec。NetBox 支持点对点和 Hub-Spoke 拓扑。设备/虚拟机接口通过[隧道终止点](/tech-share/netbox/4.5.1/community/data-model/vpn/tunneltermination)与隧道关联。

**English:** A tunnel represents a private virtual connection established among two or more endpoints across a shared infrastructure by employing protocol encapsulation (GRE, IP-in-IP, IPSec). NetBox supports peer-to-peer and hub-and-spoke topologies. Device and VM interfaces are associated via tunnel terminations.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| Name | 隧道唯一名称 | A unique name assigned to the tunnel |
| Status | 运行状态 (Disabled/Active/Planned，可扩展) | The operational status of the tunnel |
| Group | 所属[隧道组](/tech-share/netbox/4.5.1/community/data-model/vpn/tunnelgroup) | The administrative group (optional) |
| Encapsulation | 封装协议 (GRE/IP-in-IP/IPSec) | The encapsulation protocol employed |
| Tunnel ID | 可选数字标识 | An optional numeric identifier |
| IPSec Profile | IPSec 隧道使用的 IPSec 配置 | For IPSec tunnels, the IPSec profile employed |

## 官方文档

- [Tunnel 完整文档 →](https://netboxlabs.com/docs/netbox/models/vpn/tunnel/)
`;export{n as default};
