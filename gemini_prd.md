这是一份为你量身定制的**考研英语背单词 PWA（Mac UI 风格）产品需求文档 (PRD)**。

考虑到你特别强调了“外观与 Mac 风格 UI 的描述与提示词”，我将这部分作为核心重点进行了前置和详细展开。PWA 的轻量化和离线能力非常适合这类背单词工具。

---

# 📝 产品需求文档 (PRD)：考研单词 Mac版 (PWA)

## 1. 产品概述
* **产品定位：** 一款基于 PWA 技术的移动端背单词网页应用，专为考研党设计。
* **核心卖点：** 极致纯净的 macOS 视觉体验（毛玻璃、大圆角、拟物与扁平结合）、极简的学习流、本地化数据存储（无需强制联网）。
* **目标平台：** 移动端浏览器（Safari/Chrome）添加至主屏幕（PWA），完美适配手机屏幕比例。

---

## 2. 🎨 核心：Mac OS 风格 UI/UX 设计规范（详细描述与提示词）

为了在手机端完美复刻 macOS（Big Sur 及之后版本）的质感，UI 设计需严格遵循以下规范：

### 2.1 视觉元素定义
* **色彩系统 (Color Palette)：**
    * **背景：** 浅色模式使用非常淡的灰白色（如 `#F5F5F7`），深色模式使用深邃的黑灰色（如 `#1E1E1E`）。
    * **强调色 (Accent Color)：** 使用经典的 Apple System Blue (`#007AFF`) 作为主按钮和进度条颜色。
    * **面板/卡片背景：** 纯白或纯黑，带有微微的透明度。
* **材质与特效 (Materials & Effects)：**
    * **毛玻璃特效 (Glassmorphism)：** 这是灵魂！顶部导航栏、底部 Tab 栏、弹窗必须使用背景模糊效果 (`backdrop-filter: blur(20px); background-color: rgba(255, 255, 255, 0.7);`)。
    * **阴影 (Drop Shadow)：** 放弃大面积生硬的阴影。使用多层、柔和、大范围的弥散阴影来体现层级（如 macOS 的窗口阴影）。
* **形状 (Shapes)：**
    * **平滑圆角 (Squircle)：** 所有卡片、按钮的圆角不能是简单的 `border-radius`，应在视觉上模仿苹果的连续曲率圆角（超大圆角，如 16px - 24px）。
* **字体 (Typography)：**
    * 系统默认字体栈：中文使用 `PingFang SC`，英文使用 `San Francisco (SF Pro)`。字重对比要明显（标题加粗，正文纤细）。

### 2.2 界面排版 (适配手机)
* **顶部 (Title Bar)：** 类似 Mac 的顶部菜单栏，但只保留居中的标题和右侧的设置图标，背景全局毛玻璃。
* **内容区 (Content)：** 单词展示采用“Mac 窗口式”卡片，卡片左上角可以设计三个极小的“红黄绿”装饰点（致敬 Mac 窗口控制键），作为纯装饰或快捷操作（如：标红=太难，标绿=已掌握）。
* **底部 (Dock)：** 将底部的 Tab 导航做成类似 Mac Dock 栏的悬浮样式，不贴底，有圆角和毛玻璃背景。

### 2.3 🎨 AI 绘图/UI 设计师提示词 (Prompt)
如果你需要用 Midjourney 等 AI 工具生成概念图，或者直接给 UI 设计师提需求，请直接复制以下提示词：

> **英文提示词 (Midjourney 等 AI 绘图使用):**
> UI design of a vocabulary learning mobile app, Progressive Web App, pure macOS Big Sur style, glassmorphism, frosted glass effect, translucent materials, smooth squircles, Apple system blue accent color. Main screen shows a flashcard with an English word and phonetic symbols. Floating Mac Dock style bottom navigation bar. Clean, minimalist, elegant, aesthetic, light gray background, soft drop shadow, high quality, Dribbble style, UI/UX, 8k --ar 9:16 --v 6.0
>
> **中文描述词 (给人类设计师使用):**
> 设计一款手机端背单词 App 界面。要求极其纯正的 macOS UI 风格。大量使用毛玻璃（亚克力）半透明材质，背景模糊效果。卡片和按钮使用苹果的平滑大圆角。主色调为浅灰白背景配合苹果系统蓝（System Blue）。主界面是一个类似 Mac 窗口的单词卡片，卡片左上角有红黄绿三个小圆点装饰。底部导航栏采用类似 Mac Dock 的悬浮毛玻璃设计。整体要求极简、克制、优雅，排版呼吸感强，无多余线条，靠弥散阴影区分层级。

