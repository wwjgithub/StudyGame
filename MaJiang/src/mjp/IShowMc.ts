/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/24
 * Time: 11:30
 */
module mjp {
    //import assets.Asset;
    //import assets.AssetSound;

    //import engine.vo.IOpt;
    //import engine.vo.MjCard;
    //import engine.vo.MjPlayer;
    //import engine.vo.OptAnGang;
    //import engine.vo.OptChi;
    //import engine.vo.OptMingGang;
    //import engine.vo.OptPeng;

    //import flash.geom.Point;

    //import starling.animation.Tween;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;

    export class IShowMc extends Sprite {
        private showCardMcs:Vector.<CardSprite> = new Vector.<CardSprite>();
        private _updateFunc;
        private _putFetchCardFunc;
        public fetchCardPosition:Point;
        private startPosition:Point;
        public enable:boolean = true;

        constructor() {
        }

        private appendFetchCard(cardMc:CardSprite) {
            AssetSound.play("receive");
            cardMc.x = fetchCardPosition.x;
            cardMc.y = fetchCardPosition.y - 50;
            appendCard(cardMc);
//            var fetchTween:Tween = new Tween(cardMc, 0.5, Transitions.EASE_OUT_BOUNCE);
//            fetchTween.animate("y", fetchCardPosition.y);
            //juggler.add(fetchTween);
            cardMc.addEventListener(MjEvent.FETCH_COMPLETE, onFetchComplete);
            cardMc.moveY(fetchCardPosition.y);
            //TweenLite.to(cardMc, .5, {y: fetchCardPosition.y, ease: Bounce.easeOut})
        }

        private onFetchComplete(event:MjEvent) {
            event.currentTarget.removeEventListener(event.type, onFetchComplete);
            dispatchEvent(event)
        }

        private onFetchDown(card:MjCard) {
            var cardMc:CardSprite = Asset.getFrontStandCard(card);
            appendFetchCard(cardMc);
        }

        private onFetchUp(card:MjCard) {
            var cardMc:CardSprite = Asset.getUpStandCard(card);
            appendFetchCard(cardMc);
        }

        private onFetchRight(card:MjCard) {
            var cardMc:CardSprite = Asset.getRightStandCard(card);
            appendFetchCard(cardMc);
            addChildAt(cardMc, 0);
        }

        private onFetchLeft(card:MjCard) {
            var cardMc:CardSprite = Asset.getLeftStandCard(card);
            appendFetchCard(cardMc);
        }

        public showDistributeAnim(cardIndex:number) {
            var cc:Vector.<CardSprite> = showCardMcs.slice(cardIndex, cardIndex + 4);
            var p:Point = new Point(UserConst.size.x / 2, UserConst.size.y / 2);
            p = this.globalToLocal(p);
            for (var i:number = 0; i < cc.length; i++) {
                var sprite:CardSprite = cc[i];
                var px:number = sprite.x;
                var py:number = sprite.y;
                var psx:number = sprite.scaleX;
                var psy:number = sprite.scaleY;
                sprite.x = p.x;
                sprite.y = p.y;
                sprite.scaleX = sprite.scaleY = .5;
                var tweenLeft:Tween = new Tween(sprite, .3);
                tweenLeft.animate("x", px);
                tweenLeft.animate("y", py);
                tweenLeft.animate("alpha", 1);
                tweenLeft.animate("scaleX", psx);
                tweenLeft.animate("scaleY", psy);
                juggler.add(tweenLeft);
            }
        }

        private showRight(r:MjPlayer) {
            clear();
            var yy:number = 50;
            for (var j:number = 0; j < r.opts.length; j++) {
                var opt:IOpt = r.opts[j];
                var mcc:MjComponent = createComponent(opt);
                if (mcc != null) {
                    mcc.x = startPosition.x;
                    mcc.y = startPosition.y;
                    addChildAt(mcc, 0);
                    startPosition.y -= yy;
                }
            }
            var i:number = 0;
            var mjCards:MjCard[] = r.cloneShowCards();
            for (i = 0; i < mjCards.length; i++) {
                var card:MjCard = mjCards[i];
                var mc:CardSprite = Asset.getRightStandCard(card);
                mc.y = -25 * i - 20;
                mc.x = 40;
                mc.x += startPosition.x;
                mc.y += startPosition.y;
                appendCard(mc);
                addChildAt(mc, 0);
                if (i == mjCards.length - 1) {
                    fetchCardPosition = new Point(mc.x, mc.y - 40)
                }
            }
        }

        private showLeft(r:MjPlayer) {
            clear();
            var yy:number = 50;
            for (var j:number = 0; j < r.opts.length; j++) {
                var opt:IOpt = r.opts[j];
                var mcc:MjComponent = createComponent(opt);
                if (mcc != null) {
                    mcc.x = startPosition.x;
                    mcc.y = startPosition.y;
                    addChild(mcc);
                    startPosition.y += yy;
                }
            }
            var mjCards:MjCard[] = r.cloneShowCards();
            for (var i:number = 0; i < mjCards.length; i++) {
                var card:MjCard = mjCards[i];
                var mc:CardSprite = Asset.getLeftStandCard(card);
                mc.y = 25 * i + 10;
                mc.x = 80;
                mc.x += startPosition.x;
                mc.y += startPosition.y;
                appendCard(mc);
                if (i == mjCards.length - 1) {
                    fetchCardPosition = new Point(mc.x, mc.y + 40)
                }
            }
        }

