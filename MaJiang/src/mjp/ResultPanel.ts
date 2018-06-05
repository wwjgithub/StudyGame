/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/28
 * Time: 14:34
 */
module mjp {
    //import assets.Asset;

    //import com.greensock.TweenLite;
    //import com.greensock.easing.Linear;

    //import engine.MjEngine;
    //import engine.vo.HuInfo;
    //import engine.vo.IOpt;
    //import engine.vo.MjCard;
    //import engine.vo.MjFanInfo;
    //import engine.vo.OptAnGang;
    //import engine.vo.OptChi;
    //import engine.vo.OptMingGang;
    //import engine.vo.OptPeng;

    //import feathers.controls.ScrollContainer;

    //import starling.display.DisplayObject;
    //import starling.display.Image;
    //import starling.display.Quad;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;
    //import starling.text.TextField;
    //import starling.text.TextFieldAutoSize;

    //import utils.CButton;

    export class ResultPanel extends Sprite {
        private playerHero:PlayerHero;
        private huInfo:HuInfo;
        public huPlayer:IPlayer;
        private XX:number = 190;
        public static CONTINUE:string = "ResultPanel.CONTINUE";
        private resultMoney:number;
        private resultTitle:Image;
        private cardMc:Sprite;
        private txtResult:TextField;
        private content:Sprite;
        private rect:Sprite;
        private btns:Sprite;
        private q:Quad;

        constructor(info:HuInfo, playerHero:PlayerHero, resultMoney:number, player:IPlayer) {
            addEventListener(Event.REMOVED_FROM_STAGE, onRemove);
            this.resultMoney = resultMoney;
            this.playerHero = playerHero;
            this.huInfo = info;
            this.huPlayer = player;
            showBorder();
            //anim
            showRect();
            showTitle();
            //
            rect.x = -UserConst.size.x;
            TweenLite.to(rect, .2, {x: 0, ease: Linear.easeOut, delay: .5});
            //
            content = new Sprite();
            addChild(content);
            content.x = UserConst.size.x;
            showFanScore();
            showCards();
            showFanList();
            TweenLite.to(content, .2, {x: 0, ease: Linear.easeOut, delay: .5});
            //
            resultTitle.y -= 200;
            TweenLite.to(resultTitle, .2, {y: resultTitle.y + 200, ease: Linear.easeOut, delay: .7});
            //
            addContinueBtn();
            btns.y += 240;
            TweenLite.to(btns, .2, {y: btns.y - 240, ease: Linear.easeOut, delay: .7});
        }

        private onRemove(event:Event) {
            q.removeEventListener(TouchEvent.TOUCH, onClickBg);
            removeEventListener(Event.REMOVED_FROM_STAGE, onRemove);
        }

        private showFanList() {
            if (huPlayer != null) {
                var cc:ScrollContainer = new ScrollContainer();
                cc.width = 800;
                cc.height = 100;
                cc.verticalScrollPolicy = ScrollContainer.SCROLL_POLICY_ON;
                cc.horizontalScrollPolicy = ScrollContainer.SCROLL_POLICY_OFF;
                //
                var fans:Vector.<MjFanInfo> = MjEngine.getFans(huPlayer.core, huInfo);
                fans.sort(ResultPanel.compareFan);
                for (var i:number = 0; i < fans.length; i++) {
                    var info1:MjFanInfo = fans[i];
                    if (!info1.valid) {
                        fans.splice(i, 1);
                        i--;
                        continue;
                    }
                    var sp:Sprite = createFanList(info1.name, info1.fan);
                    sp.x = i % 2 * 300;
                    sp.y = int(i / 2) * 30;
                    cc.addChild(sp)
                }
                //
                cc.x = XX;
                cc.y = cardMc.y + cardMc.height + 3;
                content.addChild(cc);
            }
        }

        public static createFanList(name:string, fan:number):Sprite {
            var mc:Sprite = new Sprite();
            //
            var ft:TextField = new TextField(200, 50, name);
            ft.autoSize = TextFieldAutoSize.HORIZONTAL;
            ft.fontSize = 20;
            ft.color = 0xffffff;
            mc.addChild(ft);
            //
            var fft:TextField = new TextField(200, 50, fan + "番");
            fft.autoSize = TextFieldAutoSize.HORIZONTAL;
            fft.fontSize = ft.fontSize;
            fft.color = ft.color;
            fft.x = ft.x + 150;
            fft.y = ft.y;
            mc.addChild(fft);
            return mc;
        }

