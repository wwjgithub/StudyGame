/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 14:26
 */
module engine.vo {
    export class MjFetchInfo {
        private _fromPlayer:MjPlayer;
        private _cardIndex:number;
        private _card:MjCard;

        constructor(index:number, card:MjCard, fromPlayer:MjPlayer) {
            this._cardIndex = index;
            this._card = card;
            this._fromPlayer = fromPlayer;
        }

        public get cardIndex():number {
            return this._cardIndex;
        }

        public get card():MjCard {
            return this._card;
        }

        public get fromPlayer():MjPlayer {
            return this._fromPlayer;
        }
    }
}
