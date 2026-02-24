const e=`---
title: Power Tracking 电力跟踪
description: NetBox 电力分配建模
---

# Power Tracking / 电力跟踪

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/power-tracking/) | 如有侵权请[联系我们](/contact)删除*

As part of its DCIM feature set, NetBox supports modeling facility power as discrete power panels and feeds. These are most commonly used to document power distribution within a data center, but can serve more traditional environments as well.

作为其 DCIM 功能集的一部分，NetBox 支持将设施电力建模为离散的电力面板和馈线。这些最常用于记录数据中心内的电力分配，但也可以服务于更传统的环境。

## Power Panels / 电力面板

A power panel is the furthest upstream power element modeled in NetBox. It typically represents a power distribution panel (or breaker panel) where facility power is split into multiple discrete circuits, which are modeled as feeds.

电力面板是 NetBox 中建模的最上游电力元件。它通常代表配电面板（或断路器面板），设施电力在此处分成多个离散电路，这些电路被建模为馈线。

Each power panel is associated with a site, and may optionally be associated with a particular location within that site. There is no limit to how many power feeds a single panel can supply.

每个电力面板与站点关联，并可以选择与该站点内的特定位置关联。单个面板可以供电的馈线数量没有限制。

## Power Feeds / 电力馈线

A power feed represents a discrete power circuit originating from an upstream power panel. Each power feed can be assigned a name, operational status, and various electrical characteristics such as supply (AC or DC), voltage, amperage, and so on.

电力馈线代表源自上游电力面板的离散电力电路。每个电力馈线可以分配名称、运营状态和各种电气特性，例如供电（交流或直流）、电压、电流等。

A device power port can be connected to a power feed via a cable. Only one port can be connected to a feed: Where multiple devices draw power from the same feed, a power distribution unit (PDU) must be modeled as an individual device mapping a power port to multiple power outlets to which the downstream devices can connect.

设备电源端口可以通过线缆连接到电力馈线。只有一个端口可以连接到馈线：当多个设备从同一馈线取电时，配电单元 (PDU) 必须建模为将电源端口映射到下游设备可以连接的多个电源插座的单独设备。

### Primary and Redundant Power / 主电源和冗余电源

Each power feed in NetBox is assigned a type: primary or redundant. This allows easily modeling redundant power distribution topologies. In scenarios involving only a single, non-redundant power supply, mark all power feeds as primary.

NetBox 中的每个电力馈线都分配有类型：主电源或冗余电源。这允许轻松建模冗余配电拓扑。在仅涉及单个非冗余电源的场景中，将所有电力馈线标记为主电源。
`;export{e as default};
