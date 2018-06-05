/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 12:31
 */
module mjp {
    //import assets.Asset;

    //import engine.MjEngine;
    //import engine.vo.MjCard;
    //import engine.vo.MjChiInfo;
    //import engine.vo.MjPlayerThinkStatus;
    //import engine.vo.MjTingInfo;

    //import flash.geom.Point;

    //import starling.core.Starling;
    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;

    //import utils.util.MethodUtil;

    export class PlayerHero extends IPlayer {
        private tempBackCard:Sprite;
        private cancelTingBtn:Sprite;
        private showMc:IShowMcForHero;
        private moneyMc:MoneyMc;

        /**
         * 原点在左下角
         */
        constructor() {
            super();
            y = UserConst.size.y;
            //
            showCardsMc = new IShowMcForHero(this);
            this.showMc = showCardsMc as IShowMcForHero;
            showCardsMc.initDown();
            showCardsMc.x = (UserConst.size.x - (UserConst.getHeroCardScale() * UserConst.show_card_width * 14 + 10)) / 2;
            showCardsMc.y = -110;
            showCardsMc.addEventListener(MjEvent.DISCARD_SHOWMC, onDiscard);
            showCardsMc.addEventListener(MjEvent.TING_SHOWMC, onOptTing);
            //
            discardCardsMc.initDown();
            discardCardsMc.x = (UserConst.size.x - IDiscardMc.discardCardSize.width * IDiscardMc.CNT_HOR) / 2;
            discardCardsMc.y = -(UserConst.size.y - IDiscardMc.YY - (IDiscardMc.CNT_VER - 1) * IDiscardMc.discardCardSize.height);
            addChild(discardCardsMc);
            //
            addChild(showCardsMc);
            showCardsMc.enable = false;
        }

        public mingGang(card:MjCard) {
            super.mingGang(card);
            showMc.showHeroMingGangAnim(card, core);
        }

        public buGang(card:MjCard) {
            super.buGang(card);
            showMc.showHeroBuGangAnim(card, core);
        }

        public anGang(card:MjCard) {
            super.anGang(card);
            showMc.showHeroAnGangAnim(card, core);
            if (!card.equal(core.lastFetchCard)) {
                showMc.updateShowCards();
            }
        }

        public peng(card:MjCard) {
            super.peng(card);
            showMc.showHeroPengAnim(card, core);
        }

        public chi(mjChiInfo:MjChiInfo) {
            super.chi(mjChiInfo);
            showMc.showHeroChiAnim(mjChiInfo, core);
        }

        /**
         * 别人打牌,我可能的操作
         * @param card
         * @param isPrevDiscard
         * @param callBack  MjEvent
         */
        public decideOnOtherDiscard(card:MjCard, isPrevDiscard:boolean, callBack) {
            //吃,碰,明杠,暗杠,补杠,报听,胡,自摸
            var status:MjPlayerThinkStatus = MjEngine.thinkOptAfterOtherDiscard(core, card, isPrevDiscard);
            if (status.hasTrue()) {
                var func = function (...arg) {
                    var e:MjEvent = new MjEvent(arg[arg.length - 1], false, arg[0]);
                    callBack(e);
                };
                opt.update(this, status, hu,
                        MethodUtil.create(func, MjEvent.PASS),
                        null,
                        MethodUtil.create(func, MjEvent.CHI),
                        MethodUtil.create(func, MjEvent.PENG),
                        MethodUtil.create(func, MjEvent.MINGGANG),
                        null,
                        null
                );
            } else {
                callBack(new MjEvent(MjEvent.PASS));
            }
        }

        private onDiscard(event:Event) {
            showCardsMc.enable = false;
            opt.clear();
            //删除点的牌
            var cardSprite:CardSprite = CardSprite(event.data);
            ObjUtil.removeMe(cardSprite);
            //移动到打牌区
            super.showDiscardAnim(cardSprite.card, cardSprite.x, cardSprite.y);
            //如果刚摸了牌.就排下序
            if (core.lastFetchCard != null) {
                core.insertLastCard();
            }
            core.onDiscard(cardSprite.card);
            if (core.tingInfo == null) {
                //不听牌时才显示动画.因为听牌后牌型都固定了
                showMc.resortShowCards(core, true);
            } else {
            }
            core.lastFetchCard = null;
        }

        /**
         * 别人补杠时,英雄能胡.问胡不胡
         * @param mjCard
         * @param passFunc
         */
        public decideOnOtherBuGang(mjCard:MjCard, passFunc) {
            var status:MjPlayerThinkStatus = MjEngine.thinkOptOnOtherBuGang(core, mjCard);
            if (status.hasTrue()) {
                opt.update(this, status, hu, passFunc);
            } else {
                passFunc();
            }
        }

