const n=`# NetBox 初始化完整清单及可落地顺序

> 编辑日期：2026-02-14

可照着一步步做的 NetBox 初始化完整清单，从 0 到能用，**每一步做什么、填什么、为什么这么做**都写清楚。

## 数据模型关系速览

\`\`\`
Organization: Region → Site Group → Site → Location
DCIM:        Site → Rack → Device (DeviceType) → Interface → Cable
IPAM:        VRF → Prefix → IP Address; VLAN Group → VLAN
\`\`\`

---

# 一、整体思路（先记这 4 步）

1. **先搭组织架构**（地点从大到小）

2. **再搭物理空间**（机房 → 机架）

3. **再录入设备 & 连线**

4. **最后配 IP、自动化、权限**

下面是**可直接执行的步骤**。

---

# 二、第1阶段：搭建 Organization（组织架构）

目标：让所有设备都有“**落户地址**”。

## 1.1 新建 Region（地区）

菜单：**Organization → Regions**

- 示例：

    - 名称：\`中国\`

    - 父级：无

    - 再建：\`华东\` → 父级 中国

    - 再建：\`江苏\` → 父级 华东

    - 再建：\`无锡\` → 父级 江苏

- 作用：**按地理分层**。

## 1.2 新建 Site Group（站点分组）

菜单：**Organization → Site Groups**

- 示例：

    - \`总部机房\`

    - \`分公司机房\`

    - \`IDC托管机房\`

- 作用：**给站点分类**。

## 1.3 新建 Site（站点 = 一个机房/大楼）

菜单：**Organization → Sites**

必填：

- 名称：\`无锡总部大楼\`

- Region：选 \`无锡\`

- Site Group：选 \`总部机房\`

- 时间zone：选 \`Asia/Shanghai\`

- 物理地址、经纬度可随便填

- 作用：**一个 Site = 一个独立机房**。

## 1.4 新建 Location（具体位置：机房内区域）

菜单：**Organization → Locations**

- 名称：\`3楼核心机房\`

- 父级Site：\`无锡总部大楼\`

- 再建：\`A区\` → 父级 \`3楼核心机房\`

- 作用：**精确到机房里的某一排/某一区**。

---

# 三、第2阶段：搭建 Racks（机架）

菜单：**Racks → Racks**

## 3.1 新建 Rack

必填：

- 名称：\`R01\`

- Site：\`无锡总部大楼\`

- Location：\`A区\`

- 高度：\`42U\`（标准机柜）

- 角色：\`核心交换机柜\` / \`服务器机柜\`

- 作用：**设备必须放在某个机架里**。

批量建议：

先建 \`R01～R10\` 10个机架，后面直接用。

---

# 四、第3阶段：搭建 Devices（设备）

## 4.1 先建 Device Type（设备型号模板）

菜单：**Devices → Device Types**

- 厂商：\`Huawei\` / \`H3C\` / \`Cisco\` / \`Dell\`

- 型号：\`S5735-L48T4S-A\`

- 高度：\`1U\`

- 接口：提前加好 \`GE\` 电口、\`SFP\` 光口

- 作用：**型号只建一次，后面设备直接选**。

## 4.2 新建 Device（具体设备）

菜单：**Devices → Devices**

必填：

- 名称：\`SW-Core-01\`

- Device Type：选刚才建的 \`S5735\`

- Site：\`无锡总部大楼\`

- Rack：\`R01\`

- Rack position：\`1\`（放在第1U）

- 角色：\`Core Switch\`

这一步做完，你的设备就有：

**地区 → 大楼 → 机房 → 机架 → U位**

## 4.3 给设备加接口（自动/手动）

进入设备 → Interfaces

- 可批量添加：\`Gi0/1 到 Gi0/48\`

- 作用：后面**连线、配IP**都靠接口。

---

# 五、第4阶段：Connections（物理连线）

菜单：**Connections → Cables**

## 5.1 新建一根 Cable

- A端：

    - Device：\`SW-Core-01\`

    - Interface：\`Gi0/1\`

- B端：

    - Device：\`SW-Agg-01\`

    - Interface：\`Gi0/1\`

- 类型：\`六类线\` / \`光纤\`

- 标签：\`核心-汇聚上联\`

作用：**NetBox 里就有真实物理拓扑**。

---

# 六、第5阶段：IPAM（IP 地址管理）

## 6.1 新建 VLAN

菜单：**IPAM → VLANs**

- ID：\`10\`

- 名称：\`办公网\`

- VID：10

## 6.2 新建 Prefix（子网）

菜单：**IPAM → Prefixes**

- \`192.168.10.0/24\` → 办公网

- \`192.168.20.0/24\` → 服务器网

- 作用：**规划网段**。

## 6.3 给设备接口分配IP

进入设备接口 → Edit

- IP Address：\`192.168.10.1/24\`

- 绑定 VLAN：\`10\`

IP 从此不冲突、不乱。

---

# 七、第6阶段：常用配套模块（快速过一遍）

## 7.1 Wireless（Wi-Fi）

菜单：**Wireless → WLANs**

- SSID：\`Corp-WiFi\`

- 绑定 VLAN 10

- 把 AP 设备关联进来

## 7.2 Circuits（专线/运营商）

菜单：**Circuits → Providers**

- 运营商：\`电信\`

- 新建电路：\`100M 互联网专线\`

- 终止到交换机 \`Gi0/24\` 接口

## 7.3 Power（电源）

菜单：**Power → Power Panels**

- 建：\`机房总配电柜\`

- 建：\`R01-PDU\`

- 把设备电源口连到PDU

## 7.4 Virtualization（虚机）

菜单：**Virtualization**

- 建集群：\`VMware集群\`

- 建宿主机：\`ESXi-01\`（关联到物理服务器）

- 建虚机：\`Web-VM\`

---

# 八、第7阶段：自动化 & 运维（Provisioning / Operations）

## 8.1 Provisioning（配置模板）

菜单：**Provisioning → Config Templates**

- 新建模板：

\`\`\`Plain Text

hostname {{ device.name }}
interface {{ interface.name }}
 ip address {{ ip.address }}
\`\`\`

- 作用：**自动生成交换机配置**。

## 8.2 Operations（Webhook/通知）

菜单：**Operations → Webhooks**

- 触发事件：设备创建/修改

- 推送到：钉钉/企业微信/飞书

- 作用：**变更自动通知**。

## 8.3 Change Log（变更日志）

直接看：**Operations → Change Log**

- 谁、什么时候、改了什么

- 审计必备。

---

# 九、第8阶段：Admin（权限控制）

菜单：**Admin → Users / Groups**

1. 建组：

    - \`网络管理员\`（读写全部）

    - \`值班人员\`（只读）

    - \`租户用户\`（只能看自己站点）

2. 给用户分配组

3. 权限自动继承

---

# 十、最简可落地顺序（你直接照这个顺序点）

1. Organization

    - Region → Site Group → Site → Location

2. Racks

    - 建机架

3. Devices

    - 设备型号 → 设备 → 接口

4. Connections

    - 布线

5. IPAM

    - VLAN → Prefix → 分配IP

6. 按需开：

    - Wireless / Circuits / Power / Virtualization

7. Provisioning + Operations

    - 模板 + 自动化 + 通知

8. Admin

    - 用户权限
    `;export{n as default};
