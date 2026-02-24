const n=`---
title: Removing a Plugin 移除插件
description: NetBox 插件移除指南
---

# Removing a Plugin / 移除插件

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/plugins/removal/) | 如有侵权请[联系我们](/contact)删除*

::: warning 注意
每个插件可能有额外步骤，移除前请查阅该插件的文档。
:::

## 1. Disable the Plugin / 禁用插件

从 \`configuration.py\` 的 \`PLUGINS\` 列表中移除该插件。

## 2. Remove Configuration / 移除配置

删除 \`PLUGINS_CONFIG\` 中该插件的配置项。

## 3. Re-index Search / 重建搜索索引

\`\`\`bash
cd /opt/netbox/netbox
source /opt/netbox/venv/bin/activate
python3 manage.py reindex
\`\`\`

## 4. Uninstall Python Package / 卸载 Python 包

\`\`\`bash
pip uninstall <package>
\`\`\`

## 5. Restart WSGI / 重启 WSGI

\`\`\`bash
sudo systemctl restart netbox
\`\`\`

## 6. Drop Database Tables / 删除数据库表

仅对创建了数据库表的插件需要。进入 \`dbshell\` 查看表：

\`\`\`sql
\\dt pluginname_*
DROP TABLE pluginname_foo;
DROP TABLE pluginname_bar;
\`\`\`

## 7. Remove Migration Records / 移除迁移记录

\`\`\`sql
DELETE FROM django_migrations WHERE app='pluginname';
\`\`\`

## 8. Clean Up Content Types / 清理 Content Types

使用 Django shell 移除残留的 ContentType 和 Permission 条目。详见 [NetBox Labs 文档](https://netboxlabs.com/docs/netbox/plugins/removal/)。
`;export{n as default};
