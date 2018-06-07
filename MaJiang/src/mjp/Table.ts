/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 11:32
 */


module mjp {
    import Sprite = egret.Sprite;
    import IPlayer = game.IPlayer;
    import Decorate = mjp.Decorate;

    export class Table extends Sprite {
        private decorate: mjp.Decorate;

        constructor() {
            super();
            IPlayer.init();
            //
            this.decorate = new Decorate();
            this.decorate.x = Global.stage_w / 2;
            this.decorate.y = Global.stage_h / 2;
            this.addChild(this.decorate);

        }

        startFirst() {

        }
    }
}
