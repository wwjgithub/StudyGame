import Global = game.Global;
import Game = game.Game;

class Main extends egret.DisplayObjectContainer {


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        Global.stage = this.stage;
        Global.stage_w = this.stage.stageWidth;
        Global.stage_h = this.stage.stageHeight;
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })


    }

    private async runGame() {

        RES.loadConfig("resource/default.res.json", "resource/");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    }

    private onConfigComplete(e: RES.ResourceEvent) {
        console.log("onConfigComplete");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //添加资源组加载完成事件
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //开始加载 preload 资源组
        RES.loadGroup("allRes");
    }

    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        this.createGameScene();
    }


    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let game = new Game();
        this.addChild(game)

    }

}