/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-3-15
 * Time: 上午10:24
 */

namespace game {

    import MjCard = engine.MjCard;

    export class MjConst {
        public static playtype_4:number = 4;
        public static playtype_2:number = 2;
        public static type_wan:number = 1;
        public static type_tong:number = 2;
        public static type_tiao:number = 3;
        public static type_feng:number = 4;
        public static type_se:number = 5;
        public static type_hua:number = 6;
        public static type_se_hong:number = 1;
        public static type_se_fa:number = 2;
        public static type_se_bai:number = 3;
        public static type_feng_dong:number = 1;
        public static type_feng_nan:number = 2;
        public static type_feng_xi:number = 3;
        public static type_feng_bei:number = 4;
        //牌库
        private static _Total4:MjCard[] = [];
        private static _Total2:MjCard[] = [];
        //牌型
        public static AllWanType:MjCard[] = [];
        public static AllTongType:MjCard[] = [];
        public static AllTiaoType:MjCard[] = [];
        public static AllFengSeType:MjCard[] = [];
        public static All4Type:MjCard[] = [];
        public static All2Type:MjCard[] = [];
        private static initAll() {
            var t:number = 0;
            var i:number = 0;
            var card:MjCard;
            for (t = 1; t <= 3; t++) {
                for (i = 1; i <= 9; i++) {
                    card = new MjCard(t, i);
                    MjConst.All4Type.push(card);
                    if (t == MjConst.type_wan) {
                        MjConst.All2Type.push(card);
                        MjConst.AllWanType.push(card);
                    }
                    if(t==MjConst.type_tong){
                        MjConst.AllTongType.push(card);
                    }
                    if(t==MjConst.type_tiao){
                        MjConst.AllTiaoType.push(card);
                    }
                }
            }
            t = MjConst.type_feng;
            for (i = 1; i <= 4; i++) {
                card = new MjCard(t, i);
                MjConst.All4Type.push(card);
                MjConst.All2Type.push(card);
                MjConst.AllFengSeType.push(card);
            }
            t = MjConst.type_se;
            for (i = 1; i <= 3; i++) {
                card = new MjCard(t, i);
                MjConst.All4Type.push(card);
                MjConst.All2Type.push(card);
                MjConst.AllFengSeType.push(card);
            }
        }

        private static initTotal() {
            var t:number = 0;
            var i:number = 0;
            var j:number = 0;
            var card:MjCard;
            //
            for (t = 1; t <= 3; t++) {
                for (i = 1; i <= 9; i++) {
                    for (j = 1; j <= 4; j++) {
                        card = new MjCard(t, i);
                        MjConst._Total4.push(card);
                        if (t == MjConst.type_wan) {
                            MjConst._Total2.push(card);
                        }
                    }
                }
            }
            t = MjConst.type_feng;
            for (i = 1; i <= 4; i++) {
                for (j = 1; j <= 4; j++) {
                    card = new MjCard(t, i);
                    MjConst._Total4.push(card);
                    MjConst._Total2.push(card);
                }
            }
            t = MjConst.type_se;
            for (i = 1; i <= 3; i++) {
                for (j = 1; j <= 4; j++) {
                    card = new MjCard(t, i);
                    MjConst._Total4.push(card);
                    MjConst._Total2.push(card);
                }
            }
            t = MjConst.type_hua;
            for (i = 1; i <= 4; i++) {
                card = new MjCard(t, i);
                MjConst._Total2.push(card);
            }
        }

        public static Total4():MjCard[] {
            return MjConst._Total4.slice();
        }

        public static Total2():MjCard[] {
            return MjConst._Total2.slice();
        }

    }
}
