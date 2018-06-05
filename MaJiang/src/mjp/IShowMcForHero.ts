/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/28
 * Time: 11:51
 */
module mjp {
    //import assets.Asset;
    //import assets.AssetSound;

    //import engine.MjEngine;
    //import engine.MjRound;
    //import engine.vo.HuInfo;
    //import engine.vo.MjCard;
    //import engine.vo.MjChiInfo;
    //import engine.vo.MjPlayer;
    //import engine.vo.MjTingInfo;

    //import feathers.display.Scale9Image;
    //import feathers.textures.Scale9Textures;

    //import flash.geom.Point;
    //import flash.geom.Rectangle;

    //import starling.animation.Transitions;
    //import starling.animation.Tween;
    //import starling.display.DisplayObject;
    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.events.Touch;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;
    //import starling.filters.ColorMatrixFilter;
    //import starling.text.TextField;
    //import starling.text.TextFieldAutoSize;

    export class IShowMcForHero extends IShowMc {
        //选择听牌时,选择点击的牌
        private curDiscardCard:CardSprite;
        private tingInfos:Vector.<MjTingInfo>;
        //选择听牌时,点击打的牌,显示的可以听的牌
        private tingTip:Sprite;
        private playerHero:PlayerHero;
        private touchBeginPoint:Point;
        private curCardShape:Sprite;
        private dragMc:CardSprite;

        constructor(playerHero:PlayerHero) {
            this.playerHero = playerHero;
            addEventListener(TouchEvent.TOUCH, onTouchShow)
        }

        public showHeroChiAnim(mjChiInfo:MjChiInfo, round:MjPlayer) {
            var mcc:MjComponent = ComponentFactory.createChiForHero(mjChiInfo.cards);
            addComponentCenter(mcc);
            juggler.delayCall(animComponent, .2, mcc, round);
        }

        public showHeroPengAnim(card:MjCard, round:MjPlayer) {
            var mcc:MjComponent = ComponentFactory.createPengForHero(card);
            mcc.card = card;
            addComponentCenter(mcc);
            juggler.delayCall(animComponent, .2, mcc, round);
        }

        public showHeroMingGangAnim(card:MjCard, round:MjPlayer) {
            var mcc:MjComponent = ComponentFactory.createMingGangForHero(card);
            addComponentCenter(mcc);
            juggler.delayCall(animComponent, .2, mcc, round);
        }

        public showHeroBuGangAnim(card:MjCard, round:MjPlayer) {
            for (var i:number = 0; i < numChildren; i++) {
                var mc:DisplayObject = getChildAt(i);
                if (mc is MjComponent) {
                    var pengComponent:MjComponent = (mc as MjComponent);
                    if (card.equal(pengComponent.card)) {
                        removeChild(pengComponent);
                        var mcc1:MjComponent = ComponentFactory.createMingGangForHero(card);
                        addComponentCenter(mcc1);
                        //
                        juggler.delayCall(animBuGangComponent, .2, mcc1, round, pengComponent.x, pengComponent.y);
                        return;
                    }
                }
            }
        }

        public showHeroAnGangAnim(card:MjCard, round:MjPlayer) {
            var mcc:MjComponent = ComponentFactory.createAnGangForHero(card);
            addComponentCenter(mcc);
            juggler.delayCall(animComponent, .2, mcc, round);
//            animComponent(mcc, round);
        }

        private addComponentCenter(mcc:MjComponent) {
            var p:Point = new Point(UserConst.size.x / 2, UserConst.size.y / 2);
            p = this.globalToLocal(p);
            mcc.x = p.x - mcc.width / 2;
            mcc.y = p.y - mcc.height / 2;
            addChild(mcc);
            //组合动画
            var left:DisplayObject = mcc.getChildAt(0);
            var right:DisplayObject = mcc.getChildAt(2);
            left.x -= 30;
            right.x += 30;
            var tweenLeft:Tween = new Tween(left, .1, Transitions.EASE_IN);
            tweenLeft.animate("x", left.x + 30);
            var tweenRight:Tween = new Tween(right, .1, Transitions.EASE_IN);
            tweenRight.animate("x", right.x - 30);
            juggler.add(tweenLeft);
            juggler.add(tweenRight);
        }

