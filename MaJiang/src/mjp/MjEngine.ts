

class MjEngine {

    /**
     * 是否有可胡的牌型
     * @return
     */
    static getHuInfos(cs, maxCnt = 100) {
        var infos = [];
        var cards = cs.slice();
        cards.sort(MjEngine.sortCardByTypeNum);
        var b: boolean;
        //前面这是特殊牌型.
        b = MjFan.is七对(cards);
        if (b) {
            infos.push(new HuInfo());
            if (infos.length > maxCnt) return infos;
        }
        b = MjFan.is组合龙(cards);
        if (b) {
            infos.push(new HuInfo());
            if (infos.length > maxCnt) return infos;
        }
        b = MjFan.is七星不靠(cards);
        if (b) {
            infos.push(new HuInfo());
            if (infos.length > maxCnt) return infos;
        }
        b = MjFan.is十三幺(cards);
        if (b) {
            infos.push(new HuInfo());
            if (infos.length > maxCnt) return infos;
        }
        b = MjFan.is全不靠(cards);
        if (b) {
            infos.push(new HuInfo());
            if (infos.length > maxCnt) return infos;
        }
        //下面这是普通牌型
        var duis = MjEngine.getDouble(cards);
        //先把将拿出来.因为有的作用可能不是将.需要挨个比较
        var i: number;
        var retStatus: HuInfo;
        for (i = 0; i < duis.length; i++) {
            var tss = cards.slice();
            tss.sort(MjEngine.sortCardByTypeNum);
            var jiang = duis[i];
            MjEngine.subSpecialCnt(tss, jiang, 2);
            //
            retStatus = new HuInfo();
            retStatus.jiang = jiang;
            var ts1 = tss.slice();
            retStatus.anShun = retStatus.anShun.concat(MjEngine.subLine(ts1));
            //subSame(ts1, 4);
            retStatus.anKe = retStatus.anKe.concat(MjEngine.subSameCnt(ts1, 3));
            if (ts1.length == 0) {
                infos.push(retStatus);
                if (infos.length > maxCnt) return infos;
            }
            retStatus = new HuInfo();
            retStatus.jiang = jiang;
            var ts2 = tss.slice();
            retStatus.anShun = retStatus.anShun.concat(MjEngine.subLineReverse(ts2));
            //subSame(ts2, 4);
            retStatus.anKe = retStatus.anKe.concat(MjEngine.subSameCnt(ts2, 3));
            if (ts2.length == 0) {
                infos.push(retStatus);
                if (infos.length > maxCnt) return infos;
            }
            retStatus = new HuInfo();
            retStatus.jiang = jiang;
            var ts3 = tss.slice();
            //subSame(ts3, 4);
            retStatus.anKe = retStatus.anKe.concat(MjEngine.subSameCnt(ts3, 3));
            retStatus.anShun = retStatus.anShun.concat(MjEngine.subLine(ts3));
            if (ts3.length == 0) {
                infos.push(retStatus);
                if (infos.length > maxCnt) return infos;
            }
            retStatus = new HuInfo();
            retStatus.jiang = jiang;
            var ts4 = tss.slice();
            //subSame(ts4, 4);
            retStatus.anKe = retStatus.anKe.concat(MjEngine.subSameCnt(ts4, 3));
            retStatus.anShun = retStatus.anShun.concat(MjEngine.subLineReverse(ts4));
            if (ts4.length == 0) {
                infos.push(retStatus);
                if (infos.length > maxCnt) return infos;
            }
        }
        for (var j = 0; j < infos.length; j++) {
            var info = infos[j];
            for (var k = j + 1; k < infos.length; k++) {
                var info1 = infos[k];
                if (info1.toString() == info.toString()) {
                    infos.splice(k, 1);
                    k--;
                }
            }
        }
        return infos;
    }

    static getMaxHuInfo(infos, player, mingTarget, anTarget) {
        if (infos == null || infos.length == 0) {
            return null;
        }
        for (var j = 0; j < infos.length; j++) {
            var info = infos[j];
            if (mingTarget != null) {
                info.mingTarget = mingTarget;
            } else {
                info.anTarget = anTarget;
            }
            info.fan = MjEngine.getFan(player, info);
        }
        var f = function (f1, f2) {
            if (f1.fan > f2.fan) {
                return -1;
            } else if (f1.fan == f2.fan) {
                return 0;
            } else {
                return 1;
            }
        };
        infos.sort(f);
        return infos[0];
    }

    /**
     * 返回最终有效的番数和
     * @param player
     * @param huInfo
     * @return
     */
    static getFan(player, huInfo) {
        var fans = MjEngine.getFans(player, huInfo);
        //计算番数
        var fanCnt = 0;
        var j = 0;
        for (j = 0; j < fans.length; j++) {
            var mjFanInfo = fans[j];
            if (mjFanInfo.valid) {
                fanCnt += mjFanInfo.fan;
            }
        }
        return fanCnt;
    }

