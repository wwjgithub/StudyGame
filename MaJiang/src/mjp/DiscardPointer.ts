namespace game {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;
    import Ease = egret.Ease;

    export class DiscardPointer extends Sprite {

        private pointer: Bitmap;
        private tween: egret.Tween;

        constructor() {
            super();

            this.pointer = new Bitmap();
            this.pointer.texture = Global.getRes("pointer");
            this.pointer.anchorOffsetX = this.pointer.width / 2;
            this.pointer.anchorOffsetY = this.pointer.height - 1;
            this.pointer.scaleX = this.pointer.scaleY = .6;
            this.addChild(this.pointer);
            //

            this.tween = egret.Tween.get(this.pointer, {loop: true}).to("y", 500, Ease.sineInOut).to("y", 500, Ease.sineIn);
            //
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        }

        private onRemoved(event: Event): void {
            this.tween.pause();
        }

        private onAdded(event: Event): void {
            this.pointer.y = 0;
            this.tween.play();
        }

    }
}