        private animComponent(mcc:MjComponent, round:MjPlayer) {
            /*var tween:Tween = new Tween(mcc, 1);
             tween.animate("x", (round.commonOptCnt - 1) * 200);
             tween.animate("y", 0);
             juggler.add(tween);*/
            mcc.moveTo((round.commonOptCnt - 1) * UserConst.getComponentWidth(), 0);
            //
            startPosition.x = round.commonOptCnt * UserConst.getComponentWidth();
            startPosition.y = 0;
            //
            resortShowCards(round, false);
        }

        private animBuGangComponent(mcc1:MjComponent, round:MjPlayer, x:number, y:number) {
            var tween:Tween = new Tween(mcc1, 1);
            tween.animate("x", x);
            tween.animate("y", y);
            juggler.delayCall(juggler.add, .5, tween);
            //
            startPosition.x = round.commonOptCnt * UserConst.getComponentWidth();
            startPosition.y = 0;
            resortShowCards(round, false);
        }

        /**
         * 移动立着的牌
         * @param round
         * @param moveLast
         */
        public resortShowCards(round:MjPlayer, moveLast:boolean) {
            var mjCards:MjCard[] = playerHero.core.cloneShowCards();
            synShowCards();
            //移动牌的位置
            for (var j:number = 0; j < showCardMcs.length; j++) {
                var mc1:CardSprite = showCardMcs[j];
                var index:number = mjCards.indexOf(mc1.card);
                if (moveLast && mc1.card == playerHero.core.lastFetchCard && index != mjCards.length - 1) {
                    //插入最后摸的牌
                    insertLastFetchCard(mc1, index);
                } else {
                    //移动之前立着的牌
                    if (mc1.width * index + startPosition.x != mc1.x) {
                        var tweenForMc:Tween = new Tween(mc1, .6);
                        tweenForMc.animate("x", mc1.width * index + startPosition.x);
                        juggler.add(tweenForMc);
                    }
                }
            }
        }

        /**
         * 移动立着的牌
         */
        public updateShowCards() {
            var firstX:number = showCardMcs[0].x;
            playerHero.core.sort();
            var mjCards:MjCard[] = playerHero.core.cloneShowCards();
            synShowCards();
            //移动牌的位置
            for (var j:number = 0; j < showCardMcs.length; j++) {
                var mc1:CardSprite = showCardMcs[j];
                var index:number = mjCards.indexOf(mc1.card);
                mc1.x = mc1.width * index + startPosition.x + firstX;
            }
        }

        private synShowCards() {
            var mjCards:MjCard[] = playerHero.core.cloneShowCards();
            //移除不正确的牌,可忽略
            for (var i:number = 0; i < showCardMcs.length; i++) {
                var mc:CardSprite = showCardMcs[i];
                if (mjCards.indexOf(mc.card) == -1) {
                    ObjUtil.removeMe(mc);
                    showCardMcs.splice(i, 1);
                    i--;
                }
            }
            //同步顺序
            for (var k:number = 0; k < mjCards.length; k++) {
                var card:MjCard = mjCards[k];
                for (var m:number = 0; m < showCardMcs.length; m++) {
                    var sprite:CardSprite = showCardMcs[m];
                    if (sprite.card == card) {
                        var mcs:CardSprite = showCardMcs.splice(m, 1)[0];
                        showCardMcs.splice(k, 0, mcs);
                    }
                }
            }
        }

        /**
         * 移动最后摸的一张牌
         * @param mc
         * @param index
         */
        private insertLastFetchCard(mc:CardSprite, index:number) {
            var t1:Tween = new Tween(mc, .1);
            t1.animate("y", mc.y - 100);
            var t2:Tween = new Tween(mc, .3);
            t2.animate("x", mc.width * index + startPosition.x);
            var t3:Tween = new Tween(mc, .1);
            t3.animate("y", mc.y);
            t1.nextTween = t2;
            t2.nextTween = t3;
            //
            juggler.add(t1);
        }

