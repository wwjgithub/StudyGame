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
    export class NotifyPanel extends Sprite {
        var back:Scale9Image;
        var sureBtn:ButtonTem;
        var str:string;

        constructor(gg:string) {
            str = gg;
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
            sureBtn = new ButtonTem("按钮样式", "btn_确认");
            sureBtn.pivotX = sureBtn.width / 2;
            sureBtn.pivotY = sureBtn.height / 2;
            sureBtn.scaleX = sureBtn.scaleY = .7;
            s.addChild(sureBtn);
            sureBtn.x = back.width / 2;
            sureBtn.y = 230;
            sureBtn.addEventListener(TouchEvent.TOUCH, sureBtn_Handle);
            var txt:Image = getTxtImg(str);
            s.addChild(txt);
            txt.x = (s.width - txt.width) / 2;
            txt.y = 80;
        }

        private sureBtn_Handle(e:TouchEvent) {
            if (e.getTouch(sureBtn, TouchPhase.BEGAN)) {
            }
            if (e.getTouch(sureBtn, TouchPhase.ENDED)) {
                destroy();
            }
        }

        public static getTxtImg(txt:string):Image {
            var tf:TextField = new TextField();
            var format:TextFormat = new TextFormat();
            format.color = Color.WHITE;
            format.size = 40;
            tf.defaultTextFormat = format;
            tf.wordWrap = false;
            tf.autoSize = TextFieldAutoSize.LEFT;
            tf.text = txt;
            var bmd:BitmapData = new BitmapData(tf.width, tf.height, true, 0);
            bmd.draw(tf);
            var tfImg:Image = new Image(Texture.fromBitmapData(bmd, false));
            return tfImg;
        }

        public destroy() {
            sureBtn.removeEventListener(TouchEvent.TOUCH, sureBtn_Handle);
            this.removeFromParent(true);
        }
    }
}
