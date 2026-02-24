const n=`---
title: Prefix 前缀
description: NetBox Prefix 模型
---

# Prefix / 前缀

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/ipam/prefix/) | 如有侵权请[联系我们](/contact)删除*

CIDR 格式的 IPv4/IPv6 网络（如 192.0.2.0/24）。自动归属 [Aggregate](aggregate) 和 [VRF](vrf)。

## 主要字段

| 字段 | 说明 |
| --- | --- |
| Prefix | 网络地址 |
| Status | 状态（container 表示仅作容器） |
| VRF | 虚拟路由转发实例 |
| Role | 功能角色 |
| Is a Pool | 是否作为地址池（NAT 池等） |
| Scope | 关联的 region/site/location |
| VLAN | 关联的 VLAN |
`;export{n as default};
