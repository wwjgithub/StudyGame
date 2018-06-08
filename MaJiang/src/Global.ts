module Global {
    import DisplayObject = egret.DisplayObject;
    import Stage = egret.Stage;
    export let stage: Stage;
    export let stage_w: number;
    export let stage_h: number;
    export let money_di: number = 10;

    export function getRes(s: string): any {
        return RES.getRes("all." + s);
    }

    export function scaleToStageSize(m: DisplayObject, anchor?: boolean): void {

        m.width = stage_w
        m.height = stage_h;
        if (anchor) {
            m.anchorOffsetX = m.width / 2;
            m.anchorOffsetY = m.height / 2;
            m.x=stage_w/2;
            m.y=stage_h/2;
        }

    }
}