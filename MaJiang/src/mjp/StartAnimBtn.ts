namespace game {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;

    export class StartAnimBtn extends Sprite {


        public mc: Bitmap;
        public img: Bitmap;


        constructor() {
            super();
            this.mc = new Bitmap(Global.getRes("startgame1"));
            this.mc.anchorOffsetX = this.mc.width / 2;
            this.mc.anchorOffsetY = this.height / 2;
            this.addChild(this.mc);
            this.img = new Bitmap(Global.getRes("startgame"));
            this.img.anchorOffsetX = this.img.width / 2;
            this.img.anchorOffsetY = this.img.height / 2;
            this.addChild(this.img);
        }
    }
}