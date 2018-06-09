namespace game{
    import SoundChannel = egret.SoundChannel;
    import Sound = egret.Sound;

    export class SoundManager{

        private static instance:SoundManager;
        constructor() {
        }

        public static getInstance():SoundManager{
            if(SoundManager.instance==null){
                SoundManager.instance = new SoundManager();
            }
            return SoundManager.instance;
        }

        public static bgChannel:SoundChannel;
        public playBg(b:boolean):void{

            if (b) {
                if(SoundManager.bgChannel==null){
                    let bgSound: Sound = RES.getRes('bgmusic');
                    SoundManager.bgChannel = bgSound.play(0, -1);
                }
            }else{
                if (SoundManager.bgChannel != null) {
                    SoundManager.bgChannel.stop();
                    SoundManager.bgChannel=null;
                }
            }
        }
        public static playOpt(sex:number, ss:string):void {
            var s:String = "";
            if (sex == Global.MAN) {
                s = "man_m";
            } else {
                s = "woman_w";
            }
            SoundManager.play(s + ss);
        }

        public static play(s:string):void {
            var cla:Sound = RES.getRes(s);
            let c:SoundChannel=cla.play(0,1);
            c.volume=StorageData.sfxVolume/10;
        }
    }
}