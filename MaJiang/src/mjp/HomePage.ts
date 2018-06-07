module game {
    import Bitmap = egret.Bitmap;
    import DisplayObject = egret.DisplayObject;

    export class HomePage extends egret.Sprite {
        public static START: string = "START";
        private img: Bitmap;
        private btns: (egret.Bitmap)[];

        constructor() {
            super();
            this.img = new Bitmap();
            this.img.texture = RES.getRes("all_json.homePage");
            this.img.width = Global.stage_w;
            this.img.height = Global.stage_h;
            this.addChild(this.img);
            const title: Bitmap = new Bitmap();
            title.texture = RES.getRes("all_json.title");
            title.width = Global.stage_w * .8;
            title.scaleY = title.scaleX;
            title.x = (Global.stage_w - title.width) / 2;
            title.y = Global.stage_h * .1;
            this.addChild(title);
            title.visible = false;
            //////
            let b1 = new Bitmap();
            b1.touchEnabled=true;
            b1.texture = Global.getRes("开始游戏1");
            this.addChild(b1);
            b1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn1_Handle, this);
            this.btns = [b1];
            let yy: number = Global.stage_h - 60;
            for (var i = this.btns.length - 1; i >= 0; i--) {
                var image: Bitmap = this.btns[i];
                image.width = 300;
                image.scaleY = image.scaleX;
                image.x = Global.stage_w - 350;
                yy -= image.height + 10;
                image.y = yy;
            }

        }

        private btn1_Handle(e) {
            this.dispatchEvent(new egret.Event(HomePage.START));

        }

        destroy() {

        }
    }
}