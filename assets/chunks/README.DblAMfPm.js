const n=`# Ly Docs\r
\r
A VitePress documentation site for Ly open source projects, primarily focusing on lyedu project. Other open source projects will be maintained gradually.\r
\r
## About LyEdu\r
\r
LyEdu 是一个 100% 开源的企业培训系统，界面美观，操作简单，一键部署您的私有化培训平台！\r
\r
### 项目特色\r
\r
🎯 **功能完善**：部门/学员管理、在线视频学习、进度追踪、课程评论、知识中心、周期任务、新员工任务、考试中心、证书、积分与排行、图片库、系统配置、防拖拽/快进等\r
\r
🚀 **双后端**：SpringBoot 4 + JDK 25 与 FastAPI + Python 3，接口对齐，可按团队技术栈选择\r
\r
🎨 **界面美观**：Vue3 + TypeScript + Vite，现代化 UI，管理后台 / PC / 学员端多端一致体验\r
\r
🔒 **安全可靠**：视频私有化存储、JWT 认证、飞书集成登录，可配置播放器防拖拽与禁倍速\r
\r
📱 **多端支持**：PC 端、学员端（H5/微信小程序，uni-app x）、管理后台、统一入口\r
\r
## Installation\r
\r
\`\`\`bash\r
# Install dependencies\r
npm install\r
\`\`\`\r
\r
## Usage\r
\r
### Development\r
\r
\`\`\`bash\r
# Start development server\r
npm run docs:dev\r
\`\`\`\r
\r
### Build\r
\r
\`\`\`bash\r
# Build production site\r
npm run docs:build\r
\`\`\`\r
\r
### Preview\r
\r
\`\`\`bash\r
# Preview production build locally\r
npm run docs:preview\r
\`\`\`\r
\r
## Project Structure\r
\r
\`\`\`\r
├── .vitepress/           # VitePress configuration\r
│   └── config.mts        # Main configuration file\r
├── lyedu/                # LyEdu project documentation\r
│   ├── introduction.md   # Project introduction\r
│   ├── tech-stack.md     # Technology stack\r
│   └── quick-start.md    # Quick start guide\r
├── index.md              # Home page\r
├── markdown-examples.md  # Markdown syntax examples\r
├── api-examples.md       # API documentation examples\r
├── package.json          # Project configuration\r
└── README.md             # This file\r
\`\`\`\r
\r
## Documentation\r
\r
### LyEdu Documentation\r
\r
- [Project Introduction](/lyedu/introduction) - Overview of LyEdu project\r
- [Technology Stack](/lyedu/tech-stack) - Detailed technology architecture\r
- [Quick Start](/lyedu/quick-start) - Guide to deploy and use LyEdu\r
\r
### Other Projects\r
\r
Documentation for other open source projects will be added gradually.\r
\r
## Writing Documentation\r
\r
Documentation files are written in Markdown format. Place your files in the appropriate subdirectory for better organization.\r
\r
## Configuration\r
\r
VitePress configuration is located in \`.vitepress/config.mts\`. You can customize site title, description, theme, and more there.\r
\r
## Contributing\r
\r
We welcome contributions to improve the documentation. If you have any suggestions or find any issues, please feel free to submit a pull request or open an issue.\r
\r
## License\r
\r
The documentation is licensed under the MIT License.\r
\r
## Acknowledgments\r
\r
- [VitePress](https://vitepress.dev/) - Static site generator for Vue\r
- [Vue](https://vuejs.org/) - Progressive JavaScript framework\r
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at any scale# LyEdu - 企业培训系统\r
`;export{n as default};
