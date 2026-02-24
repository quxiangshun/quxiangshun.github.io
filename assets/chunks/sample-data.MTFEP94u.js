const e=`# NetBox SampleData 示例数据

\`\`\`sql

-- NetBox 模拟数据 SQL 脚本
-- 用于生成测试数据，以便在系统中看到丰富的菜单内容

-- 注意：此脚本应在 NetBox 数据库初始化后执行
-- 执行顺序：先执行依赖项少的表，再执行依赖项多的表

-- ===============================
-- 1. 租户模块 (Tenancy)
-- ===============================

-- 租户组 (MPTT: lft, rght, tree_id, level; comments NOT NULL)
INSERT INTO tenancy_tenantgroup (name, slug, description, comments, custom_field_data, created, last_updated, lft, rght, tree_id, level) VALUES
('技术部门', 'tech', '技术相关部门', '', '{}', NOW(), NOW(), 1, 2, 1, 0),
('业务部门', 'business', '业务相关部门', '', '{}', NOW(), NOW(), 1, 2, 2, 0),
('管理部门', 'management', '管理相关部门', '', '{}', NOW(), NOW(), 1, 2, 3, 0);

-- 租户（部门）(group_id 用 slug 子查询)
INSERT INTO tenancy_tenant (name, slug, group_id, description, comments, custom_field_data, created, last_updated) VALUES
('研发部', 'rd', (SELECT id FROM tenancy_tenantgroup WHERE slug = 'tech'), '负责产品研发', '', '{}', NOW(), NOW()),
('运维部', 'ops', (SELECT id FROM tenancy_tenantgroup WHERE slug = 'tech'), '负责系统运维', '', '{}', NOW(), NOW()),
('网络部', 'network', (SELECT id FROM tenancy_tenantgroup WHERE slug = 'tech'), '负责网络管理', '', '{}', NOW(), NOW()),
('市场部', 'marketing', (SELECT id FROM tenancy_tenantgroup WHERE slug = 'business'), '负责市场营销', '', '{}', NOW(), NOW()),
('销售部', 'sales', (SELECT id FROM tenancy_tenantgroup WHERE slug = 'business'), '负责产品销售', '', '{}', NOW(), NOW()),
('财务部', 'finance', (SELECT id FROM tenancy_tenantgroup WHERE slug = 'management'), '负责财务管理', '', '{}', NOW(), NOW()),
('人力资源部', 'hr', (SELECT id FROM tenancy_tenantgroup WHERE slug = 'management'), '负责人力资源', '', '{}', NOW(), NOW());

-- ===============================
-- 2. DCIM 模块 - 基础数据
-- ===============================

-- 区域 (MPTT)
INSERT INTO dcim_region (name, slug, description, comments, custom_field_data, created, last_updated, lft, rght, tree_id, level) VALUES
('华东地区', 'east-china', '华东区域', '', '{}', NOW(), NOW(), 1, 2, 1, 0),
('华南地区', 'south-china', '华南区域', '', '{}', NOW(), NOW(), 1, 2, 2, 0),
('华北地区', 'north-china', '华北区域', '', '{}', NOW(), NOW(), 1, 2, 3, 0);

-- 站点组 (MPTT)
INSERT INTO dcim_sitegroup (name, slug, description, comments, custom_field_data, created, last_updated, lft, rght, tree_id, level) VALUES
('数据中心', 'datacenter', '数据中心站点', '', '{}', NOW(), NOW(), 1, 2, 1, 0),
('分支机构', 'branch', '分支机构站点', '', '{}', NOW(), NOW(), 1, 2, 2, 0);

-- 站点 (facility, physical_address, shipping_address, comments 必填)
INSERT INTO dcim_site (name, slug, facility, physical_address, shipping_address, region_id, group_id, status, description, comments, custom_field_data, created, last_updated) VALUES
('上海数据中心', 'sh-dc', 'SH-DC', '', '', (SELECT id FROM dcim_region WHERE slug = 'east-china'), (SELECT id FROM dcim_sitegroup WHERE slug = 'datacenter'), 'active', '上海主数据中心', '', '{}', NOW(), NOW()),
('北京数据中心', 'bj-dc', 'BJ-DC', '', '', (SELECT id FROM dcim_region WHERE slug = 'north-china'), (SELECT id FROM dcim_sitegroup WHERE slug = 'datacenter'), 'active', '北京备份数据中心', '', '{}', NOW(), NOW()),
('广州分支机构', 'gz-branch', 'GZ-BR', '', '', (SELECT id FROM dcim_region WHERE slug = 'south-china'), (SELECT id FROM dcim_sitegroup WHERE slug = 'branch'), 'active', '广州分支机构', '', '{}', NOW(), NOW()),
('深圳分支机构', 'sz-branch', 'SZ-BR', '', '', (SELECT id FROM dcim_region WHERE slug = 'south-china'), (SELECT id FROM dcim_sitegroup WHERE slug = 'branch'), 'active', '深圳分支机构', '', '{}', NOW(), NOW());

-- 制造商
INSERT INTO dcim_manufacturer (name, slug, description, comments, custom_field_data, created, last_updated) VALUES
('Cisco', 'cisco', '网络设备制造商', '', '{}', NOW(), NOW()),
('HPE', 'hpe', '服务器制造商', '', '{}', NOW(), NOW()),
('Dell', 'dell', '服务器制造商', '', '{}', NOW(), NOW()),
('Huawei', 'huawei', '网络设备制造商', '', '{}', NOW(), NOW()),
('Juniper', 'juniper', '网络设备制造商', '', '{}', NOW(), NOW()),
('Supermicro', 'supermicro', '服务器制造商', '', '{}', NOW(), NOW());

-- 设备角色 (vm_role, MPTT 必填)
INSERT INTO dcim_devicerole (name, slug, color, vm_role, description, comments, custom_field_data, created, last_updated, lft, rght, tree_id, level) VALUES
('路由器', 'router', '0077cc', false, '网络路由器', '', '{}', NOW(), NOW(), 1, 2, 1, 0),
('交换机', 'switch', '00cc77', false, '网络交换机', '', '{}', NOW(), NOW(), 1, 2, 2, 0),
('防火墙', 'firewall', 'cc0000', false, '网络防火墙', '', '{}', NOW(), NOW(), 1, 2, 3, 0),
('服务器', 'server', '777777', true, '物理服务器', '', '{}', NOW(), NOW(), 1, 2, 4, 0),
('存储', 'storage', 'cc7700', false, '存储设备', '', '{}', NOW(), NOW(), 1, 2, 5, 0),
('负载均衡', 'loadbalancer', '7700cc', false, '负载均衡设备', '', '{}', NOW(), NOW(), 1, 2, 6, 0);

-- 平台 (MPTT; manufacturer_id 用 slug 子查询)
INSERT INTO dcim_platform (name, slug, manufacturer_id, description, comments, custom_field_data, created, last_updated, lft, rght, tree_id, level) VALUES
('IOS', 'ios', (SELECT id FROM dcim_manufacturer WHERE slug = 'cisco'), 'Cisco IOS 操作系统', '', '{}', NOW(), NOW(), 1, 2, 1, 0),
('NX-OS', 'nx-os', (SELECT id FROM dcim_manufacturer WHERE slug = 'cisco'), 'Cisco NX-OS 操作系统', '', '{}', NOW(), NOW(), 1, 2, 2, 0),
('EOS', 'eos', (SELECT id FROM dcim_manufacturer WHERE slug = 'huawei'), 'Aruba EOS 操作系统', '', '{}', NOW(), NOW(), 1, 2, 3, 0),
('Junos', 'junos', (SELECT id FROM dcim_manufacturer WHERE slug = 'juniper'), 'Juniper Junos 操作系统', '', '{}', NOW(), NOW(), 1, 2, 4, 0),
('Linux', 'linux', (SELECT id FROM dcim_manufacturer WHERE slug = 'hpe'), 'Linux 操作系统', '', '{}', NOW(), NOW(), 1, 2, 5, 0);

-- 设备类型 (含 count 缓存 0, exclude_from_utilization false)
INSERT INTO dcim_devicetype (manufacturer_id, model, slug, part_number, u_height, is_full_depth, front_image, rear_image, description, comments, custom_field_data, created, last_updated, exclude_from_utilization, console_port_template_count, console_server_port_template_count, power_port_template_count, power_outlet_template_count, interface_template_count, front_port_template_count, rear_port_template_count, device_bay_template_count, module_bay_template_count, inventory_item_template_count, device_count) VALUES
((SELECT id FROM dcim_manufacturer WHERE slug = 'cisco'), 'Catalyst 9300', 'catalyst-9300', '', 1, true, '', '', 'Cisco Catalyst 9300 交换机', '', '{}', NOW(), NOW(), false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
((SELECT id FROM dcim_manufacturer WHERE slug = 'cisco'), 'ISR 4331', 'isr-4331', '', 1, true, '', '', 'Cisco ISR 4331 路由器', '', '{}', NOW(), NOW(), false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
((SELECT id FROM dcim_manufacturer WHERE slug = 'huawei'), 'S5720', 's5720', '', 1, true, '', '', 'Huawei S5720 交换机', '', '{}', NOW(), NOW(), false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
((SELECT id FROM dcim_manufacturer WHERE slug = 'huawei'), 'AR2200', 'ar2200', '', 1, true, '', '', 'Huawei AR2200 路由器', '', '{}', NOW(), NOW(), false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
((SELECT id FROM dcim_manufacturer WHERE slug = 'hpe'), 'ProLiant DL380', 'proliant-dl380', '', 2, true, '', '', 'HPE ProLiant DL380 服务器', '', '{}', NOW(), NOW(), false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
((SELECT id FROM dcim_manufacturer WHERE slug = 'dell'), 'PowerEdge R740', 'poweredge-r740', '', 2, true, '', '', 'Dell PowerEdge R740 服务器', '', '{}', NOW(), NOW(), false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
((SELECT id FROM dcim_manufacturer WHERE slug = 'juniper'), 'EX4300', 'ex4300', '', 1, true, '', '', 'Juniper EX4300 交换机', '', '{}', NOW(), NOW(), false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- 接口模板 (label, description, _name, enabled 必填)
INSERT INTO dcim_interfacetemplate (device_type_id, name, _name, type, mgmt_only, enabled, label, description) VALUES
((SELECT id FROM dcim_devicetype WHERE slug = 'catalyst-9300'), 'GigabitEthernet1/0/1', 'GigabitEthernet1/0/1', '1000base-t', false, true, '', ''),
((SELECT id FROM dcim_devicetype WHERE slug = 'catalyst-9300'), 'GigabitEthernet1/0/2', 'GigabitEthernet1/0/2', '1000base-t', false, true, '', ''),
((SELECT id FROM dcim_devicetype WHERE slug = 'isr-4331'), 'GigabitEthernet0/0/0', 'GigabitEthernet0/0/0', '1000base-t', true, true, '', ''),
((SELECT id FROM dcim_devicetype WHERE slug = 'isr-4331'), 'GigabitEthernet0/0/1', 'GigabitEthernet0/0/1', '1000base-t', false, true, '', ''),
((SELECT id FROM dcim_devicetype WHERE slug = 's5720'), 'GigabitEthernet0/0/1', 'GigabitEthernet0/0/1', '1000base-t', false, true, '', ''),
((SELECT id FROM dcim_devicetype WHERE slug = 's5720'), 'GigabitEthernet0/0/2', 'GigabitEthernet0/0/2', '1000base-t', false, true, '', ''),
((SELECT id FROM dcim_devicetype WHERE slug = 'proliant-dl380'), 'eth0', 'eth0', '1000base-t', true, true, '', ''),
((SELECT id FROM dcim_devicetype WHERE slug = 'proliant-dl380'), 'eth1', 'eth1', '1000base-t', false, true, '', '');

-- 机架角色
INSERT INTO dcim_rackrole (name, slug, color, description, comments, custom_field_data, created, last_updated) VALUES
('网络设备机架', 'network', '0077cc', '存放网络设备的机架', '', '{}', NOW(), NOW()),
('服务器机架', 'server', '777777', '存放服务器的机架', '', '{}', NOW(), NOW()),
('存储设备机架', 'storage', 'cc7700', '存放存储设备的机架', '', '{}', NOW(), NOW());

-- 机架类型 (starting_unit, desc_units, rack_count 必填)
INSERT INTO dcim_racktype (manufacturer_id, model, slug, form_factor, width, u_height, starting_unit, desc_units, rack_count, description, comments, custom_field_data, created, last_updated) VALUES
((SELECT id FROM dcim_manufacturer WHERE slug = 'cisco'), 'Standard 42U', 'standard', '4-post-cabinet', 19, 42, 1, false, 0, '42U 标准机架', '', '{}', NOW(), NOW()),
((SELECT id FROM dcim_manufacturer WHERE slug = 'cisco'), 'Mini 24U', 'mini', '4-post-cabinet', 19, 24, 1, false, 0, '24U 小型机架', '', '{}', NOW(), NOW());

-- 机架 (serial, desc_units, starting_unit, description 必填)
INSERT INTO dcim_rack (site_id, name, facility_id, rack_type_id, role_id, status, u_height, width, serial, desc_units, starting_unit, description, comments, custom_field_data, created, last_updated) VALUES
((SELECT id FROM dcim_site WHERE slug = 'sh-dc'), 'Rack-A01', 'A01', (SELECT id FROM dcim_racktype WHERE slug = 'standard'), (SELECT id FROM dcim_rackrole WHERE slug = 'network'), 'active', 42, 19, '', false, 1, '', '', '{}', NOW(), NOW()),
((SELECT id FROM dcim_site WHERE slug = 'sh-dc'), 'Rack-A02', 'A02', (SELECT id FROM dcim_racktype WHERE slug = 'standard'), (SELECT id FROM dcim_rackrole WHERE slug = 'server'), 'active', 42, 19, '', false, 1, '', '', '{}', NOW(), NOW()),
((SELECT id FROM dcim_site WHERE slug = 'sh-dc'), 'Rack-B01', 'B01', (SELECT id FROM dcim_racktype WHERE slug = 'standard'), (SELECT id FROM dcim_rackrole WHERE slug = 'network'), 'active', 42, 19, '', false, 1, '', '', '{}', NOW(), NOW()),
((SELECT id FROM dcim_site WHERE slug = 'sh-dc'), 'Rack-B02', 'B02', (SELECT id FROM dcim_racktype WHERE slug = 'standard'), (SELECT id FROM dcim_rackrole WHERE slug = 'server'), 'active', 42, 19, '', false, 1, '', '', '{}', NOW(), NOW()),
((SELECT id FROM dcim_site WHERE slug = 'bj-dc'), 'Rack-C01', 'C01', (SELECT id FROM dcim_racktype WHERE slug = 'standard'), (SELECT id FROM dcim_rackrole WHERE slug = 'network'), 'active', 42, 19, '', false, 1, '', '', '{}', NOW(), NOW()),
((SELECT id FROM dcim_site WHERE slug = 'gz-branch'), 'Rack-D01', 'D01', (SELECT id FROM dcim_racktype WHERE slug = 'mini'), (SELECT id FROM dcim_rackrole WHERE slug = 'network'), 'active', 24, 19, '', false, 1, '', '', '{}', NOW(), NOW());

-- ===============================
-- 3. 设备
-- ===============================

-- 设备 (counter cache 列填 0)
INSERT INTO dcim_device (name, device_type_id, role_id, site_id, rack_id, position, face, status, tenant_id, platform_id, serial, asset_tag, description, comments, custom_field_data, created, last_updated, console_port_count, console_server_port_count, power_port_count, power_outlet_count, interface_count, front_port_count, rear_port_count, device_bay_count, module_bay_count, inventory_item_count) VALUES
('SW-001', (SELECT id FROM dcim_devicetype WHERE slug = 'catalyst-9300'), (SELECT id FROM dcim_devicerole WHERE slug = 'switch'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), (SELECT id FROM dcim_rack WHERE name = 'Rack-A01'), 1, 'front', 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'network'), (SELECT id FROM dcim_platform WHERE slug = 'ios'), 'SN-123456', 'ASSET-001', '上海数据中心核心交换机', '', '{}', NOW(), NOW(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('SW-002', (SELECT id FROM dcim_devicetype WHERE slug = 'catalyst-9300'), (SELECT id FROM dcim_devicerole WHERE slug = 'switch'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), (SELECT id FROM dcim_rack WHERE name = 'Rack-A01'), 2, 'front', 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'network'), (SELECT id FROM dcim_platform WHERE slug = 'ios'), 'SN-123457', 'ASSET-002', '上海数据中心汇聚交换机', '', '{}', NOW(), NOW(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('RTR-001', (SELECT id FROM dcim_devicetype WHERE slug = 'isr-4331'), (SELECT id FROM dcim_devicerole WHERE slug = 'router'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), (SELECT id FROM dcim_rack WHERE name = 'Rack-B01'), 1, 'front', 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'network'), (SELECT id FROM dcim_platform WHERE slug = 'ios'), 'SN-234567', 'ASSET-003', '上海数据中心边界路由器', '', '{}', NOW(), NOW(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('SRV-001', (SELECT id FROM dcim_devicetype WHERE slug = 'proliant-dl380'), (SELECT id FROM dcim_devicerole WHERE slug = 'server'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), (SELECT id FROM dcim_rack WHERE name = 'Rack-A02'), 1, 'front', 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), (SELECT id FROM dcim_platform WHERE slug = 'linux'), 'SN-345678', 'ASSET-004', '研发部测试服务器', '', '{}', NOW(), NOW(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('SRV-002', (SELECT id FROM dcim_devicetype WHERE slug = 'poweredge-r740'), (SELECT id FROM dcim_devicerole WHERE slug = 'server'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), (SELECT id FROM dcim_rack WHERE name = 'Rack-A02'), 3, 'front', 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'ops'), (SELECT id FROM dcim_platform WHERE slug = 'linux'), 'SN-345679', 'ASSET-005', '运维部监控服务器', '', '{}', NOW(), NOW(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('SW-003', (SELECT id FROM dcim_devicetype WHERE slug = 's5720'), (SELECT id FROM dcim_devicerole WHERE slug = 'switch'), (SELECT id FROM dcim_site WHERE slug = 'gz-branch'), (SELECT id FROM dcim_rack WHERE name = 'Rack-D01'), 1, 'front', 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'network'), NULL, 'SN-456789', 'ASSET-006', '广州分支机构交换机', '', '{}', NOW(), NOW(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('RTR-002', (SELECT id FROM dcim_devicetype WHERE slug = 'ar2200'), (SELECT id FROM dcim_devicerole WHERE slug = 'router'), (SELECT id FROM dcim_site WHERE slug = 'gz-branch'), (SELECT id FROM dcim_rack WHERE name = 'Rack-D01'), 2, 'front', 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'network'), NULL, 'SN-456790', 'ASSET-007', '广州分支机构路由器', '', '{}', NOW(), NOW(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- 接口 (label, mark_connected, _name 必填)
INSERT INTO dcim_interface (device_id, name, _name, type, mgmt_only, enabled, mark_connected, label, description, custom_field_data, created, last_updated) VALUES
((SELECT id FROM dcim_device WHERE name = 'SW-001'), 'GigabitEthernet1/0/1', 'GigabitEthernet1/0/1', '1000base-t', false, true, false, '', '连接服务器', '{}', NOW(), NOW()),
((SELECT id FROM dcim_device WHERE name = 'SW-001'), 'GigabitEthernet1/0/2', 'GigabitEthernet1/0/2', '1000base-t', false, true, false, '', '连接交换机', '{}', NOW(), NOW()),
((SELECT id FROM dcim_device WHERE name = 'SW-001'), 'GigabitEthernet1/0/3', 'GigabitEthernet1/0/3', '1000base-t', false, true, false, '', '连接路由器', '{}', NOW(), NOW()),
((SELECT id FROM dcim_device WHERE name = 'SW-002'), 'GigabitEthernet1/0/1', 'GigabitEthernet1/0/1', '1000base-t', false, true, false, '', '连接核心交换机', '{}', NOW(), NOW()),
((SELECT id FROM dcim_device WHERE name = 'SW-002'), 'GigabitEthernet1/0/2', 'GigabitEthernet1/0/2', '1000base-t', false, true, false, '', '连接服务器', '{}', NOW(), NOW()),
((SELECT id FROM dcim_device WHERE name = 'RTR-001'), 'GigabitEthernet0/0/0', 'GigabitEthernet0/0/0', '1000base-t', true, true, false, '', '管理接口', '{}', NOW(), NOW()),
((SELECT id FROM dcim_device WHERE name = 'RTR-001'), 'GigabitEthernet0/0/1', 'GigabitEthernet0/0/1', '1000base-t', false, true, false, '', '外部连接', '{}', NOW(), NOW()),
((SELECT id FROM dcim_device WHERE name = 'SRV-001'), 'eth0', 'eth0', '1000base-t', true, true, false, '', '管理接口', '{}', NOW(), NOW()),
((SELECT id FROM dcim_device WHERE name = 'SRV-001'), 'eth1', 'eth1', '1000base-t', false, true, false, '', '业务接口', '{}', NOW(), NOW()),
((SELECT id FROM dcim_device WHERE name = 'SRV-002'), 'eth0', 'eth0', '1000base-t', true, true, false, '', '管理接口', '{}', NOW(), NOW()),
((SELECT id FROM dcim_device WHERE name = 'SRV-002'), 'eth1', 'eth1', '1000base-t', false, true, false, '', '监控接口', '{}', NOW(), NOW());

-- ===============================
-- 4. IPAM 模块
-- ===============================

-- RIR (区域互联网注册机构)
INSERT INTO ipam_rir (name, slug, is_private, description, comments, custom_field_data, created, last_updated) VALUES
('中国互联网络信息中心', 'cnnic', false, '中国互联网络信息中心', '', '{}', NOW(), NOW()),
('私有地址', 'private', true, 'RFC 1918 私有地址', '', '{}', NOW(), NOW());

-- 聚合
INSERT INTO ipam_aggregate (rir_id, prefix, description, comments, custom_field_data, created, last_updated) VALUES
((SELECT id FROM ipam_rir WHERE slug = 'private'), '192.168.0.0/16', '192.168.0.0/16 私有地址段', '', '{}', NOW(), NOW()),
((SELECT id FROM ipam_rir WHERE slug = 'private'), '10.0.0.0/8', '10.0.0.0/8 私有地址段', '', '{}', NOW(), NOW()),
((SELECT id FROM ipam_rir WHERE slug = 'private'), '172.16.0.0/12', '172.16.0.0/12 私有地址段', '', '{}', NOW(), NOW());

-- VRF (无 slug 列，enforce_unique 必填)
INSERT INTO ipam_vrf (name, rd, enforce_unique, description, comments, custom_field_data, created, last_updated) VALUES
('默认VRF', NULL, true, '默认VRF实例', '', '{}', NOW(), NOW()),
('研发VRF', '100:1', true, '研发部门专用VRF', '', '{}', NOW(), NOW()),
('运维VRF', '100:2', true, '运维部门专用VRF', '', '{}', NOW(), NOW());

-- 前缀 (vrf_id 用子查询按名称取，避免序列导致 id 非 1,2,3)
INSERT INTO ipam_prefix (prefix, status, vrf_id, tenant_id, scope_type_id, scope_id, is_pool, mark_utilized, _depth, _children, description, comments, custom_field_data, created, last_updated) VALUES
('192.168.1.0/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'network'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='site'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), false, false, 0, 0, '上海数据中心网络段', '', '{}', NOW(), NOW()),
('192.168.2.0/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='site'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), false, false, 0, 0, '研发部门网络段', '', '{}', NOW(), NOW()),
('192.168.3.0/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'ops'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='site'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), false, false, 0, 0, '运维部门网络段', '', '{}', NOW(), NOW()),
('10.0.1.0/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '研发VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='site'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), false, false, 0, 0, '研发部门VRF网络段', '', '{}', NOW(), NOW()),
('10.0.2.0/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '运维VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'ops'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='site'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), false, false, 0, 0, '运维部门VRF网络段', '', '{}', NOW(), NOW()),
('192.168.10.0/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'network'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='site'), (SELECT id FROM dcim_site WHERE slug = 'gz-branch'), false, false, 0, 0, '广州分支机构网络段', '', '{}', NOW(), NOW());

-- VLAN组
INSERT INTO ipam_vlangroup (name, slug, scope_id, scope_type_id, description, comments, vid_ranges, _total_vlan_ids, custom_field_data, created, last_updated) VALUES
('数据中心VLAN', 'dc-vlan', (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='site'), '数据中心VLAN组', '', ARRAY['[1,4095)'::int4range], 4094, '{}', NOW(), NOW()),
('分支机构VLAN', 'branch-vlan', (SELECT id FROM dcim_site WHERE slug = 'gz-branch'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='site'), '分支机构VLAN组', '', ARRAY['[1,4095)'::int4range], 4094, '{}', NOW(), NOW());

-- VLAN (comments, created, last_updated 必填)
INSERT INTO ipam_vlan (vid, name, group_id, status, tenant_id, site_id, description, comments, custom_field_data, created, last_updated) VALUES
(10, '管理VLAN', (SELECT id FROM ipam_vlangroup WHERE slug = 'dc-vlan'), 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'network'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), '设备管理VLAN', '', '{}', NOW(), NOW()),
(20, '研发VLAN', (SELECT id FROM ipam_vlangroup WHERE slug = 'dc-vlan'), 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), '研发部门VLAN', '', '{}', NOW(), NOW()),
(30, '运维VLAN', (SELECT id FROM ipam_vlangroup WHERE slug = 'dc-vlan'), 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'ops'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), '运维部门VLAN', '', '{}', NOW(), NOW()),
(100, '分支管理VLAN', (SELECT id FROM ipam_vlangroup WHERE slug = 'branch-vlan'), 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'network'), (SELECT id FROM dcim_site WHERE slug = 'gz-branch'), '分支机构管理VLAN', '', '{}', NOW(), NOW());

-- IP地址 (dns_name 必填)
INSERT INTO ipam_ipaddress (address, status, vrf_id, tenant_id, assigned_object_type_id, assigned_object_id, dns_name, description, comments, custom_field_data, created, last_updated) VALUES
('192.168.1.1/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'network'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='interface'), (SELECT id FROM dcim_interface WHERE name = 'GigabitEthernet1/0/1' AND device_id = (SELECT id FROM dcim_device WHERE name = 'SW-001')), '', 'SW-001 管理地址', '', '{}', NOW(), NOW()),
('192.168.1.2/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'network'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='interface'), (SELECT id FROM dcim_interface WHERE name = 'GigabitEthernet1/0/1' AND device_id = (SELECT id FROM dcim_device WHERE name = 'SW-002')), '', 'SW-002 管理地址', '', '{}', NOW(), NOW()),
('192.168.1.3/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'network'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='interface'), (SELECT id FROM dcim_interface WHERE name = 'GigabitEthernet0/0/0' AND device_id = (SELECT id FROM dcim_device WHERE name = 'RTR-001')), '', 'RTR-001 管理地址', '', '{}', NOW(), NOW()),
('192.168.2.1/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='interface'), (SELECT id FROM dcim_interface WHERE name = 'eth0' AND device_id = (SELECT id FROM dcim_device WHERE name = 'SRV-001')), '', 'SRV-001 管理地址', '', '{}', NOW(), NOW()),
('192.168.2.2/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='interface'), (SELECT id FROM dcim_interface WHERE name = 'eth1' AND device_id = (SELECT id FROM dcim_device WHERE name = 'SRV-001')), '', 'SRV-001 业务地址', '', '{}', NOW(), NOW()),
('192.168.3.1/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'ops'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='interface'), (SELECT id FROM dcim_interface WHERE name = 'eth0' AND device_id = (SELECT id FROM dcim_device WHERE name = 'SRV-002')), '', 'SRV-002 管理地址', '', '{}', NOW(), NOW()),
('10.0.1.1/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '研发VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), NULL, NULL, '', '研发VRF测试地址', '', '{}', NOW(), NOW()),
('10.0.2.1/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '运维VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'ops'), NULL, NULL, '', '运维VRF测试地址', '', '{}', NOW(), NOW()),
('192.168.10.1/24', 'active', (SELECT id FROM ipam_vrf WHERE name = '默认VRF'), (SELECT id FROM tenancy_tenant WHERE slug = 'network'), NULL, NULL, '', '广州分支机构交换机地址', '', '{}', NOW(), NOW());

-- ===============================
-- 5. 电路模块
-- ===============================

-- 提供商（当前 schema 无 asn/account/portal_url 等，使用 name, slug, comments, description, custom_field_data）
INSERT INTO circuits_provider (name, slug, comments, description, custom_field_data, created, last_updated) VALUES
('中国电信', 'china-telecom', '', '中国电信提供商', '{}', NOW(), NOW()),
('中国联通', 'china-unicom', '', '中国联通提供商', '{}', NOW(), NOW()),
('中国移动', 'china-mobile', '', '中国移动提供商', '{}', NOW(), NOW());

-- 提供商账户（provider_id, account 唯一；name, description, comments 必填）
INSERT INTO circuits_provideraccount (provider_id, account, name, description, comments, custom_field_data, created, last_updated) VALUES
((SELECT id FROM circuits_provider WHERE slug = 'china-telecom'), 'CT-001', '电信专线账户', '数据中心专线账户', '', '{}', NOW(), NOW()),
((SELECT id FROM circuits_provider WHERE slug = 'china-unicom'), 'CU-001', '联通专线账户', '备份线路账户', '', '{}', NOW(), NOW());

-- 提供商网络（provider_id, name 唯一；service_id 必填）
INSERT INTO circuits_providernetwork (provider_id, name, service_id, description, comments, custom_field_data, created, last_updated) VALUES
((SELECT id FROM circuits_provider WHERE slug = 'china-telecom'), '电信MPLS网络', 'MPLS-001', '电信MPLS骨干网络', '', '{}', NOW(), NOW()),
((SELECT id FROM circuits_provider WHERE slug = 'china-unicom'), '联通IP网络', 'IP-001', '联通IP骨干网络', '', '{}', NOW(), NOW());

-- 电路类型（color 必填，6 位十六进制）
INSERT INTO circuits_circuittype (name, slug, description, color, comments, custom_field_data, created, last_updated) VALUES
('互联网专线', 'internet', '互联网接入专线', '0099cc', '', '{}', NOW(), NOW()),
('MPLS专线', 'mpls', 'MPLS VPN专线', '0099cc', '', '{}', NOW(), NOW()),
('SD-WAN', 'sdwan', '软件定义广域网', '0099cc', '', '{}', NOW(), NOW());

-- 电路（provider_id + cid 唯一）
INSERT INTO circuits_circuit (cid, provider_id, type_id, status, tenant_id, install_date, commit_rate, description, comments, custom_field_data, created, last_updated) VALUES
('CT-2023001', (SELECT id FROM circuits_provider WHERE slug = 'china-telecom'), (SELECT id FROM circuits_circuittype WHERE slug = 'internet'), 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'network'), '2023-01-01', 1000, '上海数据中心互联网专线', '', '{}', NOW(), NOW()),
('CT-2023002', (SELECT id FROM circuits_provider WHERE slug = 'china-telecom'), (SELECT id FROM circuits_circuittype WHERE slug = 'mpls'), 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'network'), '2023-02-01', 500, '上海-北京MPLS专线', '', '{}', NOW(), NOW()),
('CU-2023001', (SELECT id FROM circuits_provider WHERE slug = 'china-unicom'), (SELECT id FROM circuits_circuittype WHERE slug = 'internet'), 'active', (SELECT id FROM tenancy_tenant WHERE slug = 'network'), '2023-03-01', 500, '上海数据中心备份互联网专线', '', '{}', NOW(), NOW());

-- 电路终端（term_side A/Z；站点用 _site_id，提供商网络用 _provider_network_id；mark_connected, xconnect_id, pp_info, custom_field_data 必填）
INSERT INTO circuits_circuittermination (circuit_id, term_side, mark_connected, port_speed, xconnect_id, pp_info, description, _site_id, _provider_network_id, custom_field_data, created, last_updated) VALUES
((SELECT id FROM circuits_circuit WHERE cid = 'CT-2023001'), 'A', false, 1000, '', '', '上海数据中心互联网专线A端', (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), NULL, '{}', NOW(), NOW()),
((SELECT id FROM circuits_circuit WHERE cid = 'CT-2023001'), 'Z', false, 1000, '', '', '上海数据中心互联网专线Z端', NULL, (SELECT id FROM circuits_providernetwork WHERE name = '电信MPLS网络'), '{}', NOW(), NOW()),
((SELECT id FROM circuits_circuit WHERE cid = 'CT-2023002'), 'A', false, 500, '', '', '上海-北京MPLS专线上海端', (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), NULL, '{}', NOW(), NOW()),
((SELECT id FROM circuits_circuit WHERE cid = 'CT-2023002'), 'Z', false, 500, '', '', '上海-北京MPLS专线北京端', (SELECT id FROM dcim_site WHERE slug = 'bj-dc'), NULL, '{}', NOW(), NOW());

-- ===============================
-- 6. 虚拟化模块
-- ===============================

-- 集群类型
INSERT INTO virtualization_clustertype (name, slug, description, comments, custom_field_data, created, last_updated) VALUES
('VMware ESXi', 'vmware-esxi', 'VMware ESXi集群', '', '{}', NOW(), NOW()),
('KVM', 'kvm', 'KVM虚拟机集群', '', '{}', NOW(), NOW()),
('Hyper-V', 'hyper-v', 'Hyper-V虚拟机集群', '', '{}', NOW(), NOW());

-- 集群组
INSERT INTO virtualization_clustergroup (name, slug, description, comments, custom_field_data, created, last_updated) VALUES
('生产集群', 'prod', '生产环境虚拟机集群', '', '{}', NOW(), NOW()),
('测试集群', 'test', '测试环境虚拟机集群', '', '{}', NOW(), NOW());

-- 集群 (无 site_id，用 scope_type_id + scope_id；comments/created/last_updated 必填)
INSERT INTO virtualization_cluster (name, type_id, group_id, scope_type_id, scope_id, tenant_id, status, description, comments, custom_field_data, created, last_updated) VALUES
('PROD-CLUSTER-01', (SELECT id FROM virtualization_clustertype WHERE slug = 'vmware-esxi'), (SELECT id FROM virtualization_clustergroup WHERE slug = 'prod'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='site'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), (SELECT id FROM tenancy_tenant WHERE slug = 'ops'), 'active', '生产环境VMware集群', '', '{}', NOW(), NOW()),
('TEST-CLUSTER-01', (SELECT id FROM virtualization_clustertype WHERE slug = 'kvm'), (SELECT id FROM virtualization_clustergroup WHERE slug = 'test'), (SELECT id FROM django_content_type WHERE app_label='dcim' AND model='site'), (SELECT id FROM dcim_site WHERE slug = 'sh-dc'), (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), 'active', '测试环境KVM集群', '', '{}', NOW(), NOW());

-- 虚拟机 (serial, start_on_boot, interface_count, virtual_disk_count 必填)
INSERT INTO virtualization_virtualmachine (name, cluster_id, tenant_id, platform_id, status, vcpus, memory, disk, serial, start_on_boot, interface_count, virtual_disk_count, description, comments, custom_field_data, created, last_updated) VALUES
('VM-WEB-001', (SELECT id FROM virtualization_cluster WHERE name = 'PROD-CLUSTER-01'), (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), (SELECT id FROM dcim_platform WHERE slug = 'linux'), 'active', 4, 8192, 100, '', 'off', 0, 0, '生产环境Web服务器', '', '{}', NOW(), NOW()),
('VM-DB-001', (SELECT id FROM virtualization_cluster WHERE name = 'PROD-CLUSTER-01'), (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), (SELECT id FROM dcim_platform WHERE slug = 'linux'), 'active', 8, 16384, 500, '', 'off', 0, 0, '生产环境数据库服务器', '', '{}', NOW(), NOW()),
('VM-TEST-001', (SELECT id FROM virtualization_cluster WHERE name = 'TEST-CLUSTER-01'), (SELECT id FROM tenancy_tenant WHERE slug = 'rd'), (SELECT id FROM dcim_platform WHERE slug = 'linux'), 'active', 2, 4096, 50, '', 'off', 0, 0, '测试环境服务器', '', '{}', NOW(), NOW());

-- 虚拟机接口 (无 type/mac_address 列，_name 必填)
INSERT INTO virtualization_vminterface (virtual_machine_id, name, _name, enabled, description, custom_field_data, created, last_updated) VALUES
((SELECT id FROM virtualization_virtualmachine WHERE name = 'VM-WEB-001'), 'eth0', 'eth0', true, 'Web服务器主接口', '{}', NOW(), NOW()),
((SELECT id FROM virtualization_virtualmachine WHERE name = 'VM-DB-001'), 'eth0', 'eth0', true, '数据库服务器主接口', '{}', NOW(), NOW()),
((SELECT id FROM virtualization_virtualmachine WHERE name = 'VM-TEST-001'), 'eth0', 'eth0', true, '测试服务器接口', '{}', NOW(), NOW());

-- ===============================
-- 7. 额外功能模块
-- ===============================

-- 标签 (weight 必填)
INSERT INTO extras_tag (name, slug, color, weight, description, created, last_updated) VALUES
('生产环境', 'production', 'ff0000', 1000, '生产环境设备', NOW(), NOW()),
('测试环境', 'test', '00ff00', 1000, '测试环境设备', NOW(), NOW()),
('关键设备', 'critical', 'ffcc00', 1000, '关键业务设备', NOW(), NOW()),
('网络设备', 'network-device', '0066cc', 1000, '网络设备', NOW(), NOW()),
('服务器', 'server-device', '666666', 1000, '服务器设备', NOW(), NOW());

-- 标签分配
INSERT INTO extras_taggeditem (content_type_id, object_id, tag_id) VALUES
-- 为设备分配标签
((SELECT id FROM django_content_type WHERE app_label = 'dcim' AND model = 'device'), (SELECT id FROM dcim_device WHERE name = 'SW-001'), (SELECT id FROM extras_tag WHERE slug = 'production')),
((SELECT id FROM django_content_type WHERE app_label = 'dcim' AND model = 'device'), (SELECT id FROM dcim_device WHERE name = 'SW-001'), (SELECT id FROM extras_tag WHERE slug = 'critical')),
((SELECT id FROM django_content_type WHERE app_label = 'dcim' AND model = 'device'), (SELECT id FROM dcim_device WHERE name = 'SW-001'), (SELECT id FROM extras_tag WHERE slug = 'network-device')),
((SELECT id FROM django_content_type WHERE app_label = 'dcim' AND model = 'device'), (SELECT id FROM dcim_device WHERE name = 'SRV-001'), (SELECT id FROM extras_tag WHERE slug = 'test')),
((SELECT id FROM django_content_type WHERE app_label = 'dcim' AND model = 'device'), (SELECT id FROM dcim_device WHERE name = 'SRV-001'), (SELECT id FROM extras_tag WHERE slug = 'server-device')),
-- 为虚拟机分配标签
((SELECT id FROM django_content_type WHERE app_label = 'virtualization' AND model = 'virtualmachine'), (SELECT id FROM virtualization_virtualmachine WHERE name = 'VM-WEB-001'), (SELECT id FROM extras_tag WHERE slug = 'production')),
((SELECT id FROM django_content_type WHERE app_label = 'virtualization' AND model = 'virtualmachine'), (SELECT id FROM virtualization_virtualmachine WHERE name = 'VM-TEST-001'), (SELECT id FROM extras_tag WHERE slug = 'test'));

-- ===============================
-- 8. 提交事务
-- ===============================

COMMIT;

-- 脚本执行完成
-- 此脚本生成了以下数据：
-- - 7个租户（部门）
-- - 4个站点
-- - 6个机架
-- - 7台设备
-- - 11个接口
-- - 9个IP地址
-- - 6个前缀
-- - 4个VLAN
-- - 3个电路
-- - 2个集群
-- - 3台虚拟机
-- - 5个标签
-- 
-- 这些数据将在NetBox界面上显示为丰富的菜单内容
\`\`\``;export{e as default};
