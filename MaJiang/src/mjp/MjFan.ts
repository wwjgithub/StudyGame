

class MjFan {
    static fanmap;
    static huInfo;
    static status: MjPlayer;
    //
    static fan_天和: string = "天和";
    static fan_地和: string = "地和";
    static fan_天听: string = "天听";
    static fan_大四喜: string = "大四喜";
    static fan_大三元: string = "大三元";
    static fan_绿一色: string = "绿一色";
    static fan_九莲宝灯: string = "九莲宝灯";
    static fan_四杠: string = "四杠";
    static fan_连七对: string = "连七对";
    static fan_十三幺: string = "十三幺";
    static fan_清幺九: string = "清幺九";
    static fan_小四喜: string = "小四喜";
    static fan_小三元: string = "小三元";
    static fan_字一色: string = "字一色";
    static fan_四暗刻: string = "四暗刻";
    static fan_一色双龙会: string = "一色双龙会";
    static fan_一色四同顺: string = "一色四同顺";
    static fan_一色四节高: string = "一色四节高";
    static fan_一色四步高: string = "一色四步高";
    static fan_三杠: string = "三杠";
    static fan_混幺九: string = "混幺九";
    static fan_七对: string = "七对";
    static fan_七星不靠: string = "七星不靠";
    static fan_全双刻: string = "全双刻";
    static fan_清一色: string = "清一色";
    static fan_一色三同顺: string = "一色三同顺";
    static fan_一色三节高: string = "一色三节高";
    static fan_全大: string = "全大";
    static fan_全中: string = "全中";
    static fan_全小: string = "全小";
    static fan_清龙: string = "清龙";
    static fan_三色双龙会: string = "三色双龙会";
    static fan_一色三步高: string = "一色三步高";
    static fan_全带五: string = "全带五";
    static fan_三同刻: string = "三同刻";
    static fan_三暗刻: string = "三暗刻";
    static fan_全不靠: string = "全不靠";
    static fan_组合龙: string = "组合龙";
    static fan_大于五: string = "大于五";
    static fan_小于五: string = "小于五";
    static fan_三风刻: string = "三风刻";
    static fan_花龙: string = "花龙";
    static fan_推不倒: string = "推不倒";
    static fan_三色三同顺: string = "三色三同顺";
    static fan_无番: string = "无番";
    static fan_妙手回春: string = "妙手回春";
    static fan_海底捞月: string = "海底捞月";
    static fan_杠上开花: string = "杠上开花";
    static fan_抢杠和: string = "抢杠和";
    static fan_三色三节高: string = "三色三节高";
    static fan_碰碰和: string = "碰碰和";
    static fan_混一色: string = "混一色";
    static fan_三色三步高: string = "三色三步高";
    static fan_五门齐: string = "五门齐";
    static fan_全求人: string = "全求人";
    static fan_双暗杠: string = "双暗杠";
    static fan_双箭刻: string = "双箭刻";
    static fan_全带幺: string = "全带幺";
    static fan_不求人: string = "不求人";
    static fan_双明杠: string = "双明杠";
    static fan_和绝张: string = "和绝张";
    static fan_箭刻: string = "箭刻";
    static fan_圈风刻: string = "圈风刻";
    static fan_门风刻: string = "门风刻";
    static fan_门前清: string = "门前清";
    static fan_平和: string = "平和";
    static fan_四归一: string = "四归一";
    static fan_双同刻: string = "双同刻";
    static fan_双暗刻: string = "双暗刻";
    static fan_暗杠: string = "暗杠";
    static fan_断幺: string = "断幺";
    static fan_一般高: string = "一般高";
    static fan_喜相逢: string = "喜相逢";
    static fan_连六: string = "连六";
    static fan_老少副: string = "老少副";
    static fan_幺九刻: string = "幺九刻";
    static fan_明杠: string = "明杠";
    static fan_缺一门: string = "缺一门";
    static fan_无字: string = "无字";
    static fan_边张: string = "边张";
    static fan_坎张: string = "坎张";
    static fan_单钓将: string = "单钓将";
    static fan_自摸: string = "自摸";
    static fan_花牌: string = "花牌";

