const n=`---
title: Config Context 配置上下文
description: NetBox ConfigContext 模型
---

# Config Context / 配置上下文

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/extras/configcontext/) | 如有侵权请[联系我们](/contact)删除*

根据设备/虚拟机与其他对象的关系提供上下文数据。可关联站点、租户等。支持 JSON 数据或从 [Data File](../core/datafile) 同步。

## 主要字段

| 字段 | 说明 |
| --- | --- |
| Name | 唯一名称 |
| Weight | 合并顺序，数值越小越先合并 |
| Data | JSON 格式的上下文数据 |
| Data File | 可选，从远程数据文件同步 |
| Object Assignment | 关联对象，未选则为全局上下文 |
`;export{n as default};