        private showCards() {
            cardMc = new Sprite();
            var showPlayer:IPlayer = huPlayer;
            if (showPlayer == null) {
                showPlayer = playerHero;
            }
            var mcc:MjComponent;
            var xx:number = 0;
            for (var j:number = 0; j < showPlayer.core.opts.length; j++) {
                var opt:IOpt = showPlayer.core.opts[j];
                if (opt is OptAnGang) {
                    mcc = ComponentFactory.createAnGangForHero((opt as OptAnGang).card);
                }
                if (opt is OptMingGang) {
                    mcc = ComponentFactory.createMingGangForHero((opt as OptMingGang).card);
                }
                if (opt is OptPeng) {
                    mcc = ComponentFactory.createPengForHero((opt as OptPeng).card);
                }
                if (opt is OptChi) {
                    mcc = ComponentFactory.createChiForHero((opt as OptChi).chiInfo.cards);
                }
                if (mcc != null) {
                    mcc.scaleX = mcc.scaleY = .75;
                    mcc.x = xx;
                    cardMc.addChild(mcc);
                    xx += mcc.width + 10;
                }
                mcc = null;
            }
            var mjCards:MjCard[] = showPlayer.core.cloneShowCards();
            if (huInfo != null) {
                if (huInfo.anTarget != null) {
                    for (var mm:number = 0; mm < mjCards.length; mm++) {
                        if (mjCards[mm].equal(huInfo.target)) {
                            mjCards.push(mjCards.splice(mm, 1)[0]);
                        }
                    }
                } else {
                    mjCards.push(huInfo.target)
                }
            }
            for (var i:number = 0; i < mjCards.length; i++) {
                var mc:CardSprite = Asset.getFreezeCardMcDown(mjCards[i]);
                mc.scaleX = mc.scaleY = mc.scaleX * .75;
                if (i == mjCards.length - 1) {
                    mc.x = xx + 10;
                } else {
                    mc.x = xx;
                }
                cardMc.addChild(mc);
                xx += mc.width;
            }
            //
            cardMc.x = XX;
            cardMc.y = 250;
            content.addChild(cardMc);
        }

        private showFanScore() {
            if (huInfo != null) {
                var n:string;
                var rn:string;
                var rm:number = resultMoney;
                if (playerHero == huPlayer) {
                    n = "本家";
                    rn = "赢";
                    rm *= 3;
                } else {
                    rn = "本家输";
                    if (playerHero.next == huPlayer) {
                        n = "下家";
                    } else if (huPlayer.next == playerHero) {
                        n = "上家";
                    } else {
                        n = "对家";
                    }
                }
                txtResult = new TextField(200, 50, n + "胡 " + huInfo.fan + " 番，" + rn + rm + "金币！");
            } else {
                txtResult = new TextField(200, 50, "流局!");
            }
            txtResult.fontSize = 36;
            txtResult.color = 0xffff00;
            txtResult.autoSize = TextFieldAutoSize.HORIZONTAL;
            txtResult.x = XX;
            txtResult.y = resultTitle.y + resultTitle.height;
            content.addChild(txtResult);
        }

        private showTitle() {
            if (playerHero == huPlayer) {
                resultTitle = new Image(Asset.assetManager.getTexture("胜利图标"));
            } else {
                resultTitle = new Image(Asset.assetManager.getTexture("失败图标"));
            }
            resultTitle.scaleX = resultTitle.scaleY = .7;
            resultTitle.y = 50;
            resultTitle.x = (UserConst.size.x - resultTitle.width) / 2;
            addChild(resultTitle);
        }

        private showBorder() {
            q = new Quad(UserConst.size.x, UserConst.size.y, 0);
            q.alpha = 0;
            q.addEventListener(TouchEvent.TOUCH, onClickBg);
            addChild(q);
            TweenLite.to(q, 1, {alpha: .6});
        }

        private onClickBg(event:TouchEvent) {
        }

        private showRect() {
            rect = new Sprite();
            var q:Quad = new Quad(UserConst.size.x, UserConst.size.y / 2, 0);
            q.alpha = 0.7;
            q.y = UserConst.size.y / 4;
            rect.addChild(q);
            var q1:Quad = new Quad(UserConst.size.x, q.height / 4, 0);
            q1.color = 0xffffff;
            q1.setVertexAlpha(0, .4);
            q1.setVertexAlpha(1, .4);
            q1.setVertexAlpha(2, 0);
            q1.setVertexAlpha(3, 0);
            q1.alpha = 0.7;
            q1.y = q.y;
            rect.addChild(q1);
            rect.x = -UserConst.size.x;
            addChild(rect);
        }

        private static function compareFan(fan1:MjFanInfo, fan2:MjFanInfo):number {
            if (fan1.fan > fan2.fan) {
                return -1;
            } else if (fan1.fan < fan2.fan) {
                return 1;
            } else {
                return 0;
            }
        }

        private addContinueBtn() {
            btns = new Sprite();
            var cbtn:CButton = new CButton(new ButtonTem("按钮样式", "btn_继续"));
            cbtn.scaleWhenDown = 1.3;
            cbtn.addEventListener(TouchEvent.TOUCH, onContinue);
            //
            btns.addChild(cbtn);
            //
            btns.pivotX = btns.width / 2;
            btns.pivotY = btns.height / 2;
            btns.x = UserConst.size.x / 2 + 200;
            btns.y = UserConst.size.y - 140;
            addChild(btns);
            btns.useHandCursor = true;
        }

        private onContinue(event:TouchEvent) {
            if (event.getTouch(DisplayObject(event.currentTarget), TouchPhase.ENDED)) {
                event.currentTarget.removeEventListeners();
                dispatchEvent(new Event(ResultPanel.CONTINUE));
            }
        }
    }
}
