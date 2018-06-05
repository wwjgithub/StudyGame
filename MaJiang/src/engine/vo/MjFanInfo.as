/**
 * Created by IntelliJ IDEA.
 * User: wwj
 * Date: 13-4-3
 * Time: 下午5:47
 */
package engine.vo {
    public class MjFanInfo {
        public var name:String;
        public var valid:Boolean = true;
        public var fan:int;

        public function MjFanInfo(name:String, fanCnt:int) {
            this.name = name;
            this.fan = fanCnt;
        }
    }
}
