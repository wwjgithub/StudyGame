module mjp {
    //import assets.Asset;

    //import feathers.display.Scale9Image;
    //import feathers.textures.Scale9Textures;

    //import flash.display.BitmapData;
    //import flash.geom.Rectangle;
    //import flash.text.TextField;
    //import flash.text.TextFieldAutoSize;
    //import flash.text.TextFormat;

    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.textures.Texture;
    //import starling.textures.TextureSmoothing;
    //import starling.utils.Color;

    /**
     * @author fq3
     */
    export class LookPanel extends Sprite {
        private back:Scale9Image;
        private word1:Image;
        private word2:Image;
        // 关卡介绍
        constructor(playerInfos:Vector.<PlayerInfo>, curLevel:number) {
            var tt:Scale9Textures = new Scale9Textures(Asset.assetManager.getTexture("面板2"), new Rectangle(15, 15, 15, 15));
            back = new Scale9Image(tt, 1);
            back.width = 500;
            back.height = 360;
            back.smoothing = TextureSmoothing.NONE;
            addChild(back);
            back.x = (UserConst.size.x - back.width) / 2;
            back.y = (UserConst.size.y - back.height) / 2;
            back.touchGroup = true;
            back.touchable = true;
            word1 = new Image(Asset.assetManager.getTexture("关卡介绍文字1"));
            word1.smoothing = TextureSmoothing.NONE;
            back.addChild(word1);
            word1.x = 144;
            word1.y = 20;
            var txt:Image = getTxtImg("当前关为第" + (curLevel + 1) + "关，通关条件，" + playerInfos[1].name + "的金币为0！");
            back.addChild(txt);
            txt.x = (back.width - txt.width) / 2;
            txt.y = 70;
            word2 = new Image(Asset.assetManager.getTexture("关卡介绍文字2"));
            word2.smoothing = TextureSmoothing.NONE;
            back.addChild(word2);
            word2.x = 15;
            word2.y = 140;
            //
            for (var i:number = 0; i < 4; i++) {
                var img:Image;
                var oppo:PlayerInfo = playerInfos[i];
                img = getTxtImg(oppo.name);
                img.x = 18;
                img.y = 180 + 40 * i;
                back.addChild(img);
                img = getTxtImg(oppo.win + "");
                img.x = 120;
                img.y = 180 + 40 * i;
                back.addChild(img);
                img = getTxtImg(oppo.lose + "");
                img.x = 220;
                img.y = 180 + 40 * i;
                back.addChild(img);
                img = getTxtImg(oppo.money + "");
                img.x = 360;
                img.y = 180 + 40 * i;
                back.addChild(img)
            }
        }

        public static getTxtImg(txt:string):Image {
            var tf:TextField = new TextField();
            var format:TextFormat = new TextFormat();
            format.color = Color.WHITE;
            format.size = 25;
            tf.defaultTextFormat = format;
            tf.wordWrap = true;
            tf.autoSize = TextFieldAutoSize.LEFT;
            tf.text = txt;
            tf.width = 350;
            var bmd:BitmapData = new BitmapData(tf.width, tf.height, true, 0);
            bmd.draw(tf);
            var tfImg:Image = new Image(Texture.fromBitmapData(bmd, false));
            return tfImg;
        }

        public destroy() {
            back.dispose();
            back = null;
            this.removeFromParent(true);
        }
    }
}
