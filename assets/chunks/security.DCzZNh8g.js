const e=`---
title: Security 安全
description: NetBox 安全与认证配置
---

# Security & Authentication Parameters / 安全与认证参数

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/configuration/security/) | 如有侵权请[联系我们](/contact)删除*

## ALLOWED_URL_SCHEMES

Default: \`('file', 'ftp', 'ftps', 'http', 'https', 'irc', 'mailto', 'sftp', 'ssh', 'tel', 'telnet', 'tftp', 'vnc', 'xmpp')\`. Permitted URL schemes for links in NetBox.

## AUTH_PASSWORD_VALIDATORS

Django password validators for local accounts. Default enforces: at least 12 characters, one uppercase, one lowercase, one digit.

## CORS_ORIGIN_ALLOW_ALL

Default: \`False\`. If \`True\`, CORS requests from all origins are accepted.

## CORS_ORIGIN_WHITELIST

List of authorized origins for cross-site API requests.

\`\`\`python
CORS_ORIGIN_WHITELIST = ['https://example.com']
\`\`\`

## CSRF_COOKIE_SECURE

Default: \`False\`. If \`True\`, CSRF cookie only sent over HTTPS.

## CSRF_TRUSTED_ORIGINS

List of trusted origins for POST requests. Must include scheme:

\`\`\`python
CSRF_TRUSTED_ORIGINS = ('http://netbox.local', 'https://netbox.local')
\`\`\`

## DEFAULT_PERMISSIONS

Object permissions applied automatically to authenticated users. Default allows users to manage their own API tokens.

## EXEMPT_VIEW_PERMISSIONS

Default: \`[]\`. Models exempt from view permission enforcement. Format: \`'app.model'\`.

## LOGIN_REQUIRED

Default: \`True\`. Only authenticated users can access NetBox.

## LOGIN_TIMEOUT

Default: \`1209600\` (14 days). Session cookie lifetime in seconds.

## LOGIN_PERSISTENCE

Default: \`False\`. If \`True\`, session lifetime resets on each request.

## SECURE_SSL_REDIRECT

Default: \`False\`. If \`True\`, redirect all HTTP to HTTPS.

## SESSION_COOKIE_SECURE

Default: \`False\`. If \`True\`, session cookie only sent over HTTPS.

## SESSION_FILE_PATH

Default: \`None\`. Path for file-based session storage (alternative to database). Useful for standby instances without DB write access.
`;export{e as default};
