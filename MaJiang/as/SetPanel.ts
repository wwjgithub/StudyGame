module mjp {
    //import assets.Asset;

    //import feathers.display.Scale9Image;
    //import feathers.textures.Scale9Textures;

    //import flash.geom.Rectangle;

    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.textures.TextureSmoothing;

    /**
     * @author fq3
     */
    export class SetPanel extends Sprite {
        private back:Scale9Image;
        private backSprite:Sprite;
        private word1:Image;
        private sliderSet:SliderSet;
        private sliderSet1:SliderSet;
        private sliderSet2:SliderSet;

        constructor() {
            backSprite = new Sprite();
            addChild(backSprite);
            var tt:Scale9Textures = new Scale9Textures(Asset.assetManager.getTexture("面板2"), new Rectangle(15, 15, 15, 15));
            back = new Scale9Image(tt, 1);
            back.width = 550;
            back.height = 380;
            back.smoothing = TextureSmoothing.NONE;
            backSprite.addChild(back);
            backSprite.x = (UserConst.size.x - back.width) / 2;
            backSprite.y = (UserConst.size.y - back.height) / 2;
            word1 = new Image(Asset.assetManager.getTexture("设置文字"));
            word1.smoothing = TextureSmoothing.NONE;
            backSprite.addChild(word1);
            word1.x = (backSprite.width - word1.width) / 2;
            word1.y = 40;
            //
            //
            var yy:number = 0;
            sliderSet = new SliderSet("背景音乐", StorageData.musicVolume);
            backSprite.addChild(sliderSet);
            sliderSet.addEventListener(Event.CHANGE, onMusicVolumeChange);
            sliderSet.x = 200;
            sliderSet.y = 120 + yy;
            // 音效
            sliderSet1 = new SliderSet("音效", StorageData.sfxVolume);
            backSprite.addChild(sliderSet1);
            sliderSet1.addEventListener(Event.CHANGE, onSfxVolumeChange);
            sliderSet1.x = 200;
            sliderSet1.y = 200 + yy;
            // 出牌速度
            sliderSet2 = new SliderSet("牌速", StorageData.speed);
            backSprite.addChild(sliderSet2);
            sliderSet2.addEventListener(Event.CHANGE, onSpeedChange);
            sliderSet2.x = 200;
            sliderSet2.y = 280 + yy;
            //
            addEventListener(Event.REMOVED_FROM_STAGE, onRemove);
        }

        private onRemove(event:Event) {
            removeEventListener(Event.REMOVED_FROM_STAGE, onRemove);
            sliderSet.removeEventListener(Event.CHANGE, onMusicVolumeChange);
            sliderSet1.removeEventListener(Event.CHANGE, onSfxVolumeChange);
            sliderSet2.removeEventListener(Event.CHANGE, onSpeedChange);
        }

        private onSpeedChange(event:Event) {
            StorageData.speed = int(event.data);
        }

        private onSfxVolumeChange(event:Event) {
            StorageData.sfxVolume = int(event.data);
        }

        private onMusicVolumeChange(event:Event) {
            StorageData.musicVolume = int(event.data);
        }
    }
}
