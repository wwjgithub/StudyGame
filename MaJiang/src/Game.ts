module game {
    import Sprite = egret.Sprite;

    export class Game extends egret.Sprite {
        private homePage: HomePage;

        constructor() {
            super();
            this.homePage = new HomePage();
            this.addChild(this.homePage);
            this.homePage.addEventListener(HomePage.START, this.onExitHomePage, this)
        }

        private onExitHomePage(e: egret.Event) {

        }
    }
}
