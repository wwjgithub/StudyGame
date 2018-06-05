/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/22
 * Time: 10:18
 */
module {
    //import flash.display.Sprite;
    //import flash.display.StageAlign;
    //import flash.geom.Point;
    //import flash.geom.Rectangle;
    //import flash.utils.clearInterval;
    //import flash.utils.setInterval;

    //import mjp.UserConst;

    //import starling.core.Starling;
    //import starling.events.Event;

    [SWF(width=960, height=640, frameRate='30', backgroundColor=0)]
    export class Android extends Sprite {
        private timer:number;

        constructor() {
            Starling.multitouchEnabled = false;
            Starling.handleLostContext = true;
            XML.ignoreWhitespace = true;
            stage.align = StageAlign.TOP;
            var mStarling:Starling;
            var fw:number = stage.fullScreenWidth;
            var fh:number = stage.fullScreenHeight;
            var port:Rectangle = new Rectangle(0, 0, fw > fh ? fw : fh, fw > fh ? fh : fw);
            mStarling = new Starling(Game, stage, port, null, "auto", ["baselineExtended", "baseline"]);
            mStarling.stage.stageHeight = 640;
            mStarling.stage.stageWidth = port.width / (port.height / mStarling.stage.stageHeight);
            UserConst.size = new Point(mStarling.stage.stageWidth, mStarling.stage.stageHeight);
            mStarling.start();
            timer = setInterval(init, 1000);
        }

        private init() {
            if (Game.instance != null) {
                AndroidAd.init();
                Game.instance.addEventListener(Game.SHOW_AD, onGameShowAd);
                clearInterval(timer);
            }
        }

        private onGameShowAd(event:Event) {
            AndroidAd.show();
        }
    }
}
