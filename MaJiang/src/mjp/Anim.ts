/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/7
 * Time: 16:55
 */
module mjp {
    //import assets.Asset;
    //import assets.AssetSound;

    //import engine.vo.MjCard;

    //import flash.geom.Point;

    //import starling.animation.Transitions;
    //import starling.animation.Tween;
    //import starling.display.Image;
    //import starling.display.Sprite;
    //import starling.events.EnterFrameEvent;
    //import starling.textures.Texture;

    //import utils.util.BezierUtil;

    export class Anim extends Sprite {
        private players:Vector.<IPlayer>;
        private positions:Vector.<Point> = new Vector.<Point>();
        private positions1:Vector.<Point> = new Vector.<Point>();
        private positions2:Vector.<Point> = new Vector.<Point>();
        private discardPointer:DiscardPointer;
        public static var instance:Anim;
        private cur:number;
        private nn;
        private nnMc:CardSprite;
        private nnPlayer:IPlayer;

        public init(players:Vector.<IPlayer>) {
            this.players = players;
            positions.push(new Point(UserConst.size.x / 2, UserConst.size.y - 100));
            positions.push(new Point(UserConst.size.x - 100, UserConst.size.y / 2));
            positions.push(new Point(UserConst.size.x / 2, 100));
            positions.push(new Point(100, UserConst.size.y / 2));
            //
            positions1.push(new Point());
            positions1.push(new Point(-16, 10));
            positions1.push(new Point(20, 26));
            positions1.push(new Point(16, 16));
            //
            positions2.push(new Point(0, -100));
            positions2.push(new Point(-50, 0));
            positions2.push(new Point(0, 50));
            positions2.push(new Point(50, 0));
            //
            discardPointer = new DiscardPointer();
            instance = this;
        }

        public showAnGang(player:IPlayer) {
            showMingGang(player);
        }

        private showCommonAnim(sp:Sprite) {
            sp.scaleX = sp.scaleY = 2;
            addChild(sp);
            var tween:Tween = new Tween(sp, .2, Transitions.EASE_IN);
            tween.animate("scaleX", 1);
            tween.animate("scaleY", 1);
            tween.onComplete = showCommonAnimBg;
            tween.onCompleteArgs = [sp];
            juggler.add(tween);
        }

        private showCommonAnimBg(sp:Sprite) {
            AssetSound.play("tileout");
            //
            var bg:Image = new Image(Asset.assetManager.getTexture("action_bj"));
            bg.pivotX = bg.width / 2;
            bg.pivotY = bg.height / 2;
            bg.x = sp.x;
            bg.y = sp.y;
            bg.scaleX = 0.1;
            bg.scaleY = 0.1;
            sp.parent.addChildAt(bg, sp.parent.getChildIndex(sp));
            var tween:Tween = new Tween(bg, .1, Transitions.EASE_IN);
            tween.animate("scaleX", 1);
            tween.animate("scaleY", 1);
            tween.onComplete = juggler.delayCall;
            tween.onCompleteArgs = [removeCommonAnim, .3, sp, bg];
            juggler.add(tween);
        }

        private removeCommonAnim(sp:Sprite, img:Image) {
            ObjUtil.removeMe(sp);
            ObjUtil.removeMe(img);
        }

        public showMingGang(curPlayer:IPlayer) {
            AssetSound.playOpt(curPlayer.playerInfo.sex, "gang");
            var sp:Sprite = getSprite("action_gang", curPlayer);
            showCommonAnim(sp);
        }

        public showChi(curPlayer:IPlayer) {
            AssetSound.playOpt(curPlayer.playerInfo.sex, "chi");
            var sp:Sprite = getSprite("action_chi", curPlayer);
            showCommonAnim(sp);
        }

        public showPeng(curPlayer:IPlayer) {
            AssetSound.playOpt(curPlayer.playerInfo.sex, "peng");
            var sp:Sprite = getSprite("action_peng", curPlayer);
            showCommonAnim(sp);
        }

        public showTing(curPlayer:IPlayer) {
            AssetSound.playOpt(curPlayer.playerInfo.sex, "ting");
            var sp:Sprite = getSprite("action_ting", curPlayer);
            showCommonAnim(sp);
        }

        public showHu(curPlayer:IPlayer) {
            AssetSound.playOpt(curPlayer.playerInfo.sex, "hu");
            var sp:Sprite = getSprite("action_hu", curPlayer);
            addChild(sp);
            sp.scaleX = sp.scaleY = .3;
            var tween:Tween = new Tween(sp, .8);
            tween.animate("scaleX", 2);
            tween.animate("scaleY", 2);
            tween.onComplete = removeChild;
            tween.onCompleteArgs = [sp];
            juggler.add(tween);
        }

