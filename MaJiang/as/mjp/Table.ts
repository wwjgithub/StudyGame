/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 11:32
 */
module mjp {
    //import engine.MjConst;
    //import engine.MjEngine;
    //import engine.MjGenerator;
    //import engine.MjRound;
    //import engine.vo.HuInfo;
    //import engine.vo.MjCard;
    //import engine.vo.MjChiInfo;

    //import flash.desktop.NativeApplication;
    //import flash.events.KeyboardEvent;
    //import flash.geom.Point;
    //import flash.ui.Keyboard;
    //import flash.utils.Dictionary;

    //import starling.animation.Transitions;
    //import starling.animation.Tween;
    //import starling.display.DisplayObject;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;

    //import utils.util.MethodUtil;

    export class Table extends Sprite {
        private curPlayerInfos:Vector.<PlayerInfo>;
        private players:Vector.<IPlayer>;
        private _curPlayer:IPlayer;
        private pointer:Pointer;
        private playerHero:PlayerHero;
        private playerRight:PlayerRight;
        private playerUp:PlayerUp;
        private playerLeft:PlayerLeft;
        private anim:Anim;
        private decorate:Decorate;
        private quanFeng:number;
        private menFeng:number;
        public static RESULT:string = "Table.RESULT";
        private opt:Opt;

        constructor() {
            super();
            IPlayer.init();
            //
            decorate = new Decorate();
            decorate.x = UserConst.size.x / 2;
            decorate.y = UserConst.size.y / 2;
            addChild(decorate);
            //
            pointer = new Pointer();
            pointer.x = UserConst.size.x / 2;
            pointer.y = UserConst.size.y / 2;
            //4个玩家
            playerRight = new PlayerRight();
            addChild(playerRight);
            playerUp = new PlayerUp();
            addChild(playerUp);
            playerLeft = new PlayerLeft();
            addChild(playerLeft);
            playerHero = new PlayerHero();
            addChild(playerHero);
            playerHero.next = playerRight;
            playerRight.next = playerUp;
            playerUp.next = playerLeft;
            playerLeft.next = playerHero;
            //
            players = new Vector.<IPlayer>();
            players.push(playerHero);
            players.push(playerRight);
            players.push(playerUp);
            players.push(playerLeft);
            //
            addChild(pointer);
            //
            anim = new Anim();
            anim.init(players);
            addChild(anim);
            //
            opt = new Opt();
            opt.x = UserConst.size.x;
            opt.y = UserConst.size.y / 3 * 2;
            addChild(opt);
        }

        private showHeadTip(event:Event) {
            var player:IPlayer = IPlayer(event.currentTarget);
            var p:Point = new Point();
            p = player.head.localToGlobal(p);
            p = this.globalToLocal(p);
            var tip:UserImageTip = new UserImageTip(player);
            switch (player) {
                case playerLeft:
                    p.x += playerLeft.head.width;
                    p.y -= tip.height / 2;
                    break;
                case playerUp:
                    p.y += playerUp.head.height;
                    p.x -= tip.width / 2;
                    break;
                case playerRight:
                    p.x -= tip.width;
                    p.y -= tip.height / 2;
                    break;
            }
            tip.update(p);
            addChild(tip);
        }

        private getUsePlayers() {
            var ps = [];
            for (var i:number = 0; i < UserConst.playerInfos.length; i++) {
                var pp = UserConst.playerInfos[i];
                if (!StorageData.hasPlayer(pp[0])) {
                    ps.push(pp);
                }
            }
            if (ps.length < 3) {
                for (var j:number = 0; j < UserConst.playerInfos.length; j++) {
                    StorageData.removeOverPlayer(UserConst.playerInfos[j][0]);
                }
                ps = UserConst.playerInfos.slice();
            }
            for (var k:number = 0; k < ps.length; k++) {
                var array = ps[k];
                for (var mm:number = 0; mm < curPlayerInfos.length; mm++) {
                    var info:PlayerInfo = curPlayerInfos[mm];
                    if (array[0] == info.name) {
                        ps.splice(k, 1);
                        k--;
                        break;
                    }
                }
            }
            return ps;
        }

