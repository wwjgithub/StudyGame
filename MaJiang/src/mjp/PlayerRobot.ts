namespace game {
    import Point = egret.Point;
    import Sprite = egret.Sprite;

    export class PlayerRobot extends IPlayer {
        private decideCallBack: Function;

        constructor() {
            super();
            if (Global.AI) {
                this.showCardsMc.enable = false;
            } else {
                this.showCardsMc.enable = true;
            }

            this.showCardsMc.addEventListener(MjEvent.DISCARD_SHOWMC, this.onDiscard, this);
            this.showCardsMc.addEventListener(MjEvent.FETCH_COMPLETE, this.onFetchComplete, this);
        }

        private onFetchComplete(event: MjEvent): void {
            egret.setTimeout(this.waitFetchAnim, this, 100 * StorageData.getSpeedPercent(), this.lastFetchIsRevers);
        }

        private waitFetchAnim(reverse: Boolean): void {
            var status: MjPlayerThinkStatus;
            if (this.core.tingInfo != null) {
                //听后,只能暗杠和补杠.暗杠如果改变了之前听的牌,也不能杠
                status = MjEngine.thinkOptFetchAfterTing(this.core, reverse);
                if (Global.AI) {
                    if (status.hasTrue()) {
                        if (status.huInfo != null) {
                            this.zimo(status.huInfo);
                            return;
                        }
                        if (status.anGangCards.length > 0) {
                            this.anGang(status.anGangCards[0]);
                            return
                        }
                        if (status.buGangCards.length > 0) {
                            this.wantBuGang(status.buGangCards[0]);
                            return;
                        }
                    } else {
                        this.decideDiscard(this.core.lastFetchCard);
                    }
                } else {
                    if (status.hasTrue()) {
                        this.opt.update(this, status, this.zimo, null, null, null, null, null, this.anGang, this.wantBuGang);
                    } else {
                        egret.setTimeout(this.showCardsMc.discardLastFetchCard,this.showCardsMc, 500);
                    }
                }
                return;
            } else {
                status = MjEngine.thinkOptFetch(this.core, reverse);
                if (Global.AI) {
                    if (status.hasTrue()) {
                        if (status.huInfo != null) {
                            this.zimo(status.huInfo);
                            return;
                        }
                        if (status.anGangCards.length > 0) {
                            this.anGang(status.anGangCards[0]);
                            return
                        }
                        if (status.buGangCards.length > 0) {
                            this.wantBuGang(status.buGangCards[0]);
                            return;
                        }
                        if (status.isTing) {
                            this.aiTing();
                            return;
                        }
                    } else {
                        this.decideDiscard(MjEngine.getDiscardCard(this.core.cloneShowCards()));
                    }
                } else {
                    if (status.hasTrue()) {
                        this.opt.update(this, status, this.zimo, null, this.aiTing, null, null, null, this.anGang, this.wantBuGang);
                    } else {
                    }
                }
            }
        }

        private aiTing(): void {
            //为了效率,将电脑只听头一种胡法.将来再考虑
            var infos: Array<MjTingInfo> = MjEngine.getTingInfos(this.core.cloneShowCards(), 1);
            this.ting(infos[0]);
            egret.setTimeout(this.decideDiscard, this, 200, infos[0].target);
        }

        /**
         * 挑听牌数多的听.
         * @param info1
         * @param info2
         */
        private static sortTingInfos(info1: MjTingInfo, info2: MjTingInfo): number {
            if (info1.tingCards.length > info2.tingCards.length) {
                return -1;
            }
            if (info1.tingCards.length < info2.tingCards.length) {
                return 1;
            }
            return 0;
        }

        /**
         * Ai选择打哪张牌
         * 操作后还可以听
         */
        public decideAfterOpt(): void {
            var status: MjPlayerThinkStatus = MjEngine.thinkOptAfterOpt(this.core);
            if (Global.AI) {
                if (status.isTing) {
                    this.aiTing();
                } else {
                    this.decideDiscard(MjEngine.getDiscardCard(this.core.cloneShowCards()));
                }
            } else {
                if (status.hasTrue()) {
                    this.opt.update(this, status, null, null, this.aiTing);
                }
            }
        }

        private decideDiscard(target: MjCard): void {
            var p: Point = this.showCardsMc.fetchCardPosition.clone();
            this.core.onDiscard(target);
            this.showCards(true);
            super.showDiscardAnim(target, p.x, p.y);
        }

        private onDiscard(event: egret.Event): void {
            this.opt.clear();
            var cardSprite: CardSprite = <CardSprite>(event.data);
            this.decideDiscard(cardSprite.card);
        }

        /**
         * 别人打牌,我可能的操作
         * @param card
         * @param isPrevDiscard
         * @param callBack  MjEvent,card|...
         */
        public decideOnOtherDiscard(card: MjCard, isPrevDiscard: Boolean, callBack: Function): void {
            //吃,碰,明杠,暗杠,补杠,报听,胡,自摸
            this.decideCallBack=callBack;
            if (Global.AI) {
                var status: MjPlayerThinkStatus = MjEngine.thinkOptAfterOtherDiscardAi(this.core, card, isPrevDiscard);
                if (status.hasTrue()) {
                    if (status.huInfo != null) {
                        this.hu(status.huInfo);
                        return;
                    }
                    if (status.mingGangCards.length > 0) {
                        callBack(new MjEvent(MjEvent.MINGGANG, false, false, card));
                        return
                    }
                    if (status.pengCards.length > 0) {
                        callBack(new MjEvent(MjEvent.PENG, false, false, card));
                        return;
                    }
                    if (status.chiInfos.length > 0) {
                        callBack(new MjEvent(MjEvent.CHI, false, false, status.chiInfos[0]));
                        return;
                    }
                } else {
                    callBack(new MjEvent(MjEvent.PASS));
                }
            } else {
                var status1:MjPlayerThinkStatus = MjEngine.thinkOptAfterOtherDiscard(this.core, card, isPrevDiscard);
                if (status1.hasTrue()) {
                    this.opt.update(this, status1, this.hu.bind(this),
                        this.optDecide.bind(this,MjEvent.PASS),
                        null,
                        this.optDecide.bind(this,MjEvent.CHI),
                        this.optDecide.bind(this,MjEvent.PENG),
                        this.optDecide.bind(this,MjEvent.MINGGANG),
                        null,
                        null
                    );
                } else {
                    callBack(new MjEvent(MjEvent.PASS));
                }
            }
        }

        private optDecide(decide:string,data:any):void{
            this.decideCallBack(new egret.Event(decide, false, false, data));
        }

        public decideOnOtherBuGang(mjCard: MjCard, passFunc: Function): void {
            var status: MjPlayerThinkStatus = MjEngine.thinkOptOnOtherBuGang(this.core, mjCard);
            if (status.hasTrue()) {
                this.hu(status.huInfo);
            } else {
                passFunc();
            }
        }

        public peng(card: MjCard): void {
            super.peng(card);
            this.showCards(true);
        }

        public chi(mjChiInfo: MjChiInfo): void {
            super.chi(mjChiInfo);
            this.showCards(true);
        }

        public mingGang(card: MjCard): void {
            super.mingGang(card);
            this.showCards(true);
        }

        public anGang(card: MjCard): void {
            super.anGang(card);
            this.showCards(true);
        }

        public buGang(card: MjCard): void {
            super.buGang(card);
            this.showCards(true);
        }

        public static getHeadTip(playerInfo: PlayerInfo): Sprite {
            var sp: Sprite = new Sprite();
            return sp;
        }
    }
}
