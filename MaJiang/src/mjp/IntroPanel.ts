module mjp {
    //import assets.Asset;

    //import engine.MjFan;
    //import engine.vo.IOpt;
    //import engine.vo.MjCard;
    //import engine.vo.MjPlayer;
    //import engine.vo.OptAnGang;
    //import engine.vo.OptChi;
    //import engine.vo.OptMingGang;
    //import engine.vo.OptPeng;

    //import feathers.controls.ScrollContainer;
    //import feathers.display.Scale9Image;
    //import feathers.textures.Scale9Textures;

    //import flash.geom.Rectangle;
    //import flash.utils.Dictionary;

    //import starling.display.Quad;
    //import starling.display.Sprite;
    //import starling.events.Event;
    //import starling.events.TouchEvent;
    //import starling.events.TouchPhase;
    //import starling.text.TextField;
    //import starling.text.TextFieldAutoSize;
    //import starling.textures.TextureSmoothing;
    //import starling.utils.HAlign;

    /**
     * @author fq3
     */
    export class IntroPanel extends Sprite {
        private backSprite:Sprite;

        constructor() {
            backSprite = new Sprite();
            addChild(backSprite);
            var tt:Scale9Textures = new Scale9Textures(Asset.assetManager.getTexture("面板2"), new Rectangle(15, 15, 15, 15));
            var back:Scale9Image = new Scale9Image(tt, 1);
            back.width = UserConst.size.x * .7;
            back.height = UserConst.size.y * .8;
            back.smoothing = TextureSmoothing.NONE;
            backSprite.addChild(back);
            backSprite.x = (UserConst.size.x - back.width) / 2;
            backSprite.y = (UserConst.size.y - back.height) / 2;
            //
            var fanTxt:TextField = new TextField(1, 38, "番型说明", "Verdana", 32, 0xffffff, true);
            fanTxt.autoSize = TextFieldAutoSize.HORIZONTAL;
            fanTxt.y = 20;
            fanTxt.x = (backSprite.width - fanTxt.width) / 2;
            backSprite.addChild(fanTxt);
            //
            var mc:Sprite = getTabMc(back.width - 40, back.height - 80);
            mc.x = 20;
            mc.y = 70;
            backSprite.addChild(mc);
            showFF(bars[0]);
            //
            addEventListener(Event.REMOVED_FROM_STAGE, onRemove);
        }

        private onRemove(event:Event) {
            removeEventListener(Event.REMOVED_FROM_STAGE, onRemove);
            for (var i:number = 0; i < bars.length; i++) {
                var sprite:Sprite = bars[i];
                sprite.removeEventListeners();
            }
        }

        private getIntroMc(o:Object, w:number):Sprite {
            var mc:Sprite = new Sprite();
            var ft:TextField = new TextField(mc.width, 32, o.name + (o.fan <= 8 ? ("(" + o.fan + "番)") : "") + ":");
            ft.autoSize = TextFieldAutoSize.HORIZONTAL;
            ft.fontSize = 24;
            ft.color = 0xffff00;
            mc.addChild(ft);
            var ft1:TextField = new TextField(mc.width, 30, o.tip + "。");
            ft1.autoSize = TextFieldAutoSize.VERTICAL;
            ft1.hAlign = HAlign.LEFT;
            ft1.width = w - ft.width;
            ft1.fontSize = 24;
            ft1.color = 0xffffff;
            ft1.x = ft.width;
            mc.addChild(ft1);
            if (o.shape != null && o.shape != "") {
                var mm:Sprite = getShapeMc(o.shape);
                mm.y = ft1.height + 8;
                mc.addChild(mm);
            }
            return mc;
        }

        private bars = [];

        public getTabMc(w:number, h:number):Sprite {
            var mcc:Sprite = new Sprite();
            var q:Quad = new Quad(w, h, 0);
            q.alpha = 0;
            mcc.addChild(q);
            var www:number = (w) / 8;
            bars = [
                createBar({label: "88番"}, www),
                createBar({label: "64番"}, www),
                createBar({label: "48番"}, www),
                createBar({label: "32番"}, www),
                createBar({label: "24番"}, www),
                createBar({label: "16番"}, www),
                createBar({label: "12番"}, www),
                createBar({label: "1-8番", name: "1番"}, www)
            ];
            for (var i:number = 0; i < bars.length; i++) {
                var sp:Sprite = bars[i];
                sp.x = i * www;
                mcc.addChild(sp)
            }
            //
            return mcc;
        }

        private createBar(o:Object, w:number):Sprite {
            var cc:Sprite = new Sprite();
            var q:Quad = new Quad(w, HH, 0x401000);
            cc.addChild(q);
            var ft:TextField = new TextField(10, 32, o.label);
            ft.autoSize = TextFieldAutoSize.HORIZONTAL;
            ft.fontSize = 26;
            ft.color = 0xffffff;
            ft.x = (w - ft.width) / 2;
            ft.y = (HH - ft.height) / 2;
            cc.addChild(ft);
            //
            cc.addEventListener(TouchEvent.TOUCH, onTabChange);
            if (o.name != null) {
                cc.name = o.name;
            } else {
                cc.name = o.label;
            }
            return cc;
        }

        private dic:Dictionary = new Dictionary();

        private onTabChange(event:TouchEvent) {
            var mc:Sprite = Sprite(event.currentTarget);
            if (event.getTouch(mc, TouchPhase.ENDED)) {
                showFF(mc)
            }
        }

        private showFF(mc:Sprite) {
            for (var i:number = 0; i < bars.length; i++) {
                var o:Sprite = bars[i];
                var q:Quad = Quad(o.getChildAt(0));
                if (o == mc) {
                    q.color = 0x664c00;
                } else {
                    q.color = 0x401000;
                }
            }
            var mcc:Sprite = Sprite(mc.parent);
            var label:string = mc.name;
            var fan:number = parseInt(label.substr(0, label.length - 1));
            showFan(fan, mcc)
        }

        private HH:number = 40;

        private showFan(fan:number, mcc:Sprite) {
            if (dic[fan] == null) {
                var cardmc:ScrollContainer = new ScrollContainer();
                cardmc.interactionMode = ScrollContainer.INTERACTION_MODE_TOUCH_AND_SCROLL_BARS;
                cardmc.width = mcc.width - 30;
                cardmc.height = mcc.height - HH - 5;
                cardmc.verticalScrollPolicy = ScrollContainer.SCROLL_POLICY_ON;
                cardmc.horizontalScrollPolicy = ScrollContainer.SCROLL_POLICY_OFF;
                dic[fan] = cardmc;
                var yy:number = 0;
                var map:Dictionary = MjFan.fanmap;
                var ss = [];
                for (var m:string in map) {
                    ss.push({name: m, fan: int(map[m].fan)});
                }
                ss.sortOn("fan", Array.DESCENDING | Array.NUMERIC);
                for (var i:number = 0; i < ss.length; i++) {
                    var o:Object = map[ss[i].name];
                    if (int(o.fan) == fan || (fan == 1 && int(o.fan) <= 8)) {
                        o.name = ss[i].name;
                        var introMc:Sprite = getIntroMc(o, mcc.width - 30);
                        introMc.y = yy;
                        cardmc.addChild(introMc);
                        yy += introMc.height + 5;
                    }
                }
            }
            for each(var sss:Sprite in dic) {
                if (sss.parent != null) {
                    sss.removeFromParent(false);
                }
            }
            var cc:Sprite = dic[fan];
            cc.y = HH + 5;
            mcc.addChild(cc);
        }

        public getShapeMc(shape:string):Sprite {
            var p:MjPlayer = MjPlayer.input(shape);
            var cardMc:Sprite = new Sprite();
            var mcc:MjComponent;
            var xx:number = 0;
            for (var j:number = 0; j < p.opts.length; j++) {
                var opt:IOpt = p.opts[j];
                if (opt is OptAnGang) {
                    mcc = ComponentFactory.createAnGangForHero((opt as OptAnGang).card);
                }
                if (opt is OptMingGang) {
                    mcc = ComponentFactory.createMingGangForHero((opt as OptMingGang).card);
                }
                if (opt is OptPeng) {
                    mcc = ComponentFactory.createPengForHero((opt as OptPeng).card);
                }
                if (opt is OptChi) {
                    mcc = ComponentFactory.createChiForHero((opt as OptChi).chiInfo.cards);
                }
                if (mcc != null) {
                    mcc.scaleX = mcc.scaleY = .6;
                    mcc.x = xx;
                    cardMc.addChild(mcc);
                    xx += mcc.width + 10;
                }
                mcc = null;
            }
            var mjCards:MjCard[] = p.cloneShowCards();
            for (var i:number = 0; i < mjCards.length; i++) {
                var mc:CardSprite = Asset.getFreezeCardMcDown(mjCards[i]);
                mc.scaleX = mc.scaleY = .6;
                mc.x = xx;
                cardMc.addChild(mc);
                xx += mc.width;
            }
            //
            return (cardMc);
        }
    }
}