    /**
     * 返回番
     * @param status
     * @param huInfo
     * @return
     */
    static getFans(status, huInfo) {
        var fans = [];
        var ignores = [];
        var map = MjFan.fanmap;
        MjFan.status = status;
        MjFan.huInfo = huInfo;
        for (var m in map) {
            if (map[m]["a" + MjRound.instance.playType] == true && map[m].func != null) {
                var fanCnt = map[m].func();
                if (fanCnt > 0) {
                    fans.push(new MjFanInfo(m, fanCnt));
                    if (map[m].ignore != null) {
                        ignores = ignores.concat(map[m].ignore);
                    }
                }
            }
        }
        //下面设置无效番形
        var i = 0;
        for (i = 0; i < fans.length; i++) {
            var fan = fans[i];
            if (ignores.indexOf(fan.name) != -1) {
                fan.valid = false;
            }
        }
        //如果没番,则计无番胡
        if (fans.length == 0) {
            fans.push(new MjFanInfo(MjFan.fan_无番, 8));
        }
        return fans;
    }

    /**
     * 在cards中删除_cnt个card
     * @param cards
     * @param card
     * @param _cnt
     */
    static subSpecialCnt(cards, card, _cnt) {
        var j = 0;
        var cnt = 0;
        for (j = 0; j < cards.length; j++) {
            if (cards[j].equal(card)) {
                cards.splice(j, 1);
                j--;
                cnt++;
                if (cnt == _cnt) {
                    break;
                }
            }
        }
    }

    /**
     * 挑出至少有2张的来
     * @param ts
     * @return
     */
    static getDouble(ts) {
        ts.sort(MjEngine.sortCardByTypeNum);
        var duis = [];
        var i = 0;
        for (i = 0; i < ts.length - 1; i++) {
            if (ts[i].equal(ts[i + 1])) {
                if (duis.length > 0) {
                    if (duis[duis.length - 1].equal(ts[i])) {
                        //避免一样的出现.比如4个的时候,前面已经有一对了.
                        continue;
                    }
                }
                duis.push(ts[i]);
                i++;
            }
        }
        return duis;
    }

    static subLine_use(ts, vs) {
        if (ts.length < 3) {
            return;
        }
        var startIndex = 0;
        while (true) {
            if (startIndex >= ts.length - 2) {
                return;
            }
            var curCard = ts[startIndex];
            if (!curCard.isNumCard()) {
                return;
            }
            var t2 = null;
            var i2 = 0;
            var t3 = null;
            var i3 = 0;
            var i = 0;
            for (i = startIndex + 1; i < ts.length; i++) {
                var cur = ts[i];
                if (t2 == null) {//先与第一张牌比较
                    if (cur.equal(curCard)) {//如果这张牌与目标牌一样.略过.
                        if (i >= ts.length - 2) {
                            return;
                        }
                        continue;
                    }
                    //与目标牌不一样.
                    if (cur.type == curCard.type && curCard.num == cur.num - 1) {//如果这张牌是第一张牌的下张.则记录
                        t2 = cur;
                        i2 = i;
                    }
                    else {
                        startIndex = i;
                        break;
                    }
                }
                else {
                    if (cur.equal(t2)) {//如果这张牌与目标牌一样.略过.
                        if (i >= ts.length - 1) {
                            return;
                        }
                        continue;
                    }
                    //与目标牌不一样.
                    if (cur.type == t2.type && t2.num == cur.num - 1) {//如果这张牌是第一张牌的下张.则记录
                        t3 = cur;
                        i3 = i;
                        break;
                    }
                    else {
                        startIndex = i;
                        break;
                    }
                }
            }
            if (t3 != null) {
                var vv = [];
                vv.push(ts.splice(i3, 1)[0]);
                vv.push(ts.splice(i2, 1)[0]);
                vv.push(ts.splice(startIndex, 1)[0]);
                vs.push(vv);
            }
        }
    }

    /**
     * 删除顺
     * @param ts
     */
    static subLine(ts) {
        var vs = [];
        ts.sort(MjEngine.sortCardByTypeNum);
        MjEngine.subLine_use(ts, vs);
        return vs;
    }

