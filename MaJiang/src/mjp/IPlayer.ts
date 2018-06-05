/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 12:31
 */
module mjp {
    //import assets.Asset;
    //import assets.AssetSound;

    //import engine.MjRound;
    //import engine.vo.HuInfo;
    //import engine.vo.MjCard;
    //import engine.vo.MjChiInfo;
    //import engine.vo.MjFetchInfo;
    //import engine.vo.MjPlayer;
    //import engine.vo.MjTingInfo;

    //import flash.geom.Point;

    //import starling.display.DisplayObject;
    //import starling.display.Image;
    //import starling.display.MovieClip;
    //import starling.display.Sprite;
    //import starling.events.EnterFrameEvent;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;
    //import starling.textures.TextureSmoothing;

    //import utils.TxtUtil;

    export class IPlayer extends Sprite {
        public playerInfo:PlayerInfo;
        public showCardsMc:IShowMc = new IShowMc();
        public discardCardsMc:IDiscardMc = new IDiscardMc();
        private _core:MjPlayer;
        private _next:IPlayer;
        public opt:Opt;
        public head:Sprite;
        private lastFetchIsRevers:boolean;
        public static SHOW_HEAD_TIP:string = "IPlayer.SHOW_HEAD_TIP";
        public static var zhuangMc:Image;
        private isZhuang:boolean;

        constructor() {
            discardCardsMc.addEventListener(MjEvent.DISCARD, onAppendDiscard);
        }

        public set core(core:MjPlayer) {
            _core = core;
        }

        public showCards(sort:boolean = false) {
            if (sort) {
                core.sort();
            }
            showCardsMc.updateFunc(core)
        }

        public get core():MjPlayer {
            return _core;
        }

        public set next(next:IPlayer) {
            _next = next;
        }

        public get next():IPlayer {
            return _next;
        }

        public fetch(reverse:boolean) {
            lastFetchIsRevers = reverse;
            var fetchInfo:MjFetchInfo = MjRound.instance.fetch(reverse);
            core.onFetchedCard(fetchInfo.card);
            showCardsMc.putFetchCardFunc(fetchInfo.card);
        }

        public chi(mjChiInfo:MjChiInfo) {
            core.onChi(mjChiInfo);
            dispatchEvent(new MjEvent(MjEvent.CHI))
        }

        public peng(card:MjCard) {
            core.onPeng(card);
            dispatchEvent(new MjEvent(MjEvent.PENG))
        }

        public mingGang(card:MjCard) {
            core.onMingGang(card);
            dispatchEvent(new MjEvent(MjEvent.MINGGANG));
        }

        public anGang(card:MjCard) {
            core.onAnGang(card);
            dispatchEvent(new MjEvent(MjEvent.ANGANG));
        }

        public wantBuGang(card:MjCard) {
            dispatchEvent(new MjEvent(MjEvent.WANT_BUGANG, false, card));
        }

        public buGang(card:MjCard) {
            core.onBuGang(card);
            dispatchEvent(new MjEvent(MjEvent.BUGANG));
        }

        public decideOnOtherBuGang(mjCard:MjCard, passFunc) {
        }

        /**
         * 根据位置.显示打牌动画.
         * @param card
         * @param x
         * @param y
         */
        public showDiscardAnim(card:MjCard, x:number, y:number) {
            var startPos:Point = new Point(x, y);
            startPos = showCardsMc.localToGlobal(startPos);
            startPos = Anim.instance.globalToLocal(startPos);
            var endPos:Point = discardCardsMc.getNextPos();
            endPos = discardCardsMc.localToGlobal(endPos);
            endPos = Anim.instance.globalToLocal(endPos);
            Anim.instance.showDiscardAnim(this, card, startPos, endPos);
            AssetSound.playMj(playerInfo.sex, card);
        }

        /**
         * 打牌区显示牌后
         * @param event
         */
        private onAppendDiscard(event:MjEvent) {
            juggler.delayCall(dispatchEvent, .2 * StorageData.getSpeedPercent(), new MjEvent(MjEvent.DISCARD, false, event.data));
        }

        public decideAfterOpt() {
        }

        public hu(info:HuInfo) {
            dispatchEvent(new MjEvent(MjEvent.HU, false, info));
        }

        public zimo(info:HuInfo) {
            dispatchEvent(new MjEvent(MjEvent.HU_ZIMO, false, info))
        }

        public ting(tingInfo:MjTingInfo) {
            core.tingInfo = tingInfo;
            Anim.instance.showTing(this);
        }

        public decideOnOtherDiscard(card:MjCard, isPrevDiscard:boolean, callBack) {
        }

        public updateIcon(isZhuang:boolean) {
            this.isZhuang = isZhuang;
            if (head != null) {
                head.removeEventListeners();
                removeChild(head);
                head = null;
            }
            head = new Sprite();
            //
            var image:Image = new Image(Asset.assetManager.getTexture("头象框"));
            image.pivotX = image.width / 2;
            image.pivotY = image.height / 2;
            image.smoothing = TextureSmoothing.NONE;
            var image1:Image = new Image(Asset.assetManager.getTexture(playerInfo.name));
            image1.pivotX = image1.width / 2;
            image1.pivotY = image1.height / 2;
            image1.width = image.width - 2;
            image1.height = image.height - 2;
            head.addChild(image1);
            head.addChild(image);
            image1.smoothing = TextureSmoothing.BILINEAR;
            //
            var nameT:Image = TxtUtil.getTxtImg(playerInfo.name, 24, 200, 0xffff00);
            nameT.pivotX = nameT.width / 2;
            nameT.y = image1.height / 2 + 6;
            head.addChild(nameT);
            //
            var moneyT:Image = TxtUtil.getTxtImg(playerInfo.money + "", 24, 200, 0xffff00);
            moneyT.pivotX = moneyT.width / 2;
            moneyT.y = -image1.height / 2 - 26;
            head.addChild(moneyT);
            //
            head.scaleX = head.scaleY = 0.6;
            //
            head.addEventListener(TouchEvent.TOUCH, onClickHead);
            addChildAt(head,0);
        }

        private onClickHead(event:TouchEvent) {
            if (event.getTouch(DisplayObject(event.currentTarget), TouchPhase.ENDED)) {
                dispatchEventWith(IPlayer.SHOW_HEAD_TIP);
            }
        }

        public updateInfo(info:PlayerInfo) {
            playerInfo = info;
            updateIcon(isZhuang);
        }

        public showAnim() {
            var mc:MovieClip = new MovieClip(Asset.assetManager.getTextures("变身效果"));
            mc.fps = 4;
            mc.loop = false;
            mc.scaleX = mc.scaleY = .8;
            mc.pivotX = 70;
            mc.pivotY = 65;
            mc.x = head.x;
            mc.y = head.y;
            head.parent.addChild(mc);
            mc.addEventListener(EnterFrameEvent.ENTER_FRAME, onRemoveAnim);
            juggler.add(mc);
        }

        private onRemoveAnim(event:EnterFrameEvent) {
            var mc:MovieClip = MovieClip(event.currentTarget);
            if (mc.isComplete) {
                juggler.remove(mc);
                mc.removeFromParent();
            }
        }

        public static init() {
            zhuangMc = new Image(Asset.assetManager.getTexture("zhuang"));
            zhuangMc.pivotX = zhuangMc.width / 2;
            zhuangMc.pivotY = zhuangMc.height / 2;
            zhuangMc.scaleX = zhuangMc.scaleY = .5;
        }
    }
}
