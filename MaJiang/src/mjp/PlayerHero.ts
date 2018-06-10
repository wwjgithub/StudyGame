namespace game {
    import Sprite = egret.Sprite;

    export class PlayerHero extends IPlayer {
        private tempBackCard: egret.Sprite;
        private showMc:IShowMcForHero;
        private cancelTingBtn:Sprite;

        constructor() {
            super();

            this.y = Global.stage_h;
            //
            this.showCardsMc = new IShowMcForHero(this);
            this.showMc = this.showCardsMc as IShowMcForHero;
            this.showCardsMc.initDown();
            this.showCardsMc.x = (Global.stage_w - (Global.getHeroCardScale() * Global.show_card_width * 14 + 10)) / 2;
            this.showCardsMc.y = -110;
            this.showCardsMc.addEventListener(MjEvent.DISCARD_SHOWMC, this.onDiscard,this);
            this.showCardsMc.addEventListener(MjEvent.TING_SHOWMC, this.onOptTing,this);
            //
            this.discardCardsMc.initDown();
            this.discardCardsMc.x = (Global.stage_w - IDiscardMc.discardCardSize.width * IDiscardMc.CNT_HOR) / 2;
            this.discardCardsMc.y = -(Global.stage_h - IDiscardMc.YY - (IDiscardMc.CNT_VER - 1) * IDiscardMc.discardCardSize.height);
            this.addChild(this.discardCardsMc);
            //
            this.addChild(this.showCardsMc);
            this.showCardsMc.enable = false;
        }
        private moneyMc:MoneyMc;

        public updateIcon(isZhuang:boolean):void {
            this.isZhuang = isZhuang;
            if (this.moneyMc != null) {
                this.removeChild(this.moneyMc);
                this.moneyMc = null;
            }
            this.moneyMc = new MoneyMc(this.playerInfo.money);
            this.moneyMc.x = 50;
            this.moneyMc.y = this.showMc.y - this.moneyMc.height + 16;
            this.addChild(this.moneyMc);
            if (isZhuang) {
                IPlayer.zhuangMc.x = this.moneyMc.x - 30;
                IPlayer.zhuangMc.y = this.moneyMc.y + 10;
                this.addChild(IPlayer.zhuangMc);
            }
        }

        private onOptTing(event:MjEvent):void {
            Global.removeMe(this.cancelTingBtn);

            this.cancelTingBtn = null;
            this.core.sort();
            this.showMc.updateHeroShowOnly(this.core);
            this.ting(<MjTingInfo>(event.data))
        }

        private onDiscard(event:egret.Event):void {
            this.showCardsMc.enable = false;
            this.opt.clear();
            //删除点的牌
            var cardSprite:CardSprite = <CardSprite>(event.data);
            Global.removeMe(cardSprite);
            //移动到打牌区
            super.showDiscardAnim(cardSprite.card, cardSprite.x, cardSprite.y);
            //如果刚摸了牌.就排下序
            if (this.core.lastFetchCard != null) {
                this.core.insertLastCard();
            }
            this.core.onDiscard(cardSprite.card);
            if (this.core.tingInfo == null) {
                //不听牌时才显示动画.因为听牌后牌型都固定了
                this.showMc.resortShowCards(this.core, true);
            } else {
            }
            this.core.lastFetchCard = null;
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
