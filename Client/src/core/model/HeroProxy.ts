module game {
    import Proxy = puremvc.Proxy;
    import HeroModel = game.model.HeroModel;
    import IProxy = puremvc.IProxy;

    export class HeroProxy extends Proxy implements IProxy {
        public static NAME: string = "HeroProxy";
        constructor(proxyName?: string, data?: any) {
            super(proxyName, data)
        }

        onRegister(): void {
            super.onRegister();
            console.log("HeroProxy:" + (this.getData() as HeroModel).nick + "======" + this.getProxyName());
        }
    }
}