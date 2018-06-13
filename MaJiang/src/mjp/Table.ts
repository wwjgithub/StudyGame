/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 11:32
 */


namespace game {


    import Sprite = egret.Sprite;
    import Point = egret.Point;
    import Event = egret.Event;
    import StorageData = game.StorageData;
    import PlayerInfo = game.PlayerInfo;
    import IPlayer = game.IPlayer;
    import Decorate = game.Decorate;
    import Pointer = game.Pointer;
    import PlayerRight = game.PlayerRight;
    import Ease = egret.Ease;
    import DisplayObject = egret.DisplayObject;
    import TouchEvent = egret.TouchEvent;

    export class Table extends Sprite {
        private _curPlayer: IPlayer;

        private decorate: Decorate;
        private pointer: Pointer;
        private playerRight: PlayerRight;
        private playerUp: PlayerUp;
        private playerLeft: PlayerLeft;
        private playerHero: PlayerHero;
        private players: IPlayer[];
        private anim: Anim;
        private opt: Opt;
        private curPlayerInfos: Array<PlayerInfo>;

        constructor() {
            super();
            IPlayer.init();
            //
            this.decorate = new Decorate();
            this.addChild(this.decorate);
            ///


            this.pointer = new Pointer();

            this.pointer.x = Global.stage_w / 2;
            this.pointer.y = Global.stage_h / 2;
            ////////
            this.playerRight = new PlayerRight();
            this.addChild(this.playerRight);
            this.playerUp = new PlayerUp();
            this.addChild(this.playerUp);
            this.playerLeft = new PlayerLeft();
            this.addChild(this.playerLeft);
            this.playerHero = new PlayerHero();
            this.addChild(this.playerHero);
            /////
            this.playerHero.next = this.playerRight;
            this.playerRight.next = this.playerUp;
            this.playerUp.next = this.playerLeft;
            this.playerLeft.next = this.playerHero;
            ////

            this.players = [this.playerHero, this.playerRight, this.playerUp, this.playerLeft];
            ////

            this.addChild(this.pointer)
            ///////
            this.anim = new Anim();
            this.anim.init(this.players);
            this.addChild(this.anim);

            //////
            this.opt = new Opt();
            this.opt.x = Global.stage_w;
            this.opt.y = Global.stage_h / 3 * 2;
            this.addChild(this.opt);

        }

        private menFeng;

        startFirst() {
            this.curPlayerInfos = StorageData.readLevelData();
            if (this.curPlayerInfos.length == 0) {
                var info: PlayerInfo = new PlayerInfo();
                info.name = "本家";
                info.sex = StorageData.hero_sex;
                info.money = Global.INIT_MONEY;
                this.curPlayerInfos.push(info);
                this.appendPlayer();
            }
            this.menFeng = MjConst.type_feng_dong;
            this.playerHero.updateInfo(this.curPlayerInfos[0]);
            this.playerLeft.updateInfo(this.curPlayerInfos[1]);
            this.playerUp.updateInfo(this.curPlayerInfos[2]);
            this.playerRight.updateInfo(this.curPlayerInfos[3]);
            this.initGame();
        }

        private updateLastCardCnt(event: any = null): void {
            this.decorate.showLastCardCnt(MjRound.instance.getCardCnt());
        }

