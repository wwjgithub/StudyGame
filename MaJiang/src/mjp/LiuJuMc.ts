namespace game {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;

     export class LiuJuMc extends Sprite {

        constructor() {
            super();

            var q: Sprite = new Sprite();
            q.graphics.beginFill(0xcccccc, .3);
            q.graphics.drawRect(0, 0, Global.stage_w, Global.stage_h);
            q.graphics.endFill();
            this.addChild(q);
            var liujuMc: Sprite = new Sprite();
            liujuMc.addChild(new Bitmap(Global.getRes("liuju")));
            liujuMc.x = (q.width - liujuMc.width) / 2;
            liujuMc.y = (q.height - liujuMc.height) / 2;
            this.addChild(liujuMc);
        }
    }
}