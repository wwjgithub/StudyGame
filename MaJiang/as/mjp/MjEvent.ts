/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/30
 * Time: 18:11
 */
module mjp {
    //import starling.events.Event;

    export class MjEvent extends Event {
        public static DISCARD:string = "MjEvent.DISCARD";
        public static PASS:string = "HERO_MjEvent.PASS_OTHER_MjEvent.DISCARD";
        public static HU:string = "MjEvent.HU";
        public static MjEvent.HU_ZIMO:string = "MjEvent.MjEvent.HU_ZIMO";
        public static MINGGANG:string = "MjEvent.MINGGANG";
        public static PENG:string = "MjEvent.PENG";
        public static CHI:string = "MjEvent.CHI";
        public static ANGANG:string = "MjEvent.ANGANG";
        public static MjEvent.DISCARD_SHOWMC:string = "MjEvent.MjEvent.DISCARD_SHOWMC";
        public static TING_SHOWMC:string = "OPT_TING";
        public static BUGANG:string = "MjEvent.BUGANG";
        public static const WANT_MjEvent.BUGANG:string = "WANT_MjEvent.BUGANG";
        public static FETCH_COMPLETE:string = "MjEvent.FETCH_COMPLETE";

        constructor(type:string, bubbles:boolean = false, data:Object = null) {
            super(type, bubbles, data);
        }
    }
}
