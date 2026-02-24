const n=`---
title: Circuit 电路
description: NetBox Circuit 模型
---

# Circuit / 电路

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/circuits/circuit/) | 如有侵权请[联系我们](/contact)删除*

Circuit 表示物理点对点数据连接，通常用于跨站点互联（如互联网接入）。

## 主要字段

| 字段 | 说明 |
| --- | --- |
| Provider | 所属提供商 |
| Provider Account | 提供商账户（可选） |
| Circuit ID | 电路标识，在同一提供商内唯一 |
| Circuit Type | 电路类型（如 Internet access、MPLS/VPN） |
| Status | 状态：Planned、Provisioning、Active、Offline 等 |
| Distance | 两端距离及单位 |
| Commit Rate | 承诺速率 (kbps) |
`;export{n as default};