    /**
     * 如果全有指定的牌.则删除并修改ss,返回true,否则返回false
     * @param froms
     * @param child
     * @return
     */
    static subContain(froms, child) {
        var index = [];
        var vs = froms.slice();
        var i = 0;
        for (i = 0; i < child.length; i++) {
            var mjCard = child[i];
            var j = 0;
            var ind = -1;
            for (j = 0; j < vs.length; j++) {
                if (vs[j].equal(mjCard)) {
                    vs.splice(j, 1);
                    ind = j;
                    break;
                }
            }
            if (ind == -1) {
                return false;
            } else {
                index.push(ind);
            }
        }
        for (var k = 0; k < index.length; k++) {
            froms.splice(index[k], 1);
        }
        return true;
    }

    static subLineReverse_use(ts, vs) {
        if (ts.length < 3) {
            return;
        }
        var startIndex = ts.length - 1;
        while (true) {
            if (startIndex < 2) {
                return;
            }
            var curCard = ts[startIndex];
            if (!curCard.isNumCard()) {
                return;
            }
            var t2 = null;
            var i2 = 0;
            var t3 = null;
            var i3 = 0;
            var i = 0;
            for (i = startIndex - 1; i > -1; i--) {
                var cur = ts[i];
                if (t2 == null) {//先与第一张牌比较
                    if (cur.equal(curCard)) {//如果这张牌与目标牌一样.略过.
                        if (i < 2) {
                            return;
                        }
                        continue;
                    }
                    //与目标牌不一样.
                    if (cur.type == curCard.type && curCard.num == cur.num + 1) {//如果这张牌是第一张牌的下张.则记录
                        t2 = cur;
                        i2 = i;
                    }
                    else {
                        startIndex = i;
                        break;
                    }
                }
                else {
                    if (cur.equal(t2)) {//如果这张牌与目标牌一样.略过.
                        if (i < 1) {
                            return;
                        }
                        continue;
                    }
                    //与目标牌不一样.
                    if (cur.type == t2.type && t2.num == cur.num + 1) {//如果这张牌是第一张牌的下张.则记录
                        t3 = cur;
                        i3 = i;
                        break;
                    }
                    else {
                        startIndex = i;
                        break;
                    }
                }
            }
            if (t3 != null) {
                var vv = [];
                //
                vv.push(ts.splice(startIndex, 1)[0]);
                vv.push(ts.splice(i2, 1)[0]);
                vv.push(ts.splice(i3, 1)[0]);
                startIndex -= 3;
                vs.push(vv)
            }
        }
    }

    /**
     * 反向删除顺
     * @param ts
     */
    static subLineReverse(ts) {
        var vs = [];
        ts.sort(MjEngine.sortCardByTypeNum);
        MjEngine.subLineReverse_use(ts, vs);
        return vs;
    }

    /**
     * 排序后依次删除num个一样的牌.有可能有4张同样的牌时,如果num是2,会删除2次
     * 返回删除的
     * @param ts
     * @param num
     */
    static subSameCnt(ts, num) {
        var vs = [];
        ts.sort(MjEngine.sortCardByTypeNum);
        var i = 0;
        var index = 0;
        for (i = 1; i < ts.length; i++) {
            if (ts[i].equal(ts[i - 1])) {//如果此牌与前一张牌一样
                if (i == index + (num - 1)) {//如果到了num个牌
                    vs.push(ts[index].clone());
                    ts.splice(index, num);
                    i = index;
                }
                continue;
            }
            else {
                index = i;
            }
        }
        return vs;
    }

    /**
     * 整理牌.以万,筒,条,风,色为大顺序.从1-9,东南西北,红,绿,白为小顺序
     * @param t1
     * @param t2
     * @return
     */
    static sortCardByTypeNum(t1, t2) {
        if (t1.type < t2.type) {
            return -1;
        }
        else if (t1.type == t2.type) {
            return MjEngine.sortCardByNum(t1, t2);
        }
        else {
            return 1;
        }
    }

    /**
     * 按数比
     * @param t1
     * @param t2
     * @return
     */
    static sortCardByNum(t1, t2) {
        if (t1.num < t2.num) {
            return -1;
        }
        else if (t1.num > t2.num) {
            return 1;
        }
        return 0;
    }

    /**
     * 删除特定同样数目的牌. 22233 cnt=3时,会剩下 33
     * @param ts
     * @param cnt   >1
     */
    static subSameSpecialCnt(ts, cnt) {
        ts.sort(MjEngine.sortCardByTypeNum);
        var i = 0;
        for (i = 0; i <= ts.length - cnt; i++) {
            var last = ts[i];
            var curCnt = 1;
            for (var f = i + 1; f < ts.length; f++) {
                var mjCard = ts[f];
                if (mjCard.equal(last)) {
                    curCnt++;
                    if (f == ts.length - 1) {
                        if (curCnt == cnt) {
                            ts.splice(i, cnt);
                        }
                        return;
                    }
                    continue;
                }
                else {
                    if (curCnt == cnt) {
                        ts.splice(i, cnt);
                        i = f - 1 - cnt;
                    }
                    else {
                        i = f - 1;
                    }
                    break;
                }
            }
        }
    }

