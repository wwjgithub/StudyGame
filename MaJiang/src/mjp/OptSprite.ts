namespace game {
    import Sprite = egret.Sprite;

    export class OptSprite extends Sprite {

        public chiInfo: MjChiInfo;
        public pengCard: MjCard;
        public mingGangCard: MjCard;
        public anGangCard: MjCard;
        public huInfo: HuInfo;
        public pass: boolean;
        public isTing: boolean;
        public buGangCard: MjCard;

        constructor() {
            super();
        }
    }
}