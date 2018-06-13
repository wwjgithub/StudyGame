/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/27
 * Time: 11:40
 */
namespace game {

    export class TestInitCards {

        public static testForAnGangAfterTing() {
            var cs2 = []
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(1, 4));
            cs2.push(new MjCard(1, 5));
            var csLast = new Array<MjCard>();
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(1, 1));
            return [cs2, null, null, null, csLast];
        }

        public static testForAnGangInit() {
            var cs1 = [];
            cs1.push(new MjCard(3, 1));
            cs1.push(new MjCard(3, 1));
            cs1.push(new MjCard(3, 1));
            var csLast = [];
            csLast.push(new MjCard(3, 1));
            return [cs1, null, null, null, csLast];
        }

        public static testFor1() {
            var cs2 = [];
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 2));
            cs2.push(new MjCard(1, 2));
            cs2.push(new MjCard(1, 2));
            cs2.push(new MjCard(1, 2));
            cs2.push(new MjCard(1, 3));
            cs2.push(new MjCard(1, 3));
            cs2.push(new MjCard(1, 3));
            cs2.push(new MjCard(1, 3));
            cs2.push(new MjCard(4, 1));
            return [cs2, null, null, null, [new MjCard(4, 1)]];
        }

        public static testForWuFan() {
            var cs1 = [];
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(2, 2));
            cs1.push(new MjCard(2, 3));
            cs1.push(new MjCard(2, 4));
            cs1.push(new MjCard(2, 4));
            cs1.push(new MjCard(2, 4));
            cs1.push(new MjCard(3, 4));
            cs1.push(new MjCard(3, 5));
            cs1.push(new MjCard(3, 6));
            cs1.push(new MjCard(4, 1));
            cs1.push(new MjCard(4, 1));
            var cs2 = [];
            cs2.push(new MjCard(2, 4));
            var cs3 = [];
            cs3.push(new MjCard(2, 1));
            return [cs1, cs2, cs3, null, null];
        }

        public static testForOtherAnGang() {
            var cs2 = [];
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(1, 4));
            cs2.push(new MjCard(1, 5));
            var csLast = [];
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(1, 1));
            csLast.push(new MjCard(2, 2));
            csLast.push(new MjCard(1, 1));
            return [null, cs2, null, null, csLast];
        }

        public static testForHeroAnGang() {
            var cs2 = [];
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(1, 4));
            cs2.push(new MjCard(1, 5));
            var csLast = [];
            csLast.push(new MjCard(1, 1));
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(2, 2));
            csLast.push(new MjCard(1, 1));
            return [cs2, null, null, null, csLast];
        }

        public static testForBuGang() {
            var cs2 = [];
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(1, 4));
            cs2.push(new MjCard(1, 5));
            var csLast = [];
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(1, 1));
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(1, 1));
            return [cs2, null, null, null, csLast];
        }

        public static testForOtherBuGang() {
            var cs2 = [];
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(1, 4));
            cs2.push(new MjCard(1, 5));
            var csLast = [];
            csLast.push(new MjCard(1, 1));
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(3, 1));
            csLast.push(new MjCard(1, 1));
            return [null, null, cs2, null, csLast];
        }

        public static testForHeroTing() {
            var cs1 = [];
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(1, 5));
            //
            var csLast = [];
            csLast.push(new MjCard(1, 9));
            csLast.push(new MjCard(1, 9));
            csLast.push(new MjCard(1, 9));
            csLast.push(new MjCard(1, 5));
            csLast.push(new MjCard(1, 5));
            csLast.push(new MjCard(1, 5));
            return [cs1, null, null, null, csLast];
        }

        public static testForTing1() {
            var cs1 = [];
            cs1.push(new MjCard(1, 5));
            cs1.push(new MjCard(2, 6));
            cs1.push(new MjCard(2, 7));
            cs1.push(new MjCard(2, 7));
            cs1.push(new MjCard(2, 7));
            cs1.push(new MjCard(3, 3));
            cs1.push(new MjCard(3, 4));
            cs1.push(new MjCard(3, 5));
            cs1.push(new MjCard(3, 5));
            cs1.push(new MjCard(3, 7));
            cs1.push(new MjCard(3, 8));
            cs1.push(new MjCard(3, 8));
            cs1.push(new MjCard(3, 8));
            //
            var csLast = [];
            csLast.push(new MjCard(1, 5));
            csLast.push(new MjCard(3, 6));
            return [cs1, null, null, null, csLast];
        }

        public static testForOtherHu() {
            var cs1 = [];
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(1, 5));
            //
            var csLast = [];
            csLast.push(new MjCard(1, 9));
            csLast.push(new MjCard(1, 5));
            csLast.push(new MjCard(1, 5));
            csLast.push(new MjCard(1, 5));
            return [null, cs1, null, null, csLast];
        }

        public static testForTianHu() {
            var cs1 = [];
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(1, 5));
            //
            var csLast = [];
            csLast.push(new MjCard(1, 5));
            return [cs1, null, null, null, csLast];
        }

        public static testForChiAi() {
            var cs1 = [];
            cs1.push(new MjCard(2, 2));
            var cs2 = [];
            cs2.push(new MjCard(2, 1));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 3));
            //
            cs2.push(new MjCard(1, 2));
            cs2.push(new MjCard(1, 2));
            cs2.push(new MjCard(1, 2));
            cs2.push(new MjCard(1, 3));
            cs2.push(new MjCard(1, 3));
            cs2.push(new MjCard(1, 3));
            cs2.push(new MjCard(1, 4));
            cs2.push(new MjCard(1, 4));
            cs2.push(new MjCard(1, 4));
            cs2.push(new MjCard(1, 5));
            return [cs1, cs2, null, null, null];
        }

        public static testForHeroChi() {
            var cs1 = [];
            cs1.push(new MjCard(2, 1));
            cs1.push(new MjCard(2, 2));
            cs1.push(new MjCard(2, 3));
            //

            let cs4=[new MjCard(2, 2)];
            return [cs1, null, null, cs4, null];
        }
        public static testForHeroPeng() {
            var cs1 = [];
            cs1.push(new MjCard(2, 2));
            cs1.push(new MjCard(2, 2));
            //
            let cs4=[new MjCard(2, 2)];
            return [cs1, null, null, cs4, null];
        }

        //下家补杠,英雄抢胡
        public static testForHeroQiangGang() {
            var cs1 = [];
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(3, 2));
            cs1.push(new MjCard(3, 2));
            cs1.push(new MjCard(3, 2));
            cs1.push(new MjCard(3, 3));
            cs1.push(new MjCard(3, 3));
            cs1.push(new MjCard(3, 3));
            cs1.push(new MjCard(3, 4));
            cs1.push(new MjCard(3, 4));
            cs1.push(new MjCard(3, 4));
            //
            cs1.push(new MjCard(3, 5));
            var cs2 = [];
            cs2.push(new MjCard(1, 1));
            cs2.push(new MjCard(1, 1));
            //
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 2));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(3, 6));
            cs2.push(new MjCard(2, 3));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(3, 9));
            cs2.push(new MjCard(2, 4));
            cs2.push(new MjCard(4, 4));
            cs2.push(new MjCard(4, 1));
            var csLast = [];
            csLast.push(new MjCard(3, 5));
            //
            csLast.push(new MjCard(1, 9));
            csLast.push(new MjCard(1, 9));
            csLast.push(new MjCard(3, 5));
            csLast.push(new MjCard(1, 1));
            return [cs1, cs2, null, null, csLast];
        }

        public static testForGangShangKaiHua() {
            var cs1 = [];
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 1));
            //
            cs1.push(new MjCard(2, 1));
            cs1.push(new MjCard(2, 1));
            cs1.push(new MjCard(2, 1));
            cs1.push(new MjCard(2, 4));
            cs1.push(new MjCard(2, 4));
            cs1.push(new MjCard(2, 4));
            cs1.push(new MjCard(2, 8));
            cs1.push(new MjCard(2, 8));
            cs1.push(new MjCard(2, 8));
            //
            cs1.push(new MjCard(3, 1));
            //
            var csLast = [];
            csLast.push(new MjCard(1, 1));
            var csLastR = [];
            csLastR.push(new MjCard(3, 1));
            return [cs1, null, null, null, csLast, csLastR];
        }

        public static testForHuaLong() {
            var cs1 = [];
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 2));
            cs1.push(new MjCard(1, 3));
            cs1.push(new MjCard(2, 1));
            cs1.push(new MjCard(2, 2));
            cs1.push(new MjCard(2, 3));
            cs1.push(new MjCard(3, 1));
            cs1.push(new MjCard(3, 2));
            cs1.push(new MjCard(3, 3));
            //
            cs1.push(new MjCard(2, 4));
            cs1.push(new MjCard(2, 5));
            cs1.push(new MjCard(2, 6));
            //
            cs1.push(new MjCard(4, 3));
            //
            return [cs1, null, null, null, [new MjCard(4, 3)]];
        }

        public static testForQuanBuKao(): any {
            var cs1 = [];
            cs1.push(new MjCard(1, 1));
            cs1.push(new MjCard(1, 4));
            cs1.push(new MjCard(1, 7));
            cs1.push(new MjCard(2, 2));
            cs1.push(new MjCard(2, 5));
            cs1.push(new MjCard(2, 8));
            cs1.push(new MjCard(3, 3));
            cs1.push(new MjCard(3, 6));
            cs1.push(new MjCard(3, 9));
            //
            cs1.push(new MjCard(4, 1));
            cs1.push(new MjCard(4, 2));
            cs1.push(new MjCard(4, 3));
            cs1.push(new MjCard(4, 4));
            //
            return [cs1];
        }
    }
}
