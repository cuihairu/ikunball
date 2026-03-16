# scripts

这里放素材整理脚本。

## 当前脚本

- `rename-from-manifest.ps1`

## 用法

先准备：

1. 把候选图放进 `tools/art/raw/`
2. 按 `tools/art/exports/manifest.sample.json` 填写源文件和目标文件

然后执行：

```powershell
powershell -ExecutionPolicy Bypass -File tools/art/scripts/rename-from-manifest.ps1
```

如果只想测试复制逻辑：

```powershell
powershell -ExecutionPolicy Bypass -File tools/art/scripts/rename-from-manifest.ps1 -CopyOnly
```
