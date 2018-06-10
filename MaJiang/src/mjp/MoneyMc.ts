namespace game {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;
    import BitmapText = egret.BitmapText;

    export class MoneyMc extends Sprite {

        constructor(m: number) {
            super();
            var ic: Bitmap = new Bitmap(Global.getRes("金币"));
            ic.scaleX = ic.scaleY = 0.5;
            this.addChild(ic);
            var moneyT: BitmapText = new BitmapText();
            moneyT.font = RES.getRes("coin_num_fnt");
            moneyT.text = m + "";
            moneyT.height = 50;
            moneyT.scaleX = moneyT.scaleY;
            moneyT.x = ic.x + ic.width + 2;
            moneyT.y = ic.y - 3;
            this.addChild(moneyT);
        }
    }
}
