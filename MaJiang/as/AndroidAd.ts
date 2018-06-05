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
    //import so.cuo.platform.ad.adapters.BaiduAdapter;
    //import so.cuo.platform.gdt.GDTAds;
    //import so.cuo.platform.gdt.GDTEvent;

    export class AndroidAd {
        constructor() {
        }

        public static init() {
            try {
                var adManager:AdManager = AdManager.getInstance();
                var list:Vector.<AdItem> = new Vector.<AdItem>();
                var baiduAdapter:BaiduAdapter = new BaiduAdapter();
                list.push(new AdItem(baiduAdapter, 10, "a25fd1e8", "a25fd1e8", 10));
                adManager.configPlatforms(list);
                AdManager.getInstance().cacheInterstitial();
            } catch (e:Error) {
            }
            try {
                if (GDTAds.getInstance().supportDevice) {
                    GDTAds.getInstance().setKeys("1105121883", "8070905819184461", "8070905819184461");
                    GDTAds.getInstance().addEventListener(GDTEvent.onInterstitialDismiss, onAdEvent);
                    GDTAds.getInstance().addEventListener(GDTEvent.onInterstitialFailedReceive, onAdEvent);
                    GDTAds.getInstance().enableTrace = true;
                    GDTAds.getInstance().cacheInterstitial();
                }
            } catch (e:Error) {
            }
        }

        private static function onAdEvent(event:GDTEvent) {
            setTimeout(GDTAds.getInstance().cacheInterstitial, 1000);
        }

        public static show() {
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
    }
}
