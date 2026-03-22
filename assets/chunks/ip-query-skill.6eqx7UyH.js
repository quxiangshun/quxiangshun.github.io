const n=`# OpenClaw IP 查询 Skill：打通内网与企微

> 编辑日期：2026-03-18

本场景不需要写 MCP，只需写一个 OpenClaw Skill，再配合企微通道配置即可。MCP 是外部工具接入协议，OpenClaw 本身不依赖它；需求「接收企微消息 → 提取 IP → 调用内网接口 → 返回结果」完全在 Skill 内实现。

---

## 一、整体架构（一句话看懂）

1. **企微机器人**：接收用户发送的 IP 消息，推送给 OpenClaw。
2. **OpenClaw 企微通道**：接收消息、路由到 Skill。
3. **IP 查询 Skill**：从消息中提取 IP → 调用内网 ipMgmt API 查询 → 格式化结果并返回给企微。
4. **内网安全**：OpenClaw 服务器可访问内网 ipMgmt 接口。

---

## 二、第一步：配置 OpenClaw 企业微信通道（内网友好）

### 1. 企微后台创建机器人（推荐长连接模式）

1. 登录企微管理后台 → 应用管理 → 机器人 → 创建机器人。
2. 记录：**BotID**、**Secret**（用于 OpenClaw 配置）。
3. 连接方式选择 **WebSocket（长连接）**：
   - 无需公网 IP/域名，内网服务器可直接接入。
   - 无需配置回调 URL，OpenClaw 主动连接企微。

### 2. OpenClaw 配置企微通道

编辑 \`~/.openclaw/openclaw.json\`，添加 wecom 通道：

\`\`\`json
{
  "channels": {
    "wecom": {
      "enabled": true,
      "mode": "ws",
      "botId": "你的企微BotID",
      "secret": "你的企微Secret",
      "dmPolicy": "allowlist"
    }
  },
  "skills": {}
}
\`\`\`

### 3. 重启 OpenClaw 网关

\`\`\`bash
openclaw gateway restart
tail -f ~/.openclaw/logs/openclaw.log
\`\`\`

---

## 三、第二步：编写 IP 查询 Skill（核心）

### 1. 创建 Skill 目录

\`\`\`bash
mkdir -p ~/.openclaw/skills/ip_query
cd ~/.openclaw/skills/ip_query
\`\`\`

### 2. 编写 SKILL.md（YAML 头 + 执行逻辑）

**YAML 头与配置：**

\`\`\`yaml
---
name: ip_query
version: 1.0.0
description: 企微接收IP，查询内网ipMgmt系统的IP归属、使用人、状态等信息
author: 你的名字
license: MIT
trigger:
  - type: regex
    value: ".*(\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}).*"
runtime: python3
timeout: 10
config:
  ipmgmt_api_url:
    type: string
    default: "http://192.168.1.100:8080/api/ip/query"
  api_token:
    type: string
    default: "your-internal-api-token-123456"
  request_method:
    type: string
    default: "POST"
---
\`\`\`

**执行逻辑（Python）：**

\`\`\`python
import os
import re
import requests
import json
from requests.exceptions import RequestException

USER_INPUT = os.getenv("INPUT", "")
API_URL = os.getenv("CONFIG_IPMGMT_API_URL")
API_TOKEN = os.getenv("CONFIG_API_TOKEN")
REQUEST_METHOD = os.getenv("CONFIG_REQUEST_METHOD", "POST").upper()

ip_pattern = re.compile(r"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b")
ip_matches = ip_pattern.findall(USER_INPUT)

if not ip_matches:
    print("❌ 未识别到有效IP地址！\\n请按格式发送：例如「查询IP 192.168.1.100」或直接发送IP。")
    exit(0)

TARGET_IP = ip_matches[0]
print(f"🔍 开始查询IP：{TARGET_IP}")

headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "OpenClaw-Skill/1.0"
}
payload = {"ip": TARGET_IP}

try:
    if REQUEST_METHOD == "POST":
        response = requests.post(API_URL, json=payload, headers=headers, timeout=8)
    elif REQUEST_METHOD == "GET":
        response = requests.get(API_URL, params={"ip": TARGET_IP, "token": API_TOKEN}, headers=headers, timeout=8)
    else:
        print(f"❌ 不支持的请求方法：{REQUEST_METHOD}")
        exit(0)

    response.raise_for_status()
    ip_data = response.json()

except requests.exceptions.ConnectTimeout:
    print(f"❌ 查询失败：连接内网ipMgmt接口超时！\\n接口地址：{API_URL}")
except requests.exceptions.ConnectionError:
    print(f"❌ 查询失败：无法连接内网ipMgmt接口！\\n请检查地址：{API_URL}")
except requests.exceptions.HTTPError as e:
    print(f"❌ 查询失败：接口返回错误（{e.response.status_code}）")
except json.JSONDecodeError:
    print(f"❌ 查询失败：接口返回非JSON格式数据！")
except Exception as e:
    print(f"❌ 查询失败：{str(e)}")
    exit(0)

if ip_data.get("code") != 200 and ip_data.get("msg") != "success":
    print(f"❌ IP {TARGET_IP} 查询无结果！")
    exit(0)

ip_info = ip_data.get("data", {})
result = f"""
📋 **IP查询结果 - {TARGET_IP}**
├─ 归属部门：{ip_info.get('department', '未知')}
├─ 使用人：{ip_info.get('user', '未知')}
├─ 设备类型：{ip_info.get('device', '未知')}
├─ 状态：{ip_info.get('status', '未知')}
├─ 子网：{ip_info.get('subnet', '未知')}
├─ 有效期：{ip_info.get('expire_time', '永久')}
└─ 备注：{ip_info.get('remark', '无')}
"""
print(result.strip())
\`\`\`

### 3. 在 openclaw.json 中启用并配置 Skill

\`\`\`json
{
  "channels": { ... },
  "skills": {
    "ip_query": {
      "enabled": true,
      "config": {
        "ipmgmt_api_url": "http://192.168.1.100:8080/api/ip/query",
        "api_token": "your-real-internal-token",
        "request_method": "POST"
      }
    }
  }
}
\`\`\`

### 4. 安装 Python 依赖

\`\`\`bash
cd ~/.openclaw/skills/ip_query
echo "requests>=2.31.0" > requirements.txt
pip install -r requirements.txt --target=./lib
\`\`\`

### 5. 刷新 Skill

\`\`\`bash
openclaw skills reload
\`\`\`

或在企微中发送「刷新技能」。

---

## 四、第三步：测试全流程

1. 在企微中向机器人发送：**查询IP 192.168.1.100**。
2. 预期：OpenClaw 日志有收到消息、提取 IP、调用内网接口；企微收到格式化的 IP 信息。
3. 排错：\`tail -f ~/.openclaw/logs/openclaw.log\`；在 OpenClaw 服务器上 \`curl\` 测试 ipMgmt 接口；确认 \`requests\` 已安装。

---

## 五、为什么不用 MCP？

| 对比项 | MCP | OpenClaw Skill | 本场景选择 |
|--------|-----|----------------|------------|
| 定位 | 标准化工具接入协议 | 封装完整业务逻辑 | **Skill** |
| 依赖 | 需部署 MCP Server | 无需额外服务 | **Skill** |
| 开发成本 | 高 | 低（SKILL.md + 脚本） | **Skill** |
| 内网适配 | 复杂 | 直接访问内网接口 | **Skill** |

结论：本场景是典型的「消息处理 + 内网接口调用」，用 Skill 即可，无需引入 MCP。

---

## 六、内网安全与优化建议

1. **网络隔离**：OpenClaw 服务器仅开放必要端口，仅允许访问内网 ipMgmt 接口。
2. **权限控制**：在企微配置机器人可见范围，仅授权指定用户/群。
3. **日志审计**：开启 OpenClaw 日志，记录所有 IP 查询操作。
4. **错误重试**：在 Skill 中为内网接口调用增加重试逻辑。
5. **配置加密**：敏感配置（如 \`api_token\`）可通过环境变量注入，不写死在配置文件。

---

## 七、替换成真实接口（必改位置）

### 1. 配置默认值（SKILL.md YAML 头）

- \`ipmgmt_api_url\` → 你的内网接口地址。
- \`api_token\` → 你的真实 Token（无认证可留空）。
- \`request_method\` → 你的接口方法（GET/POST）。

### 2. 请求头（Python）

- 无认证：删除 \`Authorization\` 行。
- 其他方式（如 Cookie）：按接口要求改 \`headers\`。

### 3. 请求参数（Python）

- POST：按接口修改 \`payload\` 字段名（如 \`ip_addr\`）。
- GET：按接口修改 \`params\` 参数名。

### 4. 返回结果字段（Python）

根据接口返回的 JSON 结构，修改 \`ip_info.get('department', ...)\` 等字段名（如 \`org\`、\`username\` 等）。

---

## 八、内网部署与 config 示例

**依赖安装（内网 PyPI）：**

\`\`\`bash
cd ~/.openclaw/skills/ip_query
pip install -r requirements.txt --target=./lib --index-url=http://你的内网PyPI地址/simple/
\`\`\`

**config.example.json（供运维参考）：**

\`\`\`json
{
  "ipmgmt_api_url": "http://192.168.1.100:8080/api/ip/query",
  "api_token": "your-real-token-here",
  "request_method": "POST"
}
\`\`\`

替换为真实接口地址、Token 和请求方法后，执行 \`openclaw skills reload\`，在企微发送 IP 即可收到查询结果。
`;export{n as default};
