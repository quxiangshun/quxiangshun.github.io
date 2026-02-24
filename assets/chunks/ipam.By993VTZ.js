const e=`---
title: IP Address Management IP 地址管理
description: NetBox IPAM 功能
---

# IP Address Management (IPAM) / IP 地址管理

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/ipam/) | 如有侵权请[联系我们](/contact)删除*

IP address management (IPAM) is one of NetBox's core features. It supports full parity for IPv4 and IPv6, advanced VRF assignment, automatic hierarchy formation, and much more.

IP 地址管理 (IPAM) 是 NetBox 的核心功能之一。它支持 IPv4 和 IPv6 的完全对等、高级 VRF 分配、自动层次结构形成等。

## IP Hierarchy / IP 层次结构

NetBox employs several object types to represent a hierarchy of IP resources:

NetBox 使用多种对象类型来表示 IP 资源的层次结构：

- **IP Address** - An individual IP address along with its subnet mask, automatically arranged beneath its parent prefix. / 单个 IP 地址及其子网掩码，自动排列在其父前缀下方。
- **IP Range** - An arbitrary range of individual IP addresses within a prefix, all sharing the same mask. / 前缀内的任意范围的单个 IP 地址，全部共享相同的掩码。
- **Prefix** - A subnet defined within an aggregate. Prefixes extend the hierarchy by nesting within one another. / 聚合内定义的子网。前缀通过彼此嵌套来扩展层次结构。
- **Aggregate** - A prefix which represents the root of an addressing hierarchy. / 代表寻址层次结构根的前缀。

**Automatic Hierarchies:** IP objects in NetBox never need to be manually assigned to the parent objects. The construction of hierarchies is handled automatically by the application according to the inherent rules of IP addressing.

**自动层次结构：** NetBox 中的 IP 对象永远不需要手动分配给父对象。层次结构的构建由应用程序根据 IP 寻址的固有规则自动处理。

## VRF Tracking / VRF 跟踪

NetBox supports the modeling of discrete virtual routing and forwarding (VRF) instances to represent multiple routing tables, including those with overlapping address space. Each type of IP object within an aggregate - prefix, IP range, and IP address - can be assigned to a particular VRF. Consequently, each VRF maintains its own isolated IP hierarchy.

NetBox 支持对离散的虚拟路由和转发 (VRF) 实例进行建模，以表示多个路由表，包括具有重叠地址空间的路由表。聚合内的每种类型的 IP 对象（前缀、IP 范围和 IP 地址）都可以分配给特定的 VRF。因此，每个 VRF 维护其自己的隔离 IP 层次结构。

VRF modeling in NetBox very closely follows what you find in real-world network configurations, with each VRF assigned a standards-compliant route distinguisher. You can even create route targets to manage the import and export of routing information among VRFs.

NetBox 中的 VRF 建模非常接近您在现实世界网络配置中发现的内容，每个 VRF 分配有符合标准的路由区分符。您甚至可以创建路由目标来管理 VRF 之间路由信息的导入和导出。

## AS Numbers / AS 编号

NetBox also tracks autonomous system (AS) numbers and their assignment to sites. Both 16- and 32-bit AS numbers are supported, and like aggregates each ASN is assigned to an authoritative RIR.

NetBox 还跟踪自治系统 (AS) 编号及其对站点的分配。支持 16 位和 32 位 AS 编号，与聚合一样，每个 ASN 都分配给权威 RIR。

## Application Service Mapping / 应用服务映射

NetBox models network applications as discrete service objects associated with devices and/or virtual machines, and optionally with specific IP addresses attached to those parent objects. These can be used to catalog the applications running on your network for reference by other objects or integrated tools.

NetBox 将网络应用程序建模为与设备和/或虚拟机关联的离散服务对象，并可选地与附加到这些父对象的特定 IP 地址关联。这些可用于编目网络上运行的应用程序，供其他对象或集成工具参考。
`;export{e as default};
