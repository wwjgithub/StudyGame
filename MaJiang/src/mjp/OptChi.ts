

class OptChi implements IOpt {
    private _chiInfo: MjChiInfo;

    constructor(chiInfo: MjChiInfo) {
        this._chiInfo = chiInfo;
    }

    public get chiInfo(): MjChiInfo {
        return this._chiInfo;
    }
}