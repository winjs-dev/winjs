# WinJS App 模板

> 基于 WinJS 框架的现代化 H5 应用开发模板，提供完整的开发工具链和最佳实践。

## 📋 项目简介

WinJS App 模板是一个开箱即用的 H5 应用开发脚手架，集成了现代前端开发的最佳实践和工具链。该模板专为移动端 H5 应用设计，提供了完整的开发、构建、部署解决方案。

### ✨ 特性

- 🚀 **现代化技术栈**：基于 Vue 3.2+ 和 Vue Router 4.x
- 📱 **移动端优化**：内置 REM 适配和移动端调试工具
- 🛠️ **完整工具链**：集成 ESLint、Prettier、StyleLint 等代码质量工具
- 🔧 **插件化架构**：支持请求拦截、移动端调试等插件
- 📦 **模块联邦**：支持微前端架构和模块共享
- 🎨 **样式解决方案**：支持 Less 预处理器和全局样式注入
- 🔄 **热更新**：开发环境支持快速热更新
- 📊 **性能优化**：内置构建优化和缓存策略

## 🛠️ 技术栈

### 核心框架

- **Vue 3.2+** - 渐进式 JavaScript 框架
- **Vue Router 4.x** - Vue.js 官方路由管理器
- **TypeScript 5.0+** - JavaScript 的超集，提供静态类型检查

### 构建工具

- **WinJS** - 基于 Webpack、Rsbuild、Vite 多构建工具的现代化开发元框架
- **Webpack** - 模块打包器
- **Babel** - JavaScript 编译器

### 样式处理

- **Less** - CSS 预处理器
- **PostCSS** - CSS 后处理器
- **MagicLess** - 样式工具库

### 代码质量

- **ESLint** - JavaScript 代码检查工具
- **Prettier** - 代码格式化工具
- **StyleLint** - CSS 代码检查工具
- **F2ELint** - 前端代码规范工具

### 开发工具

- **Husky** - Git hooks 工具
- **lint-staged** - 暂存文件检查工具
- **commitlint** - Git 提交信息规范检查

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install
```

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint

# 代码格式化
npm run format

# F2ELint 扫描
npm run f2elint-scan

# F2ELint 修复
npm run f2elint-fix
```

## 📁 项目结构

```
├── src/                    # 源代码目录
│   ├── assets/            # 静态资源
│   │   ├── fonts/         # 字体文件
│   │   ├── img/           # 图片资源
│   │   └── style/         # 样式文件
│   ├── components/        # 公共组件
│   ├── icons/             # SVG 图标
│   ├── layouts/           # 布局组件
│   ├── pages/             # 页面组件
│   ├── services/          # 网络请求服务
│   ├── utils/             # 工具函数
│   ├── app.js             # 应用配置文件
│   ├── constant.js        # 常量定义
│   └── global.less        # 全局样式
├── public/                # 公共静态资源
├── .winrc.ts              # WinJS 配置文件
├── package.json           # 项目依赖配置
├── tsconfig.json          # TypeScript 配置
└── README.md              # 项目说明文档
```

## ⚙️ 配置说明

### WinJS 配置 (.winrc.ts)

项目使用 `.winrc.ts` 文件进行配置，主要配置项包括：

- **路由配置**：支持 hash 和 history 模式
- **插件配置**：请求插件、移动端调试插件等
- **环境配置**：开发、测试、生产环境的 API 地址配置
- **样式配置**：Less 变量注入、REM 适配等
- **构建配置**：模块联邦、源码映射等

### 环境配置

项目支持多环境配置：

- **development**：本地开发环境
- **test**：测试环境
- **production**：生产环境

每个环境可以配置不同的 API 地址、调试工具开关等。

## 🔌 插件系统

### 内置插件

1. **@winner-fed/plugin-request**

   - 基于 axios 的网络请求解决方案
   - 支持请求/响应拦截器
   - 统一错误处理机制

2. **@winner-fed/plugin-wconsole**

   - 移动端调试工具
   - 支持 vConsole 集成
   - 可配置开启/关闭

## 📱 移动端适配

### REM 适配

项目内置 REM 适配方案，自动根据屏幕尺寸调整字体大小，确保在不同设备上的显示效果一致。

### 兼容性

- iOS >= 10
- Android >= 6
- Chrome >= 80

## 🎨 样式规范

### Less 预处理器

- 支持 Less 语法和功能
- 全局变量和 mixins 注入
- 集成 MagicLess 工具库

### 样式组织

- 全局样式：`src/global.less`
- 组件样式：与组件文件同目录
- 变量文件：`src/assets/style/variable.less`

## 📝 开发规范

### 代码规范

- 遵循 ESLint 规则
- 使用 Prettier 进行代码格式化
- StyleLint 检查 CSS 代码质量

### Git 提交规范

项目使用 Conventional Commits 规范：

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

类型包括：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动

### 组件开发规范

- 组件名使用大驼峰命名
- 每个组件包含 `.vue`、`.less`、`index.ts` 文件
- 组件应具有良好的可复用性和可维护性

## 🔧 常见问题

### 1. 如何添加新页面？

在 `src/pages/` 目录下创建新的 `.vue` 文件，路由会自动生成。

### 2. 如何配置 API 地址？

在 `.winrc.ts` 文件的 `appConfig` 部分配置不同环境的 API 地址。

### 3. 如何添加全局样式？

在 `src/global.less` 文件中添加全局样式，或在 `src/assets/style/` 目录下创建样式文件。

### 4. 如何使用 SVG 图标？

将 SVG 文件放在 `src/icons/` 目录下，通过配置自动生成图标组件。

## 📚 相关文档

- [WinJS 官方文档](https://winjs-dev.github.io/winjs-docs/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Vue Router 4 文档](https://router.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

**注意**：本模板持续更新中，建议定期查看最新版本以获取新特性和修复。
