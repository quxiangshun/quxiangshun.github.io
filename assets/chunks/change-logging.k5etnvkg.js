const e=`---
title: Change Logging 变更日志
description: NetBox 变更记录
---

# Change Logging / 变更日志

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/change-logging/) | 如有侵权请[联系我们](/contact)删除*

Every time an object in NetBox is created, updated, or deleted, a serialized copy of that object taken both before and after the change is saved to the database, along with metadata including the current time and the user associated with the change. These records form a persistent record of changes both for each individual object as well as NetBox as a whole. The global change log can be viewed by navigating to Other > Change Log.

每次在 NetBox 中创建、更新或删除对象时，该对象在更改前后的序列化副本都会保存到数据库，以及包括当前时间和与更改关联的用户的元数据。这些记录形成每个单独对象以及整个 NetBox 的持久更改记录。可以通过导航到 Other > Change Log 查看全局更改日志。

A serialized representation of the instance being modified is included in JSON format. This is similar to how objects are conveyed within the REST API, but does not include any nested representations.

正在修改的实例的序列化表示以 JSON 格式包含。这与 REST API 中传达对象的方式类似，但不包括任何嵌套表示。

When a request is made, a UUID is generated and attached to any change records resulting from that request. For example, editing three objects in bulk will create a separate change record for each (three in total), and each of those objects will be associated with the same UUID. This makes it easy to identify all the change records resulting from a particular request.

发出请求时，会生成 UUID 并附加到该请求产生的任何更改记录。例如，批量编辑三个对象将为每个对象创建单独的更改记录（总共三个），每个对象将与相同的 UUID 关联。这使得可以轻松识别特定请求产生的所有更改记录。

## User Messages / 用户消息

When creating, modifying, or deleting an object in NetBox, a user has the option of recording an arbitrary message (up to 200 characters) that will appear in the change record. This can be helpful to capture additional context, such as the reason for a change or a reference to an external ticket.

在 NetBox 中创建、修改或删除对象时，用户可以选择记录将出现在更改记录中的任意消息（最多 200 个字符）。这有助于捕获额外的上下文，例如更改原因或外部工单的引用。
`;export{e as default};