        public startSelectTing(tingInfo:Vector.<MjTingInfo>) {
            this.tingInfos = tingInfo;
            var dcards:MjCard[] = [];
            for (var i:number = 0; i < tingInfo.length; i++) {
                var info:MjTingInfo = tingInfo[i];
                var has:boolean = false;
                for (var j:number = 0; j < dcards.length; j++) {
                    var card:MjCard = dcards[j];
                    if (card.equal(info.target)) {
                        has = true;
                    }
                }
                if (!has) {
                    dcards.push(info.target);
                }
            }
            for (var m:number = 0; m < showCardMcs.length; m++) {
                var sprite:CardSprite = showCardMcs[m];
                var needd:boolean = false;
                for (var n:number = 0; n < dcards.length; n++) {
                    var card1:MjCard = dcards[n];
                    if (sprite.card.equal(card1)) {
                        needd = true;
                    }
                }
                if (needd) {
                } else {
                    var filter:ColorMatrixFilter = new ColorMatrixFilter();
                    filter.adjustBrightness(-.5);
                    sprite.filter = filter;
                    sprite.flatten();
                }
            }
        }

        public stopSelectTing() {
            removeCurCardShape();
            tingInfos = null;
            for (var m:number = 0; m < showCardMcs.length; m++) {
                var sprite:CardSprite = showCardMcs[m];
                sprite.unflatten();
                sprite.filter = null;
            }
            ObjUtil.removeMe(tingTip);
            tingTip = null;
            if (curDiscardCard != null) {
                curDiscardCard.y = curDiscardCard.oriY;
            }
            curDiscardCard = null;
        }

        override protected function onClickCard(event:TouchEvent) {
            //用于覆盖父类
        }

        private onTouchShow(event:TouchEvent) {
            if (!enable)return;
            var ttBegan:Touch = event.getTouch(DisplayObject(event.currentTarget), TouchPhase.BEGAN);
            var ttMove:Touch = event.getTouch(DisplayObject(event.currentTarget), TouchPhase.MOVED);
            var ttEnd:Touch = event.getTouch(DisplayObject(event.currentTarget), TouchPhase.ENDED);
            var mc:CardSprite;
            if (ttBegan != null) {
                mc = getCardByGlobalPosition(ttBegan.globalX, ttBegan.globalY);
                if (mc != null && mc.filter == null) {//能点击的. filter代表听状态
                    var last:CardSprite = curDiscardCard;
                    changeCurDiscardMc(mc, ttBegan);//先选中这个
                    if (tingInfos != null) {//有听牌
                        if (last == curDiscardCard) {
                            discard(curDiscardCard);
                            selectTingInfo(curDiscardCard.card);
                        } else {
                            showTingTip(curDiscardCard);
                        }
                    }
                }
            } else if (ttEnd != null) {
                if (dragMc != null) {//正在拖动
                    curDiscardCard.filter = null;
                    if (ttEnd.globalY < touchBeginPoint.y - 50) {//在上方放开的牌
                        //拖动打牌
                        var pp:Point = new Point(dragMc.x, dragMc.y);
                        pp = this.globalToLocal(pp);
                        curDiscardCard.x = pp.x;
                        curDiscardCard.y = pp.y;
                        discard(curDiscardCard);
                        if (tingInfos != null) {
                            //又点了一次这张牌,就是要打出去
                            selectTingInfo(curDiscardCard.card);
                        }
                        curDiscardCard = null;
                    }
                    ObjUtil.removeMe(dragMc);
                    dragMc = null;
                } else {
                    if (tingInfos == null) {
                        //不听状态
                        if (curDiscardCard != null) {
                            discard(curDiscardCard);
                        }
                        curDiscardCard = null;
                    }
                }
            } else if (ttMove != null) {
                if (dragMc != null) {
                    //缓动
                    dragMc.x = ttMove.globalX;
                    dragMc.y = ttMove.globalY;
                } else {
                    if (touchBeginPoint != null) {
                        if (ttMove.globalY < touchBeginPoint.y - 50) {//向上拖动
                            dragMc = Asset.getFrontStandCard(curDiscardCard.card);
                            dragMc.pivotX = dragMc.width / 2;
                            dragMc.pivotY = dragMc.height / 2;
                            Anim.instance.addChild(dragMc);
                            dragMc.x = ttMove.globalX;
                            dragMc.y = ttMove.globalY;
                            //
                            var filter:ColorMatrixFilter = new ColorMatrixFilter();
                            filter.adjustBrightness(-.3);
                            curDiscardCard.filter = filter;
                            curDiscardCard.flatten();
                        } else {
                            var curDownMc:CardSprite = getCardByGlobalPosition(ttMove.globalX, ttMove.globalY);
                            if (curDownMc != null && curDownMc != curDiscardCard && curDownMc.filter == null) {
                                changeCurDiscardMc(curDownMc, ttMove);
                                if (tingInfos != null) {
                                    showTingTip(curDownMc);
                                }
                            }
                        }
                    }
                }
            }
        }

