namespace game {
    import Sprite = egret.Sprite;
    import Point = egret.Point;
    import Bitmap = egret.Bitmap;

    export class PlayerHero extends IPlayer {
        private tempBackCard: egret.Sprite;
        private showMc: IShowMcForHero;
        private cancelTingBtn: Sprite;
        private decideCallBack: Function;

        constructor() {
            super();

            this.y = Global.stage_h;
            //
            this.showCardsMc = new IShowMcForHero(this);
            this.showMc = this.showCardsMc as IShowMcForHero;
            this.showCardsMc.initDown();
            this.showCardsMc.x = (Global.stage_w - (Global.getHeroCardScale() * Global.show_card_width * 14 + 10)) / 2;
            this.showCardsMc.y = -110;
            this.showCardsMc.addEventListener(MjEvent.DISCARD_SHOWMC, this.onDiscard, this);
            this.showCardsMc.addEventListener(MjEvent.TING_SHOWMC, this.onOptTing, this);
            //
            this.discardCardsMc.initDown();
            this.discardCardsMc.x = (Global.stage_w - IDiscardMc.discardCardSize.width * IDiscardMc.CNT_HOR) / 2;
            this.discardCardsMc.y = -(Global.stage_h - IDiscardMc.YY - (IDiscardMc.CNT_VER - 1) * IDiscardMc.discardCardSize.height);
            this.addChild(this.discardCardsMc);
            //
            this.addChild(this.showCardsMc);
            this.showCardsMc.enable = false;
        }

        private moneyMc: MoneyMc;

        /**
         * 吃碰牌后,有可能听.这时显示
         */
        public decideAfterOpt(): void {
            var status: MjPlayerThinkStatus = MjEngine.thinkOptAfterOpt(this.core);
            if (status.hasTrue()) {
                this.opt.update(this, status, null, null, this.selectTingInfo);
            }
            this.showCardsMc.enable = true;
        }

        public selectTingInfo(): void {
            var p: Point = new Point(10, Global.stage_h / 4 * 3);
            p = this.globalToLocal(p.x, p.y);
            this.cancelTingBtn = new Sprite();
            var img: Bitmap = new Bitmap(Global.getRes("ting_cancel"));
            this.cancelTingBtn.addChild(img);
            this.cancelTingBtn.x = p.x;
            this.cancelTingBtn.y = p.y - 40;
            this.addChild(this.cancelTingBtn);
            this.cancelTingBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onCancel, this);
            this.showMc.startSelectTing(MjEngine.getTingInfos(this.core.cloneShowCards()));
        }

        public fetch(reverse: boolean): void {
            super.fetch(reverse);
            if (this.core.tingInfo != null) {
                //听后,只能暗杠和补杠.暗杠如果改变了之前听的牌,也不能杠
                var status: MjPlayerThinkStatus = MjEngine.thinkOptFetchAfterTing(this.core, reverse);
                if (status.hasTrue()) {
                    this.opt.update(this, status, this.zimo, this.showCardsMc.discardLastFetchCard, null, null, null, null, this.anGang, this.wantBuGang);
                } else {
                    egret.setTimeout(this.showCardsMc.discardLastFetchCard, this.showCardsMc, 500);
                }
            } else {
                //没听时,自己摸牌.可能暗杠,补杠,自摸,报听
                var st: MjPlayerThinkStatus = MjEngine.thinkOptFetch(this.core, reverse);
                if (st.hasTrue()) {
                    this.opt.update(this, st, this.zimo, null, this.selectTingInfo, null, null, null, this.anGang, this.wantBuGang);
                }
                egret.setTimeout(this.showCardsMc.setEnable, this.showCardsMc, 400);
            }
        }

        public hu(info: HuInfo): void {
            this.dispatchEvent(new MjEvent(MjEvent.HU, false, false, info));
        }

        public zimo(info: HuInfo): void {
            this.dispatchEvent(new MjEvent(MjEvent.HU_ZIMO, false, false, info))
        }

        private onCancel(event: egret.TouchEvent): void {
            var mc: Sprite = <Sprite>(event.currentTarget);
            this.showMc.stopSelectTing();
            Global.removeMe(mc);
        }

        public updateIcon(isZhuang: boolean): void {
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

        private onOptTing(event: MjEvent): void {
            Global.removeMe(this.cancelTingBtn);

            this.cancelTingBtn = null;
            this.core.sort();
            this.showMc.updateHeroShowOnly(this.core);
            this.ting(<MjTingInfo>(event.data))
        }

        private onDiscard(event: egret.Event): void {
            this.showCardsMc.enable = false;
            this.opt.clear();
            //删除点的牌
            var cardSprite: CardSprite = <CardSprite>(event.data);
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
         * 别人补杠时,英雄能胡.问胡不胡
         * @param mjCard
         * @param passFunc
         */
        public decideOnOtherBuGang(mjCard:MjCard, passFunc:Function):void {
            var status:MjPlayerThinkStatus = MjEngine.thinkOptOnOtherBuGang(this.core, mjCard);
            if (status.hasTrue()) {
                this.opt.update(this, status, this.hu.bind(this), passFunc);
            } else {
                passFunc();
            }
        }

        /**
         * 别人打牌,我可能的操作
         * @param card
         * @param isPrevDiscard
         * @param callBack  MjEvent
         */
        public decideOnOtherDiscard(card: MjCard, isPrevDiscard: Boolean, callBack: Function): void {
            //吃,碰,明杠,暗杠,补杠,报听,胡,自摸
            this.decideCallBack=callBack;
            var status: MjPlayerThinkStatus = MjEngine.thinkOptAfterOtherDiscard(this.core, card, isPrevDiscard);
            if (status.hasTrue()) {
                this.opt.update(this, status, this.hu.bind(this),
                    this.optDecide.bind(this,MjEvent.PASS),
                    null,
                    this.optDecide.bind(this,MjEvent.CHI),
                    this.optDecide.bind(this,MjEvent.PENG),
                    this.optDecide.bind(this,MjEvent.MINGGANG),
                    null,
                    null
                );
            } else {
                callBack(new egret.Event(MjEvent.PASS));
            }
        }

        private optDecide(decide:string,data:any):void{
            this.decideCallBack(new egret.Event(decide, false, false, data));
        }

        public mingGang(card:MjCard):void {
            super.mingGang(card);
            this.showMc.showHeroMingGangAnim(card, this.core);
        }

        private decideDiscard(target:MjCard):void {
            var p:Point = this.showCardsMc.fetchCardPosition.clone();
            this.core.onDiscard(target);
            this.showCards(true);
            super.showDiscardAnim(target, p.x, p.y);
        }

         public  buGang(card:MjCard):void {
            super.buGang(card);
            this.showMc.showHeroBuGangAnim(card, this.core);
        }

         public  anGang(card:MjCard):void {
            super.anGang(card);
            this.showMc.showHeroAnGangAnim(card, this.core);
            if (!card.equal(this.core.lastFetchCard)) {
                this.showMc.updateShowCards();
            }
        }

         public  peng(card:MjCard):void {
            super.peng(card);
            this.showMc.showHeroPengAnim(card, this.core);
        }

         public  chi(mjChiInfo:MjChiInfo):void {
            super.chi(mjChiInfo);
            this.showMc.showHeroChiAnim(mjChiInfo, this.core);
        }


    }
}
