/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/4
 * Time: 12:17
 */
package engine.vo {
    public class OptAnGang implements IOpt{
        private var _card:MjCard;
        public function get card():MjCard {
            return _card;
        }

        public function OptAnGang(card:MjCard) {
            _card = card;
        }
    }
}
