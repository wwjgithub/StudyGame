/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-4-3
 * Time: 上午10:46
 */
package engine.vo {
    public class MjTingInfo {
        //打出去的牌
        public var target:MjCard;
        //听的牌
        public var tingCards:Vector.<MjCard>;

        /**
         *
         * @param curCard   可以打的牌
         * @param ting      可以听的牌
         */
        public function MjTingInfo(curCard:MjCard, ting:Vector.<MjCard>) {
            this.target = curCard;
            this.tingCards = ting;
        }
    }
}
