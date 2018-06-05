/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-3-11
 * Time: 下午4:22
 */
module engine.vo {
    //import engine.*;

    /**
     * 麻将牌
     */
    export class MjCard {
        private _type:number;
        private _num:number;

        public get type():number {
            return this._type;
        }

        public get num():number {
            return this._num;
        }

        constructor(type:number, num:number) {
            this._type = type;
            this._num = num;
        }

        public getPrev():MjCard{
            if(this.isNumCard()){
                if(num!=1){
                    return new MjCard(this.type, num - 1);
                }
            }
            return null
        }
        public getNext():MjCard{
            if(this.isNumCard()){
                if(num!=9){
                    return new MjCard(this.type, num + 1);
                }
            }
            return null
        }

        public toString():string {
            var s:string = "";
            switch (this.type) {
                case MjConst.type_feng:
                    var ss = ["东风", "南风", "西风", "北风"];
                    s = ss[num - 1];
                    break;
                case MjConst.type_se:
                    var ss1 = ["红中", "发财", "白板"];
                    s = ss1[num - 1];
                    break;
                case MjConst.type_hua:
                    var ss4 = ["春", "夏", "秋", "冬", "梅", "兰", "竹", "菊"];
                    s = ss4[num - 1];
                    break;
                default :
                    var ss2 = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
                    s = ss2[num - 1];
                    if (this.type == MjConst.type_wan) {
                        s += "万";
                    }
                    if (this.type == MjConst.type_tong) {
                        s += "筒";
                    }
                    if (this.type == MjConst.type_tiao) {
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
        public equal(last:MjCard):boolean {
            if (last == null) {
                return false;
            }
            return this.type == last.type && num == last.num;
        }

        /**
         * 是不是万筒条
         * @return
         */
        public isNumCard():boolean {
            return this.type == MjConst.type_wan || this.type == MjConst.type_tong || this.type == MjConst.type_tiao;
        }

        public clone():MjCard {
            return new MjCard(this.type, num);
        }

        /**
         * 是否是花牌
         * @return
         */
        public isHua():boolean {
            return this.type == MjConst.type_hua;
        }

        public isFeng():boolean {
            return this.type == MjConst.type_feng;
        }

        public isSe():boolean {
            return this.type == MjConst.type_se;
        }

        public static fromString(s:string):MjCard[] {
            var ss = s.split(",");
            var v:MjCard[] = [];
            for (var i:number = 0; i < ss.length; i++) {
                var s1:string = ss[i];
                v.push(MjCard.toCard(s1))
            }
            return v;
        }

        public static toCard(s:string):MjCard {
            for (var j:number = 0; j < MjConst.All4Type.length; j++) {
                var card:MjCard = MjConst.All4Type[j];
                if (card.toString() == s) {
                    return card;
                }
            }
            return null;
        }
    }
}