        public fetch(reverse:boolean) {
            super.fetch(reverse);
            if (core.tingInfo != null) {
                //听后,只能暗杠和补杠.暗杠如果改变了之前听的牌,也不能杠
                var status:MjPlayerThinkStatus = MjEngine.thinkOptFetchAfterTing(core, reverse);
                if (status.hasTrue()) {
                    opt.update(this, status, zimo, showCardsMc.discardLastFetchCard, null, null, null, null, anGang, wantBuGang);
                } else {
                    juggler.delayCall(showCardsMc.discardLastFetchCard, .5);
                }
            } else {
                //没听时,自己摸牌.可能暗杠,补杠,自摸,报听
                var st:MjPlayerThinkStatus = MjEngine.thinkOptFetch(core, reverse);
                if (st.hasTrue()) {
                    opt.update(this, st, zimo, null, selectTingInfo, null, null, null, anGang, wantBuGang);
                }
                juggler.delayCall(showCardsMc.setEnable, .4);
            }
        }

        private waitFetchAnim(reverse:boolean) {
            var status:MjPlayerThinkStatus;
            if (core.tingInfo != null) {
                //听后,只能暗杠和补杠.暗杠如果改变了之前听的牌,也不能杠
                status = MjEngine.thinkOptFetchAfterTing(core, reverse);
                if (status.hasTrue()) {
                    if (status.huInfo != null) {
                        zimo(status.huInfo);
                        return;
                    }
                    if (status.anGangCards.length > 0) {
                        anGang(status.anGangCards[0]);
                        return
                    }
                    if (status.buGangCards.length > 0) {
                        wantBuGang(status.buGangCards[0]);
                        return;
                    }
                } else {
                    decideDiscard(core.lastFetchCard);
                }
                return;
            } else {
                status = MjEngine.thinkOptFetch(core, reverse);
                if (status.hasTrue()) {
                    if (status.huInfo != null) {
                        zimo(status.huInfo);
                        return;
                    }
                    if (status.anGangCards.length > 0) {
                        anGang(status.anGangCards[0]);
                        return
                    }
                    if (status.buGangCards.length > 0) {
                        wantBuGang(status.buGangCards[0]);
                        return;
                    }
                    if (status.isTing) {
                        return;
                    }
                } else {
                    decideDiscard(MjEngine.getDiscardCard(core.cloneShowCards()));
                }
            }
        }

        private decideDiscard(target:MjCard) {
            var p:Point = showCardsMc.fetchCardPosition.clone();
            core.onDiscard(target);
            showCards(true);
            super.showDiscardAnim(target, p.x, p.y);
        }

        /**
         * 吃碰牌后,有可能听.这时显示
         */
        public decideAfterOpt() {
            var status:MjPlayerThinkStatus = MjEngine.thinkOptAfterOpt(core);
            if (status.hasTrue()) {
                opt.update(this, status, null, null, selectTingInfo);
            }
            showCardsMc.enable = true;
        }

        public beforeSortCards() {
            showCardsMc.visible = false;
            tempBackCard = new Sprite();
            tempBackCard.x = showCardsMc.x;
            tempBackCard.y = showCardsMc.y;
            addChild(tempBackCard);
            for (var i:number = 0; i < 13; i++) {
                var mc:Sprite = Asset.getBackCard();
                mc.x = mc.width * i;
                tempBackCard.addChild(mc);
            }
            juggler.delayCall(showSortCards, 0.4);
        }

        private showSortCards() {
            removeChild(tempBackCard);
            showCards(true);
            showCardsMc.visible = true;
        }

        public selectTingInfo() {
            var p:Point = new Point(10, UserConst.size.y / 4 * 3);
            p = this.globalToLocal(p);
            cancelTingBtn = new Sprite();
            var img:Image = new Image(Asset.assetManager.getTexture("ting_cancel"));
            cancelTingBtn.addChild(img);
            cancelTingBtn.x = p.x;
            cancelTingBtn.y = p.y - 40;
            addChild(cancelTingBtn);
            cancelTingBtn.addEventListener(TouchEvent.TOUCH, onCancel);
            showMc.startSelectTing(MjEngine.getTingInfos(core.cloneShowCards()));
        }

        private onCancel(event:TouchEvent) {
            var mc:Sprite = Sprite(event.currentTarget);
            if (event.getTouch(mc, TouchPhase.ENDED)) {
                showMc.stopSelectTing();
                ObjUtil.removeMe(mc);
            }
        }

        private onOptTing(event:MjEvent) {
            ObjUtil.removeMe(cancelTingBtn);
            cancelTingBtn = null;
            core.sort();
            showMc.updateHeroShowOnly(core);
            ting(MjTingInfo(event.data))
        }

        public updateIcon(isZhuang:boolean) {
            super.isZhuang = isZhuang;
            if (moneyMc != null) {
                removeChild(moneyMc);
                moneyMc = null;
            }
            moneyMc = new MoneyMc(playerInfo.money);
            moneyMc.x = 50;
            moneyMc.y = showMc.y - moneyMc.height + 16;
            addChild(moneyMc);
            if (isZhuang) {
                zhuangMc.x = moneyMc.x - 30;
                zhuangMc.y = moneyMc.y + 10;
                addChild(zhuangMc);
            }
        }
    }
}
