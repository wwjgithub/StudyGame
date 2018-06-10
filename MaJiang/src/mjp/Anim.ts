namespace game {
    import Sprite = egret.Sprite;
    import Point = egret.Point;
    import Ease = egret.Ease;
    import Bitmap = egret.Bitmap;
    import Texture = egret.Texture;

    export class Anim extends Sprite {

        private players: IPlayer[];
        private positions: Array<Point> = new Array<Point>();
        private positions1: Array<Point> = new Array<Point>();
        private positions2: Array<Point> = new Array<Point>();
        private discardPointer: DiscardPointer;
        public static instance: Anim;
        private cur: number=0;
        private nn: Array<any>;
        private nnMc: CardSprite;
        private nnPlayer: IPlayer;

        constructor() {
            super();
        }


        public init(players: Array<IPlayer>): void {
            this.players = players;
            this.positions.push(new Point(Global.stage_w / 2, Global.stage_h - 100));
            this.positions.push(new Point(Global.stage_w - 100, Global.stage_h / 2));
            this.positions.push(new Point(Global.stage_w / 2, 100));
            this.positions.push(new Point(100, Global.stage_h / 2));
            //
            this.positions1.push(new Point());
            this.positions1.push(new Point(-16, 10));
            this.positions1.push(new Point(20, 26));
            this.positions1.push(new Point(16, 16));
            //
            this.positions2.push(new Point(0, -100));
            this.positions2.push(new Point(-50, 0));
            this.positions2.push(new Point(0, 50));
            this.positions2.push(new Point(50, 0));
            //
            this.discardPointer = new DiscardPointer();
            Anim.instance = this;
        }

        public removeDiscardPointer(): void {
            if (this.discardPointer.parent != null) {
                this.discardPointer.parent.removeChild(this.discardPointer);
            }
        }

        public showAnGang(player: IPlayer): void {
            this.showMingGang(player);
        }

        private showCommonAnim(sp: Sprite): void {
            sp.scaleX = sp.scaleY = 2;
            this.addChild(sp);
            egret.Tween.get(sp).to({scaleX: 1, scaleY: 1}, 200, Ease.sineIn).call(this.showCommonAnimBg, this, [sp])

        }

        private showCommonAnimBg(sp: Sprite): void {
            SoundManager.play("tileout");
            //
            var bg: Bitmap = new Bitmap(Global.getRes("action_bj"));
            bg.anchorOffsetX = bg.width / 2;
            bg.anchorOffsetY = bg.height / 2;
            bg.x = sp.x;
            bg.y = sp.y;
            bg.scaleX = 0.1;
            bg.scaleY = 0.1;
            sp.parent.addChildAt(bg, sp.parent.getChildIndex(sp));
            egret.Tween.get(bg).to({scaleX: 1, scaleY: 1}, 100).call(this.onEnd, this, [sp, bg]).play();

        }

        private onEnd(sp: Sprite, img: Bitmap) {
            this.removeCommonAnim(sp, img)
        }

        private removeCommonAnim(sp: Sprite, img: Bitmap): void {
            sp.parent.removeChild(sp)
            img.parent.removeChild(img)
        }

        public showMingGang(curPlayer: IPlayer): void {
            SoundManager.playOpt(curPlayer.playerInfo.sex, "gang");
            var sp: Sprite = this.getSprite("action_gang", curPlayer);
            this.showCommonAnim(sp);
        }

        public showChi(curPlayer: IPlayer): void {
            SoundManager.playOpt(curPlayer.playerInfo.sex, "chi");
            var sp: Sprite = this.getSprite("action_chi", curPlayer);
            this.showCommonAnim(sp);
        }

        public showPeng(curPlayer: IPlayer): void {
            SoundManager.playOpt(curPlayer.playerInfo.sex, "peng");
            var sp: Sprite = this.getSprite("action_peng", curPlayer);
            this.showCommonAnim(sp);
        }

        public showTing(curPlayer: IPlayer): void {
            SoundManager.playOpt(curPlayer.playerInfo.sex, "ting");
            var sp: Sprite = this.getSprite("action_ting", curPlayer);
            this.showCommonAnim(sp);
        }

        public showHu(curPlayer: IPlayer): void {
            SoundManager.playOpt(curPlayer.playerInfo.sex, "hu");
            var sp: Sprite = this.getSprite("action_hu", curPlayer);
            this.addChild(sp);
            sp.scaleX = sp.scaleY = .3;
            egret.Tween.get(sp).to({scaleX: 2, scaleY: 2}, 800).call(this.removeChild, this, [sp]).play();

        }

        public showZimo(curPlayer: IPlayer): void {
            SoundManager.playOpt(curPlayer.playerInfo.sex, "zimo");
            var sp: Sprite = this.getSprite("action_zimo", curPlayer);
            sp.scaleX = sp.scaleY = .3;
            this.addChild(sp);
            egret.Tween.get(sp).to({scaleX: 2, scaleY: 2}, 800).call(this.removeChild, this, [sp]).play();
        }

        private getHuTxt(): Sprite {
            var huTxt: Sprite = new Sprite();
            huTxt.scaleX = huTxt.scaleY = .2;
            //
            var bg: Bitmap = new Bitmap(Global.getRes("action_bj"));
            bg.anchorOffsetX = bg.width / 2;
            bg.anchorOffsetY = bg.height / 2;
            huTxt.addChild(bg);
            var sp: Sprite = this.getSprite("action_hu", null);
            huTxt.addChild(sp);
            //
            egret.Tween.get(huTxt).to({scaleX: 1, scaleY: 1}, 1000, Ease.bounceOut).play();


            return huTxt;
        }

        private getSprite(s: string, curPlayer: IPlayer): Sprite {
            var t: Texture = Global.getRes(s);
            var sp: Sprite = new Sprite();
            var image: Bitmap = new Bitmap(t);
            sp.addChild(image);
            sp.anchorOffsetX = sp.width / 2;
            sp.anchorOffsetY = sp.height / 2;
            //
            if (curPlayer != null) {
                var p: Point = this.getPosition(curPlayer);
                sp.x = p.x;
                sp.y = p.y;
            }
            return sp;
        }

        private getPosition(curPlayer: IPlayer): Point {
            return this.positions[this.players.indexOf(curPlayer)];
        }

        public showDiscardAnim(iPlayer: IPlayer, card: MjCard, startPos: Point, endPos: Point): void {
            var pp: Point = this.positions1[this.players.indexOf(iPlayer)];
            var mc: CardSprite = Asset.getDiscardCard(card);
            mc.x = startPos.x;
            mc.y = startPos.y;
            //修正一下位置
            mc.x += pp.x;
            mc.y += pp.y;
            this.addChild(mc);
            //
            var pp1: Point = this.positions2[this.players.indexOf(iPlayer)];

            var ar = [new Point(mc.x, mc.y), new Point(mc.x + pp1.x, mc.y + pp1.y), endPos];
            this.nn = BezierUtil.computeBezier(ar, 4 * StorageData.getSpeedPercent());
            this.nnMc = mc;
            this.nnPlayer = iPlayer;
            this.addEventListener(egret.Event.ENTER_FRAME, this.updateDiscardAnim, this);
        }

        private updateDiscardAnim(event: egret.Event): void {
            if (this.cur >= this.nn.length) {
                this.nnPlayer.discardCardsMc.append(this.nnMc.card);
                this.nnMc.parent.removeChild(this.nnMc);
                this.removeEventListener(egret.Event.ENTER_FRAME, this.updateDiscardAnim, this);
                this.nnPlayer = null;
                return;
            }
            var p: Point = this.nn[this.cur];
            this.nnMc.x = p.x;
            this.nnMc.y = p.y;
            this.cur++;
        }

        public showStartTitleAnim(): void {
            var img: Bitmap = new Bitmap(Global.getRes("startgame"));
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
            img.x = Global.stage_w / 2;
            img.y = Global.stage_h / 2;
            this.addChild(img);
            egret.Tween.get(img).to({
                scaleX: 2,
                scaleY: 2,
                alpha: 0
            }, 500, Ease.sineIn).call(this.removeChild, this, [img]).play()
        }

        public showDiscardPointer(p: Point): void {
            this.discardPointer.x = p.x;
            this.discardPointer.y = p.y + 16;
            this.addChild(this.discardPointer);
        }

    }
}
