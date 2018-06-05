/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/27
 * Time: 12:37
 */
module mjp {
    //import engine.vo.MjCard;

    //import starling.display.Sprite;
    //import starling.events.EnterFrameEvent;

    export class CardSprite extends Sprite {
        private _card:MjCard;
        public oriY:number;
        private targetY:number;
        private kk:number;

        public get card():MjCard {
            return _card;
        }

        constructor(card:MjCard) {
            _card = card;
        }

        public moveY(y:number) {
            targetY = y;
            kk = (targetY - this.y) / 4;
            addEventListener(EnterFrameEvent.ENTER_FRAME, onUpdate);
        }

        private onUpdate(event:EnterFrameEvent) {
            y += kk;
            if (Math.abs(y - targetY) < 3) {
                y = targetY;
                removeEventListener(EnterFrameEvent.ENTER_FRAME, onUpdate);
                dispatchEvent(new MjEvent(MjEvent.FETCH_COMPLETE))
            }
        }
    }
}
