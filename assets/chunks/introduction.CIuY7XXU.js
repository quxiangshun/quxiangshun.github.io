const n=`---
outline: deep
---

# LyTools 项目介绍

> 编辑日期：2026-03-22

LyTools（栾媛小工具）是基于 **Electron + Vue 3 + Element Plus** 的桌面实用工具集，以插件形式扩展功能；代码在 **GitHub、Gitee、GitCode** 三端同步维护，可任选其一克隆与协作。

## 许可

以各仓库声明为准（例如 AGPL-3.0）。

## 核心功能（插件示例）

### 端口查杀

按端口查询占用进程并终止，支持 Windows / Linux。

### 图标生成

文字生成 ICO，自定义颜色、字体与形状，多尺寸预览与下载。

### 加减混合

低年级口算题生成，可导出 Excel 与打印。

### 趣味与展示

秀恩爱纪念日、养龙虾互动、锁屏 / 屏保类插件等。

## 技术架构

### 桌面与界面

- **桌面壳**：Electron
- **界面**：Vue 3、Element Plus、Vite

### 插件与扩展

插件目录：\`~/.ly/tools/plugins\`，可通过插件市场安装；主程序构建不包含插件时，由用户自行安装扩展。

## 相关仓库

- [GitHub — quxiangshun/ly-tools](https://github.com/quxiangshun/ly-tools)
- [Gitee — quxiangshun/ly-tools](https://gitee.com/quxiangshun/ly-tools)
- [GitCode — quxiangshun/ly-tools](https://gitcode.com/quxiangshun/ly-tools)

更多开发与构建步骤见 [快速开始](./quick-start)。
`;export{n as default};
