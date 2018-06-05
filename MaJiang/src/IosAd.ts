/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2015/7/28
 * Time: 16:39
 */
module {
    //import flash.utils.setTimeout;

    //import so.cuo.platform.ad.AdItem;
    //import so.cuo.platform.ad.AdManager;
    //import so.cuo.platform.ad.adapters.AdmobAdapter;
    //import so.cuo.platform.ad.adapters.BaiduAdapter;
    //import so.cuo.platform.gdt.GDTAds;
    //import so.cuo.platform.gdt.GDTEvent;

    export class IosAd {
        constructor() {
        }

        public static init() {
            try {
                if (GDTAds.getInstance().supportDevice) {
                    GDTAds.getInstance().setKeys("1105195166", "3030904889284402", "3030904889284402");
                    GDTAds.getInstance().addEventListener(GDTEvent.onInterstitialDismiss, onAdEvent);
                    GDTAds.getInstance().enableTrace = true;
                    GDTAds.getInstance().cacheInterstitial();
                }
                try {
                    var adManager:AdManager = AdManager.getInstance();
                    var list:Vector.<AdItem> = new Vector.<AdItem>();
                    list.push(new AdItem(new BaiduAdapter(), 10, "fad99fa3", "fad99fa3", 10));
                    list.push(new AdItem(new AdmobAdapter(), 10, "ca-app-pub-4986999688798699/8597195167", "ca-app-pub-4986999688798699/8597195167", 10));
                    adManager.configPlatforms(list);
                    adManager.cacheInterstitial();
                } catch (e:Error) {
                }
            } catch (e:Error) {
            }
        }

        public static show() {
            if (Math.random() * 100 < 50) {
                showAdGdt()
            } else {
                showAdBaiduAdmob();
            }
        }

        private static function showAdGdt() {
            try {
                if (GDTAds.getInstance().isInterstitialReady()) {
                    GDTAds.getInstance().showInterstitial();
                } else {
                    if (AdManager.getInstance().isInterstitialReady()) {
                        AdManager.getInstance().showInterstitialOrCache();
                    }
                }
            } catch (e:Error) {
            }
        }

        private static function showAdBaiduAdmob() {
            try {
                if (AdManager.getInstance().isInterstitialReady()) {
                    AdManager.getInstance().showInterstitialOrCache();
                } else {
                    if (GDTAds.getInstance().isInterstitialReady()) {
                        GDTAds.getInstance().showInterstitial();
                    }
                }
            } catch (e:Error) {
            }
        }

        private static function onAdEvent(event:GDTEvent) {
            setTimeout(GDTAds.getInstance().cacheInterstitial, 1000);
        }
    }
}
