namespace game {
    import Sprite = egret.Sprite;
    import Point = egret.Point;
    import Rectangle = egret.Rectangle;

    export class IDiscardMc extends Sprite {
        private cur: number;
        private cardSprite: CardSprite;
        private positions: Array<Point> = new Array<Point>();
        private fromBottom: boolean;
        private static _discardCardSize: Rectangle;

        public static CNT_HOR: Number = 8;
        public static CNT_VER: Number = 7;

        constructor() {
            super();
        }

        public removeLastDiscardCard(): void {
            this.cur--;
            this.removeChild(this.cardSprite);
            Anim.instance.removeDiscardPointer();
        }

        public static get discardCardSize(): Rectangle {
            if (IDiscardMc._discardCardSize == null) {
                IDiscardMc._discardCardSize = new Rectangle(0, 0, 48 * Global.getDiscardCardScale(), 60 * Global.getDiscardCardScale());
            }
            return IDiscardMc._discardCardSize;
        }

        public append(card: MjCard): void {
            SoundManager.play("tileout");
            this.cardSprite = Asset.getDiscardCard(card);
            if (this.cur >= this.positions.length) {
                this.cur = 0;
            }
            this.cardSprite.x = this.positions[this.cur].x;
            this.cardSprite.y = this.positions[this.cur].y;
            this.cardSprite.width = IDiscardMc.discardCardSize.width;
            this.cardSprite.height = IDiscardMc.discardCardSize.height + (10 / 64) * IDiscardMc.discardCardSize.height;
            if (this.fromBottom) {
                this.addChildAt(this.cardSprite, 0);
            } else {
                this.addChild(this.cardSprite);
            }
            this.showPointer(this.cardSprite.x + this.cardSprite.width / 2, this.cardSprite.y + this.cardSprite.height / 6);
            this.dispatchEvent(new MjEvent(MjEvent.DISCARD, false, false, card));
            //
            /*
             if (false) {
             var cardSpriteScale:CardSprite = Asset.getDiscardCard(card);
             cardSpriteScale.x = cardSprite.x;
             cardSpriteScale.y = cardSprite.y;
             addChild(cardSpriteScale);
             var tween:Tween = new Tween(cardSpriteScale, .6);
             tween.animate("scaleX", 3);
             tween.animate("scaleY", 3);
             tween.animate("alpha", 0);
             tween.onComplete = cardSpriteScale.parent.removeChild;
             tween.onCompleteArgs = [cardSpriteScale];
             juggler.add(tween);
             }
             */
            //
            this.cur++;
        }

        private showPointer(x: number, y: number): void {
            var p: Point = new Point(x, y);
            p = this.localToGlobal(p.x,p.y);
            Anim.instance.showDiscardPointer(p);
        }

        clear() {
            this.cur = 0;
            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }

        }
    }
}