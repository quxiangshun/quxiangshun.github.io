const n=`---
title: Cluster 集群
description: NetBox Cluster 模型中英对照
---

# Cluster / 集群

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/virtualization/cluster/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 集群是物理资源的逻辑分组，虚拟机在其中运行。物理设备可作为宿主机与集群关联，便于跟踪虚拟机所在的宿主机。

**English:** A cluster is a logical grouping of physical resources within which virtual machines run. Physical devices may be associated with clusters as hosts. This allows users to track on which host(s) a particular virtual machine may reside.

## 字段 | Fields

### 名称 | Name

**中文：** 集群的人类可读名称。在同一分组和站点内必须唯一。

**English:** A human-friendly name for the cluster. Must be unique within the assigned group and site.

### 类型 | Type

**中文：** 为该集群分配的集群类型。

**English:** The cluster type assigned for this cluster.

### 分组 | Group

**中文：** 该集群所属的集群分组。

**English:** The cluster group to which this cluster belongs.

### 状态 | Status

**中文：** 集群的运行状态。可通过 FIELD_CHOICES 配置参数扩展。

**English:** The cluster's operational status. Additional statuses may be defined via FIELD_CHOICES.

### 作用域 | Scope

**中文：** (NetBox v4.2 取代 site 字段。) 与该集群关联的区域、站点、站点组或位置。

**English:** (Replaced the site field in NetBox v4.2.) The region, site, site group or location with which this cluster is associated.

## 官方文档

- [Cluster 完整文档 →](https://netboxlabs.com/docs/netbox/models/virtualization/cluster/)
`;export{n as default};
