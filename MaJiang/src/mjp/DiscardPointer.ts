/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/12/3
 * Time: 11:10
 */
module mjp {
    //import assets.Asset;

    //import starling.animation.Transitions;
    //import starling.animation.Tween;
    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.events.Event;

    export class DiscardPointer extends Sprite {
        private pointer:Image = new Image(Asset.assetManager.getTexture("pointer"));
        private tween:Tween = new Tween(pointer, .5, Transitions.EASE_IN_OUT);
        private tween1:Tween = new Tween(pointer, .5, Transitions.EASE_IN);

        constructor() {
            pointer = new Image(Asset.assetManager.getTexture("pointer"));
            pointer.pivotX = pointer.width / 2;
            pointer.pivotY = pointer.height - 1;
            pointer.scaleX = pointer.scaleY = .6;
            addChild(pointer);
            //
            tween = new Tween(pointer, .5, Transitions.EASE_IN_OUT);
            tween1 = new Tween(pointer, .5, Transitions.EASE_IN);
            //
            addEventListener(Event.ADDED_TO_STAGE, onAdded);
            addEventListener(Event.REMOVED_FROM_STAGE, onRemoved);
        }

        private onRemoved(event:Event) {
            removePointer();
            juggler.remove(tween);
            juggler.remove(tween1)
        }

        private removePointer() {
            juggler.remove(tween);
            juggler.remove(tween1);
        }

        private onAdded(event:Event) {
            showPointerTween();
        }

        private showPointerTween() {
            pointer.y = 0;
            tween.reset(pointer, .5);
            tween.animate("y", pointer.y - 10);
            tween.onComplete = firstTweenComplete;
            juggler.add(tween);
        }

        private firstTweenComplete() {
            tween1.reset(pointer, .5);
            tween1.animate("y", pointer.y + 10);
            tween1.onComplete = showPointerTween;
            juggler.add(tween1);
        }
    }
}
