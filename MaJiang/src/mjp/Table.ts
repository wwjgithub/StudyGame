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
    import Pointer = game.Pointer;
    import PlayerRight = game.PlayerRight;
    import PlayerUp = game.PlayerUp;
    import PlayerLeft = game.PlayerLeft;
    import PlayerHero = game.PlayerHero;

    export class Table extends Sprite {
        private decorate: mjp.Decorate;
        private pointer: game.Pointer;
        private playerRight: game.PlayerRight;
        private playerUp: game.PlayerUp;
        private playerLeft: game.PlayerLeft;
        private playerHero: game.PlayerHero;

        constructor() {
            super();
            IPlayer.init();
            //
            this.decorate = new Decorate();
            this.addChild(this.decorate);
            ///


            this.pointer = new Pointer();

            this.pointer.x = Global.stage_w / 2;
            this.pointer.y = Global.stage_h / 2;
            this.addChild(this.pointer)
            ////////
            this.playerRight = new PlayerRight();
            this.addChild(this.playerRight);
            this.playerUp = new PlayerUp();
            this.addChild(this.playerRight);
            this.playerLeft = new PlayerLeft();
            this.addChild(this.playerRight);
            this.playerHero = new PlayerHero();
            this.addChild(this.playerRight);
            /////
            this.playerHero.next=this.playerRight;
            this.playerRight.next=this.playerUp;
            this.playerUp.next=this.playerLeft;
            this.playerLeft.next=this.playerHero;


        }

        startFirst() {

        }
    }
}
