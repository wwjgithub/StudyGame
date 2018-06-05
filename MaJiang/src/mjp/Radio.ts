/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/12/31
 * Time: 11:31
 */
module mjp {
    //import assets.Asset;

    //import starling.display.Image;
    //import starling.display.Sprite;

    export class Radio extends Sprite {
        private no:Image;
        private yes:Image;
        private _selected:boolean;

        constructor(s:string) {
            no = new Image(Asset.assetManager.getTexture("不选"));
            no.pivotX = no.width / 2;
            no.pivotY = no.height / 2;
            addChild(no);
            yes = new Image(Asset.assetManager.getTexture("选择"));
            yes.pivotX = yes.width / 2;
            yes.pivotY = yes.height / 2;
            addChild(yes);
            //
            no.scaleX = no.scaleY = yes.scaleX = yes.scaleY = .5;
            //
            var t1:Image = ObjUtil.getTxtImg(s, 30);
            addChild(t1);
            t1.x = yes.width / 2 + 2;
            t1.y = -yes.height / 2;
            //
            useHandCursor = true;
            selected = false;
        }

        public set selected(value:boolean) {
            _selected = value;
            if (value) {
                no.visible = false;
                yes.visible = true;
            } else {
                no.visible = true;
                yes.visible = false;
            }
        }

        public get selected():boolean {
            return _selected;
        }
    }
}
