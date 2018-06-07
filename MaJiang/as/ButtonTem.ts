module mjp {
    //import assets.Asset;

    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.textures.TextureSmoothing;

    /**
     * @author
     */
    export class ButtonTem extends Sprite {
        private buttonImage:Image;
        private buttonWord:Image;

        constructor(back:string, word:string) {
            buttonImage = new Image(Asset.assetManager.getTexture(back));
            buttonImage.smoothing = TextureSmoothing.NONE;
            addChild(buttonImage);
            buttonWord = new Image(Asset.assetManager.getTexture(word));
            buttonWord.smoothing = TextureSmoothing.NONE;
            addChild(buttonWord);
            buttonWord.touchable = false;
            buttonWord.x = (this.width - buttonWord.width) / 2;
            buttonWord.y = (this.height - buttonWord.height) / 2;
        }
    }
}