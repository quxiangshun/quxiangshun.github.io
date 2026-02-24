const e=`---
title: Facilities 设施
description: NetBox 设施建模 - 区域、站点、位置、机架
---

# Facilities / 设施

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/facilities/) | 如有侵权请[联系我们](/contact)删除*

From global regions down to individual equipment racks, NetBox allows you to model your network's entire presence. This is accomplished through the use of several purpose-built models.

从全球区域到单个设备机架，NetBox 允许您对网络的整个存在进行建模。这是通过使用几个专用模型来实现的。

## Regions / 区域

Regions represent geographic domains in which your network or its customers have a presence. These are typically used to model countries, states, and cities, although NetBox does not prescribe any precise uses and your needs may differ.

区域代表您的网络或其客户存在的 geographic 域。这些通常用于对国家、州和城市进行建模，尽管 NetBox 没有规定任何精确的用途，您的需求可能有所不同。

Regions are self-nesting, so you can define child regions within a parent, and grandchildren within each child. For example:

区域是自嵌套的，因此您可以在父级中定义子区域，在每个子级中定义孙级。例如：

- Europe → Spain, Germany, France
- North America → United States → Texas, New York, California

## Site Groups / 站点组

Like regions, site groups can be arranged in a recursive hierarchy for grouping sites. However, whereas regions are intended for geographic organization, site groups may be used for functional grouping. For example, you might classify sites as corporate, branch, or customer sites.

与区域一样，站点组可以按递归层次结构排列以对站点进行分组。然而，区域用于地理组织，站点组可用于功能分组。例如，您可以将站点分类为企业、分支或客户站点。

## Sites / 站点

A site typically represents a building within a region and/or site group. Each site is assigned an operational status (e.g. active or planned), and can have a discrete mailing address and GPS coordinates assigned to it.

站点通常代表区域和/或站点组内的建筑物。每个站点分配有运营状态（例如活动或计划中），并可以分配离散的邮寄地址和 GPS 坐标。

## Locations / 位置

A location can be any logical subdivision within a building, such as a floor or room. Like regions and site groups, locations can be nested into a self-recursive hierarchy for maximum flexibility. And like sites, each location has an operational status assigned to it.

位置可以是建筑物内的任何逻辑细分，例如楼层或房间。与区域和站点组一样，位置可以嵌套到自递归层次结构中以获得最大灵活性。与站点一样，每个位置都分配有运营状态。

## Rack Types / 机架类型

A rack type represents a unique specification of a rack which exists in the real world. Each rack type can be setup with weight, height, and unit ordering. New racks of this type can then be created in NetBox, and any associated specifications will be automatically replicated from the device type.

机架类型代表现实世界中存在的机架的独特规格。每个机架类型可以设置重量、高度和单元顺序。然后可以在 NetBox 中创建此类型的新机架，任何相关规格将自动从设备类型复制。

## Racks / 机架

Finally, NetBox models each equipment rack as a discrete object within a site and location. These are physical objects into which devices are installed. Each rack can be assigned an operational status, type, facility ID, and other attributes related to inventory tracking. Each rack also must define a height (in rack units) and width, and may optionally specify its physical dimensions.

最后，NetBox 将每个设备机架建模为站点和位置内的离散对象。这些是安装设备的物理对象。每个机架可以分配运营状态、类型、设施 ID 以及与库存跟踪相关的其他属性。每个机架还必须定义高度（以机架单位计）和宽度，并可以选择指定其物理尺寸。

Each rack must be associated to a site, but the assignment to a location within that site is optional. NetBox supports tracking rack space in half-unit increments, so it's possible to mount devices at e.g. position 2.5 within a rack.

每个机架必须与站点关联，但在该站点内分配到位置是可选的。NetBox 支持以半单位增量跟踪机架空间，因此可以在机架内的例如位置 2.5 安装设备。
`;export{e as default};
