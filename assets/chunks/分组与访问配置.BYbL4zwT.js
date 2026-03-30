const n=`# 分组与访问配置（v2）\r
\r
本文说明如何通过 **系统分组相关设置**、**用户分组**、**渠道与模型能力**、**令牌分组** 实现按部门（如 PSE / IT）隔离线路与可见模型。与 \`ext\` 插件无关。\r
\r
§1–§5 为通用说明与最小示例；**§6** 为六条业务线（HSE / PSE / SSE / CSSG / IT / MAE）各含 default / vip 的**完整可复制配置**（分组倍率、用户可选分组、分组特殊可用分组、\`auto\` 顺序）。\r
\r
---\r
\r
## 1. 前置：分组倍率\r
\r
在 **系统配置 → 分组与模型定价设置 → 分组相关设置** 中，**分组倍率** JSON 须包含本方案用到的所有分组名（否则令牌选用某分组时可能被判定为无效分组）。示例：\r
\r
\`\`\`json\r
{\r
  "default": 1,\r
  "pse": 1,\r
  "it": 1\r
}\r
\`\`\`\r
\r
按需调整倍率数值；**键名**须与下文「用户可选分组」「渠道分组」「abilities」一致。\r
\r
---\r
\r
## 2. 分组相关设置（保存）\r
\r
路径：**系统配置 → 分组与模型定价设置 → 分组相关设置**。\r
\r
### 2.1 用户可选分组\r
\r
新建令牌时下拉可选的分组（全局表：分组名 → 展示名）：\r
\r
\`\`\`json\r
{\r
  "default": "默认分组",\r
  "pse": "PSE",\r
  "it": "IT"\r
}\r
\`\`\`\r
\r
### 2.2 分组特殊可用分组\r
\r
按 **用户资料里的「用户分组」** 裁剪该用户令牌**允许使用的中继分组**：在「用户可选分组」的拷贝上执行 **删除（\`-:\`）** 或 **添加（\`+:\` / 无前缀键）**。\r
\r
PSE 用户只能用 PSE、不能用 default 与 IT；IT 用户只能用 IT：\r
\r
\`\`\`json\r
{\r
  "pse": {\r
    "-:default": "不使用默认分组",\r
    "-:it": "非 IT 通道"\r
  },\r
  "it": {\r
    "-:default": "不使用默认分组",\r
    "-:pse": "非 PSE 通道"\r
  }\r
}\r
\`\`\`\r
\r
说明：内层 **\`-:分组名\`** 表示从该用户可用列表中**移除**该分组；值仅为说明文案，不参与解析逻辑。\r
\r
### 2.3 自动分组（\`auto\` 令牌）\r
\r
仅当令牌分组为 **\`auto\`** 时生效：按数组**从左到右**依次尝试分组内是否有可用渠道；且分组须仍在该用户的**可用分组**集合内。\r
\r
\`\`\`json\r
[\r
  "default",\r
  "pse",\r
  "it"\r
]\r
\`\`\`\r
\r
**注意：** \`auto\` 可能对同一用户合并多分组线路。若要求 **一人严格只走一个分组**，请让用户使用 **令牌分组留空**（跟随用户默认分组）或 **固定填 \`pse\` / \`it\`**，而**不要**使用 \`auto\`。\r
\r
保存 **分组相关设置**。\r
\r
---\r
\r
## 3. 用户管理\r
\r
为每个账号设置 **用户分组**（如 PSE 员工 → \`pse\`，IT 员工 → \`it\`）。  \r
该字段与「分组特殊可用分组」的**外层键**对应。\r
\r
---\r
\r
## 4. 渠道管理\r
\r
- 为各渠道设置 **分组**（如 PSE 线路填 \`pse\`，IT 线路填 \`it\`），与 abilities 中的分组一致。\r
- 在渠道或 **模型 / 能力** 配置中，为对应分组 **启用模型**（\`abilities\`：\`group\` + \`model\` + \`channel_id\`）。\r
\r
请求实际可选用的模型 = **当前使用的中继分组**下已启用的模型集合（再与令牌 **模型限制** 取交集，若该令牌开启了限制）。\r
\r
---\r
\r
## 5. 令牌管理\r
\r
- 用户新建令牌时，**分组**下拉仅展示对该用户 **合法的中继分组**（「用户可选分组」经「分组特殊可用分组」裁剪后，且通过分组倍率等校验）。\r
- **中继分组**决定走哪条渠道集合；**该分组下在 abilities 中配置的模型** 才会参与选路与计费。\r
- 若令牌另设 **模型限制**（\`model_limits_enabled\` + \`model_limits\`），则在上述集合上再收紧为白名单；不设则使用该分组下全部已启用模型。\r
\r
---\r
\r
## 6. 完整示例：HSE / PSE / SSE / CSSG / IT / MAE（default 与 vip）\r
\r
以下方案在六条业务线（HSE、PSE、SSE、CSSG、IT、MAE）上各设 **default** 与 **vip** 中继分组，并按 **用户分组** 裁剪可见的中继分组：\r
\r
| 用户分组（用户管理） | 令牌可选的中继分组 |\r
|---------------------|-------------------|\r
| \`hse_default\` | 仅 \`hse_default\` |\r
| \`hse_vip\` | \`hse_default\`、\`hse_vip\` |\r
| \`pse_default\` | 仅 \`pse_default\` |\r
| \`pse_vip\` | \`pse_default\`、\`pse_vip\` |\r
| \`sse_default\` | 仅 \`sse_default\` |\r
| \`sse_vip\` | \`sse_default\`、\`sse_vip\` |\r
| \`cssg_default\` | 仅 \`cssg_default\` |\r
| \`cssg_vip\` | \`cssg_default\`、\`cssg_vip\` |\r
| \`it_default\` | 仅 \`it_default\` |\r
| \`it_vip\` | \`it_default\`、\`it_vip\` |\r
| \`mae_default\` | 仅 \`mae_default\` |\r
| \`mae_vip\` | \`mae_default\`、\`mae_vip\` |\r
\r
其他业务线的分组一律不可见。配置时 **用户可选分组** 须包含上表全部中继分组键；**分组特殊可用分组** 通过 **\`-:分组名\`** 从全量拷贝中删除不允许项。\r
\r
### 6.1 分组倍率\r
\r
倍率均为 \`1\`（可按需改数值，**键名**须与渠道、abilities 一致）：\r
\r
\`\`\`json\r
{\r
  "hse_default": 1,\r
  "hse_vip": 1,\r
  "pse_default": 1,\r
  "pse_vip": 1,\r
  "sse_default": 1,\r
  "sse_vip": 1,\r
  "cssg_default": 1,\r
  "cssg_vip": 1,\r
  "it_default": 1,\r
  "it_vip": 1,\r
  "mae_default": 1,\r
  "mae_vip": 1\r
}\r
\`\`\`\r
\r
### 6.2 用户可选分组\r
\r
\`\`\`json\r
{\r
  "hse_default": "HSE Default",\r
  "hse_vip": "HSE VIP",\r
  "pse_default": "PSE Default",\r
  "pse_vip": "PSE VIP",\r
  "sse_default": "SSE Default",\r
  "sse_vip": "SSE VIP",\r
  "cssg_default": "CSSG Default",\r
  "cssg_vip": "CSSG VIP",\r
  "it_default": "IT Default",\r
  "it_vip": "IT VIP",\r
  "mae_default": "MAE Default",\r
  "mae_vip": "MAE VIP"\r
}\r
\`\`\`\r
\r
### 6.3 分组特殊可用分组\r
\r
内层 **\`-:xxx\`** 表示从该 **用户分组** 对应账号的可用中继列表中移除 \`xxx\`；值仅为说明文案。\r
\r
\`\`\`json\r
{\r
  "hse_default": {\r
    "-:hse_vip": "非本档",\r
    "-:pse_default": "非 PSE",\r
    "-:pse_vip": "非 PSE",\r
    "-:sse_default": "非 SSE",\r
    "-:sse_vip": "非 SSE",\r
    "-:cssg_default": "非 CSSG",\r
    "-:cssg_vip": "非 CSSG",\r
    "-:it_default": "非 IT",\r
    "-:it_vip": "非 IT",\r
    "-:mae_default": "非 MAE",\r
    "-:mae_vip": "非 MAE"\r
  },\r
  "hse_vip": {\r
    "-:pse_default": "非 PSE",\r
    "-:pse_vip": "非 PSE",\r
    "-:sse_default": "非 SSE",\r
    "-:sse_vip": "非 SSE",\r
    "-:cssg_default": "非 CSSG",\r
    "-:cssg_vip": "非 CSSG",\r
    "-:it_default": "非 IT",\r
    "-:it_vip": "非 IT",\r
    "-:mae_default": "非 MAE",\r
    "-:mae_vip": "非 MAE"\r
  },\r
  "pse_default": {\r
    "-:hse_default": "非 HSE",\r
    "-:hse_vip": "非 HSE",\r
    "-:pse_vip": "非本档",\r
    "-:sse_default": "非 SSE",\r
    "-:sse_vip": "非 SSE",\r
    "-:cssg_default": "非 CSSG",\r
    "-:cssg_vip": "非 CSSG",\r
    "-:it_default": "非 IT",\r
    "-:it_vip": "非 IT",\r
    "-:mae_default": "非 MAE",\r
    "-:mae_vip": "非 MAE"\r
  },\r
  "pse_vip": {\r
    "-:hse_default": "非 HSE",\r
    "-:hse_vip": "非 HSE",\r
    "-:sse_default": "非 SSE",\r
    "-:sse_vip": "非 SSE",\r
    "-:cssg_default": "非 CSSG",\r
    "-:cssg_vip": "非 CSSG",\r
    "-:it_default": "非 IT",\r
    "-:it_vip": "非 IT",\r
    "-:mae_default": "非 MAE",\r
    "-:mae_vip": "非 MAE"\r
  },\r
  "sse_default": {\r
    "-:hse_default": "非 HSE",\r
    "-:hse_vip": "非 HSE",\r
    "-:pse_default": "非 PSE",\r
    "-:pse_vip": "非 PSE",\r
    "-:sse_vip": "非本档",\r
    "-:cssg_default": "非 CSSG",\r
    "-:cssg_vip": "非 CSSG",\r
    "-:it_default": "非 IT",\r
    "-:it_vip": "非 IT",\r
    "-:mae_default": "非 MAE",\r
    "-:mae_vip": "非 MAE"\r
  },\r
  "sse_vip": {\r
    "-:hse_default": "非 HSE",\r
    "-:hse_vip": "非 HSE",\r
    "-:pse_default": "非 PSE",\r
    "-:pse_vip": "非 PSE",\r
    "-:cssg_default": "非 CSSG",\r
    "-:cssg_vip": "非 CSSG",\r
    "-:it_default": "非 IT",\r
    "-:it_vip": "非 IT",\r
    "-:mae_default": "非 MAE",\r
    "-:mae_vip": "非 MAE"\r
  },\r
  "cssg_default": {\r
    "-:hse_default": "非 HSE",\r
    "-:hse_vip": "非 HSE",\r
    "-:pse_default": "非 PSE",\r
    "-:pse_vip": "非 PSE",\r
    "-:sse_default": "非 SSE",\r
    "-:sse_vip": "非 SSE",\r
    "-:cssg_vip": "非本档",\r
    "-:it_default": "非 IT",\r
    "-:it_vip": "非 IT",\r
    "-:mae_default": "非 MAE",\r
    "-:mae_vip": "非 MAE"\r
  },\r
  "cssg_vip": {\r
    "-:hse_default": "非 HSE",\r
    "-:hse_vip": "非 HSE",\r
    "-:pse_default": "非 PSE",\r
    "-:pse_vip": "非 PSE",\r
    "-:sse_default": "非 SSE",\r
    "-:sse_vip": "非 SSE",\r
    "-:it_default": "非 IT",\r
    "-:it_vip": "非 IT",\r
    "-:mae_default": "非 MAE",\r
    "-:mae_vip": "非 MAE"\r
  },\r
  "it_default": {\r
    "-:hse_default": "非 HSE",\r
    "-:hse_vip": "非 HSE",\r
    "-:pse_default": "非 PSE",\r
    "-:pse_vip": "非 PSE",\r
    "-:sse_default": "非 SSE",\r
    "-:sse_vip": "非 SSE",\r
    "-:cssg_default": "非 CSSG",\r
    "-:cssg_vip": "非 CSSG",\r
    "-:mae_default": "非 MAE",\r
    "-:mae_vip": "非 MAE",\r
    "-:it_vip": "非本档"\r
  },\r
  "it_vip": {\r
    "-:hse_default": "非 HSE",\r
    "-:hse_vip": "非 HSE",\r
    "-:pse_default": "非 PSE",\r
    "-:pse_vip": "非 PSE",\r
    "-:sse_default": "非 SSE",\r
    "-:sse_vip": "非 SSE",\r
    "-:cssg_default": "非 CSSG",\r
    "-:cssg_vip": "非 CSSG",\r
    "-:mae_default": "非 MAE",\r
    "-:mae_vip": "非 MAE"\r
  },\r
  "mae_default": {\r
    "-:hse_default": "非 HSE",\r
    "-:hse_vip": "非 HSE",\r
    "-:pse_default": "非 PSE",\r
    "-:pse_vip": "非 PSE",\r
    "-:sse_default": "非 SSE",\r
    "-:sse_vip": "非 SSE",\r
    "-:cssg_default": "非 CSSG",\r
    "-:cssg_vip": "非 CSSG",\r
    "-:it_default": "非 IT",\r
    "-:it_vip": "非 IT",\r
    "-:mae_vip": "非本档"\r
  },\r
  "mae_vip": {\r
    "-:hse_default": "非 HSE",\r
    "-:hse_vip": "非 HSE",\r
    "-:pse_default": "非 PSE",\r
    "-:pse_vip": "非 PSE",\r
    "-:sse_default": "非 SSE",\r
    "-:sse_vip": "非 SSE",\r
    "-:cssg_default": "非 CSSG",\r
    "-:cssg_vip": "非 CSSG",\r
    "-:it_default": "非 IT",\r
    "-:it_vip": "非 IT"\r
  }\r
}\r
\`\`\`\r
\r
### 6.4 自动分组（\`auto\`）\r
\r
令牌分组填 **\`auto\`** 时，按数组 **从左到右** 依次尝试；仅会落在该用户 **可用中继分组** 与 **自动分组列表** 的交集中（见 \`GetUserAutoGroup\`）。全站统一顺序示例（先各线 default，再各线 vip；可按 failover 需求调整顺序，例如让某线 vip 排在同线 default 之前以优先走 VIP 渠道）：\r
\r
\`\`\`json\r
[\r
  "hse_default",\r
  "hse_vip",\r
  "pse_default",\r
  "pse_vip",\r
  "sse_default",\r
  "sse_vip",\r
  "cssg_default",\r
  "cssg_vip",\r
  "it_default",\r
  "it_vip",\r
  "mae_default",\r
  "mae_vip"\r
]\r
\`\`\`\r
\r
例如 \`pse_default\` 用户只会命中 \`pse_default\`；\`pse_vip\` 用户会在 \`pse_default\` 与 \`pse_vip\` 中按顺序尝试。若要求 **一人严格只走单一中继分组**，优先使用令牌固定具体分组或留空跟随默认，而非依赖 \`auto\`。\r
\r
### 6.5 配套\r
\r
- **用户管理**：账号 **用户分组** 设为 \`hse_default\`、\`hse_vip\`、\`pse_default\`、… 之一，与上表外层键一致。\r
- **渠道 / abilities**：渠道 **分组** 填上述十二个键之一，与倍率、裁剪逻辑一致。\r
\r
---\r
\r
`;export{n as default};
