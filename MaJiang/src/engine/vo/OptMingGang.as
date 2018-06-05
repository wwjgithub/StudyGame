/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/4
 * Time: 12:18
 */
package engine.vo {
    public class OptMingGang implements IOpt{
        private var _card:MjCard;
        public function get card():MjCard {
            return _card;
        }

        public function OptMingGang(card:MjCard) {
            _card = card;
        }
    }
}
