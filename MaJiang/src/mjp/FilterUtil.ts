namespace game {


    export class FilterUtil {
        static getBrightnessMatrix(value: number) {
            value *= 255;

            return [1, 0, 0, 0, value,
                0, 1, 0, 0, value,
                0, 0, 1, 0, value,
                0, 0, 0, 1, 0];
        }


    }
}