        private appendPlayer() {
            var ps = getUsePlayers();
            while (curPlayerInfos.length < 4) {
                var an = ps.splice(int(Math.random() * ps.length), 1)[0];
                var playerInfo:PlayerInfo = new PlayerInfo();
                playerInfo.name = an[0];
                playerInfo.sex = an[1];
                playerInfo.money = UserConst.INIT_MONEY;
                curPlayerInfos.push(playerInfo);
            }
        }

        public startFirst() {
            curPlayerInfos = StorageData.readLevelData();
            if (curPlayerInfos.length == 0) {
                var info:PlayerInfo = new PlayerInfo();
                info.name = "本家";
                info.sex = StorageData.hero_sex;
                info.money = UserConst.INIT_MONEY;
                curPlayerInfos.push(info);
                appendPlayer();
            } else {
                replacePlayer(false);
            }
            quanFeng = MjConst.type_feng_dong;
            menFeng = MjConst.type_feng_dong;
            playerHero.updateInfo(curPlayerInfos[0]);
            playerLeft.updateInfo(curPlayerInfos[1]);
            playerUp.updateInfo(curPlayerInfos[2]);
            playerRight.updateInfo(curPlayerInfos[3]);
            initGame();
        }

        private replacePlayer(change:boolean) {
            var ps = getUsePlayers();
            for (var i:number = 0; i < players.length; i++) {
                var player:IPlayer = players[i];
                var info1:PlayerInfo = player.playerInfo;
                if (player != playerHero && info1.money <= 0) {
                    StorageData.overPlayer(info1.name);
                    var info:PlayerInfo = new PlayerInfo();
                    var curs = ps.splice(int(Math.random() * ps.length), 1)[0];
                    info.name = curs[0];
                    info.sex = curs[1];
                    info.money = UserConst.INIT_MONEY;
                    info.win = 0;
                    info.lose = 0;
                    if (change) {
                        player.updateInfo(info);
                        player.showAnim();
                    }
                    curPlayerInfos[i] = info;
                }
            }
            StorageData.saveInfos(curPlayerInfos);
        }

        public startNext(huPlayer:IPlayer) {
            if (huPlayer != null && huPlayer.core.feng == MjRound.instance.menFeng) {
                //没流局并且是庄家和
            } else {
                //流局
                if (MjRound.instance.menFeng == MjConst.type_feng_bei) {
                    menFeng = MjConst.type_feng_dong;
                    if (quanFeng == MjConst.type_feng_bei) {
                        quanFeng = MjConst.type_feng_dong;
                    } else {
                        quanFeng++;
                    }
                } else {
                    menFeng++;
                }
            }
            initGame();
        }

        private initGame() {
            clear();
            addListener();
            pointer.visible = false;
            this.filter = null;
            if (MjRound.instance != null) {
                MjRound.instance.removeEventListener(MjRound.CNT_CHANGE, updateLastCardCnt);
            }
            //
            decorate.hideCardCnt();
            //
            MjRound.init(MjConst.playtype_4);
            MjRound.instance.addEventListener(MjRound.CNT_CHANGE, updateLastCardCnt);
            MjRound.instance.quanFeng = quanFeng;
            MjRound.instance.menFeng = menFeng;
            //
            playerHero.core = MjRound.instance.players[0];
            playerHero.core.name = "我";
            playerRight.core = MjRound.instance.players[1];
            playerRight.core.name = "右";
            playerUp.core = MjRound.instance.players[2];
            playerUp.core.name = "上";
            playerLeft.core = MjRound.instance.players[3];
            playerLeft.core.name = "左";
            //
            playerHero.core.feng = MjConst.type_feng_dong;
            playerRight.core.feng = MjConst.type_feng_nan;
            playerUp.core.feng = MjConst.type_feng_xi;
            playerLeft.core.feng = MjConst.type_feng_bei;
            //
            _curPlayer = players[menFeng - 1];
            _curPlayer.core.zhuang = true;
            //
            for (var i:number = 0; i < players.length; i++) {
                var player:IPlayer = players[i];
                player.updateIcon(player.core.feng == MjRound.instance.menFeng);
            }
            //
            var startAnimBtn:StartAnimBtn = new StartAnimBtn();
            startAnimBtn.x = (UserConst.size.x) / 2;
            startAnimBtn.y = (UserConst.size.y) / 2;
            addChild(startAnimBtn);
            startAnimBtn.addEventListener(TouchEvent.TOUCH, onTouchBtn);
        }

