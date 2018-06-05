/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/24
 * Time: 11:13
 */
package engine.vo {
    import engine.MjEngine;

    public class HuInfo {
        //暗碰牌
        public var anKe:Vector.<MjCard> = new Vector.<MjCard>();
        //暗顺
        public var anShun:Vector.<Vector.<MjCard>> = new Vector.<Vector.<MjCard>>();
        //将
        public var jiang:MjCard;
        //和时是别人点的
        private var _mingTarget:MjCard;
        //自摸的牌
        private var _anTarget:MjCard;
        //是抢的别人的杠
        public var qiangGang:Boolean;
        //杠上开花
        public var justGang:Boolean;
        public var fan:int;

        public function HuInfo() {
        }

        public function toString():String {
            return anKe.toString()+"_"+anShun.toString()+"_"+jiang+"_"+target;
        }

        public function get target():MjCard {
            if (_anTarget != null) {
                return _anTarget;
            }
            if (_mingTarget != null) {
                return _mingTarget;
            }
            return null;
        }

        public function get mingTarget():MjCard {
            return _mingTarget;
        }

        public function set mingTarget(value:MjCard):void {
            _mingTarget = value;
            _anTarget = null;
        }

        public function get anTarget():MjCard {
            return _anTarget;
        }

        public function set anTarget(value:MjCard):void {
            _anTarget = value;
            _mingTarget = null;
        }

        public function getValidAnKe():Vector.<MjCard> {
            var kes:Vector.<MjCard> = anKe.slice();
            if(_mingTarget!=null){
                MjEngine.subSpecialCnt(kes, _mingTarget, 1);
            }
            return kes;
        }
    }
}
