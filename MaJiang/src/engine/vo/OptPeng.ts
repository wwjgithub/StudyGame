/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/4
 * Time: 12:18
 */
namespace game {
    export class OptPeng implements IOpt{
        private _card:MjCard;

        constructor(card:MjCard) {
            this._card = card;
        }

        public get card():MjCard {
            return this._card;
        }
    }
}
