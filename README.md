# VocabMaster 考研词汇大师

<p align="center">
  <img src="https://img.shields.io/badge/UI-MacOS%20Big%20Sur-333333?style=for-the-badge&logo=apple" alt="MacOS">
  <img src="https://img.shields.io/badge/PWA-Progressive%20Web%20App-5A0FC8?style=for-the-badge&logo=pwa" alt="PWA">
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-007AFF?style=for-the-badge" alt="Platform">
</p>

> 一款专为考研学子打造的 Mac 风格背单词应用，美观简洁，适合移动端使用

## ✨ 特性

- **MacOS 风格界面** - 毛玻璃、大圆角、拟物与扁平结合
- **PWA 应用** - 可添加至 iOS/Android 主屏幕，全屏运行
- **离线可用** - Service Worker 缓存，无网也能学习
- **智能学习计划** - 每日目标，循序渐进
- **随机测验** - 学习完成后巩固记忆
- **发音功能** - 内置英文发音

## 📱 使用方式

### iOS 用户

1. 用 Safari 打开应用网址
2. 点击 Safari 底部分享按钮
3. 向下滚动，选择「添加到主屏幕」
4. 点击「添加」

### Android 用户

1. 用 Chrome 打开应用网址
2. 点击顶部地址栏的安装提示
3. 或点击菜单 → 「添加到主屏幕」

## 🛠 技术栈

- HTML5 + CSS3 + JavaScript (ES6+)
- PWA (Service Worker + Manifest)
- LocalStorage 数据持久化
- Web Speech API 发音

## 📂 项目结构

```
├── index.html          # 主入口
├── manifest.json       # PWA 配置
├── service-worker.js   # 离线缓存
├── css/                # 样式文件
├── js/                 # JavaScript 文件
└── assets/             # 静态资源
```

## 🌐 部署

项目可部署到任意静态托管服务：

- [Vercel](https://vercel.com) - 推荐，免费快速
- [Netlify](https://netlify.com) - 拖拽部署
- [GitHub Pages](https://pages.github.com) - GitHub 免费托管
- [Cloudflare Pages](https://pages.cloudflare.com) - 全球 CDN

## 📖 License

MIT License

---

**祝考研顺利 🎓**