        private initGame(): void {
            this.clear();
            this.addListener();
            this.pointer.visible = false;
            if (MjRound.instance != null) {
                MjRound.instance.removeEventListener(MjRound.CNT_CHANGE, this.updateLastCardCnt, this);
            }
            //
            this.decorate.hideCardCnt();
            //
            MjRound.init(MjConst.playtype_4);
            MjRound.instance.addEventListener(MjRound.CNT_CHANGE, this.updateLastCardCnt, this);
            MjRound.instance.menFeng = this.menFeng;
            //
            this.playerHero.core = MjRound.instance.players[0];
            this.playerHero.core.name = "我";
            this.playerRight.core = MjRound.instance.players[1];
            this.playerRight.core.name = "右";
            this.playerUp.core = MjRound.instance.players[2];
            this.playerUp.core.name = "上";
            this.playerLeft.core = MjRound.instance.players[3];
            this.playerLeft.core.name = "左";
            //
            this.playerHero.core.feng = MjConst.type_feng_dong;
            this.playerRight.core.feng = MjConst.type_feng_nan;
            this.playerUp.core.feng = MjConst.type_feng_xi;
            this.playerLeft.core.feng = MjConst.type_feng_bei;
            //
            this._curPlayer = this.players[this.menFeng - 1];
            this._curPlayer.core.zhuang = true;
            //
            for (var i = 0; i < this.players.length; i++) {
                var player: IPlayer = this.players[i];
                player.updateIcon(player.core.feng == MjRound.instance.menFeng);
            }
            //
            var startAnimBtn: StartAnimBtn = new StartAnimBtn();
            startAnimBtn.x = (Global.stage_w) / 2;
            startAnimBtn.y = (Global.stage_h) / 2;
            this.addChild(startAnimBtn);
            startAnimBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
            //todo:
            startAnimBtn.dispatchEvent(new TouchEvent(egret.TouchEvent.TOUCH_TAP));
        }

        private addListener(): void {
            for (var i: number = 0; i < this.players.length; i++) {
                var player: IPlayer = this.players[i];
                player.opt = this.opt;
                player.addEventListener(MjEvent.DISCARD, this.onOneJustDiscard, this);
                player.addEventListener(MjEvent.PENG, this.onPlayerPeng, this);
                player.addEventListener(MjEvent.CHI, this.onPlayerChi, this);
                player.addEventListener(MjEvent.MINGGANG, this.onPlayerMingGang, this);
                player.addEventListener(MjEvent.BUGANG, this.onPlayerBuGang, this);
                player.addEventListener(MjEvent.ANGANG, this.onPlayerAnGang, this);
                player.addEventListener(MjEvent.HU_ZIMO, this.onPlayerZimo, this);
                player.addEventListener(MjEvent.HU, this.onPlayerHu, this);
                player.addEventListener(MjEvent.WANT_BUGANG, this.onPlayerWantBuGang, this);
                player.addEventListener(IPlayer.SHOW_HEAD_TIP, this.showHeadTip, this);
            }
        }

        private showHeadTip(event: egret.Event): void {
            var player: IPlayer = <IPlayer>(event.currentTarget);
            var p: Point = new Point();
            p = player.head.localToGlobal(p.x, p.y);
            p = this.globalToLocal(p.x, p.y);
            var tip: UserImageTip = new UserImageTip(player);
            switch (player) {
                case this.playerLeft:
                    p.x += this.playerLeft.head.width;
                    p.y -= tip.height / 2;
                    break;
                case this.playerUp:
                    p.y += this.playerUp.head.height;
                    p.x -= tip.width / 2;
                    break;
                case this.playerRight:
                    p.x -= tip.width;
                    p.y -= tip.height / 2;
                    break;
            }
            tip.update(p);
            this.addChild(tip);
        }

        private onPlayerMingGang(event: Event): void {
            this._curPlayer.core.removeLastDiscardCard();
            this._curPlayer.discardCardsMc.removeLastDiscardCard();
            this.curPlayer = <IPlayer>(event.currentTarget);
            this.anim.showMingGang(this._curPlayer);
            egret.setTimeout(this.nextPalyerFetch, this, 500, true);
        }

        private onPlayerBuGang(event: Event): void {
            this.curPlayer = <IPlayer>(event.currentTarget);
            egret.setTimeout(this.nextPalyerFetch, this, 500, true);
        }

        private onPlayerChi(event: MjEvent): void {
            this._curPlayer.core.removeLastDiscardCard();
            this._curPlayer.discardCardsMc.removeLastDiscardCard();
            this.curPlayer = <IPlayer>(event.currentTarget);
            this.anim.showChi(this._curPlayer);
            egret.setTimeout(this._curPlayer.decideAfterOpt, this._curPlayer, 1000);
        }

