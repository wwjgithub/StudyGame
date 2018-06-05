/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2014/11/4
 * Time: 12:18
 */
package engine.vo {
    public class OptChi implements IOpt{
        private var _chiInfo:MjChiInfo;
        public function OptChi(chiInfo:MjChiInfo) {
            _chiInfo = chiInfo;
        }

        public function get chiInfo():MjChiInfo {
            return _chiInfo;
        }
    }
}
