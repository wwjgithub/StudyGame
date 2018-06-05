/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/28
 * Time: 16:20
 */
module mjp {
    //import flash.display.BitmapData;

    //import starling.display.DisplayObjectContainer;
    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.textures.Texture;

    export class Tool {
        constructor() {
        }

        public static drawPoint(m:Sprite, x:number = 0, y:number = 0) {
            var bd:BitmapData = new BitmapData(5, 5, false, 0xff0000);
            var t:Texture = Texture.fromBitmapData(bd);
            var debugPoint:Image = new Image(t);
            debugPoint.x = x;
            debugPoint.y = y;
            m.addChild(debugPoint);
        }

        public static clear(sp:DisplayObjectContainer) {
            while (sp.numChildren > 0) {
                sp.removeChildAt(0);
            }
        }
    }
}