        private onPlayerPeng(event: MjEvent): void {
            this._curPlayer.core.removeLastDiscardCard();
            this._curPlayer.discardCardsMc.removeLastDiscardCard();
            this.curPlayer = <IPlayer>(event.currentTarget);
            this.anim.showPeng(this._curPlayer);
            egret.setTimeout(this._curPlayer.decideAfterOpt, this._curPlayer, 1000);
        }

        public set curPlayer(value: IPlayer) {
            this._curPlayer = value;
            switch (this._curPlayer) {
                case this.players[0]:
                    this.pointer.pointDown();
                    break;
                case this.players[1]:
                    this.pointer.pointRight();
                    break;
                case this.players[2]:
                    this.pointer.pointUp();
                    break;
                case this.players[3]:
                    this.pointer.pointLeft();
                    break;
            }
        }

        /**
         * 玩家
         * @param event
         */
        private onPlayerZimo(event: egret.Event): void {
            var player: IPlayer = (<IPlayer>(event.currentTarget));
            this.curPlayer = player;
            this.anim.showZimo(player);
            egret.setTimeout(this.showResult, this, 2000, event.data, player)
        }

        private showResult(huInfo: HuInfo, huPlayer: IPlayer): void {
            //不能重复滤镜
            (this.playerHero.showCardsMc).removeFilter();
            this.anim.removeDiscardPointer();
            this.pointer.visible = false;
            var money: number = 0;
            var fan: number = 0;
            if (huInfo != null) {//不是流局.
                //算钱
                fan = MjEngine.getFan(huPlayer.core, huInfo);
                money = fan * Global.money_di;
                //
                for (var i: number = 0; i < this.curPlayerInfos.length; i++) {
                    var player1: PlayerInfo = this.curPlayerInfos[i];
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
            StorageData.saveInfos(this.curPlayerInfos);//保存钱
            //
            this.dispatchEvent(new Event(Table.RESULT, false, false, [huInfo, huPlayer, this.playerHero, money]));
        }

        public static RESULT: string = "RESULT";

        /**
         * 玩家
         * @param event
         */
        private onPlayerHu(event: egret.Event): void {
            var player: IPlayer = (<IPlayer>(event.currentTarget));
            this.curPlayer = player;
            this.anim.showHu(player);
            egret.setTimeout(this.showResult, this, 2000, event.data, player)
        }

        private decideForOtherDiscardDic=[]

        /**
         * 当一个人刚打了牌之后
         * @param event
         */
        private onOneJustDiscard(event: egret.Event): void {
            var card: MjCard = <MjCard>(event.data);
            this.decideForOtherDiscardDic = [];
            this.nextPlayerDecideForOtherDiscard(this._curPlayer.next, card);
        }

        private onDecideForOtherDiscard(player: IPlayer, card: MjCard,e: egret.Event): void {
            if (e.type != MjEvent.PASS) {
                this.decideForOtherDiscardDic.push([player,e]);
            }
            this.nextPlayerDecideForOtherDiscard(player.next, card);
        }

        private nextPlayerDecideForOtherDiscard(player: IPlayer, card: MjCard): void {
            if (player != this._curPlayer) {
                player.decideOnOtherDiscard(card, this._curPlayer.next == player, this.onDecideForOtherDiscard.bind(this, player, card))
            } else {
                for (let i = 0; i < this.decideForOtherDiscardDic.length; i++) {
                    let ar = this.decideForOtherDiscardDic[i];
                    if (ar[1].type == MjEvent.MINGGANG) {
                        ar[0].mingGang(<MjCard>(ar[1].data));
                        return;
                    }
                }
                for (let i = 0; i < this.decideForOtherDiscardDic.length; i++) {
                    let ar = this.decideForOtherDiscardDic[i];
                    if (ar[1].type == MjEvent.PENG) {
                        ar[0].peng(<MjCard>(ar[1].data));
                        return;
                    }
                }
                for (let i = 0; i < this.decideForOtherDiscardDic.length; i++) {
                    let ar = this.decideForOtherDiscardDic[i];
                    if (ar[1].type == MjEvent.CHI) {
                        ar[0].chi(ar[1].data);
                        return;
                    }
                }

                //如果都没有动作.就下个玩家抓牌
                this.curPlayer = this._curPlayer.next;
                this.nextPalyerFetch();
            }
        }

        private nextPalyerFetch(reverse: boolean = false): void {
            if (MjRound.instance.hasCard()) {
                this._curPlayer.fetch(reverse);
            } else {
                var mc: LiuJuMc = new LiuJuMc();
                this.addChild(mc);
                egret.setTimeout(this.removeChild, this, 1100, mc);
                egret.setTimeout(this.showResult, this, 1000, null, null)
            }
        }

        public clear(): void {
            this.opt.clear();
            Anim.instance.removeDiscardPointer();
            if (MjRound.instance != null) {
                MjRound.instance.removeEventListener(MjRound.CNT_CHANGE, this.updateLastCardCnt, this);
            }
            for (var i: number = 0; i < this.players.length; i++) {
                var player: IPlayer = this.players[i];
                player.removeEventListener(MjEvent.DISCARD, this.onOneJustDiscard, this);
                player.removeEventListener(MjEvent.PENG, this.onPlayerPeng, this);
                player.removeEventListener(MjEvent.CHI, this.onPlayerChi, this);
                player.removeEventListener(MjEvent.MINGGANG, this.onPlayerMingGang, this);
                player.removeEventListener(MjEvent.BUGANG, this.onPlayerBuGang, this);
                player.removeEventListener(MjEvent.ANGANG, this.onPlayerAnGang, this);
                player.removeEventListener(MjEvent.HU_ZIMO, this.onPlayerZimo, this);
                player.removeEventListener(MjEvent.HU, this.onPlayerHu, this);
                player.removeEventListener(MjEvent.WANT_BUGANG, this.onPlayerWantBuGang, this);
                player.removeEventListener(IPlayer.SHOW_HEAD_TIP, this.showHeadTip, this);
                player.showCardsMc.clear();
                player.discardCardsMc.clear();
            }
        }

        private onPlayerWantBuGang(event: MjEvent): void {
            this.anim.showMingGang(this._curPlayer);
            var card: MjCard = <MjCard>(event.data);
            this.nextPlayerDecideForOtherWantBuGang(this._curPlayer.next, card);
        }

        private nextPlayerDecideForOtherWantBuGang(player: IPlayer, card: MjCard): void {
            if (player != this._curPlayer) {
                player.decideOnOtherBuGang(card, this.nextPlayerDecideForOtherWantBuGang.bind(this, player.next, card));
            } else {
                this._curPlayer.buGang(card);
            }
        }

        private onPlayerAnGang(event: MjEvent): void {
            this.anim.showAnGang((event.currentTarget as IPlayer));
            egret.setTimeout(this.nextPalyerFetch, this, .5, true);

        }

        private onTouchBtn(event: egret.TouchEvent): void {
            if (false) {
            } else {
                var btn: StartAnimBtn = <StartAnimBtn>(event.currentTarget);
                btn.mc.parent.removeChild(btn.mc);
                egret.Tween.get(btn.img).to({
                    scaleX: 2,
                    scaleY: 2,
                    alpha: 0
                }, 500, Ease.sineIn).call(this.onRemoveBtn, this, [btn])

            }
        }

        private onRemoveBtn(btn: DisplayObject): void {
            this.replacePlayer(true);
            btn.parent.removeChild(btn);
            egret.setTimeout(this.startGame, this, 50)
        }

        private startGame(): void {
            //先发好牌
            let m=1;
            if(m==1) {
                // MjRound.instance.menFeng=4;
                let cc=TestInitCards.testForHeroTing();
                MjRound.instance.fetchCardsImmediate.apply(MjRound.instance, cc);
            }else{

                let cs1 = MjGenerator.gene(Math.floor(Math.random() * 16));
                MjRound.instance.fetchCardsImmediate(cs1[0], null, null, null, null, null, cs1[1]);
            }
            //先显示好牌.并隐藏.为了显示发牌动画
            for (var i: number = 0; i < this.players.length; i++) {
                var player: IPlayer = this.players[i];
                player.updateIcon(player.core.feng == MjRound.instance.menFeng);
                player.showCards();
                player.showCardsMc.hideForDistribute();
            }
            //
//            showResult(null, null);
            //
            egret.setTimeout(this.showDistributeAnim, this, 30, 0);
            egret.setTimeout(this.showDistributeAnim, this, 300, 4);
            egret.setTimeout(this.showDistributeAnim, this, 600, 8);
            egret.setTimeout(this.showDistributeAnim, this, 900, 12);
            egret.setTimeout(this.playerHero.beforeSortCards, this.playerHero, 1000);
            egret.setTimeout(this.startFetch, this, 2000);
        }

        private startFetch(): void {
            for (var i: number = 0; i < this.players.length; i++) {
                var player: IPlayer = this.players[i];
                if (player != this.playerHero) {
                    player.showCards(true);
                }
            }
            this.pointer.visible = true;
            this.curPlayer = this.players[MjRound.instance.menFeng - 1];
            //
            this.nextPalyerFetch();
        }

        private showDistributeAnim(cardIndex: number): void {
            for (var i = 0; i < this.players.length; i++) {
                var player: IPlayer = this.players[i];
                player.showCardsMc.showDistributeAnim(cardIndex);
            }
        }

        private replacePlayer(change: Boolean): void {
            var ps = this.getUsePlayers();
            for (var i = 0; i < this.players.length; i++) {
                var player: IPlayer = this.players[i];
                var info1: PlayerInfo = player.playerInfo;
                if (player != this.playerHero && info1.money <= 0) {
                    StorageData.overPlayer(info1.name);
                    var info: PlayerInfo = new PlayerInfo();
                    var curs = ps.splice(Math.floor(Math.random() * ps.length), 1)[0];
                    info.name = curs[0];
                    info.sex = curs[1];
                    info.money = Global.INIT_MONEY;
                    info.win = 0;
                    info.lose = 0;
                    if (change) {
                        player.updateInfo(info);
                        player.showAnim();
                    }
                    this.curPlayerInfos[i] = info;
                }
            }
            StorageData.saveInfos(this.curPlayerInfos);
        }

        private appendPlayer(): void {
            var ps = this.getUsePlayers();
            while (this.curPlayerInfos.length < 4) {
                var an = ps.splice(Math.floor(Math.random() * ps.length), 1)[0];
                var playerInfo: PlayerInfo = new PlayerInfo();
                playerInfo.name = an[0];
                playerInfo.sex = an[1];
                playerInfo.money = Global.INIT_MONEY;
                this.curPlayerInfos.push(playerInfo);
            }
        }

        private getUsePlayers() {
            var ps = [];
            for (var i: number = 0; i < Global.playerInfos.length; i++) {
                var pp = Global.playerInfos[i];
                if (!StorageData.hasPlayer(<String>pp[0])) {
                    ps.push(pp);
                }
            }
            if (ps.length < 3) {
                for (var j: number = 0; j < Global.playerInfos.length; j++) {
                    StorageData.removeOverPlayer(<String>Global.playerInfos[j][0]);
                }
                ps = Global.playerInfos.slice();
            }
            for (var k: number = 0; k < ps.length; k++) {
                var array = ps[k];
                for (var mm: number = 0; mm < this.curPlayerInfos.length; mm++) {
                    var info: PlayerInfo = this.curPlayerInfos[mm];
                    if (array[0] == info.name) {
                        ps.splice(k, 1);
                        k--;
                        break;
                    }
                }
            }
            return ps;
        }

    }
}
