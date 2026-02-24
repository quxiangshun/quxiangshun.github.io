const n=`---
title: System Parameters 系统参数
description: NetBox 系统配置参数
---

# System Parameters / 系统参数

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/configuration/system/) | 如有侵权请[联系我们](/contact)删除*

## BASE_PATH

Default: \`None\`. Base URL path when NetBox is installed under a subpath (e.g. \`https://example.com/netbox/\`):

\`\`\`python
BASE_PATH = 'netbox/'
\`\`\`

## DATABASE_ROUTERS

Default: \`[]\`. Used when multiple databases are configured.

## DEFAULT_LANGUAGE

Default: \`en-us\`. Default preferred language for requests.

## DOCS_ROOT

Default: \`$INSTALL_ROOT/docs/\`. Path to NetBox documentation. Set to \`None\` to disable.

## EMAIL

Email server configuration for sending emails:

\`\`\`python
EMAIL = {
    'SERVER': 'localhost',
    'PORT': 25,
    'USERNAME': '',
    'PASSWORD': '',
    'USE_TLS': False,
    'USE_SSL': False,
    'FROM_EMAIL': 'noreply@example.com',
}
\`\`\`

## HOSTNAME

Default: System hostname. Hostname displayed in the UI (v4.4+).

## HTTP_PROXIES

Proxy configuration for outbound requests (e.g. webhooks):

\`\`\`python
HTTP_PROXIES = {
    'http': 'http://10.10.1.10:3128',
    'https': 'http://10.10.1.10:1080',
}
\`\`\`

## INTERNAL_IPS

Default: \`('127.0.0.1', '::1')\`. IPs for debugging output.

## ISOLATED_DEPLOYMENT

Default: \`False\`. Set to \`True\` for deployments without Internet access.

## LOGGING

Customize logging via Django logging config. See [Django logging documentation](https://docs.djangoproject.com/en/stable/topics/logging/).

## MEDIA_ROOT

Default: \`$INSTALL_ROOT/netbox/media/\`. Path for uploaded files.

## REPORTS_ROOT

Default: \`$INSTALL_ROOT/netbox/reports/\`. Path for custom reports.

## SCRIPTS_ROOT

Default: \`$INSTALL_ROOT/netbox/scripts/\`. Path for custom scripts.

## STORAGES

Backend storage for uploaded files. Integrates with django-storages for S3, etc.

## TIME_ZONE

Default: \`"UTC"\`. Time zone for dates and times.

## TRANSLATION_ENABLED

Default: \`True\`. Enables UI language translation.
`;export{n as default};
