const e=`---
title: Tenancy 租户
description: NetBox 租户管理
---

# Tenancy / 租户

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/tenancy/) | 如有侵权请[联系我们](/contact)删除*

Most core objects within NetBox's data model support tenancy. This is the association of an object with a particular tenant to convey assignment or dependency. For example, an enterprise might represent its internal business units as tenants, whereas a managed services provider might create a tenant in NetBox to represent each of its customers.

NetBox 数据模型中的大多数核心对象都支持租户。这是对象与特定租户的关联，以传达分配或依赖关系。例如，企业可能将其内部业务部门表示为租户，而托管服务提供商可能在 NetBox 中创建租户以代表其每个客户。

## Tenant Groups / 租户组

Tenants can be grouped by any logic that your use case demands, and groups can be nested recursively for maximum flexibility. For example, You might define a parent "Customers" group with child groups "Current" and "Past" within it.

租户可以按您的用例要求的任何逻辑分组，组可以递归嵌套以获得最大灵活性。例如，您可以定义一个父"客户"组，其中包含子组"当前"和"过去"。

## Tenants / 租户

Typically, the tenant model is used to represent a customer or internal organization, however it can be used for whatever purpose meets your needs.

通常，租户模型用于表示客户或内部组织，但它可以用于满足您需求的任何目的。

Most core objects within NetBox can be assigned to a particular tenant, so this model provides a very convenient way to correlate resource allocation across object types. For example, each of your customers might have its own racks, devices, IP addresses, circuits and so on: These can all be easily tracked via tenant assignment.

NetBox 中的大多数核心对象可以分配给特定租户，因此此模型提供了一种非常方便的方式来关联跨对象类型的资源分配。例如，您的每个客户可能都有自己的机架、设备、IP 地址、电路等：这些都可以通过租户分配轻松跟踪。

**Objects that can be assigned to tenants include:** Devices, Racks, Sites, Locations, Prefixes, IP addresses, VLANs, Circuits, Virtual machines, Clusters, and many more.

**可以分配给租户的对象包括：** 设备、机架、站点、位置、前缀、IP 地址、VLAN、电路、虚拟机、集群等。
`;export{e as default};
