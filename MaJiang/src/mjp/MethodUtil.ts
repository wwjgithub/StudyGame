namespace game {
    export class MethodUtil {

        public static create(f: Function, ...arg): Function {
            var ff: Function = function (...p): void {
                f.apply(null, p.concat(arg));
            };
            return ff;
        }

        public static simple(f: Function, ...arg): Function {
            var ff: Function = function (...p): void {
                f.apply(null, arg);
            };
            return ff;
        }
    }
}