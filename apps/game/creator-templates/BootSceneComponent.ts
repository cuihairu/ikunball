import { _decorator, Component, Label, director } from "cc";

const { ccclass, property } = _decorator;

@ccclass("BootSceneComponent")
export class BootSceneComponent extends Component {
  @property(Label)
  statusLabel: Label | null = null;

  async onLoad(): Promise<void> {
    if (this.statusLabel) {
      this.statusLabel.string = "Loading...";
    }

    // TODO:
    // 1. 初始化 AppContext / GameManager
    // 2. 拉取配置
    // 3. 预加载首页资源

    if (this.statusLabel) {
      this.statusLabel.string = "Ready";
    }

    director.loadScene("Home");
  }
}
