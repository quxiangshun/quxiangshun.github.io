const e=`---
title: REST API Filtering 过滤
description: NetBox REST API 过滤中英对照
---

# REST API Filtering / REST API 过滤

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/reference/filtering/) | 如有侵权请[联系我们](/contact)删除*

## 过滤对象 | Filtering Objects

**中文：** 在 list 端点 URL 后附加一个或多个查询参数即可过滤返回对象。例如 \`GET /api/dcim/sites/?status=active\` 仅返回 status 为 active 的站点。多个参数组合可进一步缩小结果。同一参数传多个值一般表示 OR；如 tags 等可能多值的字段，多个值表示 AND。

**English:** Attach one or more query parameters to the request URL to filter objects. E.g. \`GET /api/dcim/sites/?status=active\` returns only active sites. Multiple parameters narrow results. Multiple values for one param usually mean OR; for multi-value fields like tags, multiple values mean AND.

### 按选项字段过滤 | Filtering by Choice Field

**中文：** 某些模型的字段（如 Prefix 的 status）仅接受特定选项。可通过向该模型 list 端点发送带 Token 的 OPTIONS 请求，用 jq 提取 \`actions.POST.status.choices\` 获取所有可用选项。

**English:** Some models have choice fields (e.g. Prefix status). Make an authenticated OPTIONS request to the list endpoint and use jq to extract \`actions.POST.status.choices\` for available options.

### 按自定义字段过滤 | Filtering by Custom Field

**中文：** 自定义字段过滤时在字段名前加 \`cf_\`。例如 \`GET /api/dcim/sites/?cf_foo=123\` 只返回自定义字段 foo 等于 123 的站点。

**English:** Prepend \`cf_\` to the custom field name. E.g. \`GET /api/dcim/sites/?cf_foo=123\` returns sites where custom field foo equals 123.

## 查找表达式 | Lookup Expressions

**中文：** 支持在字段名后加双下划线和查找符，如 \`mac_address__n\` 表示不等于。数值字段支持：n, lt, lte, gt, gte, empty。字符串字段支持：n, ic(包含), nic(不包含), isw(开头), nie(不包含精确匹配), empty, regex, iregex 等。外键主要支持 n。

**English:** Add \`__lookup\` suffix to field name (e.g. \`mac_address__n\` for negation). Numeric: n, lt, lte, gt, gte, empty. String: n, ic, nic, isw, iew, ie, nie, empty, regex, iregex. Foreign keys support n.

### 示例 | Examples

\`\`\`
GET /api/ipam/vlans/?vid__gt=900
GET /api/dcim/devices/?name__ic=switch
GET /api/ipam/vlans/?group_id__n=3203
\`\`\`

## 排序 | Ordering Objects

**中文：** 使用 \`ordering\` 参数。例如 \`?ordering=facility\` 按 facility 升序；\`?ordering=-facility\` 降序；\`?ordering=facility,-name\` 多字段排序。

**English:** Use \`ordering\` param. E.g. \`?ordering=facility\` asc, \`?ordering=-facility\` desc, \`?ordering=facility,-name\` for multiple fields.

## 官方文档

- [Filtering 完整文档 →](https://netboxlabs.com/docs/netbox/reference/filtering/)
`;export{e as default};
