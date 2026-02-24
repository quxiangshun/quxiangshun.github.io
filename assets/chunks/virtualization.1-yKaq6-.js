const e=`---
title: Virtualization 虚拟化
description: NetBox 虚拟机与集群
---

# Virtualization / 虚拟化

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/virtualization/) | 如有侵权请[联系我们](/contact)删除*

Virtual machines and clusters can be modeled in NetBox alongside physical infrastructure. IP addresses and other resources are assigned to these objects just like physical objects, providing a seamless integration between physical and virtual networks.

虚拟机和集群可以在 NetBox 中与物理基础设施一起建模。IP 地址和其他资源像物理对象一样分配给这些对象，提供物理和虚拟网络之间的无缝集成。

## Clusters / 集群

A cluster is one or more physical host devices on which virtual machines can run. Each cluster must have a type and operational status, and may be assigned to a group. (Both types and groups are user-defined.) Each cluster may designate one or more devices as hosts, however this is optional.

集群是一个或多个可以运行虚拟机的物理主机设备。每个集群必须具有类型和运营状态，并可以分配给组。（类型和组都是用户定义的。）每个集群可以指定一个或多个设备作为主机，但这是可选的。

## Virtual Machines / 虚拟机

A virtual machine is a virtualized compute instance. These behave in NetBox very similarly to device objects, but without any physical attributes. For example, a VM may have interfaces assigned to it with IP addresses and VLANs, however its interfaces cannot be connected via cables (because they are virtual). Each VM may also define its compute, memory, and storage resources as well.

虚拟机是虚拟化的计算实例。这些在 NetBox 中的行为与设备对象非常相似，但没有任何物理属性。例如，VM 可能分配有带 IP 地址和 VLAN 的接口，但其接口不能通过线缆连接（因为它们是虚拟的）。每个 VM 还可以定义其计算、内存和存储资源。
`;export{e as default};
