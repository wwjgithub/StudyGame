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

        private bgChannel:SoundChannel;
        public playBg(b:boolean):void{

            if (b) {
                if(this.bgChannel==null){
                    let bgSound: Sound = RES.getRes('bgmusic');
                    this.bgChannel = bgSound.play(0, -1);
                }
            }else{
                if (this.bgChannel != null) {
                    this.bgChannel.stop();
                    this.bgChannel=null;
                }
            }
        }

    }
}