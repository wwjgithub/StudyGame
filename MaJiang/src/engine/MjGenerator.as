/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2015/1/7
 * Time: 17:07
 */
package engine {
    import engine.vo.MjCard;

    import flash.display.Sprite;

    public class MjGenerator extends Sprite {
        //µÁƒ‘÷«…Ã
        public static const ROBOT_HARD_LEVEL:Number = .6;
        public function MjGenerator() {
            gene(0);
        }

        public static function geneKe(ls:Vector.<MjCard>):Vector.<MjCard> {
            var cnt:int = 0;
            while (cnt < 10) {
                var c:MjCard = ls[int(ls.length * Math.random())];
                var cards:Vector.<MjCard> = new <MjCard>[c, c, c];
                if (MjEngine.subContain(ls, cards)) {
                    return cards;
                }
                cnt++;
            }
            return new Vector.<MjCard>();
        }

        public static function geneShun(ls:Vector.<MjCard>):Vector.<MjCard> {
            var cnt:int = 0;
            while (cnt < 20) {
                var c:MjCard = new MjCard(int(3 * Math.random()) + 1, int(6 * Math.random()) + 2);
                var cards:Vector.<MjCard> = new <MjCard>[c.getPrev(), c, c.getNext()];
                if (MjEngine.subContain(ls, cards)) {
                    return cards;
                }
                cnt++;
            }
            return new Vector.<MjCard>();
        }

        public static function geneAlmostShun(ls:Vector.<MjCard>):Vector.<MjCard> {
            var cnt:int = 0;
            while (cnt < 20) {
                var c:MjCard = new MjCard(int(3 * Math.random()) + 1, int(6 * Math.random()) + 2);
                var cards:Vector.<MjCard> = new Vector.<MjCard>();
                if (Math.random() > .5) {
                    cards = new <MjCard>[c.getPrev().getPrev(), c, c.getNext()];
                } else {
                    cards = new <MjCard>[c.getPrev(), c, c.getNext().getNext()];
                }
                if (MjEngine.subContain(ls, cards)) {
                    return cards;
                }
                cnt++;
            }
            return new Vector.<MjCard>();
        }

        public static function geneDui(ls:Vector.<MjCard>):Vector.<MjCard> {
            var cnt:int = 0;
            while (cnt < 10) {
                var c:MjCard = ls[int(ls.length * Math.random())];
                var cards:Vector.<MjCard> = new <MjCard>[c, c];
                if (MjEngine.subContain(ls, cards)) {
                    return cards;
                }
                cnt++;
            }
            return new Vector.<MjCard>();
        }

        public static function gene(curLevel:Number):Array {
            var ra:Number = 0;
            if(curLevel<5){
                ra=.5;
            }else{
                ra=.4;
            }
            var lib:Vector.<MjCard> = MjConst.Total4();
            var v:Vector.<MjCard> = new Vector.<MjCard>();
            for (var i:int = 0; i < 4; i++) {
                var n:Number = Math.random();
                if (n < ra) {
                    var cards:Vector.<MjCard> = new Vector.<MjCard>();
                    var m:Number = Math.random();
                    if (m < .2) {
                        cards = geneKe(lib);
                    } else if (m < .4) {
                        cards = geneShun(lib);
                    } else if (m < .75) {
                        cards = geneAlmostShun(lib);
                    } else {
                        cards = geneDui(lib);
                    }
                    v = v.concat(cards);
                }
            }
            for (var j:int = 0; j < v.length; j++) {
                v[j] = v[j].clone();
            }
            for (var kk:int = 0; kk < 10; kk++) {
                var n1:int = Math.random() * v.length;
                var n2:int = Math.random() * v.length;
                if (n1 != n2) {
                    var t:MjCard = v[n1];
                    v[n1] = v[n2];
                    v[n2] = t;
                }
            }
            return [v, lib];
        }
    }
}
