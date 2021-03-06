namespace game {
    export class PlayerInfo {
        public win: number = 0;
        public lose: number = 0;
        public name: string;
        public money: number;
        public sex: number;


        constructor() {
        }

        public init(s: string) {
            var ar: Array<string> = s.split("_");
            this.name = ar[0];
            this.sex = parseInt(ar[1]);
            this.money = parseInt(ar[2]);
            this.win = parseInt(ar[3]);
            this.lose = parseInt(ar[4]);
        }

        public getSaveStr(): string {
            return [this.name, this.sex, this.money, this.win, this.lose].join("_");
        }
    }
}