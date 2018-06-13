namespace game {
    import Sprite = egret.Sprite;
    import Bitmap = egret.Bitmap;
    import BitmapText = egret.BitmapText;

    export class Opt extends Sprite {

        private huFunc: Function;
        private passFunc: Function;
        private selectTingInfoFunc: Function;
        private wantChiFunc: Function;
        private pengFunc: Function;
        private mingGangFunc: Function;
        private anGangFunc: Function;
        private wantBuGangFunc: Function;

        constructor() {
            super();
        }


        /**
         * 别人打牌后,需要处理
         * @param status
         * @param huFunc    (huInfo)
         * @param passFunc  ()
         * @param selectTingInfoFunc  (tingInfo)
         * @param wantChiFunc   (chiInfo)
         * @param pengFunc  (mjcard)
         * @param mingGangFunc  (mjcard)
         * @param anGangFunc    (mjcard)
         * @param wantBuGangFunc (mjcard)
         * @param player
         */
        public update(player: IPlayer, status: MjPlayerThinkStatus, huFunc: Function = null, passFunc: Function = null, selectTingInfoFunc: Function = null, wantChiFunc: Function = null, pengFunc: Function = null, mingGangFunc: Function = null, anGangFunc: Function = null, wantBuGangFunc: Function = null): void {
            this.huFunc = huFunc;
            this.passFunc = passFunc;
            this.selectTingInfoFunc = selectTingInfoFunc;
            this.wantChiFunc = wantChiFunc;
            this.pengFunc = pengFunc;
            this.mingGangFunc = mingGangFunc;
            this.anGangFunc = anGangFunc;
            this.wantBuGangFunc = wantBuGangFunc;
            this.clear();
            var i: number = 0;
            var btns: Array<Sprite> = new Array<Sprite>();
            //
            if (status.chiInfos.length > 0) {
                for (i = 0; i < status.chiInfos.length; i++) {
                    btns.push(Opt.createChiBtn(status.chiInfos[i]))
                }
            }
            if (status.pengCards.length > 0) {
                for (i = 0; i < status.pengCards.length; i++) {
                    btns.push(Opt.createPengBtn(status.pengCards[i]))
                }
            }
            if (status.mingGangCards.length > 0) {
                for (i = 0; i < status.mingGangCards.length; i++) {
                    btns.push(Opt.createMingGangBtn(status.mingGangCards[i]))
                }
            }
            if (status.anGangCards.length > 0) {
                for (i = 0; i < status.anGangCards.length; i++) {
                    btns.push(Opt.createAnGangBtn(status.anGangCards[i]))
                }
            }
            if (status.buGangCards.length > 0) {
                for (i = 0; i < status.buGangCards.length; i++) {
                    btns.push(Opt.createBuGangBtn(status.buGangCards[i]))
                }
            }
            if (status.isTing) {
                btns.push(Opt.createTingBtn())
            }
            if (status.huInfo != null) {
                btns.push(Opt.createHuBtn(status.huInfo, player))
            }
            btns.push(Opt.createPassBtn());
            //
            btns.reverse();
            //
            var xx: number = 0;
            for (var j: number = 0; j < btns.length; j++) {
                var sp = btns[j];
                var btn: CButton = new CButton(sp);
                btn.touchChildren=false;
                btn.touchEnabled=true;
                btn.anchorOffsetX = btn.width;
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpt, this);
                btn.x = -j % 3 * (btn.width + 10) - 10;
                btn.y = -Math.floor(j / 3) * (btn.height + 5) - 20;
                this.addChild(btn);
            }
        }

        public clear(): void {
            while (this.numChildren > 0) {
                var btn: CButton = <CButton>(this.getChildAt(0));
                this.removeChildAt(0);
            }
        }

        private onOpt(event: egret.Event): void {
            var btn: CButton = <CButton>(event.currentTarget);
            var sp: OptSprite = <OptSprite>(btn.mUpState);
            this.clear();
            if (sp.isTing) {
                this.selectTingInfoFunc();
                return;
            }
            if (sp.huInfo != null) {
                this.huFunc(sp.huInfo);
                return;
            }
            if (sp.chiInfo != null) {
                this.wantChiFunc(sp.chiInfo);
                return;
            }
            if (sp.pengCard != null) {
                this.pengFunc(sp.pengCard);
                return;
            }
            if (sp.mingGangCard != null) {
                this.mingGangFunc(sp.mingGangCard);
                return;
            }
            if (sp.anGangCard != null) {
                this.anGangFunc(sp.anGangCard);
                return;
            }
            if (sp.buGangCard != null) {
                this.wantBuGangFunc(sp.buGangCard);
                return;
            }
            if (sp.pass) {
                if (this.passFunc != null) {
                    this.passFunc();
                }
            }
        }

        private static createTingBtn(): Sprite {
            var sprite: OptSprite = new OptSprite();
            sprite.isTing = true;
            sprite.addChild(new Bitmap(Global.getRes("ting_btn")));
            return sprite
        }

        private static createPassBtn(): Sprite {
            var sprite: OptSprite = new OptSprite();
            sprite.pass = true;
            sprite.addChild(new Bitmap(Global.getRes("pass_btn_n")));
            return sprite
        }

        private static createHuBtn(maxHuInfo: HuInfo, player: IPlayer): Sprite {
            var sprite: OptSprite = new OptSprite();
            sprite.huInfo = maxHuInfo;
            sprite.addChild(new Bitmap(Global.getRes("hu1")));
            //
            var fanT: BitmapText = new BitmapText();
            fanT.font = RES.getRes('fanshu_fnt');
            var fan: number = MjEngine.getFan(player.core, maxHuInfo);
            fanT.text = fan + "番";
            fanT.x = 172 - fanT.width / 2;
            fanT.y = 52 - fanT.height / 2;
            sprite.addChild(fanT);
            //
            return sprite
        }

        private static createOptBtn(opt: string): OptSprite {
            var retMc: OptSprite = new OptSprite();
            //
            var bgImage: Bitmap = new Bitmap(Global.getRes("operate_btn_n"));
            retMc.addChild(bgImage);
            //
            var image: Bitmap = new Bitmap(Global.getRes(opt));
            image.width = 60;
            image.height = 60;
            image.x = 20;
            image.y = (bgImage.height - image.height) / 2;
            retMc.addChild(image);
            //
            return retMc;
        }

        private static XX: number = 100;
        private static YY: number = 28;
        private static SCALE_COM: number = .7;

        private static createMingGangBtn(mjCard: MjCard): OptSprite {
            var retMc: OptSprite = Opt.createOptBtn("action_gang");
            retMc.mingGangCard = mjCard;
            //
            var mc: MjComponent = ComponentFactory.createMingGangForHero(mjCard);
            mc.scaleX = mc.scaleY = Opt.SCALE_COM;
            mc.x = Opt.XX;
            mc.y = Opt.YY;
            retMc.addChild(mc);
            //
            return retMc;
        }

        private static createBuGangBtn(mjCard: MjCard): Sprite {
            var sp: OptSprite = Opt.createMingGangBtn(mjCard);
            sp.mingGangCard = null;
            sp.buGangCard = mjCard;
            return sp;
        }

        private static createAnGangBtn(mjCard: MjCard): Sprite {
            var sp: OptSprite = Opt.createOptBtn("action_gang");
            sp.anGangCard = mjCard;
            //
            var mc: MjComponent = ComponentFactory.createAnGangForHero(mjCard);
            mc.scaleX = mc.scaleY = Opt.SCALE_COM;
            mc.x = Opt.XX;
            mc.y = Opt.YY;
            sp.addChild(mc);
            //
            return sp;
        }

        private static createPengBtn(mjCard: MjCard): Sprite {
            var sp: OptSprite = Opt.createOptBtn("action_peng");
            sp.pengCard = mjCard;
            //
            var mc: MjComponent = ComponentFactory.createPengForHero(mjCard);
            mc.scaleX = mc.scaleY = Opt.SCALE_COM;
            mc.x = Opt.XX;
            mc.y = Opt.YY;
            sp.addChild(mc);
            //
            return sp;
        }

        private static createChiBtn(mjChiInfo: MjChiInfo): Sprite {
            var sp: OptSprite = Opt.createOptBtn("action_chi");
            sp.chiInfo = mjChiInfo;
            //
            var mc: MjComponent = ComponentFactory.createChiForHero(mjChiInfo.cards, mjChiInfo.target);
            mc.scaleX = mc.scaleY = Opt.SCALE_COM;
            mc.x = Opt.XX;
            mc.y = Opt.YY;
            sp.addChild(mc);
            //
            return sp;
        }
    }
}
