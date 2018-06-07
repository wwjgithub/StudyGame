/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 12:32
 */
module mjp {
    export class PlayerRight extends PlayerRobot {
        constructor() {
            super();
            x = UserConst.size.x;
            y = UserConst.size.y;
            showCardsMc.initRight();
            showCardsMc.x = -120;
            showCardsMc.y = -210;
            //
            discardCardsMc.initRight();
            discardCardsMc.x = -140 - IDiscardMc.discardCardSize.width;
            discardCardsMc.y = -(UserConst.size.y - IDiscardMc.YY - (IDiscardMc.CNT_VER - 1) * IDiscardMc.discardCardSize.height);
            addChild(discardCardsMc);
            addChild(showCardsMc);
        }

        public updateIcon(isZhuang:boolean) {
            super.updateIcon(isZhuang);
            head.x = -head.width / 2 - 2;
            head.y = -UserConst.size.y / 2 - head.height;
            if (this.isZhuang) {
                zhuangMc.x = head.x;
                zhuangMc.y = head.y + head.height / 2 + zhuangMc.height / 2;
                addChild(zhuangMc);
            }
        }
    }
}
