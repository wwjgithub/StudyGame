namespace game {

    import Point = egret.Point;

    export class BezierUtil {

        private static pointOnCubicBezier3(cp, t: number): Point {
            var ax: number, bx: number, cx: number;
            var ay: number, by: number, cy: number;
            var tSquared: number, tCubed: number;
            var result: Point = new Point();
            /* 計算多項式係數 */
            cx = 3.0 * (cp[1].x - cp[0].x);
            bx = 3.0 * (cp[2].x - cp[1].x) - cx;
            ax = cp[3].x - cp[0].x - cx - bx;

            cy = 3.0 * (cp[1].y - cp[0].y);
            by = 3.0 * (cp[2].y - cp[1].y) - cy;
            ay = cp[3].y - cp[0].y - cy - by;
            /* 計算位於參數值 t 的曲線點 */
            tSquared = t * t;
            tCubed = tSquared * t;
            result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
            result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
            return result;
        }

        /**
         *
         * @param cp        一段Bezier曲线.可能是3或4个点
         * @param numberOfPoints    分成几段
         * @return          每段的位置
         */
        public static computeBezier(cp, numberOfPoints: number) {
            var curve = [];
            var dt: number = 0;
            dt = 1.0 / (numberOfPoints - 1);
            var f: Function = BezierUtil.pointOnCubicBezier2;
            if (cp.length == 4) {
                f = BezierUtil.pointOnCubicBezier3;
            }
            for (var i: number = 0; i < numberOfPoints; i++) {
                curve[i] = f(cp, i * dt);
            }
            return curve;
        }

        private static pointOnCubicBezier2(cp, t: number): Point {
            var x: number = (cp[0].x + cp[2].x - 2 * cp[1].x) * t * t + (2 * cp[1].x - 2 * cp[0].x) * t + cp[0].x;
            var y: number = (cp[0].y + cp[2].y - 2 * cp[1].y) * t * t + (2 * cp[1].y - 2 * cp[0].y) * t + cp[0].y;
            return new Point(x, y);
        }
    }
}
