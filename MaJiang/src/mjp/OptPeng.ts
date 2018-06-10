

class OptPeng implements IOpt {
    private _card: MjCard;

    constructor(card: MjCard) {
        this._card = card;
    }

    public get card(): MjCard {
        return this._card;
    }
}