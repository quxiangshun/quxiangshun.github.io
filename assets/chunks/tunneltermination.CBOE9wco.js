const n=`---
title: Tunnel Termination 隧道终止点
description: NetBox Tunnel Termination 模型中英对照
---

# Tunnel Termination / 隧道终止点

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/vpn/tunneltermination/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 隧道终止点将设备或虚拟机接口连接到[隧道](/tech-share/netbox/4.5.1/community/data-model/vpn/tunnel)。需先创建隧道再添加终止点。

**English:** A tunnel termination connects a device or VM interface to a tunnel. The tunnel must be created before adding terminations.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| Tunnel | 目标隧道 | The tunnel to which this termination is made |
| Role | Peer(端点)/Hub(中心)/Spoke(边缘) | Peer, Hub, or Spoke |
| Termination | 设备或 VM 接口 | The interface terminated to the tunnel |
| Outside IP | 公网/底层 IP，对端用于路由隧道流量 | The public/underlay IP for this termination |

## 官方文档

- [Tunnel Termination 完整文档 →](https://netboxlabs.com/docs/netbox/models/vpn/tunneltermination/)
`;export{n as default};
