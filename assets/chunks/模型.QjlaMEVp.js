const e=`# 模型与能力标记\r
\r
## 业务已支持模型（按系列分组）\r
\r
下表仅列 **当前已接入** 的模型。普通 Markdown 表格**不能**合并单元格，故系列标题行使用 HTML \`colspan="4"\` 跨四列显示（自上而下：Claude → GPT → DeepSeek）。列含义见 [列说明](#列说明)。与后文全量「能力表」独立；**是否在生产可用**以渠道与后台为准。\r
\r
**实机验证标记（颜色）：** 表示已在当前网关场景下做过联调，**不等于**上游能力上限；未着色行仅表示「已接入、尚未按此文档配色标注实测」。\r
\r
\r
| 样式        | 含义                                                 |\r
| --------- | -------------------------------------------------- |\r
| **模型 ID** | **文本 + 图片** 已测（含 URL 图、base64 图、multipart 附件注入文本等） |\r
| **模型 ID** | **仅文本** 已测（无多模态图片链路验证）                             |\r
\r
\r
**测试接口（示例 \`curl\`）：** 将 \`http://localhost:3000\` 换为你的网关监听地址，将 \`Authorization\` 中的 \`sk-…\` 换为**你自己的令牌**（勿把真实密钥提交到仓库或公开粘贴）。\r
\r
\`\`\`bash\r
# deepseek-chat：纯文本 + 流式（含多条 system）\r
curl -N -sS -X POST 'http://localhost:3000/v1/chat/completions' \\\r
  -H 'Authorization: Bearer YOUR_API_KEY' \\\r
  -H 'Content-Type: application/json' \\\r
  -d '{\r
    "model": "deepseek-chat",\r
    "stream": true,\r
    "messages": [\r
      {"role": "system", "content": "你是一个专业助手。"},\r
      {"role": "system", "content": "回答请简洁，分条列出。"},\r
      {"role": "user", "content": "用一句话说明什么是流式输出。"}\r
    ]\r
  }'\r
\r
# gpt-4o：图文（外链 image_url + 流式）\r
curl -N -sS -X POST 'http://localhost:3000/v1/chat/completions' \\\r
  -H 'Authorization: Bearer YOUR_API_KEY' \\\r
  -H 'Content-Type: application/json' \\\r
  -d '{\r
    "model": "gpt-4o",\r
    "stream": true,\r
    "messages": [\r
      {"role": "system", "content": "你是专业助手，回答简洁。"},\r
      {"role": "user", "content": [\r
        {"type": "text", "text": "请描述这张图。"},\r
        {"type": "image_url", "image_url": {"url": "https://img-s.msn.cn/tenant/amp/entityid/AA1Z6SrD.img?w=600&h=466&m=6"}}\r
      ]}\r
    ]\r
  }'\r
\r
# gpt-4o：图文（base64 + 流式）\r
bash ./ext/usage_log/testdata/vision_base64_chat.sh\r
\`\`\`\r
\r
**分析本文档（仅依赖 \`模型.md\`，不使用独立的 \`request\` JSON 文件）：** 使用 \`multipart/form-data\`：\`request\` 字段为**内联** JSON 字符串，\`files\` 指向本文件。需网关启用 **usage_log 附件注入**（\`LOG_EXT_ATTACHMENT_ENABLED\` 等），且令牌具备对应模型权限。在**仓库根目录**执行时可用相对路径；否则把 \`files=@\` 改为本文件的绝对路径。\r
\r
\`\`\`bash\r
curl -N -sS -X POST 'http://localhost:3000/v1/chat/completions' \\\r
  -H 'Authorization: Bearer YOUR_API_KEY' \\\r
  -F 'request={"model":"gpt-4o","stream":true,"messages":[{"role":"system","content":"你是专业助手，回答简洁。"},{"role":"user","content":"请阅读附件中的 Markdown，用要点列表概括：文档目的、实机验证颜色含义、测试 curl 段落在讲什么。"}]}' \\\r
  -F 'files=@docs/v2/模型.md'\r
\`\`\`\r
\r
若当前 shell 不在仓库根目录，将最后一行改为例如 \`-F 'files=@/你的路径/new-api/docs/v2/模型.md'\`。\r
\r
**GPT 系列「文件」列统一含义（本网关）：** 本地/预上传文档用 \`POST /api/ext/attachment/upload\` 取 \`pending_token\`，再在 \`POST /v1/chat/completions\` 上加请求头 \`X-Usage-Log-Attachment-Tokens\`（或 JSON 顶层 \`usage_log_attachment_tokens\`），由 **usage_log** 改写 \`messages\`；**不是** OpenAI Files API 的 \`file_id\`。\r
\r
**PDF 默认走「直传文件」：** \`**LOG_EXT_ATTACHMENT_PDF_INJECT_MODE=file\`（默认）** 将 PDF 以 \`**type:file\` + Data URL** 注入 \`messages\`，**不需要**安装 \`**pdftotext\`**。能否被模型读到**完全取决于下游渠道**是否支持该字段；若上游忽略 \`type:file\`，可改用 \`**LOG_EXT_ATTACHMENT_PDF_INJECT_MODE=text\`** 并安装 **poppler-utils**，将 PDF 抽成 \`**type:text\`**。\r
\r
\r
| 模型 ID                     | 文本         | 图文                   | 文件                                                                                                                                        |\r
| ------------------------- | ---------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |\r
| **Claude 系列**             |            |                      |                                                                                                                                           |\r
| claude-opus-4-6           | ✓          | ✓                    | Claude 官方：对话里可附带 PDF 等文档（以 Anthropic 文档为准）                                                                                                |\r
| claude-sonnet-4-6         | ✓          | ✓                    | Claude 官方：对话里可附带 PDF 等文档（以 Anthropic 文档为准）                                                                                                |\r
| claude-haiku-4-5-20251001 | ✓          | ✓                    | Claude 官方：对话里可附带 PDF 等文档（以 Anthropic 文档为准）                                                                                                |\r
| **GPT 系列**                |            |                      |                                                                                                                                           |\r
| **gpt-4o**                | ✓          | ✓                    | 本网关：\`/api/ext/attachment/upload\` → \`pending_token\` → 头 \`X-Usage-Log-Attachment-Tokens\` 注入 \`messages\`；**不是** OpenAI Files API 的 \`file_id\`。 |\r
| gpt-5.4                   | ✓          | ✓                    | 本网关：\`/api/ext/attachment/upload\` → \`pending_token\` → 头 \`X-Usage-Log-Attachment-Tokens\` 注入 \`messages\`；**不是** OpenAI Files API 的 \`file_id\`。 |\r
| gpt-5.4-pro               | ✓          | ✓                    | 本网关：\`/api/ext/attachment/upload\` → \`pending_token\` → 头 \`X-Usage-Log-Attachment-Tokens\` 注入 \`messages\`；**不是** OpenAI Files API 的 \`file_id\`。 |\r
| gpt-5.3-codex             | ✓          | ✓                    | 本网关：\`/api/ext/attachment/upload\` → \`pending_token\` → 头 \`X-Usage-Log-Attachment-Tokens\` 注入 \`messages\`；**不是** OpenAI Files API 的 \`file_id\`。 |\r
| gpt-image-1.5             | ✓（文生图指令）   | 参考图/多模态编辑视具体 API 与渠道 | ✗（非对话 PDF/Office 主场景）                                                                                                                     |\r
| gpt-realtime              | ✓（含实时语音）   | 以音视频实时为主，非传统「消息里贴图」  | ✗                                                                                                                                         |\r
| gpt-audio                 | ✓（含语音输入输出） | ✗                    | ✗                                                                                                                                         |\r
| text-embedding-3-large    | 向量（文本转向量）  | ✗                    | ✗                                                                                                                                         |\r
| **DeepSeek 系列**           |            |                      |                                                                                                                                           |\r
| **deepseek-chat**         | ✓          | ✗（常见部署为纯文本 Chat）     | ✗                                                                                                                                         |\r
| deepseek-reasoner         | ✓          | ✗                    | ✗                                                                                                                                         |\r
\r
\r
**后续计划：** MiniMax 系列模型计划接入，具体模型 ID 与能力列表现以上游与运营配置为准（暂不列入上表）。\r
\r
---\r
\r
下表对从后台模型选择器导出的 **523** 个模型 ID 逐条标注 **文本**、**图文**、**文件** 三类能力（参考用）。\r
\r
## 列说明\r
\r
\r
| 列      | 取值说明                                                                                                                                                                                                  |\r
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\r
| **文本** | \`✓\` 文本对话/补全；\`向量\` 嵌入、重排等；\`指令\` 文生图/视频等文本指令；\`音频\` 如 Whisper 转写。                                                                                                                                           |\r
| **图文** | \`✓\` 从名称可判断为常见多模态（可带图）；\`✗\` 从名称判断为纯文本对话；其余长句表示 **名称未写 vision/vl**，能否带图完全取决于 **渠道是否接多模态上游**。                                                                                                             |\r
| **文件** | \`✗\` 从名称判断为不支持或未标文档能力；**本网关**下 GPT 类常见为 **usage_log 预上传 \`pending_token\` + 头 \`X-Usage-Log-Attachment-Tokens\`**，**不是** OpenAI 官方 \`file_id\`；\`Anthropic：…\` 等为 **厂商官方路径**说明；长句还可能表示 **长窗口或厂商上传产品**，以实际渠道为准。 |\r
\r
\r
> **注意**：本表为启发式说明，**不等于**当前网关里该模型的真实开关；以各上游最新文档与渠道配置为准。\r
\r
## 能力表\r
\r
\r
| 模型                                            | 文本  | 图文                        | 文件                                                      |\r
| --------------------------------------------- | --- | ------------------------- | ------------------------------------------------------- |\r
| 01-ai/Yi-1.5-34B-Chat-16K                     | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| 01-ai/Yi-1.5-6B-Chat                          | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| 01-ai/Yi-1.5-9B-Chat-16K                      | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| 360gpt-pro                                    | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| 360gpt-turbo                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| 360gpt-turbo-responsibility-8k                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| 360gpt2-pro                                   | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| 360GPT_S2_V9                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| abab5.5-chat                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| abab5.5s-chat                                 | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| abab6-chat                                    | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| abab6.5-chat                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| abab6.5s-chat                                 | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| abab6.5s-chat-pro                             | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| aqa                                           | ✓   | ✗                         | ✗                                                       |\r
| BAAI/bge-large-en-v1.5                        | 向量  | ✗                         | ✗                                                       |\r
| BAAI/bge-large-zh-v1.5                        | 向量  | ✗                         | ✗                                                       |\r
| BAAI/bge-m3                                   | 向量  | ✗                         | ✗                                                       |\r
| BAAI/bge-reranker-v2-m3                       | 向量  | ✗                         | ✗                                                       |\r
| babbage-002                                   | ✓   | ✗                         | ✗                                                       |\r
| Baichuan4                                     | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| bge-large-en                                  | 向量  | ✗                         | ✗                                                       |\r
| bge-large-zh                                  | 向量  | ✗                         | ✗                                                       |\r
| black-forest-labs/flux-1.1-pro                | 指令  | ✗                         | ✗                                                       |\r
| black-forest-labs/FLUX.1-schnell              | 指令  | ✗                         | ✗                                                       |\r
| BLOOMZ-7B                                     | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ByteDance/SDXL-Lightning                      | 指令  | ✗                         | ✗                                                       |\r
| c4ai-aya-23-35b                               | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| c4ai-aya-23-8b                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| chatglm_lite                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| chatglm_pro                                   | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| chatglm_std                                   | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| chatglm_turbo                                 | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| chatgpt-4o-latest                             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| chatgpt-image-latest                          | ✓   | ✗                         | ✗                                                       |\r
| claude-3-5-haiku-20241022                     | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-3-5-sonnet-20240620                    | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-3-5-sonnet-20241022                    | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-3-7-sonnet-20250219                    | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-3-7-sonnet-20250219-thinking           | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-3-haiku-20240307                       | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-3-opus-20240229                        | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-3-sonnet-20240229                      | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-haiku-4-5-20251001                     | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-1-20250805                      | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-1-20250805-thinking             | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-20250514                        | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-20250514-thinking               | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-5-20251101                      | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-5-20251101-thinking             | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-6                               | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-6-high                          | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-6-low                           | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-6-max                           | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-opus-4-6-medium                        | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-sonnet-4-20250514                      | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-sonnet-4-20250514-thinking             | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-sonnet-4-5-20250929                    | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-sonnet-4-5-20250929-thinking           | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| claude-sonnet-4-6                             | ✓   | ✓                         | Anthropic：聊天体内 PDF/文档（官方文档能力）                           |\r
| command                                       | ✓   | ✗                         | ✗                                                       |\r
| command-a-03-2025                             | ✓   | ✗                         | ✗                                                       |\r
| command-light                                 | ✓   | ✗                         | ✗                                                       |\r
| command-light-nightly                         | ✓   | ✗                         | ✗                                                       |\r
| command-nightly                               | ✓   | ✗                         | ✗                                                       |\r
| command-r                                     | ✓   | ✗                         | ✗                                                       |\r
| command-r-08-2024                             | ✓   | ✗                         | ✗                                                       |\r
| command-r-plus                                | ✓   | ✗                         | ✗                                                       |\r
| command-r-plus-08-2024                        | ✓   | ✗                         | ✗                                                       |\r
| computer-use-preview                          | ✓   | ✗                         | ✗                                                       |\r
| computer-use-preview-2025-03-11               | ✓   | ✗                         | ✗                                                       |\r
| dall-e-2                                      | 指令  | ✗                         | ✗                                                       |\r
| dall-e-3                                      | 指令  | ✗                         | ✗                                                       |\r
| davinci-002                                   | ✓   | ✗                         | ✗                                                       |\r
| deep-research-pro-preview-12-2025             | ✓   | ✗                         | ✗                                                       |\r
| deepseek-ai/DeepSeek-Coder-V2-Instruct        | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-ai/deepseek-llm-67b-chat             | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-ai/DeepSeek-R1                       | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-ai/DeepSeek-R1-0528                  | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-ai/DeepSeek-V2-Chat                  | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-ai/DeepSeek-V3-0324                  | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-ai/DeepSeek-V3.1                     | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| **deepseek-chat**                             | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-r1                                   | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-r1-distill-qwen-14b                  | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-r1-distill-qwen-32b                  | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-r1-distill-qwen-7b                   | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-reasoner                             | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| deepseek-v3                                   | ✓   | ✗                         | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| Doubao-1.5-lite-32k                           | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-1.5-pro-256k                           | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-1.5-pro-32k                            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-1.5-pro-vision-32k                     | ✓   | ✓                         | ✗                                                       |\r
| Doubao-1.5-thinking-pro                       | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-embedding                              | 向量  | ✗                         | ✗                                                       |\r
| Doubao-lite-128k                              | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-lite-32k                               | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-lite-4k                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-pro-128k                               | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-pro-256k                               | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-pro-32k                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-pro-4k                                 | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| doubao-seed-1-6-thinking-250715               | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| doubao-seedance-1-0-pro-250528                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| doubao-seedream-4-0-250828                    | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Doubao-vision-lite-32k                        | ✓   | ✓                         | ✗                                                       |\r
| Doubao-vision-pro-32k                         | ✓   | ✓                         | ✗                                                       |\r
| embedding-bert-512-v1                         | 向量  | ✗                         | ✗                                                       |\r
| Embedding-V1                                  | 向量  | ✗                         | ✗                                                       |\r
| embedding_s1_v1                               | 向量  | ✗                         | ✗                                                       |\r
| ernie-3.5-128k                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-3.5-4K-0205                             | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-3.5-8K                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-3.5-8k                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-3.5-8K-0205                             | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-3.5-8K-1222                             | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-3.5-8k-preview                          | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-4.0-8K                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-4.0-8k                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-4.0-8k-latest                           | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-4.0-8k-preview                          | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-4.0-turbo-128k                          | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-4.0-turbo-8k                            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-4.0-turbo-8k-latest                     | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-4.0-turbo-8k-preview                    | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-Bot-8K                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-char-8k                                 | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-char-fiction-8k                         | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-lite-8k                                 | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-Lite-8K-0308                            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-Lite-8K-0922                            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-lite-pro-128k                           | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-novel-8k                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-Speed-128K                              | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-speed-128k                              | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-Speed-8K                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-speed-8k                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-speed-pro-128k                          | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ERNIE-Tiny-8K                                 | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| ernie-tiny-8k                                 | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| FunAudioLLM/SenseVoiceSmall                   | ✓   | ✗                         | ✗                                                       |\r
| gemini-2.0-flash                              | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.0-flash-001                          | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.0-flash-lite                         | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.0-flash-lite-001                     | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-computer-use-preview-10-2025       | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-flash                              | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-flash-image                        | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-flash-lite                         | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-flash-lite-preview-09-2025         | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-flash-native-audio-latest          | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-flash-native-audio-preview-09-2025 | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-flash-native-audio-preview-12-2025 | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-flash-preview-tts                  | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-pro                                | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-2.5-pro-preview-tts                    | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-3-flash-preview                        | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-3-pro-image-preview                    | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-3-pro-preview                          | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-3.1-flash-image-preview                | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-3.1-flash-lite-preview                 | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-3.1-pro-preview                        | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-3.1-pro-preview-customtools            | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-embedding-001                          | 向量  | ✗                         | ✗                                                       |\r
| gemini-embedding-2-preview                    | 向量  | ✗                         | ✗                                                       |\r
| gemini-flash-latest                           | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-flash-lite-latest                      | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-pro-latest                             | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemini-robotics-er-1.5-preview                | ✓   | ✓                         | Google：常通过 File API / 上传后再引用，视具体 Gemini 版本              |\r
| gemma-3-12b-it                                | ✓   | ✗                         | ✗                                                       |\r
| gemma-3-1b-it                                 | ✓   | ✗                         | ✗                                                       |\r
| gemma-3-27b-it                                | ✓   | ✗                         | ✗                                                       |\r
| gemma-3-4b-it                                 | ✓   | ✗                         | ✗                                                       |\r
| gemma-3n-e2b-it                               | ✓   | ✗                         | ✗                                                       |\r
| gemma-3n-e4b-it                               | ✓   | ✗                         | ✗                                                       |\r
| glm-3-turbo                                   | ✓   | ✗                         | ✗                                                       |\r
| glm-4                                         | ✓   | ✗                         | ✗                                                       |\r
| glm-4-0520                                    | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| glm-4-air                                     | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| glm-4-airx                                    | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| glm-4-alltools                                | ✓   | ✗                         | ✗                                                       |\r
| glm-4-flash                                   | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| glm-4-long                                    | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| glm-4-plus                                    | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| glm-4.6                                       | ✓   | ✗                         | ✗                                                       |\r
| glm-4.6v                                      | ✓   | ✗                         | ✗                                                       |\r
| glm-4.7                                       | ✓   | ✗                         | ✗                                                       |\r
| glm-4.7-flash                                 | ✓   | ✗                         | ✗                                                       |\r
| glm-4v                                        | ✓   | ✓                         | ✗                                                       |\r
| glm-4v-plus                                   | ✓   | ✓                         | ✗                                                       |\r
| glm-5                                         | ✓   | ✗                         | ✗                                                       |\r
| gpt-3.5-turbo                                 | ✓   | ✗                         | ✗                                                       |\r
| gpt-3.5-turbo-0125                            | ✓   | ✗                         | ✗                                                       |\r
| gpt-3.5-turbo-0613                            | ✓   | ✗                         | ✗                                                       |\r
| gpt-3.5-turbo-1106                            | ✓   | ✗                         | ✗                                                       |\r
| gpt-3.5-turbo-16k                             | ✓   | ✗                         | ✗                                                       |\r
| gpt-3.5-turbo-16k-0613                        | ✓   | ✗                         | ✗                                                       |\r
| gpt-3.5-turbo-instruct                        | ✓   | ✗                         | ✗                                                       |\r
| gpt-3.5-turbo-instruct-0914                   | ✓   | ✗                         | ✗                                                       |\r
| gpt-4                                         | ✓   | ✗                         | ✗                                                       |\r
| gpt-4-0125-preview                            | ✓   | ✓                         | ✗                                                       |\r
| gpt-4-0613                                    | ✓   | ✗                         | ✗                                                       |\r
| gpt-4-1106-preview                            | ✓   | ✓                         | ✗                                                       |\r
| gpt-4-32k                                     | ✓   | ✗                         | ✗                                                       |\r
| gpt-4-32k-0613                                | ✓   | ✗                         | ✗                                                       |\r
| gpt-4-turbo                                   | ✓   | ✓                         | ✗                                                       |\r
| gpt-4-turbo-2024-04-09                        | ✓   | ✓                         | ✗                                                       |\r
| gpt-4-turbo-preview                           | ✓   | ✓                         | ✗                                                       |\r
| gpt-4-vision-preview                          | ✓   | ✓                         | ✗                                                       |\r
| gpt-4.1                                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4.1-2025-04-14                            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4.1-mini                                  | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4.1-mini-2025-04-14                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4.1-nano                                  | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4.1-nano-2025-04-14                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4.5-preview                               | ✓   | ✗                         | ✗                                                       |\r
| gpt-4.5-preview-2025-02-27                    | ✓   | ✗                         | ✗                                                       |\r
| **gpt-4o**                                    | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-2024-05-13                             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-2024-08-06                             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-2024-11-20                             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-audio-preview                          | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-audio-preview-2024-10-01               | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-audio-preview-2024-12-17               | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-audio-preview-2025-06-03               | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini                                   | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-2024-07-18                        | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-audio-preview                     | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-audio-preview-2024-12-17          | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-realtime-preview                  | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-realtime-preview-2024-12-17       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-search-preview                    | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-search-preview-2025-03-11         | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-transcribe                        | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-transcribe-2025-03-20             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-transcribe-2025-12-15             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-tts                               | ✓   | ✗                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-tts-2025-03-20                    | ✓   | ✗                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-mini-tts-2025-12-15                    | ✓   | ✗                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-realtime-preview                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-realtime-preview-2024-10-01            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-realtime-preview-2024-12-17            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-realtime-preview-2025-06-03            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-search-preview                         | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-search-preview-2025-03-11              | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-transcribe                             | ✓   | ✗                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-4o-transcribe-diarize                     | ✓   | ✗                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5                                         | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-2025-08-07                              | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-chat-latest                             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-codex                                   | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-codex-mini                              | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-codex-mini-openai-compact               | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-codex-openai-compact                    | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-mini                                    | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-mini-2025-08-07                         | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-nano                                    | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-nano-2025-08-07                         | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-openai-compact                          | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-pro                                     | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-pro-2025-10-06                          | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-search-api                              | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5-search-api-2025-10-14                   | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.1                                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.1-2025-11-13                            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.1-chat-latest                           | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.1-codex                                 | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.1-codex-max                             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.1-codex-max-openai-compact              | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.1-codex-mini                            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.1-codex-mini-openai-compact             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.1-codex-openai-compact                  | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.1-openai-compact                        | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.2                                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.2-2025-12-11                            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.2-chat-latest                           | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.2-codex                                 | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.2-codex-openai-compact                  | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.2-openai-compact                        | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.2-pro                                   | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.2-pro-2025-12-11                        | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.3-chat-latest                           | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.3-codex                                 | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.3-codex-openai-compact                  | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.3-codex-spark                           | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.3-codex-spark-openai-compact            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.4                                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.4-2026-03-05                            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.4-openai-compact                        | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.4-pro                                   | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-5.4-pro-2026-03-05                        | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| gpt-audio                                     | ✓   | ✗                         | ✗                                                       |\r
| gpt-audio-1.5                                 | ✓   | ✗                         | ✗                                                       |\r
| gpt-audio-2025-08-28                          | ✓   | ✗                         | ✗                                                       |\r
| gpt-audio-mini                                | ✓   | ✗                         | ✗                                                       |\r
| gpt-audio-mini-2025-10-06                     | ✓   | ✗                         | ✗                                                       |\r
| gpt-audio-mini-2025-12-15                     | ✓   | ✗                         | ✗                                                       |\r
| gpt-image-1                                   | ✓   | ✗                         | ✗                                                       |\r
| gpt-image-1-mini                              | ✓   | ✗                         | ✗                                                       |\r
| gpt-image-1.5                                 | ✓   | ✗                         | ✗                                                       |\r
| gpt-realtime                                  | ✓   | ✗                         | ✗                                                       |\r
| gpt-realtime-1.5                              | ✓   | ✗                         | ✗                                                       |\r
| gpt-realtime-2025-08-28                       | ✓   | ✗                         | ✗                                                       |\r
| gpt-realtime-mini                             | ✓   | ✗                         | ✗                                                       |\r
| gpt-realtime-mini-2025-10-06                  | ✓   | ✗                         | ✗                                                       |\r
| gpt-realtime-mini-2025-12-15                  | ✓   | ✗                         | ✗                                                       |\r
| grok-2-image-1212                             | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-2-vision-1212                            | ✓   | ✓                         | ✗                                                       |\r
| grok-3                                        | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-3-mini                                   | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-3-mini-high                              | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-3-mini-low                               | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-3-mini-search                            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-3-search                                 | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-4-0709                                   | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-4-0709-search                            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-4-1-fast-non-reasoning                   | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-4-1-fast-non-reasoning-search            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-4-1-fast-reasoning                       | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-4-1-fast-reasoning-search                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-4-fast-non-reasoning                     | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-4-fast-non-reasoning-search              | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-4-fast-reasoning                         | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-4-fast-reasoning-search                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-code-fast-1                              | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-imagine-image                            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-imagine-image-pro                        | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| grok-imagine-video                            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| gte-rerank-v2                                 | 向量  | ✗                         | ✗                                                       |\r
| hunyuan-lite                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| hunyuan-pro                                   | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| hunyuan-standard                              | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| hunyuan-standard-256K                         | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| imagen-4.0-fast-generate-001                  | 指令  | ✗                         | ✗                                                       |\r
| imagen-4.0-generate-001                       | 指令  | ✗                         | ✗                                                       |\r
| imagen-4.0-ultra-generate-001                 | 指令  | ✗                         | ✗                                                       |\r
| InstantX/InstantID                            | ✓   | ✗                         | ✗                                                       |\r
| internlm/internlm2_5-20b-chat                 | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| internlm/internlm2_5-7b-chat                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| jimeng_high_aes_general_v21_L                 | 指令  | ✗                         | ✗                                                       |\r
| jina-clip-v1                                  | ✓   | ✗                         | ✗                                                       |\r
| jina-reranker-m0                              | 向量  | ✗                         | ✗                                                       |\r
| jina-reranker-v2-base-multilingual            | 向量  | ✗                         | ✗                                                       |\r
| kimi-k2-0905-preview                          | ✓   | ✗                         | ✗                                                       |\r
| kimi-k2-thinking                              | ✓   | ✗                         | ✗                                                       |\r
| kimi-k2-thinking-turbo                        | ✓   | ✗                         | ✗                                                       |\r
| kimi-k2-turbo-preview                         | ✓   | ✗                         | ✗                                                       |\r
| kimi-k2.5                                     | ✓   | ✗                         | ✗                                                       |\r
| llama-3-70b-instruct                          | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| llama-3-8b-instruct                           | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| llama-3-sonar-large-32k-chat                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| llama-3-sonar-large-32k-online                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| llama-3-sonar-small-32k-chat                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| llama-3-sonar-small-32k-online                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| llama3-7b                                     | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| m3e-base                                      | ✓   | ✗                         | ✗                                                       |\r
| m3e-large                                     | ✓   | ✗                         | ✗                                                       |\r
| m3e-small                                     | ✓   | ✗                         | ✗                                                       |\r
| meta/llama3-405b-instruct-maas                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| MiniMax-M2                                    | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| MiniMax-M2.1                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| MiniMax-M2.1-highspeed                        | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| MiniMax-M2.5                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| MiniMax-M2.5-highspeed                        | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| mistral-embed                                 | ✓   | ✗                         | ✗                                                       |\r
| mistral-large-latest                          | ✓   | ✗                         | ✗                                                       |\r
| mistral-medium-latest                         | ✓   | ✗                         | ✗                                                       |\r
| mistral-small-latest                          | ✓   | ✗                         | ✗                                                       |\r
| mixtral-8x7b-instruct                         | ✓   | ✗                         | ✗                                                       |\r
| mj_blend                                      | 指令  | ✗                         | ✗                                                       |\r
| mj_custom_zoom                                | 指令  | ✗                         | ✗                                                       |\r
| mj_describe                                   | 指令  | ✗                         | ✗                                                       |\r
| mj_edits                                      | 指令  | ✗                         | ✗                                                       |\r
| mj_high_variation                             | 指令  | ✗                         | ✗                                                       |\r
| mj_imagine                                    | 指令  | ✗                         | ✗                                                       |\r
| mj_inpaint                                    | 指令  | ✗                         | ✗                                                       |\r
| mj_low_variation                              | 指令  | ✗                         | ✗                                                       |\r
| mj_modal                                      | 指令  | ✗                         | ✗                                                       |\r
| mj_pan                                        | 指令  | ✗                         | ✗                                                       |\r
| mj_reroll                                     | 指令  | ✗                         | ✗                                                       |\r
| mj_shorten                                    | 指令  | ✗                         | ✗                                                       |\r
| mj_upload                                     | 指令  | ✗                         | ✗                                                       |\r
| mj_upscale                                    | 指令  | ✗                         | ✗                                                       |\r
| mj_variation                                  | 指令  | ✗                         | ✗                                                       |\r
| mj_video                                      | 指令  | ✗                         | ✗                                                       |\r
| mj_zoom                                       | 指令  | ✗                         | ✗                                                       |\r
| moonshot-v1-128k                              | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| moonshot-v1-32k                               | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| moonshot-v1-8k                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | 长上下文或厂商侧「文档/知识库」；是否等价 PDF 直读取决于渠道实现                     |\r
| nano-banana-pro-preview                       | ✓   | ✗                         | ✗                                                       |\r
| netease-youdao/bce-embedding-base_v1          | 向量  | ✗                         | ✗                                                       |\r
| netease-youdao/bce-reranker-base_v1           | 向量  | ✗                         | ✗                                                       |\r
| NousResearch/Hermes-4-405B-FP8                | ✓   | ✗                         | ✗                                                       |\r
| nova-canvas-v1:0                              | ✓   | ✗                         | ✗                                                       |\r
| nova-lite-v1:0                                | ✓   | ✗                         | ✗                                                       |\r
| nova-micro-v1:0                               | ✓   | ✗                         | ✗                                                       |\r
| nova-premier-v1:0                             | ✓   | ✗                         | ✗                                                       |\r
| nova-pro-v1:0                                 | ✓   | ✗                         | ✗                                                       |\r
| nova-reel-v1:0                                | ✓   | ✗                         | ✗                                                       |\r
| nova-reel-v1:1                                | ✓   | ✗                         | ✗                                                       |\r
| nova-sonic-v1:0                               | ✓   | ✗                         | ✗                                                       |\r
| o1                                            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o1-2024-12-17                                 | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o1-mini                                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o1-mini-2024-09-12                            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o1-preview                                    | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o1-preview-2024-09-12                         | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o1-pro                                        | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o1-pro-2025-03-19                             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3                                            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-2025-04-16                                 | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-deep-research                              | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-deep-research-2025-06-26                   | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-mini                                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-mini-2025-01-31                            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-mini-2025-01-31-high                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-mini-2025-01-31-low                        | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-mini-2025-01-31-medium                     | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-mini-high                                  | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-mini-low                                   | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-mini-medium                                | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-pro                                        | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o3-pro-2025-06-10                             | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o4-mini                                       | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o4-mini-2025-04-16                            | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o4-mini-deep-research                         | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| o4-mini-deep-research-2025-06-26              | ✓   | ✓                         | OpenAI 系：通常需 file_id / Files API 或附件流，非任意二进制直塞 messages |\r
| omni-moderation-2024-09-26                    | ✓   | ✗                         | ✗                                                       |\r
| omni-moderation-latest                        | ✓   | ✗                         | ✗                                                       |\r
| open-mistral-7b                               | ✓   | ✗                         | ✗                                                       |\r
| open-mixtral-8x7b                             | ✓   | ✗                         | ✗                                                       |\r
| openai/gpt-oss-120b                           | ✓   | ✗                         | ✗                                                       |\r
| PaLM-2                                        | ✓   | ✗                         | ✗                                                       |\r
| Pro/01-ai/Yi-1.5-6B-Chat                      | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Pro/01-ai/Yi-1.5-9B-Chat-16K                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Pro/google/gemma-2-9b-it                      | ✓   | ✗                         | ✗                                                       |\r
| Pro/internlm/internlm2_5-7b-chat              | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Pro/meta-llama/Meta-Llama-3-8B-Instruct       | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Pro/mistralai/Mistral-7B-Instruct-v0.2        | ✓   | ✗                         | ✗                                                       |\r
| Pro/Qwen/Qwen1.5-7B-Chat                      | ✓   | ✗                         | ✗                                                       |\r
| Pro/Qwen/Qwen2-1.5B-Instruct                  | ✓   | ✗                         | ✗                                                       |\r
| Pro/Qwen/Qwen2-7B-Instruct                    | ✓   | ✗                         | ✗                                                       |\r
| Pro/THUDM/chatglm3-6b                         | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Pro/THUDM/glm-4-9b-chat                       | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| qwen-max                                      | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| qwen-max-longcontext                          | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| qwen-plus                                     | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| qwen-turbo                                    | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Qwen/Qwen1.5-110B-Chat                        | ✓   | ✗                         | ✗                                                       |\r
| Qwen/Qwen1.5-14B-Chat                         | ✓   | ✗                         | ✗                                                       |\r
| Qwen/Qwen1.5-32B-Chat                         | ✓   | ✗                         | ✗                                                       |\r
| Qwen/Qwen1.5-7B-Chat                          | ✓   | ✗                         | ✗                                                       |\r
| Qwen/Qwen2-1.5B-Instruct                      | ✓   | ✗                         | ✗                                                       |\r
| Qwen/Qwen2-57B-A14B-Instruct                  | ✓   | ✗                         | ✗                                                       |\r
| Qwen/Qwen2-72B-Instruct                       | ✓   | ✗                         | ✗                                                       |\r
| Qwen/Qwen2-7B-Instruct                        | ✓   | ✗                         | ✗                                                       |\r
| Qwen/Qwen2-Math-72B-Instruct                  | ✓   | ✗                         | ✗                                                       |\r
| Qwen/Qwen3-235B-A22B-Instruct-2507            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Qwen/Qwen3-235B-A22B-Thinking-2507            | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8       | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| qwen3-235b-a22b                               | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| qwq-32b                                       | ✓   | ✗                         | ✗                                                       |\r
| rerank-english-v2.0                           | 向量  | ✗                         | ✗                                                       |\r
| rerank-english-v3.0                           | 向量  | ✗                         | ✗                                                       |\r
| rerank-multilingual-v2.0                      | 向量  | ✗                         | ✗                                                       |\r
| rerank-multilingual-v3.0                      | 向量  | ✗                         | ✗                                                       |\r
| seed-1-6-thinking-250715                      | ✓   | ✗                         | ✗                                                       |\r
| seedance-1-0-pro-250528                       | ✓   | ✗                         | ✗                                                       |\r
| seedream-4-0-250828                           | ✓   | ✗                         | ✗                                                       |\r
| semantic_similarity_s1_v1                     | 向量  | ✗                         | ✗                                                       |\r
| sonar                                         | ✓   | ✗                         | ✗                                                       |\r
| sonar-pro                                     | ✓   | ✗                         | ✗                                                       |\r
| sonar-reasoning                               | ✓   | ✗                         | ✗                                                       |\r
| sora-2                                        | 指令  | ✗                         | ✗                                                       |\r
| sora-2-pro                                    | 指令  | ✗                         | ✗                                                       |\r
| SparkDesk                                     | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| SparkDesk-v1.1                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| SparkDesk-v2.1                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| SparkDesk-v3.1                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| SparkDesk-v3.5                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| SparkDesk-v4.0                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| speech-01-hd                                  | ✓   | ✗                         | ✗                                                       |\r
| speech-01-turbo                               | ✓   | ✗                         | ✗                                                       |\r
| speech-02-hd                                  | ✓   | ✗                         | ✗                                                       |\r
| speech-02-turbo                               | ✓   | ✗                         | ✗                                                       |\r
| speech-2.5-hd-preview                         | ✓   | ✗                         | ✗                                                       |\r
| speech-2.5-turbo-preview                      | ✓   | ✗                         | ✗                                                       |\r
| step-1.5v-mini                                | ✓   | ✗                         | ✗                                                       |\r
| step-1v-8k                                    | ✓   | ✓                         | ✗                                                       |\r
| swap_face                                     | ✓   | ✗                         | ✗                                                       |\r
| tao-8k                                        | ✓   | ✗                         | ✗                                                       |\r
| text-ada-001                                  | ✓   | ✗                         | ✗                                                       |\r
| text-babbage-001                              | ✓   | ✗                         | ✗                                                       |\r
| text-curie-001                                | ✓   | ✗                         | ✗                                                       |\r
| text-davinci-edit-001                         | ✓   | ✗                         | ✗                                                       |\r
| text-embedding-3-large                        | 向量  | ✗                         | ✗                                                       |\r
| text-embedding-3-small                        | 向量  | ✗                         | ✗                                                       |\r
| text-embedding-ada-002                        | 向量  | ✗                         | ✗                                                       |\r
| text-embedding-v1                             | 向量  | ✗                         | ✗                                                       |\r
| text-moderation-latest                        | ✓   | ✗                         | ✗                                                       |\r
| text-moderation-stable                        | ✓   | ✗                         | ✗                                                       |\r
| THUDM/chatglm3-6b                             | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| THUDM/glm-4-9b-chat                           | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| tts-1                                         | ✓   | ✗                         | ✗                                                       |\r
| tts-1-1106                                    | ✓   | ✗                         | ✗                                                       |\r
| tts-1-hd                                      | ✓   | ✗                         | ✗                                                       |\r
| tts-1-hd-1106                                 | ✓   | ✗                         | ✗                                                       |\r
| veo-2.0-generate-001                          | 指令  | ✗                         | ✗                                                       |\r
| veo-3.0-fast-generate-001                     | 指令  | ✗                         | ✗                                                       |\r
| veo-3.0-generate-001                          | 指令  | ✗                         | ✗                                                       |\r
| veo-3.1-fast-generate-preview                 | 指令  | ✗                         | ✗                                                       |\r
| veo-3.1-generate-preview                      | 指令  | ✗                         | ✗                                                       |\r
| whisper-1                                     | 音频  | ✗                         | ✗                                                       |\r
| yi-large                                      | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| yi-large-preview                              | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| yi-large-rag                                  | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| yi-large-rag-preview                          | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| yi-large-turbo                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| yi-medium                                     | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| yi-medium-200k                                | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| yi-spark                                      | ✓   | 名称未标图输入；是否支持由渠道/上游多模态开关决定 | ✗                                                       |\r
| yi-vision                                     | ✓   | ✓                         | ✗                                                       |\r
| zai-org/GLM-4.5-FP8                           | ✓   | ✗                         | ✗                                                       |\r
\r
\r
`;export{e as default};