        private onTouchBtn(event:TouchEvent) {
            if (event.getTouch(DisplayObject(event.currentTarget), TouchPhase.ENDED)) {
                if(false) {
                    playerUp.showAnim();
                    playerRight.showAnim();
                    playerLeft.showAnim();
                }else {
                    var btn:StartAnimBtn = StartAnimBtn(event.currentTarget);
                    btn.mc.removeFromParent();
                    var tween:Tween = new Tween(btn.img, .5, Transitions.EASE_IN);
                    tween.animate("scaleX", 2);
                    tween.animate("scaleY", 2);
                    tween.animate("alpha", 0);
                    tween.onComplete = onRemoveBtn;
                    tween.onCompleteArgs = [btn];
                    juggler.add(tween);
                }
            }
        }

        private onRemoveBtn(btn:DisplayObject) {
            replacePlayer(true);
            btn.removeFromParent();
            juggler.delayCall(startGame, .05)
        }

        private startGame() {
            //先发好牌
//            MjRound.instance.fetchCardsImmediate.apply(MjRound.instance, TestInitCards.testForAnGangInit());
            var cs1 = MjGenerator.gene(int(Math.random() * 16));
            MjRound.instance.fetchCardsImmediate(cs1[0], null, null, null, null, null, cs1[1]);
            //先显示好牌.并隐藏.为了显示发牌动画
            for (var i:number = 0; i < players.length; i++) {
                var player:IPlayer = players[i];
                player.updateIcon(player.core.feng == MjRound.instance.menFeng);
                player.showCards();
                player.showCardsMc.hideForDistribute();
                /*for (var j:number = 0; j < 21; j++) {
                 player.discardCardsMc.append(MjConst.All4Type[int(MjConst.All4Type.length*Math.random())])
                 }*/
            }
            //
//            showResult(null, null);
//            return;
            //
            juggler.delayCall(showDistributeAnim, 0, 0);
            juggler.delayCall(showDistributeAnim, .3, 4);
            juggler.delayCall(showDistributeAnim, .6, 8);
            juggler.delayCall(showDistributeAnim, .9, 12);
            juggler.delayCall(playerHero.beforeSortCards, 1);
            juggler.delayCall(startFetch, 2);
        }

        /**
         * 当玩家需要补杠时,先看看别人胡不胡
         * @param event
         */
        private onPlayerWantBuGang(event:MjEvent) {
            anim.showMingGang(_curPlayer);
            var card:MjCard = MjCard(event.data);
            nextPlayerDecideForOtherWantBuGang(_curPlayer.next, card);
        }

        private nextPlayerDecideForOtherWantBuGang(player:IPlayer, card:MjCard) {
            if (player != _curPlayer) {
                player.decideOnOtherBuGang(card, MethodUtil.create(nextPlayerDecideForOtherWantBuGang, player.next, card));
            } else {
                _curPlayer.buGang(card);
            }
        }

        private addListener() {
            for (var i:number = 0; i < players.length; i++) {
                var player:IPlayer = players[i];
                player.opt = opt;
                player.addEventListener(MjEvent.DISCARD, onOneJustDiscard);
                player.addEventListener(MjEvent.PENG, onPlayerPeng);
                player.addEventListener(MjEvent.CHI, onPlayerChi);
                player.addEventListener(MjEvent.MINGGANG, onPlayerMingGang);
                player.addEventListener(MjEvent.BUGANG, onPlayerBuGang);
                player.addEventListener(MjEvent.ANGANG, onPlayerAnGang);
                player.addEventListener(MjEvent.HU_ZIMO, onPlayerZimo);
                player.addEventListener(MjEvent.HU, onPlayerHu);
                player.addEventListener(MjEvent.WANT_BUGANG, onPlayerWantBuGang);
                player.addEventListener(IPlayer.SHOW_HEAD_TIP, showHeadTip);
            }
        }