        public showZimo(curPlayer:IPlayer) {
            AssetSound.playOpt(curPlayer.playerInfo.sex, "zimo");
            var sp:Sprite = getSprite("action_zimo", curPlayer);
            sp.scaleX = sp.scaleY = .3;
            addChild(sp);
            var tween:Tween = new Tween(sp, .8);
            tween.animate("scaleX", 2);
            tween.animate("scaleY", 2);
            tween.onComplete = removeChild;
            tween.onCompleteArgs = [sp];
            juggler.add(tween);
        }

        private getHuTxt():Sprite {
            var huTxt:Sprite = new Sprite();
            huTxt.scaleX = huTxt.scaleY = .2;
            //
            var bg:Image = new Image(Asset.assetManager.getTexture("action_bj"));
            bg.pivotX = bg.width / 2;
            bg.pivotY = bg.height / 2;
            huTxt.addChild(bg);
            var sp:Sprite = getSprite("action_hu", null);
            huTxt.addChild(sp);
            //
            var tween:Tween = new Tween(huTxt, 1, Transitions.EASE_OUT_BOUNCE);
            tween.animate("scaleX", 1);
            tween.animate("scaleY", 1);
            juggler.add(tween);
            //
            return huTxt;
        }

        private getSprite(s:string, curPlayer:IPlayer):Sprite {
            var t:Texture = Asset.assetManager.getTexture(s);
            var sp:Sprite = new Sprite();
            var image:Image = new Image(t);
            sp.addChild(image);
            sp.pivotX = sp.width / 2;
            sp.pivotY = sp.height / 2;
            //
            if (curPlayer != null) {
                var p:Point = getPosition(curPlayer);
                sp.x = p.x;
                sp.y = p.y;
            }
            return sp;
        }

        private getPosition(curPlayer:IPlayer):Point {
            return positions[players.indexOf(curPlayer)];
        }

        public showDiscardAnim(iPlayer:IPlayer, card:MjCard, startPos:Point, endPos:Point) {
            var pp:Point = positions1[players.indexOf(iPlayer)];
            var mc:CardSprite = Asset.getDiscardCard(card);
            mc.x = startPos.x;
            mc.y = startPos.y;
            //修正一下位置
            mc.x += pp.x;
            mc.y += pp.y;
            addChild(mc);
            //
            var pp1:Point = positions2[players.indexOf(iPlayer)];
            cur = 0;
            var ar = [new Point(mc.x, mc.y), new Point(mc.x + pp1.x, mc.y + pp1.y), endPos];
            nn = BezierUtil.computeBezier(ar, 4 * StorageData.getSpeedPercent());
            nnMc = mc;
            nnPlayer = iPlayer;
            addEventListener(EnterFrameEvent.ENTER_FRAME, updateDiscardAnim);
        }

        private updateDiscardAnim(event:EnterFrameEvent) {
            if (cur >= nn.length) {
                nnPlayer.discardCardsMc.append(nnMc.card);
                nnMc.parent.removeChild(nnMc);
                removeEventListener(EnterFrameEvent.ENTER_FRAME, updateDiscardAnim);
                nnPlayer = null;
                return;
            }
            var p:Point = nn[cur];
            nnMc.x = p.x;
            nnMc.y = p.y;
            cur++;
        }

        public showStartTitleAnim() {
            var img:Image = new Image(Asset.assetManager.getTexture("startgame"));
            img.pivotX = img.width / 2;
            img.pivotY = img.height / 2;
            img.x = UserConst.size.x / 2;
            img.y = UserConst.size.y / 2;
            addChild(img);
            var tween:Tween = new Tween(img, .5, Transitions.EASE_IN);
            tween.animate("scaleX", 2);
            tween.animate("scaleY", 2);
            tween.animate("alpha", 0);
            tween.onComplete = removeChild;
            tween.onCompleteArgs = [img];
            juggler.add(tween);
        }

        public showDiscardPointer(p:Point) {
            discardPointer.x = p.x;
            discardPointer.y = p.y + 16;
            addChild(discardPointer);
        }

        public removeDiscardPointer() {
            if (discardPointer.parent != null) {
                discardPointer.parent.removeChild(discardPointer);
            }
        }
    }
}
