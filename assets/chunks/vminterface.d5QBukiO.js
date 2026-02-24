const e=`---
title: VM Interface 虚拟机接口
description: NetBox VMInterface 模型中英对照
---

# VM Interface / 虚拟机接口

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/virtualization/vminterface/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** [虚拟机](/tech-share/netbox/4.5.1/community/data-model/virtualization/virtualmachine)接口与设备[接口](/tech-share/netbox/4.5.1/community/data-model/dcim/interface)类似：可分配 VRF、IP 地址、VLAN 等。但因虚拟属性，不具备物理特性（如物理类型、线缆连接）。

**English:** Virtual machine interfaces behave similarly to device interfaces: They can be assigned to VRFs, may have IP addresses, VLANs, and so on. However, given their virtual nature, they lack properties pertaining to physical attributes (e.g. physical type, cables).

---

## 字段 | Fields

| 字段 Field | 中文 | English |
|-----------|------|---------|
| **Virtual Machine** | 该接口所属的虚拟机 | The virtual machine to which this interface is assigned |
| **Name** | 接口名称，在所属 VM 内唯一 | The interface's name. Must be unique to the assigned VM |
| **Parent Interface** | 子接口的父接口（如封装用） | Identifies the parent interface of a subinterface |
| **Bridged Interface** | 与该接口桥接的同 VM 接口 | An interface on the same VM with which this interface is bridged |
| **Enabled** | 未勾选则视为禁用 | If not selected, this interface will be treated as disabled |
| **Primary MAC Address** | 主 MAC 地址 | The primary MAC address assigned to this interface |
| **MTU** | 最大传输单元 | The interface's configured MTU |
| **802.1Q Mode** | Q-in-Q / Tagged / Access 等模式 | Identifies the 802.1Q encapsulation strategy |
| **Untagged VLAN** | 原生（未标记）VLAN | The "native" (untagged) VLAN for the interface |
| **Tagged VLANs** | 标记的 VLAN 列表 | The tagged VLANs carried by this interface |
| **VRF** | 关联的 VRF 实例 | The VRF instance to which this interface is assigned |

::: tip 注意
存在子接口的父接口，需先删除或重新分配所有子接口才能删除该接口。
:::

---

## 官方文档

- [VM Interface 完整文档 →](https://netboxlabs.com/docs/netbox/models/virtualization/vminterface/)
`;export{e as default};
