const n=`---
title: 全局搜索
description: 文档站点全文搜索的两种集成方案
---

# 全局搜索

本文档说明 Ly Docs 项目的全文搜索集成，提供两种方案：**本地搜索**与 **Algolia 搜索**。

## 方案对比

| 特性 | 本地搜索 | Algolia 搜索 |
|------|----------|--------------|
| 依赖 | 无（VitePress 内置） | Algolia 账号与 API |
| 索引时机 | 构建时 | 需手动生成并上传 |
| 适用场景 | 开发环境、小规模文档 | 生产环境、大规模文档 |
| 配置复杂度 | 低 | 中 |

## 方案一：本地搜索

使用 VitePress 内置的 MiniSearch，在构建时索引所有页面，无需外部服务。

### 配置

在 \`.vitepress/config.mts\` 中：

\`\`\`ts
search: {
  provider: 'local',
  options: {
    locales: {
      root: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '输入',
              navigateText: '导航',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      }
    }
  }
}
\`\`\`

### 使用

启动站点后，按 \`Ctrl+K\` 或点击右上角搜索按钮即可使用，无需额外步骤。

## 方案二：Algolia 搜索

使用 Algolia DocSearch 提供云端全文搜索，适合生产环境或需要更多搜索能力的场景。

### 配置

在 \`.vitepress/config.mts\` 中：

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

### 使用

1. 在 [Algolia 集成](/tech-share/global-search/algolia) 页面生成并上传索引数据
2. 在 Algolia Dashboard 配置索引的 Searchable attributes
3. 完成上述步骤后，搜索即可生效

详见 [Algolia 集成](/tech-share/global-search/algolia) 页面。

## 切换方案

修改 \`.vitepress/config.mts\` 中的 \`themeConfig.search.provider\` 即可切换：

- \`'local'\`：本地搜索
- \`'algolia'\`：Algolia 搜索

## 相关链接

- [VitePress 搜索配置](https://vitepress.dev/reference/default-theme-search)
- [Algolia DocSearch](https://docsearch.algolia.com/)
`;export{n as default};
