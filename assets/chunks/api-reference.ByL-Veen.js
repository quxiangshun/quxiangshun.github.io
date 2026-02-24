const n=`# NetBox API 接口速查

> 编辑日期：2026-02-14

NetBox REST API 接口列表速查，完整用法请参考 [API 集成](api-integration.md) 和 [系统对接指南](integration-guide.md)。

## 接口列表

### Core (核心)
| 接口 | 功能 |
|------|------|
| data-sources | 管理数据源 |
| data-files | 管理数据文件 |
| jobs | 管理作业 |
| object-changes | 管理对象变更记录 |
| background-queues | 管理后台队列 |
| background-workers | 管理后台工作进程 |
| background-tasks | 管理后台任务 |

### DCIM (数据中心基础设施)
| 接口 | 功能 |
|------|------|
| regions | 管理区域 |
| site-groups | 管理站点组 |
| sites | 管理站点 |
| locations | 管理位置 |
| rack-types / rack-roles / racks | 管理机架 |
| manufacturers | 管理制造商 |
| device-types / devices | 管理设备类型与实例 |
| interfaces / cables | 管理接口与线缆 |
| power-panels / power-feeds | 管理电源 |

### IPAM (IP 地址管理)
| 接口 | 功能 |
|------|------|
| vrfs / prefixes / ip-addresses | 管理 VRF、前缀、IP |
| vlan-groups / vlans | 管理 VLAN |
| asns / rirs / aggregates | 管理 ASN、RIR、聚合 |

### Circuits (电路)
| 接口 | 功能 |
|------|------|
| providers / circuits | 管理提供商与电路 |
| circuit-terminations | 管理电路终端 |

### Tenancy (租户)
| 接口 | 功能 |
|------|------|
| tenant-groups / tenants | 管理租户 |
| contacts / contact-assignments | 管理联系人 |

### Virtualization (虚拟化)
| 接口 | 功能 |
|------|------|
| cluster-types / clusters | 管理集群 |
| virtual-machines | 管理虚拟机 |

### Extras (扩展功能)
| 接口 | 功能 |
|------|------|
| webhooks / event-rules | 管理 Webhook 与事件规则 |
| custom-fields / tags | 管理自定义字段与标签 |
| config-contexts / config-templates | 管理配置模板 |
| scripts | 管理脚本 |

## 相关链接

- [API 集成指南](api-integration.md)
- [系统对接与传输](integration-guide.md)`;export{n as default};
