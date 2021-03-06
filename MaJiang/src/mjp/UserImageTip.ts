namespace game {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;
    import Point = egret.Point;

    export class UserImageTip extends Sprite {


        public back: Bitmap;
        public info: IPlayer;


        constructor(info: IPlayer) {
            super();
            /*
                        this.info = info;
                        var tt:Scale9Textures = new Scale9Textures(Asset.assetManager.getTexture("面板2"), new Rectangle(15, 15, 15, 15));
                        back = new Scale9Image(tt, 1);
                        back.width = 300;
                        back.height = 220;
                        addChild(back);*/
        }

        public update(p: Point): void {/*
            var n:Quad = new Quad(UserConst.size.x, UserConst.size.y);
            n.color = Color.BLACK;
            n.alpha = 0.2;
            addChild(n);
            n.addEventListener(TouchEvent.TOUCH, n_Handle);
            //
            var txt:Image = getTxtImg("详细信息");
            back.addChild(txt);
            txt.x = (back.width - txt.width) / 2;
            txt.y = 16;
            var photo:Image = new Image(Asset.assetManager.getTexture(info.playerInfo.sex == UserConst.MAN ? "boy_icon" : "girl_icon"));
            photo.smoothing = TextureSmoothing.NONE;
            back.addChild(photo);
            photo.x = 20;
            photo.y = 48;
            var txt1:Image = getTxtImg(info.playerInfo.name);
            back.addChild(txt1);
            txt1.x = 74;
            txt1.y = 58;
            var txt2:Image = getTxtImg("金币 " + info.playerInfo.money);
            back.addChild(txt2);
            txt2.x = 16;
            txt2.y = 103;
            var txt3:Image = getTxtImg("胜：" + info.playerInfo.win);
            back.addChild(txt3);
            txt3.x = 16;
            txt3.y = 136;
            var txt4:Image = getTxtImg("负：" + info.playerInfo.lose);
            back.addChild(txt4);
            txt4.x = 16;
            txt4.y = 165;
            //
            back.x = p.x - 35;
            back.y = p.y - 35;
        */
        }

        private getTxtImg(txt: String): any {/*
            var tf:TextField = new TextField();
            var format:TextFormat = new TextFormat();
            format.color = Color.WHITE;
            format.size = 24;
            tf.defaultTextFormat = format;
            tf.wordWrap = false;
            tf.autoSize = TextFieldAutoSize.LEFT;
            tf.text = txt;
            var bmd:BitmapData = new BitmapData(tf.width, tf.height, true, 0);
            bmd.draw(tf);
            var tfImg:Image = new Image(Texture.fromBitmapData(bmd, false));
            return tfImg;*/
            new Bitmap()
        }

        private n_Handle(e: TouchEvent): void {
            this.destroy();
        }

        public destroy(): void {
            /*back.dispose();
            back = null;
            this.removeFromParent(true);*/
        }
    }
}
