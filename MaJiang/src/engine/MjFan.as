/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-3-18
 * Time: 下午12:15
 */
package engine {
    import engine.vo.HuInfo;
    import engine.vo.IOpt;
    import engine.vo.MjCard;
    import engine.vo.MjPlayer;
    import engine.vo.OptFetch;
    import engine.vo.OptTing;

    import flash.utils.Dictionary;

    public class MjFan {
        public static const fanmap:Dictionary = initFanMap();
        public static var huInfo:HuInfo;
        public static var status:MjPlayer;
        //
        public static var fan_天和:String = "天和";
        public static var fan_地和:String = "地和";
        public static var fan_天听:String = "天听";
        public static var fan_大四喜:String = "大四喜";
        public static var fan_大三元:String = "大三元";
        public static var fan_绿一色:String = "绿一色";
        public static var fan_九莲宝灯:String = "九莲宝灯";
        public static var fan_四杠:String = "四杠";
        public static var fan_连七对:String = "连七对";
        public static var fan_十三幺:String = "十三幺";
        public static var fan_清幺九:String = "清幺九";
        public static var fan_小四喜:String = "小四喜";
        public static var fan_小三元:String = "小三元";
        public static var fan_字一色:String = "字一色";
        public static var fan_四暗刻:String = "四暗刻";
        public static var fan_一色双龙会:String = "一色双龙会";
        public static var fan_一色四同顺:String = "一色四同顺";
        public static var fan_一色四节高:String = "一色四节高";
        public static var fan_一色四步高:String = "一色四步高";
        public static var fan_三杠:String = "三杠";
        public static var fan_混幺九:String = "混幺九";
        public static var fan_七对:String = "七对";
        public static var fan_七星不靠:String = "七星不靠";
        public static var fan_全双刻:String = "全双刻";
        public static var fan_清一色:String = "清一色";
        public static var fan_一色三同顺:String = "一色三同顺";
        public static var fan_一色三节高:String = "一色三节高";
        public static var fan_全大:String = "全大";
        public static var fan_全中:String = "全中";
        public static var fan_全小:String = "全小";
        public static var fan_清龙:String = "清龙";
        public static var fan_三色双龙会:String = "三色双龙会";
        public static var fan_一色三步高:String = "一色三步高";
        public static var fan_全带五:String = "全带五";
        public static var fan_三同刻:String = "三同刻";
        public static var fan_三暗刻:String = "三暗刻";
        public static var fan_全不靠:String = "全不靠";
        public static var fan_组合龙:String = "组合龙";
        public static var fan_大于五:String = "大于五";
        public static var fan_小于五:String = "小于五";
        public static var fan_三风刻:String = "三风刻";
        public static var fan_花龙:String = "花龙";
        public static var fan_推不倒:String = "推不倒";
        public static var fan_三色三同顺:String = "三色三同顺";
        public static var fan_无番:String = "无番";
        public static var fan_妙手回春:String = "妙手回春";
        public static var fan_海底捞月:String = "海底捞月";
        public static var fan_杠上开花:String = "杠上开花";
        public static var fan_抢杠和:String = "抢杠和";
        public static var fan_三色三节高:String = "三色三节高";
        public static var fan_碰碰和:String = "碰碰和";
        public static var fan_混一色:String = "混一色";
        public static var fan_三色三步高:String = "三色三步高";
        public static var fan_五门齐:String = "五门齐";
        public static var fan_全求人:String = "全求人";
        public static var fan_双暗杠:String = "双暗杠";
        public static var fan_双箭刻:String = "双箭刻";
        public static var fan_全带幺:String = "全带幺";
        public static var fan_不求人:String = "不求人";
        public static var fan_双明杠:String = "双明杠";
        public static var fan_和绝张:String = "和绝张";
        public static var fan_箭刻:String = "箭刻";
        public static var fan_圈风刻:String = "圈风刻";
        public static var fan_门风刻:String = "门风刻";
        public static var fan_门前清:String = "门前清";
        public static var fan_平和:String = "平和";
        public static var fan_四归一:String = "四归一";
        public static var fan_双同刻:String = "双同刻";
        public static var fan_双暗刻:String = "双暗刻";
        public static var fan_暗杠:String = "暗杠";
        public static var fan_断幺:String = "断幺";
        public static var fan_一般高:String = "一般高";
        public static var fan_喜相逢:String = "喜相逢";
        public static var fan_连六:String = "连六";
        public static var fan_老少副:String = "老少副";
        public static var fan_幺九刻:String = "幺九刻";
        public static var fan_明杠:String = "明杠";
        public static var fan_缺一门:String = "缺一门";
        public static var fan_无字:String = "无字";
        public static var fan_边张:String = "边张";
        public static var fan_坎张:String = "坎张";
        public static var fan_单钓将:String = "单钓将";
        public static var fan_自摸:String = "自摸";
        public static var fan_花牌:String = "花牌";

        private static function initFanMap():Dictionary {
            var map:Dictionary = new Dictionary();
            //具体的fan从对应的方法中返回.因为算花等是有变化的.
//            map[fan_天和] = {a2: true, a4: true, func: func_天和, ignore: [fan_单钓将, fan_边张, fan_坎张], tip: ""};
//            map[fan_地和] = {a2: true, a4: true, func: func_地和, ignore: [], tip: ""};
//            map[fan_天听] = {a2: true, a4: true, func: func_天听, tip: ""};
            map[fan_大四喜] = {shape: "ag:|mg:|sh:|ke:|pe:东风,东风,东风,南风,南风,南风,西风,西风,西风,北风,北风,北风,四条,四条", fan: 88, a2: true, a4: true, func: func_大四喜, ignore: [fan_圈风刻, fan_门风刻, fan_三风刻, fan_碰碰和, fan_幺九刻, fan_缺一门], tip: "胡牌时，所形成的牌之中有东、南、西、北四副刻子（杠）" };
            map[fan_大三元] = {shape: "ag:|mg:|sh:|ke:|pe:红中,红中,红中,发财,发财,发财,白板,白板,白板,三万,四万,五万,四筒,四筒", fan: 88, a2: true, a4: true, func: func_大三元, ignore: [fan_箭刻, fan_双箭刻, fan_小三元, fan_缺一门], tip: "胡牌时，所形成的牌之中有中、发、白三副刻子（杠）"};
            map[fan_绿一色] = {shape: "ag:|mg:|sh:|ke:|pe:二条,三条,四条,二条,二条,二条,六条,六条,六条,八条,八条,八条,发财,发财", fan: 88, a2: false, a4: true, func: func_绿一色, ignore: [fan_混一色], tip: "由“23468”条及“发”字中的任何牌组成的胡牌" };
            map[fan_九莲宝灯] = {shape: "ag:|mg:|sh:|ke:|pe:一万,一万,一万,一万,二万,三万,四万,五万,六万,七万,八万,九万,九万,九万", fan: 88, a2: true, a4: true, func: func_九莲宝灯, ignore: [fan_清一色, fan_门前清, fan_幺九刻, fan_不求人, fan_缺一门, fan_无字], tip: "由一种花色序数牌组成的“1112345678999”组成的特定牌型，此时可以胡同花色的任意一张牌" };
            map[fan_四杠] = {shape: "ag:|mg:七万,四筒,八筒,五条|sh:|ke:|pe:一筒,一筒", fan: 88, a2: true, a4: true, func: func_四杠, ignore: [fan_三杠, fan_双暗杠, fan_双明杠, fan_明杠, fan_暗杠, fan_单钓将, fan_碰碰和], tip: "胡牌时，牌中有4副杠牌" };
            map[fan_连七对] = {shape: "ag:|mg:|sh:|ke:|pe:一万,一万,二万,二万,三万,三万,四万,四万,五万,五万,六万,六万,七万,七万", fan: 88, a2: true, a4: true, func: func_连七对, ignore: [fan_清一色, fan_一般高, fan_连六, fan_门前清, fan_七对, fan_不求人, fan_单钓将, fan_缺一门, fan_无字], tip: "由一种花色序数相连的七对牌形成的胡牌" };
            map[fan_十三幺] = {shape: "ag:|mg:|sh:|ke:|pe:一万,九万,一筒,九筒,一条,九条,东风,南风,西风,北风,红中,发财,白板,白板", fan: 88, a2: false, a4: true, func: func_十三幺, ignore: [fan_五门齐, fan_不求人, fan_单钓将, fan_全带幺, fan_门前清], tip: "由三种序数牌的幺、九牌、七种字牌及其中一对作将组成的胡牌" };
            map[fan_清幺九] = {shape: "ag:|mg:|sh:|ke:|pe:一万,一万,一万,九万,九万,九万,九筒,九筒,九筒,九条,九条,九条,一条,一条", fan: 64, a2: false, a4: true, func: func_清幺九, ignore: [fan_碰碰和, fan_双同刻, fan_无字, fan_混幺九, fan_全带幺, fan_幺九刻], tip: "由序数牌幺、九刻子（杠）及将牌组成的胡牌" };
            map[fan_小四喜] = {shape: "ag:|mg:|sh:|ke:|pe:东风,东风,东风,南风,南风,南风,西风,西风,西风,北风,北风,五条,五条,五条", fan: 64, a2: true, a4: true, func: func_小四喜, ignore: [fan_三风刻, fan_幺九刻, fan_缺一门], tip: "胡牌时，牌中有三个风牌的刻子（杠），另外一个风牌作将牌" };
            map[fan_小三元] = {shape: "ag:|mg:|sh:|ke:|pe:红中,红中,红中,发财,发财,发财,白板,白板,五筒,五筒,五筒,八筒,八筒,八筒", fan: 64, a2: true, a4: true, func: func_小三元, ignore: [fan_箭刻, fan_双箭刻, fan_缺一门], tip: "胡牌时，牌中有两个箭牌的刻子（杠），另外一个箭牌作将牌" };
            map[fan_字一色] = {shape: "ag:|mg:|sh:|ke:|pe:南风,南风,南风,东风,东风,东风,北风,北风,北风,发财,发财,发财,红中,红中", fan: 64, a2: true, a4: true, func: func_字一色, ignore: [fan_碰碰和, fan_混幺九, fan_全带幺, fan_幺九刻, fan_缺一门], tip: "由字牌的刻子（杠）。将牌组成的胡牌" };
            map[fan_四暗刻] = {shape: "ag:|mg:|sh:|ke:|pe:七万,七万,七万,四万,四万,四万,五筒,五筒,五筒,五条,五条,五条,七条,七条", fan: 64, a2: true, a4: true, func: func_四暗刻, ignore: [fan_门前清, fan_碰碰和, fan_三暗刻, fan_双暗刻, fan_不求人], tip: "胡牌时牌中有四副暗刻（暗杠）" };
            map[fan_一色双龙会] = {shape: "ag:|mg:|sh:|ke:|pe:一条,二条,三条,一条,二条,三条,五条,五条,七条,八条,九条,七条,九条,八条", fan: 64, a2: true, a4: true, func: func_一色双龙会, ignore: [fan_平和, fan_七对, fan_清一色, fan_一般高, fan_老少副], tip: "一种花色的两套老少副（即有两组123、789）以及一套5作将牌" };
            map[fan_一色四同顺] = {shape: "ag:|mg:|sh:|ke:|pe:一筒,一筒,一筒,二筒,二筒,二筒,三筒,三筒,三筒,四筒,四筒,四筒,一条,一条", fan: 48, a2: true, a4: true, func: func_一色四同顺, ignore: [fan_一色三节高, fan_一般高, fan_四归一, fan_一色三同顺, fan_七对], tip: "一种花色四副序数相同的顺子" };
            map[fan_一色四节高] = {shape: "ag:|mg:|sh:|ke:|pe:一万,一万,一万,二万,二万,二万,三万,三万,三万,四万,四万,四万,六条,六条", fan: 48, a2: true, a4: true, func: func_一色四节高, ignore: [fan_一色三同顺, fan_一色三节高, fan_碰碰和], tip: "一种花色一次递增一个序数的四个刻子（杠）" };
            map[fan_一色四步高] = {shape: "ag:|mg:|sh:|ke:|pe:二万,三万,四万,三万,四万,五万,四万,五万,六万,五万,六万,七万,南风,南风", fan: 32, a2: true, a4: true, func: func_一色四步高, ignore: [fan_一色三步高], tip: "一种花色一次递增一个或者两个序数的顺子"};
            map[fan_三杠] = {shape: "ag:|mg:三筒,六筒,五条|sh:|ke:|pe:一万,二万,三万,东风,东风", fan: 32, a2: true, a4: true, func: func_三杠, ignore: [fan_双明杠, fan_双暗杠, fan_明杠, fan_暗杠], tip: "胡牌时，牌中有三副杠牌"};
            map[fan_混幺九] = {shape: "ag:|mg:|sh:|ke:|pe:一万,一万,一万,一筒,一筒,一筒,九万,九万,九万,东风,东风,东风,南风,南风", fan: 32, a2: true, a4: true, func: func_混幺九, ignore: [fan_碰碰和, fan_幺九刻, fan_全带幺], tip: "由字牌和序数牌一、九的刻子（杠）、将牌形成的和牌；其中肯定包含字牌"};
            map[fan_七对] = {shape: "ag:|mg:|sh:|ke:|pe:二万,二万,四万,四万,八万,八万,四筒,四筒,六筒,六筒,九筒,九筒,五条,五条", fan: 24, a2: true, a4: true, func: func_七对, ignore: [fan_不求人, fan_单钓将], tip: "由7个对子组成的和牌"};
            map[fan_七星不靠] = {shape: "ag:|mg:|sh:|ke:|pe:东风,南风,西风,北风,红中,发财,白板,一万,四万,七万,二筒,五筒,八筒,三条", fan: 24, a2: false, a4: true, func: func_七星不靠, ignore: [fan_五门齐, fan_门前清, fan_全不靠, fan_单钓将], tip: "必须有7个单张的东、南、西、北、中、发、白，加上三种花色数位按照147、258、369中的7张序数牌组成的没有将牌的和牌" };
            map[fan_全双刻] = {shape: "ag:|mg:|sh:|ke:|pe:四筒,四筒,四筒,四条,四条,四条,六条,六条,六条,八万,八万,八万,六筒,六筒", fan: 24, a2: false, a4: true, func: func_全双刻, ignore: [fan_碰碰和, fan_断幺], tip: "由“2468”序数牌的刻子（杠）、将牌组成的和牌"};
            map[fan_清一色] = {shape: "ag:|mg:|sh:|ke:|pe:一筒,二筒,三筒,一筒,二筒,三筒,四筒,五筒,六筒,七筒,八筒,九筒,九筒,九筒", fan: 24, a2: true, a4: true, func: func_清一色, ignore: [fan_无字], tip: "由同一种花色组成的和牌"};
            map[fan_一色三同顺] = {shape: "ag:|mg:|sh:|ke:|pe:一万,二万,三万,三万,三万,二万,二万,一万,一万,四筒,五筒,六筒,五条,五条", fan: 24, a2: true, a4: true, func: func_一色三同顺, ignore: [fan_一色三节高, fan_一般高], tip: "和牌中，有一种花色三副序数相同的顺子"};
            map[fan_一色三节高] = {shape: "ag:|mg:|sh:|ke:|pe:四筒,四筒,四筒,五筒,五筒,五筒,六筒,六筒,六筒,七万,八万,九万,东风,东风", fan: 24, a2: true, a4: true, func: func_一色三节高, ignore: [fan_一色三同顺], tip: "和牌中，有一种花色三副序数依次递增一个序数的刻子（杠）"};
            map[fan_全大] = {shape: "ag:|mg:|sh:|ke:|pe:七万,八万,九万,七筒,八筒,九筒,七条,七条,七条,九筒,九筒,九筒,九条,九条", fan: 24, a2: false, a4: true, func: func_全大, ignore: [fan_无字], tip: "由序数牌7、8、9组成的和牌"};
            map[fan_全中] = {shape: "ag:|mg:|sh:|ke:|pe:四筒,五筒,六筒,五筒,五筒,五筒,四条,五条,六条,六万,六万,六万,五万,五万", fan: 24, a2: false, a4: true, func: func_全中, ignore: [fan_无字, fan_断幺], tip: "由序数牌4、5、6组成的和牌"};
            map[fan_全小] = {shape: "ag:|mg:|sh:|ke:|pe:一条,二条,三条,三条,三条,三条,一万,二万,三万,一筒,一筒,一筒,二筒,二筒", fan: 24, a2: false, a4: true, func: func_全小, ignore: [fan_无字], tip: "由序数牌1、2、3组成的和牌"};
            map[fan_清龙] = {shape: "ag:|mg:|sh:|ke:|pe:一筒,二筒,三筒,四筒,五筒,六筒,七筒,八筒,九筒,四条,四条,四条,东风,东风", fan: 16, a2: true, a4: true, func: func_清龙, ignore: [fan_连六, fan_老少副], tip: "和牌中，有同花色123 456 789相连的序数牌"};
            map[fan_三色双龙会] = {shape: "ag:|mg:|sh:|ke:|pe:一万,二万,三万,七万,八万,九万,一筒,二筒,三筒,七筒,八筒,九筒,五条,五条", fan: 16, a2: false, a4: true, func: func_三色双龙会, ignore: [fan_喜相逢, fan_老少副, fan_无字, fan_平和], tip: "两种花色两副老少副，另外一种花色一对5作为将牌形成的和牌" };
            map[fan_一色三步高] = {shape: "ag:|mg:|sh:|ke:|pe:二万,三万,四万,三万,四万,五万,四万,五万,六万,五筒,五筒,五筒,九筒,九筒", fan: 16, a2: true, a4: true, func: func_一色三步高, tip: "和牌中，有一种花色三副依次递增一个或者两个的顺子"};
            map[fan_全带五] = {shape: "ag:|mg:|sh:|ke:|pe:四筒,五筒,六筒,五条,五条,五条,四万,五万,六万,六万,五万,七万,五筒,五筒", fan: 16, a2: false, a4: true, func: func_全带五, ignore: [fan_断幺], tip: "每副牌及将牌必须带有序数牌5"};
            map[fan_三同刻] = {shape: "ag:|mg:|sh:|ke:|pe:四万,四万,四万,四筒,四筒,四筒,四条,四条,四条,六条,七条,八条,东风,东风", fan: 16, a2: false, a4: true, func: func_三同刻, tip: "和牌中，有3副序数相同的刻子（杠）"};
            map[fan_三暗刻] = {shape: "ag:|mg:|sh:|ke:|pe:三万,三万,三万,五筒,五筒,五筒,九筒,九筒,九筒,五条,六条,七条,东风,东风", fan: 16, a2: true, a4: true, func: func_三暗刻, ignore: [fan_双暗刻], tip: "和牌中，有3副暗刻（暗杠）"};
            map[fan_全不靠] = {shape: "ag:|mg:|sh:|ke:|pe:一万,四万,七万,二筒,五筒,八筒,三条,六条,九条,东风,南风,西风,北风,红中", fan: 12, a2: false, a4: true, func: func_全不靠, ignore: [fan_门前清, fan_五门齐, fan_不求人, fan_单钓将], tip: "由三种花色147、258、369不能错位的序数牌及东、南、西、北、中、发、白中的任意十四张单张牌组成的和牌"};
            map[fan_组合龙] = {shape: "ag:|mg:|sh:|ke:|pe:一万,四万,七万,二筒,五筒,八筒,三条,六条,九条,七筒,八筒,九筒,八万,八万", fan: 12, a2: false, a4: true, func: func_组合龙, tip: "和牌中，有三种花色147、258、369不能错位的序数牌（特殊顺子）"};
            map[fan_大于五] = {shape: "ag:|mg:|sh:|ke:|pe:六万,七万,八万,九万,九万,九万,六筒,六筒,六筒,七筒,八筒,九筒,九条,九条", fan: 12, a2: true, a4: true, func: func_大于五, ignore: [fan_无字], tip: "由序数牌6、7、8、9组成的和牌"};
            map[fan_小于五] = {shape: "ag:|mg:|sh:|ke:|pe:一筒,二筒,三筒,二筒,二筒,二筒,一万,一万,一万,二条,三条,四条,三条,三条", fan: 12, a2: true, a4: true, func: func_小于五, ignore: [fan_无字], tip: "由序数牌1、2、3、4组成的和牌"};
            map[fan_三风刻] = {shape: "ag:|mg:|sh:|ke:|pe:东风,东风,东风,南风,南风,南风,西风,西风,西风,一条,二条,三条,五筒,五筒", fan: 12, a2: true, a4: true, func: func_三风刻, tip: "和牌中，有三副风刻（杠）"};
            map[fan_花龙] = {shape: "ag:|mg:|sh:|ke:|pe:一万,二万,三万,四筒,五筒,六筒,七条,八条,九条,九筒,九筒,九筒,三筒,三筒", fan: 8, a2: false, a4: true, func: func_花龙, tip: "和牌中，有三种花色123、456、789三个顺子连接而成"};
            map[fan_推不倒] = {shape: "ag:|mg:|sh:|ke:|pe:一筒,二筒,三筒,四筒,四筒,四筒,四条,四条,四条,六条,六条,六条,八条,八条", fan: 8, a2: false, a4: true, func: func_推不倒, ignore: [fan_缺一门], tip: "由牌面图形没有上下区别的牌组成的和牌。包括1234589饼、245689条、白板"};
            map[fan_三色三同顺] = {shape: "ag:|mg:|sh:|ke:|pe:一万,二万,三万,一筒,二筒,三筒,一条,二条,三条,九筒,九筒,九筒,五筒,五筒", fan: 8, a2: false, a4: true, func: func_三色三同顺, tip: "和牌中，有三种花色三副序数相同的顺子"};
            map[fan_三色三节高] = {shape: "ag:|mg:|sh:|ke:|pe:四筒,四筒,四筒,五条,五条,五条,六万,六万,六万,一万,二万,三万,九条,九条", fan: 8, a2: false, a4: true, func: func_三色三节高, tip: "和牌中，有三种花色三副依次递增一个序数的刻子（杠）"};
            //map[fan_无番] = {shape:"",a2: false, a4: true, func: null, tip:"和牌中，数不出任何番种番（不包含花牌）"};
            map[fan_妙手回春] = {shape: "", fan: 8, a2: true, a4: true, func: func_妙手回春, ignore: [fan_自摸], tip: "自模牌墙上最后一张牌形成和牌"};
            map[fan_海底捞月] = {shape: "", fan: 8, a2: true, a4: true, func: func_海底捞月, tip: "和别人打出的最后一张牌"};
            map[fan_杠上开花] = {shape: "", fan: 8, a2: true, a4: true, func: func_杠上开花, ignore: [fan_自摸], tip: "杠牌时，从牌墙上补上一张牌形成和牌"};
            map[fan_抢杠和] = {shape: "", fan: 8, a2: true, a4: true, func: func_抢杠和, ignore: [fan_和绝张], tip: "和他人自抓开明杠的牌"};
            map[fan_碰碰和] = {shape: "ag:|mg:|sh:|ke:二万,三筒,五筒,八筒|pe:五条,五条", fan: 6, a2: true, a4: true, func: func_碰碰和, tip: "由4副刻子（杠），将牌组成的和牌"};
            map[fan_混一色] = {shape: "ag:|mg:|sh:|ke:|pe:一万,二万,三万,五万,五万,五万,七万,八万,九万,东风,东风,东风,红中,红中", fan: 6, a2: true, a4: true, func: func_混一色, tip: "由一种花色序数牌及字牌组成的和牌"};
            map[fan_三色三步高] = {shape: "ag:|mg:|sh:|ke:|pe:二万,三万,四万,三条,四条,五条,四筒,五筒,六筒,六条,六条,六条,九条,九条", fan: 6, a2: false, a4: true, func: func_三色三步高, tip: "和牌中，有三种花色三副依次递增一个序数的顺子" };
            map[fan_五门齐] = {shape: "", fan: 6, a2: false, a4: true, func: func_五门齐, tip: "由一种花色序数牌及字牌组成的和牌"};
            map[fan_全求人] = {shape: "", fan: 6, a2: true, a4: true, func: func_全求人, ignore: [fan_单钓将], tip: "4副牌全部是吃、碰（明杠）他们的牌，且最后和牌也是和他人打出的牌"};
            map[fan_双暗杠] = {shape: "", fan: 6, a2: true, a4: true, func: func_双暗杠, ignore: [fan_暗杠, fan_双暗刻], tip: "和牌中，有两副暗杠"};
            map[fan_双箭刻] = {shape: "", fan: 6, a2: true, a4: true, func: func_双箭刻, ignore: [fan_箭刻], tip: "和牌中，有两副箭刻"};
            map[fan_全带幺] = {shape: "", fan: 4, a2: true, a4: true, func: func_全带幺, tip: "每副牌及将牌中都带有幺九牌"};
            map[fan_不求人] = {shape: "", fan: 4, a2: true, a4: true, func: func_不求人, ignore: [fan_门前清, fan_自摸], tip: "没有吃牌、碰牌、明杠，最后自模和牌" };
            map[fan_双明杠] = {shape: "", fan: 4, a2: true, a4: true, func: func_双明杠, ignore: [fan_明杠], tip: "和牌之中有两个明杠"};
            map[fan_和绝张] = {shape: "", fan: 4, a2: true, a4: true, func: func_和绝张, tip: "和牌池、桌面已亮明3张所剩第4张相同的牌"};
            map[fan_箭刻] = {shape: "", fan: 2, a2: true, a4: true, func: func_箭刻, tip: "由中、发、白3张相同的牌组成的刻子（杠）"};
            map[fan_圈风刻] = {shape: "", fan: 2, a2: false, a4: true, func: func_圈风刻, tip: "与圈风相同的风刻（杠）"};
            map[fan_门风刻] = {shape: "", fan: 2, a2: false, a4: true, func: func_门风刻, tip: "与门风相同的风刻（杠）"};
            map[fan_门前清] = {shape: "", fan: 2, a2: true, a4: true, func: func_门前清, tip: "没有吃牌、碰牌、明杠的和牌"};
            map[fan_平和] = {shape: "", fan: 2, a2: true, a4: true, func: func_平和, tip: "由4副顺子及序数牌作为将牌组成的和牌"};
            map[fan_四归一] = {shape: "", fan: 2, a2: true, a4: true, func: func_四归一, tip: "和牌中有4张不是杠牌而相同的牌"};
            map[fan_双同刻] = {shape: "", fan: 2, a2: false, a4: true, func: func_双同刻, tip: "和牌中，有2副序数相同的刻子（杠）"};
            map[fan_双暗刻] = {shape: "", fan: 2, a2: true, a4: true, func: func_双暗刻, tip: "和牌中，有2副暗刻序数相同"};
            map[fan_暗杠] = {shape: "", fan: 2, a2: true, a4: true, func: func_暗杠, tip: "自己抓到4张相同的牌开杠"};
            map[fan_断幺] = {shape: "", fan: 2, a2: true, a4: true, func: func_断幺, tip: "和牌中没有幺九以及字牌"};
            map[fan_一般高] = {shape: "", fan: 1, a2: true, a4: true, func: func_一般高, tip: "在和牌时，有2副由一种花色序数相同的顺子组成的牌"};
            map[fan_喜相逢] = {shape: "", fan: 1, a2: false, a4: true, func: func_喜相逢, tip: "在和牌时，有2副不同花色序数相同的顺子组成的牌"};
            map[fan_连六] = {shape: "", fan: 1, a2: true, a4: true, func: func_连六, tip: "在和牌时，有一种花色序数相连的6张牌组成的2副顺子"};
            map[fan_老少副] = {shape: "", fan: 1, a2: true, a4: true, func: func_老少副, tip: "在和牌时，有一种花色的123、789组成的顺子"};
            map[fan_幺九刻] = {shape: "", fan: 1, a2: true, a4: true, func: func_幺九刻, tip: "在和牌时，有三张相同的幺九牌、字牌组成的刻子（杠）"};
            map[fan_明杠] = {shape: "", fan: 1, a2: true, a4: true, func: func_明杠, tip: "他人打出一张与暗刻相同的牌开杠；或者自己抓入一张与明刻相同的牌开杠"};
            map[fan_缺一门] = {shape: "", fan: 1, a2: false, a4: true, func: func_缺一门, tip: "和牌中缺少一种花色序数牌" };
            map[fan_无字] = {shape: "", fan: 1, a2: false, a4: true, func: func_无字, tip: "和牌中没有字牌"};
            map[fan_边张] = {shape: "", fan: 1, a2: true, a4: true, func: func_边张, tip: "只能听和123中的3或者789中的7" };
            map[fan_坎张] = {shape: "", fan: 1, a2: true, a4: true, func: func_坎张, tip: "只能听和顺子中间的牌"};
            map[fan_单钓将] = {shape: "", fan: 1, a2: true, a4: true, func: func_单钓将, tip: "钓单张牌作将和牌" };
            map[fan_自摸] = {shape: "", fan: 1, a2: true, a4: true, func: func_自摸, tip: "抓牌形成和牌"};
            //map[fan_花牌] = {shape:"",fan: 1, a2: true, a4: true, func: func_花牌, tip: ""};
            return map;
        }

        private static function func_自摸():int {
            if (huInfo.anTarget != null) {
                return 1
            }
            return 0;
        }

        private static function func_天听():int {
            var opt:Vector.<IOpt> = status.opts;
            var preOpt:Vector.<IOpt> = new Vector.<IOpt>();
            for (var i:int = 0; i < opt.length; i++) {
                var opt1:IOpt = opt[i];
                if (opt1 is OptTing) {
                    break;
                }
            }
            if (preOpt.length == 1 && (preOpt[0] is OptFetch)) {
                return 64
            }
            return 0;
        }

        private static function func_地和():int {
            if (!status.zhuang && status.moPaiCnt == 1 && status.daPaiCnt == 0) {
                return 88;
            }
            return 0;
        }

        private static function func_天和():int {
            if (status.zhuang && status.moPaiCnt == 0 && status.daPaiCnt == 0) {
                return 88;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_花牌():int {
            return status.hua;
        }

        /**
         *
         */
        public static function func_单钓将():int {
            if (huInfo.jiang == null) {
                return 0;
            }
            if (huInfo.target != null) {
                if (huInfo.jiang.equal(huInfo.target)) {
                    if (huInfo.jiang.isNumCard()) {
                        //如果是数牌,需要看是不是单调这一张.
                        var cs:Vector.<MjCard> = getAllShowCardsExceptTarget();
                        for (var i:int = 0; i < cs.length; i++) {
                            var card:MjCard = cs[i];
                            if (card.type != huInfo.jiang.type) {
                                cs.splice(i, 1);
                                i--;
                            }
                        }
                        var tingCards:Vector.<MjCard> = MjEngine.getTingCards(cs);
                        if (tingCards.length == 1 && tingCards[0].equal(huInfo.jiang)) {
                            return 1;
                        }
                    } else {
                        //将是字,则正常
                        return 1
                    }
                }
            }
            return 0;
        }

        /**
         *
         */
        public static function func_坎张():int {
            //排除字
            if (!huInfo.target.isNumCard()) {
                return 0;
            }
            //排除1,9
            if (!huInfo.target.num == 1 || !huInfo.target.num == 9) {
                return 0;
            }
            var isCenter:Boolean = false;
            var shun:Vector.<Vector.<MjCard>> = huInfo.anShun.slice();
            for (var i:int = 0; i < shun.length; i++) {
                if (shun[i][1].equal(huInfo.target)) {
                    isCenter = true;
                    break;
                }
            }
            if (isCenter) {
                var cards:Vector.<MjCard> = status.cloneShowCards();
                if (huInfo.target.num - 2 >= 1) {
                    if (MjEngine.getCardCnt(cards, huInfo.target.type, huInfo.target.num - 2) > 0) {
                        return 0;
                    }
                }
                if (huInfo.target.num + 2 <= 9) {
                    if (MjEngine.getCardCnt(cards, huInfo.target.type, huInfo.target.num + 2) > 0) {
                        return 0;
                    }
                }
                return 1;
            } else {
                return 0;
            }
        }

        /**
         * 测试牌型
         * 11112233
         * 11122233
         * 111122223
         */
        public static function func_边张():int {
            var target:MjCard = huInfo.target;
            if (!target.isNumCard()) {
                return 0;
            }
            if (target.num != 3 && target.num != 7) {
                return 0;
            }
            var sc:Vector.<MjCard> = status.cloneShowCards();
            //为3时
            if (target.num == 3) {
                var t1:int = MjEngine.getCardCnt(sc, target.type, target.num - 2);
                //如果没有1
                if (t1 == 0) {
                    return 0;
                }
                var t2:int = MjEngine.getCardCnt(sc, target.type, target.num - 1);
                //如果没有2
                if (t2 == 0) {
                    return 0;
                }
                var t4:int = MjEngine.getCardCnt(sc, target.type, target.num + 1);
                //如果有4
                if (t4 > 0) {
                    return 0;
                }
                return 1;
            }
            if (target.num == 7) {
                var tt1:int = MjEngine.getCardCnt(sc, target.type, target.num + 2);
                //如果没有1
                if (tt1 == 0) {
                    return 0;
                }
                var tt2:int = MjEngine.getCardCnt(sc, target.type, target.num + 1);
                //如果没有2
                if (tt2 == 0) {
                    return 0;
                }
                var tt4:int = MjEngine.getCardCnt(sc, target.type, target.num - 1);
                //如果有4
                if (tt4 > 0) {
                    return 0;
                }
                return 1;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_无字():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                if (!all[i].isNumCard()) {
                    return 0;
                }
            }
            return 1;
        }

        /**
         *
         */
        public static function func_缺一门():int {
            var ar:Array = [];
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                ar[all[i].type] = 1;
            }
            if (int(ar[MjConst.type_wan]) + int(ar[MjConst.type_tong]) + int(ar[MjConst.type_tiao]) == 2) {
                return 1;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_明杠():int {
            if (status.mingGangCnt() == 1) {
                return 1;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_幺九刻():int {
            var ke:Vector.<MjCard> = getKeGang();
            var cnt:int = 0;
            var i:int = 0;
            for (i = 0; i < ke.length; i++) {
                var mjCard:MjCard = ke[i];
                if (mjCard.isNumCard()) {
                    if (mjCard.num == 1 || mjCard.num == 9) {
                        cnt++;
                    }
                }
                else {
                    cnt++;
                }
            }
            return cnt;
        }

        /**
         *
         */
        public static function func_老少副():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            shun.sort(MjEngine.sortShunsByTypeNum);
            var i:int = 0;
            for (i = 0; i < shun.length; i++) {
                var vs:Vector.<MjCard> = shun[i];
                if (vs[0].num != 1 && vs[0].num != 7) {
                    shun.splice(i, 1);
                    i--;
                }
            }
            if (shun.length < 2)return 0;
            for (i = 1; i < shun.length; i++) {
                if (shun[i][0].type == shun[i - 1][0].type && shun[i - 1][0].num == 1 && shun[i][0].num == 7) {
                    return 1;
                }
            }
            return 0;
        }

        /**
         *
         */
        public static function func_连六():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            if (shun.length < 2)return 0;
            shun.sort(MjEngine.sortShunsByTypeNum);
            var cnt:int = 0;
            while (shun.length > 1) {
                if (shun[0][0].type == shun[1][0].type) {
                    if (shun[0][0].num == shun[1][0].num - 3) {
                        cnt++;
                        shun.shift();
                        shun.shift();
                    }
                    else {
                        shun.shift();
                    }
                }
                else {
                    shun.shift();
                }
            }
            return cnt;
        }

        /**
         *
         */
        public static function func_喜相逢():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            for (var i:int = 0; i < shun.length; i++) {
                var vs:Vector.<MjCard> = shun[i];
                for (var j:int = i; j < shun.length; j++) {
                    var vs1:Vector.<MjCard> = shun[j];
                    if (vs[0].type != vs1[0].type) {
                        if (vs[0].num == vs1[0].num) {
                            return 1;
                        }
                    }
                }
            }
            return 0;
        }

        /**
         *
         */
        public static function func_一般高():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            if (shun.length < 2)return 0;
            shun.sort(MjEngine.sortShunsByTypeNum);
            var cnt:int = 0;
            while (shun.length > 1) {
                if (shun[0][0].type == shun[1][0].type) {
                    if (shun[0][0].num == shun[1][0].num) {
                        cnt++;
                        shun.shift();
                        shun.shift();
                    }
                    else {
                        shun.shift();
                    }
                }
                else {
                    shun.shift();
                }
            }
            return cnt;
        }

        /**
         *
         */
        public static function func_断幺():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (!mjCard.isNumCard()) {
                    return 0;
                }
                if (mjCard.num == 1 || mjCard.num == 9) {
                    return 0;
                }
            }
            return 2;
        }

        /**
         *
         */
        public static function func_暗杠():int {
            if (status.anGangCnt() == 1) {
                return 2;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_双暗刻():int {
            var ke:Vector.<MjCard> = new Vector.<MjCard>();
            ke = ke.concat(huInfo.getValidAnKe());
            ke = ke.concat(status.getAnGangCards());
            if (ke.length == 2) {
                return 2;
            }
            return 0;
        }

        /**
         */
        public static function func_双同刻():int {
            var ke:Vector.<MjCard> = getKe();
            for (var i:int = 0; i < ke.length; i++) {
                var card:MjCard = ke[i];
                if (!card.isNumCard()) {
                    ke.splice(i, 1);
                    i--;
                }
            }
            ke.sort(MjEngine.sortCardByNum);
            for (var j:int = 1; j < ke.length; j++) {
                var card1:MjCard = ke[j];
                if (card1.num == ke[j - 1].num) {
                    return 2;
                }
            }
            return 0;
        }

        /**
         *
         */
        public static function func_四归一():int {
            var show:Vector.<MjCard> = getAllCards();
            var len:uint = show.length;
            MjEngine.subSameCnt(show, 4);
            var len1:int = show.length;
            var gangCnt:int = status.mingGangCnt() + status.anGangCnt();
            if ((len - len1) > gangCnt * 4) {
                return 2
            }
            return 0;
        }

        /**
         *
         */
        public static function func_平和():int {
            if (huInfo.jiang == null) {
                return 0;
            }
            if (getShuns().length == 4) {
                if (huInfo.jiang.isNumCard()) {
                    return 2;
                }
            }
            return 0;
        }

        /**
         *
         */
        public static function func_门前清():int {
            if (status.cloneShowCards().length >= 13) {
                return 2;
            }
            return 0;
        }

        /**
         */
        public static function func_门风刻():int {
            var ke:Vector.<MjCard> = getKe();
            for (var i:int = 0; i < ke.length; i++) {
                var card:MjCard = ke[i];
                if (card.type == MjConst.type_feng) {
                    if (card.num == status.feng) {
                        return 2;
                    }
                }
            }
            return 0;
        }

        /**
         */
        public static function func_圈风刻():int {
            var ke:Vector.<MjCard> = getKe();
            for (var i:int = 0; i < ke.length; i++) {
                var card:MjCard = ke[i];
                if (card.isFeng()) {
                    if (card.num == MjRound.instance.quanFeng) {
                        return 2;
                    }
                }
            }
            return 0;
        }

        /**
         *
         */
        public static function func_箭刻():int {
            var ke:Vector.<MjCard> = getKe();
            var i:int = 0;
            for (i = 0; i < ke.length; i++) {
                var mjCard:MjCard = ke[i];
                if (mjCard.type == MjConst.type_se) {
                    return 2;
                }
            }
            return 0;
        }

        /**
         */
        public static function func_和绝张():int {
            if (func_抢杠和()) {
                return 0;
            }
            var cnt:int = MjRound.instance.getOpenCardCnt(huInfo.target);
            //别人打的. cnt中已经包含了
            if (cnt + status.getCardCntInShow(huInfo.target) == 4) {
                return 4;
            } else {
                return 0;
            }
        }

        /**
         *
         */
        public static function func_双明杠():int {
            if (status.mingGangCnt() == 2) {
                return 4;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_不求人():int {
            if (func_门前清() && func_自摸()) {
                return 4
            }
            return 0;
        }

        /**
         *
         */
        public static function func_全带幺():int {
            if (huInfo.jiang == null) {
                return 0;
            }
            if (huInfo.jiang.isNumCard() && huInfo.jiang.num != 1) {
                return 0;
            }
            var ke:Vector.<MjCard> = getKeGang();
            for (var i:int = 0; i < ke.length; i++) {
                var card:MjCard = ke[i];
                if (card.isNumCard()) {
                    if (card.num != 1) {
                        return 0;
                    }
                }
            }
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            for (var j:int = 0; j < shun.length; j++) {
                if (shun[j][0].num != 1) {
                    return 0;
                }
            }
            return 4;
        }

        /**
         *
         */
        public static function func_双箭刻():int {
            var all:Vector.<MjCard> = getKeGang();
            var cnt:int = 0;
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (mjCard.type == MjConst.type_se) {
                    cnt++;
                }
            }
            if (cnt == 2) {
                return 6;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_双暗杠():int {
            if (status.anGangCnt() == 2) {
                return 6;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_全求人():int {
            if (status.cloneShowCards().length == 1 && huInfo.mingTarget != null && status.anGangCnt() == 0) {
                return 6;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_五门齐():int {
            var types:Array = [false, false, false, false, false];
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                types[all[i].type - 1] = true;
            }
            for (i = 0; i < 5; i++) {
                if (!types[i]) {
                    return 0;
                }
            }
            return 6;
        }

        /**
         */
        public static function func_三色三步高():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            shun.sort(MjEngine.sortShunsByNum);
            for (var i:int = 0; i < shun.length; i++) {
                var s:Vector.<MjCard> = shun[i];
                var t1:Boolean = false;
                var type1:int = -1;
                var t2:Boolean = false;
                for (var j:int = i + 1; j < shun.length; j++) {
                    var s1:Vector.<MjCard> = shun[j];
                    if (!t1) {
                        if (s[0].type != s1[0].type) {
                            if (s[0].num + 1 == s1[0].num) {
                                t1 = true;
                                type1 = s1[0].type;
                            }
                        }
                    } else {
                        if (s[0].type != s1[0].type && s1[0].type != type1) {
                            if (s[0].num + 2 == s1[0].num) {
                                t2 = true;
                            }
                        }
                    }
                }
                if (t1 && t2) {
                    return 6;
                }
            }
            return 0;
        }

        /**
         *
         */
        public static function func_混一色():int {
            var all:Vector.<MjCard> = getAllCards();
            var ncs:Vector.<MjCard> = new Vector.<MjCard>();
            var hasFengSe:Boolean;
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (mjCard.isNumCard()) {
                    ncs.push(mjCard);
                } else {
                    hasFengSe = true;
                }
            }
            if (!hasFengSe) {
                return 0;
            }
            if (ncs.length <= 0) {
                return 0;
            }
            var firstCard:MjCard = ncs[0];
            for (i = 1; i < ncs.length; i++) {
                if (ncs[i].type != firstCard.type) {
                    return 0;
                }
            }
            return 6;
        }

        /**
         *
         */
        public static function func_碰碰和():int {
            if (status.pengCnt() + status.anGangCnt() + status.mingGangCnt() == 4) {
                return 6;
            }
            return 0;
        }

        /**
         */
        public static function func_三色三节高():int {
            var ke:Vector.<MjCard> = new Vector.<MjCard>();
            ke = ke.concat(huInfo.anKe);
            ke = ke.concat(status.getPengCards());
            for (var m:int = 0; m < ke.length; m++) {
                if (!ke[m].isNumCard()) {
                    ke.splice(m, 1);
                    m--;
                }
            }
            if (ke.length >= 3) {
                ke.sort(MjEngine.sortCardByNum);
                for (var i:int = 0; i < ke.length; i++) {
                    var card:MjCard = ke[i];
                    var t1:Boolean = false;
                    var type1:int = -1;
                    var t2:Boolean = false;
                    for (var j:int = i + 1; j < ke.length; j++) {
                        var card1:MjCard = ke[j];
                        if (!t1) {
                            if (card.type != card1.type) {
                                if (card.num + 1 == card1.num) {
                                    t1 = true;
                                    type1 = card1.type;
                                }
                            }
                        } else {
                            if (card.type != card1.type && card1.type != type1) {
                                if (card.num + 2 == card1.num) {
                                    t2 = true;
                                }
                            }
                        }
                    }
                    if (t1 && t2) {
                        return 8;
                    }
                }
            }
            return 0;
        }

        /**
         */
        public static function func_抢杠和():int {
            if (huInfo.qiangGang) {
                return 8
            }
            return 0;
        }

        /**
         */
        public static function func_杠上开花():int {
            if (huInfo.anTarget != null && huInfo.justGang) {
                return 8;
            }
            return 0;
        }

        /**
         */
        public static function func_海底捞月():int {
            if (huInfo.anTarget != null && !MjRound.instance.hasCard()) {
                return 8;
            }
            return 0;
        }

        /**
         */
        public static function func_妙手回春():int {
            if (huInfo.mingTarget != null && !MjRound.instance.hasCard()) {
                return 8;
            }
            return 0;
        }

        /**
         */
        public static function func_三色三同顺():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            shun.sort(MjEngine.sortShunsByNum);
            for (var i:int = 0; i < shun.length; i++) {
                var s:Vector.<MjCard> = shun[i];
                var t1:Boolean = false;
                var type1:int = -1;
                var t2:Boolean = false;
                for (var j:int = i + 1; j < shun.length; j++) {
                    var s1:Vector.<MjCard> = shun[j];
                    if (!t1) {
                        if (s[0].type != s1[0].type) {
                            if (s[0].num == s1[0].num) {
                                t1 = true;
                                type1 = s1[0].type;
                            }
                        }
                    } else {
                        if (s[0].type != s1[0].type && s1[0].type != type1) {
                            if (s[0].num == s1[0].num) {
                                t2 = true;
                            }
                        }
                    }
                }
                if (t1 && t2) {
                    return 8;
                }
            }
            return 0;
        }

        /**
         */
        public static function func_推不倒():int {
            var cs:Vector.<MjCard> = new Vector.<MjCard>();
            cs.push(new MjCard(MjConst.type_tong, 1));
            cs.push(new MjCard(MjConst.type_tong, 2));
            cs.push(new MjCard(MjConst.type_tong, 3));
            cs.push(new MjCard(MjConst.type_tong, 4));
            cs.push(new MjCard(MjConst.type_tong, 5));
            cs.push(new MjCard(MjConst.type_tong, 8));
            cs.push(new MjCard(MjConst.type_tong, 9));
            cs.push(new MjCard(MjConst.type_tiao, 2));
            cs.push(new MjCard(MjConst.type_tiao, 4));
            cs.push(new MjCard(MjConst.type_tiao, 5));
            cs.push(new MjCard(MjConst.type_tiao, 6));
            cs.push(new MjCard(MjConst.type_tiao, 8));
            cs.push(new MjCard(MjConst.type_tiao, 9));
            cs.push(new MjCard(MjConst.type_se, MjConst.type_se_bai));
            ///
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                if (MjEngine.getCardCntByCard(cs, all[i]) == 0) {
                    return 0;
                }
            }
            return 8;
        }

        /**
         */
        public static function func_花龙():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            for (var i:int = 0; i < shun.length; i++) {
                var obj:Vector.<MjCard> = shun[i];
                if (obj[0].num != 1 && obj[0].num != 4 && obj[0].num != 7) {
                    shun.splice(i, 1);
                    i--;
                }
            }
            shun.sort(MjEngine.sortShunsByTypeNum);
            for (var j:int = 1; j < shun.length; j++) {
                if (shun[j][0].type == shun[j - 1][0].type) {
                    shun.splice(j, 1);
                    j--;
                }
            }
            if (shun.length < 3) {
                return 0;
            }
            shun.sort(MjEngine.sortShunsByNum);
            for (var k:int = 1; k < shun.length; k++) {
                if (shun[k][0].num == shun[k - 1][0].num) {
                    shun.splice(k, 1);
                    k--;
                }
            }
            if (shun.length < 3) {
                return 0;
            }
            return 8;
        }

        /**
         *
         */
        public static function func_三风刻():int {
            var ke:Vector.<MjCard> = getKeGang();
            var cnt:int = 0;
            for (var j:int = 0; j < ke.length; j++) {
                var card:MjCard = ke[j];
                if (card.isFeng()) {
                    cnt++;
                }
            }
            if (cnt >= 3) {
                return 12;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_小于五():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (!mjCard.isNumCard())return 0;
                if (mjCard.num > 4) {
                    return 0;
                }
            }
            return 12;
        }

        /**
         *
         */
        public static function func_大于五():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (!mjCard.isNumCard())return 0;
                if (mjCard.num < 6) {
                    return 0;
                }
            }
            return 12;
        }

        /**
         *
         */
        public static function func_组合龙():int {
            if (is组合龙(getShowAndTarget())) {
                return 12;
            }
            return 0;
        }

        public static function is组合龙(cards:Vector.<MjCard>):Boolean {
            var cs:Vector.<MjCard> = cards.slice();
            var array:Array = has组合龙(cs);
            if (array == null) {
                return false;
            }
            sub组合龙(cs, array);
            //先删除组合龙的牌.再看剩下的能不能胡.
            if (MjEngine.getHuInfos(cs, 0).length > 0) {
                return true;
            }
            return false;
        }

        public static function sub组合龙(cs:Vector.<MjCard>, array:Array):void {
            for (var i:int = 1; i < array.length; i++) {
                var ar1:Array = array[i];
                for (var j:int = 0; j < ar1.length; j++) {
                    MjEngine.subSpecialCnt(cs, new MjCard(i, ar1[j]), 1);
                }
            }
        }

        /**
         *
         * @param cards
         * @return  [type]=147|258|369
         */
        public static function has组合龙(cards:Vector.<MjCard>):Array {
            if(cards.length<9)return null;
            var cc:Vector.<MjCard> = cards.slice();
            cc.sort(MjEngine.sortCardByTypeNum);
            var wanCards:Vector.<MjCard> = new Vector.<MjCard>();
            var tongCards:Vector.<MjCard> = new Vector.<MjCard>();
            var tiaoCards:Vector.<MjCard> = new Vector.<MjCard>();
            for (var i:int = 0; i < cc.length; i++) {
                var card:MjCard = cc[i];
                if (!card.isNumCard()) {
                    cc.splice(i, 1);
                    i--;
                } else {
                    if (card.type == MjConst.type_wan) {
                        wanCards.push(card)
                    } else if (card.type == MjConst.type_tong) {
                        tongCards.push(card)
                    } else {
                        tiaoCards.push(card);
                    }
                }
            }
            if (wanCards.length < 3 || tongCards.length < 3 || tiaoCards.length < 3) {
                return null;
            }
            //排序
            var cs:Vector.<Vector.<MjCard>> = new <Vector.<MjCard>>[wanCards, tongCards, tiaoCards];
            cs.sort(function (v1:Vector.<MjCard>, v2:Vector.<MjCard>):int {
                if (v1.length < v2.length) {
                    return -1;
                } else if (v1.length == v2.length) {
                    return 0
                } else {
                    return 1;
                }
            });
            var ars:Array = [
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9]
            ];
            var retArray:Array = [];
            for (var m:int = 0; m < cs.length; m++) {
                var obj:Vector.<MjCard> = cs[m];
                for (var mmm:int = 0; mmm < ars.length; mmm++) {
                    var shun:Array = ars[mmm];
                    var has:Boolean = MjEngine.hasNum(obj, shun);
                    if (has) {
                        retArray[obj[0].type] = shun;
                        ars.splice(mmm, 1);
                        cs.splice(m, 1);
                        m--;
                        break;
                    }
                }
            }
            if (cs.length == 0) {
                return retArray;
            }
            return null;
        }

        /**
         */
        public static function func_全不靠():int {
            if (is全不靠(getAllCards())) {
                return 12
            }
            return 0;
        }

        public static function is全不靠(cards:Vector.<MjCard>):Boolean {
            var ts:Vector.<MjCard> = cards.slice();
            ts.sort(MjEngine.sortCardByTypeNum);
            if (ts.length != 14) {
                return false;
            }
            //有对就不正确
            for (var kk:int = 1; kk < ts.length; kk++) {
                if(ts[kk].equal(ts[kk-1])){
                    return false;
                }
            }
            //数字牌不能有重复数字的.并且每种类型之间间隔至少为4
            var numCards:Vector.<MjCard> = new Vector.<MjCard>();
            var wanCards:Vector.<MjCard> = new Vector.<MjCard>();
            var tongCards:Vector.<MjCard> = new Vector.<MjCard>();
            var tiaoCards:Vector.<MjCard> = new Vector.<MjCard>();
            for (var i:int = 0; i < ts.length; i++) {
                if (ts[i].isNumCard()) {
                    numCards.push(ts[i]);
                    if (ts[i].type == MjConst.type_wan) {
                        wanCards.push(ts[i]);
                    }else if (ts[i].type == MjConst.type_tong) {
                        tongCards.push(ts[i]);
                    }else if (ts[i].type == MjConst.type_tiao) {
                        tiaoCards.push(ts[i]);
                    }
                }
            }
            if (wanCards.length <= 3 && tongCards.length <= 3 && tiaoCards.length <= 3) {
                numCards.sort(MjEngine.sortCardByNum);
                for (var j:int = 1; j < numCards.length; j++) {
                    if (numCards[j].num == numCards[j - 1].num) {
                        return false
                    }
                }
                var k:int = 1;
                for (k = 1; k < wanCards.length; k++) {
                    if (wanCards[k].num - wanCards[k - 1].num < 3) {
                        return false
                    }
                }
                for (k = 1; k < tongCards.length; k++) {
                    if (tongCards[k].num - tongCards[k - 1].num < 3) {
                        return false
                    }
                }
                for (k = 1; k < tiaoCards.length; k++) {
                    if (tiaoCards[k].num - tiaoCards[k - 1].num < 3) {
                        return false
                    }
                }
                var allShape:Vector.<Vector.<MjCard>>=MjEngine.getBuKao();
                for (var mm:int = 0; mm < allShape.length; mm++) {
                    var obj:Vector.<MjCard> = allShape[mm];
                    if(MjEngine.subContain(obj,numCards)){
                        return true;
                    }
                }
                return false;
                //
            } else {
                return false
            }
        }

        /**
         *
         */
        public static function func_三暗刻():int {
            var ke:Vector.<MjCard> = new Vector.<MjCard>();
            ke = ke.concat(huInfo.getValidAnKe());
            ke = ke.concat(status.getAnGangCards());
            if (ke.length == 3) {
                return 16;
            }
            return 0;
        }

        /**
         */
        public static function func_三同刻():int {
            var ke:Vector.<MjCard> = new Vector.<MjCard>();
            ke = ke.concat(status.getPengCards());
            ke = ke.concat(huInfo.anKe);
            ke = ke.concat(status.getMingGangCards());
            ke = ke.concat(status.getAnGangCards());
            for (var i:int = 1; i < 10; i++) {
                var cnt:int = 0;
                for (var j:int = 0; j < ke.length; j++) {
                    var card:MjCard = ke[j];
                    if (card.isNumCard()) {
                        if (card.num == i) {
                            cnt++;
                        }
                    }
                }
                if (cnt == 3) {
                    return 16;
                }
            }
            return 0;
        }

        /**
         */
        public static function func_全带五():int {
            var groupCnt:int = 0;
            var ke:Vector.<MjCard> = getKeGang();
            groupCnt += ke.length;
            for (var i:int = 0; i < ke.length; i++) {
                var card:MjCard = ke[i];
                if (!card.isNumCard()) {
                    return 0;
                }
                if (card.num != 5) {
                    return 0;
                }
            }
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            groupCnt += shun.length;
            for (var j:int = 0; j < shun.length; j++) {
                var cs:Vector.<MjCard> = shun[j];
                var has:Boolean = false;
                for (var jj:int = 0; jj < cs.length; jj++) {
                    var card1:MjCard = cs[jj];
                    if (card1.isNumCard() && card1.num == 5) {
                        has = true;
                    }
                }
                if (!has) {
                    return 0;
                }
            }
            if (groupCnt < 4) {
                return 0;
            }
            if (huInfo.jiang == null) {
                return 0;
            }
            if (!huInfo.jiang.isNumCard()) {
                return 0;
            }
            if (huInfo.jiang.num != 5) {
                return 0;
            }
            return 16;
        }

        /**
         */
        public static function func_一色三步高():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            shun.sort(MjEngine.sortShunsByTypeNum);
            if (shun.length < 3) {
                return 0;
            }
            if (shun[0][0].type == shun[1][0].type && shun[0][0].type == shun[2][0].type) {
                shun = shun.slice(0, 3);
            } else if (shun.length == 4 && shun[3][0].type == shun[1][0].type && shun[1][0].type == shun[2][0].type) {
                shun = shun.slice(1, 4);
            } else {
                shun = new Vector.<Vector.<MjCard>>();
            }
            if (shun.length == 3) {
                if (shun[1][0].num == shun[0][0].num + 1 && shun[2][0].num == shun[1][0].num + 1) {
                    return 16;
                }
                if (shun[1][0].num == shun[0][0].num + 2 && shun[2][0].num == shun[1][0].num + 2) {
                    return 16;
                }
            }
            return 0;
        }

        /**
         */
        public static function func_三色双龙会():int {
            if (huInfo.jiang == null) {
                return 0;
            }
            if (huInfo.jiang.num != 5) {
                return 0;
            }
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            if (shun.length != 4) {
                return 0;
            }
            for (var i:int = 0; i < shun.length; i++) {
                var cs:Vector.<MjCard> = shun[i];
                if (cs[0].type == huInfo.jiang.type) {
                    return 0;
                }
                if (cs[0].num != 1 && cs[0].num != 7) {
                    return 0;
                }
            }
            shun.sort(MjEngine.sortShunsByNum);
            if (shun[0][0].type == shun[1][0].type) {
                return 0;
            }
            if (shun[2][0].type == shun[3][0].type) {
                return 0;
            }
            return 16;
        }

        /**
         *
         */
        public static function func_清龙():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            if (shun.length < 3) {
                return 0;
            }
            shun.sort(MjEngine.sortShunsByTypeNum);
            while (shun.length >= 3) {
                if (shun[0][0].type == shun[1][0].type && shun[0][0].type == shun[2][0].type && shun[0][0].num == shun[1][0].num - 3 && shun[1][0].num == shun[2][0].num - 3) {
                    return 16;
                }
                else {
                    shun.shift();
                }
            }
            return 0;
        }

        /**
         *
         */
        public static function func_全小():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (!mjCard.isNumCard()) {
                    return 0;
                }
                if (mjCard.num > 3) {
                    return 0;
                }
            }
            return 24;
        }

        /**
         *
         */
        public static function func_全中():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (!mjCard.isNumCard()) {
                    return 0;
                }
                if (mjCard.num > 6 || mjCard.num < 4) {
                    return 0;
                }
            }
            return 24;
        }

        /**
         *
         */
        public static function func_全大():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (!mjCard.isNumCard()) {
                    return 0;
                }
                if (mjCard.num < 7) {
                    return 0;
                }
            }
            return 24;
        }

        /**
         *
         */
        public static function func_一色三节高():int {
            var ke:Vector.<MjCard> = getKeGang();
            ke.sort(MjEngine.sortCardByTypeNum);
            var len:int = ke.length;
            MjEngine.subLine(ke);
            if (ke.length != len) {
                return 24;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_一色三同顺():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            //
            if (shun.length < 3)return 0;
            shun.sort(MjEngine.sortShunsByTypeNum);
            while (shun.length >= 3) {
                if (shun[0][0].equal(shun[1][0])) {
                    if (shun[0][0].equal(shun[2][0])) {
                        return 24;
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    shun.shift();
                }
            }
            return 0;
        }

        /**
         *
         */
        public static function func_清一色():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (!mjCard.isNumCard())return 0;
                if (i > 0) {
                    if (mjCard.type != all[i - 1].type) {
                        return 0;
                    }
                }
            }
            return 24;
        }

        /**
         */
        public static function func_全双刻():int {
            var ke:Vector.<MjCard> = new Vector.<MjCard>();
            ke = ke.concat(huInfo.anKe);
            ke = ke.concat(status.getPengCards());
            if (huInfo.jiang != null) {
                ke.push(huInfo.jiang);
            }
            if (ke.length != 5) {
                return 0;
            }
            for (var i:int = 0; i < ke.length; i++) {
                var card:MjCard = ke[i];
                if (!card.isNumCard()) {
                    return 0;
                }
                if (card.num % 2 != 0) {
                    return 0;
                }
            }
            return 24;
        }

        /**
         *
         */
        public static function func_七星不靠():int {
            if (!is七星不靠(getShowAndTarget())) {
                return 0;
            }
            return 24;
        }

        public static function is七星不靠(cards:Vector.<MjCard>):Boolean {
            if (!is全不靠(cards)) {
                return false;
            }
            if (MjEngine.getCardCnt(cards, MjConst.type_feng, MjConst.type_feng_dong) != 1) {
                return false;
            }
            if (MjEngine.getCardCnt(cards, MjConst.type_feng, MjConst.type_feng_nan) != 1) {
                return false;
            }
            if (MjEngine.getCardCnt(cards, MjConst.type_feng, MjConst.type_feng_xi) != 1) {
                return false;
            }
            if (MjEngine.getCardCnt(cards, MjConst.type_feng, MjConst.type_feng_bei) != 1) {
                return false;
            }
            if (MjEngine.getCardCnt(cards, MjConst.type_se, MjConst.type_se_hong) != 1) {
                return false;
            }
            if (MjEngine.getCardCnt(cards, MjConst.type_se, MjConst.type_se_fa) != 1) {
                return false;
            }
            if (MjEngine.getCardCnt(cards, MjConst.type_se, MjConst.type_se_bai) != 1) {
                return false;
            }
            return true;
        }

        /**
         *
         */
        public static function func_七对():int {
            if (func_门前清() == 0) {
                return 0;
            }
            if (is七对(getShowAndTarget())) {
                return 24;
            }
            return 0;
        }

        public static function is七对(cards:Vector.<MjCard>):Boolean {
            var all:Vector.<MjCard> = cards.slice();
            if (all.length != 14) {
                return false;
            }
            all.sort(MjEngine.sortCardByTypeNum);
            var i:int = 0;
            for (i = 0; i < all.length; i += 2) {
                if (!all[i].equal(all[i + 1])) {
                    return false;
                }
            }
            return true;
        }

        /**
         *
         */
        public static function func_混幺九():int {
            var ke:Vector.<MjCard> = getKeGang();
            if (huInfo.jiang == null) {
                return 0;
            }
            ke.push(huInfo.jiang);
            if (ke.length != 5) {
                return 0;
            }
            for (var i:int = 0; i < ke.length; i++) {
                var card:MjCard = ke[i];
                if (card.isNumCard()) {
                    if (card.num != 1 && card.num != 9) {
                        return 0;
                    }
                }
            }
            return 32;
        }

        /**
         *
         */
        public static function func_三杠():int {
            if (status.mingGangCnt() + status.anGangCnt() == 3) {
                return 32;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_一色四步高():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            if (shun.length != 4) {
                return 0;
            }
            var i:int = 0;
            for (i = 0; i < shun.length; i++) {
                var vs:Vector.<MjCard> = shun[i];
                if (i > 0) {
                    if (vs[0].type != shun[0][0].type) {
                        return 0;
                    }
                }
            }
            shun.sort(MjEngine.sortShunsByTypeNum);
            //
            var cc:int = shun[1][0].num - shun[0][0].num;
            for (i = 0; i < shun.length; i++) {
                var vs1:Vector.<MjCard> = shun[i];
                if (i > 0) {
                    if (vs1[0].num - shun[i - 1][0].num != cc) {
                        return 0;
                    }
                }
            }
            return 32;
        }

        /**
         *
         */
        public static function func_一色四节高():int {
            var ke:Vector.<MjCard> = getKeGang();
            for (var j:int = 0; j < ke.length; j++) {
                var card1:MjCard = ke[j];
                if (!card1.isNumCard()) {
                    ke.splice(j, 1);
                    j--;
                }
            }
            if (ke.length >= 4) {
                ke.sort(MjEngine.sortCardByTypeNum);
                var first:MjCard = ke[0];
                for (var i:int = 1; i < ke.length; i++) {
                    var card:MjCard = ke[i];
                    if (card.type != first.type) {
                        return 0;
                    }
                    if (card.num != first.num + i) {
                        return 0;
                    }
                }
                return 48;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_一色四同顺():int {
            var shun:Vector.<Vector.<MjCard>> = getShuns();
            if (shun.length != 4) {
                return 0;
            }
            var i:int = 0;
            for (i = 0; i < shun.length; i++) {
                var vs:Vector.<MjCard> = shun[i];
                vs.sort(MjEngine.sortCardByNum);
                if (i > 0) {
                    if (!vs[0].equal(shun[0][0])) {
                        return 0;
                    }
                }
            }
            return 48;
        }

        /**
         *
         */
        public static function func_一色双龙会():int {
            if (!func_七对()) {
                return 0;
            }
            var cards:Vector.<MjCard> = getAllCards();
            if (!MjEngine.isSameType(cards)) {
                return 0
            }
            cards.sort(MjEngine.sortCardByNum);
            if (cards[0].num != 1)return 0;
            if (cards[1 * 2].num != 2)return 0;
            if (cards[2 * 2].num != 3)return 0;
            if (cards[3 * 2].num != 5)return 0;
            if (cards[4 * 2].num != 7)return 0;
            if (cards[5 * 2].num != 8)return 0;
            if (cards[6 * 2].num != 9)return 0;
            return 64;
        }

        /**
         *
         */
        public static function func_四暗刻():int {
            var cnt:int = huInfo.getValidAnKe().length;
            cnt += status.anGangCnt();
            if (cnt == 4) {
                return 64;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_字一色():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (mjCard.isNumCard()) {
                    return 0;
                }
            }
            return 64;
        }

        /**
         *
         */
        public static function func_小三元():int {
            if (huInfo.jiang == null) {
                return 0;
            }
            if (!huInfo.jiang.isSe()) {
                return 0;
            }
            var ke:Vector.<MjCard> = getKeGang();
            var cnt:int = 0;
            if (MjEngine.getCardCnt(ke, MjConst.type_se, MjConst.type_se_hong) > 0)cnt++;
            if (MjEngine.getCardCnt(ke, MjConst.type_se, MjConst.type_se_fa) > 0)cnt++;
            if (MjEngine.getCardCnt(ke, MjConst.type_se, MjConst.type_se_bai) > 0)cnt++;
            if (cnt == 2) {
                return 64;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_小四喜():int {
            if (huInfo.jiang == null) {
                return 0;
            }
            if (!huInfo.jiang.isFeng()) {
                return 0;
            }
            var ke:Vector.<MjCard> = getKeGang();
            var cnt:int = 0;
            if (MjEngine.getCardCnt(ke, MjConst.type_feng, MjConst.type_feng_dong) > 0)cnt++;
            if (MjEngine.getCardCnt(ke, MjConst.type_feng, MjConst.type_feng_nan) > 0)cnt++;
            if (MjEngine.getCardCnt(ke, MjConst.type_feng, MjConst.type_feng_xi) > 0)cnt++;
            if (MjEngine.getCardCnt(ke, MjConst.type_feng, MjConst.type_feng_dong) > 0)cnt++;
            if (cnt == 4) {
                return 64;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_清幺九():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (!mjCard.isNumCard()) {
                    return 0;
                }
                if (mjCard.num != 1 && mjCard.num != 9) {
                    return 0;
                }
            }
            return 64;
        }

        /**
         */
        public static function func_十三幺():int {
            if (!is十三幺(getShowAndTarget())) {
                return 0;
            }
            return 88;
        }

        public static function is十三幺(show:Vector.<MjCard>):Boolean {
            if(show.length!=14){
                return false;
            }
            var vs:Vector.<MjCard> = new Vector.<MjCard>();
            vs.push(new MjCard(MjConst.type_wan, 1));
            vs.push(new MjCard(MjConst.type_wan, 9));
            vs.push(new MjCard(MjConst.type_tong, 1));
            vs.push(new MjCard(MjConst.type_tong, 9));
            vs.push(new MjCard(MjConst.type_tiao, 1));
            vs.push(new MjCard(MjConst.type_tiao, 9));
            vs.push(new MjCard(MjConst.type_feng, MjConst.type_feng_dong));
            vs.push(new MjCard(MjConst.type_feng, MjConst.type_feng_nan));
            vs.push(new MjCard(MjConst.type_feng, MjConst.type_feng_xi));
            vs.push(new MjCard(MjConst.type_feng, MjConst.type_feng_bei));
            vs.push(new MjCard(MjConst.type_se, MjConst.type_se_hong));
            vs.push(new MjCard(MjConst.type_se, MjConst.type_se_fa));
            vs.push(new MjCard(MjConst.type_se, MjConst.type_se_bai));
            //
            var hasDui:Boolean = false;
            for (var i:int = 0; i < vs.length; i++) {
                var card:MjCard = vs[i];
                var cnt:int = MjEngine.getCardCntByCard(show, card);
                if (cnt == 0) {
                    return false;
                }
                if (cnt == 2) {
                    hasDui = true;
                }
            }
            if (hasDui) {
                return true;
            }
            return false;
        }

        /**
         *
         */
        public static function func_连七对():int {
            if (func_七对() == 0) {
                return 0;
            }
            var all:Vector.<MjCard> = getAllCards();
            for (var i:int = 1; i < all.length; i++) {
                if (all[i].type != all[0].type) {
                    return 0;
                }
                if (i % 2 == 0) {
                    if (all[i].num != all[i - 1].num + 1) {
                        return 0;
                    }
                }
            }
            return 88;
        }

        /**
         *
         */
        public static function func_四杠():int {
            if (status.anGangCnt() + status.mingGangCnt() == 4) {
                return 88;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_九莲宝灯():int {
            if (!func_门前清()) {
                return 0;
            }
            var cards:Vector.<MjCard> = getAllCards();
            var cardType:int = cards[0].type;
            for (var i:int = 1; i < cards.length; i++) {
                if (cards[i].type != cardType) {
                    return 0;
                }
            }
            var cs:Vector.<MjCard> = new <MjCard>[
                new MjCard(cardType, 1),
                new MjCard(cardType, 1),
                new MjCard(cardType, 1),
                new MjCard(cardType, 2),
                new MjCard(cardType, 3),
                new MjCard(cardType, 4),
                new MjCard(cardType, 5),
                new MjCard(cardType, 6),
                new MjCard(cardType, 7),
                new MjCard(cardType, 8),
                new MjCard(cardType, 9),
                new MjCard(cardType, 9),
                new MjCard(cardType, 9)
            ];
            if (MjEngine.subContain(cards, cs)) {
                return 88;
            }
            return 0;
        }

        /**
         *
         */
        public static function func_绿一色():int {
            var all:Vector.<MjCard> = getAllCards();
            var i:int = 0;
            for (i = 0; i < all.length; i++) {
                var mjCard:MjCard = all[i];
                if (mjCard.type == MjConst.type_tiao) {//条
                    if ([2, 3, 4, 6, 8].indexOf(mjCard.num) == -1) {
                        return 0;
                    }
                }
                else if (mjCard.type == MjConst.type_se) {
                    if (mjCard.num != MjConst.type_se_fa) {
                        return 0;
                    }
                }
                else {
                    return 0;
                }
            }
            return 88;
        }

        /**
         *
         */
        public static function func_大三元():int {
            var ke:Vector.<MjCard> = getKeGang();
            if (ke.length >= 3) {
                var cnt:int = 0;
                for (var i:int = 0; i < ke.length; i++) {
                    var card:MjCard = ke[i];
                    if (card.isSe()) {
                        cnt++;
                    }
                }
                if (cnt == 3) {
                    return 88;
                }
            }
            return 0;
        }

        /**
         *
         */
        public static function func_大四喜():int {
            var ke:Vector.<MjCard> = getKeGang();
            if (ke.length == 4) {
                for (var i:int = 0; i < ke.length; i++) {
                    var card:MjCard = ke[i];
                    if (!card.isFeng()) {
                        return 0;
                    }
                }
                return 88;
            }
            return 0;
        }

        private static function getShuns():Vector.<Vector.<MjCard>> {
            var shun:Vector.<Vector.<MjCard>> = new Vector.<Vector.<MjCard>>();
            shun = shun.concat(status.getChiCards());
            shun = shun.concat(huInfo.anShun);
            return shun;
        }

        private static function getKeGang():Vector.<MjCard> {
            var ke:Vector.<MjCard> = getKe();
            ke = ke.concat(status.getAnGangCards());
            ke = ke.concat(status.getMingGangCards());
            return ke;
        }

        private static function getKe():Vector.<MjCard> {
            var ke:Vector.<MjCard> = huInfo.anKe.slice();
            ke = ke.concat(status.getPengCards());
            return ke;
        }

        private static function getShowAndTarget():Vector.<MjCard> {
            var c:Vector.<MjCard> = status.cloneShowCards();
            if (huInfo.mingTarget != null) {
                c.push(huInfo.mingTarget);
            }
            return c;
        }

        private static function getAllCards():Vector.<MjCard> {
            var c:Vector.<MjCard> = status.getAllCards();
            if (huInfo.mingTarget != null) {
                c.push(huInfo.mingTarget);
            }
            return c;
        }

        private static function getAllCardsExceptTarget():Vector.<MjCard> {
            var c:Vector.<MjCard> = status.getAllCards();
            if (huInfo.anTarget != null) {
                MjEngine.subSpecialCnt(c, huInfo.anTarget, 1);
            }
            return c;
        }

        private static function getAllShowCardsExceptTarget():Vector.<MjCard> {
            var c:Vector.<MjCard> = status.cloneShowCards();
            if (huInfo.anTarget != null) {
                MjEngine.subSpecialCnt(c, huInfo.anTarget, 1);
            }
            return c;
        }
    }
}
