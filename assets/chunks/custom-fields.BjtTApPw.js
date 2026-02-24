const e=`---
title: Custom Fields 自定义字段
description: NetBox 自定义字段
---

# Custom Fields / 自定义字段

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/customization/custom-fields/) | 如有侵权请[联系我们](/contact)删除*

Custom fields allow storing additional object attributes without modifying the core schema. Data is stored as JSON alongside each object.

自定义字段允许在不修改核心架构的情况下存储额外对象属性。数据以 JSON 形式与每个对象一起存储。

## Creating Custom Fields / 创建自定义字段

Navigate to **Customization > Custom Fields**. Supported types:

- **Multiple object** - One or more NetBox objects
- **Object** - Single NetBox object
- **Multiple selection** - Multiple values from choices
- **Selection** - Single choice from custom choices
- **JSON** - Arbitrary JSON data
- **URL** - Displayed as link in UI
- **Date & time** - ISO 8601 format
- **Date** - ISO 8601 date
- **Boolean** - True/false
- **Decimal** - Fixed-precision number
- **Integer** - Whole number
- **Long text** - Free-form, Markdown supported
- **Text** - Single-line text

Each field requires: **name** (alphanumeric + underscores), **label**, **weight** (for form ordering), and assignment to one or more object types.

## Filtering / 过滤

- **Loose** (default): Partial match
- **Exact**: Complete match
- **Disabled**: No filtering

## Grouping / 分组

Assign the same group name to related fields to display them under a heading in the UI.

## Visibility & Editing / 可见性与编辑

- **Display**: Hidden | If Set | Always
- **Editing**: Hidden | No (read-only) | Yes

## REST API / REST API

Custom field data is in the \`custom_fields\` attribute:

\`\`\`json
{
  "custom_fields": {
    "deployed": "2018-06-19",
    "site_code": "US-NC-RAL42"
  }
}
\`\`\`

## Templates / 模板

In Jinja2 templates (export templates, webhooks), access via:

\`\`\`
{{ object.cf.field_name }}
\`\`\`
`;export{e as default};
