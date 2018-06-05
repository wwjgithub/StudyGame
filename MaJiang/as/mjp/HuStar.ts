/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/12/4
 * Time: 18:21
 */
module mjp {
    //import assets.Asset;

    //import starling.animation.Transitions;
    //import starling.animation.Tween;
    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.events.EnterFrameEvent;
    //import starling.events.Event;

    export class HuStar extends Sprite {
        private img:Image;

        constructor() {
            if (Math.random() > .5) {
                img = new Image(Asset.assetManager.getTexture("hu_star"))
            } else {
                img = new Image(Asset.assetManager.getTexture("hu_star_blue"))
            }
            img.pivotX = img.width / 2;
            img.pivotY = img.height / 2;
            img.scaleX = img.scaleY = 0.1;
            addChild(img);
            //
            addEventListener(Event.REMOVED_FROM_STAGE, onRemove);
            addEventListener(EnterFrameEvent.ENTER_FRAME, onEnterFrame);
            //
            var tween:Tween = new Tween(img, .8, Transitions.EASE_IN);
            tween.animate("scaleX", .8);
            tween.animate("scaleY", .8);
            tween.animate("x", 200);
            juggler.add(tween);
        }

        private onRemove(event:Event) {
            removeEventListener(EnterFrameEvent.ENTER_FRAME, onEnterFrame);
        }

        private onEnterFrame(event:EnterFrameEvent) {
            img.rotation += 0.1;
        }
    }
}
