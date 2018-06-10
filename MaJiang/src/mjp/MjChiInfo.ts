
class MjChiInfo {
    public target: MjCard;
    //已经从大到小排序
    public cards: MjCard[] = [];

    constructor(target: MjCard = null, cards: MjCard[] = null) {
        if (target != null) {
            this.target = target;
        }
        if (cards != null) {
            this.cards = cards;
        }
    }

    public toString(): string {
        return "[吃牌:" + this.target + ":" + this.cards + "]";
    }
}
