const e=`---
title: Modeling Pluggable Transceivers 可插拔光模块建模
description: NetBox 可插拔光模块建模最佳实践
---

# Modeling Pluggable Transceivers / 可插拔光模块建模

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/best-practices/modeling-pluggable-transceivers/) | 如有侵权请[联系我们](/contact)删除*

## Use Case / 使用场景

Many devices use field-swappable SFPs to change physical media type (copper, MMF, SMF). This guide covers modeling SFPs in NetBox v4.4+.

许多设备使用可现场更换的 SFP 来切换物理介质类型。本指南介绍 NetBox v4.4+ 中 SFP 的建模方法。

## Modeling Strategy / 建模策略

Represent pluggable transceivers as **modules** installed in **module bays**. A module delivers one or more interfaces to the device. Interfaces are auto-created when the module is installed and deleted when removed.

将可插拔光模块建模为安装在 **模块槽位** 中的 **模块**。模块为设备提供一个或多个接口。安装模块时自动创建接口，移除时自动删除。

### 1. Create SFP Module Type Profile / 创建 SFP 模块类型配置

Create a [module type profile](https://netboxlabs.com/docs/netbox/models/dcim/moduletypeprofile/) for SFPs. Optional: add custom attributes (e.g. wavelength, power ranges).

### 2. Create Module Type for Each SFP Model / 为每种 SFP 型号创建模块类型

Create a [module type](https://netboxlabs.com/docs/netbox/models/dcim/moduletype/) per unique SFP model:

| Manufacturer | Model | Media Type |
| --- | --- | --- |
| Cisco | SFP-10G-SR | 10GE MMF |
| Cisco | SFP-10G-LR | 10GE SMF |
| Juniper | QFX-QSFP-40G-SR4 | 40GE MMF |
| Juniper | JNP-QSFP-DAC-5M | 40GE DAC |

### 3. Add Interface to Module Type / 为模块类型添加接口

Create an interface template on each module type. Use \`{module}\` token for dynamic naming (e.g. \`et-{module}\` → \`et-0/0/14\` when installed in bay \`0/0/14\`).

### 4. Create Device Types / 创建设备类型

Create device types for each device model if not already done.

### 5. Add Module Bays to Device Type / 为设备类型添加模块槽位

Add module bays for SFP slots. Example: Juniper QFX5110 has 48 SFP+ and 8 QSFP28 bays (0/0/0 through 0/0/55).

### 6. Create Device / 创建设备

Create devices using the device type. Module bays are instantiated automatically.

### 7. Add SFP Modules / 添加 SFP 模块

"Install" modules in each module bay. Use bulk import for many modules at once.
`;export{e as default};
