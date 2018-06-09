namespace game {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;
    import BitmapText = egret.BitmapText;

    export class Decorate extends Sprite {
        private diTxt: egret.BitmapText;
        private lastCntText: egret.BitmapText;

        constructor() {
            super();

            var desktopImage: Bitmap = new Bitmap();
            desktopImage.texture = Global.getRes("zhuomian");
            Global.scaleToStageSize(desktopImage);
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
            //
            let mcs = [directMc0, directMc1, directMc2, directMc3];
            mcs.forEach((v, index) => {
                v.x += Global.stage_w / 2;
                v.y += Global.stage_h / 2;
            })
            //////
            this.diTxt = new BitmapText();
            this.addChild(this.diTxt);
            this.diTxt.font = RES.getRes("shengyuwenzi_qs_fnt");
            this.diTxt.text = "底 " + Global.money_di;
            this.diTxt.x = Global.stage_w / 2 + 100;
            this.diTxt.height = 40;
            this.diTxt.y = Global.stage_h / 2 - this.diTxt.height / 2;
            this.diTxt.visible = true;
            /////////
            this.lastCntText = new BitmapText();
            this.addChild(this.lastCntText);
            this.lastCntText.font = RES.getRes("shengyuwenzi_qs_fnt");
            this.lastCntText.height = 40;
            this.lastCntText.x = Global.stage_w / 2 - this.lastCntText.width - 100;
            this.lastCntText.y = Global.stage_h / 2 - this.lastCntText.height / 2;
            //////
            this.touchChildren = false;
            this.touchEnabled = false;
            ////
            this.showLastCardCnt(0);


        }

        public showLastCardCnt(cardCnt: number) {
            this.diTxt.visible = true;
            this.lastCntText.visible = true;
            this.lastCntText.text = "余" + cardCnt + "张";
            this.lastCntText.x = Global.stage_w / 2 - this.lastCntText.width - 100;
        }

        public hideCardCnt(): void {
            this.lastCntText.visible = false;
            this.diTxt.visible = false;
        }
    }
}