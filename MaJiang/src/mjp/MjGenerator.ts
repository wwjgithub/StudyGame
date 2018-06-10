

class MjGenerator {
    constructor() {
        MjGenerator.gene(0);
    }

    public static geneKe(ls: MjCard[]): MjCard[] {
        var cnt: number = 0;
        while (cnt < 10) {
            var c: MjCard = ls[Math.floor(ls.length * Math.random())];
            var cards: MjCard[] = [c, c, c];
            if (MjEngine.subContain(ls, cards)) {
                return cards;
            }
            cnt++;
        }
        return [];
    }

    public static geneShun(ls: MjCard[]): MjCard[] {
        var cnt: number = 0;
        while (cnt < 20) {
            var c: MjCard = new MjCard(Math.floor(3 * Math.random()) + 1, Math.floor(6 * Math.random()) + 2);
            var cards: MjCard[] = [c.getPrev(), c, c.getNext()];
            if (MjEngine.subContain(ls, cards)) {
                return cards;
            }
            cnt++;
        }
        return [];
    }

    public static geneAlmostShun(ls: MjCard[]): MjCard[] {
        var cnt: number = 0;
        while (cnt < 20) {
            var c: MjCard = new MjCard(Math.floor(3 * Math.random()) + 1, Math.floor(6 * Math.random()) + 2);
            var cards: MjCard[] = [];
            if (Math.random() > .5) {
                cards = [c.getPrev().getPrev(), c, c.getNext()];
            } else {
                cards = [c.getPrev(), c, c.getNext().getNext()];
            }
            if (MjEngine.subContain(ls, cards)) {
                return cards;
            }
            cnt++;
        }
        return [];
    }

    public static geneDui(ls: MjCard[]): MjCard[] {
        var cnt: number = 0;
        while (cnt < 10) {
            var c: MjCard = ls[Math.floor(ls.length * Math.random())];
            var cards: MjCard[] = [c, c];
            if (MjEngine.subContain(ls, cards)) {
                return cards;
            }
            cnt++;
        }
        return [];
    }

    public static gene(curLevel: number) {
        var ra: number = 0;
        switch (curLevel) {
            case 0:
            case 1:
            case 2:
                ra = .8;
                break;
            case 3:
            case 4:
                ra = .7;
                break;
            case 5:
            case 6:
                ra = .6;
                break;
            case 7:
            case 8:
                ra = .5;
                break;
            case 9:
            case 10:
                ra = .5;
                break;
            case 11:
            case 12:
                ra = .4;
                break;
            case 13:
            case 14:
                ra = .4;
                break;
            default:
                ra = .5;
                break;
        }
        var lib: MjCard[] = MjConst.Total4();
        var v: MjCard[] = [];
        for (var i: number = 0; i < 4; i++) {
            var n: number = Math.random();
            if (n < ra / 3 * 2) {
                var cards: MjCard[] = [];
                var m: number = Math.random();
                if (m < .2) {
                    cards = MjGenerator.geneKe(lib);
                } else if (m < .4) {
                    cards = MjGenerator.geneShun(lib);
                } else if (m < .75) {
                    cards = MjGenerator.geneAlmostShun(lib);
                } else {
                    cards = MjGenerator.geneDui(lib);
                }
                v = v.concat(cards);
            }
        }
        for (var j: number = 0; j < v.length; j++) {
            v[j] = v[j].clone();
        }
        for (var kk: number = 0; kk < 10; kk++) {
            var n1: number = Math.random() * v.length;
            var n2: number = Math.random() * v.length;
            if (n1 != n2) {
                var t: MjCard = v[n1];
                v[n1] = v[n2];
                v[n2] = t;
            }
        }
        return [v, lib];
    }
}
