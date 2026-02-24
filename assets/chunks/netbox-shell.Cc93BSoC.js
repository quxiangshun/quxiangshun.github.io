const n=`---
title: NetBox Shell
description: NetBox Python Shell
---

# The NetBox Python Shell / NetBox Python Shell

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/administration/netbox-shell/) | 如有侵权请[联系我们](/contact)删除*

## 启动

\`\`\`bash
cd /opt/netbox
source /opt/netbox/venv/bin/activate
python3 netbox/manage.py nbshell
\`\`\`

\`lsmodels()\` 列出所有模型，\`help(<model>)\` 查看帮助。

## 查询对象

\`\`\`python
Device.objects.all()
Device.objects.filter(status="active")
Device.objects.get(pk=7)
Device.objects.filter(tenant__name="Pied Piper")
\`\`\`

## 创建/更新

\`\`\`python
myvlan = VLAN(vid=123, name='MyNewVLAN', site=lab1)
myvlan.full_clean()
myvlan.save()
\`\`\`

## 删除

\`\`\`python
vlan.delete()
Device.objects.filter(name__icontains='test').delete()
\`\`\`

::: warning
Shell 直接操作数据，无充分验证。操作前务必备份。
:::
`;export{n as default};
