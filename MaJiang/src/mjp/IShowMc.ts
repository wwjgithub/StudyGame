namespace game {
    import Sprite = egret.Sprite;
    import Point = egret.Point;

    export class IShowMc extends Sprite {
        protected showCardMcs: Array<CardSprite> = new Array<CardSprite>();
        public startPosition: egret.Point;
        public fetchCardPosition: Point;
        public enable: Boolean = true;
        private _updateFunc: Function;
        private _putFetchCardFunc: Function;

        constructor() {
            super();
        }

        public removeFilter(): void {
            for (var j: number = 0; j < this.showCardMcs.length; j++) {
                this.showCardMcs[j].filters = [];
            }
        }

        private appendCard(mc: CardSprite): void {
            this.addChild(mc);
            this.showCardMcs.push(mc);
            mc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickCard, this);
            mc.addEventListener(egret.TouchEvent.TOUCH_END, this.onClickCard, this);
            mc.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onCardRemove, this);
        }


        public initUp(): void {
            this._updateFunc = this.showUp;
            this._putFetchCardFunc = this.onFetchUp;
        }

        private showUp(r: MjPlayer): void {
            this.clear();
            var xx: number = Global.UP_CARD_WIDTH * 3;
            for (var j: number = 0; j < r.opts.length; j++) {
                var opt: IOpt = r.opts[j];
                var mcc: MjComponent = IShowMc.createComponent(opt);
                if (mcc != null) {
                    this.startPosition.x -= xx;
                    mcc.x = this.startPosition.x;
                    mcc.y = this.startPosition.y;
                    this.addChild(mcc);
                }
            }
            this.startPosition.x -= 10;
            var mjCards: Array<MjCard> = r.cloneShowCards();
            for (var i: number = 0; i < mjCards.length; i++) {
                var card: MjCard = mjCards[i];
                var mc: CardSprite = Asset.getUpStandCard(card);
                this.startPosition.x -= mc.width;
                //mc.x = -(mc.width - 2) * i + 70;
                mc.x = this.startPosition.x;
                mc.y = this.startPosition.y;
                this.appendCard(mc);
                if (i == mjCards.length - 1) {
                    this.fetchCardPosition = new Point(mc.x - mc.width - 10, mc.y)
                }
            }
        }

        private onCardRemove(event: egret.Event): void {
            var mc: CardSprite = <CardSprite>(event.currentTarget);
            mc.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickCard, this);
            mc.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClickCard, this);
            mc.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onCardRemove, this);
        }

        protected onClickCard(event: egret.TouchEvent): void {
            if (!this.enable) return;
            var mc: CardSprite = <CardSprite>(event.currentTarget);

            if (event.type == egret.TouchEvent.TOUCH_END) {
                this.discard(mc);
            } else if (event.type === egret.TouchEvent.TOUCH_BEGIN) {
                SoundManager.play("select");
                mc.oriY = mc.y;
                mc.y -= 30;
            }
        }
        public setEnable():void {
            this.enable = true;
        }
        public discardLastFetchCard():void {
            this.discard(this.showCardMcs[this.showCardMcs.length - 1]);
        }

        protected discard(mc: CardSprite): void {
            this.showCardMcs.splice(this.showCardMcs.indexOf(mc), 1);
            this.dispatchEvent(new MjEvent(MjEvent.DISCARD_SHOWMC, false, false, mc));
        }

        private appendFetchCard(cardMc: CardSprite): void {
            SoundManager.play("receive");
            cardMc.x = this.fetchCardPosition.x;
            cardMc.y = this.fetchCardPosition.y - 50;
            this.appendCard(cardMc);
//            var fetchTween:Tween = new Tween(cardMc, 0.5, Transitions.EASE_OUT_BOUNCE);
//            fetchTween.animate("y", fetchCardPosition.y);
            //juggler.add(fetchTween);
            cardMc.addEventListener(MjEvent.FETCH_COMPLETE, this.onFetchComplete, this);
            cardMc.moveY(this.fetchCardPosition.y);
            //TweenLite.to(cardMc, .5, {y: fetchCardPosition.y, ease: Bounce.easeOut})
        }

        private onFetchComplete(event: MjEvent): void {
            event.currentTarget.removeEventListener(event.type, this.onFetchComplete, this);
            this.dispatchEvent(event)
        }

        private onFetchDown(card: MjCard): void {
            var cardMc: CardSprite = Asset.getFrontStandCard(card);
            this.appendFetchCard(cardMc);
        }

        private onFetchUp(card: MjCard): void {
            var cardMc: CardSprite = Asset.getUpStandCard(card);
            this.appendFetchCard(cardMc);
        }

        private onFetchRight(card: MjCard): void {
            var cardMc: CardSprite = Asset.getRightStandCard(card);
            this.appendFetchCard(cardMc);
            this.addChildAt(cardMc, 0);
        }

        private onFetchLeft(card: MjCard): void {
            var cardMc: CardSprite = Asset.getLeftStandCard(card);
            this.appendFetchCard(cardMc);
        }

        public initRight(): void {
            this._updateFunc = this.showRight;
            this._putFetchCardFunc = this.onFetchRight;
        }

        private static createComponent(opt: IOpt): MjComponent {
            if (opt instanceof OptAnGang) {
                return ComponentFactory.createAnGangForOther((opt as OptAnGang).card);
            }
            if (opt instanceof OptMingGang) {
                return ComponentFactory.createMingGangForOther((opt as OptMingGang).card);
            }
            if (opt instanceof OptPeng) {
                return ComponentFactory.createPengForOther((opt as OptPeng).card);
            }
            if (opt instanceof OptChi) {
                return ComponentFactory.createChiForOther((opt as OptChi).chiInfo.cards);
            }
            return null;
        }

        private showRight(r: MjPlayer): void {
            this.clear();
            var yy = 50;
            for (var j = 0; j < r.opts.length; j++) {
                var opt: IOpt = r.opts[j];
                var mcc: MjComponent = IShowMc.createComponent(opt);
                if (mcc != null) {
                    mcc.x = this.startPosition.x;
                    mcc.y = this.startPosition.y;
                    this.addChildAt(mcc, 0);
                    this.startPosition.y -= yy;
                }
            }
            var i: number = 0;
            var mjCards: Array<MjCard> = r.cloneShowCards();
            for (i = 0; i < mjCards.length; i++) {
                var card: MjCard = mjCards[i];
                var mc: CardSprite = Asset.getRightStandCard(card);
                mc.y = -25 * i - 20;
                mc.x = 40;
                mc.x += this.startPosition.x;
                mc.y += this.startPosition.y;
                this.appendCard(mc);
                this.addChildAt(mc, 0);
                if (i == mjCards.length - 1) {
                    this.fetchCardPosition = new Point(mc.x, mc.y - 40)
                }
            }
        }

        public initDown(): void {
            this._updateFunc = this.showDown;
            this._putFetchCardFunc = this.onFetchDown;
        }

        private showDown(r: MjPlayer): void {
            this.clear();
            this.updateHeroShowOnly(r)
        }

        public updateHeroShowOnly(r: MjPlayer): void {
            var mjCards: Array<MjCard> = r.cloneShowCards();
            for (var i = 0; i < mjCards.length; i++) {
                var card: MjCard = mjCards[i];
                var mc: CardSprite = Asset.getFrontStandCard(card);
                mc.x = mc.width * i;
                mc.x += this.startPosition.x;
                mc.y += this.startPosition.y;
                this.appendCard(mc);
                if (i == mjCards.length - 1) {
                    this.fetchCardPosition = new Point(mc.x + mc.width + 10, mc.y)
                }
            }
        }

        public initLeft(): void {
            this._updateFunc = this.showLeft;
            this._putFetchCardFunc = this.onFetchLeft;
        }

        private showLeft(r: MjPlayer): void {
            this.clear();
            var yy = 50;
            for (var j = 0; j < r.opts.length; j++) {
                var opt: IOpt = r.opts[j];
                var mcc: MjComponent = IShowMc.createComponent(opt);
                if (mcc != null) {
                    mcc.x = this.startPosition.x;
                    mcc.y = this.startPosition.y;
                    this.addChild(mcc);
                    this.startPosition.y += yy;
                }
            }
            var mjCards: Array<MjCard> = r.cloneShowCards();
            for (var i = 0; i < mjCards.length; i++) {
                var card: MjCard = mjCards[i];
                var mc: CardSprite = Asset.getLeftStandCard(card);
                mc.y = 25 * i + 10;
                mc.x = 80;
                mc.x += this.startPosition.x;
                mc.y += this.startPosition.y;
                this.appendCard(mc);
                if (i == mjCards.length - 1) {
                    this.fetchCardPosition = new Point(mc.x, mc.y + 40)
                }
            }
        }

        public get updateFunc(): Function {
            return this._updateFunc;
        }

        public hideForDistribute(): void {
            for (var i: number = 0; i < this.showCardMcs.length; i++) {
                var sp: CardSprite = this.showCardMcs[i];
                sp.alpha = 0;
            }
        }

        public showDistributeAnim(cardIndex: number): void {
            var cc: Array<CardSprite> = this.showCardMcs.slice(cardIndex, cardIndex + 4);
            var p: Point = new Point(Global.stage_w / 2, Global.stage_h / 2);
            p = this.globalToLocal(p.x, p.y);
            for (var i = 0; i < cc.length; i++) {
                var sprite: CardSprite = cc[i];
                var px: number = sprite.x;
                var py: number = sprite.y;
                var psx: number = sprite.scaleX;
                var psy: number = sprite.scaleY;
                sprite.x = p.x;
                sprite.y = p.y;
                sprite.scaleX = sprite.scaleY = .5;
                egret.Tween.get(sprite).to({x: px, y: py, alpha: 1, scaleX: psx, scaleY: psy}, 300).play()
            }
        }

        public get putFetchCardFunc(): Function {
            return this._putFetchCardFunc;
        }

        clear() {

            this.startPosition = new Point();
            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }
            this.showCardMcs = new Array<CardSprite>();

        }
    }
}