    /**
     * 从show中得到type,num牌的数量
     * @param show
     * @param t
     * @param num
     * @return
     */
    static getCardCnt(show, t, num) {
        return MjEngine.getCards(show, t, num).length;
    }

    static getCardCntByCard(show, card) {
        return MjEngine.getCards(show, card.type, card.num).length;
    }

    /**
     * 从show中得到type,num牌的数量
     * @param show
     * @param t
     * @param num
     * @return
     */
    private static getCards(show, t, num) {
        var v = [];
        var i = 0;
        for (i = 0; i < show.length; i++) {
            var mjCard = show[i];
            if (mjCard.type == t && mjCard.num == num) {
                v.push(mjCard);
            }
        }
        return v;
    }

    /**
     * 对2个顺子进行排序,先以类型排.再以大小牌
     * @param v1
     * @param v2
     * @return
     */
    static sortShunsByTypeNum(v1, v2) {
        v1.sort(MjEngine.sortCardByNum);
        v2.sort(MjEngine.sortCardByNum);
        if (v1[0].type < v2[0].type) {
            return -1;
        }
        else if (v1[0].type == v2[0].type) {
            if (v1[0].num < v2[0].num) {
                return -1;
            }
            if (v1[0].num > v2[0].num) {
                return 1;
            }
            return 0;
        }
        else {
            return 1;
        }
    }

    /**
     * 对2个顺子进行排序,以大小牌
     * @param v1
     * @param v2
     * @return
     */
    static sortShunsByNum(v1, v2) {
        if (v1[0].num < v2[0].num) {
            return -1;
        }
        if (v1[0].num > v2[0].num) {
            return 1;
        }
        return 0;
    }

    /**
     * 使cards中的牌保持唯一
     * @param cards
     */
    static subSame(cards) {
        cards.sort(MjEngine.sortCardByTypeNum);
        var i = 0;
        for (i = 1; i < cards.length; i++) {
            var mjCard = cards[i];
            if (mjCard.equal(cards[i - 1])) {
                cards.splice(i, 1);
                i--;
            }
        }
    }

    static thinkChi(card, showCards) {
        var ret = [];
        if (!card.isNumCard()) {
            return ret;
        }
        var v: MjChiInfo;
        var s = showCards.slice();
        if (card.num > 2) {
            if (MjEngine.getCardCnt(s, card.type, card.num - 2) > 0) {
                if (MjEngine.getCardCnt(s, card.type, card.num - 1) > 0) {
                    v = new MjChiInfo();
                    v.target = card;
                    v.cards.push(new MjCard(card.type, card.num - 2));
                    v.cards.push(new MjCard(card.type, card.num - 1));
                    v.cards.push(card);
                    ret.push(v);
                }
            }
        }
        if (card.num > 1 && card.num < 9) {
            if (MjEngine.getCardCnt(s, card.type, card.num - 1) > 0) {
                if (MjEngine.getCardCnt(s, card.type, card.num + 1) > 0) {
                    v = new MjChiInfo();
                    v.target = card;
                    v.cards.push(new MjCard(card.type, card.num - 1));
                    v.cards.push(card);
                    v.cards.push(new MjCard(card.type, card.num + 1));
                    ret.push(v);
                }
            }
        }
        if (card.num < 8) {
            if (MjEngine.getCardCnt(s, card.type, card.num + 1) > 0) {
                if (MjEngine.getCardCnt(s, card.type, card.num + 2) > 0) {
                    v = new MjChiInfo();
                    v.target = card;
                    v.cards.push(card);
                    v.cards.push(new MjCard(card.type, card.num + 1));
                    v.cards.push(new MjCard(card.type, card.num + 2));
                    ret.push(v);
                }
            }
        }
        return ret;
    }

    static thinkPeng(card, s) {
        var vv = [];
        if (MjEngine.getCardCnt(s, card.type, card.num) >= 2) {
            vv.push(card);
        }
        return vv;
    }

    static thinkMingGang(card, s) {
        var vv = [];
        if (MjEngine.getCardCnt(s, card.type, card.num) == 3) {
            vv.push(card);
        }
        return vv;
    }

    static thinkAnGang(s) {
        var gans = MjEngine.subSameCnt(s.slice(), 4);
        return gans;
    }

    static thinkBuGang(card, pengCards) {
        var vv = [];
        for (var i = 0; i < pengCards.length; i++) {
            var card1 = pengCards[i];
            if (card1.equal(card)) {
                vv.push(card);
                break;
            }
        }
        return vv;
    }

