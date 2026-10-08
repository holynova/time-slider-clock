# Time Slider / 滑轨时钟

中文：用上下滑动的镂空网格显示时间。提供分列与整位两版，默认显示秒数；设置收进菜单，支持仅时钟模式、全屏和 10–3600 倍快进测试。整位版使用六条相同的 0–9 滑轨，并完整展示上下边界。

English: A pixel mechanical clock with moving perforated grids. Includes column and whole-digit variants, seconds by default, a settings menu, clock-only mode, fullscreen, and accelerated testing at 10–3600× speed. Whole-digit masks share one fixed 0–9 pattern and remain fully visible.

![手机实际页面 / Mobile screenshot](./assets/screenshot.png)

## 在线体验 / Live Demo

- [Cloudflare Demo — 待验证 / pending verification](https://time-slider-clock.xiaosang.cc/)
- [整位滑轨 / Whole-digit clock](https://time-slider-clock.xiaosang.cc/whole-digit/)
- [GitHub Repo](https://github.com/holynova/time-slider-clock)

<img src="./assets/qr.png" width="180" alt="扫码访问 Cloudflare 在线体验">

## 本地运行 / Run locally

```bash
npm ci
npm run dev
```

打开 / Open `http://localhost:4178/whole-digit/`.

## 检查与发布 / Check and deploy

```bash
npm run check
npm run deploy:check
npm run deploy
```

Cloudflare Workers · `time-slider-clock.xiaosang.cc` · v1.0.0

源码和部署配置均在 `main`；从同一提交在本地手动发布，无 Cloudflare 自动发布工作流。
Source and deployment configuration share `main`; deploy manually from the same commit.

## 参考 / Reference

网格外观参考 [Hans Andersson 的 Time Slider](https://tiltedtwister.com/timeslider.html)。硬件使用每位两片遮罩；本项目整位版采用每位一条滑轨，并非其机械结构的精确复刻。
The lattice appearance references Hans Andersson’s Time Slider; the one-mask-per-digit web variant differs from the original two-mask hardware mechanism.