    private static initFanMap() {
        var map = {};
        //具体的fan从对应的方法中返回.因为算花等是有变化的.
//            map[fan_天和] = {a2: true, a4: true, func: MjFan.func_天和, ignore: [MjFan.fan_单钓将, MjFan.fan_边张, MjFan.fan_坎张], tip: ""};
//            map[MjFan.fan_地和] = {a2: true, a4: true, func: MjFan.func_地和, ignore: [], tip: ""};
//            map[MjFan.fan_天听] = {a2: true, a4: true, func: MjFan.func_天听, tip: ""};
        map[MjFan.fan_大四喜] = {
            shape: "ag:|mg:|sh:|ke:|pe:东风,东风,东风,南风,南风,南风,西风,西风,西风,北风,北风,北风,四条,四条",
            fan: 88,
            a2: true,
            a4: true,
            func: MjFan.func_大四喜,
            ignore: [MjFan.fan_圈风刻, MjFan.fan_门风刻, MjFan.fan_三风刻, MjFan.fan_碰碰和, MjFan.fan_幺九刻, MjFan.fan_缺一门],
            tip: "胡牌时，所形成的牌之中有东、南、西、北四副刻子（杠）"
        };
        map[MjFan.fan_大三元] = {
            shape: "ag:|mg:|sh:|ke:|pe:红中,红中,红中,发财,发财,发财,白板,白板,白板,三万,四万,五万,四筒,四筒",
            fan: 88,
            a2: true,
            a4: true,
            func: MjFan.func_大三元,
            ignore: [MjFan.fan_箭刻, MjFan.fan_双箭刻, MjFan.fan_小三元, MjFan.fan_缺一门],
            tip: "胡牌时，所形成的牌之中有中、发、白三副刻子（杠）"
        };
        map[MjFan.fan_绿一色] = {
            shape: "ag:|mg:|sh:|ke:|pe:二条,三条,四条,二条,二条,二条,六条,六条,六条,八条,八条,八条,发财,发财",
            fan: 88,
            a2: false,
            a4: true,
            func: MjFan.func_绿一色,
            ignore: [MjFan.fan_混一色],
            tip: "由“23468”条及“发”字中的任何牌组成的胡牌"
        };
        map[MjFan.fan_九莲宝灯] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,一万,一万,一万,二万,三万,四万,五万,六万,七万,八万,九万,九万,九万",
            fan: 88,
            a2: true,
            a4: true,
            func: MjFan.func_九莲宝灯,
            ignore: [MjFan.fan_清一色, MjFan.fan_门前清, MjFan.fan_幺九刻, MjFan.fan_不求人, MjFan.fan_缺一门, MjFan.fan_无字],
            tip: "由一种花色序数牌组成的“1112345678999”组成的特定牌型，此时可以胡同花色的任意一张牌"
        };
        map[MjFan.fan_四杠] = {
            shape: "ag:|mg:七万,四筒,八筒,五条|sh:|ke:|pe:一筒,一筒",
            fan: 88,
            a2: true,
            a4: true,
            func: MjFan.func_四杠,
            ignore: [MjFan.fan_三杠, MjFan.fan_双暗杠, MjFan.fan_双明杠, MjFan.fan_明杠, MjFan.fan_暗杠, MjFan.fan_单钓将, MjFan.fan_碰碰和],
            tip: "胡牌时，牌中有4副杠牌"
        };
        map[MjFan.fan_连七对] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,一万,二万,二万,三万,三万,四万,四万,五万,五万,六万,六万,七万,七万",
            fan: 88,
            a2: true,
            a4: true,
            func: MjFan.func_连七对,
            ignore: [MjFan.fan_清一色, MjFan.fan_一般高, MjFan.fan_连六, MjFan.fan_门前清, MjFan.fan_七对, MjFan.fan_不求人, MjFan.fan_单钓将, MjFan.fan_缺一门, MjFan.fan_无字],
            tip: "由一种花色序数相连的七对牌形成的胡牌"
        };
        map[MjFan.fan_十三幺] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,九万,一筒,九筒,一条,九条,东风,南风,西风,北风,红中,发财,白板,白板",
            fan: 88,
            a2: false,
            a4: true,
            func: MjFan.func_十三幺,
            ignore: [MjFan.fan_五门齐, MjFan.fan_不求人, MjFan.fan_单钓将, MjFan.fan_全带幺, MjFan.fan_门前清],
            tip: "由三种序数牌的幺、九牌、七种字牌及其中一对作将组成的胡牌"
        };
        map[MjFan.fan_清幺九] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,一万,一万,九万,九万,九万,九筒,九筒,九筒,九条,九条,九条,一条,一条",
            fan: 64,
            a2: false,
            a4: true,
            func: MjFan.func_清幺九,
            ignore: [MjFan.fan_碰碰和, MjFan.fan_双同刻, MjFan.fan_无字, MjFan.fan_混幺九, MjFan.fan_全带幺, MjFan.fan_幺九刻],
            tip: "由序数牌幺、九刻子（杠）及将牌组成的胡牌"
        };
        map[MjFan.fan_小四喜] = {
            shape: "ag:|mg:|sh:|ke:|pe:东风,东风,东风,南风,南风,南风,西风,西风,西风,北风,北风,五条,五条,五条",
            fan: 64,
            a2: true,
            a4: true,
            func: MjFan.func_小四喜,
            ignore: [MjFan.fan_三风刻, MjFan.fan_幺九刻, MjFan.fan_缺一门],
            tip: "胡牌时，牌中有三个风牌的刻子（杠），另外一个风牌作将牌"
        };
        map[MjFan.fan_小三元] = {
            shape: "ag:|mg:|sh:|ke:|pe:红中,红中,红中,发财,发财,发财,白板,白板,五筒,五筒,五筒,八筒,八筒,八筒",
            fan: 64,
            a2: true,
            a4: true,
            func: MjFan.func_小三元,
            ignore: [MjFan.fan_箭刻, MjFan.fan_双箭刻, MjFan.fan_缺一门],
            tip: "胡牌时，牌中有两个箭牌的刻子（杠），另外一个箭牌作将牌"
        };
        map[MjFan.fan_字一色] = {
            shape: "ag:|mg:|sh:|ke:|pe:南风,南风,南风,东风,东风,东风,北风,北风,北风,发财,发财,发财,红中,红中",
            fan: 64,
            a2: true,
            a4: true,
            func: MjFan.func_字一色,
            ignore: [MjFan.fan_碰碰和, MjFan.fan_混幺九, MjFan.fan_全带幺, MjFan.fan_幺九刻, MjFan.fan_缺一门],
            tip: "由字牌的刻子（杠）。将牌组成的胡牌"
        };
        map[MjFan.fan_四暗刻] = {
            shape: "ag:|mg:|sh:|ke:|pe:七万,七万,七万,四万,四万,四万,五筒,五筒,五筒,五条,五条,五条,七条,七条",
            fan: 64,
            a2: true,
            a4: true,
            func: MjFan.func_四暗刻,
            ignore: [MjFan.fan_门前清, MjFan.fan_碰碰和, MjFan.fan_三暗刻, MjFan.fan_双暗刻, MjFan.fan_不求人],
            tip: "胡牌时牌中有四副暗刻（暗杠）"
        };
        map[MjFan.fan_一色双龙会] = {
            shape: "ag:|mg:|sh:|ke:|pe:一条,二条,三条,一条,二条,三条,五条,五条,七条,八条,九条,七条,九条,八条",
            fan: 64,
            a2: true,
            a4: true,
            func: MjFan.func_一色双龙会,
            ignore: [MjFan.fan_平和, MjFan.fan_七对, MjFan.fan_清一色, MjFan.fan_一般高, MjFan.fan_老少副],
            tip: "一种花色的两套老少副（即有两组123、789）以及一套5作将牌"
        };
        map[MjFan.fan_一色四同顺] = {
            shape: "ag:|mg:|sh:|ke:|pe:一筒,一筒,一筒,二筒,二筒,二筒,三筒,三筒,三筒,四筒,四筒,四筒,一条,一条",
            fan: 48,
            a2: true,
            a4: true,
            func: MjFan.func_一色四同顺,
            ignore: [MjFan.fan_一色三节高, MjFan.fan_一般高, MjFan.fan_四归一, MjFan.fan_一色三同顺, MjFan.fan_七对],
            tip: "一种花色四副序数相同的顺子"
        };
        map[MjFan.fan_一色四节高] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,一万,一万,二万,二万,二万,三万,三万,三万,四万,四万,四万,六条,六条",
            fan: 48,
            a2: true,
            a4: true,
            func: MjFan.func_一色四节高,
            ignore: [MjFan.fan_一色三同顺, MjFan.fan_一色三节高, MjFan.fan_碰碰和],
            tip: "一种花色一次递增一个序数的四个刻子（杠）"
        };
        map[MjFan.fan_一色四步高] = {
            shape: "ag:|mg:|sh:|ke:|pe:二万,三万,四万,三万,四万,五万,四万,五万,六万,五万,六万,七万,南风,南风",
            fan: 32,
            a2: true,
            a4: true,
            func: MjFan.func_一色四步高,
            ignore: [MjFan.fan_一色三步高],
            tip: "一种花色一次递增一个或者两个序数的顺子"
        };
        map[MjFan.fan_三杠] = {
            shape: "ag:|mg:三筒,六筒,五条|sh:|ke:|pe:一万,二万,三万,东风,东风",
            fan: 32,
            a2: true,
            a4: true,
            func: MjFan.func_三杠,
            ignore: [MjFan.fan_双明杠, MjFan.fan_双暗杠, MjFan.fan_明杠, MjFan.fan_暗杠],
            tip: "胡牌时，牌中有三副杠牌"
        };
        map[MjFan.fan_混幺九] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,一万,一万,一筒,一筒,一筒,九万,九万,九万,东风,东风,东风,南风,南风",
            fan: 32,
            a2: true,
            a4: true,
            func: MjFan.func_混幺九,
            ignore: [MjFan.fan_碰碰和, MjFan.fan_幺九刻, MjFan.fan_全带幺],
            tip: "由字牌和序数牌一、九的刻子（杠）、将牌形成的和牌；其中肯定包含字牌"
        };
        map[MjFan.fan_七对] = {
            shape: "ag:|mg:|sh:|ke:|pe:二万,二万,四万,四万,八万,八万,四筒,四筒,六筒,六筒,九筒,九筒,五条,五条",
            fan: 24,
            a2: true,
            a4: true,
            func: MjFan.func_七对,
            ignore: [MjFan.fan_不求人, MjFan.fan_单钓将],
            tip: "由7个对子组成的和牌"
        };
        map[MjFan.fan_七星不靠] = {
            shape: "ag:|mg:|sh:|ke:|pe:东风,南风,西风,北风,红中,发财,白板,一万,四万,七万,二筒,五筒,八筒,三条",
            fan: 24,
            a2: false,
            a4: true,
            func: MjFan.func_七星不靠,
            ignore: [MjFan.fan_五门齐, MjFan.fan_门前清, MjFan.fan_全不靠, MjFan.fan_单钓将],
            tip: "必须有7个单张的东、南、西、北、中、发、白，加上三种花色数位按照147、258、369中的7张序数牌组成的没有将牌的和牌"
        };
        map[MjFan.fan_全双刻] = {
            shape: "ag:|mg:|sh:|ke:|pe:四筒,四筒,四筒,四条,四条,四条,六条,六条,六条,八万,八万,八万,六筒,六筒",
            fan: 24,
            a2: false,
            a4: true,
            func: MjFan.func_全双刻,
            ignore: [MjFan.fan_碰碰和, MjFan.fan_断幺],
            tip: "由“2468”序数牌的刻子（杠）、将牌组成的和牌"
        };
        map[MjFan.fan_清一色] = {
            shape: "ag:|mg:|sh:|ke:|pe:一筒,二筒,三筒,一筒,二筒,三筒,四筒,五筒,六筒,七筒,八筒,九筒,九筒,九筒",
            fan: 24,
            a2: true,
            a4: true,
            func: MjFan.func_清一色,
            ignore: [MjFan.fan_无字],
            tip: "由同一种花色组成的和牌"
        };
        map[MjFan.fan_一色三同顺] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,二万,三万,三万,三万,二万,二万,一万,一万,四筒,五筒,六筒,五条,五条",
            fan: 24,
            a2: true,
            a4: true,
            func: MjFan.func_一色三同顺,
            ignore: [MjFan.fan_一色三节高, MjFan.fan_一般高],
            tip: "和牌中，有一种花色三副序数相同的顺子"
        };
        map[MjFan.fan_一色三节高] = {
            shape: "ag:|mg:|sh:|ke:|pe:四筒,四筒,四筒,五筒,五筒,五筒,六筒,六筒,六筒,七万,八万,九万,东风,东风",
            fan: 24,
            a2: true,
            a4: true,
            func: MjFan.func_一色三节高,
            ignore: [MjFan.fan_一色三同顺],
            tip: "和牌中，有一种花色三副序数依次递增一个序数的刻子（杠）"
        };
        map[MjFan.fan_全大] = {
            shape: "ag:|mg:|sh:|ke:|pe:七万,八万,九万,七筒,八筒,九筒,七条,七条,七条,九筒,九筒,九筒,九条,九条",
            fan: 24,
            a2: false,
            a4: true,
            func: MjFan.func_全大,
            ignore: [MjFan.fan_无字],
            tip: "由序数牌7、8、9组成的和牌"
        };
        map[MjFan.fan_全中] = {
            shape: "ag:|mg:|sh:|ke:|pe:四筒,五筒,六筒,五筒,五筒,五筒,四条,五条,六条,六万,六万,六万,五万,五万",
            fan: 24,
            a2: false,
            a4: true,
            func: MjFan.func_全中,
            ignore: [MjFan.fan_无字, MjFan.fan_断幺],
            tip: "由序数牌4、5、6组成的和牌"
        };
        map[MjFan.fan_全小] = {
            shape: "ag:|mg:|sh:|ke:|pe:一条,二条,三条,三条,三条,三条,一万,二万,三万,一筒,一筒,一筒,二筒,二筒",
            fan: 24,
            a2: false,
            a4: true,
            func: MjFan.func_全小,
            ignore: [MjFan.fan_无字],
            tip: "由序数牌1、2、3组成的和牌"
        };
        map[MjFan.fan_清龙] = {
            shape: "ag:|mg:|sh:|ke:|pe:一筒,二筒,三筒,四筒,五筒,六筒,七筒,八筒,九筒,四条,四条,四条,东风,东风",
            fan: 16,
            a2: true,
            a4: true,
            func: MjFan.func_清龙,
            ignore: [MjFan.fan_连六, MjFan.fan_老少副],
            tip: "和牌中，有同花色123 456 789相连的序数牌"
        };
        map[MjFan.fan_三色双龙会] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,二万,三万,七万,八万,九万,一筒,二筒,三筒,七筒,八筒,九筒,五条,五条",
            fan: 16,
            a2: false,
            a4: true,
            func: MjFan.func_三色双龙会,
            ignore: [MjFan.fan_喜相逢, MjFan.fan_老少副, MjFan.fan_无字, MjFan.fan_平和],
            tip: "两种花色两副老少副，另外一种花色一对5作为将牌形成的和牌"
        };
        map[MjFan.fan_一色三步高] = {
            shape: "ag:|mg:|sh:|ke:|pe:二万,三万,四万,三万,四万,五万,四万,五万,六万,五筒,五筒,五筒,九筒,九筒",
            fan: 16,
            a2: true,
            a4: true,
            func: MjFan.func_一色三步高,
            tip: "和牌中，有一种花色三副依次递增一个或者两个的顺子"
        };
        map[MjFan.fan_全带五] = {
            shape: "ag:|mg:|sh:|ke:|pe:四筒,五筒,六筒,五条,五条,五条,四万,五万,六万,六万,五万,七万,五筒,五筒",
            fan: 16,
            a2: false,
            a4: true,
            func: MjFan.func_全带五,
            ignore: [MjFan.fan_断幺],
            tip: "每副牌及将牌必须带有序数牌5"
        };
        map[MjFan.fan_三同刻] = {
            shape: "ag:|mg:|sh:|ke:|pe:四万,四万,四万,四筒,四筒,四筒,四条,四条,四条,六条,七条,八条,东风,东风",
            fan: 16,
            a2: false,
            a4: true,
            func: MjFan.func_三同刻,
            tip: "和牌中，有3副序数相同的刻子（杠）"
        };
        map[MjFan.fan_三暗刻] = {
            shape: "ag:|mg:|sh:|ke:|pe:三万,三万,三万,五筒,五筒,五筒,九筒,九筒,九筒,五条,六条,七条,东风,东风",
            fan: 16,
            a2: true,
            a4: true,
            func: MjFan.func_三暗刻,
            ignore: [MjFan.fan_双暗刻],
            tip: "和牌中，有3副暗刻（暗杠）"
        };
        map[MjFan.fan_全不靠] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,四万,七万,二筒,五筒,八筒,三条,六条,九条,东风,南风,西风,北风,红中",
            fan: 12,
            a2: false,
            a4: true,
            func: MjFan.func_全不靠,
            ignore: [MjFan.fan_门前清, MjFan.fan_五门齐, MjFan.fan_不求人, MjFan.fan_单钓将],
            tip: "由三种花色147、258、369不能错位的序数牌及东、南、西、北、中、发、白中的任意十四张单张牌组成的和牌"
        };
        map[MjFan.fan_组合龙] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,四万,七万,二筒,五筒,八筒,三条,六条,九条,七筒,八筒,九筒,八万,八万",
            fan: 12,
            a2: false,
            a4: true,
            func: MjFan.func_组合龙,
            tip: "和牌中，有三种花色147、258、369不能错位的序数牌（特殊顺子）"
        };
        map[MjFan.fan_大于五] = {
            shape: "ag:|mg:|sh:|ke:|pe:六万,七万,八万,九万,九万,九万,六筒,六筒,六筒,七筒,八筒,九筒,九条,九条",
            fan: 12,
            a2: true,
            a4: true,
            func: MjFan.func_大于五,
            ignore: [MjFan.fan_无字],
            tip: "由序数牌6、7、8、9组成的和牌"
        };
        map[MjFan.fan_小于五] = {
            shape: "ag:|mg:|sh:|ke:|pe:一筒,二筒,三筒,二筒,二筒,二筒,一万,一万,一万,二条,三条,四条,三条,三条",
            fan: 12,
            a2: true,
            a4: true,
            func: MjFan.func_小于五,
            ignore: [MjFan.fan_无字],
            tip: "由序数牌1、2、3、4组成的和牌"
        };
        map[MjFan.fan_三风刻] = {
            shape: "ag:|mg:|sh:|ke:|pe:东风,东风,东风,南风,南风,南风,西风,西风,西风,一条,二条,三条,五筒,五筒",
            fan: 12,
            a2: true,
            a4: true,
            func: MjFan.func_三风刻,
            tip: "和牌中，有三副风刻（杠）"
        };
        map[MjFan.fan_花龙] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,二万,三万,四筒,五筒,六筒,七条,八条,九条,九筒,九筒,九筒,三筒,三筒",
            fan: 8,
            a2: false,
            a4: true,
            func: MjFan.func_花龙,
            tip: "和牌中，有三种花色123、456、789三个顺子连接而成"
        };
        map[MjFan.fan_推不倒] = {
            shape: "ag:|mg:|sh:|ke:|pe:一筒,二筒,三筒,四筒,四筒,四筒,四条,四条,四条,六条,六条,六条,八条,八条",
            fan: 8,
            a2: false,
            a4: true,
            func: MjFan.func_推不倒,
            ignore: [MjFan.fan_缺一门],
            tip: "由牌面图形没有上下区别的牌组成的和牌。包括1234589饼、245689条、白板"
        };
        map[MjFan.fan_三色三同顺] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,二万,三万,一筒,二筒,三筒,一条,二条,三条,九筒,九筒,九筒,五筒,五筒",
            fan: 8,
            a2: false,
            a4: true,
            func: MjFan.func_三色三同顺,
            tip: "和牌中，有三种花色三副序数相同的顺子"
        };
        map[MjFan.fan_三色三节高] = {
            shape: "ag:|mg:|sh:|ke:|pe:四筒,四筒,四筒,五条,五条,五条,六万,六万,六万,一万,二万,三万,九条,九条",
            fan: 8,
            a2: false,
            a4: true,
            func: MjFan.func_三色三节高,
            tip: "和牌中，有三种花色三副依次递增一个序数的刻子（杠）"
        };
        //map[MjFan.fan_无番] = {shape:"",a2: false, a4: true, func: null, tip:"和牌中，数不出任何番种番（不包含花牌）"};
        map[MjFan.fan_妙手回春] = {
            shape: "",
            fan: 8,
            a2: true,
            a4: true,
            func: MjFan.func_妙手回春,
            ignore: [MjFan.fan_自摸],
            tip: "自模牌墙上最后一张牌形成和牌"
        };
        map[MjFan.fan_海底捞月] = {shape: "", fan: 8, a2: true, a4: true, func: MjFan.func_海底捞月, tip: "和别人打出的最后一张牌"};
        map[MjFan.fan_杠上开花] = {
            shape: "",
            fan: 8,
            a2: true,
            a4: true,
            func: MjFan.func_杠上开花,
            ignore: [MjFan.fan_自摸],
            tip: "杠牌时，从牌墙上补上一张牌形成和牌"
        };
        map[MjFan.fan_抢杠和] = {
            shape: "",
            fan: 8,
            a2: true,
            a4: true,
            func: MjFan.func_抢杠和,
            ignore: [MjFan.fan_和绝张],
            tip: "和他人自抓开明杠的牌"
        };
        map[MjFan.fan_碰碰和] = {
            shape: "ag:|mg:|sh:|ke:二万,三筒,五筒,八筒|pe:五条,五条",
            fan: 6,
            a2: true,
            a4: true,
            func: MjFan.func_碰碰和,
            tip: "由4副刻子（杠），将牌组成的和牌"
        };
        map[MjFan.fan_混一色] = {
            shape: "ag:|mg:|sh:|ke:|pe:一万,二万,三万,五万,五万,五万,七万,八万,九万,东风,东风,东风,红中,红中",
            fan: 6,
            a2: true,
            a4: true,
            func: MjFan.func_混一色,
            tip: "由一种花色序数牌及字牌组成的和牌"
        };
        map[MjFan.fan_三色三步高] = {
            shape: "ag:|mg:|sh:|ke:|pe:二万,三万,四万,三条,四条,五条,四筒,五筒,六筒,六条,六条,六条,九条,九条",
            fan: 6,
            a2: false,
            a4: true,
            func: MjFan.func_三色三步高,
            tip: "和牌中，有三种花色三副依次递增一个序数的顺子"
        };
        map[MjFan.fan_五门齐] = {
            shape: "",
            fan: 6,
            a2: false,
            a4: true,
            func: MjFan.func_五门齐,
            tip: "由一种花色序数牌及字牌组成的和牌"
        };
        map[MjFan.fan_全求人] = {
            shape: "",
            fan: 6,
            a2: true,
            a4: true,
            func: MjFan.func_全求人,
            ignore: [MjFan.fan_单钓将],
            tip: "4副牌全部是吃、碰（明杠）他们的牌，且最后和牌也是和他人打出的牌"
        };
        map[MjFan.fan_双暗杠] = {
            shape: "",
            fan: 6,
            a2: true,
            a4: true,
            func: MjFan.func_双暗杠,
            ignore: [MjFan.fan_暗杠, MjFan.fan_双暗刻],
            tip: "和牌中，有两副暗杠"
        };
        map[MjFan.fan_双箭刻] = {
            shape: "",
            fan: 6,
            a2: true,
            a4: true,
            func: MjFan.func_双箭刻,
            ignore: [MjFan.fan_箭刻],
            tip: "和牌中，有两副箭刻"
        };
        map[MjFan.fan_全带幺] = {shape: "", fan: 4, a2: true, a4: true, func: MjFan.func_全带幺, tip: "每副牌及将牌中都带有幺九牌"};
        map[MjFan.fan_不求人] = {
            shape: "",
            fan: 4,
            a2: true,
            a4: true,
            func: MjFan.func_不求人,
            ignore: [MjFan.fan_门前清, MjFan.fan_自摸],
            tip: "没有吃牌、碰牌、明杠，最后自模和牌"
        };
        map[MjFan.fan_双明杠] = {
            shape: "",
            fan: 4,
            a2: true,
            a4: true,
            func: MjFan.func_双明杠,
            ignore: [MjFan.fan_明杠],
            tip: "和牌之中有两个明杠"
        };
        map[MjFan.fan_和绝张] = {
            shape: "",
            fan: 4,
            a2: true,
            a4: true,
            func: MjFan.func_和绝张,
            tip: "和牌池、桌面已亮明3张所剩第4张相同的牌"
        };
        map[MjFan.fan_箭刻] = {
            shape: "",
            fan: 2,
            a2: true,
            a4: true,
            func: MjFan.func_箭刻,
            tip: "由中、发、白3张相同的牌组成的刻子（杠）"
        };
        map[MjFan.fan_圈风刻] = {shape: "", fan: 2, a2: false, a4: true, func: MjFan.func_圈风刻, tip: "与圈风相同的风刻（杠）"};
        map[MjFan.fan_门风刻] = {shape: "", fan: 2, a2: false, a4: true, func: MjFan.func_门风刻, tip: "与门风相同的风刻（杠）"};
        map[MjFan.fan_门前清] = {shape: "", fan: 2, a2: true, a4: true, func: MjFan.func_门前清, tip: "没有吃牌、碰牌、明杠的和牌"};
        map[MjFan.fan_平和] = {shape: "", fan: 2, a2: true, a4: true, func: MjFan.func_平和, tip: "由4副顺子及序数牌作为将牌组成的和牌"};
        map[MjFan.fan_四归一] = {shape: "", fan: 2, a2: true, a4: true, func: MjFan.func_四归一, tip: "和牌中有4张不是杠牌而相同的牌"};
        map[MjFan.fan_双同刻] = {
            shape: "",
            fan: 2,
            a2: false,
            a4: true,
            func: MjFan.func_双同刻,
            tip: "和牌中，有2副序数相同的刻子（杠）"
        };
        map[MjFan.fan_双暗刻] = {shape: "", fan: 2, a2: true, a4: true, func: MjFan.func_双暗刻, tip: "和牌中，有2副暗刻序数相同"};
        map[MjFan.fan_暗杠] = {shape: "", fan: 2, a2: true, a4: true, func: MjFan.func_暗杠, tip: "自己抓到4张相同的牌开杠"};
        map[MjFan.fan_断幺] = {shape: "", fan: 2, a2: true, a4: true, func: MjFan.func_断幺, tip: "和牌中没有幺九以及字牌"};
        map[MjFan.fan_一般高] = {
            shape: "",
            fan: 1,
            a2: true,
            a4: true,
            func: MjFan.func_一般高,
            tip: "在和牌时，有2副由一种花色序数相同的顺子组成的牌"
        };
        map[MjFan.fan_喜相逢] = {
            shape: "",
            fan: 1,
            a2: false,
            a4: true,
            func: MjFan.func_喜相逢,
            tip: "在和牌时，有2副不同花色序数相同的顺子组成的牌"
        };
        map[MjFan.fan_连六] = {
            shape: "",
            fan: 1,
            a2: true,
            a4: true,
            func: MjFan.func_连六,
            tip: "在和牌时，有一种花色序数相连的6张牌组成的2副顺子"
        };
        map[MjFan.fan_老少副] = {
            shape: "",
            fan: 1,
            a2: true,
            a4: true,
            func: MjFan.func_老少副,
            tip: "在和牌时，有一种花色的123、789组成的顺子"
        };
        map[MjFan.fan_幺九刻] = {
            shape: "",
            fan: 1,
            a2: true,
            a4: true,
            func: MjFan.func_幺九刻,
            tip: "在和牌时，有三张相同的幺九牌、字牌组成的刻子（杠）"
        };
        map[MjFan.fan_明杠] = {
            shape: "",
            fan: 1,
            a2: true,
            a4: true,
            func: MjFan.func_明杠,
            tip: "他人打出一张与暗刻相同的牌开杠；或者自己抓入一张与明刻相同的牌开杠"
        };
        map[MjFan.fan_缺一门] = {shape: "", fan: 1, a2: false, a4: true, func: MjFan.func_缺一门, tip: "和牌中缺少一种花色序数牌"};
        map[MjFan.fan_无字] = {shape: "", fan: 1, a2: false, a4: true, func: MjFan.func_无字, tip: "和牌中没有字牌"};
        map[MjFan.fan_边张] = {shape: "", fan: 1, a2: true, a4: true, func: MjFan.func_边张, tip: "只能听和123中的3或者789中的7"};
        map[MjFan.fan_坎张] = {shape: "", fan: 1, a2: true, a4: true, func: MjFan.func_坎张, tip: "只能听和顺子中间的牌"};
        map[MjFan.fan_单钓将] = {shape: "", fan: 1, a2: true, a4: true, func: MjFan.func_单钓将, tip: "钓单张牌作将和牌"};
        map[MjFan.fan_自摸] = {shape: "", fan: 1, a2: true, a4: true, func: MjFan.func_自摸, tip: "抓牌形成和牌"};
        //map[MjFan.fan_花牌] = {shape:"",fan: 1, a2: true, a4: true, func: MjFan.func_花牌, tip: ""};
        MjFan.fanmap = map;
        return map;
    }

    static func_自摸() {
        if (MjFan.huInfo.anTarget != null) {
            return 1
        }
        return 0;
    }

    static func_天听() {
        var opt = MjFan.status.opts;
        var preOpt = [];
        for (var i = 0; i < opt.length; i++) {
            var opt1 = opt[i];
            if (opt1 instanceof OptTing) {
                break;
            }
        }
        if (preOpt.length == 1 && (preOpt[0] instanceof OptFetch)) {
            return 64
        }
        return 0;
    }

    static func_地和() {
        if (!MjFan.status.zhuang && MjFan.status.moPaiCnt == 1 && MjFan.status.daPaiCnt == 0) {
            return 88;
        }
        return 0;
    }

    static func_天和() {
        if (MjFan.status.zhuang && MjFan.status.moPaiCnt == 0 && MjFan.status.daPaiCnt == 0) {
            return 88;
        }
        return 0;
    }

    /**
     *
     */
    static func_花牌() {
        return MjFan.status.hua;
    }

    /**
     *
     */
    static func_单钓将() {
        if (MjFan.huInfo.jiang == null) {
            return 0;
        }
        if (MjFan.huInfo.target != null) {
            if (MjFan.huInfo.jiang.equal(MjFan.huInfo.target)) {
                if (MjFan.huInfo.jiang.isNumCard()) {
                    //如果是数牌,需要看是不是单调这一张.
                    var cs = MjFan.getAllShowCardsExceptTarget();
                    for (var i = 0; i < cs.length; i++) {
                        var card = cs[i];
                        if (card.type != MjFan.huInfo.jiang.type) {
                            cs.splice(i, 1);
                            i--;
                        }
                    }
                    var tingCards = MjEngine.getTingCards(cs);
                    if (tingCards.length == 1 && tingCards[0].equal(MjFan.huInfo.jiang)) {
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
    static func_坎张() {
        //排除字
        if (!MjFan.huInfo.target.isNumCard()) {
            return 0;
        }
        //排除1,9
        if (!(MjFan.huInfo.target.num == 1) || !(MjFan.huInfo.target.num == 9)) {
            return 0;
        }
        var isCenter = false;
        var shun = MjFan.huInfo.anShun.slice();
        for (var i = 0; i < shun.length; i++) {
            if (shun[i][1].equal(MjFan.huInfo.target)) {
                isCenter = true;
                break;
            }
        }
        if (isCenter) {
            var cards = MjFan.status.cloneShowCards();
            if (MjFan.huInfo.target.num - 2 >= 1) {
                if (MjEngine.getCardCnt(cards, MjFan.huInfo.target.type, MjFan.huInfo.target.num - 2) > 0) {
                    return 0;
                }
            }
            if (MjFan.huInfo.target.num + 2 <= 9) {
                if (MjEngine.getCardCnt(cards, MjFan.huInfo.target.type, MjFan.huInfo.target.num + 2) > 0) {
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
    static func_边张() {
        var target = MjFan.huInfo.target;
        if (!target.isNumCard()) {
            return 0;
        }
        if (target.num != 3 && target.num != 7) {
            return 0;
        }
        var sc = MjFan.status.cloneShowCards();
        //为3时
        if (target.num == 3) {
            var t1 = MjEngine.getCardCnt(sc, target.type, target.num - 2);
            //如果没有1
            if (t1 == 0) {
                return 0;
            }
            var t2 = MjEngine.getCardCnt(sc, target.type, target.num - 1);
            //如果没有2
            if (t2 == 0) {
                return 0;
            }
            var t4 = MjEngine.getCardCnt(sc, target.type, target.num + 1);
            //如果有4
            if (t4 > 0) {
                return 0;
            }
            return 1;
        }
        if (target.num == 7) {
            var tt1 = MjEngine.getCardCnt(sc, target.type, target.num + 2);
            //如果没有1
            if (tt1 == 0) {
                return 0;
            }
            var tt2 = MjEngine.getCardCnt(sc, target.type, target.num + 1);
            //如果没有2
            if (tt2 == 0) {
                return 0;
            }
            var tt4 = MjEngine.getCardCnt(sc, target.type, target.num - 1);
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
    static func_无字() {
        var all = MjFan.getAllCards();
        var i = 0;
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
    static func_缺一门() {
        var ar = [];
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            ar[all[i].type] = 1;
        }
        if (Math.floor(ar[MjConst.type_wan]) + Math.floor(ar[MjConst.type_tong]) + Math.floor(ar[MjConst.type_tiao]) == 2) {
            return 1;
        }
        return 0;
    }

    /**
     *
     */
    static func_明杠() {
        if (MjFan.status.mingGangCnt() == 1) {
            return 1;
        }
        return 0;
    }

    /**
     *
     */
    static func_幺九刻() {
        var ke = MjFan.getKeGang();
        var cnt = 0;
        var i = 0;
        for (i = 0; i < ke.length; i++) {
            var mjCard = ke[i];
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
    static func_老少副() {
        var shun = MjFan.getShuns();
        shun.sort(MjEngine.sortShunsByTypeNum);
        var i = 0;
        for (i = 0; i < shun.length; i++) {
            var vs = shun[i];
            if (vs[0].num != 1 && vs[0].num != 7) {
                shun.splice(i, 1);
                i--;
            }
        }
        if (shun.length < 2) return 0;
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
    static func_连六() {
        var shun = MjFan.getShuns();
        if (shun.length < 2) return 0;
        shun.sort(MjEngine.sortShunsByTypeNum);
        var cnt = 0;
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
    static func_喜相逢() {
        var shun = MjFan.getShuns();
        for (var i = 0; i < shun.length; i++) {
            var vs = shun[i];
            for (var j = i; j < shun.length; j++) {
                var vs1 = shun[j];
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
    static func_一般高() {
        var shun = MjFan.getShuns();
        if (shun.length < 2) return 0;
        shun.sort(MjEngine.sortShunsByTypeNum);
        var cnt = 0;
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
    static func_断幺() {
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
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
    static func_暗杠() {
        if (MjFan.status.anGangCnt() == 1) {
            return 2;
        }
        return 0;
    }

    /**
     *
     */
    static func_双暗刻() {
        var ke = [];
        ke = ke.concat(MjFan.huInfo.getValidAnKe());
        ke = ke.concat(MjFan.status.getAnGangCards());
        if (ke.length == 2) {
            return 2;
        }
        return 0;
    }

    /**
     */
    static func_双同刻() {
        var ke = MjFan.getKe();
        for (var i = 0; i < ke.length; i++) {
            var card = ke[i];
            if (!card.isNumCard()) {
                ke.splice(i, 1);
                i--;
            }
        }
        ke.sort(MjEngine.sortCardByNum);
        for (var j = 1; j < ke.length; j++) {
            var card1 = ke[j];
            if (card1.num == ke[j - 1].num) {
                return 2;
            }
        }
        return 0;
    }

    /**
     *
     */
    static func_四归一() {
        var show = MjFan.getAllCards();
        var len = show.length;
        MjEngine.subSameCnt(show, 4);
        var len1 = show.length;
        var gangCnt = MjFan.status.mingGangCnt() + MjFan.status.anGangCnt();
        if ((len - len1) > gangCnt * 4) {
            return 2
        }
        return 0;
    }

    /**
     *
     */
    static func_平和() {
        if (MjFan.huInfo.jiang == null) {
            return 0;
        }
        if (MjFan.getShuns().length == 4) {
            if (MjFan.huInfo.jiang.isNumCard()) {
                return 2;
            }
        }
        return 0;
    }

    /**
     *
     */
    static func_门前清() {
        if (MjFan.status.cloneShowCards().length >= 13) {
            return 2;
        }
        return 0;
    }

    /**
     */
    static func_门风刻() {
        var ke = MjFan.getKe();
        for (var i = 0; i < ke.length; i++) {
            var card = ke[i];
            if (card.type == MjConst.type_feng) {
                if (card.num == MjFan.status.feng) {
                    return 2;
                }
            }
        }
        return 0;
    }

    /**
     */
    static func_圈风刻() {
        /*var ke = MjFan.getKe();
        for (var i = 0; i < ke.length; i++) {
            var card = ke[i];
            if (card.isFeng()) {
                if (card.num == MjRound.instance.quanFeng) {
                    return 2;
                }
            }
        }*/
        return 0;
    }

    /**
     *
     */
    static func_箭刻() {
        var ke = MjFan.getKe();
        var i = 0;
        for (i = 0; i < ke.length; i++) {
            var mjCard = ke[i];
            if (mjCard.type == MjConst.type_se) {
                return 2;
            }
        }
        return 0;
    }

    /**
     */
    static func_和绝张() {
        if (MjFan.func_抢杠和()) {
            return 0;
        }
        var cnt = MjRound.instance.getOpenCardCnt(MjFan.huInfo.target);
        //别人打的. cnt中已经包含了
        if (cnt + MjFan.status.getCardCntInShow(MjFan.huInfo.target) == 4) {
            return 4;
        } else {
            return 0;
        }
    }

    /**
     *
     */
    static func_双明杠() {
        if (MjFan.status.mingGangCnt() == 2) {
            return 4;
        }
        return 0;
    }

    /**
     *
     */
    static func_不求人() {
        if (MjFan.func_门前清() && MjFan.func_自摸()) {
            return 4
        }
        return 0;
    }

    /**
     *
     */
    static func_全带幺() {
        if (MjFan.huInfo.jiang == null) {
            return 0;
        }
        if (MjFan.huInfo.jiang.isNumCard() && MjFan.huInfo.jiang.num != 1) {
            return 0;
        }
        var ke = MjFan.getKeGang();
        for (var i = 0; i < ke.length; i++) {
            var card = ke[i];
            if (card.isNumCard()) {
                if (card.num != 1) {
                    return 0;
                }
            }
        }
        var shun = MjFan.getShuns();
        for (var j = 0; j < shun.length; j++) {
            if (shun[j][0].num != 1) {
                return 0;
            }
        }
        return 4;
    }

    /**
     *
     */
    static func_双箭刻() {
        var all = MjFan.getKeGang();
        var cnt = 0;
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
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
    static func_双暗杠() {
        if (MjFan.status.anGangCnt() == 2) {
            return 6;
        }
        return 0;
    }

    /**
     *
     */
    static func_全求人() {
        if (MjFan.status.cloneShowCards().length == 1 && MjFan.huInfo.mingTarget != null && MjFan.status.anGangCnt() == 0) {
            return 6;
        }
        return 0;
    }

    /**
     *
     */
    static func_五门齐() {
        var types = [false, false, false, false, false];
        var all = MjFan.getAllCards();
        var i = 0;
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
    static func_三色三步高() {
        var shun = MjFan.getShuns();
        shun.sort(MjEngine.sortShunsByNum);
        for (var i = 0; i < shun.length; i++) {
            var s = shun[i];
            var t1 = false;
            var type1 = -1;
            var t2 = false;
            for (var j = i + 1; j < shun.length; j++) {
                var s1 = shun[j];
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
    static func_混一色() {
        var all = MjFan.getAllCards();
        var ncs = [];
        var hasFengSe: boolean;
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
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
        var firstCard = ncs[0];
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
    static func_碰碰和() {
        if (MjFan.status.pengCnt() + MjFan.status.anGangCnt() + MjFan.status.mingGangCnt() == 4) {
            return 6;
        }
        return 0;
    }

    /**
     */
    static func_三色三节高() {
        var ke = [];
        ke = ke.concat(MjFan.huInfo.anKe);
        ke = ke.concat(MjFan.status.getPengCards());
        for (var m = 0; m < ke.length; m++) {
            if (!ke[m].isNumCard()) {
                ke.splice(m, 1);
                m--;
            }
        }
        if (ke.length >= 3) {
            ke.sort(MjEngine.sortCardByNum);
            for (var i = 0; i < ke.length; i++) {
                var card = ke[i];
                var t1 = false;
                var type1 = -1;
                var t2 = false;
                for (var j = i + 1; j < ke.length; j++) {
                    var card1 = ke[j];
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
    static func_抢杠和() {
        if (MjFan.huInfo.qiangGang) {
            return 8
        }
        return 0;
    }

    /**
     */
    static func_杠上开花() {
        if (MjFan.huInfo.anTarget != null && MjFan.huInfo.justGang) {
            return 8;
        }
        return 0;
    }

    /**
     */
    static func_海底捞月() {
        if (MjFan.huInfo.anTarget != null && !MjRound.instance.hasCard()) {
            return 8;
        }
        return 0;
    }

    /**
     */
    static func_妙手回春() {
        if (MjFan.huInfo.mingTarget != null && !MjRound.instance.hasCard()) {
            return 8;
        }
        return 0;
    }

    /**
     */
    static func_三色三同顺() {
        var shun = MjFan.getShuns();
        shun.sort(MjEngine.sortShunsByNum);
        for (var i = 0; i < shun.length; i++) {
            var s = shun[i];
            var t1 = false;
            var type1 = -1;
            var t2 = false;
            for (var j = i + 1; j < shun.length; j++) {
                var s1 = shun[j];
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
    static func_推不倒() {
        var cs = [];
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
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            if (MjEngine.getCardCntByCard(cs, all[i]) == 0) {
                return 0;
            }
        }
        return 8;
    }

    /**
     */
    static func_花龙() {
        var shun = MjFan.getShuns();
        for (var i = 0; i < shun.length; i++) {
            var obj = shun[i];
            if (obj[0].num != 1 && obj[0].num != 4 && obj[0].num != 7) {
                shun.splice(i, 1);
                i--;
            }
        }
        shun.sort(MjEngine.sortShunsByTypeNum);
        for (var j = 1; j < shun.length; j++) {
            if (shun[j][0].type == shun[j - 1][0].type) {
                shun.splice(j, 1);
                j--;
            }
        }
        if (shun.length < 3) {
            return 0;
        }
        shun.sort(MjEngine.sortShunsByNum);
        for (var k = 1; k < shun.length; k++) {
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
    static func_三风刻() {
        var ke = MjFan.getKeGang();
        var cnt = 0;
        for (var j = 0; j < ke.length; j++) {
            var card = ke[j];
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
    static func_小于五() {
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
            if (!mjCard.isNumCard()) return 0;
            if (mjCard.num > 4) {
                return 0;
            }
        }
        return 12;
    }

    /**
     *
     */
    static func_大于五() {
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
            if (!mjCard.isNumCard()) return 0;
            if (mjCard.num < 6) {
                return 0;
            }
        }
        return 12;
    }

    /**
     *
     */
    static func_组合龙() {
        if (MjFan.is组合龙(MjFan.getShowAndTarget())) {
            return 12;
        }
        return 0;
    }

    static is组合龙(cards) {
        var cs = cards.slice();
        var array = MjFan.has组合龙(cs);
        if (array == null) {
            return false;
        }
        MjFan.sub组合龙(cs, array);
        //先删除组合龙的牌.再看剩下的能不能胡.
        if (MjEngine.getHuInfos(cs, 0).length > 0) {
            return true;
        }
        return false;
    }

    static sub组合龙(cs, array) {
        for (var i = 1; i < array.length; i++) {
            var ar1 = array[i];
            for (var j = 0; j < ar1.length; j++) {
                MjEngine.subSpecialCnt(cs, new MjCard(i, ar1[j]), 1);
            }
        }
    }

    /**
     *
     * @param cards
     * @return  [type]=147|258|369
     */
    static has组合龙(cards) {
        if (cards.length < 9) return null;
        var cc = cards.slice();
        cc.sort(MjEngine.sortCardByTypeNum);
        var wanCards = [];
        var tongCards = [];
        var tiaoCards = [];
        for (var i = 0; i < cc.length; i++) {
            var card = cc[i];
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
        var cs = [wanCards, tongCards, tiaoCards];
        cs.sort(function (v1, v2) {
            if (v1.length < v2.length) {
                return -1;
            } else if (v1.length == v2.length) {
                return 0
            } else {
                return 1;
            }
        });
        var ars = [
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9]
        ];
        var retArray = [];
        for (var m = 0; m < cs.length; m++) {
            var obj = cs[m];
            for (var mmm = 0; mmm < ars.length; mmm++) {
                var shun = ars[mmm];
                var has = MjEngine.hasNum(obj, shun);
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
    static func_全不靠() {
        if (MjFan.is全不靠(MjFan.getAllCards())) {
            return 12
        }
        return 0;
    }

    static is全不靠(cards) {
        var ts = cards.slice();
        ts.sort(MjEngine.sortCardByTypeNum);
        if (ts.length != 14) {
            return false;
        }
        //有对就不正确
        for (var kk = 1; kk < ts.length; kk++) {
            if (ts[kk].equal(ts[kk - 1])) {
                return false;
            }
        }
        //数字牌不能有重复数字的.并且每种类型之间间隔至少为4
        var numCards = [];
        var wanCards = [];
        var tongCards = [];
        var tiaoCards = [];
        for (var i = 0; i < ts.length; i++) {
            if (ts[i].isNumCard()) {
                numCards.push(ts[i]);
                if (ts[i].type == MjConst.type_wan) {
                    wanCards.push(ts[i]);
                } else if (ts[i].type == MjConst.type_tong) {
                    tongCards.push(ts[i]);
                } else if (ts[i].type == MjConst.type_tiao) {
                    tiaoCards.push(ts[i]);
                }
            }
        }
        if (wanCards.length <= 3 && tongCards.length <= 3 && tiaoCards.length <= 3) {
            numCards.sort(MjEngine.sortCardByNum);
            for (var j = 1; j < numCards.length; j++) {
                if (numCards[j].num == numCards[j - 1].num) {
                    return false
                }
            }
            var k = 1;
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
            var allShape = MjEngine.getBuKao();

            for (var mm = 0; mm < allShape.length; mm++) {
                var obj = allShape[mm];
                if (MjEngine.subContain(obj, numCards)) {
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
    static func_三暗刻() {
        var ke = [];
        ke = ke.concat(MjFan.huInfo.getValidAnKe());
        ke = ke.concat(MjFan.status.getAnGangCards());
        if (ke.length == 3) {
            return 16;
        }
        return 0;
    }

    /**
     */
    static func_三同刻() {
        var ke = [];
        ke = ke.concat(MjFan.status.getPengCards());
        ke = ke.concat(MjFan.huInfo.anKe);
        ke = ke.concat(MjFan.status.getMingGangCards());
        ke = ke.concat(MjFan.status.getAnGangCards());
        for (var i = 1; i < 10; i++) {
            var cnt = 0;
            for (var j = 0; j < ke.length; j++) {
                var card = ke[j];
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
    static func_全带五() {
        var groupCnt = 0;
        var ke = MjFan.getKeGang();
        groupCnt += ke.length;
        for (var i = 0; i < ke.length; i++) {
            var card = ke[i];
            if (!card.isNumCard()) {
                return 0;
            }
            if (card.num != 5) {
                return 0;
            }
        }
        var shun = MjFan.getShuns();
        groupCnt += shun.length;
        for (var j = 0; j < shun.length; j++) {
            var cs = shun[j];
            var has = false;
            for (var jj = 0; jj < cs.length; jj++) {
                var card1 = cs[jj];
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
        if (MjFan.huInfo.jiang == null) {
            return 0;
        }
        if (!MjFan.huInfo.jiang.isNumCard()) {
            return 0;
        }
        if (MjFan.huInfo.jiang.num != 5) {
            return 0;
        }
        return 16;
    }

    /**
     */
    static func_一色三步高() {
        var shun = MjFan.getShuns();
        shun.sort(MjEngine.sortShunsByTypeNum);
        if (shun.length < 3) {
            return 0;
        }
        if (shun[0][0].type == shun[1][0].type && shun[0][0].type == shun[2][0].type) {
            shun = shun.slice(0, 3);
        } else if (shun.length == 4 && shun[3][0].type == shun[1][0].type && shun[1][0].type == shun[2][0].type) {
            shun = shun.slice(1, 4);
        } else {
            shun = [];
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
    static func_三色双龙会() {
        if (MjFan.huInfo.jiang == null) {
            return 0;
        }
        if (MjFan.huInfo.jiang.num != 5) {
            return 0;
        }
        var shun = MjFan.getShuns();
        if (shun.length != 4) {
            return 0;
        }
        for (var i = 0; i < shun.length; i++) {
            var cs = shun[i];
            if (cs[0].type == MjFan.huInfo.jiang.type) {
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
    static func_清龙() {
        var shun = MjFan.getShuns();
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
    static func_全小() {
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
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
    static func_全中() {
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
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
    static func_全大() {
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
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
    static func_一色三节高() {
        var ke = MjFan.getKeGang();
        ke.sort(MjEngine.sortCardByTypeNum);
        var len = ke.length;
        MjEngine.subLine(ke);
        if (ke.length != len) {
            return 24;
        }
        return 0;
    }

    /**
     *
     */
    static func_一色三同顺() {
        var shun = MjFan.getShuns();
        //
        if (shun.length < 3) return 0;
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
    static func_清一色() {
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
            if (!mjCard.isNumCard()) return 0;
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
    static func_全双刻() {
        var ke = [];
        ke = ke.concat(MjFan.huInfo.anKe);
        ke = ke.concat(MjFan.status.getPengCards());
        if (MjFan.huInfo.jiang != null) {
            ke.push(MjFan.huInfo.jiang);
        }
        if (ke.length != 5) {
            return 0;
        }
        for (var i = 0; i < ke.length; i++) {
            var card = ke[i];
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
    public static func_七星不靠(): number {
        if (!MjFan.is七星不靠(MjFan.getShowAndTarget())) {
            return 0;
        }
        return 24;
    }

    static is七星不靠(cards) {
        if (!MjFan.is全不靠(cards)) {
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
    static func_七对() {
        if (MjFan.func_门前清() == 0) {
            return 0;
        }
        if (MjFan.is七对(MjFan.getShowAndTarget())) {
            return 24;
        }
        return 0;
    }

    static is七对(cards) {
        var all = cards.slice();
        if (all.length != 14) {
            return false;
        }
        all.sort(MjEngine.sortCardByTypeNum);
        var i = 0;
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
    static func_混幺九() {
        var ke = MjFan.getKeGang();
        if (MjFan.huInfo.jiang == null) {
            return 0;
        }
        ke.push(MjFan.huInfo.jiang);
        if (ke.length != 5) {
            return 0;
        }
        for (var i = 0; i < ke.length; i++) {
            var card = ke[i];
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
    static func_三杠() {
        if (MjFan.status.mingGangCnt() + MjFan.status.anGangCnt() == 3) {
            return 32;
        }
        return 0;
    }

    /**
     *
     */
    static func_一色四步高() {
        var shun = MjFan.getShuns();
        if (shun.length != 4) {
            return 0;
        }
        var i = 0;
        for (i = 0; i < shun.length; i++) {
            var vs = shun[i];
            if (i > 0) {
                if (vs[0].type != shun[0][0].type) {
                    return 0;
                }
            }
        }
        shun.sort(MjEngine.sortShunsByTypeNum);
        //
        var cc = shun[1][0].num - shun[0][0].num;
        for (i = 0; i < shun.length; i++) {
            var vs1 = shun[i];
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
    static func_一色四节高() {
        var ke = MjFan.getKeGang();
        for (var j = 0; j < ke.length; j++) {
            var card1 = ke[j];
            if (!card1.isNumCard()) {
                ke.splice(j, 1);
                j--;
            }
        }
        if (ke.length >= 4) {
            ke.sort(MjEngine.sortCardByTypeNum);
            var first = ke[0];
            for (var i = 1; i < ke.length; i++) {
                var card = ke[i];
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
    static func_一色四同顺() {
        var shun = MjFan.getShuns();
        if (shun.length != 4) {
            return 0;
        }
        var i = 0;
        for (i = 0; i < shun.length; i++) {
            var vs = shun[i];
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
    static func_一色双龙会() {
        if (!MjFan.func_七对()) {
            return 0;
        }
        var cards = MjFan.getAllCards();
        if (!MjEngine.isSameType(cards)) {
            return 0
        }
        cards.sort(MjEngine.sortCardByNum);
        if (cards[0].num != 1) return 0;
        if (cards[1 * 2].num != 2) return 0;
        if (cards[2 * 2].num != 3) return 0;
        if (cards[3 * 2].num != 5) return 0;
        if (cards[4 * 2].num != 7) return 0;
        if (cards[5 * 2].num != 8) return 0;
        if (cards[6 * 2].num != 9) return 0;
        return 64;
    }

    /**
     *
     */
    static func_四暗刻() {
        var cnt = MjFan.huInfo.getValidAnKe().length;
        cnt += MjFan.status.anGangCnt();
        if (cnt == 4) {
            return 64;
        }
        return 0;
    }

    /**
     *
     */
    static func_字一色() {
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
            if (mjCard.isNumCard()) {
                return 0;
            }
        }
        return 64;
    }

    /**
     *
     */
    static func_小三元() {
        if (MjFan.huInfo.jiang == null) {
            return 0;
        }
        if (!MjFan.huInfo.jiang.isSe()) {
            return 0;
        }
        var ke = MjFan.getKeGang();
        var cnt = 0;
        if (MjEngine.getCardCnt(ke, MjConst.type_se, MjConst.type_se_hong) > 0) cnt++;
        if (MjEngine.getCardCnt(ke, MjConst.type_se, MjConst.type_se_fa) > 0) cnt++;
        if (MjEngine.getCardCnt(ke, MjConst.type_se, MjConst.type_se_bai) > 0) cnt++;
        if (cnt == 2) {
            return 64;
        }
        return 0;
    }

    /**
     *
     */
    static func_小四喜() {
        if (MjFan.huInfo.jiang == null) {
            return 0;
        }
        if (!MjFan.huInfo.jiang.isFeng()) {
            return 0;
        }
        var ke = MjFan.getKeGang();
        var cnt = 0;
        if (MjEngine.getCardCnt(ke, MjConst.type_feng, MjConst.type_feng_dong) > 0) cnt++;
        if (MjEngine.getCardCnt(ke, MjConst.type_feng, MjConst.type_feng_nan) > 0) cnt++;
        if (MjEngine.getCardCnt(ke, MjConst.type_feng, MjConst.type_feng_xi) > 0) cnt++;
        if (MjEngine.getCardCnt(ke, MjConst.type_feng, MjConst.type_feng_dong) > 0) cnt++;
        if (cnt == 4) {
            return 64;
        }
        return 0;
    }

    /**
     *
     */
    static func_清幺九() {
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
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
    static func_十三幺() {
        if (!MjFan.is十三幺(MjFan.getShowAndTarget())) {
            return 0;
        }
        return 88;
    }

    static is十三幺(show) {
        if (show.length != 14) {
            return false;
        }
        var vs = [];
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
        var hasDui = false;
        for (var i = 0; i < vs.length; i++) {
            var card = vs[i];
            var cnt = MjEngine.getCardCntByCard(show, card);
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
    static func_连七对() {
        if (MjFan.func_七对() == 0) {
            return 0;
        }
        var all = MjFan.getAllCards();
        for (var i = 1; i < all.length; i++) {
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
    static func_四杠() {
        if (MjFan.status.anGangCnt() + MjFan.status.mingGangCnt() == 4) {
            return 88;
        }
        return 0;
    }

    /**
     *
     */
    static func_九莲宝灯() {
        if (!MjFan.func_门前清()) {
            return 0;
        }
        var cards = MjFan.getAllCards();
        var cardType = cards[0].type;
        for (var i = 1; i < cards.length; i++) {
            if (cards[i].type != cardType) {
                return 0;
            }
        }
        var cs = [
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
    static func_绿一色() {
        var all = MjFan.getAllCards();
        var i = 0;
        for (i = 0; i < all.length; i++) {
            var mjCard = all[i];
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
    static func_大三元() {
        var ke = MjFan.getKeGang();
        if (ke.length >= 3) {
            var cnt = 0;
            for (var i = 0; i < ke.length; i++) {
                var card = ke[i];
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
    static func_大四喜() {
        var ke = MjFan.getKeGang();
        if (ke.length == 4) {
            for (var i = 0; i < ke.length; i++) {
                var card = ke[i];
                if (!card.isFeng()) {
                    return 0;
                }
            }
            return 88;
        }
        return 0;
    }

    static getShuns() {
        var shun = [];
        shun = shun.concat(MjFan.status.getChiCards());
        shun = shun.concat(MjFan.huInfo.anShun);
        return shun;
    }

    static getKeGang() {
        var ke = MjFan.getKe();
        ke = ke.concat(MjFan.status.getAnGangCards());
        ke = ke.concat(MjFan.status.getMingGangCards());
        return ke;
    }

    static getKe() {
        var ke = MjFan.huInfo.anKe.slice();
        ke = ke.concat(MjFan.status.getPengCards());
        return ke;
    }

    static getShowAndTarget() {
        var c = MjFan.status.cloneShowCards();
        if (MjFan.huInfo.mingTarget != null) {
            c.push(MjFan.huInfo.mingTarget);
        }
        return c;
    }

    static getAllCards() {
        var c = MjFan.status.getAllCards();
        if (MjFan.huInfo.mingTarget != null) {
            c.push(MjFan.huInfo.mingTarget);
        }
        return c;
    }

    static getAllCardsExceptTarget() {
        var c = MjFan.status.getAllCards();
        if (MjFan.huInfo.anTarget != null) {
            MjEngine.subSpecialCnt(c, MjFan.huInfo.anTarget, 1);
        }
        return c;
    }

    static getAllShowCardsExceptTarget() {
        var c = MjFan.status.cloneShowCards();
        if (MjFan.huInfo.anTarget != null) {
            MjEngine.subSpecialCnt(c, MjFan.huInfo.anTarget, 1);
        }
        return c;
    }
}