        private changeCurDiscardMc(mc:CardSprite, touch:Touch) {
            if (curDiscardCard != null) {
                curDiscardCard.y = curDiscardCard.oriY;
            }
            curDiscardCard = mc;
            AssetSound.play("select");
            mc.oriY = mc.y;
            mc.y -= 30;
            touchBeginPoint = new Point(touch.globalX, touch.globalY);
        }

        private getCardByGlobalPosition(globalX:number, globalY:number):CardSprite {
            var p:Point = new Point(globalX, globalY);
            for (var i:number = 0; i < showCardMcs.length; i++) {
                var mc:CardSprite = showCardMcs[i];
                var rec:Rectangle = mc.getBounds(stage);
                if (rec.containsPoint(p)) {
                    return mc;
                }
            }
            return null;
        }

        private showTingTip(mc:CardSprite) {
            removeCurCardShape();
            ObjUtil.removeMe(tingTip);
            tingTip = null;
            ///////////
            tingTip = new Sprite();
            var selectTingInfo:MjTingInfo;
            for (var i:number = 0; i < tingInfos.length; i++) {
                var info:MjTingInfo = tingInfos[i];
                if (mc.card.equal(info.target)) {
                    selectTingInfo = info;
                    for (var j:number = 0; j < info.tingCards.length; j++) {
                        var ccc:Sprite = new Sprite();
                        //
                        var curCard:MjCard = info.tingCards[j];
                        //
                        var mcc:CardSprite = Asset.getFrontStandCard(curCard);
                        mcc.x = mcc.width * j + 15;
                        mcc.y = 15;
                        ccc.addChild(mcc);
                        //
                        var lastCntTxt:TextField = new TextField(10, 30, "", "shengyuwenzi_gb", 20, 0xffffff, true);
                        lastCntTxt.autoSize = TextFieldAutoSize.HORIZONTAL;
                        lastCntTxt.text = (4 - MjRound.instance.getOpenCardCnt(curCard) - playerHero.core.getCardCntInShow(curCard)) + "张";
                        lastCntTxt.x = mcc.x + (mcc.width - lastCntTxt.width) / 2;
                        lastCntTxt.y = mcc.y + mcc.height;
                        ccc.addChild(lastCntTxt);
                        //
                        mcc.addEventListener(TouchEvent.TOUCH, onShapeTouch);
                        mcc.addEventListener(Event.REMOVED_FROM_STAGE, onRemoveStage);
                        //
                        tingTip.addChild(ccc);
                    }
                    break;
                }
            }
            //
            var img:Image = new Image(Asset.assetManager.getTexture("ting_tips_bg"));
            var tt:Scale9Textures = new Scale9Textures(Asset.assetManager.getTexture("ting_tips_bg"), new Rectangle(10, 10, img.width - 20, img.height - 20));
            var img9:Scale9Image = new Scale9Image(tt, 1);
            img9.width = tingTip.width + 30;
            img9.height = tingTip.height + 20;
            tingTip.addChildAt(img9, 0);
            //
            tingTip.x = mc.x + mc.width / 2 - tingTip.width / 2;
            tingTip.y = mc.y - 140;
            moveTingTip();
            addChild(tingTip);
        }

