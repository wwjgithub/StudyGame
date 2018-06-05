/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 14:26
 */
package engine.vo {
    public class MjFetchInfo {
        private var _fromPlayer:MjPlayer;
        private var _cardIndex:int;
        private var _card:MjCard;

        public function MjFetchInfo(index:int, card:MjCard, fromPlayer:MjPlayer) {
            this._cardIndex = index;
            this._card = card;
            this._fromPlayer = fromPlayer;
        }

        public function get cardIndex():int {
            return _cardIndex;
        }

        public function get card():MjCard {
            return _card;
        }

        public function get fromPlayer():MjPlayer {
            return _fromPlayer;
        }
    }
}
