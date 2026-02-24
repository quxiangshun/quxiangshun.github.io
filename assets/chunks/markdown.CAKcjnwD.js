const n=`---
title: Markdown
description: NetBox Markdown 支持中英对照
---

# Markdown

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/reference/markdown/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** NetBox 对部分文本字段支持 Markdown 渲染。完整语法参考 [Markdownguide.org](https://www.markdownguide.org/basic-syntax/)。

**English:** NetBox supports Markdown rendering for certain text fields. See [Markdownguide.org](https://www.markdownguide.org/basic-syntax/) for full reference.

## 常用语法 | Common Syntax

| 功能 | 中文 | English |
|-----|------|---------|
| 标题 | # ## ### ... | Headings |
| 斜体 | \`*text*\` 或 \`_text_\` | Italic |
| 粗体 | \`**text**\` 或 \`__text__\` | Bold |
| 删除线 | \`~~text~~\` | Strikethrough |
| 链接 | \`[text](url)\` | Links |
| 图片 | \`![alt](path "title")\` | Images |
| 行内代码 | \\\`code\\\` | Inline code |
| 代码块 | 三个反引号包裹 | Code blocks |
| 无序列表 | \`*\` 或 \`-\`，缩进 4 空格子项 | Unordered lists |
| 有序列表 | \`1. 2. 3.\` | Ordered lists |
| 引用 | \`>\` 每行前 | Blockquotes |
| 表格 | \`|\` 列分隔，\`-\` 表头 | Tables |
| 水平线 | \`---\` 或 \`***\` | Horizontal rule |

**注意：** 默认会合并连续换行，行尾加两个空格可保留换行。

## 官方文档

- [Markdown 完整文档 →](https://netboxlabs.com/docs/netbox/reference/markdown/)
`;export{n as default};
