/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/10/23
 * Time: 11:10
 */
module mjp {
    //import flash.geom.Point;
    //import flash.system.Capabilities;

    export class UserConst {
        public static var size:Point;
        //显示电脑的牌. 正式牌应该是false
        public static var SHOW_COMPUTER:boolean = false;
        public static var MAN:number = 1;
        //电脑自动打. 正式牌应该是true
        public static var AI:boolean = true;
        public static var money_di:number = 10;
        //每关的名字
        public static var playerInfos = [
            ["何润东", 1],
            ["何炅", 1],
            ["冯绍峰", 1],
            ["刘欢", 1],
            ["吴京", 1],
            ["吴奇隆", 1],
            ["吴莫愁", 2],
            ["周华健", 1],
            ["周星驰", 1],
            ["周杰伦", 1],
            ["娄艺潇", 2],
            ["孙俪", 2],
            ["孙红雷", 1],
            ["平安", 1],
            ["庾澄庆", 1],
            ["张曼玉", 2],
            ["张涵予", 2],
            ["张艺谋", 1],
            ["张震", 1],
            ["张默", 1],
            ["彭佳慧", 2],
            ["成龙", 1],
            ["方中信", 1],
            ["李亚鹏", 1],
            ["李宇春", 2],
            ["李玟", 2],
            ["李维嘉", 2],
            ["杨坤", 1],
            ["杨宗纬", 1],
            ["林俊杰", 1],
            ["林志玲", 2],
            ["柳岩", 2],
            ["汤唯", 2],
            ["王宝强", 1],
            ["甄子丹", 1],
            ["章子怡", 2],
            ["胡军", 1],
            ["舒淇", 2],
            ["范伟", 1],
            ["范冰冰", 2],
            ["萧亚轩", 2],
            ["蔡依林", 2],
            ["蔡康永", 1],
            ["谢天华", 1],
            ["谢娜", 2],
            ["金城武", 1],
            ["金志文", 1],
            ["陈小春", 1],
            ["陈汉典", 1],
            ["陈赫", 1],
            ["黄晓明", 1]
        ];
        public static show_card_width:number = 69;
        public static INIT_MONEY:number = 1000;

        public static getComponentWidth():number {
            return UserConst.show_card_width * getHeroCardScale() * 3;
        }

        public static getHeroCardScale():number {
            var sx:number = size.x / (UserConst.show_card_width * 14 + 10);
            if (sx > 1) {
                sx = 1;
            }
            return sx;
        }

        public static getDiscardCardScale():number {
            var s:number = ((UserConst.size.x - 140 * 2 - 20) / 16) / 48;
            if (s > 1) {
                s = 1;
            }
            return s;
        }

        public static UP_CARD_WIDTH:number = 42;

        public static get isIOS():boolean {
            return Capabilities.manufacturer.indexOf("iOS") != -1;
        }
    }
}
