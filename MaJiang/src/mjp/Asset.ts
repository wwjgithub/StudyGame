namespace game {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;

    export class Asset {

        public static getRightStandCard(card: MjCard): CardSprite {
            var sp: CardSprite = new CardSprite(card);
            var back: Bitmap = new Bitmap(Global.getRes("pai_cemian"));
            back.scaleX = -1;
            sp.addChild(back);
            //
            if (Global.SHOW_COMPUTER) {
                var image:Bitmap = new Bitmap(Global.getRes(Asset.getTextureName(card)));
                image.anchorOffsetX = image.width / 2;
                image.anchorOffsetY = image.height / 2;
                sp.addChild(image);
                image.scaleX = image.scaleY = 0.3;
                image.x -= 20;
                image.y += 15;
            }
            return sp;
        }

        public static getLeftStandCard(card: MjCard): CardSprite {
            var sp: CardSprite = new CardSprite(card);
            var back: Bitmap = new Bitmap(Global.getRes("pai_cemian"));
            sp.addChild(back);
            //
            if (Global.SHOW_COMPUTER) {
                var image:Bitmap = new Bitmap(Global.getRes(Asset.getTextureName(card)));
                image.anchorOffsetX = image.width / 2;
                image.anchorOffsetY = image.height / 2;
                sp.addChild(image);
                image.scaleX = image.scaleY = 0.3;
                image.x += 10;
                image.y += 13;
            }
            return sp;
        }

        public static getUpStandCard(card: MjCard): CardSprite {
            var sp: CardSprite = new CardSprite(card);
            var back: Bitmap = new Bitmap(Global.getRes("pai_shang1"));
            sp.addChild(back);
//
            if (Global.SHOW_COMPUTER) {
                var image:Bitmap = new Bitmap(Global.getRes(Asset.getTextureName(card)));
                image.anchorOffsetX = image.width / 2;
                image.anchorOffsetY = image.height / 2;
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
        public static getFrontStandCard(card: MjCard): CardSprite {
            var sp: CardSprite = new CardSprite(card);
            var back: Bitmap = new Bitmap(Global.getRes("pai_xia1"));
            sp.addChild(back);
            var image: Bitmap = new Bitmap(Global.getRes(Asset.getTextureName(card)));
            image.anchorOffsetX = image.width / 2;
            image.anchorOffsetY = image.height / 2;
            image.x = sp.width / 2;
            image.y = sp.height / 2 + 7;
            sp.addChild(image);
            sp.scaleX = Global.getHeroCardScale();
            sp.scaleY = sp.scaleX;
            return sp;
        }

        private static getTextureName(card: MjCard): string {
            var s: string = "";
            if(card==null){
                log("error")
            }
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
        public static getBackCard(): Sprite {
            var sp: Sprite = new Sprite();
            var back: Bitmap = new Bitmap(Global.getRes("pai_xia_fapai"));
            sp.addChild(back);
            sp.scaleX = sp.scaleY = Global.getHeroCardScale();
            return sp;
        }

        public static getDiscardCard(card: MjCard): CardSprite {
            var sp: CardSprite = new CardSprite(card);
            var back: Bitmap = new Bitmap(Global.getRes("pai_xia3"));
            sp.addChild(back);
            back.width = 48;
            back.height = 64;
            var image: Bitmap = new Bitmap(Global.getRes(Asset.getTextureName(card)));
            image.anchorOffsetX = image.width / 2;
            image.anchorOffsetY = image.height / 2;
            image.x = sp.width / 2;
            image.y = sp.height / 2 - 5;
            image.scaleX = image.scaleY = 0.65;
            sp.addChild(image);
            sp.scaleX = sp.scaleY = Global.getDiscardCardScale();
            return sp;
        }

        /**
         * 下方
         * @param card
         * @return
         */
        public static getFreezeCardMcDown(card: MjCard): CardSprite {
            var sp: CardSprite = new CardSprite(card);
            var back: Bitmap = new Bitmap(Global.getRes("pai_xia3"));
            sp.addChild(back);
            var image: Bitmap = new Bitmap(Global.getRes(Asset.getTextureName(card)));
            image.anchorOffsetX = image.width / 2;
            image.anchorOffsetY = image.height / 2;
            image.x = sp.width / 2;
            image.y = sp.height / 2 - 5;
            image.scaleX = image.scaleY = 0.8;
            sp.addChild(image);
            sp.scaleX = sp.scaleY = Global.getHeroCardScale();
            return sp;
        }

        /**
         * 下方反牌
         * @param card
         * @return
         */
        public static getFreezeCardBackMcDown(card: MjCard): Sprite {
            var sp: CardSprite = new CardSprite(card);
            var back: Bitmap = new Bitmap(Global.getRes("pai_xia_fapai"));
            sp.addChild(back);
            sp.scaleX = sp.scaleY = Global.getHeroCardScale() * .86;
            return sp;
        }

    }
}
