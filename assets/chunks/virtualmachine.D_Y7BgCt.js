const e=`---
title: Virtual Machine 虚拟机
description: NetBox VirtualMachine 模型中英对照
---

# Virtual Machine / 虚拟机

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/virtualization/virtualmachine/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 虚拟机 (VM) 表示托管在[集群](/tech-share/netbox/4.5.1/community/data-model/virtualization/cluster)内的虚拟计算实例。每台 VM 必须分配至[站点](/tech-share/netbox/4.5.1/community/data-model/dcim/site)和/或集群，可选择性分配至集群内特定宿主[设备](/tech-share/netbox/4.5.1/community/data-model/dcim/device)。VM 可挂载虚拟[接口](/tech-share/netbox/4.5.1/community/data-model/virtualization/vminterface)，不支持物理组件。当 VM 的接口分配了 IP 时，可指定主 IPv4/IPv6。

**English:** A virtual machine (VM) represents a virtual compute instance hosted within a cluster. Each VM must be assigned to a site and/or cluster, and may optionally be assigned to a particular host device within a cluster. VMs may have virtual interfaces assigned, but do not support physical components. When a VM has interfaces with IP addresses, a primary IPv4 and IPv6 can be designated.

---

## 字段 | Fields

| 字段 Field | 中文 | English |
|-----------|------|---------|
| **Name** | VM 配置名称，在集群和租户内唯一 | The VM's configured name. Must be unique to cluster and tenant |
| **Role** | 功能[角色](/tech-share/netbox/4.5.1/community/data-model/dcim/devicerole) | The functional role assigned to the VM |
| **Status** | 运行状态 | The VM's operational status |
| **Start on boot** | 宿主机「开机自启」设置 | The start on boot setting from the hypervisor |
| **Site & Cluster** | 所属站点和/或集群 | The site and/or cluster to which the VM is assigned |
| **Device** | 宿主物理设备 | The physical host device on which this VM resides |
| **Platform** | 操作系统[平台](/tech-share/netbox/4.5.1/community/data-model/dcim/platform) | A VM may be associated with a platform to indicate its OS |
| **Primary IPv4 & IPv6** | 主 IPv4/IPv6 管理地址 | Each VM may designate one primary IPv4 and/or IPv6 |
| **vCPUs** | 虚拟 CPU 数量（可为小数，如 1.5） | The number of virtual CPUs provisioned |
| **Memory** | 运行内存，单位 MB | The amount of running memory provisioned, in megabytes |
| **Disk** | 磁盘容量，单位 MB（无虚拟磁盘时 direct 修改；否则为所有磁盘之和） | Disk storage in MB. Editable only when no discrete virtual disks |
| **Serial Number** | 可选序列号（VM 不强制唯一） | Optional serial number assigned to this VM |

---

## 官方文档

- [Virtual Machine 完整文档 →](https://netboxlabs.com/docs/netbox/models/virtualization/virtualmachine/)
`;export{e as default};
