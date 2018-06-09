namespace game {
    export class StorageData {

        private static _musicVolume: number = 2;
        private static _sfxVolume: number = 2;
        private static _speed: number = 7;
        //星
        public static hero_sex: number = Global.MAN;

        /*
                public static read():void {
                    var optionData:ByteArray = egret.localStorage.getItem("option");
                    if (optionData != null) {
                        _musicVolume = optionData.readInt();
                        _sfxVolume = optionData.readInt();
                        _speed = optionData.readInt();
                    }
                    //
                    var sexData:ByteArray = EncryptedLocalStore.getItem("heroSex");
                    if (sexData != null) {
                        StorageData.hero_sex = sexData.readInt();
                    }
                }
*/

        public static saveInfos(players: Array<PlayerInfo>): void {
            for (var i = 0; i < players.length; i++) {
                egret.localStorage.setItem("levelData" + i, players[i].getSaveStr());
            }
        }

        public static readLevelData(): Array<PlayerInfo> {
            var ar: Array<PlayerInfo> = new Array<PlayerInfo>();
            let item = egret.localStorage.getItem("levelData0");
            if (item == null || item == "") {
                return ar;
            }
            for (var i: number = 0; i < 4; i++) {
                var info: PlayerInfo = new PlayerInfo();
                info.init(egret.localStorage.getItem("levelData" + i));
                ar.push(info);
            }
            return ar;
        }

        public static overPlayer(s: String): void {
            egret.localStorage.setItem("player_" + s, "1")

        }

        public static hasPlayer(s: String): Boolean {
            return egret.localStorage.getItem("player_" + s) != null;
        }

        public static removeOverPlayer(s: String): void {
            egret.localStorage.removeItem("player_" + s);
        }

        public static get sfxVolume(): number {
            return StorageData._sfxVolume;
        }

        public static set sfxVolume(value: number) {
            this._sfxVolume = value;
            egret.localStorage.setItem("sfxVolume", this._sfxVolume + "")
        }

        public static get musicVolume(): number {
            return StorageData._musicVolume;
        }

        public static set musicVolume(value: number) {
            if (value > 10) {
                value = 10;
            }
            if (value < 0) {
                value = 0;
            }
            StorageData._musicVolume = value;
            if (SoundManager.bgChannel != null) {
                SoundManager.bgChannel.volume = (StorageData._musicVolume / 10);
            }
            egret.localStorage.setItem("bgVolume",value+"")
        }

        public static get speed(): number {
            return StorageData._speed;
        }

        public static set speed(value: number) {
            StorageData._speed = value;
            egret.localStorage.setItem("speed", value + "");
        }


        public static getSpeedPercent(): number {
            return 1 + (10 - StorageData._speed) / 2
        }

        public static setSex(value: number): void {
            StorageData.hero_sex = value;
            egret.localStorage.setItem("heroSex", value + "");
        }
    }
}