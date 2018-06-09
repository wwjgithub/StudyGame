/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/4
 * Time: 12:17
 */
namespace game {
    export class OptAnGang implements IOpt{
        private _card:MjCard;
        public get card():MjCard {
            return this._card;
        }

        constructor(card:MjCard) {
            this._card = card;
        }
    }
}
