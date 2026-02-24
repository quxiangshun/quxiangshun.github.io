const n=`# 公司小机房 NetBox 完整数据导入模板（Excel+JSON）

说明：模板适配「1个小机房（20㎡内）、10个机架、20台设备」场景，完全贴合之前的初始化清单步骤。所有可修改项已替换为常规公司机房实际参数，改完名称/参数即可直接导入，无需调整格式；JSON和Excel内容完全一致，可根据NetBox导入要求选择任意格式。

---

# 一、Excel导入模板（可直接复制到Excel保存为.xlsx）

提示：Excel导入时，需对应NetBox各模块的导入入口（如Organization→Regions导入对应Region工作表），字段顺序不可乱。

## 工作表1：Region（地区）

|名称（name）|父级地区（parent_name，无则留空）|备注（description，可选）|
|---|---|---|
|中国||顶层地区|
|华东|中国|华东区域|
|江苏|华东|所在省份|
|无锡|江苏|机房所在城市|
## 工作表2：Site Group（站点分组）

|名称（name）|父级分组（parent_name，无则留空）|备注（description，可选）|
|---|---|---|
|总部机房||公司核心小机房|
|备用机房||可选，无则删除该行|
## 工作表3：Site（站点/机房）

|名称（name）|地区（region_name）|站点分组（site_group_name）|时区（time_zone）|物理地址（physical_address，可选）|备注（description，可选）|
|---|---|---|---|---|---|
|无锡总部小机房|无锡|总部机房|Asia/Shanghai|无锡市新吴区长江北路288号3楼|公司核心小机房（20㎡）|
## 工作表4：Location（机房内位置）

|名称（name）|所属站点（site_name）|父级位置（parent_name，无则留空）|备注（description，可选）|
|---|---|---|---|
|3楼核心机房区域|无锡总部小机房||机房整体区域|
|A区|无锡总部小机房|3楼核心机房区域|核心设备区域（机架R01-R05）|
|B区|无锡总部小机房|3楼核心机房区域|服务器/存储区域（机架R06-R10）|
## 工作表5：Rack（机架）

|名称（name）|所属站点（site_name）|所属位置（location_name）|高度（u_height）|机架角色（role_name）|备注（description，可选）|
|---|---|---|---|---|---|
|R01|无锡总部小机房|A区|42|核心交换机柜|核心交换机、路由器|
|R02-R10|无锡总部小机房|A区（R02-R05）、B区（R06-R10）|42|服务器机柜/存储机柜|批量创建，可按需调整数量|
## 工作表6：Device Type（设备型号）

|厂商（manufacturer_name）|型号（model）|高度（u_height）|接口配置（interfaces，格式：名称,类型;名称,类型）|备注（description，可选）|
|---|---|---|---|---|
|Huawei|S5735-L48T4S-A|1|Gi0/1,GE;Gi0/2,GE;Gi0/49,SFP;Gi0/50,SFP|核心/汇聚交换机|
|Dell|R750|2|eth0,GE;eth1,GE;eth2,10GE|应用服务器|
|Huawei|AP6750-10|0.5|eth0,GE|无线AP|
|Cisco|ISR4321|1|GigabitEthernet0/0,GE;GigabitEthernet0/1,GE|路由器（按需添加）|
## 工作表7：Device（设备实例）

|名称（name）|设备型号（device_type_model）|所属站点（site_name）|所属机架（rack_name）|机架位置（position）|设备角色（role_name）|备注（description，可选）|
|---|---|---|---|---|---|---|
|SW-Core-01|S5735-L48T4S-A|无锡总部小机房|R01|1|Core Switch|核心交换机1|
|SW-Core-02|S5735-L48T4S-A|无锡总部小机房|R01|2|Core Switch|核心交换机2（冗余）|
|Server-01|R750|无锡总部小机房|R06|1|Application Server|Web应用服务器|
|AP-01|AP6750-10|无锡总部小机房|R02|1|Wireless AP|办公区无线AP|
|Router-01|ISR4321|无锡总部小机房|R01|3|Router|出口路由器（按需添加）|
## 工作表8：VLAN

|ID（vid）|名称（name）|所属站点（site_name，可选）|备注（description，可选）|
|---|---|---|---|
|10|办公网|无锡总部小机房|员工办公使用|
|20|服务器网|无锡总部小机房|应用服务器使用|
|30|访客网|无锡总部小机房|外来访客使用|
## 工作表9：Prefix（子网）

|子网（prefix）|所属VLAN（vlan_name，可选）|备注（description，可选）|
|---|---|---|
|192.168.10.0/24|办公网|办公区终端、交换机管理IP|
|192.168.20.0/24|服务器网|应用服务器IP段|
|192.168.30.0/24|访客网|访客终端IP段|
## 工作表10：IP Address（IP分配）

|IP地址（address）|所属设备（device_name）|所属接口（interface_name）|所属VLAN（vlan_name，可选）|备注（description，可选）|
|---|---|---|---|---|
|192.168.10.1/24|SW-Core-01|Gi0/1|办公网|核心交换机管理IP|
|192.168.10.2/24|SW-Core-02|Gi0/1|办公网|核心交换机2管理IP|
|192.168.20.1/24|Server-01|eth0|服务器网|Web服务器业务IP|
## 工作表11：Cable（物理连线）

|标签（label）|A端设备（a_device_name）|A端接口（a_interface_name）|B端设备（b_device_name）|B端接口（b_interface_name）|线缆类型（type）|备注（description，可选）|
|---|---|---|---|---|---|---|
|核心-核心互联|SW-Core-01|Gi0/49|SW-Core-02|Gi0/49|光纤|核心交换机冗余互联|
|核心-服务器|SW-Core-01|Gi0/2|Server-01|eth0|六类线|核心交换机连接Web服务器|
---

# 二、JSON导入模板（可直接复制到JSON文件保存为.json）

提示：JSON导入需对应NetBox各模块的API导入格式，复制后替换可修改项，直接导入即可（NetBox支持批量导入JSON）。

\`\`\`json

{
  "regions": [
    {"name": "中国", "parent_name": "", "description": "顶层地区"},
    {"name": "华东", "parent_name": "中国", "description": "华东区域"},
    {"name": "江苏", "parent_name": "华东", "description": "所在省份"},
    {"name": "无锡", "parent_name": "江苏", "description": "机房所在城市"}
  ],
  "site_groups": [
    {"name": "总部机房", "parent_name": "", "description": "公司核心小机房"},
    {"name": "备用机房", "parent_name": "", "description": "可选，无则删除"}
  ],
  "sites": [
    {
      "name": "无锡总部小机房",
      "region_name": "无锡",
      "site_group_name": "总部机房",
      "time_zone": "Asia/Shanghai",
      "physical_address": "无锡市新吴区长江北路288号3楼",
      "description": "公司核心小机房（20㎡）"
    }
  ],
  "locations": [
    {
      "name": "3楼核心机房区域",
      "site_name": "无锡总部小机房",
      "parent_name": "",
      "description": "机房整体区域"
    },
    {
      "name": "A区",
      "site_name": "无锡总部小机房",
      "parent_name": "3楼核心机房区域",
      "description": "核心设备区域（机架R01-R05）"
    },
    {
      "name": "B区",
      "site_name": "无锡总部小机房",
      "parent_name": "3楼核心机房区域",
      "description": "服务器/存储区域（机架R06-R10）"
    }
  ],
  "racks": [
    {
      "name": "R01",
      "site_name": "无锡总部小机房",
      "location_name": "A区",
      "u_height": 42,
      "role_name": "核心交换机柜",
      "description": "核心交换机、路由器"
    },
    {
      "name": "R02-R10",
      "site_name": "无锡总部小机房",
      "location_name": "A区（R02-R05）、B区（R06-R10）",
      "u_height": 42,
      "role_name": "服务器机柜/存储机柜",
      "description": "批量创建，可按需调整数量"
    }
  ],
  "device_types": [
    {
      "manufacturer_name": "Huawei",
      "model": "S5735-L48T4S-A",
      "u_height": 1,
      "interfaces": [
        {"name": "Gi0/1", "type": "GE"},
        {"name": "Gi0/2", "type": "GE"},
        {"name": "Gi0/49", "type": "SFP"},
        {"name": "Gi0/50", "type": "SFP"}
      ],
      "description": "核心/汇聚交换机"
    },
    {
      "manufacturer_name": "Dell",
      "model": "R750",
      "u_height": 2,
      "interfaces": [
        {"name": "eth0", "type": "GE"},
        {"name": "eth1", "type": "GE"},
        {"name": "eth2", "type": "10GE"}
      ],
      "description": "应用服务器"
    },
    {
      "manufacturer_name": "Huawei",
      "model": "AP6750-10",
      "u_height": 0.5,
      "interfaces": [{"name": "eth0", "type": "GE"}],
      "description": "无线AP"
    },
    {
      "manufacturer_name": "Cisco",
      "model": "ISR4321",
      "u_height": 1,
      "interfaces": [
        {"name": "GigabitEthernet0/0", "type": "GE"},
        {"name": "GigabitEthernet0/1", "type": "GE"}
      ],
      "description": "路由器（按需添加）"
    }
  ],
  "devices": [
    {
      "name": "SW-Core-01",
      "device_type_model": "S5735-L48T4S-A",
      "site_name": "无锡总部小机房",
      "rack_name": "R01",
      "position": 1,
      "role_name": "Core Switch",
      "description": "核心交换机1"
    },
    {
      "name": "SW-Core-02",
      "device_type_model": "S5735-L48T4S-A",
      "site_name": "无锡总部小机房",
      "rack_name": "R01",
      "position": 2,
      "role_name": "Core Switch",
      "description": "核心交换机2（冗余）"
    },
    {
      "name": "Server-01",
      "device_type_model": "R750",
      "site_name": "无锡总部小机房",
      "rack_name": "R06",
      "position": 1,
      "role_name": "Application Server",
      "description": "Web应用服务器"
    },
    {
      "name": "AP-01",
      "device_type_model": "AP6750-10",
      "site_name": "无锡总部小机房",
      "rack_name": "R02",
      "position": 1,
      "role_name": "Wireless AP",
      "description": "办公区无线AP"
    },
    {
      "name": "Router-01",
      "device_type_model": "ISR4321",
      "site_name": "无锡总部小机房",
      "rack_name": "R01",
      "position": 3,
      "role_name": "Router",
      "description": "出口路由器（按需添加）"
    }
  ],
  "vlans": [
    {
      "vid": 10,
      "name": "办公网",
      "site_name": "无锡总部小机房",
      "description": "员工办公使用"
    },
    {
      "vid": 20,
      "name": "服务器网",
      "site_name": "无锡总部小机房",
      "description": "应用服务器使用"
    },
    {
      "vid": 30,
      "name": "访客网",
      "site_name": "无锡总部小机房",
      "description": "外来访客使用"
    }
  ],
  "prefixes": [
    {
      "prefix": "192.168.10.0/24",
      "vlan_name": "办公网",
      "description": "办公区终端、交换机管理IP"
    },
    {
      "prefix": "192.168.20.0/24",
      "vlan_name": "服务器网",
      "description": "应用服务器IP段"
    },
    {
      "prefix": "192.168.30.0/24",
      "vlan_name": "访客网",
      "description": "访客终端IP段"
    }
  ],
  "ip_addresses": [
    {
      "address": "192.168.10.1/24",
      "device_name": "SW-Core-01",
      "interface_name": "Gi0/1",
      "vlan_name": "办公网",
      "description": "核心交换机管理IP"
    },
    {
      "address": "192.168.10.2/24",
      "device_name": "SW-Core-02",
      "interface_name": "Gi0/1",
      "vlan_name": "办公网",
      "description": "核心交换机2管理IP"
    },
    {
      "address": "192.168.20.1/24",
      "device_name": "Server-01",
      "interface_name": "eth0",
      "vlan_name": "服务器网",
      "description": "Web服务器业务IP"
    }
  ],
  "cables": [
    {
      "label": "核心-核心互联",
      "a_device_name": "SW-Core-01",
      "a_interface_name": "Gi0/49",
      "b_device_name": "SW-Core-02",
      "b_interface_name": "Gi0/49",
      "type": "光纤",
      "description": "核心交换机冗余互联"
    },
    {
      "label": "核心-服务器",
      "a_device_name": "SW-Core-01",
      "a_interface_name": "Gi0/2",
      "b_device_name": "Server-01",
      "b_interface_name": "eth0",
      "type": "六类线",
      "description": "核心交换机连接Web服务器"
    }
  ]
}

\`\`\``;export{n as default};
