/**
 * Created by Administrator on 2015/3/12.
 */
module engine.vo {

    export class SplitTypeInfo {
        private _dongCards:MjCard[] = [];
        private _nanCards:MjCard[] = [];
        private _xiCards:MjCard[] = [];
        private _beiCards:MjCard[] = [];
        private _hongCards:MjCard[] = [];
        private _faCards:MjCard[] = [];
        private _baiCards:MjCard[] = [];
        private _wanCards:MjCard[] = [];
        private _tongCards:MjCard[] = [];
        private _tiaoCards:MjCard[] = [];

        constructor(ts:MjCard[]) {
            for (var i:number = 0; i < ts.length; i++) {
                var mjCard:MjCard = ts[i];
                switch (mjCard.type) {
                    case MjConst.type_wan:
                        this._wanCards.push(mjCard);
                        break;
                    case MjConst.type_tong:
                        this._tongCards.push(mjCard);
                        break;
                    case MjConst.type_tiao:
                        this._tiaoCards.push(mjCard);
                        break;
                    case MjConst.type_feng:
                        switch (mjCard.num) {
                            case MjConst.type_feng_dong:
                                this._dongCards.push(mjCard);
                                break;
                            case MjConst.type_feng_xi:
                                this._xiCards.push(mjCard);
                                break;
                            case MjConst.type_feng_nan:
                                this._nanCards.push(mjCard);
                                break;
                            case MjConst.type_feng_bei:
                                this._beiCards.push(mjCard);
                                break;
                        }
                        break;
                    case MjConst.type_se:
                        switch (mjCard.num) {
                            case MjConst.type_se_hong:
                                this._hongCards.push(mjCard);
                                break;
                            case MjConst.type_se_fa:
                                this._faCards.push(mjCard);
                                break;
                            case MjConst.type_se_bai:
                                this._baiCards.push(mjCard);
                                break;
                        }
                        break;
                }
            }
        }

        public getAllTypeCards():MjCard[][]{
            return [this.wanCards, this.tongCards, this.tiaoCards, this.dongCards, this.nanCards, this.xiCards, this.beiCards, this.hongCards, this.faCards, this.baiCards];
        }

        public get dongCards():MjCard[] {
            return this._dongCards;
        }

        public get nanCards():MjCard[] {
            return this._nanCards;
        }

        public get xiCards():MjCard[] {
            return this._xiCards;
        }

        public get beiCards():MjCard[] {
            return this._beiCards;
        }

        public get hongCards():MjCard[] {
            return this._hongCards;
        }

        public get faCards():MjCard[] {
            return this._faCards;
        }

        public get baiCards():MjCard[] {
            return this._baiCards;
        }

        public get wanCards():MjCard[] {
            return this._wanCards;
        }

        public get tongCards():MjCard[] {
            return this._tongCards;
        }

        public get tiaoCards():MjCard[] {
            return this._tiaoCards;
        }
    }
}
