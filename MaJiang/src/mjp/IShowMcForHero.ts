namespace game {
    import Sprite = egret.Sprite;
    import Point = egret.Point;
    import Rectangle = egret.Rectangle;

    export class IShowMcForHero extends IShowMc {
//选择听牌时,选择点击的牌
        private curDiscardCard: CardSprite;
        private tingInfos: Array<MjTingInfo>;
        //选择听牌时,点击打的牌,显示的可以听的牌
        private tingTip: Sprite;
        private playerHero: PlayerHero;
        private touchBeginPoint: Point;
        private curCardShape: Sprite;
        private dragMc: CardSprite;

        constructor(playerHero) {
            super();
            this.playerHero = playerHero;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchShow,this)
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchShow,this)
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchShow,this)
        }
        private getCardByGlobalPosition(globalX:number, globalY:number):CardSprite {
            var p:Point = new Point(globalX, globalY);
            for (var i = 0; i < this.showCardMcs.length; i++) {
                var mc:CardSprite = this.showCardMcs[i];
                var rec:Rectangle = mc.getBounds();
                if (rec.containsPoint(p)) {
                    return mc;
                }
            }
            return null;
        }
        public resortShowCards(round:MjPlayer, moveLast:Boolean):void {
            var mjCards:Array<MjCard> = this.playerHero.core.cloneShowCards();
            this.synShowCards();
            //移动牌的位置
            for (var j:number = 0; j < this.showCardMcs.length; j++) {
                var mc1:CardSprite = this.showCardMcs[j];
                var index:number = mjCards.indexOf(mc1.card);
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
        /**
         * 移动最后摸的一张牌
         * @param mc
         * @param index
         */
        private insertLastFetchCard(mc:CardSprite, index:number):void {
            egret.Tween.get(mc).to({y:mc.y-100},100).to({x:mc.width * index + this.startPosition.x},300).to({y:mc.y},100).play()

        }

        private synShowCards():void {
            var mjCards:Array<MjCard> = this.playerHero.core.cloneShowCards();
            //移除不正确的牌,可忽略
            for (var i:number = 0; i < this.showCardMcs.length; i++) {
                var mc:CardSprite = this.showCardMcs[i];
                if (mjCards.indexOf(mc.card) == -1) {
                    Global.removeMe(mc);
                    this.showCardMcs.splice(i, 1);
                    i--;
                }
            }
            //同步顺序
            for (var k:number = 0; k < mjCards.length; k++) {
                var card:MjCard = mjCards[k];
                for (var m:number = 0; m < this.showCardMcs.length; m++) {
                    var sprite:CardSprite = this.showCardMcs[m];
                    if (sprite.card == card) {
                        var mcs:CardSprite = this.showCardMcs.splice(m, 1)[0];
                        this.showCardMcs.splice(k, 0, mcs);
                    }
                }
            }
        }

        private onTouchShow(event:egret.TouchEvent):void {
            /*if (!this.enable)return;

            if (event.type==egret.TouchEvent.TOUCH_BEGIN) {
                let mc = this.getCardByGlobalPosition(event.stageX, event.stageY);
                if (mc != null && mc.filter == null) {//能点击的. filter代表听状态
                    var last:CardSprite = this.curDiscardCard;
                    this.changeCurDiscardMc(mc, ttBegan);//先选中这个
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
        */}

    }
}
