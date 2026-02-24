const n=`---
title: Error Reporting 错误报告
description: NetBox 错误报告配置
---

# Error Reporting / 错误报告

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/administration/error-reporting/) | 如有侵权请[联系我们](/contact)删除*

## Sentry

NetBox 支持 [Sentry](https://sentry.io/) 集成。在 \`configuration.py\` 中配置：

\`\`\`python
SENTRY_ENABLED = True
SENTRY_DSN = "https://examplePublicKey@o0.ingest.sentry.io/0"
\`\`\`

可选标签：

\`\`\`python
SENTRY_TAGS = {
    "custom.foo": "123",
    "custom.bar": "abc",
}
\`\`\`

::: warning
避免使用 \`netbox.\` 前缀的标签名。
:::
`;export{n as default};
