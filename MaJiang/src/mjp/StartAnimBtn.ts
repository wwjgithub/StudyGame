/**
 * Created by wuwenjun on 16/2/19.
 */
module mjp {
    //import assets.Asset;

    //import starling.animation.Transitions;
    //import starling.animation.Tween;
    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;

    export class StartAnimBtn extends Sprite {
        public mc:Image;
        public img:Image;

        constructor() {
            this.mc = new Image(Asset.assetManager.getTexture("startgame1"));
            mc.pivotX = mc.width / 2;
            mc.pivotY = mc.height / 2;
            addChild(mc);
            img = new Image(Asset.assetManager.getTexture("startgame"));
            img.pivotX = img.width / 2;
            img.pivotY = img.height / 2;
            addChild(img);
        }

    }
}
