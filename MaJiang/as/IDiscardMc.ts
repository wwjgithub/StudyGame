/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/27
 * Time: 11:33
 */
module mjp {
    //import assets.Asset;
    //import assets.AssetSound;

    //import engine.vo.MjCard;

    //import flash.geom.Point;
    //import flash.geom.Rectangle;

    //import starling.display.Sprite;

    export class IDiscardMc extends Sprite {
        public static var CNT_HOR:number = 8;
        public static var CNT_VER:number = 7;
        private positions:Vector.<Point> = new Vector.<Point>();
        private cur:number;
        private fromBottom:boolean;
        private cardSprite:CardSprite;
        /**
         * 打出去的牌的大小
         */
        private static var _discardCardSize:Rectangle;

        public static get YY():number {
            return (UserConst.size.y - discardCardSize.height * CNT_VER) / 5 * 2;
        }

        public static get discardCardSize():Rectangle {
            if (_discardCardSize == null) {
                _discardCardSize = new Rectangle(0, 0, 48 * UserConst.getDiscardCardScale(), 60 * UserConst.getDiscardCardScale());
            }
            return _discardCardSize;
        }

        constructor() {
            cur = 0;
        }

        public clear() {
            cur = 0;
            while (numChildren > 0) {
                removeChildAt(0);
            }
        }

        public initDown() {
            fromBottom = true;
            for (var i:number = 0; i < CNT_HOR * 3; i++) {
                var p:Point = new Point();
                p.x = i % CNT_HOR * discardCardSize.width;
                p.y = -int(i / CNT_HOR) * (discardCardSize.height);
                positions.push(p);
            }
            test()
        }

        public initUp() {
            for (var i:number = 0; i < CNT_HOR * 3; i++) {
                var p:Point = new Point();
                p.x = -i % CNT_HOR * discardCardSize.width;
                p.y = int(i / CNT_HOR) * (discardCardSize.height);
                positions.push(p);
            }
            test()
        }

        public initLeft() {
            for (var i:number = 0; i < CNT_VER * 4; i++) {
                var p:Point = new Point();
                p.x = int(i / CNT_VER) * discardCardSize.width;
                p.y = i % CNT_VER * (discardCardSize.height);
                positions.push(p);
            }
            test()
        }

        public initRight() {
            fromBottom = true;
            for (var i:number = 0; i < CNT_VER * 4; i++) {
                var p:Point = new Point();
                p.x = -int(i / CNT_VER) * discardCardSize.width;
                p.y = -i % CNT_VER * (discardCardSize.height);
                positions.push(p);
            }
            test()
        }

        private test() {
            return;
            for (var i:number = 0; i < 30; i++) {
                append(new MjCard(1, 1))
            }
        }

        public append(card:MjCard) {
            AssetSound.play("tileout");
            cardSprite = Asset.getDiscardCard(card);
            if (cur >= positions.length) {
                cur = 0;
            }
            cardSprite.x = positions[cur].x;
            cardSprite.y = positions[cur].y;
            cardSprite.width = discardCardSize.width;
            cardSprite.height = discardCardSize.height + (10 / 64) * discardCardSize.height;
            if (fromBottom) {
                addChildAt(cardSprite, 0);
            } else {
                addChild(cardSprite);
            }
            showPointer(cardSprite.x + cardSprite.width / 2, cardSprite.y + cardSprite.height / 6);
            dispatchEvent(new MjEvent(MjEvent.DISCARD, false, card));
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
            cur++;
        }

        private showPointer(x:number, y:number) {
            var p:Point = new Point(x, y);
            p = localToGlobal(p);
            Anim.instance.showDiscardPointer(p);
        }

        public getNextPos():Point {
            return positions[cur];
        }

        public removeLastDiscardCard() {
            cur--;
            removeChild(cardSprite);
            Anim.instance.removeDiscardPointer();
        }
    }
}
