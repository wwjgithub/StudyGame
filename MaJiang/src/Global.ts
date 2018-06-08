module Global {
    export let stage_w: number;
    export let stage_h: number;
    export let money_di:number = 10;

    export function getRes(s: string) {
        return RES.getRes("all." + s);
    }
}