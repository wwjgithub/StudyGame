namespace game {
    import log = egret.log;

    export class PlayerUp extends PlayerRobot {

        constructor() {
            super();

            this.x = Global.stage_w;
            this.showCardsMc.initUp();
            this.showCardsMc.y = 20;
            this.showCardsMc.x = -(Global.stage_w - Global.UP_CARD_WIDTH * 14 - 10) / 2 - Global.UP_CARD_WIDTH;
            //
            this.discardCardsMc.initUp();
            this.discardCardsMc.x = -(Global.stage_w - IDiscardMc.discardCardSize.width * IDiscardMc.CNT_HOR) / 2 - IDiscardMc.discardCardSize.width;
            this.discardCardsMc.y = IDiscardMc.YY;
            this.addChild(this.discardCardsMc);
            this.addChild(this.showCardsMc);
        }

        public updateIcon(isZhuang: boolean): void {
            super.updateIcon(isZhuang);
            this.head.x = this.showCardsMc.x + this.head.width / 2;
            this.head.y = this.head.height / 2 + 4;
            log("player up",this.head.x,this.head.y)

            if (this.isZhuang) {
                IPlayer.zhuangMc.x = this.head.x + this.head.width / 2 + IPlayer.zhuangMc.width / 2;
                IPlayer.zhuangMc.y = this.head.y;
                this.addChild(IPlayer.zhuangMc);
            }
        }
    }
}
