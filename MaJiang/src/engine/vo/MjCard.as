/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-3-11
 * Time: 下午4:22
 */
package engine.vo {
    import engine.*;

    /**
     * 麻将牌
     */
    public class MjCard {
        private var _type:int;
        private var _num:int;

        public function get type():int {
            return _type;
        }

        public function get num():int {
            return _num;
        }

        public function MjCard(type:int, num:int) {
            _type = type;
            _num = num;
        }

        public function getPrev():MjCard{
            if(isNumCard()){
                if(num!=1){
                    return new MjCard(type, num - 1);
                }
            }
            return null
        }
        public function getNext():MjCard{
            if(isNumCard()){
                if(num!=9){
                    return new MjCard(type, num + 1);
                }
            }
            return null
        }

        public function toString():String {
            var s:String = "";
            switch (type) {
                case MjConst.type_feng:
                    var ss:Array = ["东风", "南风", "西风", "北风"];
                    s = ss[num - 1];
                    break;
                case MjConst.type_se:
                    var ss1:Array = ["红中", "发财", "白板"];
                    s = ss1[num - 1];
                    break;
                case MjConst.type_hua:
                    var ss4:Array = ["春", "夏", "秋", "冬", "梅", "兰", "竹", "菊"];
                    s = ss4[num - 1];
                    break;
                default :
                    var ss2:Array = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
                    s = ss2[num - 1];
                    if (type == MjConst.type_wan) {
                        s += "万";
                    }
                    if (type == MjConst.type_tong) {
                        s += "筒";
                    }
                    if (type == MjConst.type_tiao) {
                        s += "条";
                    }
                    break;
            }
            return s;
        }

        /**
         * 判断是不是同样的牌
         * @param last
         * @return
         */
        public function equal(last:MjCard):Boolean {
            if (last == null) {
                return false;
            }
            return type == last.type && num == last.num;
        }

        /**
         * 是不是万筒条
         * @return
         */
        public function isNumCard():Boolean {
            return type == MjConst.type_wan || type == MjConst.type_tong || type == MjConst.type_tiao;
        }

        public function clone():MjCard {
            return new MjCard(type, num);
        }

        /**
         * 是否是花牌
         * @return
         */
        public function isHua():Boolean {
            return type == MjConst.type_hua;
        }

        public function isFeng():Boolean {
            return type == MjConst.type_feng;
        }

        public function isSe():Boolean {
            return type == MjConst.type_se;
        }

        public static function fromString(s:String):Vector.<MjCard> {
            var ss:Array = s.split(",");
            var v:Vector.<MjCard> = new Vector.<MjCard>();
            for (var i:int = 0; i < ss.length; i++) {
                var s1:String = ss[i];
                v.push(toCard(s1))
            }
            return v;
        }

        public static function toCard(s:String):MjCard {
            for (var j:int = 0; j < MjConst.All4Type.length; j++) {
                var card:MjCard = MjConst.All4Type[j];
                if (card.toString() == s) {
                    return card;
                }
            }
            return null;
        }
    }
}
