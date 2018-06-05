/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-4-17
 * Time: 下午5:43
 */
package engine.vo {
    import engine.MjEngine;

    public class MjPlayer {
        private var _name:String;
        private var _opts:Vector.<IOpt> = new Vector.<IOpt>();
        public var showCards:Vector.<MjCard> = new Vector.<MjCard>();
        //花牌
        private var _hua:int;
        //是不是庄家
        public var zhuang:Boolean;
        //摸到的最后一张牌
        public var lastFetchCard:MjCard;
        private var _tingInfo:MjTingInfo;
        public var feng:int;

        public function MjPlayer() {
        }

        public function get name():String {
            return _name;
        }

        public function set name(value:String):void {
            _name = value;
        }

        public function cloneShowCards():Vector.<MjCard> {
            return showCards.slice();
        }

        public function getAllCards():Vector.<MjCard> {
            var all:Vector.<MjCard> = new Vector.<MjCard>();
            all = all.concat(showCards);
            for (var j:int = 0; j < opts.length; j++) {
                var opt:IOpt = opts[j];
                if (opt is OptChi) {
                    all = all.concat((opt as OptChi).chiInfo.cards);
                } else if (opt is OptPeng) {
                    all.push((opt as OptPeng).card);
                    all.push((opt as OptPeng).card);
                    all.push((opt as OptPeng).card)
                } else if (opt is OptMingGang) {
                    all.push((opt as OptMingGang).card);
                    all.push((opt as OptMingGang).card);
                    all.push((opt as OptMingGang).card);
                    all.push((opt as OptMingGang).card)
                } else if (opt is OptAnGang) {
                    all.push((opt as OptAnGang).card);
                    all.push((opt as OptAnGang).card);
                    all.push((opt as OptAnGang).card);
                    all.push((opt as OptAnGang).card)
                }
            }
            return all;
        }

        public function onDiscardHua():int {
            var cnt:int = 0;
            var i:int = 0;
            for (i = 0; i < showCards.length; i++) {
                var mjCard:MjCard = showCards[i];
                if (mjCard.isHua()) {
                    cnt++;
                    showCards.splice(i, 1);
                    i--;
                }
            }
            return cnt;
        }

        /**
         * 摸到一张牌后
         * @param card
         */
        public function onFetchedCard(card:MjCard):void {
            showCards.push(card);
            lastFetchCard = card;
            _opts.push(new OptFetch())
        }

        /**
         * 打出一张牌
         * @param card
         */
        public function onDiscard(card:MjCard):void {
            _opts.push(new OptDiscard(card));
            var ind:Number = showCards.indexOf(card);
            showCards.splice(ind, 1);
        }

        /**
         * 设置为碰牌
         * @param card
         */
        public function onPeng(card:MjCard):void {
            MjEngine.subSpecialCnt(showCards, card, 2);
            _opts.push(new OptPeng(card))
        }

        public function onMingGang(card:MjCard):void {
            MjEngine.subSpecialCnt(showCards, card, 3);
            _opts.push(new OptMingGang(card));
        }

        public function onAnGang(card:MjCard):void {
            MjEngine.subSpecialCnt(showCards, card, 4);
            _opts.push(new OptAnGang(card));
        }

        public function onBuGang(card:MjCard):void {
            for (var j:int = 0; j < _opts.length; j++) {
                var opt:IOpt = _opts[j];
                if (opt is OptPeng) {
                    if ((opt as OptPeng).card.equal(card)) {
                        var gang:OptMingGang = new OptMingGang(card);
                        _opts.splice(j, 1, gang);
                        break;
                    }
                }
            }
            MjEngine.subSpecialCnt(showCards, card, 1);
        }

        /**
         * 吃牌
         * @param chiInfo
         */
        public function onChi(chiInfo:MjChiInfo):void {
            _opts.push(new OptChi(chiInfo));
            var i:int = 0;
            var cards:Vector.<MjCard> = chiInfo.cards.slice();
            for (i = 0; i < cards.length; i++) {
                var mjCard:MjCard = cards[i];
                if (mjCard.equal(chiInfo.target)) {
                    continue;
                }
                var j:int = 0;
                for (j = 0; j < showCards.length; j++) {
                    if (showCards[j].equal(mjCard)) {
                        showCards.splice(j, 1);
                        cards.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
        }

        public function get opts():Vector.<IOpt> {
            return _opts;
        }

        public function getAnGangCards():Vector.<MjCard> {
            var v:Vector.<MjCard> = new Vector.<MjCard>();
            for (var i:int = 0; i < _opts.length; i++) {
                var opt:IOpt = _opts[i];
                if (opt is OptAnGang) {
                    v.push((opt as OptAnGang).card);
                }
            }
            return v;
        }

        public function anGangCnt():int {
            return getAnGangCards().length;
        }

        public function getMingGangCards():Vector.<MjCard> {
            var v:Vector.<MjCard> = new Vector.<MjCard>();
            for (var i:int = 0; i < _opts.length; i++) {
                var opt:IOpt = _opts[i];
                if (opt is OptMingGang) {
                    v.push((opt as OptMingGang).card);
                }
            }
            return v;
        }

        public function mingGangCnt():int {
            return getMingGangCards().length;
        }

        public function getPengCards():Vector.<MjCard> {
            var v:Vector.<MjCard> = new Vector.<MjCard>();
            for (var i:int = 0; i < _opts.length; i++) {
                var opt:IOpt = _opts[i];
                if (opt is OptPeng) {
                    v.push((opt as OptPeng).card);
                }
            }
            return v;
        }

        public function pengCnt():int {
            return getPengCards().length;
        }

        public function getChiCards():Vector.<Vector.<MjCard>> {
            var v:Vector.<Vector.<MjCard>> = new Vector.<Vector.<MjCard>>();
            for (var j:int = 0; j < opts.length; j++) {
                var opt:IOpt = opts[j];
                if (opt is OptChi) {
                    v.push((opt as OptChi).chiInfo.cards);
                }
            }
            return v;
        }

        public function getChiInfos():Vector.<MjChiInfo> {
            var v:Vector.<MjChiInfo> = new Vector.<MjChiInfo>();
            for (var i:int = 0; i < opts.length; i++) {
                var opt:IOpt = opts[i];
                if (opt is OptChi) {
                    v.push((opt as OptChi).chiInfo);
                }
            }
            return v;
        }

        public function chiCnt():int {
            return getChiInfos().length;
        }

        public function get daPaiCnt():int {
            var cnt:int = 0;
            for (var i:int = 0; i < _opts.length; i++) {
                var opt:IOpt = _opts[i];
                if (opt is OptDiscard) {
                    cnt++;
                }
            }
            return cnt;
        }

        public function get hua():int {
            return _hua;
        }

        public function get moPaiCnt():int {
            var cnt:int = 0;
            for (var i:int = 0; i < _opts.length; i++) {
                var opt:IOpt = _opts[i];
                if (opt is OptFetch) {
                    cnt++;
                }
            }
            return cnt;
        }

        public function sort():void {
            showCards.sort(MjEngine.sortCardByTypeNum);
        }

        /**
         * 将最后一张放到合适的位置
         */
        public function insertLastCard():void {
            var ss:Vector.<MjCard> = showCards.slice();
            ss.sort(MjEngine.sortCardByTypeNum);
            var ind:int = ss.indexOf(lastFetchCard);
            showCards.splice(ind, 0, showCards.pop());
        }

        public function get tingInfo():MjTingInfo {
            return _tingInfo;
        }

        public function set tingInfo(value:MjTingInfo):void {
            _tingInfo = value;
            _opts.push(new OptTing());
        }

        public function updateShowCards(cs1:Vector.<MjCard>):void {
            showCards = cs1.slice();
        }

        public function getDiscardCnt(target:MjCard):int {
            var cnt:int = 0;
            for (var i:int = 0; i < _opts.length; i++) {
                var opt:IOpt = _opts[i];
                if (opt is OptDiscard) {
                    if ((opt as OptDiscard).card.equal(target)) {
                        cnt++;
                    }
                }
            }
            return cnt;
        }

        public function get commonOptCnt():int {
            var cnt:int = 0;
            for (var i:int = 0; i < _opts.length; i++) {
                var opt:IOpt = _opts[i];
                if (opt is OptChi) {
                    cnt++;
                } else if (opt is OptPeng) {
                    cnt++;
                } else if (opt is OptMingGang) {
                    cnt++;
                } else if (opt is OptAnGang) {
                    cnt++;
                }
            }
            return cnt;
        }

        public function getCardCntInShow(card:MjCard):int {
            var cnt:int = 0;
            for (var i:int = 0; i < showCards.length; i++) {
                var card1:MjCard = showCards[i];
                if (card1.equal(card)) {
                    cnt++;
                }
            }
            return cnt;
        }

        public function removeLastDiscardCard():void {
            _opts.pop();
        }

        public function outPut():String {
            var ss:Array = [];
            ss.push("ag:" + getAnGangCards());
            ss.push("mg:" + getMingGangCards());
            ss.push("sh:" + getChiCards());
            ss.push("ke:" + getPengCards());
            ss.push("pe:" + cloneShowCards());
            return ss.join("|");
        }

        public static function input(s:String):MjPlayer {
            var p:MjPlayer = new MjPlayer();
            var ss:Array = s.split("|");
            for (var i:int = 0; i < ss.length; i++) {
                var str:String = ss[i];
                var ts:String = str.split(":")[0];
                var ps:String = str.split(":")[1];
                var cards:Vector.<MjCard>;
                var j:int;
                switch (ts) {
                    case "ag":
                        cards = getCards(ps);
                        for (j = 0; j < cards.length; j++) {
                            p._opts.push(new OptAnGang(cards[j]));
                        }
                        break;
                    case "mg":
                        cards = getCards(ps);
                        for (j = 0; j < cards.length; j++) {
                            p._opts.push(new OptMingGang(cards[j]));
                        }
                        break;
                    case "sh":
                        cards = getCards(ps);
                        for (j = 0; j < cards.length; j += 3) {
                            p._opts.push(new OptChi(new MjChiInfo(null, cards.slice(j, j + 3))));
                        }
                        break;
                    case "ke":
                        cards = getCards(ps);
                        for (j = 0; j < cards.length; j++) {
                            p._opts.push(new OptPeng(cards[j]));
                        }
                        break;
                    case "pe":
                        cards = getCards(ps);
                        for (j = 0; j < cards.length; j++) {
                            p.showCards.push(cards[j]);
                        }
                        break;
                }
            }
            return p;
        }

        private static function getCards(ps:String):Vector.<MjCard> {
            var v:Vector.<MjCard> = new Vector.<MjCard>();
            if (ps == null || ps == "") {
                return v;
            }
            var ss:Array = ps.split(",");
            for (var i:int = 0; i < ss.length; i++) {
                v.push(MjCard.toCard(ss[i]));
            }
            return v;
        }
    }
}
