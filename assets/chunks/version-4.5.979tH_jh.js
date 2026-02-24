const n=`---
title: Version 4.5
description: NetBox 4.5 发布说明中英对照
---

# NetBox v4.5

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/release-notes/version-4.5/) | 如有侵权请[联系我们](/contact)删除*

## 版本概览 | Version Overview

**中文：** NetBox v4.5 系列主要更新：过滤器表单支持查找修饰符；API Token v2（Bearer 格式、HMAC）；对象所有权 (Owner)；高级端口映射 (PortMapping)；线缆配置 (Cable Profiles)。v4.5.0 移除 load_yaml/load_json、旧 contenttypes、Python 3.10/3.11 支持等。

**English:** NetBox v4.5 introduces: lookup modifiers in filter forms; API Token v2 (Bearer, HMAC); Object Ownership; advanced port mappings; Cable Profiles. v4.5.0 removes load_yaml/load_json, legacy contenttypes, Python 3.10/3.11 support.

## 主要版本 | Key Versions

| 版本 | 发布日期 | 说明 |
|------|----------|------|
| v4.5.2 | 2026-02-03 | REST omit 参数、光标分页、性能优化等 |
| v4.5.1 | 2026-01-20 | GraphQL 过滤、可用 IP 指定前缀长度等 |
| v4.5.0 | 2026-01-06 | 重大变更与新功能 |

## 官方文档

- [Version 4.5 完整发布说明 →](https://netboxlabs.com/docs/netbox/release-notes/version-4.5/)
`;export{n as default};
