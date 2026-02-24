const n=`---
title: Virtual Disk 虚拟磁盘
description: NetBox VirtualDisk 模型中英对照
---

# Virtual Disk / 虚拟磁盘

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/virtualization/virtualdisk/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 虚拟磁盘用于建模分配给[虚拟机](/tech-share/netbox/4.5.1/community/data-model/virtualization/virtualmachine)的独立虚拟硬盘。

**English:** A virtual disk is used to model discrete virtual hard disks assigned to virtual machines.

---

## 字段 | Fields

### 名称 | Name

**中文：** 人类可读名称，在所属虚拟机内唯一。

**English:** A human-friendly name that is unique to the assigned virtual machine.

### 大小 | Size

**中文：** 分配的磁盘大小，单位兆字节 (MB)。

**English:** The allocated disk size, in megabytes.

---

## 官方文档

- [Virtual Disk 完整文档 →](https://netboxlabs.com/docs/netbox/models/virtualization/virtualdisk/)
`;export{n as default};