    /**
     * 判断是否听牌
     * @return
     */
    static thinkIsTing(showCards) {
        return MjEngine.getTingInfos(showCards, 1).length > 0;
    }

    /**
     * 获得听牌各种选择
     * @param showCards
     * @param minCnt        最多听牌方法数.如果超过这个数量,就直接return
     * @return
     */
    static getTingInfos(showCards, minCnt = 100) {
        var tingInfos = [];
        //
        var discardCards = showCards.slice();
        MjEngine.subSame(discardCards);
        //这是会听的牌
        for (var i = 0; i < discardCards.length; i++) {
            var tCards = showCards.slice();
            MjEngine.subSpecialCnt(tCards, discardCards[i], 1);
            //现在已经删除一张要打的牌.再测试所有牌能否是胡牌型
            var tingCards = MjEngine.getTingCards(tCards);
            if (tingCards.length > 0) {
                tingInfos.push(new MjTingInfo(discardCards[i], tingCards));
            }
            if (tingInfos.length >= minCnt) {
                return tingInfos;
            }
        }
        return tingInfos;
    }

    static getCntByType(ts, t) {
        var cnt = 0;
        for (var i = 0; i < ts.length; i++) {
            var card = ts[i];
            if (card.type == t) {
                cnt++;
            }
        }
        return cnt;
    }

    /**
     * 得到听的牌.最多13张
     * @param showCards
     * @return
     */
    static getTingCards(showCards) {
        var tCards;
        //如果有13张牌,则有可能会是特殊牌型
        tCards = MjEngine.getNormalTingCards(showCards);
        if (tCards.length == 0) {
            return MjEngine.getSpecialTingCards(showCards);
        } else {
            return tCards;
        }
    }

    static getNormalTingCards(showCards) {
        showCards = MjEngine.subComponentType(showCards);
        var tCards = [];
        for (var i = 0; i < MjConst.All4Type.length; i++) {
            var ls = showCards.slice();
            var needCard = MjConst.All4Type[i];
            ls.push(needCard);
            if (ls.length == 11 || ls.length == 14) {
                //组合龙
                var array = MjFan.has组合龙(ls);
                if (array != null) {
                    //是组合龙.则检查除去组合龙后的牌
                    MjFan.sub组合龙(ls, array);
                    if (MjEngine.isValidNormalCardComponents(ls)) {
                        tCards.push(needCard);
                        continue;
                    }
                }
            }
            //
            ls.pop();
            //不是特殊番型.则判断是否跟手中的牌有关联.比如单张风色,以及比较远的字牌都略过
            if (!needCard.isNumCard()) {//是风和色牌,且牌中没有同牌.则忽略
                if (MjEngine.getCardCntByCard(ls, needCard) == 0) {
                    continue;
                }
            } else {
                //如果是字牌,看同类有没有相近的.没有忽略
                var isNear = false;
                for (var j = 0; j < ls.length; j++) {
                    var card = ls[j];
                    if (card.type == needCard.type) {
                        if (Math.abs(card.num - needCard.num) <= 1) {
                            isNear = true;
                            break;
                        }
                    }
                }
                if (!isNear) {
                    continue;
                }
            }
            ls.push(needCard);
            if (MjEngine.isValidNormalCardComponents(ls)) {
                tCards.push(needCard);
            }
        }
        return tCards;
    }

    /**
     * 如果有某色能完全除去
     * @param ts
     * @return
     */
    static subComponentType(ts) {
        var info = new SplitTypeInfo(ts);
        var allType = info.getAllTypeCards();
        var ss = [];
        for (var i = 0; i < allType.length; i++) {
            var obj = allType[i];
            if (obj.length % 3 != 0 || !MjEngine.isComponents(obj)) {
                ss = ss.concat(obj);
            }
        }
        return ss;
    }

    static getSpecialTingCards(showCards) {
        var tCards = [];
        if (showCards.length != 13) {
            return tCards;
        }
        for (var i = 0; i < MjConst.All4Type.length; i++) {
            var ls = showCards.slice();
            var needCard = MjConst.All4Type[i];
            ls.push(needCard);
            var lastCnt = tCards.length;
            if (MjFan.is七对(ls)) {
                tCards.push(needCard);
                continue;
            }
            if (MjFan.is全不靠(ls)) {
                tCards.push(needCard);
                continue;
            }
            if (MjFan.is十三幺(ls)) {
                tCards.push(needCard);
                continue;
            }
        }
        return tCards;
    }

