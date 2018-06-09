namespace game{
    import Sprite = egret.Sprite;
    import DisplayObject = egret.DisplayObject;

    export class CButton extends Sprite{
        public mUpState: egret.DisplayObject;

        constructor(mc:DisplayObject) {
            super();
            this.addChild(mc);
            this.mUpState=mc;
        }
    }
}