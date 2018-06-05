/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 12:32
 */
module mjp {
    export class PlayerUp extends PlayerRobot {
        constructor() {
            super();
            x = UserConst.size.x;
            showCardsMc.initUp();
            showCardsMc.y = 20;
            showCardsMc.x = -(UserConst.size.x - UserConst.UP_CARD_WIDTH * 14 - 10) / 2 - UserConst.UP_CARD_WIDTH;
            //
            discardCardsMc.initUp();
            discardCardsMc.x = -(UserConst.size.x - IDiscardMc.discardCardSize.width * IDiscardMc.CNT_HOR) / 2 - IDiscardMc.discardCardSize.width;
            discardCardsMc.y = IDiscardMc.YY;
            addChild(discardCardsMc);
            addChild(showCardsMc);
        }

        public updateIcon(isZhuang:boolean) {
            super.updateIcon(isZhuang);
            head.x = showCardsMc.x + head.width / 2;
            head.y = head.height / 2 + 4;
            if (this.isZhuang) {
                zhuangMc.x = head.x + head.width / 2 + zhuangMc.width / 2;
                zhuangMc.y = head.y;
                addChild(zhuangMc);
            }
        }
    }
}