        private updateLastCardCnt(event:* = null) {
            decorate.showLastCardCnt(MjRound.instance.getCardCnt());
        }

        private showDistributeAnim(cardIndex:number) {
            for (var i:number = 0; i < players.length; i++) {
                var player:IPlayer = players[i];
                player.showCardsMc.showDistributeAnim(cardIndex);
            }
        }

        /**
         * 玩家
         * @param event
         */
        private onPlayerZimo(event:MjEvent) {
            var player:IPlayer = (IPlayer(event.currentTarget));
            curPlayer = player;
            var timer:number;
            anim.showZimo(player);
            timer = 2;
            juggler.delayCall(showResult, timer, event.data, player)
        }

        /**
         * 玩家
         * @param event
         */
        private onPlayerHu(event:MjEvent) {
            var player:IPlayer = (IPlayer(event.currentTarget));
            curPlayer = player;
            var timer:number;
            anim.showHu(player);
            timer = 2;
            juggler.delayCall(showResult, timer, event.data, player)
        }

        /**
         * 显示结果.算番.算钱
         * @param huInfo
         * @param huPlayer
         */
        private showResult(huInfo:HuInfo, huPlayer:IPlayer) {
            //不能重复滤镜
            (playerHero.showCardsMc as IShowMcForHero).removeFilter();
            anim.removeDiscardPointer();
            pointer.visible = false;
            var money:number = 0;
            var fan:number = 0;
            if (huInfo != null) {//不是流局.
                //算钱
                fan = MjEngine.getFan(huPlayer.core, huInfo);
                money = fan * UserConst.money_di;
                //
                for (var i:number = 0; i < curPlayerInfos.length; i++) {
                    var player1:PlayerInfo = curPlayerInfos[i];
                    if (player1 != huPlayer.playerInfo) {
                        player1.lose++;
                        player1.money -= money;
                    } else {
                        player1.win++;
                        player1.money += money * 3;
                    }
                }
                huInfo.fan = fan;
            }
            StorageData.saveInfos(curPlayerInfos);//保存钱
            //
            dispatchEventWith(Table.RESULT, false, [huInfo, huPlayer, playerHero, money]);
        }

        private onPlayerAnGang(event:MjEvent) {
            anim.showAnGang((event.currentTarget as IPlayer));
            juggler.delayCall(nextPalyerFetch, .5, true);
        }

        private onPlayerMingGang(event:MjEvent) {
            _curPlayer.core.removeLastDiscardCard();
            _curPlayer.discardCardsMc.removeLastDiscardCard();
            curPlayer = IPlayer(event.currentTarget);
            anim.showMingGang(_curPlayer);
            juggler.delayCall(nextPalyerFetch, .5, true);
        }

        private onPlayerBuGang(event:MjEvent) {
            curPlayer = IPlayer(event.currentTarget);
            juggler.delayCall(nextPalyerFetch, .5, true);
        }

        private onPlayerChi(event:MjEvent) {
            _curPlayer.core.removeLastDiscardCard();
            _curPlayer.discardCardsMc.removeLastDiscardCard();
            curPlayer = IPlayer(event.currentTarget);
            anim.showChi(_curPlayer);
            juggler.delayCall(_curPlayer.decideAfterOpt, 1);
        }

        private onPlayerPeng(event:MjEvent) {
            _curPlayer.core.removeLastDiscardCard();
            _curPlayer.discardCardsMc.removeLastDiscardCard();
            curPlayer = IPlayer(event.currentTarget);
            anim.showPeng(_curPlayer);
            juggler.delayCall(_curPlayer.decideAfterOpt, 1);
        }

