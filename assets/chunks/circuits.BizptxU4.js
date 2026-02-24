const e=`---
title: Circuits 电路
description: NetBox 电路管理
---

# Circuits / 电路

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/circuits/) | 如有侵权请[联系我们](/contact)删除*

NetBox is ideal for managing your network's transit and peering providers and circuits. It provides all the flexibility needed to model physical circuits in both data center and enterprise environments, and allows for "connecting" circuits directly to device interfaces via cables.

NetBox 非常适合管理网络的传输和对等提供商以及电路。它提供了在数据中心和企业环境中对物理电路进行建模所需的所有灵活性，并允许通过线缆将电路直接"连接"到设备接口。

## Providers / 提供商

A provider is any organization which provides Internet or private connectivity. Typically, these are large carriers, however they might also include regional providers or even internal services. Each provider can be assigned account and contact details, and may have one or more AS numbers assigned to it.

提供商是提供互联网或专用连接的任何组织。通常，这些是大型运营商，但也可能包括区域提供商甚至内部服务。每个提供商可以分配账户和联系详情，并可能分配有一个或多个 AS 编号。

Sometimes you'll need to model provider networks into which you don't have full visibility; these are typically represented on topology diagrams with cloud icons. NetBox facilitates this through its provider network model: A provider network represents a "black box" network to which your circuits can connect.

有时您需要建模您没有完全可见性的提供商网络；这些通常在拓扑图上用云图标表示。NetBox 通过其提供商网络模型促进这一点：提供商网络代表您的电路可以连接的"黑盒"网络。

## Circuits / 电路

A circuit is a physical connection between two points, which is installed and maintained by an external provider. For example, an Internet connection delivered as a fiber optic cable would be modeled as a circuit in NetBox.

电路是两点之间的物理连接，由外部提供商安装和维护。例如，作为光纤电缆交付的互联网连接将在 NetBox 中建模为电路。

Each circuit is associated with a provider and assigned a circuit ID, which must be unique to that provider. A circuit is also assigned a user-defined type, operational status, and various other operating characteristics.

每个电路与提供商关联并分配电路 ID，该 ID 对该提供商必须是唯一的。电路还分配有用户定义的类型、运营状态和各种其他操作特性。

Each circuit may have up to two terminations (A and Z) defined. Each termination can be associated with a particular site or provider network. In the case of the former, a cable can be connected between the circuit termination and a device component to map its physical connectivity.

每个电路可以定义最多两个终端 (A 和 Z)。每个终端可以与特定站点或提供商网络关联。在前者的情况下，可以在电路终端和设备组件之间连接线缆以映射其物理连接。

**Physical vs. Virtual Circuits:** The circuit model in NetBox represents physical connections. Don't confuse these with virtual circuits which may be offered by providers overlaid on physical infrastructure.

**物理与虚拟电路：** NetBox 中的电路模型代表物理连接。不要将这些与提供商在物理基础设施上提供的虚拟电路混淆。
`;export{e as default};
