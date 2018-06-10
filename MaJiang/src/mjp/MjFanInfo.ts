
class MjFanInfo {
    public name: string;
    public valid: boolean = true;
    public fan: number;

    constructor(name: string, fanCnt: number) {
        this.name = name;
        this.fan = fanCnt;
    }
}
