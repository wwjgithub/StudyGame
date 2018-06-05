module assets {
    //import engine.MjConst;
    //import engine.vo.MjCard;

    //import flash.display.Bitmap;

    //import mjp.CardSprite;
    //import mjp.UserConst;

    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.textures.Texture;
    //import starling.textures.TextureAtlas;
    //import starling.textures.TextureSmoothing;
    //import starling.utils.AssetManager;

    /**
     * @author fq3
     */
    export class Asset {
        [Embed(source="../../res/card.png.atf", mimeType="application/octet-stream")]
        public static var AtfInit;
        [Embed(source="../../res/card.xml", mimeType="application/octet-stream")]
        private static var XmlInitial;
        [Embed(source="../../res/level.png.atf", mimeType="application/octet-stream")]
        public static var LevelInit;
        [Embed(source="../../res/level.xml", mimeType="application/octet-stream")]
        private static var LevelInitial;
        [Embed(source="../../res/home.png.atf", mimeType="application/octet-stream")]
        public static var AtfHomePage;
        [Embed(source="../../res/home.xml", mimeType="application/octet-stream")]
        private static var XmlHomePage;
        public static var assetManager:AssetManager = new AssetManager();

        public static init() {
            var data:* = new AtfInit();
            var texture:Texture;
            if (data is Bitmap) {
                texture = Texture.fromBitmap(data);
            } else {
                texture = Texture.fromAtfData(data, 1, false);
            }
            var xml:XML = XML(new XmlInitial());
            assetManager.addTextureAtlas("静态", new TextureAtlas(texture, xml));
        }

        public static initLevel() {
            var data:* = new LevelInit();
            var texture:Texture;
            if (data is Bitmap) {
                texture = Texture.fromBitmap(data);
            } else {
                texture = Texture.fromAtfData(data, 1, false);
            }
            var xml:XML = XML(new LevelInitial());
            assetManager.addTextureAtlas("等级", new TextureAtlas(texture, xml));
        }

        public static getRightStandCard(card:MjCard):CardSprite {
            var sp:CardSprite = new CardSprite(card);
            var back:Image = new Image(assetManager.getTexture("pai_cemian"));
            back.smoothing = TextureSmoothing.TRILINEAR;
            back.scaleX = -1;
            sp.addChild(back);
            //
            if (UserConst.SHOW_COMPUTER) {
                var image:Image = new Image(assetManager.getTexture(Asset.getTextureName(card)));
                image.smoothing = TextureSmoothing.TRILINEAR;
                image.pivotX = image.width / 2;
                image.pivotY = image.height / 2;
                sp.addChild(image);
                image.scaleX = image.scaleY = 0.3;
                image.x -= 20;
                image.y += 15;
            }
            //
            return sp;
        }

        public static getLeftStandCard(card:MjCard):CardSprite {
            var sp:CardSprite = new CardSprite(card);
            var back:Image = new Image(assetManager.getTexture("pai_cemian"));
            back.smoothing = TextureSmoothing.TRILINEAR;
            sp.addChild(back);
            //
            if (UserConst.SHOW_COMPUTER) {
                var image:Image = new Image(assetManager.getTexture(getTextureName(card)));
                image.smoothing = TextureSmoothing.TRILINEAR;
                image.pivotX = image.width / 2;
                image.pivotY = image.height / 2;
                sp.addChild(image);
                image.scaleX = image.scaleY = 0.3;
                image.x += 10;
                image.y += 13;
            }
            //
            return sp;
        }

        public static getUpStandCard(card:MjCard):CardSprite {
            var sp:CardSprite = new CardSprite(card);
            var back:Image = new Image(assetManager.getTexture("pai_shang1"));
            sp.addChild(back);
//
            if (UserConst.SHOW_COMPUTER) {
                var image:Image = new Image(assetManager.getTexture(Asset.getTextureName(card)));
                image.smoothing = TextureSmoothing.TRILINEAR;
                image.pivotX = image.width / 2;
                image.pivotY = image.height / 2;
                image.x = sp.width / 2;
                image.y = sp.height / 2 + 7;
                sp.addChild(image);
                image.scaleX = image.scaleY = 0.5;
            }
            return sp;
        }

        /**
         * 英雄看到的立牌
         * @param card
         * @return
         */
        public static getFrontStandCard(card:MjCard):CardSprite {
            var sp:CardSprite = new CardSprite(card);
            var back:Image = new Image(assetManager.getTexture("pai_xia1"));
            sp.addChild(back);
            back.smoothing = TextureSmoothing.NONE;
            var image:Image = new Image(assetManager.getTexture(Asset.getTextureName(card)));
            image.smoothing = TextureSmoothing.TRILINEAR;
            image.pivotX = image.width / 2;
            image.pivotY = image.height / 2;
            image.x = sp.width / 2;
            image.y = sp.height / 2 + 7;
            sp.addChild(image);
            sp.scaleX = UserConst.getHeroCardScale();
            sp.scaleY = sp.scaleX;
            return sp;
        }

        private static function getTextureName(card:MjCard):string {
            var s:string = "";
            switch (card.type) {
                case MjConst.type_feng:
                    s = "3" + card.num;
                    break;
                case MjConst.type_se:
                    s = (34 + card.num) + "";
                    break;
                case MjConst.type_hua:
                    var ss4 = ["梅", "兰", "竹", "菊"];
                    s = ss4[card.num - 1];
                    break;
                default :
                    var ss2 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
                    s = ss2[card.num - 1];
                    if (card.type == MjConst.type_wan) {
                        s = "" + s;
                    }
                    if (card.type == MjConst.type_tong) {
                        s = "1" + s;
                    }
                    if (card.type == MjConst.type_tiao) {
                        s = "2" + s;
                    }
                    break;
            }
            return s;
        }

        /**
         * 得到自己扣牌
         * @return
         */
        public static getBackCard():Sprite {
            var sp:Sprite = new Sprite();
            var back:Image = new Image(assetManager.getTexture("pai_xia_fapai"));
            sp.addChild(back);
            back.smoothing = TextureSmoothing.NONE;
            sp.scaleX = sp.scaleY = UserConst.getHeroCardScale();
            return sp;
        }

        public static getDiscardCard(card:MjCard):CardSprite {
            var sp:CardSprite = new CardSprite(card);
            var back:Image = new Image(assetManager.getTexture("pai_xia3"));
            sp.addChild(back);
            back.smoothing = TextureSmoothing.TRILINEAR;
            back.width = 48;
            back.height = 64;
            var image:Image = new Image(assetManager.getTexture(getTextureName(card)));
            image.pivotX = image.width / 2;
            image.pivotY = image.height / 2;
            image.x = sp.width / 2;
            image.y = sp.height / 2 - 5;
            image.scaleX = image.scaleY = 0.65;
            image.smoothing = TextureSmoothing.TRILINEAR;
            sp.addChild(image);
//            sp.pivotX = sp.width / 2;
//            sp.pivotY = sp.height / 2;
            sp.scaleX = sp.scaleY = UserConst.getDiscardCardScale();
            return sp;
        }

        /**
         * 下方
         * @param card
         * @return
         */
        public static getFreezeCardMcDown(card:MjCard):CardSprite {
            var sp:CardSprite = new CardSprite(card);
            var back:Image = new Image(assetManager.getTexture("pai_xia3"));
            sp.addChild(back);
            var image:Image = new Image(assetManager.getTexture(getTextureName(card)));
            image.smoothing = TextureSmoothing.TRILINEAR;
            image.pivotX = image.width / 2;
            image.pivotY = image.height / 2;
            image.x = sp.width / 2;
            image.y = sp.height / 2 - 5;
            image.scaleX = image.scaleY = 0.8;
            sp.addChild(image);
            sp.scaleX = sp.scaleY = UserConst.getHeroCardScale();
            return sp;
        }

        /**
         * 下方反牌
         * @param card
         * @return
         */
        public static getFreezeCardBackMcDown(card:MjCard):Sprite {
            var sp:CardSprite = new CardSprite(card);
            var back:Image = new Image(assetManager.getTexture("pai_xia_fapai"));
            sp.addChild(back);
            back.smoothing = TextureSmoothing.NONE;
            sp.scaleX = sp.scaleY = UserConst.getHeroCardScale()*.86;
            return sp;
        }

        public static initHome() {
            var data:* = new AtfHomePage();
            var texture:Texture;
            texture = Texture.fromAtfData(data, 1, false);
            var xml:XML = XML(new XmlHomePage());
            assetManager.addTextureAtlas("home", new TextureAtlas(texture, xml));
        }
    }
}
