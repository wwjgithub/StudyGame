namespace game{
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;

    export class IPlayer extends Sprite{
        private static zhuangMc: Bitmap;

        static init() {
            IPlayer.zhuangMc = new Bitmap();
            IPlayer.zhuangMc.texture = Global.getRes("zhuang");
            IPlayer.zhuangMc.anchorOffsetX = IPlayer.zhuangMc.width / 2;
            IPlayer.zhuangMc.anchorOffsetY = IPlayer.zhuangMc.height / 2;
            IPlayer.zhuangMc.scaleX = IPlayer.zhuangMc.scaleY = .5;
        }
    }
}