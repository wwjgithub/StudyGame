/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/24
 * Time: 11:13
 */
namespace game {
    //import engine.MjEngine;

    export class HuInfo {
        //暗碰牌
        public anKe:MjCard[] = [];
        //暗顺
        public anShun:MjCard[][] = [];
        //将
        public jiang:MjCard;
        //和时是别人点的
        private _mingTarget:MjCard;
        //自摸的牌
        private _anTarget:MjCard;
        //是抢的别人的杠
        public qiangGang:boolean;
        //杠上开花
        public justGang:boolean;
        public fan:number;

        constructor() {
        }

        public toString():string {
            return this.anKe.toString()+"_"+this.anShun.toString()+"_"+this.jiang+"_"+this.target;
        }

        public get target():MjCard {
            if (this._anTarget != null) {
                return this._anTarget;
            }
            if (this._mingTarget != null) {
                return this._mingTarget;
            }
            return null;
        }

        public get mingTarget():MjCard {
            return this._mingTarget;
        }

        public set mingTarget(value:MjCard) {
            this._mingTarget = value;
            this._anTarget = null;
        }

        public get anTarget():MjCard {
            return this._anTarget;
        }

        public set anTarget(value:MjCard) {
            this._anTarget = value;
            this._mingTarget = null;
        }

        public getValidAnKe():MjCard[] {
            var kes:MjCard[] = this.anKe.slice();
            if(this._mingTarget!=null){
                MjEngine.subSpecialCnt(kes, this._mingTarget, 1);
            }
            return kes;
        }
    }
}
