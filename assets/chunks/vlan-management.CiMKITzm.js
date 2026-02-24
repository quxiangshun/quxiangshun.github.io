const n=`---
title: VLAN Management VLAN 管理
description: NetBox VLAN 管理
---

# VLAN Management / VLAN 管理

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/vlan-management/) | 如有侵权请[联系我们](/contact)删除*

Complementing its IPAM capabilities, NetBox also tracks VLAN information to assist with layer two network configurations. VLANs are defined per IEEE 802.1Q and related standards, and can be assigned to groups and functional roles.

作为其 IPAM 功能的补充，NetBox 还跟踪 VLAN 信息以协助第二层网络配置。VLAN 根据 IEEE 802.1Q 和相关标准定义，可以分配给组和功能角色。

## VLAN Groups / VLAN 组

A VLAN group is a collection of VLANs defined within a particular scope. Each VLAN group can be associated with a particular site, location, rack, or similar object to indicate its domain, and designates a minimum and maximum VLAN ID within the group. (By default, these are the standard minimum and maximum values of 1 and 4094, respectively.)

VLAN 组是在特定范围内定义的 VLAN 集合。每个 VLAN 组可以与特定站点、位置、机架或类似对象关联以指示其域，并指定组内的最小和最大 VLAN ID。（默认情况下，这些分别是 1 和 4094 的标准最小值和最大值。）

Within a group, each VLAN must have a unique ID and name. There is no limit to how many groups can be created per scope.

在组内，每个 VLAN 必须具有唯一的 ID 和名称。每个范围可以创建的组数量没有限制。

## VLANs / VLAN

NetBox models VLANs according to their definition under IEEE 802.1Q, with a 12-bit VLAN ID and a name. Each VLAN also has an operational status, and may be assigned a function role, just like prefixes. Each VLAN can be assigned to a VLAN group or site to convey the domain in which the VLAN exists.

NetBox 根据 IEEE 802.1Q 下的定义对 VLAN 进行建模，具有 12 位 VLAN ID 和名称。每个 VLAN 也有运营状态，并且可以像前缀一样分配功能角色。每个 VLAN 可以分配给 VLAN 组或站点以传达 VLAN 存在的域。

Once defined, VLANs can be associated with device and virtual machine interfaces. Each interface can be assigned an 802.1Q mode (access or tagged), and the relevant VLANs can be applied as tagged or untagged.

定义后，VLAN 可以与设备和虚拟机接口关联。每个接口可以分配 802.1Q 模式（访问或标记），相关 VLAN 可以作为标记或未标记应用。
`;export{n as default};
