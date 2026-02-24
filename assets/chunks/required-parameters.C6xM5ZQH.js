const n=`---
title: Required Parameters 必填参数
description: NetBox 必填配置参数
---

# Required Configuration Settings / 必填配置参数

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/configuration/required-parameters/) | 如有侵权请[联系我们](/contact)删除*

## ALLOWED_HOSTS

List of valid FQDNs and/or IP addresses for reaching NetBox. Used to guard against HTTP Host header attacks. Must be a list or tuple.

\`\`\`python
ALLOWED_HOSTS = ['netbox.example.com', '192.0.2.123']
\`\`\`

For development only: \`ALLOWED_HOSTS = ['*']\`

## API_TOKEN_PEPPERS

Introduced in NetBox v4.5. Cryptographic peppers for hashing v2 API tokens. Define at least one pepper before creating v2 API tokens. Must be at least 50 characters.

\`\`\`python
API_TOKEN_PEPPERS = {
    1: 'kp7ht*76fiQAhUi5dHfASLlYUE_S^gI^(7J^K5M!LfoH@vl&b_',
}
\`\`\`

Use \`$INSTALL_ROOT/netbox/generate_secret_key.py\` to generate a pepper.

## DATABASES

PostgreSQL 14+ required. Define a \`default\` database:

\`\`\`python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'netbox',
        'USER': 'netbox',
        'PASSWORD': 'J5brHrAXFLQSif0K',
        'HOST': 'localhost',
        'PORT': '',
        'CONN_MAX_AGE': 300,
    }
}
\`\`\`

## REDIS

Required for tasks and caching. Keep tasks and cache databases separate.

\`\`\`python
REDIS = {
    'tasks': {
        'HOST': 'localhost',
        'PORT': 6379,
        'USERNAME': '',
        'PASSWORD': '',
        'DATABASE': 0,
        'SSL': False,
    },
    'caching': {
        'HOST': 'localhost',
        'PORT': 6379,
        'DATABASE': 1,
        'SSL': False,
    },
}
\`\`\`

UNIX socket: \`'URL': 'unix:///run/redis-netbox/redis.sock?db=0'\`

## SECRET_KEY

Pseudorandom string for cryptographic hashes. Must be at least 50 characters. Generate with \`python generate_secret_key.py\`.
`;export{n as default};
