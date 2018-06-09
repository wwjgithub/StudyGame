/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-4-3
 * Time: 下午5:47
 */
namespace game {
    export class MjFanInfo {
        public name:string;
        public valid:boolean = true;
        public fan:number;

        constructor(name:string, fanCnt:number) {
            this.name = name;
            this.fan = fanCnt;
        }
    }
}
