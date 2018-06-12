namespace game {
    import Sprite = egret.Sprite;

    export class CardSprite extends Sprite {
        private _card: MjCard;
        public oriY: number;

        constructor(card:MjCard) {
            super();
            this._card=card;
            this.touchEnabled=true;
            this.touchChildren=false;
        }

        public get card(): MjCard {
            return this._card;
        }

        public moveY(y: number): void {
            egret.Tween.get(this, {}).to({"y": y}, 300).play().call(this.moveComplete, this);
        }

        private moveComplete(): void {
            this.dispatchEvent(new egret.Event(MjEvent.FETCH_COMPLETE))
        }
    }
}
