/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/12/5
 * Time: 14:20
 */
module mjp {
    //import assets.AssetSound;

    //import flash.data.EncryptedLocalStore;
    //import flash.media.SoundTransform;
    //import flash.utils.ByteArray;

    export class StorageData {
        private static var _musicVolume:number = 2;
        private static var _sfxVolume:number = 2;
        private static var _speed:number = 7;
        //星
        public static var hero_sex:number = UserConst.MAN;

        constructor() {
        }

        public static read() {
            var optionData:ByteArray = EncryptedLocalStore.getItem("option");
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

        public static saveInfos(players:Vector.<PlayerInfo>) {
            if (EncryptedLocalStore.isSupported) {
                var ba:ByteArray = new ByteArray();
                for (var i:number = 0; i < players.length; i++) {
                    ba.writeUTF(players[i].getSaveStr());
                }
                EncryptedLocalStore.setItem("levelData", ba)
            }
        }

        public static readLevelData():Vector.<PlayerInfo> {
            var optionData:ByteArray = EncryptedLocalStore.getItem("levelData");
            var ar:Vector.<PlayerInfo> = new Vector.<PlayerInfo>();
            if (optionData != null) {
                for (var i:number = 0; i < 4; i++) {
                    var info:PlayerInfo = new PlayerInfo();
                    info.init(optionData.readUTF());
                    ar.push(info);
                }
            }
            return ar;
        }

        public static hasPlayer(s:string):boolean {
            if (EncryptedLocalStore.isSupported) {
                return EncryptedLocalStore.getItem("player_" + s) != null
            }
            return false;
        }

        public static overPlayer(s:string) {
            if (EncryptedLocalStore.isSupported) {
                var ba:ByteArray = new ByteArray();
                ba.writeInt(1);
                EncryptedLocalStore.setItem("player_" + s, ba);
            }
        }

        public static removeOverPlayer(s:string) {
            if (EncryptedLocalStore.isSupported) {
                EncryptedLocalStore.removeItem("player_" + s);
            }
        }

        private static function saveOption() {
            if (EncryptedLocalStore.isSupported) {
                var ba:ByteArray = new ByteArray();
                ba.writeInt(_musicVolume);
                ba.writeInt(_sfxVolume);
                ba.writeInt(_speed);
                EncryptedLocalStore.setItem("option", ba)
            }
        }

        public static get musicVolume():number {
            return _musicVolume;
        }

        public static set musicVolume(value:number) {
            if (value > 10) {
                value = 10;
            }
            if (value < 0) {
                value = 0;
            }
            _musicVolume = value;
            saveOption();
            if (AssetSound.bgChannel != null) {
                AssetSound.bgChannel.soundTransform = new SoundTransform(_musicVolume / 10);
            }
        }

        public static get sfxVolume():number {
            return _sfxVolume;
        }

        public static set sfxVolume(value:number) {
            _sfxVolume = value;
            saveOption();
        }

        public static get speed():number {
            return _speed;
        }

        /**
         *
         * @param value  0-10
         */
        public static set speed(value:number) {
            _speed = value;
            saveOption();
        }

        /**
         * 返回1-6 越小越快
         * @return
         */
        public static getSpeedPercent():number {
            return 1 + (10 - _speed) / 2
        }

        public static setSex(value:number) {
            hero_sex = value;
            if (EncryptedLocalStore.isSupported) {
                var ba:ByteArray = new ByteArray();
                ba.writeInt(value);
                EncryptedLocalStore.setItem("heroSex", ba)
            }
        }
    }
}
