const e=`---
title: Event Rules 事件规则
description: NetBox 事件规则
---

# Event Rules / 事件规则

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/event-rules/) | 如有侵权请[联系我们](/contact)删除*

NetBox includes the ability to automatically perform certain functions in response to internal events. These include:

NetBox 包括响应内部事件自动执行某些功能的能力。这些包括：

- Generating [user notifications](https://netboxlabs.com/docs/netbox/features/notifications/)
- Sending a [webhook](https://netboxlabs.com/docs/netbox/integrations/webhooks/)
- Executing a [custom script](https://netboxlabs.com/docs/netbox/customization/custom-scripts/)

For example, suppose you want to automatically configure a monitoring system to start monitoring a device when its operational status is changed to active, and remove it from monitoring for any other status. You can create a webhook in NetBox for the device model and craft its content and destination URL to effect the desired change on the receiving system. You can then associate an event rule with this webhook and the webhook will be sent automatically by NetBox whenever the configured constraints are met.

例如，假设您希望当设备的运营状态更改为活动时自动配置监控系统开始监控该设备，并在任何其他状态时将其从监控中移除。您可以在 NetBox 中为设备模型创建 webhook，并制作其内容和目标 URL 以在接收系统上实现所需的更改。然后，您可以将事件规则与此 webhook 关联，每当满足配置的约束时，NetBox 将自动发送 webhook。

Each event must be associated with at least one NetBox object type and at least one event (e.g. create, update, or delete).

每个事件必须与至少一个 NetBox 对象类型和至少一个事件（例如创建、更新或删除）关联。

## Conditional Event Rules / 条件事件规则

An event rule may include a set of conditional logic expressed in JSON used to control whether an event triggers for a specific object. For example, you may wish to trigger an event for devices only when the \`status\` field of an object is "active".

事件规则可以包括以 JSON 表示的一组条件逻辑，用于控制事件是否针对特定对象触发。例如，您可能希望仅当对象的 \`status\` 字段为 "active" 时才为设备触发事件。
`;export{e as default};
