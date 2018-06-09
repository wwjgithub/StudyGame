namespace game {

    export class Game extends egret.Sprite {
        private homePage: HomePage;
        private table: Table;

        constructor() {
            super();
            this.homePage = new HomePage();
            this.addChild(this.homePage);
            this.homePage.addEventListener(HomePage.START, this.onExitHomePage, this)
            this.homePage.dispatchEvent(new egret.Event(HomePage.START));
        }

        private onExitHomePage(e: egret.Event) {
            this.homePage.removeEventListener(HomePage.START, this.onExitHomePage, this);
            this.homePage.destroy();
            this.removeChild(this.homePage);
            //


            //todo:SoundManager.getInstance().playBg(true);
            this.table = new Table();
            this.addChild(this.table);
            this.table.startFirst();
        }
    }
}
