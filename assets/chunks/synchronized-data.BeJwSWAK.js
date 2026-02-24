const t=`---
title: Synchronized Data 同步数据
description: NetBox 同步数据
---

# Synchronized Data / 同步数据

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/integrations/synchronized-data/) | 如有侵权请[联系我们](/contact)删除*

部分 NetBox 模型支持从远程 [Data Sources](https://netboxlabs.com/docs/netbox/models/core/datasource/)（如 GitHub/GitLab 仓库）自动同步属性。远程权威数据以 [Data Files](https://netboxlabs.com/docs/netbox/models/core/datafile/) 形式同步到本地。

## Permissions / 权限

用户需具备 \`core.sync_datasource\` 权限才能同步。通过为 "Core > Data Source" 对象类型创建 \`sync\` 操作权限并分配给用户/组实现。

## Supported Features / 支持功能

- [Export templates](../customization/export-templates)
- [Configuration context data](../features/context-data)
- [Configuration templates](../features/configuration-rendering)
`;export{t as default};
