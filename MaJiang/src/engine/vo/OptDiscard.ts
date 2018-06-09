/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/27
 * Time: 17:15
 */
namespace game {
    export class OptDiscard implements IOpt {
        public card:MjCard;
        constructor(card:MjCard) {
            this.card=card;
        }
    }
}
