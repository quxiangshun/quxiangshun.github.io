const n=`# 项目介绍

> 编辑日期：2026-03-13  
> 以 [GitHub 仓库](https://github.com/quxiangshun/ly-genealogy) 当前版本为准。

## 关于 LyGenealogy

LyGenealogy（屈氏宗谱）是基于 **Node.js** 技术栈的开源族谱数字化平台，包含**公共前端**（Nuxt 3，H5 移动端适配）、**管理后台**（Vue 3 + Element Plus）和 **REST API**（Express + TypeScript），采用 pnpm Monorepo 管理多包。

- **GitHub**：[quxiangshun/ly-genealogy](https://github.com/quxiangshun/ly-genealogy)
- **在线演示**：见仓库说明或部署文档中的访问地址

### 项目背景

传统纸质族谱在保存、检索与共享方面存在明显局限。LyGenealogy 将族谱数字化，提供族谱管理、世系展示、亲属查询与文化展示，方便宗亲寻根问祖与姓氏文化传承。

### 项目目标

- **数字化存档**：族谱数据持久化存储（SQLite），支持多族谱、多地区
- **智能检索**：成员搜索、字辈查询、亲缘关系递归展示
- **世系可视化**：树形世系与关系展示
- **多端与 SEO**：公共前端支持 SSR/SSG/ISR、PWA，移动端友好
- **文化传承**：百科、新闻、姓氏文化等内容的统一展示与管理

## 功能概览

### 公共前端（无需登录）

- 门户首页、族谱库列表与族谱详情（谱籍、字辈摘要）
- 字辈查询、姓氏文化、百科与新闻动态
- 成员搜索与亲缘关系查询（脱敏策略以实际为准）

### 管理后台（需登录）

- 族谱 / 成员 / 字辈等数据的新增与编辑
- 世系树、成员列表等管理能力

### 技术特点

- **前后端分离**：REST API + Nuxt 公共前端 + Vue Admin SPA
- **Monorepo**：\`packages/server\`、\`packages/web\`、\`packages/admin\` 统一仓库、统一构建与部署

## 适用场景

- 各姓氏宗族的族谱数字化与长期维护
- 宗亲寻根、亲属关系查询
- 姓氏文化整理与对外展示

## 开源协议

采用 **Apache License 2.0**。系统支持多姓氏扩展，可配置或扩展其他姓氏的展示与数据。
`;export{n as default};
