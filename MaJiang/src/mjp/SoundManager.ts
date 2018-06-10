namespace game {
    import SoundChannel = egret.SoundChannel;
    import Sound = egret.Sound;

    export class SoundManager {

        private static instance: SoundManager;

        constructor() {
        }

        public static getInstance(): SoundManager {
            if (SoundManager.instance == null) {
                SoundManager.instance = new SoundManager();
            }
            return SoundManager.instance;
        }

        public static bgChannel: SoundChannel;

        public playBg(b: boolean): void {

            if (b) {
                if (SoundManager.bgChannel == null) {
                    let bgSound: Sound = RES.getRes('bgmusic');
                    SoundManager.bgChannel = bgSound.play(0, -1);
                }
            } else {
                if (SoundManager.bgChannel != null) {
                    SoundManager.bgChannel.stop();
                    SoundManager.bgChannel = null;
                }
            }
        }

        public static playMj(sex: number, lastDiscardCard: MjCard): void {
            var s: string = "";
            if (sex == Global.MAN) {
                s = "m";
            } else {
                s = "w";
            }
            SoundManager.play(s + SoundManager.getSoundByCard(lastDiscardCard));
        }

        private static getSoundByCard(lastDiscardCard: MjCard): string {
            var s: string = "";
            switch (lastDiscardCard.type) {
                case MjConst.type_feng:
                    var ss = ["31", "32", "33", "34"];
                    s = ss[lastDiscardCard.num - 1];
                    break;
                case MjConst.type_se:
                    var ss1 = ["35", "36", "37"];
                    s = ss1[lastDiscardCard.num - 1];
                    break;
                default :
                    s = lastDiscardCard.num + "";
                    if (lastDiscardCard.type == MjConst.type_wan) {
                        s += "wan";
                    }
                    if (lastDiscardCard.type == MjConst.type_tong) {
                        s += "tong";
                    }
                    if (lastDiscardCard.type == MjConst.type_tiao) {
                        s += "tiao";
                    }
                    break;
            }
            return s;
        }

        public static playOpt(sex: number, ss: string): void {
            var s: String = "";
            if (sex == Global.MAN) {
                s = "m";
            } else {
                s = "w";
            }
            SoundManager.play(s + ss);
        }

        public static play(s: string): void {
            var cla: Sound = RES.getRes(s);
            let c: SoundChannel = cla.play(0, 1);
            c.volume = StorageData.sfxVolume / 10;
        }
    }
}
