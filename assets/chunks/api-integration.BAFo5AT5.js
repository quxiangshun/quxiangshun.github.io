const e=`---
title: API & Integration API 与集成
description: NetBox API 与集成
---

# API & Integration / API 与集成

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/features/api-integration/) | 如有侵权请[联系我们](/contact)删除*

NetBox includes a slew of features which enable integration with other tools and resources powering your network.

NetBox 包含大量功能，可与为您的网络提供支持的其他工具和资源集成。

## REST API / REST API

NetBox's REST API, powered by the [Django REST Framework](https://www.django-rest-framework.org/), provides a robust yet accessible interface for creating, modifying, and deleting objects. Employing HTTP for transfer and JSON for data encapsulation, the REST API is easily consumed by clients on any platform and extremely well suited for automation tasks.

NetBox 的 REST API 由 [Django REST Framework](https://www.django-rest-framework.org/) 提供支持，为创建、修改和删除对象提供了强大而可访问的接口。REST API 使用 HTTP 进行传输，使用 JSON 进行数据封装，易于任何平台上的客户端使用，非常适合自动化任务。

The REST API employs token-based authentication, which maps API clients to user accounts and their assigned permissions. The API endpoints are fully documented using OpenAPI, and NetBox even includes a convenient browser-based version of the API for exploration. The open source [pynetbox](https://github.com/netbox-community/pynetbox) and [go-netbox](https://github.com/netbox-community/go-netbox) API client libraries are also available for Python and Go, respectively.

REST API 采用基于令牌的身份验证，将 API 客户端映射到用户账户及其分配的权限。API 端点使用 OpenAPI 完全记录，NetBox 甚至包括一个方便的基于浏览器的 API 版本供探索。开源 [pynetbox](https://github.com/netbox-community/pynetbox) 和 [go-netbox](https://github.com/netbox-community/go-netbox) API 客户端库分别适用于 Python 和 Go。

To learn more: [REST API documentation](https://netboxlabs.com/docs/netbox/integrations/rest-api/)

## GraphQL API / GraphQL API

NetBox also provides a [GraphQL](https://graphql.org/) API to complement its REST API. GraphQL enables complex queries for arbitrary objects and fields, enabling the client to retrieve only the specific data it needs from NetBox. This is a special-purpose read-only API intended for efficient queries. Like the REST API, the GraphQL API employs token-based authentication.

NetBox 还提供 [GraphQL](https://graphql.org/) API 作为其 REST API 的补充。GraphQL 支持对任意对象和字段进行复杂查询，使客户端能够仅从 NetBox 检索所需的特定数据。这是一个用于高效查询的特殊用途只读 API。与 REST API 一样，GraphQL API 采用基于令牌的身份验证。

To learn more: [GraphQL API documentation](https://netboxlabs.com/docs/netbox/integrations/graphql-api/)

## Webhooks / Webhooks

A webhook is a mechanism for conveying to some external system a change that has taken place in NetBox. For example, you may want to notify a monitoring system whenever the status of a device is updated in NetBox. Webhooks are an excellent mechanism for building event-based automation processes.

Webhook 是一种向某些外部系统传达 NetBox 中发生的更改的机制。例如，您可能希望在 NetBox 中更新设备状态时通知监控系统。Webhook 是构建基于事件的自动化过程的绝佳机制。

To learn more: [webhooks documentation](https://netboxlabs.com/docs/netbox/integrations/webhooks/)

## Prometheus Metrics / Prometheus 指标

NetBox includes a special \`/metrics\` view which exposes metrics for a [Prometheus](https://prometheus.io/) scraper, powered by the open source [django-prometheus](https://github.com/korfuri/django-prometheus) library.

NetBox 包含一个特殊的 \`/metrics\` 视图，该视图为由开源 [django-prometheus](https://github.com/korfuri/django-prometheus) 库提供支持的 [Prometheus](https://prometheus.io/) 抓取器公开指标。
`;export{e as default};
