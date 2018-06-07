module game {
    import Bitmap = egret.Bitmap;

    export class HomePage extends egret.Sprite {
        public static START: string = "START";
        private img: Bitmap;

        constructor() {
            super();
            this.img = new Bitmap();
            this.img.texture = RES.getRes("homePage_png");
            this.img.width = Global.stage_w;
            this.img.height = Global.stage_h;
            this.addChild(this.img);

        }

    }
}