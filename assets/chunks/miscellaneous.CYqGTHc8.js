const n=`---
title: Miscellaneous 杂项
description: NetBox 杂项配置
---

# Miscellaneous Configuration / 杂项配置

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/configuration/miscellaneous/) | 如有侵权请[联系我们](/contact)删除*

## ADMINS

List of (name, email) tuples for error notifications.

## BANNER_TOP / BANNER_LOGIN / BANNER_BOTTOM

Custom banner text displayed in the UI.

## CHANGELOG_RETENTION

How long to retain changelog entries.

## JOB_RETENTION

How long to retain background job history.

## MAINTENANCE_MODE

Enable maintenance mode to restrict access.

## MAPS_URL

URL template for map integration.

## MAX_PAGE_SIZE

Maximum objects per API response page.

## PREFER_IPV4

Prefer IPv4 when displaying dual-stack addresses.

## ENFORCE_GLOBAL_UNIQUE

Enforce global uniqueness for certain fields.
`;export{n as default};
