/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/22
 * Time: 10:18
 */
module {
    //import flash.data.EncryptedLocalStore;
    //import flash.desktop.NativeApplication;
    //import flash.display.Sprite;
    //import flash.display.StageAlign;
    //import flash.events.InvokeEvent;
    //import flash.geom.Point;
    //import flash.geom.Rectangle;

    //import mjp.StorageData;
    //import mjp.UserConst;

    //import starling.core.Starling;

    [SWF(frameRate='30', backgroundColor=0)]
    export class Swf extends Sprite {
        constructor() {
            NativeApplication.nativeApplication.addEventListener(InvokeEvent.INVOKE, onInvoke);
        }

        private onInvoke(event:InvokeEvent) {
            if (Starling.current != null) {
                return;
            }
            EncryptedLocalStore.reset();
            StorageData.speed=10;
            var w:number = event.arguments[0];
            var h:number = event.arguments[1];
            NativeApplication.nativeApplication.activeWindow.width = w + 8;
            NativeApplication.nativeApplication.activeWindow.height = h + 27;
            Starling.multitouchEnabled = false;
            XML.ignoreWhitespace = true;
            stage.align = StageAlign.TOP;
            var mStarling:Starling;
            var port:Rectangle = new Rectangle(0, 0, w, h);
            mStarling = new Starling(Game, stage, port, null, "auto", ["baselineExtended", "baseline"]);
            mStarling.stage.stageHeight = 640;
            mStarling.stage.stageWidth = port.width / (port.height / mStarling.stage.stageHeight);
            UserConst.size = new Point(mStarling.stage.stageWidth, mStarling.stage.stageHeight);
            mStarling.antiAliasing = 0;
            mStarling.start();
        }
    }
}
