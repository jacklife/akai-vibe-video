# akai-vibe-video

面向 AI 助手的 Vibe 知识视频制作 skill：给出选题后，由助手研究、编写分镜、制作代码动画、预览与导出。附带 Canvas 动画工作台和示例工程。

## 安装

将**本目录整体**复制到任意受支持的 skill 目录：

- Codex：`~/.codex/skills/akai-vibe-video/`
- DeepSeek Harness：`~/.dsh/skills/akai-vibe-video/`

目录需保留 `SKILL.md`、`references/`、`scripts/` 和 `assets/`。安装后刷新技能列表或重新打开会话。使用示例：

> 使用 akai-vibe-video 做一条视频，讲为什么人总在后悔过去。

助手需要能使用 Python 和浏览器；转换 MP4 还需要 FFmpeg。能力因环境与模型而异。skill 不能保证自动生成爆款，也不能代替事实、画面和音轨的人工验收。

## 本地工作台

在 skill 所在目录运行：

```bash
python scripts/create_project.py my-video
cd my-video
python -m http.server 8740
```

浏览器打开 http://localhost:8740/ 。可配置分镜、预览，并实时录制带声音的 WebM；若要 MP4，可用 FFmpeg 转换。编辑器只是备选工具，用户也可以直接让 AI 助手完成制作。

## 背景音乐与权利

`assets/studio/assets/reference-bgm.mp3` 是本项目默认背景音乐，文件随项目一起提供。它是从先前参考作品的背景音乐转换而来；**其版权人、许可及公开分发、商用授权目前均未核实**。随包提供不代表已获得授权，也不代表接受者获得了使用或再分发的权利。该 MP3 **不适用本项目 MIT 许可证**；公开发布前应由发布者确认权利。具体已知来源见 [MUSIC-NOTICE.md](MUSIC-NOTICE.md)。

`assets/studio/assets/quiet-steps.wav` 是程序合成的替代测试音轨。用户可自行选择并确认权利的音乐。

## 许可证

`LICENSE` 中的 MIT 条款适用于本项目原创代码、文档和自制合成音轨，不涵盖上述第三方参考 MP3 或外部素材。