        private onRemoveStage(event:Event) {
            var ccc:CardSprite = CardSprite(event.currentTarget);
            ccc.removeEventListener(TouchEvent.TOUCH, onShapeTouch);
            ccc.removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveStage);
        }

        private onShapeTouch(event:TouchEvent) {
            if (event.getTouch(DisplayObject(event.currentTarget), TouchPhase.BEGAN)) {
                removeCurCardShape();
                var ccc:CardSprite = CardSprite(event.currentTarget);
                var cs:MjCard[] = playerHero.core.cloneShowCards();
                MjEngine.subSpecialCnt(cs, curDiscardCard.card, 1);
                cs.push(ccc.card);
                cs.sort(MjEngine.sortCardByTypeNum);
                //
                var info:HuInfo = MjEngine.getMaxHuInfo(MjEngine.getHuInfos(cs), playerHero.core, ccc.card, null);
                //
                curCardShape = new Sprite();
                var xx:number = 0;
                var scale:number = .6;
                if (info.jiang == null) {
                    for (var i:number = 0; i < cs.length; i++) {
                        var card:MjCard = cs[i];
                        var mc:CardSprite = Asset.getFreezeCardMcDown(card);
                        mc.x = xx + mc.width / 2;
                        mc.y = mc.height / 2;
                        mc.scaleX = mc.scaleY = scale;
                        curCardShape.addChild(mc);
                        xx += mc.width - 2;
                    }
                } else {
                    var hInfo:HuInfo = info as HuInfo;
                    for (var j:number = 0; j < hInfo.anKe.length; j++) {
                        var mc1:Sprite = ComponentFactory.createPengForHero(hInfo.anKe[j]);
                        mc1.x = xx;
                        mc1.y = mc1.height / 2;
                        mc1.scaleX = mc1.scaleY = scale;
                        curCardShape.addChild(mc1);
                        xx += mc1.width + 10;
                    }
                    for (var jj:number = 0; jj < hInfo.anShun.length; jj++) {
                        var mc2:Sprite = ComponentFactory.createChiForHero(hInfo.anShun[jj]);
                        mc2.x = xx;
                        mc2.y = mc2.height / 2;
                        mc2.scaleX = mc2.scaleY = scale;
                        curCardShape.addChild(mc2);
                        xx += mc2.width + 10;
                    }
                    xx += 10;
                    for (var jjj:number = 0; jjj < 2; jjj++) {
                        var mc3:CardSprite = Asset.getFreezeCardMcDown(hInfo.jiang);
                        mc3.x = xx;
                        mc3.y = mc3.height / 2;
                        mc3.scaleX = mc3.scaleY = scale;
                        curCardShape.addChild(mc3);
                        xx += mc3.width - 2;
                    }
                }
                //
                var p:Point = new Point(UserConst.size.x / 2, UserConst.size.y / 2);
                p = this.globalToLocal(p);
                curCardShape.x = p.x - curCardShape.width / 2;
                curCardShape.y = p.y - curCardShape.height / 2 - 50;
                //
                var img:Image = new Image(Asset.assetManager.getTexture("ting_tips_bg"));
                var tt:Scale9Textures = new Scale9Textures(Asset.assetManager.getTexture("ting_tips_bg"), new Rectangle(10, 10, img.width - 20, img.height - 20));
                var img9:Scale9Image = new Scale9Image(tt, 1);
                img9.width = curCardShape.width + 20;
                img9.height = curCardShape.height + 20;
                img9.x = -10;
                img9.y = 30;
                curCardShape.addChildAt(img9, 0);
                addChild(curCardShape);
            }
        }

