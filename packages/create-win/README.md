# @winjs-dev/create-win

<p align="center">
  <img src="https://img.shields.io/npm/v/@winjs-dev/create-win.svg" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/@winjs-dev/create-win.svg" alt="npm downloads" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license" />
</p>

> 🚀 WinJS 框架官方脚手架工具，快速创建现代化前端应用项目

## 📋 项目简介

`@winjs-dev/create-win` 是 WinJS 框架的官方脚手架工具，提供了丰富的项目模板和配置选项。通过交互式命令行界面，帮助开发者快速搭建基于 WinJS 框架的各类前端应用项目，包括 H5 应用、企业级 Web 应用、混合式移动应用等。

## ✨ 核心特性

- 🎯 **多种项目模板** - 提供 4 种预设模板，覆盖不同应用场景
- 🛠️ **交互式配置** - 基于 clack-prompts 的友好命令行交互体验
- 📦 **多包管理器支持** - 支持 npm、yarn、pnpm、bun 等包管理器
- 🔧 **开箱即用** - 集成完整的开发工具链和最佳实践配置
- 🌐 **现代化技术栈** - 基于 Vue 3、TypeScript、现代构建工具
- 📱 **移动端优化** - 内置移动端适配和调试工具
- 🎨 **代码规范** - 预配置 ESLint、Prettier、StyleLint 等代码质量工具
- ⚡ **快速开发** - 支持热更新、Mock 数据、代理等开发特性

## 🚀 快速开始

### 安装

```bash
# 使用 npm
npm create @winjs-dev/win@latest my-project

# 使用 yarn
yarn create @winjs-dev/win my-project

# 使用 pnpm
pnpm create @winjs-dev/win my-project

# 使用 bun
bun create @winjs-dev/win my-project
```

### 或者全局安装

```bash
# 全局安装
npm install -g @winjs-dev/create-win

# 创建项目
create-win my-project
```

### 使用方式

```bash
# 交互式创建项目
create-win

# 指定项目名称
create-win my-project

# 查看版本
create-win --version

# 查看帮助
create-win --help
```

## 📚 项目模板

### 🌐 App 模板
**适用场景：** 移动端 H5 应用开发

**技术栈：**
- Vue 3.2+ + Vue Router 4.x
- TypeScript 5.0+
- WinJS 构建工具链
- Less + PostCSS
- 移动端适配解决方案

**特性：**
- 📱 移动端优化（REM 适配、VConsole 调试）
- 🔧 插件化架构（请求拦截、移动端调试等）
- 🎨 完整样式解决方案

### 💻 PC 模板
**适用场景：** PC 端 Web 应用

**技术栈：**
- Vue 3.2.x + Vue Router 4.x
- TypeScript 5.x
- WinJS 构建工具链
- Less + PostCSS

**特性：**
- 🎯 PC 端优化体验
- 📦 模块联邦支持

### 🎯 Sample 模板
**适用场景：** 学习示例和快速原型

**技术栈：**
- Vue 3.x 基础配置
- TypeScript
- 最小化依赖

**特性：**
- 📚 学习友好的代码结构
- 🚀 最小化配置
- 💡 最佳实践示例

### 🔌 Plugin 模板
**适用场景：** WinJS 插件开发

**技术栈：**
- TypeScript
- WinJS 插件 API
- 测试工具链

**特性：**
- 🔌 插件开发框架
- 🧪 完整测试配置
- 📖 插件文档模板

## 🛠️ 配置选项

创建项目时，脚手架会询问以下配置选项：

- **项目名称** - 项目目录名和包名
- **项目模板** - 选择适合的项目模板
- **包管理器** - npm、yarn、pnpm、bun
- **Git 初始化** - 是否初始化 Git 仓库
- **依赖安装** - 是否自动安装依赖
- **代码规范** - 是否启用 Husky Git hooks
- **作者信息** - 项目作者和邮箱

## 📁 生成的项目结构

```
my-project/
├── src/                    # 源代码目录
│   ├── app.js             # 应用入口文件
│   ├── global.less        # 全局样式
│   ├── constant.js        # 常量定义
│   ├── assets/            # 静态资源
│   ├── layouts/           # 布局组件
│   ├── pages/             # 页面组件
│   └── services/          # 服务层
├── .winrc.ts              # WinJS 配置文件
├── package.json           # 项目依赖配置
├── tsconfig.json          # TypeScript 配置
├── .eslintrc.js           # ESLint 配置
├── .prettierrc.js         # Prettier 配置
├── .stylelintrc.js        # StyleLint 配置
├── .gitignore             # Git 忽略文件
└── README.md              # 项目说明文档
```

## 🔧 开发工具链

所有模板都内置了完整的开发工具链：

### 代码质量
- **ESLint** - JavaScript/TypeScript 代码检查
- **Prettier** - 代码格式化工具
- **StyleLint** - CSS/Less 样式检查
- **F2ELint** - 前端代码规范工具

### Git 工作流
- **Husky** - Git hooks 管理
- **lint-staged** - 暂存文件检查
- **commitlint** - 提交信息规范检查

### 构建工具
- **WinJS** - 现代化开发元框架
- **Webpack/Vite/Rsbuild** - 多种构建工具支持
- **Babel** - JavaScript 编译器
- **PostCSS** - CSS 后处理器

## 📖 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 或其他包管理器的对应版本

## 🔗 相关链接

- [WinJS 官方文档](https://winjs-dev.github.io/winjs-docs)
- [问题反馈](https://github.com/winjs-dev/winjs/issues)

---

<p align="center">
  如果这个项目对你有帮助，请给我们一个 ⭐！
</p>
