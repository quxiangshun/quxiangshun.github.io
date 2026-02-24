const n=`---
title: Replicating NetBox 复制
description: NetBox 实例复制
---

# Replicating NetBox / 复制 NetBox

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/administration/replicating-netbox/) | 如有侵权请[联系我们](/contact)删除*

## 复制数据库

导出：

\`\`\`bash
pg_dump --username netbox --password --host localhost netbox > netbox.sql
\`\`\`

排除 changelog：\`--exclude-table-data=core_objectchange\`

恢复：

\`\`\`bash
psql -c 'drop database netbox'
psql -c 'create database netbox'
psql netbox < netbox.sql
\`\`\`

仅导出 schema：\`pg_dump -s netbox > netbox_schema.sql\`

## 复制媒体文件

归档：\`tar -czf netbox_media.tar.gz netbox/media/\`

恢复：\`tar -xf netbox_media.tar.gz\`

::: note
使用远程存储后端时无需复制媒体目录。
:::
`;export{n as default};