---

## 3. 功能需求详细说明

### 3.1 词库管理 (Library Management)
* **内置词库搜索：** 默认提供一份在线的“考研英语大纲词汇/红宝书”（通过静态 JSON 文件加载，极大提高 PWA 速度）。用户可通过搜索框直接查找。
* **导入词库：** 支持用户上传本地的 `.csv` 或 `.json` 文件（例如两列：英文, 中文）。
* **数据存储：** 词库下载或导入后，强制存储在浏览器的 `IndexedDB` 中，保证后续完全离线可用，即点即开。

### 3.2 学习计划制定 (Study Plan)
* **目标设定：** 用户选择词库后，输入“预计完成天数”或“每天背诵量”。
* **计划生成：** 系统自动将整本词库划分为若干个“章节 (Chapter)”，例如“红宝书 Unit 1 - Unit 50”。
* **进度展示：** 首页展示一个 macOS 风格的环形进度条（参考 Apple Watch 的圆环设计）或极简的胶囊进度条，显示当前学习天数、今日需背单词数（新词+复习）。

### 3.3 第一章：单词学习模块 (Flashcard Mode)
* **交互逻辑：** 采用单面卡片翻转或点击展开的形式。
* **展示内容：**
    * 正面：巨大且优雅的英文单词，下方配有音标。提供一个发音按钮（调用浏览器原生的 `SpeechSynthesis API` 或外链发音音频）。
    * 反面/展开后：中文释义、考研真题例句、词根词缀记忆法。
* **操作反馈：** 底部提供三个大圆角按钮：
    * **认识 (Swipe Right / 快捷键)：** 直接进入下一个，该词进入复习池，拉长复习间隔。
    * **模糊：** 显示释义后，标记为需巩固。
    * **不认识 (Swipe Left / 快捷键)：** 重点标记，该词会在当前章节结束前反复出现，直到用户点“认识”。

### 3.4 随机抽查测验 (Chapter Quiz)
* **触发条件：** 当用户完成“第一章”（或任意一天的学习量）时，系统自动弹出一个 macOS 风格的 Alert 弹窗（带毛玻璃背景）：“恭喜完成本章！是否进行 10 题随机抽查以巩固记忆？”
* **测验题型（随机混合）：**
    * **英选中：** 给出单词，4 个中文释义选项。
    * **中选英：** 给出中文，4 个英文单词选项。
    * **拼写（可选）：** 给出中文和例句，要求利用虚拟键盘填空补全单词。
* **结算界面：** 测验结束后，展示得分环形图，并将答错的单词自动标红，加入次日的“优先复习”列表。

---

## 4. 技术方案实现建议 (面向开发)

1.  **前端框架：** 推荐使用 React 或 Vue3。它们有成熟的生态。
2.  **UI 库参考：** 虽然要手写很多毛玻璃 CSS，但可以参考开源项目如 `macOS in Svelte` 或 `portfolio-macos` 中的 CSS 实现方式，提取其样式代码。
3.  **PWA 核心：**
    * 配置 `manifest.json`：设置 `display: "standalone"` 以隐藏浏览器地址栏，实现沉浸式 App 体验；设置 `theme_color` 与 Mac 风格匹配。
    * 配置 `Service Worker`：缓存核心 HTML、CSS、JS 和词库 JSON 文件，确保弱网或无网状态下应用秒开。
4.  **数据持久化：** 强烈建议使用 `localforage` (基于 IndexedDB 封装的库) 来存储用户的学习进度和词库，容量大且不会像 LocalStorage 那样卡顿。

这份 PRD 明确了从视觉到功能的闭环，你可以直接拿着 **第2部分的 UI 规范和提示词** 去生成设计图，然后再按照功能模块进行 PWA 开发。祝你的考研 App 开发顺利！