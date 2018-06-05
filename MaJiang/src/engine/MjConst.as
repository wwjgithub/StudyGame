/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-3-15
 * Time: 上午10:24
 */
package engine {
    import engine.vo.MjCard;

    public class MjConst {
        public static const playtype_4:int = 4;
        public static const playtype_2:int = 2;
        public static const type_wan:int = 1;
        public static const type_tong:int = 2;
        public static const type_tiao:int = 3;
        public static const type_feng:int = 4;
        public static const type_se:int = 5;
        public static const type_hua:int = 6;
        public static const type_se_hong:int = 1;
        public static const type_se_fa:int = 2;
        public static const type_se_bai:int = 3;
        public static const type_feng_dong:int = 1;
        public static const type_feng_nan:int = 2;
        public static const type_feng_xi:int = 3;
        public static const type_feng_bei:int = 4;
        //牌库
        private static var _Total4:Vector.<MjCard> = new Vector.<MjCard>();
        private static var _Total2:Vector.<MjCard> = new Vector.<MjCard>();
        //牌型
        public static const AllWanType:Vector.<MjCard> = new Vector.<MjCard>();
        public static const AllTongType:Vector.<MjCard> = new Vector.<MjCard>();
        public static const AllTiaoType:Vector.<MjCard> = new Vector.<MjCard>();
        public static const AllFengSeType:Vector.<MjCard> = new Vector.<MjCard>();
        public static const All4Type:Vector.<MjCard> = new Vector.<MjCard>();
        public static const All2Type:Vector.<MjCard> = new Vector.<MjCard>();
        initTotal();
        initAll();
        private static function initAll():void {
            var t:int = 0;
            var i:int = 0;
            var card:MjCard;
            for (t = 1; t <= 3; t++) {
                for (i = 1; i <= 9; i++) {
                    card = new MjCard(t, i);
                    All4Type.push(card);
                    if (t == type_wan) {
                        All2Type.push(card);
                        AllWanType.push(card);
                    }
                    if(t==type_tong){
                        AllTongType.push(card);
                    }
                    if(t==type_tiao){
                        AllTiaoType.push(card);
                    }
                }
            }
            t = type_feng;
            for (i = 1; i <= 4; i++) {
                card = new MjCard(t, i);
                All4Type.push(card);
                All2Type.push(card);
                AllFengSeType.push(card);
            }
            t = type_se;
            for (i = 1; i <= 3; i++) {
                card = new MjCard(t, i);
                All4Type.push(card);
                All2Type.push(card);
                AllFengSeType.push(card);
            }
        }

        private static function initTotal():void {
            var t:int = 0;
            var i:int = 0;
            var j:int = 0;
            var card:MjCard;
            //
            for (t = 1; t <= 3; t++) {
                for (i = 1; i <= 9; i++) {
                    for (j = 1; j <= 4; j++) {
                        card = new MjCard(t, i);
                        _Total4.push(card);
                        if (t == type_wan) {
                            _Total2.push(card);
                        }
                    }
                }
            }
            t = type_feng;
            for (i = 1; i <= 4; i++) {
                for (j = 1; j <= 4; j++) {
                    card = new MjCard(t, i);
                    _Total4.push(card);
                    _Total2.push(card);
                }
            }
            t = type_se;
            for (i = 1; i <= 3; i++) {
                for (j = 1; j <= 4; j++) {
                    card = new MjCard(t, i);
                    _Total4.push(card);
                    _Total2.push(card);
                }
            }
            t = type_hua;
            for (i = 1; i <= 4; i++) {
                card = new MjCard(t, i);
                _Total2.push(card);
            }
        }

        public static function Total4():Vector.<MjCard> {
            return _Total4.slice();
        }

        public static function Total2():Vector.<MjCard> {
            return _Total2.slice();
        }

    }
}
