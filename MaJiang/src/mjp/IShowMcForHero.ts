namespace game {
    import Sprite = egret.Sprite;
    import Point = egret.Point;
    import Rectangle = egret.Rectangle;
    import ColorMatrixFilter = egret.ColorMatrixFilter;
    import Bitmap = egret.Bitmap;
    import BitmapText = egret.BitmapText;
    import DisplayObject = egret.DisplayObject;

    export class IShowMcForHero extends IShowMc {
//选择听牌时,选择点击的牌
        private curDiscardCard: CardSprite;
        private tingInfos: Array<MjTingInfo>;
        //选择听牌时,点击打的牌,显示的可以听的牌
        private tingTip: Sprite;
        private playerHero: PlayerHero;
        private touchBeginPoint: Point;
        private curCardShape: Sprite;

        constructor(playerHero) {
            super();
            this.playerHero = playerHero;
            this.touchEnabled = true;
            this.touchChildren = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchShow, this)
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchShow, this)
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchShow, this)
        }

        public stopSelectTing(): void {
            this.removeCurCardShape();
            this.tingInfos = null;
            for (var m: number = 0; m < this.showCardMcs.length; m++) {
                var sprite: CardSprite = this.showCardMcs[m];
                sprite.filters = [];
            }
            Global.removeMe(this.tingTip);
            this.tingTip = null;
            if (this.curDiscardCard != null) {
                this.curDiscardCard.y = this.curDiscardCard.oriY;
            }
            this.curDiscardCard = null;
        }

        public startSelectTing(tingInfo: Array<MjTingInfo>): void {
            this.tingInfos = tingInfo;
            var dcards: Array<MjCard> = [];
            for (var i: number = 0; i < tingInfo.length; i++) {
                var info: MjTingInfo = tingInfo[i];
                var has: Boolean = false;
                for (var j: number = 0; j < dcards.length; j++) {
                    var card: MjCard = dcards[j];
                    if (card.equal(info.target)) {
                        has = true;
                    }
                }
                if (!has) {
                    dcards.push(info.target);
                }
            }
            for (var m: number = 0; m < this.showCardMcs.length; m++) {
                var sprite: CardSprite = this.showCardMcs[m];
                var needd: Boolean = false;
                for (var n: number = 0; n < dcards.length; n++) {
                    var card1: MjCard = dcards[n];
                    if (sprite.card.equal(card1)) {
                        needd = true;
                    }
                }
                if (needd) {
                } else {
                    var filter: ColorMatrixFilter = new ColorMatrixFilter();
                    sprite.filters = [new ColorMatrixFilter(FilterUtil.getBrightnessMatrix(-0.5))]
                }
            }
        }

        private addComponentCenter(mcc: MjComponent): void {
            var p: Point = new Point(Global.stage_w / 2, Global.stage_h / 2);
            p = this.globalToLocal(p.x, p.y);
            mcc.x = p.x - mcc.width / 2;
            mcc.y = p.y - mcc.height / 2;
            this.addChild(mcc);
            //组合动画
            var left: DisplayObject = mcc.getChildAt(0);
            var right: DisplayObject = mcc.getChildAt(2);
            left.x -= 30;
            right.x += 30;
            egret.Tween.get(left).to({x: left.x + 30}, 100).play();
            egret.Tween.get(right).to({x: right.x - 30}, 100).play();
        }

        private animComponent(mcc: MjComponent, round: MjPlayer): void {
            /*var tween:Tween = new Tween(mcc, 1);
             tween.animate("x", (round.commonOptCnt - 1) * 200);
             tween.animate("y", 0);
             juggler.add(tween);*/
            mcc.moveTo((round.commonOptCnt - 1) * Global.getComponentWidth(), 0);
            //
            this.startPosition.x = round.commonOptCnt * Global.getComponentWidth();
            this.startPosition.y = 0;
            //
            this.resortShowCards(round, false);
        }

        private synShowCards(): void {
            var mjCards = this.playerHero.core.cloneShowCards();
            //移除不正确的牌,可忽略
            for (var i: number = 0; i < this.showCardMcs.length; i++) {
                var mc: CardSprite = this.showCardMcs[i];
                if (mjCards.indexOf(mc.card) == -1) {
                    Global.removeMe(mc);
                    this.showCardMcs.splice(i, 1);
                    i--;
                }
            }
            //同步顺序
            for (var k: number = 0; k < mjCards.length; k++) {
                var card: MjCard = mjCards[k];
                for (var m: number = 0; m < this.showCardMcs.length; m++) {
                    var sprite: CardSprite = this.showCardMcs[m];
                    if (sprite.card == card) {
                        var mcs: CardSprite = this.showCardMcs.splice(m, 1)[0];
                        this.showCardMcs.splice(k, 0, mcs);
                    }
                }
            }
        }

        private insertLastFetchCard(mc: CardSprite, index: number): void {
            egret.Tween.get(mc).to({y: mc.y - 100}, 100).to({x: mc.width * index + this.startPosition.x}, 300).to({y: mc.y}, 100).play()
        }

        public showHeroChiAnim(mjChiInfo: MjChiInfo, round: MjPlayer): void {
            var mcc: MjComponent = ComponentFactory.createChiForHero(mjChiInfo.cards);
            this.addComponentCenter(mcc);
            egret.setTimeout(this.animComponent, this, 200, mcc, round);
        }

        public showHeroPengAnim(card: MjCard, round: MjPlayer): void {
            var mcc: MjComponent = ComponentFactory.createPengForHero(card);
            mcc.card = card;
            this.addComponentCenter(mcc);
            egret.setTimeout(this.animComponent, this, 200, mcc, round);
        }

        public showHeroMingGangAnim(card: MjCard, round: MjPlayer): void {
            var mcc: MjComponent = ComponentFactory.createMingGangForHero(card);
            this.addComponentCenter(mcc);
            egret.setTimeout(this.animComponent, this, 200, mcc, round);
        }

        public showHeroBuGangAnim(card: MjCard, round: MjPlayer): void {
            for (var i: number = 0; i < this.numChildren; i++) {
                var mc: DisplayObject = this.getChildAt(i);
                if (mc instanceof MjComponent) {
                    var pengComponent: MjComponent = (mc as MjComponent);
                    if (card.equal(pengComponent.card)) {
                        this.removeChild(pengComponent);
                        var mcc1: MjComponent = ComponentFactory.createMingGangForHero(card);
                        this.addComponentCenter(mcc1);
                        //
                        egret.setTimeout(this.animBuGangComponent, this, 200, mcc1, round, pengComponent.x, pengComponent.y);
                        return;
                    }
                }
            }
        }

        private animBuGangComponent(mcc1: MjComponent, round: MjPlayer, x: Number, y: Number): void {
            egret.Tween.get(mcc1).wait(500).to({x: x, y: y}, 1000).play();

            //
            this.startPosition.x = round.commonOptCnt * Global.getComponentWidth();
            this.startPosition.y = 0;
            this.resortShowCards(round, false);
        }

        public showHeroAnGangAnim(card: MjCard, round: MjPlayer): void {
            var mcc: MjComponent = ComponentFactory.createAnGangForHero(card);
            this.addComponentCenter(mcc);
            egret.setTimeout(this.animComponent, this, 200, mcc, round);
        }

        private getCardByGlobalPosition(globalX: number, globalY: number): CardSprite {
            var p: Point = new Point(globalX, globalY);
            for (var i = 0; i < this.showCardMcs.length; i++) {
                var mc: CardSprite = this.showCardMcs[i];
                var rec: Rectangle = mc.getTransformedBounds(Global.stage);
                if (rec.containsPoint(p)) {
                    return mc;
                }
            }
            return null;
        }

        public resortShowCards(round: MjPlayer, moveLast: Boolean): void {
            var mjCards: Array<MjCard> = this.playerHero.core.cloneShowCards();
            this.synShowCards();
            //移动牌的位置
            for (var j: number = 0; j < this.showCardMcs.length; j++) {
                var mc1: CardSprite = this.showCardMcs[j];
                var index: number = mjCards.indexOf(mc1.card);
                if (moveLast && mc1.card == this.playerHero.core.lastFetchCard && index != mjCards.length - 1) {
                    //插入最后摸的牌
                    this.insertLastFetchCard(mc1, index);
                } else {
                    //移动之前立着的牌
                    if (mc1.width * index + this.startPosition.x != mc1.x) {
                        egret.Tween.get(mc1).to({x: mc1.width * index + this.startPosition.x}, 600).play();

                    }
                }
            }
        }

        public updateShowCards(): void {
            var firstX: number = this.showCardMcs[0].x;
            this.playerHero.core.sort();
            var mjCards: Array<MjCard> = this.playerHero.core.cloneShowCards();
            this.synShowCards();
            //移动牌的位置
            for (var j: number = 0; j < this.showCardMcs.length; j++) {
                var mc1: CardSprite = this.showCardMcs[j];
                var index: number = mjCards.indexOf(mc1.card);
                mc1.x = mc1.width * index + this.startPosition.x + firstX;
            }
        }


        private changeCurDiscardMc(mc: CardSprite, xx: number, yy: number): void {
            if (this.curDiscardCard != null) {
                this.curDiscardCard.y = this.curDiscardCard.oriY;
            }
            this.curDiscardCard = mc;
            SoundManager.play("select");
            mc.oriY = mc.y;
            mc.y -= 12;
            this.touchBeginPoint = new Point(xx, yy);
        }

        private removeCurCardShape(): void {
            if (this.curCardShape != null) {
                if (this.curCardShape.parent != null) {
                    this.curCardShape.parent.removeChild(this.curCardShape);
                }
                this.curCardShape = null;
            }
        }

        private selectTingInfo(mjCard: MjCard): void {
            Global.removeMe(this.tingTip);
            this.removeCurCardShape();
            //
            var selectTingInfo: MjTingInfo;
            for (var i: number = 0; i < this.tingInfos.length; i++) {
                var info: MjTingInfo = this.tingInfos[i];
                if (mjCard.equal(info.target)) {
                    selectTingInfo = info;
                    break;
                }
            }
            this.dispatchEvent(new MjEvent(MjEvent.TING_SHOWMC, false, false, selectTingInfo));
            ////////////////
            for (var j: number = 0; j < this.showCardMcs.length; j++) {
                var oo: CardSprite = this.showCardMcs[j];
                if (oo.filters == null || oo.filters.length == 0) {
                    var filter: ColorMatrixFilter = new ColorMatrixFilter(FilterUtil.getBrightnessMatrix(-.5));
                    oo.filters = [filter];
                }
            }
            var p: Point = new Point(Global.stage_w / 2, Global.stage_h / 4 * 3);
            p = this.globalToLocal(p.x, p.y);
            var showTingTipBtn: Sprite = new Sprite();
            var img: Bitmap = new Bitmap(Global.getRes("tingicon_myself"));
            showTingTipBtn.addChild(img);
            showTingTipBtn.anchorOffsetX = showTingTipBtn.width / 2;
            showTingTipBtn.anchorOffsetY = showTingTipBtn.height / 2;
            showTingTipBtn.x = p.x;
            showTingTipBtn.y = p.y;
            this.addChild(showTingTipBtn);
            this.tingTip.x = showTingTipBtn.x - this.tingTip.width / 2;
            this.tingTip.y = showTingTipBtn.y - 200;
            //
            this.moveTingTip();
            showTingTipBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onShowTingTip, this);
        }

        private onShowTingTip(event: egret.TouchEvent): void {
            var mc: Sprite = <Sprite>(event.currentTarget);
            if (this.tingTip.parent != null) {
                this.tingTip.parent.removeChild(this.tingTip);
            } else {
                var p: Point = new Point(Global.stage_w / 2 - this.tingTip.width / 2, Global.stage_h / 4 * 3 - 200);
                this.tingTip.x = p.x;
                this.tingTip.y = p.y;
                Anim.instance.addChild(this.tingTip);
            }
        }

        private moveTingTip(): void {
            var pp: Point = new Point(this.tingTip.x + this.tingTip.width);
            pp = this.localToGlobal(pp.x, pp.y);
            var kk: number = pp.x - (Global.stage_w - 20);
            if (kk > 0) {
                this.tingTip.x -= kk;
            }
            pp = new Point(this.tingTip.x);
            pp = this.localToGlobal(pp.x, pp.y);
            kk = 20 - pp.x;
            if (kk > 0) {
                this.tingTip.x += kk;
            }

        }

        private onShapeTouch(event: egret.TouchEvent): void {
            this.removeCurCardShape();
            var ccc: CardSprite = <CardSprite>(event.currentTarget);
            var cs: Array<MjCard> = this.playerHero.core.cloneShowCards();
            MjEngine.subSpecialCnt(cs, this.curDiscardCard.card, 1);
            cs.push(ccc.card);
            cs.sort(MjEngine.sortCardByTypeNum);
            //
            var info: HuInfo = MjEngine.getMaxHuInfo(MjEngine.getHuInfos(cs), this.playerHero.core, ccc.card, null);
            //
            this.curCardShape = new Sprite();
            var xx: number = 0;
            var scale: number = .6;
            if (info.jiang == null) {
                for (var i: number = 0; i < cs.length; i++) {
                    var card: MjCard = cs[i];
                    var mc: CardSprite = Asset.getFreezeCardMcDown(card);
                    mc.x = xx + mc.width / 2;
                    mc.y = mc.height / 2;
                    mc.scaleX = mc.scaleY = scale;
                    this.curCardShape.addChild(mc);
                    xx += mc.width - 2;
                }
            } else {
                var hInfo: HuInfo = info as HuInfo;
                for (var j: number = 0; j < hInfo.anKe.length; j++) {
                    var mc1: Sprite = ComponentFactory.createPengForHero(hInfo.anKe[j]);
                    mc1.x = xx;
                    mc1.y = mc1.height / 2;
                    mc1.scaleX = mc1.scaleY = scale;
                    this.curCardShape.addChild(mc1);
                    xx += mc1.width + 10;
                }
                for (var jj: number = 0; jj < hInfo.anShun.length; jj++) {
                    var mc2: Sprite = ComponentFactory.createChiForHero(hInfo.anShun[jj]);
                    mc2.x = xx;
                    mc2.y = mc2.height / 2;
                    mc2.scaleX = mc2.scaleY = scale;
                    this.curCardShape.addChild(mc2);
                    xx += mc2.width + 10;
                }
                xx += 10;
                for (var jjj: number = 0; jjj < 2; jjj++) {
                    var mc3: CardSprite = Asset.getFreezeCardMcDown(hInfo.jiang);
                    mc3.x = xx;
                    mc3.y = mc3.height / 2;
                    mc3.scaleX = mc3.scaleY = scale;
                    this.curCardShape.addChild(mc3);
                    xx += mc3.width - 2;
                }
            }
            //
            var p: Point = new Point(Global.stage_w / 2, Global.stage_h / 2);
            p = this.globalToLocal(p.x, p.y);
            this.curCardShape.x = p.x - this.curCardShape.width / 2;
            this.curCardShape.y = p.y - this.curCardShape.height / 2 - 50;
            //
            var img: Bitmap = new Bitmap(Global.getRes("ting_tips_bg"));
            img.scale9Grid = new Rectangle(10, 10, img.width - 20, img.height - 20);
            img.width = this.curCardShape.width + 20;
            img.height = this.curCardShape.height + 20;
            img.x = -10;
            img.y = 30;
            this.curCardShape.addChildAt(img, 0);
            this.addChild(this.curCardShape);
        }

        private onRemoveStage(event: egret.Event): void {
            var ccc: CardSprite = <CardSprite>(event.currentTarget);
            ccc.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShapeTouch, false);
            ccc.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, false);
        }

        private showTingTip(mc: CardSprite): void {
            this.removeCurCardShape();
            Global.removeMe(this.tingTip);
            this.tingTip = null;
            ///////////
            this.tingTip = new Sprite();
            var selectTingInfo: MjTingInfo;
            for (var i: number = 0; i < this.tingInfos.length; i++) {
                var info: MjTingInfo = this.tingInfos[i];
                if (mc.card.equal(info.target)) {
                    selectTingInfo = info;
                    for (var j: number = 0; j < info.tingCards.length; j++) {
                        var ccc: Sprite = new Sprite();
                        //
                        var curCard: MjCard = info.tingCards[j];
                        //
                        var mcc: CardSprite = Asset.getFrontStandCard(curCard);
                        mcc.x = mcc.width * j + 15;
                        mcc.y = 15;
                        ccc.addChild(mcc);
                        //
                        var lastCntTxt: BitmapText = new BitmapText();
                        lastCntTxt.font = RES.getRes("shengyuwenzi_gb_fnt");
                        lastCntTxt.text = (4 - MjRound.instance.getOpenCardCnt(curCard) - this.playerHero.core.getCardCntInShow(curCard)) + "张";
                        lastCntTxt.x = mcc.x + (mcc.width - lastCntTxt.width) / 2;
                        lastCntTxt.y = mcc.y + mcc.height;
                        ccc.addChild(lastCntTxt);
                        //
                        mcc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShapeTouch, this);
                        mcc.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this);
                        //
                        this.tingTip.addChild(ccc);
                    }
                    break;
                }
            }
            //
            var img: Bitmap = new Bitmap(Global.getRes("ting_tips_bg"));
            img.scale9Grid = new Rectangle(10, 10, img.width - 20, img.height - 20);
            img.width = this.tingTip.width + 30;
            img.height = this.tingTip.height + 20;
            this.tingTip.addChildAt(img, 0);
            //
            this.tingTip.x = mc.x + mc.width / 2 - this.tingTip.width / 2;
            this.tingTip.y = mc.y - 140;
            this.moveTingTip();
            this.addChild(this.tingTip);
        }

        protected onClickCard(event: egret.TouchEvent):void {
            //用于覆盖父类
        }

        private onTouchShow(event: egret.TouchEvent): void {
            if (!this.enable) return;
            if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
                let mc: CardSprite = this.getCardByGlobalPosition(event.stageX, event.stageY);
                if (mc != null && (mc.filters == null || mc.filters.length == 0)) {//能点击的. filter代表听状态
                    var last: CardSprite = this.curDiscardCard;
                    this.changeCurDiscardMc(mc, event.stageX, event.stageY);//先选中这个
                    if (this.tingInfos != null) {//有听牌
                        if (last == this.curDiscardCard) {
                            this.discard(this.curDiscardCard);
                            this.selectTingInfo(this.curDiscardCard.card);
                        } else {
                            this.showTingTip(this.curDiscardCard);
                        }
                    }
                }
            } else if (event.type == egret.TouchEvent.TOUCH_END) {
                if (this.tingInfos == null) {
                    //不听状态
                    if (this.curDiscardCard != null) {
                        this.discard(this.curDiscardCard);
                    }
                    this.curDiscardCard = null;
                }
            }
        }

    }
}
