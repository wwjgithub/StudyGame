/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/12/5
 * Time: 14:38
 */
module mjp {
    export class PlayerInfo {
        public win:number = 0;
        public lose:number = 0;
        public name:string;
        public money:number;
        public sex:number;

        constructor() {
        }

        public init(s:string) {
            var ar = s.split("_");
            this.name = ar[0];
            this.sex = int(ar[1]);
            money = int(ar[2]);
            win = int(ar[3]);
            lose = int(ar[4]);
        }

        public getSaveStr():string {
            return [name, sex, money, win, lose].join("_");
        }
    }
}
