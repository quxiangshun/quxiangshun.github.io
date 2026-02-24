const n=`---
title: Installing a Plugin 安装插件
description: NetBox 插件安装指南
---

# Installing a Plugin / 安装插件

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/plugins/installation/) | 如有侵权请[联系我们](/contact)删除*

::: warning 注意
每个插件可能有额外步骤，安装前请查阅该插件的文档。
:::

## 1. Install the Python Package / 安装 Python 包

在 NetBox 虚拟环境中安装：

\`\`\`bash
source /opt/netbox/venv/bin/activate
pip install <package>
\`\`\`

## 2. Enable the Plugin / 启用插件

在 \`configuration.py\` 的 \`PLUGINS\` 列表中添加：

\`\`\`python
PLUGINS = ['plugin_name']
\`\`\`

## 3. Configure the Plugin / 配置插件

如需配置，在 \`PLUGINS_CONFIG\` 中定义：

\`\`\`python
PLUGINS_CONFIG = {
    'plugin_name': {
        'foo': 'bar',
        'buzz': 'bazz'
    }
}
\`\`\`

## 4. Run Database Migrations / 运行数据库迁移

\`\`\`bash
cd /opt/netbox/netbox
python3 manage.py migrate
\`\`\`

## 5. Collect Static Files / 收集静态文件

\`\`\`bash
python3 manage.py collectstatic
\`\`\`

## 6. Restart Services / 重启服务

\`\`\`bash
sudo systemctl restart netbox netbox-rq
\`\`\`
`;export{n as default};
