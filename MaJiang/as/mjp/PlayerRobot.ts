/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/28
 * Time: 17:54
 */
module mjp {
    //import engine.MjEngine;
    //import engine.vo.MjCard;
    //import engine.vo.MjChiInfo;
    //import engine.vo.MjPlayerThinkStatus;
    //import engine.vo.MjTingInfo;

    //import flash.geom.Point;

    //import starling.display.Sprite;
    //import starling.events.Event;

    //import utils.util.MethodUtil;

    export class PlayerRobot extends IPlayer {
        constructor() {
            super();
            showCardsMc.addEventListener(MjEvent.DISCARD_SHOWMC, onDiscard);
            if (UserConst.AI) {
                showCardsMc.enable = false;
            } else {
                showCardsMc.enable = true;
            }
            showCardsMc.addEventListener(MjEvent.FETCH_COMPLETE, onFetchComplete);
        }

        private onFetchComplete(event:MjEvent) {
            juggler.delayCall(waitFetchAnim, .1 * StorageData.getSpeedPercent(), lastFetchIsRevers);
        }

        private waitFetchAnim(reverse:boolean) {
            var status:MjPlayerThinkStatus;
            if (core.tingInfo != null) {
                //听后,只能暗杠和补杠.暗杠如果改变了之前听的牌,也不能杠
                status = MjEngine.thinkOptFetchAfterTing(core, reverse);
                if (UserConst.AI) {
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
                } else {
                    if (status.hasTrue()) {
                        opt.update(this, status, zimo, null, null, null, null, null, anGang, wantBuGang);
                    } else {
                        juggler.delayCall(showCardsMc.discardLastFetchCard, .5);
                    }
                }
                return;
            } else {
                status = MjEngine.thinkOptFetch(core, reverse);
                if (UserConst.AI) {
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
                            aiTing();
                            return;
                        }
                    } else {
                        decideDiscard(MjEngine.getDiscardCard(core.cloneShowCards()));
                    }
                } else {
                    if (status.hasTrue()) {
                        opt.update(this, status, zimo, null, aiTing, null, null, null, anGang, wantBuGang);
                    } else {
                    }
                }
            }
        }

        private aiTing() {
            //为了效率,将电脑只听头一种胡法.将来再考虑
            var infos:Vector.<MjTingInfo> = MjEngine.getTingInfos(core.cloneShowCards(), 1);
            ting(infos[0]);
            juggler.delayCall(decideDiscard, 2, infos[0].target);
        }

        /**
         * 挑听牌数多的听.
         * @param info1
         * @param info2
         */
        private static function sortTingInfos(info1:MjTingInfo, info2:MjTingInfo):number {
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
        public decideAfterOpt() {
            var status:MjPlayerThinkStatus = MjEngine.thinkOptAfterOpt(core);
            if (UserConst.AI) {
                if (status.isTing) {
                    aiTing();
                } else {
                    decideDiscard(MjEngine.getDiscardCard(core.cloneShowCards()));
                }
            } else {
                if (status.hasTrue()) {
                    opt.update(this, status, null, null, aiTing);
                }
            }
        }

        private decideDiscard(target:MjCard) {
            var p:Point = showCardsMc.fetchCardPosition.clone();
            core.onDiscard(target);
            showCards(true);
            super.showDiscardAnim(target, p.x, p.y);
        }

        private onDiscard(event:Event) {
            opt.clear();
            var cardSprite:CardSprite = CardSprite(event.data);
            decideDiscard(cardSprite.card);
        }

        /**
         * 别人打牌,我可能的操作
         * @param card
         * @param isPrevDiscard
         * @param callBack  MjEvent,card|...
         */
        public decideOnOtherDiscard(card:MjCard, isPrevDiscard:boolean, callBack) {
            //吃,碰,明杠,暗杠,补杠,报听,胡,自摸
            if (UserConst.AI) {
                var status:MjPlayerThinkStatus = MjEngine.thinkOptAfterOtherDiscardAi(core, card, isPrevDiscard);
                if (status.hasTrue()) {
                    if (status.huInfo != null) {
                        hu(status.huInfo);
                        return;
                    }
                    if (status.mingGangCards.length > 0) {
                        callBack(new MjEvent(MjEvent.MINGGANG, false, card));
                        return
                    }
                    if (status.pengCards.length > 0) {
                        callBack(new MjEvent(MjEvent.PENG, false, card));
                        return;
                    }
                    if (status.chiInfos.length > 0) {
                        callBack(new MjEvent(MjEvent.CHI, false, status.chiInfos[0]));
                        return;
                    }
                } else {
                    callBack(new MjEvent(MjEvent.PASS));
                }
            } else {
                var status1:MjPlayerThinkStatus = MjEngine.thinkOptAfterOtherDiscard(core, card, isPrevDiscard);
                if (status1.hasTrue()) {
                    var func = function (...arg) {
                        var e:MjEvent = new MjEvent(arg[arg.length - 1], false, arg[0]);
                        callBack(e);
                    };
                    opt.update(this, status1, hu,
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
        }

        public decideOnOtherBuGang(mjCard:MjCard, passFunc) {
            var status:MjPlayerThinkStatus = MjEngine.thinkOptOnOtherBuGang(core, mjCard);
            if (status.hasTrue()) {
                hu(status.huInfo);
            } else {
                passFunc();
            }
        }

        public peng(card:MjCard) {
            super.peng(card);
            showCards(true);
        }

        public chi(mjChiInfo:MjChiInfo) {
            super.chi(mjChiInfo);
            showCards(true);
        }

        public mingGang(card:MjCard) {
            super.mingGang(card);
            showCards(true);
        }

        public anGang(card:MjCard) {
            super.anGang(card);
            showCards(true);
        }

        public buGang(card:MjCard) {
            super.buGang(card);
            showCards(true);
        }

        public static getHeadTip(playerInfo:PlayerInfo):Sprite {
            var sp:Sprite = new Sprite();
            return sp;
        }
    }
}
