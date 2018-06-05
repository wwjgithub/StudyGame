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
    //import starling.display.Quad;
    //import starling.display.Sprite;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;
    //import starling.textures.Texture;
    //import starling.textures.TextureSmoothing;
    //import starling.utils.Color;

    /**
     * @author fq3
     */
    export class explainPanel extends Sprite {
        var back:Scale9Image;
        var close:Image;

        constructor() {
            var n:Quad = new Quad(UserConst.size.x, UserConst.size.y);
            n.color = Color.BLACK;
            n.alpha = 0.2;
            addChild(n);
            var s:Sprite = new Sprite();
            addChild(s);
            var tt:Scale9Textures = new Scale9Textures(Asset.assetManager.getTexture("面板2"), new Rectangle(15, 15, 15, 15));
            back = new Scale9Image(tt, 1);
            back.width = 500;
            back.height = 300;
            back.smoothing = TextureSmoothing.NONE;
            s.addChild(back);
            s.x = (UserConst.size.x - back.width) / 2;
            s.y = (UserConst.size.y - back.height) / 2;
            close = new Image(Asset.assetManager.getTexture("关闭按钮"));
            close.smoothing = TextureSmoothing.NONE;
            s.addChild(close);
            close.pivotX = close.width;
            close.pivotY = close.height / 2;
            close.x = back.x + back.width + 10;
            close.y = back.y + 20;
            close.addEventListener(TouchEvent.TOUCH, close_Handle);
            var txt:Image = getTxtImg("    本单机麻将游戏为国标打法，操作简单清晰，玩家可以轻松的进行休闲娱乐，体验国粹的博大精深。\n    技术支持QQ群:468242512");
            s.addChild(txt);
            txt.x = back.x + 30;
            txt.y = back.y + 30;
        }

        public static getTxtImg(txt:string):Image {
            var tf:TextField = new TextField();
            var format:TextFormat = new TextFormat();
            format.font = "黑体";
            format.color = Color.WHITE;
            format.leading = 10;
            format.size = 24;
            tf.defaultTextFormat = format;
            tf.wordWrap = true;
            tf.autoSize = TextFieldAutoSize.LEFT;
            tf.text = txt;
            tf.multiline = true;
            tf.width = 420;
            var bmd:BitmapData = new BitmapData(tf.width, tf.height, true, 0);
            bmd.draw(tf);
            var tfImg:Image = new Image(Texture.fromBitmapData(bmd, false));
            return tfImg;
        }

        private close_Handle(e:TouchEvent) {
            if (e.getTouch(close, TouchPhase.BEGAN)) {
            }
            if (e.getTouch(close, TouchPhase.ENDED)) {
                destroy();
            }
        }

        public destroy() {
            close.removeEventListener(TouchEvent.TOUCH, close_Handle);
            this.removeFromParent(true);
        }
    }
}
