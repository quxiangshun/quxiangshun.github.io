const e=`---
title: Devices & Cabling 设备与线缆
description: NetBox 设备与线缆建模
---

# Devices & Cabling / 设备与线缆

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/devices-cabling/) | 如有侵权请[联系我们](/contact)删除*

At its heart, NetBox is a tool for modeling your network infrastructure, and the device object is pivotal to that function. A device can be any piece of physical hardware installed within your network, such as server, router, or switch, and may optionally be mounted within a rack.

NetBox 的核心是用于对网络基础设施进行建模的工具，设备对象是该功能的关键。设备可以是网络中安装的任何物理硬件，例如服务器、路由器或交换机，并且可以选择安装在机架中。

## Manufacturers / 制造商

A manufacturer generally represents an organization which produces hardware devices. These can be defined by users, however they should represent an actual entity rather than some abstract idea.

制造商通常代表生产硬件设备的组织。这些可以由用户定义，但它们应该代表实际实体而不是某种抽象概念。

## Device Types / 设备类型

A device type represents a unique combination of manufacturer and hardware model which maps to discrete make and model of device which exists in the real world. Each device type typically has a number of components created on it, representing network interfaces, device bays, and so on. New devices of this type can then be created in NetBox, and any associated components will be automatically replicated from the device type.

设备类型代表制造商和硬件型号的唯一组合，映射到现实世界中存在的离散品牌和型号。每个设备类型通常在其上创建了许多组件，代表网络接口、设备托架等。然后可以在 NetBox 中创建此类型的新设备，任何相关组件将自动从设备类型复制。

**The Device Type Library:** Many find it convenient to draw from our [community library](https://github.com/netbox-community/devicetype-library) of pre-defined device types.

**设备类型库：** 许多人发现从我们的预定义设备类型[社区库](https://github.com/netbox-community/devicetype-library)中获取很方便。

All the following can be modeled as components: Device bays, Module bays, Pass-through ports, Power outlets, Power ports, Console server ports, Console ports, Interfaces.

以下所有内容都可以建模为组件：设备托架、模块托架、直通端口、电源插座、电源端口、控制台服务器端口、控制台端口、接口。

## Devices / 设备

Whereas a device type defines the make and model of a device, a device itself represents an actual piece of installed hardware somewhere in the real world. A device can be installed at a particular position within an equipment rack, or simply associated with a site (and optionally with a location within that site).

设备类型定义设备的品牌和型号，而设备本身代表现实世界中某处安装的实际硬件。设备可以安装在设备机架中的特定位置，或者简单地与站点关联（以及可选地与站点内的位置关联）。

### Virtual Chassis / 虚拟机箱

Stackable switches can be modeled as virtual chassis in NetBox, with one device acting as the chassis master and the rest as members. All components of member devices will appear on the master.

堆叠交换机可以在 NetBox 中建模为虚拟机箱，一个设备充当机箱主设备，其余设备作为成员。成员设备的所有组件将显示在主设备上。

### Virtual Device Contexts / 虚拟设备上下文

A virtual device context (VDC) is a logical partition within a device. Each VDC operates autonomously but shares a common pool of resources. Each interface can be assigned to one or more VDCs on its device.

虚拟设备上下文 (VDC) 是设备内的逻辑分区。每个 VDC 自主运行但共享公共资源池。每个接口可以分配给它设备上的一个或多个 VDC。

## Cables / 线缆

NetBox models cables as connections among certain types of device components and other objects. Each cable can be assigned a type, color, length, and label. NetBox will enforce basic sanity checks to prevent invalid connections.

NetBox 将线缆建模为某些类型的设备组件和其他对象之间的连接。每根线缆可以分配类型、颜色、长度和标签。NetBox 将执行基本健全性检查以防止无效连接。
`;export{e as default};