        private onKeyDown(event:KeyboardEvent) {
            if (event.keyCode == Keyboard.BACK) {
                if (SurePanel.instance == null) {
                    var child:SurePanel = new SurePanel();
                    addChild(child);
                    event.stopImmediatePropagation();
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
        }

        /**
         * 开始抓牌
         */
        private startFetch() {
            NativeApplication.nativeApplication.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
            for (var i:number = 0; i < players.length; i++) {
                var player:IPlayer = players[i];
                if (player != playerHero) {
                    player.showCards(true);
                }
            }
            pointer.visible = true;
            curPlayer = players[MjRound.instance.menFeng - 1];
            //
            nextPalyerFetch();
        }

        private nextPalyerFetch(reverse:boolean = false) {
            if (MjRound.instance.hasCard()) {
                _curPlayer.fetch(reverse);
            } else {
                var mc:LiuJuMc = new LiuJuMc();
                addChild(mc);
                juggler.delayCall(removeChild, 1.1, mc);
                juggler.delayCall(showResult, 1, null, null)
            }
        }

        /**
         * 当一个人刚打了牌之后
         * @param event
         */
        private onOneJustDiscard(event:Event) {
            var card:MjCard = MjCard(event.data);
            decideForOtherDiscardDic = new Dictionary();
            nextPlayerDecideForOtherDiscard(_curPlayer.next, card);
        }

        private nextPlayerDecideForOtherDiscard(player:IPlayer, card:MjCard) {
            if (player != _curPlayer) {
                player.decideOnOtherDiscard(card, _curPlayer.next == player, MethodUtil.create(onDecideForOtherDiscard, player, card))
            } else {
                for (var pla:* in decideForOtherDiscardDic) {
                    var e:MjEvent = decideForOtherDiscardDic[pla];
                    if (e.type == MjEvent.MINGGANG) {
                        (pla as IPlayer).mingGang(MjCard(e.data));
                        return;
                    }
                }
                for (var pla1:* in decideForOtherDiscardDic) {
                    var e1:MjEvent = decideForOtherDiscardDic[pla1];
                    if (e1.type == MjEvent.PENG) {
                        (pla1 as IPlayer).peng(MjCard(e1.data));
                        return;
                    }
                }
                for (var pla2:* in decideForOtherDiscardDic) {
                    var e2:MjEvent = decideForOtherDiscardDic[pla2];
                    if (e2.type == MjEvent.CHI) {
                        (pla2 as IPlayer).chi(MjChiInfo(e2.data));
                        return;
                    }
                }
                //如果都没有动作.就下个玩家抓牌
                curPlayer = _curPlayer.next;
                nextPalyerFetch();
            }
        }

        private decideForOtherDiscardDic:Dictionary = new Dictionary();

        private onDecideForOtherDiscard(e:MjEvent, player:IPlayer, card:MjCard) {
            if (e.type != MjEvent.PASS) {
                decideForOtherDiscardDic[player] = e;
            }
            nextPlayerDecideForOtherDiscard(player.next, card);
        }

        public set curPlayer(value:IPlayer) {
            _curPlayer = value;
            switch (_curPlayer) {
                case players[0]:
                    pointer.pointDown();
                    break;
                case players[1]:
                    pointer.pointRight();
                    break;
                case players[2]:
                    pointer.pointUp();
                    break;
                case players[3]:
                    pointer.pointLeft();
                    break;
            }
        }

        public clear() {
            NativeApplication.nativeApplication.removeEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
            opt.clear();
            Anim.instance.removeDiscardPointer();
            if (MjRound.instance != null) {
                MjRound.instance.removeEventListener(MjRound.CNT_CHANGE, updateLastCardCnt);
            }
            juggler.purge();
            for (var i:number = 0; i < players.length; i++) {
                var player:IPlayer = players[i];
                player.removeEventListener(MjEvent.DISCARD, onOneJustDiscard);
                player.removeEventListener(MjEvent.PENG, onPlayerPeng);
                player.removeEventListener(MjEvent.CHI, onPlayerChi);
                player.removeEventListener(MjEvent.MINGGANG, onPlayerMingGang);
                player.removeEventListener(MjEvent.BUGANG, onPlayerBuGang);
                player.removeEventListener(MjEvent.ANGANG, onPlayerAnGang);
                player.removeEventListener(MjEvent.HU_ZIMO, onPlayerZimo);
                player.removeEventListener(MjEvent.HU, onPlayerHu);
                player.removeEventListener(MjEvent.WANT_BUGANG, onPlayerWantBuGang);
                player.removeEventListener(IPlayer.SHOW_HEAD_TIP, showHeadTip);
                player.showCardsMc.clear();
                player.discardCardsMc.clear();
            }
        }
    }
}
