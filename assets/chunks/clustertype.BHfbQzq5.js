const e=`---
title: Cluster Type 集群类型
description: NetBox ClusterType 模型中英对照
---

# Cluster Type / 集群类型

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/virtualization/clustertype/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 集群类型表示形成[集群](/tech-share/netbox/4.5.1/community/data-model/virtualization/cluster)所采用的技术或机制。例如，可为本地部署创建「VMware vSphere」，或为云服务商创建「DigitalOcean NYC3」。

**English:** A cluster type represents a technology or mechanism by which a cluster is formed. For example, you might create a cluster type named "VMware vSphere" for a locally hosted cluster or "DigitalOcean NYC3" for one hosted by a cloud provider.

---

## 字段 | Fields

### 名称 | Name

**中文：** 唯一的人类可读名称。

**English:** A unique human-friendly name.

### 别名 | Slug

**中文：** 唯一的 URL 友好标识符，可用于过滤。

**English:** A unique URL-friendly identifier. This value can be used for filtering.

---

## 官方文档

- [Cluster Type 完整文档 →](https://netboxlabs.com/docs/netbox/models/virtualization/clustertype/)
`;export{e as default};
