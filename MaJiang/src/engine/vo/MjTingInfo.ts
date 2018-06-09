/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-4-3
 * Time: 上午10:46
 */
namespace game {
    export class MjTingInfo {
        //打出去的牌
        public target:MjCard;
        //听的牌
        public tingCards:MjCard[];

        /**
         *
         * @param curCard   可以打的牌
         * @param ting      可以听的牌
         */
        constructor(curCard:MjCard, ting:MjCard[]) {
            this.target = curCard;
            this.tingCards = ting;
        }
    }
}
