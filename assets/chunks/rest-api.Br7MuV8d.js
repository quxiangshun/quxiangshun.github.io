const n=`---
title: REST API
description: NetBox REST API 概述
---

# REST API Overview / REST API 概述

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/integrations/rest-api/) | 如有侵权请[联系我们](/contact)删除*

## What is a REST API? / 什么是 REST API

REST 使用 HTTP 请求和 JSON 实现 CRUD 操作：

- \`GET\` - 检索对象
- \`POST\` - 创建对象
- \`PUT\`/\`PATCH\` - 修改对象
- \`DELETE\` - 删除对象

## Interactive Documentation / 交互式文档

运行中的 NetBox 实例在 \`/api/schema/swagger-ui/\` 提供完整交互式 API 文档。API 根路径为 \`/api/\`。

## Endpoint Hierarchy / 端点层级

API 按应用划分：circuits、DCIM、extras、IPAM、plugins、tenancy、users、virtualization。例如：

- \`/api/dcim/devices/\` - 设备列表/创建
- \`/api/dcim/devices/123/\` - 设备详情/更新/删除

## Serialization / 序列化

- **Complete** - 完整对象表示
- **Brief** - 最小表示，用于下拉列表
- \`?fields=id,name,status\` - 指定返回字段
- \`?omit=field1,field2\` - 排除字段 (v4.5.2+)
- \`?brief=true\` - 简要格式

## Pagination / 分页

响应包含 \`results\`、\`count\`、\`next\`、\`previous\`。可通过 \`limit\` 和 \`offset\` 控制分页。最大页大小由 \`MAX_PAGE_SIZE\` 配置。

## Authentication / 认证

- **v2 tokens** (推荐): \`Authorization: Bearer nbt_<key>.<token>\`
- **v1 tokens**: \`Authorization: Token <token>\`
- 写操作需要 token；部分只读端点可豁免

## Bulk Operations / 批量操作

- **创建多个**: POST 列表到 list 端点
- **更新多个**: PATCH 列表到 list 端点
- **删除多个**: DELETE 带 ID 列表到 list 端点
`;export{n as default};
