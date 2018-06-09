namespace game {
    import Sprite = egret.Sprite;

    export class PlayerHero extends IPlayer {
        private tempBackCard: egret.Sprite;

        constructor() {
            super();
        }

        public beforeSortCards(): void {
            this.showCardsMc.visible = false;
            this.tempBackCard = new Sprite();
            this.tempBackCard.x = this.showCardsMc.x;
            this.tempBackCard.y = this.showCardsMc.y;
            this.addChild(this.tempBackCard);
            for (var i = 0; i < 13; i++) {
                var mc: Sprite = Asset.getBackCard();
                mc.x = mc.width * i;
                this.tempBackCard.addChild(mc);
            }
            egret.setTimeout(this.showSortCards, this, 400);
        }

        private showSortCards(): void {
            this.removeChild(this.tempBackCard);
            this.showCards(true);
            this.showCardsMc.visible = true;
        }


        /**
         * 别人打牌,我可能的操作
         * @param card
         * @param isPrevDiscard
         * @param callBack  MjEvent
         */
        public decideOnOtherDiscard(card: MjCard, isPrevDiscard: Boolean, callBack: Function): void {
            //吃,碰,明杠,暗杠,补杠,报听,胡,自摸
            var status: MjPlayerThinkStatus = MjEngine.thinkOptAfterOtherDiscard(this.core, card, isPrevDiscard);
            if (status.hasTrue()) {
                var func: Function = function (...arg): void {
                    var e: egret.Event = new egret.Event(arg[arg.length - 1], false, arg[0]);
                    callBack(e);
                };
                this.opt.update(this, status, this.hu,
                    MethodUtil.create(func, MjEvent.PASS),
                    null,
                    MethodUtil.create(func, MjEvent.CHI),
                    MethodUtil.create(func, MjEvent.PENG),
                    MethodUtil.create(func, MjEvent.MINGGANG),
                    null,
                    null
                );
            } else {
                callBack(new egret.Event(MjEvent.PASS));
            }
        }
    }
}