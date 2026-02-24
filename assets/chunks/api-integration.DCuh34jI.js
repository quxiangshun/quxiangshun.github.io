const n=`# NetBox API 集成指南

> 编辑日期：2026-02-13



NetBox 提供了强大的 API，用于与其他系统集成。本文档将详细介绍如何使用 NetBox API 进行集成开发。

## 1. API 概述

NetBox 提供了两种 API：

- **REST API**：基于 HTTP REST 架构的传统 API
- **GraphQL API**：基于 GraphQL 查询语言的现代 API

两种 API 都可以用于与 NetBox 集成，选择哪种 API 取决于您的具体需求和技术栈。

## 2. REST API

### 2.1 API 基础

- **API 根路径**：默认情况下，REST API 可通过 \`/api/\` 路径访问
- **版本控制**：NetBox REST API 使用 URL 路径进行版本控制，如 \`/api/v3/\`
- **认证**：支持 Token 认证和会话认证
- **响应格式**：默认返回 JSON 格式数据

### 2.2 认证

#### Token 认证

1. **生成 Token**：
   - 登录 NetBox Web 界面
   - 进入用户个人资料页面
   - 点击 "Tokens" 选项卡
   - 点击 "Create Token" 按钮生成新 Token

2. **使用 Token**：
   - 在 HTTP 请求头中添加 \`Authorization\` 头
   - 格式：\`Authorization: Token your_token_here\`

   示例：
   \`\`\`bash
   curl -H "Authorization: Token your_token_here" https://netbox.example.com/api/v3/dcim/devices/
   \`\`\`

#### 会话认证

对于浏览器应用，可以使用 NetBox 的会话认证机制：

1. **登录**：向 \`/login/\` 发送 POST 请求，包含用户名和密码
2. **保持会话**：使用返回的会话 cookie 进行后续请求

### 2.3 API 资源

NetBox REST API 提供了对所有 NetBox 对象的访问，主要资源包括：

- **dcim**：设备、站点、机架等
- **ipam**：IP 地址、前缀、VLAN 等
- **circuits**：电路、提供商等
- **virtualization**：虚拟机、集群等
- **tenancy**：租户、联系人等
- **extras**：标签、自定义字段等

### 2.4 API 过滤

NetBox REST API 支持通过查询参数进行过滤：

\`\`\`bash
# 过滤名称包含 "core" 的设备
curl -H "Authorization: Token your_token_here" "https://netbox.example.com/api/v3/dcim/devices/?name__icontains=core"

# 过滤特定站点的设备
curl -H "Authorization: Token your_token_here" "https://netbox.example.com/api/v3/dcim/devices/?site=1"
\`\`\`

### 2.5 API 排序

使用 \`ordering\` 参数对结果进行排序：

\`\`\`bash
# 按名称升序排序
curl -H "Authorization: Token your_token_here" "https://netbox.example.com/api/v3/dcim/devices/?ordering=name"

# 按名称降序排序
curl -H "Authorization: Token your_token_here" "https://netbox.example.com/api/v3/dcim/devices/?ordering=-name"
\`\`\`

### 2.6 API 分页

NetBox REST API 使用分页返回大量数据：

\`\`\`bash
# 获取第一页，每页 50 条记录
curl -H "Authorization: Token your_token_here" "https://netbox.example.com/api/v3/dcim/devices/?limit=50&offset=0"

# 获取第二页
curl -H "Authorization: Token your_token_here" "https://netbox.example.com/api/v3/dcim/devices/?limit=50&offset=50"
\`\`\`

### 2.7 API 示例

#### 获取设备列表

\`\`\`bash
curl -H "Authorization: Token your_token_here" https://netbox.example.com/api/v3/dcim/devices/
\`\`\`

响应示例：

\`\`\`json
{
  "count": 10,
  "next": "https://netbox.example.com/api/v3/dcim/devices/?limit=50&offset=50",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "core-switch-01",
      "display_name": "core-switch-01",
      "device_type": {
        "id": 1,
        "url": "https://netbox.example.com/api/v3/dcim/device-types/1/",
        "display": "Cisco Catalyst 9300",
        "model": "Catalyst 9300",
        "manufacturer": {
          "id": 1,
          "url": "https://netbox.example.com/api/v3/dcim/manufacturers/1/",
          "display": "Cisco",
          "name": "Cisco",
          "slug": "cisco"
        }
      },
      "device_role": {
        "id": 1,
        "url": "https://netbox.example.com/api/v3/dcim/device-roles/1/",
        "display": "Core Switch",
        "name": "Core Switch",
        "slug": "core-switch"
      },
      "site": {
        "id": 1,
        "url": "https://netbox.example.com/api/v3/dcim/sites/1/",
        "display": "Main Campus",
        "name": "Main Campus",
        "slug": "main-campus"
      },
      "status": "active",
      "primary_ip": null,
      "primary_ip4": null,
      "primary_ip6": null,
      "position": 10,
      "rack": {
        "id": 1,
        "url": "https://netbox.example.com/api/v3/dcim/racks/1/",
        "display": "Rack-01",
        "name": "Rack-01"
      },
      "tenant": null,
      "platform": null,
      "serial": "FOC12345678",
      "asset_tag": null,
      "site": {
        "id": 1,
        "url": "https://netbox.example.com/api/v3/dcim/sites/1/",
        "display": "Main Campus",
        "name": "Main Campus",
        "slug": "main-campus"
      },
      "location": null,
      "comments": "",
      "tags": [],
      "custom_fields": {},
      "created": "2023-01-01T00:00:00Z",
      "last_updated": "2023-01-01T00:00:00Z",
      "url": "https://netbox.example.com/api/v3/dcim/devices/1/"
    }
  ]
}
\`\`\`

#### 创建设备

\`\`\`bash
curl -X POST \\
  -H "Authorization: Token your_token_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "access-switch-01",
    "device_type": 2,
    "device_role": 2,
    "site": 1,
    "rack": 1,
    "position": 15,
    "status": "active"
  }' \\
  https://netbox.example.com/api/v3/dcim/devices/
\`\`\`

### 2.8 API 文档

NetBox 提供了交互式 API 文档：

- **Swagger UI**：\`https://netbox.example.com/api/docs/\`
- **ReDoc**：\`https://netbox.example.com/api/redoc/\`

## 3. GraphQL API

### 3.1 概述

NetBox GraphQL API 提供了更灵活的数据查询方式，允许客户端指定需要的数据结构。

- **端点**：\`/api/graphql/\`
- **认证**：与 REST API 相同
- **查询语言**：使用 GraphQL 查询语法

### 3.2 基本查询

\`\`\`bash
curl -X POST \\
  -H "Authorization: Token your_token_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "{
      devices(name_Icontains: \\"core\\") {
        id
        name
        deviceType {
          model
          manufacturer {
            name
          }
        }
        site {
          name
        }
      }
    }"
  }' \\
  https://netbox.example.com/api/graphql/
\`\`\`

### 3.3 变量

使用变量使查询更灵活：

\`\`\`bash
curl -X POST \\
  -H "Authorization: Token your_token_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "query GetDevices($siteName: String!) {
      sites(name: $siteName) {
        devices {
          id
          name
          status
        }
      }
    }",
    "variables": {
      "siteName": "Main Campus"
    }
  }' \\
  https://netbox.example.com/api/graphql/
\`\`\`

## 4. Webhooks

### 4.1 概述

NetBox Webhooks 允许在特定事件发生时向外部系统发送 HTTP 请求。

### 4.2 创建 Webhook

1. **登录 NetBox Web 界面**
2. **进入 Webhooks 管理页面**：Extras > Webhooks
3. **点击 "Add" 按钮**
4. **填写配置**：
   - **Name**：Webhook 名称
   - **Content Type**：请求内容类型（如 application/json）
   - **URL**：接收 webhook 的外部系统 URL
   - **HTTP Method**：请求方法（如 POST）
   - **Events**：触发 webhook 的事件（如 device.create, device.update）
   - **Conditions**：可选的触发条件

### 4.3 Webhook 示例

#### 配置

- **Name**：Device Status Change
- **URL**：\`https://your-system.example.com/webhook/device-status\`
- **HTTP Method**：POST
- **Events**：dcim.device.update
- **Conditions**：\`status != status_before\`

#### 触发

当设备状态发生变化时，NetBox 会向指定 URL 发送包含设备信息的 POST 请求。

## 5. 集成示例

### 5.1 Python 集成

使用 \`requests\` 库：

\`\`\`python
import requests

url = "https://netbox.example.com/api/v3/dcim/devices/"
headers = {
    "Authorization": "Token your_token_here",
    "Content-Type": "application/json"
}

# 获取设备列表
response = requests.get(url, headers=headers)
devices = response.json()

# 创建新设备
data = {
    "name": "new-switch-01",
    "device_type": 2,
    "device_role": 2,
    "site": 1,
    "status": "active"
}
response = requests.post(url, headers=headers, json=data)
new_device = response.json()
\`\`\`

### 5.2 Ansible 集成

使用 \`netbox.netbox\` 集合：

\`\`\`yaml
- name: Get devices from NetBox
  hosts: localhost
  gather_facts: no
  vars:
    netbox_url: https://netbox.example.com
    netbox_token: your_token_here
  tasks:
    - name: Get all devices
      netbox.netbox.netbox_device_info:
        netbox_url: "{{ netbox_url }}"
        netbox_token: "{{ netbox_token }}"
      register: devices
    
    - name: Create a new device
      netbox.netbox.netbox_device:
        netbox_url: "{{ netbox_url }}"
        netbox_token: "{{ netbox_token }}"
        data:
          name: "new-switch-01"
          device_type: "Cisco Catalyst 9200"
          device_role: "Access Switch"
          site: "Main Campus"
          status: "active"
        state: present
\`\`\`

### 5.3 Terraform 集成

使用 \`netbox\` 提供者：

\`\`\`hcl
provider "netbox" {
  server_url = "https://netbox.example.com"
  api_token  = "your_token_here"
}

resource "netbox_device" "example" {
  name        = "terraform-device-01"
  device_type = data.netbox_device_type.example.id
  device_role = data.netbox_device_role.example.id
  site        = data.netbox_site.example.id
  status      = "active"
}

data "netbox_device_type" "example" {
  model = "Cisco Catalyst 9200"
}

data "netbox_device_role" "example" {
  name = "Access Switch"
}

data "netbox_site" "example" {
  name = "Main Campus"
}
\`\`\`

## 6. 最佳实践

### 6.1 API 使用最佳实践

- **使用 Token 认证**：对于自动化集成，推荐使用 Token 认证
- **限制返回字段**：使用 \`fields\` 参数只返回需要的字段
- **使用过滤**：尽量使用服务器端过滤减少数据传输
- **处理分页**：正确处理分页以获取所有数据
- **错误处理**：实现适当的错误处理机制
- **速率限制**：注意 NetBox 的 API 速率限制

### 6.2 集成架构

- **中间层**：考虑使用中间层服务处理 NetBox 集成
- **缓存**：对于频繁访问的数据，实现适当的缓存机制
- **异步处理**：对于大量数据操作，使用异步处理
- **监控**：监控 API 调用的成功率和响应时间

## 7. 故障排查

### 7.1 常见问题

#### 认证失败

**症状**：收到 401 Unauthorized 响应

**解决方案**：
- 验证 Token 是否正确
- 检查 Token 是否过期
- 确保请求头格式正确

#### 权限不足

**症状**：收到 403 Forbidden 响应

**解决方案**：
- 检查用户权限
- 确保 Token 具有适当的权限

#### 资源不存在

**症状**：收到 404 Not Found 响应

**解决方案**：
- 验证资源 ID 或路径是否正确
- 检查资源是否存在

#### 数据验证错误

**症状**：收到 400 Bad Request 响应

**解决方案**：
- 检查请求数据格式
- 验证必填字段是否提供
- 检查字段值是否有效

### 7.2 调试技巧

- **使用 curl**：使用 curl 命令测试 API 调用
- **查看日志**：检查 NetBox 服务器日志
- **使用 API 文档**：参考交互式 API 文档了解资源结构
- **逐步测试**：从简单查询开始，逐步构建复杂请求

## 8. 相关链接

- [官方 REST API 文档](https://docs.netbox.dev/en/stable/integrations/rest-api/)
- [官方 GraphQL API 文档](https://docs.netbox.dev/en/stable/integrations/graphql-api/)
- [官方 Webhooks 文档](https://docs.netbox.dev/en/stable/integrations/webhooks/)
- [NetBox Python SDK](https://github.com/netbox-community/pynetbox)
- [Ansible NetBox Collection](https://github.com/netbox-community/ansible_modules)
- [Terraform NetBox Provider](https://registry.terraform.io/providers/netbox-community/netbox)

## 9. 总结

NetBox 提供了强大的 API 集成能力，支持：

- **REST API**：传统的 HTTP API，适合大多数集成场景
- **GraphQL API**：更灵活的查询方式，适合复杂数据需求
- **Webhooks**：事件驱动的集成，适合实时通知

通过这些 API，可以将 NetBox 与各种系统集成，如配置管理、监控、自动化工具等，构建完整的网络管理生态系统。`;export{n as default};
