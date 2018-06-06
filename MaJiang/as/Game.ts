/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 11:10
 */
module {
    export class Game extends Sprite {
        private table:Table;
        private homePage:HomePage;
        public static var instance:Game;
        private downBtn:Sprite;

        constructor() {
            instance = this;
            Asset.initHome();
            homePage = new HomePage();
            homePage.addEventListener(HomePage.START, onExitHomePage);
            addChild(homePage);
            try {
                NativeApplication.nativeApplication.addEventListener(flash.events.Event.DEACTIVATE, onDeactivate);
                NativeApplication.nativeApplication.addEventListener(flash.events.Event.ACTIVATE, onActivate);
            } catch (e:Error) {
            }
            NativeApplication.nativeApplication.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
        }

        private onKeyDown(event:KeyboardEvent) {
            if (event.ctrlKey) {
                if (event.keyCode == Keyboard.C) {
                    ScreenShotUtil.screenShotStarling("/../../screenshot");
                }
            }
        }

        private onActivate(event:flash.events.Event) {
            SoundMixer.soundTransform = new SoundTransform(1);
            juggler.resume();
            addEventListener(EnterFrameEvent.ENTER_FRAME, onEnterFrame);
            AssetSound.playBg(true)
        }

        private onDeactivate(event:flash.events.Event) {
            SoundMixer.soundTransform = new SoundTransform(0);
            juggler.pause();
            removeEventListener(EnterFrameEvent.ENTER_FRAME, onEnterFrame);
            AssetSound.playBg(false)
        }

        private onExitHomePage(event:starling.events.Event) {
            homePage.destroy();
            Asset.initLevel();
            AssetSound.init();
            StorageData.read();
            //
            AssetSound.playBg(true);
            addEventListener(EnterFrameEvent.ENTER_FRAME, onEnterFrame);
            //
            Asset.init();
            AssetFont.init();
            table = new Table();
            table.addEventListener(Table.RESULT, onResult);
            //
            //下拉菜单按钮
            downBtn = new Sprite();
            var quad:Quad = new Quad(90, 80, 0);
            quad.alpha = 0;
            downBtn.addChild(quad);
            var img:Image = new Image(Asset.assetManager.getTexture("下拉按钮"));
            img.smoothing = TextureSmoothing.NONE;
            downBtn.addChild(img);
            downBtn.addEventListener(TouchEvent.TOUCH, downBtn_Handle);
            downBtn.x = 5;
            downBtn.y = 5;
            //
            addChildAt(downBtn, 0);
            addChildAt(table, 0);
            //
            table.startFirst();
        }

        private downBtn_Handle(e:TouchEvent) {
            if (e.getTouch(downBtn, TouchPhase.ENDED)) {
                downBtn.visible = false;
                var d:DownMenu = new DownMenu(downBtn);
                addChild(d);
            }
        }

        private onResult(event:starling.events.Event) {
            var huInfo:HuInfo = event.data[0];
            var huPlayer:IPlayer = event.data[1];
            var heroPlayer:PlayerHero = event.data[2];
            var money:number = event.data[3];
            var resultPanel:ResultPanel = new ResultPanel(huInfo, heroPlayer, money, huPlayer);
            resultPanel.addEventListener(ResultPanel.CONTINUE, onNextPlay);
            addChild(resultPanel);
        }

        private onNextPlay(event:starling.events.Event) {
            var resultPanel:ResultPanel = ResultPanel(event.currentTarget);
            var huPlayer:IPlayer = resultPanel.huPlayer;
            resultPanel.removeEventListeners();
            removeChild(resultPanel);
            //
            table.startNext(huPlayer);
            ///
            dispatchEvent(new starling.events.Event(Game.SHOW_AD));
        }

        private onEnterFrame(event:EnterFrameEvent) {
            juggler.advanceTime(event.passedTime);
        }

        public exitGame() {
            NativeApplication.nativeApplication.exit();
        }
    }
}