    /**
     * 依次先拿出将去,再按各种方式去除顺子与刻后,如果没牌了.说明符合正常胡的牌型
     * @param cards
     * @return
     */
    static isValidNormalCardComponents(cards) {
        //下面这是普通牌型
        var duis = MjEngine.getDouble(cards);
        //先把将拿出来.因为有的作用可能不是将.需要挨个比较
        var i: number;
        for (i = 0; i < duis.length; i++) {
            var jiang = duis[i];
            var tss = cards.slice();
            MjEngine.subSpecialCnt(tss, jiang, 2);
            if (tss.length == 0) {
                return true;
            }
            tss.sort(MjEngine.sortCardByTypeNum);
            //
            var valid: boolean = true;
            var info = new SplitTypeInfo(tss);
            var allTypes = info.getAllTypeCards();
            for (var j = 0; j < allTypes.length; j++) {
                if (allTypes[j].length % 3 != 0) {
                    valid = false;
                    continue;
                }
            }
            if (!valid) {
                continue;
            }
            //
            for (var k = 0; k < allTypes.length; k++) {
                if (allTypes[k].length > 0) {
                    if (!MjEngine.isComponents(allTypes[k])) {
                        valid = false;
                        continue;
                    }
                }
            }
            if (!valid) {
                continue;
            }
            return true;
        }
        return false;
    }

    /**
     * 是否成铺.即是否成顺刻
     * @param tss
     * @return
     */
    static isComponents(tss) {
        var ts1 = tss.slice();
        MjEngine.subLine(ts1);
        MjEngine.subSameCnt(ts1, 3);
        if (ts1.length == 0) {
            return true;
        }
        var ts2 = tss.slice();
        MjEngine.subLineReverse(ts2);
        MjEngine.subSameCnt(ts2, 3);
        if (ts2.length == 0) {
            return true;
        }
        var ts3 = tss.slice();
        MjEngine.subSameCnt(ts3, 3);
        MjEngine.subLine(ts3);
        if (ts3.length == 0) {
            return true;
        }
        var ts4 = tss.slice();
        MjEngine.subSameCnt(ts4, 3);
        MjEngine.subLineReverse(ts4);
        if (ts4.length == 0) {
            return true;
        }
        return false;
    }

    static thinkHu(card, s, player) {
        var ss = s.slice();
        ss.push(card);
        var huInfo = MjEngine.getMaxHuInfo(MjEngine.getHuInfos(ss), player, card, null);
        if (huInfo != null) {
            huInfo.mingTarget = card;
        }
        return huInfo;
    }

    /**
     * 得到打出的牌
     */
    static getDiscardCard(cs) {
        var v = cs.slice();
        v.sort(MjEngine.sortCardByTypeNum);
        var card: MjCard;
        card = MjEngine.getSingleFengSeCard(v.slice());
        //去掉单个风牌
        if (card != null) {
            return card;
        }
        card = MjEngine.getSingTypeCard(v.slice());
        //去掉单个字牌
        if (card != null) {
            return card;
        }
        card = MjEngine.getFarawayCard(v.slice(), 2);
        //去除间隔2个空位的不连续单牌
        if (card != null) {
            return card;
        }
        card = MjEngine.getFarawayCard(v.slice(), 1);
        //去除间隔1个空位的不连续单牌
        if (card != null) {
            return card;
        }
        card = MjEngine.getDiscardCardSequence4(v.slice());
        //去除连续牌数为4、7、10、13中的一张牌，让牌型成为无将胡牌型。如2344条，去除4条。
        if (card != null) {
            return card;
        }
        return v[0];
    }

    static getSingTypeCard(v) {
        for (var i = 1; i < v.length - 1; i++) {
            var card = v[i];
            if (card.type != v[i - 1].type && card.type != v[i + 1].type) {
                return card;
            }
        }
        return null;
    }

    static getDiscardCardSequence4(v) {
        //删除风和色
        MjEngine.deleteByType(v, [MjConst.type_feng, MjConst.type_se]);
        //删除顺的
        var vv = v.slice();
        MjEngine.subLine(vv);
        if (vv.length > 0) {
            return vv[0];
        }
        return null;
    }

    /**
     * 去除间隔distance个空位的不连续单牌
     * @param v
     * @param distance
     * @return
     */
    static getFarawayCard(v, distance) {
        MjEngine.deleteByType(v, [MjConst.type_feng, MjConst.type_se]);
        var card: MjCard;
        for (var i = 0; i < v.length; i++) {
            card = v[i];
            if (i == 0) {
                if (v.length == 1) {
                    //如果只有一张牌
                    return card;
                } else {
                    if (card.type != v[1].type) {
                        //如果第一张与第二张不同类型.
                        return card;
                    } else {
                        if (Math.abs(card.num - v[1].num) > distance) {
                            return card;
                        }
                    }
                }
            } else if (i == v.length - 1) {
                var pCard = v[i - 1];
                if (!(card.type == pCard.type)) {
                    //最后一张与其他类型不同
                    return card;
                } else {
                    if (Math.abs(card.num - v[i - 1].num) > distance) {
                        return card;
                    }
                }
            } else {
                var prevCard = v[i - 1];
                var nextCard = v[i + 1];
                if (card.type == prevCard.type && card.type == nextCard.type) {
                    if (Math.abs(card.num - prevCard.num) > distance && Math.abs(card.num - nextCard.num) > distance) {
                        return card;
                    }
                } else if (card.type == prevCard.type) {
                    if (Math.abs(card.num - prevCard.num) > distance) {
                        return card;
                    }
                } else if (card.type == nextCard.type) {
                    if (Math.abs(card.num - nextCard.num) > distance) {
                        return card;
                    }
                }
            }
        }
        return null;
    }

