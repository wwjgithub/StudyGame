/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/28
 * Time: 11:11
 */
module mjp {
    //import assets.Asset;

    //import engine.MjEngine;
    //import engine.vo.HuInfo;
    //import engine.vo.MjCard;
    //import engine.vo.MjChiInfo;
    //import engine.vo.MjPlayerThinkStatus;

    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.text.TextField;
    //import starling.text.TextFieldAutoSize;
    //import starling.textures.Texture;

    //import swallow.filters.AdvancedFilter;

    //import utils.CButton;

    export class Opt extends Sprite {
        private huFunc;
        private passFunc;
        private selectTingInfoFunc;
        private wantChiFunc;
        private pengFunc;
        private mingGangFunc;
        private anGangFunc;
        private wantBuGangFunc;

        constructor() {
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
        public update(player:IPlayer, status:MjPlayerThinkStatus, huFunc = null, passFunc = null, selectTingInfoFunc = null, wantChiFunc = null, pengFunc = null, mingGangFunc = null, anGangFunc = null, wantBuGangFunc = null) {
            var cc:IPlayer = player.next;
            if (player.head != null) {
                var filter:AdvancedFilter = new AdvancedFilter();
                filter.addA = 1;
                filter.addR = 255;
                filter.addG = 0;
                filter.addB = 0;
                player.head.filter = filter
            }
            while (cc != player) {
                if (cc.head != null) {
                    cc.head.filter = null;
                }
                cc = cc.next;
            }
            this.huFunc = huFunc;
            this.passFunc = passFunc;
            this.selectTingInfoFunc = selectTingInfoFunc;
            this.wantChiFunc = wantChiFunc;
            this.pengFunc = pengFunc;
            this.mingGangFunc = mingGangFunc;
            this.anGangFunc = anGangFunc;
            this.wantBuGangFunc = wantBuGangFunc;
            clear();
            var i:number;
            var btns:Vector.<OptSprite> = new Vector.<OptSprite>();
            //
            if (status.chiInfos.length > 0) {
                for (i = 0; i < status.chiInfos.length; i++) {
                    btns.push(createChiBtn(status.chiInfos[i]))
                }
            }
            if (status.pengCards.length > 0) {
                for (i = 0; i < status.pengCards.length; i++) {
                    btns.push(createPengBtn(status.pengCards[i]))
                }
            }
            if (status.mingGangCards.length > 0) {
                for (i = 0; i < status.mingGangCards.length; i++) {
                    btns.push(createMingGangBtn(status.mingGangCards[i]))
                }
            }
            if (status.anGangCards.length > 0) {
                for (i = 0; i < status.anGangCards.length; i++) {
                    btns.push(createAnGangBtn(status.anGangCards[i]))
                }
            }
            if (status.buGangCards.length > 0) {
                for (i = 0; i < status.buGangCards.length; i++) {
                    btns.push(createBuGangBtn(status.buGangCards[i]))
                }
            }
            if (status.isTing) {
                btns.push(createTingBtn())
            }
            if (status.huInfo != null) {
                btns.push(createHuBtn(status.huInfo, player))
            }
            btns.push(createPassBtn());
            //
            btns.reverse();
            //
            var xx:number = 0;
            for (var j:number = 0; j < btns.length; j++) {
                var sp:OptSprite = btns[j];
                var btn:CButton = new CButton(sp);
                btn.pivotX = btn.width;
                btn.addEventListener(Event.TRIGGERED, onOpt);
                btn.scaleWhenDown = 1.1;
                btn.x = -j % 3 * (btn.width + 10) - 10;
                btn.y = -int(j / 3) * (btn.height + 5) - 20;
                addChild(btn);
            }
        }

        private clear() {
            while (this.numChildren > 0) {
                var btn:CButton = CButton(this.getChildAt(0));
                btn.dispose();
                this.removeChildAt(0);
            }
        }

        private onOpt(event:Event) {
            var btn:CButton = CButton(event.currentTarget);
            var sp:OptSprite = OptSprite(btn.mUpState);
            clear();
            if (sp.isTing) {
                selectTingInfoFunc();
                return;
            }
            if (sp.huInfo != null) {
                huFunc(sp.huInfo);
                return;
            }
            if (sp.chiInfo != null) {
                wantChiFunc(sp.chiInfo);
                return;
            }
            if (sp.pengCard != null) {
                pengFunc(sp.pengCard);
                return;
            }
            if (sp.mingGangCard != null) {
                mingGangFunc(sp.mingGangCard);
                return;
            }
            if (sp.anGangCard != null) {
                anGangFunc(sp.anGangCard);
                return;
            }
            if (sp.buGangCard != null) {
                wantBuGangFunc(sp.buGangCard);
                return;
            }
            if (sp.pass) {
                if (passFunc != null) {
                    passFunc();
                }
            }
        }

        private static function createTingBtn():Sprite {
            var sprite:OptSprite = new OptSprite();
            sprite.isTing = true;
            sprite.addChild(new Image(Asset.assetManager.getTexture("ting_btn")));
            return sprite
        }

        private static function createPassBtn():Sprite {
            var sprite:OptSprite = new OptSprite();
            sprite.pass = true;
            sprite.addChild(new Image(Asset.assetManager.getTexture("pass_btn_n")));
            return sprite
        }

        private static function createHuBtn(maxHuInfo:HuInfo, player:IPlayer):Sprite {
            var sprite:OptSprite = new OptSprite();
            sprite.huInfo = maxHuInfo;
            sprite.addChild(new Image(Asset.assetManager.getTexture("hu1")));
            //
            var fanT:TextField = new TextField(100, 136, "111", "fanshu", 36, 0xffffff, false);
            fanT.autoSize = TextFieldAutoSize.HORIZONTAL;
            var fan:number = MjEngine.getFan(player.core, maxHuInfo);
            fanT.text = fan + "番";
            fanT.x = 172 - fanT.width / 2;
            fanT.y = 52 - fanT.height / 2;
            sprite.addChild(fanT);
            //
            return sprite
        }

        private static function createOptBtn(opt:string):OptSprite {
            var retMc:OptSprite = new OptSprite();
            //
            var texture:Texture = Asset.assetManager.getTexture("operate_btn_n");
            var bgImage:Image = new Image(texture);
            retMc.addChild(bgImage);
            //
            var chiT:Texture = Asset.assetManager.getTexture(opt);
            var image:Image = new Image(chiT);
            image.width=60;
            image.height=60;
            image.x = 20;
            image.y = (bgImage.height - image.height) / 2;
            retMc.addChild(image);
            //
            return retMc;
        }

        private static var XX:number = 100;
        private static var YY:number = 28;
        private static SCALE_COM:number = .7;

        private static function createMingGangBtn(mjCard:MjCard):OptSprite {
            var retMc:OptSprite = createOptBtn("action_gang");
            retMc.mingGangCard = mjCard;
            //
            var mc:MjComponent = ComponentFactory.createMingGangForHero(mjCard);
            mc.scaleX = mc.scaleY = Opt.SCALE_COM;
            mc.x = XX;
            mc.y = YY;
            retMc.addChild(mc);
            //
            return retMc;
        }

        private static function createBuGangBtn(mjCard:MjCard):Sprite {
            var sp:OptSprite = createMingGangBtn(mjCard);
            sp.mingGangCard = null;
            sp.buGangCard = mjCard;
            return sp;
        }

        private static function createAnGangBtn(mjCard:MjCard):Sprite {
            var sp:OptSprite = createOptBtn("action_gang");
            sp.anGangCard = mjCard;
            //
            var mc:MjComponent = ComponentFactory.createAnGangForHero(mjCard);
            mc.scaleX = mc.scaleY = Opt.SCALE_COM;
            mc.x = XX;
            mc.y = YY;
            sp.addChild(mc);
            //
            return sp;
        }

        private static function createPengBtn(mjCard:MjCard):Sprite {
            var sp:OptSprite = createOptBtn("action_peng");
            sp.pengCard = mjCard;
            //
            var mc:MjComponent = ComponentFactory.createPengForHero(mjCard);
            mc.scaleX = mc.scaleY = Opt.SCALE_COM;
            mc.x = XX;
            mc.y = YY;
            sp.addChild(mc);
            //
            return sp;
        }

        private static function createChiBtn(mjChiInfo:MjChiInfo):Sprite {
            var sp:OptSprite = createOptBtn("action_chi");
            sp.chiInfo = mjChiInfo;
            //
            var mc:MjComponent = ComponentFactory.createChiForHero(mjChiInfo.cards, mjChiInfo.target);
            mc.scaleX = mc.scaleY = Opt.SCALE_COM;
            mc.x = XX;
            mc.y = YY;
            sp.addChild(mc);
            //
            return sp;
        }
    }
}

//import engine.vo.HuInfo;
//import engine.vo.MjCard;
//import engine.vo.MjChiInfo;

//import starling.display.Sprite;

class OptSprite extends Sprite {
    public chiInfo:MjChiInfo;
    public pengCard:MjCard;
    public mingGangCard:MjCard;
    public anGangCard:MjCard;
    public huInfo:HuInfo;
    public pass:boolean;
    public isTing:boolean;
    public buGangCard:MjCard;
}
