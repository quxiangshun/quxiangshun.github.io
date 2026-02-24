const n=`---
title: Tenant 租户
description: NetBox Tenant 模型
---

# Tenant / 租户

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/tenancy/tenant/) | 如有侵权请[联系我们](/contact)删除*

用于管理目的的资源分组，通常表示客户或部门。

## 主要字段

| 字段 | 说明 |
| --- | --- |
| Name | 名称 |
| Slug | URL 友好标识 |
| Group | 所属 [Tenant Group](tenantgroup) |
`;export{n as default};
