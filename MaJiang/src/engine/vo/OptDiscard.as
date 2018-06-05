/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/27
 * Time: 17:15
 */
package engine.vo {
    public class OptDiscard implements IOpt {
        public var card:MjCard;
        public function OptDiscard(card:MjCard) {
            this.card=card;
        }
    }
}
