/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/7
 * Time: 11:11
 */
module mjp {
    //import assets.Asset;

    //import starling.display.Image;
    //import starling.display.Quad;
    //import starling.display.Sprite;

    export class LiuJuMc extends Sprite {
        constructor() {
            super();
            var q:Quad = new Quad(UserConst.size.x, UserConst.size.y, 0xcccccc, true);
            q.alpha = 0.3;
            addChild(q);
            var liujuMc:Sprite = new Sprite();
            liujuMc.addChild(new Image(Asset.assetManager.getTexture("liuju")));
            liujuMc.x = (q.width - liujuMc.width) / 2;
            liujuMc.y = (q.height - liujuMc.height) / 2;
            addChild(liujuMc);
        }
    }
}
