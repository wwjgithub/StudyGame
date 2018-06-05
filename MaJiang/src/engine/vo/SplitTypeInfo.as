/**
 * Created by Administrator on 2015/3/12.
 */
package engine.vo {
    import engine.MjConst;

    public class SplitTypeInfo {
        private var _dongCards:Vector.<MjCard> = new Vector.<MjCard>();
        private var _nanCards:Vector.<MjCard> = new Vector.<MjCard>();
        private var _xiCards:Vector.<MjCard> = new Vector.<MjCard>();
        private var _beiCards:Vector.<MjCard> = new Vector.<MjCard>();
        private var _hongCards:Vector.<MjCard> = new Vector.<MjCard>();
        private var _faCards:Vector.<MjCard> = new Vector.<MjCard>();
        private var _baiCards:Vector.<MjCard> = new Vector.<MjCard>();
        private var _wanCards:Vector.<MjCard> = new Vector.<MjCard>();
        private var _tongCards:Vector.<MjCard> = new Vector.<MjCard>();
        private var _tiaoCards:Vector.<MjCard> = new Vector.<MjCard>();

        public function SplitTypeInfo(ts:Vector.<MjCard>) {
            for (var i:int = 0; i < ts.length; i++) {
                var mjCard:MjCard = ts[i];
                switch (mjCard.type) {
                    case MjConst.type_wan:
                        _wanCards.push(mjCard);
                        break;
                    case MjConst.type_tong:
                        _tongCards.push(mjCard);
                        break;
                    case MjConst.type_tiao:
                        _tiaoCards.push(mjCard);
                        break;
                    case MjConst.type_feng:
                        switch (mjCard.num) {
                            case MjConst.type_feng_dong:
                                _dongCards.push(mjCard);
                                break;
                            case MjConst.type_feng_xi:
                                _xiCards.push(mjCard);
                                break;
                            case MjConst.type_feng_nan:
                                _nanCards.push(mjCard);
                                break;
                            case MjConst.type_feng_bei:
                                _beiCards.push(mjCard);
                                break;
                        }
                        break;
                    case MjConst.type_se:
                        switch (mjCard.num) {
                            case MjConst.type_se_hong:
                                _hongCards.push(mjCard);
                                break;
                            case MjConst.type_se_fa:
                                _faCards.push(mjCard);
                                break;
                            case MjConst.type_se_bai:
                                _baiCards.push(mjCard);
                                break;
                        }
                        break;
                }
            }
        }

        public function getAllTypeCards():Vector.<Vector.<MjCard>>{
            return new <Vector.<MjCard>>[wanCards, tongCards, tiaoCards, dongCards, nanCards, xiCards, beiCards, hongCards, faCards, baiCards];
        }

        public function get dongCards():Vector.<MjCard> {
            return _dongCards;
        }

        public function get nanCards():Vector.<MjCard> {
            return _nanCards;
        }

        public function get xiCards():Vector.<MjCard> {
            return _xiCards;
        }

        public function get beiCards():Vector.<MjCard> {
            return _beiCards;
        }

        public function get hongCards():Vector.<MjCard> {
            return _hongCards;
        }

        public function get faCards():Vector.<MjCard> {
            return _faCards;
        }

        public function get baiCards():Vector.<MjCard> {
            return _baiCards;
        }

        public function get wanCards():Vector.<MjCard> {
            return _wanCards;
        }

        public function get tongCards():Vector.<MjCard> {
            return _tongCards;
        }

        public function get tiaoCards():Vector.<MjCard> {
            return _tiaoCards;
        }
    }
}
