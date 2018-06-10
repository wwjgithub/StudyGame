
class MjPlayerThinkStatus {
    public chiInfos: MjChiInfo[] = [];
    public pengCards: MjCard[] = [];
    public anGangCards: MjCard[] = [];
    public mingGangCards: MjCard[] = [];
    public buGangCards: MjCard[] = [];
    public isTing: boolean = false;
    public huInfo: HuInfo;

    constructor() {
    }

    public hasTrue(): boolean {
        return this.chiInfos.length > 0
            || this.pengCards.length > 0
            || this.anGangCards.length > 0
            || this.mingGangCards.length > 0
            || this.buGangCards.length > 0
            || this.isTing
            || this.huInfo != null;
    }
}
