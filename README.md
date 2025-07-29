# WinJS

<p>
  <img src="https://img.shields.io/npm/v/@winner-fed/winjs.svg" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/@winner-fed/winjs.svg" alt="npm downloads" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license" />
  <img src="https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg" alt="node version" />
</p>

> 🚀 现代化前端开发元框架，支持多种构建工具和开发模式的企业级解决方案

## 📋 项目简介

WinJS 是一个现代化的前端开发元框架，旨在为企业级应用提供完整的开发工具链和最佳实践。它统一了多种构建工具（Webpack、Vite、Rsbuild、ESBuild）的使用体验，支持 Vue 2/3 生态，并提供了丰富的预设配置和插件系统。

## ✨ 核心特性

### 🛠️ 多构建工具支持
- **Webpack 5** - 成熟稳定的模块打包工具，集成热更新、代码分割、模块联邦等功能
- **Vite 4.x** - 基于 ES 模块的现代构建工具，提供极速开发体验
- **Rsbuild** - 基于 Rspack 的高性能构建工具，大幅提升构建速度
- **ESBuild** - Go 语言编写的极速 JavaScript 打包器和压缩器

### 🎯 全面的框架支持
- **Vue 3** - 最新的 Vue 3 Composition API
- **Vue 2** - 向下兼容 Vue 2 Options API
- **TypeScript** - 完整的 TypeScript 支持
- **JSX/TSX** - 支持 React 风格的组件开发

### 📦 企业级特性
- **模块联邦** - 微前端架构支持
- **多页应用（MPA）** - 传统多页面应用支持
- **单页应用（SPA）** - 现代单页面应用
- **混合应用（Hybrid）** - 移动端混合开发
- **服务端渲染（SSR）** - 同构渲染支持

### 🔧 开发体验
- **热模块替换（HMR）** - 快速开发调试
- **Mock 数据** - 内置数据模拟
- **代理配置** - 灵活的 API 代理
- **代码分割** - 智能的代码分割策略
- **插件系统** - 丰富的插件生态

## 🚀 快速开始

### 创建新项目

```bash
# 使用官方脚手架创建项目
npm create @winjs-dev/win my-project

# 或者使用其他包管理器
yarn create @winjs-dev/win my-project
pnpm create @winjs-dev/win my-project

# 或者全局安装后使用
npm install -g @winjs-dev/create-win
create-win my-project
```

### 在现有项目中使用 WinJS

```bash
# 安装 WinJS 框架
npm install @winner-fed/winjs

# 使用 pnpm（推荐）
pnpm add @winner-fed/winjs
```

### 基本配置

在项目根目录创建 `.winrc.ts` 配置文件：

```typescript
import { defineConfig } from '@winner-fed/winjs';

export default defineConfig({
  // npm 客户端
  npmClient: 'pnpm',
  
  // 路由配置
  history: {
    type: 'hash' // 'hash' | 'browser'
  },
  
  // 插件配置
  plugins: [
    '@winner-fed/plugin-request',  // 请求插件
    '@winner-fed/plugin-wconsole', // 移动端调试插件
  ],
  
  // 应用配置（多环境）
  appConfig: {
    development: {
      API_HOME: 'https://api.dev.example.com/',
      IS_OPEN_VCONSOLE: true
    },
    production: {
      API_HOME: 'https://api.example.com/',
      IS_OPEN_VCONSOLE: false
    }
  },
  
  // REM 适配
  convertToRem: {},
  
  // 图标配置
  icons: {},
  
  // 应用标题和挂载元素
  title: 'My WinJS App',
  mountElementId: 'root',
});
```

### 项目启动

```bash
# 开发模式
npm run dev
# 或
win dev

# 构建生产版本
npm run build
# 或
win build
```

## 📚 项目模板

### 📱 移动端应用（App）
- Vue 3 + TypeScript
- 移动端适配解决方案
- VConsole 调试工具
- PWA 支持

### 💻 PC 端应用（PC）
- Vue 3 + TypeScript
- 响应式布局
- 桌面端优化
- 多主题支持

## 🔌 插件系统

WinJS 支持丰富的插件生态，通过插件系统可以扩展框架功能：

```typescript
// .winrc.ts
export default defineConfig({
  plugins: [
    // 网络请求插件
    '@winner-fed/plugin-request',
    
    // 移动端调试插件  
    '@winner-fed/plugin-wconsole',
  ],
  
  // 请求插件配置
  request: {
    // 基于 axios 和 useRequest 的统一网络请求方案
  },
  
  // 移动端调试插件配置
  wconsole: {
    vconsole: {} // VConsole 配置
  },
});
```

### 自定义插件

你也可以创建本地插件文件：

```javascript
// plugin.ts 或 plugin.js
export default (api) => {
  // 插件逻辑
  api.modifyConfig((config) => {
    // 修改配置
    return config;
  });
};
```

## 📖 环境要求

- **Node.js** >= 18.0.0
- **pnpm** >= 10.0.0 或对应版本的其他包管理器
- 支持的操作系统：Windows、macOS、Linux

## 🛠️ 开发工具

### 包管理器
推荐使用 pnpm 进行包管理：

```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm dev

# 构建所有包
pnpm build
```

### 脚本命令

```bash
# 清理依赖
pnpm clean

# 检查代码格式
pnpm format

# 发布版本
pnpm release
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！在开始贡献之前，请：

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -am 'Add some feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 提交 Pull Request

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/winjs-dev/winjs.git

# 进入项目目录
cd winjs

# 安装依赖
pnpm install

# 启动开发
pnpm dev
```

## 🔗 相关链接

- 📖 [官方文档](https://winjs-dev.github.io/winjs-docs/)
- 📦 [NPM 包](https://www.npmjs.com/package/@winner-fed/winjs)

---

<p>
  如果这个项目对你有帮助，请给我们一个 ⭐ 星标支持！
</p>
