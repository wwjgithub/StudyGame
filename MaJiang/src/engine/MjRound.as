/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-4-17
 * Time: 下午5:43
 */
package engine {
    import engine.vo.MjCard;
    import engine.vo.MjChiInfo;
    import engine.vo.MjFetchInfo;
    import engine.vo.MjPlayer;

    import flash.events.Event;
    import flash.events.EventDispatcher;

    public class MjRound extends EventDispatcher {
        private var _players:Vector.<MjPlayer > = new Vector.<MjPlayer>();
        private var _playType:int;
        private var cards:Vector.<MjCard> = new Vector.<MjCard>();
        public var quanFeng:int;
        public static const CNT_CHANGE:String = "CNT_CHANGE";
        public var menFeng:int;
        public static var instance:MjRound;

        public static function init(playType:int):void {
            instance = new MjRound(playType);
        }

        public function MjRound(playType:int) {
            this._playType = playType;
            _players = new Vector.<MjPlayer>();
            var i:int = 0;
            for (i = 0; i < playType; i++) {
                var mjPlayer:MjPlayer = new MjPlayer();
                _players.push(mjPlayer);
            }
        }

        /**
         * 摸牌
         * @return [playerId,cardId]
         */
        public function fetch(reverse:Boolean):MjFetchInfo {
            if (cards.length <= 0) {
                return null;
            }
            var info:MjFetchInfo;
            if (!reverse) {
                info = new MjFetchInfo(0, cards.shift(), null);
            } else {
                info = new MjFetchInfo(0, cards.pop(), null)
            }
            dispatchEvent(new Event(CNT_CHANGE));
            return info
        }

        /**
         * 是否还有可抓的牌
         * @return
         */
        public function hasCard():Boolean {
            return cards.length > 0;
        }

        public function get players():Vector.<MjPlayer> {
            return _players;
        }

        /**
         * 初始时,给所有玩家立即分好13牌
         */
        public function fetchCardsImmediate(cs1:Vector.<MjCard> = null, cs2:Vector.<MjCard> = null, cs3:Vector.<MjCard> = null, cs4:Vector.<MjCard> = null, csLast:Vector.<MjCard> = null, csLastReverse:Vector.<MjCard> = null,cardLib:Vector.<MjCard>=null):void {
            if (cs1 == null) {
                cs1 = new Vector.<MjCard>();
            }
            if (cs2 == null) {
                cs2 = new Vector.<MjCard>();
            }
            if (cs3 == null) {
                cs3 = new Vector.<MjCard>();
            }
            if (cs4 == null) {
                cs4 = new Vector.<MjCard>();
            }
            if (csLast == null) {
                csLast = new Vector.<MjCard>();
            }
            if (csLastReverse == null) {
                csLastReverse = new Vector.<MjCard>();
            }
            //
            var temp:Vector.<MjCard>;
            if(cardLib==null) {
                if (_playType == MjConst.playtype_2) {
                    temp = MjConst.Total2();
                }
                else {
                    temp = MjConst.Total4();
                }
                var css:Vector.<MjCard> = new Vector.<MjCard>();
                css = css.concat(cs1);
                css = css.concat(cs2);
                css = css.concat(cs3);
                css = css.concat(cs4);
                css = css.concat(csLast);
                css = css.concat(csLastReverse);
                MjEngine.subContain(temp, css);
            }else{
                temp = cardLib;
            }
            var lib:Vector.<MjCard> = new Vector.<MjCard>();
            while (temp.length > 0) {
                var i2:int = int(Math.random() * temp.length);
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
            _players[0].updateShowCards(cs1);
            _players[1].updateShowCards(cs2);
            _players[2].updateShowCards(cs3);
            _players[3].updateShowCards(cs4);
            this.cards = csLast;
        }

        public function get playType():int {
            return _playType;
        }

        public function getCardCnt():int {
            return cards.length
        }

        /**
         * 除去吃碰的和所有人打出去的,还有多少张牌
         * @param target
         * @return
         */
        public function getOpenCardCnt(target:MjCard):int {
            var cnt:int = 0;
            for (var i:int = 0; i < players.length; i++) {
                var player:MjPlayer = players[i];
                var pendCards:Vector.<MjCard> = player.getPengCards();
                for (var j:int = 0; j < pendCards.length; j++) {
                    if (pendCards[j].equal(target)) {
                        cnt += 3;
                        break;
                    }
                }
                var gangCards:Vector.<MjCard> = player.getMingGangCards();
                for (var l:int = 0; l < gangCards.length; l++) {
                    if (gangCards[l].equal(target)) {
                        cnt += 4;
                        break;
                    }
                }
                var chiInfos:Vector.<MjChiInfo> = player.getChiInfos();
                for (var k:int = 0; k < chiInfos.length; k++) {
                    var info:MjChiInfo = chiInfos[k];
                    for (var kk:int = 0; kk < info.cards.length; kk++) {
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
}
