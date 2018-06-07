/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/31
 * Time: 17:37
 */
module mjp {
    //import engine.vo.MjCard;

    //import starling.display.Sprite;
    //import starling.events.EnterFrameEvent;

    export class MjComponent extends Sprite {
        public card:MjCard;
        public chiCards:MjCard[];
        private px:number;
        private py:number;
        private cnt:number;

        constructor() {
        }

        public moveTo(x:number, y:number) {
            cnt = 0;
            px = (x - this.x) / 20;
            py = (y - this.y) / 20;
            addEventListener(EnterFrameEvent.ENTER_FRAME, updatePosition);
        }

        private updatePosition(event:EnterFrameEvent) {
            this.x += px;
            this.y += py;
            cnt++;
            if (cnt >= 20) {
                removeEventListener(EnterFrameEvent.ENTER_FRAME, updatePosition);
            }
        }
    }
}
