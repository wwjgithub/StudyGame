/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 12:32
 */
module mjp {
    export class PlayerLeft extends PlayerRobot {
        constructor() {
            showCardsMc.initLeft();
            showCardsMc.x = 0;
            showCardsMc.y = 100;
            //
            discardCardsMc.initLeft();
            discardCardsMc.x = 140;
            discardCardsMc.y = IDiscardMc.YY;
            addChild(discardCardsMc);
            addChild(showCardsMc);
        }

        public updateIcon(isZhuang:boolean) {
            super.updateIcon(isZhuang);
            head.x = head.width / 2 + 2;
            head.y = UserConst.size.y / 2 + head.height / 2;
            if (this.isZhuang) {
                zhuangMc.x = head.x;
                zhuangMc.y = head.y + head.height / 2 + zhuangMc.height / 2;
                addChild(zhuangMc);
            }
        }
    }
}
