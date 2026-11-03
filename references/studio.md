# Canvas 工作台

运行 `python scripts/create_project.py <新项目目录>`，再在新目录运行 `python -m http.server 8740` 并打开浏览器。工作台支持分镜 JSON、预览、音频选择与实时 WebM 录制；助手应自行构建项目、预览和导出，不让用户手工配置。

`assets/studio/examples/cup.json` 演示工程格式。每幕包含 duration、visual、heading、caption；新增视觉类型须同时更新 app.js 中的选项与导入验证，再在 renderer.js 实现时间驱动动作。

工作台优先使用 `assets/reference-bgm.mp3`，缺少时回退到自制音轨。参考 MP3 的公开分发与商用授权未核实，详见根目录 MUSIC-NOTICE.md。若使用短音轨，设置 loop 或选更长的授权音乐。

实时 WebM 录制不是离线逐帧输出。转换 MP4 后检查时长、音轨和字幕，并在可能时完整播放和试听。检查 Python、浏览器、FFmpeg 与字体是否可用；不可用时说明限制。
