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

        public static CNT_HOR: number = 8;
        public static CNT_VER: number = 7;

        constructor() {
            super();
        }
        public initRight():void {
            this.fromBottom = true;
            for (var i = 0; i < IDiscardMc.CNT_VER * 4; i++) {
                var p:Point = new Point();
                p.x = -Math.floor(i / IDiscardMc.CNT_VER) * IDiscardMc.discardCardSize.width;
                p.y = -i % IDiscardMc.CNT_VER * (IDiscardMc.discardCardSize.height);
                this.positions.push(p);
            }
        }

        public  initUp():void {
            for (var i = 0; i < IDiscardMc.CNT_HOR * 3; i++) {
                var p:Point = new Point();
                p.x = -i % IDiscardMc.CNT_HOR * IDiscardMc.discardCardSize.width;
                p.y = Math.floor(i / IDiscardMc.CNT_HOR) * (IDiscardMc.discardCardSize.height);
                this.positions.push(p);
            }
        }

        public initLeft():void {
            for (var i:number = 0; i < IDiscardMc.CNT_VER * 4; i++) {
                var p:Point = new Point();
                p.x = Math.floor(i / IDiscardMc.CNT_VER) * IDiscardMc.discardCardSize.width;
                p.y = i % IDiscardMc.CNT_VER * (IDiscardMc.discardCardSize.height);
                this.positions.push(p);
            }
        }
        public initDown():void {
            this.fromBottom = true;
            for (var i = 0; i < IDiscardMc.CNT_HOR * 3; i++) {
                var p:Point = new Point();
                p.x = i % IDiscardMc.CNT_HOR * IDiscardMc.discardCardSize.width;
                p.y = -Math.floor(i / IDiscardMc.CNT_HOR) * (IDiscardMc.discardCardSize.height);
                this.positions.push(p);
            }
        }
        public getNextPos():Point {
            return this.positions[this.cur];
        }

        public static get YY():number {
            return (Global.stage_h - IDiscardMc.discardCardSize.height * IDiscardMc.CNT_VER) / 5 * 2;
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
