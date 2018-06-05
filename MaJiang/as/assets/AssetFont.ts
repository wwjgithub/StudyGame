/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/28
 * Time: 16:05
 */
module assets {
    //import starling.text.BitmapFont;
    //import starling.text.TextField;
    //import starling.textures.Texture;

    export class AssetFont {
        [Embed(source="../../res/font/coin_num.fnt", mimeType="application/octet-stream")]
        public static var FontXml_coin_num;
        [Embed(source="../../res/font/fanshu.fnt", mimeType="application/octet-stream")]
        public static var FontXml_fanshu;
        [Embed(source="../../res/font/queshenjifen.fnt", mimeType="application/octet-stream")]
        public static var FontXml_queshenjifen;
        [Embed(source="../../res/font/shengyuwenzi_gb.fnt", mimeType="application/octet-stream")]
        public static var FontXml_shengyuwenzi_gb;
        [Embed(source="../../res/font/shengyuwenzi_qs.fnt", mimeType="application/octet-stream")]
        public static var FontXml_shengyuwenzi_qs;
        //
        constructor() {
        }

        public static init() {
            var ars = [
                "coin_num",
                "fanshu",
                "queshenjifen",
                "shengyuwenzi_gb",
                "shengyuwenzi_qs"
            ];
            for (var i:number = 0; i < ars.length; i++) {
                var s:string = ars[i];
                var t:Texture = Asset.assetManager.getTexture(s);
                var xmlCla = AssetFont["FontXml_" + s];
                var xml:string = new (xmlCla)();
                var bf:BitmapFont = new BitmapFont(t, xml);
                TextField.registerBitmapFont(bf, s);
            }
        }
    }
}
