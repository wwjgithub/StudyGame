/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-4-17
 * Time: 下午5:43
 */
namespace game {

    export class MjPlayer {
        private _name: string;
        private _opts: IOpt[] = new Array();
        public showCards: MjCard[] = [];
        //花牌
        private _hua: number;
        //是不是庄家
        public zhuang: boolean;
        //摸到的最后一张牌
        public lastFetchCard: MjCard;
        private _tingInfo: MjTingInfo;
        public feng: number;

        constructor() {
        }

        public get name(): string {
            return this._name;
        }

        public set name(value: string) {
            this._name = value;
        }

        public cloneShowCards(): MjCard[] {
            return this.showCards.slice();
        }

        public getAllCards(): MjCard[] {
            var all: MjCard[] = [];
            all = all.concat(this.showCards);
            for (var j: number = 0; j < this.opts.length; j++) {
                var opt: IOpt = this.opts[j];
                if (opt instanceof OptChi) {
                    all = all.concat((opt as OptChi).chiInfo.cards);
                } else if (opt instanceof OptPeng) {
                    all.push((opt as OptPeng).card);
                    all.push((opt as OptPeng).card);
                    all.push((opt as OptPeng).card)
                } else if (opt instanceof OptMingGang) {
                    all.push((opt as OptMingGang).card);
                    all.push((opt as OptMingGang).card);
                    all.push((opt as OptMingGang).card);
                    all.push((opt as OptMingGang).card)
                } else if (opt instanceof OptAnGang) {
                    all.push((opt as OptAnGang).card);
                    all.push((opt as OptAnGang).card);
                    all.push((opt as OptAnGang).card);
                    all.push((opt as OptAnGang).card)
                }
            }
            return all;
        }

        public onDiscardHua(): number {
            var cnt: number = 0;
            var i: number = 0;
            for (i = 0; i < this.showCards.length; i++) {
                var mjCard: MjCard = this.showCards[i];
                if (mjCard.isHua()) {
                    cnt++;
                    this.showCards.splice(i, 1);
                    i--;
                }
            }
            return cnt;
        }

        /**
         * 摸到一张牌后
         * @param card
         */
        public onFetchedCard(card: MjCard) {
            this.showCards.push(card);
            this.lastFetchCard = card;
            this._opts.push(new OptFetch())
        }

        /**
         * 打出一张牌
         * @param card
         */
        public onDiscard(card: MjCard) {
            this._opts.push(new OptDiscard(card));
            var ind: number = this.showCards.indexOf(card);
            this.showCards.splice(ind, 1);
        }

        /**
         * 设置为碰牌
         * @param card
         */
        public onPeng(card: MjCard) {
            MjEngine.subSpecialCnt(this.showCards, card, 2);
            this._opts.push(new OptPeng(card))
        }

        public onMingGang(card: MjCard) {
            MjEngine.subSpecialCnt(this.showCards, card, 3);
            this._opts.push(new OptMingGang(card));
        }

        public onAnGang(card: MjCard) {
            MjEngine.subSpecialCnt(this.showCards, card, 4);
            this._opts.push(new OptAnGang(card));
        }

        public onBuGang(card: MjCard) {
            for (var j: number = 0; j < this._opts.length; j++) {
                var opt: IOpt = this._opts[j];
                if (opt instanceof OptPeng) {
                    if ((opt as OptPeng).card.equal(card)) {
                        var gang: OptMingGang = new OptMingGang(card);
                        this._opts.splice(j, 1, gang);
                        break;
                    }
                }
            }
            MjEngine.subSpecialCnt(this.showCards, card, 1);
        }

