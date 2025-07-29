#!/bin/bash

echo "🧹 开始清理磁盘空间..."

# 清理 pnpm store
echo "清理 pnpm store..."
pnpm store prune

# 清理构建产物
echo "清理构建产物..."
find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "lib" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name ".turbo" -type d -exec rm -rf {} + 2>/dev/null || true

# 清理测试缓存
echo "清理测试缓存..."
find . -name "coverage" -type d -exec rm -rf {} + 2>/dev/null || true

# 清理临时文件
echo "清理临时文件..."
find . -name "*.log" -delete 2>/dev/null || true
find . -name ".DS_Store" -delete 2>/dev/null || true

echo "✅ 清理完成"

# 显示当前大小
echo "📊 当前项目大小:"
du -sh .
echo "📊 pnpm store 大小:"
du -sh $(pnpm store path)
