module mjp {
    //import assets.Asset;

    //import flash.geom.Rectangle;

    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.textures.TextureSmoothing;

    /**
     * @author fq3
     */
    export class ProgressBar extends Sprite {
        private bar1:Image;
        private bar2:Image;
        private container:Sprite;

        constructor() {
            container = new Sprite();
            addChild(container);
            //
            bar1 = new Image(Asset.assetManager.getTexture("进度条1"));
            bar1.smoothing = TextureSmoothing.NONE;
            container.addChild(bar1);
            //
            bar2 = new Image(Asset.assetManager.getTexture("进度条2"));
            bar2.smoothing = TextureSmoothing.NONE;
            bar2.y = 6;
            container.addChild(bar2);
            //
            container.clipRect = new Rectangle(0, 0, container.width, container.height);
            ///
            var g:Image = new Image(Asset.assetManager.getTexture("金币"));
            g.smoothing = TextureSmoothing.NONE;
            g.pivotX = g.width / 2;
            g.pivotY = g.height / 2;
            addChild(g);
            g.y = 16;
            g.x = -10;
            ///
            setv(0);
        }

        public setv(s:number) {
            s = s < 0 ? 0 : s;
            s = s > 100 ? 100 : s;
            //
            var xx:number = (1 - s / 100) * bar2.width;
            bar2.x = -xx + 6;
        }
    }
}
