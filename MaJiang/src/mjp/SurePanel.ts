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
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;
    //import starling.textures.Texture;
    //import starling.textures.TextureSmoothing;
    //import starling.utils.Color;

    /**
     * @author fq3
     */
    export class SurePanel extends Sprite {
        private back:Scale9Image;
        private sureBtn:ButtonTem;
        private cancelBtn:ButtonTem;
        private str:string;
        public static var instance:SurePanel;

        constructor() {
            instance = this;
            str = "确认离开游戏？";
            var s:Sprite = new Sprite();
            addChild(s);
            var tt:Scale9Textures = new Scale9Textures(Asset.assetManager.getTexture("面板2"), new Rectangle(15, 15, 15, 15));
            back = new Scale9Image(tt, 1);
            back.width = 540;
            back.height = 360;
            back.smoothing = TextureSmoothing.NONE;
            s.addChild(back);
            s.x = (UserConst.size.x - back.width) / 2;
            s.y = (UserConst.size.y - back.height) / 2;
            sureBtn = new ButtonTem("按钮样式", "btn_确认");
            s.addChild(sureBtn);
            sureBtn.x = back.width / 2 - sureBtn.width - 30;
            sureBtn.y = back.height - 120;
            sureBtn.addEventListener(TouchEvent.TOUCH, sureBtn_Handle);
            cancelBtn = new ButtonTem("按钮样式", "btn_取消");
            s.addChild(cancelBtn);
            cancelBtn.x = back.width / 2 + 30;
            cancelBtn.y = sureBtn.y;
            cancelBtn.addEventListener(TouchEvent.TOUCH, cancelBtn_Handle);
            var txt:Image = getTxtImg(str);
            s.addChild(txt);
            txt.x = (s.width - txt.width) / 2;
            txt.y = 80;
        }

        private sureBtn_Handle(e:TouchEvent) {
            if (e.getTouch(sureBtn, TouchPhase.BEGAN)) {
                sureBtn.x = sureBtn.x - sureBtn.width / 20;
                sureBtn.y = sureBtn.y - sureBtn.height / 20;
                sureBtn.scaleX = sureBtn.scaleY = 1.1;
            }
            if (e.getTouch(sureBtn, TouchPhase.ENDED)) {
                destroy();
                Game.instance.exitGame();
            }
        }

        private cancelBtn_Handle(e:TouchEvent) {
            if (e.getTouch(cancelBtn, TouchPhase.BEGAN)) {
                cancelBtn.x = cancelBtn.x - cancelBtn.width / 20;
                cancelBtn.y = cancelBtn.y - cancelBtn.height / 20;
                cancelBtn.scaleX = cancelBtn.scaleY = 1.1;
            }
            if (e.getTouch(cancelBtn, TouchPhase.ENDED)) {
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
            instance = null;
            sureBtn.removeEventListener(TouchEvent.TOUCH, sureBtn_Handle);
            cancelBtn.removeEventListener(TouchEvent.TOUCH, cancelBtn_Handle);
            this.removeFromParent(true);
        }
    }
}
