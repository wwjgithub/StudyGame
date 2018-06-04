import Shape = egret.Shape;

class Main extends egret.DisplayObjectContainer {
    private m1: egret.Shape;
    private m2: egret.Shape;
    private m3: egret.Shape;
    private m4: egret.Shape;


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);

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
        await this.loadResource()
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }


    private onResize(e): void {
        console.log(this.stage.stageWidth)
        console.log(this.stage.stageHeight)
        this.m1.x = 0;
        this.m1.y = 0;
        this.m2.x = this.stage.stageWidth;
        this.m2.y = 0;
        this.m3.x = 0;
        this.m3.y = this.stage.stageHeight;
        this.m4.x = this.stage.stageWidth;
        this.m4.y = this.stage.stageHeight;

    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        ////////
        this.m1 = this.getRect();
        this.m2 = this.getRect();
        this.m2.anchorOffsetX = this.m2.width;
        this.m3 = this.getRect();
        this.m3.anchorOffsetY = this.m3.height
        this.m4 = this.getRect();
        this.m4.anchorOffsetX = this.m4.width;
        this.m4.anchorOffsetY = this.m4.height;

        this.onResize(null)

    }

    private getRect(): Shape {

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(Math.random() * 0xffffff, 1);
        topMask.graphics.drawRect(0, 0, 100, 100);
        topMask.graphics.endFill();
        this.addChild(topMask);
        return topMask;
    }
}