        /**
         * 吃牌
         * @param chiInfo
         */
        public onChi(chiInfo: MjChiInfo) {
            this._opts.push(new OptChi(chiInfo));
            var i: number = 0;
            var cards: MjCard[] = chiInfo.cards.slice();
            for (i = 0; i < cards.length; i++) {
                var mjCard: MjCard = cards[i];
                if (mjCard.equal(chiInfo.target)) {
                    continue;
                }
                var j: number = 0;
                for (j = 0; j < this.showCards.length; j++) {
                    if (this.showCards[j].equal(mjCard)) {
                        this.showCards.splice(j, 1);
                        cards.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
        }

        public get opts(): IOpt[] {
            return this._opts;
        }

        public getAnGangCards(): MjCard[] {
            var v: MjCard[] = [];
            for (var i: number = 0; i < this._opts.length; i++) {
                var opt: IOpt = this._opts[i];
                if (opt instanceof OptAnGang) {
                    v.push((opt as OptAnGang).card);
                }
            }
            return v;
        }

        public anGangCnt(): number {
            return this.getAnGangCards().length;
        }

        public getMingGangCards(): MjCard[] {
            var v: MjCard[] = [];
            for (var i: number = 0; i < this._opts.length; i++) {
                var opt: IOpt = this._opts[i];
                if (opt instanceof OptMingGang) {
                    v.push((opt as OptMingGang).card);
                }
            }
            return v;
        }

        public mingGangCnt(): number {
            return this.getMingGangCards().length;
        }

        public getPengCards(): MjCard[] {
            var v: MjCard[] = [];
            for (var i: number = 0; i < this._opts.length; i++) {
                var opt: IOpt = this._opts[i];
                if (opt instanceof OptPeng) {
                    v.push((opt as OptPeng).card);
                }
            }
            return v;
        }

        public pengCnt(): number {
            return this.getPengCards().length;
        }

        public getChiCards() {
            var v: MjCard[][] = []
            for (var j: number = 0; j < this.opts.length; j++) {
                var opt: IOpt = this.opts[j];
                if (opt instanceof OptChi) {
                    v.push((opt as OptChi).chiInfo.cards);
                }
            }
            return v;
        }

        public getChiInfos(): MjChiInfo[] {
            var v: MjChiInfo[] = [];
            for (var i: number = 0; i < this.opts.length; i++) {
                var opt: IOpt = this.opts[i];
                if (opt instanceof OptChi) {
                    v.push((opt as OptChi).chiInfo);
                }
            }
            return v;
        }

        public chiCnt(): number {
            return this.getChiInfos().length;
        }

        public get daPaiCnt(): number {
            var cnt: number = 0;
            for (var i: number = 0; i < this._opts.length; i++) {
                var opt: IOpt = this._opts[i];
                if (opt instanceof OptDiscard) {
                    cnt++;
                }
            }
            return cnt;
        }

        public get hua(): number {
            return this._hua;
        }

        public get moPaiCnt(): number {
            var cnt: number = 0;
            for (var i: number = 0; i < this._opts.length; i++) {
                var opt: IOpt = this._opts[i];
                if (opt instanceof OptFetch) {
                    cnt++;
                }
            }
            return cnt;
        }

        public sort() {
            this.showCards.sort(MjEngine.sortCardByTypeNum);
        }

        /**
         * 将最后一张放到合适的位置
         */
        public insertLastCard() {
            var ss: MjCard[] = this.showCards.slice();
            ss.sort(MjEngine.sortCardByTypeNum);
            var ind: number = ss.indexOf(this.lastFetchCard);
            this.showCards.splice(ind, 0, this.showCards.pop());
        }

        public get tingInfo(): MjTingInfo {
            return this._tingInfo;
        }

        public set tingInfo(value: MjTingInfo) {
            this._tingInfo = value;
            this._opts.push(new OptTing());
        }

        public updateShowCards(cs1: MjCard[]) {
            this.showCards = cs1.slice();
        }

        public getDiscardCnt(target: MjCard): number {
            var cnt: number = 0;
            for (var i: number = 0; i < this._opts.length; i++) {
                var opt: IOpt = this._opts[i];
                if (opt instanceof OptDiscard) {
                    if ((opt as OptDiscard).card.equal(target)) {
                        cnt++;
                    }
                }
            }
            return cnt;
        }

        public get commonOptCnt(): number {
            var cnt: number = 0;
            for (var i: number = 0; i < this._opts.length; i++) {
                var opt: IOpt = this._opts[i];
                if (opt instanceof OptChi) {
                    cnt++;
                } else if (opt instanceof OptPeng) {
                    cnt++;
                } else if (opt instanceof OptMingGang) {
                    cnt++;
                } else if (opt instanceof OptAnGang) {
                    cnt++;
                }
            }
            return cnt;
        }

        public getCardCntInShow(card: MjCard): number {
            var cnt: number = 0;
            for (var i: number = 0; i < this.showCards.length; i++) {
                var card1: MjCard = this.showCards[i];
                if (card1.equal(card)) {
                    cnt++;
                }
            }
            return cnt;
        }

        public removeLastDiscardCard() {
            this._opts.pop();
        }

        public outPut(): string {
            var ss = [];
            ss.push("ag:" + this.getAnGangCards());
            ss.push("mg:" + this.getMingGangCards());
            ss.push("sh:" + this.getChiCards());
            ss.push("ke:" + this.getPengCards());
            ss.push("pe:" + this.cloneShowCards());
            return ss.join("|");
        }

        public static input(s: string): MjPlayer {
            var p: MjPlayer = new MjPlayer();
            var ss = s.split("|");
            for (var i: number = 0; i < ss.length; i++) {
                var str: string = ss[i];
                var ts: string = str.split(":")[0];
                var ps: string = str.split(":")[1];
                var cards: MjCard[];
                var j: number;
                switch (ts) {
                    case "ag":
                        cards = this.getCards(ps);
                        for (j = 0; j < cards.length; j++) {
                            p._opts.push(new OptAnGang(cards[j]));
                        }
                        break;
                    case "mg":
                        cards = this.getCards(ps);
                        for (j = 0; j < cards.length; j++) {
                            p._opts.push(new OptMingGang(cards[j]));
                        }
                        break;
                    case "sh":
                        cards = this.getCards(ps);
                        for (j = 0; j < cards.length; j += 3) {
                            p._opts.push(new OptChi(new MjChiInfo(null, cards.slice(j, j + 3))));
                        }
                        break;
                    case "ke":
                        cards = this.getCards(ps);
                        for (j = 0; j < cards.length; j++) {
                            p._opts.push(new OptPeng(cards[j]));
                        }
                        break;
                    case "pe":
                        cards = this.getCards(ps);
                        for (j = 0; j < cards.length; j++) {
                            p.showCards.push(cards[j]);
                        }
                        break;
                }
            }
            return p;
        }

        private static getCards(ps: string): MjCard[] {
            var v: MjCard[] = [];
            if (ps == null || ps == "") {
                return v;
            }
            var ss = ps.split(",");
            for (var i: number = 0; i < ss.length; i++) {
                v.push(MjCard.toCard(ss[i]));
            }
            return v;
        }
    }
}
