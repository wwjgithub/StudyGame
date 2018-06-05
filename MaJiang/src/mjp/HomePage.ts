module mjp {
    //import assets.Asset;

    //import starling.display.DisplayObject;
    //import starling.display.Image;
    //import starling.display.Quad;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;
    //import starling.utils.Color;

    //import utils.CButton;

    /**
     * @author fq3
     */
    export class HomePage extends Sprite {
        private qu:Quad;
        private img:Image;
        private btn1:CButton;
        private btn2:CButton;
        public static START:string = "HomePage.START";
        private btns;

        constructor() {
            ////
            img = new Image(Asset.assetManager.getTexture("homePage"));
            img.x = (UserConst.size.x - img.width) / 2;
            addChild(img);
            //
            var title:Image = new Image(Asset.assetManager.getTexture("title"));
            title.width = UserConst.size.x * .8;
            title.scaleY = title.scaleX;
            title.x = (UserConst.size.x - title.width) / 2;
            title.y = UserConst.size.y * .1;
            addChild(title);
            //
            btn1 = new CButton(new Image(Asset.assetManager.getTexture("开始游戏1")));
            addChild(btn1);
            btn1.addEventListener(TouchEvent.TOUCH, btn1_Handle);
            btn2 = new CButton(new Image(Asset.assetManager.getTexture("游戏说明1")));
            addChild(btn2);
            btn2.addEventListener(TouchEvent.TOUCH, btn2_Handle);
            //
            btns = [];
            btns.push(btn1);
            btns.push(btn2);
            var yy:number = UserConst.size.y - 30;
            for (var i:number = btns.length - 1; i >= 0; i--) {
                var image:DisplayObject = btns[i];
                image.width = 300;
                image.scaleY = image.scaleX;
                image.x = UserConst.size.x - 350;
                yy -= image.height + 10;
                image.y = yy;
            }
        }

        private btn1_Handle(e:TouchEvent) {
            if (e.getTouch(btn1, TouchPhase.ENDED)) {
                btn1.removeEventListener(TouchEvent.TOUCH, btn1_Handle);
                ff();
            }
        }

        private btn2_Handle(e:TouchEvent) {
            if (e.getTouch(btn2, TouchPhase.ENDED)) {
                addChild(new explainPanel());
            }
        }

        private ff() {
            for (var i:number = 0; i < btns.length; i++) {
                var object:CButton = btns[i];
                object.removeEventListeners();
            }
            qu = new Quad(UserConst.size.x, UserConst.size.y, Color.BLACK);
            addChild(qu);
            qu.alpha = 0;
            addEventListener(Event.ENTER_FRAME, onEnterFrame);
        }

        private onEnterFrame(event:Event) {
            qu.alpha = qu.alpha + 0.1;
            if (qu.alpha == 1) {
                removeEventListener(Event.ENTER_FRAME, onEnterFrame);
                dispatchEvent(new Event(HomePage.START));
                return;
            }
        }

        public destroy() {
            removeEventListener(Event.ENTER_FRAME, onEnterFrame);
            img.texture.dispose();
            img.dispose();
            img = null;
            btn1.dispose();
            btn1 = null;
            ObjUtil.removeMe(this);
        }

        public hideBtns() {
            for (var i:number = 0; i < btns.length; i++) {
                var cbutton:CButton = btns[i];
                cbutton.visible = false;
            }
        }

        public setBtnsVisible(b:boolean) {
            for (var i:number = 0; i < btns.length; i++) {
                var object:DisplayObject = btns[i];
                object.visible = b;
            }
        }
    }
}
