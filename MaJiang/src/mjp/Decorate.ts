/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/14
 * Time: 16:45
 */
module mjp {
    //import assets.Asset;

    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.text.TextField;
    //import starling.text.TextFieldAutoSize;
    //import starling.textures.TextureSmoothing;
    //import starling.utils.Color;

    export class Decorate extends Sprite {
        private lastCntText:TextField;
        private diTxt:TextField;

        constructor() {
            super();
            var desktopImage:Image = new Image(Asset.assetManager.getTexture("zhuomian"));
            desktopImage.pivotX = desktopImage.width / 2;
            desktopImage.pivotY = desktopImage.height / 2;
            addChild(desktopImage);
            desktopImage.smoothing = TextureSmoothing.NONE;
            //
            var directMc0:Image = new Image(Asset.assetManager.getTexture("east"));
            directMc0.pivotX = directMc0.width / 2;
            directMc0.pivotY = directMc0.height / 2;
            directMc0.y = UserConst.size.y / 4;
            addChild(directMc0);
            directMc0.smoothing = TextureSmoothing.NONE;
            var directMc1:Image = new Image(Asset.assetManager.getTexture("south"));
            directMc1.pivotX = directMc1.width / 2;
            directMc1.pivotY = directMc1.height / 2;
            directMc1.x = UserConst.size.x / 4;
            addChild(directMc1);
            directMc1.smoothing = TextureSmoothing.NONE;
            var directMc2:Image = new Image(Asset.assetManager.getTexture("west"));
            directMc2.pivotX = directMc2.width / 2;
            directMc2.pivotY = directMc2.height / 2;
            directMc2.y = -UserConst.size.y / 4;
            addChild(directMc2);
            directMc2.smoothing = TextureSmoothing.NONE;
            var directMc3:Image = new Image(Asset.assetManager.getTexture("north"));
            directMc3.pivotX = directMc3.width / 2;
            directMc3.pivotY = directMc3.height / 2;
            directMc3.x = -UserConst.size.x / 4;
            addChild(directMc3);
            directMc3.smoothing = TextureSmoothing.NONE;
            //
            lastCntText = new TextField(10, 40, "", "shengyuwenzi_qs", 30, 0xD8D8D8);
            lastCntText.autoSize = TextFieldAutoSize.HORIZONTAL;
            //addChild(lastCntText);
            lastCntText.alpha = 1;
            lastCntText.x = -lastCntText.width - 100;
            lastCntText.y = -lastCntText.height / 2;
            //
            diTxt = new TextField(100, 40, "", "shengyuwenzi_qs", 30, Color.WHITE);
            diTxt.autoSize = TextFieldAutoSize.HORIZONTAL;
            //addChild(diTxt);
            diTxt.text = "底 " + UserConst.money_di;
            diTxt.x = 100;
            diTxt.y = -diTxt.height / 2;
            diTxt.visible = false;
            //
            showLastCardCnt(0);
            this.touchable = false;
        }

        public showLastCardCnt(cardCnt:number) {
            diTxt.visible = true;
            lastCntText.visible = true;
            lastCntText.text = "余" + cardCnt + "张";
            lastCntText.x = -lastCntText.width - 100;
        }

        public hideCardCnt() {
            lastCntText.visible = false;
            diTxt.visible = false;
        }
    }
}