    /**
     * 得到单个风牌
     * @param v
     * @return
     */
    static getSingleFengSeCard(v) {
        var ars = [
            [MjConst.type_feng, MjConst.type_feng_dong],
            [MjConst.type_feng, MjConst.type_feng_nan],
            [MjConst.type_feng, MjConst.type_feng_xi],
            [MjConst.type_feng, MjConst.type_feng_bei],
            [MjConst.type_se, MjConst.type_se_hong],
            [MjConst.type_se, MjConst.type_se_fa],
            [MjConst.type_se, MjConst.type_se_bai]
        ];
        var aa = [];
        while (ars.length > 0) {
            aa.push(ars.splice(Math.floor(ars.length * Math.random()), 1)[0]);
        }
        for (var i = 0; i < aa.length; i++) {
            var ar = aa[i];
            var cards = MjEngine.getCards(v, ar[0], ar[1]);
            if (cards.length == 1) {
                return cards[0];
            }
        }
        return null
    }

    static deleteByType(v, p) {
        for (var i = 0; i < v.length; i++) {
            var card = v[i];
            if (p.indexOf(card.type) != -1) {
                v.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * 听后摸牌
     * 听后,只能暗杠和补杠.暗杠如果改变了之前听的牌,也不能杠
     * @param player
     * @param reverse
     * @return
     */
    static thinkOptFetchAfterTing(player, reverse) {
        var status = new MjPlayerThinkStatus();
        status.anGangCards = MjEngine.thinkAnGang(player.cloneShowCards());
        if (status.anGangCards.length > 0) {
            //如果听时还能暗杠,需要判断是否影响了听的牌
            var effTing = false;
            for (var i = 0; i < status.anGangCards.length; i++) {
                var ccc = status.anGangCards[i];
                var cs = player.cloneShowCards();
                MjEngine.subSpecialCnt(cs, ccc, 4);
                for (var j = 0; j < player.tingInfo.tingCards.length; j++) {
                    var cs1 = cs.slice();
                    cs1.push(player.tingInfo.tingCards[j]);
                    if (MjEngine.getHuInfos(cs1).length == 0) {
                        effTing = true;
                        break;
                    }
                }
                if (effTing) {
                    status.anGangCards.splice(i, 1);
                    i--;
                }
            }
        }
        status.buGangCards = MjEngine.thinkBuGang(player.lastFetchCard, player.getPengCards());
        var huInfos = MjEngine.getHuInfos(player.cloneShowCards());
        var huInfo = MjEngine.getMaxHuInfo(huInfos, player, null, player.lastFetchCard);
        if (huInfo != null) {
            huInfo.anTarget = player.lastFetchCard;
            if (reverse) {
                huInfo.justGang = true;
            }
        }
        status.huInfo = huInfo;
        return status;
    }

    /**
     * 普通摸牌
     * 没听时,自己摸牌.可能暗杠,补杠,自摸,报听
     * @param player
     * @param reverse
     * @return
     */
    static thinkOptFetch(player, reverse) {
        var st = new MjPlayerThinkStatus();
        st.anGangCards = MjEngine.thinkAnGang(player.cloneShowCards());
        st.buGangCards = MjEngine.thinkBuGang(player.lastFetchCard, player.getPengCards());
        var huInfos = MjEngine.getHuInfos(player.cloneShowCards());
        var huInfo = MjEngine.getMaxHuInfo(huInfos, player, null, player.lastFetchCard);
        if (huInfo != null) {
            huInfo.anTarget = player.lastFetchCard;
            if (reverse) {
                huInfo.justGang = true;
            }
        }
        st.huInfo = huInfo;
        if (st.huInfo != null) {
            st.isTing = true;
        } else {
            st.isTing = MjEngine.thinkIsTing(player.cloneShowCards());
        }
        return st;
    }

    static thinkOptAfterOpt(round) {
        var status = new MjPlayerThinkStatus();
        status.isTing = MjEngine.thinkIsTing(round.cloneShowCards());
        return status;
    }

    static thinkOptAfterOtherDiscard(player, card, prevPlayer) {
        var status = new MjPlayerThinkStatus();
        //吃,碰,明杠,暗杠,补杠,报听,胡,自摸
        //如果还没听牌.
        if (player.tingInfo == null) {
            if (prevPlayer) {
                status.chiInfos = MjEngine.thinkChi(card, player.cloneShowCards());
            }
            status.pengCards = MjEngine.thinkPeng(card, player.cloneShowCards());
            status.mingGangCards = MjEngine.thinkMingGang(card, player.cloneShowCards());
        } else {
        }
        var huInfo = MjEngine.thinkHu(card, player.cloneShowCards(), player);
        status.huInfo = huInfo;
        return status;
    }

    /**
     * 别人打牌AI
     * @param card  别人打的牌
     * @param player
     * @return
     * @param prevPlayer 是不是上家.能不能吃
     */
    static thinkOptAfterOtherDiscardAi(player, card, prevPlayer) {
        var status = new MjPlayerThinkStatus();
        //吃,碰,明杠,暗杠,补杠,报听,胡,自摸
        //如果还没听牌.
        if (player.tingInfo == null) {
            if (prevPlayer) {
                //防止吃6万.打6万
                var sc = player.cloneShowCards();
                sc.push(card);
                MjEngine.subLine(sc);
                status.chiInfos = MjEngine.thinkChi(card, sc);
            }
            status.pengCards = MjEngine.thinkPeng(card, player.cloneShowCards());
            status.mingGangCards = MjEngine.thinkMingGang(card, player.cloneShowCards());
        } else {
        }
        var huInfo = MjEngine.thinkHu(card, player.cloneShowCards(), player);
        status.huInfo = huInfo;
        return status;
    }

    static thinkOptOnOtherBuGang(player, card) {
        var status = new MjPlayerThinkStatus();
        //吃,碰,明杠,暗杠,补杠,报听,胡,自摸
        var huInfo = MjEngine.thinkHu(card, player.cloneShowCards(), player);
        if (huInfo != null) {
            huInfo.qiangGang = true;
        }
        status.huInfo = huInfo;
        return status;
    }

    static hasNum(cards, nums) {
        if (cards.length <= 0) {
            return false;
        }
        for (var i = 0; i < nums.length; i++) {
            var num = nums[i];
            if (MjEngine.getCardCnt(cards, cards[0].type, num) == 0) {
                return false;
            }
        }
        return true;
    }

    static isSameType(cards) {
        if (cards.length <= 0) {
            return true;
        }
        var t = cards[0].type;
        for (var i = 1; i < cards.length; i++) {
            if (cards[i].type != t) {
                return false;
            }
        }
        return true;
    }

    static getBuKao() {
        var shape = [];
        shape.push([
            new MjCard(1, 1),
            new MjCard(1, 4),
            new MjCard(1, 7),
            new MjCard(2, 2),
            new MjCard(2, 5),
            new MjCard(2, 8),
            new MjCard(3, 3),
            new MjCard(3, 6),
            new MjCard(3, 9)
        ]);
        shape.push([
            new MjCard(1, 1),
            new MjCard(1, 4),
            new MjCard(1, 7),
            new MjCard(3, 2),
            new MjCard(3, 5),
            new MjCard(3, 8),
            new MjCard(2, 3),
            new MjCard(2, 6),
            new MjCard(2, 9)
        ]);
        shape.push([
            new MjCard(2, 1),
            new MjCard(2, 4),
            new MjCard(2, 7),
            new MjCard(1, 2),
            new MjCard(1, 5),
            new MjCard(1, 8),
            new MjCard(3, 3),
            new MjCard(3, 6),
            new MjCard(3, 9)
        ]);
        shape.push([
            new MjCard(2, 1),
            new MjCard(2, 4),
            new MjCard(2, 7),
            new MjCard(3, 2),
            new MjCard(3, 5),
            new MjCard(3, 8),
            new MjCard(1, 3),
            new MjCard(1, 6),
            new MjCard(1, 9)
        ]);
        shape.push([
            new MjCard(3, 1),
            new MjCard(3, 4),
            new MjCard(3, 7),
            new MjCard(1, 2),
            new MjCard(1, 5),
            new MjCard(1, 8),
            new MjCard(2, 3),
            new MjCard(2, 6),
            new MjCard(2, 9)
        ]);
        shape.push([
            new MjCard(3, 1),
            new MjCard(3, 4),
            new MjCard(3, 7),
            new MjCard(2, 2),
            new MjCard(2, 5),
            new MjCard(2, 8),
            new MjCard(1, 3),
            new MjCard(1, 6),
            new MjCard(1, 9)
        ]);
        return shape;
    }
}