const e=`---
title: Prometheus Metrics
description: NetBox Prometheus 指标
---

# Prometheus Metrics / Prometheus 指标

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/integrations/prometheus-metrics/) | 如有侵权请[联系我们](/contact)删除*

NetBox 可选暴露 Prometheus 指标，通过 \`METRICS_ENABLED\` 配置。默认不暴露。指标端点：\`/metrics\`。

## Metric Types / 指标类型

基于 [django-prometheus](https://github.com/korfuri/django-prometheus)，包括：

- REST API 请求（按端点和方法）
- GraphQL API 请求
- 数据库连接、执行、错误计数
- 缓存命中/未命中/失效计数
- 响应码计数
- 请求延迟直方图

## Multi-Process Notes / 多进程说明

多进程部署（如多个 Gunicorn worker）时，需配置 \`prometheus_multiproc_dir\` 环境变量指向共享目录以聚合各 worker 的指标。多进程环境下建议使用 uWSGI 而非 Gunicorn 以获得更准确的长期指标。
`;export{e as default};