        private removeCurCardShape() {
            if (curCardShape != null) {
                if (curCardShape.parent != null) {
                    curCardShape.parent.removeChild(curCardShape);
                }
                curCardShape = null;
            }
        }

        /**
         * 选择了听牌
         * @param mjCard
         */
        private selectTingInfo(mjCard:MjCard) {
            ObjUtil.removeMe(tingTip);
            removeCurCardShape();
            //
            var selectTingInfo:MjTingInfo;
            for (var i:number = 0; i < tingInfos.length; i++) {
                var info:MjTingInfo = tingInfos[i];
                if (mjCard.equal(info.target)) {
                    selectTingInfo = info;
                    break;
                }
            }
            dispatchEvent(new MjEvent(MjEvent.TING_SHOWMC, false, selectTingInfo));
            ////////////////
            for (var j:number = 0; j < showCardMcs.length; j++) {
                var oo:CardSprite = showCardMcs[j];
                if (oo.filter == null) {
                    var filter:ColorMatrixFilter = new ColorMatrixFilter();
                    filter.adjustBrightness(-.5);
                    oo.filter = filter;
                    oo.flatten();
                }
            }
            var p:Point = new Point(UserConst.size.x / 2, UserConst.size.y / 4 * 3);
            p = this.globalToLocal(p);
            var showTingTipBtn:Sprite = new Sprite();
            var img:Image = new Image(Asset.assetManager.getTexture("tingicon_myself"));
            showTingTipBtn.addChild(img);
            showTingTipBtn.pivotX = showTingTipBtn.width / 2;
            showTingTipBtn.pivotY = showTingTipBtn.height / 2;
            showTingTipBtn.x = p.x;
            showTingTipBtn.y = p.y;
            addChild(showTingTipBtn);
            tingTip.x = showTingTipBtn.x - tingTip.width / 2;
            tingTip.y = showTingTipBtn.y - 200;
            //
            moveTingTip();
            showTingTipBtn.addEventListener(TouchEvent.TOUCH, onShowTingTip);
        }

        /**
         * 听牌提示有可能会超出屏幕
         */
        private moveTingTip() {
            var pp:Point = new Point(tingTip.x + tingTip.width);
            pp = localToGlobal(pp);
            var kk:number = pp.x - (UserConst.size.x - 20);
            if (kk > 0) {
                tingTip.x -= kk;
            }
            pp = new Point(tingTip.x);
            pp = localToGlobal(pp);
            kk = 20 - pp.x;
            if (kk > 0) {
                tingTip.x += kk;
            }
        }

        private onShowTingTip(event:TouchEvent) {
            var mc:Sprite = Sprite(event.currentTarget);
            if (event.getTouch(mc, TouchPhase.ENDED)) {
                if (tingTip.parent != null) {
                    tingTip.parent.removeChild(tingTip);
                } else {
                    var p:Point = new Point(UserConst.size.x / 2 - tingTip.width / 2, UserConst.size.y / 4 * 3 - 200);
                    tingTip.x = p.x;
                    tingTip.y = p.y;
                    Anim.instance.addChild(tingTip);
                }
            }
        }

        override private clear() {
            super.clear();
            if (tingTip != null) {
                tingTip.removeFromParent(true);
            }
            if (curCardShape != null) {
                curCardShape.removeFromParent(true);
            }
            if (dragMc != null) {
                dragMc.removeFromParent(true);
            }
            if (curDiscardCard != null) {
                curDiscardCard.removeFromParent(true);
            }
            curDiscardCard = null;
            tingTip = null;
            touchBeginPoint = null;
            curCardShape = null;
            dragMc = null;
            tingInfos = null;
        }

        public removeFilter() {
            for (var j:number = 0; j < showCardMcs.length; j++) {
                showCardMcs[j].filter = null;
            }
        }
    }
}