        private static function createComponent(opt:IOpt):MjComponent {
            if (opt is OptAnGang) {
                return ComponentFactory.createAnGangForOther((opt as OptAnGang).card);
            }
            if (opt is OptMingGang) {
                return ComponentFactory.createMingGangForOther((opt as OptMingGang).card);
            }
            if (opt is OptPeng) {
                return ComponentFactory.createPengForOther((opt as OptPeng).card);
            }
            if (opt is OptChi) {
                return ComponentFactory.createChiForOther((opt as OptChi).chiInfo.cards);
            }
            return null;
        }

        private showUp(r:MjPlayer) {
            clear();
            var xx:number = UserConst.UP_CARD_WIDTH * 3;
            for (var j:number = 0; j < r.opts.length; j++) {
                var opt:IOpt = r.opts[j];
                var mcc:MjComponent = createComponent(opt);
                if (mcc != null) {
                    startPosition.x -= xx;
                    mcc.x = startPosition.x;
                    mcc.y = startPosition.y;
                    addChild(mcc);
                }
            }
            startPosition.x -= 10;
            var mjCards:MjCard[] = r.cloneShowCards();
            for (var i:number = 0; i < mjCards.length; i++) {
                var card:MjCard = mjCards[i];
                var mc:CardSprite = Asset.getUpStandCard(card);
                startPosition.x -= mc.width;
                //mc.x = -(mc.width - 2) * i + 70;
                mc.x = startPosition.x;
                mc.y = startPosition.y;
                appendCard(mc);
                if (i == mjCards.length - 1) {
                    fetchCardPosition = new Point(mc.x - mc.width - 10, mc.y)
                }
            }
        }

        private showDown(r:MjPlayer) {
            clear();
            updateHeroShowOnly(r)
        }

        public updateHeroShowOnly(r:MjPlayer) {
            var mjCards:MjCard[] = r.cloneShowCards();
            for (var i:number = 0; i < mjCards.length; i++) {
                var card:MjCard = mjCards[i];
                var mc:CardSprite = Asset.getFrontStandCard(card);
                mc.x = mc.width * i;
                mc.x += startPosition.x;
                mc.y += startPosition.y;
                appendCard(mc);
                if (i == mjCards.length - 1) {
                    fetchCardPosition = new Point(mc.x + mc.width + 10, mc.y)
                }
            }
        }

        private clear() {
            startPosition = new Point();
            while (numChildren > 0) {
                removeChildAt(0);
            }
            showCardMcs = new Vector.<CardSprite>();
        }

        private appendCard(mc:CardSprite) {
            addChild(mc);
            showCardMcs.push(mc);
            mc.addEventListener(TouchEvent.TOUCH, onClickCard);
            mc.addEventListener(Event.REMOVED_FROM_STAGE, onCardRemove);
        }

        private onCardRemove(event:Event) {
            var mc:CardSprite = CardSprite(event.currentTarget);
            mc.removeEventListener(TouchEvent.TOUCH, onClickCard);
            mc.removeEventListener(Event.REMOVED_FROM_STAGE, onCardRemove);
        }

        protected function onClickCard(event:TouchEvent) {
            if (!enable)return;
            var mc:CardSprite = CardSprite(event.currentTarget);
            if (event.getTouch(mc, TouchPhase.ENDED)) {
                discard(mc);
            } else if (event.getTouch(mc, TouchPhase.BEGAN)) {
                AssetSound.play("select");
                mc.oriY = mc.y;
                mc.y -= 30;
            }
        }

        protected function discard(mc:CardSprite) {
            showCardMcs.splice(showCardMcs.indexOf(mc), 1);
            dispatchEvent(new MjEvent(MjEvent.DISCARD_SHOWMC, false, mc));
        }

        public initUp() {
            _updateFunc = showUp;
            _putFetchCardFunc = onFetchUp;
        }

        public initRight() {
            _updateFunc = showRight;
            _putFetchCardFunc = onFetchRight;
        }

        public initDown() {
            _updateFunc = showDown;
            _putFetchCardFunc = onFetchDown;
        }

        public initLeft() {
            _updateFunc = showLeft;
            _putFetchCardFunc = onFetchLeft;
        }

        public get updateFunc() {
            return _updateFunc;
        }

        public get putFetchCardFunc() {
            return _putFetchCardFunc;
        }

        /**
         * 听牌时如果没有操作,自动打出最的一张牌
         */
        public discardLastFetchCard() {
            discard(showCardMcs[showCardMcs.length - 1]);
        }

        public hideForDistribute() {
            for (var i:number = 0; i < showCardMcs.length; i++) {
                var sp:CardSprite = showCardMcs[i];
                sp.alpha = 0;
            }
        }

        public setEnable() {
            enable = true;
        }
    }
}
