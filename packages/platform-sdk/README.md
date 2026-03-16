# platform-sdk

小游戏平台能力封装层。

目标：

- 屏蔽微信小游戏和抖音小游戏差异
- 对外暴露统一接口

建议后续封装：

- `createRewardedVideoAd`
- `createInterstitialAd`
- `login`
- `share`
- `getStorage`
- `setStorage`

## 当前代码目标

- 定义统一平台接口
- 提供本地开发可用的默认内存实现
- 后续再分别补微信小游戏和抖音小游戏适配器
