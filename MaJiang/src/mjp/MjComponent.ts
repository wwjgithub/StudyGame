namespace game {
    import Sprite = egret.Sprite;

    export class MjComponent extends Sprite {

        constructor() {
            super();
        }

        public card: MjCard;
        public chiCards: Array<MjCard>;
        private px: number;
        private py: number;
        private cnt: number;


        public moveTo(x: number, y: number): void {
            this.cnt = 0;
            this.px = (x - this.x) / 20;
            this.py = (y - this.y) / 20;
            this.addEventListener(egret.Event.ENTER_FRAME, this.updatePosition, this);
        }

        private updatePosition(event: egret.Event): void {
            this.x += this.px;
            this.y += this.py;
            this.cnt++;
            if (this.cnt >= 20) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.updatePosition, this);
            }
        }
    }
}