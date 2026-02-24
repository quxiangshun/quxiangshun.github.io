const n=`---
title: Data Source 数据源
description: NetBox DataSource 模型
---

# Data Source / 数据源

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/core/datasource/) | 如有侵权请[联系我们](/contact)删除*

外部数据仓库（如 git 仓库、S3、本地目录）。同步后文件以 [Data File](datafile) 形式存储。

## 主要字段

| 字段 | 说明 |
| --- | --- |
| Type | 类型：git、local、Amazon S3 |
| URL | 源地址 |
| Ignore Rules | 同步时忽略的文件规则 |
| Sync Interval | 自动同步间隔 |
`;export{n as default};
