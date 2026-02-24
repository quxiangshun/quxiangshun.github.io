const e=`---
title: Background Jobs 后台任务
description: NetBox 后台任务
---

# Background Jobs / 后台任务

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/background-jobs/) | 如有侵权请[联系我们](/contact)删除*

NetBox 使用 Redis/django-rq 进行任务队列管理。事件规则、webhook 等异步任务在后台处理。可通过 System > Background Tasks 查看当前任务队列和失败的任务。

NetBox uses Redis/django-rq for task queue management. Asynchronous tasks such as event rules and webhooks are processed in the background. The current task queue and failed tasks can be inspected under System > Background Tasks.

详见 [NetBox Labs Background Jobs 文档](https://netboxlabs.com/docs/netbox/features/background-jobs/)。
`;export{e as default};
