const n=`---
title: Device 设备
description: NetBox Device 模型
---

# Device / 设备

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/dcim/device/) | 如有侵权请[联系我们](/contact)删除*

安装在站点或机架中的硬件。以 U 为单位，可为半深或全深。0U 设备不占用机架空间（如竖装 PDU）。

## 主要字段

| 字段 | 说明 |
| --- | --- |
| Name | 设备名，站点内唯一 |
| Role | 设备角色 |
| Device Type | 设备类型（型号） |
| Site | 所在站点 |
| Location | 站点内位置 |
| Rack | 所在机架 |
| Position | 机架单元位置 |
| Status | 运行状态 |
| Platform | 操作系统平台 |

设备必须从预创建设备类型实例化，默认组件（接口、电源口等）会自动创建。
`;export{n as default};
