/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/4
 * Time: 12:18
 */
module engine.vo {
    export class OptChi implements IOpt{
        private _chiInfo:MjChiInfo;
        constructor(chiInfo:MjChiInfo) {
            this._chiInfo = chiInfo;
        }

        public get chiInfo():MjChiInfo {
            return this._chiInfo;
        }
    }
}
