/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/12/22
 * Time: 17:08
 */
module mjp {
    //import assets.Asset;

    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.text.TextField;
    //import starling.text.TextFieldAutoSize;

    export class MoneyMc extends Sprite {
        constructor(money:number) {
            var ic:Image = new Image(Asset.assetManager.getTexture("金币"));
            ic.scaleX = ic.scaleY = 0.5;
            addChild(ic);
            var moneyT:TextField = new TextField(100, 50, money + "", "coin_num", 30, 0xffffff);
            moneyT.autoSize = TextFieldAutoSize.HORIZONTAL;
            moneyT.x = ic.x + ic.width + 2;
            moneyT.y = ic.y - 3;
            addChild(moneyT);
        }
    }
}
