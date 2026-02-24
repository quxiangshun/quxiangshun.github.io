const t=`---
title: Populating Data 数据填充
description: NetBox 数据填充方法
---

# Populating Data / 数据填充

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/getting-started/populating-data/) | 如有侵权请[联系我们](/contact)删除*

This section covers the mechanisms which are available to populate data in NetBox.

本节介绍 NetBox 中可用的数据填充方法。

## Manual Object Creation / 手动创建对象

The simplest way is to use the object creation forms in the user interface. Find the object type in the navigation menu and click the green "Add" button.

最简单的方式是使用用户界面中的对象创建表单。在导航菜单中找到对象类型，点击绿色的 "Add" 按钮。

::: warning 不适合大批量导入
Creating objects one at a time does not scale well. For large imports, use CSV/YAML import, scripting, or the REST API.
:::

## Bulk Import (CSV/YAML) / 批量导入

NetBox supports bulk import using CSV-formatted data. CSV can be imported as raw text or by uploading a file. If an "id" field is added, data will update existing records instead of creating new ones.

NetBox 支持使用 CSV 格式进行批量导入。某些模型（如 device types、module types）使用 YAML 格式以支持父子对象导入。

## Scripting / 脚本

For patterned data (e.g., 100 sites × 5 VLANs each), custom scripts can automatically create objects according to a pattern. This ensures validity and eliminates manual verification.

对于有规律的数据，可使用自定义脚本按模式自动创建对象。

## REST API / REST API

Full programmatic control over object creation. Supports bulk creation in a single request. See [REST API documentation](../features/api-integration).

可通过 REST API 以编程方式创建对象，支持单次请求批量创建。
`;export{t as default};
