/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/4
 * Time: 12:18
 */
module engine.vo {
    export class OptMingGang implements IOpt{
        private _card:MjCard;
        public get card():MjCard {
            return this._card;
        }

        constructor(card:MjCard) {
            this._card = card;
        }
    }
}