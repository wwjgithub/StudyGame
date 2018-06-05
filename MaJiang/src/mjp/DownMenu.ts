module mjp {
    //import assets.Asset;

    //import starling.animation.Transitions;
    //import starling.animation.Tween;
    //import starling.display.DisplayObject;
    //import starling.display.Image;
    //import starling.display.Quad;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;
    //import starling.textures.TextureSmoothing;
    //import starling.utils.Color;

    export class DownMenu extends Sprite {
        private downBtn:Sprite;
        private backSprite:Sprite;
        private showIntro:boolean = true;

        constructor(s:Sprite) {
            downBtn = s;
            //
            var u:Quad = new Quad(1136, 630);
            u.color = Color.BLACK;
            u.alpha = 0.2;
            addChildAt(u, 0);
            u.addEventListener(TouchEvent.TOUCH, u_Handle);
            //
            backSprite = new Sprite();
            addChild(backSprite);
            //
            var backImage:Image = new Image(Asset.assetManager.getTexture("设置面板"));
            backImage.smoothing = TextureSmoothing.TRILINEAR;
            if (showIntro) {
                backImage.height += 100
            }
            backSprite.addChild(backImage);
            backSprite.x = 15;
            backSprite.y = -backImage.height;
            ///////////
            var YY:number = 41;
            var YS:number = 100;
            //查看信息图标
            if (showIntro) {
                var aboutBtnImg:Image = new Image(Asset.assetManager.getTexture("关卡介绍图标按钮"));
                aboutBtnImg.smoothing = TextureSmoothing.TRILINEAR;
                backSprite.addChild(aboutBtnImg);
                aboutBtnImg.x = 30;
                aboutBtnImg.y = YY;
                YY += YS;
                aboutBtnImg.addEventListener(TouchEvent.TOUCH, aboutBtnImg_Handle);
            }
            // 设置图标
            var setBtnImg:Image = new Image(Asset.assetManager.getTexture("设置图标按钮"));
            setBtnImg.smoothing = TextureSmoothing.TRILINEAR;
            backSprite.addChild(setBtnImg);
            setBtnImg.x = 30;
            setBtnImg.y = YY;
            YY += YS;
            setBtnImg.addEventListener(TouchEvent.TOUCH, setBtnImg_Handle);
            // 离开图标
            var leaveBtnImg:Image = new Image(Asset.assetManager.getTexture("离开图标按钮"));
            leaveBtnImg.smoothing = TextureSmoothing.TRILINEAR;
            backSprite.addChild(leaveBtnImg);
            leaveBtnImg.x = 30;
            leaveBtnImg.y = YY;
            YY += YS;
            leaveBtnImg.addEventListener(TouchEvent.TOUCH, leaveBtnImg_Handle);
            //
            var tween:Tween = new Tween(backSprite, 0.4, Transitions.EASE_IN_OUT);
            tween.moveTo(backSprite.x, 0);
            juggler.add(tween);
            //
            addEventListener(Event.REMOVED_FROM_STAGE, onRemove);
        }

        private onRemove(event:Event) {
            for (var i:number = 0; i < backSprite.numChildren; i++) {
                (backSprite.getChildAt(i)).removeEventListeners();
            }
            for (var j:number = 0; j < this.numChildren; j++) {
                (this.getChildAt(j)).removeEventListeners();
            }
            removeEventListener(Event.REMOVED_FROM_STAGE, onRemove);
        }

        private u_Handle(e:TouchEvent) {
            if (e.getTouch(DisplayObject(e.currentTarget), TouchPhase.ENDED)) {
                downBtn.visible = true;
                removeFromParent(true);
            }
        }


        private setBtnImg_Handle(e:TouchEvent) {
            if (e.getTouch(DisplayObject(e.currentTarget), TouchPhase.ENDED)) {
                removeChild(backSprite);
                addChild(new SetPanel());
            }
        }

        private aboutBtnImg_Handle(e:TouchEvent) {
            if (e.getTouch(DisplayObject(e.currentTarget), TouchPhase.ENDED)) {
                removeChild(backSprite);
                addChild(new IntroPanel());
            }
        }

        private leaveBtnImg_Handle(e:TouchEvent) {
            if (e.getTouch(DisplayObject(e.currentTarget), TouchPhase.ENDED)) {
                removeChild(backSprite);
                var child:SurePanel = new SurePanel();
                child.addEventListener(Event.REMOVED_FROM_STAGE, onLeave);
                addChild(child);
            }
        }

        private onLeave(event:Event) {
            event.currentTarget.removeEventListeners();
            downBtn.visible = true;
            removeFromParent(true);
        }
    }
}
