namespace game{
    import log = egret.log;

    export class PlayerLeft extends PlayerRobot{

        constructor() {
            super();
            this.showCardsMc.initLeft();
            this.showCardsMc.x = 0;
            this.showCardsMc.y = 100;
            //
            this.discardCardsMc.initLeft();
            this.discardCardsMc.x = 140;
            this.discardCardsMc.y = IDiscardMc.YY;
            this.addChild(this.discardCardsMc);
            this.addChild(this.showCardsMc);
        }

         public  updateIcon(isZhuang:boolean):void {
            super.updateIcon(isZhuang);
            this.head.x = this.head.width / 2 + 2;
            this.head.y = Global.stage_h / 2 + this.head.height / 2;
             log("player left",this.head.x,this.head.y)

             if (this.isZhuang) {
                IPlayer.zhuangMc.x = this.head.x;
                IPlayer.zhuangMc.y = this.head.y + this.head.height / 2 + IPlayer.zhuangMc.height / 2;
                this.addChild(IPlayer.zhuangMc);
            }
        }
    }
}
