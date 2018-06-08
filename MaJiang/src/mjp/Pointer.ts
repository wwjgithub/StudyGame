namespace game {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;
    import BitmapFont = egret.BitmapFont;
    import BitmapText = egret.BitmapText;
    import Timer = egret.Timer;
    import TimerEvent = egret.TimerEvent;

    export class Pointer extends Sprite {
        private bg: egret.Bitmap;
        private arrowMc: egret.Sprite;
        private pDown: egret.Bitmap;
        private pLeft: egret.Bitmap;
        private pRight: egret.Bitmap;
        private pUp: egret.Bitmap;
        private moneyT: egret.BitmapText;
        private cntTimer: egret.Timer;


        constructor() {
            super();

            this.bg = new Bitmap();
            this.bg.texture = Global.getRes("时间1");
            this.addChild(this.bg);


            this.arrowMc = new Sprite();
            this.pDown = new Bitmap()
            this.pDown.texture = Global.getRes("时间8");
            this.pDown.x = 13;
            this.pDown.y = 93;
            this.pLeft = new Bitmap()
            this.pLeft.texture = Global.getRes("时间7");
            this.pLeft.x = 11;
            this.pLeft.y = 13;
            this.pRight = new Bitmap();
            this.pRight.texture = Global.getRes("时间9");
            this.pRight.x = 94;
            this.pRight.y = 13;
            this.pUp = new Bitmap()
            this.pUp.texture = Global.getRes("时间6");
            this.pUp.x = 14;
            this.pUp.y = 12;
            this.arrowMc.addChild(this.pLeft);
            this.arrowMc.addChild(this.pRight);
            this.arrowMc.addChild(this.pUp);
            this.arrowMc.addChild(this.pDown);
            this.addChild(this.arrowMc);
            //
            egret.Tween.get(this.arrowMc,{loop:true}).to({"alpha":0},500).to({"alpha":1},500)
            ///////
            this.moneyT = new BitmapText();
            this.moneyT.font = RES.getRes('coin_num_fnt');
            this.moneyT.x=(this.bg.width-this.moneyT.width)/2;
            this.moneyT.y=(this.bg.height-this.moneyT.height)/2;
            this.moneyT.text="10";
            this.addChild(this.moneyT);
            //
            this.anchorOffsetX=this.width/2;
            this.anchorOffsetY=this.height/2;
            this.scaleX=this.scaleY=.7;

            ////
            this.cntTimer=new Timer(1000,10);
            this.cntTimer.addEventListener(TimerEvent.TIMER, this.updateNum1, this);
        }

        private update():void {
            this.cntTimer.reset();
            this.updateNum1(null);
            this.cntTimer.start();
        }

        private updateNum1(e):void {
            this.moneyT.text = (this.cntTimer.repeatCount-this.cntTimer.currentCount) + "";
            this.moneyT.x = (this.bg.width - this.moneyT.width) / 2;
            this.moneyT.y = (this.bg.height - this.moneyT.height) / 2;
        }

        public pointUp():void {
            this.hideArrow();
            this.pUp.visible = true;
            this.update()
        }

        private hideArrow():void {
            this.arrowMc.alpha = 0;
            this.pDown.visible = false;
            this.pUp.visible = false;
            this.pLeft.visible = false;
            this.pRight.visible = false;
        }

        public pointDown():void {
            this.hideArrow();
            this.pDown.visible = true;
            this.update()
        }

        public pointLeft():void {
            this.hideArrow();
            this.pLeft.visible = true;
            this.update()
        }

        public pointRight():void {
            this.hideArrow();
            this.pRight.visible = true;
            this.update()
        }
    }
}