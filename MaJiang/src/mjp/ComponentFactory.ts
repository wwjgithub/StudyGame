namespace game {
    import Sprite = egret.Sprite;

    export class ComponentFactory {

        public static other_scale: number = .65;

        public static createAnGangForOther(card: MjCard): MjComponent {
            var mc: MjComponent = ComponentFactory.createAnGang(card);
            var mc4: Sprite = Asset.getFreezeCardBackMcDown(card);
            mc4.x = mc4.width;
            mc4.y = -14;
            mc.addChild(mc4);
            mc.scaleX = mc.scaleY = ComponentFactory.other_scale;
            return mc;
        }

        public static createAnGangForHero(card: MjCard): MjComponent {
            var mc: MjComponent = ComponentFactory.createAnGang(card);
            var mc4: Sprite = Asset.getFreezeCardMcDown(card);
            mc4.x = mc4.width;
            mc4.y = -14;
            mc.addChild(mc4);
            return mc;
        }

        private static createAnGang(card: MjCard): MjComponent {
            var mc1: Sprite = Asset.getFreezeCardBackMcDown(card);
            var mc2: Sprite = Asset.getFreezeCardBackMcDown(card);
            mc2.x = mc1.width;
            var mc3: Sprite = Asset.getFreezeCardBackMcDown(card);
            mc3.x = mc1.width * 2;
            var mc: MjComponent = new MjComponent();
            mc.card = card;
            mc.addChild(mc1);
            mc.addChild(mc2);
            mc.addChild(mc3);
            return mc;
        }

        public static createMingGangForHero(card: MjCard): MjComponent {
            var mc: MjComponent = ComponentFactory.createPengForHero(card);
            var mc4: Sprite = Asset.getFreezeCardMcDown(card);
            mc4.x = mc4.width;
            mc4.y = -14;
            mc.addChild(mc4);
            mc.card = card;
            return mc;
        }

        public static createMingGangForOther(card: MjCard): MjComponent {
            var mcc: MjComponent = ComponentFactory.createMingGangForHero(card);
            mcc.scaleX = mcc.scaleY = ComponentFactory.other_scale;
            return mcc;
        }

        public static createPengForHero(card: MjCard): MjComponent {
            var mc1: Sprite = Asset.getFreezeCardMcDown(card);
            var mc2: Sprite = Asset.getFreezeCardMcDown(card);
            mc2.x = mc1.width;
            var mc3: Sprite = Asset.getFreezeCardMcDown(card);
            mc3.x = mc1.width * 2;
            var mc: MjComponent = new MjComponent();
            mc.card = card;
            mc.addChild(mc1);
            mc.addChild(mc2);
            mc.addChild(mc3);
            return mc;
        }

        public static createPengForOther(card: MjCard): MjComponent {
            var mc: MjComponent = ComponentFactory.createPengForHero(card);
            mc.scaleX = mc.scaleY = ComponentFactory.other_scale;
            return mc;
        }

        public static createChiForHero(cc: Array<MjCard>, target: MjCard = null): MjComponent {
            var cards: Array<MjCard> = cc.slice();
            cards.sort(MjEngine.sortCardByNum);
            var mc1: Sprite = Asset.getFreezeCardMcDown(cards[0]);
            var mc2: Sprite = Asset.getFreezeCardMcDown(cards[1]);
            mc2.x = mc1.width;
            var mc3: Sprite = Asset.getFreezeCardMcDown(cards[2]);
            mc3.x = mc1.width * 2;
            if (target != null) {
                //todo:
                /*var filter: ColorMatrixFilter = new ColorMatrixFilter();
                filter.adjustBrightness(-0.5);
                if (!cards[0].equal(target)) {
                    mc1.filter = filter;
                }
                if (!cards[1].equal(target)) {
                    mc2.filter = filter;
                }
                if (!cards[2].equal(target)) {
                    mc3.filter = filter;
                }*/
            }
            var mc: MjComponent = new MjComponent();
            mc.chiCards = cards;
            mc.addChild(mc1);
            mc.addChild(mc2);
            mc.addChild(mc3);
            return mc;
        }

        public static createChiForOther(cards: Array<MjCard>): MjComponent {
            cards.sort(MjEngine.sortCardByNum);
            var mc: MjComponent = ComponentFactory.createChiForHero(cards);
            mc.scaleX = mc.scaleY = ComponentFactory.other_scale;
            return mc;
        }
    }
}