const n=`---
title: Cluster Group 集群分组
description: NetBox ClusterGroup 模型中英对照
---

# Cluster Group / 集群分组

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/virtualization/clustergroup/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 集群分组可用于组织集群。将集群归入分组是可选的。

**English:** Cluster groups may be created for the purpose of organizing clusters. The arrangement of clusters into groups is optional.

## 字段 | Fields

### 名称 | Name

**中文：** 唯一的人类可读名称。

**English:** A unique human-friendly name.

### 别名 | Slug

**中文：** 唯一的 URL 友好标识符，可用于过滤。

**English:** A unique URL-friendly identifier. This value can be used for filtering.

## 官方文档

- [Cluster Group 完整文档 →](https://netboxlabs.com/docs/netbox/models/virtualization/clustergroup/)
`;export{n as default};
