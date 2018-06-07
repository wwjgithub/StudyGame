namespace mjp {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;
    import BitmapText = egret.BitmapText;
    import TextField = egret.TextField;
    import BitmapFont = egret.BitmapFont;

    export class Decorate extends Sprite {
        private diTxt: egret.BitmapText;

        constructor() {
            super();

            var desktopImage: Bitmap = new Bitmap();
            desktopImage.texture = Global.getRes("zhuomian_guest1_png");
            desktopImage.anchorOffsetX = desktopImage.width / 2;
            desktopImage.anchorOffsetY = desktopImage.height / 2;
            this.addChild(desktopImage);
            //
            var directMc0: Bitmap = new Bitmap();
            directMc0.texture = Global.getRes("east");
            directMc0.anchorOffsetX = directMc0.width / 2;
            directMc0.anchorOffsetY = directMc0.height / 2;
            directMc0.y = Global.stage_h / 4;
            this.addChild(directMc0);
            //
            var directMc1: Bitmap = new Bitmap();
            directMc1.texture = Global.getRes("south");
            directMc1.anchorOffsetX = directMc1.width / 2;
            directMc1.anchorOffsetY = directMc1.height / 2;
            directMc1.x = Global.stage_w / 4;
            this.addChild(directMc1);
            //
            var directMc2: Bitmap = new Bitmap();
            directMc2.texture = Global.getRes("west");
            directMc2.anchorOffsetX = directMc2.width / 2;
            directMc2.anchorOffsetY = directMc2.height / 2;
            directMc2.y = -Global.stage_h / 4;
            this.addChild(directMc2);
            //
            var directMc3: Bitmap = new Bitmap();
            directMc3.texture = Global.getRes("north");
            directMc3.anchorOffsetX = directMc3.width / 2;
            directMc3.anchorOffsetY = directMc3.height / 2;
            directMc3.x = -Global.stage_w / 4;
            this.addChild(directMc3);
            //////
            this.diTxt = new BitmapText();

            this.diTxt.font = new BitmapFont(Global.getRes("shengyuwenzi_qs"), RES.getRes("shengyuwenzi_qs_fnt"));

            // this.diTxt = new TextField(100, 40, "", , 30, Color.WHITE);
            this.addChild(this.diTxt);
            this.diTxt.text = "底 " + Global.money_di;
            this.diTxt.x = 100;
            this.diTxt.y = -this.diTxt.height / 2;
            this.diTxt.visible = true;
        }
    }
}