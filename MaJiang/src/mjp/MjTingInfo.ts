
class MjTingInfo {
    //打出去的牌
    public target: MjCard;
    //听的牌
    public tingCards: MjCard[];

    /**
     *
     * @param curCard   可以打的牌
     * @param ting      可以听的牌
     */
    constructor(curCard: MjCard, ting: MjCard[]) {
        this.target = curCard;
        this.tingCards = ting;
    }
}