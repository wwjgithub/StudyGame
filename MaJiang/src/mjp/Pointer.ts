/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/27
 * Time: 10:45
 */
module mjp {
    //import assets.Asset;

    //import com.greensock.TimelineMax;
    //import com.greensock.TweenLite;

    //import starling.animation.IAnimatable;
    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.text.TextField;
    //import starling.text.TextFieldAutoSize;

    export class Pointer extends Sprite {
        private moneyT:TextField;
        private second:number;
        private anim:IAnimatable;
        private pDown:Image;
        private pLeft:Image;
        private pRight:Image;
        private pUp:Image;
        private arrowMc:Sprite;
        private tt:TimelineMax;
        private bg:Image;

        constructor() {
            bg = new Image(Asset.assetManager.getTexture("时间1"));
            addChild(bg);
            //
            arrowMc = new Sprite();
            pDown = new Image(Asset.assetManager.getTexture("时间8"));
            pDown.x = 13;
            pDown.y = 93;
            pLeft = new Image(Asset.assetManager.getTexture("时间7"));
            pLeft.x = 11;
            pLeft.y = 13;
            pRight = new Image(Asset.assetManager.getTexture("时间9"));
            pRight.x = 94;
            pRight.y = 13;
            pUp = new Image(Asset.assetManager.getTexture("时间6"));
            pUp.x = 14;
            pUp.y = 12;
            arrowMc.addChild(pLeft);
            arrowMc.addChild(pRight);
            arrowMc.addChild(pUp);
            arrowMc.addChild(pDown);
            addChild(arrowMc);
            var t:TweenLite = TweenLite.to(arrowMc, .5, {alpha: 0});
            var t1:TweenLite = TweenLite.to(arrowMc, .5, {alpha: 1});
            tt = new TimelineMax();
            tt.append(t);
            tt.append(t1);
            tt.repeat = -1;
            //
            //
            moneyT = new TextField(100, 50, "10", "Num", 34, 0xffffff);
            moneyT.autoSize = TextFieldAutoSize.HORIZONTAL;
            moneyT.x = (bg.width - moneyT.width) / 2;
            moneyT.y = (bg.height - moneyT.height) / 2;
            addChild(moneyT);
            //
            pivotX = this.width / 2;
            pivotY = this.height / 2;
            scaleX=scaleY=.7;
        }

        private update() {
            if (anim != null) {
                juggler.remove(anim);
                anim = null;
            }
            second = 11;
            updateNum1();
            anim = juggler.repeatCall(updateNum1, 1);
            //
            tt.restart();
        }

        private updateNum1() {
            if (second <= 0) {
                juggler.remove(anim);
                anim = null;
                return;
            }
            second--;
            moneyT.text = second + "";
            moneyT.x = (bg.width - moneyT.width) / 2;
            moneyT.y = (bg.height - moneyT.height) / 2;
        }

        public pointUp() {
            hideArrow();
            pUp.visible = true;
            update()
        }

        private hideArrow() {
            arrowMc.alpha = 0;
            pDown.visible = false;
            pUp.visible = false;
            pLeft.visible = false;
            pRight.visible = false;
        }

        public pointDown() {
            hideArrow();
            pDown.visible = true;
            update()
        }

        public pointLeft() {
            hideArrow();
            pLeft.visible = true;
            update()
        }

        public pointRight() {
            hideArrow();
            pRight.visible = true;
            update()
        }
    }
}
