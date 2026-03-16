# 资源命名规范

## 目标

统一纹理、预制体、音频、粒子资源的命名，避免后面导入 Creator 后找不到文件或命名漂移。

## 基本规则

- 全部使用小写字母
- 单词之间用下划线 `_`
- 前缀体现资源类型
- 不要用中文、空格、版本后缀乱堆

## 纹理命名

### 角色

- `chick_idle`
- `chick_happy`
- `chick_hyped`
- `chick_broken`

### 篮球与场景

- `ball_basic`
- `hoop_basic`
- `bg_home`
- `bg_gameplay`
- `bg_result`

### UI

- `ui_btn_start`
- `ui_btn_submit`
- `ui_btn_home`
- `ui_bar_power`
- `ui_panel_leaderboard`
- `ui_panel_result`

### 表情

- `emoji_calm`
- `emoji_happy`
- `emoji_hyped`
- `emoji_broken`

## 预制体命名

- `pf_ball`
- `pf_hoop`
- `pf_hit_fx`
- `pf_perfect_fx`
- `pf_miss_fx`
- `pf_leaderboard_item`

## 音频命名

### 背景音乐

- `bgm_home`
- `bgm_gameplay`

### 音效

- `sfx_hit`
- `sfx_perfect`
- `sfx_miss`
- `sfx_combo`
- `sfx_click`

## 粒子与特效命名

- `fx_hit_flash`
- `fx_perfect_burst`
- `fx_miss_smoke`

## 占位资源命名

如果只是临时资源，统一加 `_placeholder`：

- `bg_home_placeholder`
- `ball_placeholder`
- `ui_btn_start_placeholder`

等正式资源到位后再去掉。

## 不建议的命名

- `newball`
- `按钮最终版2`
- `鸡哥哈哈哈`
- `perfect-final-final`

这类命名后期维护成本很高。
