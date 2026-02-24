const n=`---
title: Navigation 导航
description: NetBox 插件导航菜单
---

# Navigation / 导航

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/plugins/development/navigation/) | 如有侵权请[联系我们](/contact)删除*

## Menus / 菜单

使用 \`PluginMenu\` 注册独立子菜单：

\`\`\`python
from netbox.plugins import PluginMenu

menu = PluginMenu(
    label='My Plugin',
    groups=(
        ('Foo', (item1, item2, item3)),
        ('Bar', (item4, item5)),
    ),
    icon_class='mdi mdi-router'
)
\`\`\`

## Default Menu / 默认菜单

少量菜单项时可使用共享 "Plugins" 菜单：

\`\`\`python
menu_items = (item1, item2, item3)
\`\`\`

## Menu Items / 菜单项

\`PluginMenuItem\` 定义链接和按钮。\`PluginMenuButton\` 定义快捷按钮。图标见 [Material Design Icons](https://materialdesignicons.com/)。
`;export{n as default};
