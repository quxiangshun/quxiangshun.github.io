const n=`---
title: Algolia 集成
description: 项目集成 Algolia 文档搜索的详细说明
---

# Algolia 集成

本文档说明如何在 Ly Docs 项目中集成 Algolia 文档搜索（[全局搜索方案二](/tech-share/global-search/)）。

## 概述

Algolia DocSearch 为文档站点提供全文搜索能力。本项目通过以下方式生成索引数据：

1. **命令行生成**：Node.js 脚本批量解析 Markdown，输出 JSON
2. **页面生成**：在浏览器中运行，生成后直接下载 JSON 文件

## 配置

搜索配置位于 \`.vitepress/config.mts\`：

\`\`\`ts
search: {
  provider: 'algolia',
  options: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_API_KEY',
    indexName: 'YOUR_INDEX_NAME'
  }
}
\`\`\`

- **appId**：Algolia 应用 ID（[algolia.com](https://www.algolia.com) 控制台）
- **apiKey**：Search-Only API Key（仅用于前端搜索，可公开）
- **indexName**：索引名称

## 生成 JSON 记录

### 方式一：命令行生成

\`\`\`bash
cd tech-share/global-search
node generate.js
\`\`\`

输出：\`tech-share/global-search/algolia-records.json\`

### 方式二：页面生成（推荐）

1. 启动文档站点：\`npm run docs:dev\`
2. 打开本页面
3. 点击 **「生成并下载 JSON」** 按钮
4. 浏览器将下载 \`algolia-records.json\` 文件

<ClientOnly>
  <AlgoliaGenerator />
</ClientOnly>

## 上传到 Algolia

1. 登录 [Algolia Dashboard](https://dashboard.algolia.com/)
2. 选择应用 → 选择索引（或新建）
3. 进入 **Upload records**
4. 上传生成的 \`algolia-records.json\`
5. 上传会**追加**记录；如需全量替换，请先清空索引再上传

## 记录格式

每条记录包含（符合 DocSearch 格式）：

| 字段 | 说明 |
|------|------|
| objectID | 唯一标识（必需） |
| url | 文档 URL 路径 |
| hierarchy | 标题层级对象 \`{ lvl0, lvl1, lvl2, lvl3, lvl4, lvl5 }\` |
| content | 正文内容（用于搜索） |

## 索引配置（重要）

首次上传后，需在 Algolia Dashboard 配置索引以支持 DocSearch：

1. 进入 **Search** → **Index** → 选择 \`ly-docs\`
2. 打开 **Configuration** → **Searchable attributes**
3. 添加并排序（按优先级从高到低）：
   - \`unordered(hierarchy.lvl0)\`
   - \`unordered(hierarchy.lvl1)\`
   - \`unordered(hierarchy.lvl2)\`
   - \`unordered(hierarchy.lvl3)\`
   - \`unordered(hierarchy.lvl4)\`
   - \`unordered(hierarchy.lvl5)\`
   - \`content\`
4. 保存配置

若搜索仍无结果，检查 **Configuration** → **Facets** 中是否误将 \`hierarchy\` 设为 facet（应移除）。

## 排除目录

以下目录的 Markdown 不会纳入索引：

- \`node_modules\`
- \`.git\`
- \`.vitepress\`
- \`dist\`
- \`public\`

## 相关链接

- [Algolia 文档](https://www.algolia.com/doc/)
- [DocSearch 说明](https://docsearch.algolia.com/)
- [VitePress 搜索配置](https://vitepress.dev/reference/default-theme-search)
`;export{n as default};
