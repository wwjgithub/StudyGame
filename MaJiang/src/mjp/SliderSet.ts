module mjp {
    //import assets.Asset;

    //import flash.geom.Point;

    //import starling.display.Image;
    //import starling.display.Quad;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.events.Touch;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;
    //import starling.textures.TextureSmoothing;

    /**
     * 0---10
     */
    export class SliderSet extends Sprite {
        var volumeQuad:Quad;
        //var volumeQuad1 : Quad;
        var volumeBtn:Image;
        var back:Image;
        var num:number;

        constructor(s:string, n:number) {
            num = n;
            // 音量
            var volumeImg:Image = ObjUtil.getTxtImg(s);
            addChild(volumeImg);
            volumeImg.x = -(volumeImg.width + 30);
            volumeImg.y = 0;
            back = new Image(Asset.assetManager.getTexture("滑动选项1"));
            back.smoothing = TextureSmoothing.TRILINEAR;
            addChild(back);
            back.x = -21;
            volumeQuad = new Quad(10, 28);
            volumeQuad.color = 0x00CCCC;
            addChild(volumeQuad);
            volumeQuad.x = 0;
            volumeQuad.y = 6;
            volumeBtn = new Image(Asset.assetManager.getTexture("调节按钮"));
            volumeBtn.smoothing = TextureSmoothing.TRILINEAR;
            addChild(volumeBtn);
            volumeBtn.addEventListener(TouchEvent.TOUCH, volumeBtn_Handle);
            volumeBtn.pivotX = volumeBtn.width / 2;
            volumeBtn.pivotY = volumeBtn.height / 2;
            volumeBtn.y = volumeBtn.y + 21;
            setVolumeBtn();
        }

        //从22开始滑
        private setVolumeBtn() {
            volumeBtn.x = num * 30;
            volumeQuad.x = 0;
            volumeQuad.width = volumeBtn.x;
        }

        private volumeBtn_Handle(e:TouchEvent) {
            if (e.getTouch(volumeBtn, TouchPhase.BEGAN) || e.getTouch(volumeBtn, TouchPhase.MOVED)) {
                var t:Touch = e.touches[0] as Touch;
                var m:number = t.globalX - this.localToGlobal(new Point(0, 0)).x;
                if (m > 0 && m < 300) {
                    volumeBtn.x = m;
                    volumeQuad.x = 0;
                    volumeQuad.width = volumeBtn.x;
                    num = m / 30;
                }
                if (m <= 0) {
                    volumeBtn.x = 0;
                    volumeQuad.x = 0;
                    volumeQuad.width = 0;
                    num = 0;
                }
                if (m >= 300) {
                    volumeBtn.x = 300;
                    volumeQuad.x = 0;
                    volumeQuad.width = 300;
                    num = 10;
                }
            }
            dispatchEvent(new Event(Event.CHANGE, false, num));
        }

        public destroy() {
            this.removeFromParent(true);
        }
    }
}
