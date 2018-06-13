namespace game{
    import log = egret.log;

    export class PlayerRight extends PlayerRobot{

        constructor() {
            super();
            this.x = Global.stage_w;
            this.y = Global.stage_h;
            this.showCardsMc.initRight();
            this.showCardsMc.x = -120;
            this.showCardsMc.y = -210;
            //
            this.discardCardsMc.initRight();
            this.discardCardsMc.x = -140 - IDiscardMc.discardCardSize.width;
            this.discardCardsMc.y = -(Global.stage_h - IDiscardMc.YY - (IDiscardMc.CNT_VER - 1) * IDiscardMc.discardCardSize.height);
            this.addChild(this.discardCardsMc);
            this.addChild(this.showCardsMc);
        }

         public updateIcon(isZhuang:boolean):void {
            super.updateIcon(isZhuang);
            this.head.x = -this.head.width / 2 - 2;
            this.head.y = -Global.stage_h / 2 - this.head.height;

             if (this.isZhuang) {
                IPlayer.zhuangMc.x = this.head.x;
                IPlayer.zhuangMc.y = this.head.y + this.head.height / 2 + IPlayer.zhuangMc.height / 2;
                this.addChild(IPlayer.zhuangMc);
            }
        }
    }
}
