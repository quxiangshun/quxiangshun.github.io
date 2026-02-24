const n=`---
title: Conditions 条件
description: NetBox 条件表达式中英对照
---

# Conditions / 条件

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/reference/conditions/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** 条件是 NetBox 用于判断数据是否满足预设条件的机制。通过声明任意数量的「属性-值-操作」三元组，嵌套在 AND/OR 逻辑层次中，表达简单逻辑。

**English:** Conditions are NetBox's mechanism for evaluating whether data meets a prescribed set of conditions. It allows declaring attribute-value-operation tuples nested within AND/OR logic.

## 条件结构 | Condition Structure

条件用 JSON 对象表示，包含以下键：

| 键 Key | 必填 | 默认 | 说明 |
|-------|------|------|------|
| attr | 是 | - | 被评估数据中的属性名 |
| value | 是 | - | 用于比较的参考值 |
| op | 否 | eq | 逻辑操作符 |
| negate | 否 | false | 是否取反 |

## 可用操作 | Available Operations

- \`eq\` 等于 / Equals
- \`contains\` 包含 / Contains
- \`in\` 在列表中 / Is present in list
- \`lt\` / \`lte\` 小于 / 小于等于
- \`gt\` / \`gte\` 大于 / 大于等于

## 嵌套键访问 | Accessing Nested Keys

使用点号访问嵌套键，如 \`a.b.c\` 表示 \`data.a.b.c\` 的值。

## 条件集 | Condition Sets

使用 \`and\` 或 \`or\` 键将多个条件组合为嵌套集合，值为条件对象或子条件集的数组。

## 官方文档

- [Conditions 完整文档 →](https://netboxlabs.com/docs/netbox/reference/conditions/)
`;export{n as default};
