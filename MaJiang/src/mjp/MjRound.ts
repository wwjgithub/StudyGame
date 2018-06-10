import EventDispatcher = egret.EventDispatcher;


class MjRound extends EventDispatcher {
    private _players: MjPlayer[] = [];
    private _playType: number;
    private cards: MjCard[] = [];
    public quanFeng: number;
    public static CNT_CHANGE: string = "MjRound.CNT_CHANGE";
    public menFeng: number;
    public static instance: MjRound;

    public static init(playType: number) {
        MjRound.instance = new MjRound(playType);
    }

    constructor(playType: number) {
        super();
        this._playType = playType;
        this._players = [];
        var i: number = 0;
        for (i = 0; i < playType; i++) {
            var mjPlayer: MjPlayer = new MjPlayer();
            this._players.push(mjPlayer);
        }
    }

    /**
     * 摸牌
     * @return [playerId,cardId]
     */
    public fetch(reverse: boolean): MjFetchInfo {
        if (this.cards.length <= 0) {
            return null;
        }
        var info: MjFetchInfo;
        if (!reverse) {
            info = new MjFetchInfo(0, this.cards.shift(), null);
        } else {
            info = new MjFetchInfo(0, this.cards.pop(), null)
        }
        dispatchEvent(new Event(MjRound.CNT_CHANGE));
        return info
    }

    /**
     * 是否还有可抓的牌
     * @return
     */
    public hasCard(): boolean {
        return this.cards.length > 0;
    }

    public get players() {
        return this._players;
    }

    /**
     * 初始时,给所有玩家立即分好13牌
     */
    public fetchCardsImmediate(cs1: MjCard[] = null, cs2: MjCard[] = null, cs3: MjCard[] = null, cs4: MjCard[] = null, csLast: MjCard[] = null, csLastReverse: MjCard[] = null, cardLib: MjCard[] = null) {
        if (cs1 == null) {
            cs1 = [];
        }
        if (cs2 == null) {
            cs2 = [];
        }
        if (cs3 == null) {
            cs3 = [];
        }
        if (cs4 == null) {
            cs4 = [];
        }
        if (csLast == null) {
            csLast = [];
        }
        if (csLastReverse == null) {
            csLastReverse = [];
        }
        //
        var temp: MjCard[];
        if (cardLib == null) {
            if (this._playType == MjConst.playtype_2) {
                temp = MjConst.Total2();
            }
            else {
                temp = MjConst.Total4();
            }
            var css: MjCard[] = [];
            css = css.concat(cs1);
            css = css.concat(cs2);
            css = css.concat(cs3);
            css = css.concat(cs4);
            css = css.concat(csLast);
            css = css.concat(csLastReverse);
            MjEngine.subContain(temp, css);
        } else {
            temp = cardLib;
        }
        var lib: MjCard[] = [];
        while (temp.length > 0) {
            var i2: number = Math.floor(Math.random() * temp.length);
            lib.push(temp.splice(i2, 1)[0]);
        }
        //凑足13张
        while (cs1.length < 13) {
            cs1.push(lib.pop());
        }
        while (cs2.length < 13) {
            cs2.push(lib.pop());
        }
        while (cs3.length < 13) {
            cs3.push(lib.pop());
        }
        while (cs4.length < 13) {
            cs4.push(lib.pop());
        }
        //
        csLast = csLast.concat(lib);
        csLast = csLast.concat(csLastReverse.reverse());
        this._players[0].updateShowCards(cs1);
        this._players[1].updateShowCards(cs2);
        this._players[2].updateShowCards(cs3);
        this._players[3].updateShowCards(cs4);
        this.cards = csLast;
    }

    public get playType(): number {
        return this._playType;
    }

    public getCardCnt(): number {
        return this.cards.length
    }

    /**
     * 除去吃碰的和所有人打出去的,还有多少张牌
     * @param target
     * @return
     */
    public getOpenCardCnt(target: MjCard): number {
        var cnt: number = 0;
        for (var i: number = 0; i < this.players.length; i++) {
            var player: MjPlayer = this.players[i];
            var pendCards: MjCard[] = player.getPengCards();
            for (var j: number = 0; j < pendCards.length; j++) {
                if (pendCards[j].equal(target)) {
                    cnt += 3;
                    break;
                }
            }
            var gangCards: MjCard[] = player.getMingGangCards();
            for (var l: number = 0; l < gangCards.length; l++) {
                if (gangCards[l].equal(target)) {
                    cnt += 4;
                    break;
                }
            }
            var chiInfos = player.getChiInfos();
            for (var k: number = 0; k < chiInfos.length; k++) {
                var info: MjChiInfo = chiInfos[k];
                for (var kk: number = 0; kk < info.cards.length; kk++) {
                    if (info.cards[kk].equal(target)) {
                        cnt++;
                        break;
                    }
                }
            }
            cnt += player.getDiscardCnt(target);
        }
        return cnt;
    }
}