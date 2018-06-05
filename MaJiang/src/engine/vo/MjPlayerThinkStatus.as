/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-3-19
 * Time: 下午5:34
 */
package engine.vo {
    public class MjPlayerThinkStatus {
        public var chiInfos:Vector.<MjChiInfo> = new Vector.<MjChiInfo>();
        public var pengCards:Vector.<MjCard> = new Vector.<MjCard>();
        public var anGangCards:Vector.<MjCard> = new Vector.<MjCard>();
        public var mingGangCards:Vector.<MjCard> = new Vector.<MjCard>();
        public var buGangCards:Vector.<MjCard> = new Vector.<MjCard>();
        public var isTing:Boolean = false;
        public var huInfo:HuInfo;

        public function MjPlayerThinkStatus() {
        }

        public function hasTrue():Boolean {
            return chiInfos.length > 0
                    || pengCards.length > 0
                    || anGangCards.length > 0
                    || mingGangCards.length > 0
                    || buGangCards.length > 0
                    || isTing
                    || huInfo != null;
        }
    }
}
