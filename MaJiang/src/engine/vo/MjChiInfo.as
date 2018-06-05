/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-4-7
 * Time: 下午5:29
 */
package engine.vo {
    public class MjChiInfo {
        public var target:MjCard;
        //已经从大到小排序
        public var cards:Vector.<MjCard> = new Vector.<MjCard>();

        public function MjChiInfo(target:MjCard = null, cards:Vector.<MjCard> = null) {
            if (target != null) {
                this.target = target;
            }
            if (cards != null) {
                this.cards = cards;
            }
        }

        public function toString():String {
            return "[吃牌:" + target + ":" + cards + "]";
        }
    }
}
