const n=`# NetBox 菜单详解

下面用**通俗比喻+界面示意+生活举例**，把 NetBox 14 个菜单讲明白，帮你快速理解每个模块管什么、怎么用。

---

## 1. Organization（组织架构）

**一句话**：你的网络“户口本”，按**地区→站点组→站点→位置**分层管理所有物理地点。

### 通俗举例

- **Region（地区）**：中国 → 华东 → 江苏 → 无锡

- **Site Group（站点组）**：公司总部机房、分公司机房、IDC 托管机房

- **Site（站点）**：无锡新吴区总部大楼、上海张江分公司、阿里云无锡节点

- **Location（位置）**：总部大楼 3 楼机房、3 楼机房 A 区、A 区第 2 排

### 界面示意（文字版）

\`\`\`Plain Text

Organization
├─ Regions
│  └─ 中国 → 华东 → 江苏 → 无锡
├─ Site Groups
│  └─ 总部机房、分公司机房、IDC 机房
├─ Sites
│  └─ 无锡总部、上海分公司、阿里云无锡
└─ Locations
   └─ 3楼机房、A区、第2排
\`\`\`

**作用**：所有设备、机架、IP 都要先“落户”在这里，是整个系统的“根目录”。

---

## 2. Racks（机架管理）

**一句话**：机房里的“货架”，管每台机柜的位置、U 位、角色、空间占用。

### 通俗举例

- 给 3 楼机房 A 区建 10 个机架，编号 R01–R10

- 定义角色：核心交换机架、服务器机架、存储机架

- 可视化：R01 机架 1–4U 已占、5–8U 预留、9–42U 空闲

### 界面示意（文字版）

\`\`\`Plain Text

Racks
├─ Rack R01
│  ├─ 位置：无锡总部 → 3楼机房 → A区
│  ├─ 角色：核心交换机架
│  ├─ 高度：42U
│  └─ 占用：1–4U（已用）、5–8U（预留）
└─ Rack R02
   └─ ...
\`\`\`

**作用**：设备必须“上架”到某个机架，避免物理空间冲突。

---

## 3. Devices（设备管理）

**一句话**：所有硬件的“身份证+档案”，从型号模板到具体设备、接口、模块全管。

### 通俗举例

- **Device Type（设备型号）**：华为 S5735、戴尔 R750、思科 9300（定义有多少口、多大尺寸）

- **Device（设备实例）**：R01 机架 1U 位置的 S5735 交换机（命名 SW-Core-01）

- **Interface（接口）**：SW-Core-01 的 Gi0/1、Gi0/2 等端口

- **Module（模块）**：交换机插的 10G 光模块、服务器的 RAID 卡

### 界面示意（文字版）

\`\`\`Plain Text

Devices
├─ Device Types
│  └─ 华为 S5735（48电口+4光口，1U）
├─ Devices
│  └─ SW-Core-01（R01机架1U，S5735型号）
│     ├─ Interfaces：Gi0/1、Gi0/2...
│     └─ Modules：10G光模块×4
└─ ...
\`\`\`

**作用**：网络的“硬件大脑”，所有物理设备都在这里建档。

---

## 4. Connections（连接管理）

**一句话**：设备之间的“网线/光纤/无线链路”台账，管谁连谁、用什么线、连到哪个口。

### 通俗举例

- SW-Core-01 的 Gi0/1 用六类线连到 SW-Agg-01 的 Gi0/1

- 服务器 Server-01 的 eth0 用光纤连到 SW-Access-01 的 Gi0/24

- 无线 AP 之间的 Mesh 链路

### 界面示意（文字版）

\`\`\`Plain Text

Connections
├─ Cables
│  ├─ 六类线：SW-Core-01 Gi0/1 ↔ SW-Agg-01 Gi0/1
│  └─ 光纤：Server-01 eth0 ↔ SW-Access-01 Gi0/24
└─ Wireless Links
   └─ AP-01 ↔ AP-02（Mesh）
\`\`\`

**作用**：网络拓扑的“物理连线图”，排错时一眼看到链路。

---

## 5. Wireless（无线管理）

**一句话**：专门管 Wi‑Fi 的“小区物业”，管 SSID、AP 分组、无线覆盖。

### 通俗举例

- 创建 SSID：公司内网 Wi‑Fi、访客 Wi‑Fi

- 把 AP 分组：办公区 AP 组、会议室 AP 组

- 关联到 Devices 里的 AP 设备实例

### 界面示意（文字版）

\`\`\`Plain Text

Wireless
├─ WLANs
│  ├─ 公司内网（SSID: Corp-WiFi）
│  └─ 访客网络（SSID: Guest-WiFi）
└─ WLAN Groups
   └─ 办公区AP组、会议室AP组
\`\`\`

**作用**：有线网络的“无线补充”，专门管 Wi‑Fi 配置。

---

## 6. IPAM（IP 地址管理）

**一句话**：网络的“IP 户口本”，管 IPv4/IPv6、子网、VLAN、VRF、ASN，避免地址冲突。

### 通俗举例

- 规划子网：\`192.168.1.0/24\`（办公区）、\`10.0.0.0/8\`（服务器区）

- 分配 IP：给 SW-Core-01 的 Gi0/1 分配 \`192.168.1.1/24\`

- VLAN：VLAN10（办公）、VLAN20（服务器）、VLAN30（访客）

- VRF：隔离办公区和服务器区路由

### 界面示意（文字版）

\`\`\`Plain Text

IPAM
├─ Prefixes
│  ├─ 192.168.1.0/24（办公区）
│  └─ 10.0.0.0/8（服务器区）
├─ IP Addresses
│  └─ 192.168.1.1（SW-Core-01 Gi0/1）
├─ VLANs
│  ├─ VLAN10（办公）
│  └─ VLAN20（服务器）
└─ VRFs
   └─ Corp-VRF、Server-VRF
\`\`\`

**作用**：IP 资源的“总管家”，是网络自动化的核心数据源。

---

## 7. VPN（虚拟专用网）

**一句话**：管“加密隧道”的“安全通道管理员”，管 IPsec、L2VPN、远程接入 VPN。

### 通俗举例

- 无锡总部 ↔ 上海分公司的 IPsec VPN 隧道

- 员工远程办公用的 SSL VPN

- 跨数据中心的 L2VPN 二层互联

### 界面示意（文字版）

\`\`\`Plain Text

VPN
├─ VPN Tunnels
│  ├─ 无锡→上海 IPsec Tunnel
│  └─ 员工 SSL VPN
└─ L2VPNs
   └─ 总部→IDC 二层互联
\`\`\`

**作用**：安全远程连接的“配置中心”。

---

## 8. Virtualization（虚拟化管理）

**一句话**：管虚拟机/容器的“云资源台账”，把虚拟机和物理服务器对应起来。

### 通俗举例

- 虚拟化集群：VMware 集群、K8s 集群

- 主机：ESXi 服务器、物理宿主机

- 虚拟机：Web 服务器 VM、数据库 VM（关联到某台 ESXi 主机）

### 界面示意（文字版）

\`\`\`Plain Text

Virtualization
├─ Clusters
│  └─ VMware-Cluster-01
├─ Hosts
│  └─ ESXi-01（物理服务器 Server-01）
└─ Virtual Machines
   └─ Web-VM-01（运行在 ESXi-01 上）
\`\`\`

**作用**：物理+虚拟资源统一管理，混合架构的“资源地图”。

---

## 9. Circuits（电路/专线管理）

**一句话**：管外部专线/运营商电路的“对外接口台账”，管电信、联通、云厂商专线。

### 通俗举例

- 运营商：中国电信、中国联通

- 电路：100M 互联网专线、200M 点对点专线（无锡→上海）

- 终止点：专线接到 SW-Core-01 的 Gi0/24 端口

### 界面示意（文字版）

\`\`\`Plain Text

Circuits
├─ Providers
│  └─ 中国电信、中国联通
├─ Circuits
│  ├─ 100M 互联网专线（电信）
│  └─ 200M 点到点（无锡→上海）
└─ Terminations
   └─ 专线 → SW-Core-01 Gi0/24
\`\`\`

**作用**：网络边界的“对外连接台账”。

---

## 10. Power（电源管理）

**一句话**：机房“供电系统台账”，管 PDU、UPS、配电柜、电源链路。

### 通俗举例

- 电源面板：机房总配电柜、机架 PDU

- 电源馈送：总配电柜 → 机架 PDU → 设备电源口

- 可视化：每个 PDU 的负载、空闲插座

### 界面示意（文字版）

\`\`\`Plain Text

Power
├─ Power Panels
│  └─ 机房总配电柜、R01机架PDU
└─ Power Feeds
   └─ 总配电柜 → R01 PDU → SW-Core-01 电源口
\`\`\`

**作用**：保障设备“有电用”的供电管理中心。

---

## 11. Provisioning（配置自动化）

**一句话**：设备配置的“模板工厂”，用模板批量生成/下发配置。

### 通俗举例

- 配置模板：交换机基础配置模板、路由器 BGP 模板

- 上下文：不同区域的配置变量（如 IP、VLAN）

- 自动生成：给新交换机套用模板，一键生成完整配置

### 界面示意（文字版）

\`\`\`Plain Text

Provisioning
├─ Config Templates
│  ├─ 交换机基础配置
│  └─ 路由器BGP配置
└─ Config Contexts
   └─ 无锡总部配置变量、上海分公司配置变量
\`\`\`

**作用**：网络自动化的“配置引擎”，减少手动敲命令。

---

## 12. Customization（系统定制）

**一句话**：给 NetBox“加字段、加链接、加脚本”的“自定义工具箱”。

### 通俗举例

- 自定义字段：给设备加“资产编号”“维保到期日”

- 导出模板：按自己格式导出设备清单

- 脚本：自动同步设备信息到 CMDB

### 界面示意（文字版）

\`\`\`Plain Text

Customization
├─ Custom Fields
│  └─ 设备资产编号、维保日期
├─ Export Templates
│  └─ 设备清单导出模板
└─ Scripts
   └─ 同步设备到CMDB脚本
\`\`\`

**作用**：让系统适配你的公司流程，不是你适配系统。

---

## 13. Operations（运维集成）

**一句话**：NetBox 和外部系统“联动”的“运维中枢”，管 Webhook、事件、作业、日志。

### 通俗举例

- Webhook：设备上线 → 自动发消息到钉钉/企业微信

- 事件规则：IP 冲突 → 触发告警脚本

- 变更日志：谁在什么时候改了什么配置（审计用）

### 界面示意（文字版）

\`\`\`Plain Text

Operations
├─ Webhooks
│  └─ 设备上线 → 钉钉通知
├─ Event Rules
│  └─ IP冲突 → 触发告警
└─ Change Logs
   └─ 2026-02-13 张三 修改 SW-Core-01 IP
\`\`\`

**作用**：系统集成与审计的“总控台”。

---

## 14. Admin（系统管理）

**一句话**：NetBox 的“后台管理员面板”，管用户、权限、系统设置、插件。

### 通俗举例

- 用户/组：创建网络管理员、只读用户、租户用户

- 权限：给张三只能看 IPAM，给李四能改 Devices

- 插件：安装 IP 扫描插件、拓扑图插件

### 界面示意（文字版）

\`\`\`Plain Text

Admin
├─ Users & Groups
│  └─ 网络管理员组、只读用户组
├─ Permissions
│  └─ 张三：IPAM只读；李四：Devices读写
└─ Plugins
   └─ IP扫描插件、拓扑图插件
\`\`\`

**作用**：系统安全与管理的“大门”。

---

## 整体关系速记（一句话串起来）

**Organization 定地点 → Racks 放机柜 → Devices 上架设备 → Connections 连网线 → IPAM 分 IP → Wireless 管 Wi‑Fi → VPN 建隧道 → Virtualization 管虚机 → Circuits 接专线 → Power 保供电 → Provisioning 自动配 → Customization 改界面 → Operations 连外部 → Admin 管权限**。

---

详见 [初始化清单及可落地顺序](init-guide.md) 获取可直接执行的步骤。`;export{n as default};
