namespace game {

    import Sprite = egret.Sprite;
    import Event = egret.Event;
    import Bitmap = egret.Bitmap;
    import TextField = egret.TextField;
    import Point = egret.Point;


    export class IPlayer extends Sprite {
        public playerInfo: PlayerInfo;
        public next: IPlayer;
        public head: Sprite;
        public core: MjPlayer;
        public isZhuang: boolean;
        public opt: Opt;
        public lastFetchIsRevers: Boolean;
        public showCardsMc: IShowMc = new IShowMc();
        public discardCardsMc: IDiscardMc = new IDiscardMc();

        public static zhuangMc: Bitmap;

        constructor() {
            super();
            this.discardCardsMc.addEventListener(MjEvent.DISCARD, this.onAppendDiscard,this);

        }
        public zimo(info:HuInfo):void {
            this.dispatchEvent(new MjEvent(MjEvent.HU_ZIMO, false, false,info))
        }

        private onAppendDiscard(event:MjEvent):void {
            egret.setTimeout(this.dispatchEvent, this,200 * StorageData.getSpeedPercent(), new MjEvent(MjEvent.DISCARD, false, false,event.data));
        }

        static init() {
            IPlayer.zhuangMc = new Bitmap();
            IPlayer.zhuangMc.texture = Global.getRes("zhuang");
            IPlayer.zhuangMc.anchorOffsetX = IPlayer.zhuangMc.width / 2;
            IPlayer.zhuangMc.anchorOffsetY = IPlayer.zhuangMc.height / 2;
            IPlayer.zhuangMc.scaleX = IPlayer.zhuangMc.scaleY = .5;
        }


        public updateInfo(info: PlayerInfo): void {
            this.playerInfo = info;
            this.updateIcon(this.isZhuang);
        }

        public updateIcon(isZhuang: boolean): void {
            this.isZhuang = isZhuang;
            if (this.head != null) {
                this.removeChild(this.head);
                this.head = null;
            }
            this.head = new Sprite();
            //
            var image: Bitmap = new Bitmap(Global.getRes("头象框"));
            image.anchorOffsetX = image.width / 2;
            image.anchorOffsetY = image.height / 2;
            var image1: Bitmap = new Bitmap(Global.getRes(this.playerInfo.name));
            image1.anchorOffsetX = image1.width / 2;
            image1.anchorOffsetY = image1.height / 2;
            image1.width = image.width - 2;
            image1.height = image.height - 2;
            this.head.addChild(image1);
            this.head.addChild(image);
            //
            var nameT: TextField = new TextField()
            nameT.size = 24;
            nameT.textColor = 0xffff00;
            nameT.textAlign = "center";
            nameT.text = this.playerInfo.name;
            nameT.y = image1.height / 2 + 6;
            this.head.addChild(nameT);
            //
            var moneyT: TextField = new TextField();
            moneyT.size = 24;
            moneyT.textColor = 0xffff00;
            moneyT.textAlign = "center"
            moneyT.text = this.playerInfo.money + "";
            moneyT.y = -image1.height / 2 - 26;
            this.head.addChild(moneyT);
            //
            this.head.scaleX = this.head.scaleY = 0.6;
            //
            this.head.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHead, this);
            this.addChildAt(this.head, 0);
        }

        public static SHOW_HEAD_TIP: string = "SHOW_HEAD_TIP";
        public showDiscardAnim(card:MjCard, x:number, y:number):void {
            var startPos:Point = new Point(x, y);
            startPos = this.showCardsMc.localToGlobal(startPos.x,startPos.y);
            startPos = Anim.instance.globalToLocal(startPos.x,startPos.y);
            var endPos:Point = this.discardCardsMc.getNextPos();
            endPos = this.discardCardsMc.localToGlobal(endPos.x,endPos.y);
            endPos = Anim.instance.globalToLocal(endPos.x,endPos.y);
            Anim.instance.showDiscardAnim(this, card, startPos, endPos);
            SoundManager.playMj(this.playerInfo.sex, card);
        }

        public ting(tingInfo:MjTingInfo):void {
            this.core.tingInfo = tingInfo;
            Anim.instance.showTing(this);
        }
        private onClickHead(event): void {
            this.dispatchEvent(new egret.Event(IPlayer.SHOW_HEAD_TIP));
        }

        public hu(info: HuInfo): void {
            this.dispatchEvent(new egret.Event(MjEvent.HU, false, false, info));
        }

        public decideOnOtherDiscard(card: MjCard, isPrevDiscard: Boolean, callBack: Function): void {
        }

        public chi(mjChiInfo: MjChiInfo): void {
            this.core.onChi(mjChiInfo);
            this.dispatchEvent(new Event(MjEvent.CHI))
        }

        public peng(card: MjCard): void {
            this.core.onPeng(card);
            this.dispatchEvent(new Event(MjEvent.PENG))
        }

        public mingGang(card: MjCard): void {
            this.core.onMingGang(card);
            this.dispatchEvent(new Event(MjEvent.MINGGANG));
        }

        public anGang(card: MjCard): void {
            this.core.onAnGang(card);
            this.dispatchEvent(new Event(MjEvent.ANGANG));
        }

        public wantBuGang(card: MjCard): void {
            this.dispatchEvent(new Event(MjEvent.WANT_BUGANG, false, false, card));
        }

        public buGang(card: MjCard): void {
            this.core.onBuGang(card);
            this.dispatchEvent(new Event(MjEvent.BUGANG));
        }

        public decideOnOtherBuGang(mjCard: MjCard, passFunc: Function): void {
        }

        public fetch(reverse: boolean): void {
            this.lastFetchIsRevers = reverse;
            var fetchInfo: MjFetchInfo = MjRound.instance.fetch(reverse);
            this.core.onFetchedCard(fetchInfo.card);
            this.showCardsMc.putFetchCardFunc(fetchInfo.card);
        }

        public showAnim(): void {/*
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
            juggler.add(mc);*/
        }

        public decideAfterOpt(): void {
        }

        showCards(sort: boolean = false) {

            if (sort) {
                this.core.sort();
            }
            this.showCardsMc.updateFunc(this.core)
        }
    }
}
