module mjp {
    //import flash.display.BitmapData;
    //import flash.text.TextField;
    //import flash.text.TextFieldAutoSize;
    //import flash.text.TextFormat;

    //import starling.display.DisplayObject;
    //import starling.display.Image;
    //import starling.display.MovieClip;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.textures.Texture;
    //import starling.utils.Color;

    export class ObjUtil {
        public static autoRemove(mc:MovieClip) {
            juggler.add(mc);
            mc.addEventListener(Event.COMPLETE, onMcComplete);
        }

        private static function onMcComplete(event:Event) {
            var dc:MovieClip = MovieClip(event.currentTarget);
            juggler.remove(dc);
            removeMe(dc);
        }

        public static removeMe(dc:DisplayObject) {
            if (dc != null && dc.stage != null && dc.parent != null) {
                dc.parent.removeChild(dc);
            }
        }

        public static drawPoint(layer:Sprite, x:number, y:number) {
            var bd:BitmapData = new BitmapData(2, 2, false, 0xff0000);
            var t:Texture = Texture.fromBitmapData(bd);
            var image:Image = new Image(t);
            image.x = x;
            image.y = y;
            layer.addChild(image);
        }

        public static getTxtImg(txt:string, size:number = 20):Image {
            var tf:TextField = new TextField();
            var format:TextFormat = new TextFormat();
            format.color = Color.WHITE;
            format.size = 30;
            tf.defaultTextFormat = format;
            tf.wordWrap = false;
            tf.autoSize = TextFieldAutoSize.LEFT;
            tf.text = txt;
            var bmd:BitmapData = new BitmapData(tf.width, tf.height, true, 0);
            bmd.draw(tf);
            var tfImg:Image = new Image(Texture.fromBitmapData(bmd, false));
            return tfImg;
        }
    }
}
