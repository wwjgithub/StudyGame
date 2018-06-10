
class OptMingGang implements IOpt {
    private _card: MjCard;
    public get card(): MjCard {
        return this._card;
    }

    constructor(card: MjCard) {
        this._card = card;
    }
}